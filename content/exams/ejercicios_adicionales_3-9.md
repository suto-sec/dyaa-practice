## 3. Ejercicios básicos de recursividad

### Ejercicio 3.1
¿Qué calcula la siguiente función?
$f(n)=\begin{cases}1 & n=0\\ f(n-1)\times n & n>0\end{cases}$

### Ejercicio 3.2
Considera una secuencia definida por la siguiente definición recursiva: $s_n = s_{n-1} + 3$. Calcula sus cuatro primeros términos teniendo en cuenta que: (a) $s_0=0$, y (b) $s_0=4$. Indica una definición no recursiva de $s_n$ en ambos casos.

### Ejercicio 3.3
Considera una secuencia definida por la siguiente definición recursiva: $s_n = s_{n-1} + s_{n-2}$. Si tuviéramos los dos valores iniciales $s_1$ y $s_2$ tendríamos la información suficiente como para construir la secuencia entera. Demuestra que también se puede construir la secuencia dados dos valores cualquiera $s_i$ y $s_j$, donde $i<j$. Finalmente, encuentra los elementos de la secuencia entre $s_1=1$ y $s_5=17$.

### Ejercicio 3.4
El conjunto "descendientes de una persona" se puede definir recursivamente como los hijos de la persona, junto con los descendientes de esos hijos. Indica una definición matemática de ese concepto empleando notación de conjuntos. En concreto, define una función $D(p)$, donde $D$ denota descendientes, y el parámetro $p$ se refiere a una persona concreta. Además, considera que se puede usar una función $H(p)$, que retornaría el conjunto de hijos de $p$.

### Ejercicio 3.5
Sea $F(n)=F(n-1)+F(n-2)$ una función recursiva, donde $n$ es un entero positivo, y donde $F(1)$ y $F(2)$ son valores iniciales arbitrarios. Demuestra que $F(n)=F(2)+\sum_{i=1}^{n-2}F(i)$, para $n\ge 2$.

### Ejercicio 3.6
Implementa en Python la función factorial: $n!=(n-1)!\times n$ si $n>0$, donde $0!=1$.

### Ejercicio 3.7
Al considerar tipos abstractos de datos, una lista puede ser vacía, o puede consistir en un solo elemento (la "cabeza" de la lista, es decir, su primer elemento), junto con otra lista (la "cola"), que podría estar vacía. Sea `a` una lista en Python. Hay varias formas de comprobar si está vacía. Por ejemplo, la condición `a==[]` devuelve `True` si la lista está vacía, y `False` en caso contrario. Además, la cabeza de la lista es simplemente `a[0]`, mientras que la cola se puede especificar mediante `a[1:]`. Escribe una versión alternativa de la siguiente función:
```python
def sum_list_length_2(a):
    if len(a) == 0:
        return 0
    else:
        return a[0] + sum_list_length_2(a[1:len(a)])
```
usando los elementos mencionados, pero que no use la longitud de la lista (`len`).

### Ejercicio 3.8
Implementa tres funciones que calculen la suma de los elementos de una lista usando las tres descomposiciones indicadas en la siguiente figura:
```
Lista a (n=9), índices 0..8:  5 1 12 4 2 5 6 3 7
(a) Problema original: s(a) = a[0] + a[1] + ... + a[n-1]
(b) Primera descomposición: s(a) = s(a[0:n-1]) + a[n-1]
    sublista a[0:n-1] = 5 1 12 4 2 5 6 3 (índices 0..7), elemento aislado a[8]=7
(c) Segunda descomposición: s(a) = a[0] + s(a[1:n])
    elemento aislado a[0]=5, sublista a[1:n] = 1 12 4 2 5 6 3 7 (índices 1..8)
(d) Tercera descomposición: s(a) = s(a[0:n//2]) + s(a[n//2:n])
    a[0:n//2] = 5 1 12 4 (índices 0..3), a[n//2:n] = 2 5 6 3 7 (índices 4..8)
```
Las funciones recibirán dos parámetros de entrada: una lista, y su tamaño (es decir, su longitud). Además, indica ejemplos de llamadas a estas funciones, e imprime sus resultados.

### Ejercicio 3.9
Demuestra por inducción matemática la siguiente identidad asociada a series geométricas, donde $n$ es un entero positivo, y $x\neq 1$ es un número real:
$\sum_{i=0}^{n-1}x^i=\frac{x^n-1}{x-1}.$

### Ejercicio 3.10
Codifica las siguientes funciones que calculan números de Fibonacci $F(n)$ descritas en el Ejercicio 1.10. Además codifica las siguientes funciones, que también sirven para hallar números de Fibonacci:
$A(n)=\begin{cases}0 & n=1\\ A(n-1)+B(n-1) & n>1\end{cases}$
$B(n)=\begin{cases}1 & n=1\\ A(n-1) & n>1\end{cases}$
Como algunas de estas funciones requieren parámetros adicionales, además de $n$, o no calculan un número de Fibonacci directamente, implementa funciones auxiliares ("wrapper") adicionales que solo reciban el parámetro $n$, y llamen a las funciones implementadas para calcular los números de Fibonacci. Por último, comprueba que producen las salidas correctas para $n=1,\ldots,10$.

### Ejercicio 3.11
Sea $n$ un entero positivo. Considera el problema de determinar el número de bits puestos a 1 en la representación binaria de $n$ (es decir, $n$ expresado en base 2). Por ejemplo, para $n=25_{10}=11001_2$ (el subíndice indica la base en la que se expresa el número), el resultado es 3 bits. Indica el tamaño del problema (con palabras) y una expresión matemática para definirlo.

### Ejercicio 3.12
Considera la función que suma los primeros $n$ enteros positivos en:
$S(n)=\begin{cases}1 & n=1\\ S(n-1)+n & n>1\end{cases}$
Define una función más general que pueda aplicarse también a números no negativos. En otras palabras, modifica la función para considerar que $n$ puede ser 0. Por último, codifica la función.

