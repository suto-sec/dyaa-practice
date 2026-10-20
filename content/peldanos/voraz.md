# Peldaños: Algoritmos voraces
stage: voraz

## Orden
- t7-esquema: V01
- t7-monedas: V03 V14 8.3
- t7-tiempo-mezcla: V05 V15 8.4 V13 8.1
- t7-huffman: V06 8.5
- t7-mochila-3: V08 8.2
- t7-arm: V09 8.6 V16 8.7 8.8
- t7-dijkstra: V10 V17 8.9
### V01 · Los elementos de un voraz, con el cambio de monedas
nivel: 0.2

Un algoritmo voraz tiene: un conjunto de **candidatos**, una **función de selección** (qué candidato se mira primero), una de **factibilidad** (si cabe en la solución), una **función objetivo** (lo que se optimiza) y una **función solución** (cuándo se ha terminado).

Se quiere devolver $67$ céntimos con el menor número de monedas, con monedas de $50,20,10,5,2,1$ céntimos.
- a) Identifica los cinco elementos.
- b) Aplica el esquema paso a paso: moneda elegida y dinero que queda.
- c) ¿Cuántas monedas salen?

#### Pista
La selección es la moneda de mayor valor que no se pase de lo que queda por devolver. Una moneda se puede repetir tantas veces como quepa.

#### Solución
**Paso 1. Elementos.** a) Candidatos: los tipos de moneda. Selección: la de mayor valor posible. Factibilidad: que la suma no supere $67$. Objetivo: minimizar el número de monedas. Solución: monedas que suman exactamente $67$.

**Paso 2. Ejecución.** b) Quedan $67$: toma $50\to17$. $20$ no cabe; toma $10\to7$. $10$ no cabe; toma $5\to2$. Toma $2\to0$.

**Paso 3. Resultado.** c) $50+10+5+2=67$ con $4$ monedas.

### V03 · Cambio de monedas: cuándo no es óptimo
nivel: 0.3

- a) Con monedas de $1,2,5,10,20,50$ céntimos, devuelve $93$ céntimos con la estrategia voraz.
- b) Con el sistema de monedas $\{1,3,4\}$, devuelve $6$ con la estrategia voraz. ¿Cuántas monedas salen?
- c) ¿Hay una forma mejor con ese sistema? ¿Qué se concluye?

#### Pista
En b) la estrategia coge siempre la moneda mayor que quepa. Compara el resultado con probar combinaciones de $2$ monedas.

#### Solución
**Paso 1. a).** $50\to43$; $20\to23$; $20\to3$; $2\to1$; $1\to0$. Son $5$ monedas: $50+20+20+2+1$.

**Paso 2. b).** $4\to2$; $1\to1$; $1\to0$. Son $3$ monedas: $4+1+1$.

**Paso 3. c).** Con $3+3=6$ bastan $2$ monedas. La estrategia voraz no es óptima para cualquier sistema de monedas; sí lo es para el euro (y para $1,2,5,10,\dots$), pero hay que demostrarlo y depende del sistema.

### V05 · Mezclar listas ordenadas con el menor coste
nivel: 0.45

Hay cuatro listas ordenadas de tamaños $6,2,8,4$. Mezclar dos listas de tamaños $p$ y $q$ cuesta $p+q$ operaciones, y el resultado es una lista de tamaño $p+q$.
- a) Mézclalas en el orden en que están dadas ($6+2$, el resultado con la de $8$, y ese con la de $4$). ¿Cuánto cuesta en total?
- b) Aplica la estrategia voraz: mezcla siempre las dos listas más pequeñas disponibles.
- c) ¿Qué relación tiene con los códigos de Huffman?

#### Pista
Después de cada mezcla, la lista nueva vuelve al conjunto y se vuelven a buscar las dos más pequeñas.

#### Solución
**Paso 1. En orden.** a) $6+2=8$ (cuesta $8$); $8+8=16$ (cuesta $16$); $16+4=20$ (cuesta $20$). Total $44$.

