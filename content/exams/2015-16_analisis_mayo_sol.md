# Soluciones examen análisis – mayo 2015-2016
Prueba de evaluación. Asignatura: Diseño y Análisis de Algoritmos, Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez.

Curso 2015-2016 – 17 de marzo de 2016. Prueba de Análisis de Algoritmos. Valor: 30 % de la nota final. Duración: 1 hora y 15 minutos

## Ejercicio 1 [1.5 puntos]
Indicad la definición matemática de $O$, y usadla para demostrar (sin usar límites), si se verifica: $5n\in O(n\log(n))$

### Solución
La definición de $O$ es: $O(g(n))=\{f(n):\exists c>0 \text{ y } n_0>0\ /\ 0\le f(n)\le c\cdot g(n),\ \forall n\ge n_0\}$

Por tanto, tenemos que ver si es posible encontrar una pareja de constantes $c>0$ y $n_0>0$ de forma que se cumpla la definición. Empezamos analizando: $5n\le cn\log(n)$

Escogemos un valor de $c$ lo suficientemente grande. En este caso $c=5$ resulta adecuado para continuar:
$$5n\le5n\log(n)$$
$$0\le5n\log(n)-5n$$
$$0\le5n(\log(n)-1)$$
En este caso, sea cual sea la base del logaritmo, por ejemplo $b$, siempre es posible encontrar un $n_0$ de tal manera que se cumpla la definición. Bastaría escoger $n_0=b$, ya que $(\log_b(n)-1)\ge0$ para todo $n\ge b$. Por tanto, podemos afirmar que $5n\in O(n\log(n))$.

## Ejercicio 2 [2.5 puntos]
La fórmula para considerar todas las operaciones que se llevan a cabo en un bucle de tipo FOR o WHILE es:
$$T_{bucle}=1_{inicialización}+\sum_{i=1}^{n}(1_{comparación}+T_{cuerpo}+1_{incremento})+1_{última\ comparación}$$
Utilízala para hallar el número de operaciones ($T(n)$, simplificada) del siguiente código:
```java
int i=0;
while (i<n) {
    int j=i;
    while (j<=n) {
        procesa(i,j); // una operación
        j++;
    }
    i++;
}
```
Se considera que las inicializaciones, comparaciones, e incrementos siempre necesitan una sola operación.

### Solución
El código consta de 2 bucles, que podemos descomponer de la siguiente manera:
$$T(n)=1+\sum_{i=0}^{n-1}(1+T_{While\ interno}+1)+1$$
$$T_{While\ interno}=1+\sum_{j=i}^{n}(1+1+1)+1=2+3(n-i+1)$$
Sustituyendo en $T(n)$ tenemos:
$$T(n)=2+\sum_{i=0}^{n-1}\left(2+2+3(n-i+1)\right)=2+\sum_{i=0}^{n-1}(7+3n-3i)$$
$$=2+7n+3n^2-3\sum_{i=0}^{n-1}i=2+7n+3n^2-3\frac{n(n-1)}{2}$$
Finalmente:
$$T(n)=2+7n+3n^2-\frac32n^2+\frac32n=\frac32n^2+\frac{17}{2}n+2$$

## Ejercicio 3 [3 puntos]
Halla una expresión no recursiva para la siguiente recurrencia por el método de expansión de recurrencias: $T(n)=4T(n/2)+n$, donde $n$ es una potencia de 2 ($n=2^k$, para $k=1,2,\ldots$), y donde $T(1)=1$. Indica además el orden de $T(n)$.

### Solución
Procedemos a expandir la recurrencia:
$$T(n)=4T(n/2)+n$$
$$=4\left[4T(n/2^2)+\tfrac n2\right]+n=4^2T(n/2^2)+2n+n$$
$$=4^2\left[4T(n/2^3)+\tfrac{n}{2^2}\right]+2n+n=4^3T(n/2^3)+4n+2n+n$$
$$=4^3\left[4T(n/2^4)+\tfrac{n}{2^3}\right]+4n+2n+n=4^4T(n/2^4)+8n+4n+2n+n$$
$$\vdots$$
$$=4^iT(n/2^i)+n\sum_{j=0}^{i-1}2^j=4^iT(n/2^i)+(2^i-1)n$$
Se llega al caso base cuando $n/2^i=1$. Es decir, cuando $n=2^i$. En ese caso, $n^2=(2^i)^2=(2^2)^i=4^i$. Sustituyendo:
$$T(n)=n^2+n^2-n=2n^2-n$$

## Ejercicio 4 [3 puntos]
Halla una expresión no recursiva para la siguiente recurrencia por el método general de resolución recurrencias: $T(n)=T(n/2)+\log_2n$, donde $n$ es una potencia de 2 ($n=2^k$, para $k=1,2,\ldots$), y donde $T(1)=1$. Indica además el orden de $T(n)$.

### Solución
Para poder aplicar el método primero tenemos que hacer el cambio de variable $n=2^k$ (donde $k=\log_2n$):
$$T(n)=T(2^k)=T(2^k/2)+\log_22^k=T(2^{k-1})+k$$
A continuación hacemos un cambio de función $t(k)=T(2^k)$:
$$T(n)=T(2^k)=t(k)=t(k-1)+k$$
El polinomio característico de la recurrencia es: $(x-1)(x-1)^2=(x-1)^3$

Por tanto, la recurrencia tiene la siguiente forma:
$$t(k)=C_11^k+C_2k1^k+C_3k^21^k=C_1+C_2k+C_3k^2$$
Para hallar las constantes necesitamos dos casos base adicionales. Procedemos a calcular $T(2)=T(1)+\log_22=2$, y $T(4)=T(2)+\log_24=4$. Los correspondientes casos base para $t(k)$ son:
$$T(1)=T(2^0)=t(0)=1$$
$$T(2)=T(2^1)=t(1)=2$$
$$T(4)=T(2^2)=t(2)=4$$
Por tanto, el sistema de ecuaciones a resolver es:
$$t(0)=C_1=1$$
$$t(1)=C_1+C_2+C_3=2$$
$$t(2)=C_1+2C_2+4C_3=4$$
Las soluciones son $C_1=1$ y $C_2=C_3=1/2$. Por tanto, $t(k)=1+k/2+k^2/2$. Deshaciendo el cambio de variable, donde $k=\log_2n$, obtenemos:
$$t(k)=T(2^k)=T(n)=1+\tfrac12\log_2n+\tfrac12(\log_2n)^2\in\Theta\left((\log n)^2\right)$$
