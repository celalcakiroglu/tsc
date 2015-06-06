2D Truss System Solver
=======================

.. raw:: html

   <head>
      <meta charset="utf-8" />
      <title>2 Dimensional Truss Solver</title>
   </head>
   <body onload="listen()">
      <canvas id="webgl" width ="650" height="650">
      Use html5 supporting browser
      </canvas>
      <p>The larger of total system width and height[mm]
      <input type="text" id="totalSize" style="width: 70px;">
      </p>
      <p>
        x[mm] <input type="text" id="x" style="width: 70px;">
        y[mm] <input type="text" id="y" style="width: 70px;">
        <input type="checkbox" id="xConstraint" >x constraint
        <input type="checkbox" id="yConstraint" >y constraint
      </p>
      <p>
        x-Force[N] <input type="text" id="xForce" style="width: 70px;">
        y-Force[N] <input type="text" id="yForce" style="width: 70px;">
        <button id="addNode" type="button">Add Node</button>
      </p>
      <p>
        Young's modulus[MPa] <input type="text" id="eModul" style="width: 70px;">
        Area[mm2] <input type="text" id="area" style="width: 70px;">
      </p>
      <p>
        First Node <select id="firstNode" size="1"></select>
        Second Node<select id="secondNode" size="1"></select>
        <button id="addBar" type="button">Add Bar</button>
      </p>
      <p>
        Bar List <select id="barList" size="1"></select>
        <button id="solve" type="button">Solve</button>
      </p>
      <script>
        function listen(){
        main();
        }
      </script>
      
      <script>
         //Vertex shader program
          var VSHADER_SOURCE=
          //Add an attribute here for clicking mode and 
          //Boundary drawing mode
          //Then write an if condition inside the shader
          'attribute vec4 a_Position;\n'+
          'void main(){\n'+
          'gl_Position=a_Position;\n'+
          'gl_PointSize=5.0;\n'+
          '}\n';
          //Fragment shader Program
          var FSHADER_SOURCE=
          'precision mediump float;\n'+
          //'uniform vec4 u_FragColor;\n'+
          'void main(){\n'+
          'gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);\n'+
          '}\n';

          var n_coords=new Float32Array(1200);//all points
          var bDefined=false;//The boundary isn't defined yet
          var nCoords=0;//Number of vertex coordinates (total)
          var bars=[];//all bars
          var nodes=[];//all nodes
          var numNodes=0;//Total number of nodes
          var numBars=0;//Total number of edges
          var scaleFactor=1;
          var dofCodeVec=[];//This vector contains the codes for the unknown displacements

          function node(x,y, xForce, yForce, index, xConstraint, yConstraint){
            this.index=index;
            this.x=x;
            this.y=y;
            if(!isNaN(xForce)){
              this.xForce=xForce; 
            }
            else{
              this.xForce=0;
            }
            if(!isNaN(yForce)){
              this.yForce=yForce; 
            }
            else{
              this.yForce=0;  
            }
            this.xConstraint=xConstraint;
            this.yConstraint=yConstraint;
            this.string="Node"+this.index+":("+this.x+","+this.y+")";
            this.codeVec=[];
            this.edges=[];//Will contain the edges that have this node
          }
          function bar(nodeIndex1, nodeIndex2, index, Emodul, Area){
            this.index=index;
            this.E=Emodul;
            this.A=Area;
            this.nodeIndices=[nodeIndex1, nodeIndex2];//Will contain the indices of the nodes of the edge
            this.coords= new Float32Array([nodes[nodeIndex1].x, nodes[nodeIndex1].y, nodes[nodeIndex2].x, nodes[nodeIndex2].y]);
            this.scaledCoords=new Float32Array([scaleFactor*nodes[nodeIndex1].x, scaleFactor*nodes[nodeIndex1].y, 
              scaleFactor*nodes[nodeIndex2].x, scaleFactor*nodes[nodeIndex2].y]);
            this.string="Bar"+this.index+":Node"+nodeIndex1+"("+nodes[nodeIndex1].x+","+ nodes[nodeIndex1].y+")"+"->"+
            "Node"+nodeIndex2+"("+nodes[nodeIndex2].x+","+ nodes[nodeIndex2].y+")";
            this.L=Math.sqrt((this.coords[2]-this.coords[0])*(this.coords[2]-this.coords[0])+
                     (this.coords[3]-this.coords[1])*(this.coords[3]-this.coords[1]));
            this.c=(this.coords[2]-this.coords[0])/this.L;//cosTheta
            this.s=(this.coords[3]-this.coords[1])/this.L;//sinTheta
            this.locStifMat=[[this.E*this.A/this.L, -this.E*this.A/this.L],[-this.E*this.A/this.L, this.E*this.A/this.L]];
            // this.globStifMat=[[this.E*this.A*this.c*this.c/this.L,this.E*this.A*this.c*this.s/this.L, -this.E*this.A*this.c*this.c/this.L, -this.E*this.A*this.c*this.s/this.L],
            // [this.E*this.A*this.c*this.s/this.L, this.E*this.A*this.s*this.s/this.L, -this.E*this.A*this.c*this.s/this.L, -this.E*this.A*this.s*this.s/this.L],
            // [-this.E*this.A*this.c*this.c/this.L, -this.E*this.A*this.c*this.s/this.L, this.E*this.A*this.c*this.c/this.L, this.E*this.A*this.c*this.s/this.L],
            // [-this.E*this.A*this.c*this.s/this.L, -this.E*this.A*this.s*this.s/this.L, this.E*this.A*this.c*this.s/this.L, this.E*this.A*this.s*this.s/this.L]];
            this.locDispVec=[];
            this.locForceVec=[];
            this.globDispVec=numeric.mul(0,numeric.random([4]));
            this.globForceVec=numeric.mul(0,numeric.random([4]));
            this.transMat=[[this.c, this.s,0,0],[0,0,this.c, this.s]];
            this.globStifMat=numeric.dot(numeric.transpose(this.transMat),numeric.dot(this.locStifMat,this.transMat));
            this.codeVec=[nodes[nodeIndex1].codeVec[0],nodes[nodeIndex1].codeVec[1],nodes[nodeIndex2].codeVec[0],nodes[nodeIndex2].codeVec[1]];
          }

          function main(){
            var canvas = document.getElementById('webgl');
            var addNodeBtn=document.getElementById('addNode');
            var addBarBtn=document.getElementById('addBar');
            var solveBtn=document.getElementById('solve');
            var totalSizeTxt=document.getElementById('totalSize');
            var xTxt=document.getElementById('x');
            var yTxt=document.getElementById('y');
            var xForceTxt=document.getElementById('xForce');xForceTxt.defaultValue="0";
            var yForceTxt=document.getElementById('yForce');yForceTxt.defaultValue="0";
            var ETxt=document.getElementById('eModul');
            var ATxt=document.getElementById('area');
            var xConstraintCheckBox=document.getElementById('xConstraint');
            var yConstraintCheckBox=document.getElementById('yConstraint');
            var firstNodeDropDown=document.getElementById('firstNode');
            var secondNodeDropDown=document.getElementById('secondNode');
            var elementListDropDown=document.getElementById('barList');
            var gl=getWebGLContext(canvas); 
            if(!gl){
              console.log('Failed to get the rendering context for WebGL');
              return;
            }
            else{console.log('success getting the rendering context');}
            if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
              console.log('Failed to initialize shaders');
              return;
            }
            else{console.log('success initializing the shaders');}
            gl.clearColor(0.78,0.87,0.88,1.0);//blueish grey
            gl.clear(gl.COLOR_BUFFER_BIT);
            //++++++++++++++++++++++++++++++++++++++++++
            // Linear algebra examples. We start with a matrix.
            A = [[1,2,3],
               [4,5,6],
               [7,3,9]];
              // Let's also make a vector.
              x = [3,1,2];
              // Matrix-vector product.
            b = numeric.dot(A,x);
            //console.log(b);
            // Matrix inverse.
            Ainv = numeric.inv(A);
            // Determinant
            numeric.det(A);
            // Eigenvalues.
            ev = numeric.eig(A)
            //Solving the linear problem Ax=b
            var A=[[1,2],[3,4]];var b=[17,39];var otherMatrix=[[4,3],[2,1]];
            var C=numeric.dot(A,otherMatrix);
            x1=numeric.solve([[1,2],[3,4]],[17,39]);
            x=numeric.solve(A,b);
            //console.log(x1);console.log(x);
            //console.log("iki matris carpiminin sonucu:");
            //console.log(C);
            //console.log("zero matrix:");
            //console.log(numeric.mul(0,numeric.random([3, 3])));
            //++++++++++++++++++++++++++++++++++++++++++
            canvas.onmousedown=function(ev){click(ev, gl, canvas)};
            addNodeBtn.onclick=function(ev){addNode(ev,gl, totalSizeTxt, xTxt, yTxt, xForceTxt, yForceTxt,
              xConstraintCheckBox, yConstraintCheckBox,firstNodeDropDown,secondNodeDropDown)};
            addBarBtn.onclick=function(ev){addBar(ev,gl, firstNodeDropDown, secondNodeDropDown,elementListDropDown, ETxt, ATxt)};   
            solveBtn.onclick=function(ev){solve(ev, gl)};
          }
          
          function addNode(ev,gl, totalSizeTxt, xTxt, yTxt, xForceTxt,yForceTxt, xConstraintCheckBox, 
            yConstraintCheckBox,firstNodeDropDown,secondNodeDropDown){
            scaleFactor=2/(1.2*parseFloat(totalSizeTxt.value));//A very small number, the entered coordinates will be multiplied with this before being plotted
            var xCoord=parseFloat(xTxt.value);var xCoordScaled=scaleFactor*parseFloat(xTxt.value);
            var yCoord=parseFloat(yTxt.value);var yCoordScaled=scaleFactor*parseFloat(yTxt.value);
            var xForce=parseFloat(xForceTxt.value);
            var yForce=parseFloat(yForceTxt.value);
            var xIsConstrained=xConstraintCheckBox.checked;
            var yIsConstrained=yConstraintCheckBox.checked;
            if(!xIsConstrained){dofCodeVec.push(nCoords);}
            if(!yIsConstrained){dofCodeVec.push(nCoords+1);}
            n_coords[nCoords]=xCoordScaled;//These are for drawing
            n_coords[nCoords+1]=yCoordScaled;
            nCoords+=2;
            var newNode= new node(xCoord, yCoord,xForce, yForce, numNodes,xIsConstrained, yIsConstrained);
            newNode.codeVec.push(nCoords-2);newNode.codeVec.push(nCoords-1);
            nodes.push(newNode);
            var newNodeOptionFirstNode=document.createElement("option");
            var newNodeOptionSecondNode=document.createElement("option");
            newNodeOptionFirstNode.text=newNode.string;//The entries of the drop-down are called options
            newNodeOptionSecondNode.text=newNode.string;
            firstNodeDropDown.add(newNodeOptionFirstNode);
            secondNodeDropDown.add(newNodeOptionSecondNode);
            numNodes+=1;
            var vertexBuffer = gl.createBuffer(); 
            if(!vertexBuffer){console.log('Failed to create the buffer object');return -1;} 
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//Binding the buffer object to target
            gl.bufferData(gl.ARRAY_BUFFER, n_coords, gl.STATIC_DRAW);//Write data into buffer
            var a_Position=gl.getAttribLocation(gl.program, 'a_Position');
            if(a_Position<0){
              console.log('Failed to get the storage location of a_Position');
              return;
            }
            else{console.log('success getting the storage location of a_Position');}
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Position);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, numNodes);
            //Following loop is necessary because other wise if you define some of the elements and then add one more node
            //The elements that have already been drawn are erased from the canvas
            for(var i=0;i<numBars;i+=1){
              var dizi=new Float32Array([bars[i].scaledCoords[0], bars[i].scaledCoords[1],
                bars[i].scaledCoords[2],bars[i].scaledCoords[3]]);
              gl.bufferData(gl.ARRAY_BUFFER, dizi, gl.STATIC_DRAW);//Write data into buffer
              gl.drawArrays(gl.LINES, 0, 2);
            }
          }
          
          function addBar(ev, gl, firstNodeDropDown, secondNodeDropDown, elementListDropDown, ETxt, ATxt){
            var firstNodeIndex=firstNodeDropDown.selectedIndex;
            var secondNodeIndex=secondNodeDropDown.selectedIndex;
            var Emodul=parseFloat(ETxt.value);
            var Area=parseFloat(ATxt.value);
            var newBar = new bar(firstNodeIndex, secondNodeIndex, numBars, Emodul, Area);
            bars.push(newBar);numBars+=1;
            var newBarOption=document.createElement("option");
            newBarOption.text=newBar.string;
            elementListDropDown.add(newBarOption);
            //Draw
            var vertexBuffer = gl.createBuffer(); 
            if(!vertexBuffer){console.log('Failed to create the buffer object');return -1;} 
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//Binding the buffer object to target
            gl.bufferData(gl.ARRAY_BUFFER, n_coords, gl.STATIC_DRAW);//Write data into buffer
            var a_Position=gl.getAttribLocation(gl.program, 'a_Position');
            if(a_Position<0){
              console.log('Failed to get the storage location of a_Position');
              return;
            }
            else{console.log('success getting the storage location of a_Position');}
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Position);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, numNodes);
            for(var i=0;i<numBars;i+=1){
              var dizi=new Float32Array([bars[i].scaledCoords[0], bars[i].scaledCoords[1],
                bars[i].scaledCoords[2],bars[i].scaledCoords[3]]);
              gl.bufferData(gl.ARRAY_BUFFER, dizi, gl.STATIC_DRAW);//Write data into buffer
              gl.drawArrays(gl.LINES, 0, 2);
            }
          }
          
          function solve(ev, gl){
            var K=numeric.mul(0,numeric.random([nCoords, nCoords]));//nCoords and the largest code in any code vector are identical
            for(var i=0;i<nCoords;i++){
              for(var j=0;j<nCoords;j++)K[i][j]=parseFloat(K[i][j]);
            }
            for(var i=0;i<bars.length;i+=1){
              for(var j=0;j<4;j+=1){
                for(var k=0;k<4;k+=1){
                  var index1=bars[i].codeVec[j];
                  var index2=bars[i].codeVec[k];
                    K[index1][index2]+=parseFloat(bars[i].globStifMat[j][k]); 
                }
              }
            }
            console.log("The global stiffness matrix is:");
            console.log(K);
            var subLoadVec=[];
            var subIndices=[];
            var subDispVec=[];
            var dispVec=numeric.mul(0,numeric.random([nCoords, 1]));
            for(var i=0;i<dispVec.length;i++)dispVec[i]=parseFloat(dispVec[i]);
            var loadVec=numeric.mul(0,numeric.random([nCoords]));
            for(var i=0;i<loadVec.length;i++)loadVec[i]=parseFloat(loadVec[i]);
            //+++++++++++++++++++++++++++++++++++++++++
            for(var i=0;i<nodes.length;i+=1){
              console.log(nodes[i].xConstraint);
              if(!nodes[i].xConstraint){
                subLoadVec.push(nodes[i].xForce);
                subIndices.push(nodes[i].codeVec[0])  ;
              }
              if(!nodes[i].yConstraint){
                subLoadVec.push(nodes[i].yForce);
                subIndices.push(nodes[i].codeVec[1]);
              }
            }
            console.log("the sub external force vector is:");
            console.log(subLoadVec);
            var subK=numeric.mul(0,numeric.random([subLoadVec.length,subLoadVec.length]));
            for(var i=0;i<subIndices.length;i++){
              for(var j=0;j<subIndices.length;j++){
                subK[i][j]=parseFloat(K[subIndices[i]][subIndices[j]]);//this may not be needed because I parsed K in the beginning
              }
            }
            subDispVec=numeric.solve(subK,subLoadVec);
            console.log("sub stiffness matrix is:");
            console.log(subK);
            console.log("sub displacement vector is:");
            console.log(subDispVec);
            for(var i=0;i<subIndices.length;i++){
              dispVec[subIndices[i]]=parseFloat(subDispVec[i]);
            }
            console.log("total displacement vector is:")
            console.log(dispVec);
            //loadVec = numeric.dot(K , dispVec);
            //For some reason the above multiplication did not work.
            //therefore I multiplied with a loop
            for(var k=0;k<nCoords;k++){
              for(var m=0;m<nCoords;m++){
                loadVec[k]+=K[k][m]*dispVec[m];
              }
            }
            console.log("total load vector is:");
            console.log(loadVec);
            //Assign the global force vectors for each truss member
            for(var i=0;i<bars.length;i++){
              for(var j=0;j<4;j+=1){
                var index=bars[i].codeVec[j];
                bars[i].globForceVec[j]=parseFloat(loadVec[index]);//parseFloat is the key to make the dot products work
                bars[i].globDispVec[j]=parseFloat(dispVec[index]);
              }
              bars[i].locDispVec=numeric.dot(bars[i].transMat,bars[i].globDispVec);
              bars[i].locForceVec=numeric.dot(bars[i].locStifMat,bars[i].locDispVec);
            }
            console.log("First member:");
            console.log(bars[0].locForceVec[1]);
            console.log("Second member:");
            console.log(bars[1].locForceVec[1]);
          }
      </script>
      
   </body>
   </html>


