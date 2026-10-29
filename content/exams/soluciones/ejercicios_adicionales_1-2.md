# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1.1
**Paso 1. Reparte el exponente.** La potencia de un cociente es el cociente de las potencias: $\left(\frac{a}{b^k}\right)^{\log_b n}=\frac{a^{\log_b n}}{(b^k)^{\log_b n}}$.

**Paso 2. Simplifica el denominador.** $(b^k)^{\log_b n}=(b^{\log_b n})^k=n^k$, porque $b^{\log_b n}=n$.

**Paso 3. Cambia el numerador.** Se usa $x^{\log_b y}=y^{\log_b x}$. Se prueba tomando $\log_b$ en los dos lados: $\log_b\left(a^{\log_b n}\right)=\log_b n\cdot\log_b a=\log_b\left(n^{\log_b a}\right)$. Por tanto $a^{\log_b n}=n^{\log_b a}$.

**Paso 4. Resultado.** $\left(\frac{a}{b^k}\right)^{\log_b n}=\frac{n^{\log_b a}}{n^k}$. $\blacksquare$

### Ejercicio 1.2
**Paso 1. Qué hay que probar.** $\log n!\in\Theta(n\log n)$ equivale a que $\lim_{n\to\infty}\frac{\log n!}{n\log n}$ sea una constante positiva y finita. Trabaja con $\ln$: cambiar de base sólo multiplica por una constante.

**Paso 2. Aplica Stirling dentro del logaritmo.** Como $n!\sim\sqrt{2\pi n}\left(\frac ne\right)^n$ (el cociente tiende a 1), el logaritmo del cociente tiende a 0 y se puede sustituir:
$$\ln n!\approx\tfrac12\ln(2\pi n)+n\ln n-n$$

**Paso 3. Divide por $n\ln n$.**
$$\frac{\ln n!}{n\ln n}\approx\frac{\ln(2\pi n)}{2n\ln n}+1-\frac{1}{\ln n}$$

**Paso 4. Calcula el límite.** El primer término vale $\frac{\ln 2\pi}{2n\ln n}+\frac1{2n}\to0$ y el último $\frac1{\ln n}\to0$. El límite es $1$.

**Paso 5. Resultado.** Un límite igual a una constante positiva implica $\Theta$: $\log n!\in\Theta(n\log n)$. $\blacksquare$

### Ejercicio 1.3
**Paso 1. Qué hay que probar.** $f\in O(g)$ se cumple si $\lim\frac{f}{g}$ es una constante finita. Aquí $\frac{f}{g}=\frac{n\log n}{n^{1+a}}=\frac{\log n}{n^a}$.

**Paso 2. Es una indeterminación.** Con $a>0$, $\log n\to\infty$ y $n^a\to\infty$: es del tipo $\frac\infty\infty$. Usa $\ln$ (otra base sólo añade una constante).

**Paso 3. L'Hôpital.** Deriva arriba y abajo:
$$\lim_{n\to\infty}\frac{\ln n}{n^a}=\lim_{n\to\infty}\frac{1/n}{a\,n^{a-1}}=\lim_{n\to\infty}\frac{1}{a\,n^{a}}=0$$

**Paso 4. Resultado.** El límite es $0$, una constante finita, luego $n\log n\in O(n^{1+a})$ (de hecho está en $o(n^{1+a})$). $\blacksquare$

### Ejercicio 1.4
**Paso 1. Cuenta los términos.** En $\sum_{i=m}^{n}1$ el índice $i$ toma los valores $m,m+1,\dots,n$ y cada uno suma $1$. El resultado es cuántos valores hay.

**Paso 2. Cuántos valores hay.** Con $m\le n$ hay $n-m+1$ (por ejemplo $m=3$, $n=7$: $3,4,5,6,7$, es decir, $5=7-3+1$). Otra forma: $\sum_{i=m}^{n}1=\sum_{i=1}^{n}1-\sum_{i=1}^{m-1}1=n-(m-1)$.

