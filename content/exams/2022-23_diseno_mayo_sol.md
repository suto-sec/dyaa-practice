# Soluciones examen diseño – mayo 2022-2023
Prueba de evaluación. Asignatura: Diseño y Análisis de Algoritmos, Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez. Curso 2022-2023 – 25 de mayo de 2023, Prueba de Diseño de Algoritmos, 2 horas.

## Ejercicio 1 [1 punto]
Se pide diseñar una función recursiva que, dado un número entero n no negativo, devuelva el número de dígitos impares de n. Por ejemplo, para n = 727368238 la función devolverá 4.

### Posible solución
```python
def digitos_impares(n):
    if n<10:
        return n%2
    else:
        return digitos_impares(n//10) + n%2
```
El tamaño del problema es el número de dígitos de n. Por tanto, el caso base ocurre cuando n solo contiene un dígito (n < 10). Si el dígito es impar se devolverá un 1 y si es par un 0. Por tanto, simplemente se puede devolver `n%2`. En el caso recursivo la función devolverá el número de dígitos impares de n ignorando su dígito menos significativo (a través de la llamada recursiva `digitos_impares(n//10)`), más 1 en caso de que el dígito menos significativo sea impar (a través de `n%2`).

## Ejercicio 2 [2 puntos]
Se pide diseñar un algoritmo recursivo basado en la técnica de divide y vencerás que, dada una lista `a` de $2^p$ números (donde p es un entero no negativo), devuelva una lista de la misma longitud, que contenga en su primera mitad los elementos de `a` ubicados en los índices pares, y en su segunda mitad los ubicados en índices impares. Además se preservará el orden de los elementos de `a` en ambas mitades. Por ejemplo, para `a = [3, 8, 1, 2, 4, 5, 7, 6]` la salida debe ser `[3, 1, 4, 7, 8, 2, 5, 6]`.

### Posible solución
```python
def particiona(a):
    if len(a)<=2:
        return a
    else:
        mitad = len(a)//2
        b = particiona(a[:mitad])
        c = particiona(a[mitad:])
        m = mitad//2
        return b[:m] + c[:m] + b[m:] + c[m:]
```
El tamaño de este problema es la longitud de la lista (determinada por p). Si esta longitud es 1 o 2 la lista a devolver sería la misma que la de entrada. Este sería el caso base. En el caso recursivo se puede dividir la lista de entrada por la mitad. Para el ejemplo del enunciado tendríamos las listas `[3,8,1,2]` y `[4,5,7,6]`. Resolviendo el problema para ambas (es decir, realizando llamadas recursivas para estas sublistas) tendríamos `b = [3, 1, 8, 2]` para la primera mitad, y `c = [4, 7, 5, 6]` para la segunda. Para obtener la solución `[3, 1, 4, 7, 8, 2, 5, 6]` debemos concatenar la primera mitad de b con la primera mitad de c, y a continuación la segunda mitad de b con la segunda mitad de c.

## Ejercicio 3 [4 puntos]
Considérese una expresión matemática con n parejas de paréntesis – uno abierto y otro cerrado. Se pide implementar un algoritmo basado en la técnica de backtracking que imprima por pantalla todas las secuencias válidas que se puedan formar con n parejas de paréntesis. Además la función deberá retornar el número total de estas secuencias válidas. Por ejemplo, para n = 3, hay 5 secuencias válidas:
```
((()))
(()())
(())()
()(())
()()()
```

### Posible solución
```python
def parentesis(i,n_abiertos,sol,n):
    if i==2*n: # Solución completa y válida
        # Imprimir la solución
        for j in range(2*n):
            if sol[j]==0:
                print('(',end='')
            else:
                print(')',end='')
        print()
        return 1
    else:
        nsols = 0
        # Genera candidatos (0: paréntesis abierto, 1: paréntesis cerrado)
        for k in range(0,2):

            # número de paréntesis abiertos
            n_abiertos = n_abiertos + (1-k)

            # Comprueba validez (i-n_abiertos+1 es el número de paréntesis cerrados)
            if n_abiertos>=i-n_abiertos+1 and n_abiertos<=n:

                # Expande la solución parcial
                sol[i]=k

                # Intenta seguir expandiendo la solución parcial
                nsols = nsols + parentesis(i+1,n_abiertos,sol,n)

            n_abiertos = n_abiertos - (1-k)

        return nsols


def parentesis_wrapper(n):
    sol = [None] * (2*n)
    return parentesis(0,0,sol,n)
```
La solución parcial en este problema es una lista de tamaño 2n, que debe contener dos tipos de candidatos para indicar un paréntesis abierto o cerrado. En esta solución un 0 indicará un paréntesis abierto y un 1 uno cerrado. El parámetro i indicará el índice de la solución parcial donde ubicaremos un nuevo candidato. Por tanto, si i es 2n la solución parcial estará completa y podremos proceder a imprimirla y a retornar un 1, indicando que hemos encontrado una solución válida.
En el caso recursivo usamos un bucle para generar los dos candidatos. Además, la función puede llevar la cuenta del número de paréntesis abiertos (`n_abiertos`) y cerrados (o su diferencia), para poder determinar la validez de un candidato en $O(1)$. Habiendo actualizado `n_abiertos`, el número de paréntesis cerrados es `i-n_abiertos+1` (también se puede usar un parámetro que lleve la cuenta del número de paréntesis cerrados). La condición de validez es que el número de paréntesis abiertos sea mayor o igual que el número de paréntesis cerrados. Además, el número de paréntesis abiertos no puede ser mayor que n. Si el candidato es válido se actualiza la solución parcial y se realiza una nueva llamada recursiva para intentar expandir la solución parcial (si estuviese completa se llegaría al caso base). Por último, se deshace la modificación realizada sobre el número de paréntesis abiertos, y se retorna el número de soluciones halladas, que se actualiza al hacer la llamada recursiva.

