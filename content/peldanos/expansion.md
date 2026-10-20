# Peldaños: Recurrencias, expansión
stage: expansion

## Orden
- t32-expansion: E01 E02 E03 E04 E05 E06 E07 E08 E09 E10 E11 1.12 1.13 2.10 2.13 1.10

### E01 · Calcular valores y ver el patrón
nivel: 0.2

Una recurrencia dice cómo se calcula $T(n)$ a partir de valores anteriores. Calcula los primeros valores y adivina una fórmula sin recurrencia:
- a) $T(0)=2$ y $T(n)=T(n-1)+4$. Calcula $T(1),\dots,T(4)$.
- b) $T(1)=1$ y $T(n)=T(n-1)+n$. Calcula $T(2),\dots,T(5)$.
- c) $T(1)=1$ y $T(n)=2\,T(n-1)+1$. Calcula $T(2),\dots,T(5)$.

#### Pista
Calcula en orden: cada valor usa el anterior. Después mira cómo se relaciona cada resultado con $n$.

#### Solución
**Paso 1. a).** $T(1)=6$, $T(2)=10$, $T(3)=14$, $T(4)=18$. Crece de $4$ en $4$ desde $2$: parece $T(n)=4n+2$.

**Paso 2. b).** $T(2)=3$, $T(3)=6$, $T(4)=10$, $T(5)=15$: son las sumas $1+2+\cdots+n$, es decir $\frac{n(n+1)}{2}$.

**Paso 3. c).** $T(2)=3$, $T(3)=7$, $T(4)=15$, $T(5)=31$: uno menos que una potencia de $2$, $T(n)=2^{n}-1$.

**Paso 4. Qué falta.** Esto es una conjetura a partir de unos pocos valores. La expansión de recurrencias (los siguientes ejercicios) es la forma de demostrarla para todo $n$.

### E02 · Plantear la recurrencia de un código
nivel: 0.3

Contamos $1$ operación por cada línea ejecutada (sin contar la línea `def`).
```python
def suma(n):
    if n == 0:
        return 0
    return n + suma(n - 1)
```
- a) ¿Cuánto vale $T(0)$ (caso base)? ¿Y $T(n)$ para $n>0$, en función de $T(n-1)$?
- b) Resuélvela con la idea de E01: calcula $T(1)$, $T(2)$, $T(3)$ y da la fórmula.
- c) Haz lo mismo con
```python
def bits(n):
    if n <= 1:
        return 1
    return 1 + bits(n // 2)
```
suponiendo que $n$ es una potencia de $2$ (así `n // 2` es exacto) y que el caso base es $n=1$.

#### Pista
En el caso base se ejecutan el `if` y su `return`. En el caso recursivo, el `if` (que sale falso), el `return` de abajo y, además, el tiempo de la llamada recursiva.

#### Solución
**Paso 1. a).** Caso base: `if` y `return 0`, $T(0)=2$. Caso recursivo: `if` y `return`, $2$ operaciones más lo que cueste `suma(n-1)`: $T(n)=2+T(n-1)$.

**Paso 2. b).** $T(1)=4$, $T(2)=6$, $T(3)=8$: $T(n)=2n+2$.

**Paso 3. c).** $T(1)=2$ y $T(n)=2+T(n/2)$. Para $n=8$: $T(8)=2+T(4)=4+T(2)=6+T(1)=8$. Cada vez el tamaño se divide por $2$ y se suma $2$: $T(n)=2\log_2n+2$.

### E03 · Expandir paso a paso
nivel: 0.35

Resuelve por expansión $T(n)=\begin{cases}1 & n=0\\ T(n-1)+3 & n>0\end{cases}$
- a) Expande tres veces: $T(n)=T(n-1)+3=\ldots$
- b) Escribe el patrón después de $i$ expansiones.
- c) ¿Para qué $i$ se llega al caso base? Sustituye.
- d) Comprueba con $n=3$.

#### Pista
Sustituye $T(n-1)$ por su definición: $T(n-1)=T(n-2)+3$. Y así sucesivamente. Anota qué se acumula.

