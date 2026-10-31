### Ejercicio 1
Resuelve primero la lista sin su primer elemento (llamada recursiva). Luego decide qué hacer con ese primer elemento: busca si ya está en la lista de distintos (con la función de búsqueda dada); si está, incrementa su contador, y si no, añádelo con contador 1.

### Ejercicio 2
Parte los coeficientes en dos mitades y evalúa cada mitad como un polinomio por separado. La mitad alta representa potencias desplazadas: hay que multiplicarla por $x^m$, siendo $m$ la longitud de la primera mitad. Suma ambos resultados.

### Ejercicio 3
Es como el esquema de subconjuntos de tamaño fijo. La clave para no generar la misma combinación en distinto orden: si en la posición $i$ pones $a_j$, en la siguiente solo puedes poner $a_j, a_{j+1},\dots$ (pásale $j$ como parámetro). Cuenta cada solución completa.
