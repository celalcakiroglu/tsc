3D Modelling using WebGL
===================================================

.. raw:: html

   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="utf-8" />
      <title>Draw a blue rectangle (canvas version)</title>
   </head>
   <body onload="main()">
      <canvas id="webgl" width ="1800" height="900">
      Use html supporting browser
      </canvas>
      <script src="webgl-utils.js"></script>
      <script src="webgl-debug.js"></script>
      <script src="cuon-utils.js"></script>
      <script src="DrawRectangle.js"></script>
   </body>

The above canvas responds to mouse clicks by putting dots at the clicked position. The color of the dots depends on the position of the mouse.