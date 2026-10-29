# Ejercicios adicionales

## 1. Ejercicios de complejidad computacional

### Ejercicio 1.1
Demuestra la siguiente identidad: $\left(\frac{a}{b^k}\right)^{\log_b n} = \frac{n^{\log_b a}}{n^k}$

### Ejercicio 1.2
Muestra que $\log n! \in \Theta(n\log n)$ usando límites. Pista: cuando $n$ tiende a infinito $n!$ se puede sustituir por la "aproximación de Stirling": $n! \sim \sqrt{2\pi n}\left(\frac{n}{e}\right)^n$.

### Ejercicio 1.3
Demuestra que $n\log n \in O(n^{1+a})$, donde $a>0$. Usa límites y la regla de L'Hopital.

### Ejercicio 1.4
Sean $m$ y $n$ un par de números enteros. Determina el valor del siguiente sumatorio: $\sum_{i=m}^{n} 1$.

### Ejercicio 1.5
Escribe la suma de los primeros $n$ enteros impares usando un sumatorio, y simplifícala (es decir, indica una expresión equivalente que no contenga un sumatorio). El resultado es un polinomio sencillo.

### Ejercicio 1.6
Usa la siguiente identidad: $\sum_{i=1}^{n}\frac{i(i+1)}{2} = \sum_{i=1}^{n} i(n-i+1)$ para hallar una expresión de los primeros $n$ enteros al cuadrado ($1^2+2^2+\cdots+n^2$).

### Ejercicio 1.7
Demuestra que una suma parcial general de $n$ términos de una secuencia aritmética ($s_i = s_{i-1}+d$, para algún valor inicial $s_0$) sigue: $\sum_{i=0}^{n-1} s_i = \frac{n}{2}(s_0+s_{n-1})$.

### Ejercicio 1.8
Resuelve las siguientes recurrencias, sin calcular las constantes multiplicativas ($C_i$). Esto implica que los casos base no son necesarios en este ejercicio.
- a) $T(n)=4T(n-1)-5T(n-2)+2T(n-3)+n-3+5n^2\cdot 2^n$
- b) $T(n)=T(n-1)+3n-3+n^3\cdot 3^n$
- c) $T(n)=5T(n-1)-8T(n-2)+4T(n-3)+3+n^2+n2^n$

### Ejercicio 1.9
Un algoritmo procesa algunos bits de la representación binaria de los números desde 1 a $2^n-1$, donde $n$ es el número de bits de cada número. En concreto, el algoritmo procesa los bits menos significativos de cada número (de derecha a izquierda), hasta que encuentra el primer bit a 1. Dado $n$, determina, usando sumatorios, el número total de bits que procesa el algoritmo. Por ejemplo, para $n=4$ el algoritmo procesa los 26 bits sombreados de la siguiente figura:

| Número | bit 3 | bit 2 | bit 1 | bit 0 | bits procesados |
|---|---|---|---|---|---|
| 0001 | 0 | 0 | 0 | ==1== | 1 |
| 0010 | 0 | 0 | ==1== | ==0== | 2 |
| 0011 | 0 | 0 | 1 | ==1== | 1 |
| 0100 | 0 | ==1== | ==0== | ==0== | 3 |
| 0101 | 0 | 1 | 0 | ==1== | 1 |
| 0110 | 0 | 1 | ==1== | ==0== | 2 |
| 0111 | 0 | 1 | 1 | ==1== | 1 |
| 1000 | ==1== | ==0== | ==0== | ==0== | 4 |
| 1001 | 1 | 0 | 0 | ==1== | 1 |
| 1010 | 1 | 0 | ==1== | ==0== | 2 |
| 1011 | 1 | 0 | 1 | ==1== | 1 |
| 1100 | 1 | ==1== | ==0== | ==0== | 3 |
| 1101 | 1 | 1 | 0 | ==1== | 1 |
| 1110 | 1 | 1 | ==1== | ==0== | 2 |
| 1111 | 1 | 1 | 1 | ==1== | 1 |

Bits sombreados: los que procesa el algoritmo, leyendo cada número de derecha a izquierda hasta el primer 1 inclusive.

### Ejercicio 1.10
Especifica relaciones de recurrencia que describan el coste computacional en tiempo de algoritmos que implementen las siguientes funciones:

(1) $f(n)=\begin{cases}1 & n=1 \text{ o } n=2\\ \left\lfloor \Phi\cdot f(n-1)+\frac12\right\rfloor & n>2\end{cases}$ donde $\Phi=(1+\sqrt5)/2$ es la "proporción aurea" y $\lfloor\cdot\rfloor$ es la función suelo.

(2) $f(n,a,b)=\begin{cases}b & n=1\\ f(n-1,a+b,a) & n>1\end{cases}$

(3) $f(n)=\begin{cases}1 & n=1 \text{ o } n=2\\ \left[f\left(\frac n2+1\right)\right]^2-\left[f\left(\frac n2-1\right)\right]^2 & n>2 \text{ y } n \text{ par}\\ \left[f\left(\frac{n+1}{2}\right)\right]^2+\left[f\left(\frac{n-1}{2}\right)\right]^2 & n>2 \text{ y } n \text{ impar}\end{cases}$

(4) $f(n,s)=\begin{cases}1+s & n=1 \text{ o } n=2\\ f(n-1,\,s+f(n-2,0)) & n>2\end{cases}$

### Ejercicio 1.11
Define una relación de recurrencia para el coste computacional en tiempo del siguiente código:
```python
def es_par(n):
    if n == 0:
        return True
    elif n == 1:
        return False
    else:
        return es_par(n - 2)
```
Resuelve la relación de recurrencia por el método de expansión de recurrencias y el método general de resolución de recurrencias. Por último, indica su orden de crecimiento.

### Ejercicio 1.12
Resuelve la siguiente recurrencia por el método de expansión de recurrencias: $T(n)=\begin{cases}1 & n=0\\ 1+\sum_{j=0}^{n-1}T(j) & n>0\end{cases}$

### Ejercicio 1.13
Resuelve la siguiente recurrencia por el método de expansión de recurrencias: $T(n)=\begin{cases}1 & n=1\\ 2T(n/4)+\log_2 n & n>1\end{cases}$