Direct Stiffness Method for 2D Trusses
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- **Step 1:** Definition of the joint positions and the truss members between the joints. This includes the cross section area and Young's modulus for each truss member as well as the boundary conditions for each joint. In the process of defining the joint positions, also for each joint a code vector is defined. The code vector of each joint consists of two numbers corresponding to the two possible directions of displacement that the joint can undergo. The assignment of code numbers to the joints(also called "nodes" in the rest of this text) is such that the first node has the code vector :math:`(0,1)`, the second node has the code vector :math:`(2,3)` and so on. The joint positions and these code vectors are packed together in a data structure called "node". Later on, while the truss members are being defined, the geometry and material properties of each truss member are packed together in a data structure called "bar". The "bar" data structure also contains a code vector which is established by joining the code vectors of the two nodes belonging to the particular truss member.  

- **Step 2:** Definition of the local member stiffness matrices :math:`\mathbf{k^{'}}`. These matrices are defined with respect to the local coordinate system :math:`(`:math:`(x^{'},y^{'})` in Figure 1 :math:`)` of each member.

.. math::
  \mathbf{k^{'}} = \begin{bmatrix} \displaystyle\frac{EA}{L} & -\displaystyle\frac{EA}{L} \\ -\displaystyle\frac{EA}{L} & \displaystyle\frac{EA}{L} \end{bmatrix}

- **Step 3**: Definition of the coordinate transformation matrices :math:`\mathbf{t}` for each truss member. Using these matrices the local member stiffness matrices, local displacements(:math:`u_1^{'}, u_2^{'}`) and forces(:math:`q_1^{'}, q_2^{'}`) at each end of the truss members are transformed into the global coordinate system. These matrices are populated by the cosines and sines of the angle between the member axis and the global x-coordinate system (usually a horizontal axis).

.. _CoordTrans:
.. figure:: 2DTruss/LocalGlobalDispsForces.JPG
   :height: 589 px
   :width: 916 px
   :scale: 65 %
   :align: center

   Figure 1: Member end forces and displacements in local and global coordinates

.. math::
  \mathbf{t} = \begin{bmatrix} \cos{\theta_x} & \sin{\theta_x} & 0 & 0 \\ 0 & 0 & \cos{\theta_x} & \sin{\theta_x} \end{bmatrix}


In Figure 1 :math:`u_{1x},u_{1y}, u_{2x}, u_{2y}` and :math:`q_{1x},q_{1y}, q_{2x}, q_{2y}` denote the global end displacements and end forces respectively.The conversion of the forces, displacements and the stiffness matrices between the local and global coordinate systems can be done as follows:

.. math::
  \mathbf{q} = \mathbf{t^T}\mathbf{q^{'}}, \quad \mathbf{u^{'}} = \mathbf{t}\mathbf{u}, \quad \mathbf{q}=\mathbf{k}\mathbf{u} \Rightarrow \mathbf{k}=\mathbf{t^T}\mathbf{k^{'}}\mathbf{t}

- **Step 5**: Assemblage of the global stiffness matrix for the entire system from the global stiffness matrices of the bars. This operation uses the code vectors of the truss members. As mentioned in step 1, each 2D truss member is assigned a code vector consisting of 4 numbers. As an example if a bar is located between the first and third (in the order of definition) nodes of the system, then the code vector of this bar would be :math:`(0, 1, 4, 5)`. The data structure "bar" contains a vector called "codeVec" where the numbers :math:`(0, 1, 4, 5)` would be stored for this particular bar. Let's assume as an example that the total number of nodes in the system is 3. Then the total number of possible joint displacements (in other words the total degrees of freedom of the system) would be 6 and the global system stiffness matrix would be a 6X6 matrix. Let's call this matrix :math:`\mathbf{K}`. In the process of programming this method, :math:`\mathbf{K}` is initialized as a zero matrix. Afterwards the entries of the member global stiffness matrices are added to the proper parts of :math:`\mathbf{K}`. In case of the example bar the following operations would be necessary: :math:`\mathbf{K}[0][0]+=\mathbf{k}[0][0]`, :math:`\mathbf{K}[0][1]+=\mathbf{k}[0][1]`, :math:`\mathbf{K}[0][4]+=\mathbf{k}[0][2]`, :math:`\mathbf{K}[0][5]+=\mathbf{k}[0][3]`, :math:`\mathbf{K}[1][4]+=\mathbf{k}[1][2]`, :math:`\mathbf{K}[1][5]+=\mathbf{k}[1][3]` and so on. The following pseudocode would do this operation for all bars in the system and assemble the system global stiffness matrix

  ::

    for(i =0;i<total number of bars;i++)
      for(j=0;j<4;j++)
        for(m=0;m<4;m++)
          index1=bars[i].codeVec[j]
          index2=bars[i].codeVec[m]
          K[index1][index2]+=bars[i].k[j][m]
        next
      next
    next

- **Step 6**: Partitioning of the global stiffness matrix :math:`\mathbf{K}`, the global displacement vector :math:`\mathbf{U}` and the global force vector :math:`\mathbf{Q}`. :math:`\mathbf{Q}` and :math:`\mathbf{U}` are related to each other as follows: 

  .. math::
    \mathbf{Q} = \mathbf{K}\mathbf{U}

  In the above equation both :math:`\mathbf{Q}` and :math:`\mathbf{U}` have known and unknown parts by the definition of the system such that where :math:`\mathbf{U}` is known, :math:`\mathbf{Q}` is unknown and vice versa. In order to come up with an equation system from which the unknown parts of :math:`\mathbf{U}` can be solved, a sub global stiffness matrix :math:`\mathbf{K_s}` as well as sub load and displacement vectors :math:`\mathbf{Q_s}` and :math:`\mathbf{U_s}` have to be defined. For this purpose the code values in the entire system corresponding to the degrees of freedom where the displacement is unknown but the force is known, are packed into a vector called "subIndices". Also, the known forces at these degrees of freedom are packed into the vector :math:`\mathbf{Q_s}`. The next step is to initialize :math:`\mathbf{K_s}` as a zero matrix and then to populate it using the following pseudocode.

  ::

    for(i=0;i<length of subIndices;i++)
      for(j=0;j<length of subIndices;j++)
        Ks[i][j]=K[subIndices[i]][subIndices[j]]
      next
    next  

- **Step 7**: The unknown displacements :math:`\mathbf{U_s}` are solved from the equation system :math:`\mathbf{Q_s}=\mathbf{K_s}\mathbf{U_s}`. Afterwards the values in :math:`\mathbf{U_s}` are added to the initially zero vector :math:`\mathbf{U}` using the following pseudocode.

  ::

    for(i=0;i<length of subIndices;i++)
      U[subIndices[i]]=Us[i]
    next

- **Step 8**: Computation of the force vector with :math:`\mathbf{Q}=\mathbf{K}\mathbf{U}`. 
- **Step 9**: Using :math:`\mathbf{Q}` and :math:`\mathbf{U}`, global force and displacement vectors :math:`\mathbf{q}` and :math:`\mathbf{u}` are assigned to each truss member as follows.

  ::

    for(i=0;i<total number of bars;i++)
      for(j=0;j<4;j++)
        index=bars[i].codeVec[j]
        bars[i].q[j]=Q[index]
        bars[i].u[j]=U[index]
      next
    next

- **Step 10**: For each truss member, the global load and displacement vectors are transformed into the local coordinate system in order to compute the axial forces and displacements of each truss member. The equations :math:`\mathbf{u^{'}}=\mathbf{t}\mathbf{u}` and :math:`\mathbf{q^{'}}=\mathbf{k^{'}}\mathbf{u^{'}}` are used. As shown in Figure 1 the local force :math:`\mathbf{q_2^{'}}` is defined as a tensile force. In Figure 1, :math:`\mathbf{q_1^{'}}` and :math:`\mathbf{q_2^{'}}` correspond to :math:`\mathbf{q^{'}[0]}` and :math:`\mathbf{q^{'}[1]}` respectively. Therefore a positive value of :math:`\mathbf{q^{'}[1]}` indicates tension in the member whereas a negative value indicates compression.

**References**

.. _1: 

[1] Hibbeler R.C., Structural Analysis, 8th edition, ISBN:9780132570534
   