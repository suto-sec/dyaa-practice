# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1
**Paso 1. Tamaño y caso base.** El tamaño es $n$, la dimensión. Una matriz $1\times1$ tiene como determinante su único elemento.

**Paso 2. Caso recursivo.** Se aplica la fórmula por la primera columna: para cada fila $i$ se construye la matriz complementaria $M_{i,0}$ (sin la fila $i$ ni la columna 0), se calcula su determinante recursivamente y se suma $(-1)^i\,a_{i,0}\,|M_{i,0}|$.

**Paso 3. Código.**
```python
import numpy as np

def determinante(A):
    n = len(A)
    if n == 1:
        return A[0][0]
    d = 0
    for i in range(n):
        M = np.copy(A)
        M = np.delete(M, i, 0)       # quita la fila i
        M = np.delete(M, 0, 1)       # quita la columna 0
        d += (-1) ** i * A[i][0] * determinante(M)
    return d
```

**Paso 4. Comprobación y coste.** Con $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$: $i=0$ da $a\cdot d$ y $i=1$ da $-c\cdot b$: $ad-bc$. Cada llamada hace $n$ llamadas de tamaño $n-1$: $T(n)=n\,T(n-1)+\Theta(n^2)\in\Theta(n!)$ (con los factores de copiar matrices).

### Ejercicio 2
**Paso 1. Qué es un ciclo euleriano.** Una secuencia de vértices que recorre cada arista exactamente una vez y acaba donde empezó. Si hay $m$ aristas, la secuencia tiene $m+1$ vértices.

**Paso 2. Condición previa (eficiencia).** Un ciclo euleriano exige que todos los vértices tengan grado par. Se comprueba al principio: si alguno es impar, se responde "no hay" sin buscar. (Con grados pares y todas las aristas en una sola componente siempre existe.)

**Paso 3. Solución parcial.** `camino` empieza en $[0]$. En cada nivel se elige una arista **no usada** que salga del último vértice $u$. Para marcar las usadas se pone `A[u][v] = A[v][u] = 0` y se restaura al volver atrás. Así un candidato es simplemente un $v$ con `A[u][v] == 1`.

**Paso 4. Solución completa.** Cuando `camino` tiene $m+1$ vértices ya se han usado todas las aristas. Como todos los grados son pares, el camino cerrado vuelve a $0$, pero se comprueba igualmente.

**Paso 5. Parar al encontrar.** La función devuelve un booleano: cuando una rama tiene éxito, devuelve `True` sin deshacer nada y las llamadas superiores terminan.

**Paso 6. Código.**
```python
def ciclo_euleriano(A):
    n = len(A)
    A = [fila[:] for fila in A]              # copia: se va modificando
    m = sum(sum(fila) for fila in A) // 2
    if any(sum(fila) % 2 for fila in A):     # grado impar: no hay ciclo
        return None
    camino = [0]

    def bt(u):
        if len(camino) == m + 1:
            return u == 0
        for v in range(n):
            if A[u][v] == 1:
                A[u][v] = A[v][u] = 0        # usa la arista
                camino.append(v)
                if bt(v):
                    return True
                camino.pop()
                A[u][v] = A[v][u] = 1        # vuelta atrás
        return False

    return camino if bt(0) else None

# ciclo_euleriano(A) con la matriz del enunciado devuelve
# [0, 1, 2, 3, 1, 4, 3, 5, 4, 2, 0]
```

**Paso 7. Comprobación y coste.** El grafo del enunciado tiene grados $2,4,4,4,4,2$ (todos pares) y $10$ aristas, así que devuelve un camino de $11$ vértices que empieza y acaba en $0$. La secuencia exacta depende del orden en que se recorren los vecinos, y el enunciado sólo da una de las posibles. En el peor caso el coste es exponencial; la comprobación de grados evita buscar cuando no puede haber solución, y marcar las aristas usadas sobre la matriz evita recorrerlas dos veces.
