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

  function ZzBubbleChart(id, width, height, range) {
    this.init(id, width, height, range);
  }

  // init visualisation
  ZzBubbleChart.prototype.init = function(id, width, height, range) {
    this.vis = null;
    this.vis_id = id;

    this.width = (typeof width == 'undefined') ? 450 : width;
    this.height = (typeof height == 'undefined') ? 400 : height;
    this.range = (typeof range == 'undefined') ? [0, 50] : range;
    this.paddingleft = 0;
    this.tooltip = CustomTooltip("scatter_tooltip", 240);
    this.center = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.layout_gravity = 0.02;
    this.damper = 0.1;
    this.force = null;
    this.nodes = [];
    this.year = 2015;
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
 
    var vis_id = this.vis_id;
    var that = this;
    if (this.vis == null){
      this.vis = d3.select("#" + vis_id).append("svg").attr("width", this.width).attr("height", this.height).attr("padding-left", this.paddingleft).attr("id", "inner-"+vis_id);
      
      if(this.vis[0][0] == null){
        setTimeout(function(){ 
          that.vis = d3.select("#" + vis_id).append("svg").attr("width", that.width).attr("height", that.height).attr("padding-left", that.paddingleft).attr("id", "inner-"+vis_id);
          that.nodes = data;
          that.update_nodes();
          that.update_year(year, 1000);
        }, 500);
      }

    }
    this.nodes = data;
    // this.update_nodes();
    this.update_year(year, 1000);
  }

  ZzBubbleChart.prototype.update_legenda = function(){

  }
  ZzBubbleChart.prototype.update_year = function(year, duration){
   
    if (this.vis == null){
      return false;
    }

    var that = this;
    
    max_amount = d3.max(this.nodes, function(d) {
      return parseInt(d.aggregations[year]);
    });

    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range(that.range);

    this.nodes.forEach((function(_this) {
      return function(d) {
        d.value = (typeof d.aggregations[year] === 'undefined') ? 1e-6 : parseInt(d.aggregations[year]);
        d.radius = _this.radius_scale(d.value);
        d.color_field = d.code; //d.value;
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
        d.x = 360 + (Math.random() * 100);
        d.y = 150 + (Math.random() * 100);
      };  
    })(this));
  }

  ZzBubbleChart.prototype.update_circles = function(duration){
    if(this.force != null){  
      this.force.stop();
    }
    var  that = this;
    this.circles = this.vis.selectAll("circle").data(that.nodes, function(d) {
      return d.id;
    });

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

    return this.circles.interrupt().transition().duration(duration * 2).attr("r", function(d) {
      return d.radius;
    });

  }
  loaded = false;
  ZzBubbleChart.prototype.display_group_all = function() {
   
    //this.force.resume();
    //d3.event.stopPropagation();
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
    this.force.start()
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

    function comma_formatted(amount) {
      sep = ",";

      if (amount){
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
      } else {
        return "-";
      }
    }

    var content;
    d3.select(element).attr("fill", "#333");
    content = "<div class='scatter-popup-wrapper'>";
    content += "<div class='scatter-popup-title'> " + data.name + "</div>";
    content += "<div class='scatter-popup-budget-header'>Budget<br></div><div class='scatter-popup-budget-value'> €" + comma_formatted(data.value) + "</div>";
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
    console.log(data);
    console.log(home_url + "/"+data.detail_url+"/" + data.code + "/");
    return window.location.href = home_url + "/"+data.detail_url+"/" + data.code + "/";
  };

  return ZzBubbleChart;

})();

