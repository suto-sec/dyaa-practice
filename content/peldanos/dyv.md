# Peldaños: Divide y vencerás
stage: dyv

## Orden
- t5-intro: D01
- t5-newton: D03
- t5-dyv: D04 D05 6.1 D15 6.2 D17 6.3
- t5-ordenacion: D06 D07 D08
- t5-multiplicacion: D11 D12 6.5 6.7 6.8 6.4 6.6 D16
- t5-otros: D14

### D01 · Qué estrategia es
nivel: 0.2

Según el número de llamadas recursivas del caso recursivo: ninguna (se reduce a *otro* problema) es **transforma y vencerás**; una sola, con un problema más pequeño, es **decrementa y vencerás**; dos o más es **divide y vencerás**.

**Ejemplo resuelto.** `factorial(n) = n * factorial(n - 1)`: una llamada con $n-1$. Decrementa y vencerás.

**Ahora tú.** Clasifica:
- a) `pot(x, n) = pot(x, n // 2) ** 2` (para $n$ par)
- b) `maximo(a) = max(maximo(a[:m]), maximo(a[m:]))`
- c) La mediana de una lista, ordenándola y mirando el elemento central
- d) Quicksort: partir según un pivote y ordenar las dos partes
- e) Búsqueda binaria en una lista ordenada
- f) $\sqrt a$ buscando un cero de $x^{2}-a$ con Newton-Raphson

#### Pista
Cuenta las llamadas recursivas del caso recursivo. Si no hay recursión sino que el problema se convierte en otro, es una transformación.

#### Solución
**Paso 1. Una llamada.** a) Una llamada con $n/2$: decrementa y vencerás. e) Búsqueda binaria: una llamada con una de las mitades, decrementa y vencerás.

**Paso 2. Dos llamadas.** b) Dos llamadas con las mitades: divide y vencerás. d) Dos llamadas con las partes, y combinar es trivial: divide y vencerás.

**Paso 3. Se transforma en otro problema.** c) La mediana se reduce a ordenar. f) La raíz se reduce a hallar un cero de una función. Ambos son transforma y vencerás.

### D03 · Newton-Raphson para una raíz cuadrada
nivel: 0.4

Para $\sqrt a$ la regla de Newton-Raphson es $x_{n+1}=\dfrac{x_n^{2}+a}{2x_n}$. Toma $a=10$ y $x_0=10$.
- a) Calcula $x_1,x_2,x_3,x_4$ (con 6 decimales).
- b) Calcula en cada paso el error $x_n^{2}-10$. ¿Cómo evoluciona?
- c) Escribe una función `raiz(a, tol)` que itere hasta que $|x^{2}-a|<$ `tol`.

#### Pista
Es un bucle: cada vez sustituyes $x$ por $\frac{x^{2}+a}{2x}$. Con calculadora, redondea al final, no en medio.

#### Solución
**Paso 1. Iteraciones.** a) $x_1=\frac{100+10}{20}=5{,}5$; $x_2=3{,}659091$; $x_3=3{,}196005$; $x_4=3{,}162456$. (El valor exacto es $\sqrt{10}=3{,}162278\ldots$)

**Paso 2. Errores.** b) $x_1^{2}-10\approx20{,}3$; $x_2^{2}-10\approx3{,}39$; $x_3^{2}-10\approx0{,}214$; $x_4^{2}-10\approx0{,}00113$. Baja muy deprisa: cada paso eleva casi al cuadrado el error pequeño que había.

**Paso 3. Código.** c)
```python
def raiz(a, tol):
    x = a
    while abs(x * x - a) >= tol:
        x = (x * x + a) / (2 * x)
    return x
```
Con `raiz(10, 1e-6)` termina en 5 iteraciones.

### D04 · Trazar el máximo
nivel: 0.3

```python
def maximo(a):
    n = len(a)
    if n == 1:
        return a[0]
    mitad = n // 2
    return max(maximo(a[:mitad]), maximo(a[mitad:]))
```
- a) Dibuja el árbol de llamadas de `maximo([3, 9, 2, 7])`: qué lista recibe cada llamada.
- b) ¿Cuántas llamadas hay en total? ¿Cuántas llamadas al `max` de dos números?
- c) Generaliza para $n$ potencia de $2$.

