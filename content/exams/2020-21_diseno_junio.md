# Examen diseño – junio 2020-2021
Asignatura: Diseño y Análisis de Algoritmos. Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez.

Diseño y Análisis de Algoritmos. Curso 2020-2021. Prueba de Diseño de Algoritmos - Convocatoria de junio. 30 de junio de 2021. Duración: 1 hora y 15 minutos

## Ejercicio 1 [3 puntos]
Se pide implementar un algoritmo recursivo para calcular el determinante de una matriz cuadrada $A$ de dimensiones $n\times n$, cuyos elementos son $a_{i,j}$, por el método de los adjuntos.
El determinante a calcular se puede definir como:

$|A|=\sum_{i=0}^{n-1}(-1)^i a_{i,0}\cdot|M_{i,0}|$

donde $M_{i,j}$ es la matriz complementaria de $a_{i,j}$, es decir, la resultante de eliminar la fila $i$ y la columna $j$ de la matriz $A$. Nota: en esta fórmula se consideran los matrices complementarias de la primera columna ($j=0$). También se puede hallar el determinante considerando las de otras filas o columnas, pero implementad el algoritmo según la fórmula descrita.
El algoritmo usará matrices de la librería numpy. Para implementar el algoritmo solo necesitaréis lo siguiente:
- Se asume que habéis importado numpy mediante: `import numpy as np`
- `A[i][j]` representa al elemento $a_{i,j}$
- `len(A)` es el número de filas de A
- `B = np.copy(A)` realiza una copia de A y la guarda en B
- `B = np.delete(B,f,0)` elimina la fila f de la matriz B
- `B = np.delete(B,0,1)` elimina la columna 0 de la matriz B

Finalmente, el método puede contener bucles, pero debe llamarse a sí mismo necesariamente ya que debe ser recursivo.

## Ejercicio 2 [7 puntos]
Sea un grafo $G$ no dirigido, y no ponderado, compuesto por $n$ vértices. El grafo $G$ estará definido mediante una matriz de adyacencia simétrica y cuadrada $A$ de tamaño $n\times n$, cuyos elementos serán 0 o 1. Si el elemento $a_{i,j}=0$ no habrá una arista conectando a los vértices $i$ y $j$, mientras que si $a_{i,j}=1$ sí que habrá una arista conectándolos y serán adyacentes. Se asumirá que no habrá aristas desde un vértice a sí mismo (es decir, $a_{i,i}=0$ para todo $i$).
Se pide implementar un algoritmo recursivo basado en la técnica de backtracking para encontrar un ciclo Euleriano en un grafo. Un ciclo Euleriano es un camino que pasa por cada arista una y solo una vez, y comienza y termina en el mismo vértice. Se puede entender como una secuencia de los vértices del grafo, en la que vértices contiguos en la secuencia deben estar conectados mediante una arista en el grafo, y donde el primer vértice debe ser igual al último.
La siguiente figura ilustra un ejemplo en el que una posible solución es la secuencia:

$\langle 0,1,2,3,1,4,3,5,4,2,0\rangle$

[figura: grafo de 6 vértices (0..5) cuya matriz de adyacencia es A]
$$A=\begin{pmatrix}0&1&1&0&0&0\\1&0&1&1&1&0\\1&1&0&1&1&0\\0&1&1&0&1&1\\0&1&1&1&0&1\\0&0&0&1&1&0\end{pmatrix}$$

Aristas: 0-1, 0-2, 1-2, 1-3, 1-4, 2-3, 2-4, 3-4, 3-5, 4-5.

El algoritmo debe parar en cuanto encuentre un ciclo Euleriano, e imprimir la secuencia de vértices que lo compone, en caso de existir. Se puede asumir que la secuencia empezará en el vértice 0. Se valorará la eficiencia del algoritmo desarrollado.
