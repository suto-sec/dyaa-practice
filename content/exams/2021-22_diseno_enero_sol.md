# Soluciones examen diseño – enero 2021-2022
Prueba de evaluación. Asignatura: Diseño y Análisis de Algoritmos, Grado en Ingeniería Informática. Autor: Manuel Rubio Sánchez. Curso 2021-2022 – 18 de enero de 2022, Prueba de Diseño de Algoritmos.

## Ejercicio 1 [2 puntos]
Diseña un método recursivo basado en la técnica de divide y vencerás que, dada una lista `a` de números, devuelva una lista cuyos elementos sean la suma de dos elementos consecutivos de `a`. Por ejemplo, si `a = [3, 5, −2, 8]`, el método debe devolver `[8, 3, 6]`. Se asumirá que la lista `a` no es vacía.

### Posible solución
Al aplicar divide y vencerás sobre una lista la estrategia debe basarse en las soluciones a los subproblemas que consideran las dos mitades de la lista de entrada. Para este problema el diagrama recursivo (como los vistos en clase) podría ser:

```
Entrada                          Resultado
[7, 3, 4, 8, 3, -6, -4, 5]  -->  [10, 7, 12, 11, -3, -10, 1]
                                 = [10, 7, 12] + [11] + [-3, -10, 1]
  [7, 3, 4, 8]              -->  [10, 7, 12]
  [3, -6, -4, 5]            -->  [-3, -10, 1]
```

La regla recursiva debe concatenar el resultado del primer subproblema con la (lista de la) suma de los elementos centrales, y luego con el resultado del segundo subproblema. El código resultante podría ser el siguiente, donde se retorna una lista vacía en el caso base (cuando la lista de entrada solo tiene un elemento):

```python
def f(a):
    if len(a)==1:
        return []
    else:
        mitad = len(a)//2

        return f(a[:mitad]) + [a[mitad-1]+a[mitad]] + f(a[mitad:])
```

## Ejercicio 2 [3 puntos]
Dada una circunferencia C de radio r centrada en el origen, y un punto q en el plano, se pide implementar una variante recursiva del algoritmo de bipartición (también denominado "bisección") para hallar el punto de corte s entre C y el segmento cuyos extremos son el origen y q. [figura: circunferencia C de radio r centrada en (0,0); segmento del origen a q (fuera de C); s es el punto donde el segmento corta a C.]

Se recuerda que la función que define la circunferencia C es: $x^2+y^2=r^2$. Además, un punto $p=(p_x,p_y)$ se encontrará:
- Dentro de C si $p_x^2+p_y^2<r^2$,
- fuera de C si $p_x^2+p_y^2>r^2$,
- exactamente sobre C si $p_x^2+p_y^2=r^2$.

Se asumirá que el punto q inicial estará fuera de la circunferencia.
Por último, el método debe parar cuando la distancia entre el punto hallado por el algoritmo y el punto s sea menor o igual a un valor $\epsilon$ muy pequeño. Este valor se pasará como parámetro a la función a implementar.

### Posible solución
El algoritmo debe considerar como posible aproximación a s el punto medio (llamémosle z) de un segmento tq, donde inicialmente t es el origen (0, 0). Posteriormente hará varias llamadas recursivas, dividiendo el segmento por dos, y analizando solo la mitad que pueda contener a s. El algoritmo irá dividiendo el segmento progresivamente hasta encontrar la solución exacta o hasta que su longitud sea lo suficientemente pequeña. A continuación se muestra una posible implementación:

```python
def modulo(v):
    return math.sqrt(v[0]**2 + v[1]**2)

def biparticion_listas(r, t, q, epsilon):
    # Punto medio entre t y q
    z = [(t[0]+q[0])/2, (t[1]+q[1])/2]

    # Vector q-t. Su módulo es la distancia entre t y q
    q_t = [q[0]-t[0], q[1]-t[1]]

    if modulo(z)==r or modulo(q_t)<=2*epsilon:
        return z
    elif modulo(z) > r:
        return biparticion_listas(r, t, z, epsilon)
    else:
        return biparticion_listas(r, z, q, epsilon)
```

El caso base corresponde a la situación en la que se halla la solución exacta (porque $\|z\|=r$), o si la aproximación es lo suficientemente buena. Este segundo caso se da cuando la distancia entre t y q es menor que $2\epsilon$, ya que asegura que la distancia entre z y s sea menor que $\epsilon$. En ambos casos el algoritmo devuelve z.
En los casos recursivos resolvemos el mismo problema pero usando un segmento cuya longitud es la mitad de la del original. Si el punto medio z se encuentra fuera de la circunferencia debemos usar tz, mientras que si está dentro debemos usar zq. Esto garantiza que la solución (s) esté contenida en el segmento considerado.

