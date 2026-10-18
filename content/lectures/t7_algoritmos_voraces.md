# Tema 7 Algoritmos voraces
Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.
Contenido: 1 Introducción; 2 Ejemplos básicos; 3 Problemas clásicos; 4 Problema de la mochila; 5 Grafos; 6 K-medias.

## Introducción
### Algoritmos voraces
- Los algoritmos voraces se suelen aplicar a problemas de optimización (maximizar o minimizar una función objetivo).
- Suelen ser rápidos y fáciles de implementar. Exploran soluciones "locales". No siempre garantizan la solución óptima.
- Son algoritmos que siguen una heurística mediante la cual toman decisiones óptimas locales en cada paso, de manera muy eficiente, con la esperanza de poder encontrar un óptimo global tras una serie de pasos.
- Se aplican, sobre todo, a problemas duros, desde un punto de vista computacional. Ejemplo: problema del viajante (NP-completo); heurística: "escoge la ciudad más próxima no visitada aún".
- Para ciertos problemas se puede demostrar que algunas estrategias voraces sí que logran hallar un óptimo global de manera eficiente.

### Ventajas y desventajas
- Ventajas: son fáciles de implementar; producen soluciones eficientes; a veces encuentran la solución óptima.
- Desventajas: no todos los problemas de optimización son resolubles con algoritmos voraces; la búsqueda de un óptimo local no implica encontrar un óptimo global; dificultad de encontrar la función de selección que garantice la elección óptima.

### Elementos
- Conjunto de candidatos C: la solución se construirá con un subconjunto de estos candidatos.
- Función de selección: selecciona el candidato "local" más idóneo.
- Función de factibilidad: comprueba si un candidato es factible.
- Función objetivo: determina el valor de la solución (función a optimizar).
- Función solución: determina si el subconjunto de candidatos ha alcanzado una solución.

### Esquema general
- La técnica voraz funciona por pasos: partimos de una solución vacía y de un conjunto de candidatos a formar parte de la solución. En cada paso se intenta añadir el mejor de los candidatos restantes a la solución parcial. Una vez tomada la decisión, no se puede deshacer. Si la solución ampliada es válida → candidato incorporado. Si no es válida → candidato desechado.
- El algoritmo acabará cuando el conjunto de elementos seleccionados constituya una solución o cuando no queden elementos sin considerar.

### Esquema general en pseudocódigo
```
función voraz(C)                  // C es el conjunto de candidatos
    S ← ∅
    mientras C ≠ ∅ y no solución(S) hacer
        x ← seleccionar(C)
        C ← C \ {x}
        si factible(S ∪ {x}) entonces
            S ← S ∪ {x}

    si solución(S) entonces
        devolver S                // S es una solución
    si no
        devolver ∅                // No hay soluciones
```

## Ejemplos básicos
### Camino más corto - 1
- Encontrar el camino más corto de $v_0$ a $v_n$, donde solo hay caminos entre vértices adyacentes ($v_{i-1}$ y $v_i$, para i=1,...,n). Ejemplo con 4 vértices $v_0,v_1,v_2,v_3$: arcos entre $v_0$ y $v_1$ de longitudes 5, 1, 3; entre $v_1$ y $v_2$ de 10, 9, 2, 6; entre $v_2$ y $v_3$ de 7, 4.
- ¿Función de selección? Método voraz: en cada paso se coge el arco de menor longitud. Solución óptima: 1+2+4=7.
- Se demuestra que la estrategia es óptima (por contradicción).

### Camino más corto - 2
- Encontrar el camino más corto de $v_{0,1}$ a $v_{n,1}$, donde solo hay caminos entre vértices de etapas adyacentes ($v_{i-1,j}$ y $v_{i,k}$, para i=1,...,n, y ∀j,k, donde puede haber cualquier número de vértices en las etapas 1,2,...,n-1).
- Ejemplo (grafo por etapas; arcos con su longitud):
  - Etapa 0 → 1: $v_{0,1}\to v_{1,1}$: 3; $v_{0,1}\to v_{1,2}$: 1; $v_{0,1}\to v_{1,3}$: 5; $v_{0,1}\to v_{1,4}$: 7.
  - Etapa 1 → 2: $v_{1,1}\to v_{2,1}$: 2; $v_{1,1}\to v_{2,2}$: 3; $v_{1,2}\to v_{2,1}$: 9; $v_{1,2}\to v_{2,2}$: 10; $v_{1,3}\to v_{2,1}$: 5; $v_{1,3}\to v_{2,3}$: 7; $v_{1,4}\to v_{2,1}$: 6; $v_{1,4}\to v_{2,2}$: 2; $v_{1,4}\to v_{2,3}$: 4.
  - Etapa 2 → 3: $v_{2,1}\to v_{3,1}$: 13; $v_{2,2}\to v_{3,1}$: 1; $v_{2,3}\to v_{3,1}$: 2.
