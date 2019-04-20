//api google sheets key
//AIzaSyDHAJmLW7ogG9jQV_Dja-uXNSzf8REybaM

let counter = -1
let lastEdge = 0
let lastLevel = 0
let lastLevelNodePointer = 0
let lvlCounter = 0
let lvlPointer = 0
let firstHeapAnimation = true
let heap = []
let edges = []
let heapLayout = {
  name: 'breadthfirst',
  directed: true,
  padding: 10,
  animate: true
}

//let nodo = localStorage.getItem("nodo")
function levelCounter(){
    let maxNodes = Math.pow(2, lvlCounter)
    if(lvlPointer<maxNodes){
        lvlPointer++
        return lvlCounter
    }else{
      lvlPointer=1
      return ++lvlCounter
    }
}
function levelPointer(){
  let maxNodes = Math.pow(2,lastLevel+1)
  if(lastLevelNodePointer<maxNodes){
    lastLevelNodePointer++
    return lastLevel
  }else{
    lastLevelNodePointer = 1
    return ++lastLevel
  }
}

function swap(n1_id,n2_id){
  /*let temp = heap[n1].value
  heap[n1].value=heap[n2].value
  heap[n2].value=temp*/
  //[heap[n1].value,heap[n2].value] = [heap[n2].value,heap[n1].value]
  //[heap[n1],heap[n2]]=[heap[n2],heap[n1]]
  //heap[n1].id="negro"
  //string.replace(/^F0+/i, '');
  const sx = 0
  const dx = 1
  //variabili implementate per rendere il codice più leggibile

  let n1 = heap[n1_id]
  let n2 = heap[n2_id]
  //nodi n1 e n2

  let n1_sons = [heap[n1_id*2+1],heap[n1_id*2+2]]
  let n2_sons = [heap[n2_id*2+1],heap[n2_id*2+2]]
  //foglie di n1 e n2

  let n1_edges = [edges[n1_id*2],edges[n1_id*2+1]]
  let n2_edges = [edges[n2_id*2],edges[n2_id*2+1]]
  //edges di n1 e n2

  let n1_p = n1.parent
  let n2_p = n2.parent
  //parents di n1 e n2

  //console.log("n1: ",n1,n1_sons,n1_edges,n1_p)
  //console.log("n2: ",n2,n2_sons,n2_edges,n2_p)

    [heap[n1_id],heap[n2_id]]=[heap[n2_id],heap[n1_id]] //swap nodi nell'heap
    //console.log("swap nodi nell'heap")
    [heap[n1_id*2+1],heap[n2_id*2+1]]=[heap[n2_id*2+1],heap[n1_id*2+1]] //swap figli sx
    //console.log("swap figli sx")
    [heap[n1_id*2+2],heap[n2_id*2+2]]=[heap[n2_id*2+2],heap[n1_id*2+2]] //swap figli dx
    //console.log("swap figli dx")
    [edges[n1_id*2],edges[n2_id*2]]=[edges[n2_id*2],edges[n1_id*2]] //swap edge sx
    //console.log("swap edge sx")
    [edges[n1_id*2+1],edges[n2_id*2+1]]=[edges[n2_id*2+1],edges[n1_id*2+1]] //swap edge dx
    //console.log("swap edge dx")
    [heap[n1_id].parent,heap[n2_id].parent]=[heap[n2_id].parent,heap[n1_id].parent] //swap genitori
    //console.log("swap genitori")

}

window.onload = function() {

  //let cy = cytoscape({container,elements[],style[selector,style],layout})
  let cy = cytoscape({

  container: document.getElementById('cy'), // container to render in
  // container: $('#cy'),

  elements: [],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'content': 'data(value)',
        'text-valign': 'center',
        'color': 'white',
        'background-color': '#666'//,
        //'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#ccc',
        'curve-style': 'bezier', // .. and target arrow works properly
        'text-margin-y' : - 8,
        "text-rotation" : "autorotate",
        // 'target-distance-from-node' : 2,
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],

  // see http://js.cytoscape.org/#layouts
  layout: {
    name: 'breadthfirst',
    rows: 1
  }
  });
  document.getElementById("addNode").addEventListener("click", function(){
    let identifier = 'n'+(++counter)+'l'+levelCounter()
    let val = Math.floor(Math.random() * 101)
    let s = ""
    let t = ""
    let node = cy.add({
      group: 'nodes',
      data: { id: identifier,value:val},
      //RIVEDERE POSITION
      //RIVEDERE POSITION
      //RIVEDERE POSITION
      position: { x:200+Math.floor(Math.random() * 251), y:200+Math.floor(Math.random() * 151) }
    });
    //adds edge
    if(lastEdge<counter && lastLevel<lvlCounter){
      s = 'n'+(Math.floor(lastEdge/2))+'l'+levelPointer()
      t = 'n'+(++lastEdge)+'l'+(lastLevel+1)
      let node = cy.add({
        group: 'edges',
        data: {id:s+t,source:s,target:t}
        //data: { id: 'e'+(Math.floor(lastEdge/2))+(lastEdge+1), source: 'n'+(Math.floor(lastEdge/2))+'l'+levelPointer(), target: 'n'+(++lastEdge)+'l'+(lastLevel+1) }
      });
      edges.push({id:s+t,source:s,target:t})
    }
    heap.push({id:identifier,value:val,parent:s})
    if(!firstHeapAnimation){
      let layout = cy.layout(heapLayout)
      layout.run()
    }
  });
  document.getElementById("randomLayout").addEventListener("click", function(){
    firstHeapAnimation=true
    let options = { name: 'random', animate: true};
    let layout = cy.layout(options)
    layout.run();
  });
  document.getElementById("heapLayout").addEventListener("click", function(){
      firstHeapAnimation=false
      let layout = cy.layout(heapLayout)
      layout.run();
  });
}
