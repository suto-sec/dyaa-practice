# Peldaños: Vuelta atrás (backtracking)
stage: backtracking

## Orden
- t6-binario: K01 K02
- t6-subconjuntos: K03 K15 7.1
- t6-permutaciones: K04 K05 7.3 K16 7.6
- t6-reinas: K06 K07 7.4
- t6-suma-caballo: K08 K09 7.5
- t6-otros: K10 K11 7.2 7.7
- t6-poda: K12 7.8

### K01 · Seguir el árbol binario de subconjuntos
nivel: 0.2

```python
def genera_subconjuntos(i, sol, elementos):
    if i == len(elementos):
        imprime_subconjunto(sol, elementos)     # un subconjunto por hoja
    else:
        for k in range(0, 2):
            sol[i] = k                           # 0 = no incluir, 1 = incluir
            genera_subconjuntos(i + 1, sol, elementos)
```
**Ejemplo resuelto.** Con `elementos = ['x']`: la raíz hace dos llamadas, `sol = [0]` (conjunto $\{\}$) y `sol = [1]` (conjunto $\{x\}$). Dos hojas, tres llamadas en total.

**Ahora tú**, con `elementos = ['x', 'y']`:
- a) Escribe los valores de `sol` en cada hoja, de izquierda a derecha, y el subconjunto que representan.
- b) ¿Cuántas llamadas se hacen en total?
- c) Y para $n=4$ elementos: ¿cuántas hojas y cuántas llamadas?

#### Pista
En cada nivel `sol[i]` decide si el elemento $i$ entra. El orden de las hojas es el orden en que `k` toma los valores $0$ y $1$ en cada nivel.

#### Solución
**Paso 1. Las hojas.** a) `[0,0]`$=\{\}$, `[0,1]`$=\{y\}$, `[1,0]`$=\{x\}$, `[1,1]`$=\{x,y\}$.

**Paso 2. Las llamadas.** b) $1$ (raíz) $+\,2+4=7$.

**Paso 3. Generaliza.** c) Con $n=4$: $2^{4}=16$ hojas, y $1+2+4+8+16=31=2^{5}-1$ llamadas.

### K02 · Subconjuntos de un tamaño, con poda
nivel: 0.35

Se quieren los subconjuntos de **exactamente $K$ elementos**. Se añade el parámetro `n_elegidos` (cuántos elementos hay ya en la solución parcial).
```python
def subconjuntos_de_tamano(i, sol, n_elegidos, K, elementos):
    if i == len(elementos):
        if n_elegidos == K:
            imprime_subconjunto(sol, elementos)
    else:
        for k in range(0, 2):
            if ________:                                  # poda
                sol[i] = k
                subconjuntos_de_tamano(i + 1, sol, n_elegidos + k, K, elementos)
```
- a) ¿Qué condición va en la poda para no seguir por ramas que ya se pasan de $K$?
- b) Con $n=4$ y $K=2$, ¿cuántas hojas se llegan a alcanzar y cuántas son solución?
- c) ¿Cuántas llamadas se hacen en total?

#### Pista
Añadir el elemento (`k = 1`) aumenta `n_elegidos` en $1$; no añadirlo (`k = 0`) lo deja igual. Una rama es inútil si `n_elegidos + k` ya supera $K$.

#### Solución
**Paso 1. Condición.** a) `n_elegidos + k <= K`.

**Paso 2. Hojas.** b) Se alcanzan las hojas con $0$, $1$ o $2$ unos: $\binom40+\binom41+\binom42=1+4+6=11$ de las $16$. Solo son solución las de exactamente $2$ unos: $6$.

**Paso 3. Llamadas.** c) $25$ en total (contando la raíz): la poda ahorra $6$ de las $31$ de K01.

**Paso 4. Mejora posible.** También se podría podar cuando ya no quedan elementos suficientes para llegar a $K$.

### K03 · Un subconjunto en cada nodo
nivel: 0.3