#### Pista
Cada llamada con más de un elemento hace dos llamadas con las mitades. Las llamadas sin hijos son las hojas.

#### Solución
**Paso 1. Árbol.** a) `[3,9,2,7]` $\to$ `[3,9]` y `[2,7]`; `[3,9]` $\to$ `[3]` y `[9]`; `[2,7]` $\to$ `[2]` y `[7]`. Las hojas devuelven $3,9,2,7$. Después `max(3,9)=9`, `max(2,7)=7`, `max(9,7)=9`.

**Paso 2. Cuenta.** b) $1+2+4=7$ llamadas. Hay $3$ llamadas al `max` (una por llamada interior).

**Paso 3. General.** c) Con $n$ hojas hay $n-1$ llamadas interiores: $2n-1$ llamadas y $n-1$ comparaciones. $T(n)=2T(n/2)+1$ da $\Theta(n)$: dividir en dos no ayuda, hay que mirar todos los elementos.

### D05 · Escribir un divide y vencerás con el esquema
nivel: 0.45

Diseña `suma(a)` que devuelva la suma de los elementos de una lista no vacía, con divide y vencerás. Rellena el esquema:
1. Tamaño del problema.
2. Caso base.
3. Descomposición.
4. Combinación.

Después escribe el código y comprueba con `[1, 2, 3, 4, 5]`. ¿Qué recurrencia sale y cuál es su orden?

#### Pista
Es el mismo esquema que el máximo; solo cambia qué se hace con los dos resultados. Con una lista de longitud impar las mitades no son iguales; no importa.

#### Solución
**Paso 1. Esquema.** Tamaño: $n=$`len(a)`. Caso base: si $n=1$, el resultado es `a[0]`. Descomposición: la mitad izquierda `a[:mitad]` y la derecha `a[mitad:]`. Combinación: la suma de las dos sumas.

**Paso 2. Código.**
```python
def suma(a):
    n = len(a)
    if n == 1:
        return a[0]
    mitad = n // 2
    return suma(a[:mitad]) + suma(a[mitad:])
```
**Paso 3. Prueba.** `suma([1,2,3,4,5])`: `[1,2]` da $3$, `[3,4,5]` da $3+9=12$ (con `[3]` y `[4,5]`), total $15$.

**Paso 4. Coste.** $T(n)=2T(n/2)+c$, $\Theta(n)$ como el máximo. Recuerda que los trozos `a[:mitad]` cuestan una copia: si se cuenta, saldría $T(n)=2T(n/2)+n$, $\Theta(n\log n)$.

### D06 · Mezclar dos listas ordenadas
nivel: 0.3

La combinación de mergesort compara los primeros elementos de las dos listas, se queda con el menor, y repite. Mezcla a mano $a=[2,5,9]$ y $b=[1,5,6,10]$.
- a) Escribe qué comparación se hace en cada paso y qué elemento sale. Si hay empate, sale el de $b$.
- b) ¿Cuántas comparaciones se hacen hasta que una lista se vacía?
- c) ¿Cuál es el máximo de comparaciones para listas de tamaños $p$ y $q$?

#### Pista
Cuando una de las listas se vacía, lo que queda de la otra se copia sin comparar.

#### Solución
**Paso 1. Los pasos.** a) $2$ vs $1$: sale $1$. $2$ vs $5$: sale $2$. $5$ vs $5$: sale el $5$ de $b$. $5$ vs $6$: sale el $5$ de $a$. $9$ vs $6$: sale $6$. $9$ vs $10$: sale $9$ y $a$ queda vacía. Se copia $10$.

**Paso 2. Resultado.** El resultado es $[1,2,5,5,6,9,10]$ y se han hecho $6$ comparaciones.

**Paso 3. Máximo.** c) Cada comparación saca un elemento y la última deja el resto sin comparar: como mucho $p+q-1$ comparaciones. Aquí $3+4-1=6$.

### D07 · Mergesort paso a paso
nivel: 0.5

Con el `merge_sort` de los apuntes (`mitad = n // 2`, `a[:mitad]` y `a[mitad:]`), ordena $[5,2,8,1,9,3]$.
- a) Dibuja el árbol de divisiones hasta listas de un elemento.
- b) Anota las mezclas en orden y su resultado.
- c) ¿Cuántas mezclas hay y cuántos niveles tiene el árbol?

