### Ejercicio 1
Define el tamaño como el número de cifras. ¿Qué te dice la última cifra ($n\%10$, o la paridad de $n$)? ¿Qué subproblema queda al quitarla ($n/10$)? El caso base es un número de una sola cifra.

### Ejercicio 2
Los pares van antes que los impares, así que "es par" es verdadero y luego falso: una búsqueda binaria sobre el índice. Mira el elemento central: si es par, el último par está ahí o a su derecha; si es impar, está a su izquierda. Cuidado en Java con `-15 % 2`.

### Ejercicio 3
Un laberinto es un grafo en disguise: ¿qué serían los nodos y las aristas? Una vez transformado, el camino más corto en un grafo sin pesos distintos lo da un algoritmo voraz que ya conoces.

### Ejercicio 4
Construye la permutación posición a posición, probando solo elementos no usados. La poda: como $f$ no disminuye al ampliar, si el valor de la solución parcial ya no mejora al mejor conocido, no sigas por esa rama. Pasa el mejor valor como parámetro (por ejemplo, en un vector de un elemento) en vez de usar variables globales.
