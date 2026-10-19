## t7-esquema

Q: ¿En qué consiste un algoritmo voraz?
+ En tomar en cada paso la decisión localmente óptima, sin poder deshacerla después, con la esperanza de llegar a un óptimo global.
- En probar todas las soluciones y quedarse con la mejor.
- En dividir el problema en subproblemas y combinar.
- En volver atrás cuando una decisión falla.
? Son rápidos y fáciles de implementar, pero no siempre dan la solución óptima.

Q: ¿Cuál de estas NO es una de las funciones de un algoritmo voraz?
+ Función de ordenación de las soluciones.
- Función de selección.
- Función de factibilidad.
- Función objetivo.
? Los elementos son: conjunto de candidatos, selección, factibilidad, objetivo y solución.

Q: ¿Qué hace la función de **factibilidad**?
+ Comprueba si añadir un candidato a la solución parcial sigue siendo válido.
- Elige el mejor candidato.
- Decide el valor de la solución.
- Indica si se ha terminado.
? Si el candidato no es factible, se desecha.

Q: ¿Cuál es una desventaja de los algoritmos voraces?
+ Un óptimo local no implica un óptimo global; y es difícil encontrar la función de selección que garantice la elección óptima.
- Son muy lentos.
- Son difíciles de implementar.
- No sirven para problemas de optimización.
? Para ciertos problemas se puede demostrar que una estrategia voraz concreta sí es óptima.

## t7-camino

Q: En el camino más corto entre $v_0$ y $v_n$ (sólo hay caminos entre vértices adyacentes), ¿qué ocurre con la estrategia "coger el arco más corto en cada paso"?
+ Es óptima: se demuestra por contradicción.
- No es óptima: hay un contraejemplo.
- Sólo es óptima con tres vértices.
- Da siempre el camino más largo.
? Como entre vértices consecutivos las elecciones son independientes, la suma de los mínimos es el mínimo.

Q: Y en el grafo por etapas donde cada vértice se conecta con cualquiera de la etapa siguiente, la misma estrategia...
+ No es óptima: la voraz da una longitud de 23 y la óptima es 7.
- Es óptima también.
- Da 7 y la óptima es 23.
- No se puede aplicar.
? Elegir el arco más corto ahora puede obligar a coger después arcos muy largos.

Q: ¿Cómo se demuestra que una estrategia voraz **no** es óptima?
+ Con un contraejemplo.
- Por contradicción siempre.
- Con una simulación.
- Con una gráfica.
? Para demostrar que lo es hace falta una prueba (a menudo por contradicción).

## t7-monedas

Q: En el cambio de monedas, ¿cuál es la función de selección voraz?
+ La moneda de valor más alto que no supere lo que queda por devolver.
- La moneda de menor valor.
- Una moneda al azar.
- La moneda más frecuente.
? Para 2,24 € con monedas de 2, 1, 0,5, 0,2, 0,1, 0,05, 0,02 y 0,01 se obtienen 4 monedas.

Q: ¿Es óptima siempre esa estrategia?
+ No: depende del sistema monetario; con una moneda de 0,12 € para devolver 2,24 € da 4 monedas y la óptima es 3 (2 + 0,12 + 0,12).
- Sí, siempre.
- Sólo con monedas de 1 céntimo.
- Nunca es óptima.
? Con las monedas del euro sí lo es.

Q: ¿Cuál es la función de **factibilidad** en el cambio de monedas?
+ Que la suma de las monedas elegidas no supere la cantidad $X$ a devolver.
- Que se use el mínimo de monedas.
- Que todas las monedas sean distintas.
- Que la suma sea cero.
? La función objetivo es minimizar el número de monedas.

## t7-tiempo-mezcla

Q: Para minimizar el tiempo total en el sistema de $n$ clientes con tiempos $t_i$, ¿qué estrategia es óptima?
+ Atender por orden creciente de $t_i$.
- Atender por orden decreciente de $t_i$.
- Atender al azar.
- Atender primero al que tarde más.
? Con $t=(5,10,3)$, el orden $3,1,2$ da 29, el mejor de todos.

Q: En $T(P)=\sum_{k=1}^{n}(n-k+1)s_k$, ¿qué indica el coeficiente $n-k+1$?
+ El primer cliente atendido cuenta $n$ veces (todos esperan por él), el segundo $n-1$, etc.; por eso el menor tiempo debe ir primero.
- El número de clientes ya atendidos.
- La posición del cliente en la cola de espera.
- El tiempo de cada cliente.
? Haciendo $s_1$ lo menor posible, luego $s_2$, etc., se minimiza $T$.

