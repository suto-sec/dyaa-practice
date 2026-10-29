# Soluciones examen diseño – mayo 2021-2022
Prueba de evaluación. Asignatura: Diseño y Análisis de Algoritmos, Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez. Curso 2021-2022 – 25 de mayo de 2022, Prueba de Diseño de Algoritmos, duración 2 horas.

## Ejercicio 1 [1 punto]
Se pide diseñar un algoritmo recursivo que, dada una lista $a=[a_0,a_1,\ldots,a_{n-1}]$ de n números calcule la suma/resta alternante $s=a_0-a_1+a_2-a_3\cdots$.

### Posibles soluciones
Una solución muy concisa consiste en devolver $a_0$ menos la suma alternante de la lista `a[1:]` en el caso recursivo. Esto es correcto ya que el signo menos afecta a toda la suma de la llamada recursiva.

```python
def suma_resta_alternante1(a):
    if len(a)==0:
        return 0
    else:
        return a[0] - suma_resta_alternante1(a[1:])
```

Otra solución consiste en considerar el subproblema de tamaño $n-2$ que calcula la suma alternante de los elementos $a_2,\ldots,a_{n-1}$. El caso recursivo simplemente calcula la resta $a_0-a_1$ y le suma el resultado del subproblema. Por otro lado, en esta solución se necesitan dos casos base triviales:

```python
def suma_resta_alternante2(a):
    if len(a)==0:
        return 0
    elif len(a)==1:
        return a[0]
    else:
        return a[0] - a[1] + suma_resta_alternante2(a[2:])
```

En la siguiente solución consideramos el subproblema con la lista inicial a la que le quitamos el último elemento (`a[:-1]`). Si la longitud de la lista inicial es par el método debe devolver el resultado del subproblema menos el último elemento de la lista (`a[-1]`). En cambio, si es impar debemos sumar el último elemento. El método se puede implementar de la siguiente manera:

```python
def suma_resta_alternante3(a):
    if len(a)==0:
        return 0
    elif len(a)%2==0:
        return suma_resta_alternante3(a[:-1]) - a[-1]
    else:
        return suma_resta_alternante3(a[:-1]) + a[-1]
```

## Ejercicio 2 [4 puntos]
En este ejercicio se pide diseñar un algoritmo recursivo basado en la técnica de divide y vencerás que, dada una lista `a` de $2^p$ números (donde p es un entero no negativo), devuelva una lista que sea una permutación concreta de los elementos de `a`. En particular, la permutación se define invirtiendo los bits de los índices de los elementos, asumiendo que los índices son números binarios de p bits.

Por ejemplo, para p = 5, considérese que un índice i es el número binario $b_4b_3b_2b_1b_0$. Entonces el índice $j=b_0b_1b_2b_3b_4$ sería el correspondiente tras haber invertido el orden de los bits de i. La permutación pedida tendrá que intercambiar los elementos ubicados en los todos los posibles índices i y j. Por ejemplo, para p = 5 el elemento `a[26]` se intercambiará con el elemento `a[11]` ya que 26 en binario es 11010, mientras que 11 es 01011. Se asumirá por tanto que los índices tomarán los valores desde 0 hasta $2^p-1$.

El siguiente ejemplo presenta un caso concreto para p = 3, con la lista `a = [3, 5, 7, 2, 4, 8, 1, 6]`:

Relación entre i y j, y permutación (intercambios) para p = 3:

| i | b2 b1 b0 | b0 b1 b2 | j | a[i] | a[j] |
|---|---|---|---|---|---|
| 0 | 0 0 0 | 0 0 0 | 0 | 3 = a[0] | a[0] = 3 |
| 1 | 0 0 1 | 1 0 0 | 4 | 5 = a[1] | a[4] = 4 |
| 2 | 0 1 0 | 0 1 0 | 2 | 7 = a[2] | a[2] = 7 |
| 3 | 0 1 1 | 1 1 0 | 6 | 2 = a[3] | a[6] = 1 |
| 4 | 1 0 0 | 0 0 1 | 1 | 4 = a[4] | a[1] = 5 |
| 5 | 1 0 1 | 1 0 1 | 5 | 8 = a[5] | a[5] = 8 |
| 6 | 1 1 0 | 0 1 1 | 3 | 1 = a[6] | a[3] = 2 |
| 7 | 1 1 1 | 1 1 1 | 7 | 6 = a[7] | a[7] = 6 |