```python
def genera_subconjuntos_alt(i, j, sol, elementos):
    imprime_subconjunto_alt(sol, i, elementos)          # se imprime en CADA nodo
    for k in range(j + 1, len(elementos)):
        sol[i] = k                                      # k es el índice del elemento
        genera_subconjuntos_alt(i + 1, k, sol, elementos)
```
llamada inicial `genera_subconjuntos_alt(0, -1, sol, ['a','b','c'])`.
- a) Escribe, en orden, los subconjuntos que se imprimen, y el valor de `(i, j)` de cada llamada.
- b) ¿Cuántos nodos tiene el árbol? ¿Y con $n=4$?
- c) ¿Por qué el último elemento no tiene hijos?

#### Pista
`j` es el índice del último elemento incluido; los candidatos de un nodo son `j+1, j+2, ..., n-1`.

#### Solución
**Paso 1. El recorrido.** a) Raíz `(0,-1)`: $\{\}$. Primer hijo `k=0` $\to(1,0)$: $\{a\}$. Su primer hijo `k=1` $\to(2,1)$: $\{a,b\}$, y su hijo `k=2` $\to(3,2)$: $\{a,b,c\}$. Vuelve a $\{a\}$ y su segundo hijo `k=2` $\to(2,2)$: $\{a,c\}$. Después `k=1` en la raíz $\to(1,1)$: $\{b\}$, con su hijo $\{b,c\}$ $\to(2,2)$. Y por último `k=2` $\to(1,2)$: $\{c\}$.

**Paso 2. Orden.** $\{\},\{a\},\{a,b\},\{a,b,c\},\{a,c\},\{b\},\{b,c\},\{c\}$.

**Paso 3. Nodos.** b) $8=2^{3}$ para $n=3$, y $16$ para $n=4$: un nodo por subconjunto.

**Paso 4. Hojas.** c) Para el último elemento `j + 1 = n`, y `range(n, n)` está vacío: no hay candidatos.

### K04 · Seguir las permutaciones
nivel: 0.35

```python
def genera_permutaciones(i, libres, sol, elementos):
    n = len(elementos)
    if i == n:
        imprime_permutacion(sol)
    else:
        for k in range(0, n):
            if libres[k]:
                sol[i] = elementos[k]
                libres[k] = False
                genera_permutaciones(i + 1, libres, sol, elementos)
                libres[k] = True
```
con `elementos = [1, 2, 3]`.
- a) Escribe las permutaciones en el orden en que se imprimen.
- b) ¿Cuántas llamadas hay en cada nivel `i = 0, 1, 2, 3` y en total?
- c) ¿Por qué hace falta la línea `libres[k] = True`?

#### Pista
En el nivel $i$ hay $n-i$ elementos libres, y cada uno da una llamada. El nivel $i$ tiene tantas llamadas como caminos distintos hasta él.

#### Solución
**Paso 1. Orden.** a) $123,\ 132,\ 213,\ 231,\ 312,\ 321$. El primer elemento cambia más despacio.

**Paso 2. Llamadas.** b) Nivel $0$: $1$. Nivel $1$: $3$. Nivel $2$: $3\cdot2=6$. Nivel $3$: $3\cdot2\cdot1=6$. Total $16$. Con $n=4$ serían $1+4+12+24+24=65$.

**Paso 3. Deshacer.** c) `libres` se pasa por referencia y se comparte entre llamadas. Al volver de la llamada hay que marcar `k` como libre otra vez, o la siguiente rama (otro valor de `k`) lo vería ocupado y no generaría las demás permutaciones.

### K05 · Permutaciones con una restricción
nivel: 0.5

Un *desorden* de $[1,2,3,\dots,n]$ es una permutación en la que ningún elemento queda en su posición original (el $1$ no puede estar en la posición $1$, el $2$ en la $2$, ...).
- a) ¿Qué condición añades en el `if` del código de K04 para que se cumpla?
- b) Escribe los desórdenes de $[1,2,3]$.
- c) ¿Cuántos hay de $[1,2,3,4]$? Escríbelos.

#### Pista
En el nivel `i` (posición `i`, empezando en $0$), el elemento `elementos[k]` es el valor $k+1$. La posición original de ese valor es `k`. No debe cumplirse `k == i`.

#### Solución
**Paso 1. Condición.** a) `if libres[k] and k != i:`. La poda se hace al elegir, no al final.

**Paso 2. $n=3$.** b) $231$ y $312$. (No valen $123$, $132$, $213$ ni $321$: cada una deja algún elemento en su sitio.)

