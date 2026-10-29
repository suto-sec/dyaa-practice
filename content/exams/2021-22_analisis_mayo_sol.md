# Soluciones examen análisis – mayo 2021-2022
Prueba de evaluación. Asignatura: Diseño y Análisis de Algoritmos, Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez. Curso 2021-2022 – 25 de mayo de 2022, Prueba de Análisis de Algoritmos, 50 minutos.

## Ejercicio 1 [1.5 puntos]
Analiza aplicando la definición formal de $O$ si se verifica:
$$n^3+6n^2-11n+6\in O(n^3)$$

### Solución
Como nos piden demostrar una expresión que involucra a $O$ debemos encontrar una pareja de constantes $c>0$ y $n_0>0$ tal que se verifique:
$$n^3+6n^2-11n+6\le c\cdot n^3,$$
para todo $n\ge n_0$. Como queremos que el miembro derecho sea mayor o igual que el izquierdo debemos escoger una $c>1$. Por ejemplo, $c=2$. En ese caso tenemos:
$$n^3+6n^2-11n+6\le 2n^3,$$
$$0\le n^3-6n^2+11n-6.$$
Factorizando el polinomio (por ejemplo, por Ruffini) tenemos:
$$0\le(n-1)(n-2)(n-3),$$
lo cual es cierto para todo $n\ge3$. Por tanto, para $c=2$ podemos escoger $n_0=3$, y hemos encontrado una pareja de constantes que verifica la definición de $O$ y podemos afirmar que $n^3+6n^2-11n+6\in O(n^3)$.

## Ejercicio 2 [2.5 puntos]
La fórmula para considerar todas las operaciones que se llevan a cabo en un bucle de tipo FOR o WHILE es:
$$T_{bucle}=1_{inicialización}+\sum^{n}(1_{comparación}+T_{cuerpo}+1_{incremento})+1_{última\ comparación}$$
Utilízala para hallar el número de operaciones ($T(n)$, simplificada) del siguiente código:
```java
for (int i=1; i<n; i++)
    for (int j=0; j<2i; j++)
        procesa(i,j); // dos operaciones
```

### Solución
En este caso, la función T que mide el número de operaciones (en función de n) será igual a la función asociada al bucle externo:
$$T(n)=1+\sum_{i=1}^{n-1}(1+T_{bucle\_interno}+1)+1,$$
mientras que
$$T_{bucle\_interno}=1+\sum_{j=0}^{2i-1}(1+T_{cuerpo}+1)+1.$$
Como $T_{cuerpo}=2$, por la instrucción `procesa(i,j)` tenemos:
$$T_{bucle\_interno}=1+\sum_{j=0}^{2i-1}(1+2+1)+1=2+\sum_{j=0}^{2i-1}4=2+4(2i)=2+8i.$$
Sustituyendo en $T(n)$ obtenemos:
$$T(n)=2+\sum_{i=1}^{n-1}(2+2+8i)=2+\sum_{i=1}^{n-1}4+8\sum_{i=1}^{n-1}i.$$
Resolviendo los sumatorios obtenemos:
$$T(n)=2+4(n-1)+8\frac{(n-1)n}{2}.$$
Finalmente, simplificando:
$$T(n)=2+4n-4+4n^2-4n=4n^2-2.$$

## Ejercicio 3 [3 puntos]
Resuelve la siguiente relación de recurrencia por el método de EXPANSIÓN de recurrencias, e indica su orden:
$$T(n)=\begin{cases}0&\text{si }n=1,\\3T(n/3)+n^2&\text{si }n>1.\end{cases}$$

### Solución
Procedemos a expandir la recurrencia:
$$\begin{aligned}T(n)&=3T(n/3)+n^2\\&=3\left(3T(n/9)+\left(\tfrac n3\right)^2\right)+n^2=9T(n/9)+\tfrac{n^2}{3}+n^2\\&=9\left(3T(n/27)+\left(\tfrac n9\right)^2\right)+\tfrac{n^2}{3}+n^2=27T(n/27)+\tfrac{n^2}{9}+\tfrac{n^2}{3}+n^2\\&\ \ \vdots\\&=3^iT(n/3^i)+n^2\left(1+\tfrac13+\tfrac1{3^2}+\cdots+\tfrac1{3^{i-1}}\right)=3^iT(n/3^i)+n^2\sum_{j=0}^{i-1}\left(\tfrac13\right)^j\end{aligned}$$
El sumatorio es una simple serie geométrica:
$$\sum_{j=0}^{i-1}\left(\tfrac13\right)^j=\frac{\left(\frac13\right)^i-1}{\frac13-1}=\frac{\frac1{3^i}-1}{-\frac23}=\frac32\cdot\frac{3^i-1}{3^i}.$$
Se llega al caso base cuando $n/3^i=1$. Es decir, cuando $n=3^i$. Sustituyendo tenemos:
$$T(n)=nT(1)+n^2\cdot\frac32\cdot\frac{n-1}{n}=n\cdot0+\frac32n(n-1)=\frac32n^2-\frac32n\in\Theta(n^2).$$

## Ejercicio 4 [3 puntos]
Resuelve la siguiente relación de recurrencia (incluyendo las constantes) por el método GENERAL de resolución de recurrencias, e indica su orden:
$$T(n)=\begin{cases}0&\text{si }n=1,\\3T(n/3)+n^2&\text{si }n>1.\end{cases}$$

### Solución
Para poder aplicar el método tenemos que hacer el cambio de variable $n=3^k$. En ese caso podemos reescribir la expresión para $T(n)$ de la siguiente manera:
$$T(n)=T(3^k)=3T(3^k/3)+(3^k)^2=3T(3^{k-1})+3^{2k}=3T(3^{k-1})+9^k.$$
A continuación hacemos un cambio de función $t(k)=T(3^k)$:
$$T(n)=T(3^k)=t(k)=3t(k-1)+9^k.$$
El polinomio característico de la recurrencia $t(k)$ es:
$$(x-3)(x-9).$$
Por tanto, la recurrencia tiene la siguiente forma:
$$t(k)=C_13^k+C_29^k.$$
Deshaciendo los cambios tenemos:
$$T(n)=C_1n+C_2n^2.$$
Para hallar las constantes necesitamos dos casos base. En primer lugar conocemos $T(1)=0$ del enunciado. Por otro lado,
$$T(3)=3T(1)+3^2=9.$$
Por tanto, el sistema de ecuaciones a resolver es:
$$\begin{cases}T(1)=C_1+C_2=0\\T(3)=3C_1+9C_2=9\end{cases}$$
Las soluciones son $C_1=-3/2$ y $C_2=3/2$. Por tanto:
$$T(n)=\frac32n^2-\frac32n\in\Theta(n^2).$$
