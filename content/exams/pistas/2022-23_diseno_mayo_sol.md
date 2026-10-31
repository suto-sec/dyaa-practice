### Ejercicio 1
El tamaño es el número de cifras. Caso base: una sola cifra, ¿cuántas impares hay? Caso recursivo: cuenta las del número sin la última cifra y suma 1 si la última lo es.

### Ejercicio 2
Divide por la mitad y resuelve cada mitad. Cada una ya tiene sus pares delante y sus impares detrás. ¿Cómo debes juntar las cuatro partes (pares de la 1ª, pares de la 2ª, impares de la 1ª, impares de la 2ª)? Prueba con una lista de 4 y otra de 8 elementos a mano.

### Ejercicio 3
Construye la cadena posición a posición con dos candidatos: abrir o cerrar. Lleva el número de paréntesis abiertos sin cerrar y poda: no cierres si no hay ninguno abierto, y no abras más de $n$ en total. Cuenta las secuencias completas.

### Ejercicio 4
Un fractal de orden $n$ son cinco fractales de orden $n-1$ unidos extremo con extremo. Calcula los extremos de cada uno a partir de $p$ y $q$ (en tercios del vector, con giros de 90° para subir y bajar) y haz cinco llamadas. Caso base: orden 0, dibuja el segmento.
