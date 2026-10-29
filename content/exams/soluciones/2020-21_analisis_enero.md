# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1
**Paso 1. Simplifica.** $2^{\log_3 n}=n^{\log_3 2}$ (se toma $\log_3$ de ambos lados: $\log_3 n\cdot\log_3 2$). Y $a=\log_3 2=\frac{\ln2}{\ln3}\approx0{,}63<1$.

**Paso 2. Qué exige $\Theta(n)$.** $f\in\Theta(g)$ si existen $c_1,c_2>0$ y $n_0$ con $c_1\,g(n)\le f(n)\le c_2\,g(n)$ para $n\ge n_0$. Hay que ver las dos desigualdades.

**Paso 3. Cota superior: sí.** $n^{a}\le n$ para $n\ge1$ porque $a<1$: vale $c_2=1$, $n_0=1$.

**Paso 4. Cota inferior: no.** Supón que existen $c_1>0$ y $n_0$ con $c_1\,n\le n^{a}$ para todo $n\ge n_0$. Dividiendo por $n^{a}$: $c_1\,n^{1-a}\le1$, es decir, $n\le c_1^{-1/(1-a)}$ para todo $n\ge n_0$. Pero $1-a>0$, así que $n^{1-a}\to\infty$ y la desigualdad se rompe para $n$ grande. Contradicción.

**Paso 5. Resultado.** No se verifica: $2^{\log_3n}\notin\Theta(n)$ (está en $O(n)$ pero crece estrictamente más despacio: es $\Theta(n^{\log_32})$). $\blacksquare$

### Ejercicio 2
**Paso 1. Bucle interno.** Para un $i$ dado, $j$ va de $n$ a $i+1$: $n-i$ iteraciones, cada una con el cuerpo (2 operaciones):
$$T_j(i)=1+\sum_{k=1}^{n-i}(1+2+1)+1=4(n-i)+2$$

**Paso 2. Bucle externo.** Con $i=0,\dots,n-1$:
$$T(n)=1+\sum_{i=0}^{n-1}\big(1+T_j(i)+1\big)+1=2+\sum_{i=0}^{n-1}\big(4(n-i)+4\big)$$

**Paso 3. Suma.** $\sum_{i=0}^{n-1}(n-i)=\frac{n(n+1)}{2}$, así:
$$T(n)=2+4n+4\cdot\frac{n(n+1)}{2}=2n^2+6n+2$$

**Paso 4. Comprobación.** Con $n=1$: $i=0$, $j=1$, una iteración; el bucle interno cuesta $1+(1+2+1)+1=6$ y el externo $1+(1+6+1)+1=10$, y la fórmula da $2+6+2=10$. $T(n)\in\Theta(n^2)$.

### Ejercicio 3
**Paso 1. (a) Datos.** $T(n)=2T(n/4)+n^{1/2}$: $a=2$, $b=4$, $f(n)=n^{1/2}$, $T(1)=1$. Se toma $n=4^k$.

**Paso 2. (a) Cambio de variable.** Con $t_k=T(4^k)$: $t_k=2t_{k-1}+(4^k)^{1/2}=2t_{k-1}+2^k$, $t_0=1$.

**Paso 3. (a) Ecuación característica.** La homogénea da $(x-2)$ y el término $2^k$ otro $(x-2)$: $(x-2)^2$. Solución: $t_k=(c_0+c_1k)\,2^k$.

**Paso 4. (a) Constantes.** $t_0=1\Rightarrow c_0=1$. $t_1=T(4)=2\cdot1+\sqrt4=4$, así $(1+c_1)\cdot2=4$ y $c_1=1$.

**Paso 5. (a) Deshaz el cambio.** $2^k=\sqrt n$ y $k=\log_4n$:
$$T(n)=\sqrt n\,(1+\log_4n)$$

**Paso 6. (b) Expansión.** $T(n)=2T(n/4)+\sqrt n=4T(n/16)+2\sqrt{n/4}+\sqrt n=\cdots$ El término del nivel $j$ es $2^j\sqrt{n/4^j}=2^j\sqrt n/2^j=\sqrt n$: cada nivel aporta lo mismo. Tras $i$ pasos:
$$T(n)=2^iT(n/4^i)+i\sqrt n$$

**Paso 7. (b) Caso base.** Con $i=k=\log_4n$ y $T(1)=1$: $2^k=\sqrt n$, luego $T(n)=\sqrt n+\sqrt n\log_4n$, igual que por el método general.

**Paso 8. Orden.** $T(n)\in\Theta(\sqrt n\log n)$. Es el caso del teorema maestro en el que $f$ coincide con $n^{\log_ba}=n^{\log_42}=n^{1/2}$. Comprobación: $T(16)=2T(4)+4=12$ y la fórmula da $4(1+2)=12$.