**Paso 2. Voraz.** b) Tamaños $\{6,2,8,4\}$. Las dos menores: $2+4=6$ (coste $6$) $\to\{6,8,6\}$. Las dos menores: $6+6=12$ (coste $12$) $\to\{8,12\}$. Finalmente $8+12=20$ (coste $20$). Total $6+12+20=38<44$.

**Paso 3. Huffman.** c) Es la misma construcción: se juntan siempre los dos "pesos" más pequeños. En Huffman el peso es la frecuencia; aquí, el tamaño de la lista.

### V06 · Códigos de Huffman
nivel: 0.45

Seis caracteres con estas frecuencias (en %): $A=40$, $B=25$, $C=15$, $D=10$, $E=6$, $F=4$.
- a) Construye el árbol de Huffman: ordena y fusiona los dos menores hasta tener uno. Anota las fusiones.
- b) Escribe la longitud del código de cada carácter (sin el árbol, solo la profundidad de cada hoja).
- c) Calcula el número medio de bits por carácter y compáralo con usar $3$ bits fijos.

#### Pista
Si hay empate al elegir las dos menores, cualquiera sirve: el coste final es el mismo. Para una hoja, la longitud del código es el número de fusiones que la separan de la raíz.

#### Solución
**Paso 1. Fusiones.** a) Ordenadas: $F4,E6,D10,C15,B25,A40$. $F+E=10$. Quedan $D10,(FE)10,C15,B25,A40$: $D+(FE)=20$. Quedan $C15,20,B25,A40$: $C+20=35$. Quedan $B25,35,A40$: $B+35=60$. Quedan $A40,60$: $A+60=100$.

**Paso 2. Longitudes.** b) $A$: $1$. $B$: $2$. $C$: $3$. $D$: $4$. $E$ y $F$: $5$. Los menos frecuentes quedan más profundos.

**Paso 3. Media.** c) $0{,}40\cdot1+0{,}25\cdot2+0{,}15\cdot3+0{,}10\cdot4+0{,}06\cdot5+0{,}04\cdot5=2{,}25$ bits por carácter, frente a $3$ con longitud fija: un $25\%$ menos.

### V08 · La mochila con fracciones
nivel: 0.5

Mochila con capacidad $C=30$ y objetos de pesos $p=(6,10,12,20)$ y valores $v=(36,40,36,60)$. Los objetos se pueden partir.
- a) Calcula el valor por unidad de peso de cada objeto.
- b) Aplica la estrategia "mayor valor por unidad de peso" y calcula el valor total.
- c) Aplica la estrategia "mayor valor primero" y compara.
- d) Con los objetos $p=(10,20,30)$, $v=(60,100,120)$, $C=50$ y **sin** poder partir (mochila 0-1), ¿es óptima la estrategia del apartado b?

#### Pista
Para (b) mete objetos completos en orden de $v_i/p_i$ y, cuando el siguiente no quepa entero, mete la fracción que quede. En (d), compara el voraz con la combinación de los dos últimos objetos.

#### Solución
**Paso 1. Ratios.** a) $v_i/p_i=6,\ 4,\ 3,\ 3$.

**Paso 2. Voraz por ratio.** b) Entran el objeto $1$ (peso $6$, valor $36$), el $2$ (peso $10$, valor $40$) y el $3$ (peso $12$, valor $36$): peso $28$, valor $112$. Quedan $2$ unidades y se mete $\frac{2}{20}$ del objeto $4$: valor $6$. Total $118$.

**Paso 3. Mayor valor primero.** c) Primero el objeto $4$ (peso $20$, valor $60$), luego el $2$ (peso $10$, valor $40$): peso $30$, valor $100<118$. Esa selección no es óptima.

**Paso 4. Mochila 0-1.** d) Los ratios son $6,5,4$: el voraz mete los objetos $1$ y $2$ (peso $30$, valor $160$). Pero los objetos $2$ y $3$ pesan $50$ y valen $220$. En la mochila 0-1 el voraz por ratio **no** es óptimo (el problema es NP-completo).

### V09 · Kruskal y Prim en un grafo pequeño
nivel: 0.45

