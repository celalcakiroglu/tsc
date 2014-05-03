Fourier Series and the Fourier Transform
==================================================

Fourier Series
---------------------------
The Fourier series representation of a periodic discrete-time signal :math:`x(n)` is defined as

.. math:: x(n)=\sum_{k=0}^{N-1}c_k e^{j2\pi kn/N}
	:label: fourier

where :math:`N` is the fundamental period of :math:`x(n)`. In equation :eq:`fourier`, :math:`c_k` are the Fourier coefficients of :math:`x(n)` and they represent the frequency components contained in :math:`x(n)`. For each :math:`k \in \lbrace 0, 1, ..., N-1 \rbrace`, :math:`c_k` can be calculated as

.. math:: c_k=\frac{1}{N}\sum_{n=0}^{N-1}x(n)e^{-j2\pi kn/N}
	:label: fourierCoeff

Equation :eq:`fourierCoeff` can be derived applying the following steps:

- **Step 1**: Both sides of equation :eq:`fourier` are multiplied by :math:`e^{-j2\pi ln/N}`, where :math:`l \in \lbrace 0, 1, ..., N-1 \rbrace`.

.. math::

    x(n) e^{-j2\pi ln/N} & = \sum _{k=0}^{N-1} c_k e^{j 2\pi (k-l) n/N }                        \\
        	             & = \sum _{k=0}^{N-1} c_k \Big\lbrace e^{j2\pi (k-l)/N}\Big\rbrace^n   \\
    
- **Step 2**: Let :math:`r=e^{j2\pi (k-l)/N}` and sum the equation of step 2 over the index :math:`n`

.. math::
	:label: fourierSum1

	\sum _{n=0}^{N-1}x(n)e^{-j2\pi ln/N} = \sum _{k=0}^{N-1} c_k \sum _{n=0}^{N-1} r^n

- **Step 3**: Using the geometric series summation . 