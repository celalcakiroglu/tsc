Free Vibration of Mass-Spring System
=======================================

.. raw:: html

	<html>
	<canvas id="massSpringDamper" width = "578" height="200">
	</canvas>
	<p>
		k[N/m] <input type="text" id="k" style="width: 60px;" onclick="stop()" value="1">
        m[kg] <input type="text" id="m" style="width: 60px;" onclick="stop()" value="5000">
        xi <input type="text" id="xi" style="width: 60px;" oninput="stop()" value=0.01>
        A0 <input type="text" id="A0" style="width: 60px;" onclick="stop()" value=150>
        <button id="restart" type="button" onclick="restart()">Restart</button>
	</p>
	<canvas id="plotTimeDisp" width = "578" height="200">
	</canvas>
	<script>
		var t0 = (new Date()).getTime();
		var t=(new Date()).getTime();
		var requestId=0, requestId2=0;
		var A0=parseFloat(document.getElementById('A0').value);
		var canvas2=document.getElementById('plotTimeDisp');
		var canvas=document.getElementById('massSpringDamper');
		canvas.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
		var context = canvas.getContext('2d');
		canvas2.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
		var context2 = canvas2.getContext('2d');
		context2.beginPath();
		context2.moveTo(20,canvas2.height/2);
      	context2.lineTo(20+canvas2.width/2, canvas2.height/2);
      	context2.moveTo(20,canvas2.height/2);
      	context2.lineTo(20, 20);
      	context2.stroke();
      	context2.moveTo(20,20);
      	function stop() {
            if (requestId) {
                window.cancelAnimationFrame(requestId);
            }
        }
      	function plot(disp, A0, t, t0){
			adjustedDisp=(canvas2.height/2-20)*disp/A0;
			time=(t-t0)/1000;
			adjustedTime=(canvas2.width/2)*time/10;//first 10 seconds of the motion
			if(time<=10){
				context2.lineTo(20+adjustedTime,canvas2.height/2-adjustedDisp);
      			context2.stroke();
			}
        };
		function draw() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			rectWidth=40;//This is the side length of the mass
			A0=parseFloat(document.getElementById('A0').value);
			k=parseFloat(document.getElementById('k').value);
			m=parseFloat(document.getElementById('m').value);
			xi=parseFloat(document.getElementById('xi').value);
			omegaN=Math.sqrt(k/m);
			omegaD=omegaN*Math.sqrt(1-xi*xi);
			t=(new Date()).getTime();
			disp=Math.exp(-xi*omegaN*(t-t0))*A0*Math.cos(omegaD*t);
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
    		plot(disp,A0, t, t0);
        	if(Math.abs(disp)>0.000001){requestId=requestAnimationFrame(draw);}
		};
		draw();
		function restart(){
		    console.log("we are in restart")
		    t0 = (new Date()).getTime();
		    context2.clearRect(0, 0, canvas2.width, canvas2.height);
		    context2.beginPath();
			context2.moveTo(20,canvas2.height/2);
      		context2.lineTo(20+canvas2.width/2, canvas2.height/2);
      		context2.moveTo(20,canvas2.height/2);
      		context2.lineTo(20, 20);
      		context2.stroke();
      		context2.moveTo(20,20);
			draw();
		}
	</script>
	</canvas>
	</html>

xi denotes the damping varible :math:`\xi` in the equation of motion :math:`\ddot{x}+2\xi\omega_n\dot{x}+{\omega_n}^2x=0`. :math:`\xi` is supposed to be in the interval :math:`[0,1]`. Systems where :math:`\xi` has values greater than about 0.3 are usually highly damped systems.

A0 is the initial displacement of the mass from the unstretched position of the string which causes the subsequent vibration of the mass around that position.