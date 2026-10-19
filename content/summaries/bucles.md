## Método general
1. Elige qué cuentas: operaciones elementales (asignaciones, comparaciones, incrementos...). Fija cuánto cuesta cada una, normalmente 1.
2. Escribe el coste del **bucle más interno** y sustitúyelo en el de fuera, de dentro hacia fuera.
3. Cada bucle se convierte en un **sumatorio** sobre su contador. Los límites del sumatorio dependen del contador de los bucles exteriores.
4. Resuelve con las fórmulas de sumatorios y deduce el orden con $\Theta$.

## Coste de un bucle de $n$ iteraciones
$$T_{bucle}=\underbrace{1}_{\text{inic.}}+\sum_{i=1}^{n}\Big(\underbrace{1}_{\text{comp.}}+T_{cuerpo}+\underbrace{1}_{\text{incr.}}\Big)+\underbrace{1}_{\text{última comp.}}$$
- Un `for` de $n$ vueltas hace $n$ comparaciones **más una** para salir.
- Un `if` suma la comparación y, según el caso (mejor/peor), el cuerpo o nada.
- Si el cuerpo no depende del contador, el sumatorio es $n\cdot T_{cuerpo}$.

## Plantilla con tres bucles
$$T(n)=1+\sum_{i=0}^{n-1}\left(1+T_{For2}+1\right)+1,\qquad T_{For2}=1+\sum_{j=i+1}^{n}\left(1+T_{If}+1\right)+1$$
- Límites: `range(i+1, n+1)` va de $j=i+1$ a $n$; `range(0, j)` va de $k=0$ a $j-1$ y da $j$ vueltas.
- Un bucle `range(a, b)` hace $b-a$ vueltas.
- Sumatorios que aparecen todo el rato: $\sum_{j=i+1}^{n}c=c(n-i)$, $\sum_{i=0}^{n-1}i=\frac{n(n-1)}{2}$, $\sum_{i=0}^{n-1}i^2=\frac{(n-1)n(2n-1)}{6}$.

## Mejor, peor y caso medio
- **Mejor caso:** la entrada que menos trabajo da (insert-sort con el vector ya ordenado: $t_j=0$, así que $\Theta(n)$).
- **Peor caso:** la que más da (insert-sort con el vector al revés: $t_j=j$, así que $\Theta(n^2)$). Es el que se suele estudiar: es una cota superior que nunca se supera, y suele ocurrir a menudo (búsqueda de algo que no está).
- **Caso medio:** a menudo sale del mismo orden que el peor (insert-sort insertando hasta la mitad también es cuadrático).
- Cuenta cada caso por separado: el mejor y el peor pueden tener órdenes distintos.

## Resultados de los ejemplos de la teoría
| Algoritmo | Caso | $T(n)$ | Orden |
|---|---|---|---|
| Insert-sort | mejor | $K_1n+K_2$ | $\Theta(n)$ |
| Insert-sort | peor | $K_1n^2+K_2n+K_3$ | $\Theta(n^2)$ |
| Bubble-sort (variante) | mejor | $\frac32n^2+\frac52n-1$ | $\Theta(n^2)$ |
| Tres bucles (con `if`) | mejor | $\frac{3n^2+11n+4}{2}$ | $\Theta(n^2)$ |
| Tres bucles (con `if`) | peor | $\frac{8n^3+27n^2+43n+12}{6}$ | $\Theta(n^3)$ |

## Qué recordar
- Para el **orden** las constantes $C_l$ no importan, pero sí el número de veces que se ejecuta cada línea.
- Un bucle que acaba antes (`break`, condición compuesta) hay que acotarlo por caso.
- Una suma con límites que dependen del contador exterior no es $n\cdot n$: se resuelve con las fórmulas.
- Dos bucles anidados **no** son siempre $n^2$: cuenta las vueltas reales. `for j in range(i+1, n+1)` dentro de `for i in range(n)` suma $\frac{n(n+1)}{2}$ (cuadrático), pero un contador que se duplica en cada vuelta (`j *= 2` hasta `n`) hace unas $\log_2 n$ vueltas, no $n$.
