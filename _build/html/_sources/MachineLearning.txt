Machine Learning
======================================

Basic Concepts
--------------------------------------

**Hyperplane:** :math:`\lbrace \mathbf{x} : \mathbf{w}^T\mathbf{x}=b \rbrace`, :math:`\mathbf{w,x}\in \mathbb{R}^d`, :math:`b\in \mathbb{R}`. This is a set of points in :math:`\mathbb{R}^d` with a constant inner product to a given vector :math:`\textbf{w} \in \mathbb{R}^d`. The constant :math:`b` determines the offset of the hyperplane :math:`(\textbf{w},b)` from the origin. 

**Training Set** :math:`T` **:** The set of pairs :math:`(\mathbf{x}_t , y_t ) \subset \mathbb{R}^d \times \mathbb{R}` where the vectors :math:`\mathbf{x}_t` are samples  with known behaviour and :math:`y_t` are their labels. In classification, for each sample :math:`\mathbf{x}_t` in the training set, a label :math:`y_t` is assigned which classifies the sample in one of any given number of classes. In the notation :math:`\mathbf{x}_t`, :math:`t` belongs to the set :math:`\lbrace 1, 2, ..., l \rbrace` where :math:`l` is the total number of samples in the training set.

**Output Domain** :math:`Y` **:** For binary classification of the vectors in :math:`T`, the output domain is :math:`Y=\lbrace -1, 1  \rbrace`. A classifier function is developed based on the training set which assigns any new d-dimensional vectors to one of the classes -1 and 1 correctly. In the ideal case the samples in the training set describe the general behavour of the vectors in the class sufficiently so that the classifier function is able to classify any vector correctly, otherwise the classifier needs to be further updated. 

Linear Binary Classification
---------------------------------------

**Classification function:**  The classification function is defined as

.. math:: f(\mathbf{x}_t)= \left\{ \begin{array}{ll}
  1 & \mbox{ if $ \langle \mathbf{w}, \mathbf{x}_t \rangle +b > 0$}\\
   -1 & \mbox{else}
  \end{array}
  \right.
  :label: linClassF  

In Eq. :eq:`linClassF` :math:`\mathbf{w}` is a parameter vector having the same dimension as the training sample vectors :math:`\mathbf{x}_t` and :math:`b` is the bias parameter which sets the distance of the decision boundary between two classes (:math:`DB`) from the origin. It can be proven that the vector :math:`\mathbf{w}` is orthogonal to the decision boundary which is defined as :math:`DB=\lbrace \mathbf{x} \in \mathbb{R}^d : \langle \mathbf{x}, \mathbf{w} \rangle + b = 0 \rbrace`.

Let :math:`\mathbf{x}_A, \mathbf{x}_B \in DB` and :math:`\mathbf{x}_A \neq \mathbf{x}_B`. Then, :math:`\langle \mathbf{x}_A, \mathbf{w} \rangle +b =0` and :math:`\langle \mathbf{x}_B, \mathbf{w} \rangle + b = 0`. It follows that :math:`\langle \mathbf{x}_A, \mathbf{w} \rangle = \langle \mathbf{x}_B, \mathbf{w} \rangle` and :math:`\langle \mathbf{x}_A - \mathbf{x}_B, \mathbf{w} \rangle = 0`. Therefore :math:`\mathbf{w}` is orthogonal to any vector contained in the :math:`DB` and defines the direction of :math:`DB`.

**The Perceptron Algorithm:** This is a supervised learnign algorithm that is based on the gradual improvement of a classifier function until it classifies all the samples in the taining set correctly.
  
* Initialize: :math:`\mathbf{w}^{(0)}=\mathbf{0}`, :math:`b^{(0)}=0`, total number of updates=0, number of misclassifications in one pass=0, :math:`R=\max \Vert\mathbf{x}_t\Vert`
* for t=1 to number of samples: Check if :math:`y_t(\langle \mathbf{w}^{(k)}, \mathbf{x}_t \rangle + b^{(k)} )>0` is satisfied.
* If the above condition is not satisfied then do:

  - :math:`\mathbf{w}^{(k+1)}=\mathbf{w}^{(k)}+y_t\mathbf{x}_t`
  - :math:`b^{(k+1)}=b^{(k)}+y_tR^2` 

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