Grafo no dirigido con vértices $A,B,C,D,E$ y aristas:
$$A\!-\!B:4,\ A\!-\!C:2,\ B\!-\!C:1,\ B\!-\!D:5,\ C\!-\!D:8,\ C\!-\!E:10,\ D\!-\!E:3.$$
- a) Kruskal: ordena las aristas y elige en orden las que no formen ciclo, hasta tener $|V|-1$.
- b) Prim desde $A$: en cada paso, la arista más barata que une el conjunto ya alcanzado con un vértice nuevo.
- c) Compara los costes.

#### Pista
Kruskal rechaza una arista si sus dos extremos ya están conectados entre sí. Prim solo mira aristas con un extremo dentro y otro fuera.

#### Solución
**Paso 1. Kruskal.** a) Orden: $B\!-\!C(1),\ A\!-\!C(2),\ D\!-\!E(3),\ A\!-\!B(4),\ B\!-\!D(5),\dots$ Se aceptan $B\!-\!C$, $A\!-\!C$, $D\!-\!E$. $A\!-\!B$ cerraría el ciclo $A,B,C$ y se rechaza. $B\!-\!D$ conecta $\{A,B,C\}$ con $\{D,E\}$: se acepta. Ya hay $4$ aristas.

**Paso 2. Prim.** b) Alcanzado $\{A\}$: la menor es $A\!-\!C(2)$. Alcanzado $\{A,C\}$: la menor es $B\!-\!C(1)$. Alcanzado $\{A,B,C\}$: la menor es $B\!-\!D(5)$. Alcanzado $\{A,B,C,D\}$: queda $D\!-\!E(3)$.

**Paso 3. Costes.** c) Ambos: $1+2+3+5=11$, con las mismas aristas elegidas en distinto orden.

### V10 · Dijkstra paso a paso
nivel: 0.55

Grafo no dirigido con vértices $s,a,b,c,t$ y aristas:
$$s\!-\!a:2,\ s\!-\!b:5,\ a\!-\!b:1,\ a\!-\!c:6,\ b\!-\!c:2,\ b\!-\!t:7,\ c\!-\!t:1.$$
- a) Aplica Dijkstra desde $s$: en cada paso, el vértice con menor distancia entre los que faltan, y actualización de sus vecinos.
- b) ¿Cuáles son las distancias mínimas desde $s$ y el camino hasta $t$?
- c) ¿En qué se diferencia de Prim?

#### Pista
Anota una tabla de distancias. Al fijar un vértice $v$, para cada vecino $x$: $d_x=\min(d_x,\,d_v+w(v,x))$.

#### Solución
**Paso 1. Inicio.** a) $d_s=0$; $d_a=2$, $d_b=5$, $d_c=d_t=\infty$.

**Paso 2. Se fija $a$ (2).** $d_b=\min(5,2+1)=3$; $d_c=2+6=8$.

**Paso 3. Se fija $b$ (3).** $d_c=\min(8,3+2)=5$; $d_t=3+7=10$.

**Paso 4. Se fija $c$ (5).** $d_t=\min(10,5+1)=6$. Se fija $t$ (6).

**Paso 5. Resultado.** b) $d_a=2$, $d_b=3$, $d_c=5$, $d_t=6$. Camino a $t$: $s,a,b,c,t$ ($2+1+2+1$).

**Paso 6. Prim.** c) Prim elige la arista más barata hacia fuera, sin mirar el camino acumulado. Dijkstra elige por la distancia total desde $s$, y por eso recalcula las distancias tras cada paso.

### V13 · ¿Qué función de selección? Selección de actividades
nivel: 0.6

Actividades (intervalos $[c_i,f_i)$, compatibles si no se solapan): $A=[0,10)$, $X=[0,5)$, $Y=[4,6)$, $Z=[5,10)$. Se quiere el mayor número de actividades compatibles. Se prueban tres funciones de selección (siempre que sea factible con lo ya elegido):
- a) la que **empieza antes** (si empatan, la primera de la lista $A,X,Y,Z$);
- b) la de **menor duración**;
- c) la que **termina antes**.

Aplica cada una y compara con el óptimo.

#### Pista
Después de elegir una actividad, descarta las que se solapan con ella. Dos actividades $[c_1,f_1)$ y $[c_2,f_2)$ son compatibles si $c_2\ge f_1$ o $c_1\ge f_2$.

