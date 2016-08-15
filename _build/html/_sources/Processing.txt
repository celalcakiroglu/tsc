Processing
=================

Where to start ?
~~~~~~~~~~~~~~~~~~~~~

The first thing to do is to download the processing files from the following address

https://processing.org/download/?processing

If you have a Windows operating system you should choose either the Windows 64 bit or the Windows 32 bit version of the processing files. You can see which version of windows you have as follows: Click on start button -> Settings -> System -> About -> Here the system type is listed. The processing files come packed in a zip file. Extract the contents of this zip file and you can start the processing platform right away by executing the processing.exe file. No installation necessary.


List of Processing functions and built-in variables:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* void **setup** (): The size of the drawing canvas and the backgroud colour are defined in this function. Every processing program starts with void setup().

* void **draw** (): All the drawing operations are done within this function. The code inside the draw() function is executed 60 times per second.

* **stroke(r,g,b)**: defines the colour of the lines following this function. r, g, b define the red, green and blue intensity. They take values between 0 and 255.

* **noStroke** (): Geometric shapes like rectangles and ellipses that follow this command are plotted without outer lines.

* **strokeWeight** (line thickness in pixels)

* **line** (x0,y0,x1,y1)

* **rect** (upperLeftX, upperLeftY, width, height)

* **quad** (x0,y0,x1,y1,x2,y2,x3,y3): Draws a quadrilateral with the given 4 corners (vertices). Here (x0,y0) is the first corner point (x1,y2) is the second and so on. A quadrilateral is a polygon with 4 straight sides (edges) and 4 corners. The vertices should be specified in either clockwise or counterclockwise direction.

* **triangle** (x0,y0,x1,y1,x2,y2): Draws a triangle with the given 3 corners.

* **ellipse** (centerX, centerY, width, height)

* **fill** (r,g,b): fills inside of rectangles and ellipses with colour.

* **noLoop** (): This function prevents the draw() function from repeating when called inside the draw() function.

* **println** (): Prints to console.

* **mouseX, mouseY** : Variables holding the current x and y coordinates of the mouse when it is positioned on the canvas. These coordinates are the pixel distances in horizontal and vertical direction from the upper left corner of the canvas.

* **height, width** : These variables are always equal to the height and width of the sketch window. 

Coordinates on a Canvas
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Processing the canvas has an invisible coordinate system with an origin at the upper left corner of the canvas. As an example when we say the upper left corner of a rectangle has the coordinates (50,65) this means that the upper left corner of the rectangle is 50 pixels to the right side of the canvas upper left corner and 65 pixels away from the canvas upper left corner in downwards direction. This is also illustrated in the following figure.

.. _canvas:
.. figure:: processing/canvas.JPG
    :height: 311px
    :width: 374 px
    :scale: 78 %
    :align: center

    Canvas coordinate system

.. container:: clearer

   .. image :: spacer.png

**Example 1** : Drawing lines, rectangles and ellipses.

.. code-block:: c

	void setup(){
  		size(250,250);
  		background(150);
	}

	void draw(){
  		stroke(0,0,255);
  		strokeWeight(1);
  		line(20,20,120,120);
  		fill(120, 120, 120);
  		rect(140, 140, 45, 35);
  		ellipse(140, 140, 45, 35);
  		stroke(255,0,0);
  		strokeWeight(2);
  		line(20,10,120,110);
  		rect(190,190,45,35);
  		fill(240,0,240);
  		noStroke();
  		ellipse(255, 255, 55,45);
  		stroke(0,255,0);
  		strokeWeight(5);
  		line(20,40,120,140);
  		noLoop();
  	}

.. _procEx1:
.. figure:: processing/procEx1.JPG
    :height: 300px
    :width: 300 px
    :scale: 100 %
    :align: center

    The outcome of the code in Example 1

.. container:: clearer

   .. image :: spacer.png

The above example shows that once you define a line colour or filling colour, it affects every geometric shape that comes afterwards. This means, we don't need to re-define the line and filling colours unless we want to change them. Notice that as we change the line thickness with the strokeWeight() function, the outer line thicknesses of the rectangles and the ellipses also change. Also, using the noStroke() function we removed the outline of the last ellipse.

**Example 2** : Draw a quadrilateral with the vertex coordinates (25,25), (150, 50), (100, 175), (25, 200). First define the filling colour as red and define the corner coordinates in clockwise direction. Then change the filling colour to blue and use the quad function second time but this time enter the vertex coordinates in random order. 

**Solution**

.. code-block:: c

	void setup(){
  		size(250,250);
  		background(150);
	}

	void draw(){
  		stroke(0,0,0);
  		fill(255, 0, 0);
  		quad(25, 25, 150, 50, 100, 175, 25, 200);
  		fill(0,0,255);
  		quad(25, 25, 100, 175, 25, 200, 150, 50);
  		noLoop();
  	}

.. _procEx2:
.. figure:: processing/procEx2.JPG
    :height: 225px
    :width: 209 px
    :scale: 100 %
    :align: center

    The outcome of the code in Example 2

.. container:: clearer

   .. image :: spacer.png

The quad() function draws from vertex to vertex. Which means that entering the same corner points in a different sequence may result in different shapes.

**Exercise 1** : Draw a snowman using the functions mentioned so far. For example ellipse(), triangle(), line(). You can also use the rect() function to draw the ground that the snowman stands on. You can draw a carrot nose for the snowman using the triangle() function etc. 

A Dynamic Example
~~~~~~~~~~~~~~~~~~~~~
In this example we simulate the motion of a ball which bounces back each time it hits one of the boundaries of the drawing canvas. To do this simulation we use the fact that the draw() function is called 60 times per second. The position of the ball is defined as a variable by using variable values (x,y) for the center of the circle representing the ball. Thess variable values are updated each time the draw() function is called by adding to them the constants growX and growY. Increasing the value of growX makes the ball move faster in the horizontal direction.

.. code-block:: c

  int y = 200;
  int x = 30;
  int frameCount=0;
  int growX = 8;
  int growY = 3;

  void setup(){
    size(400,350);
    //smooth();
  }

  void draw(){
    background(150);
    fill(255,0,0);
    ellipse(x, y, 60,60);
    x+=growX;
    y+=growY;
    if((x+30)>=width || x-30 < 0)growX*=-1;
    if((y+30)>=height || y-30 < 0)growY*=-1;
    if(frameCount > 300)noLoop();
    if(frameCount%2 == 0)saveFrame();
    frameCount++;
  }

Since the frame rate in a usual movie is 29 frames per second, only half of the drawings made by the draw() function are saved by the saveFrame() function in order to use them in movie making.

.. raw:: html

   <video width="640" height="360" controls>
   <source src="DynamicBall.mp4" type="video/mp4">
   <source src="DynamicBall.ogg" type="video/ogg">
   Your browser does not support the video tag.
   </video> 