**Paso 3. Casos extremos.** Si $m=n$ hay un término y $n-m+1=1$. Si $m>n$ el sumatorio está vacío y vale $0$ por convención (la fórmula daría un número $\le 0$).

**Paso 4. Resultado.**
$$\sum_{i=m}^{n}1=\begin{cases}n-m+1 & m\le n\\ 0 & m>n\end{cases}=\max(0,\,n-m+1)$$

### Ejercicio 1.5
**Paso 1. Escribe la suma.** El $i$-ésimo impar es $2i-1$, así que la suma de los $n$ primeros es $\sum_{i=1}^{n}(2i-1)=1+3+5+\cdots+(2n-1)$.

**Paso 2. Separa con la linealidad.** $\sum_{i=1}^{n}(2i-1)=2\sum_{i=1}^{n}i-\sum_{i=1}^{n}1$.

**Paso 3. Sustituye las fórmulas.** $\sum i=\frac{n(n+1)}{2}$ y $\sum 1=n$:
$$2\cdot\frac{n(n+1)}{2}-n=n^2+n-n$$

**Paso 4. Resultado.** $\sum_{i=1}^{n}(2i-1)=n^2$. Comprobación: $n=4$ da $1+3+5+7=16=4^2$.

### Ejercicio 1.6
**Paso 1. Escribe cada lado con sumas conocidas.** Sea $S_2=\sum_{i=1}^{n}i^2$ y $S_1=\sum_{i=1}^{n}i=\frac{n(n+1)}{2}$.
- Izquierda: $\sum\frac{i(i+1)}{2}=\frac12S_2+\frac12S_1$.
- Derecha: $\sum i(n-i+1)=(n+1)S_1-S_2$.

**Paso 2. Iguala.** $\frac12S_2+\frac12S_1=(n+1)S_1-S_2$.

**Paso 3. Despeja $S_2$.** Pasa los $S_2$ a un lado: $\frac32S_2=\left(n+1-\frac12\right)S_1=\frac{2n+1}{2}S_1$, luego $S_2=\frac{2n+1}{3}S_1$.

**Paso 4. Sustituye $S_1$.**
$$S_2=\frac{2n+1}{3}\cdot\frac{n(n+1)}{2}=\frac{n(n+1)(2n+1)}{6}$$

**Paso 5. Resultado.** $1^2+2^2+\cdots+n^2=\frac{n(n+1)(2n+1)}{6}$. Comprobación: $n=3$ da $14=\frac{3\cdot4\cdot7}{6}$.

### Ejercicio 1.7
**Paso 1. Expresa $s_i$.** Como $s_i=s_{i-1}+d$, se tiene $s_i=s_0+id$. En particular $s_{n-1}=s_0+(n-1)d$.

**Paso 2. Escribe la suma dos veces, la segunda al revés.**
$$S=s_0+s_1+\cdots+s_{n-1},\qquad S=s_{n-1}+s_{n-2}+\cdots+s_0$$

**Paso 3. Suma por columnas.** El par de la posición $i$ vale $s_i+s_{n-1-i}=(s_0+id)+(s_0+(n-1-i)d)=2s_0+(n-1)d=s_0+s_{n-1}$. Todos los pares valen lo mismo.

**Paso 4. Resultado.** Hay $n$ pares, así que $2S=n(s_0+s_{n-1})$ y
$$\sum_{i=0}^{n-1}s_i=\frac n2(s_0+s_{n-1}).\ \blacksquare$$

### Ejercicio 1.8
**Paso 1. Método.** Escribe la parte homogénea, saca su ecuación característica y multiplícala por un factor $(x-b)^{d+1}$ por cada término de la derecha de la forma $b^n P(n)$, con $d$ el grado de $P$. La solución lleva, por cada raíz $r$ de multiplicidad $m$, el bloque $(C_1+C_2n+\cdots+C_mn^{m-1})\,r^n$.

