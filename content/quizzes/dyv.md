## t5-intro

Q: ¿En qué se diferencian "decrementa y vencerás" y "divide y vencerás"?
+ El primero hace una sola llamada recursiva en cada caso recursivo (el problema reduce su tamaño); el segundo divide en varios subproblemas y combina sus soluciones.
- El primero usa bucles y el segundo recursión.
- El primero es más rápido siempre.
- No hay diferencia: son sinónimos.
? Ejemplos del tema 4 (una llamada) frente a mergesort o quicksort (varias).

Q: ¿Qué esquema sigue divide y vencerás?
+ Dividir el problema en subproblemas del mismo tipo, resolverlos y combinar sus soluciones en la solución del original.
- Resolver el problema entero y luego dividirlo.
- Transformar el problema en otro y no combinar nada.
- Probar todas las soluciones.
? Puede requerir una operación adicional al combinar.

Q: ¿Cuál es una ventaja de divide y vencerás citada en el tema?
+ Puede aumentar la eficiencia, permite paralelismo (subproblemas en distintos procesadores) y hace un uso eficiente de la caché.
- Siempre usa menos memoria.
- Evita las llamadas recursivas.
- Garantiza coste constante.
? Muchos algoritmos importantes se basan en él, como la FFT.

## t5-transforma

Q: ¿Qué es "transforma y vencerás"?
+ Resolver un problema convirtiéndolo en otro más simple, conocido o con algoritmos eficientes (una reducción).
- Dividir el problema en dos mitades.
- Quitar un elemento del problema.
- Resolver con fuerza bruta.
? Esquema: problema A $\to$ transformación $\to$ problema B $\to$ solución de B $\to$ paso sencillo $\to$ solución de A.

Q: Para hallar la **mediana** de un array desordenado con esta estrategia, ¿qué se hace y cuánto cuesta?
+ Se ordena el array ($\Theta(n\log n)$) y se toma el elemento central, o la media de los dos centrales si $n$ es par.
- Se busca el máximo $n/2$ veces.
- Se suman todos los elementos y se divide entre $n$.
- Se calcula en $\Theta(1)$.
? Existen algoritmos más eficientes, como Quickselect.

Q: ¿En qué problema se transforma el cálculo de $\sqrt a$?
+ En hallar un cero de la función $x^2-a$.
- En ordenar una lista.
- En multiplicar matrices.
- En buscar el máximo de $a$.
? Se resuelve con Newton-Raphson o con bipartición.

Q: En la estimación de $\pi$, ¿qué se hace?
+ Se aproxima el círculo con polígonos regulares cuyo número de lados se duplica; los perímetros dan $\frac{p_i}{2R}\le\pi\le\frac{p_c}{2R}$.
- Se mide un círculo físico.
- Se resuelve con una integral exacta.
- Se usa el algoritmo de Euclides.
? El perímetro de un polígono con el doble de lados se obtiene fácilmente a partir del anterior.

## t5-newton

