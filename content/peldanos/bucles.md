# Peldaños: Coste de algoritmos iterativos
stage: bucles

## Orden
- t31-insert: B01 B02 B03 B04 B05
- t31-general: B06 2.9 B07 B08 2.6 2.7 B09 2.8 B10 B11

### B01 · Cuántas veces se ejecuta el cuerpo
nivel: 0.2

**Ejemplo resuelto.** `for i in range(5)` da a $i$ los valores $0,1,2,3,4$: el cuerpo se ejecuta $5$ veces. Con $n$ en lugar de $5$, $n$ veces.

**Ahora tú.** ¿Cuántas veces se ejecuta el cuerpo?
- a) `for i in range(n)`
- b) `for i in range(1, n)`
- c) `for i in range(2, n + 1)`
- d) `for i in range(0, n, 2)`, con $n$ par
- e) `i = 1` y `while i < n: i = i * 2`, con $n$ potencia de $2$

#### Pista
Escribe los valores que toma $i$ para un $n$ pequeño, por ejemplo $n=8$, y cuéntalos. Recuerda que `range(a, b)` llega hasta $b-1$.

#### Solución
**Paso 1. Escribe los valores con $n=8$.** a) $0,\dots,7$: $8$. b) $1,\dots,7$: $7$. c) $2,\dots,8$: $7$. d) $0,2,4,6$: $4$. e) $i=1,2,4$ (cuando $i=8$ ya no se cumple $i<8$): $3$.

**Paso 2. Generaliza.** a) $n$. b) $n-1$. c) $n-1$ (de $2$ a $n$ hay $n-2+1$). d) $n/2$ (se salta de dos en dos). e) $\log_2n$: en cada vuelta $i$ se dobla, y hacen falta $\log_2n$ dobles para llegar de $1$ a $n$.

### B02 · El coste de un bucle
nivel: 0.3

Para contar operaciones, la inicialización, cada comparación y cada incremento cuentan $1$. El coste de un bucle que se repite $n$ veces es
$$T=1_{\text{inic.}}+\sum_{i=1}^{n}\bigl(1_{\text{comp.}}+T_{\text{cuerpo}}+1_{\text{incr.}}\bigr)+1_{\text{última comp.}}$$

**Ejemplo resuelto.** `for i in range(n): x += 1` (el cuerpo es $1$ operación): $T=1+n(1+1+1)+1=3n+2$.

**Ahora tú.** Calcula $T$ en función de $n$:
- a) `for i in range(n)`, con un cuerpo de $2$ operaciones
- b) `for i in range(1, n)`, con un cuerpo de $1$ operación
- c) Comprueba (a) y (b) con $n=3$ contando una a una.

#### Pista
Primero cuenta las iteraciones (como en el ejercicio anterior); la fórmula es "$1+$ iteraciones $\times$ (qué cuesta una vuelta) $+\,1$".

#### Solución
**Paso 1. a).** $n$ iteraciones, cada una $1+2+1=4$: $T=1+4n+1=4n+2$.

**Paso 2. b).** $n-1$ iteraciones, cada una $1+1+1=3$: $T=1+3(n-1)+1=3n-1$.

**Paso 3. Comprueba con $n=3$.** a) $4\cdot3+2=14$: inicio ($1$), tres vueltas de $4$ ($12$) y la última comparación ($1$). b) $3\cdot3-1=8$: inicio ($1$), dos vueltas de $3$ ($6$) y la última comparación ($1$).

**Paso 4. Orden.** Los dos son $\Theta(n)$: las constantes no cambian el orden.

### B03 · Dos bucles anidados: contar
nivel: 0.4

Cuenta cuántas veces se ejecuta `c += 1`:
```python
for i in range(n):            # (a)
    for j in range(n):
        c += 1

for i in range(n):            # (b)
    for j in range(i):
        c += 1

for i in range(n):            # (c)
    for j in range(i, n):
        c += 1
```
**Ejemplo resuelto para (b) con $n=4$.** $i=0$: $0$ veces; $i=1$: $1$; $i=2$: $2$; $i=3$: $3$. Total $6$.

**Ahora tú.** Haz lo mismo para (a) y (c) con $n=4$, y da la fórmula en función de $n$ para los tres.

#### Pista
La vuelta $i$ del bucle exterior repite el cuerpo tantas veces como iteraciones tiene el interior para ese $i$. Después suma sobre $i$.

#### Solución
**Paso 1. Tabla con $n=4$.** (a) $4+4+4+4=16$. (b) $0+1+2+3=6$. (c) $4+3+2+1=10$.

**Paso 2. Fórmulas.** (a) $\sum_{i=0}^{n-1}n=n^{2}$. (b) $\sum_{i=0}^{n-1}i=\dfrac{n(n-1)}{2}$. (c) $\sum_{i=0}^{n-1}(n-i)=\dfrac{n(n+1)}{2}$.

