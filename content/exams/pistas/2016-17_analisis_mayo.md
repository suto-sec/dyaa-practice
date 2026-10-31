### Ejercicio 1
Escribe la desigualdad que exige la definición de $O$. En a), usa $(n+1)!=(n+1)\,n!$ y divide por $n!$: ¿puede una constante acotar a $n+1$ para todo $n$? En b), compara $2^n$ con $3^n$ directamente.

### Ejercicio 2
Separa cada sumatorio en sumas conocidas. En a): $\sum i$ y $\sum 1$. En b): reparte $(n-i)2^i$ y necesitarás una suma geométrica y otra del tipo $\sum i\,2^i$, que se resuelve por inducción o derivando. Comprueba con $n=1,2,3$.

### Ejercicio 3
Expande tres o cuatro pasos con $n=2^k$. El término que se añade en el nivel $j$ vale $n(\log n-j)$ (la suma del nivel completo), así que acabarás sumando una progresión aritmética hasta $j=\log n$.

### Ejercicio 4
Cambio de variable $n=2^k$ y $t_k=T(2^k)$: queda $t_k=2t_{k-1}+k2^k$. El término $k2^k$ (polinomio de grado 1 por $2^k$) coincide con la raíz de la parte homogénea, así que $x=2$ sale con multiplicidad 3. Necesitas tres casos base.