- Método voraz: en cada paso se coge el arco de menor longitud. Longitud de la solución voraz: 1+9+13=23 ($v_{0,1},v_{1,2},v_{2,1},v_{3,1}$).
- Se demuestra que la estrategia no es óptima (contraejemplo). Longitud de la solución óptima: 3+3+1=7 ($v_{0,1},v_{1,1},v_{2,2},v_{3,1}$).

## Problemas clásicos
### Cambio de monedas
- Se dispone de n monedas de euro con valores de 1, 2, 5, 10, 20 y 50 céntimos de euro, 1 y 2 euros. Dada una cantidad X de euros, devolver dicha cantidad con el menor número posible de monedas. Ejemplo: devolver 2,24€. Solución: 4 (2 + 0,20 + 0,02 + 0,02).
- Conjunto de candidatos: todos los tipos de monedas.
- Función solución: conjunto de monedas que suman X.
- Función de factibilidad: si $\sum_i v_in_i>X$, el conjunto obtenido no podrá ser solución ($n_i$ = número de monedas de tipo i, $v_i$ = valor de una moneda de tipo i).
- Función objetivo: minimizar la cardinalidad de las soluciones posibles.
- Función de selección: moneda de valor más alto posible, que no supere el valor que queda por devolver.
- ¿Es óptima la función de selección propuesta? No siempre: con monedas de 1, 2, 5, 10, 12, 20 y 50 céntimos, 1 y 2 euros, y devolver 2,24€: solución voraz: 4 (2 + 0,20 + 0,02 + 0,02); solución óptima: 3 (2 + 0,12 + 0,12).

### Minimización del tiempo en el sistema
- Considérese un servidor que tiene que dar servicio a n clientes, donde $t_i$, con i=1,...,n, es el tiempo requerido por el cliente i. Suponiendo que todos los clientes llegan al mismo tiempo al servidor pero solo uno puede usarlo, minimizar el tiempo T en el sistema para los n clientes: $T=\sum_{i=1}^{n}(\text{tiempo en el sistema para el cliente }i)$.
- Ejemplo: 3 clientes con $t_1=5$, $t_2=10$, $t_3=3$. Según el orden:

| Orden | T |
|---|---|
| 123 | 5+(5+10)+(5+10+3)=38 |
| 132 | 5+(5+3)+(5+3+10)=31 |
| 213 | 10+(10+5)+(10+5+3)=43 (peor planificación) |
| 231 | 10+(10+3)+(10+3+5)=41 |
| 312 | 3+(3+5)+(3+5+10)=29 (mejor planificación) |
| 321 | 3+(3+10)+(3+10+5)=34 |

- Estrategia voraz: dar servicio en orden creciente de tiempo $t_i$. Es una estrategia óptima: sea $P=\langle p_1,p_2,\dots,p_n\rangle$ una permutación de los clientes (de enteros de 1 a n), sea $s_i=t_{p_i}$, entonces
$$T(P)=s_1+(s_1+s_2)+(s_1+s_2+s_3)+\dots=ns_1+(n-1)s_2+(n-2)s_3+\dots=\sum_{k=1}^{n}(n-k+1)s_k$$
Haciendo $s_1$ lo menor posible, luego $s_2$, etc. conseguimos minimizar T.

### Mezcla de listas
- Sean m listas ordenadas, cada una con $n_i$ elementos (i=1,...,m). ¿Cuál es la sucesión óptima del proceso de mezcla, mezclando listas dos a dos, para mezclar todas las listas de manera ordenada con el menor número de comparaciones?
- Ejemplo: tres listas $L_1$, $L_2$, $L_3$ con longitudes 10, 20 y 30. Opciones: $L_1+L_2=30$, luego $30+L_3=60$: total 90; $L_1+L_3=40$, luego $40+L_2=60$: total 100; $L_2+L_3=50$, luego $50+L_1=60$: total 110.
- Solución voraz: escoger en cada momento los dos lotes de menor tamaño. Construye un árbol binario de abajo hacia arriba (árbol de mezclas): (10, $L_1$) y (20, $L_2$) → 30; 30 y ($L_3$=30) → 60.

