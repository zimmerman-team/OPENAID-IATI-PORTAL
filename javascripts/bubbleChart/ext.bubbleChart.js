var BubbleChart, root,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

BubbleChart = (function() {
  function BubbleChart(data) {
    this.go_to_project = __bind(this.go_to_project, this);
    this.hide_details = __bind(this.hide_details, this);
    this.show_details = __bind(this.show_details, this);
    this.hide_years = __bind(this.hide_years, this);
    this.display_years = __bind(this.display_years, this);
    this.move_towards_year = __bind(this.move_towards_year, this);
    this.display_by_year = __bind(this.display_by_year, this);
    this.move_towards_center = __bind(this.move_towards_center, this);
    this.display_group_all = __bind(this.display_group_all, this);
    this.start = __bind(this.start, this);
    this.create_vis = __bind(this.create_vis, this);
    this.refresh_nodes = __bind(this.refresh_nodes, this);
    this.create_nodes = __bind(this.create_nodes, this);
    var max_amount;
    
    this.width = 800;
    this.height = 400;
    this.paddingleft = 320;
    this.tooltip = CustomTooltip("scatter_tooltip", 240);
    this.center = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.group_centers = {
      "298": {
        x: 155,
        y: (this.height / 2) - 20
      },
      "798": {
        x: 254,
        y: (this.height / 2) - 20
      },
      "998": {
        x: 354,
        y: (this.height / 2) - 20
      },
      "89": {
        x: 457,
        y: (this.height / 2) - 20
      },
      "589": {
        x: 558,
        y: (this.height / 2) - 20
      },
      "489": {
        x: 658,
        y: (this.height / 2) - 20
      }
    };
    this.layout_gravity = -0.01;
    this.damper = 0.1;
    this.vis = null;
    this.nodes = [];
    this.force = null;
    this.circles = null;
    this.fill_color = d3.scale.ordinal().domain([100000, 200000, 300000, 500000, 1000000, 2000000]).range(["#FFDFBF", "#FFC688", "#FF7F00", "#DDD", "#999", "#444"]);
    
  }

  BubbleChart.prototype.set_data = function(data){
    this.data = data; 
    max_amount = d3.max(this.data, function(d) {
      return parseInt(d.aggregation_field);
    });
    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 50]);
    
    this.create_nodes();
    this.create_vis();
  }

  BubbleChart.prototype.create_nodes = function() {

    this.data.forEach((function(_this) {
      return function(d) {

        var node;
        node = {
          id: d.group_field,
          project_id: d.group_field,
          radius: _this.radius_scale(parseInt(d.aggregation_field)),
          value: d.aggregation_field,
          name: d.group_field,
          org: d.group_field,
          group: d.group_field,
          year: d.group_field,
          x: Math.random() * 900,
          y: Math.random() * 800
        };
        return _this.nodes.push(node);
        
      };
    })(this));
    return this.nodes.sort(function(a, b) {
      return b.value - a.value;
    });
  };

  BubbleChart.prototype.refresh = function() {

  	var that = this;
  	var parameters = get_activity_based_parameters_from_selection(Oipa.mainSelection);
    	jQuery.ajax({
  		type: 'GET',
  		url: search_url + "activity-list-vis/?format=json" + parameters,
  		contentType: "application/json",
  		dataType: 'json',
  		success: function(data){
  			that.reset_radius(data);
  		}
  	});  	
  };

  BubbleChart.prototype.reset_radius = function(data) {

  	var lookup = {};

  	// create lookup arr
  	for(var i = 0;i < data.length;i++){
  		lookup[data[i].id + data[i].code] = this.radius_scale(parseInt(data[i].total_budget));
  	}

  	for(var i = 0;i < this.nodes.length;i++){

  		if(this.nodes[i].id in lookup){
  			this.nodes[i].radius = lookup[this.nodes[i].id];
  		} else {
  			this.nodes[i].radius = 0;
  		}
  	}

  	this.vis.selectAll("circle").data(this.nodes, function(d) {
      return d.id;
    });

  	function endall(transition, callback) { 
    var n = 0; 
    transition 
        .each(function() { ++n; }) 
        .each("end", function() { if (!--n) callback.apply(this, arguments); }); 
  	} 

  	var that = this;

    this.circles.transition().duration(500).attr("r", function(d) {
      return d.radius;
    }).call(endall, function() { that.display_by_year(); });;


  };

  BubbleChart.prototype.create_vis = function() {
    
    this.vis = d3.select("#vis").append("svg").attr("width", this.width).attr("height", this.height).attr("padding-left", this.paddingleft).attr("id", "svg_vis");
    
  	var that;
  	this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
      return d.id;
    });
    that = this;

    this
      .circles.enter()
      .append("circle")
      .attr("r", 0)
      .attr("fill", (function(_this) {
        return function(d) {
          var eee = d3.scale.ordinal().domain([100000, 200000, 300000, 500000, 1000000, 2000000]).range(["#FFDFBF", "#FFC688", "#FF7F00", "#DDD", "#999", "#444"]);
          console.log(d.value);
          console.log(eee(d.value));
          console.log(_this.fill_color(d.value));
          return _this.fill_color(d.value);
        };
      })(this))
      .attr("fill-opacity", 0.8)
      .attr("stroke-width", 0)
      .attr("stroke", (function(_this) {
        return function(d) {
          return d3.rgb(_this.fill_color(d.value)).darker();
        };
      })(this)).attr("id", function(d) {
        return d.id;
      }).on("mouseover", function(d, i) {
        return that.show_details(d, i, this);
      }).on("mouseout", function(d, i) {
        return that.hide_details(d, i, this);
      }).on("click", function(d, i) {
        return that.go_to_project(d, i, this);
      });

    return this.circles.transition().duration(2000).attr("r", function(d) {
      return d.radius;
    });
  };

  BubbleChart.prototype.charge = function(d) {
    return -Math.pow(d.radius, 2) / 8;
  };

  BubbleChart.prototype.start = function() {
    return this.force = d3.layout.force().nodes(this.nodes).size([this.width, this.height]);
  };

  BubbleChart.prototype.display_group_all = function() {
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", (function(_this) {
      return function(e) {
        return _this.circles.each(_this.move_towards_center(e.alpha)).attr("cx", function(d) {
          return d.x;
        }).attr("cy", function(d) {
          return d.y;
        });
      };
    })(this));
    this.force.start();


    $('.btn-visualisation').hide();
    $('.scatter-plot-wrapper').show();
    $('#map').hide();
    $('.btn-map').show();  
    // this.display_by_year();
    $("#vis").css("opacity", 1);
    return true;
  
  };

  BubbleChart.prototype.move_towards_center = function(alpha) {
    return (function(_this) {
      return function(d) {
        d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
        return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
      };
    })(this);
  };

  BubbleChart.prototype.display_by_year = function() {
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", (function(_this) {
      return function(e) {
        return _this.circles.each(_this.move_towards_year(e.alpha)).attr("cx", function(d) {
          return d.x;
        }).attr("cy", function(d) {
          return d.y;
        });
      };
    })(this));
    this.force.start();

    

    return this.display_years();
  };

  

  BubbleChart.prototype.move_towards_year = function(alpha) {
    return (function(_this) {
      return function(d) {
        var target;
        target = _this.group_centers[d.group];
        d.x = d.x + (target.x - d.x) * (_this.damper + -0.03) * alpha * 1.1;
        return d.y = d.y + (target.y - d.y) * (_this.damper + -0.03) * alpha * 1.5;
      };
    })(this);
  };

  BubbleChart.prototype.display_years = function() {

    var header, rect, groups, groups_data, groups_x;
    groups_x = {
      "298": { "x": 65, "label" : "Africa"},
      "798": { "x": 225, "label" : "Asia"},
      "998": { "x": 375, "label" : "Bilateral"},
      "89": { "x": 488, "label" : "Europe"},
      "589": { "x": 602, "label" : "Middle East"},
      "489": { "x": 740, "label" : "South America"},
    };

    groups_data = d3.keys(groups_x);
    rect = this.vis.append("svg:rect").attr("x", 0).attr("y", this.height - 120).attr("height", 1).attr("width", this.width).attr("fill", "#0070A2");
    header = this.vis.append("text").attr("class", "scatter-plot-header").attr("x", 0).attr("y", 60).attr("text-anchor", "left").text("Budget per project for region");
    groups = this.vis.selectAll(".years").data(groups_data);
    
    var that = this;
    this.force.on("end", function(){ 

      Oipa.visualisations[0].group_aggregation = {
        "298": {"count": 0, "x_sum": 0},
        "798": {"count": 0, "x_sum": 0},
        "998": {"count": 0, "x_sum": 0},
        "89": {"count": 0, "x_sum": 0},
        "589": {"count": 0, "x_sum": 0},
        "489": {"count": 0, "x_sum": 0},
      };

      that.circles.each(function(d){
        if (d.group in Oipa.visualisations[0].group_aggregation){ 
          Oipa.visualisations[0].group_aggregation[d.group]["count"] = Oipa.visualisations[0].group_aggregation[d.group]["count"] + 1;
          Oipa.visualisations[0].group_aggregation[d.group]["x_sum"] = Oipa.visualisations[0].group_aggregation[d.group]["x_sum"] + d.x;
        }
      });


      var group_keys = Object.keys(that.group_aggregation);
      for (var i = 0;i < group_keys.length;i++){
        var x_pos = (that.group_aggregation[group_keys[i]].x_sum / that.group_aggregation[group_keys[i]].count);
        $(".group-"+group_keys[i]).attr("x", x_pos);

      }

    });
      



    return groups.enter().append("text").attr("class", (function(_this) {
      return function(d) {
        return "years group-" + groups_x[d].label;
      };
    })(this)).attr("x", (function(_this) {
      return function(d) {
        return groups_x[d].x;
      };
    })(this)).attr("y", this.height - 94).attr("text-anchor", "middle").text(function(d) {
      return groups_x[d].label;
    });
  };

  BubbleChart.prototype.hide_years = function() {
    var years;
    return years = this.vis.selectAll(".years").remove();
  };

  BubbleChart.prototype.show_details = function(data, i, element) {
    var content;
    d3.select(element).attr("fill", "#333");
    content = "<div class='scatter-popup-wrapper'>";
    content += "<div class='scatter-popup-title'> " + data.name + "</div>";
    content += "<div class='scatter-popup-budget-header'>Budget<br>US$</div><div class='scatter-popup-budget-value'> $" + data.value + "</div>";
    content += "</div>";
    return this.tooltip.showTooltip(content, d3.event);
  };

  BubbleChart.prototype.hide_details = function(data, i, element) {
    d3.select(element).attr("fill", (function(_this) {
      return function(d) {
        return d3.rgb(_this.fill_color(d.group));
      };
    })(this));
    return this.tooltip.hideTooltip();
  };

  BubbleChart.prototype.go_to_project = function(data, i, element) {
    return window.location.href = home_url + "/project/" + data.project_id + "/";
  };

  return BubbleChart;

})();

