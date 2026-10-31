### Ejercicio 1
Un laberinto se puede ver como un grafo: ¿qué serían los nodos y qué las aristas? Una vez transformado, "camino más corto" es un problema con un algoritmo voraz conocido.

### Ejercicio 2
El dígito menos significativo es `a % 10`. Compara con `x`: si `x` es mayor o igual que ese dígito, va al final. Si no, ese dígito se queda y `x` se inserta en `a // 10`; recompón el número.

### Ejercicio 3
Con valores enteros distintos y ordenados, $a[i]-i$ no decrece. Mira el elemento central `m`: si `a[m] > m`, todo lo de la derecha también tiene `a[i] > i`; si `a[m] < m`, lo de la izquierda... Descarta una mitad en cada llamada (búsqueda binaria).

### Ejercicio 4
Genera subconjuntos con el esquema binario (cada elemento entra o no). Lleva la suma parcial y la cardinalidad parcial. Poda si la suma ya pasa de `s` (los números no son negativos) o si la cardinalidad ya no puede mejorar la mejor encontrada. Solo actualiza la mejor al llegar al final con suma exactamente `s`.