(columna a[i]: lista a; columna a[j]: lista permutada)

Ejemplo: lista a = `[3, 5, 7, 2, 4, 8, 1, 6]`, lista permutada = `[3, 4, 7, 1, 5, 8, 2, 6]`

Se podrán usar funciones auxiliares. Todas deberán ser recursivas.

### Posibles soluciones
Como en todas las soluciones recursivas, los algoritmos se construyen asumiendo que se conocen las soluciones a subproblemas (instancias más pequeñas del mismo problema). Considérese la lista del enunciado `[3,5,7,2,4,8,1,6]`, para la cual la solución es `[3,4,7,1,5,8,2,6]`. Dividiéndola por la mitad tenemos las sublistas `[3, 5, 7, 2]` y `[4, 8, 1, 6]`. Por otro lado, la permutación para una lista genérica g de longitud 4 (p = 2) es $[g_0,g_2,g_1,g_3]$. Por tanto, aplicando la función recursiva a ambas sublistas obtendríamos $a_1=[3,7,5,2]$ y $a_2=[4,1,8,6]$. Para obtener el resultado final hay que mezclar $a_1$ con $a_2$ tomando elementos de ambas listas de manera alternante. El siguiente código muestra la función recursiva basada en divide y vencerás (`invbitperm`) y la función recursiva para mezclar las dos listas:

```python
def mezcla(a1,a2):
    if len(a1)==1:
        return [a1[0],a2[0]]
    else:
        return [a1[0]] + [a2[0]] + mezcla(a1[1:],a2[1:])

def invbitperm(a):
    if len(a)<=2:
        return a
    else:
        mitad = len(a)//2
        a1 = invbitperm(a[:mitad])
        a2 = invbitperm(a[mitad:])
        return mezcla(a1,a2)
```

Otra solución consiste en dividir la lista original en dos que contengan los elementos en índices pares e impares. Por ejemplo, podemos descomponer `[3,5,7,2,4,8,1,6]` en las listas $a_1=[3,7,4,1]$ y $a_2=[5,2,8,6]$. Aplicando el método recursivo a estas listas obtendríamos $t_1=[3,4,7,1]$ y $t_2=[5,8,2,6]$. En este caso el resultado final es la simple concatenación de $t_1$ y $t_2$: `[3,4,7,1,5,8,2,6]`. A continuación se muestra esta solución:

```python
def pares_impares(a):
    if a==[]:
        return ([],[])
    else:
        (a1,a2) = pares_impares(a[2:])
        return ([a[0]] + a1, [a[1]] + a2)

def invbitperm2(a):
    if len(a)<=2:
        return a
    else:
        (a1,a2) = pares_impares(a)
        return invbitperm2(a1) + invbitperm2(a2)
```

## Ejercicio 3 [4 puntos]
Considérese un conjunto C de cardinalidad n (es decir, de n elementos). Por otro lado, sea $a=[n_1,n_2,\ldots,n_m]$ una lista de m enteros positivos de manera que $n_1+n_2+\cdots+n_m=n$. Se pide implementar un algoritmo basado en la técnica de backtracking para calcular el número total de particiones de C en m subconjuntos tal que el primero tenga $n_1$ elementos, el segundo tenga $n_2$ elementos, etc. En otras palabras, se pide hallar el número de formas de generar m subconjuntos de C, tal que sus cardinalidades sean precisamente $n_1,n_2,\ldots,n_m$.

Por ejemplo, si $C=\{0,1,2,3,4\}$, donde n = 5, y tenemos `a = [2, 1, 2]`, hay un total de 30 posibles particiones (subíndice = número de subconjunto):