### Códigos de Huffman
- Dado un conjunto de n objetos y sus respectivas frecuencias de aparición $f_i$, i=1,...,n, obtener una codificación binaria para los objetos que minimice el promedio de bits necesarios para representarlos. (Ejemplo con árbol sobre frecuencias 0,30 B; 0,15 A; 0,15 E; 0,20 C; 0,10 G; 0,05 D; 0,05 F.)
- La codificación Huffman es un método usado para compresión de datos. Se codifica una serie de objetos mediante una secuencia de bits según su frecuencia de aparición. Los objetos con mayor frecuencia se codifican con menos bits. Minimiza el promedio de bits necesarios para representar los objetos.
- Ejemplo: texto de 100000 caracteres con 6 caracteres: frecuencias absolutas a=45000, b=13000, c=12000, d=16000, e=9000, f=5000.
  - Solución 1: usar 3 bits por cada carácter → 300000 bits.
  - Solución 2: usar códigos de longitud variable en el que los más frecuentes tienen el código más corto → 224000 bits.
  - Objetivo: crear una codificación de longitud variable para minimizar el número de bits, en promedio, necesarios para representar un texto.
- Estrategia voraz: asignar códigos más largos a los caracteres con menor frecuencia de aparición. Utiliza la tabla de frecuencias de aparición de cada carácter. Construye un árbol binario de longitud variable de abajo hacia arriba. Utiliza una cola Q de árboles con prioridades. Inicialmente Q contiene un árbol por cada carácter. En cada paso, se "mezclan" los dos árboles de Q que tienen menos frecuencia dando lugar a un nuevo árbol.
- Fase 1: orden creciente de frecuencias (en miles): f:5, e:9, c:12, b:13, d:16, a:45.
- Fase 2 y posteriores: fusionar árboles hasta obtener un solo árbol manteniendo la ordenación creciente:
  1. f:5 + e:9 → 14 (rama 0: f, rama 1: e). Cola: c:12, b:13, 14, d:16, a:45.
  2. c:12 + b:13 → 25 (0: c, 1: b). Cola: 14, d:16, 25, a:45.
  3. 14 + d:16 → 30 (0: 14, 1: d). Cola: 25, 30, a:45.
  4. 25 + 30 → 55 (0: 25, 1: 30). Cola: a:45, 55.
  5. 55 + a:45 → 100 (rama 0: 55, rama 1: a).
- Codificación final: para hallar la codificación de un carácter se usa el camino desde la raíz del árbol hasta la hoja que representa el carácter. La secuencia de bits la determina la rama (izquierda: 0, derecha: 1) por la que se avanza hasta la hoja.

| carácter | código |
|---|---|
| a | 1 |
| d | 011 |
| e | 0101 |
| f | 0100 |
| b | 001 |
| c | 000 |

## Problema de la mochila
### Problema de la mochila - Versión 1
- Se tiene un conjunto de n objetos, cada uno con un peso $p_i$, y una mochila con capacidad C. Maximizar el número de objetos que se pueden introducir en la mochila sin sobrepasar la capacidad C.
$$\max_x\sum_{i=1}^{n}x_i\quad\text{sujeto a}\quad x_i\in\{0,1\},\ i=1,\dots,n;\quad\sum_{i=1}^{n}x_ip_i\le C$$
- Las variables $x_i$ determinan si se introduce el objeto i en la mochila. Es un problema de programación lineal entera.
- Ejemplo: C=15, p=(9,6,5): ¿función de selección? Peso decreciente: solución 2 (9+6). Peso creciente: solución 2 (5+6).
- Ejemplo: C=15, p=(9,5,6,4): peso decreciente: solución 2 (9+6). Peso creciente: solución 3 (4+5+6).
- La estrategia voraz escogiendo candidatos en orden creciente de peso es mejor (para este problema es óptima).

### Problema de la mochila - Versión 2
- Se tiene un conjunto de n objetos, cada uno con un peso $p_i$, y una mochila con capacidad C. Maximizar el peso de los objetos que se introducen en la mochila sin sobrepasar la capacidad C.
$$\max_x\sum_{i=1}^{n}x_ip_i\quad\text{sujeto a}\quad x_i\in\{0,1\},\ i=1,\dots,n;\quad\sum_{i=1}^{n}x_ip_i\le C$$
- Las variables $x_i$ determinan si se introduce el objeto i en la mochila. Es un problema de programación lineal entera.
- Ejemplo: C=15, p=(9,6,5): peso decreciente: solución 15 (9+6); peso creciente: solución 11 (5+6).
- Ejemplo: C=15, p=(10,7,6): peso decreciente: solución 10 (10); peso creciente: solución 13 (6+7).
- Ninguna de las estrategias de selección es óptima, ni mejor que la otra.