**Paso 3. $n=4$.** c) Son $9$: $2143,\ 2341,\ 2413,\ 3142,\ 3412,\ 3421,\ 4123,\ 4312,\ 4321$.

### K06 · N reinas, a mano hasta la primera solución
nivel: 0.4

Con $n=4$, la solución parcial `sol[i]` es la fila de la reina de la columna `i`, y el código de los apuntes prueba filas en el orden $k=0,1,2,3$. Una reina nueva en `(columna i, fila k)` es válida si no choca en fila ni en diagonal con las anteriores.
- a) Escribe las soluciones parciales que se visitan (una llamada por cada una), en orden, hasta encontrar la primera solución completa.
- b) ¿Cuál es? ¿Cuántas llamadas se han hecho?
- c) Explica por qué `(0, 2)` y `(0, 3)` no llegan a completarse.

#### Pista
Dos reinas están en la misma diagonal si $|\text{columna}_1-\text{columna}_2|=|\text{fila}_1-\text{fila}_2|$. Una solución parcial se visita aunque luego no se pueda ampliar.

#### Solución
**Paso 1. Recorrido.** a) `()` $\to$ `(0)` $\to$ `(0,2)` (la fila $0$ ya está usada y la $1$ choca en diagonal con la reina de la columna $0$) $\to$ sin candidatos: vuelta atrás. `(0,3)` $\to$ `(0,3,1)` $\to$ sin candidatos (la única fila libre, $2$, está en diagonal con la reina de la columna $2$): vuelta atrás, y la columna $1$ no tiene más filas. Se vuelve a la columna $0$ y se prueba `(1)` $\to$ `(1,3)` $\to$ `(1,3,0)` $\to$ `(1,3,0,2)`.

**Paso 2. Resultado.** b) La primera solución es $(1,3,0,2)$. Hay $9$ llamadas: `()`, `(0)`, `(0,2)`, `(0,3)`, `(0,3,1)`, `(1)`, `(1,3)`, `(1,3,0)`, `(1,3,0,2)`.

**Paso 3. Callejones.** c) `(0,2)`: en la columna $2$ solo quedan las filas $1$ y $3$; $(2,1)$ choca con $(1,2)$ en diagonal, y $(2,3)$ choca también con $(1,2)$. `(0,3)` sí admite una tercera reina `(0,3,1)`, pero entonces la última columna solo puede usar la fila $2$, y choca en diagonal con $(2,1)$.

### K07 · Los índices de las diagonales
nivel: 0.5

Los apuntes guardan las diagonales con dos listas booleanas: la diagonal principal de una reina en (columna `i`, fila `k`) tiene índice `i - k + n - 1`, y la secundaria `i + k`. Con $n=4$:
- a) ¿Cuántas diagonales de cada tipo hay y entre qué índices?
- b) Decide si se atacan por diagonal estas parejas (columna, fila): $(0,1)$ y $(2,3)$; $(0,2)$ y $(1,1)$; $(0,0)$ y $(1,2)$; $(1,3)$ y $(3,1)$.
- c) ¿Por qué no hace falta comprobar columnas?

#### Pista
Dos reinas se atacan por diagonal si tienen el mismo índice de diagonal principal o el mismo de secundaria. Calcula los dos índices de cada reina.

#### Solución
**Paso 1. Rangos.** a) La principal va de $-(n-1)+n-1=0$ hasta $(n-1)+n-1=2n-2=6$: $7$ diagonales, índices $0$ a $6$. La secundaria va de $0$ a $2(n-1)=6$: también $7$.

**Paso 2. Parejas.** b) $(0,1)$ y $(2,3)$: principal $0-1+3=2$ y $2-3+3=2$, iguales: **se atacan**. $(0,2)$ y $(1,1)$: secundaria $0+2=2$ y $1+1=2$: **se atacan**. $(0,0)$ y $(1,2)$: principales $3$ y $2$, secundarias $0$ y $3$: no se atacan. $(1,3)$ y $(3,1)$: secundarias $4$ y $4$: **se atacan**.

**Paso 3. Columnas.** c) Se coloca una sola reina por columna (cada nivel del árbol es una columna), así que nunca hay dos en la misma.

### K08 · Suma de subconjuntos a mano
nivel: 0.4

