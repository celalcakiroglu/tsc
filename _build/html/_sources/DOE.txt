Design and Outcome of Tensile Strain Experiments
===================================================
This  section  explains  the  general  design  process  of  the  full scale  specimen  as  well  as  the  details  of  the  preliminary numerical analysis. Based on the estimated forces acting on the specimen, proper dimensions are determined for the end plates. Also  this  section  describes  the  test  setup  and  the  flaw cutting procedure schematically.

In the scope  of this project  a total of 8  full scale  experiments (testMat_)  will  be  carried  out. 

.. _testMat:
.. csv-table:: **Test matrix**
   :header: "Test number", "Specimen length", "Internal pressure (% SMYS)", "Flaw length [mm]", "Flaw depth [mm]"
   :widths: 5, 5, 7, 5, 5	

   "1", 72", "80", "50", "1.7"
   "2", 72", "30", "50", "1.7"
   "3", 72", "80", "50", "3.4"
   "4", 72", "30", "50", "3.4"
   "5", 48", "80", "150", "1.7"
   "6", 48", "30", "150", "1.7"
   "7", 48", "80", "150", "3.4"
   "8", 48", "30", "150", "3.4" 

.. _pipeSpecs:

+------------------+---------------------------------------------------+
|       Nominal Pipe Specifications                                    |
+==================+===================================================+
| OD               |        324 mm                                     |
+------------------+---------------------------------------------------+
| Wall thickness   |   6.91 mm  and some 7.16 mm heavy wall sections   |
+------------------+---------------------------------------------------+
| Grade            |   359 MPa                                         |
+------------------+---------------------------------------------------+
| Coating          |   Extruded Polyethylene (a.k.a. yellow jacket)    |
+------------------+---------------------------------------------------+
| Long seam        |   ERW                                             |
+------------------+---------------------------------------------------+
| Vintage          |   1983                                            |
+------------------+---------------------------------------------------+
| Manufacturer     |   IPSCO                                           |
+------------------+---------------------------------------------------+

End Plate Design
-----------------------------------
First Tensile Strain Experiment
-----------------------------------

Strain measurements of the first test
--------------------------------------

.. _Axial0ATest1:
.. figure:: Axial0ATest1.png
   :height: 385px
   :width: 706 px
   :scale: 100 %
   :align: left

   Axial strain gauge measurements at the bottom side of the specimen


.. _firstStrainProfile:
.. figure:: _static/StrainProfileTest1.png
   :height: 515px
   :width: 1015 px
   :scale: 70 %
   :align: left

   Strain profile of the first full scale specimen.

In Test 1 strain gauge data was available throughout the test ( :ref:`Axial strain gauges bottom side 1<Axial0ATest1>`). However this time instead of the gauge in the middle, the gauge 2 OD away from the end plate is used in the plots( :ref:`strain profile 1<firstStrainProfile>`). The reason for this was the erroneous measurements of the middle gauge. In  :ref:`strain profile 1<firstStrainProfile>`, the profile of each frame is plotted by joining strain at three different points on the pipe surface. The point denoted by **Remote** is where the strain is obtained from the edge of the DIC area of interest close to the end plate. The point denoted by **Gauge** is where the strain is measured using an axial strain gauge located in the mid-length of the bottom side of the girth weld. The point denoted by **Crack** is where the strain is obtained from the edge of the DIC area of interest around the flaw.

From :ref:`strain profile 1<firstStrainProfile>` and :ref:`Axial strain gauges bottom side 1<Axial0ATest1>`  it can be seen that there is a sudden decrease in the strain gauge measurements after Frame 1200. This could possibly be due to a malfunctioning of the strain gauge. In order to have more realistic strain data for the location of the strain gauge, the gauge measurement values of frames 1300 and 1382 are estimated using the relationship between the DIC strains and gauge strains of the previous frames. The details of this method are given below.  