### Ejercicio 1.14
Resuelve la siguiente recurrencia por el método general de resolución de recurrencias: $T(n)=\begin{cases}a & n=1\\ T(n-1)+b & n>1\end{cases}$

### Ejercicio 1.15
Define una relación de recurrencia para el coste computacional en tiempo de la siguiente función:
```python
def suma_naturales(n):
    if n == 1:
        return 1
    elif n % 2 == 0:
        return 2 * suma_naturales(n / 2) + (n / 2)**2
    else:
        return (2 * suma_naturales((n - 1) / 2) + ((n + 1) / 2)**2)
```
Resuélvela usando el teorema maestro, el método de expansión de recurrencias y el método general de resolución de recurrencias. Por último, indica su orden de crecimiento.

### Ejercicio 1.16
Resuelve la siguiente recurrencia usando el teorema maestro, el método de expansión de recurrencias y el método general de resolución de recurrencias. Por último, indica su orden de crecimiento. $T(n)=\begin{cases}1 & n=1\\ 3T(n/2)+n & n>1\end{cases}$ donde $n$ es una potencia de 2.

### Ejercicio 1.17
Resuelve la siguiente recurrencia por el método general de resolución de recurrencias: $T(n)=\begin{cases}1 & n=1\\ T(n/10)+1 & n>1\end{cases}$

### Ejercicio 1.18
Resuelve las siguientes recurrencias:
- a) $T(n)=2T(n-1)+3n-2$, donde $T(0)=0$.
- b) $T(n)=T(n/2)+n$, donde $T(1)=1$, y $n$ es una potencia de 2.
- c) $T(n)=T(n/\alpha)+n$, donde $T(1)=0$, and donde $\alpha\ge2$ es un entero.
- d) $T(n)=T(n/3)+n^2$, donde $T(1)=1$, y $n$ es una potencia de 3.
- e) $T(n)=3T(n/3)+n^2$, donde $T(1)=0$, y $n$ es una potencia de 3.
- f) $T(n)=2T(n/4)+n$, donde $T(1)=1$, y $n$ es una potencia de 4.
- g) $T(n)=T(n/2)+\log_2 n$, donde $T(1)=1$, y $n$ es una potencia de 2.
- h) $T(n)=4T(n/2)+n$, donde $T(1)=1$, y $n$ es una potencia de 2.
- i) $T(n)=2T(n/2)+n\log_2 n$, donde $T(1)=1$, y $n$ es una potencia de 2.
- j) $T(n)=\frac32 T(n/2)-\frac12 T(n/4)-\frac1n$, donde $T(1)=1$, $T(2)=3/2$, y $n$ es una potencia de 2.

## 2. Ejercicios resueltos de complejidad computacional

### Ejercicio 2.1
Demostrar: $n\ln n = O(n^{1+a})$, donde $0<a<1$.

Solución:
Podemos demostrar que $n^{1+a}$ ($0<a<1$) es cota superior de $n\ln n$ si se verifica: $\lim_{n\to\infty}\frac{n\ln n}{n^{1+a}}=0$

Procedemos a calcular el límite: $\lim_{n\to\infty}\frac{n\ln n}{n^{1+a}}=\lim_{n\to\infty}\frac{\ln n}{n^a}=\frac{\infty}{\infty}$

Aplicando L'Hopital (derivando numerador y denominador) se obtiene: $\lim_{n\to\infty}\frac{1/n}{an^{a-1}}=\lim_{n\to\infty}\frac{1}{an^a}=0$

NOTA: se ha utilizado un logaritmo neperiano, pero el resultado es válido independientemente de la base del logaritmo.

### Ejercicio 2.2
Simplificar: $O(3m^3+2mn^2+n^2+10m+m^2)$

Solución:
Para simplificar la expresión, en primer lugar, podemos eliminar las constantes, quedando: $O(m^3+mn^2+n^2+m+m^2)$

En segundo lugar, resulta trivial ver que los términos $m$ y $m^2$ son de menor orden que $m^3$, por tanto también se pueden cancelar: $O(m^3+mn^2+n^2)$

Finalmente $n^2$ también se puede eliminar dado que el término $mn^2$ es de mayor orden. Esto puede comprobarse hallando los siguientes límites: $\lim_{n\to\infty}\frac{n^2}{mn^2}=\frac1m\neq\infty$ y $\lim_{m\to\infty}\frac{n^2}{mn^2}=0$

Como uno es igual a 0 y otro distinto de 0 se verifica que $mn^2$ es de mayor orden $n^2$. Finalmente la expresión no puede simplificarse más, quedando: $O(m^3+mn^2)$

NOTA: los dos últimos términos no se pueden eliminar. No se puede afirmar que $m^3$ sea de mayor orden que $mn^2$ ya que: $\lim_{n\to\infty}\frac{mn^2}{m^3}=\infty$ y $\lim_{m\to\infty}\frac{mn^2}{m^3}=0$

Es decir, un límite es 0 y el otro infinito. Análogamente, tampoco se puede afirmar que $mn^2$ sea de mayor orden que $m^3$ dado que: $\lim_{n\to\infty}\frac{m^3}{mn^2}=0$ y $\lim_{m\to\infty}\frac{m^3}{mn^2}=\infty$

### Ejercicio 2.3
Simplificar la siguiente expresión: $O(m^2+m\log n+n\log m^2+mn)$

Solución:
En primer lugar eliminamos las constantes:
$O(m^2+m\log n+n\log m^2+mn)=O(m^2+m\log n+2n\log m+mn)=O(m^2+m\log n+n\log m+mn)$

A continuación comprobamos término a término si uno tiene mayor orden que otro. De esta manera podemos ver que podemos eliminar dos términos, ya que $mn>m\log n$: $\lim_{n\to\infty}\frac{m\log n}{mn}=0$, $\lim_{m\to\infty}\frac{m\log n}{mn}=\frac{\log n}{n}<\infty$

y $mn>n\log m$: $\lim_{n\to\infty}\frac{n\log m}{mn}=\frac{\log m}{m}<\infty$, $\lim_{m\to\infty}\frac{n\log m}{mn}=0$