Q: Para mezclar $m$ listas ordenadas por parejas con el menor número de operaciones, ¿qué estrategia voraz se usa?
+ Mezclar en cada momento las dos listas de menor tamaño.
- Mezclar las dos más grandes.
- Mezclar siempre la primera con la segunda.
- Mezclar al azar.
? Con tamaños 10, 20 y 30: $10+20=30$ y luego $30+30=60$, total 90, mejor que 100 o 110.

## t7-huffman

Q: En los códigos de Huffman, ¿qué estrategia voraz se sigue?
+ Fusionar repetidamente los dos árboles de menor frecuencia, hasta obtener un único árbol.
- Fusionar los dos árboles de mayor frecuencia.
- Asignar a cada carácter un código de longitud fija.
- Ordenar por orden alfabético.
? Se usa una cola de árboles con prioridades; los caracteres de menor frecuencia terminan con códigos más largos.

Q: ¿Cómo se obtiene el código de un carácter?
+ Con el camino desde la raíz hasta su hoja: 0 si se va por la izquierda y 1 si se va por la derecha.
- Con su posición en la cola.
- Con su frecuencia en binario.
- Con su código ASCII.
? Los caracteres más frecuentes quedan más cerca de la raíz y tienen códigos más cortos.

Q: En el ejemplo de 100000 caracteres con 6 símbolos, 3 bits por carácter son 300000 bits. ¿Y con Huffman?
+ 224000 bits.
- 100000 bits.
- 300000 bits también.
- 600000 bits.
? Los códigos de longitud variable asignan 1 bit a `a` (la más frecuente) y 3 o 4 bits a las demás.

Q: ¿Qué minimiza un código de Huffman?
+ El promedio de bits necesarios para representar los objetos, según sus frecuencias.
- La longitud del código más largo.
- El número de caracteres distintos.
- El tamaño del árbol.
? Es un método de compresión de datos.

## t7-mochila-1

Q: En la mochila de la versión 1 (maximizar el **número** de objetos que caben), ¿qué estrategia voraz es óptima?
+ Escoger los objetos por orden creciente de peso.
- Por orden decreciente de peso.
- Por mayor valor.
- Al azar.
? Con $C=15$ y $p=(9,5,6,4)$: creciente da 3 objetos (4+5+6) y decreciente sólo 2 (9+6).

Q: En la versión 2 (maximizar el **peso** que cabe), ¿qué ocurre con las estrategias por peso creciente o decreciente?
+ Ninguna es óptima ni mejor que la otra.
- La creciente siempre es óptima.
- La decreciente siempre es óptima.
- Las dos son óptimas.
? Con $C=15$ y $p=(9,6,5)$ la decreciente da 15 y la creciente 11; con $p=(10,7,6)$ la decreciente da 10 y la creciente 13.

Q: Las versiones 1 y 2 de la mochila son problemas de...
+ programación lineal entera ($x_i\in\{0,1\}$).
- programación lineal continua.
- programación convexa.
- ordenación.
? Las variables sólo pueden valer 0 o 1.

## t7-mochila-3

Q: En la mochila con **fracciones** ($0\le x_i\le1$), ¿qué función de selección es óptima?
+ Escoger el objeto con mayor valor por unidad de peso $v_i/p_i$.
- El de mayor valor.
- El de menor peso.
- El de mayor peso.
? Con $C=100$ y los datos del ejemplo, por $v_i/p_i$ se obtiene 164, frente a 146 por valor y 156 por peso.

Q: En el ejemplo $p=(10,20,30,40,50)$, $v=(20,30,66,40,60)$, ¿qué objeto tiene el mejor cociente $v_i/p_i$?
+ El 3, con $66/30=2{,}2$.
- El 1, con 2,0.
- El 5, con 1,2.
- El 4, con 1,0.
? Luego van el 1 (2,0) y el 2 (1,5), y el último objeto entra de forma parcial (0,8 del objeto 5).

Q: ¿Por qué la mochila 0-1 (sin fracciones) no se resuelve con la estrategia por $v_i/p_i$?
+ Es un problema NP-completo; la estrategia óptima para fracciones puede no serlo si los objetos no se pueden partir.
- Porque $v_i/p_i$ no está definido.
- Porque no tiene función objetivo.
- Porque siempre es óptima.
? Para la mochila 0-1 se usa, por ejemplo, backtracking.

## t7-arm

Q: Un árbol libre con $n$ vértices tiene...
+ $n-1$ aristas, y es un grafo conexo y acíclico.
- $n$ aristas.
- $n^2$ aristas.
- tantas aristas como se quiera.
? Si se añade una arista se crea un ciclo y si se quita una, quedan vértices sin conectar.

