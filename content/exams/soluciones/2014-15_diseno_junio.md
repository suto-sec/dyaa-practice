# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1
**Paso 1. Tamaño del problema.** El número de cifras de $n$ en base $b$, es decir $\lfloor\log_b n\rfloor+1$. Cada división entre $b$ quita una cifra.

**Paso 2. Caso base.** $n=0$: no quedan cifras, el resultado es $0$.

**Paso 3. Caso recursivo.** El resto $n\%b$ es la última cifra (la menos significativa) y $n/b$ es el número sin ella. Si $r$ es el resultado de convertir $n/b$, el de $n$ es $r$ con la cifra $n\%b$ añadida a la derecha: $10\cdot r+n\%b$.

**Paso 4. Código.**
```python
def cambio_base(n, b):
    if n == 0:
        return 0
    return cambio_base(n // b, b) * 10 + n % b
```

**Paso 5. Comprobación y coste.** Para $n=142$, $b=5$: `cambio_base(1)` $=0\cdot10+1=1$; `cambio_base(5)` $=1\cdot10+0=10$; `cambio_base(28)` $=10\cdot10+3=103$; `cambio_base(142)` $=103\cdot10+2=1032$. Hay una llamada por cifra: $\Theta(\log_b n)$.

### Ejercicio 2
**Paso 1. Qué hay que hacer.** Con $A$ de $m\times p$ y $B$ de $p\times q$, se parte cada dimensión por la mitad ($m_1=\lfloor m/2\rfloor$, $p_1=\lfloor p/2\rfloor$, $q_1=\lfloor q/2\rfloor$). Así los bloques cuadran aunque las matrices no sean cuadradas: $A_{11}$ es $m_1\times p_1$, $B_{11}$ es $p_1\times q_1$, y $A_{12}B_{21}$ tiene el mismo tamaño que $A_{11}B_{11}$.

**Paso 2. Caso base.** Si alguna de las tres dimensiones vale 1 no se puede partir más: se multiplica con la definición (un solo bucle largo, no hay nada que repartir). Si las tres son $\ge2$, cada mitad es $\ge1$ y los bloques nunca quedan vacíos.

**Paso 3. Funciones auxiliares.** Extraer un bloque, sumar dos matrices del mismo tamaño y pegar los cuatro bloques del resultado.

**Paso 4. Código.**
```python
def bloque(M, f0, f1, c0, c1):
    return [fila[c0:c1] for fila in M[f0:f1]]

def suma(A, B):
    return [[a + b for a, b in zip(fa, fb)] for fa, fb in zip(A, B)]

def une(C11, C12, C21, C22):
    return ([f1 + f2 for f1, f2 in zip(C11, C12)] +
            [f1 + f2 for f1, f2 in zip(C21, C22)])

def producto_directo(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B)))
             for j in range(len(B[0]))] for i in range(len(A))]

def producto(A, B):
    m, p, q = len(A), len(B), len(B[0])
    if m == 1 or p == 1 or q == 1:
        return producto_directo(A, B)
    m1, p1, q1 = m // 2, p // 2, q // 2
    A11, A12 = bloque(A, 0, m1, 0, p1), bloque(A, 0, m1, p1, p)
    A21, A22 = bloque(A, m1, m, 0, p1), bloque(A, m1, m, p1, p)
    B11, B12 = bloque(B, 0, p1, 0, q1), bloque(B, 0, p1, q1, q)
    B21, B22 = bloque(B, p1, p, 0, q1), bloque(B, p1, p, q1, q)
    return une(suma(producto(A11, B11), producto(A12, B21)),
               suma(producto(A11, B12), producto(A12, B22)),
               suma(producto(A21, B11), producto(A22, B21)),
               suma(producto(A21, B12), producto(A22, B22)))
```

**Paso 5. Coste.** Para matrices $n\times n$ hay 8 productos de tamaño $n/2$ y sumas y copias de coste $\Theta(n^2)$: $T(n)=8T(n/2)+\Theta(n^2)\in\Theta(n^3)$, igual que el algoritmo directo. Dividir no mejora el coste, sólo lo reparte.

### Ejercicio 3
**Paso 1. Solución parcial.** `sol[i]` es la columna de la torre de la fila `i`. Una torre por fila queda garantizada por construcción: se decide una fila por nivel. Falta que no se repitan columnas.

**Paso 2. Restricción.** Un vector `usada` de booleanos dice qué columnas ya tienen torre. Una columna sólo es candidata si no está usada, así las podas se hacen antes de bajar y no se generan tableros inválidos. Con esto las soluciones son exactamente las permutaciones de $0,\dots,n-1$ ($n!$ soluciones).

**Paso 3. Código.** Se marca la columna antes de la llamada y se desmarca después (vuelta atrás).
```python
def torres(i, sol, usada):
    n = len(sol)
    if i == n:
        print(sol)                       # p.ej. [0, 2, 1, 3]
        return
    for c in range(n):
        if not usada[c]:
            usada[c] = True
            sol[i] = c
            torres(i + 1, sol, usada)
            usada[c] = False

def torres_wrapper(n):
    torres(0, [None] * n, [False] * n)
```

**Paso 4. Comprobación y coste.** Para $n=4$ imprime, entre otras, `[0, 2, 1, 3]`, que es el tablero del enunciado (torres en $(0,0),(1,2),(2,1),(3,3)$). Hay $n!$ hojas y cada impresión cuesta $O(n)$: $O(n\cdot n!)$.