Por tanto, la expresión simplificada final es: $O(m^2+mn)$

Para calcular los límites se ha usado: $\lim_{x\to\infty}\frac{\log x}{x}=\frac{\infty}{\infty}$. Donde aplicando la regla de L'Hopital: $\lim_{x\to\infty}\frac{\log x}{x}=\lim_{x\to\infty}\frac1x=0$

### Ejercicio 2.4
Demostrar utilizando la definición de $\Theta$: $n^2/4+3n-1\in\Theta(n^2)$

Solución:
Para hacer la demostración debemos comprobar que $n^2$ es tanto cota inferior como superior. Es decir, $n^2/4+3n-1\in\Omega(n^2)$ y $n^2/4+3n-1\in O(n^2)$.

$\Omega$:
Debemos encontrar un par de constantes positivas $c_1$ y $n_1$ tal que se cumpla: $n^2/4+3n-1\ge c_1n^2$ para todo $n\ge n_1$. Por ejemplo, podemos elegir $c_1=1/4$. En ese caso tenemos $n^2/4+3n-1\ge n^2/4$, es decir $3n-1\ge0$. Lo cual se cumple para todo $n\ge1$. Por tanto, simplemente escogemos $n_1=1$. Finalmente, hemos visto que existen esas constantes y queda demostrado.

$O$:
Debemos encontrar un par de constantes positivas $c_2$ y $n_2$ tal que se cumpla: $n^2/4+3n-1\le c_2n^2$ para todo $n\ge n_2$. Por ejemplo, podemos elegir $c_2=1$. En ese caso tenemos $n^2/4+3n-1\le n^2$, es decir $3n-1\le 3n^2/4$. El orden del termino cuadrático naturalmente es superior al lineal, con lo cual la desigualdad se va a cumplir a partir de un $n$ dado. En ese caso, se cumple a partir de $n\ge4$, y podemos elegir $n_2=4$. Una vez más, hemos visto que existen esas constantes y queda demostrado.

NOTA: podíamos haber elegido otras constantes. Lo importante es que existan, no sus valores concretos.

### Ejercicio 2.5
Demostrar mediante la definición de $O$: $n^e\in O(e^n)$

Solución:
Para hacer la demostración debemos encontrar un par de constantes positivas $c$ y $n_0$ tal que se cumpla: $n^e\le ce^n$ para todo $n\ge n_0$. Podemos escoger $c=1$. En ese caso tenemos: $n^e\le e^n$

Aplicando logaritmos a ambos lados: $e\log_e n\le\log_e e^n=n$

Esta operación se puede realizar sin que afecte a la desigualdad ya que el logaritmo es una función monótona creciente, por lo que "preserva el orden" (es decir, si $a<b$, entonces $\log a<\log b$).

Ahora necesitamos encontrar un $n_0$ para el que se cumpla la expresión para todo $n\ge n_0$. En este ejercicio no podemos despejar $n$, por lo que seguiremos otra estrategia (hay varias estrategias válidas). Nos fijamos en los valores de las funciones y sus derivadas (pendientes) con respecto a $n$. Para $e\log_e n$ la derivada es $e/n$, mientras que para $n$ la derivada es 1. Por tanto, las dos son funciones crecientes para $n>0$, pero $e\log_e n$ crece igual o más lentamente que $n$ para $n\ge e$ (ya que su pendiente sería menor o igual a 1). Por tanto, si encontramos un $n_0\ge e$, de tal forma que la función $n$ sea mayor que $e\log_e n$ en $n_0$ ($e\log_e n_0\le n_0$), la fórmula se verificará para todo $n\ge n_0$. En otras palabras, la función $n$ no solamente será mayor o igual que $e\log_e n$ en $n_0$, sino que lo será también para todo $n\ge n_0$.

En este caso, tomamos $n_0=e=2{,}718\ldots$ Como ambas funciones toman el mismo valor en $e$, que vale justamente $e$, entonces $e\log_e n\le n$ para todo $n\ge e=n_0$, terminando la demostración.

Aunque no es necesario para la demostración, la siguiente figura muestra las dos funciones $e\log_e n$, y $n$, donde se puede ver que se verifica $e\log_e n\le n$ incluso para todo $n>0$:

[figura: gráfica de $n$ (recta) y $e\log_e n$ (curva logarítmica) para $n\in[-1,6]$; se cortan en $n=e$ (valor $e$), con $e\log_e n\le n$ en todo $n>0$]

### Ejercicio 2.6
Determinar la complejidad $\theta$ del siguiente algoritmo: se trata de ordenar los elementos de una matriz cuadrada, por filas, utilizando una variante del algoritmo de ordenación Bubble-sort (Burbuja).

[figura: matriz 4x4 desordenada -> matriz ordenada por filas]
```
5  8  6  13        1  2  3  3
14 1  3  3    ->    4  5  5  5
4  6  5  5          6  6  7  8
7  10 12 2          10 12 13 14
```

Solución:
La variante del algoritmo podría consistir en transformar la matriz en un vector auxiliar, ordenarlo, y volver a convertir el vector ordenado en una matriz. Otra posibilidad sería realizar la ordenación sin el vector auxiliar. En cualquier caso, la solución a este ejercicio depende de la medida que usemos del tamaño de la matriz cuadrada. De esta manera podemos considerar dos posibilidades:
- Si suponemos que la matriz cuadrada tiene $n$ elementos (tendría $\sqrt n$ filas y columnas), entonces el algoritmo tendría complejidad cuadrática: $\theta(n^2)$ ya que el algoritmo de ordenación Bubble-sort tiene complejidad $\theta(n^2)$, tanto en el peor como el mejor caso, para un vector de tamaño $n$.
- Si suponemos que la matriz cuadrada tiene $n$ filas y columnas entonces el número de elementos de la matriz es $n^2$, y el algoritmo de ordenación sobre $n^2$ elementos tiene complejidad: $\theta(n^4)$

### Ejercicio 2.7
Determinar la complejidad $\theta$ del siguiente algoritmo: se trata de ordenar los elementos de una matriz rectangular, por filas, utilizando una variante del algoritmo de ordenación Bubble-sort (Burbuja).

