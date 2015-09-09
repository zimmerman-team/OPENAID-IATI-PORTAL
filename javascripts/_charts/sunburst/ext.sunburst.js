var sunburst = null;

ZzSunburst = (function() {

  function ZzSunburst(id) {
    this.init(id);
    // ugly
    sunburst = this;
  }

  ZzSunburst.prototype.init = function(id) {
    var that = this;
    this.zooming = false;
    this.vis = null;
    this.vis_id = id;
    this.tooltip = CustomTooltip("sunburst_tooltip", 180);
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


    this.outer_circle = that.vis.append("circle")
        .attr("r", that.radius - 48)
        .attr('fill', 'transparent')
        .style('pointer-events', 'none')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);

    this.center = that.vis.append("circle")
        .attr("r", that.radius / 3)
        .attr('fill', 'transparent')
        .on("click", that.zoomOut);

    this.middleAmount = that.vis.append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr("font-size", "32px")
        .attr('fill', '#ccc')
        .attr('style', 'text-anchor: middle;');

  };

  // HELPERS
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

  // LISTENERS
  ZzSunburst.prototype.mouseOverPath = function(d){
    if (sunburst.zooming) return false;

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

    var that = sunburst;
    if (that.zooming) return false;
     
    var root = that.getRoot(d);
    that.middleAmount.text(root.abbreviatedValue);
    that.middleAmount.attr('fill', '#ccc');

    // return colors on all
    path = that.vis.selectAll('path');

    // on state 0 show with 0.3 opacity
    // else show full
    var fillOpacity = 0.3;
    if(that.state > 0) fillOpacity = 1;

    d3.transition().duration(250).each(function() {
      
      path.transition()
        .style('fill', function(d) { return d.color; })
        .style("fill-opacity", fillOpacity);
    });
  }

  // MAIN FUNC
  ZzSunburst.prototype.update = function(root) {
    var that = this;

    // make sure zoom is at 0
    sunburst.state = 0;
    sunburst.zooming = true;


    function key(d) {
      var k = [], p = d;
      while (p.depth) k.push(p.name), p = p.parent;
      return k.reverse().join(".");
    }

    function fill(d) {

      var color = null;

      if(d.depth == 1) color = d.color
      if(d.depth == 2) color = d.parent.color
      if(d.depth == 3) color = d.parent.color

      var d3color = d3.hsl(color)

      if(d.depth == 2) d3color = d3color.darker(0.3)
      if(d.depth == 3) d3color = d3color.darker(0.7)
      if(d.depth > 1) { 
        d3color.s = 1 - (Math.random() / 2);
        d3color.l = (Math.random() / 2) + 0.2;
      }
      
      return d3color;
    }

    function abbreviatedValue(d){

      var out = '';
      var addZeros = false;
      var input = d.value;

      if(input > 999999999){
        out = (input / 1000000000).toFixed(2) + ' mld';
      } else if(input > 999999){
        out = (input / 1000000).toFixed(2) + ' mln';
      } else{
        addZeros = true;
        out = (input / 1000).toFixed(0); 
      }
      out = out.replace('.', ',');
      if(addZeros) out += '.000';
      return '€ ' + out;
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
          d.id = d.sector_id;
        });

    this.partition
        .value(function(d) { return d.sum; });

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);    
        d.children = null;
      }
    }

    root.children.forEach(collapse);

    this.middleAmount.text(root.abbreviatedValue);

    this.path = this.vis.selectAll("path")
        .data(that.partition.nodes(root).slice(1));

    this.path
        .enter().append("path")
        .attr("d", that.arc)
        .style("fill", function(d) { return d.fill; })
        .attr("fill-opacity", 0.3)
        .each(function(d) { this._current = that.updateArc(d); })
        .on("click", that.zoom)
        .on("mouseover", that.mouseOverPath)
        .on("mouseout", that.mouseOutPath);

    this.path.transition()
        .attr("d", that.arc)
        .style("fill", function(d) { return d.fill; })
        .attr("fill-opacity", 0.3)
        .attrTween("d", function(d) { return that.arcTween.call(this, that.updateArc(d)); });

    this.path.exit().remove();

    this.updateLegend(root);
    this.updateBreadcrumb(root);

    setTimeout(function(){ sunburst.zooming = false; }, 800);

    // When zooming out, arcs enter from the inside and exit to the outside.
    // Exiting outside arcs transition to the new layout.
    // if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);
  }

  ZzSunburst.prototype.zoom = function(p){

    var that = sunburst;
    var level = that.getLevel(p, 0);
    if(that.zooming || level == 3){
      return false;
    }

    that.zooming = true;
    return that.state == 0 || level > 1 ? that.zoomIn(p) : that.zoomOut(p);
  }

  ZzSunburst.prototype.zoomIn = function(p){

    p.children = p._children;
    var parentX = p.x;

    var that = sunburst;

    that.updateLegend(p);
    that.updateBreadcrumb(p);
    that.tooltip.hideTooltip();

    var level = sunburst.getLevel(p, 0);
    that.state = level;

    if(that.state == 1){
      that.middleAmount.attr('opacity', 0);
    }

    if(level == 1){
      that.path = that.path.data(that.partition.nodes(p), function(d) { return d.key; });
      var enterArc = function outsideArc(d) {
        return {depth: 1, x: parentX, dx: 0};
      }
    }

    if(level == 2){
      that.outer_circle.transition().duration(2500).ease('elastic').attr("r", that.radius + 30);
      that.path = that.path.data(that.partition.nodes(p.parent), function(d) { return d.key; });

      var enterArc = function outsideArc(d) {
        return {depth: d.depth - 1, x: d.parent.x, dx: 0};
      }
    }

    // Rescale outside angles to match the new layout.
    var outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);
    outsideAngle.range([p.x, p.x + p.dx]);
    
    var exitArc = function insideArc(d) {
      return p.key > d.key
          ? {depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
          ? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0} : {depth: 0, x: 0, dx: 2 * Math.PI};
    }

    

    d3.transition()
      .duration(d3.event.altKey ? 7500 : 750)
      .call(that.endOfTransition, that.endOfZoom)
      .each(function() {

        if (level == 2){

          that.path.exit().transition()
            .attrTween("d", function(d) { return that.arcTween.call(this, exitArc(d)); })
            .remove();

          that.path.enter().insert("path", ":first-child")
              .style("fill-opacity", function(d) { return 1; })
              .style("fill", function(d) { return d.color; })
              .on("click", that.zoom)
              .on("mouseover", that.mouseOverPath)
              .on("mouseout", that.mouseOutPath)
              .each(function(d) { this._current = enterArc(d); });

          that.path.transition()
              .style("fill-opacity", 1)
              .style("fill", function(d) { return d.color; })
              .attrTween("d", function(d) { return that.arcTween.call(this, that.updateArc(d)); });

        } else {

          that.path.exit().transition()
            .style("fill-opacity", function(d) { return d.depth === 2; })
            .attrTween("d", function(d) { return that.arcTween.call(this, exitArc(d)); })
            .remove();

          that.path.enter().append("path")
              .style("fill-opacity", function(d) { return d.depth === 1; })
              .style("fill", function(d) { return d.fill; })
              .on("click", that.zoom)
              .on("mouseover", that.mouseOverPath)
              .on("mouseout", that.mouseOutPath)
              .each(function(d) { this._current = enterArc(d); });

          that.path.transition()
              .style("fill-opacity", 1)
              .attrTween("d", function(d) { return that.arcTween.call(this, that.updateArc(d)); });
        }

    });
    

    if(level == 2 && sunburst.state == 2){
      p.children = null;
    }
  }


  ZzSunburst.prototype.zoomOut =function(p) {
      if(p == undefined){ return false; }

      var that = sunburst;

      p.children = null;   
      that.middleAmount.attr('opacity', 1);

      that.updateLegend(p.parent);
      that.updateBreadcrumb(p.parent);

      var level = that.getLevel(p, 0);
      that.state = level - 1;

      that.outer_circle.transition().duration(1000).ease('back').attr("r", that.radius - 48);

      that.path = that.path.data(that.partition.nodes(p.parent).slice(1), function(d) { return d.key; });

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

      d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .call(that.endOfTransition, that.endOfZoom)
        .each(function() {

          that.path.exit().transition()
            .attrTween("d", function(d) { return that.arcTween.call(this, exitArc(d)); })
            .remove();

          that.path.enter().append("path")
              .style("fill-opacity", function(d) { return d.depth === 1; })
              .style("fill", function(d) { return d.fill; })
              .on("click", that.zoom)
              .on("mouseover", that.mouseOverPath)
              .on("mouseout", that.mouseOutPath)
              .each(function(d) { this._current = enterArc(d); });

          that.path.transition()
              .style("fill-opacity", 0.3)
              .attrTween("d", function(d) { return that.arcTween.call(this, that.updateArc(d)); });
      });

  }

  ZzSunburst.prototype.endOfZoom = function(){
    sunburst.zooming = false;
  }

  ZzSunburst.prototype.endOfTransition = function(transition, callback) {
    var n = 0;
    transition.each(function() { ++n; })
      .each('end', function() {
        if (!--n) callback.apply(this, arguments);
      });
  }

  ZzSunburst.prototype.updateLegend = function(d) {

    var that = this;
    var level = sunburst.getLevel(d, 0);

    if(sunburst.state == 0 || level == 0){
      var legendItems = that.partition(d);
    } else if(sunburst.state == 1 || sunburst.state == 2){
      var testpartition = d3.layout.partition();
      var legendItems = testpartition(d.parent);
    }

    var legendItem = this.legend.selectAll("g.legendItem")
        .data(legendItems, function(d) { return d.id; });

    var legendItemEnter = legendItem.enter().append("g")
        .attr("class", "legendItem")
        .attr("transform", function(d, i) { return "translate(" + (d.depth * 15) + "," + (10 + (i * 30)) + ")"; })
        .on("mouseover", that.mouseOverPath)
        .on("mouseout", that.mouseOutPath)
        .on("click", function(d){ window.open(home_url + '/sectors/' +d.sector_id+ '/'); });

    legendItemEnter
      .append('circle')
      .attr('cx', 12)
      .attr('cy', -5)
      .attr('r', 4)
      .attr('fill', function(d){return d.color; });

    legendItemEnter
      .append('text')
      .attr('x', 25)
      .attr('y', 0)
      .attr('font-size', '16px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text(function(d){ return d.name; })
      .each(function(d){ d.textWidth = this.getBBox().width; });

    legendItemEnter
      .insert('rect', ':first-child')
      .attr('width', function(d){ return d.textWidth + 42; })
      .attr('height', 20)
      .attr('x', 0)
      .attr('y', -15)
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('fill', '#fff');

    // Transition nodes to their new position.
    var nodeUpdate = legendItem.transition()
      .duration(750)
      .attr("transform", function(d, i) { return "translate(" + (d.depth * 15) + "," + (10 + (i * 30)) + ")"; });

    nodeUpdate.select("circle")
        .attr('r', 6)
        .attr('fill', function(d){return d.color; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);


    // Transition exiting nodes to the parent's new position.
    var nodeExit = legendItem.exit().transition()
        .duration(750)
        .attr("opacity", 1e-6)
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

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


  function CustomTooltip(tooltipId, width){
    var tooltipId = tooltipId;
    $("#openaid-main").append("<div class='zz_tooltip' id='"+tooltipId+"'></div>");
    
    if(width){
      $("#"+tooltipId).css("width", width);
    }
    
    hideTooltip();
    
    function showTooltip(d){
      $("#"+tooltipId).html('<div class="tt-header" style="background-color:'+d.color+';">'+d.name+'</div><div class="tt-text">'+d.abbreviatedValue+'<br><a style="pointer-events: all" target="_blank" href="'+home_url+'/sectors/'+d.sector_id+'/">Go to sector page</a></div>');
      
      updatePosition(d3.event);
      $("#"+tooltipId).show(0);
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

  return ZzSunburst;
})();

