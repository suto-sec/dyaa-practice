## t6-binario

Q: ¿Qué es el backtracking?
+ Una estrategia que construye soluciones parciales que cumplen las restricciones, recorriendo el árbol en profundidad, y vuelve atrás si una solución parcial no se puede completar.
- Una estrategia que siempre elige la mejor opción local y no deshace decisiones.
- Una forma de dividir el problema en mitades.
- Un algoritmo de ordenación.
? Es fuerza bruta "inteligente": la poda evita explorar todo el árbol.

Q: En el esquema binario de subconjuntos de $n$ elementos, ¿cuántas hojas tiene el árbol y qué representa cada una?
+ $2^n$ hojas, cada una un subconjunto; en cada nivel se decide si se incluye (1) o no (0) un elemento.
- $n!$ hojas, cada una una permutación.
- $n$ hojas, una por elemento.
- $n^2$ hojas.
? Por ejemplo, con la solución parcial `[1,0,1]` y los elementos $\{a,b,c\}$ se obtiene $\{a,c\}$.

Q: ¿Cuál es el caso base del esquema binario?
+ `i == len(elementos)`: la solución parcial está completa y se imprime.
- `i == 0`.
- `sol[i] == 1`.
- No tiene caso base.
? Si no, se generan los candidatos $k\in\{0,1\}$, se incluye en `sol[i]` y se llama con `i+1`.

Q: ¿Por qué se reserva la memoria de la solución parcial en la función *wrapper*?
+ Es más eficiente que usar una estructura que crece y decrece dinámicamente en cada llamada.
- Porque Python lo exige.
- Para poder devolver varias soluciones.
- Para que el árbol sea binario.
? Ese esquema es bueno si los subconjuntos tienen cardinalidades diferentes.

## t6-subconjuntos

Q: En el esquema "un subconjunto en cada nodo", ¿qué contiene la solución parcial?
+ Los índices de los elementos que se van incluyendo: `[0,2]` es $\{a,c\}$.
- Valores 0 o 1 para cada elemento.
- Los elementos ordenados.
- Sólo el último elemento.
? Por eso las soluciones parciales son también completas.

Q: ¿Cuántos parámetros de posición hacen falta y cuáles son los candidatos?
+ Dos: `i` (posición de `sol` donde incluir) y `j` (índice del último candidato incluido); los candidatos son `j+1, ..., n-1`.
- Uno: `i`; los candidatos son todos los elementos.
- Tres: `i`, `j` y `k`.
- Ninguno.
? La raíz tiene $j=-1$. Se puede evitar `j` usando `sol[i-1]+1`.

Q: ¿Cuándo es más eficiente este esquema que el binario?
+ Si se buscan subconjuntos de la misma cardinalidad (en el nivel $i$ las soluciones tienen $i$ elementos).
- Si se buscan subconjuntos de cualquier tamaño.
- Nunca.
- Si sólo hay un elemento.
? El árbol deja de ser binario y tiene exactamente $2^n$ nodos.

## t6-permutaciones

Q: En las permutaciones, ¿para qué sirve la lista `libres`?
+ Para comprobar en $O(1)$ si un elemento ya está en la solución parcial; sin ella habría que usar un bucle de $O(n)$.
- Para guardar las permutaciones.
- Para contar los elementos.
- Para ordenar los candidatos.
? Es clave de cara a la eficiencia.

Q: Tras la llamada recursiva en `genera_permutaciones`, ¿qué hay que hacer con `libres[k]`?
+ Volver a marcarlo como `True`, deshaciendo el cambio, porque la lista se pasa por referencia.
- Nada.
- Marcarlo como `False` definitivamente.
- Eliminarlo de la lista.
? Si se pasara por valor no haría falta deshacer los cambios.

Q: ¿Cuántas hojas tiene el árbol de permutaciones de $n$ elementos?
+ $n!$
- $2^n$
- $n^2$
- $n$
? El primer nivel tiene $n$ candidatos, el segundo $n-1$, etc.

Q: ¿Qué hace inefectiva la versión "permutaciones ineficiente"?
+ Comprueba la factibilidad de un candidato con un bucle sobre `sol` ($O(n)$) en vez de usar una lista booleana ($O(1)$).
- No genera todas las permutaciones.
- No tiene caso base.
- Usa recursión.
? Las dos versiones generan lo mismo; cambia el coste de cada comprobación.

## t6-reinas

Q: Para el problema de las $n$ reinas, ¿cómo se reduce el espacio de búsqueda?
+ De $2^{n^2}$ a $\binom{n^2}{n}$, luego a $n^n$ (una por columna) y por último a $n!$ (también una por fila): hay que buscar permutaciones válidas.
- Sólo se prueba la diagonal.
- Se elimina la restricción de filas.
- Se coloca la primera reina al azar.
? Para $n=8$ se pasa de $1{,}84\cdot10^{19}$ a $40320$.

Q: ¿Cómo se indexan las diagonales para comprobarlas en $O(1)$ al colocar una reina en la fila `k` de la columna `i`?
+ Diagonal principal `i-k+n-1` (de 0 a $2n-2$) y secundaria `i+k`.
- `i*k` y `i/k`.
- `i` y `k` solamente.
- Con un bucle sobre las reinas ya colocadas.
? Se mantienen listas booleanas `pdiags_libres` y `sdiags_libres` de longitud $2n-1$.

