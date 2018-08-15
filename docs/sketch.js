var h=window.innerHeight-20,w=1200; //predetermined canvas dimensions
var n = 10
var m = 20

var g = new Graph(n,petersen10Edges());

var vertexRender = [];
for (i=0;i<n;i++){
  var x = 250*Math.cos(2*Math.PI*i/n) + w/2;
  var y = 250*Math.sin(2*Math.PI*i/n) + h/2;
  vertexRender.push([x,y]);
}

function setup() { //setting up canvas for p5.js to work on
  createCanvas(w, h); //canvas dimensions
  stroke(255); //line colour for drawing
  noFill(); //setting shape fill to none
  strokeWeight(2); //setting line and outline thickness
}

window.alert("Open console to manipulate graph");
console.log("type in 'g=new Graph(n,edgelist)' in the console to change g\nOptions:\n(n,randomEdges(m,n))\n(10,petersen10Edges())\n(n,completeBipartiteEdges(n,p))\n(n,completeEdges(n))\n(n,cyclicEdges(n))");

function draw() { //p5.js draw function. This is called once per frame
  background(0); //drawing the background
  //noFill(); //setting shape fill to none
  
  n=g.n;
  var vertexRender = [];
  for (i=0;i<n;i++){ //spacing vertices on a ring
    var x = 250*Math.cos(2*Math.PI*i/n) + w/2;
    var y = 250*Math.sin(2*Math.PI*i/n) + h/2;
    vertexRender.push([x,y]);
  }

  for (var i=0;i<n;i++){ //drawing all vertices 
    ellipse(vertexRender[i][0],vertexRender[i][1],10);
    //ellipse indicating vertex locations
  }
  for (var i=0;i<n;i++){ 
    for (var j=i;j<n;j++){ 
      if (g.adjacencyMatrix[i][j]==1){
        line(vertexRender[i][0],vertexRender[i][1],
            vertexRender[j][0],vertexRender[j][1]);
      }
    }
  }
  strokeWeight(1);
  for (var i=0;i<n;i++){ //drawing adjacency matrix
    for (var j=0;j<n;j++){
      if (g.adjacencyMatrix[i][j]==1){
        fill(255,150);
      }
      else{
        noFill();
      }
      rect(5*i+5,h+5*(j-n-1),5,5);
    }
  }
  strokeWeight(2);

}