#### Solución
**Paso 1. Expande.** $T(n)=T(n-1)+3=\bigl(T(n-2)+3\bigr)+3=T(n-2)+2\cdot3=T(n-3)+3\cdot3$.

**Paso 2. Patrón.** Tras $i$ expansiones: $T(n)=T(n-i)+3i$.

**Paso 3. Caso base.** Se llega a $T(0)$ cuando $n-i=0$, es decir $i=n$. Sustituyendo: $T(n)=T(0)+3n=3n+1\in\Theta(n)$.

**Paso 4. Comprueba.** Con $n=3$: $T(1)=4$, $T(2)=7$, $T(3)=10$, y la fórmula da $3\cdot3+1=10$.

### E04 · Expandir con una división
nivel: 0.4

Resuelve por expansión $T(n)=\begin{cases}1 & n=1\\ T(n/2)+5 & n>1\end{cases}$ suponiendo que $n$ es una potencia de $2$.
- a) Patrón tras $i$ expansiones.
- b) ¿Cuándo se llega al caso base? (Ojo: el parámetro es $n/2^{i}$.)
- c) Resultado y comprobación con $n=8$.

#### Pista
Igual que el anterior, pero el argumento ya no baja de uno en uno: $n,\ n/2,\ n/4,\ n/8,\ \dots$ El caso base es $T(1)$.

#### Solución
**Paso 1. Patrón.** $T(n)=T(n/2)+5=T(n/4)+2\cdot5=T(n/8)+3\cdot5=\cdots=T(n/2^{i})+5i$.

**Paso 2. Caso base.** $n/2^{i}=1\iff i=\log_2n$.

**Paso 3. Resultado.** $T(n)=T(1)+5\log_2n=5\log_2n+1\in\Theta(\log n)$.

**Paso 4. Comprueba.** $n=8$: $T(8)=T(4)+5=T(2)+10=T(1)+15=16$ y $5\cdot3+1=16$.

### E05 · Un término que crece con n
nivel: 0.5

Resuelve por expansión $T(n)=\begin{cases}0 & n=0\\ T(n-1)+2n+1 & n>0\end{cases}$
- a) Escribe las tres primeras expansiones. ¿Qué cambia en el término que se suma?
- b) Patrón tras $i$ expansiones, como un sumatorio.
- c) Resuelve el sumatorio y sustituye el valor de $i$ del caso base.
- d) Comprueba con $n=2$.

#### Pista
El término sumado ya no es constante: en la primera expansión es $2n+1$, en la segunda $2(n-1)+1$, en la tercera $2(n-2)+1$. Es $\sum_{j=0}^{i-1}\bigl(2(n-j)+1\bigr)$.

#### Solución
**Paso 1. Expande.** $T(n)=(2n+1)+T(n-1)=(2n+1)+\bigl(2(n-1)+1\bigr)+T(n-2)=(2n+1)+(2n-1)+(2n-3)+T(n-3)$.

**Paso 2. Patrón.** $T(n)=T(n-i)+\sum_{j=0}^{i-1}\bigl(2(n-j)+1\bigr)$.

**Paso 3. Resuelve el sumatorio.** $\sum_{j=0}^{i-1}(2n+1)-2\sum_{j=0}^{i-1}j=(2n+1)i-i(i-1)=2ni-i^{2}+2i$.

**Paso 4. Caso base.** Con $i=n$: $T(n)=T(0)+2n^{2}-n^{2}+2n=n^{2}+2n\in\Theta(n^{2})$.

**Paso 5. Comprueba.** $n=2$: $T(1)=3$ y $T(2)=3+5=8$. La fórmula da $4+4=8$.

### E06 · Comprobar la fórmula obtenida
nivel: 0.55

Un error muy frecuente es no comprobar el resultado final. Sea $T(0)=2$ y $T(n)=T(n-1)+3$. Tres estudiantes proponen:
- a) $T(n)=3n+2$
- b) $T(n)=3n+3$
- c) $T(n)=3(n-1)+2$

Averigua cuál es correcta con dos pruebas: el caso base, y que la fórmula cumpla la recurrencia.