**Paso 3. Comprueba y ordena.** Con $n=4$: $16$, $\frac{4\cdot3}{2}=6$, $\frac{4\cdot5}{2}=10$. Los tres son $\Theta(n^{2})$, aunque (b) hace la mitad de trabajo que (a).

### B04 · Insertion-sort, a mano
nivel: 0.5

```python
def insert_sort(a):
    for j in range(1, len(a)):
        val = a[j]
        i = j - 1
        while i >= 0 and a[i] > val:
            a[i + 1] = a[i]
            i = i - 1
        a[i + 1] = val
```
Sea $t_j$ el número de veces que se ejecuta el cuerpo del `while` para un valor de $j$.
- a) Aplícalo a $[2,5,1,4,3]$ y anota $t_1,t_2,t_3,t_4$.
- b) ¿Qué vale $\sum t_j$ si el vector ya está ordenado, como $[1,2,3,4,5]$?
- c) ¿Y si está en orden inverso, $[5,4,3,2,1]$? Da la fórmula para $n$ elementos.

#### Pista
En cada $j$, el `while` desplaza a la derecha los elementos de la parte ordenada que son mayores que `val`. $t_j$ es cuántos desplaza.

#### Solución
**Paso 1. a), vuelta a vuelta.** $j=1$: `val`$=5$, no hay nada mayor delante: $t_1=0$. $j=2$: `val`$=1$ desplaza el $5$ y el $2$: $t_2=2$. Queda $[1,2,5,4,3]$. $j=3$: `val`$=4$ desplaza el $5$: $t_3=1$. Queda $[1,2,4,5,3]$. $j=4$: `val`$=3$ desplaza el $5$ y el $4$: $t_4=2$. Total $\sum t_j=5$.

**Paso 2. Mejor caso.** b) Ordenado: nadie se desplaza, $t_j=0$ para todo $j$ y $\sum t_j=0$.

**Paso 3. Peor caso.** c) Inverso: cada `val` es menor que todos los de delante, así que $t_j=j$. Para $n=5$: $1+2+3+4=10$. En general $\sum_{j=1}^{n-1}j=\dfrac{n(n-1)}{2}$.

### B05 · El coste de insertion-sort
nivel: 0.7

Con el mismo código de insertion-sort del ejercicio anterior, suponemos que **cada línea ejecutada cuesta $1$**. Las veces que se ejecuta cada línea son:

| línea | veces |
|---|---|
| `for j ...` | $n$ |
| `val = a[j]` | $n-1$ |
| `i = j - 1` | $n-1$ |
| `while ...` (la condición) | $\sum_{j=1}^{n-1}(t_j+1)$ |
| `a[i+1] = a[i]` | $\sum_{j=1}^{n-1}t_j$ |
| `i = i - 1` | $\sum_{j=1}^{n-1}t_j$ |
| `a[i+1] = val` | $n-1$ |

- a) Calcula $T(n)$ en el mejor caso ($t_j=0$).
- b) Calcula $T(n)$ en el peor caso ($t_j=j$).
- c) Comprueba las dos fórmulas con $n=5$ y da el orden de cada una.

#### Pista
Suma todas las filas de la tabla. En el peor caso necesitas $\sum_{j=1}^{n-1}j=\frac{n(n-1)}{2}$ y $\sum_{j=1}^{n-1}(j+1)=\frac{n(n+1)}{2}-1$.

#### Solución
**Paso 1. Mejor caso.** a) $n+(n-1)+(n-1)+(n-1)+0+0+(n-1)=5n-4$. El `while` solo evalúa su condición una vez por vuelta.

**Paso 2. Peor caso, las filas.** b) Condición: $\frac{n(n+1)}{2}-1$. Cuerpo del `while`, dos líneas: $2\cdot\frac{n(n-1)}{2}=n(n-1)$. Las otras cuatro suman $n+3(n-1)=4n-3$.

**Paso 3. Peor caso, el total.** $T(n)=4n-3+\dfrac{n(n+1)}{2}-1+n(n-1)=\dfrac{3n^{2}}{2}+\dfrac{7n}{2}-4$.

**Paso 4. Comprueba con $n=5$.** Mejor: $5\cdot5-4=21$ (suma de la tabla: $5+4+4+4+4$). Peor: $\frac{3\cdot25}{2}+\frac{35}{2}-4=51$ (suma de la tabla: $5+4+4+14+10+10+4$). Mejor caso $\Theta(n)$, peor caso $\Theta(n^{2})$.

### B06 · Un doble bucle triangular, con la fórmula
nivel: 0.6