```
{0,1}1 {2}2 {3,4}3    {2,3}1 {0}2 {1,4}3
{0,1}1 {3}2 {2,4}3    {2,4}1 {0}2 {1,3}3
{0,1}1 {4}2 {2,3}3    {3,4}1 {0}2 {1,2}3
{0,2}1 {1}2 {3,4}3    {1,2}1 {3}2 {0,4}3
{0,3}1 {1}2 {2,4}3    {1,2}1 {4}2 {0,3}3
{0,4}1 {1}2 {2,3}3    {1,3}1 {2}2 {0,4}3
{0,2}1 {3}2 {1,4}3    {1,4}1 {2}2 {0,3}3
{0,2}1 {4}2 {1,3}3    {1,3}1 {4}2 {0,2}3
{0,3}1 {2}2 {1,4}3    {1,4}1 {3}2 {0,2}3
{0,4}1 {2}2 {1,3}3    {2,3}1 {1}2 {0,4}3
{0,3}1 {4}2 {1,2}3    {2,4}1 {1}2 {0,3}3
{0,4}1 {3}2 {1,2}3    {3,4}1 {1}2 {0,2}3
{1,2}1 {0}2 {3,4}3    {2,3}1 {4}2 {0,1}3
{1,3}1 {0}2 {2,4}3    {2,4}1 {3}2 {0,1}3
{1,4}1 {0}2 {2,3}3    {3,4}1 {2}2 {0,1}3
```

Un detalle importante para simplificar el ejercicio es que la partición $\{0,1\}_1\{2\}_2\{3,4\}_3$ se considera distinta de $\{3,4\}_1\{2\}_2\{0,1\}_3$.
Por otro lado $\{0,1\}_1\{2\}_2\{3,4\}_3$ y $\{1,0\}_1\{2\}_2\{3,4\}_3$ son la misma partición (no importa el orden de los elementos en un subconjunto).
Implementad también una función "wrapper" que llame a la función recursiva con los parámetros adecuados.
Finalmente, el método recursivo devolverá un valor numérico y no imprimirá nada.

### Posible solución
En este ejercicio no debemos buscar permutaciones de n elementos ya que $\{0,1\}_1\{2\}_2\{3,4\}_3$ es equivalente a $\{1,0\}_1\{2\}_2\{4,3\}_3$. En otras palabras, las permutaciones `[0,1,2,3,4]`, `[1,0,2,3,4]`, `[0,1,2,4,3]` y `[1,0,2,4,3]` realmente corresponden a la misma partición. Tampoco debemos buscar subconjuntos. Lo importante en este ejercicio es comprender que cada uno de los n elementos puede incorporarse a uno de los m conjuntos. Por tanto, cuando formemos la solución parcial tenemos que considerar los m candidatos para cada uno de los n elementos. De esta manera, si `a = [2, 1, 2]` (y $C=\{0,1,2,3,4\}$ con n = 5), la solución parcial será una lista de n valores entre 0 y $m-1$. Por ejemplo, una solución válida podría ser `s = [0, 2, 0, 1, 2]`, que correspondería con la partición $\{0,2\}_1\{3\}_2\{1,4\}_3$. Como $s_0=0$ y $s_2=0$ entonces el 0 y el 2 deben ir en el primer conjunto de la partición. El 3 iría en el segundo conjunto, y el 1 y el 4 irían en el tercer conjunto.

Una vez definida la estructura de la solución parcial y los candidatos, debemos considerar restricciones para no incluir un elemento en un conjunto si éste ya está lleno. Para hacer esto de manera eficiente se puede usar la lista `a`, que indica el número de elementos que se podrían incluir en los m conjuntos. Si incluimos un elemento en el conjunto k-ésimo (donde k toma valores de 0 a $m-1$), tendremos que decrementar $a_k$ (este cambio tendrá que deshacerse después de realizar la llamada recursiva). A continuación se muestra esta solución, que devuelve 1 cuando se completa una solución, y retorna la suma de los resultados de las diversas llamadas recursivas:

