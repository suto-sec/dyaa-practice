## t21-potencias-logs

Q: ¿Cuánto vale $\log_b(x^y)$?
+ $y\cdot\log_b x$
- $(\log_b x)^y$
- $x\cdot\log_b y$
- $\log_b x+y$
? El exponente sale multiplicando: $\log_b(x^y)=y\log_b x$.

Q: Para cambiar de base se usa $\log_b x=\dots$
+ $\dfrac{\log_a x}{\log_a b}$
- $\log_a x\cdot\log_a b$
- $\dfrac{\log_a b}{\log_a x}$
- $\log_a x-\log_a b$
? Por eso la base de un logaritmo no importa en notación asintótica: sólo cambia una constante.

Q: ¿Cuál de estas identidades es cierta?
+ $x^{\log_b y}=y^{\log_b x}$
- $x^{\log_b y}=\log_b(xy)$
- $b^{\log_b a}=\log_b a$
- $(ab)^x=a^x+b^x$
? Se prueba tomando $\log_b$ en los dos lados: ambos dan $\log_b x\cdot\log_b y$. Y $b^{\log_b a}=a$.

Q: ¿De cuántas formas se pueden escoger $m$ elementos de entre $n$ sin importar el orden?
+ $\binom{n}{m}=\dfrac{n!}{m!\,(n-m)!}$
- $n!/m!$
- $n^m$
- $\dfrac{n!}{(n-m)!}$
? El coeficiente binomial cuenta combinaciones; también cumple $\binom nm=\binom{n-1}{m-1}+\binom{n-1}{m}$.

## t21-calculo

