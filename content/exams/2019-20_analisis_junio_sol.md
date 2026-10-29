# Soluciones examen análisis – junio 2019-2020
Asignatura: Diseño y Análisis de Algoritmos. Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez. (Prueba de evaluación, 10 de enero de 2023)
Curso 2019-2020 – 18 de mayo de 2020. Soluciones – Análisis de algoritmos

## Ejercicio 1 [1 punto] [Duración: 10 minutos]
Demuestra usando la definición de $\Theta$ que: $\log_4(n)\in\Theta(\log_2(n))$

### Solución
Como nos piden demostrar una expresión que involucra a $\Theta$ (cota ajustada), debemos demostrar tanto $\log_4(n)\in O(\log_2(n))$, como $\log_4(n)\in\Omega(\log_2(n))$. Además, podemos transformar el logaritmo en base 4 en un logaritmo en base 2 para facilitar las operaciones:
$$\log_4(n)=\frac{\log_2(n)}{\log_2(4)}=\frac{1}{2}\log_2(n)$$
Para la cota inferior $\Omega$ tenemos que encontrar dos constantes constante $C_1$ y $n_1$ tal que:
$$\frac{1}{2}\log_2(n)\ge C_1\log_2(n)$$
se cumpla par todo $n\ge n_1$. Por ejemplo, podemos elegir $C_1=1/4$. En ese caso la expresión queda:
$$2\log_2(n)\ge\log_2(n)$$
La cual se verifica para todo $n\ge1$ (si $n<1$ los logaritmos serían negativos, y por tanto sería mayor el miembro derecho de la inecuación). Finalmente, podemos asignar $n_1=1$, y habríamos encontrado una pareja de constantes que verifica la definición de $\Omega$.

Para $O$ el procedimiento es similar. Debemos encontrar dos constantes constante $C_2$ y $n_2$ tal que:
$$\frac{1}{2}\log_2(n)\le C_2\log_2(n)$$
se cumpla par todo $n\ge n_2$. Por ejemplo, eligiendo $C_2=1$ tenemos:
$$\frac{1}{2}\log_2(n)\le\log_2(n)$$
la cual también se cumple para todo $n\ge1$. Por tanto, podemos escoger $n_2=1$, y habríamos encontrado una pareja de constantes que verifican la definición de $O$. De esta manera habríamos terminado la demostración y por tanto el ejercicio.

NOTA: la definición formal de $\Theta$ pide hallar tres constantes: $C_1$, $C_2$ y $n_0$. Como hemos hecho la demostración para $\Omega$ y $O$ de manera independiente hemos obtenido $C_1$ y $C_2$, pero dos constantes $n_1$ y $n_2$ (que no siempre son iguales). En general, $n_0$ simplemente sería el máximo de $n_1$ y $n_2$.

## Ejercicio 2 [2 puntos] [Duración: 10 minutos]
Simplifica el siguiente sumatorio (la expresión final no debe contener ningún sumatorio):
$$\sum_{i=1}^{j}\left(1-j-2i+6i^2+nj+8ni+3\cdot4^i\right)$$

### Solución
El sumatorio consta de siete términos, con lo cual podemos interpretar que tenemos siete sumatorios independientes:
$$\sum_{i=1}^{j}1-\sum_{i=1}^{j}j-\sum_{i=1}^{j}2i+\sum_{i=1}^{j}6i^2+\sum_{i=1}^{j}nj+\sum_{i=1}^{j}8ni+\sum_{i=1}^{j}3\cdot4^i$$
Las expresiones dentro del primer, segundo y quinto sumatorio no dependen de la variable $i$, por tanto solo tenemos que sumarlas $j$ veces, lo que es equivalente a multiplicarlas por $j$. Del resto de sumatorios podemos extraer fuera todos los términos multiplicativos que no involucren a la variable $i$. De esta manera obtenemos:
$$j-j^2-2\sum_{i=1}^{j}i+6\sum_{i=1}^{j}i^2+nj^2+8n\sum_{i=1}^{j}i+3\sum_{i=1}^{j}4^i$$
Aplicando las fórmulas para la suma de los primeros naturales y sus cuadrados, y la fórmula para series geométricas (último sumatorio), obtenemos:
$$j-j^2-2\frac{j(j+1)}{2}+6\frac{(2j+1)j(j+1)}{6}+nj^2+8n\frac{j(j+1)}{2}+3\frac{4^{j+1}-4}{4-1}$$
Opcionalmente podemos cancelar denominadores:
$$j-j^2-j(j+1)+(2j+1)j(j+1)+nj^2+4nj(j+1)+4^{j+1}-4$$

## Ejercicio 3 [1 punto] [Duración: 10 minutos]
Halla una cota inferior y una superior del siguiente sumatorio: $\sum_{j=0}^{n-1}e^j$