**Paso 2. Apartado a).** Homogénea: $x^3-4x^2+5x-2=(x-1)^2(x-2)$.
- $n-3$ es $1^n$ por un polinomio de grado 1: añade $(x-1)^2$.
- $5n^2\cdot2^n$ es $2^n$ por un polinomio de grado 2: añade $(x-2)^3$.

Ecuación característica: $(x-1)^4(x-2)^4=0$. Solución:
$$T(n)=(C_1+C_2n+C_3n^2+C_4n^3)+(C_5+C_6n+C_7n^2+C_8n^3)\,2^n$$
El término dominante es $n^3\,2^n$: $T(n)\in\Theta(n^32^n)$.

**Paso 3. Apartado b).** Homogénea: $x-1$.
- $3n-3$ es $1^n$ por un polinomio de grado 1: añade $(x-1)^2$.
- $n^3\,3^n$ es $3^n$ por un polinomio de grado 3: añade $(x-3)^4$.

Ecuación característica: $(x-1)^3(x-3)^4=0$. Solución:
$$T(n)=(C_1+C_2n+C_3n^2)+(C_4+C_5n+C_6n^2+C_7n^3)\,3^n$$
Orden: $\Theta(n^33^n)$.

**Paso 4. Apartado c).** Homogénea: $x^3-5x^2+8x-4=(x-1)(x-2)^2$.
- $3+n^2$ es $1^n$ por un polinomio de grado 2: añade $(x-1)^3$.
- $n\,2^n$ es $2^n$ por un polinomio de grado 1: añade $(x-2)^2$.

Ecuación característica: $(x-1)^4(x-2)^4=0$. Solución:
$$T(n)=(C_1+C_2n+C_3n^2+C_4n^3)+(C_5+C_6n+C_7n^2+C_8n^3)\,2^n$$
Orden: $\Theta(n^32^n)$.

### Ejercicio 1.9
**Paso 1. Agrupa los números por cuántos ceros tienen a la derecha.** Un número cuyo primer 1 (empezando por la derecha) está tras $k$ ceros hace procesar $k+1$ bits. Es de la forma `xxx…x 1 0…0` con $k$ ceros finales.

**Paso 2. Cuenta cuántos hay de cada tipo.** Fijados el 1 y los $k$ ceros, quedan $n-(k+1)$ bits libres a la izquierda: hay $2^{n-k-1}$ números, con $k=0,\dots,n-1$ (el 0 no se incluye).

**Paso 3. Plantea el sumatorio.** Bits totales $=\sum_{k=0}^{n-1}(k+1)\,2^{n-k-1}$. Con $j=k+1$: $\sum_{j=1}^{n}j\,2^{n-j}=2^n\sum_{j=1}^{n}j\left(\tfrac12\right)^j$.

**Paso 4. Usa la fórmula de $\sum j\,r^j$.** Con $r=\frac12$: $\sum_{j=1}^{n}j\,r^j=\frac{r+r^{n+1}(nr-n-1)}{(r-1)^2}=4\left[\frac12-\frac{n+2}{2^{n+2}}\right]=2-\frac{n+2}{2^n}$.

**Paso 5. Resultado.** Multiplica por $2^n$:
$$\text{bits}=2^{n+1}-(n+2)$$
Comprobación: $n=4$ da $32-6=26$, como en el enunciado; $n=1$ da $1$ y $n=2$ da $4$.

### Ejercicio 1.10
**Paso 1. Idea.** El coste $T$ depende del tamaño del problema $n$: cuenta cuántas llamadas recursivas hace la función y cuánto trabajo extra hace además (operaciones aritméticas y comparaciones, constantes). Los casos base cuestan una constante $d$ y el trabajo extra de cada llamada otra constante $c$.

**Paso 2. Apartado (1).** Una llamada con $n-1$ y trabajo constante (un producto, una suma y el suelo):
$$T(n)=\begin{cases}d & n\le2\\ T(n-1)+c & n>2\end{cases}\quad\Rightarrow\quad\Theta(n)$$

**Paso 3. Apartado (2).** Una llamada con $n-1$ y una suma de parámetros:
$$T(n)=\begin{cases}d & n=1\\ T(n-1)+c & n>1\end{cases}\quad\Rightarrow\quad\Theta(n)$$