Q: ¿Cuál es la derivada de $f(x)=a^{g(x)}$?
+ $g'(x)\cdot a^{g(x)}\cdot\ln a$
- $g(x)\cdot a^{g(x)-1}$
- $a^{g'(x)}$
- $g'(x)\cdot a^{g(x)}$
? Se aplica la regla de la cadena a la exponencial, que añade el factor $\ln a$.

Q: ¿Cuándo se aplica la regla de L'Hôpital a $\lim\frac{f(n)}{g(n)}$?
+ Cuando sale una indeterminación como $\frac00$ o $\frac\infty\infty$; entonces $\lim\frac fg=\lim\frac{f'}{g'}$ (si este existe).
- Siempre, aunque el límite sea $5/2$.
- Sólo cuando $g$ es un polinomio.
- Cuando el límite es $\infty$.
? Hay que comprobar que es una indeterminación y que existe el segundo límite.

Q: ¿Cuánto vale $\int\frac1x\,dx$?
+ $\ln x$ (más una constante)
- $\frac{1}{x^2}$
- $x\ln x$
- $\frac{x^0}{0}$
? La fórmula $\int x^n\,dx=\frac{x^{n+1}}{n+1}$ no sirve para $n=-1$.

Q: Con $a>0$, ¿cuánto vale $\lim_{n\to\infty} n^a$ y cuánto $\lim_{n\to\infty}\log_b n$ si $b>1$?
+ Ambos tienden a $\infty$.
- $n^a$ tiende a $\infty$ y $\log_b n$ a 0.
- Los dos tienden a 0.
- $n^a$ tiende a 1 y $\log_b n$ a $\infty$.
? Son límites básicos que se usan al comparar órdenes de crecimiento.

## t21-sumas-basicas

Q: ¿Cuánto vale $\sum_{i=3}^{7}1$?
+ 5
- 7
- 4
- 3
? Hay $n-m+1=7-3+1=5$ términos. Es el error clásico contar $n-m$ en lugar de $n-m+1$.

Q: ¿Cuánto vale $\sum_{i=m}^{n}f(i)$ si $m>n$?
+ 0, por convención.
- $f(m)$
- Es indefinida.
- $-f(n)$
? Un sumatorio vacío vale 0.

Q: La suma de los $n$ primeros números impares, $\sum_{i=1}^{n}(2i-1)$, vale...
+ $n^2$
- $n(n+1)/2$
- $2n-1$
- $n^2+n$
? Se separa en $2\sum i-\sum 1=n(n+1)-n=n^2$. Para $n=4$: $1+3+5+7=16$.

Q: Sea una progresión aritmética $a_i=a_{i-1}+d$. La suma $\sum_{i=m}^{n}a_i$ vale...
+ $\frac12(a_m+a_n)(n-m+1)$
- $\frac12(a_m+a_n)\,n$
- $(a_n-a_m)(n-m+1)$
- $a_m\cdot(n-m)$
? Escribiendo la suma al derecho y al revés, cada columna suma $a_m+a_n$ y hay $n-m+1$ columnas.

## t21-cuadrados-cubos

Q: ¿Cuánto vale $\sum_{i=1}^{4}i^2$ según la fórmula del tema?
+ 30
- 100
- 10
- 20
? $\frac{n(n+1)(2n+1)}{6}=\frac{4\cdot5\cdot9}{6}=30$.

Q: ¿Cuánto vale $\sum_{i=1}^{n}i^3$?
+ $\left(\dfrac{n(n+1)}{2}\right)^2$
- $\dfrac{n(n+1)(2n+1)}{6}$
- $\dfrac{n^3(n+1)}{2}$
- $\dfrac{n^4}{4}$
? Es el cuadrado de la suma de los $n$ primeros naturales: $1^3+2^3+3^3+4^3=100=10^2$.

Q: ¿Es $\sum_{i=1}^{n}i^2$ la suma parcial de una progresión aritmética o geométrica?
+ No: no es ni aritmética ni geométrica, por eso hace falta otra técnica para hallar su fórmula.
- Sí, aritmética, con diferencia 2.
- Sí, geométrica, con razón 2.
- Sí, aritmética con diferencia 1.
? Los términos $1,4,9,16,\dots$ no tienen diferencia ni cociente constante.

## t21-telescopicas

Q: ¿Cuánto vale la suma telescópica $\sum_{i=1}^{n}(a_i-a_{i-1})$?
+ $a_n-a_0$
- $a_n+a_0$
- $n(a_n-a_0)$
- $0$
? Los términos intermedios se cancelan por parejas.

Q: ¿Cuánto vale $\sum_{i=1}^{n-1}\frac1{i(i+1)}$?
+ $1-\dfrac1n$
- $\ln n$
- $\dfrac1n$
- $1+\dfrac1n$
? Como $\frac1{i(i+1)}=\frac1i-\frac1{i+1}$, la suma es telescópica y queda $1-\frac1n$.

Q: Para calcular $\sum i^3$ el tema parte de la suma telescópica $\sum\big((i+1)^4-i^4\big)$. ¿Para qué sirve?
+ Su valor es $(n+1)^4-1$; desarrollándola aparecen $\sum i^3,\sum i^2,\sum i,\sum1$, y se despeja $\sum i^3$ conocidas las otras.
- Para derivar la suma respecto a $n$.
- Para demostrar que la suma es geométrica.
- Para acotar la suma con una integral.
? Es el método general para $S_p$: hacen falta antes las sumas de potencias menores.

Q: El número de cajas de una pirámide escalonada de altura $n$ (capas de $1,3,6,10,\dots$) es...
+ $\dfrac{n(n+1)(n+2)}{6}$
- $\dfrac{n(n+1)}{2}$
- $n^3$
- $\dfrac{n(n+1)(2n+1)}{6}$
? Es $\sum_{i=1}^{n}\frac{i(i+1)}{2}$; para $n=3$ salen $1+3+6=10$.

## t21-geometricas

Q: ¿Cuánto vale $\sum_{i=0}^{n-1}2^i$?
+ $2^n-1$
- $2^n$
- $2^{n-1}$
- $2^{n+1}-1$
? Es la serie geométrica de razón 2: $\frac{2^n-1}{2-1}$.

Q: ¿Qué truco se usa para sumar $r^m+r^{m+1}+\cdots+r^n$?
+ Restar $S$ y $rS$: casi todos los términos se cancelan y queda $(r-1)S=r^{n+1}-r^m$.
- Derivarla respecto de $n$.
- Dividirla entre $r$.
- Acotarla por una integral.
? Resulta $S=\frac{r^{n+1}-r^m}{r-1}$, válida si $r\neq1$.

Q: La suma $\sum_{i=1}^{n}i\,r^i$...
+ no es ni aritmética ni geométrica, y se resuelve restando $S-rS$, derivando la geométrica o descomponiéndola en sumas geométricas.
- es una suma geométrica de razón $r$.
- no tiene fórmula cerrada.
- vale $n\cdot r^n$.
? Los tres métodos dan $\frac{r+r^{n+1}(nr-n-1)}{(r-1)^2}$.

Q: ¿Qué ocurre con $\sum_{i=0}^{n-1}\left(\frac12\right)^i$ cuando $n$ crece?
+ Se acerca a 2.
- Crece sin límite.
- Se acerca a 0.
- Se acerca a 1.
? Vale $2\frac{2^n-1}{2^n}=2-2^{1-n}$.

## t21-integrales

Q: Si $f$ es **creciente**, ¿entre qué integrales se acota $\sum_{i=m}^{n}f(i)$?
+ $\int_{m-1}^{n}f(x)\,dx\le\sum\le\int_{m}^{n+1}f(x)\,dx$
- $\int_{m}^{n+1}f\le\sum\le\int_{m-1}^{n}f$
- $\int_{m}^{n}f\le\sum\le\int_{m}^{n}f$
- $\int_{0}^{n}f\le\sum\le\int_{0}^{n+1}f$
? Dibujando rectángulos de ancho 1: los de altura $f(i)$ sobre $[i,i+1]$ quedan por encima de la curva y los de $[i-1,i]$ por debajo.

Q: ¿Qué hay que comprobar antes de acotar una suma con integrales?
+ Si la función es creciente o decreciente en el intervalo, porque de eso dependen los límites.
- Que la función sea un polinomio.
- Que $m=1$.
- Que la suma sea finita y par.
? Con $f$ decreciente las cotas se intercambian.

Q: Para la serie armónica $\sum_{i=1}^{n}\frac1i$ se obtiene...
+ $\ln(n+1)\le\sum\le\ln n+1$
- $\ln n\le\sum\le n$
- $\frac1n\le\sum\le1$
- $\sum=\ln n$ exactamente
? La función $1/x$ es decreciente; el término $i=1$ se saca para poder usar $\int_1^n$. La serie diverge y $\sum\approx\ln n+0{,}577$.