### Problema de la mochila - Versión 3
- Se tiene un conjunto de n objetos, cada uno con un peso $p_i$ y un valor $v_i$, y una mochila con capacidad C. Los objetos pueden partirse en fracciones más pequeñas. Maximizar la suma de los valores asociados a los objetos que se introducen en la mochila, sin sobrepasar la capacidad C.
$$\max_x\sum_{i=1}^{n}x_iv_i\quad\text{sujeto a}\quad 0\le x_i\le1,\ i=1,\dots,n;\quad\sum_{i=1}^{n}x_ip_i\le C$$
- Las variables $x_i$ determinan la fracción del objeto i que se introduce en la mochila. Es un problema de programación lineal.
- Conjunto de candidatos: todos los objetos. Función de factibilidad: $\sum_i x_ip_i\le C$. Función objetivo: maximizar $\sum_i x_iv_i$. Función solución: cualquier conjunto de elementos es válido si no se ha sobrepasado C.
- Funciones de selección posibles: seleccionar el objeto con mayor valor; seleccionar el objeto con menor peso restante; seleccionar el objeto cuyo valor por unidad de peso sea el mayor posible.
- Ejemplo: C=100, n=5, con:

| i | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| $p_i$ | 10 | 20 | 30 | 40 | 50 |
| $v_i$ | 20 | 30 | 66 | 40 | 60 |
| $v_i/p_i$ | 2,0 | 1,5 | 2,2 | 1,0 | 1,2 |

| seleccionar | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | valor total |
|---|---|---|---|---|---|---|
| maximizar $v_i$ | 0 | 0 | 1 | 0,5 | 1 | 146 |
| minimizar $p_i$ | 1 | 1 | 1 | 1 | 0 | 156 |
| maximizar $v_i/p_i$ | 1 | 1 | 1 | 0 | 0,8 | 164 |

- Función de selección óptima es: maximizar $v_i/p_i$.

### Problema de la mochila - Versión 4 (mochila 0-1)
- Dado un conjunto de n objetos, cada uno con un peso $p_i$ y un valor $v_i$, y una mochila con capacidad C. Maximizar la suma de los valores asociados a los objetos que se introducen en la mochila, sin sobrepasar la capacidad C, sabiendo que los objetos NO pueden partirse en fracciones más pequeñas:
$$\max_x\sum_{i=1}^{n}x_iv_i\quad\text{sujeto a}\quad x_i\in\{0,1\},\ i=1,\dots,n;\quad\sum_{i=1}^{n}x_ip_i\le C$$
- Las variables $x_i$ determinan si se introduce el objeto i en la mochila. Es un problema NP-completo (problema de la mochila 0-1).

## Grafos
### Árbol de recubrimiento de coste mínimo
- Árbol libre: es un grafo no dirigido conexo acíclico. Todo árbol libre con n vértices tiene n-1 aristas. Si se añade una arista se introduce un ciclo. Si se borra una arista quedan vértices no conectados. Cualquier par de vértices está unido por un único camino simple.
- Árbol de recubrimiento de un grafo no dirigido y ponderado no negativamente: es cualquier subgrafo que contenga todos los vértices y que sea un árbol libre.
- Árbol de recubrimiento de coste mínimo: es un árbol de recubrimiento y no hay ningún otro árbol de recubrimiento cuya suma de los pesos de las aristas sea menor. Lo denotamos arm(G), donde G es un grafo no dirigido, conexo, y ponderado no negativamente.
- Problema: dado un grafo $G=\langle V,E\rangle$ no dirigido, conexo, y ponderado no negativamente, hallar arm(G). {{fig img/t7-p48.png | grafo ponderado de 10 vértices cuyo árbol de recubrimiento de coste mínimo tiene valor 38. No tiene por qué ser único.}}

### Propiedad fundamental
- Sea $G=\langle V,E\rangle$ un grafo no dirigido, conexo, y ponderado no negativamente, $G\in\{f:V\times V\to E\}$. Sea U un conjunto de vértices $U\subset V$, $U\ne\emptyset$.
- Si $\langle u,v\rangle$ es la arista más pequeña de G tal que $u\in U$, y $v\in V\setminus U$, entonces existe algún árbol de recubrimiento de coste mínimo de G que la contiene. Demostración por reducción al absurdo (contradicción).