[figura: matriz 4x6 desordenada -> matriz ordenada por filas]
```
14 16 5  8  6  13       1  2  3  3  4  4
4  5  14 1  3  3   ->   4  5  5  5  5  6
10 4  4  6  5  5        6  6  7  8  9  10
6  9  7  10 12 2        10 12 13 14 14 16
```

Solución:
Este ejercicio es idéntico al anterior, salvo que en este caso es necesario considerar dos parámetros a la hora de definir el tamaño del problema: el número de filas ($n$) y columnas ($m$). De esta manera, la matriz tiene $nm$ elementos, y el algoritmo de ordenación Bubble-sort siempre necesita del orden de $(nm)^2$ operaciones. Por tanto, la medida de complejidad $\theta$ para este algoritmo es: $\theta(m^2n^2)$

### Ejercicio 2.8
Considérese el siguiente algoritmo, que determina si una matriz cuadrada $A$ de tamaño $N\times N$ es simétrica ($A=A^T$):
```
 1 es_traspuesta = TRUE;
 2 columna = 1;
 3 while (columna<=N) AND es_traspuesta
 4     fila = N;
 5     while (fila>columna) AND es_traspuesta
 6         if A(fila,columna)!=A(columna,fila)
 7              es_traspuesta = FALSE;
 8         end
 9         fila = fila-1;
10     end
11     columna = columna+1;
12 end
13 return es_traspuesta;
```
Se pide hallar la complejidad $\Theta$ asumiendo que se realiza una operación por cada línea de código (se valorará el uso de sumatorios en la respuesta).

Solución:
Analizamos la complejidad del algoritmo en el mejor y peor caso:
- Mejor caso: Si los dos primeros elementos comparados de la matriz son diferentes entonces el algoritmo devuelve el valor FALSE en un número constante de pasos, independientemente del tamaño del problema. Por tanto la complejidad en este caso es: $\Theta(1)$
- Peor caso: El peor caso ocurre cuando la matriz es simétrica, y la variable es_traspuesta siempre toma el valor verdadero. Para facilitar los cálculos dividimos el código en los siguientes bloques:
```
es_traspuesta = TRUE;
columna = 1;
while (columna<=N) AND es_traspuesta
  fila = N;
  while (fila>columna) AND es_traspuesta
    if A(fila,columna)!=A(columna,fila)
      es_traspuesta = FALSE;
    end
    fila = fila-1;
  end
  columna = columna+1;
end
return es_traspuesta;
```
Considerando que se realiza una operación por cada línea de código (sin contar los `end`, ni la instrucción en el cuerpo del `if`, ya que no se ejecuta en el peor caso), la fórmula para el tiempo de ejecución suponiendo que la matriz es de tamaño $N$ es:

$T(N)=1+1+\sum_{c=1}^{N}\Big[1+1+\sum_{f=N}^{c+1}(1+1+1)+1+1+1+1\Big]$

Simplificando y resolviendo los sumatorios se obtiene:

$T(N)=4+\sum_{c=1}^{N}\Big[4+\sum_{f=N}^{c+1}3\Big]=4+\sum_{c=1}^{N}\big[4+3(N-c)\big]$

$T(N)=4+4N+3N^2-3\sum_{c=1}^{N}c=4+4N+3N^2-3\frac{N(N+1)}{2}$

$T(N)=\frac{3N^2}{2}+\frac{5N}{2}+4\in\Theta(N^2)$

### Ejercicio 2.9
Determina el coste del siguiente algoritmo de ordenación:
```pascal
 1 FOR i:=1 TO n-1 DO
 2 BEGIN
 3   valMenor := v[i];
 4   posMenor := i;
 5   FOR j:=i+1 TO n DO
 6   BEGIN
 7     IF v[j] < valMenor THEN
 8     BEGIN
 9       valMenor:= v[j];
10       posMenor := j
11     END;
12   END;
13   IF posMenor <> i THEN
14   BEGIN
15     v[posMenor] := v[i];
16     v[i] := valMenor;
17   END;
18 END;
```
Solución:
Se trata del algoritmo de ordenación por selección directa (select-sort). Para analizarlo usaremos la fórmula asociada al coste de un bucle:

$T_{bucle}=1_{inic.}+\sum^{n}(1_{comp.}+T_{cuerpo}+1_{incr.})+1_{última\ comp.}$

Además consideraremos los siguientes bloques de código:
```pascal
FOR i:=1 TO n-1 DO
BEGIN
  valMenor := v[i];
  posMenor := i;
  FOR j:=i+1 TO n DO
  BEGIN
     IF v[j] <valMenor THEN
     BEGIN
       valMenor:= v[j];
       posMenor := j
     END;
  END;
  IF posMenor <>i THEN
  BEGIN
     v[posMenor] := v[i];
     v[i] := valMenor;
  END;
END;
```
Considerando el primer bucle la función del coste se puede expresar como:

$T(n)=1+\sum_{i=1}^{n-1}(1+T_{cuerpo\ FOR\ externo}+1)+1$

donde

$T_{cuerpo\ FOR\ externo}=2+1+\sum_{j=i+1}^{n}(1+T_{cuerpo\ FOR\ interno}+1)+1+1+C_1$

donde $C_1$ es coste del interior del último IF, y: $T_{cuerpo\ FOR\ interno}=1+C_2$ donde $C_2$ es el coste del interior del primer IF.

Se han introducido las constantes $C_1$ y $C_2$ simplemente para diferenciar los costes en el caso mejor y peor. El mejor caso se da cuando el vector está previamente ordenado, en cuyo caso las comparaciones de los IF siempre son falsas, por lo que $C_1=C_2=0$. En cambio, en el peor caso siempre son verdaderas por lo que $C_1=C_2=2$. De esta manera, una constante $C=C_1=C_2$ es suficiente en este ejercicio.

El coste total viene dado por:

$T(n)=1+\sum_{i=1}^{n-1}\Big[1+2+1+\sum_{j=i+1}^{n}(1+1+C+1)+1+1+C+1+1\Big]$

$=2+\sum_{i=1}^{n-1}\Big[7+C+\sum_{j=i+1}^{n}(3+C)\Big]$

