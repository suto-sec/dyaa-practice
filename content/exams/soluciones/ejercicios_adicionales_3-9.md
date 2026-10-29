# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 3.1
**Paso 1. Calcula unos valores.** $f(0)=1$, $f(1)=f(0)\times1=1$, $f(2)=f(1)\times2=2$, $f(3)=f(2)\times3=6$, $f(4)=24$.

**Paso 2. Expande la definición.** $f(n)=f(n-1)\times n=f(n-2)\times(n-1)\times n=\cdots=f(0)\times1\times2\times\cdots\times n$.

**Paso 3. Resultado.** La función calcula el **factorial**: $f(n)=n!=1\times2\times\cdots\times n$, con $0!=1$. Hace $n$ multiplicaciones: $\Theta(n)$.

### Ejercicio 3.2
**Paso 1. Calcula los cuatro primeros términos.**
- (a) $s_0=0$: $s_0=0,\ s_1=3,\ s_2=6,\ s_3=9$.
- (b) $s_0=4$: $s_0=4,\ s_1=7,\ s_2=10,\ s_3=13$.

**Paso 2. Busca el patrón.** Cada término suma 3 al anterior: $s_n=s_{n-1}+3=s_{n-2}+3+3=\cdots=s_0+3n$.

**Paso 3. Definición no recursiva.**
- (a) $s_n=3n$.
- (b) $s_n=4+3n$.

Son progresiones aritméticas de diferencia 3; sólo cambia el valor inicial.

### Ejercicio 3.3
**Paso 1. Dos valores consecutivos bastan.** Si se conocen $s_i$ y $s_{i+1}$, el resto sale hacia delante con $s_{n}=s_{n-1}+s_{n-2}$ y hacia atrás con $s_{n-2}=s_n-s_{n-1}$.

**Paso 2. Dos valores cualesquiera $s_i$ y $s_j$ ($i<j$).** Con $k=j-i$ y los números de Fibonacci $F_0=0$, $F_1=1$, $F_2=1,\dots$ se tiene
$$s_{i+k}=F_{k-1}\,s_i+F_k\,s_{i+1}$$
Se prueba por inducción: para $k=1$ y $k=2$ da $s_{i+1}$ y $s_i+s_{i+1}$; y si es cierta para $k$ y $k-1$, entonces $s_{i+k+1}=s_{i+k}+s_{i+k-1}=F_k\,s_i+F_{k+1}\,s_{i+1}$.

**Paso 3. Despeja la incógnita.** Como $F_k\ge1$ para $k\ge1$, de $s_j=F_{k-1}s_i+F_ks_{i+1}$ se despeja $s_{i+1}=\dfrac{s_j-F_{k-1}s_i}{F_k}$. Con $s_i$ y $s_{i+1}$ ya se puede construir toda la secuencia.

**Paso 4. El ejemplo $s_1=1$, $s_5=17$.** Aquí $k=4$, $F_3=2$ y $F_4=3$: $17=2\cdot1+3\,s_2$, luego $s_2=5$.

**Paso 5. Resultado.** $s_3=s_2+s_1=6$ y $s_4=s_3+s_2=11$. Los elementos entre $s_1$ y $s_5$ son $5,\ 6,\ 11$ (y $s_5=11+6=17$ lo confirma).

### Ejercicio 3.4
**Paso 1. Qué entra en $D(p)$.** Los hijos de $p$ y, además, los descendientes de cada uno de esos hijos.

**Paso 2. Definición.** Con $H(p)$ el conjunto de hijos de $p$:
$$D(p)=H(p)\ \cup\ \bigcup_{h\in H(p)}D(h)$$

**Paso 3. Caso base.** Si $p$ no tiene hijos, $H(p)=\emptyset$ y la unión es vacía: $D(p)=\emptyset$. No hace falta un caso base aparte, pero se puede escribir explícitamente.

**Paso 4. Ejemplo.** Si $p$ tiene hijos $a$ y $b$, $a$ tiene un hijo $c$ y $b$ ninguno: $D(p)=\{a,b\}\cup D(a)\cup D(b)=\{a,b\}\cup\{c\}\cup\emptyset=\{a,b,c\}$.

### Ejercicio 3.5
**Paso 1. Qué se prueba.** $F(n)=F(2)+\sum_{i=1}^{n-2}F(i)$ para $n\ge2$, con $F(n)=F(n-1)+F(n-2)$ si $n\ge3$.

**Paso 2. Caso base $n=2$.** La suma $\sum_{i=1}^{0}$ es vacía y vale 0: $F(2)=F(2)+0$. Se cumple.

**Paso 3. Hipótesis de inducción.** Se supone cierto para $n\ge2$: $F(n)=F(2)+\sum_{i=1}^{n-2}F(i)$.

**Paso 4. Paso inductivo.** Para $n+1\ge3$:
$$F(n+1)=F(n)+F(n-1)=F(2)+\sum_{i=1}^{n-2}F(i)+F(n-1)=F(2)+\sum_{i=1}^{n-1}F(i)$$
que es la fórmula para $n+1$, porque $(n+1)-2=n-1$.

**Paso 5. Resultado.** Por inducción, la identidad vale para todo $n\ge2$. $\blacksquare$

### Ejercicio 3.6
**Paso 1. Tamaño y caso base.** El tamaño es $n$. El caso base es $n=0$, con $0!=1$.

**Paso 2. Descomposición y regla.** El subproblema es $(n-1)!$ y $n!=(n-1)!\times n$.

**Paso 3. Código.**
```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return factorial(n - 1) * n
```

**Paso 4. Comprobación y coste.** `factorial(5)` devuelve 120. Hay $n$ llamadas con trabajo constante: $T(n)=T(n-1)+c\in\Theta(n)$.

### Ejercicio 3.7
**Paso 1. Qué hay que sustituir.** `len(a) == 0` se puede escribir como `a == []`, y `a[1:len(a)]` como `a[1:]` (la cola).

**Paso 2. Código.** La cabeza es `a[0]` y la cola `a[1:]`:
```python
def suma_lista(a):
    if a == []:
        return 0
    else:
        return a[0] + suma_lista(a[1:])
```

**Paso 3. Comprobación y coste.** `suma_lista([5, 1, 12])` devuelve 18. Hay $n+1$ llamadas, pero cada rebanada `a[1:]` copia la lista, así que el coste total es $\Theta(n^2)$ copiando (y $\Theta(n)$ sumas).

### Ejercicio 3.8
**Paso 1. Una función por descomposición.** Reciben la lista `a` y su tamaño `n`. El caso base es `n == 0` (suma 0); la tercera necesita además `n == 1`.

**Paso 2. $s(a)=s(a[0:n-1])+a[n-1]$.** Se quita el último elemento: la sublista sigue empezando en 0, así que basta bajar `n`.
```python
def suma_1(a, n):
    if n == 0:
        return 0
    else:
        return suma_1(a, n - 1) + a[n - 1]
```

**Paso 3. $s(a)=a[0]+s(a[1:n])$.** Se quita el primero: se pasa la sublista `a[1:]`, de tamaño `n - 1`.
```python
def suma_2(a, n):
    if n == 0:
        return 0
    else:
        return a[0] + suma_2(a[1:], n - 1)
```