### Ejercicio 3.13
Usa diagramas similares a los siguientes:
[figura: dos pares de diagramas de escalera de cuadrados unidad (triángulo de $n$ filas, la fila $i$ tiene $i$ cuadrados, altura $n$). Par 1: (a) "Problema original: S(n)", escalera completa de altura $n$; (b) $S(n)=2S(\frac n2)+(\frac n2)^2$: la escalera se divide en dos escaleras de altura $n/2$ (una abajo-izquierda, otra arriba-derecha, sombreadas) y un cuadrado de lado $n/2$ (abajo-derecha, sin sombrear). Par 2: (a) "Problema original: S(n)", escalera de altura $n$; (b) $S(n)=2S(\frac{n-1}{2})+(\frac{n+1}{2})^2$: dos escaleras de altura $\frac{n-1}{2}$ (sombreadas, la de abajo-izquierda y la de arriba-derecha) y un cuadrado de lado $\frac{n+1}{2}$ (parte baja derecha, rodeado por llaves de $\frac{n+1}{2}$ abajo y $\frac{n-1}{2}$ arriba).]
para derivar definiciones recursivas de la suma de los primeros $n$ enteros positivos ($S(n)$), donde el caso recursivo sume los resultados de cuatro subproblemas de aproximadamente la mitad del tamaño del problema original. Finalmente, define y codifica la función recursiva completa (caso base y casos cuando $n$ es par e impar).

### Ejercicio 3.14
Considera el problema de imprimir los dígitos de un número entero no negativo $n$ en una consola, uno a uno, en vertical, y en orden "normal", donde el dígito más significativo aparezca en la primera línea, el segundo más significativo en la segunda línea, etc. Por ejemplo, si $n=2743$ el programa debe imprimir las siguientes líneas en la consola:
```
2¶
7¶
4¶
3¶
```
Indica el tamaño del problema y su caso base. Dibuja un diagrama para un entero no negativo general $n=d_{m-1}\cdots d_1 d_0$, donde $m$ es el número de dígitos de $n$, para poder ilustrar la descomposición del problema, y como recuperar la solución al problema original dada la solución de un subproblema. Por último, deriva el caso recursivo e implementa el método.

### Ejercicio 3.15
Define un diagrama general que use un esquema de divide y vencerás para calcular el máximo de una lista `a` de $n$ elementos. Usa notación general en lugar de ejemplos concretos.

### Ejercicio 3.16
Define una función recursiva que calcule el máximo de una lista `a` de $n$ elementos, en la que la descomposición simplemente reduzca el tamaño del problema en una unidad.

## 4. Ejercicios de recursividad lineal

### Ejercicio 4.1
El siguiente código es una función booleana que determina si un número entero no negativo `n` es par:
```python
def es_par(n):
    if n == 0:
        return True
    elif n == 1:
        return False
    else:
        return es_par(n - 2)
```
La descomposición empleada reduce el tamaño ($n$) en dos unidades. Define y codifica una versión alternativa donde la descomposición reduzca el tamaño del problema en una sola unidad.

### Ejercicio 4.2
Implementa una función recursiva que calcule la potencia $b^n$ en tiempo logarítmico, para una base real $b$, y un entero $n$, el cual puede ser negativo.

### Ejercicio 4.3
Implementa una función recursiva que calcule la $n$-ésima potencia de una matriz cuadrada, que será otra matriz cuadrada de las mismas dimensiones. Usa el paquete de Python NumPy y los métodos:
- `identity`: devuelve la matriz identidad.
- `shape`: indica las dimensiones de una matriz.
- `dot`: multiplica matrices.

Por último, calcula las matrices:
$\begin{pmatrix}1&1\\1&0\end{pmatrix}^n$
para $n=1,\ldots,10$, e imprime el elemento de la primera fila y segunda columna. ¿Reconoces estos números?

### Ejercicio 4.4
En Python y otros lenguajes de programación las funciones pueden ser también parámetros de otras funciones. Define e implementa una función general recursiva que calcule el siguiente sumatorio:
$g(m,n,f)=\sum_{i=m}^{n}f(i)=f(m)+f(m+1)+\cdots+f(n-1)+f(n),$
donde $m$ y $n$ son enteros, y $f$ es una función. Úsala para calcular e imprimir:
$\sum_{i=1}^{n}i^3,$
para $n=0,\ldots,4$.