#### Pista
Prueba 1: sustituye $n=0$ y mira si da $2$. Prueba 2: sustituye la fórmula en los dos lados de $T(n)=T(n-1)+3$ y mira si coinciden.

#### Solución
**Paso 1. Caso base.** a) $T(0)=2$ ✓. b) $T(0)=3$ ✗. c) $T(0)=-1$ ✗. Ya descartamos b) y c).

**Paso 2. La recurrencia, para a).** $T(n-1)+3=3(n-1)+2+3=3n+2=T(n)$ ✓.

**Paso 3. Conclusión.** Solo a) es correcta: $T(n)=3n+2$. Con el caso base y la recurrencia basta (es una inducción), y evita fiarse de una expansión mal hecha.

### E07 · Dos llamadas y trabajo constante
nivel: 0.6

Resuelve por expansión $T(n)=\begin{cases}1 & n=1\\ 2T(n/2)+1 & n>1\end{cases}$ con $n$ potencia de $2$.
- a) Patrón tras $i$ expansiones. ¿Qué se acumula fuera de $T$?
- b) Resultado.
- c) Comprueba con $n=8$.

#### Pista
Ahora hay un factor $2$ delante de $T$ en cada expansión: tras $i$ pasos, $2^{i}\,T(n/2^{i})$. Lo que se acumula es $1+2+4+\cdots$, una serie geométrica.

#### Solución
**Paso 1. Expande.** $T(n)=2T(n/2)+1=2\bigl(2T(n/4)+1\bigr)+1=4T(n/4)+2+1=8T(n/8)+4+2+1$.

**Paso 2. Patrón.** $T(n)=2^{i}\,T(n/2^{i})+\sum_{j=0}^{i-1}2^{j}=2^{i}\,T(n/2^{i})+2^{i}-1$.

**Paso 3. Caso base.** Con $i=\log_2n$ se llega a $T(1)$, y $2^{i}=n$: $T(n)=n\cdot1+n-1=2n-1\in\Theta(n)$.

**Paso 4. Comprueba.** $T(2)=3$, $T(4)=7$, $T(8)=15=2\cdot8-1$.

### E08 · Dos llamadas y trabajo lineal
nivel: 0.65

Resuelve por expansión $T(n)=\begin{cases}1 & n=1\\ 2T(n/2)+n & n>1\end{cases}$ con $n$ potencia de $2$. Es el coste de mergesort.
- a) Patrón tras $i$ expansiones. ¿Cuánto vale lo que se acumula en cada paso?
- b) Resultado y orden.
- c) Comprueba con $n=8$.

#### Pista
En la primera expansión se acumula $n$. En la segunda, $2\cdot\frac n2=n$. En la tercera, $4\cdot\frac n4=n$. Cada nivel aporta $n$.

#### Solución
**Paso 1. Expande.** $T(n)=2T(n/2)+n=4T(n/4)+n+n=8T(n/8)+n+n+n$.

**Paso 2. Patrón.** $T(n)=2^{i}\,T(n/2^{i})+i\,n$.

**Paso 3. Caso base.** Con $i=\log_2n$: $T(n)=n\cdot T(1)+n\log_2n=n\log_2n+n\in\Theta(n\log n)$.

**Paso 4. Comprueba.** $T(2)=4$, $T(4)=2\cdot4+4=12$, $T(8)=2\cdot12+8=32$, y la fórmula da $8\cdot3+8=32$.

### E09 · Plantear la recurrencia (sin resolverla)
nivel: 0.7

Escribe la recurrencia del coste en tiempo de cada función. Llama $c$ a una cantidad constante de operaciones y da también el caso base.
```python
def f(n):                       # (a)
    if n <= 1: return 1
    return f(n - 1) + f(n - 1)

def g(n):                       # (b)
    if n <= 1: return 1
    for i in range(n):
        trabajo()
    return g(n // 2)

def h(n):                       # (c)
    if n <= 1: return 1
    return h(n // 3) + h(n // 3) + h(n // 3)

def k(n):                       # (d)
    if n <= 1: return 1
    return k(n - 1) + k(n - 2)
```

