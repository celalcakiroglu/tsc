Free Vibration of Mass-Spring System
=======================================

.. raw:: html

	<html>
	<canvas id="massSpringDamper" width = "578" height="200">
	</canvas>
	<p>
		k[N/m] <input type="text" id="k" style="width: 70px;" value="1">
        m[kg] <input type="text" id="m" style="width: 70px;" value="15000">
        xi <input type="text" id="xi" style="width: 70px;" value=0.002>
        A0 <input type="text" id="A0" style="width: 70px;" value=150>
	</p>
	<script>
		var t0 = (new Date()).getTime();
		(function repeatOften() {
			var canvas=document.getElementById('massSpringDamper')
			canvas.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
			var context = canvas.getContext('2d');
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
    		console.log("deneme");
    		requestAnimationFrame(repeatOften);
		})();
	</script>
	</canvas>
	</html>