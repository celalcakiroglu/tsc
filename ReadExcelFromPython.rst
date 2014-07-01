Interaction with Excel and Eclipse
======================================
Reading and writing Excel files with ".csv", ".xls" or ".xlsx" extension using Python
---------------------------------------------------------------------------------------
Method 1: Using xlrd (for reading) and xlwt (for writing) packages together. The 'xlwt' package doesn't support the ".xlsx" format.
Installing and using the "xlwt" package in Windows:

- Step 1: Download 'xlwt' from `here <https://pypi.python.org/pypi/xlwt>`_ and extract it to the Python directory (eg: C:\Python27) 
- Step 2: Open the command prompt and change to the directory of 'xlwt' (e.g cd ..\\..\\Python27\\xlwt-0.7.5)
- Step 3: Run the following command in the command prompt:  ..\python setup.py install

The same 3 steps can be applied to install 'xlrd'

Method 2: Reading with the "xlrd" package and writing with `XlsxWriter <https://pypi.python.org/pypi/XlsxWriter/0.5.3>`_

Installing the "XlsxWriter" package in Windows:

Adding and removing secondary axes in excel charts
--------------------------------------------------------------
**Adding a secondary axis**

- Step 1: Click on the chart

- Step 2: Chart Tools -> Format

- Step 3: Click on the arrow in "Current selection", then click on the data series which you want on a secondary axis.

- Step 4: Format Selection -> Series Options -> Secondary axis.

**Remove a secondary axis**

- Step 1: Click on the chart.

- Step 2: Chart Tools -> Layout -> Axes -> Secondary axis -> None

Or just click on the axis and press delete.

Installing Eclipse and the Python plugin (PyDev)
-----------------------------------------------------
- Step 1: Download python from `here <https://www.python.org/downloads/>`_ and install.