### Solución
Este ejercicio se puede resolver de dos maneras teniendo en cuenta el contenido de la asignatura. En primer lugar, se puede usar la técnica de aproximación por integrales. En ese caso la función dentro del sumatorio, que es $f(x)=e^x$, es monótona creciente. Por tanto, de manera general las cotas vendrían dadas por:
$$\int_{m-1}^{n}f(x)dx\le\sum_{j=m}^{n}f(j)\le\int_{m}^{n+1}f(x)dx$$
En nuestro caso el límite inferior es 0 ($m=0$), mientras que el superior es $n-1$ (en vez de $n$). Así que tendríamos:
$$\int_{-1}^{n-1}e^x dx\le\sum_{j=0}^{n-1}e^j\le\int_{0}^{n}e^x dx$$
Además, $\int e^x dx=e^x$. Por tanto:
$$[e^x]_{-1}^{n-1}\le\sum_{j=0}^{n-1}e^j\le[e^x]_{0}^{n}$$
Quedando:
$$e^{n-1}-e^{-1}=\frac{e^n-1}{e}\le\sum_{j=0}^{n-1}e^j\le e^n-1$$
La segunda forma de resolver este ejercicio simplemente consiste en darse cuenta de que el sumatorio del enunciado es una serie geométrica, para la cual podemos hallar una expresión exacta:
$$\sum_{j=0}^{n-1}e^j=\frac{e^n-1}{e-1}$$
Esta expresión sería tanto cota superior como inferior (considerando desigualdades del tipo $\le$ y $\ge$).

## Ejercicio 4 [3 puntos] [Duración: 15 minutos]
Resolved la siguiente relación de recurrencia por el método general de resolución de recurrencias:
$$T(n)=\begin{cases}1 & \text{si } n=1,\\ 2T(n/4)+\log_2(n) & \text{si } n>1.\end{cases}$$

### Solución
Para poder aplicar el método tenemos que hacer el cambio de variable $n=4^k$. En ese caso podemos reescribir la expresión para $T(n)$ de la siguiente manera:
$$T(n)=T(4^k)=2T(4^k/4)+\log_2(4^k)=2T(4^k/4)+k\log_2(4)=2T(4^k/4)+2k$$
A continuación hacemos un cambio de función $t(k)=T(4^k)$:
$$T(n)=T(4^k)=t(k)=2t(k-1)+2k\cdot1^k$$
El polinomio característico de la recurrencia $t(k)=2t(k-1)+2k\cdot1^k$ es: $(x-2)(x-1)^2$

Por tanto, la recurrencia tiene la siguiente forma:
$$t(k)=C_12^k+C_2\cdot1^k+C_3\cdot k\cdot1^k=C_12^k+C_2+C_3k$$
Para hallar las constantes necesitamos tres casos base. En primer lugar conocemos $T(1)=t(0)=1$. Aplicando $t(k)=2t(k-1)+2k$ vemos que:
$t(1)=2t(0)+2\cdot1=2+2=4$
$t(2)=2t(1)+2\cdot2=8+4=12$

Por tanto, el sistema de ecuaciones a resolver es:
$t(0)=C_1+C_2=1$
$t(1)=2C_1+C_2+C_3=4$
$t(2)=4C_1+C_2+2C_3=12$

Las soluciones son $C_1=5$, $C_2=-4$ y $C_3=-2$. Por tanto: $t(k)=5\cdot2^k-4-2k$

Finalmente, debemos deshacer el cambio de variable. Por un lado, dado el cambio de variable aplicado, $k=\log_4(n)$. Además, $n=4^k=(2^2)^k=2^{2k}=(2^k)^2$. Por tanto, $2^k=\sqrt{n}$. De esta manera la expresión final para $T(n)$ es:
$$T(n)=5\sqrt{n}-4-2\log_4(n)\in\Theta[\sqrt{n}]$$

## Ejercicio 5 [3 puntos] [Duración: 15 minutos]
Resolved la siguiente relación de recurrencia por el método de expansión de recurrencias:
$$T(n)=\begin{cases}1 & \text{si } n=1,\\ 2T(n/4)+\sqrt{n} & \text{si } n>1.\end{cases}$$

Procedemos a expandir la recurrencia:
$T(n)=2T(n/4)+\sqrt{n}$
$=2\left(2T(n/4^2)+\sqrt{n/4}\right)+\sqrt{n}$
$=4T(n/4^2)+2\sqrt{n}$
$=4\left(2T(n/4^3)+\sqrt{n/4^2}\right)+2\sqrt{n}$
$=8T(n/4^3)+3\sqrt{n}$
$\vdots$
$=2^iT(n/4^i)+i\sqrt{n}$

Se llega al caso base cuando $n/4^i=1$. Es decir, cuando $n=4^i$, o de manera equivalente, cuando $i=\log_4(n)$. Además, como $n=4^i=(2^2)^i=2^{2i}=(2^i)^2$ entonces $2^i=\sqrt{n}$. Sustituyendo:
$$T(n)=\sqrt{n}\,T(1)+\log_4(n)\cdot\sqrt{n}=\sqrt{n}+\sqrt{n}\cdot\log_4(n)\in\Theta[\sqrt{n}\log(n)]$$
