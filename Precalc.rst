Pre-calculus
=================

Number sets
~~~~~~~~~~~~~~~~~~~~
* Real numbers :math:`\mathbb{R}`: This set contains all the numbers that we deal with in calculus except complex numbers.
* Natural numbers or positive integers :math:`\mathbb{N}`: This set consists of the integers :math:`\lbrace 1, 2, 3, ...\rbrace`
* Integers :math:`\mathbb{Z}`: :math:`\lbrace..., -3, -2, -1, 0, 1, 2, 3, ...\rbrace`.
* Rational numbers :math:`\mathbb{Q}`: These are the numbers that we obtain by dividing one integer by another integer. In other words, for every rational number :math:`q\in\mathbb{Q}`, there exist two integers :math:`p,r\in\mathbb{Z}, r\neq 0` such that :math:`q=p/r`.

Axioms of the set of real numbers :math:`\mathbb{R}`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* For any :math:`a,b\in\mathbb{R}`, :math:`a+b\in\mathbb{R}` and :math:`a\cdot b \in \mathbb{R}` (Closure law).
* For any :math:`a,b\in\mathbb{R}`, :math:`a+b=b+a` and :math:`a\cdot b=b\cdot a` (Commutative law).
* For any :math:`a,b,c\in\mathbb{R}`, :math:`(a+b)+c=a+(b+c)` and :math:`(a\cdot b)\cdot c=a\cdot (b\cdot c)` (Associative law).
* For any :math:`a,b,c\in\mathbb{R}`, :math:`a\cdot(b+c)=ab+ac` and :math:`(a+b)\cdot c=ac+bc` (Distributive law).

Factoring Polynomials
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For any :math:`a,b,c,x\in\mathbb{R}`:

* :math:`a^2-b^2=(a+b)(a-b)`
* :math:`a^2 +2ab+b^2=(a+b)^2`
* :math:`a^2 -2ab+b^2=(a-b)^2`
* :math:`a^3+b^3=(a+b)(a^2-ab+b^2)`
* :math:`a^3-b^3=(a-b)(a^2+ab+b^2)`
* :math:`x^2+(a+b)x+ab=(x+a)(x+b)`
* To factor :math:`ax^2+bxy+cy^2`, find two factors of :math:`ac` that add to :math:`b`. Let :math:`ac=f_1 f_2` such that :math:`f_1+f_2=b`. Then the polynomial can be written as :math:`ax^2+f_1xy+f_2xy+cy^2`. Since :math:`a=f_1f_2/c`, the polynomial can be written as 

.. math::
	\frac{f_1f_2}{c}x^2+f_1xy+f_2xy+cy^2&=\frac{1}{c}(f_1f_2x^2+f_1cxy+f_2cxy+c^2y^2)\\
	&=f_1cx(f_2x+y)+cy(f_2x+y)\\
	&=(f_2x+y)(f_1cx+cy) 

As an example let's factor the polynomial :math:`3x^2+8xy+4y^2`: Since :math:`3\cdot 4=12=6\cdot 2 \text{ and } 8=6+2`, we have 

.. math::
	3x^2+8xy+4y^2&=3x^2+6xy+2xy+4y^2\\
	   &=3x(x+2y)+2y(x+2y)\\
	   &=(3x+2y)(x+2y)
  