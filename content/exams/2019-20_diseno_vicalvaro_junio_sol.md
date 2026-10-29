# Soluciones examen diseño – junio 2019-2020 Vicálvaro
Asignatura: Diseño y Análisis de Algoritmos. Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez. (Prueba de evaluación, 10 de enero de 2023)
Diseño y Análisis de Algoritmos – Vicálvaro. Curso 2019-2020 – 8 de junio de 2020. Diseño de algoritmos - Soluciones

## Ejercicio 1 [3 puntos] [Duración: 30 minutos]
Implementa un algoritmo recursivo que, dada una lista $l=[l_0,l_1,\ldots,l_{n-1}]$ de longitud $n$ (podéis considerar que contiene caracteres) cuyos elementos se pueden repetir, calcule el número de apariciones de cada elemento distinto de la lista. Suponiendo que $l$ contiene $m$ elementos distintos, generará dos listas de longitud $m$. La primera ($d=[d_0,d_1,\ldots,d_{m-1}]$) contendrá los elementos distintos de $l$, mientras que la segunda ($a=[a_0,a_1,\ldots,a_{m-1}]$) contendrá el número de apariciones de los elementos de $d$ en la lista $l$. Es decir, el elemento $d_i$ aparecerá $a_i$ veces en $l$.

Por ejemplo, para $l=$ ['b','a','c','b','a','a','d','a','c','a'], el algoritmo debe generar: $d=$ ['a','c','d','b'] y $a=[5,2,1,2]$ ya que 'a' aparece 5 veces en $l$, 'c' y 'b' aparecen 2 veces, y solo hay una 'd'.

El algoritmo podrá llamar a una función para buscar un elemento concreto en una lista. Esta función de búsqueda devolverá el índice en el que se encuentre el elemento, o $-1$ si éste no aparece en la lista. No es necesario implementar esta función.

### Posible solución
En Python se pueden devolver varias salidas simultáneamente. El siguiente código devuelve las dos listas mediante una "tupla" (solo hay que especificar las salidas entre paréntesis y separadas por comas). Si la lista de entrada es vacía se devuelven dos listas vacías. En el caso recursivo primero se resuelve el subproblema más sencillo (mediante una llamada recursiva), que en este caso contempla la lista de entrada menos su primer elemento ($l_0$). Con esta operación obtenemos una lista de elementos y otra de apariciones, y casi tenemos la solución completa, pero falta por tratar $l_0$. Primero, hacemos una búsqueda de $l_0$ en la lista de elementos. Si no lo encontramos entonces debemos aumentar la lista de elementos con $l_0$ (en este caso lo concatenamos al final) y debemos concatenar también un 1 a la de apariciones. En cambio, si $l_0$ está en la lista de elementos, en una determinada posición, entonces tendremos que incrementar el valor de la lista de apariciones en esa posición.

```python
# No es necesario implementar esta función
def busqueda_lineal(a, x):
    n = len(a)
    if a==[]:
        return -1
    elif a[n-1]==x:
        return n-1
    else:
        return busqueda_lineal(a[:n-1], x)

def elementos_y_apariciones(a):
    if a==[]:
        return ([], [])
    else:
        (elems , aps) = elementos_y_apariciones(a[1:])

        pos = busqueda_lineal(elems , a[0])

        if pos==-1:
            return (elems + [a[0]], aps + [1])
        else:
            aps[pos] = aps[pos]+1
            return (elems , aps)

# Ejemplo
print(elementos_y_apariciones(
        ['b','a','c','b','a','a','d','a','c','a']))
```

## Ejercicio 2 [2 puntos] [Duración: 20 minutos]
Implementa un algoritmo recursivo basado en la estrategia de DIVIDE Y VENCERÁS para evaluar un polinomio $P$ de grado $n-1$: $P=c_{n-1}x^{n-1}+\cdots+c_1x+c_0$ en un determinado valor real $x$. Evaluar un polinomio simplemente consiste en determinar qué valor toma el polinomio para un valor de $x$ concreto. Por ejemplo, si $P=2x^3-x+2$, evaluarlo en $x=1$ sería calcular $P(1)=2\cdot(1)^3-1+2=3$.

El polinomio se definirá mediante una lista $c=[c_0,c_1,\ldots,c_{n-1}]$ de longitud $n$, que contiene los coeficientes (reales) del polinomio. El método podrá llamar a una función para calcular una potencia $x^t$, donde $t$ es un entero (en python se puede usar la expresión x**t).