#### Solución
**Paso 1. Empieza antes.** a) Elige $A$ ($[0,10)$): solapa con todas. Total $1$.

**Paso 2. Menor duración.** b) Duraciones: $A=10$, $X=5$, $Y=2$, $Z=5$. Elige $Y$ ($[4,6)$), que solapa con $X$ y con $Z$. Total $1$.

**Paso 3. Termina antes.** c) Terminan en $10,5,6,10$: elige $X$ ($f=5$). Compatibles con $X$: $Z$ ($5\ge5$). $Y$ y $A$ solapan. Elige $Z$. Total $2$: $\{X,Z\}$.

**Paso 4. Conclusión.** El máximo es $2$ y solo "termina antes" lo consigue. Las otras dos tienen contraejemplos. (Para demostrar que "termina antes" es óptima, se razona que dejar libre el mayor tiempo posible nunca empeora.)

### V14 · El cambio de monedas, en código
nivel: 0.5

Completa la función que devuelve las monedas (de mayor a menor valor) para pagar una cantidad `x` en céntimos, con `monedas = [200, 100, 50, 20, 10, 5, 2, 1]` ordenadas de mayor a menor:
```python
def cambio(x, monedas):
    resultado = []
    for m in monedas:
        n = ________            # cuántas monedas de valor m caben en x
        resultado += [m] * n
        x = ________            # lo que queda por devolver
    return resultado
```
- a) Rellena los dos huecos.
- b) Ejecútala a mano para `x = 534` (5,34 €). ¿Cuántas monedas salen?
- c) ¿Qué cambia si `monedas` no está ordenada de mayor a menor?

#### Pista
`x // m` es el número entero de veces que cabe `m`, y `x % m` lo que sobra.

#### Solución
**Paso 1. Huecos.** a) `n = x // m` y `x = x % m` (o `x - n * m`).

**Paso 2. Ejecución.** b) $534$: con $200$ caben $2$ (quedan $134$); con $100$, $1$ (quedan $34$); con $50$, $0$; con $20$, $1$ (quedan $14$); con $10$, $1$ (quedan $4$); con $5$, $0$; con $2$, $2$ (quedan $0$); con $1$, $0$. Resultado: $[200,200,100,20,10,2,2]$, $7$ monedas.

**Paso 3. El orden.** c) La función de selección es "la mayor moneda que quepa". Si no están ordenadas, se puede coger una moneda pequeña antes de las grandes y salen más monedas de las necesarias.

### V15 · Mezclar con el menor coste, en código
nivel: 0.6

La estrategia de V05 (mezclar siempre las dos listas más pequeñas) se programa con un montículo de mínimos (`heapq`): se sacan las dos menores, se suma su coste y se vuelve a insertar la lista resultante. Completa:
```python
import heapq

def coste_minimo(tamanos):
    heapq.heapify(tamanos)
    total = 0
    while len(tamanos) > 1:
        a = heapq.heappop(tamanos)
        b = ________
        total += ________
        heapq.heappush(tamanos, ________)
    return total
```
- a) Rellena los huecos.
- b) Ejecútala con `[3, 9, 4, 5, 2]` anotando cada mezcla.
- c) ¿Qué coste tiene con $n$ listas?

#### Pista
Cada mezcla de listas de tamaños $a$ y $b$ cuesta $a+b$ y produce una lista de tamaño $a+b$. Un montículo da el mínimo en $O(1)$ y lo extrae en $O(\log n)$.

#### Solución
**Paso 1. Huecos.** a) `b = heapq.heappop(tamanos)`; `total += a + b`; `heapq.heappush(tamanos, a + b)`.

**Paso 2. Ejecución.** b) $\{2,3,4,5,9\}$: $2+3=5$ (coste $5$) $\to\{4,5,5,9\}$; $4+5=9$ (coste $9$) $\to\{5,9,9\}$; $5+9=14$ (coste $14$) $\to\{9,14\}$; $9+14=23$ (coste $23$). Total $5+9+14+23=51$.

