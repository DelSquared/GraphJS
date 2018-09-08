function nullMatrix(n){ //generates an nxn matrix of 0s
  var m = [];
  for (i=0;i<n;i++){
    m.push([]);
    for (j=0;j<n;j++){
      m[i].push(0);
    }
  }
  return m;
}

function SumM(A){ //sums over all the elements of the matrix given
  var s = 0;
  for (i=0;i<A.length;i++){
    for (j=0;j<A[0].length;j++){
      s+=A[i][j];
    }
  }
  return s;
}

function det(A){
	var newA = [];
	for (var i = 0; i<A.length-1; i++){
		newA.push([]);
		for (var j = 0; j<A.length-1; j++){
			newA[i].push(A[i][j]*A[i+1][j+1] - A[i+1][j]*A[i][j+1]);
		}
	}
	if (newA.length!=1){
		newA = det(newA);
		return newA;
	}
	else{
		return newA[0][0];
	}
}

function Tr(A){ //finds trace of given matrix
  var tr = 0;
  for (i=0;i<A.length;i++){
    tr += A[i][i];
  }
  return tr;
}

function Trans(A){ //transposes given matrix
  var B = [];
    for(var i = 0; i < A[0].length; i++){
          B.push([]);
        for(var j = 0; j < A.length; j++){
            B[i].push(A[j][i]);
        }
    }
    return B;
}

function Add(A,B){ //adds two matrices
  if (A.length != B.length || A[0].length != B[0].length){
    console.error("Matrix dimension mismatch");
  }
  var C = [];
  for (i=0;i<A.length;i++){
    C.push([]);
    for (j=0;j<A[0].length;j++){
      C[i].push(A[i][j] + B[i][j]);
    }
  }
  return C;
}

function subt(A,B){ //subtracts two matrices
  if (A.length != B.length || A[0].length != B[0].length){
    console.error("Matrix dimension mismatch");
  }
  var C = [];
  for (i=0;i<A.length;i++){
    C.push([]);
    for (j=0;j<A[0].length;j++){
      C[i].push(A[i][j] - B[i][j]);
    }
  }
  return C;
}

function Mult(A,B){ //multiplies two matrices
  var C = [];
  var s;
  for(var i = 0; i < A.length; i++){
    C.push([]);
      for(var j = 0; j < B[0].length; j++){
        s=0;
        for(var k = 0; k < A[0].length; k++){
            s += A[i][k]*B[k][j];
        }
        C[i].push(s);
      }
  }
  return C;
}

function MultTrans(M){ //multiplies a matrix by its transpose
  return Mult(M,Trans(M));
}

//=============================================================================

function Edge (u,v){ //general edge object taking in the two incident vertices
  this.u = u;
  this.v = v;
}

//=============================================================================

function randomEdges(maxE,n){ //generates an array of rangom edges
  var list = [];
  for (i=0;i<maxE;i++){
    var u = Math.floor(n*Math.random());
    var v = Math.floor(n*Math.random());
    if (u==v){
      v = (v+1)%n
    }
    let temp = new Edge(u,v);
    list.push(temp);
  }
  return list;
}

function cyclicEdges(n){ //generates the edges of a cyclic n-graph
  var list = [];
  for (i=0;i<n;i++){
    let temp = new Edge(i%n,(i+1)%n);
    list.push(temp);
  }
  return list;
}

function completeEdges(n){ //generates the edges of a complete n-graph
  var list = [];
  for (i=0;i<n;i++){
    for (j=0;j<n;j++){
      if (i!=j){
        let temp = new Edge(i,j);
        list.push(temp);
      }
    }
  }
  return list;
}
function completeBipartiteEdges(n,p){ //generates the edges of a complete bipartite n-graph with partition size p and n-p
  var list = [];
  for (i=0;i<p;i++){
    for (j=p;j<n;j++){
      if (i!=j){
        let temp = new Edge(i,j);
        list.push(temp);
      }
    }
  }
  return list;
}

function petersen10Edges(){  //generates the edges of a petersen 10-graph (must be passed along with n=10 in Graph constructor)
  var list = [new Edge(0,2),new Edge(0,3),new Edge(0,5),
              new Edge(1,3),new Edge(1,4),new Edge(1,6),
              new Edge(2,4),new Edge(2,7),new Edge(3,8),
              new Edge(4,9),new Edge(5,6),new Edge(5,9),
              new Edge(6,7),new Edge(7,8),new Edge(8,9)];
  return list;
}

//=============================================================================

function Graph(n,edges){ //graph object where "edges" is an edge list
  this.adjacencyMatrix = nullMatrix(n);
  this.n = n;
  for (i=0;i<edges.length;i++){
    this.adjacencyMatrix[edges[i].u][edges[i].v]=1; //sets up adjacency matrix
    this.adjacencyMatrix[edges[i].v][edges[i].u]=1;
  }
  this.m = 0.5*SumM(this.adjacencyMatrix);
  
  this.degreeMatrix = function(){ //generates degree matrix
    var degM = nullMatrix(n);
    const arrSum = arr => arr.reduce((a,b) => a + b, 0)
    for (i=0;i<this.n;i++){
      degM[i][i] = arrSum(this.adjacencyMatrix[i]);
    }
    return degM;
  };
  
  this.laplaceMatrix = function(){ //generates laplace matrix
    var lapM = nullMatrix(n);
    var degM = this.degreeMatrix();
    for (i=0;i<this.n;i++){
      for (j=i;j<this.n;j++){
        lapM[i][j] = degM[i][j] - this.adjacencyMatrix[i][j];
        lapM[j][i] = degM[j][i] - this.adjacencyMatrix[j][i];
      }
    }
    return lapM;
  };
  
  this.incidenceMatrix = function(){ //generates incidence matrix
    var inM = [];
    for (i=0;i<this.n;i++){
      for (j=i;j<this.n;j++){
        if(this.adjacencyMatrix[i][j]==1){
          var row = [];
          for(k=0;k<this.n;k++){
            if((k==i && k!=j) || (k==j && k!=i)){
              row.push(1);
            }
            else{
              row.push(0);
            }
          }
          inM.push(row);
        }
      }
    }
    return inM;
  };
  
  this.swapVertexLabel = function(u,v){ //generates an automorphism that swaps the labels of two vertices
    newAdj = nullMatrix(n);
    for (i=0;i<this.n;i++){
      for (j=0;j<this.n;j++){
        if ((i==u || i==v) && (j!=u && j!=v)){
          newAdj[i][j] = this.adjacencyMatrix[u+v-i][j]
        }
        else if ((i!=u && i!=v) && (j==u || j==v)){
          newAdj[i][j] = this.adjacencyMatrix[i][u+v-j]
        }
        else {
          newAdj[i][j] = this.adjacencyMatrix[i][j]
        }
      }
    }
    this.adjacencyMatrix = newAdj;
  };

}