```python
def particiones(i,a,sol):
    n = len(sol)
    m = len(a)
    if i==n:
        return 1
    else:
        nsols = 0
        for k in range(m):
            if a[k]>0:
                sol[i] = k
                a[k] = a[k]-1
                nsols = nsols + particiones(i+1,a,sol)
                a[k] = a[k]+1

        return nsols


a = [2,1,2]
n = sum(a)
m = len(a)
sol = [None]*n
print(particiones(0,a,sol))
```

Un detalle adicional es que como no se pide imprimir o procesar las particiones (solo se pide contarlas), no es necesario usar la solución parcial `sol`. Por tanto, la siguiente solución también sería válida, donde podemos aprovechar que la profundidad del árbol recursivo será n, la cual podemos decrementar hasta que sea 0 (no sería necesario usar un índice i para saber la profundidad de un nodo del árbol recursivo):

```python
def particiones_simple(n,a):
    m = len(a)
    if n==0:
        return 1
    else:
        nsols = 0
        for k in range(m):
            if a[k]>0:
                a[k] = a[k]-1
                nsols = nsols + particiones_simple(n-1,a)
                a[k] = a[k]+1

        return nsols

a = [2,1,2]
n = sum(a)
print(particiones_simple(n,a))
```

## Ejercicio 4 [1 punto]
Se pide diseñar un (solo) método recursivo que implemente la estrategia voraz óptima para el problema del cambio de monedas. Dada una cierta cantidad de dinero x, el algoritmo debe imprimir por pantalla los valores de las monedas tal que su suma sea igual a x, teniendo en cuenta que:
- Los posibles valores de las monedas son: {2, 1, 0,5, 0,2, 0,1, 0,05, 0,02, 0,01}
- Se usará el mínimo número de monedas posible
- Se asumirá que $x\ge0{,}01$ y que x estará redondeado a dos cifras decimales

Por ejemplo, para x = 5,34 el método debe imprimir la secuencia: `2 2 1 0,2 0,1 0,02 0,02`

El método será recursivo, pero podrá usar bucles.

### Posibles soluciones
El método debe recibir la cantidad x y una lista de monedas que en este caso asumiremos que está ordenada de mayor a menor. El caso base corresponde a la situación en la que x = 0, en cuyo caso no habría que imprimir nada. En el caso recursivo primero determinamos qué moneda debemos "devolver" (es decir, imprimir), que será la de mayor valor que no sea inferior a x. Esto lo podemos calcular mediante un simple bucle (también se puede usar una función recursiva alternativa). Asumiendo que se ha imprimido la moneda i-ésima (llamémosla $m_i$) el algoritmo debe continuar resolviendo el problema para $x-m_i$ haciendo una nueva llamada recursiva. En el siguiente código se redondea la cantidad $x-m_i$ por cuestiones de precisión a la hora de trabajar con números reales (esto no se tendrá en cuenta a la hora de corregir el ejercicio):

```python
def devolucion_cambio(x,monedas):
    if x>0:
        i = 0
        while x<monedas[i]:
            i = i+1

        print(monedas[i],' ',end='')

        c = round(x-monedas[i],2)
        devolucion_cambio(c,monedas)

monedas = [2,1,0.5,0.2,0.1,0.05,0.02,0.01]
x = 5.34
devolucion_cambio(round(x,2),monedas)
```

Se puede sustituir el código de las líneas 3–5 (`i = 0` ... `i = i+1`) por la llamada `i = indice_moneda(x,monedas)`, donde:

```python
# Se asume que x no puede ser menor que el valor más pequeño de la lista de
# monedas, por lo que la lista de monedas nunca será vacía
def indice_moneda(x,monedas):
    if x>=monedas[0]:
        return 0
    else:
        return 1 + indice_moneda(x,monedas[1:])
```

Otra solución consiste en usar un bucle para imprimir la moneda de mayor valor todas las veces que haga falta usando un bucle o una función auxiliar. Posteriormente se realiza una llamada recursiva para resolver el problema con la cantidad que quede por devolver, pero eliminando la moneda de mayor valor de la lista de monedas:

```python
def cambio_monedas(x,monedas):
    if x>0:
        while x>=monedas[0]:
            print(monedas[0],' ',end='')
            x = round(x-monedas[0],2)

        cambio_monedas(x,monedas[1:])
```