Q: ¿Qué se hace tras la llamada recursiva en `nreinas_todas`?
+ Se vuelven a marcar libres la fila y las dos diagonales del candidato.
- Se elimina la reina de la solución parcial y se detiene la búsqueda.
- Nada.
- Se imprime el tablero.
? Así el siguiente candidato del bucle encuentra el estado correcto.

Q: ¿Para qué sirve podar el árbol de búsqueda en las $n$ reinas?
+ Para no explorar soluciones parciales que ya no pueden llegar a una solución válida, evitando llegar a las hojas.
- Para encontrar soluciones que no existen.
- Para ordenar las soluciones.
- Para que el árbol sea binario.
? Hasta encontrar la primera solución sólo se explora una pequeña parte del árbol.

## t6-suma-caballo

Q: En la suma de subconjuntos, ¿qué mejora introduce el parámetro `suma_parcial`?
+ Evita recalcular la suma en $O(n)$: se obtiene en $\Theta(1)$.
- Permite ordenar los elementos.
- Permite encontrar un solo subconjunto.
- Evita la recursión.
? Y permite podar: si `suma_parcial + k*L[i] > s`, no se expande esa rama.

Q: ¿Qué esquema se usa para la suma de subconjuntos?
+ El binario, porque las soluciones son subconjuntos de tamaño variable.
- Permutaciones.
- Un subconjunto en cada nodo.
- Fuerza bruta sin poda.
? Se imprime la solución cuando `suma_parcial == s`.

Q: En la ruta del caballo, ¿cómo se representan los 8 saltos posibles?
+ Con una lista de incrementos a las coordenadas: `(1,-2), (2,-1), (2,1), (1,2), (-1,2), (-2,1), (-2,-1), (-1,-2)`.
- Con ocho funciones distintas.
- Con una lista de casillas visitadas.
- Con una permutación.
? Se recorre la lista probando cada salto que caiga dentro del tablero y en una casilla no visitada.

Q: ¿Por qué la ruta del caballo es difícil de resolver con backtracking en tableros grandes?
+ Hay que encontrar una permutación de $n^2$ casillas con restricciones muy complejas; para tableros mayores de $6\times6$ tarda en hallar una solución.
- Porque no existe solución en ningún tablero.
- Porque el caballo no puede saltar.
- Porque hay que volver a la casilla inicial.
? No se exige una ruta cerrada, pero el espacio de búsqueda sigue siendo enorme.

## t6-otros

Q: En el laberinto, ¿por qué no sirven el esquema de permutaciones ni el de subconjuntos?
+ Porque el camino puede tener longitud variable y el orden de las celdas importa; se exploran las 4 direcciones desde cada celda en un orden fijo.
- Porque el laberinto es binario.
- Porque no hay caso base.
- Porque no hay restricciones.
? Se usa un esquema distinto: desde $(c,f)$ hay cuatro subproblemas.

Q: En el sudoku, ¿cuál es la solución parcial y cómo se expande?
+ El propio tablero; se expande, por ejemplo, fila a fila, probando dígitos que no repitan fila, columna ni caja $3\times3$.
- Una lista de 81 dígitos aleatorios.
- Un conjunto de filas.
- Un árbol binario.
? Con una función `avanza(fila, col)` se pasa a la siguiente casilla.

Q: En la mochila 0-1 con backtracking, ¿cuándo se poda?
+ Cuando la capacidad restante sería negativa: `k*p[i] > C_restante`.
- Cuando el valor es 0.
- Cuando se han considerado todos los objetos.
- Nunca se poda.
? En cada nodo $(X,Y)$ guarda capacidad restante y beneficio parcial; la rama 1 resta $p_i$ y suma $v_i$.

Q: Como la mochila es un problema de **optimización**, ¿cuántas soluciones se analizan?
+ Todas las factibles, quedándose con la mejor (`v_opt` y `sol_opt`).
- Sólo la primera.
- Ninguna: se calcula directamente.
- Sólo las de mayor peso.
? Se buscan todas porque no se sabe cuál será la óptima hasta explorar el árbol.

## t6-poda

Q: ¿Qué añade la **ramificación y poda** al backtracking?
+ Una poda adicional por valor: si el máximo valor que puede alcanzar una rama no supera el mejor valor ya encontrado, se descarta.
- Una poda por capacidad.
- El uso de listas booleanas.
- Una búsqueda en anchura.
? Es un método exacto para problemas de optimización duros.

Q: En la mochila 0-1 con ramificación y poda, ¿cómo se actualiza el máximo valor alcanzable `max_v` al decidir sobre el objeto $i$?
+ Si no se incluye, baja en $v_i$; si se incluye, no cambia.
- Siempre baja en $v_i$.
- Sube en $v_i$.
- Se pone a 0.
? En la raíz `max_v` es la suma de todos los beneficios (23 en el ejemplo).

Q: ¿Qué hay que añadir a un backtracking de optimización?
+ Dos parámetros: la mejor solución y el mejor valor hallados hasta el momento; y pensar si se puede podar por valor.
- Un parámetro con el número de soluciones.
- Nada.
- Una lista de permutaciones.
? Si sólo se busca una solución, basta una variable booleana de "solución encontrada" para detener la búsqueda.

Q: Antes de programar un backtracking, ¿qué pregunta conviene hacerse primero?
+ Si las soluciones son permutaciones, subconjuntos u otra cosa: si lo son, se usan los esquemas vistos, que son claros y eficientes.
- Cuántas líneas tendrá el código.
- Si el lenguaje soporta recursión.
- Si la solución es única.
? También: ¿se pueden acelerar cálculos usando estructuras de datos? ¿se busca una solución o todas?
