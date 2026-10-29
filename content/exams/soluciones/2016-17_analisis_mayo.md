# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1
**Paso 1. a) Qué habría que probar.** $(n+1)!\in O(n!)$ exige $c>0$ y $n_0$ con $(n+1)!\le c\,n!$ para todo $n\ge n_0$.

**Paso 2. a) Simplifica.** $(n+1)!=(n+1)\,n!$. Dividiendo por $n!>0$ la condición queda $n+1\le c$ para todo $n\ge n_0$.

**Paso 3. a) No se cumple.** Ninguna constante $c$ supera a todos los $n+1$: para $n=\lceil c\rceil$ se rompe. Es decir, no existen $c$ y $n_0$ y $(n+1)!\notin O(n!)$. (Se ve también con el límite: $\frac{(n+1)!}{n!}=n+1\to\infty$.) $\blacksquare$

**Paso 4. b) Qué probar.** $2^n\in O(3^n)$: hay que encontrar $c$ y $n_0$ con $2^n\le c\,3^n$.

**Paso 5. b) Se cumple.** Para $n\ge0$, $2^n\le3^n$ (la base es menor). Basta $c=1$ y $n_0=0$, luego $2^n\in O(3^n)$. $\blacksquare$

### Ejercicio 2
**Paso 1. a) Separa en dos sumas.** $\sum_{i=1}^{n}(2i-1)=2\sum_{i=1}^{n}i-\sum_{i=1}^{n}1$.

**Paso 2. a) Usa las fórmulas.** $\sum_{i=1}^{n}i=\frac{n(n+1)}{2}$, luego $2\cdot\frac{n(n+1)}{2}-n=n^2+n-n=n^2$.

**Paso 3. b) Separa.** $\sum_{i=0}^{n-1}(n-i)2^i=n\sum_{i=0}^{n-1}2^i-\sum_{i=0}^{n-1}i\,2^i$.

**Paso 4. b) Geométrica.** $\sum_{i=0}^{n-1}2^i=2^n-1$. Para la otra, con $\sum_{i=0}^{n-1}i\,2^i=(n-2)2^n+2$ (se comprueba por inducción: $n=1$ da $0$; $n=2$ da $2$; el paso suma $n2^n$).

**Paso 5. b) Resultado.**
$$n(2^n-1)-(n-2)2^n-2=2^{n+1}-n-2$$

**Paso 6. Comprobación y una advertencia.** Con $n=1,2,3$ la suma b) vale $1,4,11$ y la fórmula $2^{n+1}-n-2$ da $1,4,11$. La suma a) vale $1,4,9$. Las dos coinciden hasta $n=2$ pero **no son iguales** para $n=3$ ($9\ne11$), así que la frase "ambas expresiones resultan ser iguales" del enunciado parece un error (o de transcripción). Las fórmulas obtenidas son $n^2$ y $2^{n+1}-n-2$.

### Ejercicio 3
**Paso 1. Expande.** Con $n=2^k$:
$$T(n)=2T(n/2)+n\log n=4T(n/4)+n\log\tfrac n2+n\log n=\cdots$$

**Paso 2. Forma general.** Tras $i$ pasos, el término de cada nivel $j$ es $2^j\cdot\frac{n}{2^j}\log\frac{n}{2^j}=n(\log n-j)$:
$$T(n)=2^iT(n/2^i)+n\sum_{j=0}^{i-1}(\log n-j)$$

**Paso 3. Llega al caso base.** Con $i=k=\log n$ y $T(1)=1$:
$$T(n)=n+n\sum_{j=0}^{k-1}(k-j)=n+n\cdot\frac{k(k+1)}{2}$$

**Paso 4. Resultado.**
$$T(n)=n+\frac{n\log n(\log n+1)}{2}=\frac{n(\log^2n+\log n+2)}{2}\in\Theta(n\log^2n)$$
Comprobación: $T(2)=2\cdot1+2\cdot1=4$ y la fórmula da $\frac{2(1+1+2)}{2}=4$; $T(4)=2\cdot4+4\cdot2=16$ y da $\frac{4(4+2+2)}{2}=16$.

### Ejercicio 4
**Paso 1. Cambio de variable.** Con $n=2^k$ y $t_k=T(2^k)$: $t_k=2t_{k-1}+k\,2^k$, con $t_0=1$.

**Paso 2. Ecuación característica.** La parte homogénea da $(x-2)$. El término $k\,2^k$ es un polinomio de grado 1 por $2^k$, que añade $(x-2)^2$. En total $(x-2)^3$: raíz $2$ triple.

**Paso 3. Forma de la solución.** $t_k=(c_0+c_1k+c_2k^2)\,2^k$.

**Paso 4. Constantes.** Valores: $t_0=1$, $t_1=T(2)=2\cdot1+2=4$, $t_2=T(4)=2\cdot4+4\cdot2=16$.
- $t_0=1\Rightarrow c_0=1$.
- $t_1=2(1+c_1+c_2)=4\Rightarrow c_1+c_2=1$.
- $t_2=4(1+2c_1+4c_2)=16\Rightarrow 2c_1+4c_2=3$.

De las dos últimas, $c_2=\tfrac12$ y $c_1=\tfrac12$.

**Paso 5. Deshaz el cambio.** $2^k=n$ y $k=\log n$:
$$T(n)=n\Big(1+\frac{\log n}{2}+\frac{\log^2n}{2}\Big)\in\Theta(n\log^2n)$$
Es la misma solución que con el método de expansión (ejercicio 3).
