Flow Between Parallel Plates
=================================
This section is about the computation and visualization of the velocity and pressure fields in a fluid between two parallel plates using OpenFOAM and ParaView. The plates are assumed to be infinitely large and the fluid is assumed to be incompressible. The results obtained by OpenFOAM are compared to the analytical solutions available for this particular flow case. 

The fluid is set in motion due to the shear forces caused by the movement of the plates relative to each other. The positions and velocities of the plates are given in Figure 1 with respect to a cartesian coordinate system (x,y,z). 

.. _Plates:
.. figure:: Coutte/Plates.jpg
   :height: 515 px
   :width: 892 px
   :scale: 70 %
   :align: center

   Figure 1: Parallel plates and the cartesian coordinate system [1_]

The plates are a distance 2h apart from each other and the coordinate system is centered in the middle of this distance so that the top plate is located at z=h and the bottom plate is located at z=-h. The Navier-Stokes equations describing incompressible fluid flow are given below:

x-direction: 

y-direction:

z-direction:

**References**

.. _1: 

[1] Granger R.A., Fluid Mechanics, Dover Publications, 1995, ISBN:9781621986546