### Algoritmo de Kruskal
- Seleccionar la arista más corta en cada etapa y construir el árbol.
- Se basa en la propiedad de los árboles de recubrimiento de coste mínimo: partiendo del árbol vacío, se selecciona en cada paso la arista de menor peso que no provoque ciclo sin requerir ninguna otra condición sobre sus extremos. Es una estrategia óptima.
- Ejemplo paso a paso en el grafo con vértices a,b,c,d,e,f y aristas: a-b:3, b-c:1, b-f:4, a-f:5, c-f:4, c-d:6, f-d:5, f-e:2, a-e:6, e-d:8. Orden de selección: b-c (1), f-e (2), a-b (3), b-f (4), f-d (5); con 5 aristas (|V|-1) el árbol queda completo. Coste total del árbol: 15.
```
Kruskal(G)
    // Entrada: G = <V,E>, es un grafo no dirigido, conexo,
    // y ponderado no negativamente
    // Salida: ET = conjunto de aristas que forman un arm(G)

    ordenar E en orden no decreciente según los pesos asociados a las aristas:
        w(e_i1) <= ... <= w(e_i|E|)
    ET <- ∅
    cont <- 0          // nº de aristas de arm(G)
    k <- 0             // nº de aristas procesadas

    while cont < |V| - 1
        k <- k + 1
        si ET ∪ {e_ik} no contiene ciclos
            ET <- ET ∪ {e_ik}
            cont <- cont + 1

    devolver ET
```

### Algoritmo de Prim
- Seleccionar un nodo y construir el árbol a partir de él.
- Aplica reiteradamente la propiedad de los árboles de recubrimiento de coste mínimo incorporando a cada paso una arista. Se usa un conjunto U de vértices tratados y se selecciona en cada paso la arista mínima que une un vértice de U con otro de su complementario. Es una estrategia óptima.
- Ejemplo paso a paso en el mismo grafo que Kruskal {{fig img/t7-p54.png | aristas añadidas en cada paso a partir de un vértice inicial}}.
```
Prim(G)
    // Entrada: G = <V,E>, es un grafo no dirigido, conexo
    // (puede usar pesos negativos)
    // Salida: ET = conjunto de aristas que forman un arm(G)

    VT <- {v0}            // v0 puede ser cualquier vértice
    ET <- ∅

    desde i <- 1 hasta |V| - 1 hacer
        encontrar una arista e* = (v*, u*) de peso mínimo entre todas
            las aristas (v, u) tales que v ∈ VT y u ∈ V \ VT
        VT <- VT ∪ {u*}
        ET <- ET ∪ {e*}

    devolver ET
```

### Caminos mínimos desde un nodo
- Dado un grafo $G=\langle V,E\rangle$ conexo y ponderado no negativamente, y un vértice $s\in V$, hallar la longitud de los caminos mínimos desde s al resto de vértices. (Ejemplo: vértices s,a,b,c,d,e.)
- Sirve para grafos dirigidos y no dirigidos (si es no dirigido se puede sustituir cada arista por dos con el mismo peso, y en "direcciones" contrarias). Veremos el algoritmo de Dijkstra.

### Algoritmo de Dijkstra
- Inserta vértices en un árbol T progresivamente, según calcula nuevas longitudes mínimas. El árbol T es conceptual (es una lista de nodos).
- Para un nuevo vértice tiene en cuenta no sólo la longitud de la nueva arista, sino también todo el camino hasta dicho vértice. Es la diferencia con respecto al algoritmo de Prim.
- En cada paso inserta en T el vértice con menor longitud desde el origen (estrategia voraz óptima).
- Tras insertar un nuevo vértice $v_{sig}$, debe recalcular distancias de nodos conectados a $v_{sig}$ y T.

#### Dijkstra en detalle (ejemplo con 5 vértices 0..4, origen 0; "∞" = distancia aún desconocida; "∈ T" = vértice ya en T)
- Aristas del grafo (no dirigido): 0-1: 20, 0-2: 10, 1-2: 5, 1-3: 8, 1-4: 15, 2-3: 10, 2-4: 30, 3-4: 20.
- Paso 1: 0:(camino 0, d=0, ✓); 1:(0,1; 20; ✗); 2:(0,2; 10; ✗); 3:(∞; ✗); 4:(∞; ✗).
- Paso 2 (se añade 2): 1:(0,2,1; 15; ✗); 2:(0,2; 10; ✓); 3:(0,2,3; 20; ✗); 4:(0,2,4; 40; ✗).
- Paso 3 (se añade 1): 1:(0,2,1; 15; ✓); 3:(0,2,3; 20; ✗); 4:(0,2,1,4; 30; ✗).
- Paso 4 (se añade 3): 3:(0,2,3; 20; ✓); 4:(0,2,1,4; 30; ✗).
- Paso 5 (se añade 4): 4:(0,2,1,4; 30; ✓).
- Nota: el ejemplo usa un grafo no dirigido.

