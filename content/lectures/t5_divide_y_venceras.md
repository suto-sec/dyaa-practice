# Tema 5 Divide y vencerás
Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.
Contenido: 1 Introducción; 2 Transforma y vencerás; 3 Divide y vencerás (máximo de una lista, ordenación, multiplicación, embaldosado con L-triominós, permutación de inversión de bits).

## Introducción
### Divide y vencerás
- Uno de los más importantes paradigmas de diseño algorítmico.
- Se basa en la resolución de un problema dividiéndolo en dos o más subproblemas de igual tipo o similar.
- El proceso continúa hasta que éstos llegan a ser lo suficientemente sencillos como para que se resuelvan directamente.
- Al final, las soluciones a cada uno de los subproblemas se combinan para dar una solución al problema original.
- Muchos algoritmos basados en esta estrategia son recursivos; también hay algoritmos iterativos de divide y vencerás.

### Estrategias de diseño de algoritmos
- Transforma y vencerás: reducciones (vistas en el Tema 1).
- Decrementa y vencerás: se reduce el tamaño del problema (p.e., n-1, n//2, n//10, etc.). Una sola llamada recursiva en cada caso recursivo; se requiere la solución de un solo subproblema. Ejemplos vistos en el Tema 4.
- Divide y vencerás: se reduce el tamaño del problema (p.e., n//2, n//4, etc.). Más de una llamada en algún caso recursivo; se requiere la solución de varios subproblemas.

## Transforma y vencerás
### Transforma y vencerás
- Esta estrategia también se denomina reducción.
- Resolver un problema transformándolo en otro más simple, conocido, o para el que existan algoritmos eficientes.
- Esquema: Problema A (resolución difícil o ineficiente) → transformación → Problema B (resolución sencilla o eficiente) → solución B → paso sencillo → solución A.

### Mediana de un array v desordenado
1. Ordenar el array v → $\Theta(n\log n)$.
2. Devolver: $v[n//2]$ si n es impar; $\dfrac{v[(n//2)-1]+v[n//2]}{2}$ si n es par.
- Ejemplo: [4,2,5,5,6,1,0,3,4,5,8,7] ordenado [0,1,2,3,4,4,5,5,5,6,7,8] → mediana 4.5.
- Hay algoritmos más eficientes (p.e., "Quickselect").

### Estimación del valor de π
- Planteamos un problema alternativo: buscamos una aproximación del perímetro p de un círculo de radio R: $p=2\pi R\Rightarrow\pi=\dfrac{p}{2R}$.
- Aproximamos un círculo con un polígono regular inscrito o circunscrito al círculo. El perímetro del polígono inscrito $p_i$ nos dará una cota inferior de p; el del circunscrito $p_c$ una cota superior:
$$\frac{p_i}{2R}\le\pi\le\frac{p_c}{2R}$$
- Comenzamos por un polígono regular inscrito (por ejemplo, un hexágono), cuyo perímetro será 6R. A continuación, doblamos el número de lados, obteniendo una mejor aproximación (hexágono, dodecágono, ...).
- El perímetro de un polígono con el doble de lados se puede obtener fácilmente a partir del primero. Los perímetros de los polígonos circunscritos se pueden obtener de los perímetros de los polígonos inscritos.
- Relaciones geométricas (figura: triángulo con lado inscrito L, lado l del polígono con doble de lados, lado circunscrito L', radio R): $R^2=y^2+\left(\tfrac{L}{2}\right)^2$, $R=x+y$, $l^2=x^2+\left(\tfrac{L}{2}\right)^2$, $\dfrac{L'}{R}=\dfrac{l}{y}$.
- Si el lado de un polígono inscrito mide L, se puede hallar la longitud l de un lado del polígono con el doble de lados:
$$R^2=y^2+\left(\tfrac{L}{2}\right)^2\Rightarrow y=\sqrt{R^2-\left(\tfrac{L}{2}\right)^2},\quad x=R-y=R-\sqrt{R^2-\left(\tfrac{L}{2}\right)^2}$$
$$l=\sqrt{\left(\tfrac{L}{2}\right)^2+R^2+R^2-\left(\tfrac{L}{2}\right)^2-2R\sqrt{R^2-\left(\tfrac{L}{2}\right)^2}}=R\sqrt{2-\sqrt{4-\left(\tfrac{L}{R}\right)^2}}$$
- El lado L' de un polígono circunscrito se puede hallar a partir del lado L de un inscrito: $\dfrac{L'}{R}=\dfrac{L}{y}\Rightarrow L'=\dfrac{LR}{y}$.
- La estimación de π se obtiene a partir de los perímetros hallados:
$$\frac{L\cdot\text{número de lados}}{2R}\le\pi\le\frac{L'\cdot\text{número de lados}}{2R}$$
- Otros métodos para estimar π: simulación Monte Carlo; integración numérica; series: $\arctan x=x-\frac{x^3}{3}+\frac{x^5}{5}-\frac{x^7}{7}+\cdots$ para x=1 $\Rightarrow$ $\frac{\pi}{4}=1-\frac13+\frac15-\frac17+\cdots$.

### Raíz cuadrada
- Deseamos hallar $\sqrt a$. Transformamos el problema en el de hallar un cero de una función: $x=\sqrt a\to x^2=a\to x^2-a=0$.
- Por tanto, querremos hallar un cero de la función $y=x^2-a$. Como x será generalmente un número real, nos podemos conformar con una aproximación.
- Hay varios métodos para resolver este nuevo problema, por ejemplo: método de Newton-Raphson (a continuación); método de bipartición (de "decrementa y vencerás").

### Método de Newton-Raphson
- Método iterativo, que parte de un valor inicial $x_0$, y aplica la siguiente regla para hallar un cero (r) de la función f(x):
$$x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}$$
- En cada iteración se busca la recta tangente a f(x) que pasa por el punto $p=(x_n,f(x_n))$. El corte de la recta con el eje de abscisas constituye el nuevo punto $x_{n+1}$.
- El método surge del desarrollo de f(x) en serie de Taylor, en un entorno del punto $x_n$:
$$f(x)=f(x_n)+f'(x_n)(x-x_n)+(x-x_n)^2\frac{f''(x_n)}{2!}+\dots$$
- Si se trunca el desarrollo a partir del término de grado 2, se obtiene la recta tangente (que pasa por $(x_n,f(x_n))$). Posteriormente evaluamos en $x_{n+1}$: $f(x_{n+1})=f(x_n)+f'(x_n)(x_{n+1}-x_n)$. Si asumimos que $x_{n+1}$ tiende hacia el cero de la función, podemos sustituir $f(x_{n+1})=0$, obteniéndose el algoritmo.
- Raíz cuadrada con Newton-Raphson: se aplica la regla para $f(x)=x^2-a$, con $f'(x)=2x$:
$$x_{n+1}=x_n-\frac{x_n^2-a}{2x_n}=\frac{2x_n^2}{2x_n}-\frac{x_n^2-a}{2x_n}=\frac{x_n^2+a}{2x_n}$$
- Ejemplo (a=13, x0=13): x1=7, x2=4,428571..., x3=3,682027..., x4=3,606345..., x5=3,605551..., x6=3,60555127546399..., que converge a $\sqrt{13}=3{,}60555127546398912486$.

### Factorización LU
- Supongamos que queremos resolver un sistema de ecuaciones $Ax=b$, donde A es una matriz cuadrada e invertible de dimensiones $n\times n$. Una solución: $x=A^{-1}b$. $A^{-1}$ se calcula en $O(n^3)$, pero no suele ser buena idea por: errores de precisión; $A^{-1}$ puede ser densa incluso cuando A es dispersa.
- Alternativa: factorización LU, que también se calcula en $O(n^3)$. $A=LU$, donde L es triangular inferior, y U triangular superior (del mismo tamaño). Para una matriz de 3×3:
$$\begin{bmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{bmatrix}=\begin{bmatrix}l_{11}&0&0\\l_{21}&l_{22}&0\\l_{31}&l_{32}&l_{33}\end{bmatrix}\begin{bmatrix}u_{11}&u_{12}&u_{13}\\0&u_{22}&u_{23}\\0&0&u_{33}\end{bmatrix}$$
- Para resolver $Ax=b$ ahora se van a resolver dos sistemas, pero más sencillos: $Ax=LUx=b\Rightarrow Ly=b,\ Ux=y$.

## Divide y vencerás
### Divide y vencerás
- La descomposición de un problema genera varios subproblemas. Las soluciones a los subproblemas se combinan para generar la solución al problema original, la cual puede requerir alguna operación adicional.
- Esquema: Problema → divide → varios subproblemas → combina → solución.

### Divide y vencerás - Ventajas
- Base de numerosos algoritmos: Transformada Rápida de Fourier (FFT, posiblemente el algoritmo más importante en la actualidad); problemas geométricos (par de puntos más próximos en el plano, cierre convexo); Skyline (en el libro, apartado 6.7); otros que veremos en este tema.
- Aumento de eficiencia en términos de coste computacional.
- Paralelismo (subproblemas tratados en diferentes procesadores).
- Uso eficiente de jerarquías de memoria (cache).

### Máximo de una lista a de n números
1. Tamaño: n.
2. Caso base: si n=1 se devuelve $a_0$.
3. Descomposición: x = máximo de la primera mitad de a; y = máximo de la segunda mitad de a.
4. Combinación: $\max\{x,y\}$.
```python
def maximo(a): # Ya visto en el Tema 4
    n = len(a)
    if n==1:
        return a[0]
    else:
        mitad = n//2
        return max(maximo(a[:mitad]), maximo(a[mitad:]))
```
- ¿Podríamos conseguir un algoritmo más eficiente que una búsqueda lineal, que tarda O(n)? Claramente, no: sea cual sea nuestra estrategia tenemos que procesar todos los elementos de la lista. Este problema tiene una cota inferior $\Omega(n)$.
$$T(n)=\begin{cases}1 & n=1\\ 1+2T(n/2) & n>1\end{cases}\qquad T(n)=2n-1\in\Theta(n)$$
- Coste lineal a pesar de dividir el problema por dos, ya que tenemos que resolver dos problemas.
- El árbol de recursión tiene del orden de $2^h$ nodos ($2\cdot2^h-1$ si es completo), donde h es la altura del árbol, pero en este problema $h=\log_2 n$. La función exponencial se cancela con la logarítmica: el árbol tiene 2n-1 nodos, y cada uno requiere $\Theta(1)$ operaciones. $T(n)\in\Theta(n)$. (Niveles: 1, 2, 4, 8, ..., $2^{\log_2 n}=n$ nodos.)

### Problema de ordenación
- Algoritmos: Insert-sort; Select-sort; Merge-sort (divide y vencerás); Quicksort (divide y vencerás); Quickselect (algoritmo de búsqueda, no de ordenación).
- Entradas: una lista a de n números $[a_0,a_1,\dots,a_{n-1}]$. Salidas: una permutación (reordenación) $[a'_0,a'_1,\dots,a'_{n-1}]$ de los elementos de a tal que $a'_1\le a'_2\le\cdots\le a'_n$.
- Tamaño del problema: n. Casos base: si n≤1 se devuelve la lista de entrada (n podría ser 0, en cuyo caso se devolvería una lista vacía).
- La descomposición que escojamos determinará el algoritmo a desarrollar.

### Insert-sort
- Descomposición: eliminar el último elemento de la lista de entrada. Ej.: [2,1,9,6,4] → [1,2,4,6,9]; subproblema [2,1,9,6] → [1,2,6,9]; combinación: inserta 4 en lista ordenada.
```python
def insert_sort_rec(a):
    if len(a) <= 1:
        return a
    else:
        return inserta_en_lista_ordenada(
            insert_sort_rec(a[:-1]), a[-1])
```
- Ejercicio para casa: inserta_en_lista_ordenada().

### Select-sort
- Descomposición: eliminar el menor elemento de la lista de entrada. Ej.: [7,5,3,8,4] → [3,4,5,7,8]; subproblema [5,7,8,4] → [4,5,7,8]; combinación: concatena [3].
```python
def select_sort_rec(a):
    if len(a) <= 1:
        return a
    else:
        m = min(a)
        a.remove(m)
        return [m] + select_sort_rec(a)
```
- Alternativas que no modifican la lista de entrada:
```python
def select_sort_rec(a):
    if len(a) <= 1:
        return a
    else:
        b = list(a)
        min_index = b.index(min(b))
        aux = b[min_index]
        b[min_index] = b[0]
        b[0] = aux
        return [aux] + select_sort_rec(b[1:])

def select_sort_rec(a):
    if len(a) <= 1:
        return a
    else:
        b = list(a)
        m = min(b)
        b.remove(m)
        return [m] + select_sort_rec(b)
```

### Merge-sort
- Descomposición: dividir la lista de entrada en dos mitades. Ej.: [7,3,4,8,4,6,4,6] → [3,4,4,4,6,6,7,8]; subproblemas [7,3,4,8] → [3,4,7,8] y [4,6,4,6] → [4,4,6,6]; combinación: mezcla.
```python
def merge_sort(a): # Versión out-of-place
    n = len(a)
    if n <= 1:
        return a
    else:
        mitad = n//2
        a1 = merge_sort(a[:mitad])
        a2 = merge_sort(a[mitad:])
        return mezcla(a1, a2)

# Versión recursiva sencilla. Es preferible una versión iterativa
# Las listas a and b están ordenadas de menor a mayor
def mezcla(a, b):
    if a == []:
        return b
    elif b == []:
        return a
    else:
        if a[0] < b[0]:
            return [a[0]] + mezcla(a[1:], b)
        else:
            return [b[0]] + mezcla(a, b[1:])
```

### Merge-sort - Versión in-place más eficiente
```python
# Versión in-place, más eficiente
def merge_sort_limites(a,ini,fin):
    if ini<fin:
        mitad = (ini+fin)//2
        merge_sort_limites(a,ini,mitad)
        merge_sort_limites(a,mitad+1,fin)
        a[ini:fin+1] = mezcla_limites(a,ini,mitad,mitad+1,fin)


def mezcla_limites(a,aI,aF,bI,bF):
    if aI>aF:
        return a[bI:bF+1]
    elif bI>bF:
        return a[aI:aF+1]
    else:
        if a[aI]<a[bI]:
            return [a[aI]] + mezcla_limites(a,aI+1,aF,bI,bF)
        else:
            return [a[bI]] + mezcla_limites(a,aI,aF,bI+1,bF)
```

### Merge-sort - Coste computacional
- Coste en tiempo:
$$T(n)=\begin{cases}1 & n=1\\ n+2T(n/2) & n>1\end{cases}=n\log_2(n)+n\in\Theta(n\log n)$$
- $\Theta(n\log n)$ en todos los casos: mejor, peor, y medio.
- ¿Cuál es el tiempo si no se divide el vector por la mitad, sino según un 10% y 90%? También $\Theta(n\log n)$.
- Memoria auxiliar. "In-place": la ordenación se realiza en el propio vector. "Out-of-place": se requiere un vector auxiliar de tamaño n; es decir, la ordenación no se realiza en el propio vector.

### Merge-sort paso a paso
- [38,27,43,3,9,82,10] → se divide en [38,27,43,3] y [9,82,10] → [38,27],[43,3],[9],[82,10]... hasta listas de un elemento → se mezclan: [27,38],[3,43] → [3,27,38,43]; [9],[10,82] → [9,10,82] → resultado [3,9,10,27,38,43,82].
- Para diseñar el código, es mejor pensar en el esquema: descomponer el problema; obtener soluciones de subproblemas (automáticamente) a través de llamadas recursivas; combinar soluciones.

### Quicksort
- Descomposición: se escoge un elemento "pivote". Se divide la lista en tres partes: parte izquierda (elementos menores o iguales que el pivote), el propio pivote, parte derecha (elementos mayores que el pivote). Ej.: [6,4,1,7,4,7,3,6,5] con pivote 4 → [4,1,3] 4 [6,7,7,6,5]. Posteriormente se ordenan las partes izquierda y derecha.
- Combinación: trivial: la lista ya está ordenada, no hay que hacer nada más.
- El pivote puede ser el primero, el central, uno al azar...
- Ejemplo alternativo: [26,5,37,1,61,11,59,15,48,19] → descomponer → [11,5,19,1,15] 26 [59,61,48,37] → soluciones de subproblemas (recursivo) → [1,5,11,15,19,26,37,48,59,61] → combinación trivial.
```python
def quick_sort_inplace(a, ini, fin):
    if ini < fin:
        indice_pivote = particion_Hoare(a, ini, fin)

        quick_sort_inplace(a, ini, indice_pivote - 1)
        quick_sort_inplace(a, indice_pivote + 1, fin)
```
- Partición de Hoare: algoritmo iterativo para realizar la descomposición. Se usa en otros algoritmos (quickselect). Después de las llamadas recursivas la lista ya queda ordenada.

### Partición de Hoare
- Idea: se coloca el pivote (el elemento central) en la posición ini intercambiándolo; izqa avanza desde ini+1 mientras a[izqa] ≤ pivote; dcha retrocede desde fin mientras a[dcha] > pivote; si izqa < dcha se intercambian; se repite hasta que izqa > dcha; finalmente se intercambia el pivote con a[dcha].
```python
def particion_Hoare(a,ini,fin):
    if fin >=0:
        mitad = (ini+fin)//2
        pivote = a[mitad]
        a[mitad] = a[ini]
        a[ini] = pivote

        izqa = ini+1
        dcha = fin

        ha_terminado = False
        while not ha_terminado:

            while izqa <=fin and a[izqa]<=pivote:
                izqa = izqa+1

            while a[dcha]>pivote:
                dcha = dcha-1

            if izqa<dcha:
                aux = a[izqa];
                a[izqa] = a[dcha];
                a[dcha] = aux;

            ha_terminado = izqa>dcha

        a[ini] = a[dcha]
        a[dcha] = pivote

        return dcha
```

### Quicksort - Coste
- Caso mejor (el elemento pivote está en la mitad):
$$T(n)=\begin{cases}1 & n=1\\ 2T(n/2)+\Theta(n) & n>1\end{cases}\Rightarrow\Theta(n\log n)$$
- Caso peor (un subvector queda siempre vacío):
$$T(n)=\begin{cases}1 & n=1\\ T(1)+T(n-1)+\Theta(n) & n>1\end{cases}\Rightarrow\Theta(n^2)$$
- Algoritmo de ordenación rápido en la práctica. Caso peor: $\Theta(n^2)$. Caso mejor: $\Theta(n\log n)$. Caso medio: $\Theta(n\log n)$.
- Suele superar a otros algoritmos $\Theta(n\log n)$ al utilizar mejor las jerarquías de memoria.
- Memoria auxiliar: $O(n)$. Puede ser "out-of-place" o "in-place" (la ordenación no se realiza en el propio vector).

### Búsqueda del k-ésimo elemento más pequeño
- Dada una lista a de n números, encontrar el k-ésimo elemento más pequeño. Ejemplo: para a=[4,3,7,7,2,5,1,8,9,2,1], y k=5, el algoritmo devuelve 3, ya que es el 5º elemento de la lista ordenada [1,1,2,2,3,4,5,7,7,8,9].
- Caso general de la búsqueda de la mediana. Veremos el algoritmo Quickselect: basado en la partición de Hoare; solo realiza una llamada recursiva; estrictamente, no es un algoritmo de divide y vencerás.
- Aplica la partición de Hoare, ubicando el pivote donde quedaría en caso de ordenar la lista (índice ip). Si el pivote está en el índice k-1 se ha encontrado el k-ésimo elemento más pequeño. De lo contrario se sigue buscando, pero solo en la mitad donde se puede encontrar el elemento buscado (si ip > k-1, en la parte izquierda; si ip < k-1, en la derecha).
```python
def quickselect(a,ini,fin,k):
    if ini==fin:
        return a[ini]
    else:
        indice_pivote = particion_Hoare(a, ini, fin)

        if indice_pivote==k-1:
            return a[indice_pivote]
        elif indice_pivote<k-1:
            return quickselect(a,indice_pivote+1,fin,k)
        else:
            return quickselect(a,ini,indice_pivote-1,k)
```
- Coste medio: $O(n)$. Coste en el peor caso: $O(n^2)$.

### Multiplicación
- Multiplicación de números naturales en binario: algoritmo de Karatsuba.
- Multiplicación de matrices: descomposiciones recursivas; algoritmo de Strassen.

### Multiplicación rápida de números en binario
- Dados dos números enteros no negativos x e y, expresados en binario mediante $b_x$ y $b_y$ bits, respectivamente, hallar el producto xy.
- Tamaño del problema: mín(x,y). Casos base: si x=0 o y=0 (es decir, si mín(x,y)=0) el resultado es 0; si x=1 el resultado es y; si y=1 el resultado es x.
- Descomposición: $x=a\cdot2^m+b$, $y=c\cdot2^m+d$, con $m=\min\left(\lfloor b_x/2\rfloor,\lfloor b_y/2\rfloor\right)$.
- Ejemplo. Para x=594 e y=69: $x=1001010010_2=\underbrace{1001010}_{a=74}\underbrace{010}_{b=2}=74\cdot2^3+2$; $y=1000101_2=\underbrace{1000}_{c=8}\underbrace{101}_{d=5}=8\cdot2^3+5$; $b_x=10$, $b_y=7$, m=3, a=74, b=2, c=8, d=5.
- Regla recursiva básica (lenta): $xy=(a\cdot2^m+b)(c\cdot2^m+d)=ac\,2^{2m}+(ad+bc)2^m+bd$. 4 llamadas recursivas (4 "subproductos"). Si x e y tienen n bits el coste en tiempo es:
$$T(n)=\begin{cases}1 & n\le1\\ 4T(n/2)+en+f & n>1\end{cases}\qquad T(n)\in\Theta(n^2)$$
- Regla recursiva rápida (algoritmo de Karatsuba): $xy=ac\,2^{2m}+[(a+b)(c+d)-ac-bd]2^m+bd$. 3 llamadas recursivas (3 "subproductos"). Coste:
$$T(n)=\begin{cases}1 & n\le1\\ 3T(n/2)+en+f & n>1\end{cases}\qquad T(n)\in\Theta(n^{\log_2 3})=\Theta(n^{1{,}585\dots})$$
```python
def numero_de_bits(n):
    if n < 2:
        return 1
    else:
        return 1 + numero_de_bits(n >> 1)

def multiplicacion_karatsuba(x, y):
    if x == 0 or y == 0:
        return 0
    elif x == 1:
        return y
    elif y == 1:
        return x
    else:
        n_bits_x = numero_de_bits(x)
        n_bits_y = numero_de_bits(y)

        m = min(n_bits_x // 2, n_bits_y // 2)

        a = x >> m             # << y >> son operaciones de desplazamiento de bits
        b = x - (a << m)       # (z << m) equivale a z*(2**m)
        c = y >> m             # (z >> m) equivale a z//(2**m)
        d = y - (c << m)

        ac = multiplicacion_karatsuba(a, c)
        bd = multiplicacion_karatsuba(b, d)
        t = multiplicacion_karatsuba(a + b, c + d) - ac - bd

        return (ac << (2 * m)) + (t << m) + bd
```

### Multiplicación de matrices
- La división de una matriz en bloques tiene varias ventajas: simplifica operaciones algebraicas; se puede aprovechar para construir algoritmos eficientes que hagan buen uso de la memoria caché.
- Para realizar una multiplicación hay varias formas de dividir la matriz:
$$A\cdot B=\begin{pmatrix}A_1\\A_2\end{pmatrix}\cdot\begin{pmatrix}B_1&B_2\end{pmatrix}=\begin{pmatrix}A_1B_1&A_1B_2\\A_2B_1&A_2B_2\end{pmatrix}$$
$$A\cdot B=\begin{pmatrix}A_1&A_2\end{pmatrix}\cdot\begin{pmatrix}B_1\\B_2\end{pmatrix}=\begin{pmatrix}A_1B_1+A_2B_2\end{pmatrix}$$
$$A\cdot B=\begin{pmatrix}A_{11}&A_{12}\\A_{21}&A_{22}\end{pmatrix}\begin{pmatrix}B_{11}&B_{12}\\B_{21}&B_{22}\end{pmatrix}=\begin{pmatrix}A_{11}B_{11}+A_{12}B_{21}&A_{11}B_{12}+A_{12}B_{22}\\A_{21}B_{11}+A_{22}B_{21}&A_{21}B_{12}+A_{22}B_{22}\end{pmatrix}$$

### Multiplicación de matrices - complejidad
- Sea A una matriz de $p\times q$, y B una matriz de $q\times r$. El producto C=AB requiere $O(pqr)$ operaciones.
- Considérese que las matrices son cuadradas de dimensión $n\times n$, y la descomposición en 4 bloques anterior:
$$T(n)=\begin{cases}1 & n=1\\ 8T(n/2)+4\Theta(n^2) & n>1\end{cases}$$
- 8 multiplicaciones (de matrices de $n/2\times n/2$), 4 sumas (de matrices de $n/2\times n/2$). Por el teorema maestro: $T(n)=\Theta(n^{\log_2 8})=\Theta(n^3)$.
```python
import numpy as np

def mult_mat(A, B):
    p = A.shape[0]; q = A.shape[1]; r = B.shape[1]

    if p == 0 or q == 0 or r == 0:
        return np.zeros((p, r))
    elif p == 1 and q == 1 and r == 1:
        return np.matrix([[A[0, 0] * B[0, 0]]])
    else:
        A11 = A[0:p // 2, 0:q // 2]; A21 = A[p // 2:p, 0:q // 2]
        A12 = A[0:p // 2, q // 2:q]; A22 = A[p // 2:p, q // 2:q]

        B11 = B[0:q // 2, 0:r // 2]; B21 = B[q // 2:q, 0:r // 2]
        B12 = B[0:q // 2, r // 2:r]; B22 = B[q // 2:q, r // 2:r]

        C11 = mult_mat(A11, B11) + mult_mat(A12, B21)
        C12 = mult_mat(A11, B12) + mult_mat(A12, B22)
        C21 = mult_mat(A21, B11) + mult_mat(A22, B21)
        C22 = mult_mat(A21, B12) + mult_mat(A22, B22)

        return np.vstack([np.hstack([C11, C12]),
                          np.hstack([C21, C22])])

A = np.matrix([[2, 3, 1, -3], [4, -2, 1, 2]])
B = np.matrix([[2, 3, 1], [4, -1, -5], [0, -6, 3], [1, -1, 1]])
print(mult_mat(A, B))
```

### Multiplicación de matrices - algoritmo de Strassen
- La operación básica más costosa es la multiplicación. El algoritmo de Strassen consigue reducir el número de multiplicaciones. Con la descomposición en bloques $\begin{pmatrix}A_{11}&A_{12}\\A_{21}&A_{22}\end{pmatrix}\begin{pmatrix}B_{11}&B_{12}\\B_{21}&B_{22}\end{pmatrix}=\begin{pmatrix}C_{11}&C_{12}\\C_{21}&C_{22}\end{pmatrix}$:
$$\begin{aligned}M_1&=(A_{11}+A_{22})(B_{11}+B_{22})&C_{11}&=M_1+M_4-M_5+M_7\\M_2&=(A_{21}+A_{22})B_{11}&C_{12}&=M_3+M_5\\M_3&=A_{11}(B_{12}-B_{22})&C_{21}&=M_2+M_4\\M_4&=A_{22}(B_{21}-B_{11})&C_{22}&=M_1-M_2+M_3+M_6\\M_5&=(A_{11}+A_{12})B_{22}\\M_6&=(A_{21}-A_{11})(B_{11}+B_{12})\\M_7&=(A_{12}-A_{22})(B_{21}+B_{22})\end{aligned}$$
- Con esa factorización el algoritmo requiere 7 multiplicaciones y 18 sumas:
$$T(n)=\begin{cases}1 & n=1\\ 7T(n/2)+18\Theta(n^2) & n>1\end{cases}$$
- Por el teorema maestro: $T(n)=\Theta(n^{\log_2 7})=\Theta(n^{2{,}807})$.
- Solo es más eficiente que una multiplicación ordinaria si el tamaño de las matrices es muy elevado. Actualmente hay un algoritmo en $O(n^{2{,}376})$ (Coppersmith-Winograd). En la práctica la mejor estrategia para acelerar el producto de dos matrices consiste en aprovechar la estructura jerárquica de la memoria.

### Embaldosado con L-triominós
- Se desea cubrir una cuadrícula de dimensiones $n\times n$, donde $n=2^k$ con $k\ge1$ es una potencia de dos, con L-triominós, donde solo un cuadrado no quede cubierto.
- Casos base: (cuadrícula 2×2 con un cuadrado sin cubrir, cubierto el resto por un triominó).
- Descomposición y casos recursivos: ubicar un triominó en el centro; realizar 4 llamadas recursivas con cuadrículas de lado n/2. Códigos 6.11, 6.12 y 6.13 en el libro.

### Permutación de inversión de bits
- Dada una lista a de $2^p$ números ($p\in\mathbb{N}^+$), devuelva otra lista a' que sea una permutación concreta de los elementos de a. En particular, $a'_j=a_i$ (y $a'_i=a_j$) donde j es el número que resulta de invertir los bits de i, asumiendo que i y j son números binarios de p bits.
- Relación entre i y j, para p=3: i=0→j=0; 1(001)→4(100); 2(010)→2(010); 3(011)→6(110); 4(100)→1(001); 5(101)→5(101); 6(110)→3(011); 7(111)→7(111). Permutación: a[0]=a'[0], a[1]=a'[4], a[2]=a'[2], a[3]=a'[6], a[4]=a'[1], a[5]=a'[5], a[6]=a'[3], a[7]=a'[7].
- Ejemplo 1: para p=5, $i=(b_4b_3b_2b_1b_0)_2\Leftrightarrow j=(b_0b_1b_2b_3b_4)_2$; $a'_{26}=a_{11}$ y $a'_{11}=a_{26}$, ya que $26=11010_2$ y $11=01011_2$.
- Ejemplo 2: para p=3, a=[3,5,7,2,4,8,1,6] ⇔ a'=[3,4,7,1,5,8,2,6], ya que para p=3 se intercambian los elementos de las posiciones 1 y 4, y los de las posiciones 3 y 6.
- Notas: el problema de inversión de bits es parte de implementaciones de la FFT (transformada rápida de Fourier). Hay algoritmos más eficientes que los que se describen a continuación.
- Tamaño: p. Caso base: si p=1 se devuelve la propia lista a (p=1 ⇔ n=2, n: longitud de a). Descomposiciones: veremos dos que conducen a diferentes algoritmos, y una tercera versión "iterativa". Para p=2 (n=4) se intercambian los dos elementos centrales (posiciones 1 y 2).

#### Solución I
- Descomposición: dividir la lista de entrada en dos mitades, resolver cada una e intercalar. [3,5,7,2,4,8,1,6] → mitades [3,5,7,2]→[3,7,5,2] y [4,8,1,6]→[4,1,8,6] → intercala → [3,4,7,1,5,8,2,6].
```python
def intercala(a1,a2):
    if len(a1)==1:
        return [a1[0],a2[0]]
    else:
        return [a1[0]] + [a2[0]] + intercala(a1[1:],a2[1:])


def invbitperm1(a):
    if len(a)<=2:
        return a
    else:
        mitad = len(a)//2
        a1 = invbitperm1(a[:mitad])
        a2 = invbitperm1(a[mitad:])
        return intercala(a1,a2)
```

#### Solución II
- Descomposición: listas de índices pares e impares, resolver cada una y concatenar. [3,5,7,2,4,8,1,6] → pares [3,7,4,1]→[3,4,7,1] e impares [5,2,8,6]→[5,8,2,6] → concatena → [3,4,7,1,5,8,2,6].
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

#### Solución III
- Descomposición: dividir la lista en dos mitades. Caso base: si la lista tiene un elemento, se calcula el índice invertido, y se actualiza una segunda lista que almacene la solución (análogo a un algoritmo iterativo).
```python
def indice_invertido(x,p):
    if p==1:
        return x
    else:
        return indice_invertido(x//2,p-1) + (x%2)*2**(p-1)


def invbitperm3(a,ini,fin,b,p):
    if ini==fin:
        i = indice_invertido(ini,p)
        b[i] = a[ini]
    else:
        mitad = (ini+fin)//2
        invbitperm3(a,ini,mitad,b,p)
        invbitperm3(a,mitad+1,fin,b,p)
```
