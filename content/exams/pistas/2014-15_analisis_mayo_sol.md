### Ejercicio 1
Busca una pareja $c>0$, $n_0>0$ con $n^2-3n+1\ge c\,n^2$. Elige una $c$ pequeña (menor que 1) para que, al pasar todo a un lado, quede una parábola convexa $an^2-3n+1\ge0$, y encuentra a partir de qué $n$ es positiva.

### Ejercicio 2
Es una recurrencia lineal no homogénea: pasa los términos con $T$ a la izquierda y escribe el resto como polinomio por potencia $^n$. El polinomio característico es el producto del de la parte homogénea y el de $(x-r)^{g+1}$ por cada término. Factoriza con Ruffini y quédate con el término de mayor orden.

### Ejercicio 3
Descompón el código de dentro hacia fuera: calcula primero el coste del `while` (depende de $j$), luego el del `for` de $j$ (depende de $i$) y por último el del `for` de $i$. Con sumatorios que empiezan en $i$ usa $\sum_{j=i}^{n}=\sum_{j=1}^{n}-\sum_{j=1}^{i-1}$.

### Ejercicio 4
Expande unas cuatro veces seguidas sin simplificar de más, y busca el patrón del término $i$-ésimo: $2^iT(n/2^i)+\dots$. El caso base se alcanza cuando $n/2^i=1$, es decir, $i=\log_2 n$.

### Ejercicio 5
Haz el cambio de variable $n=2^k$ y después $t(k)=T(2^k)$. La parte no homogénea es $2^k$, que coincide con la raíz de la homogénea: eso da una raíz doble. Necesitas dos casos base ($t(0)$ y $t(1)$) para fijar las constantes.

### Ejercicio 6
Escribe $T(n)$ y $T(n-1)$ con la misma fórmula y réstalas: el sumatorio casi desaparece y queda una recurrencia sencilla entre $T(n)$ y $T(n-1)$. Después expándela.