**Paso 4. Apartado (3).** En cada caso recursivo hay **dos** llamadas de tamaño aproximadamente $n/2$ y un trabajo constante (dos cuadrados y una suma o resta):
$$T(n)=\begin{cases}d & n\le2\\ 2T(n/2)+c & n>2\end{cases}\quad\Rightarrow\quad\Theta(n)$$
(teorema maestro: dos subproblemas de la mitad de tamaño y trabajo constante $n^0$; como $2>2^0$, sale $\Theta(n^{\log_22})=\Theta(n)$).

**Paso 5. Apartado (4).** La llamada exterior es de tamaño $n-1$, pero su segundo argumento contiene otra llamada, $f(n-2,0)$, que se evalúa antes. Hay dos llamadas, de tamaños $n-1$ y $n-2$:
$$T(n)=\begin{cases}d & n\le2\\ T(n-1)+T(n-2)+c & n>2\end{cases}$$
Es del tipo Fibonacci, así que $T(n)\in\Theta\left(\left(\frac{1+\sqrt5}{2}\right)^n\right)$, exponencial.

### Ejercicio 1.11
**Paso 1. Plantea la recurrencia.** Sea $a$ el coste del caso `n == 0`, $b$ el de `n == 1` y $c$ el trabajo propio del caso recursivo (dos comparaciones y la resta) más la llamada:
$$T(n)=\begin{cases}a & n=0\\ b & n=1\\ T(n-2)+c & n>1\end{cases}$$

**Paso 2. Expansión.** Cada llamada resta 2 y suma $c$:
$$T(n)=T(n-2)+c=T(n-4)+2c=\cdots=T(n-2i)+i\,c$$

**Paso 3. Llega al caso base.** Si $n$ es par, $n-2i=0$ cuando $i=n/2$ y $T(n)=a+\frac{c}{2}n$. Si $n$ es impar, $n-2i=1$ cuando $i=\frac{n-1}2$ y $T(n)=b+\frac{c}{2}(n-1)$.

**Paso 4. Método general.** $T(n)-T(n-2)=c$. La parte homogénea da $x^2-1=(x-1)(x+1)$; la constante $c=c\cdot1^n$ añade $(x-1)$. Ecuación característica $(x-1)^2(x+1)=0$:
$$T(n)=C_1+C_2n+C_3(-1)^n$$
Con $T(0)=a$, $T(1)=b$, $T(2)=a+c$ salen $C_2=\frac c2$, $C_1=\frac{a+b-c/2}{2}$ y $C_3=\frac{a-b+c/2}{2}$.

**Paso 5. Orden de crecimiento.** Ambos métodos dan una función lineal: $T(n)\in\Theta(n)$ (hay $\approx n/2$ llamadas).

### Ejercicio 1.12
**Paso 1. Calcula unos valores.** $T(0)=1$, $T(1)=1+T(0)=2$, $T(2)=1+T(0)+T(1)=4$, $T(3)=8$. Parece $2^n$.

**Paso 2. Simplifica la recurrencia.** Para $n\ge2$ separa el último sumando: $T(n)=1+\sum_{j=0}^{n-2}T(j)+T(n-1)$. Pero $1+\sum_{j=0}^{n-2}T(j)=T(n-1)$ por la propia definición, así que
$$T(n)=2\,T(n-1)\qquad(n\ge2)$$

**Paso 3. Expande.** $T(n)=2T(n-1)=4T(n-2)=\cdots=2^iT(n-i)$.

**Paso 4. Llega al caso base.** Para $i=n-1$ se llega a $T(1)=2$:
$$T(n)=2^{n-1}\cdot2=2^n$$

**Paso 5. Resultado.** $T(n)=2^n\in\Theta(2^n)$ (también vale para $n=0$ y $n=1$).

### Ejercicio 1.13
**Paso 1. Supón $n=4^k$.** Así $\frac n{4^i}$ es entero y se llega a $T(1)$ cuando $i=k=\log_4n=\frac12\log_2n$.

