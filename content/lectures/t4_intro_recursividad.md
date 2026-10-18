# Tema 4 Introducción a la recursividad
Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.
Contenido: 1 Introducción; 2 Metodología; 3 Problemas básicos; 4 Problemas adicionales.

## Introducción
### Recursividad
- Métodos/funciones/subprogramas que se invocan a sí mismos. Si A llama a B, y B llama a A: A y B también son recursivos.
- La definición de conceptos en términos de sí mismos.
- Herramienta muy potente para la resolución de problemas computacionales y matemáticos: una forma de pensar al abordar problemas, enfoque de diseño de algoritmos.
- Alternativa a los bucles (para ejecutar instrucciones de manera repetida) y a algunas estructuras de datos (pilas y colas).

### ¿Se puede usar en un diccionario?
- Descendientes (RAE): "Hijos, nietos o personas que descienden de otra". Descender: "Proceder, por natural propagación, de un mismo principio o persona común, que es la cabeza de la familia". Proceder: "Dicho de una persona o de una cosa: Tener su origen en un determinado lugar, o descender de cierta persona, familia o cosa".
- Mejor definición: los hijos más los descendientes de los hijos (H: hijos, D: descendientes, p: persona):
$$D(p)=\begin{cases}\emptyset & H(p)=\emptyset\\ H(p)\cup D(H(p)) & H(p)\neq\emptyset\end{cases}$$

### ¿Cuándo es útil aplicar la recursividad?
- Especialmente útil cuando la "estructura" del problema, algoritmo o los datos no es "lineal": arrays, listas (iteración / bucles) frente a grafos, árboles (recursividad).
- Cuando el método realice dos o más llamadas a sí mismo.
- Cuando sea más fácil comprender la versión recursiva.

### Conceptos clave en la recursividad
- Descomposición/simplificación de problemas: reconocer que para resolver un problema podemos valernos de soluciones a "subproblemas" idénticos al original, pero más sencillos o de menor tamaño.
- Inducción: construimos nuestra solución suponiendo que ya sabemos la solución a estos problemas más simples. No tenemos que calcular estas "subsoluciones" desde cero; se obtienen a través de llamadas recursivas.

### Primer ejemplo: Factorial
$$n!=\underbrace{1\times2\times3\times\cdots\times(n-1)}_{\text{subproblema: }(n-1)!}\times n=\begin{cases}1 & n=0\\ n\times(n-1)! & n>0\end{cases}$$
(problema: n!)
```python
def factorial(n):
    if n==0:
        return 1
    else:
        return factorial(n-1) * n
```

### El paradigma de programación declarativa
- En general, hay que pensar en qué se va a hacer mucho más que en cómo se va a hacer.
- A diferencia del paradigma imperativo, evitaremos pensar en cómo se modifican los parámetros y variables a medida que se ejecuta un programa paso a paso.
- Suponemos que sabemos qué se resuelve (el subproblema), pero no nos interesa saber cómo.
- Salto de fe recursivo: usas la función que estás programando, asumiendo que funciona, aunque todavía no la hayas terminado de implementar.

### Factorial: implementaciones "iterativas" (a evitar)
```python
def fact1(n):
    p = 1
    while n>0:
        p = p*n
        n = n-1
    return p

fact1(n)
```
```python
def fact2(n,p):
    if n==0:
        return p
    else:
        return fact2(n-1,p*n)

fact2(n,1)
```
- Traza de fact1 para n=4: (iteración, n, p) = (0,4,1), (1,3,4), (2,2,12), (3,1,24), (4,0,24).
- Aunque fact2 sea recursivo (por cola), es equivalente a la versión iterativa fact1.
- fact2 surge de un enfoque imperativo, donde pensamos en los valores que toman variables y parámetros. No surge de pensar en subproblemas, ni de pensar de manera "recursiva".

### ¿Árbol de recursión?
- Si podemos, evitaremos pensar en el árbol de recursión (ejemplo: árbol de llamadas de Fibonacci con raíz 7).
- Generalmente no ayuda a diseñar el algoritmo. Lo importante es definir la regla recursiva: la relación entre un nodo padre y los hijos, que se aplica en todo el árbol. Aquí es $F(n)=F(n-1)+F(n-2)$ (números de Fibonacci o similares).
- No perdemos tiempo en pensar cómo se resolverán los subproblemas.