## Ejercicio 4 [3 puntos]
Se pide implementar una función **recursiva** para dibujar una variante del fractal conocido como la curva de Koch, de orden n. La curva de orden 0 es un simple segmento, mientras que la de orden 1 está compuesto por cinco segmentos de un tercio de la longitud del segmento de orden 0, como se ilustra en la siguiente figura.

[figura: curvas de orden 0, 1, 2 y 3. Orden 0: segmento horizontal. Orden 1: 5 segmentos de longitud 1/3: derecho, arriba (90°), derecho, abajo, derecho, formando un saliente rectangular en el tercio central. Órdenes 2 y 3: cada segmento del orden anterior se sustituye por este patrón de 5 segmentos.]

Para obtener sucesivos fractales de orden superior n se descompondría cada segmento del fractal de orden $n-1$ en otros 5 segmentos de manera análoga.
Para dibujar un segmento se usará una función `dibuja(p,q)` que tomará como parámetros los extremos (puntos en el plano) del segmento p y q. No hay que implementar esta función. Se recomienda usar vectores y matrices, como los que se pueden crear con la librería numpy de Python.

### Posible solución
Este problema es análogo al de la curva de Koch. La clave es comprender que un fractal de orden n se compone de 5 fractales de orden $n-1$, como ilustra la siguiente figura:

[figura: fractal de orden 3 y el mismo descompuesto en 5 subfractales de orden 2 coloreados]

Por tanto, en el caso recursivo la función tendrá que hacer 5 llamadas recursivas a fractales de orden $n-1$, donde tendremos que elegir los puntos de los extremos de cada subfractal adecuadamente. La siguiente figura ilustra estos puntos, donde se hace uso de una matriz de rotación $R_{90^\circ}$ para calcularlos (matriz que, si se multiplica por un vector, lo rota 90 grados en sentido contrario a las agujas del reloj), junto con los extremos iniciales p y q.

[figura (3 paneles): (1) segmento de p a q con vector $v=q-p$; (2) desde p, $\frac13 v$ a lo largo del segmento y $w=R_{90^\circ}\frac13 v$ perpendicular hacia arriba; (3) puntos del saliente: p, $p+\frac13v$, $p+\frac13v+w$, $p+\frac23v+w$, $p+\frac23v$, q]

En concreto:
$$R_{90^\circ}=\begin{bmatrix}\cos(90^\circ)&-\sin(90^\circ)\\\sin(90^\circ)&\cos(90^\circ)\end{bmatrix}=\begin{bmatrix}0&-1\\1&0\end{bmatrix}$$
Como en el caso base (si el orden es 0) solo es necesario dibujar un segmento entre p y q, el fractal se puede implementar de la siguiente manera (el ejercicio solo pide implementar la función `fractal`):

```python
import matplotlib.pyplot as plt
import numpy as np

def dibuja(p,q):
    plt.plot([p[0,0],q[0,0]],[p[1,0],q[1,0]],'k-')

def fractal(p, q, n, R_90):
    if n == 0:  # Caso base
        dibuja(p,q)
    else:
        v = q-p
        fractal(p, p+v/3, n-1, R_90)
        x = p+v/3+R_90*v/3
        fractal(p+v/3, x, n-1, R_90)
        fractal(x, x+v/3, n-1, R_90)
        fractal(x+v/3, p+2*v/3, n-1, R_90)
        fractal(p+2*v/3, q, n-1, R_90)


# Matriz de rotación (90 grados en sentido contrario a las agujas del reloj)
R_90 = np.matrix([[0, -1], [1, 0]])

# Dos puntos iniciales
p = np.array([[0], [0]])
q = np.array([[1], [0]])

# Orden
n = 4

fig1 = plt.figure()
fractal(p, q, n, R_90)
plt.axis('equal')
plt.axis('off')
plt.show()
```
