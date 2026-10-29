# Examen análisis – junio 2016-2017
Asignatura: Diseño y Análisis de Algoritmos. Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez.

Diseño y Análisis de Algoritmos. Curso 2016-2017 – Junio. Prueba de Análisis de Algoritmos. Valor: 30 % de la nota final. Duración: 1 hora

## Ejercicio 1 [2 puntos]
Determina mediante la definición de $O$ si:

$2^{\ln(n)}\in O(n)$

## Ejercicio 2 [4 puntos]
La fórmula para considerar todas las operaciones que se llevan a cabo en un bucle de tipo FOR o WHILE es:

$T_{bucle}=1_{inicialización}+\sum_{i=1}^{n}(1_{comparación}+T_{cuerpo}+1_{incremento})+1_{última\ comparación}$

Utilízala para hallar el número de operaciones ($T(n)$, simplificada) del siguiente código en el PEOR caso:
```java
for (int i=0; i<n; i++)
  if (condicion(i))                // una operación
    for (int j=i; j<=n; j++)
      for (int k=0; k<j; k++)
        procesa(i,j,k);            // dos operaciones
```

## Ejercicio 3 [4 puntos]
Resuelve la siguiente relación de recurrencia (se puede resolver mediante cualquiera de los dos métodos vistos en clase):

$T(n)=\begin{cases}0&\text{si }n=0\\T(n-1)+2^n+1&\text{si }n>0\end{cases}$