### Posible solución
Si el polinomio es una constante $c$ tendrá longitud 1, y el resultado siempre será $c_0$. En el caso recursivo realizamos dos llamadas recursivas con cada una de las mitades de $c$. El resultado será la suma de estos dos valores, pero debemos multiplicar uno de ellos por $x^m$, donde $m$ es la longitud de la primera mitad de la lista. Por ejemplo, supongamos que deseamos evaluar $P(x)=2x^6+9x^5+0x^4+7x^3+5x^2+6x+3$ en un valor de $x$. La lista asociada al polinomio $c=[3,6,5,7,0,9,2]$ primero se divide en: $c_1=[3,6,5]$ y $c_2=[7,0,9,2]$ las cuales definen: $P_1(x)=5x^2+6x+3$ y $P_2(x)=2x^3+9x^2+0x+7$

Finalmente, podemos recuperar $P(x)$ sumando los dos polinomios, pero multiplicando $P_2(x)$ por $x^m$ para $m=3$, que es la longitud de $c_1$:
$$P(x)=P_2(x)\cdot x^m+P_1(x).$$

```python
def eval_dyv_alt(c, x):
    n = len(c)
    if n==1:
        return c[0]
    else:
        mitad = n//2

        val_1 = eval_dyv_alt(c[:mitad], x)
        val_2 = eval_dyv_alt(c[mitad:], x)

        return val_2*(x**(mitad)) + val_1

# Ejemplo
c = [2, -3, -1, 0, 1] # x^4 - x^2 - 3x + 2
x = 2

print(eval_dyv(c, 0, len(c)-1, x))
print(eval_dyv_alt(c, x))
```

## Ejercicio 3 [5 puntos] [Duración: 50 minutos]
Implementa un algoritmo basado en la técnica de BACKTRACKING para generar combinaciones con repetición de $n$ elementos tomados de $m$ en $m$. Los datos de entrada son una lista $a=[a_0,a_1,\ldots,a_{n-1}]$ de $n$ elementos distintos, y un entero $m$ ($1\le m\le n$). Las combinaciones con repetición son secuencias de $m$ elementos de $a$, en las que se pueden repetir los elementos, y el orden en el que aparecen los elementos no importa.

Por ejemplo, para $a=$ ['a','b','c','d'] y $m=3$ las combinaciones con repetición son:
aaa, aab, aac, aad, abb, abc, abd, acc, acd, add, bbb, bbc, bbd, bcc, bcd, bdd, ccc, ccd, cdd, ddd

Observad que la combinación (a a b) indica que escoges dos 'a' y una 'b', sin importar el orden. Por eso, sería un error generar además (a b a) o (b a a).

El método a desarrollar debe imprimir todas las combinaciones con repetición. Además, debe calcular el número $C$ de permutaciones generadas, a medida que las va creando. Podéis verificar si el algoritmo está generando $C$ correctamente ya que:
$$C=\frac{(n+m-1)!}{m!\cdot(n-1)!}$$
En el ejemplo, $C=6!/(3!\cdot3!)=20$.
Se valorará el uso de estructuras de datos para acelerar la comprobación de validez de candidatos/soluciones parciales.

### Posible solución
La solución es muy parecida al segundo esquema para generar subconjuntos, en el que se obtenía una solución de tamaño $m$ en el nivel $m$ del árbol recursivo. La propiedad clave en este problema está relacionada con el orden de los elementos en la lista $a$ (notad que los caracteres en el ejemplo siempre aparecen en orden ascendente en las combinaciones). En concreto, si en la posición $i$-ésima de la solución parcial aparece el elemento $a_j$, entonces en la $i+1$ solo podremos ubicar los elementos $a_j,a_{j+1},\ldots,a_{n-1}$. Por tanto, debemos pasarle al método un parámetro con el valor de $j$. Otra forma (menos eficiente y más confusa) de implementar el algoritmo sería considerar los $n$ candidatos de la lista $a$, mediante un bucle donde $k$ va desde 1 hasta $n$, pero usar la condición de validez $k\ge j$. Por último, en el caso base se imprime una combinación y se devuelve un 1. En el caso recursivo se acumulan los resultados de las llamadas en la variable $s$, por lo que el método acaba devolviendo el número de combinaciones halladas.

```python
def genera_combinaciones_repeticion(i,j,sol,a):
    n = len(a)
    m = len(sol)

    # Caso base
    if i==m:
        for i in range(0,m):
            print(sol[i],' ',end='')
        print()

        return 1
    else:
        s = 0

        # Genera candidatos
        for k in range(j,n):

            # Incluye candidato en solución parcial
            sol[i] = a[k]

            # Expande la solución parcial en la posición i+1
            s = s + genera_combinaciones_repeticion(i+1,k,sol,a)

        return s


def genera_combinaciones_repeticion_wrapper(a,m):
    sol = [None] * m
    nsols = genera_combinaciones_repeticion(0,0,sol,a)
    print('Combinaciones con repetición halladas = ',nsols)

    # Opcional
    n = len(a)
    print('Combinaciones con repetición correctas = ',
          int(factorial(n+m-1)/factorial(m)/factorial(n-1)))


# Ejemplo
genera_combinaciones_repeticion_wrapper(['a','b','c','d'],3);
```