**Paso 2. Expande.** Cada paso duplica el coeficiente y reduce el argumento:
$$T(n)=2T(n/4)+\log_2n=2^2T(n/4^2)+2\log_2(n/4)+\log_2n=\cdots=2^iT(n/4^i)+\sum_{j=0}^{i-1}2^j\log_2\!\left(n/4^j\right)$$
Y $\log_2(n/4^j)=\log_2n-2j$.

**Paso 3. Sustituye $i=k$.** Con $L=\log_2n=2k$ y $2^k=\sqrt n$:
$$T(n)=\sqrt n\cdot T(1)+\sum_{j=0}^{k-1}2^j(2k-2j)=\sqrt n+2\sum_{j=0}^{k-1}2^j(k-j)$$

**Paso 4. Resuelve el sumatorio.** Con $m=k-j$: $\sum_{j=0}^{k-1}2^j(k-j)=\sum_{m=1}^{k}m\,2^{k-m}=2^{k+1}-(k+2)$ (es la misma suma que en el ejercicio 1.9).

**Paso 5. Resultado.**
$$T(n)=\sqrt n+2\left(2^{k+1}-k-2\right)=5\sqrt n-\log_2n-4\in\Theta(\sqrt n)$$
Comprobación: $T(4)=2\cdot1+2=4=5\cdot2-2-4$. Concuerda con el teorema maestro: $a=2$, $b=4$, $n^{\log_42}=\sqrt n$ y $\log n$ es polinómicamente menor.

### Ejercicio 1.14
**Paso 1. Pasa a la forma estándar.** $T(n)-T(n-1)=b$. La derecha es $b\cdot1^n$ (polinomio de grado 0).

**Paso 2. Ecuación característica.** Parte homogénea: $x-1$. Término de la derecha: añade $(x-1)^{0+1}$. Queda $(x-1)^2=0$, con la raíz $1$ doble.

**Paso 3. Forma de la solución.** $T(n)=C_1+C_2n$.

**Paso 4. Constantes.** $T(1)=a$ y $T(2)=a+b$:
- $C_1+C_2=a$
- $C_1+2C_2=a+b$

Restando: $C_2=b$ y $C_1=a-b$.

**Paso 5. Resultado.** $T(n)=bn+a-b=b(n-1)+a\in\Theta(n)$.

### Ejercicio 1.15
**Paso 1. Plantea la recurrencia.** En cada caso recursivo hay **una sola** llamada, con la mitad del argumento, y trabajo constante (un producto, una suma, una potencia):
$$T(n)=\begin{cases}d & n=1\\ T(n/2)+c & n>1\end{cases}$$
(para $n$ impar el argumento es $\frac{n-1}2$; el orden es el mismo, así que se supone $n=2^k$).

**Paso 2. Teorema maestro.** Una llamada ($a=1$) con tamaño $n/2$ ($b=2$) y trabajo $f(n)=c\,n^0$ ($k=0$). Como $a=b^k$ ($1=2^0$): $T(n)\in\Theta(n^0\log n)=\Theta(\log n)$.

**Paso 3. Expansión.** $T(n)=c+T(n/2)=2c+T(n/4)=\cdots=ic+T(n/2^i)$. Se llega a $T(1)$ con $i=\log_2n$, luego $T(n)=c\log_2n+d$.

**Paso 4. Método general.** Con $n=2^k$ y $t(k)=T(2^k)$: $t(k)=t(k-1)+c$. Ecuación característica $(x-1)^2=0$, así que $t(k)=C_1+C_2k$. Con $t(0)=d$ y $t(1)=d+c$: $C_1=d$, $C_2=c$. Deshaciendo el cambio, $T(n)=d+c\log_2n$.

**Paso 5. Orden de crecimiento.** Los tres métodos coinciden: $T(n)\in\Theta(\log n)$.