Con la convención del ejercicio B02 (inicialización, comparación, incremento y cada operación del cuerpo cuentan $1$), calcula $T(n)$ de
```python
for i in range(n):
    for j in range(i):
        x += 1
```
- a) Coste del bucle interior para un $i$ dado.
- b) Coste del bucle exterior, sumando sobre $i$.
- c) Comprueba con $n=2$ contando una a una.

#### Pista
El bucle interior hace $i$ vueltas de $1+1+1=3$ más $2$ (inicialización y última comparación). El exterior suma ese coste, más $2$ por vuelta, para $i=0,\dots,n-1$.

#### Solución
**Paso 1. Bucle interior.** a) $T_{\text{int}}(i)=1+3i+1=3i+2$.

**Paso 2. Bucle exterior.** b) $T(n)=1+\sum_{i=0}^{n-1}\bigl(1+(3i+2)+1\bigr)+1=2+\sum_{i=0}^{n-1}(3i+4)$.

**Paso 3. Resuelve las sumas.** $\sum_{i=0}^{n-1}3i=\dfrac{3n(n-1)}{2}$ y $\sum_{i=0}^{n-1}4=4n$. Por tanto $T(n)=2+\dfrac{3n(n-1)}{2}+4n=\dfrac{3n^{2}+5n+4}{2}$.

**Paso 4. Comprueba con $n=2$.** El interior cuesta $2$ para $i=0$ y $5$ para $i=1$. El exterior: $1+(1+2+1)+(1+5+1)+1=13$. La fórmula da $\frac{12+10+4}{2}=13$. Orden: $\Theta(n^{2})$.

### B07 · El orden de un bucle, sin contar todo
nivel: 0.65

Da el orden $\Theta$ del número de veces que se ejecuta `trabajo()` (una operación) en cada fragmento:
```python
# (a)
for i in range(n):
    for j in range(n):
        trabajo()
# (b)
for i in range(n):
    j = 1
    while j < n:
        trabajo()
        j = j * 2
# (c)
for i in range(n):
    for j in range(n):
        for k in range(n):
            trabajo()
# (d)
for i in range(n):
    for j in range(i * i):
        trabajo()
# (e)
for i in range(n):
    trabajo()
for i in range(n):
    for j in range(n):
        trabajo()
# (f)
for i in range(n):
    for j in range(5):
        trabajo()
```

#### Pista
Escribe, para cada fragmento, el sumatorio de las vueltas: "bucle exterior $\times$ vueltas del interior". Un `while` que dobla `j` da $\log_2n$ vueltas.

#### Solución
**Paso 1. (a), (c), (f).** (a) $\sum_{i}\sum_{j}1=n^{2}$: $\Theta(n^{2})$. (c) $n^{3}$: $\Theta(n^{3})$. (f) $5n$: $\Theta(n)$.

**Paso 2. (b).** El `while` da $\log_2n$ vueltas en cada una de las $n$ del bucle exterior: $n\log_2n$, $\Theta(n\log n)$.

**Paso 3. (d).** $\sum_{i=0}^{n-1}i^{2}=\dfrac{(n-1)n(2n-1)}{6}\in\Theta(n^{3})$.

**Paso 4. (e).** Dos bucles seguidos se suman: $n+n^{2}\in\Theta(n^{2})$. Manda el mayor.

### B08 · Burbuja: contar comparaciones
nivel: 0.7

```python
def bubble_sort(a):
    n = len(a)
    for i in range(0, n - 1):
        for j in range(n - 1, i, -1):
            if a[j - 1] > a[j]:
                a[j - 1], a[j] = a[j], a[j - 1]
```
- a) ¿Cuántas veces se evalúa la condición del `if` para cada $i$?
- b) ¿Cuántas en total? Calcúlalo para $n=5$ y para $n$ general.
- c) ¿Cuántos intercambios hace con $[1,2,3,4,5]$? ¿Y con $[5,4,3,2,1]$?
- d) ¿De qué orden es el algoritmo en el mejor y en el peor caso?

#### Pista
Para un $i$, `j` va de $n-1$ hasta $i+1$ (bajando): son $n-1-i$ valores.

#### Solución
**Paso 1. Por cada $i$.** a) $n-1-i$ comparaciones.

**Paso 2. Total.** b) $\sum_{i=0}^{n-2}(n-1-i)=(n-1)+(n-2)+\cdots+1=\dfrac{n(n-1)}{2}$. Con $n=5$: $4+3+2+1=10$.

**Paso 3. Intercambios.** c) Con el vector ordenado la condición nunca es cierta: $0$ intercambios. Con el vector inverso, cada comparación encuentra una pareja desordenada: $10$ intercambios para $n=5$.

**Paso 4. Orden.** d) Las comparaciones no dependen de los datos: siempre $\frac{n(n-1)}{2}$. En los dos casos el coste es $\Theta(n^{2})$. Solo cambia el número de intercambios, que es una constante por cada comparación.

