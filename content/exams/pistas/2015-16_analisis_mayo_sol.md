### Ejercicio 1
Recuerda la definición de $O$ y busca $c>0$, $n_0>0$ con $5n\le c\,n\log n$. Prueba con $c=5$: queda $\log n\ge1$, que se cumple a partir de $n_0$ igual a la base del logaritmo.

### Ejercicio 2
Sigue la fórmula del enunciado de fuera hacia dentro: el `while` interno cuesta $2+3\cdot(\text{iteraciones})$, y sus iteraciones son $n-i+1$. Sustitúyelo en el externo y resuelve el sumatorio en $i$ con $\sum i=\frac{n(n-1)}{2}$.

### Ejercicio 3
Expande $T(n)$ tres o cuatro veces y fíjate en dos cosas: el factor de $T$ (que se multiplica por 4) y la suma de términos lineales, que forma una serie geométrica de razón 2. El caso base ocurre cuando $n=2^i$, y entonces $4^i=n^2$.

### Ejercicio 4
Cambio de variable $n=2^k$ y $t(k)=T(2^k)$: queda $t(k)=t(k-1)+k$. El término $k$ es un polinomio de grado 1 por $1^k$, así que la raíz $1$ aparece con multiplicidad $1+2$. Calcula $T(2)$ y $T(4)$ como casos base extra.
