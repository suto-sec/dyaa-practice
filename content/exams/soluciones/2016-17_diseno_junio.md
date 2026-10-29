# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1
**Paso 1. Qué se combina.** Cada número tiene su conjunto de dígitos (array de 10 booleanos). Los dígitos comunes a toda la lista son la intersección, es decir, la conjunción posición a posición.

**Paso 2. Divide y vencerás.** Se parte la lista en dos mitades, se resuelve cada una y se combinan los resultados con un AND elemento a elemento.

**Paso 3. Caso base.** Lista de un elemento: sus dígitos. Se asume la lista no vacía.

**Paso 4. Código.**
```python
def digitos(x):
    d = [False] * 10
    while True:
        d[x % 10] = True
        x //= 10
        if x == 0:
            break
    return d

def comunes(a, ini, fin):
    if ini == fin:
        return digitos(a[ini])
    m = (ini + fin) // 2
    izq = comunes(a, ini, m)
    der = comunes(a, m + 1, fin)
    return [i and d for i, d in zip(izq, der)]

# comunes([2348, 1349, 7523, 3215], 0, 3) -> sólo True en la posición 3
```

**Paso 5. Coste.** $T(n)=2T(n/2)+\Theta(1)$ (combinar cuesta $10$ operaciones) más el coste de los casos base, que es el número de cifras de cada número. Con $d$ cifras como máximo por número: $\Theta(n\,d)$.

### Ejercicio 2
**Paso 1. Estrategia.** Ordenar $v$ y emparejar el menor con el mayor, el segundo menor con el segundo mayor, y así: $(v_0,v_{n-1}),(v_1,v_{n-2}),\dots$

**Paso 2. Ejemplo.** $v$ ordenado es $[-3,-1,0,2,5,7,9,12]$. Los pares son $(-3,12),(-1,9),(0,7),(2,5)$ con sumas $9,8,7,7$. El máximo es $9$, el óptimo del enunciado.

**Paso 3. Por qué es óptimo (intercambio).** Sean $a$ el menor y $z$ el mayor, y supón una solución óptima donde $a$ va con $y$ y $z$ con $x$ (si ya van juntos no hay nada que hacer). Como $a\le x$ y $y\le z$:
- el máximo de esos dos pares es $\ge x+z$.
- si se cambian por $(a,z)$ y $(x,y)$: $a+z\le x+z$ y $x+y\le x+z$.

El nuevo máximo no supera al anterior, así que existe una solución óptima con $(a,z)$. Se repite el argumento con los $n-2$ elementos restantes.

**Paso 4. Coste.** Dominado por la ordenación: $\Theta(n\log n)$. El emparejado es $\Theta(n)$.

### Ejercicio 3
**Paso 1. Reformulación.** Hay que repartir cada elemento en $A$ o en $B$ con suma de $A$ igual a la de $B$. Entonces cada una vale $\text{objetivo}=\frac{\sum S}{2}$. Si la suma total es impar no hay solución.

**Paso 2. Esquema de subconjuntos.** Un árbol binario por posición: el elemento $i$ va a $A$ o a $B$ (`en_A[i]`). Se lleva `suma_A`, y la de $B$ se deduce.

**Paso 3. Poda.** Los enteros pueden ser negativos, así que no basta con cortar cuando `suma_A` supera el objetivo. Se precalcula, para cada $i$, la suma de los positivos que quedan (`pos[i]`) y de los negativos (`neg[i]`). Desde `suma_A` ya no se puede llegar al objetivo si `suma_A + pos[i] < objetivo` (aunque se tomen todos los positivos, no se alcanza) o `suma_A + neg[i] > objetivo` (aunque se tomen todos los negativos, se pasa). Con todos los números positivos la segunda condición no corta nada y la primera da la poda habitual.

**Paso 4. Sin duplicados.** Las particiones $(A,B)$ y $(B,A)$ son la misma. Se fija el primer elemento en $A$ y se empieza en $i=1$.

**Paso 5. Código.**
```python
def particiones(S):
    n = len(S)
    total = sum(S)
    if n == 0 or total % 2 != 0:
        return
    objetivo = total // 2
    pos, neg = [0] * (n + 1), [0] * (n + 1)
    for i in range(n - 1, -1, -1):
        pos[i] = pos[i + 1] + max(S[i], 0)
        neg[i] = neg[i + 1] + min(S[i], 0)
    en_A = [False] * n
    en_A[0] = True

    def bt(i, suma_A):
        if suma_A + pos[i] < objetivo or suma_A + neg[i] > objetivo:
            return
        if i == n:
            print([S[k] for k in range(n) if en_A[k]],
                  [S[k] for k in range(n) if not en_A[k]])
            return
        for opcion in (True, False):
            en_A[i] = opcion
            bt(i + 1, suma_A + (S[i] if opcion else 0))

    bt(1, S[0])
```

**Paso 6. Comprobación y coste.** Con $S=[1,2,3,4,5,9]$ el objetivo es $12$ y se imprimen `[1, 2, 4, 5] [3, 9]` y `[1, 2, 9] [3, 4, 5]`. En una hoja ($i=n$) las sumas restantes valen $0$, así que la poda sólo deja pasar `suma_A == objetivo`. En el peor caso es $O(n\,2^n)$ y las podas lo reducen en la práctica.
