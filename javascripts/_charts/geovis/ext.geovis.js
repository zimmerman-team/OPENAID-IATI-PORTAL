var geoLocationVis = null;
ZzLocationVis = (function() {

  function ZzLocationVis(id) {
    this.init(id);
    geoLocationVis = this;
  }

  function shadeBlend(p,c0,c1) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
    if(c0.length>7){
        var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
        return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
    }else{
        var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
        return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
    }
  }

  // INIT
  ZzLocationVis.prototype.init = function(id) {

    this.vis = null;
    this.vis_id = id;
    this.layout_gravity = -0.001;
    this.damper = 0.04;
    this.chargeDistance = 100;
    this.friction = 0.9;
    this.circles = [];
    this.nodes = [];
    this.tooltip = CustomTooltip("sunburst_tooltip", 340);
    this.mapping = d3.layout.tree();
    this.mappingData = null;

    ZzLocationVis.prototype.charge = function(d) {
      return -Math.pow(d.radius + d.stroke_width, 2) / 16;
    };


    this.group_centers = {
      "89": { x: 350, y: 800, 'color': '#F6A000'},
      "298": { x: 350, y: 200, 'color': '#5598B5'},
      "189": { x: 350, y: 200, 'color': '#5598B5'},
      "289": { x: 350, y: 200, 'color': '#A6E4F4'},
      "498": { x: 350, y: 400, 'color': '#00BA96'},
      "380": { x: 350, y: 400, 'color': '#14EFC5'},
      "389": { x: 350, y: 400, 'color': '#C2FFF3'},
      "489": { x: 350, y: 400, 'color': '#C2FFF3'},
      "798": { x: 350, y: 600, 'color': '#4A671E'},
      "589": { x: 350, y: 600, 'color': '#8DB746'},
      "619": { x: 350, y: 600, 'color': '#C1F460'},
      "689": { x: 350, y: 600, 'color': '#ABDD1F'},
      "679": { x: 350, y: 600, 'color': '#EDFFC5'},
      "789": { x: 350, y: 600, 'color': '#EDFFC5'},
      "889": { x: 350, y: 1000, 'color': '#EDFFC5'},
      "998": { x: 650, y: 500, 'color': '#FF7373'},
      "r89": { x: 350, y: 800, 'color': '#F6A000'},
      "r298": { x: 640, y: 200, 'color': '#5598B5'},
      "r189": { x: 640, y: 200, 'color': '#5598B5'},
      "r289": { x: 640, y: 200, 'color': '#A6E4F4'},
      "r498": { x: 640, y: 400, 'color': '#00BA96'},
      "r380": { x: 640, y: 400, 'color': '#14EFC5'},
      "r389": { x: 640, y: 400, 'color': '#C2FFF3'},
      "r489": { x: 640, y: 400, 'color': '#C2FFF3'},
      "r798": { x: 640, y: 600, 'color': '#4A671E'},
      "r589": { x: 640, y: 600, 'color': '#8DB746'},
      "r619": { x: 640, y: 600, 'color': '#C1F460'},
      "r689": { x: 640, y: 600, 'color': '#ABDD1F'},
      "r679": { x: 640, y: 600, 'color': '#EDFFC5'},
      "r789": { x: 640, y: 600, 'color': '#EDFFC5'},
      "r889": { x: 640, y: 1000, 'color': '#EDFFC5'},
      "r998": { x: 860, y: 500, 'color': '#FF7373'},
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

    // init top
    var tophead = this.vis.append('rect')
      .attr('width', 740)
      .attr('height', 40)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);  

    // init right
    var righthead = this.vis.append('rect')
      .attr('width', 250)
      .attr('height', 40)
      .attr('x', 750)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);
    var right = this.vis.append('rect')
      .attr('width', 250)
      .attr('height', 990)
      .attr('x', 750)
      .attr('y', 50)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);

    // top labels
    var leftText = this.vis.append('text')
      .attr('x', 260)
      .attr('y', 27)
      .attr('font-size', '19px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Expenditure per region');

    var midText = this.vis.append('text')
      .attr('x', 545)
      .attr('y', 27)
      .attr('font-size', '19px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Unspecified per region');

    var rightText = this.vis.append('text')
      .attr('x', 780)
      .attr('y', 27)
      .attr('font-size', '19px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Worldwide unspecified');

    this.indirect = this.vis.append('g')
      .attr('class', 'direct')
      .attr('transform', 'translate(0,0)')
      .style('cursor', 'pointer')
      .on('click', this.toggleIndirect);
    this.indirect.append('text')
      .attr('x', 55)
      .attr('y', 25)
      .attr('font-size', '14px')
      .attr('fill', '#444')
      .attr('style', 'text-anchor: start;')
      .text('Indirect expenditure');
    this.indirect.append('rect')
      .attr('width', 30)
      .attr('height', 17)
      .attr('x', 15)
      .attr('y', 12)
      .attr('rx', 9)
      .attr('ry', 9)
      .attr('fill', '#fff')
      .attr('fill-opacity', 1)
      .attr('stroke', '#aaa')
      .attr('stroke-width', 1);
    this.indirect.append('circle')
      .attr('class', 'indirectCircle')
      .attr('cx', 38)
      .attr('cy', 21)
      .attr('r', 9)
      .attr('fill', '#00a99d')
      .attr('fill-opacity', 1)
      .attr('stroke-width', 0);

    this.regions_wrap = this.vis.append('g')
      .attr('class', 'regions-wrap')
      .attr('transform', 'translate(0,-20)');

    this.countries = this.regions_wrap.append('g')
      .attr('class', 'countries')
      .attr('transform', 'translate(0,-30)');
  };
  

  // FLOW
  ZzLocationVis.prototype.updateLegend = function(d) {

    var that = this;

    function setHiddenChildrenPosition(d, i, y){
      if(d._children){
        for (var z = 0;z < d._children.length;z++){
          that.group_centers[d._children[z].id]['y'] = y;
          that.group_centers['r' + d._children[z].id]['y'] = y;
          setHiddenChildrenPosition(d._children[z], i, y);
        }
      }
    }

    // Compute the new tree layout.
    var nodes = that.mapping(that.mappingData).slice(1);

    // get the nodes…
    var node = this.regions_wrap.selectAll("g.region")
        .data(nodes.slice(0, nodes.length - 1), function(d) { return d.id; });

    
    // Enter any new nodes
    var nodeEnter = node.enter().insert('g', ':first-child')
        .attr("class", "region")
        .attr('transform', function(d){
          return 'translate(0, ' + that.group_centers[d.id].y + ')';
        });

    //white bg
    var nodeEnterBg = nodeEnter.append('g')
      .attr("class", "background")
      .attr('x', -15)
        .attr('y', 1000);

    nodeEnterBg
      .insert('rect')
      .attr('class','bg')
      .attr('width', 740)
      .attr('height', 200)
      .attr('x', -15)
      .attr('y', -130)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);

    //region name, clickable

    var nodeEnterClick = nodeEnter.append('g')
        .attr('class',function(d){
          if(d._children) { return 'clickme'; }
        })
        .on("click", that.clickRegion)
        .on("mouseover", function(d){
          if(d._children) {
            d3.select(this).selectAll('rect').attr('fill','#e4e4e4');
          }
        })  
        .on('mouseout', function(d){
          if(d._children) {
            d3.select(this).selectAll('rect').attr('fill','#fff');
          }
        });    

      nodeEnterClick
        .append('text')
        .attr('x', function(d){ return 10 + ((d.depth - 1) * 15); })
        .attr('y', -54)
        .attr('font-size', '17px')
        .attr('fill', '#444')
        .attr('style', 'text-anchor: start;')
        .text(function(d){ return d.name; })
        .each(function(d){ d.textWidth = this.getBBox().width; });

      var nodeEnterTriangle = nodeEnterClick.append('g')
        .attr('class','triangle')
        .attr('transform', function(d) { return "translate(" +  (((d.depth - 1) * 15) + d.textWidth + 24) + ","+ -59 + ")"; } )

      nodeEnterTriangle
        .append("svg:path")
        .attr('class','arrow')
        .attr("d", d3.svg.symbol().type("triangle-up"))
        .attr("transform", "rotate(90)" )
        .style("fill", "#444")
        .attr('fill-opacity',function(d){
          if(d._children) {
            return "1";
          }
          else {
            return "0";
          }
        });

      nodeEnterClick
        .insert('rect', ':first-child')
        .attr('width', function(d){ 
          if(d._children) {
            return d.textWidth + 36;
          }
          else {
            return d.textWidth + 22;
          } 
        })
        .attr('height', 26)
        .attr('x', function(d){ return 0 + ((d.depth - 1) * 15); })
        .attr('y', -72)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('fill', '#fff');

      //legend stuff 'direct expenditure'
      var nodeEnterLegend = nodeEnter.append('g')
        .attr('class','legend');

      nodeEnterLegend
        .append('circle')
        .attr('cx', function(d){ return 12 + ((d.depth - 1) * 15); })
        .attr('cy', -29)
        .attr('r', 4)
        .attr('fill', function(d){return d.color; });
      nodeEnterLegend
        .append('text')
        .attr('x', function(d){ return 25 + ((d.depth - 1) * 15); })
        .attr('y', -24)
        .attr('font-size', '15px')
        .attr('fill', '#444')
        .attr('style', 'text-anchor: start;')
        .text('Direct expenditure')
        .each(function(d){ d.textWidth = this.getBBox().width; });
      nodeEnterLegend
        .insert('rect', ':first-child')
        .attr('width', function(d){ return d.textWidth + 37; })
        .attr('height', 20)
        .attr('x', function(d){ return 0 + ((d.depth - 1) * 15); })
        .attr('y', -39)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('fill', '#fff');

    //legend stuff 'indirect expenditure'
      nodeEnterLegend
        .append('circle')
        .attr('cx', function(d){ return 12 + ((d.depth - 1) * 15); })
        .attr('cy', -4)
        .attr('r', 6)
        .attr('fill', function(d){return shadeBlend(-0.6,d.color); });
      nodeEnterLegend
        .append('text')
        .attr('x', function(d){ return 25 + ((d.depth - 1) * 15); })
        .attr('y', 1)
        .attr('font-size', '15px')
        .attr('fill', '#444')
        .attr('style', 'text-anchor: start;')
        .text('Indirect expenditure')
        .each(function(d){ d.textWidth = this.getBBox().width; });
      nodeEnterLegend
        .insert('rect', ':first-child')
        .attr('width', function(d){ return d.textWidth + 37; })
        .attr('height', 20)
        .attr('x', function(d){ return 0 + ((d.depth - 1) * 15); })
        .attr('y', -14)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('fill', '#fff');


    var lastDepth = 0;
    var y = 0;


    // Transition nodes to their new position. 
    var nodeUpdate = node.transition()
      .duration(750)

      .attr("transform", function(d, i) { 
          // y = .legend item height
          if( ( d.depth != 1 && lastDepth == 1 ) || ( d.depth == 3 && lastDepth == 2) ) {
            y += 60;
          } else {
            y += 200;
          }
          lastDepth = d.depth;
          d.groupHeight = y;
          return "translate(15," + y + ")"; 
      })
      .each(function(d,i){ 


        that.group_centers[d.id]['y'] = d.groupHeight - 10;

        if(d.id != '998'){
          that.group_centers['r' + d.id]['y'] = that.group_centers[d.id]['y'];
        }

        setHiddenChildrenPosition(d, i, d.groupHeight - 10);
      });

    nodeUpdate.select(".arrow")
        .attr('transform',function(d){
          if( !d._children ) {
            return "rotate(180)";
          }
          else {
            return "rotate(90)";
          }
        });

    nodeUpdate.select("circle")
        .attr('r', 6)
        .attr('fill', function(d){return d.color; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    //bg adjust on expanded
    nodeUpdate.select("rect.bg")
        .attr('height', function(d,i) {
          if( 
            ( d.id == 298 ||
              d.id == 498 ||
              d.id == 798) && !d._children ) {
            return "90";
          }
          else if ( 
            d.id == 189 ||
            d.id == 380 ||
            d.id == 589 ||
            d.id == 689 ) {
            return "170";
          }
          else if ((d.id == 619 && d._children) || d.id == 489) {
            return "200";
          }
          else if (d.id == 619 && !d._children) {
            return "100";
          }
          else {
            return "190";
          }
        })
        .attr('y', function(d,i){
          if ( 
            d.id == 189 ||
            d.id == 380 ||
            d.id == 589 ||
            d.id == 689 ) {
            return "-100";
          }
          else if (d.id == 619 || d.id == 489 ) {
            return "-140";
          }
          else {
            return "-130";
          }
        });

    //hide legend if expanded with children
    nodeUpdate.select("g.legend")
        .attr("opacity", function(d, i) { 
          if( 
            ( d.id == 298 ||
              d.id == 498 ||
              d.id == 798 ||
              d.id == 619) && !d._children ) {
            return "0";
          }

        });        

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
    var countryData = data.data.countries;
    var regionData = data.data.regions;

    var maxvalue = d3.max(countryData, function(d) { return d.value + d.value2; });
    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, maxvalue]).range([2, 20]);

    countryData.forEach(function(d) {
      d.fill = d.color;
      d.x = that.group_centers[d.group]['x'] + ((Math.random() * 200) - 100);
      d.y = that.group_centers[d.group]['y'] + ((Math.random() * 120) - 60);
      d.radius = that.radius_scale(d.value + d.value2);
      d.stroke = shadeBlend(-0.6,d.color);
      d.stroke_width = that.radius_scale(d.value2);
      d._stroke_width = d.stroke_width; 
      d._value2 = d.value2;
      d.geoType = 'country'; 
    });

    regionData.forEach(function(d) {

      d.fill = shadeBlend(-0.6, d.color);
      d.group = 'r' + d.id;
      d.x = 500;
      if(d.id == 998){
        d.x = 860;
      }
      d.y = that.group_centers[d.group]['y'] + ((Math.random() * 120) - 60);
      d.radius = that.radius_scale(d.value);
      d.stroke = d.color;
      d.stroke_width = 0;
      d._value2 = d.value2;
      d._stroke_width = that.radius_scale(d._value2); 
      d.geoType = 'region';
    });

    that.nodes = countryData.concat(regionData);
    that.force = d3.layout.force().nodes(that.nodes);

    // create / update bubbles, group them by region
    that.circles = that.countries.selectAll(".node")
      .data(that.nodes);
    
    that.circles.enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 0)
      .style("fill", function(d) { return d.fill; })
      .style("stroke", function(d) { return d.stroke; })
      .style("stroke-width", 0)
      // .on("mouseover", that.mouseOver)
      // .on('mouseout', that.mouseOut)
      .on('click', that.mouseClick);
      // .call(that.force.drag);

    that.circles.transition()
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.fill; })
      .style("stroke", function(d) { return d.stroke; })
      .style("stroke-width", function(d) { return d.stroke_width; });

    that.circles.exit()
      .remove();

    // legend init
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    this.mappingData.children.forEach(collapse);

    // update cycle
    this.updateLegend(this.mappingData);
    this.update();
  }

  ZzLocationVis.prototype.update = function() {

    var that = this;
    that.force
      .gravity(this.layout_gravity)
      .charge(this.charge)
      // .theta(0.3)
      .friction(this.friction)
      .chargeDistance(this.chargeDistance)
      .on("tick", (function(_this) {
      return function(e) {
        return _this.circles
        .each(_this.move_towards_group(e.alpha)).attr("cx", function(d) {
          return d.x;
        }).attr("cy", function(d) {
          return d.y;
        });
      };
    })(this));


    var iters = 600; // You can get decent results from 300 if you are pressed for time
    var thresh = 0.001;
    that.force.start(); // Defaults to alpha = 0.1
    // for (var i = iters; i > 0; --i) {
    //     that.force.tick();
    //     if(that.force.alpha() < thresh) {
    //         //console.log("Reached " + force.alpha() + " for " + data.nodes.length + " node chart after " + (iters - i) + " ticks.");
    //         break;
    //     }
    // }
    // that.force.stop();
    setTimeout(function tick(){
        that.force.tick();
        if(that.force.alpha() >= .005);
            setTimeout(tick, 0);
    }, 0);


    function forwardAlpha(layout, alpha, max) {
      alpha = alpha || 0;
      max = max || 1000;
      var i = 0;
      while(layout.alpha() > alpha && i++ < max) layout.tick();
    }

  }

  // HELPERS  
  ZzLocationVis.prototype.move_towards_group = function(alpha) {
    return (function(_this) {
      return function(d) {
        var target = _this.group_centers[d.group];
        d.x = d.x + (target.x - d.x) * _this.damper * alpha * 1.1;
        return d.y = d.y + (target.y - d.y) * _this.damper * alpha * 2;
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
      .attr('fill', '#fff')
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

    var that = geoLocationVis;

    function endOfAnim(){
      that.update();
    }

    function endOfTransition(transition, callback) {
      var n = 0;
      transition.each(function() { ++n; })
      .each('end', function() {
      if (!--n) callback.apply(this, arguments);
      });
    }

    if (that.indirect.select('circle').attr('fill') != '#000000') {

        that.indirect.select('circle')
        .attr('cx', 23)
        .attr('fill', '#000000');

      // Update the nodes
      var node = that.vis.selectAll(".node");

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(750)
        .call(endOfTransition, endOfAnim)
        .each(function(d){ 
          if(d.geoType == 'country'){
            d.value2 = 0;
            d.stroke_width = 0;
            d.radius = that.radius_scale(d.value + d.value2);
          } else {
            d.value2 = d._value2;
            d.stroke_width = that.radius_scale(d.value2);
            d.radius = that.radius_scale(d.value + d.value2);
          }
        })
        .style("r", function(d){
          return d.radius;
        })
        .style("stroke-width", function(d){
          return d.stroke_width;
        });

    }else {
        that.indirect.select('circle')
        .attr('cx', 38)
        .attr('fill', '#00a99d');

      that.vis.selectAll('g.direct circle')
        .transition()
        .attr('x', 40);

      // Update the nodes…
      var node = that.vis.selectAll(".node");

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(750)
        .call(endOfTransition, endOfAnim)
        .each(function(d){ 
          

          if(d.geoType == 'country'){
            d.value2 = d._value2;
            d.stroke_width = that.radius_scale(d.value2);
            d.radius = that.radius_scale(d.value + d.value2);
          } else {
            d.value2 = 0;
            d.stroke_width = 0;
            d.radius = that.radius_scale(d.value + d.value2);
          }


        })
        .style("r", function(d){
          return d.radius;
        })
        .style("stroke-width", function(d){
          return d.stroke_width;
        });
    }
  }

  ZzLocationVis.prototype.toggleDirect = function() {
    geoLocationVis.indirect.select('circle')
      .attr('cx', 38)
      .attr('fill', '#00a99d');

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
    $("#openaid-main").append("<div class='zz_tooltip geovis' id='"+tooltipId+"'></div>");
    
    if(width){
      $("#"+tooltipId).css("width", width);
    }
    
    hideTooltip();

    

    
    function showTooltip(d){
      function abbreviatedValue(input){
        
        var curSymbol = '€ ';
        var out = '';
        var minus = input < 0;
        var addDot = false;
        input = Math.round(Math.abs(input));
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

        if(minus){
          return "-" + curSymbol + out;
        } else{
          return curSymbol + out;
        }
      }

      var frontColor = '#fff';
      var bgColor = d3.rgb(d.color);
      if((bgColor.r + bgColor.g + bgColor.b) > 650){
        frontColor = '#444';
      }

      if (d.id === parseInt(d.id, 10))
          $("#"+tooltipId).html('<div class="tt-header" style="background-color:'+d.color+';color:'+frontColor+';font-weight: 400;">'+d.name+'</div><div class="tt-text">Regional expenditure: '+abbreviatedValue(d.value)+'<br>'+'Indirect country expenditure: ' + abbreviatedValue(d._value2)+'<br><a style="pointer-events: all" href="'+home_url+'/regions/'+d.id+'/">Go to region page</a></div>');
      else
          $("#"+tooltipId).html('<div class="tt-header" style="background-color:'+d.color+';color:'+frontColor+';font-weight: 400;">'+d.name+'</div><div class="tt-text">Direct expenditure: '+abbreviatedValue(d.value)+'<br>Indirect expenditure: '+abbreviatedValue(d._value2)+'<br><a style="pointer-events: all" href="'+home_url+'/countries/'+d.id+'/">Go to country page</a></div>');
      
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
      ttleft = ttleft - 180;
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














