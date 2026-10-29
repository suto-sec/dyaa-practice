# Examen análisis – enero 2020-2021
Asignatura: Diseño y Análisis de Algoritmos. Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez.

Diseño y Análisis de Algoritmos. Curso 2020-2021 – 23 de noviembre de 2020. Prueba de Análisis de Algoritmos

## Ejercicio 1 [2 puntos]
Demuestra utilizando la definición formal de $\Theta$ si se verifica:

$2^{\log_3(n)}\in\Theta(n)$

## Ejercicio 2 [2 puntos]
La fórmula para considerar todas las operaciones que se llevan a cabo en un bucle de tipo FOR o WHILE es:

$T_{bucle}=1_{inicialización}+\sum_{i=1}^{n}(1_{comparación}+T_{cuerpo}+1_{incremento})+1_{última\ comparación}$

Utilízala para hallar el número de operaciones ($T(n)$, simplificada) del siguiente código:
```java
for (int i=0; i<n; i++)
  for (int j=n; j>i; j--)
    procesa(i,j);   // dos operaciones
```

## Ejercicio 3 [6 puntos]
Resuelve la siguiente relación de recurrencia:

$T(n)=\begin{cases}1&\text{si }n=1,\\2T(n/4)+\sqrt{n}&\text{si }n>1,\end{cases}$

por el:
(a) Método general de resolución de recurrencias [3 puntos]
(b) Método de expansión de recurrencias [3 puntos]

Además, indica el orden de complejidad de $T$.
