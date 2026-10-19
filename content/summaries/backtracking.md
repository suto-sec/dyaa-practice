## Idea
- Construir la solución **poco a poco** (solución parcial), recorriendo el árbol de recursión en profundidad.
- Si la solución parcial no puede completarse, se **poda** y se **vuelve atrás** deshaciendo lo último que se hizo.
- Es fuerza bruta "inteligente": el árbol es enorme, pero la poda evita explorarlo todo.
- Estructura general de cualquier backtracking:
  1. caso base: solución completa, se usa o se imprime;
  2. **generar candidatos** (un bucle);
  3. **comprobar** que el candidato es válido (poda);
  4. **incluirlo** en la solución parcial y actualizar las estructuras auxiliares;
  5. **llamada recursiva** con $i+1$;
  6. **deshacer** los cambios de las estructuras auxiliares (si se pasaron por referencia).

## Los tres esquemas que hay que saberse
**Subconjuntos, árbol binario** ($2^n$ hojas, subconjuntos de tamaño variable). `sol[i]` vale 0 o 1:
```python
def subconjuntos(i, sol, elementos):
    if i == len(elementos):
        imprime(sol, elementos)
    else:
        for k in range(0, 2):
            sol[i] = k
            subconjuntos(i + 1, sol, elementos)
```
**Subconjuntos, uno en cada nodo** (más eficiente si buscas subconjuntos de igual tamaño). `sol` guarda **índices**; $j$ es el último índice incluido:
```python
def subconjuntos_alt(i, j, sol, elementos):
    imprime(sol, i, elementos)              # cada nodo es un subconjunto
    for k in range(j + 1, len(elementos)):
        sol[i] = k
        subconjuntos_alt(i + 1, k, sol, elementos)    # llamada inicial: (0, -1, ...)
```
**Permutaciones** ($n!$ hojas). La lista `libres` comprueba en $O(1)$ si un elemento ya está usado:
```python
def permutaciones(i, libres, sol, elementos):
    n = len(elementos)
    if i == n:
        imprime(sol)
    else:
        for k in range(0, n):
            if libres[k]:
                sol[i] = elementos[k]
                libres[k] = False
                permutaciones(i + 1, libres, sol, elementos)
                libres[k] = True            # deshacer al volver
```
- Reserva la solución parcial **una vez** en la función *wrapper*; no concatenes ni borres elementos en cada llamada.
- Sin la lista `libres`, comprobar la factibilidad cuesta $O(n)$ en vez de $O(1)$.

## N reinas
- Colocar $n$ reinas sin que se amenacen (fila, columna ni diagonal). Para $n=8$ hay 92 soluciones (12 distintas por simetría).
- Reduce el espacio de búsqueda: $2^{n^2}\to\binom{n^2}{n}\to n^n$ (una por columna) $\to n!$ (una por fila y columna: una **permutación**).
- Solución: `sol[i]` = fila de la reina de la columna $i$ (por ejemplo $(1,3,0,2)$).
- Estructuras booleanas para comprobar en $O(1)$:
  - `filas_libres[k]`;
  - diagonal principal: índice `i - k + n - 1`, con `2n - 1` posiciones;
  - diagonal secundaria: índice `i + k`.
- Candidato válido: `filas_libres[k] and pdiags_libres[i-k+n-1] and sdiags_libres[i+k]`. Se marcan como ocupadas, se llama a `i+1` y se vuelven a marcar libres.

## Otros problemas
- **Suma de subconjuntos:** esquema binario con un parámetro de **suma parcial** ($\Theta(1)$ en vez de $O(n)$) y poda si la suma parcial supera $s$.
- **Mochila 0-1:** $\max\sum x_iv_i$ con $x_i\in\{0,1\}$ y $\sum x_ip_i\le C$. Esquema binario; poda si `k*p[i] > C_restante`. Es de optimización: se recorren todas las soluciones guardando la mejor (`v_opt`, `sol_opt`).
- **Laberinto, ruta del caballo, sudoku:** se expande la solución casilla a casilla y se comprueba la validez antes de seguir.
- **Paréntesis válidos:** se podan los prefijos donde hay más cerrados que abiertos o más de $n$ abiertos.

## Ramificación y poda (optimización)
- Añade una **poda por valor**: si el máximo valor alcanzable en esa rama no supera el mejor valor ya encontrado, se descarta.
- En la mochila 0-1: `max_v` empieza en `sum(v)`; no incluir el objeto $i$ lo baja en $v_i$; incluirlo no lo cambia.
```python
nuevo_max_v = max_v - (1 - k) * v[i]
if k * p[i] <= C_restante and nuevo_max_v > v_opt:   # poda por capacidad y por valor
    ...
```
- Pesos $(3,6,9,5)$, valores $(7,2,10,4)$, $C=15$: óptimo 17 (objetos 1 y 3).
- Es un método **exacto**; sólo acelera la búsqueda del óptimo.

## Qué recordar
- ¿La solución es una **permutación**, un **subconjunto** u otra cosa? Si lo es, usa el esquema.
- ¿Una solución o todas? Si una, para al encontrarla (una variable booleana). En optimización se buscan todas para quedarse con la mejor.
- En optimización añade dos parámetros: mejor valor y mejor solución. Y piensa si hay poda por valor.
- Guarda en estructuras auxiliares lo que necesites comprobar a menudo (`libres`, diagonales, suma parcial).
- Si pasas una estructura por referencia, **deshaz** los cambios al volver; por valor no hace falta.
- El coste en el peor caso sigue siendo del orden del tamaño del árbol ($2^n$, $n!$...): la poda mejora la práctica, no el peor caso.
