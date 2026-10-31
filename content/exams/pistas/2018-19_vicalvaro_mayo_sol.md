### Ejercicio 1
En ambos casos escribe la desigualdad de la definición. En a), $2^{n+1}=2\cdot2^n$: ¿qué constante sirve? En b), $2^{2n}=(2^n)^2$ y compara con $c\cdot2^n$: ¿puede una constante acotar a $2^n$ para todo $n$?

### Ejercicio 2
Los bucles son dependientes ($j$ arranca en $i$). Calcula el interno con la fórmula: $2+4\cdot$(iteraciones), con $n-i+1$ iteraciones. Sustitúyelo en el externo y resuelve la suma con $\sum i=\frac{n(n+1)}{2}$.

### Ejercicio 3
Reescribe $\log_{10}(n^2)=2\log_{10}n$. Cambio de variable $n=10^k$, y luego $t(k)=T(10^k)$: queda $t(k)=t(k-1)+2k$. El término $2k$ es un polinomio de grado 1 por $1^k$, así que la raíz $1$ sale con multiplicidad 3. Necesitas tres casos base.

### Ejercicio 4
Simplifica primero $\log_{10}(n^2)=2\log_{10}n$ y expande varias veces. Los términos de cada paso son $2\log_{10}(n/10^j)=2\log_{10}n-2j$: aparecerá una suma de enteros consecutivos. Termina cuando $n=10^i$.

### Ejercicio 5
Parte la matriz por la fila y la columna centrales en cuatro submatrices y comprueba cada una de forma recursiva. Falta lo que cruza esos cortes: las dos filas centrales y las dos columnas centrales también deben estar ordenadas. Cuida el caso de matrices de una sola fila o columna.

### Ejercicio 6
Asigna un color a cada vértice, uno por nivel, probando los $m$ colores. Un color es válido para el vértice $i$ si ningún vecino ya coloreado (de los vértices anteriores) lo tiene. Es un problema de decisión: corta en cuanto encuentres una coloración completa.