.. raw:: html

   <button type="button"
   onclick="document.getElementById('demo').innerHTML = Date()">
   Click me to display Date and Time.</button>

   <p id="demo"></p>
   <canvas id="glcanvas" width="440" height="200">
    Your browser doesn't appear to support the HTML5
   </canvas>
   <script>
      var canvas = document.getElementById("glcanvas");
      var ctx = canvas.getContext('2d');
      ctx.fillStyle='rgba(0,0,256,1.0)';
      ctx.fillRect(120, 10, 150, 150);
   </script>
   <table border="1" class="docutils">
      <thead>
         <caption> Strain profile of Test 1    </caption>
         <tr><th>Frame</th><th>Remote measurement (%)</th><th>2/3 Gauge reading</th><th>Crack side strain measurement (%)</th></tr>
      </thead>
      <tbody>
         <tr><td>600</td><td style="text-align:center">0.0477</td><td> 0.03115 </td><td style="text-align:center">0.03566 </td></tr>
         <tr><td>800</td><td style="text-align:center">0.2496</td><td>0.22352</td><td style="text-align:center">0.2265 </td></tr>
         <tr><td>1000</td><td style="text-align:center">0.6781</td><td>0.68817</td><td style="text-align:center">0.6731</td></tr>
         <tr><td>1200</td><td style="text-align:center">2.099</td><td>1.31304</td><td style="text-align:center">1.44583</td></tr>
         <tr><td>1300</td><td style="text-align:center">3.4</td><td><span style="color:red">1.97407</span></td><td style="text-align:center">1.86875</td></tr>
         <tr><td>1382</td><td style="text-align:center">4.8013</td><td><span style="color:red">2.72061</span></td><td style="text-align:center">2.39687</td></tr>
      </tbody>
   </table>
   <table border="1">
      <thead>
         <tr><th>Frame</th><th>Increase in the remote strain (%)</th><th>Ratio(left/right)</th><th>Increase in the gauge reading</th><th>Ratio (left/right)</th><th>Increase of the crack side strain (%)</th></tr>
      </thead>
      <tbody>
         <tr><td>800</td><td>0.2019</td><td>1.04954</td><td>0.19237</td><td>1.008017</td><td>0.19084</td></tr>
         <tr><td>1000</td><td>0.4285</td><td>0.922199</td><td>0.46465</td><td>1.040417</td><td>0.4466</td></tr>
         <tr><td>1200</td><td>1.4209</td><td>2.273938</td><td>0.62486</td><td>0.808644</td><td>0.77273</td></tr>
         <tr><td>1300</td><td>1.301</td><td></td><td><span style="color:red">0.66103</span></td><td></td><td>0.42292</td></tr>
         <tr><td>1382</td><td>1.40125</td><td></td><td><span style="color:red">0.74654</span></td><td></td><td>0.52812</td></tr>
         <tr><td></td><td>Mean</td><td><strong>1.415226</strong></td><td></td><td><strong>0.952359</strong></td><td></td></tr>
      </tbody>
   </table>

The red numbers in the first table above are calculated using the mean values of the ratios in the second table. For example 2.09108 in the first table is calculated as follows:

.. math::
   
   \displaystyle\frac{1}{2}\Big( \displaystyle\frac{3.4}{1.415226}+ 1.86875 \cdot 0.952359 \Big) = 2.09108

.. _firstStrainProfileCorrected:
.. figure:: _static/StrainProfileTest1Corrected.png
   :height: 515px
   :width: 1015 px
   :scale: 70 %
   :align: left

   Strain profile of the first full scale specimen.


.. container:: clearer

    .. image :: spacer.png

Second Tensile Strain Experiment
-----------------------------------

.. _secondTest:

+------------------+------------------------+
|              Test Configuration           |
+==================+========================+
| Flaw length      |   50 mm                |
+------------------+------------------------+
| Flaw depth       |   1.7 mm               |
+------------------+------------------------+
| Internal pressure|   30% SMYS (4.79 MPa)  |
+------------------+------------------------+
| Specimen length  |   72"                  |
+------------------+------------------------+

.. _Specimen2:
.. figure:: Pipe2.jpg
   :height: 2304px
   :width: 1296 px
   :scale: 25 %
   :align: left

   Second full scale specimen.

The focus of the second tensile strain experiment is the effect of internal pressure on the tensile strain capacity of the pipe. The tensile strain that the pipe experiences due to internal pressure and applied tensile displacement is measured using strain gauges and digital image correlation. The white painted and speckled areas in Figure(:ref:`Specimen2`) are the areas where the strain field is captured throughout the experiment using digital image correlation. The white area in the middle of the pipe is where the girth weld and the heat affected zone (HAZ) are located. The flaw is cut in the HAZ within 5 mm from the girth weld. 

In addition to digital image correlation, 19 strain gauges are mounted on different parts of the pipe surface. Since the cameras are not high enough to take pictures of the upper parts of the pipe, in these parts the strain values are measured using strain gauges(:ref:`Remote Strain Gauges`). Also at the mid-sections of both upper and lower parts of the pipe two rings of strain gauges are mounted in longitudinal and hoop directions. 

.. container:: clearer

    .. image :: spacer.png

