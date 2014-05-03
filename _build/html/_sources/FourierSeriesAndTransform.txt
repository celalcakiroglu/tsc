Fourier Series and the Fourier Transform
==================================================

Fourier Series
---------------------------
The Fourier series representation of a periodic discrete-time signal :math:`x(n)` is defined as

.. math:: x(n)=\sum_{k=0}^{N-1}c_k e^{j2\pi kn/N}
	:label: fourier

where :math:`N` is the fundamental period of :math:`x(n)`. In equation :eq:`fourier`, :math:`c_k` denotes the Fourier coefficients of :math:`x(n)` and they represent the frequency components contained in :math:`x(n)`. For each :math:`k \in \lbrace 0, 1, ..., N-1 \rbrace`, :math:`c_k` can be calculated as

.. math:: c_k=\frac{1}{N}\sum_{n=0}^{N-1}x(n)e^{-j2\pi kn/N}
	:label: fourierCoeff

Equation :eq:`fourierCoeff` can be derived applying the following 4 steps:

- **Step 1**: Both sides of equation :eq:`fourier` are multiplied by :math:`e^{-j2\pi ln/N}`, where :math:`l \in \lbrace 0, 1, ..., N-1 \rbrace`.

.. math:: x(n) e^{-j2\pi ln/N} & = \sum _{k=0}^{N-1} c_k e^{j 2\pi (k-l) n/N }                        \\
        	             & = \sum _{k=0}^{N-1} c_k \Big\lbrace e^{j2\pi (k-l)/N}\Big\rbrace^n   \\
        	  :label: fourierArranged
    
- **Step 2**: Let :math:`r=e^{j2\pi (k-l)/N}` and sum both sides of equation :eq:`fourierArranged` over the index :math:`n`

.. math::
	:label: fourierSum1

	\sum _{n=0}^{N-1}x(n)e^{-j2\pi ln/N} = \sum _{k=0}^{N-1} c_k \sum _{n=0}^{N-1} r^n

- **Step 3**: Using the geometric series summation:

.. math::
	
	\begin{equation*}
	\sum _{n=0}^{N-1} r^n= \left\{ \begin{array}{ll}
  N & \mbox{ if $ k=l$}\\
   \displaystyle\frac{1-r^N}{1-r} & \mbox{ if $k \neq l$}
  \end{array}
  \right. = \left\{ \begin{array}{ll}
  N & \mbox{ if $ k=l$}\\
   \displaystyle\frac{1- e^{j2\pi (k-l)} }{1-e^{j2\pi (k-l)/N}} & \mbox{ if $k \neq l$}
  \end{array}
  \right.
  \end{equation*}

.. math:: e^{j2\pi (k-l)}=\cos{2\pi (k-l)} + j\sin{2\pi (k-l)}=1 \Rightarrow \sum _{n=0}^{N-1} r^n= \left\{ \begin{array}{ll}
  N & \mbox{ if $ k=l$}\\
   0 & \mbox{ if $k \neq l$}
  \end{array}
  \right.

- **Step 4**: Plugging the result of step 3 in equation :eq:`fourierSum1` we obtain:

.. math:: \sum _{n=0}^{N-1}x(n)e^{-j2\pi ln/N} = c_0 \cdot 0 + c_1 \cdot 0 + ... + c_l \cdot N + c_{l+1}\cdot 0 + ... +c_{N-1}\cdot 0 = c_l \cdot N

.. math:: c_l=\frac{1}{N}\sum _{n=0}^{N-1}x(n)e^{-j2\pi ln/N}