Con el código de los apuntes (esquema binario, `suma_parcial`, poda si `suma_parcial + k*L[i] > s`, y se imprime al llegar a `suma_parcial == s`), halla los subconjuntos de $L=[3,2,4]$ que suman $s=5$.
- a) Dibuja el árbol: cada nodo es la solución parcial y su suma.
- b) ¿Qué ramas se podan y por qué?
- c) ¿Qué subconjunto se encuentra? ¿Cuántas llamadas se han hecho (con la raíz)?

#### Pista
En cada nivel se decide si se incluye `L[i]` ($k=1$) o no ($k=0$). Cuando la suma llega a $s$ ya no se sigue bajando desde ese nodo.

#### Solución
**Paso 1. Recorrido.** a) Nodos (solución parcial y suma): `()`$_0$, `0`$_0$, `00`$_0$, `000`$_0$, `001`$_4$, `01`$_2$, `010`$_2$, `1`$_3$, `10`$_3$, `100`$_3$, `11`$_5$.

**Paso 2. Podas.** b) `011` se poda: $2+4=6>5$. `101` se poda: $3+4=7>5$. Con una suma que ya sobrepasa $s$, añadir números positivos nunca la reduce.

**Paso 3. Resultado.** c) En `11` la suma es $5$: el subconjunto $\{3,2\}$. En total son $11$ llamadas. Sin poda serían $2^{4}-1=15$.

### K09 · Los saltos del caballo
nivel: 0.55

En el código de los apuntes del caballo, con la lista `incr = [(1,-2),(2,-1),(2,1),(1,2),(-1,2),(-2,1),(-2,-1),(-1,-2)]`, el candidato `k` es la casilla `nueva_col = col + incr[k][0]` y `nueva_fila = fila + incr[k][1]`. El tablero es de $5\times5$ (índices de $0$ a $4$).
- a) Desde la fila $0$, columna $0$, ¿qué saltos son válidos y en qué orden se prueban?
- b) ¿Cuántos saltos válidos hay desde `(fila 0, col 1)`, `(fila 1, col 1)` y `(fila 2, col 2)`?
- c) ¿Para qué se vuelve a poner `B[nueva_fila][nueva_col] = 0` cuando no se encuentra solución?

#### Pista
Para cada una de las $8$ parejas, calcula la casilla y comprueba que $0\le$ fila $<5$ y $0\le$ columna $<5$ (y que la casilla no esté ya visitada, aquí todavía no hay ninguna).

#### Solución
**Paso 1. Desde (0,0).** a) Los candidatos $k=0,1$ dan fila $-2$ y $-1$: inválidos. $k=2$: columna $2$, fila $1$, válido. $k=3$: columna $1$, fila $2$, válido. $k=4,5,6,7$ dan columnas o filas negativas: inválidos. Orden: primero `(fila 1, col 2)` y después `(fila 2, col 1)`.

**Paso 2. Cuántos saltos.** b) Desde `(0,1)`: $3$. Desde `(1,1)`: $4$. Desde `(2,2)` (el centro): los $8$.

**Paso 3. Deshacer.** c) La casilla se marca como visitada al probar el salto. Si el resto de la ruta no se puede completar, se vuelve atrás y hay que dejarla libre para que otra ruta pueda pasar por ella.

### K10 · La mochila 0-1 por backtracking
nivel: 0.5

Objetos con pesos $p=(2,3,4)$ y valores $v=(3,4,5)$, y capacidad $C=5$. Se decide para cada objeto (en orden) si se mete ($1$) o no ($0$), y se poda si el peso no cabe.
- a) Dibuja el árbol de decisiones. En cada nodo anota (capacidad restante, valor acumulado).
- b) ¿Qué ramas se podan?
- c) ¿Qué hojas se alcanzan, cuál es el valor óptimo y qué objetos incluye?

#### Pista
La rama $1$ de un objeto de peso $p_i$ solo existe si $p_i\le$ capacidad restante.

#### Solución
**Paso 1. Hojas alcanzadas.** a) De izquierda a derecha, con `x = (x1,x2,x3)`: `000` (cap. $5$, valor $0$); `001` ($1$, $5$); `010` ($2$, $4$); `100` ($3$, $3$); `110` ($0$, $7$).