### Ejercicio 1.16
**Paso 1. Teorema maestro.** $a=3$, $b=2$, $f(n)=n$ ($k=1$). Como $a=3>b^k=2$: $T(n)\in\Theta\left(n^{\log_23}\right)\approx\Theta(n^{1{,}585})$.

**Paso 2. Expansión.** Con $n=2^k$:
$$T(n)=3^iT(n/2^i)+n\sum_{j=0}^{i-1}\left(\tfrac32\right)^j=3^iT(n/2^i)+2n\left[\left(\tfrac32\right)^i-1\right]$$

**Paso 3. Llega al caso base.** Para $i=\log_2n$: $3^i=n^{\log_23}$ y $\left(\frac32\right)^i=\frac{n^{\log_23}}{n}$. Entonces
$$T(n)=n^{\log_23}+2\left(n^{\log_23}-n\right)=3\,n^{\log_23}-2n$$

**Paso 4. Método general.** Con $n=2^k$ y $t(k)=T(2^k)$: $t(k)=3t(k-1)+2^k$. Ecuación característica $(x-3)(x-2)=0$, así que $t(k)=C_13^k+C_22^k$. Con $t(0)=1$ y $t(1)=5$: $C_1+C_2=1$ y $3C_1+2C_2=5$, es decir, $C_1=3$ y $C_2=-2$. Como $3^k=n^{\log_23}$ y $2^k=n$: $T(n)=3n^{\log_23}-2n$.

**Paso 5. Resultado.** $T(n)=3n^{\log_23}-2n\in\Theta(n^{\log_23})$. Comprobación: $T(2)=3+2=5=3\cdot3-4$.

### Ejercicio 1.17
**Paso 1. Cambio de variable.** Con $n=10^k$ y $t(k)=T(10^k)$: $t(k)=t(k-1)+1$, con $t(0)=T(1)=1$.

**Paso 2. Ecuación característica.** $t(k)-t(k-1)=1\cdot1^k$: homogénea $(x-1)$ y el término de la derecha añade otro $(x-1)$. Queda $(x-1)^2=0$.

**Paso 3. Forma de la solución.** $t(k)=C_1+C_2k$.

**Paso 4. Constantes.** $t(0)=1$ da $C_1=1$. $t(1)=T(10)=T(1)+1=2$ da $C_1+C_2=2$, es decir, $C_2=1$.

**Paso 5. Resultado.** $t(k)=k+1$. Deshaciendo el cambio, $k=\log_{10}n$:
$$T(n)=\log_{10}n+1\in\Theta(\log n)$$

### Ejercicio 1.18
**Paso 1. a) $T(n)=2T(n-1)+3n-2$, $T(0)=0$.** Homogénea: $x-2$. El término $3n-2$ es $1^n$ por un polinomio de grado 1: añade $(x-1)^2$. Ecuación característica $(x-2)(x-1)^2$:
$$T(n)=C_12^n+C_2+C_3n$$
Valores: $T(0)=0$, $T(1)=1$, $T(2)=6$. De $C_1+C_2=0$, $2C_1+C_2+C_3=1$ y $4C_1+C_2+2C_3=6$ sale $C_1=4$, $C_2=-4$, $C_3=-3$:
$$T(n)=2^{n+2}-3n-4\in\Theta(2^n)$$

**Paso 2. b) $T(n)=T(n/2)+n$, $T(1)=1$.** Expande con $n=2^k$: $T(n)=n+\frac n2+\frac n4+\cdots+2+T(1)$. La suma geométrica es $n\sum_{j=0}^{k-1}2^{-j}=2n-2$.
$$T(n)=2n-2+1=2n-1\in\Theta(n)$$

**Paso 3. c) $T(n)=T(n/\alpha)+n$, $T(1)=0$.** Con $n=\alpha^k$: $T(n)=\sum_{j=0}^{k-1}\frac n{\alpha^j}=n\,\frac{1-\alpha^{-k}}{1-1/\alpha}=\frac{\alpha}{\alpha-1}(n-1)$.
$$T(n)=\frac{\alpha(n-1)}{\alpha-1}\in\Theta(n)$$