Como el segundo sumatorio realiza $(n-i)$ operaciones:

$=2+\sum_{i=1}^{n-1}\big[7+C+(3+C)(n-i)\big]$

El sumatorio que queda realiza $(n-1)$ operaciones:

$=2+(7+C)(n-1)+(3+C)n(n-1)-(3+C)n(n-1)/2$

$=2+(7+C)(n-1)+(3+C)n(n-1)/2$

Simplificando: $=\frac{3+C}{2}n^2+\frac{11+C}{2}n-(C+5)\in\theta(n^2)$

donde $T_{mejor}(n)=\frac32n^2+\frac{11}{2}n-5$ y $T_{peor}(n)=\frac52n^2+\frac{13}{2}n-7$

### Ejercicio 2.10
Analizar la complejidad $\Theta$ del problema de las Torres de Hanoi para $n$ discos. Es decir, hallar la expresión no recursiva del número de movimientos de discos $T_n$, para $n$ discos, y describir su cota ajustada $\Theta$. (Ayuda: ver el enunciado del siguiente ejercicio). El pseudocódigo del algoritmo es:
```
1 hanoi(int n, int destino, int origen, int auxiliar)
2   if (n > 0)
3      hanoi(n-1, auxiliar, origen, destino);
4      << Mover disco n desde origen a destino >>
5      hanoi(n-1, destino, auxiliar, origen);
```
Solución:
La expresión recursiva del algoritmo es la siguiente: $T_n=2T_{n-1}+1$, $T_0=0$

Para resolver la recurrencia y hallar una expresión no recursiva de $T_n$ se puede proceder de dos maneras:

1. Expansión de recurrencias:

$T_n=2T_{n-1}+1$
$=2(2T_{n-2}+1)+1=2^2T_{n-2}+2+1$
$=2(2(2T_{n-3}+1)+1)+1=2^3T_{n-3}+4+2+1$
$=2(2(2(2T_{n-4}+1)+1)+1)+1=2^4T_{n-4}+8+4+2+1$

Se puede ver, por tanto, que la expresión general es: $T_n=2^iT_{n-i}+\sum_{j=0}^{i-1}2^j$

Se llega al caso base cuando el parámetro de la $T$ es cero. Es decir, cuando $n-i=0$. Despejando la $i$, se obtiene $i=n$. Sustituyendo en la expresión obtenemos: $T_n=2^nT_0+\sum_{j=0}^{n-1}2^j$

Viendo que $T(0)=0$ y resolviendo la serie geométrica queda finalmente: $T_n=2^n-1\in\Theta(2^n)$

2. Método general de resolución de recurrencias: La recurrencia se puede expresar como: $T_n-2T_{n-1}=1\cdot n^0\cdot1^n$. La cual es una recurrencia no homogénea, cuya ecuación característica es: $(x-2)(x-1)=0$

Por tanto, la solución final tiene la forma $T_n=c_12^n+c_21^n=c_12^n+c_2$

Teniendo en cuenta dos casos base o condiciones iniciales podemos hallar el valor de las constantes resolviendo el siguiente sistema:
$c_1+c_2=0=T_0$
$2c_1+c_2=1=T_1$

De donde obtenemos $c_1=1$ y $c_2=-1$. Finalmente, concluimos que la solución es: $T_n=2^n-1\in\Theta(2^n)$

NOTA: No es necesario resolver el ejercicio usando los dos métodos. Uno es suficiente. Por otro lado, también se podía haber escogido el caso base $T_1=1$ en el método de expansión de recurrencias.

### Ejercicio 2.11
La siguiente función recursiva calcula el máximo de un vector $v$ de $n$ números reales utilizando el paradigma de divide y vencerás: $f(v)=\begin{cases}v_1 & n=1\\ \max\{f(v_1,\ldots,v_{n/2}),\,f(v_{n/2+1},\ldots,v_n)\} & n>1\end{cases}$

A partir de la expresión recursiva $T$ del número de operaciones que realiza la función $f$ para un determinado tamaño de entrada, se pide obtener la expresión no recursiva de $T$:
- a) Por el método de expansión de recurrencias (indicando además su orden de complejidad)
- b) Por el método general de resolución de recurrencias (pista: usad un cambio de variable)

Solución:
En primer lugar es necesario definir correctamente la función del número de operaciones que realiza el algoritmo para un vector de tamaño $n$: $T(n)=\begin{cases}1 & n=1\\ 1+2T(n/2) & n>1\end{cases}$

a) Expansión de recurrencias:

$T(n)=1+2T(n/2)$
$=1+2[1+2T(n/4)]=1+2+2^2T(n/2^2)$
$=1+2+4[1+2T(n/8)]=1+2+4+2^3T(n/2^3)$
$=1+2+4+8[1+2T(n/16)]=1+2+4+8+2^4T(n/2^4)$
$=\sum_{j=0}^{i-1}2^j+2^iT(n/2^i)=2^i-1+2^iT(n/2^i)$

Se alcanza el caso base cuando $n/2^i=1$. Es decir, cuando $2^i=n$. Sustituyendo: $T(n)=n-1+nT(1)=2n-1\in\theta(n)$

b) Método general de resolución de recurrencias:

Partimos de la expresión recursiva: $T(n)=1+2T(n/2)$

Como no podemos aplicar el método directamente con argumentos de $T$ que sean fracciones de $n$, realizamos un cambio de variable: $n=2^k$

De esta forma tenemos: $T(2^k)=1+2T(2^k/2)=1+2T(2^{k-1})$

que se puede expresar mediante otra función $t$ que dependa de $k$: $t(k)=1+2t(k-1)$ donde $t(k)=T(2^k)$. En este momento podemos aplicar el método general de resolución de recurrencias con $t$. Para ello pasamos todos los términos de $t$ a la izquierda, y expresamos el resto como productos de polinomios por constantes elevadas a $k$: $t(k)-2t(k-1)=1\cdot1^k$

Su polinomio característico es: $(x-2)(x-1)$ por lo que su solución es: $t(k)=C_12^k+C_2$