**Paso 2. Podas.** b) Tres: el objeto $3$ (peso $4$) no cabe después de `01` (queda $2$), ni después de `10` (queda $3$), ni después de `11` (queda $0$).

**Paso 3. Óptimo.** c) El mayor valor es $7$ con `110`: objetos $1$ y $2$ (peso $2+3=5$, valor $3+4=7$). Se han hecho $12$ llamadas, con $5$ hojas en lugar de las $8$ del árbol completo.

### K11 · El laberinto con vuelta atrás
nivel: 0.6

Matriz del laberinto (`E` = vacía, `W` = pared), entrada `(fila 0, col 0)`, salida `(fila 2, col 3)`:
```
E E E E
E W W E
E E W E
```
El código de los apuntes prueba, en este orden, las celdas: abajo, derecha, arriba, izquierda (`incr = [(0,1),(1,0),(0,-1),(-1,0)]`, con `nueva_col = col + incr[k][0]` y `nueva_fila = fila + incr[k][1]`). Una celda entra en el camino con `P` y, si no lleva a la salida, se vuelve a dejar `E`.
- a) Sigue el recorrido: ¿por dónde va primero y cuándo se vuelve atrás?
- b) ¿Qué camino final se obtiene? ¿Cuántas celdas se han marcado y luego desmarcado?

#### Pista
Desde `(0,0)`, "abajo" es `(1,0)`. Sigue siempre bajando mientras se pueda. Una celda con `P` ya no es `E`, así que no se vuelve a pisar.

#### Solución
**Paso 1. Primer intento.** a) Abajo a `(1,0)` y a `(2,0)`; desde ahí, abajo no existe y se prueba derecha: `(2,1)`. Desde `(2,1)`: abajo no existe, derecha es pared, arriba es pared (`(1,1)`), izquierda es `(2,0)`, que ya es `P`. Callejón: se desmarca `(2,1)`. En `(2,0)` no quedan opciones (arriba es `P`, izquierda no existe): se desmarca. En `(1,0)`, derecha es pared y arriba es `P`: se desmarca.

**Paso 2. Segundo intento.** De vuelta en `(0,0)`: abajo ya se probó; derecha, `(0,1)`, y de ahí `(0,2)`, `(0,3)`. Desde `(0,3)`, abajo es `(1,3)` y después `(2,3)`: es la salida.

**Paso 3. Resultado.** b) El camino es `(0,0)`, `(0,1)`, `(0,2)`, `(0,3)`, `(1,3)`, `(2,3)`. Se marcaron y desmarcaron $3$ celdas: `(1,0)`, `(2,0)` y `(2,1)`.

### K12 · Ramificación y poda
nivel: 0.7

Con la mochila de K10 ($p=(2,3,4)$, $v=(3,4,5)$, $C=5$) añadimos una segunda poda: se lleva el **máximo valor alcanzable** `max_v` (al principio, la suma de todos los valores, $12$); al no incluir el objeto $i$, `max_v` baja en $v_i$. Se poda la rama si `nuevo_max_v` no supera el mejor valor encontrado `v_opt` (al principio $-1$).
- a) Sigue el recorrido y anota qué ramas se podan por valor.
- b) ¿Cuántas llamadas se hacen ahora, frente a las $12$ de K10?
- c) ¿Por qué el orden en que se encuentran las soluciones influye en cuánto se poda?

#### Pista
La primera hoja (`000`) deja `v_opt = 0`. Después `001` da $5$. Para decidir si una rama no incluyendo un objeto puede mejorar $5$, calcula `max_v - v[i]`.

#### Solución
**Paso 1. Recorrido.** a) Hoja `000` ($v_{opt}=0$) y hoja `001` ($v_{opt}=5$). En `01`, no incluir el objeto $3$ da `max_v` $=12-3-5=4$ (no se incluyó el objeto $1$ ni el $3$): $4\le5$, se poda por valor. En `01`, incluirlo no cabe, se poda por capacidad. En `10`, no incluir el objeto $3$ da `max_v` $=12-4-5=3\le5$: se poda por valor, e incluirlo tampoco cabe. Por último, la hoja `110` mejora a $v_{opt}=7$.

**Paso 2. Llamadas.** b) $10$ llamadas, dos menos que en K10.

