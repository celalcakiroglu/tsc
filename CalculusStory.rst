Calculus
===================================================
I would like to start this section with the proof of a very useful formula in calculus, which is the formula for the cosine of an angle between two vectors. Once the cosine of an angle is known, the angle itself can be computed using the Math.acos() function of JavaScript. The Math.acos() function can be executed from the "Web Console" of the Firefox web browser which can be invoked by pressing "F12" or "CTRL+shift+k".

.. _35PercX65:
.. figure:: calcStory/twoVectors.JPG
    :height: 573px
    :width: 715 px
    :scale: 50 %
    :align: center

.. container:: clearer

   .. image :: spacer.png

In the above figure, the cosines and sines of the angles :math:`\theta_a` , :math:`\theta_b` and the angle between the vectors can be expressed as follows:

.. math::
	\cos{\theta_a}=\frac{a_1}{\Vert \mathbf{a} \Vert},\quad \cos{\theta_b}=\frac{b_1}{\Vert \mathbf{b} \Vert},\quad 
	\sin{\theta_a}=\frac{a_2}{\Vert \mathbf{a} \Vert},\quad \sin{\theta_b}=\frac{b_2}{\Vert \mathbf{b} \Vert}

.. math::
	\cos(\theta_a-\theta_b)=\cos(\theta_a)\cos(\theta_b)+\sin(\theta_a)\sin(\theta_b)=\frac{a_1}{\Vert a \Vert}\frac{b_1}{\Vert b \Vert}+\frac{a_2}{\Vert a \Vert}\frac{b_2}{\Vert b \Vert}=\frac{\langle a { , } b \rangle}{\Vert\mathbf{a}\Vert\Vert\mathbf{b}\Vert}

where :math:`\Vert\cdot \Vert` denotes the Euclidean norm or the magnitude of a vector and :math:`\langle { \cdot { , } \cdot } \rangle` denotes the scalar product or dot product of two vectors. The formula for the cosine of the difference between two angles(or an angle between two vectors) can be derived as follows[1_]:

Let :math:`f(\theta)=\cos(\theta-\beta)+\alpha_1\cos(\theta)+\alpha_2\sin(\theta)` where :math:`f:\mathbb{R}\to\mathbb{R}` and :math:`\beta,\alpha_1, \alpha_2 \in \mathbb{R}` are arbitrary. The first and second derivatives of :math:`f(\theta)` look like:

.. math::
	&f^{'}(\theta)=-\sin(\theta-\beta)-\alpha_1\sin(\theta)+\alpha_2\cos(\theta)\\
	&f^{''}(\theta)=-\cos(\theta-\beta)-\alpha_1\cos(\theta)-\alpha_2\sin(\theta)

from which

.. math::
	f(\theta)+f^{''}(\theta)=0

follows. If we choose :math:`\alpha_1` and :math:`\alpha_2` as

.. math::
	\alpha_1=-\cos(\beta), \alpha_2=-\sin(\beta)

we obtain

.. math::
	f(\theta)=\cos(\theta-\beta)-\cos(\theta)\cos(\beta)-\sin(\theta)\sin(\beta)
.. math::
	f(0)=f^{'}(0)=0

Let's define :math:`g:\mathbb{R}\to\mathbb{R}` as :math:`g(\theta)=(f(\theta))^2+(f^{'}(\theta))^2`. Then

.. math::
	g^{'}(\theta)=2f(\theta)f^{'}(\theta)+2f^{'}(\theta)f^{''}(\theta)=2f^{'}(\theta)\Big(f(\theta)+f^{''}(\theta)\Big)=0 

Since :math:`g^{'}(\theta)=0` for all :math:`\theta\in\mathbb{R}`, :math:`g(\theta)` is a constant function and equal to :math:`g(0)=(f(0))^2+(f^{'}(0))^2=0` for all :math:`\theta\in\mathbb{R}`. Assume that :math:`f(\theta_0)\neq 0` for some :math:`\theta_0 \in\mathbb{R}`. Then :math:`g(\theta_0)=(f(\theta_0))^2+(f^{'}(\theta_0))^2>0`. This contradiction proves that :math:`f(\theta)=0` everywhere on :math:`\mathbb{R}` and therefore :math:`\boxed{\cos(\theta-\beta)=\cos(\theta)\cos(\beta)+\sin(\theta)\sin(\beta)}`.

In the above proof we used the fact that if the derivative of a function is zero everywhere, then this function has a constant value. This can be proven using the mean value theorem as follows: Let :math:`[a,b]\subset\mathbb{R}` with :math:`a<b`. Then :math:`g(\theta)` is differentiable on :math:`[a,b]`. According to the mean value theorem, there exists :math:`\xi \in (a,b)` such that 

.. math::
	g^{'}(\xi)=\frac{g(b)-g(a)}{b-a}=0 \Rightarrow g(b)=g(a), \forall a,b \in \mathbb{R}, \quad\therefore \boxed{g(\theta)=const}

In order to prove the mean value theorem, it is possible to define another function :math:`G:\mathbb{R}\to\mathbb{R}` as :math:`G(\theta)=g(\theta)+\alpha\theta` for some :math:`\alpha\in\mathbb{R}` where is as previously defined. Then for any interval :math:`[a,b]\subset\mathbb{R}`, :math:`G(\theta)` is differentiable on :math:`[a,b]`. Also, :math:`\alpha` can be chosen in such a way that :math:`G(a)=G(b)`. Since :math:`G(a)=g(a)+\alpha a` and :math:`G(b)=g(b)+\alpha b`, Choosing :math:`\alpha=(g(b)-g(a))/(a-b)` would imply that :math:`G(a)=G(b)`. Since :math:`G(\theta)` is differentiable on :math:`[a,b]`, according to Rolle's theorem, there exists :math:`\xi \in (a,b)` such that

.. math::
	G^{'}(\xi)=0=g^{'}(\xi)+\frac{g(b)-g(a)}{a-b}\Rightarrow \boxed{g^{'}(\xi)=\displaystyle\frac{g(b)-g(a)}{b-a}}

Once it is known that :math:`G(a)=G(b)`, there are only three possibilities for the behaviour of :math:`G(\theta)` on some point :math:`\theta_0 \in (a,b)`. The first possibility is that :math:`G(a)=G(\theta_0)=G(b)`. If this is true for any :math:`\theta_0 \in (a,b)` then :math:`G(\theta)` is constant on :math:`[a,b]` and its derivative is zero at any :math:`\xi\in(a,b)` because of the definition of derivative as follows:

.. math::
	G^{'}(\xi)=\underset{\theta \to \xi}{\lim}\frac{G(\theta)-G(\xi)}{\theta -\xi}=\underset{\theta \to \xi}{\lim}\frac{0}{\theta -\xi}=0

The second possibility is that for some :math:`\theta_0 \in (a,b)`, :math:`G(\theta_0)>G(a)=G(b)`. In this case the Weierstrass' maximum-minimum theorem guarantees the existence of some :math:`\theta_{max}\in (a,b)` such that :math:`G(\theta_{max})\geq G(\theta_0)>G(a)=G(b)` and for any :math:`\theta \in (a,b)`, :math:`G(\theta)\leq G(\theta_{max})`. We also know that :math:`G^{'}(\theta_{max})` exits and is equal to the right-hand and left-hand derivatives of :math:`G` at :math:`\theta_{max}`.

.. math::
	0\leq\underset{\theta \to {\theta _{max}} ^{-}}{\lim}\frac{G(\theta)-G(\theta _{max})}{\theta -\theta _{max}}=G^{'}(\theta _{max})=\underset{\theta \to {\theta _{max}}^{+}}{\lim}\frac{G(\theta)-G(\theta _{max})}{\theta -\theta _{max}}\leq 0

From the above inequalities it is clear that :math:`\boxed{G^{'}(\theta _{max})=0}`. This completes the proof of Rolle`s theorem since the only remaining possibility is that for some :math:`\theta_0 \in (a,b)`, :math:`G(\theta_0)<G(a)=G(b)` and the proof of this case is identical to the previous case.  

While proving Rolle's theorem we made use of the Weierstrass' maximum-minimum theorem which states that if a function is continuous on a closed interval :math:`[a,b]`, then this function has a maximum and a minimum value on :math:`[a,b]`. We can start the proof of the Weierstrass' maximum-minimum theorem by showing that the continuity of :math:`f:[a,b]\to\mathbb{R}` on :math:`[a,b]` implies its boundedness on :math:`[a,b]`. This can be proven by contradiction. Assume that :math:`f:[a,b]\to\mathbb{R}` is continuous but not bounded. Then for any :math:`n\in\mathbb{N}` there must be :math:`x_n\in [a,b]` such that :math:`\lvert f(x_n)\lvert > n`. Obviously, :math:`\lbrace x_n \rbrace` is a sequence bounded by a and b. From the boundedness of :math:`\lbrace x_n \rbrace` it follows that :math:`\lbrace x_n \rbrace` has a convergent subsequence :math:`\lbrace x_{n_k} \rbrace` such that :math:`x_{n_k}\to c\in [a,b]`. Since :math:`f` is a continuous function, :math:`f(x_{n_k})\to f(c)`. This means that for any real number :math:`\varepsilon > 0`, there exists :math:`k_0\in\mathbb{N}` such that if :math:`\lvert x_{n_k}-c \rvert < 1/n_{k_0}` then :math:`\lvert f(x_{n_k})-f(c)\rvert < \varepsilon` and :math:`\lvert f(x_{n_k})\rvert < \varepsilon + \lvert f(c) \rvert`. Since :math:`\lbrace x_{n_k} \rbrace` converges to :math:`c`, it is possible to choose k large enough so that :math:`\lvert x_{n_k}-c \rvert <1/n_{k_0}` and :math:`\varepsilon+\lvert f(c) \rvert < n_k`. But in this case we obtain :math:`\lvert f(x_{n_k} \rvert < n_k` which is in contradiction with our initial assumption that :math:`\lvert f(x_n)\rvert >n` for any :math:`n\in\mathbb{N}`. This proves the boundedness of :math:`f:[a,b]\to\mathbb{R}`. As a result, :math:`f` has a supremum :math:`S` on :math:`[a,b]`. Using the definition of supremum, we know that for every :math:`n\in\mathbb{N}` there exists :math:`x_n \in [a,b]` such that :math:`S-1/n < f(x_n) \leq S` from which :math:`f(x_n)\to S` follows. This gives us another bounded sequence :math:`\lbrace x_n \rbrace` with a convergent subsequence :math:`x_{n_k}\to c` in :math:`[a,b]` and :math:`f(x _{n_k})\to f(c)`. Since :math:`f(x _{n_k})` is a subsequence of :math:`f(x_n)`, these two sequences have to converge to the same limit such that :math:`f(c)=S`. Since :math:`c\in[a,b]` and :math:`\forall x\in[a,b]`, :math:`f(x)\leq f(c)`, this completes the proof of the maximum part of the Weierstrass' maximum-minimum theorem. The minimum part can be proven in the same way.  

**References**

.. _1:

[1] Muldowney, James S. ; “Mathematics 117 Lecture Notes”, University of Alberta