Q: ¿Cuál es la **propiedad fundamental** de los árboles de recubrimiento de coste mínimo?
+ Dado un conjunto $U\subset V$ no vacío, la arista más pequeña entre un vértice de $U$ y otro fuera de $U$ está en algún árbol de coste mínimo.
- La arista más larga siempre está.
- Todos los árboles de coste mínimo son iguales.
- La arista más pequeña del grafo nunca está.
? Se demuestra por reducción al absurdo; Prim y Kruskal la aplican.

Q: ¿Qué hace Kruskal en cada paso?
+ Selecciona la arista de menor peso que no forme un ciclo con las ya elegidas; para al llegar a $|V|-1$ aristas.
- Selecciona la arista de menor peso que salga de un vértice.
- Selecciona la arista de mayor peso.
- Añade un vértice nuevo.
? Parte del árbol vacío y no requiere ninguna condición sobre los extremos más allá de no crear ciclos.

Q: ¿Y Prim?
+ Parte de un vértice y añade la arista mínima que une un vértice ya tratado con uno que no lo está.
- Ordena todas las aristas y toma las menores.
- Quita aristas hasta que no queden ciclos.
- Elige aristas al azar.
? Mantiene un conjunto $U$ de vértices tratados.

Q: El árbol de recubrimiento de coste mínimo de un grafo...
+ No tiene por qué ser único.
- Es siempre único.
- No existe en grafos conexos.
- Es siempre el camino más corto.
? Puede haber varios con la misma suma de pesos.

## t7-dijkstra

Q: ¿Qué calcula el algoritmo de Dijkstra?
+ Los caminos mínimos desde un vértice origen al resto, en un grafo ponderado no negativamente.
- El árbol de recubrimiento mínimo.
- El camino más largo.
- El ciclo hamiltoniano.
? Sirve en grafos dirigidos y no dirigidos (en estos, cada arista se sustituye por dos con el mismo peso).

Q: ¿Qué diferencia a Dijkstra de Prim?
+ Dijkstra tiene en cuenta todo el camino desde el origen hasta el nuevo vértice, no sólo la longitud de la nueva arista.
- Que Dijkstra no usa aristas.
- Que Prim usa pesos negativos y Dijkstra no.
- No hay diferencia.
? En cada paso inserta el vértice con menor longitud desde el origen.

Q: Tras insertar un vértice $v_{sig}$ en $T$, ¿qué hace Dijkstra?
+ Recalcula las distancias de los nodos conectados a $v_{sig}$: $d_x\leftarrow\min[d_x,\,d_{v_{sig}}+w(v_{sig},x)]$.
- Vuelve a empezar desde el origen.
- Borra $v_{sig}$.
- Ordena todas las aristas.
? Es una estrategia voraz óptima porque siempre se inserta el vértice con menor $d$.

Q: En el ejemplo de 5 vértices con origen 0, ¿cuál es la distancia final al vértice 4?
+ 30, por el camino $0,2,1,4$.
- 15
- 40
- 20
? Primero entra el 2 ($d=10$), luego el 1 ($d=15$) y el 4 se alcanza por el 1: $15+15=30$, mejor que $10+30=40$ por el 2.

## t7-kmedias

Q: ¿Qué minimiza el algoritmo K-medias?
+ La suma de las distancias euclídeas al cuadrado entre cada dato y su centroide.
- El número de datos.
- La distancia entre los centroides.
- El número de grupos.
? Es un problema no convexo y no hay fórmula analítica, así que se recurre a un algoritmo iterativo.

Q: ¿Cuáles son los dos pasos que se repiten?
+ (A) Asignar cada punto al centroide más cercano; (B) mover cada centroide a la media de los puntos asignados.
- (A) Ordenar los datos; (B) dividirlos en mitades.
- (A) Elegir $K$; (B) contar los puntos.
- (A) Calcular el gradiente; (B) detener.
? Se repite hasta que los centroides no varían.

Q: ¿Garantiza K-medias el óptimo global?
+ No: converge a un óptimo local, por eso se ejecuta varias veces con distintas inicializaciones.
- Sí, siempre.
- Sólo si $K=1$.
- Sólo con datos ordenados.
? Además asume clusters "esféricos", lo que es poco realista.

Q: ¿Qué se necesita decidir antes de ejecutar K-medias?
+ El número $K$ de grupos y los centroides iniciales (aleatorios o datos concretos).
- El número de dimensiones.
- Las clases de cada dato.
- El orden de los puntos.
? En clustering no hay información de clases.
