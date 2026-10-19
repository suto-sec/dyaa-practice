## Problemas y algoritmos
- **Problema computacional:** relación entre entradas válidas (instancias) y salidas, descrita con precondiciones y postcondiciones. Una **instancia** son unas entradas concretas.
- **Algoritmo:** serie de pasos bien definidos que lleva de las entradas a las salidas. Es **correcto** si para toda instancia termina con el resultado correcto (entonces *resuelve* el problema).
- Tipos de problemas: de decisión (salida sí/no), de ordenación, de búsqueda, combinatorios, de optimización, sobre grafos...
- Algoritmos según implementación: iterativos/recursivos (todo iterativo se puede escribir recursivo y al revés), en serie/paralelos/distribuidos, deterministas/no deterministas, exactos/aproximados.
- Según el paradigma de diseño: divide y vencerás, fuerza bruta (backtracking), voraces, programación dinámica (en otra asignatura).

## Euclides (mcd)
$$mcd2(m,n)=\begin{cases}n & m=0\\ mcd2(n\,\%\,m,\ m) & m\ne0\end{cases}$$
La versión por restas es $mcd1(m,n)=mcd1(m,n-m)$ si $m\le n$ y $m\neq0$. Ambas se demuestran escribiendo $m=az$, $n=bz$ con $z$ el factor común máximo y $a,b$ sin factores comunes.

## Clases de complejidad (problemas de decisión)
| Clase | Qué es |
|---|---|
| **P** | resoluble en tiempo polinómico (búsqueda, ordenación, Dijkstra, programación lineal, optimización convexa) |
| **NP** | resoluble en tiempo polinómico por un algoritmo **no determinista "con suerte"**; equivale a poder **verificar** una solución "sí" en tiempo polinómico |
| **NP-completo** | los más difíciles de NP |
| **NP-duro** | tan difícil como los más difíciles de NP (o más) |
| **EXP** | tiempo exponencial $O(2^{p(n)})$ (ajedrez, damas o Go generalizados) |
| **R** | resoluble en tiempo finito |
| fuera de R | **indecidibles** (no computables): el problema de la parada |

$$P\subseteq NP\subseteq EXP\subseteq R$$
- **NP no significa "no polinómico"**: significa polinómico no determinista.
- ¿$P=NP$? Es un problema del milenio. Si se hallara un algoritmo polinómico para un problema NP-completo, sería $P=NP$. Se cree que $P\neq NP$: verificar una solución es más fácil que encontrarla.
- NP-completos: SAT (el primero, Cook 1971), los 21 de Karp (1972), suma de subconjuntos, viajante (decisión), mochila 0/1.

## Reducciones
- **Para demostrar que $A$ es NP-completo:** (1) $A\in NP$; (2) $A$ es NP-duro, normalmente **reduciendo un NP-completo conocido $Q$ a $A$**, es decir, transformando en tiempo polinómico cada instancia de $Q$ en una de $A$ con la misma respuesta.
- Como técnica de diseño ("transforma y vencerás"): camino más corto en grafo no ponderado $\to$ ponderado con todos los pesos iguales; productos de pesos $\to$ aplicar logaritmos; camino más largo $\to$ multiplicar los pesos por $-1$.
- Si tu problema es NP-completo, recurre a soluciones **aproximadas** en lugar de buscar un algoritmo eficiente exacto.

## Problema de la parada
No existe `Termina(p, x)` que decida siempre si un programa termina. Prueba por contradicción: define `d(w)` que entra en bucle infinito si `Termina(w, w)`; entonces `d(d)` termina si y sólo si `d(d)` no termina.

## Optimización
$$\underset{x}{\text{minimiza}}\ f_0(x)\quad\text{sujeto a}\quad f_i(x)\le b_i,\ i=1,\dots,m$$
- $f_0$ = función objetivo; $f_i\le b_i$ = restricciones, que definen la **región factible**. Maximizar equivale a minimizar $-f_0$.
- **Mochila 0/1:** $\max\sum x_iv_i$ con $x_i\in\{0,1\}$ y $\sum x_ip_i\le C$. NP-completo.
- **Lineales** ($f_i(\alpha x_1+\beta x_2)=\alpha f_i(x_1)+\beta f_i(x_2)$): región factible poliédrica; el óptimo está en un vértice; se resuelven con Simplex.
- **Convexos** ($f_i(\alpha x_1+\beta x_2)\le\alpha f_i(x_1)+\beta f_i(x_2)$ con $\alpha+\beta=1$, $\alpha,\beta\in[0,1]$; restricciones que definen un conjunto convexo): los lineales son un caso particular de convexos. Los convexos se pueden resolver en tiempo polinómico.
- **No convexos:** varios óptimos locales, sin garantía polinómica. Se usan heurísticas (búsqueda aleatoria, algoritmos genéticos) que no garantizan el óptimo global. "No hay comida gratis": ninguna heurística es la mejor en general.
- **Descenso de gradiente:** `x <- x - alpha * gradiente`, hasta que $\lVert g\rVert\le\varepsilon$. Puede no converger o ser lento.

## IA y aprendizaje automático
- **Regresión:** predecir un valor real. **Clasificación:** predecir una clase. **Clustering:** agrupar sin conocer clases.
- No tienen una solución "correcta" ni una relación entrada-salida especificable, así que no son un problema computacional: se plantean problemas concretos (K-NN, SVM...) que se resuelven con algoritmos.
- Los modelos se crean con datos de **entrenamiento** y se evalúan con datos nuevos (**test**).
- Jerarquía: tarea $\to$ problemas computacionales $\to$ algoritmos.
