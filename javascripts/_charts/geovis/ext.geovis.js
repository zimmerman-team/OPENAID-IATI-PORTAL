var geoLocationVis = null;
ZzLocationVis = (function() {

  function ZzLocationVis(id) {
    this.init(id);
    geoLocationVis = this;
  }

  // INIT
  ZzLocationVis.prototype.init = function(id) {

    this.vis = null;
    this.vis_id = id;
    this.layout_gravity = -0.001;
    this.damper = 0.05;
    this.friction = 0.7;
    this.force = d3.layout.force().size([520, 2000]);
    this.circles = null;
    this.nodes = [];
    this.tooltip = CustomTooltip("sunburst_tooltip", 250);
    this.mapping = d3.layout.tree();
    this.mappingData = null;

    this.group_centers = {
      "89": { x: 350, y: 600, 'color': '#F6A000'},
      "298": { x: 350, y: 150, 'color': '#5598B5'},
      "189": { x: 350, y: 150, 'color': '#5598B5'},
      "289": { x: 350, y: 150, 'color': '#A6E4F4'},
      "498": { x: 350, y: 300, 'color': '#00BA96'},
      "380": { x: 350, y: 300, 'color': '#14EFC5'},
      "389": { x: 350, y: 300, 'color': '#C2FFF3'},
      "489": { x: 350, y: 300, 'color': '#C2FFF3'},
      "798": { x: 350, y: 450, 'color': '#4A671E'},
      "589": { x: 350, y: 450, 'color': '#8DB746'},
      "619": { x: 350, y: 450, 'color': '#C1F460'},
      "689": { x: 350, y: 450, 'color': '#ABDD1F'},
      "679": { x: 350, y: 450, 'color': '#EDFFC5'},
      "789": { x: 350, y: 450, 'color': '#EDFFC5'},
      "889": { x: 350, y: 750, 'color': '#EDFFC5'},
      "998": { x: 350, y: 750, 'color': '#888888'},
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

    this.direct = this.vis.append('g')
      .attr('class', 'direct')
      .attr('transform', 'translate(10,0)');
    this.direct.append('text')
      .attr('x', 55)
      .attr('y', 27)
      .attr('font-size', '14px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .style('cursor', 'pointer')
      .text('Directe uitgaven')
      .on('click', this.toggleDirect);
    this.direct.append('rect')
      .attr('width', 30)
      .attr('height', 17)
      .attr('x', 15)
      .attr('y', 13)
      .attr('rx', 9)
      .attr('ry', 9)
      .attr('fill', '#fff')
      .attr('fill-opacity', 1)
      .attr('stroke', '#aaa')
      .attr('stroke-width', 1);
    this.direct.append('circle')
      .attr('class', 'directCircle')
      .attr('cx', 23)
      .attr('cy', 22)
      .attr('r', 9)
      .attr('fill', '#000')
      .attr('fill-opacity', 1)
      .attr('stroke-width', 0);


    this.indirect = this.vis.append('g')
      .attr('class', 'direct')
      .attr('transform', 'translate(200,0)')
    this.indirect.append('text')
      .attr('x', 55)
      .attr('y', 27)
      .attr('font-size', '14px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Indirecte uitgaven')
      .style('cursor', 'pointer')
      .on('click', this.toggleIndirect);
    this.indirect.append('rect')
      .attr('width', 30)
      .attr('height', 17)
      .attr('x', 15)
      .attr('y', 13)
      .attr('rx', 9)
      .attr('ry', 9)
      .attr('fill', '#fff')
      .attr('fill-opacity', 1)
      .attr('stroke', '#aaa')
      .attr('stroke-width', 1);
    this.indirect.append('circle')
      .attr('class', 'indirectCircle')
      .attr('cx', 23)
      .attr('cy', 22)
      .attr('r', 9)
      .attr('fill', '#000')
      .attr('fill-opacity', 1)
      .attr('stroke-width', 0);

      this.countries = this.vis.append('g')
        .attr('class', 'countries')
        .attr('transform', 'translate(0,50)');
  };


  



  // FLOW
  ZzLocationVis.prototype.updateLegend = function(d) {

    var that = this;

    function setHiddenChildrenPosition(d, i){
      if(d._children){
        for (var y = 0;y < d._children.length;y++){
          that.group_centers[d._children[y].id]['y'] = 200 + (i * 150);
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
        .attr("transform", function(d, i) { return "translate(50," + (180 + (i * 190)) + ")"; })
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
      .attr("transform", function(d, i) { return "translate(50," + (180 + (i * 190)) + ")"; })
      .each(function(d,i){ 
        that.group_centers[d.id]['y'] = 200 + (i * 150);
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
    that.data = data.data.countries;
    that.regionData = data.data.regions;

    var maxvalue = d3.max(that.data, function(d) { return d.value + d.value2; });
    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, maxvalue]).range([2, 20]);

    that.data.forEach(function(d) {
      d.fill = d.color;
      d.x = that.group_centers[d.group]['x'] + ((Math.random() * 40) - 20);
      d.y = that.group_centers[d.group]['y'] + ((Math.random() * 40) - 20);
      d.radius = that.radius_scale(d.value + d.value2);
      d.stroke = '#fff';
      d.stroke_width = that.radius_scale(d.value2);
      d._stroke_width = d.stroke_width; 
      d._value2 = d.value2; 
    });

    that.nodes = that.data;
    that.force.nodes(that.nodes);

    // create / update bubbles, group them by region
    this.circles = that.countries.selectAll(".node")
      .data(that.nodes);

    this.circles.enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 0)
      .style("fill", function(d) { return d.fill; })
      .style("stroke", function(d) { return d.stroke; })
      .style("stroke-width", 0)
      .on("mouseover", that.mouseOver)
      .on('mouseout', that.mouseOut)
      .on('click', that.mouseClick)
      .call(that.force.drag);

    this.circles.transition()
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.fill; })
      .style("stroke", function(d) { return d.stroke; })
      .style("stroke-width", function(d) { return d.stroke_width; });

    this.circles.exit()
      .remove();


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
    this.updateRegionData();
  }


  ZzLocationVis.prototype.updateRegionData = function() {

    var that = this;

    var previousY = 0;

    that.regionData.forEach(function(d) {
      
      d.fill = that.group_centers[d.id].color;
      d.color = d.fill;
      d.x = 640;
      d.y = that.group_centers[d.id].y;
      // if(d.y == previousY){
        // d.radius = 0;
      // } else {
        d.radius = that.radius_scale(d.value);
      // }
      
      previousY = d.y;

      if(d.id == 998){
        d.x = 870;
        d.y = 501;
      }
    });

    var regionCircles = that.vis.selectAll(".regionNode")
      .data(that.regionData, function(d) { return d.id; });

    regionCircles.enter().append("circle")
      .attr("class", "regionNode")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 0)
      .style("fill", function(d) { return d.fill; })
      .style("stroke", function(d) { return d.stroke; })
      .style("stroke-width", function(d) { return d.stroke_width; })
      .on('click', that.mouseClick);

    regionCircles.exit()
      .attr("r", 0)
      .remove();

    regionCircles.transition()
      .duration(750)
      .attr("r", function(d) { return d.radius; })
      .attr("cy", function(d) { return d.y; })
      .style("fill", function(d) { return d.fill; })
      .style("stroke", function(d) { return d.stroke; })
      .style("stroke-width", function(d) { return d.stroke_width; });
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

  // HELPERS

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





  // LISTENERS
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
    geoLocationVis.updateRegionData();
  }

  ZzLocationVis.prototype.mouseOver = function(e){

    // show country id of all countries within this region
    var circlesInRegion = geoLocationVis.countries.selectAll(".nodeText")
      .data(geoLocationVis.nodes)
    .enter().append("text")
      .filter(function(d) { return d.group == e.group; })
      .attr("class", "nodeText")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr('style', 'text-anchor: middle;')
      .attr("dominant-baseline", "central")
      .attr('font-size', function(d){ return Math.round(d.radius + (d.stroke_width / 2)); })
      .attr('fill', '#444')
      .attr("pointer-events", "none")
      .text(function(d){ return d.id; });

  };

  ZzLocationVis.prototype.mouseOut = function(d){
    // hide country id's
    geoLocationVis.countries.selectAll('.nodeText').remove();
  };

  ZzLocationVis.prototype.mouseClick = function(d){
    // how details within the pop-up
    geoLocationVis.tooltip.showTooltip(d);
    d3.event.stopPropagation();
  }

  ZzLocationVis.prototype.toggleIndirect = function() {

    geoLocationVis.indirect.select('circle')
      .attr('cx', 38);

    // Update the nodes
    var node = geoLocationVis.vis.selectAll(".node")
      .data(geoLocationVis.data, function(d) { return d.id; });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
      .duration(750)
      .each(function(d){ 
        d.value2 = 0;
        d.radius = geoLocationVis.radius_scale(d.value + d.value2)
      })
      .style("r", function(d){
        return d.radius;
      })
      .style("stroke-width", function(d){
        return d.value2;
      });

  }

  ZzLocationVis.prototype.toggleDirect = function() {
    geoLocationVis.vis.selectAll('g.direct circle')
      .transition()
      .attr('x', 40);

    // Update the nodes…
    var node = geoLocationVis.vis.selectAll(".node")
      .data(geoLocationVis.data, function(d) { return d.id; });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
      .duration(750)
      .each(function(d){ 
        d.value2 = d._value2;
        d.stroke_width = geoLocationVis.radius_scale(d.value2);
        d.radius = geoLocationVis.radius_scale(d.value + d.value2)

      })
      .style("r", function(d){
        return d.radius;
      })
      .style("stroke-width", function(d){
        return d.stroke_width;
      });



  }



  // TOOPTIP
  function CustomTooltip(tooltipId, width){
    var tooltipId = tooltipId;
    $("body").append("<div class='zz_tooltip geovis' id='"+tooltipId+"'></div>");
    
    if(width){
      $("#"+tooltipId).css("width", width);
    }
    
    hideTooltip();

    

    
    function showTooltip(d){
      function abbreviatedValue(input){

        var out = '';
        var addDot = false;

        if(input > 999999999){
          out = (input / 1000000000).toFixed(2) + ' mld';
        } else if(input > 999999){
          out = (input / 1000000).toFixed(2) + ' mln';
        } else if(input > 1000){
          addDot = true;
        }else {
          out = input.toFixed(0); 
        }
        // openaid -> comma's
        out = out.replace('.', ',');

        if(addDot == true){
          input = input.toString();
          out = input.substring(0, (input.length - 3)) + '.' + input.substring((input.length - 3), input.length);
        }

        return '€ ' + out;
      }


      if (d.id === parseInt(d.id, 10))
          $("#"+tooltipId).html('<div class="tt-header" style="background-color:'+d.color+';">'+d.name+'</div><div class="tt-text">Niet aan land te relateren uitgaven: '+abbreviatedValue(d.value)+'</div>');
      else
          $("#"+tooltipId).html('<div class="tt-header" style="background-color:'+d.color+';">'+d.name+'</div><div class="tt-text">Directe uitgaven: '+abbreviatedValue(d.value)+'<br>Indirecte uitgaven: '+abbreviatedValue(d.value2)+'</div>');
      
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

      tttop = tttop - 140;
      ttleft = ttleft - 150;
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














