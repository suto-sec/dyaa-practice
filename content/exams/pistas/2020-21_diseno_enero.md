### Ejercicio 1
Con menos de dos elementos no hay parejas consecutivas. En el caso recursivo, la primera suma es $a_0+a_1$ y el resto son las sumas consecutivas de la lista sin su primer elemento.

### Ejercicio 2
Los enteros son distintos y están ordenados, así que cada uno es al menos el anterior más 1. Fíjate en $a[i]-i$: ¿crece o decrece? Mirando el elemento central, eso te dice de qué lado puede estar el índice buscado.

### Ejercicio 3
Mochila con árbol binario (el objeto $i$ entra o no). Lleva el peso acumulado y la suma de lo que queda por decidir para no recalcular. Dos podas: te pasas de la capacidad, o aun metiendo todo lo que queda no superarías el mejor valor hallado.
