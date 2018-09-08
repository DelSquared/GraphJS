<p align="left">
  <img src="https://raw.githubusercontent.com/DelSquared/GraphJS/master/docs/GJSLogo.png" width="400"/> <b>Version: 1.1</b> </p>
GraphJS is a library designed to facilitate computation within the context of Graph Theory for Javascript (currently in development).
For a demo implemented using p5.js click [here](https://delsquared.github.io/GraphJS/). (Rough knowledge of the browser console is required)

Here is a screenshot of the demo. The central diagram is the graph and the diagram at the bottom left is a representation of the adjacency matrix of said graph:
<p align="center">
  <img src="https://raw.githubusercontent.com/DelSquared/GraphJS/master/docs/DemoScreenshot.png" width="600"/>
</p>

## Importing

To include in your HTML, use the following line:<br>
`<script src="https://cdn.rawgit.com/DelSquared/GraphJS/817b5539/lib/Graph.js" type="text/javascript"></script>`

## Matrix Commands

`nullMatrix(n)`: Creates an _n_ x _n_ matrix of zeros

`SumM(A)`: Sums over all the entries of `A`

`det(A)`: Returns the determinant of `A` (Temporarily removed due to buggy and poor implementation)

`Tr(A)`: Returns the trace of `A`

`Trans(A)`: Returns the transpose of `A`

`Add(A,B)`: Adds matrices `A` and `B`

`Subt(A,B)`: Subtracts `B` from `A`

`Mult(A,B)`: Multiplies `A` onto `B`

`MultTrans(M)`: Multiplies `M` onto its transpose. Use `MultTrans(Trans(M))` to reverse multiplication order

## Graphs

### Edge-Related Commands

`Edge (u,v)`: Creates an "edge" object taking in incident vertices `u` and `v`

`randomEdges(maxE,n)`: Returns an array of `Edge` objects for a random graph on `n` vertices with `maxE` as a max number of edges

`cyclicEdges(n)`: Returns an array of `Edge` objects for a cyclic graph on `n` vertices (_C_<sub>_n_</sub>)

`completeEdges(n)`: Returns an array of `Edge` objects for a complete graph on `n` vertices (_K_<sub>_n_</sub>)

`completeBipartiteEdges(n,p)`: Returns an array of `Edge` objects for a complete-Bipartite graph on `n` vertices with partitions `p` and `n-p` (_K_<sub>_p_,_n_-_p_</sub>)

`petersen10Edges()`: Returns an array of `Edge` objects for the Petersen-10 graph. Note that in the `Graph` constructor the argument `n=10` is mandatory to get the exact Petersen graph with no added disconnected vertices.

### Graph Object

**Arguments:** `(n,edgeList)` where `n` is the number of vertices and `edgeList` is an array of `Edge` objects one can pass the edge-list functions directly into the constructor to get a particular graph, alternatively one can construct an array entirely from scratch.

**Attributes:**

`Graph.adjacencyMatrix`: The adjacency matrix constructed from the edge list compactly storing all information about the connections of the vertices

`Graph.n`: The number of vertices of the graph

`Graph.m`: The number of edges of the graph

`Graph.degreeMatrix()`: A method that returns the degree matrix of the graph

`Graph.laplaceMatrix()`: A method that returns the Laplace matrix of the graph

`Graph.incidenceMatrix()`: A method that returns the incidence matrix of the graph

`Graph.swapVertexLabel(u,v)`: A method that gives an automorphism of the graph by swapping the label of the two given vertices `u` and `v`

## Planned Future Additions

- A separate p5.js wrapper library to facilitate drawing and visualisation. Ideal for teaching.

- Graph colouring algorithms.

- Implement more matrix representation like the Seidel Matrix, etc.

- Implement more Linear Algebra concepts like spectra, determinant, characteristic polynomials, etc.

- Including Typescript in order to speed up the code by having fixed variable types.

- Possible WebGL inclusion to accelerate matrix calculations.
