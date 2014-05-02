Reading and writing Excel files with ".csv", ".xls" or ".xlsx" extension using Python
=============================================================================================
Method 1: Using xlrd (for reading) and xlwt (for writing) packages together. The 'xlwt' package doesn't support the ".xlsx" format.
Installing and using the "xlwt" package in Windows:

- Step 1: Download 'xlwt' from `here <https://pypi.python.org/pypi/xlwt>`_ and extract it to the Python directory (eg: C:\Python27) 
- Step 2: Open the command prompt and change to the directory of 'xlwt' (e.g cd ..\\..\\Python27\\xlwt-0.7.5)
- Step 3: Run the following command in the command prompt:  ..\python setup.py install

The same 3 steps can be applied to install 'xlrd'

Method 2: Reading with the "xlrd" package and writing with `XlsxWriter <https://pypi.python.org/pypi/XlsxWriter/0.5.3>`_

Installing the "XlsxWriter" package in Windows:
