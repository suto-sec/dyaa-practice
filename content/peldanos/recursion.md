# Orden de los ejercicios de Diseño recursivo básico
stage: recursion

## Orden
- t4-intro: 3.6 3.1 3.2 9.1 3.9 3.4
- t4-paradigma: 3.5 3.3 3.10
- t4-listas: 3.7 3.8 R02 4.13 5.4 R01 R05
- t4-secuencias: 4.12 4.4 5.1 9.3 R04 5.2 9.6 9.8
- t4-manhattan: 4.16 R03 5.9 9.7
- t4-binaria: 4.15 5.6 4.17 5.5 5.7 5.8 9.5 5.3

### R02 · Una lista de resultados sobre pares consecutivos
nivel: 0.85

Diseña una función recursiva `maximos_consecutivos(a)` que devuelva la lista de los máximos de cada pareja de elementos consecutivos: para `[1, 5, 10, -2, 1]` devuelve `[5, 10, 10, 1]`. Si la lista tiene menos de dos elementos, devuelve la lista vacía.
- a) Tamaño, caso base, descomposición y combinación.
- b) Código y prueba con el ejemplo.
- c) ¿Cuál es el coste si se usan sublistas `a[1:]`? ¿Y si se pasa un índice en vez de cortar?

#### Pista
La primera pareja es `(a[0], a[1])`. El resto de parejas son las de la lista sin su primer elemento. Combinar es poner el primer resultado delante.

#### Solución
**Paso 1. Esquema.** a) Tamaño: `len(a)`. Caso base: menos de $2$ elementos, lista vacía. Descomposición: `a[1:]`, que tiene un elemento menos y cuyas parejas son todas las de `a` salvo la primera. Combinación: `[max(a[0], a[1])] + resultado`.

**Paso 2. Código.** b)
```python
def maximos_consecutivos(a):
    if len(a) < 2:
        return []
    return [max(a[0], a[1])] + maximos_consecutivos(a[1:])
```
Con `[1,5,10,-2,1]`: `max(1,5)=5`, `max(5,10)=10`, `max(10,-2)=10`, `max(-2,1)=1`: `[5,10,10,1]`.

**Paso 3. Coste.** c) Cada llamada copia la sublista (`a[1:]`) y la lista resultado: $T(n)=T(n-1)+n$, es decir $\Theta(n^{2})$. Con un parámetro `i` (`maximos(a, i)`) no hay copias de la entrada y queda $T(n)=T(n-1)+c\in\Theta(n)$ (la concatenación del resultado se evita construyéndolo en una lista pasada como parámetro).

### R01 · Devolver dos listas a la vez
nivel: 0.9

Diseña `separa_signo(a)`, recursiva, que devuelva una pareja de listas: los elementos positivos de `a` y el resto (en el mismo orden). Para `[3, -1, 0, 4, -2]` devuelve `([3, 4], [-1, 0, -2])`.
- a) Esquema (tamaño, caso base, descomposición, combinación) y código.
- b) Ahora una variante: `pares_impares(a)` devuelve los elementos de los **índices** pares y los de los índices impares. Para `[10, 20, 30, 40, 50]` devuelve `([10, 30, 50], [20, 40])`. ¿Qué cambia en la combinación?

#### Pista
En ambas, el resultado de `a[1:]` es una pareja de listas; solo hay que decidir a cuál de las dos añadir `a[0]`. En (b), lo que era el índice $0$ de `a[1:]` pasa a ser el índice $1$ de `a`.

#### Solución
**Paso 1. Esquema.** a) Tamaño: `len(a)`. Caso base: lista vacía, devuelve `([], [])`. Descomposición: `a[1:]`. Combinación: el primer elemento va a una de las dos listas según su signo.
```python
def separa_signo(a):
    if a == []:
        return [], []
    pos, resto = separa_signo(a[1:])
    if a[0] > 0:
        return [a[0]] + pos, resto
    return pos, [a[0]] + resto
```
**Paso 2. Prueba.** `[3,-1,0,4,-2]`: `3` va a los positivos, `-1` y `0` al resto, `4` a positivos, `-2` al resto: `([3,4],[-1,0,-2])`.

**Paso 3. Por posición.** b) `a[0]` siempre está en el índice $0$ (par), así que va a la lista de pares. Y los pares de `a[1:]` pasan a ser impares en `a`, y viceversa: se intercambian.
```python
def pares_impares(a):
    if a == []:
        return [], []
    pares, impares = pares_impares(a[1:])
    return [a[0]] + impares, pares
```
Con `[10,20,30,40,50]` devuelve `([10,30,50],[20,40])`.

### R03 · La bisección recursiva
nivel: 0.8

Para hallar $\sqrt[3]{a}$ ($a>0$) se busca un cero de $f(x)=x^{3}-a$ en $[lo,hi]$ por bisección: se calcula el punto medio y se sigue en la mitad donde cambia el signo.
```python
def raiz_cubica(a, lo, hi, eps):
    if hi - lo < eps:
        return (lo + hi) / 2
    medio = (lo + hi) / 2
    if medio ** 3 < a:
        return raiz_cubica(a, medio, hi, eps)
    return raiz_cubica(a, lo, medio, eps)
```
- a) Traza `raiz_cubica(10, 0, 10, 0.5)`: intervalo de cada llamada.
- b) ¿Cuántas llamadas y qué devuelve? Compara con $\sqrt[3]{10}\approx2{,}154$.
- c) ¿Cuántas llamadas hacen falta en general?

#### Pista
En cada llamada el intervalo se divide a la mitad. Se sigue por la derecha si $medio^{3}<a$ (el cero está más allá) y por la izquierda en otro caso. Se para cuando el ancho es menor que `eps`.

#### Solución
**Paso 1. Traza.** a) $[0,10]$: medio $5$, $125\ge10$, sigue $[0,5]$. Medio $2{,}5$, $15{,}6\ge10$, sigue $[0,2{,}5]$. Medio $1{,}25$, $1{,}95<10$, sigue $[1{,}25,2{,}5]$. Medio $1{,}875$, $6{,}6<10$, sigue $[1{,}875,2{,}5]$. Medio $2{,}1875$, $10{,}47\ge10$, sigue $[1{,}875,2{,}1875]$, de ancho $0{,}3125<0{,}5$.

**Paso 2. Resultado.** b) $6$ llamadas. Devuelve el punto medio $2{,}03125$ (error de unos $0{,}12$, menor que `eps`).

**Paso 3. En general.** c) El ancho pasa de $hi-lo$ a $(hi-lo)/2^{k}$: hacen falta $\approx\log_2\frac{hi-lo}{eps}$ llamadas. Es decrementa y vencerás con $T(k)=T(k-1)+c$ sobre $k=\log_2$ del ancho relativo.

### R04 · Contar lo que aparece en un número
nivel: 0.85

Diseña `cuenta_digitos(n)`, recursiva, que devuelva una lista de $10$ posiciones con el número de veces que aparece cada dígito $0$–$9$ en el entero no negativo `n`. Por ejemplo, `cuenta_digitos(112358132)` devuelve `[0, 3, 2, 2, 0, 1, 0, 0, 1, 0]`.
- a) Tamaño, caso base, descomposición y combinación.
- b) Código y prueba.

#### Pista
La descomposición es quitar el último dígito: `n // 10`. El último dígito es `n % 10`. Combinar es sumar $1$ en la posición de ese dígito de la lista que ya tienes.

#### Solución
**Paso 1. Esquema.** a) Tamaño: número de dígitos. Caso base: `n < 10` (un solo dígito): una lista de ceros con un $1$ en la posición `n`. Descomposición: `n // 10`. Combinación: la lista de `n // 10` más $1$ en la posición `n % 10`.

**Paso 2. Código.** b)
```python
def cuenta_digitos(n):
    if n < 10:
        c = [0] * 10
        c[n] = 1
        return c
    c = cuenta_digitos(n // 10)
    c[n % 10] += 1
    return c
```
**Paso 3. Prueba.** Los dígitos de $112358132$ son $1,1,2,3,5,8,1,3,2$: el $1$ aparece $3$ veces, el $2$ y el $3$, $2$ veces, el $5$ y el $8$, una vez: `[0,3,2,2,0,1,0,0,1,0]`. Coste: $\Theta(\log n)$ llamadas.

### R05 · Menores de una matriz y determinante por adjuntos
nivel: 1.0

El determinante de una matriz $n\times n$ se puede definir recursivamente por la primera columna: $|A|=\sum_{i=0}^{n-1}(-1)^{i}\,a_{i,0}\,|M_{i,0}|$, donde $M_{i,0}$ es la matriz que queda al quitar la fila $i$ y la columna $0$. Con $|A|=a_{0,0}$ si es $1\times1$.
- a) Escribe `menor(A, i, j)` que devuelva `A` sin la fila `i` ni la columna `j` (listas de listas).
- b) Calcula a mano $|A|$ para $A=\begin{pmatrix}2&0&1\\1&3&2\\1&1&4\end{pmatrix}$.
- c) Escribe `det(A)` recursiva y comprueba con ese ejemplo.

#### Pista
Para (a) basta con una lista por comprensión sobre las filas distintas de `i`, quedándote en cada una con los elementos de columnas distintas de `j`. Para (b), cada menor es una matriz $2\times2$ con $|M|=ad-bc$.

#### Solución
**Paso 1. Menor.** a)
```python
def menor(A, i, j):
    return [[x for c, x in enumerate(fila) if c != j]
            for r, fila in enumerate(A) if r != i]
```
**Paso 2. A mano.** b) $|A|=2\begin{vmatrix}3&2\\1&4\end{vmatrix}-1\begin{vmatrix}0&1\\1&4\end{vmatrix}+1\begin{vmatrix}0&1\\3&2\end{vmatrix}=2(12-2)-1(0-1)+1(0-3)=20+1-3=18$.

**Paso 3. Recursiva.** c)
```python
def det(A):
    if len(A) == 1:
        return A[0][0]
    return sum((-1) ** i * A[i][0] * det(menor(A, i, 0)) for i in range(len(A)))
```
`det` del ejemplo da $18$. Cada llamada hace $n$ llamadas con tamaño $n-1$: $T(n)=nT(n-1)+\cdots\in\Theta(n!)$, por eso no se usa así en la práctica.