**Paso 3. El orden.** c) La poda por valor es más eficaz cuanto antes se encuentre una solución buena: con un `v_opt` alto, muchas ramas con `max_v` bajo se cortan pronto. Por eso suele ordenarse los objetos por valor (o valor por peso) antes de empezar.

### K15 · Subconjuntos con suma s, un subconjunto por nodo
nivel: 0.45

Con el esquema de K03 (un subconjunto en cada nodo, índices crecientes) se quieren los subconjuntos de $L=[3,2,4,1]$ cuyos elementos suman $s=5$. Completa el código:
```python
def subconjuntos_suma(i, j, sol, suma_parcial, L, s):
    if suma_parcial == s:
        imprime_subconjunto_alt(sol, i, L)
    if suma_parcial >= s:
        return
    for k in range(________, len(L)):
        if ________:                       # poda: no pasarse de s
            sol[i] = k
            subconjuntos_suma(________, k, sol, suma_parcial + L[k], L, s)
```
- a) Rellena los tres huecos.
- b) Escribe los subconjuntos que se imprimen, en orden, y cuántas llamadas se hacen (con la raíz).

#### Pista
Los candidatos de un nodo son los índices mayores que `j` (el último incluido). Un candidato `k` solo vale si `suma_parcial + L[k] <= s`. Al bajar un nivel, `i` aumenta en $1$.

#### Solución
**Paso 1. Huecos.** a) `range(j + 1, len(L))`; `if suma_parcial + L[k] <= s:`; y la llamada con `i + 1`.

**Paso 2. Recorrido.** b) Desde la raíz `{}` (suma $0$): `{3}` (3) $\to$ `{3,2}` (5): se imprime; `{3,4}` se poda ($7>5$); `{3,1}` (4) no llega a $5$. `{2}` (2) $\to$ `{2,4}` (6) se poda; `{2,1}` (3). `{4}` (4) $\to$ `{4,1}` (5): se imprime. `{1}` (1).

**Paso 3. Resultado.** Se imprimen $\{3,2\}$ y $\{4,1\}$, y hay $9$ llamadas.

### K16 · Ruta de coste mínimo con poda por coste parcial
nivel: 0.65

Cuatro ciudades $0,1,2,3$ con distancias $d_{01}=10$, $d_{02}=15$, $d_{03}=20$, $d_{12}=35$, $d_{13}=25$, $d_{23}=30$. Se busca el recorrido más corto que sale de la $0$, pasa por todas las demás una vez y vuelve a la $0$. Las rutas son permutaciones de $1,2,3$; se prueban en orden lexicográfico.
- a) Calcula el coste de cada una de las $6$ rutas (incluyendo la vuelta a $0$) y la mejor.
- b) Ahora con poda: no se sigue por una rama si el coste parcial (sin contar la vuelta) ya es **mayor o igual** que el mejor coste encontrado. Anota qué ramas se podan.
- c) ¿Cuántas llamadas se hacen con poda y cuántas sin ella?

#### Pista
El coste parcial de la ruta $0,3,1$ es $d_{03}+d_{31}=45$; si luego va a la $2$ se suma $d_{12}$. El mejor coste empieza en $\infty$ y se actualiza cuando una ruta completa mejora.

#### Solución
**Paso 1. Todas las rutas.** a) $0123$: $10+35+30+20=95$. $0132$: $10+25+30+15=80$. $0213$: $15+35+25+20=95$. $0231$: $15+30+25+10=80$. $0312$: $20+25+35+15=95$. $0321$: $20+30+35+10=95$. La mejor cuesta $80$ (hay dos rutas, una es la inversa de la otra).

**Paso 2. Con poda.** b) Se recorren $0123$ (mejor $=95$) y $0132$ (mejor $=80$), luego $0213$ ($95$, no mejora) y $0231$ ($80$, no mejora: se exige estrictamente menos). Después, con la ruta $0,3,1$ y la ciudad $2$ el coste parcial es $20+25+35=80\ge80$: **se poda** (sin la vuelta ya no puede mejorar). Con $0,3,2$ y la ciudad $1$: $20+30+35=85\ge80$: **se poda**.

**Paso 3. Llamadas.** c) Con poda $14$; sin poda $1+3+6+6=16$. Con muchas ciudades el ahorro es enorme. La poda es válida porque las distancias no son negativas: un coste parcial nunca baja.