#### Pista
Con $6$ elementos, `mitad = 3`: salen dos listas de $3$. Con $3$ elementos, `mitad = 1`: salen una de $1$ y una de $2$.

#### Solución
**Paso 1. Divisiones.** a) `[5,2,8,1,9,3]` $\to$ `[5,2,8]` y `[1,9,3]`. `[5,2,8]` $\to$ `[5]` y `[2,8]`. `[2,8]` $\to$ `[2]` y `[8]`. `[1,9,3]` $\to$ `[1]` y `[9,3]`. `[9,3]` $\to$ `[9]` y `[3]`.

**Paso 2. Mezclas.** b) En orden de ejecución: `[2]+[8]`$\to[2,8]$; `[5]+[2,8]`$\to[2,5,8]$; `[9]+[3]`$\to[3,9]$; `[1]+[3,9]`$\to[1,3,9]$; `[2,5,8]+[1,3,9]`$\to[1,2,3,5,8,9]$.

**Paso 3. Cuenta.** c) $5$ mezclas, es decir, $n-1$ (cada una une dos listas en una). Niveles: $1+\lceil\log_2 6\rceil=4$ (de $6$ hasta listas de $1$).

### D08 · Insertar en una lista ordenada
nivel: 0.6

El insert-sort recursivo de los apuntes dice que falta escribir la función auxiliar:
```python
def insert_sort_rec(a):
    if len(a) <= 1:
        return a
    return inserta_en_lista_ordenada(insert_sort_rec(a[:-1]), a[-1])
```
- a) Escribe `inserta_en_lista_ordenada(a, x)` recursiva: `a` ya está ordenada y devuelve una lista ordenada con `x` incluido.
- b) Pruébala con `([1,3,5], 4)`, `([], 7)` y `([2,2], 2)`.
- c) ¿Cuál es el coste de `insert_sort_rec`?

#### Pista
Dos casos: si `x` va delante del primero (o la lista está vacía) se pone al principio; si no, se deja el primero y se inserta en el resto.

#### Solución
**Paso 1. Código.** a)
```python
def inserta_en_lista_ordenada(a, x):
    if a == [] or x <= a[0]:
        return [x] + a
    return [a[0]] + inserta_en_lista_ordenada(a[1:], x)
```
**Paso 2. Pruebas.** b) `([1,3,5], 4)`: $1$ y $3$ se dejan, $4\le5$ entra antes del $5$: `[1,3,4,5]`. `([], 7)`: `[7]`. `([2,2], 2)`: `2 <= 2`, va delante: `[2,2,2]`.

**Paso 3. Coste de la inserción.** c) En el peor caso recorre toda la lista: $\Theta(n)$ para una lista de $n$.

**Paso 4. Coste del insert-sort.** $T(n)=T(n-1)+n$ (ordenar los $n-1$ primeros e insertar el último): $\Theta(n^{2})$.

### D11 · Karatsuba con números pequeños
nivel: 0.4

Multiplica $x=13$ por $y=11$ con la regla de Karatsuba, sin hacer más de tres productos de números más pequeños.
- a) Escribe $x$ e $y$ en binario y calcula $m=\min(\lfloor b_x/2\rfloor,\lfloor b_y/2\rfloor)$.
- b) Calcula $a,b,c,d$ con $x=a\cdot2^{m}+b$ e $y=c\cdot2^{m}+d$.
- c) Calcula $ac$, $bd$ y $(a+b)(c+d)$, y de ahí $t=(a+b)(c+d)-ac-bd$.
- d) Recompón $xy=ac\cdot2^{2m}+t\cdot2^{m}+bd$ y comprueba.

#### Pista
$13=1101_2$ y $11=1011_2$ tienen $4$ bits cada uno. Parte cada uno en la mitad alta y la baja.

#### Solución
**Paso 1. Binario.** a) $b_x=b_y=4$, así que $m=2$.

**Paso 2. Partes.** b) $a=\lfloor13/4\rfloor=3$, $b=13-12=1$; $c=\lfloor11/4\rfloor=2$, $d=11-8=3$.

**Paso 3. Tres productos.** c) $ac=6$, $bd=3$, $(a+b)(c+d)=4\cdot5=20$. Entonces $t=20-6-3=11$ (que es $ad+bc=9+2$).