Como $t(k)=T(2^k)$, los casos base son $t(0)=T(1)=1$, y $t(1)=T(2)=3$. Con esta información podemos formar un sistema de ecuaciones para hallar las constantes $C_1$ y $C_2$:
$t(0)=C_1+C_2=1$
$t(1)=2C_1+C_2=3$

Resolviendo, $C_1=2$ y $C_2=-1$, por lo que $t(k)=T(2^k)=2\cdot2^k-1$. Finalmente, deshaciendo el cambio $2^k=n$ obtenemos: $T(n)=2n-1\in\theta(n)$

que naturalmente tiene la misma expresión que la hallada por el método de expansión de recurrencias.

### Ejercicio 2.12
En este ejercicio se pide analizar la complejidad $\Theta$ del problema de las Torres de Hanoi Cíclicas para $n$ (discos)

[figura: tres torres en los vértices de un triángulo (Torre X arriba con los discos apilados, Torre Z a la izquierda, Torre Y a la derecha), con una flecha circular antihoraria (X -> Z -> Y) en el centro]

Si a la función AntiClock la denominamos $A$, y Clock $C$, entonces tenemos las siguientes definiciones recursivas del número de operaciones (movimientos de discos), para $n$ discos:

(5) $A_n=\begin{cases}0 & n=0\\ 2A_{n-1}+C_{n-1}+2 & n>0\end{cases}$

(6) $C_n=\begin{cases}0 & n=0\\ 2A_{n-1}+1 & n>0\end{cases}$

Se pide demostrar:
$A_n=\frac{1}{4\sqrt3}\Big[(1+\sqrt3)^{n+2}-(1-\sqrt3)^{n+2}\Big]-1$
$C_n=\frac{1}{2\sqrt3}\Big[(1+\sqrt3)^{n+1}-(1-\sqrt3)^{n+1}\Big]-1$

Solución:
En este ejercicio el primer paso consiste en eliminar la recursividad mutua, y expresar las funciones $A_n$ y $C_n$ en términos de sí mismas.

Dado que $C_n=2A_{n-1}+1$, decrementando el índice una unidad obtenemos $C_{n-1}=2A_{n-2}+1$. Sustituyendo en (5) logramos una definición recursiva que sólo depende de $A$, a la que añadimos los dos casos base necesarios:

$A_n=\begin{cases}0 & n=0\\ 2 & n=1\\ 2A_{n-1}+2A_{n-2}+3 & n\ge2\end{cases}$

Se puede observar que $A_1=C_0+2=2$. Además $A_2=7$.

También podemos hallar una expresión recursiva de $C$ solamente en términos de sí misma. Por ejemplo, de (6) obtenemos las igualdades $2A_{n-1}=C_n-1$, y $A_n=(C_{n+1}-1)/2$, que podemos sustituir en (5) para obtener:

$\frac{C_{n+1}-1}{2}=C_n-1+C_{n-1}+2$

$C_{n+1}=2C_n+2C_{n-1}+3$

Finalmente, decrementando el índice y añadiendo los casos base, se obtiene:

$C_n=\begin{cases}0 & n=0\\ 1 & n=1\\ 2C_{n-1}+2C_{n-2}+3 & n\ge2\end{cases}$

Se puede observar que $C_1=A_0+1=1$. Además $C_2=5$.

En primer lugar, desarrollamos la fórmula no recursiva para $A$ resolviendo la recurrencia no homogénea: $A_n-2A_{n-1}-2A_{n-2}=3$

La ecuación característica es: $(x^2-2x-2)(x-1)=0$

Las raíces del primer polinomio son: $x=\frac{2\pm\sqrt{4+8}}{2}=1\pm\sqrt3$

Por tanto, la ecuación característica es: $(x-(1+\sqrt3))(x-(1-\sqrt3))(x-1)=0$ (en el original: $(1+\sqrt3)(1-\sqrt3)(x-1)=0$)

Y la solución tiene la siguiente forma: $A_n=c_1(1+\sqrt3)^n+c_2(1-\sqrt3)^n+c_31^n$

Para hallar los valores de las constantes resolvemos el siguiente sistema de ecuaciones, usando 3 casos base:
$c_1+c_2+c_3=0=A_0$
$c_1(1+\sqrt3)+c_2(1-\sqrt3)+c_3=2=A_1$
$c_1(1+\sqrt3)^2+c_2(1-\sqrt3)^2+c_3=7=A_2$

De la primera ecuación obtenemos (7) $c_3=-c_1-c_2$ que sustituimos en las dos restantes ecuaciones para obtener:
$c_1(1+\sqrt3)+c_2(1-\sqrt3)-c_1-c_2=2$
$c_1(1+\sqrt3)^2+c_2(1-\sqrt3)^2-c_1-c_2=7$

De la primera ecuación se obtiene la expresión: (8) $c_1=\frac{2}{\sqrt3}+c_2$

que sustituyendo en la segunda se puede verificar que el valor de la constante $c_2$ es:
$c_2=\frac{\sqrt3-2}{2\sqrt3}=-\frac{2-\sqrt3}{2\sqrt3}=-\frac{4-2\sqrt3}{4\sqrt3}=-\frac{(1-\sqrt3)^2}{4\sqrt3}$

Sustituyendo el valor de $c_2$ en (8) se obtiene:
$c_1=\frac{2}{\sqrt3}+\frac{\sqrt3-2}{2\sqrt3}=\frac{2+\sqrt3}{2\sqrt3}=\frac{4+2\sqrt3}{4\sqrt3}=\frac{(1+\sqrt3)^2}{4\sqrt3}$

Finalmente, sustituyendo $c_1$ y $c_2$ en (7) se obtiene $c_3=-1$, con lo cual la definición de $A$ resulta ser:

(9) $A_n=\frac{1}{4\sqrt3}\Big[(1+\sqrt3)^{n+2}-(1-\sqrt3)^{n+2}\Big]-1\in\Theta\big((1+\sqrt3)^n\big)$

tal y como se había pedido.

La expresión no recursiva de $C_n$ se puede hallar de forma análoga, resolviendo un sistema de ecuaciones lineales. Sin embargo, dado que ya se ha calculado una expresión no recursiva para $A_n$, podemos combinar (6) y (9) para hallar $C_n$:

$C_n=2A_{n-1}+1=2\left(\frac{1}{4\sqrt3}\Big[(1+\sqrt3)^{n+1}-(1-\sqrt3)^{n+1}\Big]-1\right)+1$

$C_n=\frac{1}{2\sqrt3}\Big[(1+\sqrt3)^{n+1}-(1-\sqrt3)^{n+1}\Big]-1\in\Theta\big((1+\sqrt3)^n\big)$

### Ejercicio 2.13
Considérese un algoritmo que procesa una serie de números en base 2 distintos del 0. Para cada número empieza a procesar cada bit (realiza una operación por bit), empezando por el bit menos significativo, hasta el bit más significativo, pero para en el momento que encuentra el primer 1. La siguiente figura ilustra las operaciones (sombreadas) que haría con todos los números de 4 bits distintos de 0, es decir, procesa desde el 1 hasta el 15.

| Número | bit 3 | bit 2 | bit 1 | bit 0 | bits procesados |
|---|---|---|---|---|---|
| 0001 | 0 | 0 | 0 | ==1== | 1 |
| 0010 | 0 | 0 | ==1== | ==0== | 2 |
| 0011 | 0 | 0 | 1 | ==1== | 1 |
| 0100 | 0 | ==1== | ==0== | ==0== | 3 |
| 0101 | 0 | 1 | 0 | ==1== | 1 |
| 0110 | 0 | 1 | ==1== | ==0== | 2 |
| 0111 | 0 | 1 | 1 | ==1== | 1 |
| 1000 | ==1== | ==0== | ==0== | ==0== | 4 |
| 1001 | 1 | 0 | 0 | ==1== | 1 |
| 1010 | 1 | 0 | ==1== | ==0== | 2 |
| 1011 | 1 | 0 | 1 | ==1== | 1 |
| 1100 | 1 | ==1== | ==0== | ==0== | 3 |
| 1101 | 1 | 1 | 0 | ==1== | 1 |
| 1110 | 1 | 1 | ==1== | ==0== | 2 |
| 1111 | 1 | 1 | 1 | ==1== | 1 |

Bits sombreados: los que procesa el algoritmo, leyendo cada número de derecha a izquierda hasta el primer 1 inclusive.

Si se procesan todos los números el algoritmo habrá realizado 26 operaciones (que es el número de bits sombreados).

Se pide hallar la complejidad $\theta$ para este algoritmo si procesa todos los números:
- a) Contando operaciones
- b) Resolviendo la recurrencia no homogénea mediante la técnica de expansión de recurrencias
- c) Resolviendo la recurrencia no homogénea mediante el método de resolución de relaciones en recurrencias

Solución:

a) Analizando las operaciones que se realizan por cada columna, empezando desde el bit más significativo al menos, podemos ver que la secuencia es 1,3,7,15... Es decir, para $n$ bits el número de operaciones que se realizan se puede expresar como: $T_n=\sum_{i=1}^{n}(2^i-1)=\sum_{i=1}^{n}2^i-n$

Por tanto, resolviendo la serie geométrica: $T_n=2^{n+1}-2-n\in\theta(2^n)$

b) En primer lugar, es necesario obtener una fórmula recursiva del número de operaciones que se realizan. Podemos descomponer el número de operaciones de la siguiente manera:

[figura: tabla de los 16 números de 4 bits (0000 a 1111) dividida en tres bloques: las 8 primeras filas (0000-0111) etiquetadas $T_{n-1}$; la fila central 1000 (la palabra $2^{n-1}$) etiquetada $n$; las 7 últimas filas (1001-1111) etiquetadas $T_{n-1}$]

Para $n$ bits contamos $n$ operaciones (correspondientes a la palabra central $2^{n-1}$), además de resolver dos veces el mismo problema para $n-1$ bits, la fórmula recursiva es:

(10) $T_n=2T_{n-1}+n$, $T_0=0$

Una vez hallada la fórmula recursiva procedemos a realizar la expansión de recurrencias:
$T_n=2T_{n-1}+n$
$=2(2T_{n-2}+n-1)+n=2^2T_{n-2}+2(n-1)+n$
$=2(2(2T_{n-3}+n-2)+n-1)+n=2^3T_{n-3}+2^2(n-2)+2(n-1)+n$
$=2(2(2(2T_{n-4}+n-3)+n-2)+n-1)+n=2^4T_{n-4}+2^3(n-3)+2^2(n-2)+2(n-1)+n$

Se puede ver, por tanto, que la expresión general es:
$T_n=2^iT_{n-i}+\sum_{j=0}^{i-1}2^j(n-j)=2^iT_{n-i}+\sum_{j=0}^{i-1}n2^j-\sum_{j=0}^{i-1}j2^j$

El caso base se alcanza en $T_0=0$. Es decir, cuando $i=n$. Realizando las correspondientes sustituciones obtenemos:

(11) $T_n=\sum_{j=0}^{n-1}n2^j-\sum_{j=0}^{n-1}j2^j=n(2^n-1)-\sum_{j=0}^{n-1}j2^j$

La dificultad en este ejercicio radica en hallar una expresión para el sumatorio de la fórmula anterior:

(12) $\sum_{j=0}^{n-1}j2^j=1\cdot2^1+2\cdot2^2+3\cdot2^3+\cdots+(n-1)\cdot2^{n-1}$

Para hallarla partimos de una serie geométrica general: $S=1+x+x^2+\cdots+x^{m-1}=\frac{x^m-1}{x-1}$

derivando $S$ con respecto a $x$ obtenemos la siguiente igualdad:

$1+2x+3x^2+\cdots+(m-1)x^{m-2}=\frac{mx^{m-1}(x-1)-(x^m-1)}{(x-1)^2}=\frac{mx^m-mx^{m-1}-x^m+1}{(x-1)^2}$

Multiplicando por $x$ a ambos lados obtenemos:

(13) $x^1+2x^2+3x^3+\cdots+(m-1)x^{m-1}=\frac{mx^{m+1}-mx^m-x^{m+1}+x}{(x-1)^2}$

Por tanto, podemos ver que el sumatorio que queremos calcular en (12) es idéntico al descrito en (13) realizando los (cambios $x=2$, $m=n$):