### Tipos de recursividad
- Lineal (no final):
$$f(n,A)=\begin{cases}I & n=1\\ A\cdot f(n-1,A) & n>1\end{cases}\qquad g(n)=f\!\left(n,\begin{pmatrix}1&1\\1&0\end{pmatrix}\right)_{1,2}$$
- Lineal final (por cola):
$$f(n,a,b)=\begin{cases}a & n=0\\ f(n-1,a+b,a) & n\ge1\end{cases}\qquad g(n)=f(n,0,1)$$
- Múltiple:
$$f(n)=\begin{cases}1 & n=1,2\\ 1+\sum_{i=1}^{n-2}f(i) & n\ge3\end{cases}\qquad g(n)=f(n)$$
- Mutua:
$$B(i)=\begin{cases}1 & i=1\\ A(i-1) & i\ge2\end{cases}\qquad A(i)=\begin{cases}0 & i=1\\ A(i-1)+B(i-1) & i\ge2\end{cases}\qquad g(n)=B(n)+A(n)$$
- Anidada:
$$f(n,y)=\begin{cases}1+y & n=1,2\\ f(n-1,\,y+f(n-2,0)) & n\ge3\end{cases}\qquad g(n)=f(n,0)$$

## Metodología
### Metodología para diseñar algoritmos recursivos
1. Identificar el tamaño del problema: lo que determina el número de operaciones a realizar.
2. Establecer los casos base: instancias sencillas del problema que no requieren llamadas recursivas. Suelen ser instancias de menor tamaño.
3. Descomposición: escoger instancias del problema de menor tamaño.
4. Inducción: establecer los casos recursivos a partir de las soluciones de las instancias seleccionadas en la fase de descomposición.
5. Implementar y probar.

### Ejemplo: suma de los primeros naturales
$$S(n)^{*}=\sum_{i=1}^{n}i=1+2+3+\cdots+(n-1)+n$$
(\* Suponemos que no conocemos la fórmula $S(n)=n(n+1)/2$, que se calcula en tiempo constante $\Theta(1)$.)
- Paso 1 (tamaño del problema): n.
- Paso 2 (casos base): n=0, S(0)=0. n=1, S(1)=1 (redundante si consideramos S(0)=0).
- Paso 3 (descomposición): consideramos problemas de tamaño menor: n-1, n-2, n/2, n/10. Algunas descomposiciones no conducen a algoritmos sencillos o eficientes. Lo más sencillo en este caso es considerar S(n-1).
- Paso 4 (casos recursivos):
$$S(n)=\underbrace{1+2+3+\cdots+(n-1)}_{\text{subproblema: }S(n-1)}+n=\begin{cases}0 & n=0\\ n+S(n-1) & n>0\end{cases}$$
```python
def suma(n):
    if n==0:
        return 0
    else:
        return suma(n-1) + n
```
$$T(n)=\begin{cases}1 & n=0\\ T(n-1)+1 & n>0\end{cases}\qquad T(n)\in\Theta(n)$$

### Gráficamente
- Paso 3 (descomposición): buena idea usar diagramas para identificar el problema original y el o los subproblemas a considerar.
- Problema ≡ "número de cuadrados en una pirámide triangular de altura (y base) n"; el subproblema es la pirámide de altura n-1.

### Dividir el tamaño del problema por dos - I
- Paso 3 (descomposición): problemas de tamaño n/2 (aproximadamente). // indica división entera ($8//2=4$, $7//2=3$): $x//y=\lfloor x/y\rfloor$. Se distingue n par y n impar.
$$S(n)=\begin{cases}0 & n=0\\ 1 & n=1\\ 3S(n/2)+S(n/2-1) & n>1,\ n\text{ par}\\ 3S((n-1)/2)+S((n+1)/2) & n>1,\ n\text{ impar}\end{cases}$$
```python
def suma(n):
    if n==0:
        return 0
    elif n==1:
        return 1
    elif n%2==0:
        return 3*suma(n//2) + suma(n//2 - 1)
    else:
        return 3*suma(n//2) + suma(n//2 + 1)
```
- $T(n)=2T(n/2)+1$, con $T(0)=1$ y $T(1)=1$ $\Rightarrow$ $T(n)\in\Theta(n)$.

### Dividir el tamaño del problema por dos - II
- Paso 3 (descomposición): problemas de tamaño n/2 (aproximadamente), con dos subproblemas del mismo tamaño n//2 (n par), o n//2 y n//2+1 (n impar) según el diagrama.
$$S(n)=\begin{cases}0 & n=0\\ 1 & n=1\\ 2S(n/2)+(n/2)^2 & n>1,\ n\text{ par}\\ 2S((n-1)/2)+((n+1)/2)^2 & n>1,\ n\text{ impar}\end{cases}$$
```python
def suma(n):
    if n==0:
        return 0
    elif n==1:
        return 1
    elif n%2==0:
        return 2*suma(n//2) + (n//2)**2
    else:
        return 2*suma(n//2) + (n//2 + 1)**2
```
- $T(n)=T(n/2)+1$, con $T(0)=1$ y $T(1)=1$ $\Rightarrow$ $T(n)\in\Theta(\log n)$.

