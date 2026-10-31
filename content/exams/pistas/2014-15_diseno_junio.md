### Ejercicio 1
Piensa en lo que hace una división entera entre la base $b$: el resto es la cifra menos significativa y el cociente es el número sin esa cifra. ¿Cuándo no queda nada que convertir? Construye el resultado del número a partir del resultado del cociente.

### Ejercicio 2
Parte las **tres** dimensiones por la mitad (filas de $A$, columnas de $A$ = filas de $B$, columnas de $B$) para que los bloques cuadren aunque no sean cuadradas. Necesitas funciones auxiliares para trocear, sumar y recomponer. Caso base: cuando alguna dimensión es 1, multiplica directamente.

### Ejercicio 3
Coloca una torre por nivel (una por fila) y decide solo en qué columna. La única restricción que queda es que no se repitan columnas: lleva un vector de columnas usadas, márcala antes de bajar y desmárcala al volver. Al llegar a la última fila, imprime.
