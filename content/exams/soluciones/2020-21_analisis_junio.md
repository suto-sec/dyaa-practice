# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1
**Paso 1. Qué hay que probar.** $f\in O(g)$ si existen $c>0$ y $n_0$ con $f(n)\le c\,g(n)$ para todo $n\ge n_0$. Aquí $f(n)=n^{1{,}5}$ y $g(n)=n^2$.

**Paso 2. Busca $c$ y $n_0$.** Para $n\ge1$, $n^{1{,}5}\le n^{2}$ porque la base es $\ge1$ y $1{,}5<2$. Basta $c=1$ y $n_0=1$.

**Paso 3. Resultado.** $n^{1{,}5}\le1\cdot n^2$ para todo $n\ge1$: $n^{1{,}5}\in O(n^2)$ (sí se verifica). $\blacksquare$

### Ejercicio 2
**Paso 1. Función creciente.** $f(x)=x\ln x$ es creciente para $x\ge1$ ($f'(x)=\ln x+1>0$). Para una función creciente, $f(i)\le\int_i^{i+1}f(x)\,dx$.

**Paso 2. Cota superior.** Sumando de $i=1$ a $n$:
$$\sum_{i=1}^{n}i\ln i\le\int_1^{n+1}x\ln x\,dx$$

**Paso 3. Evalúa la integral.** Con $F(x)=\frac{x^2}{2}\big(\ln x-\tfrac12\big)$, $F(1)=\frac12(0-\frac12)=-\frac14$:
$$\int_1^{n+1}x\ln x\,dx=F(n+1)-F(1)=\frac{(n+1)^2}{2}\Big(\ln(n+1)-\frac12\Big)+\frac14$$

**Paso 4. Resultado.** $\sum_{i=1}^{n}i\ln i\le\frac{(n+1)^2}{2}\big(\ln(n+1)-\frac12\big)+\frac14\in O(n^2\ln n)$. Comprobación con $n=2$: la suma vale $2\ln2\approx1{,}39$ y la cota $\approx2{,}94$.

### Ejercicio 3
**Paso 1. Expande.** $T(n)=T(n-1)+n^2=T(n-2)+(n-1)^2+n^2=\cdots$

**Paso 2. Forma general.** Tras $i$ pasos: $T(n)=T(n-i)+\sum_{j=0}^{i-1}(n-j)^2$.

**Paso 3. Llega al caso base.** Con $i=n$ y $T(0)=0$:
$$T(n)=\sum_{k=1}^{n}k^2=\frac{n(n+1)(2n+1)}{6}$$

**Paso 4. Resultado.** $T(n)=\frac{n(n+1)(2n+1)}{6}\in\Theta(n^3)$. Comprobación: $T(2)=0+1+4=5$ y la fórmula da $\frac{2\cdot3\cdot5}{6}=5$.
