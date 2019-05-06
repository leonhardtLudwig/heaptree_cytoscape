# Leonardo Luigi Pepe
## ITIS C. Zuccante A.S. 2018/2019
### Classe 4^IB

# Documentazione classe `HeapTree`

## Struttra del progetto

- La seguente classe permette di creare un `HeapTree` e di effettuare una serie di azioni su di esso
- È possibile effettuare operazioni di ordinamento dell'`HeapTree` decidendo pure se deve essere ordinato per valori decrescenti (`maxHeapSort`) o valori crescenti (`minHeapSort`)
- Sono pure stati resi disponibili due metodi implementati nel sorting (`maxHeapify` e `minHeapify`) che permettono lo scambio di due o più nodi in maniera ricorsiva in base al valore del nodo genitore e dei nodi figli (vedere descrizione dei metodi per maggiori informazioni)
- È possibile aggiungere uno o più nodi alla fine dell'`HeapTree` (aggiunta di foglie)
- È possibile eliminare l'ultimo nodo alla fine dell'`HeapTree` (eliminazione ultima foglia)
- L'intera struttura dati è contenuta all'interno di un array di oggetti `Node`
- Ogni `Node` contiene un valore e la sua posizione all'interno dell'`HeapTree`

## Descrizione algoritmi di sorting
### [Clicca qui per visualizzare la pagina originale dalla quale sono state prese queste gif](https://medium.com/@parulbaweja8/a-closer-look-at-heapsort-c83b331f8353)
- In questi esempi vengono visualizzati i metodi `maxHeapify` e `minHeapSort`, quindi visualizzeremo in questo esempio un algoritmo in cui dopo il sorting l'`HeapTree` sarà ordinato in modo crescente

![alt text](https://cdn-images-1.medium.com/max/1600/1*USCUvVE2oI_OgLQAGqr18w.gif)

- Come primo step dobbiamo piazzarci in quello che viene definito il `Floor` di un `HeapTree`. Si parte dalla posizione `size/2` per poi sfruttare il metodo `maxHeapify` in maniera ricorsiva su tutti i nodi precedenti


![alt text](https://cdn-images-1.medium.com/max/1600/1*dR1Oqwd8W3VpJdXLynzg1w.gif)

- A questo punto si procede allo swapping e heapify dei valori all'interno dell'`HeapTree`.
- Lo swapping avviene tra il primo e l'ultimo elemento dell'`HeapTree` il cui indice corrisponde a `size` (variabile che in questo momento viene modificata per poi essere ripristinata)
- Dopo aver effettuato lo swapping si procede con il `maxHeapify` del primo elemento all'interno dell'`HeapTree`
- I precedenti due passaggi verranno eseguiti fino a quando non si arriverà al primo elemento dell'`HeapTree`
- Di seguito verrà visualizzato il codice del metodo `minHeapSort` (il codice sarà riportato nuovamente all'interno della documentazione dei metodi pubblibi )

```
//HEAPIFY
for(int i = size/2-1;i>=0;i--)
    maxHeapify(i);
int oldSize = size;
//SWAPPING
for (size-=1; size>=0; size--)
{
    swap(heap[0], heap[size]);
    maxHeapify(0);
}
size = oldSize;//essendo che lavoro con un parametro dell'heap e voglio comunque mantenerlo nel tempo per altre operazioni, sfrutto questa variabile di supporto

```

## Main Class `HeapTree`

### Variabili
- `r` = _Oggetto di tipo Random (contenente seed=50) che permette la generazione casuale di numeri (usato principalmente per test)_
- `size` = _Variabile di tipo `int` che contiene la lunghezza dell'`HeapTree`_
- `heap[]` = _Array di `Node` che rappresenta l'`HeapTree`_

### Metodi _pubblici_ di `HeapTree`

##### HeapTree(int `n` )
- _Metodo costruttore che crea l'heap casualmente dato un numero di nodi_

##### HeapTree(int[] `arr` )
- _Metodo costruttore che crea l'heap dato un array di valori interi_

##### printHeap()
- _Metodo che stampa l'heap per livelli_

#### maxHeapify(int `i`)
- _Metodo che, in caso il nodo figlio sia più grande del genitore, scambi i due nodi e successivamente procede in maniera ricorsiva con i nodi sucessivi fino a quando un genitore non sarà più grande dei figli_

```
Node largest = heap[i];

if (i*2+1 < size && heap[i*2+1].val > heap[i].val){
    largest = heap[i*2+1];
}
if (i*2+2 < size && heap[i*2+2].val > heap[i].val &&heap[i*2+2].val>largest.val ) {
    largest = heap[i*2+2];
}
if (largest.pos != i) {
    swap(heap[i], largest);
    maxHeapify(largest.pos);
}

```

#### minHeapify(int `i`)
- _Metodo che, in caso il nodo figlio sia più piccolo del genitore, scambi i due nodi e successivamente procede in maniera ricorsiva con i nodi sucessivi fino a quando un genitore non sarà più piccolo dei figli_

```
Node largest = heap[i];

if (i*2+1 < size && heap[i*2+1].val < heap[i].val){
    largest = heap[i*2+1];
}
if (i*2+2 < size && heap[i*2+2].val < heap[i].val &&heap[i*2+2].val>largest.val ) {
    largest = heap[i*2+2];
}
if (largest.pos != i) {
    swap(heap[i], largest);
    minHeapify(largest.pos);
}

```

#### maxHeapSort()
- _Metodo che, sfruttando `minHeapify`, riordina l'heap dal valore più grande al più piccolo_

```
for(int i = size/2-1;i>=0;i--)
    minHeapify(i);
int oldSize = size;
for (size-=1; size>=0; size--)
{
    swap(heap[0], heap[size]);
    minHeapify(0);
}
size = oldSize;//essendo che lavoro con un parametro dell'heap e voglio comunque mantenerlo nel tempo per altre operazioni, sfrutto questa variabile di supporto

```

#### minHeapSort()
- _Metodo che, sfruttando `maxHeapify`, riordina l'heap dal valore più piccolo al più grande_

```
for(int i = size/2-1;i>=0;i--)
    maxHeapify(i);
int oldSize = size;
for (size-=1; size>=0; size--)
{
    swap(heap[0], heap[size]);
    maxHeapify(0);
}
size = oldSize;//essendo che lavoro con un parametro dell'heap e voglio comunque mantenerlo nel tempo per altre operazioni, sfrutto questa variabile di supporto

```

#### addNode(int  `nodeVal`)
- _Metodo che aggiunge un nodo alla fine dell'heap_

#### addNode(int[]  `nodeVal`)
- _Metodo che aggiunge una serie di nodi alla fine dell'heap_

#### deleteNode()
- _Metodo che elimina l'ultimo nodo (nonché foglia) dell'heap_

### Metodi _privati_ di `HeapTree`

#### swap(Node `i`, Node `j`)
- _Metodo che scambia il valore contenuto nei due nodi_

## Nested Class `Node`

### Variabili
- `val` = _Variabile di tipo `int` che contiene il valore del nodo_
- `pos` = _Variabile di tipo `int` che contiene la posizione all'interno dell'`HeapTree`_


### Metodi _pubblici_ di `Node`

##### Node(int `val`, int `pos`)
- _Metodo costruttore che dato il valore e la posizione di un nodo all'interno di un heap, crea il nodo_

##### Node(Node `n`)
- _Metodo costruttore che, dato un nodo, ne crea uno uguale_


##### Node()
- _Meotodo costruttore standard_

#### getVal()
- _Restituisce il valore contenuto in un nodo_