$\sum_{j=0}^{n-1}j2^j=\frac{n2^{n+1}-n2^n-2^{n+1}+2}{(2-1)^2}=n2^{n+1}-n2^n-2^{n+1}+2$

Finalmente, sustituyendo en (11) obtenemos la expresión final de $T_n$:

$T_n=n2^n-n-n2^{n+1}+n2^n+2^{n+1}-2=2^{n+1}-n-2\in\theta(2^n)$

c) La ecuación característica de asociada a (10) es: $(x-2)(x-1)^2=0$

Por tanto, la solución tiene la siguiente forma: (14) $T_n=c_12^n+c_21^n+c_3n1^n$

Para hallar el valor de las constantes debemos resolver el siguiente sistema de ecuaciones (teniendo en cuenta que $T_0=0$, $T_1=1$, y $T_2=4$):
$c_1+c_2=0=T_0$
$2c_1+c_2+c_3=1=T_1$
$4c_1+c_2+2c_3=4=T_2$

Resolviendo el sistema se obtiene $c_1=2$, $c_2=-2$, y $c_3=-1$. Por tanto, sustituyendo en (14), la expresión final del número de operaciones en función del número de bits $n$ es: $T_n=2^{n+1}-2-n\in\theta(2^n)$

NOTA: El algoritmo tiene un coste exponencial dado el número de bits de las palabras. También podríamos haber calculado la complejidad en función del número total de palabras procesadas ($m$). En ese caso, dado que $m=2^n-1$, bastaría con realizar la sustitución ($n=\log_2(m+1)$) en la fórmula del número de operaciones $T_n=2^{n+1}-2-n$:

$T'(m)=2\cdot2^{\log_2(m+1)}-\log_2(m+1)-2=2m-\log_2(m+1)\in\theta(m)$

### Ejercicio 2.14
Demostrar que $\log(n!)\in\Omega(n\log n)$, de dos formas diferentes:
- a) Usando la aproximación de Stirling: $n!\sim\sqrt{2\pi n}\left(\frac ne\right)^n$ para valores muy grandes de $n$.
- b) Utilizando la definición de $\Omega$. Ayuda: usad la aproximación por integrales

Solución:

a) Podemos demostrar que $n\log n$ es cota inferior de $\log(n!)$ si se verifica: $\lim_{n\to\infty}\frac{\log(n!)}{n\log n}>0$

Procedemos a calcular el límite: $\lim_{n\to\infty}\frac{\log(n!)}{n\log n}=\frac\infty\infty$

Aplicamos la aproximación de Stirling (ya que estamos calculando el límite cuando $n$ toma valores muy grandes):

$\lim_{n\to\infty}\frac{\log\left(\sqrt{2\pi n}\left(\frac ne\right)^n\right)}{n\log n}=\lim_{n\to\infty}\frac{\log\sqrt{2\pi}+\log\sqrt n+\log\left(\frac ne\right)^n}{n\log n}=$
$\lim_{n\to\infty}\frac{\log\sqrt{2\pi}+\frac12\log n+n\log\frac ne}{n\log n}=$
$\lim_{n\to\infty}\frac{\log\sqrt{2\pi}+\frac12\log n+n\log n-n\log e}{n\log n}=0+0+1+0=1>0$

En efecto, como el límite es una constante, no solo $\log(n!)\in\Omega(n\log n)$, sino que además $\log(n!)\in\Theta(n\log n)$.

b) Utilizando la definición de $\Omega$ tenemos que demostrar que existe una constante $c>0$ y un $n_0>0$ tal que $\log(n!)\ge cn\log n$ para todo $n\ge n_0$. Comenzamos transformando la parte izquierda en un sumatorio: $\log(n!)=\sum_{i=1}^{n}\log i=\sum_{i=2}^{n}\log i$

El logaritmo es una función monótona creciente, por lo que se puede acotar utilizando la aproximación por integrales. En este caso nos interesa encontrar una cota inferior: $\sum_{i=2}^{n}\log i\ge\int_1^n\log x\,dx$

Resolviendo la integral por partes: $\int_1^n\log x\,dx=\big[x\log x-x\big]_1^n=n\log n-n-0+1$

Por tanto, combinando estos resultados: $\log(n!)=\sum_{i=2}^{n}\log i\ge\int_1^n\log x\,dx=n\log n-n+1\ge cn\log n$

Lo cual implica que si podemos demostrar que $n\log n$ es cota inferior de $n\log n-n+1$, entonces necesariamente será cota inferior de $\log(n!)$. De esta manera, solo queda encontrar las constantes $c$ y $n_0$ para: $n\log n-n+1\ge cn\log n$

Escojamos $c=1/2$:
$n\log n-n+1\ge\frac12n\log n\Rightarrow\frac12n\log n-n+1\ge0\Rightarrow n\left(\frac12\log n-1\right)+1\ge0$

Lo cual es cierto para: $\frac12\log n-1\ge0\Rightarrow\log n\ge2$

Finalmente, para cualquier base del logaritmo $b$, la desigualdad se cumple para todo $n\ge b^2$, y podemos escoger un valor de $n_0=b^2$ finito y positivo, terminando la demostración.

### Ejercicio 2.15
Indicar el orden de la siguiente recurrencia, a partir de su expresión no recursiva en la que no es necesario calcular constantes: $T(n)=T(n-1)+3n-3+n^3\cdot3^n$

Solución:
En primer lugar pasamos todos los términos con $T$ al lado izquierdo, y expresamos cada término del derecho como un producto de un polinomio por una constante elevada a $n$:

$T(n)-T(n-1)=(3n-3)\cdot1^n+n^3\cdot3^n$

El siguiente paso consiste en hallar el polinomio característico. De la parte izquierda obtenemos el factor $(x-1)$. De la parte derecha obtenemos los factores $(x-1)^2$ y $(x-3)^4$. Combinando los factores el polinomio característico final es: $(x-1)^3(x-3)^4$

Por tanto la solución es:

$T(n)=C_11^n+C_2n1^n+C_3n^21^n+C_43^n+C_5n3^n+C_6n^23^n+C_7n^33^n$

$T(n)\in\theta(n^33^n)$
