## Idea
- Para **optimización**. En cada paso se toma la mejor decisión *local* y **no se deshace nunca**. Es rápido y fácil de implementar, pero **no siempre es óptimo**: un óptimo local no implica un óptimo global.
- Para ciertos problemas se puede **demostrar** que una estrategia voraz concreta sí es óptima. Lo difícil es encontrar la función de selección correcta.

## Elementos de un algoritmo voraz
| Elemento | Qué es |
|---|---|
| Candidatos $C$ | el conjunto del que se construye la solución |
| Función de **selección** | elige el candidato local más idóneo |
| Función de **factibilidad** | comprueba si añadir el candidato sigue siendo válido |
| Función **objetivo** | el valor que se optimiza |
| Función **solución** | indica si lo construido ya es una solución |

```
voraz(C):
    S <- vacío
    mientras C no vacío y no solución(S):
        x <- seleccionar(C);  C <- C \ {x}
        si factible(S ∪ {x}): S <- S ∪ {x}
    si solución(S): devolver S, si no: no hay solución
```

## Problemas clásicos: selección y si es óptima
| Problema | Selección voraz | ¿Óptima? |
|---|---|---|
| Camino más corto, un arco por etapa | el arco más corto | sí (por contradicción) |
| Camino más corto en grafo por etapas | el arco más corto | **no** (contraejemplo: 23 frente a 7) |
| Cambio de monedas | la moneda más alta sin pasarse | sólo con ciertos sistemas (con 12 céntimos falla: devolver 2,24 € da 4 monedas voraz, 3 óptimo) |
| Tiempo en el sistema | clientes en **orden creciente** de $t_i$ | sí |
| Mezcla de listas | mezclar las dos **más cortas** | sí |
| Huffman | fusionar los dos árboles de menor frecuencia | sí |
| Mochila v.1 (máx. nº de objetos) | por **peso creciente** | sí |
| Mochila v.2 (máx. peso) | peso creciente o decreciente | **ninguna** es óptima |
| Mochila v.3 (fracciones) | mayor **valor/peso** $v_i/p_i$ | sí |
| Mochila v.4 (0-1) | | NP-completo: voraz no basta |
| Árbol de recubrimiento mínimo: Kruskal, Prim | arista de menor peso | sí |
| Dijkstra | vértice con menor distancia al origen | sí (pesos no negativos) |

## Tiempo en el sistema
$T(P)=\sum_{k=1}^{n}(n-k+1)s_k$ con $s_k=t_{p_k}$: el primero cuenta $n$ veces, el segundo $n-1$... Por eso hay que poner **primero los más cortos**. Con $t=(5,10,3)$, el mejor orden es $3,1,2$: $T=29$.

## Huffman
- Una cola de árboles ordenada por frecuencia. Mientras haya más de un árbol: fusiona los **dos de menor frecuencia** (suman sus frecuencias) y reinsértalo.
- Código de un carácter: camino desde la raíz (izquierda $=0$, derecha $=1$). Los más frecuentes tienen código más corto.
- Ejemplo (miles): $f{:}5,\ e{:}9,\ c{:}12,\ b{:}13,\ d{:}16,\ a{:}45$ da $a=1,\ d=011,\ e=0101,\ f=0100,\ b=001,\ c=000$. Son 224 000 bits frente a 300 000 con 3 bits por carácter.

## Mochila
- 0-1: $\max\sum x_iv_i$ con $x_i\in\{0,1\}$ y $\sum x_ip_i\le C$.
- Con fracciones ($0\le x_i\le1$): ordena por $v_i/p_i$ decreciente y llena; el último objeto entra **parcialmente**.
- Ejemplo: $C=100$, $p=(10,20,30,40,50)$, $v=(20,30,66,40,60)$: $v/p=(2;1{,}5;2{,}2;1;1{,}2)$. La selección por $v/p$ da **164**; por mayor valor, 146; por menor peso, 156.

## Árbol de recubrimiento de coste mínimo
- Árbol libre: conexo y acíclico; con $n$ vértices tiene $n-1$ aristas.
- **Propiedad fundamental:** dado $U\subset V$ no vacío, la arista más pequeña con un extremo en $U$ y otro fuera está en algún árbol mínimo.
- **Kruskal:** ordena las aristas por peso y añade la menor que **no forme ciclo**; para al llegar a $|V|-1$ aristas.
- **Prim:** parte de un vértice y añade siempre la arista mínima entre el conjunto $U$ de tratados y el resto.
- El árbol mínimo **no tiene por qué ser único**.

## Dijkstra
- Caminos mínimos desde un origen $s$, con pesos **no negativos**.
- Mantén $d_v$ (distancia conocida); en cada paso mete en $T$ el vértice **no tratado de menor $d$**, y relaja los vecinos: $d_x\leftarrow\min\left(d_x,\ d_{v_{sig}}+w(v_{sig},x)\right)$.
- Diferencia con Prim: Dijkstra tiene en cuenta **todo el camino** desde el origen, no sólo la arista.
- Ejemplo (origen 0): distancias $0,15,10,20,30$.

## K-medias (clustering)
- Minimiza $L=\sum_k\sum_i a_{ik}\lVert x_i-\mu_k\rVert^2$. Es iterativo, converge a un **óptimo local**, no al global.
- (A) asigna cada punto al centroide más cercano; (B) cada centroide pasa a ser la media de sus puntos. Repite hasta que los centroides no cambien.
- Se ejecuta varias veces con distintas inicializaciones.

## Qué recordar
- Para mostrar que una estrategia **no** es óptima basta un **contraejemplo**; para mostrar que lo es hace falta una demostración (a menudo por contradicción).
- Antes de implementar, decide la función de selección y comprueba si es óptima.
