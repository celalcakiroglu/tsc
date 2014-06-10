Machine Learning
======================================

**Hyperplane:** :math:`\lbrace \mathbf{x} : \mathbf{w}^T\mathbf{x}=b \rbrace`, :math:`\mathbf{w,x}\in \mathbb{R}^n`, :math:`b\in \mathbb{R}`. This is a set of points in :math:`\mathbb{R}^n` with a constant inner product to a given vector :math:`\textbf{w} \in \mathbb{R}^n`. The constant :math:`b` determines the offset of the hyperplane :math:`(\textbf{w},b)` from the origin. 

**Input Space** :math:`X` **:** Space of the examples :math:`\mathbf{x}_i`, :math:`i \in \lbrace 1, 2, ..., l \rbrace`. :math:`X` is a subset of :math:`\mathbb{R}^n`. :math:`X` may be a vector space of image vectors or vectors containing any data.

**Output Domain** :math:`Y` **:** For binary classification of the vectors in :math:`X`, :math:`Y=\lbrace -1, 1  \rbrace`. For every :math:`\mathbf{x}_i \in X`, there is a label :math:`y_i \in Y`.


**Classification function:** Based on the assumption that there exists a hyperplane :math:`(\mathbf{w},b)` that correctly classifies all the vectors in the training data :math:`S\subseteq X` , the classification function is defined as

.. math:: \forall \mathbf{x}_i \in S, f(\mathbf{x}_i)=\mathbf{w}^T \mathbf{x}_i + b

For the classification :math:`sign(f(\mathbf{x}_i))` is used. If :math:`y_i=sign(f(\mathbf{x}_i))` this implies correct classification. The convention :math:`sign(0)=1` is used.

**Margin:** The margin of an example :math:`(\mathbf{x}_i, y_i)` with respect to a hyperplane :math:`(\mathbf{w},b)` is given as 

.. math::
	\gamma_i = y_i(\mathbf{w}^T\mathbf{x}_i +b)

.. math::
	\left\{ \begin{array}{ll}
  \gamma _i >0 & \mbox{ $\Rightarrow$ the classification is correct}\\
   \gamma _i <0 & \mbox{incorrect classification $\Rightarrow \mathbf{w}$ has to be updated}
  \end{array}
  \right.

**References**

.. _Jaakkola: 

Tommi Jaakkola, course materials for 6.867 Machine Learning, Fall 2006. MIT OpenCourseWare (http://ocw.mit.edu/), Massachusetts Institute of Technology. Downloaded on [26 May 2014].

.. _Cristianini:

Cristianini N., Shawe-Taylor John: An Introduction to Support Vector Machines and other Kernel Based Learning Methods, Cambridge University Press 2000