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
    this.mapping = d3.layout.hierarchy();
    this.mappingData = null;

    this.group_centers = {
      "89": { x: 250, y: 0},
      "298": { x: 250, y: 0},
      "189": { x: 250, y: 0},
      "289": { x: 250, y: 0},
      "498": { x: 250, y: 0},
      "380": { x: 250, y: 0},
      "389": { x: 250, y: 0},
      "489": { x: 250, y: 0},
      "798": { x: 250, y: 0},
      "589": { x: 250, y: 0},
      "619": { x: 250, y: 0},
      "689": { x: 250, y: 0},
      "679": { x: 250, y: 0},
      "789": { x: 250, y: 0},
      "889": { x: 250, y: 0},
      "998": { x: 250, y: 0},
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
      .attr('y', 30)
      .attr('font-size', '16px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Uitgaven per regio');

    var midText = this.vis.append('text')
      .attr('x', 545)
      .attr('y', 30)
      .attr('font-size', '16px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Ongespecificeerd per regio');

    var rightText = this.vis.append('text')
      .attr('x', 765)
      .attr('y', 30)
      .attr('font-size', '16px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Wereldwijd ongespecificeerd');
  };

  ZzLocationVis.prototype.setBubbleCenters = function(all_regions){
    var that = this;

    for(var i = 0;i < all_regions.length;i++){
      var region = all_regions[i];
      if(region.depth > 1){
        if(region.depth > 3){
          region = region.parent;
        }
        that.group_centers[all_regions[i].id]['y'] = that.group_centers[region.parent.id]['y']
      }
    }
  }

  ZzLocationVis.prototype.clickRegion = function(d){
   
    // check level, if 2 then collapse 3, if 1 then collapse 2
    console.log(d);

    // close others, open this
    d.open = true;
    geoLocationVis.update();

  }


  ZzLocationVis.prototype.updateLegend = function() {

    var that = this;
    this.mapping.children(function(d) { return d.children; });
    var all_regions = this.mapping(that.mappingData).slice(1);

    console.log(all_regions);


    this.mapping.children(function(d, depth) { 

      console.log(d);

      if(d.depth < 2){
        return d.children;
      }
      console.log(d.name);
      if(d.open){
        console.log('test');
        return d.children;
      }

      return null;

    });

    var mappingData = this.mapping(that.mappingData).slice(1);

    console.log(mappingData);

    var legendaItems = this.vis.selectAll('.legend')
      .data(mappingData);

    mappingData.forEach(function(d, i){
      that.group_centers[d.id]['y'] = 200 + (i * 150);
    });

    that.setBubbleCenters(all_regions);

    d3.transition().duration(750).each(function() {

      legendaItems.exit().transition()
          .style('fill-opacity', 0)
          .remove();

      legendaItems.enter()
        .append('circle')
        .attr('cx', 45)
        .attr('cy', function(d){ return that.group_centers[d.id]['y'] - 14; })
        .attr('r', 8)
        .attr('fill', function(d){return d.color; });

      legendaItems.enter()
        .append('text')
        .attr('x', 58)
        .attr('y', function(d){ return that.group_centers[d.id]['y'] - 8; })
        .attr('font-size', '16px')
        .attr('fill', '#444')
        .attr('style', 'text-anchor: start;')
        .text(function(d){ return d.name; })
        .each(function(d){ d.textWidth = this.getBBox().width; })
        .on('click', that.clickRegion);

      legendaItems.enter()
        .insert('rect', ':first-child')
        .attr('width', function(d){ return d.textWidth + 42; })
        .attr('height', 20)
        .attr('x', 30)
        .attr('y', function(d){ return that.group_centers[d.id]['y'] - 24; })
        .attr('rx', 13)
        .attr('ry', 13)
        .attr('fill', '#fff');

      legendaItems.transition()
          .style('fill-opacity', 0.7)
          .style('fill', '#fff');

    });



  }

  ZzLocationVis.prototype.update = function(data) {

    var that = this;

    if(data){
      that.mappingData = data.mapping;
      that.data = data.data;
    }

    this.updateLegend();

    var maxvalue = d3.max(that.data, function(d) { return d.total_disbursements; });
    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, maxvalue]).range([2, 20]);

    that.data.forEach(function(d) {
      d.id = d.country_id;
      d.group = d.region_id;
      d.fill = d.color;
      d.value = d.total_disbursements;
      d.x = that.group_centers[d.group]['x'];
      d.y = that.group_centers[d.group]['y'];
      d.radius = that.radius_scale(d.total_disbursements);
    });

    that.nodes = that.data;
    this.force.nodes(that.nodes);


    // create / update labels


    // create / update bubbles, group them by region
    this.circles = that.vis.selectAll(".node")
      .data(that.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.fill; })
      .style("stroke", function(d) { return d.fill; })
      .on('mouseover', that.mouseOver)
      .on('mouseout', that.mouseOut)
      .on('click', that.mouseClick)
      .call(that.force.drag);


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
    return -Math.pow(d.radius, 2) / 8;
  };

  ZzLocationVis.prototype.move_towards_year = function(alpha) {
    return (function(_this) {
      return function(d) {
        var target;
        target = _this.group_centers[d.group];
        // if(d.country_id == 'ID'){
          // console.log(d.x);
          // console.log(d.y);  
          // console.log(d.region_id);
          // console.log((target.y - d.y) * _this.damper * alpha);
          // console.log(_this.group_centers[d.group])};
        d.x = d.x + (target.x - d.x) * _this.damper * alpha * 1.1;
        return d.y = d.y + (target.y - d.y) * _this.damper * alpha * 2;
      };
    })(this);
  };

  ZzLocationVis.prototype.zoomIn = function(d){
    // check height that has to be added

    // move all bubbles below to new position

    // zoom in on the selected region

  };

  ZzLocationVis.prototype.zoomOut = function(d){
    
  };

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
    console.log(d);
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














