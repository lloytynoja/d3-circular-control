D3 circular slide control
========
Simple circular slide control plugin for D3.js library.

![Screenshot](http://i.imgur.com/zTjE7iA.png)

#API
#####decimals()
The threshold for reading and output value. Default is 0.
#####draw()
Draws the control.
#####handleDiameter()
The diameter of adjusting handle in pixels.
#####handleInnerColor()
The inner color of adjusting handle.
#####handleStrokeColor()
The stroke color of adjusting handle.
#####handleInnerColor()
The stroke thickness of adjusting handle in pixels.
#####nullAngle()
The angle of area in scale perimeter, which has no value. Can be set to 0 for no null area.
#####nullAreaColor()
The color of the null area.
#####readingColor()
The color of the control's reading text.
#####readingSize()
The size of the control's reading text.
#####scaleFill()
The color in which the scale is filled.
#####scaleStrokeWidth()
The width of the scale circle in pixels.
#####select()
The DOM object that will contain the control.
#####size()
The size of the control.
#####val()
Initial value of control. Must be in bounds of `valueRangeMin` and `valueRangeMax`.
#####valueRangeMin()
The low-end of control value range.
#####valueRangeMax()
The high-end of control value range.
#Events
#####slideValueChange
When slide value is changed, event is created. Slider value is available in event field `e.detail.value`.

Example:
      
    window.addEventListener('slideValueChange', function (e) {console.log(e.detail.value)});

Installation
------------

Download minified version from [here](https://github.com/lloytynoja/d3-circular-control/blob/master/d3-circular-control.min.js) and include it in to your project. As this is a plugin for D3.js, it must be included as well. 

Example:

    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>D3 Circular Control plugin example</title>
      </head>
      <body>
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <script src="js/d3-circular-control.min.js"></script>
        <script>
          var control = d3.circularSlide();
          control.select("body")
            .size(500)
            .valueRangeMin(0)
            .valueRangeMax(100)
            .draw();
        </script>
      </body>
    </html>

Contribute
----------
- Issue Tracker: github.com/lloytynoja/d3-circular-control/issues
- Source Code: github.com/lloytynoja/d3-circular-control

License
-------

The project is licensed under the MIT license.