**Paso 4. $s(a)=s(a[0:n//2])+s(a[n//2:n])$.** Se divide por la mitad; el caso $n=1$ evita llamar con una lista vacía infinitamente.
```python
def suma_3(a, n):
    if n == 0:
        return 0
    elif n == 1:
        return a[0]
    else:
        m = n // 2
        return suma_3(a[:m], m) + suma_3(a[m:], n - m)
```

**Paso 5. Llamadas de ejemplo.**
```python
a = [5, 1, 12, 4, 2, 5, 6, 3, 7]
print(suma_1(a, len(a)))   # 45
print(suma_2(a, len(a)))   # 45
print(suma_3(a, len(a)))   # 45
```

### Ejercicio 3.9
**Paso 1. Qué se prueba.** $P(n)$: $\sum_{i=0}^{n-1}x^i=\frac{x^n-1}{x-1}$, para $n\ge1$ y $x\neq1$.

**Paso 2. Caso base $n=1$.** El lado izquierdo es $x^0=1$ y el derecho $\frac{x-1}{x-1}=1$.

**Paso 3. Hipótesis.** Se supone cierto $P(n)$.

**Paso 4. Paso inductivo.** Se añade el término $x^n$:
$$\sum_{i=0}^{n}x^i=\frac{x^n-1}{x-1}+x^n=\frac{x^n-1+x^{n+1}-x^n}{x-1}=\frac{x^{n+1}-1}{x-1}$$

**Paso 5. Resultado.** Es $P(n+1)$, así que la identidad vale para todo entero positivo $n$. $\blacksquare$

### Ejercicio 3.10
**Paso 1. Las cuatro funciones del ejercicio 1.10.** Cada una con su valor de partida: (1) $f(n)=\lfloor\Phi f(n-1)+\frac12\rfloor$ con $f(1)=f(2)=1$; (2) $f(n,a,b)$ por cola; (3) $f$ con $f(\frac n2\pm1)$ para $n$ par y $f(\frac{n\pm1}2)$ para $n$ impar; (4) $f(n,s)$ anidada. Y las dos funciones mutuamente recursivas $A$ y $B$.

**Paso 2. Wrappers.** Hay que encontrar qué argumentos adicionales dan la sucesión de Fibonacci $F(1)=F(2)=1$: para (2) sirve $f(n,1,1)$ (pruébalo: $f(3,1,1)=f(2,2,1)=f(1,3,2)=2$) y para (4), $f(n,0)$. Para $A$ y $B$ se cumple $A(n)=F(n-1)$ y $B(n)=F(n-2)$, así que $F(n)=A(n)+B(n)$.

**Paso 3. Código.**
```python
from math import sqrt, floor

PHI = (1 + sqrt(5)) / 2

def fib1(n):                      # (1)
    if n <= 2:
        return 1
    else:
        return floor(PHI * fib1(n - 1) + 0.5)

def f2(n, a, b):                  # (2) recursión por cola
    if n == 1:
        return b
    else:
        return f2(n - 1, a + b, a)

def fib2(n):
    return f2(n, 1, 1)

def fib3(n):                      # (3)
    if n <= 2:
        return 1
    elif n % 2 == 0:
        return fib3(n // 2 + 1) ** 2 - fib3(n // 2 - 1) ** 2
    else:
        return fib3((n + 1) // 2) ** 2 + fib3((n - 1) // 2) ** 2

def f4(n, s):                     # (4) recursión anidada
    if n <= 2:
        return 1 + s
    else:
        return f4(n - 1, s + f4(n - 2, 0))

def fib4(n):
    return f4(n, 0)

def A(n):                         # recursión mutua
    if n == 1:
        return 0
    else:
        return A(n - 1) + B(n - 1)

def B(n):
    if n == 1:
        return 1
    else:
        return A(n - 1)

def fib_ab(n):
    return A(n) + B(n)
```

**Paso 4. Comprobación para $n=1,\dots,10$.**
```python
for fib in (fib1, fib2, fib3, fib4, fib_ab):
    print([fib(n) for n in range(1, 11)])
# todas: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

### Ejercicio 3.11
**Paso 1. Tamaño del problema.** Es el **número de bits** de la representación binaria de $n$, es decir, $\lfloor\log_2n\rfloor+1$: es lo que determina cuántas operaciones hay que hacer.

**Paso 2. Caso base.** Con un solo bit ($n=1$) el resultado es 1 (y para $n=0$, 0).

**Paso 3. Descomposición.** Quitar el bit menos significativo equivale a $\lfloor n/2\rfloor$. Ese bit es $n\bmod2$.

**Paso 4. Expresión matemática.** Sea $u(n)$ el número de unos de $n$ en binario:
$$u(n)=\begin{cases}n & n\le1\\ u(\lfloor n/2\rfloor)+(n\bmod2) & n>1\end{cases}$$
Comprobación: $u(25)=u(12)+1=u(6)+0+1=u(3)+0+0+1=u(1)+1+0+0+1=3$.

### Ejercicio 3.12
**Paso 1. Qué cambia.** Ahora $n$ puede ser 0 y la suma de los primeros 0 enteros es 0. El caso base pasa a ser $n=0$.

**Paso 2. Definición.**
$$S(n)=\begin{cases}0 & n=0\\ S(n-1)+n & n>0\end{cases}$$
El caso $n=1$ ya no hace falta: $S(1)=S(0)+1=1$.

**Paso 3. Código.**
```python
def suma_naturales(n):
    if n == 0:
        return 0
    else:
        return suma_naturales(n - 1) + n
```

**Paso 4. Comprobación.** `suma_naturales(0)` devuelve 0 y `suma_naturales(4)` devuelve 10.

### Ejercicio 3.13
**Paso 1. La idea de los diagramas.** $S(n)$ es el número de cuadrados de una escalera de altura $n$. Se divide en cuatro cuadrantes de lado $\approx n/2$: dos son escaleras (arriba a la izquierda y abajo a la derecha), uno está vacío y el cuarto es un cuadrado completo de lado $n/2$ (la parte de abajo a la izquierda).

**Paso 2. Cuatro subproblemas.** Un cuadrado de lado $m=n/2$ se corta por su diagonal en una escalera de altura $m$ (con la diagonal) y otra de altura $m-1$ (sin ella). Por tanto, para $n$ par:
$$S(n)=S(\tfrac n2)+S(\tfrac n2)+\big[S(\tfrac n2)+S(\tfrac n2-1)\big]=3\,S(\tfrac n2)+S(\tfrac n2-1)$$

**Paso 3. Caso impar.** Con $n=2k+1$: la escalera de arriba tiene altura $k$, el cuadrado de abajo a la izquierda tiene lado $k+1$ (se corta en $S(k+1)+S(k)$) y la escalera de abajo a la derecha tiene altura $k$:
$$S(n)=S(k)+\big[S(k+1)+S(k)\big]+S(k)=3\,S\!\left(\tfrac{n-1}2\right)+S\!\left(\tfrac{n+1}2\right)$$

**Paso 4. Comprobación algebraica.** Para $n=2k$: $3\frac{k(k+1)}2+\frac{(k-1)k}2=2k^2+k=\frac{2k(2k+1)}2$. Para $n=2k+1$: $3\frac{k(k+1)}2+\frac{(k+1)(k+2)}2=(k+1)(2k+1)=\frac{(2k+1)(2k+2)}2$.

**Paso 5. Función completa.** Casos base $S(0)=0$ y $S(1)=1$ (con $n=1$ el caso impar llamaría a $S(0)$ y $S(1)$, es decir, a sí misma):
```python
def suma(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    elif n % 2 == 0:
        return 3 * suma(n // 2) + suma(n // 2 - 1)
    else:
        return 3 * suma(n // 2) + suma(n // 2 + 1)
```
Hay dos llamadas (la de `suma(n // 2)` se hace una sola vez y se multiplica por 3): $T(n)=2T(n/2)+c\in\Theta(n)$.

### Ejercicio 3.14
**Paso 1. Tamaño y caso base.** El tamaño es el número de dígitos $m$ de $n$. El caso base es $m=1$ ($n<10$): se imprime el dígito.

**Paso 2. Descomposición.** Se quita el dígito menos significativo: $n=d_{m-1}\cdots d_1\,|\,d_0$. El subproblema es $n//10=d_{m-1}\cdots d_1$ y el dígito aislado es $d_0=n\%10$.
```
n  =  d_{m-1} ... d_1  |  d_0
      \_______________/    \__/
      subproblema n//10     n % 10
```

**Paso 3. Cómo recuperar la solución.** La solución del subproblema imprime $d_{m-1},\dots,d_1$ en orden, una por línea. El dígito menos significativo debe ir **al final**, así que se imprime **después** de la llamada recursiva.

**Paso 4. Caso recursivo.** `imprime(n)`: `imprime(n // 10)` y luego `print(n % 10)`.
```python
def imprime_digitos(n):
    if n < 10:
        print(n)
    else:
        imprime_digitos(n // 10)
        print(n % 10)
```
`imprime_digitos(2743)` imprime 2, 7, 4 y 3, una por línea. Coste: $m$ llamadas, $\Theta(m)=\Theta(\log n)$.

### Ejercicio 3.15
**Paso 1. Notación general.** Sea `a` una lista de $n$ elementos y $h=\lfloor n/2\rfloor$.

**Paso 2. Diagrama.**
```
 a = [ a_0  a_1 ... a_{h-1} | a_h ... a_{n-1} ]
       \________izq________/   \______der______/
          x = máximo(izq)          y = máximo(der)
                     \              /
                  máximo(a) = max{ x, y }
```

**Paso 3. Casos base y recursivo.** Si $n=1$, el máximo es $a_0$. Si $n>1$:
$$m(a)=\max\{m(a_{0..h-1}),\ m(a_{h..n-1})\},\qquad h=\lfloor n/2\rfloor$$

**Paso 4. Coste.** Dos llamadas con $n/2$ y trabajo constante: $T(n)=2T(n/2)+1\in\Theta(n)$.

### Ejercicio 3.16
**Paso 1. Descomposición.** Se quita el último elemento: la sublista es `a[:-1]`, de tamaño $n-1$.

**Paso 2. Regla.** $m(a)=\max\{m(a_{0..n-2}),\ a_{n-1}\}$, con el caso base $n=1$: $m(a)=a_0$ (la lista tiene al menos un elemento).

**Paso 3. Código.**
```python
def maximo(a):
    if len(a) == 1:
        return a[0]
    else:
        return max(maximo(a[:-1]), a[-1])
```

**Paso 4. Comprobación y coste.** `maximo([4, 2, 7, 5])` devuelve 7. Hay $n$ llamadas con trabajo constante más la copia de la rebanada: $\Theta(n)$ comparaciones (y $\Theta(n^2)$ al copiar rebanadas; con índices `inf` y `sup` no se copia).

### Ejercicio 4.1
**Paso 1. Tamaño y caso base.** El tamaño es $n$. Con una descomposición que sólo quita una unidad, basta el caso base $n=0$: el caso $n=1$ deja de ser necesario.

**Paso 2. Descomposición.** El subproblema es `es_par(n - 1)`.

**Paso 3. Regla recursiva.** $n$ es par exactamente cuando $n-1$ no lo es: `es_par(n) = not es_par(n - 1)`.

**Paso 4. Código.**
```python
def es_par(n):
    if n == 0:
        return True
    else:
        return not es_par(n - 1)
```

**Paso 5. Coste.** Hay $n+1$ llamadas con trabajo constante: $T(n)=T(n-1)+c\in\Theta(n)$, el doble de llamadas que la versión que resta 2.

### Ejercicio 4.2
**Paso 1. Tamaño y casos.** El tamaño es $|n|$. Para $n=0$, $b^0=1$. Para $n<0$ se usa $b^{n}=1/b^{-n}$.

**Paso 2. Reglas para $n>0$.** Se reduce $n$ a la mitad:
- $n$ par: $b^n=(b^{n/2})^2$.
- $n$ impar: $b^n=b\cdot(b^{\lfloor n/2\rfloor})^2$.

**Paso 3. Código.** Se guarda el resultado de la llamada recursiva en una variable para hacer **una sola** llamada:
```python
def potencia(b, n):
    if n < 0:
        return 1 / potencia(b, -n)
    elif n == 0:
        return 1
    else:
        p = potencia(b, n // 2)
        if n % 2 == 0:
            return p * p
        else:
            return b * p * p
```

**Paso 4. Comprobación y coste.** `potencia(2, 10)` da 1024 y `potencia(2, -3)` da 0,125. Cada llamada divide $n$ por 2: $T(n)=T(n/2)+c\in\Theta(\log n)$.

### Ejercicio 4.3
**Paso 1. Idea.** Es la misma estrategia que la potencia de un número, pero con matrices: el caso base es la matriz identidad ($A^0=I$), y $A^n=(A^{n/2})^2$ o $A\cdot(A^{\lfloor n/2\rfloor})^2$.

**Paso 2. Código.** `shape[0]` da la dimensión de la matriz cuadrada.
```python
import numpy as np

def potencia_matriz(A, n):
    if n == 0:
        return np.identity(A.shape[0], dtype=int)
    else:
        M = potencia_matriz(A, n // 2)
        if n % 2 == 0:
            return M.dot(M)
        else:
            return A.dot(M).dot(M)

F = np.array([[1, 1], [1, 0]])
for n in range(1, 11):
    print(n, potencia_matriz(F, n)[0, 1])
```

**Paso 3. Resultado.** El elemento de la primera fila y segunda columna vale $1,1,2,3,5,8,13,21,34,55$: son los **números de Fibonacci**, porque $\begin{pmatrix}1&1\\1&0\end{pmatrix}^n=\begin{pmatrix}F_{n+1}&F_n\\F_n&F_{n-1}\end{pmatrix}$.

**Paso 4. Coste.** Hay $\Theta(\log n)$ llamadas, cada una con a lo sumo dos productos de matrices $2\times2$ (constante): $\Theta(\log n)$. Es una forma de calcular Fibonacci en tiempo logarítmico.

### Ejercicio 4.4
**Paso 1. Tamaño y caso base.** El tamaño es el número de términos, $n-m+1$. Si $m>n$ la suma está vacía y vale 0.

**Paso 2. Regla.** Se aísla el primer término: $g(m,n,f)=f(m)+g(m+1,n,f)$.

**Paso 3. Código.** La función `f` es un parámetro más.
```python
def suma(m, n, f):
    if m > n:
        return 0
    else:
        return f(m) + suma(m + 1, n, f)

for n in range(0, 5):
    print(n, suma(1, n, lambda i: i ** 3))
```

**Paso 4. Resultado.** Imprime $0,1,9,36,100$ para $n=0,\dots,4$, que coincide con $\left(\frac{n(n+1)}2\right)^2$. Coste: $n-m+2$ llamadas, es decir, $\Theta(n-m)$.

### Ejercicio 4.5
**Paso 1. Tamaño y casos base.** El tamaño es $\min(m,n)$ (o uno de los dos parámetros). Si $m=0$ o $n=0$ el producto es 0.

**Paso 2. Diagramas.** El producto es el área de un rectángulo de base $m$ y altura $n$.
```
Quitar una fila:                Quitar una columna:        Quitar ambas:
 m·n = m·(n-1) + m               m·n = (m-1)·n + n          m·n = (m-1)(n-1) + (m-1) + (n-1) + 1
 ┌──────────┐                    ┌─────────┬─┐              ┌─────────┬─┐
 │ m·(n-1)  │                    │(m-1)·n  │n│              │(m-1)(n-1)│ │ n-1
 ├──────────┤ 1 fila de m        │         │ │              ├─────────┼─┤
 │    m     │                    └─────────┴─┘              │  m-1    │1│
 └──────────┘                                               └─────────┴─┘
```

**Paso 3. Reglas recursivas.**
- Quitando una fila: $m\cdot n=m\cdot(n-1)+m$.
- Quitando una columna: $m\cdot n=(m-1)\cdot n+n$.
- Quitando fila y columna: $m\cdot n=(m-1)(n-1)+(m-1)+(n-1)+1$, es decir, $+\,m+n-1$ (una "L" de $m+n-1$ cuadrados).

**Paso 4. Código.**
```python
def producto_1(m, n):             # quita una fila: reduce n
    if n == 0:
        return 0
    else:
        return producto_1(m, n - 1) + m

def producto_2(m, n):             # quita una columna: reduce m
    if m == 0:
        return 0
    else:
        return producto_2(m - 1, n) + n

def producto_3(m, n):             # quita fila y columna: reduce los dos
    if m == 0 or n == 0:
        return 0
    else:
        return producto_3(m - 1, n - 1) + m + n - 1
```

**Paso 5. Coste.** $\Theta(n)$, $\Theta(m)$ y $\Theta(\min(m,n))$ llamadas, respectivamente.

### Ejercicio 4.6
**Paso 1. Idea.** Se divide el rectángulo en cuatro bloques con $a=\lfloor m/2\rfloor$ y $b=\lfloor n/2\rfloor$: el bloque grande $2a\times2b$ vale $4ab$ y sobran, como mucho, una fila y una columna.
```
 m = 2a + r,   n = 2b + s     (r, s son 0 o 1)
 m·n = 4ab + 2as + 2br + rs
```

**Paso 2. Casos.** Con $p=a\cdot b$ (la llamada recursiva sobre $a$ y $b$):
- $m$ y $n$ pares: $m\,n=4p$.
- $m$ impar, $n$ par: $m\,n=4p+n$ (sobra una fila de longitud $n$).
- $m$ par, $n$ impar: $m\,n=4p+m$.
- Ambos impares: $m\,n=4p+m+n-1$ (una "L").

**Paso 3. Código.** Sin usar `*`, el 4 se obtiene sumando dos veces:
```python
def producto_rapido(m, n):
    if m == 0 or n == 0:
        return 0
    p = producto_rapido(m // 2, n // 2)
    p2 = p + p
    p4 = p2 + p2
    if m % 2 == 0 and n % 2 == 0:
        return p4
    elif m % 2 == 1 and n % 2 == 0:
        return p4 + n
    elif m % 2 == 0 and n % 2 == 1:
        return p4 + m
    else:
        return p4 + m + n - 1
```

**Paso 4. Coste.** Los dos parámetros se dividen por 2 en cada llamada, así que hay $\Theta(\log\min(m,n))$ llamadas.

### Ejercicio 4.7
**Paso 1. Tamaño y caso base.** El tamaño es el número de dígitos. Si $n<10$ tiene un dígito (el 0 también).

**Paso 2. Regla.** Quitando el dígito menos significativo, `n // 10` tiene un dígito menos: $d(n)=1+d(n//10)$.

**Paso 3. Código.**
```python
def num_digitos(n):
    if n < 10:
        return 1
    else:
        return 1 + num_digitos(n // 10)
```

**Paso 4. Coste.** $\Theta(\log n)$ llamadas. `num_digitos(3652)` devuelve 4.

### Ejercicio 4.8
**Paso 1. Idea.** Un número decimal con sólo ceros y unos se interpreta como binario: $10110_2=22$. El tamaño es el número de dígitos; si $n<10$ el resultado es el propio $n$ (0 o 1).

**Paso 2. Descomposición.** Quitar el último dígito: $n//10$. Si su valor binario es $v$, el de $n$ es $2v$ más el último dígito $n\%10$.

**Paso 3. Regla.** $b(n)=2\cdot b(n//10)+n\%10$.

**Paso 4. Código.**
```python
def binario_a_entero(n):
    if n < 10:
        return n
    else:
        return 2 * binario_a_entero(n // 10) + n % 10
```

**Paso 5. Comprobación.** `binario_a_entero(10110)` devuelve 22: $b(1)=1$, $b(10)=2$, $b(101)=5$, $b(1011)=11$, $b(10110)=22$.

### Ejercicio 4.9
**Paso 1. Diagrama del proceso mental.** El problema es escribir $n$ en base $b$; el subproblema es escribir $n//b$, que tiene un dígito menos. El dígito que falta es el resto:
```
 n  en base b  =  [ n // b en base b ] [ n % b ]
 142 en base 5  =  [ 28 en base 5 = 103 ] [ 2 ] = 1032
```

**Paso 2. Caso base.** Si $n<b$, la salida tiene un solo dígito: $c(n,b)=n$.

**Paso 3. Regla.** Se desplaza el resultado del subproblema un dígito a la izquierda (multiplicar por 10) y se añade el resto: $c(n,b)=10\cdot c(n//b,b)+n\%b$. Como $b\le9$, cada dígito es menor que 10 y el resultado se puede devolver como un entero.

**Paso 4. Código.**
```python
def cambio_base(n, b):
    if n < b:
        return n
    else:
        return 10 * cambio_base(n // b, b) + n % b
```

**Paso 5. Comprobación y coste.** `cambio_base(142, 5)` devuelve 1032 y `cambio_base(25, 2)` devuelve 11001. Hay tantas llamadas como dígitos de la salida: $\Theta(\log_bn)$.

### Ejercicio 4.10
**Paso 1. Planteamiento.** Se busca la posición (empezando en 1 por la derecha) del bit menos significativo puesto a 1 de $x>0$. El tamaño es el número de bits.

**Paso 2. Caso base.** Si el último bit es 1 ($x$ impar), la posición es 1.

**Paso 3. Descomposición y regla.** Si el último bit es 0, se quita con `x // 2` y la posición es una más: $p(x)=1+p(x//2)$.

**Paso 4. Código.**
```python
def posicion_bit_uno(x):
    if x % 2 == 1:
        return 1
    else:
        return 1 + posicion_bit_uno(x // 2)
```

**Paso 5. Comprobación y coste.** Para $x=01110100_2=116$ devuelve 3. Se procesan como mucho $n$ bits: $\Theta(n)$ (es el número de bits que procesa el algoritmo del ejercicio 1.9).

### Ejercicio 4.11
**Paso 1. Qué se cuenta.** El ejercicio 1.9 pide la suma, para todos los números de 1 a $2^n-1$, de los bits que procesa el algoritmo, que es justo la posición de su primer 1: $\sum_{x=1}^{2^n-1}p(x)$ con $p$ la función del ejercicio 4.10.

**Paso 2. Suma recursiva.** Se suma de $x=2^n-1$ hacia abajo: $S(x)=p(x)+S(x-1)$ con $S(0)=0$.

**Paso 3. Código.**
```python
def suma_posiciones(x):
    if x == 0:
        return 0
    else:
        return posicion_bit_uno(x) + suma_posiciones(x - 1)

for n in range(1, 6):
    print(n, suma_posiciones(2 ** n - 1))
```

**Paso 4. Resultado.** Imprime $1,4,11,26,57$, que coincide con la fórmula $2^{n+1}-(n+2)$ del ejercicio 1.9 (26 para $n=4$).

### Ejercicio 4.12
**Paso 1. Tamaño y caso base.** El tamaño es la longitud de la cadena; la cadena vacía no tiene vocales.

**Paso 2. Regla.** Se quita el primer carácter: el resultado es 1 si es una vocal (más lo que haya en el resto) y 0 si no.

**Paso 3. Código.**
```python
def cuenta_vocales(s):
    if s == "":
        return 0
    else:
        esta = 1 if s[0].lower() in "aeiouáéíóúü" else 0
        return esta + cuenta_vocales(s[1:])
```

**Paso 4. Comprobación y coste.** `cuenta_vocales("Recursión")` devuelve 4. Hay $n+1$ llamadas.

### Ejercicio 4.13
**Paso 1. Un fallo del código dado.** El bucle usa `row`, una variable que no existe: debería ser `fila`. La fila $n$ es $[1]$, seguida de las sumas de elementos consecutivos de la fila anterior, y terminada en $1$.

**Paso 2. Función recursiva para el bucle.** Recibe una fila y devuelve la lista de sumas de elementos consecutivos. Si tiene menos de dos elementos, no hay parejas.

**Paso 3. Código.**
```python
def suma_consecutivos(fila):
    if len(fila) < 2:
        return []
    else:
        return [fila[0] + fila[1]] + suma_consecutivos(fila[1:])

def pascal(n):
    if n == 0:
        return [1]
    else:
        return [1] + suma_consecutivos(pascal(n - 1)) + [1]
```

**Paso 4. Comprobación.** `suma_consecutivos([1, 3, 3, 1])` devuelve `[4, 6, 4]`, y `pascal(4)` devuelve `[1, 4, 6, 4, 1]`.

### Ejercicio 4.14
**Paso 1. Tamaño.** Es el número de dígitos de $n$. Los dígitos están ordenados, así que el mayor es el último, `n % 10`.

**Paso 2. Caso base único.** Si $x\ge$ último dígito (o $n=0$, sin dígitos) se pone $x$ al final: $n\cdot10+x$. Basta una sola condición, sin casos base redundantes.

**Paso 3. Caso recursivo.** Si $x$ es menor que el último dígito, hay que insertarlo antes: se inserta en `n // 10` y se vuelve a pegar el último dígito.

**Paso 4. Código.**
```python
def inserta_digito(n, x):
    if n == 0 or x >= n % 10:
        return n * 10 + x
    else:
        return inserta_digito(n // 10, x) * 10 + n % 10
```

**Paso 5. Comprobación y coste.** `inserta_digito(24667, 5)` devuelve 245667. En el peor caso se recorren todos los dígitos: $\Theta(m)$ con $m$ el número de dígitos.

### Ejercicio 4.15
**Paso 1. Mismo esquema que 4.14.** El mayor elemento es el último de la lista ordenada.

**Paso 2. Caso base y regla.** Si la lista está vacía o $x\ge$ último elemento, $x$ va al final. Si no, se inserta en `a[:-1]` y se añade el último elemento.

**Paso 3. Código.**
```python
def inserta_ordenada(a, x):
    if a == [] or x >= a[-1]:
        return a + [x]
    else:
        return inserta_ordenada(a[:-1], x) + [a[-1]]
```

**Paso 4. Comprobación y coste.** `inserta_ordenada([1, 3, 5, 5, 6], 4)` devuelve `[1, 3, 4, 5, 5, 6]`. En el peor caso hay $n$ llamadas con copias de lista: $O(n)$ llamadas, $O(n^2)$ con las copias.

### Ejercicio 4.16
**Paso 1. Casos base.** $\binom nm=1$ si $m=0$ o $n=m$.

**Paso 2. Recursión lineal con la fórmula factorial.** Basta una llamada recursiva si se usa $\binom nm=\frac{n!}{m!\,(n-m)!}$:
- (i) Decrementa $n$: $\binom nm=\dfrac{n}{n-m}\binom{n-1}{m}$.
- (ii) Decrementa $m$: $\binom nm=\dfrac{n-m+1}{m}\binom{n}{m-1}$.
- (iii) Decrementa $n$ y $m$: $\binom nm=\dfrac{n}{m}\binom{n-1}{m-1}$.

Cada una se comprueba sustituyendo los factoriales: por ejemplo, $\frac nm\binom{n-1}{m-1}=\frac nm\cdot\frac{(n-1)!}{(m-1)!(n-m)!}=\frac{n!}{m!(n-m)!}$.

**Paso 3. Código.** Se multiplica antes de dividir y se usa `//`: el producto es siempre divisible (por ejemplo, $n\binom{n-1}{m-1}=m\binom nm$).
```python
def binom_n(n, m):               # decrementa n
    if m == 0 or n == m:
        return 1
    else:
        return n * binom_n(n - 1, m) // (n - m)

def binom_m(n, m):               # decrementa m
    if m == 0 or n == m:
        return 1
    else:
        return (n - m + 1) * binom_m(n, m - 1) // m

def binom_nm(n, m):              # decrementa n y m
    if m == 0 or n == m:
        return 1
    else:
        return n * binom_nm(n - 1, m - 1) // m
```

**Paso 4. Comprobación y coste.** Las tres dan $\binom{10}{4}=210$. Cada una hace, como mucho, $n$ llamadas: $O(n)$, frente a la versión con dos llamadas, que es exponencial.

### Ejercicio 4.17
**Paso 1. Descomposición.** Para ordenar una lista de $n$ elementos se ordenan los $n-1$ primeros y se **inserta** el último en el resultado, que ya está ordenado. La inserción es la función del ejercicio 4.15.

**Paso 2. Caso base.** Una lista de 0 o 1 elementos ya está ordenada.

**Paso 3. Código.**
```python
def insertion_sort(a):
    if len(a) <= 1:
        return a
    else:
        return inserta_ordenada(insertion_sort(a[:-1]), a[-1])
```

**Paso 4. Comprobación y coste.** `insertion_sort([4, 2, 8, 1, 9, 3])` devuelve `[1, 2, 3, 4, 8, 9]`. Hay $n$ llamadas, cada una con una inserción de coste $O(n)$: $O(n^2)$ en el peor caso.

### Ejercicio 5.1
**Paso 1. Tamaño y caso base.** El tamaño es el número de dígitos. Cuando ya no quedan dígitos ($n=0$) no hay ninguno impar. (El número 0 tiene el dígito 0, que es par: también da `False`.)

**Paso 2. Descomposición.** Se quita el último dígito: `n // 10`. El último dígito es impar si y sólo si `n` es impar (porque 10 es par).

**Paso 3. Recursión lineal.** Queda una operación pendiente tras la llamada: la disyunción con el dígito actual.
```python
def contiene_impar(n):
    if n == 0:
        return False
    else:
        return contiene_impar(n // 10) or n % 2 == 1
```

**Paso 4. Recursión por cola.** El resultado se va acumulando en un parámetro y la llamada recursiva es lo último que se hace:
```python
def contiene_impar_cola(n, hay_impar=False):
    if n == 0:
        return hay_impar
    else:
        return contiene_impar_cola(n // 10, hay_impar or n % 2 == 1)
```

**Paso 5. Comprobación y coste.** `contiene_impar(2468)` es `False` y `contiene_impar(2463)` es `True`. Hay una llamada por dígito: $\Theta(\log n)$.

### Ejercicio 5.2
**Paso 1. Idea.** Se recorren los coeficientes desde el término de mayor grado ($i=n-1$) hasta el de grado 0. Cada coeficiente no nulo se imprime con su signo.

**Paso 2. Reglas de formato.** Signo `+` o `-`, valor absoluto, y `x^i` salvo en el término constante. Si todos los coeficientes son 0 se imprime `0`.

**Paso 3. Código.**
```python
def imprime_polinomio(p):
    if len(p) == 1 and p[0] == 0:
        print('0')
    else:
        imprime_terminos(p, len(p) - 1)
        print()

def imprime_terminos(p, i):
    if i >= 0:
        if p[i] != 0:
            signo = '+' if p[i] > 0 else '-'
            if i == 0:
                print(signo, abs(p[i]), end=' ')
            else:
                print(signo, str(abs(p[i])) + 'x^' + str(i), end=' ')
        imprime_terminos(p, i - 1)
```

**Paso 4. Comprobación.** `imprime_polinomio([3, -5, 0, 1])` imprime `+ 1x^3 - 5x^1 + 3`.

**Paso 5. Coste.** Hay $n+1$ llamadas, cada una con un trabajo constante (una impresión): $T(n)=T(n-1)+c\in\Theta(n)$.

### Ejercicio 5.3
**Paso 1. Rellenar `b` (recursión por cola).** Se recorre `a` con un índice `i`; en cada paso se cuenta una aparición y la llamada recursiva es lo último que se hace. El caso base es haber recorrido toda la lista.
```python
def cuenta(a, b, i=0):
    if i < len(a):
        b[a[i]] += 1
        cuenta(a, b, i + 1)
```

**Paso 2. Construir `c` (recursión lineal).** Para el valor $i$ se escriben `b[i]` copias de $i$ y después el resultado de los valores siguientes; queda una concatenación pendiente tras la llamada.
```python
def construye(b, i=0):
    if i == len(b):
        return []
    else:
        return [i] * b[i] + construye(b, i + 1)
```

**Paso 3. Counting sort.** Una función que llama a las dos anteriores:
```python
def counting_sort(a):
    if a == []:
        return []
    b = [0] * (max(a) + 1)
    cuenta(a, b)
    return construye(b)
```

**Paso 4. Comprobación.** Con `a = [2, 2, 3, 2, 0, 1, 3, 2, 0, 0, 4]`, `b` queda `[3, 1, 4, 2, 1]` y el resultado es `[0, 0, 0, 1, 2, 2, 2, 2, 3, 3, 4]`.

**Paso 5. Coste en tiempo.** `cuenta` hace $n$ llamadas de coste constante y `construye` hace $k+1$ llamadas que, en conjunto, escriben $n$ elementos: $\Theta(n+k)$, es decir, $\Theta(n)$ si $k\in O(n)$. (Con la concatenación `+` se copia la cola en cada llamada, lo que en el peor caso eleva el coste a $O(k\cdot n)$; si se construye la lista en sitio, por ejemplo con `extend`, se mantiene $\Theta(n+k)$.)

**Paso 6. Coste en espacio.** La lista `b` ocupa $k+1$ y la lista resultado $n$: $\Theta(n+k)$ de memoria auxiliar, más la pila de llamadas, que llega a $\Theta(n)$ en `cuenta` y $\Theta(k)$ en `construye` (con listas largas hay que subir el límite de recursión de Python).

### Ejercicio 5.4
**Paso 1. Representación.** Un árbol es `[clave, elemento, izq, der]` y el árbol vacío es `[]`.

**Paso 2. Regla.** En un árbol de búsqueda binario las claves menores están a la izquierda: la clave más pequeña es la del nodo más a la izquierda. Si el subárbol izquierdo está vacío, la raíz es el mínimo; si no, se busca en el izquierdo (recursión por cola).

**Paso 3. Código.** Devuelve la pareja (clave, elemento), o `None` si el árbol está vacío:
```python
def minimo(T):
    if T == []:
        return None
    elif T[2] == []:
        return (T[0], T[1])
    else:
        return minimo(T[2])
```

**Paso 4. Comprobación y coste.** Con `T = [5, 'e', [3, 'c', [1, 'a', [], []], []], [8, 'h', [], []]]`, `minimo(T)` es `(1, 'a')`. Se recorre una rama: $\Theta(h)$, siendo $h$ la altura (hasta $n$ si el árbol es una lista).

### Ejercicio 5.5
**Paso 1. Idea.** Sin `sup`, se trabaja con una sublista y se lleva la cuenta de dónde empieza dentro de la lista original con un desplazamiento `inf`.

**Paso 2. Código.** La mitad izquierda no cambia el desplazamiento; la derecha lo aumenta en `mitad + 1`:
```python
def busqueda_binaria_2(a, x, inf=0):
    if a == []:
        return -1
    else:
        mitad = len(a) // 2
        if x == a[mitad]:
            return inf + mitad
        elif x < a[mitad]:
            return busqueda_binaria_2(a[:mitad], x, inf)
        else:
            return busqueda_binaria_2(a[mitad + 1:], x, inf + mitad + 1)
```

**Paso 3. Coste.** Hay $\log_2n$ llamadas, pero cada rebanada copia $\Theta(n/2^i)$ elementos: $T(n)=T(n/2)+\Theta(n)\in\Theta(n)$ (teorema maestro: $a=1<b^k=2$). Las comparaciones siguen siendo $\Theta(\log n)$, pero el coste total es lineal por las copias.

**Paso 4. Variante logarítmica.** Para conservar $\Theta(\log n)$ se pasa el tamaño en vez de copiar:
```python
def busqueda_binaria_3(a, x, inf, n):
    if n == 0:
        return -1
    else:
        mitad = n // 2
        if x == a[inf + mitad]:
            return inf + mitad
        elif x < a[inf + mitad]:
            return busqueda_binaria_3(a, x, inf, mitad)
        else:
            return busqueda_binaria_3(a, x, inf + mitad + 1, n - mitad - 1)
```
Se llama con `busqueda_binaria_3(a, x, 0, len(a))`.

### Ejercicio 5.6
**Paso 1. Descomposición.** Con sólo `x` y `a`, el problema se reduce a la mitad pasando la sublista sin el elemento central.

**Paso 2. Casos.** Lista vacía: `False`. Si `x` es el elemento central: `True`. Si es menor: se busca en la mitad izquierda; si es mayor, en la derecha.

**Paso 3. Código.**
```python
def esta(x, a):
    if a == []:
        return False
    else:
        m = len(a) // 2
        if x == a[m]:
            return True
        elif x < a[m]:
            return esta(x, a[:m])
        else:
            return esta(x, a[m + 1:])
```

**Paso 4. Comprobación y coste.** `esta(5, [1, 3, 5, 7])` es `True` y `esta(4, [1, 3, 5, 7])` es `False`. Hay $\Theta(\log n)$ comparaciones; como cada llamada copia una sublista, el coste total es $T(n)=T(n/2)+\Theta(n)\in\Theta(n)$.

### Ejercicio 5.7
**Paso 1. Observación clave.** Los elementos son enteros **distintos** y están en orden creciente, así que $a_{i+1}\ge a_i+1$ y la diferencia $a_i-i$ **no decrece** al aumentar $i$.

**Paso 2. Consecuencia.** Mirando el elemento central $m$:
- Si $a_m=m$, se ha encontrado.
- Si $a_m>m$, entonces $a_j-j\ge a_m-m>0$ para todo $j\ge m$: no puede haber punto fijo a la derecha. Se busca a la izquierda.
- Si $a_m<m$, entonces $a_j-j\le a_m-m<0$ para $j\le m$: se busca a la derecha.

**Paso 3. Código.**
```python
def punto_fijo(a, inf, sup):
    if inf > sup:
        return -1
    else:
        m = (inf + sup) // 2
        if a[m] == m:
            return m
        elif a[m] > m:
            return punto_fijo(a, inf, m - 1)
        else:
            return punto_fijo(a, m + 1, sup)

def busca_punto_fijo(a):
    return punto_fijo(a, 0, len(a) - 1)
```

**Paso 4. Comprobación y coste.** Con `a = [-3, -1, 2, 5, 6, 7, 9]` devuelve 2. Se descarta la mitad en cada llamada y no se copia nada: $T(n)=T(n/2)+c\in\Theta(\log n)$.

### Ejercicio 5.8
**Paso 1. Invariante.** Todos los pares están antes que los impares, así que si $a_m$ es par, todos los elementos hasta $m$ también lo son; si es impar, todos desde $m$ lo son. Se busca la frontera con una búsqueda binaria.

**Paso 2. Qué devuelve cuando no quedan elementos.** Se mantiene: *todos los índices menores que `inf` son pares y todos los mayores que `sup` son impares*. Al acabar ($\text{inf}>\text{sup}$), `sup` es el último índice par (o $-1$ si no hay ninguno).

**Paso 3. Código.**
```python
def ultimo_par(a, inf, sup):
    if inf > sup:
        return sup
    else:
        m = (inf + sup) // 2
        if a[m] % 2 == 0:
            return ultimo_par(a, m + 1, sup)
        else:
            return ultimo_par(a, inf, m - 1)

def indice_ultimo_par(a):
    return ultimo_par(a, 0, len(a) - 1)
```

**Paso 4. Comprobación.** Con `a = [2, -4, 10, 8, 0, 12, 9, 3, -15, 3, 1]` devuelve 5. Si no hay pares (`[3, 5]`) devuelve $-1$, y si todos son pares ($n$ elementos), $n-1$.

**Paso 5. Coste.** $T(n)=T(n/2)+c\in\Theta(\log n)$.

### Ejercicio 5.9
**Paso 1. Regla.** $x_n=x_{n-1}-\dfrac{x_{n-1}^2-a}{2x_{n-1}}$. El tamaño es el número de pasos $n$; el caso base es $n=0$, donde la estimación es $x_0$.

**Paso 2. Recursión lineal.** La aproximación tras $n$ pasos se obtiene aplicando la regla al resultado de $n-1$ pasos; queda una operación tras la llamada.
```python
def raiz_lineal(a, x0, n):
    if n == 0:
        return x0
    else:
        x = raiz_lineal(a, x0, n - 1)
        return x - (x * x - a) / (2 * x)
```

**Paso 3. Recursión por cola.** Se aplica la regla **antes** de llamar, y la llamada es lo último:
```python
def raiz_cola(a, x, n):
    if n == 0:
        return x
    else:
        return raiz_cola(a, x - (x * x - a) / (2 * x), n - 1)
```

**Paso 4. Comprobación.** Con $a=13$, $x_0=13$ y $n=6$ las dos devuelven $3{,}6055512754\ldots$ ($\sqrt{13}$), como en el ejemplo del tema.

**Paso 5. Coste.** Cada paso hace un número constante de operaciones: $T(n)=T(n-1)+c\in\Theta(n)$ (la convergencia es muy rápida: el error se eleva aproximadamente al cuadrado en cada paso).

### Ejercicio 6.1
**Paso 1. Tamaño y casos base.** El tamaño es el número de elementos del tramo `inf..sup`. Si el tramo está vacío (`inf > sup`), `x` no está. Si tiene un solo elemento, se compara con él.

**Paso 2. Descomposición.** Se divide el tramo en dos mitades.

**Paso 3. Combinación.** `x` está en el tramo si está en la mitad izquierda **o** en la derecha.

**Paso 4. Código.** Con límites no se copian rebanadas:
```python
def contiene(a, x, inf, sup):
    if inf > sup:
        return False
    elif inf == sup:
        return a[inf] == x
    else:
        m = (inf + sup) // 2
        return contiene(a, x, inf, m) or contiene(a, x, m + 1, sup)

def contiene_wrapper(a, x):
    return contiene(a, x, 0, len(a) - 1)
```

**Paso 5. Coste.** En el peor caso (`x` no está) $T(n)=2T(n/2)+c\in\Theta(n)$, igual que una búsqueda lineal: dividir no mejora nada si hay que mirar todos los elementos.

### Ejercicio 6.2
**Paso 1. Función auxiliar.** El conjunto de dígitos de un entero $n\ge0$: si $n<10$ es $\{n\}$; si no, el dígito menos significativo junto con los dígitos de `n // 10`.
```python
def digitos(n):
    if n < 10:
        return {n}
    else:
        return {n % 10} | digitos(n // 10)
```

**Paso 2. Divide y vencerás.** Un dígito aparece en **todos** los elementos de la lista si aparece en todos los de la mitad izquierda **y** en todos los de la derecha: se **intersectan** los conjuntos de las dos mitades. El caso base es un solo elemento, cuyo conjunto son sus dígitos (se supone la lista no vacía).

**Paso 3. Código.**
```python
def digitos_comunes(a, inf, sup):
    if inf == sup:
        return digitos(a[inf])
    else:
        m = (inf + sup) // 2
        return digitos_comunes(a, inf, m) & digitos_comunes(a, m + 1, sup)

def digitos_comunes_wrapper(a):
    return digitos_comunes(a, 0, len(a) - 1)
```

**Paso 4. Comprobación.** `digitos_comunes_wrapper([2348, 1349, 7523, 3215])` devuelve `{3}`.

**Paso 5. Coste.** Cada intersección trabaja con conjuntos de, como mucho, 10 dígitos (constante). Hay $\Theta(n)$ llamadas y en las hojas se calculan los dígitos de cada número ($\Theta(m)$ para $m$ dígitos): $T(n)=2T(n/2)+c$ más $n$ llamadas a `digitos`, es decir, $\Theta(n\cdot m)$ con $m$ el máximo número de dígitos.

### Ejercicio 6.3
**Paso 1. Tamaño y caso base.** El tamaño es la longitud del tramo. Con un solo elemento, la mejor sublista es el propio elemento.

**Paso 2. Descomposición.** Se divide por la mitad. La mejor sublista está **en la mitad izquierda**, **en la derecha** o **cruza la mitad**.

**Paso 3. Sublista que cruza.** Contiene $a_m$ y $a_{m+1}$. Su suma máxima es (la mejor suma de una sublista que *termina* en $m$) más (la mejor que *empieza* en $m+1$): se calculan recorriendo hacia la izquierda y hacia la derecha desde la mitad.

**Paso 4. Código.**
```python
def max_sublista(a, inf, sup):
    if inf == sup:
        return a[inf]
    m = (inf + sup) // 2
    izq = max_sublista(a, inf, m)
    der = max_sublista(a, m + 1, sup)
    mejor_izq, s = float('-inf'), 0
    for i in range(m, inf - 1, -1):
        s += a[i]
        mejor_izq = max(mejor_izq, s)
    mejor_der, s = float('-inf'), 0
    for i in range(m + 1, sup + 1):
        s += a[i]
        mejor_der = max(mejor_der, s)
    return max(izq, der, mejor_izq + mejor_der)

def max_sublista_wrapper(a):
    return max_sublista(a, 0, len(a) - 1)
```

**Paso 5. Comprobación y coste.** `[-1, -4, 5, 2, -3, 4, 2, -5]` da 10 (la sublista `[5, 2, -3, 4, 2]`). El cruce cuesta $\Theta(n)$: $T(n)=2T(n/2)+n\in\Theta(n\log n)$.

### Ejercicio 6.4
**Paso 1. Representación y operaciones.** El polinomio $u_{n-1}x^{n-1}+\cdots+u_0$ es la lista `a` con `a[i]` $=u_i$. Hacen falta la suma y la resta de polinomios, que rellenan con ceros la lista más corta.
```python
def suma_poli(a, b):
    n = max(len(a), len(b))
    a = a + [0] * (n - len(a))
    b = b + [0] * (n - len(b))
    return [a[i] + b[i] for i in range(n)]

def resta_poli(a, b):
    n = max(len(a), len(b))
    a = a + [0] * (n - len(a))
    b = b + [0] * (n - len(b))
    return [a[i] - b[i] for i in range(n)]
```

**Paso 2. Descomposición.** Con $m=\lfloor n/2\rfloor$, se parte cada polinomio en la parte baja $P_0$ (coeficientes $0..m-1$) y la alta $P_1$: $P=P_1x^m+P_0$ y $Q=Q_1x^m+Q_0$.

**Paso 3. Regla de Karatsuba.**
$$PQ=P_1Q_1\,x^{2m}+\big[(P_1+P_0)(Q_1+Q_0)-P_1Q_1-P_0Q_0\big]x^m+P_0Q_0$$
Sólo hacen falta **tres** productos recursivos: $P_0Q_0$, $P_1Q_1$ y $(P_1+P_0)(Q_1+Q_0)$.

**Paso 4. Código.** Se igualan las longitudes y se combinan los resultados desplazados.
```python
def mult_poli(a, b):
    if len(a) == 0 or len(b) == 0:
        return []
    n = max(len(a), len(b))
    if n == 1:
        return [a[0] * b[0]]
    a = a + [0] * (n - len(a))
    b = b + [0] * (n - len(b))
    m = n // 2
    a0, a1 = a[:m], a[m:]
    b0, b1 = b[:m], b[m:]
    z0 = mult_poli(a0, b0)
    z2 = mult_poli(a1, b1)
    z1 = resta_poli(resta_poli(mult_poli(suma_poli(a0, a1), suma_poli(b0, b1)), z0), z2)
    res = [0] * (2 * n - 1)
    for i, c in enumerate(z0):
        res[i] += c
    for i, c in enumerate(z1):
        res[i + m] += c
    for i, c in enumerate(z2):
        res[i + 2 * m] += c
    return res
```

**Paso 5. Comprobación y coste.** `mult_poli([1, 2], [3, 4])` devuelve `[3, 10, 8]`, es decir, $(1+2x)(3+4x)=3+10x+8x^2$. Con tres llamadas de tamaño $n/2$ y trabajo lineal para sumar y combinar: $T(n)=3T(n/2)+\Theta(n)\in\Theta(n^{\log_23})$ frente a $\Theta(n^2)$ del producto escolar.

### Ejercicio 6.5
**Paso 1. Casos base.** Si la matriz tiene una sola fila o una sola columna, la traspuesta es la misma lista de elementos con las dimensiones intercambiadas (`reshape`). Esto incluye el caso $1\times1$.

**Paso 2. Descomposición en bloques.** Si $n\ge2$ y $m\ge2$ se divide en cuatro bloques $A_{1,1},A_{1,2},A_{2,1},A_{2,2}$ (por $n//2$ filas y $m//2$ columnas).

**Paso 3. Combinación.** Se traspone cada bloque y se colocan intercambiando los bloques de las posiciones $(1,2)$ y $(2,1)$:
$$A^T=\begin{bmatrix}A_{1,1}^T&A_{2,1}^T\\A_{1,2}^T&A_{2,2}^T\end{bmatrix}$$

**Paso 4. Código.**
```python
import numpy as np

def traspuesta(A):
    n, m = A.shape
    if n == 1 or m == 1:
        return A.reshape(m, n)
    h, w = n // 2, m // 2
    T11 = traspuesta(A[:h, :w])
    T12 = traspuesta(A[:h, w:])
    T21 = traspuesta(A[h:, :w])
    T22 = traspuesta(A[h:, w:])
    return np.vstack([np.hstack([T11, T21]), np.hstack([T12, T22])])
```

**Paso 5. Comprobación y coste.** Para cualquier matriz coincide con `A.T`. Con $N=nm$ elementos hay cuatro subproblemas de $N/4$ elementos y componer el resultado copia $N$ elementos: $T(N)=4T(N/4)+\Theta(N)\in\Theta(N\log N)$ (la traspuesta directa es $\Theta(N)$).

### Ejercicio 6.6
**Paso 1. Regla de Strassen.** Para matrices $2^k\times2^k$ divididas en cuatro bloques:
$$\begin{aligned}M_1&=(A_{11}+A_{22})(B_{11}+B_{22})&M_5&=(A_{11}+A_{12})B_{22}\\M_2&=(A_{21}+A_{22})B_{11}&M_6&=(A_{21}-A_{11})(B_{11}+B_{12})\\M_3&=A_{11}(B_{12}-B_{22})&M_7&=(A_{12}-A_{22})(B_{21}+B_{22})\\M_4&=A_{22}(B_{21}-B_{11})\end{aligned}$$
y $C_{11}=M_1+M_4-M_5+M_7$, $C_{12}=M_3+M_5$, $C_{21}=M_2+M_4$, $C_{22}=M_1-M_2+M_3+M_6$.

**Paso 2. Código de Strassen** (matrices cuadradas de lado potencia de 2; el caso base $1\times1$ es un producto):
```python
import numpy as np

def strassen(A, B):
    n = A.shape[0]
    if n == 1:
        return A * B
    h = n // 2
    A11, A12, A21, A22 = A[:h, :h], A[:h, h:], A[h:, :h], A[h:, h:]
    B11, B12, B21, B22 = B[:h, :h], B[:h, h:], B[h:, :h], B[h:, h:]
    M1 = strassen(A11 + A22, B11 + B22)
    M2 = strassen(A21 + A22, B11)
    M3 = strassen(A11, B12 - B22)
    M4 = strassen(A22, B21 - B11)
    M5 = strassen(A11 + A12, B22)
    M6 = strassen(A21 - A11, B11 + B12)
    M7 = strassen(A12 - A22, B21 + B22)
    C11 = M1 + M4 - M5 + M7
    C12 = M3 + M5
    C21 = M2 + M4
    C22 = M1 - M2 + M3 + M6
    return np.vstack([np.hstack([C11, C12]), np.hstack([C21, C22])])
```

**Paso 3. Wrapper con relleno de ceros.** Para $A$ de $p\times q$ y $B$ de $q\times r$ se toma el lado $s$, la menor potencia de 2 que es $\ge\max(p,q,r)$, se rellenan ambas con ceros hasta $s\times s$ y se recorta el producto a $p\times r$:
```python
def strassen_wrapper(A, B):
    p, q = A.shape
    r = B.shape[1]
    s = 1
    while s < max(p, q, r):
        s *= 2
    Ap = np.zeros((s, s), dtype=A.dtype)
    Bp = np.zeros((s, s), dtype=B.dtype)
    Ap[:p, :q] = A
    Bp[:q, :r] = B
    return strassen(Ap, Bp)[:p, :r]
```

**Paso 4. Comprobación y coste.** El resultado coincide con `A.dot(B)` para dimensiones cualesquiera, por ejemplo $3\times5$ por $5\times2$. Siete llamadas de tamaño $n/2$ y trabajo $\Theta(n^2)$ para las 18 sumas y restas: $T(n)=7T(n/2)+\Theta(n^2)\in\Theta(n^{\log_27})\approx\Theta(n^{2{,}81})$. El relleno puede duplicar el lado, lo que sólo multiplica el coste por una constante.

### Ejercicio 6.7
**Paso 1. Descomposición.** $A$ ($p\times q$) se parte por columnas y $B$ ($q\times r$) por filas, en el índice interno $q$:
$$A\cdot B=\begin{bmatrix}A_1&A_2\end{bmatrix}\begin{bmatrix}B_1\\B_2\end{bmatrix}=A_1B_1+A_2B_2$$

**Paso 2. Caso base.** Si $q=1$, $A$ es una columna y $B$ una fila: el producto es una matriz $p\times r$ (producto exterior), que `dot` calcula directamente.

**Paso 3. Código.**
```python
import numpy as np

def mult_interna(A, B):
    q = A.shape[1]
    if q == 1:
        return A.dot(B)
    h = q // 2
    return mult_interna(A[:, :h], B[:h, :]) + mult_interna(A[:, h:], B[h:, :])
```

**Paso 4. Comprobación y coste.** Coincide con `A.dot(B)`. Cada nivel suma matrices de $p\times r$ ($\Theta(pr)$) y hay $q$ casos base de coste $pr$: $T(q)=2T(q/2)+\Theta(pr)\in\Theta(pqr)$, igual que el producto ordinario.

### Ejercicio 6.8
**Paso 1. Descomposición.** Se parte $A$ por filas y $B$ por columnas:
$$A\cdot B=\begin{bmatrix}A_1\\A_2\end{bmatrix}\begin{bmatrix}B_1&B_2\end{bmatrix}=\begin{bmatrix}A_1B_1&A_1B_2\\A_2B_1&A_2B_2\end{bmatrix}$$
Son cuatro subproblemas de $p/2\times q\times r/2$.

**Paso 2. Implementación en dos etapas.** Primero se parten las filas de $A$ (da dos mitades de filas del resultado) y, cuando $A$ ya tiene una fila, se parten las columnas de $B$; es la misma descomposición en cuatro bloques. El caso base es una fila por una columna, que da un único elemento.
```python
import numpy as np

def mult_bloques(A, B):
    p, r = A.shape[0], B.shape[1]
    if p > 1:
        h = p // 2
        return np.vstack([mult_bloques(A[:h], B), mult_bloques(A[h:], B)])
    elif r > 1:
        h = r // 2
        return np.hstack([mult_bloques(A, B[:, :h]), mult_bloques(A, B[:, h:])])
    else:
        return A.dot(B)
```

**Paso 3. Comprobación y coste.** Coincide con `A.dot(B)`. Hay $pr$ casos base de coste $q$ (una fila por una columna): $\Theta(pqr)$, el mismo orden que el producto ordinario.

### Ejercicio 7.1
**Paso 1. Qué hay que construir.** Un árbol donde cada nodo es un subconjunto: la raíz es $\{\}$ y los hijos de un nodo se obtienen añadiendo un elemento **de índice mayor** que el último incluido. Así cada subconjunto aparece una sola vez y hay $2^n$ nodos.

**Paso 2. Solución parcial y parámetros.** `sol` guarda los **índices** incluidos (`[0, 2]` es $\{a,c\}$). Se necesitan `i`, el número de elementos de `sol`, y `j`, el índice del último incluido (en la raíz, $-1$). Los candidatos son $j+1,\dots,n-1$.

**Paso 3. Esquema.**
- Cada nodo **es** una solución: se imprime en cada llamada, no sólo en las hojas.
- Para cada candidato `k`: se incluye en `sol[i]` y se llama con `i + 1` y `j = k`.
- No hace falta deshacer nada: la siguiente iteración sobrescribe `sol[i]`.

**Paso 4. Código.**
```python
def imprime_subconjunto(sol, i, elementos):
    print('{' + ','.join(str(elementos[sol[k]]) for k in range(i)) + '}')

def subconjuntos(i, j, sol, elementos):
    imprime_subconjunto(sol, i, elementos)
    for k in range(j + 1, len(elementos)):
        sol[i] = k
        subconjuntos(i + 1, k, sol, elementos)

def subconjuntos_wrapper(elementos):
    subconjuntos(0, -1, [None] * len(elementos), elementos)
```

**Paso 5. Comprobación y coste.** `subconjuntos_wrapper(['a', 'b', 'c'])` imprime `{}`, `{a}`, `{a,b}`, `{a,b,c}`, `{a,c}`, `{b}`, `{b,c}`, `{c}`: $2^3=8$ subconjuntos. Hay $2^n$ llamadas y cada impresión cuesta hasta $O(n)$: $O(n\,2^n)$.

### Ejercicio 7.2
**Paso 1. Solución parcial.** El propio tablero, con 0 en las casillas vacías. Se rellenan las casillas vacías en orden (fila a fila), de la 0 a la 80.

**Paso 2. Candidatos y restricciones.** Para una casilla vacía los candidatos son los dígitos 1 a 9. Uno es válido si no está ya en su **fila**, su **columna** o su **caja** $3\times3$. Se mantienen tres matrices booleanas (`filas[f][d]`, `columnas[c][d]`, `cajas[b][d]`) para comprobarlo en $O(1)$.

**Paso 3. Caso base y cuenta.** Al pasar la casilla 80, el tablero está completo y válido: cuenta como **una** solución. En una casilla vacía se suman las soluciones de cada candidato válido; en una casilla fija simplemente se avanza. Se deshace la colocación al volver.

**Paso 4. Código.** También se detecta un tablero inicial con dígitos repetidos (0 soluciones):
```python
def cuenta_sudoku(T):
    filas = [[False] * 10 for _ in range(9)]
    columnas = [[False] * 10 for _ in range(9)]
    cajas = [[False] * 10 for _ in range(9)]
    for f in range(9):
        for c in range(9):
            d = T[f][c]
            if d != 0:
                b = 3 * (f // 3) + c // 3
                if filas[f][d] or columnas[c][d] or cajas[b][d]:
                    return 0
                filas[f][d] = columnas[c][d] = cajas[b][d] = True
    return _cuenta(T, 0, filas, columnas, cajas)

def _cuenta(T, i, filas, columnas, cajas):
    if i == 81:
        return 1
    f, c = divmod(i, 9)
    if T[f][c] != 0:
        return _cuenta(T, i + 1, filas, columnas, cajas)
    b = 3 * (f // 3) + c // 3
    n = 0
    for d in range(1, 10):
        if not filas[f][d] and not columnas[c][d] and not cajas[b][d]:
            T[f][c] = d
            filas[f][d] = columnas[c][d] = cajas[b][d] = True
            n += _cuenta(T, i + 1, filas, columnas, cajas)
            filas[f][d] = columnas[c][d] = cajas[b][d] = False
            T[f][c] = 0
    return n
```

**Paso 5. Comprobación y coste.** Un sudoku bien planteado da 1; uno con dos números iguales en una fila da 0; uno con pocas pistas puede dar muchas. En el peor caso el árbol tiene hasta $9^{k}$ nodos con $k$ casillas vacías, pero la poda por las tres restricciones lo reduce muchísimo.

### Ejercicio 7.3
**Paso 1. Reducción al esquema de permutaciones.** Como no puede haber dos torres en la misma fila ni columna, una solución coloca una torre por fila y sus columnas son todas distintas: es una **permutación** de $0,\dots,n-1$. `sol[i]` es la columna de la torre de la fila `i`. No hay restricción de diagonales.

**Paso 2. Esquema.** Una lista booleana `libres` indica qué columnas están ocupadas (comprobación en $O(1)$); al volver de la recursión se vuelve a marcar la columna como libre.

**Paso 3. Código.**
```python
def torres(i, libres, sol):
    n = len(sol)
    if i == n:
        print(sol)
    else:
        for k in range(n):
            if libres[k]:
                sol[i] = k
                libres[k] = False
                torres(i + 1, libres, sol)
                libres[k] = True

def torres_wrapper(n):
    torres(0, [True] * n, [None] * n)
```

**Paso 4. Comprobación y coste.** Para $n=4$ imprime las 24 soluciones, una de ellas `[0, 1, 3, 2]` (la de la figura). Hay $n!$ soluciones y cada una se imprime en $O(n)$: $\Theta(n\cdot n!)$.

### Ejercicio 7.4
**Paso 1. Representación.** Se colocan los dígitos 1 a 9 en las 9 casillas (en orden de fila), sin repetir: es una **permutación**. Constante mágica: $3(3^2+1)/2=15$.

**Paso 2. Poda.** No hay que esperar a la hoja: en cuanto se completa una línea se comprueba que suma 15:
- al llenar la casilla 2, 5 u 8 (final de fila) se comprueba la fila;
- al llenar las casillas 6, 7 u 8 (fila de abajo) se comprueba la columna correspondiente;
- la diagonal secundaria (casillas 2, 4, 6) se comprueba al llenar la 6 y la principal (0, 4, 8) al llenar la 8.

**Paso 3. Código.**
```python
def cuadrados_magicos(i, libres, sol):
    if i == 9:
        print(sol[0:3], sol[3:6], sol[6:9])
        return
    for d in range(1, 10):
        if libres[d]:
            sol[i] = d
            if es_valido(i, sol):
                libres[d] = False
                cuadrados_magicos(i + 1, libres, sol)
                libres[d] = True

def es_valido(i, sol):
    f, c = divmod(i, 3)
    if c == 2 and sol[3 * f] + sol[3 * f + 1] + sol[3 * f + 2] != 15:
        return False
    if f == 2 and sol[c] + sol[c + 3] + sol[c + 6] != 15:
        return False
    if i == 6 and sol[2] + sol[4] + sol[6] != 15:
        return False
    if i == 8 and sol[0] + sol[4] + sol[8] != 15:
        return False
    return True

def cuadrados_magicos_wrapper():
    cuadrados_magicos(0, [True] * 10, [None] * 9)
```

**Paso 4. Resultado.** Hay **8** cuadrados mágicos $3\times3$: el de la figura (`8 1 6 / 3 5 7 / 4 9 2`) y sus rotaciones y reflexiones.

**Paso 5. Problema con tamaños mayores.** El espacio de búsqueda crece como $(n^2)!$: unos $2\cdot10^{13}$ permutaciones para $n=4$ y $1{,}5\cdot10^{25}$ para $n=5$. La poda por líneas completas ayuda, pero el número de nodos sigue siendo enorme, y además el número de cuadrados mágicos crece (880 de $4\times4$ salvo simetrías). Hacen falta podas más fuertes (por ejemplo, calcular directamente la última casilla de cada línea como $15-\ldots$) o métodos constructivos.

### Ejercicio 7.5
**Paso 1. Solución parcial.** El tablero $n\times n$ con el número de salto en cada casilla (0 si no se ha visitado). La casilla inicial es el salto 1.

**Paso 2. Candidatos.** Los 8 saltos del caballo, dados por incrementos a la fila y a la columna. Un salto es válido si cae dentro del tablero y en una casilla no visitada.

**Paso 3. Caso base y búsqueda de una sola solución.** Cuando se ha colocado el salto $n^2$ se ha encontrado una ruta y se devuelve `True`, que se propaga hacia arriba para detener la búsqueda. Si ningún salto lleva a una solución, se deshace la casilla y se devuelve `False`.

**Paso 4. Código.**
```python
SALTOS = [(1, -2), (2, -1), (2, 1), (1, 2), (-1, 2), (-2, 1), (-2, -1), (-1, -2)]

def ruta_caballo(n, f0, c0):
    T = [[0] * n for _ in range(n)]
    T[f0][c0] = 1
    return T if _salta(T, n, f0, c0, 2) else None

def _salta(T, n, f, c, paso):
    if paso == n * n + 1:
        return True
    for df, dc in SALTOS:
        f2, c2 = f + df, c + dc
        if 0 <= f2 < n and 0 <= c2 < n and T[f2][c2] == 0:
            T[f2][c2] = paso
            if _salta(T, n, f2, c2, paso + 1):
                return True
            T[f2][c2] = 0
    return False
```

**Paso 5. Comprobación y coste.** `ruta_caballo(5, 0, 0)` y `ruta_caballo(6, 0, 0)` devuelven al instante un tablero con los números 1 a $n^2$, y cada salto es un movimiento de caballo. Pero el orden en que se prueban los saltos importa mucho: con la misma función, `ruta_caballo(6, 1, 2)` tardó más de un minuto en la prueba. En un tablero de lado impar sólo hay ruta si se empieza en una casilla del color de las esquinas; desde las demás el backtracking tiene que agotar todas las posibilidades. En el peor caso el coste es $O(8^{n^2})$.

**Paso 6. Mejora: probar antes los saltos con menos salidas (regla de Warnsdorff).** Se ordenan los candidatos por el número de saltos válidos que tendrían desde la casilla de destino y se prueba primero la que tiene menos. Sigue siendo backtracking (si falla se prueba el siguiente), pero encuentra la ruta casi sin retroceder:
```python
def ruta_caballo_w(n, f0, c0):
    T = [[0] * n for _ in range(n)]
    T[f0][c0] = 1
    return T if _salta_w(T, n, f0, c0, 2) else None

def _libres(T, n, f, c):
    return [(f + df, c + dc) for df, dc in SALTOS
            if 0 <= f + df < n and 0 <= c + dc < n and T[f + df][c + dc] == 0]

def _salta_w(T, n, f, c, paso):
    if paso == n * n + 1:
        return True
    cand = _libres(T, n, f, c)
    cand.sort(key=lambda p: len(_libres(T, n, p[0], p[1])))
    for f2, c2 in cand:
        T[f2][c2] = paso
        if _salta_w(T, n, f2, c2, paso + 1):
            return True
        T[f2][c2] = 0
    return False
```

### Ejercicio 7.6
**Paso 1. Solución parcial.** Una permutación de las ciudades que empieza siempre en la 0: `sol[0] = 0` y `sol[1..n-1]` son las demás ciudades en orden de visita. Una lista `libres` marca las ya visitadas.

**Paso 2. Longitud parcial y poda.** Se pasa la longitud acumulada del camino. Si ya es **mayor o igual** que la mejor longitud encontrada, esa rama no puede mejorarla: se poda. Al completar la permutación se suma la vuelta a la ciudad 0 y se actualiza la mejor solución.

**Paso 3. Código.**
```python
def viajante(D):
    n = len(D)
    sol = [0] * n
    libres = [True] * n
    libres[0] = False
    mejor = [None, float('inf')]       # mejor camino y su longitud
    _viajante(1, 0.0, D, libres, sol, mejor)
    return mejor

def _viajante(i, longitud, D, libres, sol, mejor):
    n = len(D)
    if i == n:
        total = longitud + D[sol[n - 1]][0]
        if total < mejor[1]:
            mejor[0], mejor[1] = sol[:], total
    else:
        for k in range(1, n):
            if libres[k]:
                nueva = longitud + D[sol[i - 1]][k]
                if nueva < mejor[1]:
                    sol[i] = k
                    libres[k] = False
                    _viajante(i + 1, nueva, D, libres, sol, mejor)
                    libres[k] = True
```

**Paso 4. Lectura de las ciudades y matriz de distancias.** Con NumPy y SciPy:
```python
import numpy as np
from scipy.spatial.distance import pdist, squareform

# puntos = np.loadtxt('ciudades.txt')       # una ciudad por línea: x y
puntos = np.array([[0, 0], [0, 3], [4, 3], [4, 0], [2, 1]])
D = squareform(pdist(puntos))               # distancias euclídeas
camino, longitud = viajante(D)
print(camino, round(longitud, 3))
```

**Paso 5. Comprobación y coste.** El resultado coincide con el de probar todas las permutaciones. Hay $(n-1)!$ caminos; la poda reduce mucho el trabajo medio, pero el peor caso sigue siendo $O((n-1)!)$, por eso se prueba con $n\le10$.

### Ejercicio 7.7
**Paso 1. Versión con lista binaria.** `sol[i]` vale 0 o 1 (a qué sublista pertenece el elemento `i`). Se llevan los contadores de ceros y de unos y las dos sumas parciales. Se **poda** si una sublista ya tiene $n/2$ elementos y se intenta añadir otro a ella. Al completar la solución, la diferencia es $|s_1-s_0|$.
```python
def tug_binario(a):
    n = len(a)
    mejor = {'dif': float('inf'), 'sol': None}
    sol = [0] * n
    _tb(0, [0, 0], [0, 0], a, sol, mejor)
    return mejor['sol'], mejor['dif']

def _tb(i, cuenta, suma, a, sol, mejor):
    n = len(a)
    if i == n:
        dif = abs(suma[1] - suma[0])
        if dif < mejor['dif']:
            mejor['dif'], mejor['sol'] = dif, sol[:]
    else:
        for k in (0, 1):
            if cuenta[k] < n // 2:
                sol[i] = k
                cuenta[k] += 1
                suma[k] += a[i]
                _tb(i + 1, cuenta, suma, a, sol, mejor)
                cuenta[k] -= 1
                suma[k] -= a[i]
```

**Paso 2. Versión más eficiente: lista de índices.** La solución son los $n/2$ índices (crecientes) de una de las sublistas: es el esquema de subconjuntos de tamaño fijo. Se prueba, para cada posición `i`, `k` desde `j + 1` hasta `n - n/2 + i` (para que sigan quedando elementos suficientes). La otra sublista tiene suma `total - suma`, así que la diferencia es $|\text{total}-2\cdot\text{suma}|$.
```python
def tug_indices(a):
    n = len(a)
    mejor = {'dif': float('inf'), 'sol': None}
    _ti(0, -1, 0, a, sum(a), [0] * (n // 2), mejor)
    return mejor['sol'], mejor['dif']

def _ti(i, j, suma, a, total, sol, mejor):
    m = len(sol)
    if i == m:
        dif = abs(total - 2 * suma)
        if dif < mejor['dif']:
            mejor['dif'], mejor['sol'] = dif, sol[:]
    else:
        for k in range(j + 1, len(a) - m + i + 1):
            sol[i] = k
            _ti(i + 1, k, suma + a[k], a, total, sol, mejor)
```

**Paso 3. Comprobación y coste.** Para `[3, 5, 9, 14, 20, 24]` la diferencia mínima es 1 (por ejemplo, la sublista de índices `[1, 2, 5]`, es decir, $\{5,9,24\}$, que suma 38 frente a 37). La segunda versión explora $\binom{n}{n/2}$ hojas frente a $2^n$ casos (y se puede fijar el primer elemento en una sublista para no contar cada reparto dos veces).

### Ejercicio 7.8
**Paso 1. Esquema.** Esquema binario con solución parcial `sol` de 0 y 1 (1 = el elemento está en el subconjunto). Se llevan la suma parcial y la cardinalidad parcial.

**Paso 2. Caso base y poda.** Como los números son **positivos**, en cuanto la suma parcial iguala a $s$ se tiene una solución válida (añadir más elementos la pasaría) y no hay que seguir. Se compara su cardinalidad con la mejor y, si es menor, se guarda. Se poda cuando:
- la suma parcial supera $s$ (la solución deja de ser válida), o
- la cardinalidad parcial ya es mayor o igual que la mejor encontrada (no puede mejorarla).

**Paso 3. Código.** `mejor` es la cardinalidad óptima encontrada (infinito si aún no hay solución):
```python
def suma_min_card(i, suma, card, L, s, sol, sol_opt, mejor):
    if suma == s:
        if card < mejor:
            sol_opt[:] = sol[:i] + [0] * (len(L) - i)
            mejor = card
    elif i < len(L):
        for k in (0, 1):
            nueva_suma = suma + k * L[i]
            nueva_card = card + k
            if nueva_suma <= s and nueva_card < mejor:
                sol[i] = k
                mejor = suma_min_card(i + 1, nueva_suma, nueva_card, L, s, sol, sol_opt, mejor)
    return mejor

def suma_min_card_wrapper(L, s):
    sol = [0] * len(L)
    sol_opt = [0] * len(L)
    mejor = suma_min_card(0, 0, 0, L, s, sol, sol_opt, float('inf'))
    if mejor == float('inf'):
        print('No hay ningún subconjunto que sume', s)
    else:
        print([L[i] for i in range(len(L)) if sol_opt[i] == 1], 'cardinalidad', mejor)
    return mejor
```

**Paso 4. Comprobación y coste.** Para $\{1,2,3,5,6,7,9\}$ y $s=13$ imprime $[6,7]$ con cardinalidad 2; para $\{2,6,3,5\}$ y $s=8$, cardinalidad 2 (con $\{2,6\}$ o $\{3,5\}$). En el peor caso el árbol binario tiene $2^n$ hojas: $O(2^n)$, aunque las dos podas lo recortan en la práctica.

### Ejercicio 8.1
**Paso 1. Elementos del algoritmo voraz.** Candidatos: las actividades. Factibilidad: no solaparse con las ya elegidas. Objetivo: maximizar el **número** de actividades. Falta la función de selección.

**Paso 2. Estrategias posibles.** Se pueden ordenar los candidatos por: (a) instante de comienzo, (b) duración, (c) instante de **finalización**. Sólo la (c) es óptima. Un contraejemplo para (a) con la tabla del enunciado: por comienzo más temprano se eligen $a_2$ $[0,6)$, luego $a_6$ $[6,10)$ y $a_{10}$ $[12,14)$: sólo 3 actividades, y hay soluciones de 4.

**Paso 3. Estrategia óptima.** Elegir siempre, entre las actividades compatibles con lo ya elegido, la que **termina antes**. Idea de la demostración (intercambio): sea $a^*$ la actividad que termina antes. En cualquier solución óptima se puede cambiar su primera actividad por $a^*$: termina no más tarde, así que sigue siendo compatible con el resto y el número de actividades no cambia. Por tanto hay una solución óptima que contiene a $a^*$, y el resto es el mismo problema con las actividades que empiezan después de $f^*$.

**Paso 4. Código.** Se ordenan por instante de finalización y se recorren una vez:
```python
def seleccion_actividades(c, f):
    orden = sorted(range(len(c)), key=lambda i: f[i])
    seleccion = []
    fin = float('-inf')
    for i in orden:
        if c[i] >= fin:
            seleccion.append(i)
            fin = f[i]
    return seleccion
```

**Paso 5. Comprobación y coste.** Con $c=(1,2,0,5,8,5,6,8,3,3,12)$ y $f=(4,13,6,7,12,9,10,11,8,5,14)$ elige $a_0,a_3,a_7,a_{10}$ (4 actividades, como la solución del enunciado). Coste: $\Theta(n\log n)$ por la ordenación.

### Ejercicio 8.2
**Paso 1. Estrategias voraces para la mochila 0-1.** Se ordenan los objetos por un criterio y se van metiendo mientras quepan:
- (a) mayor valor $v_i$ primero;
- (b) menor peso $p_i$ primero;
- (c) mayor cociente $v_i/p_i$ primero.

**Paso 2. Simulación.** Para cada instancia: $n$ uniforme entre 10 y 100, pesos y valores uniformes en $(0,10)$ y, como el enunciado no la fija, capacidad $C=\frac12\sum p_i$. Se comparan los valores obtenidos con la cota superior que da la mochila con fracciones (que se resuelve con (c)).
```python
import random

def voraz(p, v, C, clave):
    valor = peso = 0.0
    for i in sorted(range(len(p)), key=clave, reverse=True):
        if peso + p[i] <= C:
            peso += p[i]
            valor += v[i]
    return valor

def cota_fraccion(p, v, C):
    valor, resto = 0.0, C
    for i in sorted(range(len(p)), key=lambda i: v[i] / p[i], reverse=True):
        x = min(1, resto / p[i])
        valor += x * v[i]
        resto -= x * p[i]
        if resto <= 0:
            break
    return valor

def simula(instancias=1000, semilla=0):
    random.seed(semilla)
    estrategias = {
        'mayor valor': lambda p, v: (lambda i: v[i]),
        'menor peso': lambda p, v: (lambda i: -p[i]),
        'valor/peso': lambda p, v: (lambda i: v[i] / p[i]),
    }
    suma = {k: 0.0 for k in estrategias}
    mejor = {k: 0 for k in estrategias}
    for _ in range(instancias):
        n = random.randint(10, 100)
        p = [random.uniform(0.001, 10) for _ in range(n)]
        v = [random.uniform(0.001, 10) for _ in range(n)]
        C = sum(p) / 2
        cota = cota_fraccion(p, v, C)
        res = {k: voraz(p, v, C, f(p, v)) for k, f in estrategias.items()}
        top = max(res.values())
        for k in res:
            suma[k] += res[k] / cota
            mejor[k] += res[k] >= top - 1e-12
    return {k: (suma[k] / instancias, mejor[k]) for k in estrategias}
```

**Paso 3. Resultado.** Con 1000 instancias y semilla 0 (`simula(1000, 0)`), la fracción media de la cota superior que alcanza cada estrategia y el número de instancias en las que fue la mejor (o empató) salen así:

| Estrategia | Fracción media de la cota | Mejor o empatada |
|---|---|---|
| mayor $v_i/p_i$ | 0,991 | 953 de 1000 |
| mayor valor | 0,946 | 89 |
| menor peso | 0,857 | 6 |

**Paso 4. Conclusión.** Ninguna estrategia es **óptima** (la mochila 0-1 es NP-completa y siempre hay instancias donde fallan); los números dependen de la capacidad elegida y de la semilla. En cambio la de mayor $v_i/p_i$ es, con mucha diferencia, la mejor en media: es la que es óptima para la mochila con fracciones, y al no poder partir sólo pierde lo que queda sin llenar. Con capacidades pequeñas respecto a los objetos la diferencia entre estrategias cambia, así que conviene repetir el experimento con otras capacidades.

### Ejercicio 8.3
**Paso 1. Trabajar en céntimos.** Con decimales (`0.1`, `5.34`) hay errores de redondeo; se convierte la cantidad a un entero de céntimos: $x=5{,}34$ son 534.

**Paso 2. Estrategia voraz óptima.** Devolver siempre la moneda de **mayor valor que no supere** lo que queda. Es óptima para el sistema del euro (2, 1, 0,5, 0,2, 0,1, 0,05, 0,02, 0,01): en una solución óptima las monedas más pequeñas no pueden sumar el valor de otra mayor sin poder sustituirse por ella, así que la moneda mayor siempre debe usarse.

**Paso 3. Método recursivo.** Si queda 0 se termina; si la moneda actual cabe, se devuelve y se sigue con el resto **sin** avanzar a la siguiente moneda; si no cabe, se pasa a la siguiente.
```python
MONEDAS = [200, 100, 50, 20, 10, 5, 2, 1]        # céntimos

def formato(c):
    return str(c // 100) if c % 100 == 0 else ('%g' % (c / 100)).replace('.', ',')

def cambio(centimos, i=0):
    if centimos == 0:
        return []
    elif MONEDAS[i] <= centimos:
        return [MONEDAS[i]] + cambio(centimos - MONEDAS[i], i)
    else:
        return cambio(centimos, i + 1)

def imprime_cambio(x):
    print(' '.join(formato(c) for c in cambio(round(x * 100))))
```

**Paso 4. Comprobación y coste.** `imprime_cambio(5.34)` imprime `2 2 1 0,2 0,1 0,02 0,02`. Hay, como mucho, tantas llamadas como monedas más tipos de moneda: $O(k+m)$.

### Ejercicio 8.4
**Paso 1. Coste de una mezcla.** Mezclar dos listas de tamaños $a$ y $b$ cuesta $a+b$ operaciones, y el resultado es una lista de tamaño $a+b$.

**Paso 2. Estrategia voraz.** Mezclar siempre las **dos listas más pequeñas**. Es el mismo argumento que en los códigos de Huffman: las listas que se mezclan antes participan en más mezclas posteriores, así que conviene que sean las más pequeñas.

**Paso 3. Código.** Con un montículo (cola de prioridad):
```python
import heapq

def coste_mezcla_optimo(tamanos):
    h = list(tamanos)
    heapq.heapify(h)
    total = 0
    while len(h) > 1:
        x = heapq.heappop(h)
        y = heapq.heappop(h)
        total += x + y
        heapq.heappush(h, x + y)
    return total
```

**Paso 4. Comprobación y coste.** Con tamaños $8,5,7,4$: se mezclan $4+5=9$ (9 operaciones), $7+8=15$ (15) y $9+15=24$ (24): **48** operaciones, frente a las 54 de la mezcla del enunciado. Coste del algoritmo: $\Theta(n\log n)$.

### Ejercicio 8.5
**Paso 1. Estrategia.** Se parte de un árbol por carácter y, mientras haya más de uno, se fusionan los **dos de menor frecuencia** en un árbol cuya frecuencia es la suma. Se usa una cola de prioridad.

**Paso 2. Árboles.** Una hoja es el índice del carácter y un nodo interno una pareja `(izquierdo, derecho)`. Para desempatar sin comparar árboles, cada elemento de la cola es `(frecuencia, número, árbol)` con un número único.

**Paso 3. Códigos.** Se recorre el árbol: 0 al ir a la izquierda y 1 a la derecha; el código de una hoja es el camino desde la raíz.

**Paso 4. Código.**
```python
import heapq

def huffman(a):
    h = [(f, i, i) for i, f in enumerate(a)]
    heapq.heapify(h)
    contador = len(a)
    while len(h) > 1:
        f1, _, t1 = heapq.heappop(h)
        f2, _, t2 = heapq.heappop(h)
        heapq.heappush(h, (f1 + f2, contador, (t1, t2)))
        contador += 1
    codigos = [''] * len(a)
    _asigna(h[0][2], '', codigos)
    return codigos

def _asigna(t, prefijo, codigos):
    if isinstance(t, tuple):
        _asigna(t[0], prefijo + '0', codigos)
        _asigna(t[1], prefijo + '1', codigos)
    else:
        codigos[t] = prefijo or '0'
```

**Paso 5. Comprobación y coste.** Con las frecuencias $45,13,12,16,9,5$ (miles) la longitud de los códigos es $1,3,3,3,4,4$ y el total de bits es 224 (miles), frente a 300 con 3 bits por carácter. Los códigos concretos pueden variar según el desempate, pero su longitud total no. Coste: $\Theta(n\log n)$.

### Ejercicio 8.6
**Paso 1. Aristas por orden de peso.** $C$-$D$ 6, $A$-$C$ 7, $B$-$C$ 8, $E$-$G$ 8, $C$-$F$ 9, $F$-$G$ 9, $A$-$B$ 10, $E$-$F$ 10, $D$-$F$ 11, $B$-$E$ 12, $D$-$E$ 12, $B$-$D$ 15. Con 7 vértices el árbol tiene 6 aristas.

**Paso 2. Kruskal** (la arista más pequeña que no forme ciclo):

| Paso | Arista | Peso | ¿Ciclo? |
|---|---|---|---|
| 1 | $C$-$D$ | 6 | no, se añade |
| 2 | $A$-$C$ | 7 | no, se añade |
| 3 | $B$-$C$ | 8 | no, se añade |
| 4 | $E$-$G$ | 8 | no, se añade |
| 5 | $C$-$F$ | 9 | no, se añade |
| 6 | $F$-$G$ | 9 | no (une $\{A,B,C,D,F\}$ con $\{E,G\}$), se añade |

Ya hay 6 aristas. El resto ($A$-$B$, $E$-$F$, ...) formarían ciclo.

**Paso 3. Prim** desde $A$ (se añade la arista mínima entre el conjunto $U$ de vértices tratados y el resto):

| Paso | $U$ | Arista | Peso |
|---|---|---|---|
| 1 | $\{A\}$ | $A$-$C$ | 7 (frente a $A$-$B$ 10) |
| 2 | $\{A,C\}$ | $C$-$D$ | 6 |
| 3 | $\{A,C,D\}$ | $B$-$C$ | 8 |
| 4 | $\{A,B,C,D\}$ | $C$-$F$ | 9 |
| 5 | $\{A,B,C,D,F\}$ | $F$-$G$ | 9 |
| 6 | $\{A,B,C,D,F,G\}$ | $E$-$G$ | 8 |

**Paso 4. Resultado.** Los dos algoritmos dan el mismo árbol: $\{C\text{-}D,\ A\text{-}C,\ B\text{-}C,\ E\text{-}G,\ C\text{-}F,\ F\text{-}G\}$, de coste $6+7+8+8+9+9=47$.

### Ejercicio 8.7
**Paso 1. Idea.** Se parte de un vértice, se mantiene el conjunto de vértices tratados y en cada paso se añade la arista de menor peso que sale de él hacia un vértice nuevo. Una cola de prioridad con las aristas candidatas lo hace eficiente.

**Paso 2. Detalle.** Al sacar una arista cuyo destino ya está tratado se descarta (la cola puede contener aristas obsoletas). Si el grafo es conexo se añaden $|V|-1$ aristas.

**Paso 3. Código.** El grafo es un diccionario `{vértice: [(vecino, peso), ...]}`:
```python
import heapq

def prim(grafo, origen):
    tratados = {origen}
    arbol = []
    cola = [(w, origen, v) for v, w in grafo[origen]]
    heapq.heapify(cola)
    while cola and len(tratados) < len(grafo):
        w, u, v = heapq.heappop(cola)
        if v in tratados:
            continue
        tratados.add(v)
        arbol.append((u, v, w))
        for x, wx in grafo[v]:
            if x not in tratados:
                heapq.heappush(cola, (wx, v, x))
    return arbol
```

**Paso 4. Comprobación y coste.** Con el grafo del ejercicio 8.6 devuelve un árbol de coste 47. Cada arista entra y sale de la cola a lo sumo una vez: $O(E\log E)=O(E\log V)$.

### Ejercicio 8.8
**Paso 1. Idea.** Se ordenan las aristas por peso y se recorren en ese orden añadiendo cada una si **no forma un ciclo** con las ya elegidas. Se detecta con una estructura de conjuntos disjuntos (unión-búsqueda): dos vértices están en el mismo componente si tienen la misma raíz.

**Paso 2. Código.** Las aristas son `(peso, u, v)` y los vértices van de 0 a `n-1`:
```python
def kruskal(n, aristas):
    padre = list(range(n))

    def raiz(x):
        while padre[x] != x:
            padre[x] = padre[padre[x]]
            x = padre[x]
        return x

    arbol = []
    for w, u, v in sorted(aristas):
        ru, rv = raiz(u), raiz(v)
        if ru != rv:
            padre[ru] = rv
            arbol.append((u, v, w))
            if len(arbol) == n - 1:
                break
    return arbol
```

**Paso 3. Comprobación y coste.** Con el grafo del ejercicio 8.6 (vértices $A..G$ como $0..6$) da un árbol de coste 47. Ordenar cuesta $O(E\log E)$ y las operaciones de conjuntos son casi constantes: $O(E\log E)$ en total.

### Ejercicio 8.9
**Paso 1. Modelo.** El laberinto es una rejilla; las casillas libres son vértices y cada casilla se conecta con sus 4 vecinas libres con una arista de peso 1. Las paredes no son vértices.

**Paso 2. Dijkstra.** Se parte de la entrada con distancia 0. Se extrae de una cola de prioridad la casilla de menor distancia, se **relajan** sus vecinas (`dist[v] = min(dist[v], dist[u] + 1)`) y se guarda de qué casilla se llegó para reconstruir el camino. Se puede parar al extraer la salida.

**Paso 3. Código.** Las paredes son `'W'` y las casillas libres `'E'` (u otro carácter):
```python
import heapq

def camino_laberinto(L, entrada, salida):
    filas, cols = len(L), len(L[0])
    dist = {entrada: 0}
    previo = {}
    cola = [(0, entrada)]
    while cola:
        d, (f, c) = heapq.heappop(cola)
        if (f, c) == salida:
            break
        if d > dist[(f, c)]:
            continue
        for df, dc in ((0, 1), (1, 0), (0, -1), (-1, 0)):
            g, h = f + df, c + dc
            if 0 <= g < filas and 0 <= h < cols and L[g][h] != 'W':
                if d + 1 < dist.get((g, h), float('inf')):
                    dist[(g, h)] = d + 1
                    previo[(g, h)] = (f, c)
                    heapq.heappush(cola, (d + 1, (g, h)))
    if salida not in dist:
        return None
    camino = [salida]
    while camino[-1] != entrada:
        camino.append(previo[camino[-1]])
    return camino[::-1]
```

**Paso 4. Comprobación y coste.** En un laberinto pequeño devuelve la lista de casillas desde la entrada hasta la salida (o `None` si no hay camino). Con $V$ casillas libres y $E\le4V$ aristas el coste es $O(E\log V)$. Como todas las aristas pesan 1, una búsqueda en anchura da el mismo resultado en $O(V)$.

### Ejercicio 9.1
**Paso 1. Tamaño y caso base.** El tamaño es $n$ (el número de términos). Para $n=0$ la suma está vacía y vale 0.

**Paso 2. Descomposición.** Se aísla el último término: $S(n)=\sum_{i=1}^{n-1}(2i-1)+(2n-1)=S(n-1)+(2n-1)$.

**Paso 3. Código.**
```python
def suma_impares(n):
    if n == 0:
        return 0
    else:
        return suma_impares(n - 1) + 2 * n - 1
```

**Paso 4. Comprobación y coste.** `suma_impares(5)` devuelve 25: la suma de los $n$ primeros impares es $n^2$ (ejercicio 1.5). Hay $n+1$ llamadas con trabajo constante: $\Theta(n)$ (la fórmula $n^2$ calcula lo mismo en $\Theta(1)$).

### Ejercicio 9.2
**Paso 1. Tamaño y caso base.** El tamaño es el número de coeficientes. Con un solo coeficiente el polinomio es la constante $d_0$.

**Paso 2. Regla de Horner.** $p(x,\mathbf d)=d_0+x\cdot p(x,\mathbf d_{1..n})$, donde $\mathbf d_{1..n}$ son los coeficientes sin el primero. Por cada coeficiente (salvo el último) hay **una** multiplicación: $n$ para grado $n$.

**Paso 3. Código.** Con un índice para no copiar la lista:
```python
def horner(d, x, i=0):
    if i == len(d) - 1:
        return d[i]
    else:
        return d[i] + x * horner(d, x, i + 1)
```

**Paso 4. Comprobación y coste.** `horner([2, -4, 5], 3)` devuelve 35 ($2-4\cdot3+5\cdot9$). Hay $n+1$ llamadas y $n$ multiplicaciones: $\Theta(n)$.

### Ejercicio 9.3
**Paso 1. Qué calcula.** $f(1)=f(2)=1$, $f(3)=1+f(1)=2$, $f(4)=1+f(1)+f(2)=3$, $f(5)=1+1+1+2=5$: son los **números de Fibonacci** (por el ejercicio 3.5, $F(n)=F(2)+\sum_{i=1}^{n-2}F(i)$ con $F(2)=1$).

**Paso 2. Versión 1: el sumatorio con un bucle.**
```python
def f_bucle(n):
    if n <= 2:
        return 1
    else:
        s = 0
        for i in range(1, n - 1):
            s += f_bucle(i)
        return 1 + s
```

**Paso 3. Versión 2: el sumatorio con una segunda función recursiva.** `suma_f(m)` calcula $\sum_{i=1}^{m}f(i)$ con la regla $\text{suma\_f}(m)=\text{suma\_f}(m-1)+f(m)$ y caso base $m=0$; las dos funciones se llaman entre sí (recursión mutua):
```python
def f_rec(n):
    if n <= 2:
        return 1
    else:
        return 1 + suma_f(n - 2)

def suma_f(m):
    if m == 0:
        return 0
    else:
        return suma_f(m - 1) + f_rec(m)
```

**Paso 4. Comprobación y coste.** Las dos dan $1,1,2,3,5,8,13,\dots$ ($f(10)=55$). Es un árbol de llamadas muy ramificado: en la versión con bucle $T(n)=\sum_{i<n-1}T(i)+c$, que (como en el ejercicio 1.12) crece exponencialmente. Ambas son de coste exponencial.

### Ejercicio 9.4
**Paso 1. Qué cambia.** Un disco sólo puede ir de una torre a una **adyacente**: izquierda$\leftrightarrow$centro y centro$\leftrightarrow$derecha. Para ir de un extremo al otro hay que pasar por el centro.

**Paso 2. Descomposición.** Para mover $n$ discos de un extremo $o$ al otro $d$ (la torre del centro está siempre libre para ser la intermedia):
1. mover $n-1$ discos de $o$ a $d$ (problema del mismo tipo);
2. mover el disco $n$ de $o$ al centro;
3. mover los $n-1$ discos de $d$ de vuelta a $o$;
4. mover el disco $n$ del centro a $d$;
5. mover otra vez los $n-1$ discos de $o$ a $d$.

Así el disco $n$ nunca queda sobre uno más pequeño: en los pasos 2 y 4 los $n-1$ discos están en la torre de enfrente y el centro y el destino están libres.

**Paso 3. Caso base.** $n=0$: no se mueve nada.

**Paso 4. Código.**
```python
def hanoi_adyacente(n, o, d, medio='C'):
    if n > 0:
        hanoi_adyacente(n - 1, o, d)
        print('Mueve disco', n, 'de', o, 'a', medio)
        hanoi_adyacente(n - 1, d, o)
        print('Mueve disco', n, 'de', medio, 'a', d)
        hanoi_adyacente(n - 1, o, d)
```
Se llama con `hanoi_adyacente(n, 'I', 'D')`.

**Paso 5. Coste.** $M(n)=3M(n-1)+2$ con $M(0)=0$, que resuelve a $M(n)=3^n-1$ movimientos (frente a $2^n-1$ del Hanoi original): $\Theta(3^n)$. Para $n=1$ son 2 movimientos y para $n=2$, 8.

### Ejercicio 9.5
**Paso 1. Tamaño y caso base.** El tamaño es la longitud del tramo `inf..sup`. Si está vacío (`inf > sup`), `x` no está: devuelve $-1$.

**Paso 2. Descomposición.** Se compara `x` con el elemento central. Si es igual, se devuelve su índice; si es menor, se descarta la mitad derecha; si es mayor, la izquierda. Una sola llamada con la mitad del tamaño.

**Paso 3. Código.**
```python
def busqueda_binaria(a, x, inf, sup):
    if inf > sup:
        return -1
    else:
        m = (inf + sup) // 2
        if a[m] == x:
            return m
        elif x < a[m]:
            return busqueda_binaria(a, x, inf, m - 1)
        else:
            return busqueda_binaria(a, x, m + 1, sup)

def busca(a, x):
    return busqueda_binaria(a, x, 0, len(a) - 1)
```

**Paso 4. Comprobación y coste.** `busca([1, 3, 5, 7, 9], 7)` devuelve 3 y `busca([1, 3, 5, 7, 9], 4)` devuelve $-1$. No se copia la lista: $T(n)=T(n/2)+c\in\Theta(\log n)$.

### Ejercicio 9.6
**Paso 1. Estructura de cada fila.** En una pirámide de $n$ filas, la fila $i$ ($i=1..n$) tiene $n-i$ espacios y $2i-1$ caracteres `X`.

**Paso 2. Funciones auxiliares recursivas.** Una que imprime un carácter $k$ veces y otra que recorre las filas:
```python
def repite(c, k):
    if k > 0:
        print(c, end='')
        repite(c, k - 1)

def fila(i, n):
    repite(' ', n - i)
    repite('X', 2 * i - 1)
    print()

def piramide(n, i=1):
    if i <= n:
        fila(i, n)
        piramide(n, i + 1)
```

**Paso 3. Comprobación y coste.** `piramide(4)` imprime
```
   X
  XXX
 XXXXX
XXXXXXX
```
Se imprimen $\sum_{i=1}^{n}(n-i+2i-1)=\sum(n+i-1)\in\Theta(n^2)$ caracteres, así que el coste es $\Theta(n^2)$.

### Ejercicio 9.7
**Paso 1. Planteamiento.** $f$ es continua en $[a,b]$ con $f(a)\cdot f(b)<0$, así que tiene un cero en $(a,b)$. El tamaño es el ancho $b-a$. Caso base: $|b-a|<2\varepsilon$ (o $f(z)=0$): el punto medio $z$ está a menos de $\varepsilon$ del cero.

**Paso 2. Descomposición.** Con $z=(a+b)/2$: si $f(a)\cdot f(z)<0$ hay un cero en $[a,z]$ (si $f(z)=0$ ya se ha terminado); si no, en $[z,b]$ (porque entonces $f(z)\cdot f(b)<0$). Se divide el ancho entre 2.

**Paso 3. Código.**
```python
def biseccion(f, a, b, eps):
    z = (a + b) / 2
    if abs(b - a) < 2 * eps or f(z) == 0:
        return z
    elif f(a) * f(z) < 0:
        return biseccion(f, a, z, eps)
    else:
        return biseccion(f, z, b, eps)
```

**Paso 4. Comprobación y coste.** Para $f(x)=x^2-2$ en $(1,2)$ con $\varepsilon=10^{-6}$ devuelve $1{,}41421\ldots$ ($\sqrt2$) con un error menor que $\varepsilon$. El ancho se divide por 2 en cada llamada: hay $\lceil\log_2\frac{b-a}{2\varepsilon}\rceil$ llamadas, $\Theta(\log\frac{b-a}\varepsilon)$.

### Ejercicio 9.8
**Paso 1. Función auxiliar.** Una cadena es un palíndromo si tiene menos de dos caracteres o si sus extremos coinciden y lo que queda entre ellos es un palíndromo:
```python
def es_palindromo(s):
    if len(s) < 2:
        return True
    else:
        return s[0] == s[-1] and es_palindromo(s[1:-1])
```

**Paso 2. Planteamiento.** El tamaño es la longitud $L$ que se busca. Se prueban las subcadenas por longitud **decreciente**: la primera que sea palíndromo es la más larga. Para una longitud, se recorren las posiciones de inicio.

**Paso 3. Código.**
```python
def busca_longitud(s, L, i=0):
    if i + L > len(s):
        return None
    elif es_palindromo(s[i:i + L]):
        return s[i:i + L]
    else:
        return busca_longitud(s, L, i + 1)

def palindromo_mas_largo(s, L=None):
    if L is None:
        L = len(s)
    if L == 0:
        return ''
    r = busca_longitud(s, L)
    return r if r is not None else palindromo_mas_largo(s, L - 1)
```

**Paso 4. Comprobación.** `palindromo_mas_largo('babad')` devuelve `'bab'` (también valdría `'aba'`) y `palindromo_mas_largo('abc')` devuelve `'a'`.

**Paso 5. Coste.** Hay $O(n^2)$ subcadenas y comprobar cada una cuesta $O(n)$: $O(n^3)$. Una descomposición ingenua que pruebe `s[:-1]` y `s[1:]` a la vez sería exponencial: $T(n)=2T(n-1)+\ldots\in\Theta(2^n)$.
