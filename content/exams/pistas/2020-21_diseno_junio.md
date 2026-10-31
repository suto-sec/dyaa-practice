### Ejercicio 1
Caso base: matriz $1\times1$. Para el caso recursivo, recorre la primera columna: para cada fila $i$ forma la matriz complementaria (sin la fila $i$ y sin la columna 0), calcula su determinante recursivamente y suma con el signo $(-1)^i$ y el elemento $a_{i,0}$.

### Ejercicio 2
Un ciclo euleriano recorre **cada arista** una vez, así que la solución parcial es una secuencia de vértices y en cada nivel eliges una arista no usada que salga del último vértice. Marca la arista usada (por ejemplo, poniendo a 0 sus dos posiciones en la matriz) y restáurala al volver. Antes de buscar, comprueba la condición de grados pares para podar de golpe.
