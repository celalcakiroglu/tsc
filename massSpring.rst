Free Vibration of Mass-Spring System
=======================================

.. raw:: html

	<html>
	<canvas id="massSpringDamper" width = "578" height="200">
	</canvas>
	<p>
		k[N/m] <input type="text" id="k" style="width: 60px;" onclick="stop()" oninput="stop()" value="1">
        m[kg] <input type="text" id="m" style="width: 60px;" onclick="stop()" oninput="stop()" value="5000">
        xi <input type="text" id="xi" style="width: 60px;" onclick="stop()" oninput="stop()" value=0.01>
        A0 <input type="text" id="A0" style="width: 60px;" onclick="stop()" oninput="stop()" value=150>
        <button id="restart" type="button" onclick="restart()">Restart</button>
        <button id="stop" type="button" onclick="stop()">Stop</button>
	</p>
	<canvas id="plotTimeDisp" width = "578" height="200">
	</canvas>
	<script>
		var requestId=0, requestId2=0;
		var A0=parseFloat(document.getElementById('A0').value);
		var k=parseFloat(document.getElementById('k').value);
		var m=parseFloat(document.getElementById('m').value);
		var xi=parseFloat(document.getElementById('xi').value);
		var omegaN=Math.sqrt(k/m);
		var omegaD=omegaN*Math.sqrt(1-xi*xi);
		var disp=0;
		var canvas2=document.getElementById('plotTimeDisp');
		var canvas=document.getElementById('massSpringDamper');
		canvas.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
		var context = canvas.getContext('2d');
		context.font = "20px Arial";
		canvas2.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
		var context2 = canvas2.getContext('2d');
		context2.font = "20px Arial";
		var t, t0;
		rectWidth=40;//Size of the mass
      	function stop() {
            if (requestId) {
                window.cancelAnimationFrame(requestId);
            }
            A0=parseFloat(document.getElementById('A0').value);
			k=parseFloat(document.getElementById('k').value);
			m=parseFloat(document.getElementById('m').value);
			xi=parseFloat(document.getElementById('xi').value);
			omegaN=Math.sqrt(k/m);
			omegaD=omegaN*Math.sqrt(1-xi*xi);
        }
      	function plot(disp, A0, t, t0, xi, omegaN, omegaD){
			adjustedDisp=(canvas2.height/2-20)*disp/A0;
			time=(t-t0)/1000;
			adjustedTime=(canvas2.width/2)*time/10;//first 10 seconds of the motion
			if(time<=10){
				context2.moveTo(prevT, prevX);
				context2.lineTo(20+adjustedTime,canvas2.height/2-adjustedDisp);
      			context2.stroke();
      			prevT=20+adjustedTime;
      			prevX=canvas2.height/2-adjustedDisp;
			}
			velocity=A0*Math.exp(-xi*omegaN*(t-t0))*[-xi*omegaN*Math.cos(omegaD*(t-t0))-omegaD*Math.sin(omegaD*(t-t0))];
			adjustedPhaseX=(phaseXArm-10)*disp/A0+phaseMidX;
			vMax=-omegaD*A0*Math.exp(-xi*omegaN*Math.PI/(2*omegaD));
			adjustedPhaseV=(phaseYArm-10)*velocity/vMax+canvas2.height/2;
			context2.moveTo(prevPhaseX, prevPhaseV)
			context2.lineTo(adjustedPhaseX, adjustedPhaseV);
			context2.stroke();
			prevPhaseX=adjustedPhaseX;
			prevPhaseV=adjustedPhaseV
        };
		function draw() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			t=(new Date()).getTime();
			disp=Math.exp(-xi*omegaN*(t-t0))*A0*Math.cos(omegaD*(t-t0));
			xWall= 20;yWall=canvas.height/2;//The point where the spring is attached to the wall
			length0=(canvas.width)/2;
			context.beginPath();
			context.moveTo(xWall,yWall);
			length=length0+disp;
      		context.lineTo(xWall+length, yWall);
      		context.moveTo(xWall,yWall-rectWidth/2);
      		context.lineTo(xWall, yWall+rectWidth/2);
      		context.moveTo(xWall, yWall+rectWidth/2);
      		context.lineTo(xWall+canvas.width, yWall+rectWidth/2);
      		context.stroke();
      		context.rect(xWall+length-rectWidth/2, yWall-rectWidth/2, rectWidth, rectWidth);
        	context.fillStyle = '#8ED6FF';
        	context.fill();
        	console.log("animation going on");
    		plot(disp,A0, t, t0, xi, omegaN, omegaD);
        	if(Math.abs(disp)>0.000001){requestId=requestAnimationFrame(draw);}
		};
		//draw();
		function restart(){
		    //console.log("we are in restart")
		    t0 = (new Date()).getTime();
		    context2.clearRect(0, 0, canvas2.width, canvas2.height);
		    context2.beginPath();
			context2.moveTo(20,canvas2.height/2);
      		context2.lineTo(20+canvas2.width/2, canvas2.height/2);
      		context2.fillText("t", 20+canvas2.width/2, canvas2.height/2);
      		context2.moveTo(20,canvas2.height/2);
      		context2.lineTo(20, 20);
      		context2.fillText("x", 20, 20);
      		//Drawing the phase plot
      		context2.moveTo(70+canvas2.width/2, canvas.height/2);
      		context2.lineTo(canvas2.width-20, canvas.height/2);
      		context2.fillText("x",canvas2.width-20, canvas.height/2);
      		phaseMidX=(70+canvas2.width/2+canvas2.width-20)/2;
      		phaseXArm=(canvas2.width-20-phaseMidX);//x length of the phase 
      		//coordinate system
      		phaseYArm=(canvas2.height-40)/2;
      		prevT=20;
      		prevX=20;
      		prevPhaseX=phaseMidX+phaseXArm-10;
      		prevPhaseV=canvas2.height/2;
      		context2.moveTo(phaseMidX, 20);
      		context2.lineTo(phaseMidX, canvas2.height-20);
      		context2.fillText("v", phaseMidX, 20);
      		context2.stroke();
			draw();
		}
		//setTimeout(restart(), 10000);//Tries to prevent the initial straight line when the webpage opens
		document.getElementById('restart').click();
		//restart();
	</script>
	</canvas>
	</html>

