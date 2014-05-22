Discrete Time Signals
===============================
Examples of signal sources that might be filtered:

*aircraft altitude, concentration of a species in a liquid, level of liquid in a tank, flux of a liquid into a tank, pressure, electric current, various vibration measurements, audio signals, pixels of an image, vehicle velocity, air humidity*

Discrete - time :math:`(DT)` signals can be obtained by sampling continuous time signals or they can be discrete in nature. :math:`DT` signals are denoted like :math:`x(n)` where :math:`n` is the sample index. :math:`n` usually starts from :math:`0` and increases with unit steps :math:`(\Delta n =1)`. If this is not the case, the following transformation can be applied:

Let :math:`n(k)` be the sequence of time instants such that for any :math:`k \in \mathbb{N}`, :math:`n(k)=n(0)+k\Delta n`, where :math:`n(0) \neq 0` and :math:`\Delta n \neq 1`. We can define a time sequence :math:`{n(k)}'` which satisfies the requirements of zero initial time and unit time step as follows: Let :math:`{n(k)}'=an(k) + b`, :math:`k \in \mathbb{N}` and impose the initial conditions :math:`{n(0)}'=0`, :math:`{n(1)}'=1`. Then we obtain the following two equations:

.. math:: {n(0)}'=an(0)+b \Rightarrow b=-an(0)
	:label: nPrime1

.. math:: {n(1)}'=an(1)+b \Rightarrow 1=an(1)-an(0)=a\Delta n \Rightarrow a=\frac{1}{\Delta n}, b=-\frac{1}{\Delta n} n(0)
	:label: nPrime2

Inserting these two equations in the expression for :math:`{n(k)}'` gives:

.. math:: {n(k)}'=\frac{1}{\Delta n} n(k)  -\frac{1}{\Delta n} n(0)= \frac{1}{\Delta n} \Big( n(k)-n(0)  \Big) = \frac{1}{\Delta n}k \Delta n = k

.. _Powen:

Power and energy of a signal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The power of a DT signal :math:`x(n)` is defined as:

.. math:: P_x = \lim_{N\to \infty}\displaystyle\frac{1}{2N+1}\sum_{n=-N}^{N}|x(n)|^2

If a signal has finite power, then the signal is called **power signal**

The energy of a DT signal :math:`x(n)` is defined as:

.. math:: E_x = \sum_{n=-\infty}^{\infty}|x(n)|^2

If a signal has finite energy, then the signal is called **energy signal**.
The power of an energy signal is equal to zero and the energy of a power signal is infinite.

.. _EWMA:

Exponentially Weighted Moving Average (EWMA) Filters
---------------------------------------------------------