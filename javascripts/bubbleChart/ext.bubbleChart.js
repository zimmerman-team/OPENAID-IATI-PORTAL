

ZzBubbleChartLegenda = (function(){

  function ZzBubbleChartLegenda(data) {
    this.init();
  }

  ZzBubbleChartLegenda.prototype.init = function(){

  }

})();


ZzBubbleChart = (function() {

  function CustomTooltip(tooltipId, width){
    var tooltipId = tooltipId;
    $("body").append("<div class='bubble_tooltip' id='"+tooltipId+"'></div>");
    
    if(width){
      $("#"+tooltipId).css("width", width);
    }
    
    hideTooltip();
    
    function showTooltip(content, event){
      $("#"+tooltipId).html(content);
      $("#"+tooltipId).show();
      
      updatePosition(event);
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
       $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
    }
    
    return {
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      updatePosition: updatePosition
    }
  }




  function ZzBubbleChart() {
    this.init();
  }


  // init visualisation

  ZzBubbleChart.prototype.init = function() {
    this.width = 800;
    this.height = 400;
    this.paddingleft = 0;
    this.tooltip = CustomTooltip("scatter_tooltip", 240);
    this.center = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.layout_gravity = 0.02;
    this.damper = 0.06;
    this.vis = null;
    this.force = null;
    this.nodes = [];
    this.year = 2000;
    this.fill_color = d3.scale.ordinal().domain([100000, 200000, 300000, 500000, 1000000, 2000000]).range(["#FFDFBF", "#FFC688", "#FF7F00", "#DDD", "#999", "#444"]);
    this.vis = null;
    this.circles = null;
  };

  ZzBubbleChart.prototype.start = function() {
    return this.force = d3.layout.force().nodes(this.nodes).size([this.width, this.height]);
  };

  ZzBubbleChart.prototype.charge = function(d) {
    return -Math.pow(d.radius, 2) / 8;
  };

  ZzBubbleChart.prototype.update = function(year, data) {
    if (this.vis == null){
      this.vis = d3.select("#vis").append("svg").attr("width", this.width).attr("height", this.height).attr("padding-left", this.paddingleft).attr("id", "svg_vis");
    }
    this.nodes = data;
    this.update_nodes();
    this.update_year(year, 1000);

  }

  ZzBubbleChart.prototype.update_legenda = function(){

  }

  ZzBubbleChart.prototype.update_year = function(year, duration){
    if (this.vis == null){
      return false;
    }
    
    max_amount = d3.max(this.nodes, function(d) {
      return parseInt(d.aggregations[year]);
    });

    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([0, 50]);

    this.nodes.forEach((function(_this) {
      return function(d) {
        d.value = (typeof d.aggregations[year] === 'undefined') ? 1e-6 : parseInt(d.aggregations[year]);
        d.radius = _this.radius_scale(d.value);
        d.color_field = d.value;
      };
    })(this));

    this.update_circles(duration);
    this.start();
    this.display_group_all();
  }

  ZzBubbleChart.prototype.update_nodes = function(){

    this.nodes.forEach((function(_this) {
      return function(d) {
        d.id = d.code;
        d.x = Math.random() * 400;
        d.y = Math.random() * 250;
      };  
    })(this));
  }


  ZzBubbleChart.prototype.update_circles = function(duration){
    this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
      return d.id;
    });

    var  that = this;

    this.circles
      .enter()
      .append("circle")
      .attr("r", 0)
      .attr("fill", (function(_this) {
        return function(d) {
          return _this.fill_color(d.color_field);
        };
      })(this))
      .attr("fill-opacity", 0.8)
      .attr("stroke-width", 0)
      .attr("id", function(d) {
        return d.id;
      }).on("mouseover", function(d, i) {
        return that.show_details(d, i, this);
      }).on("mouseout", function(d, i) {
        return that.hide_details(d, i, this);
      }).on("click", function(d, i) {
        return that.go_to_detail_link(d, i, this);
      });

    this.circles
      .exit()
      .transition()
      .duration(duration)
      .attr("r", 1e-6)
      .remove();

    return this.circles.transition().duration(duration * 2).attr("r", function(d) {
      return d.radius;
    });

  }



  ZzBubbleChart.prototype.display_group_all = function() {

    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.92).on("tick", (function(_this) {
      return function(e) {

        return _this.circles.each(_this.move_towards_center(e.alpha))
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
      };
    })(this));
    this.force.start();

    return true;  
  };

  ZzBubbleChart.prototype.move_towards_center = function(alpha) {
    return (function(_this) {
      return function(d) {
        d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
        return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
      };
    })(this);
  };



  ZzBubbleChart.prototype.show_details = function(data, i, element) {
    var content;
    d3.select(element).attr("fill", "#333");
    content = "<div class='scatter-popup-wrapper'>";
    content += "<div class='scatter-popup-title'> " + data.name + "</div>";
    content += "<div class='scatter-popup-budget-header'>Budget<br>US$</div><div class='scatter-popup-budget-value'> $" + data.value + "</div>";
    content += "</div>";
    return this.tooltip.showTooltip(content, d3.event);
  };

  ZzBubbleChart.prototype.hide_details = function(data, i, element) {
    d3.select(element).attr("fill", (function(_this) {
      return function(d) {
        return d3.rgb(_this.fill_color(d.color_field));
      };
    })(this));
    return this.tooltip.hideTooltip();
  };

  ZzBubbleChart.prototype.go_to_detail_link = function(data, i, element) {
    return window.location.href = home_url + "/project/" + data.project_id + "/";
  };

  return ZzBubbleChart;

})();