Q: ¿Cuál es la regla del método de Newton-Raphson?
+ $x_{n+1}=x_n-\dfrac{f(x_n)}{f'(x_n)}$
- $x_{n+1}=x_n+f(x_n)\,f'(x_n)$
- $x_{n+1}=\dfrac{f(x_n)}{f'(x_n)}$
- $x_{n+1}=x_n-f'(x_n)$
? Es el corte con el eje de abscisas de la recta tangente en $(x_n,f(x_n))$.

Q: Para $\sqrt a$, con $f(x)=x^2-a$, la regla queda...
+ $x_{n+1}=\dfrac{x_n^2+a}{2x_n}$
- $x_{n+1}=\dfrac{x_n+a}{2}$
- $x_{n+1}=x_n^2-a$
- $x_{n+1}=\dfrac{a}{x_n}$
? Es $x_n-\frac{x_n^2-a}{2x_n}$; para $a=13$ y $x_0=13$ se llega a $3{,}6055\ldots$ en pocos pasos.

Q: En la factorización LU, ¿por qué se prefiere a calcular $A^{-1}$ para resolver $Ax=b$?
+ Porque $A^{-1}$ da errores de precisión y puede ser densa aunque $A$ no lo sea; con $A=LU$ se resuelven dos sistemas triangulares, $Ly=b$ y $Ux=y$.
- Porque $A^{-1}$ no existe nunca.
- Porque LU es de coste $O(n)$.
- Porque LU sólo sirve para matrices diagonales.
? Ambas se calculan en $O(n^3)$; la ventaja es numérica y de estructura.

## t5-dyv

Q: Para el máximo de una lista con divide y vencerás, ¿cuál es la recurrencia y su solución?
+ $T(n)=1+2T(n/2)$ con $T(1)=1$, que da $T(n)=2n-1\in\Theta(n)$.
- $T(n)=1+T(n/2)$, que da $\Theta(\log n)$.
- $T(n)=n+2T(n/2)$, que da $\Theta(n\log n)$.
- $T(n)=2T(n-1)$, que da $\Theta(2^n)$.
? Se divide por la mitad pero hay que resolver dos problemas, y la exponencial y el logaritmo se cancelan: el árbol tiene $2n-1$ nodos.

Q: ¿Podría haber un algoritmo para el máximo más eficiente que una búsqueda lineal?
+ No: el problema tiene una cota inferior $\Omega(n)$, porque hay que procesar todos los elementos.
- Sí, uno de coste $\Theta(\log n)$ dividiendo siempre por la mitad.
- Sí, con divide y vencerás en tiempo $O(\log n)$.
- Sí, con tiempo constante.
? El tamaño de la entrada ya es $n$: no se puede mirar menos.

Q: ¿Cuál es la combinación en el máximo por mitades?
+ $\max\{x,y\}$, siendo $x$ e $y$ los máximos de las dos mitades.
- $x+y$
- $x\cdot y$
- No hay combinación.
? Caso base: $n=1$ devuelve $a_0$.

## t5-ordenacion

Q: ¿Qué descomposición usa cada algoritmo de ordenación recursivo del tema?
+ Insert-sort quita el último, select-sort quita el menor y merge-sort divide en dos mitades.
- Insert-sort divide en dos mitades, select-sort quita el último y merge-sort quita el menor.
- Los tres dividen en dos mitades.
- Los tres quitan el primer elemento.
? La descomposición que escojamos determina el algoritmo.

Q: ¿Cuál es el coste de merge-sort?
+ $T(n)=n+2T(n/2)$, que da $\Theta(n\log n)$ en todos los casos (mejor, peor y medio).
- $\Theta(n^2)$ en el peor caso.
- $\Theta(n)$ en el mejor caso.
- $\Theta(\log n)$.
? Incluso con división en 10% y 90% el orden sigue siendo $\Theta(n\log n)$.

Q: ¿Dónde está el trabajo de merge-sort?
+ En la combinación: mezclar dos listas ordenadas.
- En la descomposición: elegir un pivote.
- En el caso base.
- En ordenar cada mitad por separado, sin mezclar.
? La mezcla toma el menor de las cabezas de las dos listas, repetidamente.

Q: ¿Qué es la memoria auxiliar "out-of-place" en la ordenación?
+ Que se necesita un vector auxiliar de tamaño $n$: la ordenación no se realiza en el propio vector.
- Que no necesita memoria.
- Que se ordena en el propio vector.
- Que la lista se guarda en disco.
? "In-place" es la ordenación realizada en el propio vector.

## t5-quick

Q: En quicksort, ¿cómo se divide la lista?
+ Se escoge un pivote y se coloca la parte con elementos menores o iguales a la izquierda, el pivote, y los mayores a la derecha; luego se ordenan ambas partes recursivamente.
- Se parte por la mitad y se mezcla.
- Se quita el menor.
- Se cuentan las apariciones de cada valor.
? La combinación es trivial: tras las llamadas recursivas la lista ya está ordenada.

Q: ¿Cuál es el coste de quicksort en el mejor y el peor caso?
+ Mejor $\Theta(n\log n)$ (pivote en la mitad); peor $\Theta(n^2)$ (un subvector siempre vacío).
- $\Theta(n\log n)$ en ambos.
- Mejor $\Theta(n)$ y peor $\Theta(n\log n)$.
- $\Theta(n^2)$ en ambos.
? El caso medio es $\Theta(n\log n)$; en la práctica suele superar a otros algoritmos por usar mejor la jerarquía de memoria.

Q: ¿Qué hace la partición de Hoare?
+ Coloca el pivote en su posición final recorriendo la lista desde los dos extremos e intercambiando elementos, y devuelve ese índice; es iterativa.
- Ordena la lista entera.
- Divide la lista en dos mitades iguales.
- Elimina el pivote de la lista.
? También se usa en quickselect.

Q: ¿Por qué **quickselect** no es estrictamente divide y vencerás?
+ Porque sólo hace una llamada recursiva: continúa únicamente en la parte donde puede estar el elemento buscado.
- Porque no usa recursión.
- Porque no usa un pivote.
- Porque ordena toda la lista.
? Su coste medio es $O(n)$ y el peor caso $O(n^2)$.

## t5-multiplicacion

Q: En la multiplicación de números en binario, $x=a\cdot2^m+b$ e $y=c\cdot2^m+d$. ¿Cuántos productos recursivos hace la regla básica y cuántos la de Karatsuba?
+ La básica 4 ($ac,ad,bc,bd$), $\Theta(n^2)$; Karatsuba 3, $\Theta(n^{\log_23})$.
- La básica 3 y Karatsuba 4.
- Las dos 4.
- La básica 2 y Karatsuba 1.
? Karatsuba obtiene $ad+bc$ como $(a+b)(c+d)-ac-bd$.

Q: ¿Cuál es el orden de Karatsuba?
+ $\Theta(n^{\log_23})=\Theta(n^{1{,}585\ldots})$
- $\Theta(n\log n)$
- $\Theta(n^2)$
- $\Theta(n^3)$
? Mejor que el $\Theta(n^2)$ de la multiplicación "lenta".

Q: La multiplicación de matrices por bloques (8 productos de $n/2\times n/2$ y 4 sumas) tiene un coste...
+ $\Theta(n^3)$, por el teorema maestro ($a=8$, $b=2$, $n^{\log_28}=n^3$).
- $\Theta(n^2)$
- $\Theta(n\log n)$
- $\Theta(n^{2{,}8})$
? Strassen reduce los productos a 7 y llega a $\Theta(n^{\log_27})\approx n^{2{,}807}$.

Q: ¿Cuántos productos de submatrices usa el algoritmo de Strassen?
+ 7 multiplicaciones (y 18 sumas), frente a 8 de la descomposición normal.
- 4
- 8
- 6
? Sólo es más eficiente que la multiplicación ordinaria si las matrices son muy grandes.

## t5-otros

Q: En el embaldosado con L-triominós de una cuadrícula $2^k\times2^k$ con un cuadrado sin cubrir, ¿cómo se descompone?
+ Se coloca un triominó en el centro y se hacen 4 llamadas recursivas con cuadrículas de lado $n/2$.
- Se rellenan las filas una a una.
- Se divide en dos mitades de $n\times n/2$.
- Se ordenan las casillas.
? Los casos base son cuadrículas $2\times2$ con un cuadrado sin cubrir, que cubre un triominó.

Q: En la permutación de inversión de bits ($p$ bits, $2^p$ elementos), ¿qué se intercambia?
+ $a_i$ con $a_j$, donde $j$ es $i$ con los bits invertidos (por ejemplo, con $p=3$: la posición 1 con la 4 y la 3 con la 6).
- Los elementos pares con los impares.
- El primer elemento con el último.
- Las dos mitades de la lista.
? Es parte de la FFT.

Q: ¿Cuál de estas es una descomposición válida para la inversión de bits?
+ Dividir en dos mitades, resolver cada una e **intercalar** los resultados; o separar posiciones pares e impares y **concatenar**.
- Ordenar la lista y recorrerla.
- Quitar el primer elemento.
- Sumar los bits.
? El tema muestra dos descomposiciones recursivas y una tercera "iterativa".