#### Pista
Para cada una pregúntate tres cosas: ¿cuántas llamadas recursivas hace?, ¿con qué tamaño?, y ¿cuánto trabajo hace *además* de llamarse?

#### Solución
**Paso 1. (a).** Dos llamadas con $n-1$ y trabajo constante: $T(n)=2T(n-1)+c$, con $T(1)=c$.

**Paso 2. (b).** Una llamada con $n/2$ y un bucle de $n$ vueltas: $T(n)=T(n/2)+n$ (más constantes).

**Paso 3. (c).** Tres llamadas con $n/3$: $T(n)=3T(n/3)+c$.

**Paso 4. (d).** Dos llamadas, una con $n-1$ y otra con $n-2$: $T(n)=T(n-1)+T(n-2)+c$.

**Paso 5. Qué se puede resolver ya.** (a), (b) y (c) se resuelven por expansión: (a) $\Theta(2^{n})$, (b) $\Theta(n)$ (el bucle hace $n+\frac n2+\frac n4+\cdots$), (c) $\Theta(n)$. La (d) es de tipo Fibonacci y necesita el método general.

### E10 · Dos llamadas con n−1
nivel: 0.75

Resuelve por expansión $T(n)=\begin{cases}1 & n=0\\ 2T(n-1)+3 & n>0\end{cases}$
- a) Patrón tras $i$ expansiones.
- b) Caso base y resultado.
- c) Comprueba con $n=2$.

#### Pista
Cada expansión multiplica por $2$ el $T$ que queda y suma $3$ multiplicado por la potencia correspondiente: $3,\ 3\cdot2,\ 3\cdot4,\dots$

#### Solución
**Paso 1. Expande.** $T(n)=2T(n-1)+3=2\bigl(2T(n-2)+3\bigr)+3=4T(n-2)+3\cdot2+3=8T(n-3)+3\cdot4+3\cdot2+3$.

**Paso 2. Patrón.** $T(n)=2^{i}\,T(n-i)+3\sum_{j=0}^{i-1}2^{j}=2^{i}\,T(n-i)+3(2^{i}-1)$.

**Paso 3. Caso base.** Con $i=n$: $T(n)=2^{n}\cdot1+3(2^{n}-1)=4\cdot2^{n}-3=2^{n+2}-3\in\Theta(2^{n})$.

**Paso 4. Comprueba.** $T(1)=2+3=5$ y $T(2)=10+3=13$. La fórmula da $2^{3}-3=5$ y $2^{4}-3=13$.

### E11 · Una recurrencia con una suma
nivel: 0.8

Sea $T(0)=1$ y $T(n)=2+\displaystyle\sum_{j=0}^{n-1}T(j)$ para $n>0$.
- a) Calcula $T(1),\dots,T(4)$.
- b) Resta $T(n)$ y $T(n-1)$ (para $n\ge2$) y simplifica. ¿Qué recurrencia más sencilla sale?
- c) Resuélvela por expansión. Comprueba con $n=4$.

#### Pista
$T(n)$ y $T(n-1)$ tienen casi los mismos sumandos; al restarlos se cancelan todos menos uno.

#### Solución
**Paso 1. Valores.** a) $T(1)=2+1=3$, $T(2)=2+1+3=6$, $T(3)=2+1+3+6=12$, $T(4)=2+1+3+6+12=24$.

**Paso 2. Resta.** b) $T(n)-T(n-1)=\Bigl(2+\sum_{j=0}^{n-1}T(j)\Bigr)-\Bigl(2+\sum_{j=0}^{n-2}T(j)\Bigr)=T(n-1)$. Por tanto $T(n)=2\,T(n-1)$ para $n\ge2$.

**Paso 3. Expansión.** c) $T(n)=2T(n-1)=4T(n-2)=\cdots=2^{i}\,T(n-i)$. Se para en $T(1)=3$ cuando $i=n-1$: $T(n)=3\cdot2^{n-1}\in\Theta(2^{n})$. Con $n=4$: $3\cdot8=24$ ✓.