### Dividir el tamaño del problema por dos - III
- Paso 3 (descomposición): problemas de tamaño n/2 (aproximadamente), con signos "-" y "+" en el diagrama según n par o impar.
$$S(n)=\begin{cases}0 & n=0\\ 1 & n=1\\ 4S(n/2)-n/2 & n>1,\ n\text{ par}\\ 4S((n-1)/2)+(n+1)/2 & n>1,\ n\text{ impar}\end{cases}$$
```python
def suma(n):
    if n==0:
        return 0
    elif n==1:
        return 1
    elif n%2==0:
        return 4*suma(n//2) - n//2
    else:
        return 4*suma(n//2) + n//2 + 1
```
- $T(n)=T(n/2)+1$, con $T(0)=1$ y $T(1)=1$ $\Rightarrow$ $T(n)\in\Theta(\log n)$.

### Arrays y listas
- Es importante conocer dos formas de implementar código relacionado con listas o arrays:
  1. Las funciones reciben la lista completa, pudiendo acceder a su longitud (ej. a = [5,-1,3,2,4,-3], len = 6).
  2. Las funciones reciben la lista completa, pero se trabaja con una sublista de ésta, definida por un índice inferior (inf) y otro superior (sup) (ej. a = [7,0,5,-1,3,2,4,-3,9,2], inf=2, sup=7). Suele ser más eficiente, aunque también más compleja.

### Arrays y listas: suma de los elementos de una lista
- Dado una lista a de n números, hallar la suma de éstos: $s(a)=\sum_{i=0}^{n-1}a_i$.
- Hay varias formas de emplear recursividad para resolver este problema, y varias implementaciones posibles:
  1. $s(a)=\sum_{i=0}^{n-1}a_i=a_0+\sum_{i=1}^{n-1}a_i=a_0+s(a_{1..n-1})$
  2. $s(a)=\sum_{i=0}^{n-1}a_i=\sum_{i=0}^{n-2}a_i+a_{n-1}=s(a_{0..n-2})+a_{n-1}$
  3. $s(a)=\sum_{i=0}^{n-1}a_i=\sum_{i=0}^{m}a_i+\sum_{i=m+1}^{n-1}a_i=s(a_{0..m})+s(a_{m+1..n-1})$

### Arrays y listas - Implementación tipo 1
```python
# s(a) => a[0] + s(a[1:n])
def suma_lista_1(a):
    if len(a) == 0:
        return 0
    else:
        return a[0] + suma_lista_1(a[1:])


# s(a) => s(a[0:n-1]) + a[n-1]
def suma_lista_2(a):
    if len(a) == 0:
        return 0
    else:
        return suma_lista_2(a[:-1]) + a[-1]


# s(a) => s(a[0:n//2]) + s(a[n//2:n])
def suma_lista_3(a):
    if len(a) == 0:
        return 0
    elif len(a) == 1:
        return a[0]
    else:
        mitad = len(a)//2
        return suma_lista_3(a[:mitad]) + suma_lista_3(a[mitad:])
```

### Arrays y listas - Implementación tipo 2
```python
# s(a) => a[0] + s(a[1:n])
def suma_lista_limites_1(a,inf,sup):
    if inf>sup:
        return 0
    else:
        return a[inf] + suma_lista_limites_1(a,inf+1,sup)


# s(a) => s(a[0:n-1]) + a[n-1]
def suma_lista_limites_2(a,inf,sup):
    if inf>sup:
        return 0
    else:
        return a[sup] + suma_lista_limites_2(a,inf,sup-1)


# s(a) => s(a[0:n//2]) + s(a[n//2:n])
def suma_lista_limites_3(a,inf,sup):
    if inf>sup:
        return 0
    elif inf==sup:
        return a[inf] # or a[sup]
    else:
        mitad = (sup+inf)//2
        return suma_lista_limites_3(a,inf,mitad) + suma_lista_limites_3(a,mitad+1,sup)
```

