Machine Learning
======================================

Basic Concepts
--------------------------------------

**Hyperplane:** :math:`\lbrace \mathbf{x} : \mathbf{w}^T\mathbf{x}=b \rbrace`, :math:`\mathbf{w,x}\in \mathbb{R}^d`, :math:`b\in \mathbb{R}`. This is a set of points in :math:`\mathbb{R}^d` with a constant inner product to a given vector :math:`\textbf{w} \in \mathbb{R}^d`. The constant :math:`b` determines the offset of the hyperplane :math:`(\textbf{w},b)` from the origin. 

**Input Space** :math:`X` **:** Space of the examples :math:`\mathbf{x}_t`, :math:`t \in \lbrace 1, 2, ..., l \rbrace`. :math:`X` is a subset of :math:`\mathbb{R}^d`. :math:`X` may be a vector space of image vectors or vectors containing any data.

**Output Domain** :math:`Y` **:** For binary classification of the vectors in :math:`X`, :math:`Y=\lbrace -1, 1  \rbrace`. 
Every :math:`\mathbf{x}_t` in the training set :math:`S\subseteq X` must be assigned a label :math:`y_t \in Y` in order to train the classification function. Therefore we could think of the training set :math:`S` as a set consisting of pairs of data vectors and their corresponding labels :math:`(\mathbf{x}_t, y_t)`.

Linear Binary Classification
---------------------------------------

**Classification function:**  The classification function is defined as

.. math:: f(\mathbf{x}_t;\mathbf{w}, b)= \left\{ \begin{array}{ll}
  1 & \mbox{ if $ \langle \mathbf{w}, \mathbf{x}_t \rangle +b \geq 0$}\\
   -1 & \mbox{else}
  \end{array}
  \right.
  :label: linClassF  

In Eq. :eq:`linClassF` :math:`\mathbf{w}` is a parameter vector having the same dimension as the training sample vectors :math:`\mathbf{x}_t` and :math:`b` is the bias parameter which sets the distance of the decision boundary between two classes (:math:`DB`) from the origin. It can be proven that the vector :math:`\mathbf{w}` is orthogonal to the decision boundary which is defined as :math:`DB=\lbrace \mathbf{x} \in \mathbb{R}^d : \langle \mathbf{x}, \mathbf{w} \rangle + b = 0 \rbrace`.

Let :math:`\mathbf{x}_A, \mathbf{x}_B \in DB` and :math:`\mathbf{x}_A \neq \mathbf{x}_B`. Then, :math:`\langle \mathbf{x}_A, \mathbf{w} \rangle +b =0` and :math:`\langle \mathbf{x}_B, \mathbf{w} \rangle + b = 0`. It follows that :math:`\langle \mathbf{x}_A, \mathbf{w} \rangle = \langle \mathbf{x}_B, \mathbf{w} \rangle` and :math:`\langle \mathbf{x}_A - \mathbf{x}_B, \mathbf{w} \rangle = 0`. Therefore :math:`\mathbf{w}` is orthogonal to any line joining any two elements in :math:`DB` and defines the direction of :math:`DB`.

that correctly classifies all the vectors in the training data :math:`S\subseteq X` ,

For the classification :math:`sign(f(\mathbf{x}_t))` is used. If :math:`y_t=sign(f(\mathbf{x}_t))` this implies correct classification. The convention :math:`sign(0)=1` is used.

**Margin:** The margin of an example :math:`(\mathbf{x}_t, y_t)` with respect to a hyperplane :math:`(\mathbf{w},b)` is given as 

.. math::
	\gamma_t = y_t(\mathbf{w}^T\mathbf{x}_i +b)

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