### B09 · Salir antes de tiempo
nivel: 0.7

Halla el orden $\Theta$ en el mejor y en el peor caso:
```python
def contiene(a, x):
    for i in range(len(a)):
        if a[i] == x:
            return True
    return False

def hay_repetidos(a):
    n = len(a)
    for i in range(n):
        for j in range(i + 1, n):
            if a[i] == a[j]:
                return True
    return False
```
- a) `contiene`, mejor y peor caso.
- b) `hay_repetidos`, mejor y peor caso. En el peor, calcula el número de comparaciones para $n=5$ y para $n$ general.

#### Pista
El mejor caso es el que sale de los bucles lo antes posible. El peor es el que nunca encuentra lo que busca y recorre todo.

#### Solución
**Paso 1. a).** Mejor caso: `x` es `a[0]` y se sale tras una comparación: $\Theta(1)$. Peor caso: `x` no está y se recorre toda la lista: $\Theta(n)$.

**Paso 2. b), mejor caso.** `a[0] == a[1]`: una comparación, $\Theta(1)$.

**Paso 3. b), peor caso.** Todos distintos: se comparan todas las parejas. Para cada $i$ hay $n-1-i$ comparaciones: $\sum_{i=0}^{n-1}(n-1-i)=\dfrac{n(n-1)}{2}$. Con $n=5$: $10$. Orden $\Theta(n^{2})$.

### B10 · Un bucle cuyo tamaño se divide por dos
nivel: 0.8

```python
m = n
while m >= 1:
    for i in range(m):
        trabajo()
    m = m // 2
```
Con $n$ potencia de $2$:
- a) ¿Cuántas veces se llama a `trabajo()` si $n=8$?
- b) ¿Y para $n$ general? Usa una serie geométrica.
- c) ¿Cuál es el orden? ¿Por qué no es $n\log n$, si el `while` da $\log_2n+1$ vueltas?

#### Pista
En cada vuelta del `while` el `for` hace $m$ iteraciones, y $m$ vale $n,\frac n2,\frac n4,\dots,1$.

#### Solución
**Paso 1. Caso $n=8$.** a) $m=8,4,2,1$: $8+4+2+1=15$ llamadas.

**Paso 2. Caso general.** b) $\sum_{k=0}^{\log_2n}\dfrac{n}{2^{k}}=n\sum_{k=0}^{\log_2n}\left(\tfrac12\right)^{k}=n\left(2-\dfrac{1}{n}\right)=2n-1$. Con $n=8$ da $15$.

**Paso 3. Orden.** c) $\Theta(n)$. El `for` solo hace $n$ vueltas la primera vez; después la mitad, la cuarta parte... Las vueltas del `while` son $\log_2n$, pero cada una trabaja menos que la anterior, así que el producto $n\log n$ sobreestima. Si el `for` hiciera siempre $n$ vueltas, sí saldría $\Theta(n\log n)$.

### B11 · Tres bucles: cambiar el orden de la suma
nivel: 0.9

```python
for i in range(n):
    for j in range(i + 1, n + 1):
        for k in range(j):
            trabajo()
```
- a) Cuenta a mano cuántas veces se llama a `trabajo()` con $n=2$.
- b) Escribe el total como $\displaystyle\sum_{i=0}^{n-1}\sum_{j=i+1}^{n}j$.
- c) Cambia el orden de las sumas: ¿cuántas veces aparece cada valor de $j$ y cuánto vale el total?
- d) Comprueba con $n=3$ y da el orden.

#### Pista
En lugar de fijar $i$ y recorrer $j$, fija $j$ y pregunta: ¿para cuántos valores de $i$ se cumple $i+1\le j\le n$? Es decir, $0\le i\le j-1$.

#### Solución
**Paso 1. $n=2$ a mano.** a) $i=0$: $j=1$ da $1$ llamada, $j=2$ da $2$. $i=1$: $j=2$ da $2$. Total $5$.

**Paso 2. Plantea el sumatorio.** b) La vuelta $(i,j)$ ejecuta el `for k` $j$ veces: $\sum_{i=0}^{n-1}\sum_{j=i+1}^{n}j$.

**Paso 3. Cambia el orden.** c) El valor $j$ ($1\le j\le n$) aparece para $i=0,\dots,j-1$, es decir, $j$ veces. El total es $\sum_{j=1}^{n}j\cdot j=\sum_{j=1}^{n}j^{2}=\dfrac{n(n+1)(2n+1)}{6}$. Con $n=2$: $\frac{2\cdot3\cdot5}{6}=5$.

**Paso 4. Comprueba y ordena.** d) $n=3$: $i=0$: $1+2+3=6$; $i=1$: $2+3=5$; $i=2$: $3$. Total $14$ y $\frac{3\cdot4\cdot7}{6}=14$. Orden $\Theta(n^{3})$.