**Paso 3. Coste.** c) $n-1$ mezclas, cada una con dos extracciones y una inserción: $O(n\log n)$. Es el mismo esquema que Huffman, donde en vez de sumar tamaños se unen árboles.

### V16 · Kruskal: la pieza del ciclo
nivel: 0.65

Para saber si una arista cierra un ciclo, Kruskal mantiene cada vértice en un grupo con un representante (`p[x]`). Completa:
```python
def find(p, x):
    while p[x] != x:
        x = ________
    return x

def kruskal(n, aristas):                 # aristas = [(peso, u, v), ...]
    p = list(range(n))
    arm = []
    for peso, u, v in sorted(aristas):
        ru, rv = find(p, u), find(p, v)
        if ________:                      # no cierra ciclo
            p[ru] = ________              # une los dos grupos
            arm.append((u, v, peso))
    return arm
```
- a) Rellena los huecos.
- b) Ejecútala con los vértices $A,B,C,D,E=0..4$ y las aristas de V09: $(4,A,B),(2,A,C),(1,B,C),(5,B,D),(8,C,D),(10,C,E),(3,D,E)$. Anota `p` tras cada arista aceptada.

#### Pista
Dos vértices están en el mismo grupo si `find` devuelve el mismo representante. Aceptar una arista es unir los dos grupos.

#### Solución
**Paso 1. Huecos.** a) `x = p[x]`; `if ru != rv:`; `p[ru] = rv`.

**Paso 2. Ejecución.** b) Orden: $(1,B,C)$: acepta, `p = [0,2,2,3,4]`. $(2,A,C)$: `find(A)=0`, `find(C)=2`, acepta: `p = [2,2,2,3,4]`. $(3,D,E)$: acepta: `p = [2,2,2,4,4]`. $(4,A,B)$: `find(A)=2` y `find(B)=2`, mismo grupo: **se rechaza**. $(5,B,D)$: `find(B)=2`, `find(D)=4`, acepta: `p = [2,2,4,4,4]`.

**Paso 3. Resultado.** El árbol tiene las aristas $B\!-\!C$, $A\!-\!C$, $D\!-\!E$, $B\!-\!D$, de coste $11$. El resto de aristas se rechazan porque ya están todos en el mismo grupo.

### V17 · Dijkstra en código
nivel: 0.7

Completa Dijkstra con una lista de distancias (sin montículo) para el grafo de V10 con $s,a,b,c,t=0..4$. Las aristas son `ady[u] = [(v, peso), ...]`:
```python
def dijkstra(ady, s):
    n = len(ady)
    d = [float('inf')] * n
    d[s] = 0
    fijo = [False] * n
    for _ in range(n):
        # el vértice sin fijar con menor distancia
        u = min((x for x in range(n) if not fijo[x]), key=lambda x: d[x])
        fijo[u] = True
        for v, w in ady[u]:
            if ________:                     # mejora el camino a v pasando por u
                d[v] = ________
    return d
```
- a) Rellena los huecos.
- b) Ejecútala y anota `d` tras fijar cada vértice.
- c) ¿Qué coste tiene con $n$ vértices?

#### Pista
Se mejora $v$ si $d[u]+w<d[v]$, y entonces $d[v]=d[u]+w$. El vértice que se fija en cada paso es el de menor distancia entre los no fijos.

#### Solución
**Paso 1. Huecos.** a) `if d[u] + w < d[v]:` y `d[v] = d[u] + w`.

**Paso 2. Ejecución.** b) Con $(s,a,b,c,t)$: al empezar `d = [0,∞,∞,∞,∞]`. Se fija $s$: `d = [0,2,5,∞,∞]`. Se fija $a$ (2): `d = [0,2,3,8,∞]`. Se fija $b$ (3): `d = [0,2,3,5,10]`. Se fija $c$ (5): `d = [0,2,3,5,6]`. Se fija $t$ (6): sin cambios. Resultado: `[0,2,3,5,6]`.

**Paso 3. Coste.** c) $n$ vueltas, cada una con una búsqueda del mínimo en $O(n)$ y la revisión de sus aristas: $\Theta(n^{2})$. Con un montículo baja a $O((n+m)\log n)$.

