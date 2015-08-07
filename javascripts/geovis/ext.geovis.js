var geoLocationVis = null;

ZzLocationVis = (function() {

  function ZzLocationVis(id) {
    this.init(id);
    geoLocationVis = this;
  }

  ZzLocationVis.prototype.init = function(id) {

    var that = this;
    this.vis = null;
    this.vis_id = id;
    this.tooltip = CustomTooltip("sunburst_tooltip", 120);
    this.state = 0;
    var margin = {top: 270, right: 480, bottom: 270, left: 480};
    this.radius = 250;

    this.vis = d3.select('#' + id).append('svg')
        .attr('width', 1000)
        .attr('height', 2000)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('version', '1.1')
        .attr('viewBox', '0 0 1000 500')
      .append('g')
        .attr('transform', 'translate(0,0)');

    // left
    var left = this.vis.append('rect')
      .attr('width', 520)
      .attr('height', 1900)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);

    // mid
    var left = this.vis.append('rect')
      .attr('width', 210)
      .attr('height', 1900)
      .attr('x', 530)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);

    // right
    var left = this.vis.append('rect')
      .attr('width', 250)
      .attr('height', 1900)
      .attr('x', 750)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.3);

  };



  ZzLocationVis.prototype.mouseOver = function(d){

  };

  ZzLocationVis.prototype.mouseOut = function(d){
  
  }

  ZzLocationVis.prototype.update = function(root) {
    

    function zoomOut(p) {

    }

    function zoom(p){
      
    }

    function zoomIn(p){
     
    }

    // When zooming out, arcs enter from the inside and exit to the outside.
    // Exiting outside arcs transition to the new layout.
    // if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);
  }


  return ZzLocationVis;
})();













function CustomTooltip(tooltipId, width){
  var tooltipId = tooltipId;
  $("body").append("<div class='sunburst_tooltip' id='"+tooltipId+"'></div>");
  
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