**Paso 4. Recompón.** d) $6\cdot16+11\cdot4+3=96+44+3=143=13\cdot11$ ✓.

### D12 · Cuántos productos hacen falta
nivel: 0.55

Cuenta las multiplicaciones (escalares) para matrices $n\times n$ con $n=2^{k}$:
- a) Con la descomposición en bloques de $8$ productos, $M(n)=8M(n/2)$, $M(1)=1$: calcula $M(2),M(4),M(8)$ y da la fórmula.
- b) Con Strassen, $S(n)=7S(n/2)$, $S(1)=1$: calcula $S(2),S(4),S(8)$ y la fórmula.
- c) ¿Con qué $n$ (potencia de $2$) Strassen usa menos de la mitad de multiplicaciones?

#### Pista
Cada vez que $n$ se divide por $2$ el número de productos se multiplica por $8$ (o por $7$). Con $k$ divisiones: $8^{k}$ y $7^{k}$. El cociente es $(7/8)^{k}$.

#### Solución
**Paso 1. Ingenuo.** a) $M(2)=8$, $M(4)=64$, $M(8)=512$. $M(n)=8^{k}=n^{3}$.

**Paso 2. Strassen.** b) $S(2)=7$, $S(4)=49$, $S(8)=343$. $S(n)=7^{k}=n^{\log_27}\approx n^{2{,}807}$.

**Paso 3. Cociente.** c) $S/M=(7/8)^{k}$: $k=5$ da $0{,}513$, $k=6$ da $0{,}449<0{,}5$. Hace falta $n=2^{6}=64$. Por eso Strassen solo compensa con matrices grandes (y además hace más sumas).

### D14 · Inversión de bits
nivel: 0.6

Para $n=2^{p}$ elementos, el elemento de la posición $i$ va a la posición $j$ cuyo número en binario es el de $i$ escrito al revés (con $p$ bits).
- a) Con $p=3$ y $a=[10,20,30,40,50,60,70,80]$, ¿cómo queda la permutación?
- b) Con $p=4$, calcula $j$ para $i=0,\dots,15$.
- c) ¿Qué posiciones no se mueven? ¿Cuántas son para $p=4$?

#### Pista
Escribe $i$ con $p$ bits, dale la vuelta y vuelve a pasarlo a decimal. Las posiciones fijas son las que ya son iguales al revés (capicúas).

#### Solución
**Paso 1. $p=3$.** a) $1=001_2\leftrightarrow100_2=4$ y $3=011_2\leftrightarrow110_2=6$; $0,2,5,7$ no se mueven. Resultado: $[10,50,30,70,20,60,40,80]$.

**Paso 2. $p=4$.** b) $j$ para $i=0..15$: $0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15$.

**Paso 3. Fijas.** c) Las que cumplen $j=i$: $0000$, $0110$, $1001$, $1111$, es decir $0,6,9,15$: son $4=2^{p/2}$.

### D15 · Un divide y vencerás con una pieza en el medio
nivel: 0.8

Diseña `difs(a)` con divide y vencerás que devuelva la lista de diferencias entre elementos consecutivos, `[a[1]-a[0], a[2]-a[1], ...]`. Para `[3, 5, -2, 8]` devuelve `[2, -7, 10]`. Se asume `len(a) >= 1` (con un elemento, lista vacía).
- a) Si partes `a` en dos mitades, ¿qué diferencia no está en ninguna de las dos listas de resultados?
- b) Esquema y código.
- c) Prueba con el ejemplo y da el coste.

#### Pista
Las diferencias de la mitad izquierda y de la derecha dejan fuera la pareja formada por el último de la izquierda y el primero de la derecha: hay que añadirla al combinar.

#### Solución
**Paso 1. La pieza que falta.** a) La diferencia `a[mitad] - a[mitad - 1]`.

