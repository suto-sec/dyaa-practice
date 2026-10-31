### Ejercicio 1
Quita el primer elemento: lo que queda es otra suma alternante, pero con los signos invertidos respecto a la que necesitas. ¿Cómo se combina $a_0$ con el resultado de la sublista? Caso base: lista vacía.

### Ejercicio 2
Divide la lista en dos mitades y permuta cada una recursivamente. Pregúntate cómo se mezclan los resultados: ¿qué elementos de cada mitad deben ir juntos en la lista final? Prueba con $p=2$ a mano ($[g_0,g_2,g_1,g_3]$).

### Ejercicio 3
No son permutaciones ni subconjuntos: cada uno de los $n$ elementos va a **uno de los $m$ conjuntos**. Lleva un contador de cuántos elementos caben aún en cada conjunto y solo ofrece como candidato el que no esté lleno. Cuenta las soluciones completas.

### Ejercicio 4
Estrategia voraz: en cada paso, la moneda más grande que no supera lo que falta. Imprímela y repite con lo que queda. Cuidado con los decimales (trabaja en céntimos enteros o redondea). Caso base: no queda nada.
