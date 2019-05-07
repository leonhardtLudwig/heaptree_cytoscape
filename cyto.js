//api google sheets key
//AIzaSyDHAJmLW7ogG9jQV_Dja-uXNSzf8REybaM
let n_elements = -1
let cyto
let counter = -1
let lastEdge = 0
let lastLevel = 0
let lastLevelNodePointer = 0
let lvlCounter = 0
let lvlPointer = 0
let firstHeapAnimation = true
let heap = []
let edges = []
let size = 0
let heapLayout = {
  name: 'breadthfirst',
  directed: true,
  padding: 10,
  animate: true
}
function printHeap(){
  for(let i = 0; i<heap.length;i++){
    console.log(heap[i][0]._private.data.value)
  }
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

window.onload = function() {

  //let cy = cytoscape({container,elements[],style[selector,style],layout})
  cyto = cytoscape({

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
        //'background-color': '#666'//,
        'background-color': '#6200EE'
        //'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#03DAC6',
        'curve-style': 'bezier', // .. and target arrow works properly
        'text-margin-y' : - 8,
        "text-rotation" : "autorotate",
        // 'target-distance-from-node' : 2,
        'target-arrow-color': '#018786',
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
    /*
    *PROBLEMA DELLA LIBRERIA
    */
    let identifier = 'n'+(++counter)+'l'+levelCounter()
    let val = Math.floor(Math.random() * 101)
    let s = ""
    let t = ""
    let node = cyto.add({
      group: 'nodes',
      data: { id: identifier,value:val},
      position: { x:200+Math.floor(Math.random() * 251), y:200+Math.floor(Math.random() * 151) }
    });
    heap.push(cyto.elements()[++n_elements])
    size++
    if(lastLevel<lvlCounter){
      s = 'n'+(Math.floor(lastEdge/2))+'l'+levelPointer()
      t = 'n'+(++lastEdge)+'l'+(lastLevel+1)
      let node = cyto.add({
        group: 'edges',
        data: {id:s+t,source:s,target:t}
      });
      edges.push(cyto.elements()[++n_elements])
    }
    if(!firstHeapAnimation){
      let layout = cyto.layout(heapLayout)
      layout.run()
    }

  });
  document.getElementById("randomLayout").addEventListener("click", function(){
    firstHeapAnimation=true
    let options = { name: 'random', animate: true};
    let layout = cyto.layout(options)
    layout.run();
  });
  document.getElementById("heapLayout").addEventListener("click", function(){
      firstHeapAnimation=false
      let layout = cyto.layout(heapLayout)
      layout.run();
  });


  function minHeapify(i){
    let largest_pos = i
    if (i*2+1 < size && heap[i*2+1]._private.data.value< heap[largest_pos]._private.data.value){
        largest = heap[i*2+1];
        largest_pos = i*2+1
    }
    if (i*2+2 < size && heap[i*2+2]._private.data.value < heap[largest_pos]._private.data.value) {
        largest_pos = i*2+2
    }
    if (largest_pos != i) {
        [heap[i], heap[largest_pos]]=[heap[largest_pos], heap[i]]
        minHeapify(largest_pos);
    }

  }

  function maxHeapify(i){
        let largest_pos = i
        if (i*2+1 < size && heap[i*2+1]._private.data.value> heap[largest_pos]._private.data.value){
            largest_pos = i*2+1
        }
        if (i*2+2 < size &&heap[i*2+2]._private.data.value>heap[largest_pos]._private.data.value ) {
            largest_pos = i*2+2
        }
        if (largest_pos != i) {
            [heap[i], heap[largest_pos]]=[heap[largest_pos], heap[i]]
            maxHeapify(largest_pos);
        }
    }

  document.getElementById("maxSort").addEventListener("click",function(){
    document.getElementById("maxSort").disabled=true
    document.getElementById("minSort").disabled=true
    for(let i = Math.floor(size/2)-1;i>=0;i--){
            minHeapify(i);
          }
        for(let i = 0; i<heap.length-1;i++){[heap[i], heap[i+1]]=[heap[i+1], heap[i]]}
        let oldSize = size;
        for(let i = heap.length-1;i>0;i--)
        {
            [heap[0], heap[i]]=[heap[i], heap[0]]
            size--
            minHeapify(0);
        }
        size = oldSize
        let counter = -1
        let lastEdge = 0
        let lastLevel = 0
        let lastLevelNodePointer = 0
        let lvlCounter = 0
        let lvlPointer = 0
        let levelCounter=function(){
          let maxNodes = Math.pow(2, lvlCounter)
          if(lvlPointer<maxNodes){
              lvlPointer++
              return lvlCounter
          }else{
            lvlPointer=1
            return ++lvlCounter
          }
        }
        let levelPointer=function(){
          let maxNodes = Math.pow(2,lastLevel+1)
          if(lastLevelNodePointer<maxNodes){
            lastLevelNodePointer++
            return lastLevel
          }else{
            lastLevelNodePointer = 1
            return ++lastLevel
          }
        }
        edges = []
        size = 0
        let n_elements = -1
        for(let i = 0; i<heap.length;i++){
          heap[i]=cyto.remove(heap[i])
          heap[i]=heap[i][heap[i].length-1]._private.data.value
        }
        for(let i = 0; i<heap.length;i++){
          //adding node
          let add = function(){
            let identifier = 'n'+(++counter)+'l'+levelCounter()
            let val = heap[i]
            let s = ""
            let t = ""
            let node = cyto.add({
              group: 'nodes',
              data: { id: identifier,value:val},
              position: { x:200+Math.floor(Math.random() * 251), y:200+Math.floor(Math.random() * 151) }
            });
            heap[i]=node
            size++
            if(lastLevel<lvlCounter){
              s = 'n'+(Math.floor(lastEdge/2))+'l'+levelPointer()
              t = 'n'+(++lastEdge)+'l'+(lastLevel+1)
              let node = cyto.add({
                group: 'edges',
                data: {id:s+t,source:s,target:t}
              });
              edges.push(cyto.elements()[++n_elements])
            }
          }
          add();
        }
        if(!firstHeapAnimation){
          let layout = cyto.layout(heapLayout)
          layout.run()
        }
  });

  document.getElementById("minSort").addEventListener("click",function(){
    document.getElementById("maxSort").disabled=true
    document.getElementById("minSort").disabled=true
    for(let i = Math.floor(size/2)-1;i>=0;i--){
            maxHeapify(i);
          }
        let oldSize = size;
        for(let i = heap.length-1;i>0;i--)
        {
            [heap[0], heap[i]]=[heap[i], heap[0]]
            size--
            maxHeapify(0);
        }
        size = oldSize
        let counter = -1
        let lastEdge = 0
        let lastLevel = 0
        let lastLevelNodePointer = 0
        let lvlCounter = 0
        let lvlPointer = 0
        let levelCounter=function(){
          let maxNodes = Math.pow(2, lvlCounter)
          if(lvlPointer<maxNodes){
              lvlPointer++
              return lvlCounter
          }else{
            lvlPointer=1
            return ++lvlCounter
          }
        }
        let levelPointer=function(){
          let maxNodes = Math.pow(2,lastLevel+1)
          if(lastLevelNodePointer<maxNodes){
            lastLevelNodePointer++
            return lastLevel
          }else{
            lastLevelNodePointer = 1
            return ++lastLevel
          }
        }
        edges = []
        size = 0
        let n_elements = -1
        for(let i = 0; i<heap.length;i++){
          heap[i]=cyto.remove(heap[i])
          heap[i]=heap[i][heap[i].length-1]._private.data.value
        }
        for(let i = 0; i<heap.length;i++){

          let add = function(){
            let identifier = 'n'+(++counter)+'l'+levelCounter()
            let val = heap[i]
            let s = ""
            let t = ""
            let node = cyto.add({
              group: 'nodes',
              data: { id: identifier,value:val},
              position: { x:200+Math.floor(Math.random() * 251), y:200+Math.floor(Math.random() * 151) }
            });
            heap[i]=node
            size++
            if(lastLevel<lvlCounter){
              s = 'n'+(Math.floor(lastEdge/2))+'l'+levelPointer()
              t = 'n'+(++lastEdge)+'l'+(lastLevel+1)
              let node = cyto.add({
                group: 'edges',
                data: {id:s+t,source:s,target:t}
              });
              edges.push(cyto.elements()[++n_elements])
            }
          }
          add();
        }
        if(!firstHeapAnimation){
          let layout = cyto.layout(heapLayout)
          layout.run()
        }
  });

}
