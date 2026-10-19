## Esquema
1. **Dividir** el problema en dos o más subproblemas del mismo tipo (y menor tamaño).
2. **Resolver** cada subproblema con llamadas recursivas. Si son pequeños, caso base.
3. **Combinar** las soluciones (puede requerir trabajo extra).

- **Decrementa y vencerás:** una sola llamada recursiva ($n-1$, $n//2$...). Es lo del tema 4.
- **Divide y vencerás:** dos o más llamadas por caso recursivo.
- **Transforma y vencerás (reducción):** convertir el problema en otro más simple o conocido (mediana = ordenar y tomar el elemento central, $\Theta(n\log n)$; $\sqrt a$ = cero de $x^2-a$).
- Ventajas: menor coste, paralelismo, buen uso de la caché. Dividir por la mitad **no** garantiza un coste logarítmico: depende de cuántos subproblemas hay y del coste de combinar.

## Coste: lo que hay que reconocer
| Algoritmo | Recurrencia | Orden |
|---|---|---|
| Máximo (dos mitades) | $T(n)=2T(n/2)+1$, $T(n)=2n-1$ | $\Theta(n)$ (cota inferior $\Omega(n)$) |
| Merge-sort | $T(n)=2T(n/2)+n$, $T(n)=n\log_2n+n$ | $\Theta(n\log n)$ en todos los casos |
| Quicksort, mejor/medio | $2T(n/2)+\Theta(n)$ | $\Theta(n\log n)$ |
| Quicksort, peor | $T(n-1)+T(1)+\Theta(n)$ | $\Theta(n^2)$ |
| Quickselect | una sola llamada | medio $O(n)$, peor $O(n^2)$ |
| Karatsuba | $3T(n/2)+en+f$ | $\Theta(n^{\log_23})\approx n^{1{,}585}$ |
| Multiplicación "lenta" en binario | $4T(n/2)+en+f$ | $\Theta(n^2)$ |
| Matrices a bloques (8 productos) | $8T(n/2)+\Theta(n^2)$ | $\Theta(n^3)$ |
| Strassen (7 productos, 18 sumas) | $7T(n/2)+18\Theta(n^2)$ | $\Theta(n^{\log_27})\approx n^{2{,}807}$ |

- Usa el **teorema maestro**: compara $a$ con $b^k$, o $f(n)$ con $n^{\log_b a}$.
- El árbol de 2 llamadas con altura $\log_2n$ tiene $2n-1$ nodos: la exponencial y el logaritmo se cancelan.
- Merge-sort con partición 10% y 90% también es $\Theta(n\log n)$.
- Producto de matrices $p\times q$ por $q\times r$: $O(pqr)$.

## Ordenación recursiva: la descomposición decide el algoritmo
| Algoritmo | Divide | Combina |
|---|---|---|
| Insert-sort | quita el último | inserta en lista ordenada |
| Select-sort | quita el menor | concatena el menor delante |
| Merge-sort | dos mitades | **mezcla** (ahí está el trabajo) |
| Quicksort | por un **pivote**: menores o iguales, pivote, mayores | nada (ya está ordenada) |

- Caso base: $n\le1$ devuelve la lista.
- **Mezcla** de dos listas ordenadas: compara las cabezas y toma la menor; coste $\Theta(n+m)$.
- **Quicksort:** el pivote puede ser el primero, el central o uno al azar. La partición de Hoare es iterativa e in-place; devuelve la posición final del pivote. Peor caso: pivote siempre mínimo o máximo (un lado queda vacío).
- **Quickselect** (k-ésimo menor): se particiona y se sigue **sólo** por el lado que contiene el índice $k-1$; por eso no es estrictamente divide y vencerás.
- Memoria: merge-sort out-of-place necesita un vector auxiliar de tamaño $n$.

## Karatsuba (multiplicación en binario)
- $x=a\cdot2^m+b$, $y=c\cdot2^m+d$ con $m=\min(\lfloor b_x/2\rfloor,\lfloor b_y/2\rfloor)$, siendo $b_x,b_y$ los bits.
- Regla lenta (4 productos): $xy=ac\,2^{2m}+(ad+bc)2^m+bd$.
- **Regla rápida (3 productos):** $xy=ac\,2^{2m}+\big[(a+b)(c+d)-ac-bd\big]2^m+bd$.
- Casos base: $x=0$ o $y=0$ da $0$; $x=1$ da $y$; $y=1$ da $x$.
- Desplazamientos: `z << m` $=z\cdot2^m$; `z >> m` $=\lfloor z/2^m\rfloor$.

## Otros problemas del tema
- **L-triominós:** cuadrícula $2^k\times2^k$ con un cuadrado vacío. Pon un triominó en el centro, cubriendo un cuadrado de cada cuadrante salvo el que ya tiene el hueco; así los 4 cuadrantes tienen un hueco y haces 4 llamadas con lado $n/2$.
- **Inversión de bits** ($2^p$ elementos): $a'_j=a_i$ con $j$ = $i$ con los bits invertidos. Tres descomposiciones: dos mitades e **intercalar**; posiciones pares e impares y **concatenar**; mitades y colocar cada elemento en su índice invertido.

## Qué recordar
- Dibuja cómo se divide y cómo se combina antes de escribir código.
- El caso base debe cubrir el tamaño mínimo (¿lista vacía? ¿un solo elemento?).
- Cuenta las llamadas y el trabajo de combinar: $T(n)=aT(n/b)+f(n)$.
- Copiar rebanadas (`a[:m]`) cuesta $\Theta(n)$; con `ini` y `fin` no se copia nada.
