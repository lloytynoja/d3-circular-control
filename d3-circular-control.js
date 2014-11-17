

d3.circularSlide = function() {

  var padding = 30;
  var nullAngle = 0;
  var currentAngle = nullAngle / 2;
  var select;
  var size;
  var w2p = size - 2 * padding;
  var radius = w2p / 2;
  var decimals = 0;
  var val = "";
  var vMin;
  var vMax;
  var handleInnerColor = "yellow";
  var handleDiameter = "20";
  var handleStrokeColor = "orange";
  var handleStrokeThickness = "10";
  var readingSize = "150px";
  var readingColor = "#616161";
  var eventCounter = 0;
  var scaleFill = "#FFFFF7";
  var scaleStrokeColor = "#8C8C8C"
  var scaleStrokeWidth = 25;
  var scaleColor = "white";
  var nullAreaColor = "#3D3D3D";
  var valueRange;
  var hsize = size/2;
  var eventFilter = 1;
  var reading;

  var point = function (x, y) {
    this.x = x;
    this.y = y;
  }

  function my() {};
  
  my.decimals = function (value) {
    if (!arguments.length) return decimals;
    decimals = value;
    return my;
  }
  my.handleDiameter = function (value) {
    if (!arguments.length) return parseInt(handleDiameter);
    handleDiameter = value.toString();
    return my;
  }
  my.handleInnerColor = function (value) {
    if (!arguments.length) return handleInnerColor;
    handleInnerColor = value;
    return my;
  }
  my.handleStrokeColor = function (value) {
    if (!arguments.length) return handleStrokeColor;
    handleStrokeColor = value;
    return my;
  }
  my.handleStrokeThickness = function (value) {
    if (!arguments.length) return parseInt(handleStrokeThickness);
    handleStrokeThickness = value.toString();
    return my;
  }
  my.nullAngle = function (value) {
    if (!arguments.length) return nullAngle;
    nullAngle = value;
    return my;
  }
   my.nullAreaColor = function (value) {
    if (!arguments.length) return nullAreaColor;
    nullAreaColor = value;
    return my;
  }
  my.readingColor = function(value) {
      if (!arguments.length) return readingColor;
      readingColor = value;
      return my;
  };
   my.readingSize = function(value) {
      if (!arguments.length) return readingSize;
      readingSize = value;
      return my;
  };
  my.select = function(value) {
      if (!arguments.length) return select;
      select = value;
      return my;
  };
  my.size = function(value) {
      if (!arguments.length) return size;
      size = value;
      return my;
  };
  my.scaleFill = function(value) {
      if (!arguments.length) return scaleFill;
      scaleFill = value;
      return my;
  };
  my.scaleStrokeWidth = function(value) {
      if (!arguments.length) return scaleStrokeWidth;
      scaleStrokeWidth = value;
      return my;
  };
  my.val = function (value) {
    if (!arguments.length) return val;
    val = value;
    return my;
  }
  my.valueRangeMin = function (value) {
    if (!arguments.length) return vMin;
    vMin = value;
    return my;
  }
  my.valueRangeMax = function (value) {
    if (!arguments.length) return vMax;
    vMax = value;
    return my;
  }

  my.refresh = function () {
    hsize = size/2;
    w2p = size - 2 * padding;
    radius = w2p / 2;
    valueRange = vMax - vMin;
    currentAngle = valueToAngle(val);
  }

  my.checkPreconditions = function () {
    if (select == null || size == null || vMin == null || vMax == null ) {
      throw "Mandatory setup not done. Check that following functions are called during initialization: select(), size(), valueRangeMin(), valueRangeMax()";
    } else if (val < vMin || val > vMax) {
      throw "The value set with val() is out of valueRangeMin / valueRangeMax bounds.";
    }
  }

  my.draw = function () {

    this.checkPreconditions();
    this.refresh();

    /* create main svg element */
    var svg = d3.select(select)
        .append("svg")
        .attr("width", size)
        .attr("height", size)
        .selectAll("svg")
        .data(d3.range(1).map(function() { return calculatePoint(currentAngle); }))
        .enter()
        .append("svg")

    /* scale circle */
    svg.append("circle")
       .attr("cx", hsize)
       .attr("cy", hsize)
       .attr("r", radius)
       .attr("fill", scaleFill)
       .attr("stroke", scaleStrokeColor)
       .attr("stroke-width", scaleStrokeWidth);

    /* null-value area */
    var nullArc = d3.svg.arc()
        .innerRadius(radius - (scaleStrokeWidth - 2) / 2)
        .outerRadius(radius + (scaleStrokeWidth) / 2)
        .startAngle((0 - nullAngle / 2) * (Math.PI / 180))
        .endAngle((nullAngle / 2) * Math.PI / 180)

    svg.append("path")
        .attr("d", nullArc)
        .attr("transform", "translate(" + hsize + "," + hsize + ")")
        .attr("fill", nullAreaColor)

    /* handle */
    svg.append("circle") 
       .attr("r", handleDiameter)
       .attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; })
       .attr("stroke", handleStrokeColor)
       .attr("stroke-width", handleStrokeThickness)
       .attr("fill", handleInnerColor)
       .call(drag);

    /* reading text */
    reading = svg.append("text")
        .attr("x", hsize)
        .attr("y", hsize)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-family", "arial")
        .attr("font-weight", "bold")
        .attr("font-size", readingSize)
        .attr("fill", readingColor)
        .text(angleToValue(currentAngle));
  }

  /* define angle based on handle coordinates */
  var calculateAngle = function (x, y) {
    var x1,
        y1;

    if (x >= hsize && y >= hsize) {
      x1 = x - hsize;
      y1 = y - hsize;
      return 90 + Math.atan(y1 / x1) * (180 / Math.PI);
    } else if (x < hsize && y >= hsize) {
      x1 = hsize - x;
      y1 = y - hsize;
      return 270 - Math.atan(y1 / x1) * (180 / Math.PI);
    } else if (x < hsize && y < hsize) {
      x1 = hsize - x;
      y1 = hsize - y;
      return 360 - Math.atan(x1 / y1) * (180 / Math.PI);
    } else if (x >= hsize && y < hsize) {
      x1 = x - hsize;
      y1 = hsize - y;
      return 90 - Math.atan(y1 / x1) * (180 / Math.PI);
    }
  }

  /* calculates point in perimeter of the circle by given angle */
  var calculatePoint = function (angle) {
    var p = new point();
    var radians = (angle - 90) * (Math.PI / 180);
    p.x = hsize + Math.cos(radians) * radius;
    p.y = hsize + Math.sin(radians) * radius;
    return p;
  }

  /* convert an angle into value */
  var angleToValue = function (angle) {
    return parseFloat(valueRange / (360 - nullAngle) * (angle - nullAngle / 2) + vMin).toFixed(decimals);
  }
  
  /* convert a value to into an angle */
  var valueToAngle = function (value) {
    return parseFloat(((360 - nullAngle) / valueRange) * value + nullAngle / 2).toFixed(decimals);
  }

  var drag = d3.behavior.drag()
      .on("drag", dragmove);

  function dragmove(d) {
    if (eventCounter++ == eventFilter) {
      var a = snapToEndpoint(calculateAngle (d3.event.x, d3.event.y));
      if (a >= (nullAngle / 2) && a <= 360 - (nullAngle / 2)) {
        currentAngle = a;
        var p = calculatePoint (currentAngle);
        var tmp = angleToValue (currentAngle);
        if (val != tmp) {
          val = tmp;
          window.dispatchEvent(new CustomEvent('slideValueChange', {"detail": {"value": val}}));
        }
        reading.text(val);
        d3.select(this)
          .attr("cx", p.x)
          .attr("cy", p.y);
      }
      eventCounter = 0
    } 
  }

  /* make handle to snap in to the endpoints of scale nicely */
  function snapToEndpoint(a) {
    var n = nullAngle / 2;
    if (a <= n && (n - a) < 5) return n;
    if (a > 360 - n && a - (360 - n) < 5) return 360 - n;
    return a;
  }

  return my;
}