xi denotes the damping varible :math:`\xi` in the equation of motion :math:`\ddot{x}+2\xi\omega_n\dot{x}+{\omega_n}^2x=0`. :math:`\xi` is supposed to be in the interval :math:`[0,1]`. Systems where :math:`\xi` has values greater than about 0.3 are usually highly damped systems.

A0 is the initial displacement of the mass from the unstretched position of the spring which causes the subsequent vibration of the mass around that position. The equation of motion can be derived using the free body diagram which shows the mass and the forces acting on it (free vibration :math:`\Rightarrow f(t)=0`). The equilibrium of these forces (:math:`m\ddot{x}+c\dot{x}+kx=f(t)=0`) gives us the equation of motion.

.. _canvas:
.. figure:: freeBody.JPG
    :height: 200px
    :width: 662 px
    :scale: 60 %
    :align: center

    Free body diagram

.. container:: clearer

   .. image :: spacer.png

The damping coefficient c is the force required for unit velocity to occur across the damper. The stiffness k is the force required for a unit extension of the spring. The equation of motion is obtained by dividing the equilibrium equation by m and letting :math:`c/m=2\xi\omega_n,\quad k/m={\omega_n}^2`. :math:`\omega_n` is the angular natural frequency of the system.

The solution of the equation of motion can be sought after by assuming a displacement in the form :math:`x(t)=e^{rt}` where :math:`r` is some parameter possibly complex valued. Inserting the first and second derivatives of that assumed expression in the equation of motion we obtain

.. math::
	e^{rt}(r^2+2\xi\omega_n r+{\omega_n}^2)=0 

Since :math:`e^{rt}\neq 0` we obtain

.. math::
	r^2+2\xi\omega_n r+{\omega_n}^2=0 \Rightarrow r_{1,2}=\omega_n(-\xi\pm\sqrt{\xi^2-1})

We know that :math:`\xi` is less than 1 most of the time. Therefore :math:`r_{1,2}=\omega_n(-\xi\pm j\sqrt{1-\xi^2})` where :math:`\quad j=\sqrt{-1}`. Let's coin a new parameter :math:`\omega_d=\omega_n\sqrt{1-\xi^2}` for the damped angular natural frequency of the system. Using this new variable leads to :math:`r_{1,2}=-\xi\omega_n\pm j\omega_d`. Obviously :math:`r_{1,2}` are complex valued which leaves us with two complex valued solutions of the equation of motion :math:`x_1(t)=e^{(-\xi\omega_n+j\omega_d)t},\quad x_2(t)=e^{(-\xi\omega_n-j\omega_d)t}`. These solutions are of little use to describe the motion of an object. Fortunately there is a way around this. According to the theorem of superposition if :math:`x_1(t)` and :math:`x_2(t)` are solutions of the differential equation then any linear combination of them is also a solution. Using this theorem we can obtain real valued solutions by adding and subtracting :math:`x_1(t)` and :math:`x_2(t)` which can actually describe the motion of the mass .  

.. math::
	x_1(t)=e^{(-\xi\omega_n+j\omega_d)t}=e^{-\xi\omega_nt}e^{j\omega_dt}=e^{-\xi\omega_nt}(\cos{\omega_dt}+j\sin{\omega_dt})

.. math::
	x_2(t)=e^{(-\xi\omega_n-j\omega_d)t}=e^{-\xi\omega_nt}e^{-j\omega_dt}=e^{-\xi\omega_nt}(\cos{\omega_dt}-j\sin{\omega_dt})

.. math::
	x_3(t)=\frac{1}{2}[x_1(t)+x_2(t)]=\frac{1}{2}[e^{-\xi\omega_nt}2\cos{\omega_dt}]=e^{-\xi\omega_nt}\cos{\omega_dt}

.. math::
	x_4(t)=\frac{1}{2i}[x_1(t)-x_2(t)]=\frac{1}{2i}[e^{-\xi\omega_nt}2j\sin{\omega_dt}]=e^{-\xi\omega_nt}\sin{\omega_dt}

The general solution of the equation of motion is 

.. math::
	x(t)=e^{-\xi\omega_nt}(a_0\cos{\omega_dt}+b_0\sin{\omega_dt})

where :math:`a_0,b_0` are arbitrary constants.
