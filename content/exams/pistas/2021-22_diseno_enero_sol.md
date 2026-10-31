### Ejercicio 1
Divide la lista por la mitad y obtén las sumas consecutivas de cada mitad. ¿Qué pareja de sumas queda sin cubrir al partir por la mitad? Falta la que une el último de la primera mitad con el primero de la segunda: añádela entre ambas soluciones.

### Ejercicio 2
Es la bisección clásica sobre el segmento del origen a $q$: toma el punto medio, mira si cae dentro o fuera de la circunferencia (con $x^2+y^2$ frente a $r^2$) y quédate con la mitad que contiene el corte. Para cuando el segmento sea más corto que $\epsilon$.

### Ejercicio 3
Etiquetar los $n$ nodos con etiquetas distintas es una **permutación**. Adapta el esquema de permutaciones y lleva el coste parcial (suma de $|etiqueta_u-etiqueta_v|$ de las aristas ya decididas) para podar cuando ya no mejore el mejor valor hallado.