**Paso 4. d) $T(n)=T(n/3)+n^2$, $T(1)=1$.** Con $n=3^k$: $T(n)=1+\sum_{j=0}^{k-1}\frac{n^2}{9^j}=1+n^2\,\frac{1-9^{-k}}{1-1/9}=1+\frac98(n^2-1)$.
$$T(n)=\frac{9n^2-1}{8}\in\Theta(n^2)$$

**Paso 5. e) $T(n)=3T(n/3)+n^2$, $T(1)=0$.** El nivel $j$ aporta $3^j(n/3^j)^2=n^2/3^j$. Suma: $n^2\sum_{j=0}^{k-1}3^{-j}=n^2\,\frac{1-1/n}{1-1/3}$.
$$T(n)=\frac{3}{2}\,n(n-1)\in\Theta(n^2)$$

**Paso 6. f) $T(n)=2T(n/4)+n$, $T(1)=1$.** Con $n=4^k$ ($2^k=\sqrt n$): el nivel $j$ aporta $2^j\frac n{4^j}=\frac n{2^j}$. Suma: $n\sum_{j=0}^{k-1}2^{-j}=2n-2\sqrt n$, y el caso base aporta $2^kT(1)=\sqrt n$.
$$T(n)=2n-\sqrt n\in\Theta(n)$$

**Paso 7. g) $T(n)=T(n/2)+\log_2n$, $T(1)=1$.** El teorema maestro no sirve ($\log n$ no es polinómicamente mayor que $n^0$). Expande con $n=2^k$: $T(n)=1+\sum_{j=1}^{k}j$ (el término del nivel con $n/2^i=2^j$ es $\log_2 2^j=j$).
$$T(n)=1+\frac{k(k+1)}{2}=1+\frac{\log_2n\,(\log_2n+1)}{2}\in\Theta(\log^2n)$$

**Paso 8. h) $T(n)=4T(n/2)+n$, $T(1)=1$.** Es el ejemplo de la teoría. Cambio de variable: $t(k)=4t(k-1)+2^k$, $(x-4)(x-2)=0$, $t(k)=C_14^k+C_22^k$; con $t(0)=1$ y $t(1)=6$ salen $C_1=2$, $C_2=-1$.
$$T(n)=2n^2-n\in\Theta(n^2)$$

**Paso 9. i) $T(n)=2T(n/2)+n\log_2n$, $T(1)=1$.** El nivel $j$ aporta $2^j\cdot\frac n{2^j}\log_2\frac n{2^j}=n(k-j)$ con $n=2^k$. Suma: $n\sum_{j=0}^{k-1}(k-j)=n\frac{k(k+1)}{2}$, más $2^kT(1)=n$.
$$T(n)=n+\frac{n\log_2n\,(\log_2n+1)}{2}\in\Theta(n\log^2n)$$
Concuerda con el teorema maestro, caso 2 con $k=1$.

**Paso 10. j) $T(n)=\frac32T(n/2)-\frac12T(n/4)-\frac1n$.** Con $n=2^k$ y $t(k)=T(2^k)$: $t(k)=\frac32t(k-1)-\frac12t(k-2)-2^{-k}$. Homogénea: $x^2-\frac32x+\frac12=(x-1)(x-\frac12)$. El término $-\left(\frac12\right)^k$ añade $(x-\frac12)$. Ecuación característica $(x-1)(x-\frac12)^2$:
$$t(k)=C_1+(C_2+C_3k)\left(\tfrac12\right)^k$$
Valores: $t(0)=1$, $t(1)=\frac32$ y $t(2)=T(4)=\frac32\cdot\frac32-\frac12\cdot1-\frac14=\frac32$. De ellos: $C_1=1$, $C_2=0$, $C_3=1$.
$$T(n)=1+\frac{\log_2n}{n}\in\Theta(1)$$
Comprobación: $T(8)=\frac32\cdot\frac32-\frac12\cdot\frac32-\frac18=\frac{11}8=1+\frac38$.
