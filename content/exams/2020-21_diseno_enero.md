# Examen diseño – enero 2020-2021
Asignatura: Diseño y Análisis de Algoritmos. Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez.

Diseño y Análisis de Algoritmos. Curso 2020-2021 – 25 de enero de 2021. Prueba de Diseño de Algoritmos

## Ejercicio 1 [2 puntos]
Se pide implementar un método recursivo que, dada una lista $a$ de números, devuelva otra cuyos elementos sean la suma de elementos consecutivos de $a$. Por ejemplo, para $a=[1,5,10,-2,1]$ el método devolverá la lista [6,15,8,-1]. Si la lista de entrada tiene menos de dos elementos el método deberá devolver una lista vacía.

## Ejercicio 2 [3 puntos]
Sea $a$ un vector ordenado de $n$ enteros (pueden ser negativos) todos distintos. Se pide escribir un método recursivo de complejidad $\Theta(\log n)$, capaz de encontrar un índice $i$ tal que $a[i]=i$, suponiendo que tal índice $i$ exista (donde $0\le i\le n-1$). El método devolverá un valor $i$ en caso de que exista, y $-1$ en caso contrario. Por ejemplo, para $a=[-3,-1,0,2,4,5,13]$, el método deberá devolver 4 o 5 (en este ejemplo $a[4]=4$ y $a[5]=5$, así que el método podrá devolver cualquiera de los dos valores).

## Ejercicio 3 [5 puntos]
Se pide implementar un algoritmo empleando la técnica de backtracking para hallar una solución a una variante del problema de la mochila, así como el método que llamaría a dicha función recursiva.
En particular, se tiene un conjunto de $n$ objetos, cada uno con un peso $p_i$, para $i=0,\ldots,n-1$, y una mochila con capacidad $C$ (el peso máximo que puede soportar la mochila). El algoritmo debe buscar un subconjunto de objetos que pueden introducirse en la mochila sin sobrepasar su capacidad $C$, y de manera que se maximice el peso de los objetos que se introducen en ella. Para obtener la máxima nota el algoritmo debe ser eficiente (usad variables auxiliares para evitar repetir cálculos, y podad el árbol recursivo en cuanto se pase de la capacidad de la mochila o no se pueda mejorar una solución hallada en un paso anterior).
