var geoLocationVis = null;
var teststuff = null;
ZzLocationVis = (function() {

  function ZzLocationVis(id) {
    this.init(id);
    geoLocationVis = this;
  }

  ZzLocationVis.prototype.init = function(id) {

    this.vis = null;
    this.vis_id = id;
    this.layout_gravity = -0.0001;
    this.damper = 0.05;
    this.friction = 0.9;
    this.force = d3.layout.force().size([520, 2000]);
    this.circles = null;
    this.nodes = [];
    this.tooltip = CustomTooltip("sunburst_tooltip", 120);
    this.mapping = d3.layout.tree();
    this.mappingData = null;

    this.group_centers = {
      "89": { x: 350, y: 600},
      "298": { x: 350, y: 150},
      "189": { x: 350, y: 150},
      "289": { x: 350, y: 150},
      "498": { x: 350, y: 300},
      "380": { x: 350, y: 300},
      "389": { x: 350, y: 300},
      "489": { x: 350, y: 300},
      "798": { x: 350, y: 450},
      "589": { x: 350, y: 450},
      "619": { x: 350, y: 450},
      "689": { x: 350, y: 450},
      "679": { x: 350, y: 450},
      "789": { x: 350, y: 450},
      "889": { x: 350, y: 750},
      "998": { x: 350, y: 900},
    };

    // init vis
    this.vis = d3.select('#' + id).append('svg')
        .attr('width', 1000)
        .attr('height', 2000)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('version', '1.1')
        .attr('viewBox', '0 0 1000 500')
      .append('g')
        .attr('transform', 'translate(0,0)')
        .on('click', function(d){          
          geoLocationVis.tooltip.hideTooltip();
        });

    this.countries = this.vis.append('g')
        .attr('class', 'countries')
        .attr('transform', 'translate(0,50)');

    // init left
    var left = this.vis.append('rect')
      .attr('width', 520)
      .attr('height', 1900)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);

    // init mid
    var mid = this.vis.append('rect')
      .attr('width', 210)
      .attr('height', 1900)
      .attr('x', 530)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);

    // init right
    var right = this.vis.append('rect')
      .attr('width', 250)
      .attr('height', 1900)
      .attr('x', 750)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);

    // top labels
    var leftText = this.vis.append('text')
      .attr('x', 15)
      .attr('y', 60)
      .attr('font-size', '16px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Uitgaven per regio');

    var midText = this.vis.append('text')
      .attr('x', 545)
      .attr('y', 60)
      .attr('font-size', '16px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Ongespecificeerd per regio');

    var rightText = this.vis.append('text')
      .attr('x', 765)
      .attr('y', 60)
      .attr('font-size', '16px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Wereldwijd ongespecificeerd');

    var direct = this.vis.append('g')
      .attr('class', 'direct');
    direct.append('text')
      .attr('x', 55)
      .attr('y', 30)
      .attr('font-size', '14px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Directe uitgaven')
      .on('click', this.toggleDirect);
    direct.append('rect')
      .attr('width', 30)
      .attr('height', 17)
      .attr('x', 15)
      .attr('y', 20)
      .attr('rx', 9)
      .attr('ry', 9)
      .attr('fill', '#fff')
      .attr('fill-opacity', 1)
      .attr('stroke', '#aaa')
      .attr('stroke-width', 1);
    direct.append('circle')
      .attr('cx', 23)
      .attr('cy', 29)
      .attr('r', 9)
      .attr('fill', '#000')
      .attr('fill-opacity', 1)
      .attr('stroke-width', 0);
      

    var indirect = this.vis.append('text')
      .attr('x', 150)
      .attr('y', 30)
      .attr('font-size', '14px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Indirecte uitgaven')
      .on('click', this.toggleIndirect);

  };


  ZzLocationVis.prototype.toggleIndirect = function() {

    // Update the nodes…
    var node = geoLocationVis.vis.selectAll(".node")
      .data(geoLocationVis.data, function(d) { return d.id; });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
      .duration(750)
      .each(function(d){ 
        d.indirect_value = 0;
        d.radius = geoLocationVis.radius_scale(d.total_disbursements + d.indirect_value)
      })
      .style("r", function(d){
        return d.radius;
      })
      .style("stroke-width", function(d){
        return d.indirect_value;
      });

  }

  ZzLocationVis.prototype.toggleDirect = function() {

  }



  ZzLocationVis.prototype.updateLegend = function(d) {

    var that = this;

    function setHiddenChildrenPosition(d, i){
      if(d._children){
        for (var y = 0;y < d._children.length;y++){
          that.group_centers[d._children[y].id]['y'] = 100 + (i * 150);
          setHiddenChildrenPosition(d._children[y], i);
        }
      }
    }

    // Compute the new tree layout.
    var nodes = that.mapping(that.mappingData).slice(1);

    // Update the nodes…
    var node = this.vis.selectAll("g.region")
        .data(nodes, function(d) { return d.id; });

    // Enter any new nodes
    var nodeEnter = node.enter().append("g")
        .attr("class", "region")
        .attr("transform", function(d, i) { return "translate(50," + (150 + (i * 150)) + ")"; })
        .on("click", that.clickRegion);

      nodeEnter
        .append('circle')
        .attr('cx', function(d){ return 12 + ((d.depth - 1) * 15); })
        .attr('cy', -5)
        .attr('r', 4)
        .attr('fill', function(d){return d.color; });

      nodeEnter
        .append('text')
        .attr('x', function(d){ return 25 + ((d.depth - 1) * 15); })
        .attr('y', 0)
        .attr('font-size', '16px')
        .attr('fill', '#444')
        .attr('style', 'text-anchor: start;')
        .text(function(d){ return d.name; })
        .each(function(d){ d.textWidth = this.getBBox().width; });

      nodeEnter
        .insert('rect', ':first-child')
        .attr('width', function(d){ return d.textWidth + 42; })
        .attr('height', 20)
        .attr('x', function(d){ return 0 + ((d.depth - 1) * 15); })
        .attr('y', -15)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('fill', '#fff');

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
      .duration(750)
      .attr("transform", function(d, i) { return "translate(50," + (150 + (i * 150)) + ")"; })
      .each(function(d,i){ 

        that.group_centers[d.id]['y'] = 100 + (i * 150);

        setHiddenChildrenPosition(d, i);
      });

    nodeUpdate.select("circle")
        .attr('r', 6)
        .attr('fill', function(d){return d.color; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's position.
    var nodeExit = node.exit().transition()
        .duration(750)
        .attr("opacity", 1e-6)
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

  }

  ZzLocationVis.prototype.updateData = function(data){

    if(!data) return false;

    var that = this;
    that.mappingData = data.mapping;
    that.data = data.data;

    var maxvalue = d3.max(that.data, function(d) { return d.total_disbursements; });
    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, maxvalue]).range([2, 20]);

    that.data.forEach(function(d) {
      d.id = d.country_id;
      d.group = d.region_id;
      d.fill = d.color;
      d.value = d.total_disbursements;
      d.indirect_value = Math.random() * d.total_disbursements; 
      d.x = that.group_centers[d.group]['x'] + ((Math.random() * 40) - 20);
      d.y = that.group_centers[d.group]['y'] + ((Math.random() * 40) - 20);
      d.radius = that.radius_scale(d.total_disbursements + d.indirect_value);
      d.stroke = '#fff';
      d.stroke_width = that.radius_scale(d.indirect_value);
      d._stroke_width = d.stroke_width; 
      d._indirect_value = d.indirect_value; 
    });

    that.nodes = that.data;
    that.force.nodes(that.nodes);

    // create / update bubbles, group them by region
    this.circles = that.countries.selectAll(".node")
      .data(that.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.fill; })
      .style("stroke", function(d) { return d.stroke; })
      .style("stroke-width", function(d) { return d.stroke_width; })
      .on('mouseover', that.mouseOver)
      .on('mouseout', that.mouseOut)
      .on('click', that.mouseClick)
      .call(that.force.drag);

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    this.mappingData.children.forEach(collapse);
    this.updateLegend(this.mappingData);
    this.update(); 
  }

  ZzLocationVis.prototype.update = function() {

    var that = this;

    this.force
      .gravity(this.layout_gravity)
      .charge(this.charge)
      .friction(this.friction)
      .on("tick", (function(_this) {
      return function(e) {
        return _this.circles.each(_this.move_towards_year(e.alpha)).attr("cx", function(d) {
          return d.x;
        }).attr("cy", function(d) {
          return d.y;
        });
      };
    })(this));

    this.force.start();
  }

  ZzLocationVis.prototype.charge = function(d) {
    return -Math.pow(d.radius + d.stroke_width, 2) / 12;
  };

  ZzLocationVis.prototype.move_towards_year = function(alpha) {
    return (function(_this) {
      return function(d) {
        var target = _this.group_centers[d.group];        
        d.x = d.x + (target.x - d.x) * _this.damper * alpha * 1.1;
        return d.y = d.y + (target.y - d.y) * _this.damper * alpha * 1.5;
      };
    })(this);
  };





  // listeners and tooltips

  ZzLocationVis.prototype.clickRegion = function(d){
    
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    geoLocationVis.updateLegend(d);
    geoLocationVis.update();
  }

  ZzLocationVis.prototype.mouseOver = function(e){
    // show country id of all countries within this region
    var circlesInRegion = geoLocationVis.vis.selectAll(".nodeText")
      .data(geoLocationVis.nodes)
    .enter().append("text")
      .filter(function(d) { return d.group == e.group; })
      .attr("class", "nodeText")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr('style', 'text-anchor: middle;')
      .attr("dominant-baseline", "central")
      .attr('font-size', function(d){ return Math.round(d.radius); })
      .attr('fill', '#444')
      .attr("pointer-events", "none")
      .text(function(d){ return d.country_id; });
  };

  ZzLocationVis.prototype.mouseOut = function(d){
    // hide country id's
    geoLocationVis.vis.selectAll('.nodeText').remove();
  };

  ZzLocationVis.prototype.mouseClick = function(d){
    // how details within the pop-up
    geoLocationVis.tooltip.showTooltip(d);
    d3.event.stopPropagation();
  }


  function CustomTooltip(tooltipId, width){
    var tooltipId = tooltipId;
    $("body").append("<div class='zz_tooltip' id='"+tooltipId+"'></div>");
    
    if(width){
      $("#"+tooltipId).css("width", width);
    }
    
    hideTooltip();
    
    function showTooltip(d){
      $("#"+tooltipId).html('<div class="tt-header" style="background-color:'+d.color+';">'+d.name+'</div><div class="tt-text">'+d.value+'</div>');
      $("#"+tooltipId).show(0);
      
      updatePosition(d3.event);
    }
    
    function hideTooltip(){
      $("#"+tooltipId).hide();
    }
    
    function updatePosition(event){
      var ttid = "#"+tooltipId;
      var xOffset = 20;
      var yOffset = 10;
      
      var ttw = $(ttid).width();
      var tth = $(ttid).height();
      var wscrY = $(window).scrollTop();
      var wscrX = $(window).scrollLeft();
      var curX = (document.all) ? event.clientX + wscrX : event.pageX;
      var curY = (document.all) ? event.clientY + wscrY : event.pageY;
      var ttleft = ((curX - wscrX + xOffset*2 + ttw) > $(window).width()) ? curX - ttw - xOffset*2 : curX + xOffset;
      if (ttleft < wscrX + xOffset){
        ttleft = wscrX + xOffset;
      } 
      var tttop = ((curY - wscrY + yOffset*2 + tth) > $(window).height()) ? curY - tth - yOffset*2 : curY + yOffset;
      if (tttop < wscrY + yOffset){
        tttop = curY + yOffset;
      } 

      tttop = tttop - 150;
      ttleft = ttleft - 60;
      $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
    }
    
    return {
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      updatePosition: updatePosition
    }
  }

  return ZzLocationVis;
})();