## Problemas básicos
### Suma de los dígitos de un número
- Dado un número $n\in\mathbb{N}$, hallar la suma de sus dígitos. Ejemplo: para n=3652, se devuelve $s(3652)=3+6+5+2=16$.
- Paso 1 (tamaño): el número de dígitos de n.
- Paso 2 (casos base): instancia más pequeña: que el número solo contenga un dígito. Si n<10, s(n)=n.
- Paso 3 (descomposición). Opciones: eliminar el dígito menos significativo s(365) (más sencillo); eliminar el más significativo s(652); dividir el número por la mitad s(36), s(52).
- Paso 3: s(n//10) es la suma de todos los dígitos de n, salvo el menos significativo. s(365)=14.
- Paso 4 (casos recursivos): si conocemos s(n//10) solamente hace falta sumarle el dígito menos significativo de n: (n%10). En el ejemplo: s(3652)=s(365)+2. Caso recursivo: $s(n)=s(n//10)+(n\%10)$.
```python
def suma_digitos(n):
    if n<10:
        return n
    else:
        return suma_digitos(n//10) + n%10
```

### Suma lenta
- Dados $a,b\in\mathbb{N}$, hallar su suma. Solo se puede sumar o restar una unidad a los números. Ejemplo: $s(a,b)=a+b$. Para a=3 y b=5, s(3,5)=8.
- Paso 1 (tamaño): hay varias opciones. Puede ser a, b o mín(a,b). Empecemos tomando como tamaño a.
- Paso 2 (casos base): instancia más pequeña: a=0. En ese caso s(0,b)=b.
- Paso 3 (descomposición): varias opciones válidas: el subproblema s(a-1,b); s(a-1,b+1); s(a-1,b-1).

#### Suma lenta - I
- Paso 3: s(a-1,b)=a-1+b. Paso 4: ¿cómo conseguir s(a,b) si ya sabemos s(a-1,b)? Solo hace falta sumarle 1. Caso recursivo: s(a,b)=s(a-1,b)+1.
```python
def suma_lenta1(a,b):
    if a==0:
        return b
    else:
        return suma_lenta1(a-1,b) + 1
```
#### Suma lenta - II
- Paso 3: s(a-1,b+1)=a-1+b+1=a+b. Paso 4: no hace falta hacer nada. Caso recursivo: s(a,b)=s(a-1,b+1).
```python
def suma_lenta2(a,b):
    if a==0:
        return b
    else:
        return suma_lenta2(a-1,b+1)
```
#### Suma lenta - III
- Paso 3: s(a-1,b-1)=a-1+b-1=a+b-2. Paso 4: sumar 1 dos veces. Caso recursivo: s(a,b)=s(a-1,b-1)+1+1.
```python
def suma_lenta3(a,b):
    if a==0:
        return b
    else:
        return suma_lenta3(a-1,b-1) + 1 + 1
```
#### Suma lenta - IV
- Paso 1 (tamaño): ahora, tomemos mín(a,b) como tamaño del problema.
- Paso 2 (casos base): instancia más pequeña: a=0 o b=0. Si a=0 se retorna b, y si b=0 se retorna a. Es decir, s(0,b)=b y s(a,0)=a.
- Paso 3 (descomposición): consideramos el subproblema s(a-1,b-1). Garantiza que se reduce el tamaño del problema. s(a-1,b-1)=a+b-2.
- Paso 4: sumar 1 dos veces. Caso recursivo: s(a,b)=s(a-1,b-1)+1+1.
```python
def suma_lenta4(a,b):
    if a==0:
        return b
    elif b==0:
        return a
    else:
        return suma_lenta4(a-1,b-1) + 1 + 1
```

### Máximo de una lista
- Dada una lista a, de longitud $n\ge1$, hallar el máximo de sus elementos: $\max_{i=0..n-1}\{a_i\}$. Ejemplo: m([4,2,7,5]) = 7.
- Paso 1 (tamaño): n. Paso 2 (casos base): si n=1, $m(a)=a_0$.
- Paso 3 (descomposición), varias opciones válidas: eliminar el primer elemento (a[1:]) $m(a_{1..n-1})$; eliminar el último (a[:-1]) $m(a_{0..n-2})$; dividir la lista por la mitad (a[:mitad] y a[mitad:]) $m(a_{0..h-1})$ y $m(a_{h..n-1})$, donde $h=n//2=\lfloor n/2\rfloor$.

#### Máximo de una lista - I
- Paso 3: $m(a_{1..n-1})$. Paso 4: será el mayor entre el encontrado en la sublista y el primer elemento de a. Caso recursivo: $m(a)=\max\{m(a_{1..n-1}),a_0\}$.
```python
def maximo1(a):
    if len(a)==1:
        return a[0]
    else:
        return max(maximo1(a[1:]),a[0])
```
#### Máximo de una lista - II
- Paso 3: $m(a_{0..n-2})$. Caso recursivo: $m(a)=\max\{m(a_{0..n-2}),a_{n-1}\}$.
```python
def maximo2(a):
    n = len(a)
    if n==1:
        return a[0]
    else:
        return max(maximo2(a[:-1]),a[n-1])
```
#### Máximo de una lista - III
- Paso 3: $m(a_{0..h-1})$ y $m(a_{h..n-1})$. Será el mayor entre los máximos encontrados en ambas sublistas. Caso recursivo: $m(a)=\max\{m(a_{0..h-1}),m(a_{h..n-1})\}$.
```python
def maximo3(a):
    n = len(a)
    if n==1:
        return a[0]
    else:
        mitad = n//2
        return max(maximo3(a[:mitad]), maximo3(a[mitad:]))
```

### Potencia con exponente no negativo
- Calcular $b^n$, donde $b\in\mathbb{R}$ y $n\in\mathbb{N}$ es un entero no negativo. Ejemplo: si $f(b,n)=b^n$, $f(2,5)=2^5=32$.
- Paso 1 (tamaño): n. Paso 2 (casos base): si n=0: f(b,n)=1 (se asume que $0^0=1$).
- Paso 3 (descomposición), opciones: considerar f(b,n-1); considerar f(b,n//2).

#### Potencia - I
- Paso 4: ¿cómo conseguir $b^n$ si conoces $b^{n-1}$? Caso recursivo: $b^n=b\cdot b^{n-1}$.
```python
def pot1(b,n):
    if n==0:
        return 1
    else:
        return b*pot1(b,n-1)
```
- $T(n)=\Theta(n)$.

#### Potencia - II
- Paso 4: ¿cómo conseguir $b^n$ si conoces $b^{n//2}$? Si n es par: $b^n=(b^{n//2})^2$. Si n es impar: $b^n=b\cdot(b^{n//2})^2$.
```python
def pot2(b,n):
    if n==0:
        return 1
    elif n%2==0:
        p = pot2(b,n//2)
        return p*p
    else:
        p = pot2(b,n//2)
        return b*p*p
```
- $T(n)=\Theta(\log n)$.

### Escribir secuencia de caracteres - I
- Dada una cadena de n caracteres s, escribir éstos verticalmente y en orden. Si s es la cadena vacía se escribirá un salto de línea. Ejemplo: f('hola') → h, o, l, a (uno por línea).
- Paso 1 (tamaño): n. Paso 2 (casos base): si n=0: print(); si n=1: print(s).
- Paso 3 (descomposición): eliminar el primer elemento de s (s[1:]) $f_1(s_{1..n-1})$; eliminar el último (s[:-1]) $f_2(s_{0..n-2})$; escribir ambas mitades por separado (s[:mitad] y s[mitad:]) $f_3(s_{0..h-1})$ y $f_3(s_{h..n-1})$, donde h=n//2.

### Escribir secuencia de caracteres - II
- Igual pero en orden inverso: g('hola') → a, l, o, h (uno por línea). Mismos pasos 1 a 3 con $g_1,g_2,g_3$.

### Escribir secuencia de caracteres - I y II
- Pasos 4 y 5 (casos recursivos e implementación):
```python
def f1(s):
    n = len(s)
    if n==0:
        print()
    elif n==1:
        print(s)
    else:
        print(s[0])
        f1(s[1:])

def f2(s):
    n = len(s)
    if n==0:
        print()
    elif n==1:
        print(s)
    else:
        f2(s[:-1])
        print(s[-1])

def f3(s):
    n = len(s)
    if n==0:
        print()
    elif n==1:
        print(s)
    else:
        m = n//2
        f3(s[:m])
        f3(s[m:])
```
```python
def g1(s):
    n = len(s)
    if n==0:
        print()
    elif n==1:
        print(s)
    else:
        g1(s[1:])
        print(s[0])

def g2(s):
    n = len(s)
    if n==0:
        print()
    elif n==1:
        print(s)
    else:
        print(s[-1])
        g2(s[:-1])

def g3(s):
    n = len(s)
    if n==0:
        print()
    elif n==1:
        print(s)
    else:
        m = n//2
        g3(s[m:])
        g3(s[:m])
```

### Sumatorio general
- Dada una función general g(x) y unos límites m y n, hallar $f(m,n,g)=\sum_{i=m}^{n}g(i)$.
- Paso 1 (tamaño): n-m+1 (número de términos a sumar).
- Paso 2 (casos base): si m>n (el tamaño es 0 o negativo): f(m,n,g)=0. Si m=n (solo necesario si se divide el sumatorio en dos en la fase de descomposición): f(m,n,g)=g(m).
- Paso 3 (descomposición): eliminamos el primer elemento de la suma, consideramos f(m+1,n,g): $\sum_m^n g(i)=g(m)+\sum_{m+1}^n g(i)$. Eliminamos el último, consideramos f(m,n-1,g): $\sum_m^n g(i)=\sum_m^{n-1}g(i)+g(n)$. Dividimos el sumatorio en dos (por la mitad), consideramos f(m,h,g) y f(h+1,n,g), donde h=(n+m)//2: $\sum_m^n g(i)=\sum_m^h g(i)+\sum_{h+1}^n g(i)$.
- Pasos 4 y 5:
```python
def g(x):
    return x*x;

def s1(m,n,g):
    if m>n:
        return 0
    else:
        return g(m) + s1(m+1,n,g)

def s2(m,n,g):
    if m>n:
        return 0
    else:
        return s2(m,n-1,g) + g(n)

def s3(m,n,g):
    if m>n:
        return 0
    elif m==n:
        return g(m)
    else:
        mitad = (n+m)//2
        return s3(m,mitad,g) + s3(mitad+1,n,g)
```

### ¿Contiene dígito?
- Dado un entero no negativo n, y un dígito $d\in\{0,1,\dots,9\}$, determinar si d es una de las cifras de n. Ejemplo: si la función booleana es f(n,d), f(3082,2)=True.
- Paso 1 (tamaño): el número de dígitos de n.
- Paso 2 (casos base): si n solo contiene un dígito el resultado es ¿n=d? Si d es el último dígito de n (el menos significativo) el resultado es True (se puede incorporar como caso base o en la regla recursiva).
- Paso 3 (descomposición): consideramos n//10, que es n sin el último dígito.
- Paso 4 (casos recursivos): si no estás en un caso base (d no es el último dígito de n) el resultado será f(n//10,d) (si d es una de las cifras restantes de n).
```python
def contiene_digito_cola(n,d):
    if n<10:
        return n==d
    elif n%10==d:
        return True
    else:
        return contiene_digito_cola(n//10,d)

def contiene_digito_lineal(n,d):
    if n<10:
        return n==d
    else:
        return (n%10==d) or contiene_digito_lineal(n//10,d)
```

## Problemas adicionales
### Cambio de base
- Dado un número entero no negativo n, calcular su expresión en base b ($b\in[2,9]$ es otro entero). Ejemplo: $142_{10}=1032_5$. Por tanto, c(142,5)=1032.
- Paso 1 (tamaño): el número de dígitos de la salida.
- Paso 2 (casos base): instancia más pequeña: que la salida solo tenga un dígito, n<b. En ese caso c(n,b)=n.
- Paso 3 (descomposición): ¿cómo te acercas al caso base? Dividiendo n entre b. c(n//b,b) tendrá un dígito menos que c(n,b).
- Paso 4 (casos recursivos): ¿si conoces c(n//b,b), cómo construyes c(n,b)? Ejemplo: para n=142, n//5=28. Además, c(142,5)=1032 y c(28,5)=103. Tendríamos que multiplicar 103 por 10, y sumarle 2. La regla recursiva es: $c(n,b)=10\cdot c(n//b,b)+n\%b$.
```python
def cambio_base(n,b):
    if n<b:
        return n
    else:
        return 10*cambio_base(n//b,b) + n%b
```

### Evaluar un polinomio
- Sea $P(x,d)=d_nx^n+d_{n-1}x^{n-1}+\cdots+d_1x+d_0$ un polinomio de grado n, determinado por los coeficientes $d_i$, que se especifican en una lista d de longitud n+1. Evaluar el polinomio para un valor concreto de x. Ejemplo: $P(3,[2,-4,5])=5\cdot(3)^2-4\cdot(3)^1+2=35$.
- Paso 1 (tamaño): n. Paso 2 (casos base): n=0. En ese caso $P(x,d)=d_0$.
- Paso 3 (descomposición): eliminamos el primer elemento de d (algoritmo de Horner). También se puede eliminar el último, o partir el polinomio en dos.
- Paso 4 (casos recursivos): asumimos que conocemos $P(x,d_{1..n})=d_nx^{n-1}+d_{n-1}x^{n-2}+\cdots+d_1$. La regla recursiva es: $P(x,d)=d_0+x\cdot P(x,d_{1..n})$.
```python
def horner(x,d):
    if len(d)==1:
        return d[0]
    else:
        return d[0] + x*horner(x,d[1:])
```

### Búsqueda lineal
- Dada una lista a de longitud n, no necesariamente ordenada, y un elemento x, devolver un índice de la lista en el que se encuentre x. Si x no está en la lista el método devolverá -1. El método será una función f(a,x).
- Paso 1 (tamaño): n.
- Paso 2 (casos base): n=0. En ese caso el método devolverá -1. Otros casos triviales (no es necesario considerar ambos): si $x=a_{n-1}$ el método devolverá n-1; si $x=a_0$ el método devolverá 0.
- Paso 3 (descomposición): eliminar el último elemento de la lista (veremos solo este caso); eliminar el primer elemento de la lista.
- Paso 4 (casos recursivos): si hemos comprobado que $x\ne a_{n-1}$, entonces el resultado será el resultado de buscar a x en la sublista $a_{0..n-2}$. En ese caso $f(a,x)=f(a_{0..n-2},x)$.
```python
def busqueda_lineal(a, x):
    n = len(a)
    if n==0:
        return -1
    elif a[n-1]==x:
        return n-1
    else:
        return busqueda_lineal(a[:-1], x)
```

### Búsqueda en lista ordenada
- Dada una lista a de longitud n, ordenada de manera creciente, y un elemento x, devolver un índice de la lista en el que se encuentre x. Si x no está en la lista el método devolverá -1.
- Paso 1 (tamaño): n.
- Paso 2 (casos base): n=0. La lista es vacía; se devuelve -1. Si $x=a_m$ el método devolverá m. En el algoritmo que veremos (búsqueda binaria) m hará referencia a la mitad de la lista.
- Paso 3 (descomposición): descartar la búsqueda en la mitad superior o inferior de la lista. Esto conducirá a un algoritmo que correrá en tiempo $\Theta(\log n)$.
- Paso 4 (casos recursivos): si $x<a_m$ entonces x solo podrá estar en $a_{0..m-1}$, por lo que la búsqueda debe continuar en esa primera mitad. Si $x>a_m$ entonces x solo podrá estar en $a_{m+1..n-1}$, por lo que la búsqueda debe continuar en la segunda mitad.
- Paso 5 (implementación): al tener que devolver un índice, es conveniente emplear parámetros que indiquen el principio (inf) y final (sup) de la sublista de a en la que se va a realizar la búsqueda. Se pasa toda la lista a (en realidad, un puntero a ella), pero la función debe trabajar solo con los índices entre inf y sup.
```python
def busqueda_binaria(a, x, inf, sup):
    if inf>sup:
        return -1
    else:
        mitad = (inf+sup)//2

        if x==a[mitad]:
            return mitad
        elif x<a[mitad]:
            return busqueda_binaria(a, x, inf,mitad-1)
        else:
            return busqueda_binaria(a, x, mitad+1, sup)
```

### Formas de subir escaleras
- Halla el número de maneras en las que se puede subir unas escaleras de n peldaños, dando pasos de uno o dos peldaños.
- Paso 1 (tamaño): n. Paso 2 (casos base): n=1: solo hay una forma de subir, f(1)=1. n=2: hay dos formas, f(2)=2.
- Paso 3 (descomposición): suponemos que sabemos subir tanto n-1 como n-2 peldaños. Intentaremos construir f(n) a partir de f(n-1) y f(n-2).
- Paso 4 (casos recursivos): en problemas combinatorios (de conteo) es recomendable agrupar los elementos a contar en diferentes categorías. En este caso hay dos tipos de formas de subir: las secuencias que comienzan subiendo un peldaño, y las que empiezan subiendo dos. El número de secuencias que empiezan subiendo un peldaño es f(n-1). El número de secuencias que empiezan subiendo dos peldaños en un paso es f(n-2).
```python
def f(n):
    if n==1:
        return 1
    elif n==2:
        return 2
    else:
        return f(n-1) + f(n-2)
```

### Caminos por Manhattan
- Hallar el número de formas de llegar desde el origen (0,0) hasta el punto (x,y), donde $x,y\in\mathbb{N}$, dando x+y pasos, donde en cada uno solo se puede avanzar una unidad hacia arriba o hacia la derecha. Es decir, solo se puede incrementar en una unidad la coordenada x o la coordenada y en cada paso.
- Paso 1 (tamaño): x+y.
- Paso 2 (casos base): x=0 e y=0 es un caso base, pero hay otro más general: si x=0 o y=0 solo habrá una forma de alcanzar (x,y) (un camino totalmente horizontal o vertical). Si x=0 e y=0 se considera que hay un camino válido.
- Paso 3 (descomposición): suponemos que sabemos llegar al punto (x-1,y) y al (x,y-1). Es decir, aprovechamos las soluciones f(x-1,y) y f(x,y-1).
- Paso 4 (casos recursivos): desde (x-1,y) o (x,y-1) solo hay una manera de llegar a (x,y). Por tanto: $f(x,y)=f(x-1,y)+f(x,y-1)$.
```python
def f(x,y):
    if (x==0) or (y==0):
        return 1
    else:
        return f(x-1,y) + f(x,y-1)
```
$$f(x,y)=\frac{(x+y)!}{x!\cdot y!}=\binom{x+y}{y}=\binom{x+y}{x}$$

### Encontrar un 0 de una función: bisección
- Sea f(x) una función continua en un intervalo [a,b]. Se sabe que signo(f(a)) ≠ signo(f(b)), por lo que la función tendrá al menos un cero (r). Se pide hallar uno de estos ceros con una precisión de ε (la diferencia con respecto al cero real será ε como mucho). Por tanto, el resultado será una estimación ẑ. La función a implementar será ζ(a,b,f,ε).
- Paso 1 (tamaño): b-a, que, en función de ε, determinará el número de veces que se reducirá el intervalo de búsqueda por 2.
- Paso 2 (casos base): si f(ẑ)=0 se podrá parar: se ha encontrado un cero exacto (ẑ=r). Si b-a<2ε, la diferencia entre el cero real (r) y nuestra estimación del cero (ẑ) será menor o igual a ε ($|\hat z-r|\le\epsilon$) y podremos parar.
- Paso 3 (descomposición): reducimos el ancho del intervalo, dividiéndolo por dos. Tomando ẑ=(a+b)/2, ẑ pasará a ser un extremo de un nuevo intervalo, de manera que los signos de la función en sus extremos sean diferentes.
- Paso 4 (casos recursivos): inicialmente ẑ=(a+b)/2. Si signo(f(a)) ≠ signo(f(ẑ)) entonces el resultado será ζ(a,ẑ,f,ε). En caso contrario será ζ(ẑ,b,f,ε).
```python
def f(x):
    return x*x-2

def biseccion(a, b, f, epsilon):
    z = (a+b)/2

    if f(z)==0 or b-a<=2*epsilon:
        return z
    elif (f(a)>0 and f(z)<0) or (f(a)<0 and f(z)>0):
        return biseccion(a, z, f, epsilon)
    else:
        return biseccion(z, b, f, epsilon)
```

### Torres de Hanoi
- Se dispone de n discos de diferente tamaño (el i-ésimo disco tiene radio i), insertados en una torre, en orden decreciente de tamaño (estado inicial). El objetivo es determinar la secuencia de movimientos de discos individuales para ubicar a todos los discos en otra torre (estado final), usando una tercera como auxiliar, con las reglas: 1) solo se puede mover un disco a la vez; 2) no puede haber un disco de mayor tamaño encima de otro de menor tamaño.
- Cada movimiento se imprimirá por pantalla como "Mover disco i desde t1 a t2", donde t1 y t2 podrán ser la torre origen (O), auxiliar (A) o destino (D).
- Para n=4 se puede resolver en 15 movimientos. No suele ser útil analizar todas las operaciones (las etapas 7 y 8 son especialmente interesantes). Debemos centrarnos en subproblemas y sus soluciones.
- Paso 1 (tamaño): n. Paso 2 (casos base): si n=1: mover el disco 1 desde la torre origen a la destino. También: si n=0: no se realiza ningún movimiento.
- Paso 3 (descomposición): consideramos subproblemas de tamaño n-1. Implicación clave: suponemos que sabemos mover toda una pirámide de n-1 discos, desde cualquier torre a otra.
- Paso 4 (casos recursivos): (1) mueve la pirámide de n-1 discos de O a A (llamada recursiva); (2) mueve el disco n de O a D (operación básica); (3) mueve la pirámide de n-1 discos de A a D (llamada recursiva).
```python
def torres_Hanoi(n,o,d,a):
    if n==1:
        print('Mueve disco',n,'desde torre',o,'a torre',d)
    else:
        torres_Hanoi(n-1,o,a,d)
        print('Mueve disco',n,'desde torre',o,'a torre',d)
        torres_Hanoi(n-1,a,d,o)


# Código alternativo
def torres_Hanoi_alt(n,o,d,a):
    if n>0:
        torres_Hanoi_alt(n-1,o,a,d)
        print('Mueve disco',n,'desde torre',o,'a torre',d)
        torres_Hanoi_alt(n-1,a,d,o)
```

### Torres de Hanoi cíclicas
- Idéntico al de las torres de Hanoi original, pero añade una restricción: si las torres se ubican en los vértices de un triángulo (A, B, C), los discos solo podrán pasar de una torre a otra en el sentido de las agujas del reloj.
- Realmente tenemos dos problemas distintos: PROBLEMA 1: mover n discos en el sentido de las agujas del reloj (O → D con A en medio, en sentido reloj). PROBLEMA 2: mover n discos en el sentido contrario al de las agujas del reloj.
- Paso 1 (tamaño): n.
- Paso 2 (casos base): si n=1 ("reloj"): mover el disco 1 desde la torre origen a la destino. Si n=1 ("antireloj"): mover el disco 1 desde la torre origen a la auxiliar, y luego a la destino. También: si n=0: no se realiza ningún movimiento.
- Paso 3 (descomposición): consideramos subproblemas de tamaño n-1, para ambos problemas. Implicación clave: suponemos que sabemos mover toda una pirámide de n-1 discos, en cualquiera de los dos sentidos.
- Paso 4 (casos recursivos): operaciones que podemos realizar: instrucción básica (mover un disco); llamadas recursivas (mover n-1 discos en el sentido de las agujas del reloj; mover n-1 discos en el sentido contrario).
  - Sentido "reloj": inicio (n discos en O); paso 1: n-1 discos de O a A (antireloj); paso 2: disco n de O a D; paso 3: n-1 discos de A a D (antireloj).
  - Sentido "antireloj": inicio; paso 1: n-1 discos de O a D (antireloj); paso 2: disco n de O a A; paso 3: n-1 discos de D a O (reloj); paso 4: disco n de A a D; paso 5: n-1 discos de O a D (antireloj).
- Paso 5 (implementación):
```python
def reloj(n,o,d,a):
    if n>0:
        antireloj(n-1,o,a,d)
        print('Mueve disco',n,'desde torre',o,'a torre',d)
        antireloj(n-1,a,d,o)


def antireloj(n,o,d,a):
    if n>0:
        antireloj(n-1,o,d,a)
        print('Mueve disco',n,'desde torre',o,'a torre',d)
        reloj(n-1,d,o,a)
        print('Mueve disco',n,'desde torre',o,'a torre',d)
        antireloj(n-1,o,d,a)
```