**Paso 2. Esquema y código.** b) Tamaño: `len(a)`. Caso base: un elemento, `[]`. Descomposición: `a[:mitad]` y `a[mitad:]`. Combinación: `izquierda + [a[mitad] - a[mitad-1]] + derecha`.
```python
def difs(a):
    n = len(a)
    if n == 1:
        return []
    mitad = n // 2
    return difs(a[:mitad]) + [a[mitad] - a[mitad - 1]] + difs(a[mitad:])
```
**Paso 3. Prueba y coste.** c) `[3,5,-2,8]`: mitades `[3,5]` y `[-2,8]`; `difs([3,5])=[2]`, `difs([-2,8])=[10]`, pieza central $-2-5=-7$: `[2,-7,10]`. El coste es $T(n)=2T(n/2)+n$ por las copias y concatenaciones: $\Theta(n\log n)$.

### D16 · Evaluar un polinomio dividiendo los coeficientes
nivel: 0.85

Un polinomio $P(x)=c_0+c_1x+c_2x^{2}+\cdots+c_{n-1}x^{n-1}$ se guarda como la lista de coeficientes `c`. Se quiere evaluarlo con divide y vencerás.
- a) Si `mitad = n // 2`, escribe $P(x)$ en función de $P_{bajo}$ (con `c[:mitad]`) y $P_{alto}$ (con `c[mitad:]`).
- b) Evalúa a mano $P=4-3x+2x^{2}+x^{3}$ en $x=2$ con esa descomposición.
- c) Escribe `evalua(c, x)` y da la recurrencia de su coste.

#### Pista
$P_{alto}$ tiene los coeficientes de $x^{mitad}$ en adelante; para evaluarlo como un polinomio normal hay que sacar factor común $x^{mitad}$.

#### Solución
**Paso 1. Descomposición.** a) $P(x)=P_{bajo}(x)+x^{mitad}\,P_{alto}(x)$, donde $P_{bajo}$ usa `c[:mitad]` y $P_{alto}$ usa `c[mitad:]` evaluados como polinomios desde $x^{0}$.

**Paso 2. A mano.** b) `c = [4,-3,2,1]`, `mitad = 2`: $P_{bajo}=4-3x\to4-6=-2$; $P_{alto}=2+x\to4$; $P(2)=-2+2^{2}\cdot4=14$. Comprobación directa: $4-6+8+8=14$.

**Paso 3. Código y coste.** c)
```python
def evalua(c, x):
    n = len(c)
    if n == 1:
        return c[0]
    mitad = n // 2
    return evalua(c[:mitad], x) + x ** mitad * evalua(c[mitad:], x)
```
Dos llamadas con tamaño $n/2$ más el cálculo de $x^{mitad}$: $T(n)=2T(n/2)+c\in\Theta(n)$ (si se calcula $x^{mitad}$ en tiempo constante).

### D17 · La sublista de suma máxima
nivel: 0.9

Para la lista $[-1,4,-2,5,-3]$, la sublista contigua de suma máxima se busca con divide y vencerás: la mejor está en la mitad izquierda, en la derecha, o **cruza** la mitad.
- a) Divide en `[-1,4]` y `[-2,5,-3]`. ¿Cuál es la mejor suma de cada mitad?
- b) Calcula la mejor sublista que cruza: la mejor "terminando en el último de la izquierda" más la mejor "empezando en el primero de la derecha".
- c) ¿Cuál es la respuesta y qué sublista es? Escribe el esquema.

#### Pista
La mejor que acaba en el último de la izquierda se halla recorriendo hacia atrás y acumulando; la mejor que empieza en el primero de la derecha, hacia delante. Cada una se elige entre todos los puntos de corte.

#### Solución
**Paso 1. Mitades.** a) Izquierda `[-1,4]`: la mejor es $[4]$ con suma $4$. Derecha `[-2,5,-3]`: la mejor es $[5]$ con suma $5$.

**Paso 2. Cruzando.** b) Terminando en $4$ (hacia atrás): $4$, $4-1=3$; la mejor es $4$. Empezando en $-2$ (hacia delante): $-2$, $-2+5=3$, $3-3=0$; la mejor es $3$. Cruzando: $4+3=7$ (la sublista $[4,-2,5]$).

**Paso 3. Esquema.** c) Respuesta: $\max\{4,\,5,\,7\}=7$ con $[4,-2,5]$. Caso base: un elemento, esa suma. Descomposición: mitades. Combinación: máximo de las tres. Las dos búsquedas de la parte cruzada cuestan $\Theta(n)$ en total: $T(n)=2T(n/2)+n\in\Theta(n\log n)$.
