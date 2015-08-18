var sunburst = null;

ZzSunburst = (function() {

  function ZzSunburst(id) {
    this.init(id);
    sunburst = this;
  }

  ZzSunburst.prototype.init = function(id) {

    var that = this;
    this.zooming = false;
    this.vis = null;
    this.vis_id = id;
    this.tooltip = CustomTooltip("sunburst_tooltip", 120);
    this.state = 0;
    var margin = {top: 270, right: 480, bottom: 270, left: 480};
    this.radius = 250;

    this.vis = d3.select('#' + id).append('svg')
        .attr('width', 1000)
        .attr('height', 700)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('version', '1.1')
        .attr('viewBox', '0 0 1000 500')
      .append('g')
        .attr('transform', 'translate(670,390)');

    this.legend = d3.select('#' + id + ' svg')
      .append('g')
        .attr('transform', 'translate(20,100)');

    this.breadcrumb = d3.select('#' + id + ' svg')
      .append('g')
        .attr('transform', 'translate(20,30)');

  };

  ZzSunburst.prototype.getRoot = function(p){
    if(p.hasOwnProperty('parent')){
      return this.getRoot(p.parent);
    } else {
      return p;
    }
  };

  ZzSunburst.prototype.getLevel = function(p, recursiveDepth){
    if(p.hasOwnProperty('parent')){
      recursiveDepth++;
      return this.getLevel(p.parent, recursiveDepth);
    } else {
      return recursiveDepth;
    }
  };

  ZzSunburst.prototype.arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx - .01 / (d.depth + .5); })
    .innerRadius(function(d) { return sunburst.radius / 3 * d.depth; })
    .outerRadius(function(d) { return sunburst.radius / 3 * (d.depth + 1) - 1; });

  ZzSunburst.prototype.arcTween = function(b) {
    var i = d3.interpolate(this._current, b);
    this._current = i(0);
    return function(t) {
      return sunburst.arc(i(t));
    };
  };

  ZzSunburst.prototype.updateArc = function(d) {
    return {depth: d.depth, x: d.x, dx: d.dx};
  };

  ZzSunburst.prototype.mouseOverPath = function(d){
    console.log(sunburst.zooming);
    if (sunburst.zooming) return false;
    console.log('hovering');

    sunburst.tooltip.showTooltip(d);
    sunburst.middleAmount.text(d.abbreviatedValue);
    sunburst.middleAmount.attr('fill', d.color);

    if(sunburst.state == 0){

      // focus on sector, fade out others
      var curpath = sunburst.vis.selectAll('path').data([d], function(d) { return d.key; });

      d3.transition().duration(250).each(function() {
        curpath.exit().transition()
            .style("fill-opacity", 0.3)
            .style('fill', '#fff');
        curpath.transition()
            .style("fill-opacity", 1)
            .style('fill', d.fill);
      });
    }
  };

  ZzSunburst.prototype.mouseOutPath = function(d){
     if (sunburst.zooming) return false;
     
    var root = sunburst.getRoot(d);
    sunburst.tooltip.hideTooltip();
    sunburst.middleAmount.text(root.abbreviatedValue);
    sunburst.middleAmount.attr('fill', '#fff');

    // return colors on all
    path = sunburst.vis.selectAll('path');
    
    // on state 0 show with 0.3 opacity
    // else show full
    var fillOpacity = 0.3;
    if(sunburst.state > 0) fillOpacity = 1;

    d3.transition().duration(250).each(function() {
      
      path.transition()
        .style('fill', function(d) { return d.color; })
        .style("fill-opacity", fillOpacity);
    });
  }

  ZzSunburst.prototype.update = function(root) {
    var that = this;

    var testcolor = 100;

    function key(d) {
      var k = [], p = d;
      while (p.depth) k.push(p.name), p = p.parent;
      return k.reverse().join(".");
    }

    function fill(d) {

      var color = null;

      if(d.depth == 1) color = d.color
      if(d.depth == 2) color = d.parent.color
      if(d.depth == 3) color = d.parent.parent.color

      var d3color = d3.lab(color);

      if(d.depth == 2) d3color = d3color.darker()
      if(d.depth == 3) d3color = d3color.darker().darker()

      // testcolor = testcolor - 1;
      // if((d3color.l - testcolor) > 0){
      //   d3color.l = d3color.l - testcolor;
      // }

      return d3color;
    }

    function abbreviatedValue(d){

      if(d.value > 999999999){
        return (d.value / 1000000000).toFixed(2) + ' mld';
      } else if(d.value > 999999){
        return (d.value / 1000000).toFixed(2) + ' mln';
      } else{
        return (d.value / 1000).toFixed(2) + ' d'; 
      }
    }

    this.partition = d3.layout.partition()
        .sort(function(a, b) { return d3.ascending(a.name, b.name); })
        .size([2 * Math.PI, that.radius]);

    
    
    // Compute the initial layout on the entire tree to sum sizes.
    // Also compute the full name and fill color for each node,
    // and stash the children so they can be restored as we descend.
    this.partition
        .value(function(d) { return d.total_disbursements; })
        .nodes(root)
        .forEach(function(d) {
          d._children = d.children;
          d.sum = d.value;
          d.key = key(d);
          d.fill = fill(d);
          d.color = d.fill;
          d.abbreviatedValue = abbreviatedValue(d);
        });

    // Now redefine the value function to use the previously-computed sum.
    this.partition
        .children(function(d, depth) { return depth < 1 ? d._children : null; })
        .value(function(d) { return d.sum; });

    this.outer_circle = that.vis.append("circle")
        .attr("r", that.radius - 48)
        .attr('fill', 'transparent')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);

    this.center = that.vis.append("circle")
        .attr("r", that.radius / 3)
        .attr('fill', 'transparent')
        .on("click", zoomOut);

    this.middleAmount = that.vis.append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr("font-size", "32px")
        .attr('fill', '#fff')
        .attr('style', 'text-anchor: middle;')
        .text(root.abbreviatedValue);

    var path = this.vis.selectAll("path")
        .data(that.partition.nodes(root).slice(1))
        .enter().append("path")
        .attr("d", sunburst.arc)
        .style("fill", function(d) { return d.fill; })
        .attr("opacity", 1)
        .each(function(d) { this._current = sunburst.updateArc(d); })
        .on("click", zoom)
        .on("mouseover", that.mouseOverPath)
        .on("mouseout", that.mouseOutPath);

    this.updateLegenda(root);
    this.updateBreadcrumb(root);

    function zoomOut(p) {
      if (document.documentElement.__transition__) return;
      if(p == undefined){ return false; }
      sunburst.updateBreadcrumb(p.parent);

      var level = sunburst.getLevel(p, 0);
      sunburst.state = level - 1;
      sunburst.outer_circle.transition().duration(1000).ease('back').attr("r", sunburst.radius - 48);

      path = path.data(sunburst.partition.nodes(p.parent).slice(1), function(d) { return d.key; });

      // Rescale outside angles to match the new layout.
      var outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);
      outsideAngle.range([p.x, p.x + p.dx]);
      
      var enterArc = function insideArc(d) {
        return p.key > d.key
            ? {depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
            ? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0} : {depth: 0, x: 0, dx: 2 * Math.PI};
      }

      var exitArc = function outsideArc(d) {
        return {depth: d.depth + 1, x: outsideAngle(d.x), dx: 0};
      }

      d3.transition().duration(d3.event.altKey ? 7500 : 750).each(function() {

 
        path.exit().transition()
          .attrTween("d", function(d) { return sunburst.arcTween.call(this, exitArc(d)); })
          .remove();

        path.enter().append("path")
            .style("fill-opacity", function(d) { return d.depth === 1; })
            .style("fill", function(d) { return d.fill; })
            .on("click", zoom)
            .on("mouseover", that.mouseOverPath)
            .on("mouseout", that.mouseOutPath)
            .each(function(d) { this._current = enterArc(d); });

        path.transition()
            .style("fill-opacity", 0.3)
            .attrTween("d", function(d) { return sunburst.arcTween.call(this, sunburst.updateArc(d)); });
      });


    }

    function zoom(p){
      sunburst.zooming = true;
      return p.depth == 0 ? zoomOut(p) : zoomIn(p);
    }

    function zoomIn(p){
      if (document.documentElement.__transition__) return;
      sunburst.updateBreadcrumb(p);
      sunburst.tooltip.hideTooltip();

      var level = sunburst.getLevel(p, 0);
      sunburst.state = level;
      console.log(level);

      if(level == 1){
        path = path.data(sunburst.partition.nodes(p), function(d) { return d.key; });
      }

      if(level == 2){
        sunburst.outer_circle.transition().duration(2500).ease('elastic').attr("r", sunburst.radius + 30);
        path = path.data(sunburst.partition.children(function(d, depth) { return depth < 1 || p.name == d.name ? d._children : null; }).nodes(p.parent), function(d) { return d.key; });
      }

      if(level == 3){
        return false;
      }

      // Rescale outside angles to match the new layout.
      var outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);
      outsideAngle.range([p.x, p.x + p.dx]);
      
      var exitArc = function insideArc(d) {
        return p.key > d.key
            ? {depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
            ? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0} : {depth: 0, x: 0, dx: 2 * Math.PI};
      }

      var enterArc = function outsideArc(d) {
        return {depth: d.depth, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x)};
      }

      d3.transition().duration(d3.event.altKey ? 7500 : 750).each(function() {

        if (level == 2){

          path.exit().transition()
            .attrTween("d", function(d) { return sunburst.arcTween.call(this, exitArc(d)); })
            .remove();

          path.enter().append("path")
              .style("fill-opacity", function(d) { return 1; })
              .style("fill", function(d) { return d.color; })
              .on("click", zoom)
              .on("mouseover", that.mouseOverPath)
              .on("mouseout", that.mouseOutPath)
              .each(function(d) { this._current = enterArc(d); });

          path.transition()
              .style("fill-opacity", 1)
              .style("fill", function(d) { return d.color; })
              .attrTween("d", function(d) { return sunburst.arcTween.call(this, sunburst.updateArc(d)); });

        } else {

          path.exit().transition()
            .style("fill-opacity", function(d) { return d.depth === 2; })
            .attrTween("d", function(d) { return sunburst.arcTween.call(this, exitArc(d)); })
            .remove();

          path.enter().append("path")
              .style("fill-opacity", function(d) { return d.depth === 1; })
              .style("fill", function(d) { return d.fill; })
              .on("click", zoom)
              .on("mouseover", that.mouseOverPath)
              .on("mouseout", that.mouseOutPath)
              .each(function(d) { this._current = enterArc(d); });

          path.transition()
              .style("fill-opacity", 1)
              .attrTween("d", function(d) { return sunburst.arcTween.call(this, sunburst.updateArc(d)); });
        }

      });
    }

    // When zooming out, arcs enter from the inside and exit to the outside.
    // Exiting outside arcs transition to the new layout.
    // if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);
  }

  ZzSunburst.prototype.updateLegenda = function(d) {

    var legendaData = [];

    for(var i = 0;i < d.children.length;i++){
      legendaData.push(d.children[i]);
    }

    function mouseOverLegend(d){
      sunburst.mouseOverPath(d);
    }

    var legend = this.legend.selectAll('rect').data(legendaData);
        
    legend.enter()
      .append('circle')
      .attr('cx', 18)
      .attr('cy', function(d, i){ return 13 + (i * 40); })
      .attr('r', 8)
      .attr('fill', function(d){return d.color; });

    legend.enter()
      .append('text')
      .attr('x', 30)
      .attr('y', function(d, i){ return 19 + (i * 40); })
      .attr('font-size', '16px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text(function(d){return d.name; })
      .each(function(d){ d.textWidth = this.getBBox().width; })
      .on('mouseover', mouseOverLegend);

    legend.enter()
      .insert('rect', ':first-child')
      .attr('width', function(d){ return d.textWidth + 42; })
      .attr('height', 26)
      .attr('x', 0)
      .attr('y', function(d, i){ return i * 40; })
      .attr('rx', 13)
      .attr('ry', 13)
      .attr('fill', '#fff');

    d3.transition().duration(750).each(function() {

      legend.exit().transition()
          .style('fill-opacity', 0)
          .remove();

      legend.enter().append('text')
          .style('fill-opacity', 0.7)
          .style('fill', '#fff');

      legend.transition()
          .style('fill-opacity', 0.7)
          .style('fill', '#fff');

    });
  }


  ZzSunburst.prototype.updateBreadcrumb = function(p) {

    function getAncestors(node) {
      var path = [];
      var current = node;
      while (current.parent) {
        path.unshift(current);
        current = current.parent;
      }
      path.unshift(current);
      return path;
    }

    function breadCrumbOffsetSum(node){
      var length = 0;
      var current = node;
      var count = 0;

      while(current.parent){
        current = current.parent;
        length += current.textWidth + 29;
      }
      

      return length;
    }

    function breadcrumbPoints(d, i) {

      b.w = d.textWidth + 24;

      var points = [];
      points.push("0,0");
      points.push(b.w + ",0");
      points.push(b.w + b.t + "," + (b.h / 2));
      points.push(b.w + "," + b.h);
      points.push("0," + b.h);
      if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
        points.push(b.t + "," + (b.h / 2));
      }
      return points.join(" ");
    }

    nodeArray = getAncestors(p);

    var b = {
      w: 123, h: 30, s: 3, t: 10
    };

    // Data join; key function combines name and depth (= position in sequence).
    var g = sunburst.breadcrumb.selectAll("g")
        .data(nodeArray, function(d) { return d.name + d.depth; });

    // Add breadcrumb and label for entering nodes.
    var entering = g.enter().append("svg:g");

    entering
        .append("svg:text")
        .attr("x", 16)
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "left")
        .attr("fill", "#fff")
        .text(function(d) { return d.name; })
        .each(function(d){ d.textWidth = this.getBBox().width; });

    entering
        .insert('svg:polygon', ':first-child')
        .attr("points", breadcrumbPoints)
        .style("fill", function(d) { return d.color; });

    // Set position for entering and updating nodes.
    g.attr("transform", function(d, i) {
        return "translate(" + breadCrumbOffsetSum(d) + ", 0)";
    });

    // Remove exiting nodes.
    g.exit().remove();

    // Make the breadcrumb trail visible, if it's hidden.
    sunburst.breadcrumb.style("visibility", "");
  }




  return ZzSunburst;
})();













function CustomTooltip(tooltipId, width){
  var tooltipId = tooltipId;
  $("body").append("<div class='zz_tooltip' id='"+tooltipId+"'></div>");
  
  if(width){
    $("#"+tooltipId).css("width", width);
  }
  
  hideTooltip();
  
  function showTooltip(d){
    $("#"+tooltipId).html('<div class="tt-header" style="background-color:'+d.color+';">'+d.name+'</div><div class="tt-text">'+d.abbreviatedValue+'</div>');
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


