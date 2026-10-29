# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1
**Paso 1. Qué hay que probar.** $f\in O(g)$ si existen $c>0$ y $n_0$ con $f(n)\le c\,g(n)$ para todo $n\ge n_0$. Aquí $f(n)=2^{\ln n}$ y $g(n)=n$.

**Paso 2. Simplifica $f$.** $2^{\ln n}=e^{\ln 2\cdot\ln n}=n^{\ln 2}$, y $\ln 2\approx0{,}693<1$.

**Paso 3. Busca $c$ y $n_0$.** Para $n\ge1$ se cumple $n^{\ln 2}\le n^{1}$ porque la base es $\ge1$ y el exponente $\ln2$ es menor que $1$. Basta $c=1$ y $n_0=1$.

**Paso 4. Resultado.** $2^{\ln n}\le 1\cdot n$ para todo $n\ge1$, luego $2^{\ln n}\in O(n)$ (sí se verifica). $\blacksquare$

### Ejercicio 2
**Paso 1. Peor caso.** `condicion(i)` es cierta para todo $i$: el bucle en $j$ se ejecuta siempre.

**Paso 2. Bucle más interno ($k$).** Hace $j$ iteraciones ($k=0,\dots,j-1$) con el cuerpo de 2 operaciones:
$$T_k(j)=1+\sum_{k=0}^{j-1}(1+2+1)+1=4j+2$$

**Paso 3. Bucle en $j$.** Va de $i$ a $n$, es decir, $n-i+1$ iteraciones, y su cuerpo es el bucle $k$:
$$T_j(i)=1+\sum_{j=i}^{n}(1+T_k(j)+1)+1=2+\sum_{j=i}^{n}(4j+4)=2+4(n-i+1)+4\sum_{j=i}^{n}j$$
Como $\sum_{j=i}^{n}j=\frac{n(n+1)-i(i-1)}{2}$:
$$T_j(i)=2n^2+6n+6-2i-2i^2$$

**Paso 4. Bucle en $i$.** El cuerpo es la comprobación (1 operación) más $T_j(i)$:
$$T(n)=1+\sum_{i=0}^{n-1}\big(1+1+T_j(i)+1\big)+1=2+\sum_{i=0}^{n-1}\big(2n^2+6n+9-2i-2i^2\big)$$
(cada iteración cuesta $1$ de la comparación, $1$ del incremento, $1$ de `condicion(i)` y $T_j(i)$: en total $T_j(i)+3$.)

**Paso 5. Calcula la suma.** Con $\sum i=\frac{n(n-1)}{2}$ y $\sum i^2=\frac{(n-1)n(2n-1)}{6}$:
$$T(n)=2+n(2n^2+6n+9)-n(n-1)-\frac{n(n-1)(2n-1)}{3}=\frac{4n^3+18n^2+29n+6}{3}$$

**Paso 6. Comprobación.** Con $n=1$ se cuentan a mano $19$ operaciones, y la fórmula da $\frac{4+18+29+6}{3}=19$. Por tanto $T(n)=\frac43n^3+6n^2+\frac{29}{3}n+2\in\Theta(n^3)$.

### Ejercicio 3
**Paso 1. Expande.** $T(n)=T(n-1)+2^n+1=T(n-2)+(2^{n-1}+1)+(2^n+1)=\cdots$

**Paso 2. Forma general.** Tras $i$ pasos: $T(n)=T(n-i)+\sum_{j=0}^{i-1}\big(2^{n-j}+1\big)$.

**Paso 3. Llega al caso base.** Con $i=n$, $T(0)=0$:
$$T(n)=\sum_{k=1}^{n}(2^k+1)=\big(2^{n+1}-2\big)+n$$

**Paso 4. Resultado.** $T(n)=2^{n+1}+n-2\in\Theta(2^n)$. Comprobación: $T(1)=T(0)+2+1=3$ y la fórmula da $4+1-2=3$; $T(2)=3+4+1=8$ y la fórmula da $8+2-2=8$.
