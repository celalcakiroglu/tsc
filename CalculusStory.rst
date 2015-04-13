A Calculus Story
===================================================
I would like to start this story with the proof of the IMHO the most useful formula in all calculus, which is the formula for the cosine of an angle between two vectors. Once the cosine of an angle is known, the angle itself can be computed using the Math.acos() function of JavaScript. The Math.acos() function can be executed from the "Web Console" of the Firefox web browser which can be invoked by pressing "F12" or "CTRL+shift+k".

.. _35PercX65:
.. figure:: calcStory/twoVectors.JPG
    :height: 573px
    :width: 715 px
    :scale: 55 %
    :align: center

.. container:: clearer

   .. image :: spacer.png

In the above figure, the cosines and sines of the angles :math:`\theta_a` , :math:`\theta_b` and the angle between the vectors can be expressed as follows:

.. math::
	\cos{\theta_a}=\frac{a_1}{\Vert \mathbf{a} \Vert},\quad \cos{\theta_b}=\frac{b_1}{\Vert \mathbf{b} \Vert},\quad 
	\sin{\theta_a}=\frac{a_2}{\Vert \mathbf{a} \Vert},\quad \sin{\theta_b}=\frac{b_2}{\Vert \mathbf{b} \Vert}

.. math::
	\cos(\theta_a-\theta_b)=\cos(\theta_a)\cos(\theta_b)+\sin(\theta_a)\sin(\theta_b)=\frac{a_1}{\Vert a \Vert}\frac{b_1}{\Vert b \Vert}+\frac{a_2}{\Vert a \Vert}\frac{b_2}{\Vert b \Vert}

where :math:`\Vert\cdot \Vert` denotes the Euclidean norm or the magnitude of a vector. The formula for the cosine of the difference between two angles can be proven as follows(muldowney_):
Let :math:`f:\mathbb{R}\to\mathbb{R}` be a twice differentiable function with :math:`f(0)=f^{'}(0)=0` and :math:`f(x)+f^{''}(x)=0` for all :math:`x\in \mathbb{R}`. Let's define :math:`g:\mathbb{R}\to\mathbb{R}` as :math:`g(x)=(f(x))^2+(f^{'}(x))^2`. Then :math:`g^{'}(x)=2f(x)f^{'}(x)+2f^{'}(x)f^{''}(x)=2f^{'}(x)(f(x)+f^{''}(x))=0`. Since :math:`g^{'}(x)=0` for all :math:`x\in\mathbb{R}`, :math:`g(x)` is a constant function and equal to :math:`g(0)=(f(0))^2+(f^{'}(0))^2=0` for all :math:`x\in\mathbb{R}`. Assume that :math:`f(x_0)\neq 0` for some :math:`x_0 \in\mathbb{R}`. Then :math:`g(x_0)=(f(x_0))^2+(f^{'}(x_0))^2>0`. This contradiction proves that :math:`f(x)=0` everywhere on :math:`\mathbb{R}`.

In the above proof we used the fact that if the derivative of a function is zero everywhere, then this function has a constant value. This can be proven using the mean value theorem as follows: Let :math:`[a,b]\subset\mathbb{R}` with :math:`a<b`. Then :math:`g(x)` is differentiable on :math:`[a,b]`. According to the mean value theorem, there exists :math:`\xi \in (a,b)` such that 

.. math::
	g^{'}(\xi)=\frac{g(b)-g(a)}{b-a}=0 \Rightarrow g(b)=g(a), \forall a,b \in \mathbb{R}, \therefore g(x)=const

**References**

.. _muldowney: 

Muldowney J.S. ; “Mathematics 117 Lecture Notes”