## Ejercicio 3 [5 puntos]
Sea un grafo G no dirigido compuesto por n vértices, indexados desde 0 hasta $n-1$. El grafo G estará definido mediante una matriz de adyacencia simétrica y cuadrada A de tamaño $n\times n$, cuyos elementos serán 0 o 1. Si el elemento $a_{i,j}=0$ no habrá una arista conectando a los vértices i y j, mientras que si $a_{i,j}=1$ sí que habrá una arista conectándolos y serán adyacentes. Se asumirá que no habrá aristas desde un vértice a sí mismo (es decir, $a_{i,i}=0$ para todo i). A continuación se muestra un ejemplo de un grafo con n = 6 nodos, donde los números en el grafo representan índices de los nodos:

[figura: hexágono con nodos 0..5; aristas 0-1, 0-3, 0-5, 1-2, 1-4, 2-3, 3-4, 3-5]

$$A=\begin{pmatrix}0&1&0&1&0&1\\1&0&1&0&1&0\\0&1&0&1&0&0\\1&0&1&0&1&1\\0&1&0&1&0&0\\1&0&0&1&0&0\end{pmatrix}$$

Se pide implementar un algoritmo basado en la técnica de backtracking para etiquetar los nodos del grafo con números diferentes desde 0 hasta $n-1$ con las siguientes condiciones:
- Las etiquetas de dos nodos adyacentes (conectados mediante una arista) no pueden ser números consecutivos.
- Por otro lado, considerad que ponderamos las aristas con pesos correspondientes a los valores absolutos de las diferencias entre las etiquetas de nodos adyacentes. El algoritmo debe asignar etiquetas a los nodos de manera que se minimice la suma total de estos pesos.

La siguiente figura ilustra dos ejemplos donde los números dentro de los nodos circulares son las etiquetas, y los números en los cuadrados son los pesos de las aristas. En este caso la solución óptima corresponde al grafo etiquetado de la derecha.

[figura: dos grafos con el mismo esquema de aristas, etiquetas dentro de los nodos y pesos |diferencia| en cada arista]
- Izquierda. Etiquetas: `[0, 4, 1, 5, 2, 3]`. Suma de pesos asociados a las aristas: 2 + 2 + 3 + 3 + 3 + 4 + 4 + 5 = 26
- Derecha. Etiquetas: `[1, 4, 0, 5, 2, 3]`. Suma de pesos asociados a las aristas: 2 + 2 + 2 + 3 + 3 + 4 + 4 + 5 = 25

### Posible solución
Como el grafo tiene n nodos y debemos asignarles una etiqueta diferente la solución consiste en hallar una *permutación*. Por tanto, podemos usar y adaptar el esquema de generación de permutaciones. Además, debemos usar parámetros para almacenar la solución (permutación) óptima y el valor óptimo que se pide minimizar. Para acelerar el algoritmo también es conveniente usar un parámetro que contenga la suma o "coste" (de los valores absolutos de las diferencias entre las etiquetas de nodos adyacentes) asociada a la solución parcial. Este parámetro evitará que tengamos que calcular toda la suma cada vez que se ejecute el método. Además, podremos usar su valor para podar el árbol recursivo si éste es mayor que el de la mejor solución hallada hasta el momento. Finalmente, la solución que se describe a continuación usa una función auxiliar para asegurar que no haya etiquetas consecutivas entre nodos adyacentes:

```python
def condicion_consecutivos(k,i,sol,A):
    for j in range(i):
        if A[i][j]==1 and abs(k-sol[j])<=1:
            return False

    return True


def genera_etiquetas(i,coste,libres,sol,A,opt_val,opt_sol):
    n = len(sol)

    # Caso base
    if i==n:
        if coste<opt_val:  # Actualizamos opt_val y opt_sol
            opt_val = coste
            for j in range(n):
                opt_sol[j] = sol[j]

    else:
        # Genera candidatos
        for k in range(n):

            # Comprueba validez del candidato
            if libres[k] and condicion_consecutivos(k,i,sol,A):

                sol[i] = k  # Incluye candidato en solución parcial
                libres[k] = False  # Candidate k-ésimo ya no libre

                # Calculamos el coste asociado a añadir la etiqueta k
                coste_extra = 0
                for j in range(i):
                    if A[i][j]==1:
                        coste_extra = coste_extra + abs(k-sol[j])

                # Expande solución parcial si es posible mejorar la mejor solución hallada
                if coste+coste_extra<opt_val:
                    opt_val = genera_etiquetas(i+1,coste+coste_extra,libres,sol,A,
                        opt_val,opt_sol)

                libres[k] = True  # Candidate k-ésimo vuelve a estar libre

    return opt_val


def genera_etiquetas_wrapper(A):
    n = len(A)
    libres = [True] * n
    sol = [0] * n
    opt_sol = [0] * n
    opt_val = genera_etiquetas(0,0,libres,sol,A,n**3,opt_sol)
```
