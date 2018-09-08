function nullMatrix(n){
  var m = [];
  for (i=0;i<n;i++){
    m.push([]);
    for (j=0;j<n;j++){
      m[i].push(0);
    }
  }
  return m;
}

function SumM(A){
  var s = 0;
  for (i=0;i<A.length;i++){
    for (j=0;j<A[0].length;j++){
      s+=A[i][j];
    }
  }
  return s;
}

function Tr(A){
  var tr = 0;
  for (i=0;i<A.length;i++){
    tr += A[i][i];
  }
  return tr;
}

function Trans(A){
  var B = [];
    for(var i = 0; i < A[0].length; i++){
          B.push([]);
        for(var j = 0; j < A.length; j++){
            B[i].push(A[j][i]);
        }
    }
    return B;
}

function Add(A,B){
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

function subt(A,B){
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

function Mult(A,B){
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

function MultTrans(M){
  return Mult(M,Trans(M));
}

function Edge (u,v){
  this.u = u;
  this.v = v;
}

function randomEdges(maxE,n){
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

function cyclicEdges(n){
  var list = [];
  for (i=0;i<n;i++){
    let temp = new Edge(i%n,(i+1)%n);
    list.push(temp);
  }
  return list;
}

function completeEdges(n){
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
function completeBipartiteEdges(n,p){
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

function petersen10Edges(){
  var list = [new Edge(0,2),new Edge(0,3),new Edge(0,5),
              new Edge(1,3),new Edge(1,4),new Edge(1,6),
              new Edge(2,4),new Edge(2,7),new Edge(3,8),
              new Edge(4,9),new Edge(5,6),new Edge(5,9),
              new Edge(6,7),new Edge(7,8),new Edge(8,9)];
  return list;
}

function Graph(n,edges){
  this.adjacencyMatrix = nullMatrix(n);
  this.n = n;
  for (i=0;i<edges.length;i++){
    this.adjacencyMatrix[edges[i].u][edges[i].v]=1;
    this.adjacencyMatrix[edges[i].v][edges[i].u]=1;
  }
  this.m = 0.5*SumM(this.adjacencyMatrix);
  
  this.degreeMatrix = function(){
    var degM = nullMatrix(n);
    const arrSum = arr => arr.reduce((a,b) => a + b, 0)
    for (i=0;i<this.n;i++){
      degM[i][i] = arrSum(this.adjacencyMatrix[i]);
    }
    return degM;
  };
  
  this.laplaceMatrix = function(){
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
  
  this.incidenceMatrix = function(){
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