Strain measurements of second test
-----------------------------------

.. _Remote Strain Gauges:
.. figure:: NW2_TopSideRemoteGauges.jpg
   :height: 418px
   :width: 743 px
   :scale: 85 %
   :align: center

   Remote strain at the top side

Figure(:ref:`Remote Strain Gauges`) shows strain measurements of the gauges one OD away from the top side end plate. The strain gauge measurements in Figure(:ref:`Remote Strain Gauges`) were able to record longitudinal strain values up to about 3.5% longitudinal strain. At this strain level all three gauges measuring tensile strain failed. This is expected since the gauges are designed to measure strain values up to 3%. In this Figure the strain gauges aligned with the flaw, 90° away from the flaw, 180° away from the flaw and 270° away from the flaw are plotted with blue, brown, green and purple colours respectively. The dropping of the measurements below zero indicates the failure of the strain gauge during the test. Therefore Figure(:ref:`Remote Strain Gauges`) gives only partial information about the development of the remote strain. It can be seen that the green curve measured negligible strain values. This indicates that on the side of the pipe opposite to the flaw, the tensile strains due to applied tension and compressive strains due to bending almost cancel each other.

.. _Middle Strain Gauges Top:
.. figure:: NW2_TopSideMiddleGauges.jpg
   :height: 415px
   :width: 769 px
   :scale: 85 %
   :align: center

   Middle strain at the top side

.. _Middle Strain Gauges Bottom:
.. figure:: NW2_BottomSideMiddleGauges.jpg
   :height: 416px
   :width: 769 px
   :scale: 85 %
   :align: center

   Middle strain at the bottom side

.. _HAZ Image Cor:
.. figure:: NW2_HAZ_Cor.png
   :height: 476px
   :width: 636 px
   :scale: 85 %
   :align: center

   HAZ image correlation for tensile strain

.. _Remote Image Cor:
.. figure:: NW2_RemoteStrain_Cor.png
   :height: 476px
   :width: 636 px
   :scale: 85 %
   :align: center

   Remote strain image correlation

In the diagrams of Figure(:ref:`Remote Strain Gauges`), Figure(:ref:`Middle Strain Gauges Top`) and Figure(:ref:`Middle Strain Gauges Bottom`) the notation used to label the strain gauges is explained on an example in the table below.

+------------+--------------------------------------------------------------------------------------+
| SG_A_0_1/2_A                                                                                      |
+============+======================================================================================+
| SG         | Strain gauge                                                                         |
+------------+--------------------------------------------------------------------------------------+
| First A    | Bottom side of the pipe  (Here B would indicate the top side)                        |
+------------+--------------------------------------------------------------------------------------+
| 0          | 0 degrees away from the girth weld flaw center in the circumferential direction      |
+------------+--------------------------------------------------------------------------------------+
| 1/2        | 1/2 of the specimen half length away from the end plate                              |
+------------+--------------------------------------------------------------------------------------+
| Second A   | Gauge is in the axial direction (Here H would indicate hoop direction)               |
+------------+--------------------------------------------------------------------------------------+

Deflection of the Pipe Axis
-----------------------------
In order to measure the deflection of the pipe axis 5 cable transducers are connected on the pipe surface. For this purpose a steel column is placed in front of the pipe on the opposite side of the flaw (Figure(:ref:`Specimen2`)). Cable transducers are connected to the beam using magnets. On the pipe side opposite to every cable transducer a nut is glued on the pipe surface using epoxy. Afterwards an eye bolt is screwed into each nut. The eye bolts are connected to the cable transducers using soldering wire.

.. _Deflections:
.. figure:: NW2_CableTrans.jpg
   :height: 416px
   :width: 769 px
   :scale: 85 %
   :align: center

   Pipe axis deflections

Figure(:ref:`Deflections`) shows the development of the deflections with respect to applied displacement. In this plot the displacement axis is limited to 60 mm since beyond that point no measurements could be made. The reason for that is the failure of the epoxy glue between the nut and the pipe surface when the tensile force on the soldering wire increases. The dropping of the value to zero indicates this failure. The notation used to label the cable transducers is explained on an example in the table below.

+------------+--------------------------------------------------------------------------------------+
| Cable A-1/3                                                                                       |
+============+======================================================================================+
| Cable      | Cable transducer                                                                     |
+------------+--------------------------------------------------------------------------------------+
| A          | Bottom side of the pipe                                                              |
+------------+--------------------------------------------------------------------------------------+
| 1/3        | The deflection is measured 1/3 of the specimen half length away from the end plate   |
+------------+--------------------------------------------------------------------------------------+