### Ejercicio 4.5
Implementa funciones recursivas para calcular un "producto lento" entre dos números enteros no negativos $m$ y $n$. Los algoritmos pueden sumar y restar números, pero no los pueden multiplicar (no puede usar el operador `*`). Usa descomposiciones que reduzcan uno o ambos parámetros de entrada en una unidad. Además, crea diagramas en los que se aprecie el proceso de diseño recursivo (descomposición y generación de la regla recursiva). Pueden ser diagramas donde el producto de $m$ y $n$ sea el área de un rectángulo de base $m$ y altura $n$ (el rectángulo tendrá $mn$ bloques cuadrados de área 1 (cuadrados de $1\times 1$), como se ilustra en la siguiente figura:
[figura: rectángulo de cuadrículas unidad, base $m$ (horizontal), altura $n$ (vertical)]

### Ejercicio 4.6
Implementa una versión recursiva más eficiente del "producto lento" empleando una descomposición que divida a ambos parámetros de entrada por dos. Emplea diagramas rectangulares como el del ejercicio 4.5 para hallar los casos recursivos.

### Ejercicio 4.7
Define e implementa una función recursiva que calcule el número de dígitos de un número entero $n$ no negativo.

### Ejercicio 4.8
Define e implementa una función recursiva que, dado un número decimal $n$, cuyos dígitos son ceros o unos, retorne el número cuya representación en binario fuera precisamente la secuencia de unos y ceros de $n$. Por ejemplo, si $n=10110_{10}$, la función devolverá 22, ya que $10110_2=22$.

### Ejercicio 4.9
Implementa un algoritmo que realice el cambio de base de decimal a una base $b$ ($2\le b\le 9$). Usa un diagrama general que ilustre el proceso mental de diseño de algoritmos recursivos.

### Ejercicio 4.10
Considérese el problema del ejercicio 1.9. Define e implementa un algoritmo que, dado un número $x$ de $n$ bits, determine la posición de su bit menos significativo puesto a 1. Considera además que la posición del bit menos significativo es la 1. Por ejemplo, para $x=01110100$ el bit menos significativo (más a la derecha) puesto a 1 está en la posición 3.

### Ejercicio 4.11
Escribe un método recursivo que emplee la función desarrollada en el ejercicio 4.10 para resolver el ejercicio 1.9 de manera computacional. Imprime las soluciones para números expresados en $n=1,\ldots,5$ bits.

### Ejercicio 4.12
Implementa una función recursiva que retorne el número de vocales en una cadena de caracteres.

### Ejercicio 4.13
Considera el siguiente código para generar la $n$-ésima fila del triángulo de Pascal:
```python
def pascal(n):
    if n == 0:
        return [1]
    else:
        fila = [1]

        fila_previa = pascal(n - 1)

        for i in range(len(fila_previa) - 1):
            row.append(fila_previa[i] + fila_previa[i + 1])

        fila.append(1)
        return fila
```
Reemplaza el bucle por una función recursiva. Deberá recibir una fila del triángulo de Pascal mediante una lista, y devolverá la lista con las sumas de sus elementos consecutivos. Por ejemplo, para la entrada `[1, 3, 3, 1]` el resultado deberá ser `[4, 6, 4]`.

### Ejercicio 4.14
Considera un número entero no negativo $n$ cuyos dígitos siempre aparecen en orden ascendente de izquierda a derecha, como el 24667. En otras palabras, si $d_{m-1}\cdots d_1 d_0$ representa la secuencia de ($m$) dígitos de $n$, entonces $d_i\le d_j$ para $i<j$. Dado un dígito adicional $0\le x\le 9$, implementa una función que devuelva el entero que resulta de insertar $x$ en $n$, de manera que los dígitos sigan apareciendo ordenados de izquierda a derecha. Por ejemplo, si $n=24667$ y $x=5$, la función deberá devolver 245667. Evita incluir casos base redundantes.

### Ejercicio 4.15
Este ejercicio es similar al 4.14. Dada una lista ordenada de números en orden ascendente, y un número $x$ cualquiera, implementa una función que inserte $x$ en la lista de manera que ésta siga estando ordenada.

### Ejercicio 4.16
Un coeficiente binomial $\binom{n}{m}$ es una función de dos parámetros enteros $n$ y $m$, con $n\ge m\ge 0$. Define tres funciones recursivas lineales para calcular coeficientes binomiales basadas en descomposiciones que: (i) decrementen $n$ en una unidad, (ii) decrementen $m$ en una unidad, y (iii) decrementen tanto $n$ como $m$ en una unidad. Usa las siguientes definiciones para desarrollar los casos recursivos:
$\binom{n}{m}=\begin{cases}1 & m=0 \text{ o } n=m\\ \frac{n!}{m!(n-m)!} & \text{en otro caso,}\end{cases}$
$\binom{n}{m}=\begin{cases}1 & m=0 \text{ o } n=m\\ \binom{n-1}{m-1}+\binom{n-1}{m} & \text{en otro caso.}\end{cases}$

### Ejercicio 4.17
El algoritmo "insertion sort" ordena una lista aplicando repetidamente el procedimiento que se ilustra en la siguiente figura:
```
Lista (índices 0..12), "ordenado" = índices 0..4, "desordenado" = 5..12; el elemento de índice 5 (4) se inserta:
1 3 5 5 6 | 4 2 8 1 9 3 7 8
                         paso 5
Resultado: "ordenado" = índices 0..5, "desordenado" = 6..12:
1 3 4 5 5 6 | 2 8 1 9 3 7 8
```
En la etapa $i$-ésima los elementos desde el índice 0 hasta el $i-1$ estarán ordenados correctamente, mientras el resto de la lista no estará (necesariamente) ordenada. Para proceder, el método inserta el elemento correspondiente al índice $i$ en la sublista ordenada, de manera que la sublista desde el índice 0 al $i$ quede ordenada. Si esta operación se realiza desde el índice (paso) 1 (o 0) hasta el $n-1$, la lista quedará ordenada al final del proceso. Implementa una variante recursiva del método para ordenar una lista, que use la función desarrollada en el ejercicio 4.15.

## 5. Ejercicios de recursividad por cola

### Ejercicio 5.1
Define e implementa funciones booleanas, basadas en recursividad lineal y recursividad por cola, que determinen si un número entero no negativo contiene un dígito impar.

### Ejercicio 5.2
Es más agradable mostrar polinomios en un estilo formateado que mediante una lista de coeficientes. Escribe un método que reciba una lista de longitud $n$ que represente un polinomio de grado $n-1$, y lo imprima de manera formateada. Por ejemplo, dada la lista de entrada `p = [3, -5, 0, 1]`, asociada al polinomio $x^3-5x^1+3$ (es decir, $p_i$ es el coeficiente asociado al término $x^i$), el método deberá imprimir una línea similar a: `+ 1x^3 - 5x^1 + 3`. Asume que $p_{n-1}\neq 0$, salvo si el polinomio es la constante 0. Finalmente, indica su coste computacional en tiempo.

### Ejercicio 5.3
El algoritmo "counting sort" es un método para ordenar una lista `a` de $n$ enteros pertenecientes al intervalo $[0,k]$, donde $k$ suele ser pequeño. Su coste en tiempo es $O(n+k)$, lo cual implica que corre en tiempo $O(n)$ si $k\in O(n)$.
Dada una lista `a`, el método crea una lista `b` que contiene el número de apariciones de cada entero en `a`, como se muestra en el paso 1 de la siguiente figura:
```
a: 2 2 3 2 0 1 3 2 0 0 4
        paso 1
b: 3 1 4 2 1        (índices 0 1 2 3 4)
        paso 2
c: 0 0 0 1 2 2 2 2 3 3 4
```
Por ejemplo, $b_2=4$, ya que el entero 2 aparece cuatro veces en `a`. Implementa un procedimiento recursivo por cola que reciba las listas `a` and `b` (ésta inicializada con ceros), y rellene `b` con las apariciones de los enteros en `a`. Además, implementa una función recursiva lineal que reciba la lista de apariciones `b`, y devuelva una nueva lista (`c`) que sea la versión ordenada (de menor a mayor) de `a`, como se mostraba en el paso 2 de la figura anterior. Finalmente, implementa una función que llame a las dos anteriores para codificar esta versión recursiva del algoritmo counting sort, y especifica su coste computacional en espacio y en tiempo.

### Ejercicio 5.4
Implementa una función que busque al elemento con la clave más pequeña en un árbol de búsqueda binario $T$, el cual se define como una lista de cuatro componentes: clave, elemento, subárbol izquierdo y subárbol derecho.

### Ejercicio 5.5
Implementa una versión alternativa del siguiente código asociado a una búsqueda binaria:
```python
def busqueda_binaria(a, x, inf, sup):
    if inf > sup: # lista vacia
        return -1
    else:
        mitad = (inf + sup) // 2

        if x == a[mitad]:
            return mitad
        elif x < a[mitad]:
            return busqueda_binaria(a, x, inf, mitad - 1)
        else:
            return busqueda_binaria(a, x, mitad + 1, sup)

def busqueda_binaria_wrapper(a, x):
    return busqueda_binaria(a, x, 0, len(a) - 1)
```
que no use el parámetro `sup`. Especifica también su coste computacional en tiempo.

### Ejercicio 5.6
Implementa una función booleana que realice una búsqueda binaria de un elemento `x` en una lista ordenada `a`. La función retornará `True` si `x` está presente en `a`. La función solo debe tener dos parámetros de entrada: `x` y `a`. Además, descompondrá el problema en otro de la mitad de su tamaño. Especifica también el coste computacional en tiempo de la función.

### Ejercicio 5.7
Sea `a` una lista ordenada en orden creciente de enteros diferentes. Se pide desarrollar un algoritmo eficiente para buscar un elemento en una lista `a` que tenga el mismo valor que el índice en el que se encuentra. Es decir, queremos encontrar un elemento $i$ para el que $a_i=i$. Por ejemplo, si `a = [-3, -1, 2, 5, 6, 7, 9]`, entonces la función devolverá un 2, ya que $a_2=2$. Observa que el primer elemento se localiza en la posición 0 de la lista. Por simplicidad, asume que tendrá como mucho un elemento que satisfaga la propiedad $a_i=i$. Si la lista no contiene un elemento que la satisfaga la función deberá retornar un $-1$. Finalmente, especifica el coste computacional en tiempo de la función.

### Ejercicio 5.8
Sea `a` una lista de $n$ enteros, organizados de manera que los pares aparezcan antes que los impares (es decir, el índice asociado a cualquier elemento par será menor que el índice de un elemento impar). Por ejemplo: la lista `a = [2, -4, 10, 8, 0, 12, 9, 3, -15, 3, 1]` cumple esa condición. Se pide desarrollar un algoritmo recursivo eficiente para calcular el mayor índice asociado a elementos pares. En otras palabras, se busca el índice $i$ para el que $a_i$ es par, pero donde $a_j$ será impar para todo $j>i$. En el ejemplo el método retornaría 5, ya que $a_5=12$ es par, pero $a_6$, $a_7$, $a_8$, etc., son impares. Si `a` no contuviera números pares la función deberá retornar $-1$. Por otro lado, si la lista solo contiene números pares deberá devolver $n-1$. Finalmente, especifica el coste computacional en tiempo de la función.

### Ejercicio 5.9
El método de Newton-Raphson es una estrategia para encontrar una aproximación a la raíz de una función real $f(x)$ que sea derivable, es decir, un valor $\hat z$ donde $f(\hat z)$ sea cero o tome un valor muy pequeño. Está basada en la siguiente regla recursiva:
$x_n=x_{n-1}-\frac{f(x_{n-1})}{f'(x_{n-1})},$
explicada geométricamente en la siguiente figura:
[figura: curva $f(x)$ con raíz $r$ en el eje x; punto $(x_{n-1}, f(x_{n-1}))$ sobre la curva a un lado de $r$; recta tangente en ese punto que corta al eje x en $x_n$, más cerca de $r$ que $x_{n-1}$]
Considera una aproximación inicial $x_{n-1}$ de la raíz $r$ de la función $f(x)$. El procedimiento encuentra la recta tangente a $f(x)$ en $x_{n-1}$, y calcula una nueva aproximación ($x_n$) de $r$ que es el valor de $x$ en el que la recta corta al eje de abscisas (observa que $x_n$ se encuentra más cerca de $r$ que $x_{n-1}$). Por tanto, dado un valor inicial $x_0$, $\hat z=x_n$ será la aproximación de la raíz de $f(x)$ tras aplicar la regla recursiva $n$ veces.
Este procedimiento se puede usar, por ejemplo, para hallar aproximaciones muy precisas de la raíz cuadrada de un número, en solo unos pocos pasos. Supóngase que se desea calcular $\sqrt a$, que será algún valor $x$ a priori desconocido. En ese caso tenemos las identidades: $x=\sqrt a$, donde $x^2=a$, lo cual implica que $x^2-a=0$. Por tanto, la raíz de la parábola $x^2-a$ será la raíz cuadrada de $a$. En ese caso, la fórmula recursiva asociada al método es:
$x_n=x_{n-1}-\frac{x_{n-1}^2-a}{2x_{n-1}}.$
Implementa una función recursiva lineal y otra recursiva por cola que reciban el valor de $a$, una estimación inicial de su raíz cuadrada $x_0$ y un cierto número de pasos $n$, y retorne la estimación $\hat z=x_n$ de $\sqrt a$ aplicando la regla recursiva anterior $n$ veces. Finalmente, especifica su coste computacional en tiempo.

## 6. Ejercicios de divide y vencerás

### Ejercicio 6.1
Implementa una función booleana basada en divide y vencerás que determine si una lista `a` contiene un elemento concreto `x`.

### Ejercicio 6.2
Sea `a` una lista de $n$ enteros no negativos. Escribe una función basada en divide y vencerás que retorne el conjunto de dígitos que aparezcan en todos los elementos de `a`, y determina su coste computacional en tiempo. Por ejemplo, para `a = [2348, 1349, 7523, 3215]`, la solución es $\{3\}$. La función a implementar deberá llamar a otra que devuelva el conjunto de dígitos de un entero no negativo. Implementa esta función también.

### Ejercicio 6.3
El problema de la máxima sublista consiste en encontrar la sublista de elementos contiguos de una lista tal que la suma de sus elementos sea la mayor de todas. Por ejemplo, para la lista `[-1, -4, 5, 2, -3, 4, 2, -5]`, la sublista óptima es `[5, 2, -3, 4, 2]`, cuyos elementos suman 10. Dada una lista no vacía `a` de números, implementa una función de divide y vencerás que retorne la suma de los elementos de su máxima sublista.

### Ejercicio 6.4
Diseña un algoritmo recursivo rápido para multiplicar polinomios basada en la técnica de divide y vencerás, que sea análoga al enfoque empleado por el algoritmo de Karatsuba. Usa listas para codificar los polinomios. Por ejemplo, el polinomio de grado $n-1$: $P=u_{n-1}x^{n-1}+\cdots+u_1x+u_0$ se indicará mediante una lista `a` de longitud $n$, donde el elemento `a[i]` contendrá el valor del coeficiente $u_i$. Por último, el método necesitará métodos para sumar y restar polinomios. Implementa estas funciones también.

### Ejercicio 6.5
Implementa una función recursiva que reciba una matriz ($A$) de dimensiones $n\times m$ y devuelva su traspuesta ($A^T$), de dimensiones $m\times n$. Utiliza el paquete NumPy, y realiza una descomposición basada en divide y vencerás que considere que $A$ está formada por cuatro submatrices "bloque", resultado de dividir $m$ y $n$ por dos:
$A=\begin{bmatrix}A_{1,1}&A_{1,2}\\A_{2,1}&A_{2,2}\end{bmatrix}.$
En ese caso, la traspuesta de $A$ se define como:
$A^T=\begin{bmatrix}A_{1,1}^T&A_{2,1}^T\\A_{1,2}^T&A_{2,2}^T\end{bmatrix}.$

### Ejercicio 6.6
Implementa el algoritmo de multiplicación de matrices de Strassen. El código deberá contener una función auxiliar (wrapper) que permita multiplicar una matriz de dimensiones $p\times q$ por otra de dimensiones $q\times r$, rellenando las matrices de entrada con ceros.

### Ejercicio 6.7
Implementa una función de divide y vencerás para multiplicar matrices basada en la siguiente descomposición de las matrices de entrada:
$A\cdot B=\begin{bmatrix}A_1&A_2\end{bmatrix}\cdot\begin{bmatrix}B_1\\B_2\end{bmatrix}=A_1B_1+A_2B_2.$

### Ejercicio 6.8
Implementa una función de divide y vencerás para multiplicar matrices basada en la siguiente descomposición de las matrices de entrada:
$A\cdot B=\begin{bmatrix}A_1\\A_2\end{bmatrix}\cdot\begin{bmatrix}B_1&B_2\end{bmatrix}=\begin{bmatrix}A_1B_1&A_1B_2\\A_2B_1&A_2B_2\end{bmatrix}.$

## 7. Ejercicios de vuelta atrás - backtracking

### Ejercicio 7.1
Existen varias formas de obtener todos los subconjuntos de un conjunto inicial. Una forma sencilla consiste en generar un árbol binario, donde en cada nodo se decida si se incorpora un elemento del conjunto inicial a un subconjunto. El objetivo en este ejercicio es implementar un procedimiento alternativo, cuyo árbol de recursión sea como el de la siguiente figura:
```
{}
├─0─ {a}
│     ├─1─ {a,b}
│     │      └─2─ {a,b,c}
│     └─2─ {a,c}
├─1─ {b}
│     └─2─ {b,c}
└─2─ {c}
```
Como puede apreciarse, se genera un subconjunto en cada nodo del árbol. Por tanto, el árbol tiene exactamente $2^n$ nodos, donde $n$ es la cardinalidad del conjunto inicial. Asumiendo que el conjunto inicial viene especificado en una lista de longitud $n$, observa que las etiquetas del árbol hacen referencia a los índices de la lista (en la figura la lista de entrada sería `[a, b, c]`). Además, la solución parcial será una lista que contenga los índices de los elementos que forman un subconjunto. En el ejemplo, la lista `[0, 2]` representará al conjunto $\{a,c\}$. Por tanto, las soluciones parciales también serán soluciones completas. Finalmente, el método desarrollado deberá imprimir los elementos de cada subconjunto.

### Ejercicio 7.2
Implementa una función de backtracking que cuente el número de soluciones válidas de un Sudoku que, posiblemente, no esté bien planteado (es decir, que pueda tener 0, 1, o más soluciones).

### Ejercicio 7.3
Implementa un algoritmo de backtracking que imprima todas las soluciones del problema de las $n$ torres de ajedrez. Se trata de un problema análogo al de las $n$ reinas, pero usa torres en lugar de reinas. Como las torres solo se pueden mover de manera vertical u horizontal, dos o más torres no pueden estar en la misma columna ni fila. Sin embargo, puede haber torres en la misma diagonal. La siguiente figura muestra una solución al problema para 4 torres:
```
T . . .
. T . .
. . . T
. . T .
```

### Ejercicio 7.4
Un cuadrado mágico es una rejilla (o matriz) de $n\times n$, que contiene los primeros $n^2$ enteros positivos tales que la suma de los elementos en cada fila, columna, y diagonales sea la misma. Esa cantidad se denomina "constante mágica" y es $n(n^2+1)/2$ para un $n$ general. La siguiente figura muestra un cuadrado mágico de dimensiones $3\times 3$, donde la constante mágica es 15:
```
8 1 6 | 15
3 5 7 | 15
4 9 2 | 15
15 15 15 (columnas), 15 15 (diagonales)
```
Diseña un algoritmo basado en backtracking para imprimir todos los posibles cuadrados mágicos de dimensiones $3\times 3$. Nota: no es necesario implementar un método para un $n$ general. ¿Qué problema podríamos tener al intentar calcular cuadrados mágicos más grandes?

### Ejercicio 7.5
Un caballo en ajedrez puede saltar desde una casilla a otra en patrones de tipo L, como se muestra en la siguiente figura (izquierda).
```
Izquierda (tablero 5x5, fila,col desde 0): caballo en (2,2); posibles saltos a
(0,1) (0,3) (1,0) (1,4) (3,0) (3,4) (4,1) (4,3)
Derecha (tablero 5x5): cuatro saltos consecutivos desde la casilla superior-izquierda:
(0,0) -> (2,1) -> (4,0) -> (3,2) -> (2,0)
```
En la derecha se muestran cuatro saltos consecutivos de una caballo que empieza en la celda superior-izquierda. El problema de la "ruta del caballo" consiste en determinar una secuencia de saltos de un caballo, en un tablero de dimensiones $n\times n$, que empiece en una casilla determinada, y consiga visitar el resto de casillas, sin pasar dos o más veces por la misma. Implementa un algoritmo de backtracking que encuentre una ruta del caballo, y prueba el código para $n=5$ y $n=6$. Además de la $n$ inicial, el método recibirá las coordenadas de la casilla inicial en el tablero. Por último, no es necesario encontrar una ruta "cerrada", tal que se pueda saltar desde la casilla final a la inicial con un movimiento legal del caballo.

### Ejercicio 7.6
El problema del viajante de comercio ("traveling salesman problem" o simplemente TSP), es un problema clásico de optimización discreta. Dadas $n$ ciudades, el objetivo es hallar el camino más corto que visite cada ciudad una sola vez y retorne a la ciudad inicial. La siguiente figura ilustra un ejemplo del camino más corto para 10 ciudades:
[figura: 10 ciudades como puntos en el plano unidos por un ciclo cerrado (el camino más corto)]
Implementa un algoritmo de backtracking que resuelva el problema. Asume que las posiciones de las ciudades se especifican en un fichero de texto, donde cada línea contiene las coordenadas $x$ e $y$ de una ciudad en un mapa bidimensional. El fichero se puede leer empleando el método `loadtxt` del paquete NumPy. La ciudad inicial será la de la primera línea del fichero. Además, considera distancias euclídeas entre las ciudades (el viajante iría de una ciudad a otra en línea recta). Estas distancias se pueden calcular con el método `pdist` del paquete SciPy. En concreto, el método recursivo de backtracking deberá recibir una matriz de distancias entre las ciudades (las coordenadas $x$ e $y$ son irrelevantes si se dispone de las distancias). Finalmente, prueba el código con ejemplos donde $n\le 10$.

### Ejercicio 7.7
El siguiente problema, denominado "tug of war" en inglés, busca dividir un conjunto de elementos en dos lo más "parecidos" como sea posible. Formalmente, dada una lista no vacía de $n$ números (que corresponderían a valoraciones de los elementos del conjunto original), donde $n$ es par, el objetivo consiste en dividirla en dos de $n/2$ elementos, de manera que se minimice la diferencia absoluta entre la suma de los elementos de cada sublista. Por ejemplo, la forma óptima de dividir la lista `[3, 5, 9, 14, 20, 24]` consiste en considerar las sublistas `[5, 9, 24]`, y `[3, 14, 20]`. La suma de sus elementos es 38 y 37, respectivamente, y la diferencia absoluta entre esas sumas es 1.
Implementa un algoritmo basado en backtracking que genere las sublistas que resuelven el problema. La solución puede ser una lista binaria de longitud $n$ con $n/2$ ceros y $n/2$ unos. Los ceros estarían asociados a una sublista y los unos a la otra. En el ejemplo anterior la solución sería la lista `[0, 1, 1, 0, 0, 1]` (`[1, 0, 0, 1, 1, 0]` sería equivalente).
Además, implementa un algoritmo más eficiente donde la solución sea una lista de longitud $n/2$ que contenga los índices (en orden creciente) de la lista original en los que se encuentran los elementos de una de las sublistas. Por ejemplo, la sublista $\{5,9,24\}$ se representaría mediante la lista de índices `[1, 2, 5]`. La siguiente figura ilustra las dos formas de representar la solución:
```
(a) lista:    3 5 9 14 20 24      (b) lista:    3 5 9 14 20 24
    solución: 0 1 1 0  0  1           solución: 1 2 5
    (cada solución[i] se asocia con lista[i]; los 1 marcan 5, 9, 24)   (solución[0]->lista[1], solución[1]->lista[2], solución[2]->lista[5])
```

### Ejercicio 7.8
El problema de la suma de subconjuntos consiste en determinar los subconjuntos de uno inicial compuesto de números positivos, y especificado a través de una lista `L`, tal que la suma de sus elementos sea igual a una cantidad $s$. Implementa una función recursiva alternativa basada en backtracking que calcule el subconjunto válido (sus elementos suman $s$) que además tenga la menor cardinalidad. El método almacenará el conjunto óptimo a través de una lista, y retornará la cardinalidad óptima (menor). Por ejemplo, para el conjunto $\{1,2,3,5,6,7,9\}$ y $s=13$, el método almacenará el conjunto $\{6,7\}$, y devolverá el valor 2. Además, la solución no tiene por qué ser única, pero la cardinalidad óptima sí lo es. Por ejemplo, para $\{2,6,3,5\}$ y $s=8$, tanto $\{2,6\}$ como $\{3,5\}$ son subconjuntos óptimos. Codifica la solución parcial (y óptima) como una lista de dígitos binarios. Además, poda el árbol de recursión considerando la validez de una solución y la mejor cardinalidad encontrada hasta el momento. Por último, codifica una función auxiliar wrapper que calcule el subconjunto óptimo y lo imprima en caso de existir.

## 8. Ejercicios de algoritmos voraces

### Ejercicio 8.1
Sea un conjunto $A$ de $n$ actividades $\{a_0,a_1,\ldots,a_{n-1}\}$ que necesitan utilizar un recurso común, por ejemplo, una sala de reuniones. El recurso solo puede ser usado por una actividad en cada momento. Cada actividad tiene un instante de comienzo $c_i$ y un instante de finalización $f_i$, donde $0\le c_i<f_i<\infty$.
Si se selecciona la actividad $a_i$, se desarrolla en el intervalo semiabierto de tiempo $[c_i,f_i)$. Las actividades $a_i$ y $a_j$ son compatibles si sus intervalos $[c_i,f_i)$ y $[c_j,f_j)$ no se solapan, es decir, si $c_i\ge f_j$ o $c_j\ge f_i$.
El objetivo de este ejercicio es elaborar e implementar una estrategia voraz para seleccionar un subconjunto de actividades compatibles cuya cardinalidad sea máxima.
Por ejemplo, sea el siguiente conjunto de actividades:

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|----|
| c_i | 1 | 2 | 0 | 5 | 8 | 5 | 6 | 8 | 3 | 3 | 12 |
| f_i | 4 | 13 | 6 | 7 | 12 | 9 | 10 | 11 | 8 | 5 | 14 |

[figura: diagrama de Gantt, eje x de 0 a 14, una barra horizontal $[c_i,f_i)$ por actividad $a_0..a_{10}$ según la tabla; resaltadas en naranja $a_0,a_3,a_7,a_{10}$]
Un subconjunto $S$ de actividades compatibles es $\{a_2,a_4,a_{10}\}$. Sin embargo, no es un subconjunto de cardinalidad máxima, como lo son $\{a_0,a_3,a_7,a_{10}\}$ (en naranja en la figura) y $\{a_9,a_3,a_4,a_{10}\}$ (ya que tienen 4 elementos).

### Ejercicio 8.2
Propón varias estrategias voraces para el problema de la mochila-01. Impleméntalas y realiza una simulación con 1000 instancias del problema, donde el número de objetos $n$ varíe entre 10 y 100, y los pesos y valores estén en el intervalo $(0,10)$. Tanto $n$ como los pesos y valores se escogerán aleatoriamente de distribuciones uniformes. ¿Hay alguna estrategia óptima o que ofrezca mejores resultados en general?

### Ejercicio 8.3
Se pide diseñar un método recursivo que implemente la estrategia voraz óptima para el problema del cambio de monedas. Dada una cierta cantidad de dinero $x$, el algoritmo debe imprimir por pantalla los valores de las monedas tal que su suma sea igual a $x$, teniendo en cuenta que:
- Los posibles valores de las monedas son: $\{2, 1, 0{,}5, 0{,}2, 0{,}1, 0{,}05, 0{,}02, 0{,}01\}$
- Se usará el mínimo número de monedas posible
- Se asumirá que $x\ge 0{,}01$ y que $x$ estará redondeado a dos cifras decimales

Por ejemplo, para $x=5{,}34$ el método debe imprimir la secuencia: `2 2 1 0,2 0,1 0,02 0,02`
El método será recursivo, pero podrá usar bucles.

### Ejercicio 8.4
Este problema está relacionado con la eficiencia de una generalización del algoritmo de ordenación mergesort, en el que la lista original a ordenar se descompone en varias sublistas de tamaños diferentes. El algoritmo emplea un método para combinar las sublistas mezclando parejas de éstas progresivamente hasta ordenar la lista original.
Este ejercicio consiste implementar un método para hallar el número mínimo de operaciones que necesitaría una estrategia (voraz) óptima para ordenar la lista original, cuando se desea mezclar $n$ listas ordenadas, las cuales pueden tener tamaños diferentes. Se supondrá que se realiza una operación por cada elemento a ordenar de una pareja de sublistas.
```
Sublistas iniciales (tamaños 8, 5, 7, 4):
L1 = 1 2 3 3 5 7 7 8
L2 = 1 1 4 5 5
L3 = 1 2 3 6 7 8 9
L4 = 1 4 5 6
Paso 1 (11 operaciones): L3+L4 -> 1 1 2 3 4 5 6 6 7 8 9
Paso 2 (19 operaciones): L1 + (1 1 2 3 4 5 6 6 7 8 9) -> 1 1 1 2 2 3 3 3 4 5 5 6 6 7 7 7 8 8 9   (L2 sin mezclar)
Paso 3 (24 operaciones): (lista de 19) + L2 -> 1 1 1 1 1 2 2 3 3 3 4 4 5 5 5 5 6 6 7 7 7 8 8 9
Nº total operaciones = 11 + 19 + 24 = 54
```
En el ejemplo de la figura partimos de cuatro sublistas de tamaños 8, 5, 7 y 4. Al mezclar por parejas de la forma ilustrada el número total de operaciones realizadas es 54. Sin embargo, esa estrategia no es óptima. Hay una forma más eficiente de mezclar que lleva a cabo solo 48 operaciones.

### Ejercicio 8.5
Sea una lista `a` que contenga las frecuencias de aparición de $n$ caracteres en un documento. Implementa un programa que calcule los códigos de Huffman asociados a los caracteres a partir de las frecuencias en `a`.

### Ejercicio 8.6
Halla un árbol de recubrimiento de coste mínimo para el siguiente grafo ponderado empleando las estrategias de Prim y Kruskal.
```
Aristas (no dirigidas, peso):
A-B 10, A-C 7, B-C 8, B-D 15, B-E 12, C-D 6, C-F 9, D-E 12, D-F 11, E-F 10, E-G 8, F-G 9
```
(disposición: B y E arriba, A y D y G en el centro, C y F abajo; arista superior B-E peso 12, arista inferior C-F peso 9)

### Ejercicio 8.7
Implementa el algoritmo de Prim para hallar el árbol de recubrimiento de coste mínimo (minimum spanning tree).

### Ejercicio 8.8
Implementa el algoritmo de Kruskal para hallar el árbol de recubrimiento de coste mínimo (minimum spanning tree).

### Ejercicio 8.9
Implementa el algoritmo de Dijkstra y úsalo para hallar el camino más corto desde la entrada a un laberinto (definido sobre una rejilla rectangular como el de la figura de abajo) hasta la correspondiente casilla de salida.
[figura: laberinto en rejilla cuadrada de unas 16x16 celdas con celdas de pared sombreadas (ladrillo); "entrada" con flecha hacia abajo en la esquina superior izquierda, por encima de la primera columna; "salida" con flecha hacia abajo en la parte inferior derecha. La disposición exacta de las paredes no se transcribe]

## 9. Ejercicios adicionales de recursividad

### Ejercicio 9.1
Se pide implementar un método recursivo que, dado un determinado entero no negativo $n$, calcule la siguiente suma:
$S(n)=\sum_{i=1}^{n}(2i-1)$

### Ejercicio 9.2
En este ejercicio se pide implementar una versión recursiva del algoritmo de Horner, que sirve para evaluar polinomios de manera eficiente. En concreto, evalúa un polinomio de grado $n$ utilizando solamente $n$ multiplicaciones. La clave detrás del algoritmo de Horner es la descomposición de un polinomio $p(x)$ de grado $n$ de la siguiente manera:
$p(x,\mathbf d)=d_0+x(d_1+x(d_2+\cdots+x(d_{n-1}+d_n x)\cdots))$
donde $\mathbf d$ representa los coeficientes del polinomio de grado $n$. En concreto, $d_0$ es la constante, mientras que $d_n$ es el coeficiente asociado al término $x^n$. El método recibirá la lista de coeficientes $\mathbf d$ que definen el polinomio, y el número real $x$.

### Ejercicio 9.3
Se pide implementar la siguiente función mediante métodos recursivos, para un entero positivo $n$:
$f(n)=\begin{cases}1 & n=1,2\\ 1+\sum_{i=1}^{n-2}f(i) & n\ge 3\end{cases}$
El sumatorio en el caso recursivo se puede implementar de dos maneras: (1) usando un bucle, y (2) mediante una segunda función recursiva. Implementad ambos casos.

### Ejercicio 9.4
Asuma que las tres torres están dispuestas de izquierda a derecha. En esta variante las reglas del problema son las mismas que las del original, pero NO se permite mover discos directamente desde la torre de la izquierda a la de la derecha, ni viceversa, como ilustra la siguiente figura:
[figura: tres torres (izquierda, centro, derecha); movimientos permitidos (marca de verificación): izquierda<->centro y centro<->derecha; movimiento prohibido (cruz): izquierda<->derecha directamente]
Dados $n$ discos ubicados en la torre de la izquierda, implementa un procedimiento que resuelva el problema, y mueva los $n$ discos a la torre de la derecha.

### Ejercicio 9.5
Implementa un método recursivo que corra en tiempo logarítmico para buscar un elemento `x` en una lista o array ordenado `a`. El método devolverá el índice en el que se encuentre `x` dentro de la lista. Es decir, si `a[i] = x` el método devolverá `i`. Si `x` aparece varias veces en la lista basta con devolver cualquier índice `i` que satisfaga `a[i] = x`. Si `x` no se encuentra en la lista el resultado será $-1$.

### Ejercicio 9.6
Implementa un método recursivo que, dado un entero positivo `n`, imprima por pantalla una pirámide de `n` filas con la siguiente estructura (para `n = 4`):
```
   X
  XXX
 XXXXX
XXXXXXX
```
El método puede usar funciones auxiliares recursivas.

### Ejercicio 9.7
Implementa el método recursivo de bisección para hallar una raíz de una función continua $f(x)$ en un intervalo $(a,b)$. Para aplicar el método sabemos que $f(a)\cdot f(b)<0$. Es decir, tiene diferentes signos en los extremos del intervalo, lo cual implica que debe tener al menos un cero en $(a,b)$. El método debe retornar un valor $z$ en cuanto encuentre un valor para el cual $|b-a|<2\varepsilon$, donde $\varepsilon$ es un valor pequeño que se pasará al método como parámetro.

### Ejercicio 9.8
Implementa el método recursivo que, dada una cadena `s`, encuentre la subcadena más larga contenida en `s` que constituya un palíndromo (es decir, que sea "capicúa"). El método podrá llamar a otro auxiliar Booleano que determine si una cadena es un palíndromo.