```
Dijkstra(G, s, t)
    // Entrada: G = <V,E>, es un grafo no dirigido, conexo,
    // y ponderado no negativamente con pesos w entre aristas
    // Salida: Distancias mínima d desde el vértice s hasta el t,
    // y todas las distancias mínimas a vértices que son menores que d

    T <- {s}
    desde i <- 1 hasta |V| hacer d_i <- ∞
    para cada arista (s, v) hacer d_v = w(s, v)
    ultimo <- s
    mientras (ultimo ≠ t) hacer
        seleccionar v_sig ∉ T       // el vértice desconocido que minimiza d
        para cada arista (v_sig, x) hacer
            d_x <- mín[d_x, d_vsig + w(v_sig, x)]
        ultimo <- v_sig
        T <- T ∪ {v_sig}

    devolver d
```

## K-medias
### K-medias
- Clustering: identificar grupos de puntos (datos) y asignar a cada punto uno de esos grupos.
- El algoritmo K-medias procura encontrar los K mejores representantes ("centroides", que también son puntos) de los datos, donde cada centroide representa un grupo. El representante de un dato es el más cercano a éste.
- K-medias intenta resolver el problema cuyo objetivo es minimizar la suma de distancias euclídeas (al cuadrado) entre cada dato y su centroide.
- (Se muestra una ejecución en 8 pasos sobre datos en el plano.)

### K-medias - pseudocódigo
- El problema de optimización asociado no es convexo, ni existe una fórmula analítica para la solución. Recurrimos a un algoritmo iterativo.
```
K-medias(D, K)
    Inicializar cada mu_k (valores aleatorios, datos concretos, etc.)
    repetir:
        (A) Escoge las mejores asignaciones a_ik para unos centroides mu_k fijos
        (B) Escoge los mejores centroides mu_k para unas asignaciones a_ik fijas
    hasta convergencia
```

### K-medias - Dos pasos
- (A): asignar $x_i$ a su centroide $\mu_k$ más cercano (el grupo sería $C_k$):
$$a_{ik}=\begin{cases}1 & \text{si }k=\arg\min_l\lVert x_i-\mu_l\rVert^2\\ 0 & \text{en caso contrario}\end{cases}$$
- (B): asignar a $\mu_k$ la media de los puntos asignados a él (a $C_k$):
$$\mu_k=\frac{1}{n_k}\sum_{i:\,x_i\text{ se asigna a }C_k}x_i,\qquad n_k=\sum_{i=1}^{N}a_{ik}$$
($n_k$ es el número de puntos $x_i$ asignados a $C_k$.)

### K-medias - problema de clustering que resuelve
- Sea $D=\{x_1,\dots,x_N\}$ un conjunto de "datos", donde $x_i\in\mathbb{R}^d$, que deseamos agrupar en K grupos $\{C_1,\dots,C_K\}$. Cada grupo está representado por un "centroide". Denotamos estos centroides mediante $\mu_1,\dots,\mu_K\in\mathbb{R}^d$.
- El problema (no convexo) consiste en minimizar:
$$L=\sum_{k=1}^{K}\sum_{i:\,x_i\text{ se asigna a }C_k}\lVert x_i-\mu_k\rVert^2=\sum_{k=1}^{K}\sum_{i=1}^{N}a_{ik}\lVert x_i-\mu_k\rVert^2,\qquad a_{ik}=\begin{cases}1&\text{si }x_i\text{ está asignado a }C_k\\0&\text{en caso contrario}\end{cases}$$
- Se garantiza que converge a un óptimo local. Convergencia: los centroides no varían tras una iteración. También se puede parar tras T pasos.
- No siempre encuentra el óptimo global: se suele ejecutar varias veces con diferentes inicializaciones.
- Asume que los clusters son "esféricos" (poco realista). Hay alternativas mejores de clustering.
- El problema es NP-duro. Se puede interpretar como un caso particular del algoritmo EM (expectation-maximization) de teoría de probabilidad.