In Figure(:ref:`Deflections`) the measurements of the cable transducer on the bottom side 2/3 of the specimen half length away from the end plate appear to be noisy. In order to eliminate this noise, the measurements of this tranducer are filtered using an EWMA (:ref:`EWMA`) filter. 

.. _CableA2_3Original:
.. figure:: NW2_CableA2_3_original.png
   :height: 615px
   :width: 815 px
   :scale: 85 %
   :align: left

.. _CableA2_3Filtered:
.. figure:: NW2_CableA2_3_filtered.png
   :height: 615px
   :width: 815 px
   :scale: 85 %
   :align: right 

.. container:: clearer

    .. image :: spacer.png

Strain Profile of the Second Experiment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. _secondStrainProfile:
.. figure:: StrainProfileTest2.png
   :height: 515px
   :width: 1015 px
   :scale: 70 %
   :align: left

   Strain profile of the second full scale specimen.

.. raw:: html

   <table border="1" class="docutils">
      <thead>
         <caption> Strain profile of Test 2    </caption>
         <tr><th>Frame</th><th>Remote measurement (%)</th><th>1/2 Gauge reading</th><th>Crack side strain measurement (%)</th></tr>
      </thead>
      <tbody>
         <tr><td>600</td><td style="text-align:center">0.573</td><td> 0.48217 </td><td style="text-align:center">0.45 </td></tr>
         <tr><td>800</td><td style="text-align:center">1.836</td><td>1.21325</td><td style="text-align:center">0.902 </td></tr>
         <tr><td>1000</td><td style="text-align:center">3.08</td><td>1.98298</td><td style="text-align:center">1.37</td></tr>
         <tr><td>1200</td><td style="text-align:center">4.273</td><td>2.56218</td><td style="text-align:center">1.72</td></tr>
         <tr><td>1400</td><td style="text-align:center">4.89</td><td>2.91849</td><td style="text-align:center">2.036</td></tr>
         <tr><td>1500</td><td style="text-align:center">4.91875</td><td>2.93615</td><td style="text-align:center">2.046</td></tr>
         <tr><td>1600</td><td style="text-align:center">5.983</td><td><span style="color:red">3.71934</span></td><td style="text-align:center">2.66</td></tr>
         <tr><td>1797</td><td style="text-align:center">7.66</td><td><span style="color:red">4.95241</span></td><td style="text-align:center">3.85</td></tr>
      </tbody>
   </table>
   <table border="1">
      <thead>
         <tr><th>Frame</th><th>Increase in the remote strain (%)</th><th>Ratio(left/right)</th><th>Increase in the gauge reading</th><th>Ratio (left/right)</th><th>Increase of the crack side strain (%)</th></tr>
      </thead>
      <tbody>
         <tr><td>800</td><td>1.263</td><td>1.727581</td><td>0.73108</td><td>1.617434</td><td>0.452</td></tr>
         <tr><td>1000</td><td>1.244</td><td>1.616151</td><td>0.76973</td><td>1.644722</td><td>0.468</td></tr>
         <tr><td>1200</td><td>1.193</td><td>2.059738</td><td>0.5792</td><td>1.654857</td><td>0.35</td></tr>
         <tr><td>1400</td><td>0.617</td><td>1.731638</td><td>0.35631</td><td>1.127563</td><td>0.316</td></tr>
         <tr><td>1500</td><td>0.02875</td><td>1.627973</td><td>0.01766</td><td>1.766</td><td>0.01</td></tr>
         <tr><td>1600</td><td>1.06425</td><td></td><td><span style="color:red">0.783187</td><td></td><td>0.614</td></tr>
         <tr><td>1797</td><td>1.677</td><td></td><td><span style="color:red">1.233076</td><td></td><td>1.19</td></tr>
         <tr><td></td><td>Average</td><td><strong>1.752616</strong></td><td></td><td><strong>1.562115</strong></td><td></td></tr>
      </tbody>
   </table>


In the second full scale test, starting from Frame 800 significant strain values are recorded. In  :ref:`strain profile 2<secondStrainProfile>`, the profile of each frame is plotted by joining strain at three different points on the pipe surface. The point denoted by **Remote** is where the strain is obtained from the edge of the DIC area of interest close to the end plate. The point denoted by **Gauge** is where the strain is measured using an axial strain gauge located in the mid-length of the bottom side of the girth weld. The point denoted by **Crack** is where the strain is obtained from the edge of the DIC area of interest around the flaw.   