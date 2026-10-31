### Ejercicio 3.1
Calcula $f(0),f(1),f(2),f(3),f(4)$ a mano y reconoce la secuencia. Después expande $f(n)=f(n-1)\times n$ hasta llegar a $f(0)$.

### Ejercicio 3.2
Calcula los términos sumando 3 cada vez. Expande $s_n=s_{n-1}+3$ unas veces y mira qué se acumula: $s_n=s_0+\dots$

### Ejercicio 3.3
Dos valores **consecutivos** bastan (hacia delante con la regla y hacia atrás despejando). Si los valores están separados, expresa los intermedios en función de las dos incógnitas $s_{i+1}, s_{i+2}$ y resuelve el sistema con el segundo dato. Para $s_1=1$, $s_5=17$ llama $x$ a $s_2$.

### Ejercicio 3.4
Escribe $D(p)$ como unión de dos cosas: los hijos de $p$ y, para cada hijo, sus descendientes. La recursión termina sola cuando no hay hijos (el conjunto vacío).

### Ejercicio 3.5
Inducción sobre $n$. Caso base: $n=2$ (suma vacía). En el paso, escribe $F(n+1)=F(n)+F(n-1)$, aplica la hipótesis a $F(n)$ y simplifica.

### Ejercicio 3.6
Caso base: $0!=1$. Caso recursivo: llama a la función con $n-1$ y multiplica por $n$.

### Ejercicio 3.7
Sustituye la comprobación de lista vacía por `a == []`, la cabeza por `a[0]` y la cola por `a[1:]`. La suma de la lista vacía es 0.

### Ejercicio 3.8
Tres funciones, tres descomposiciones: (b) quita el último elemento, (c) quita el primero y (d) parte por la mitad. Para (d) piensa qué pasa con una lista de un solo elemento: necesita su propio caso base.

### Ejercicio 3.9
Inducción sobre $n$. Caso base $n=1$: ambos lados valen 1. En el paso, suma $x^n$ a los dos lados de la hipótesis y simplifica la fracción hasta obtener la fórmula con $n+1$.

### Ejercicio 3.10
Programa cada función de forma literal a su definición. Para las que llevan más parámetros (como $f(n,a,b)$) escribe una función auxiliar que solo reciba $n$ y fije los valores iniciales.

### Ejercicio 3.11
El tamaño es el número de bits de $n$ (≈ $\log_2 n$). ¿Qué te dice el último bit ($n\%2$) y qué subproblema queda al quitarlo ($n//2$)? Caso base: $n=1$ (o $n=0$).

### Ejercicio 3.12
Si ahora $n$ puede ser 0, el caso base pasa a ser $n=0$ con $S(0)=0$ (la suma de cero enteros). El caso $n=1$ ya se deduce de la regla recursiva.

### Ejercicio 3.13
Piensa en $S(n)$ como el número de cuadrados de una escalera de altura $n$. Parte la escalera en cuatro cuadrantes: dos son escaleras de la mitad, uno está vacío y el cuarto es un cuadrado. Para impares, el cuadrado no es perfecto; ajusta con $(n\pm1)/2$.

### Ejercicio 3.14
Para imprimir en orden normal, primero hay que imprimir los dígitos más significativos (resolver $n//10$) y después el último ($n\%10$). El orden de las dos acciones es lo importante. Caso base: un solo dígito.

### Ejercicio 3.15
Divide la lista en dos mitades, calcula el máximo de cada una y quédate con el mayor de los dos. Dibuja el diagrama con notación general ($a_0\ldots a_{h-1}$ y $a_h\ldots a_{n-1}$).

### Ejercicio 3.16
Quita el último elemento: el máximo de la lista es el mayor entre el máximo de la sublista y ese último elemento. Caso base: lista de un elemento.

### Ejercicio 4.1
Para reducir el tamaño solo en una unidad, basta con un caso base ($n=0$) y la regla: $n$ es par si y solo si $n-1$ **no** lo es.

### Ejercicio 4.2
Divide el exponente por 2: $b^n=(b^{n/2})^2$ si $n$ es par y $b\cdot(b^{\lfloor n/2\rfloor})^2$ si es impar. Calcula la mitad una sola vez. Para $n<0$, usa $1/b^{-n}$.

### Ejercicio 4.3
Misma idea que la potencia de un número, pero con matrices: caso base, la matriz identidad; luego eleva al cuadrado la mitad, y multiplica por $A$ si el exponente es impar. Las potencias de esta matriz producen una conocida secuencia.

### Ejercicio 4.4
El tamaño es el número de términos $n-m+1$. Caso base: $m>n$ (suma vacía = 0). Aísla el primer término: $f(m)$ más la suma de $m+1$ a $n$. Pasa $f$ como un parámetro más.

### Ejercicio 4.5
Dibuja el producto como un rectángulo $m\times n$. Si quitas una fila, queda un rectángulo con $m-1$ y sobra una fila de $n$ cuadrados. Caso base: algún lado es 0.

### Ejercicio 4.6
Divide el rectángulo en cuatro bloques con $m=2a+r$ y $n=2b+s$ ($r,s\in\{0,1\}$). El bloque grande vale $4ab$ (que es el producto de $a\times b$ cuatro veces) y sobran una fila y una columna como máximo. Trata las cuatro combinaciones de paridad.

### Ejercicio 4.7
Quita la última cifra con `n // 10`: tiene un dígito menos. Caso base: `n < 10` (incluye el 0).

### Ejercicio 4.8
Mira el último dígito (`n % 10`) y el resto (`n // 10`). Cada dígito que se añade a la derecha duplica el valor binario del resto y suma el último dígito. Caso base: un solo dígito.

### Ejercicio 4.9
El resto `n % b` es la última cifra y `n // b` el número sin ella. Construye el resultado del cociente y añade el resto a la derecha. Caso base: `n == 0`.

### Ejercicio 4.10
Si el último bit es 1 (`x` impar), la posición es 1. Si no, el bit buscado estará una posición más a la izquierda en `x // 2`: suma 1 al resultado de ese subproblema.

### Ejercicio 4.11
El ejercicio 1.9 suma, para todos los números de 1 a $2^n-1$, la posición de su primer 1. Usa la función de 4.10 para cada número y suma de forma recursiva (por ejemplo, de $2^n-1$ hacia abajo).

### Ejercicio 4.12
Quita el primer carácter: el resultado es el número de vocales del resto más 1 si ese carácter es vocal. Caso base: cadena vacía.

### Ejercicio 4.13
En el código dado hay un nombre de variable equivocado. Para sustituir el bucle, escribe una función recursiva que reciba la fila anterior y devuelva la lista de sumas de elementos consecutivos (como en un ejercicio anterior).

### Ejercicio 4.14
El dígito mayor está al final. Si $x$ es mayor o igual que el último dígito, va al final. Si no, deja ese último dígito donde está e inserta $x$ en el número sin él; después recompón.

### Ejercicio 4.15
Es el mismo esquema que 4.14, pero con listas: si $x$ es mayor o igual que el último elemento (o la lista es vacía), añádelo al final. Si no, inserta en la lista sin el último elemento y vuelve a poner ese último.

### Ejercicio 4.16
Con una sola llamada recursiva, usa la fórmula factorial para relacionar $\binom nm$ con $\binom{n-1}{m}$, con $\binom n{m-1}$ o con $\binom{n-1}{m-1}$, despejando el factor que cambia (los factoriales se cancelan casi todos).

### Ejercicio 4.17
Ordena los primeros $n-1$ elementos de forma recursiva y luego inserta el último en el resultado ya ordenado (usa la función del ejercicio 4.15). Caso base: lista de 0 o 1 elementos.

### Ejercicio 5.1
Mira el último dígito (`n % 10`) y el resto (`n // 10`). Para recursión lineal: es impar el último o lo es alguno del resto. Para recursión por cola: pasa lo hallado hasta ahora como acumulador y devuélvelo en el caso base. Caso base: `n == 0`.

### Ejercicio 5.2
Recorre los coeficientes del grado mayor al menor, saltando los nulos. Para cada uno decide signo, valor absoluto y la parte `x^i` (que no aparece en el término constante). Cuida el caso de un polinomio todo ceros. El coste es lineal en la longitud de la lista.

### Ejercicio 5.3
Dos pasos. Paso 1: recorre `a` con un índice y suma 1 en `b[a[i]]` en cada paso (recursión por cola). Paso 2: recorre `b` y, para cada valor `v`, escribe `b[v]` copias de `v` en `c`. El coste es $O(n+k)$.

### Ejercicio 5.4
En un árbol de búsqueda binario las claves menores están a la izquierda. Si el subárbol izquierdo está vacío, la raíz es el mínimo; si no, baja por la izquierda.

### Ejercicio 5.5
Sin `sup`, trabaja con una **sublista** (corta la lista en cada llamada) y lleva un parámetro `inf` que indica dónde empezaba esa sublista en la lista original, para devolver el índice correcto cuando bajas por la derecha.

### Ejercicio 5.6
Con solo `x` y `a`, la forma de reducir a la mitad es pasar la sublista izquierda o derecha. Lista vacía: `False`. Compara con el elemento central y decide. Coste: una división por dos por nivel, $\Theta(\log n)$ comparaciones (aunque el copiado de sublistas puede encarecerlo).

### Ejercicio 5.7
En una lista creciente de enteros distintos, $a_i-i$ no decrece. Mira el elemento central: si $a_m>m$ no puede haber coincidencia a la derecha; si $a_m<m$, no a la izquierda. Caso base: tramo vacío, devuelve $-1$.

### Ejercicio 5.8
Todos los pares están antes que los impares: si el elemento central es par, todos los anteriores también lo son (busca a la derecha); si es impar, todos los siguientes lo son (busca a la izquierda). Cuando no quedan elementos, devuelve el último índice par conocido (o $-1$ si ninguno).

### Ejercicio 5.9
Aplica la regla de Newton-Raphson a la aproximación anterior: la estimación tras $n$ pasos se obtiene de la de $n-1$ pasos. Para la raíz cuadrada de $a$ usa $f(x)=x^2-a$. Caso base: $n=0$, devuelve la estimación inicial.

### Ejercicio 6.1
Divide el tramo en dos mitades y mira si `x` está en alguna. Casos base: tramo vacío (no está) y tramo de un elemento (compáralo).

### Ejercicio 6.2
Función auxiliar: el conjunto de dígitos de un entero es su último dígito unido al conjunto de dígitos de `n // 10`. Para la lista, divide por la mitad y combina las dos soluciones con una operación de conjuntos (¿unión o intersección?).

### Ejercicio 6.3
La mejor sublista está en la izquierda, en la derecha, o **cruza** la mitad. Para la que cruza, haz dos bucles: la mejor suma que termina en `mitad-1` hacia la izquierda y la mejor que empieza en `mitad` hacia la derecha; súmalas. Devuelve el máximo de las tres.

### Ejercicio 6.4
Como Karatsuba: parte cada polinomio en parte baja y alta, $P=P_0+x^mP_1$. El producto necesita $P_0Q_0$, $P_1Q_1$ y $(P_0+P_1)(Q_0+Q_1)$: solo tres multiplicaciones recursivas. El término cruzado se obtiene restando los otros dos. Necesitas suma y resta de polinomios.

### Ejercicio 6.5
Parte $A$ en cuatro bloques y traspón cada uno recursivamente. Luego recompón con el bloque $A_{2,1}^T$ y $A_{1,2}^T$ **intercambiados** de posición. Caso base: una sola fila o columna (basta cambiar las dimensiones).

### Ejercicio 6.6
Strassen calcula el producto de bloques con 7 multiplicaciones $M_1,\dots,M_7$ en lugar de 8, y recompone el resultado con sumas y restas. Funciona con matrices $2^k\times2^k$: la función auxiliar rellena con ceros hasta ese tamaño y recorta el resultado.

### Ejercicio 6.7
Parte $A$ por columnas y $B$ por filas en el índice interno. El producto es la **suma** de los dos productos de bloques. Caso base: la dimensión interna es 1 (producto de una columna por una fila).

### Ejercicio 6.8
Parte $A$ por filas y $B$ por columnas: el resultado se compone de cuatro bloques $A_iB_j$ colocados en una matriz $2\times2$ de bloques. Cuatro llamadas recursivas y concatenación (no suma).

### Ejercicio 7.1
Cada nodo del árbol **es** un subconjunto: imprímelo al entrar. Los hijos de un nodo se obtienen añadiendo un elemento de índice **mayor** que el último incluido; así cada subconjunto aparece una sola vez. Pasa como parámetro el índice desde el que se puede añadir.

### Ejercicio 7.2
Rellena las casillas vacías en orden. Para cada una, los candidatos son los dígitos 1 a 9 que no repiten fila, columna ni cuadrante 3×3. Al llegar a la última casilla, cuenta una solución. No pares al encontrar la primera: tienes que contarlas todas. Restaura la casilla al volver.

### Ejercicio 7.3
Una torre por fila, y columnas todas distintas: son las permutaciones de $0..n-1$. Usa el esquema de permutaciones (vector de columnas usadas) e imprime al llenar la última fila.

### Ejercicio 7.4
Los dígitos 1 a 9 sin repetir en 9 casillas son una permutación. No esperes a la hoja: en cuanto completes una fila, columna o diagonal, comprueba que suma 15 y poda si no. Así se descartan casi todas las ramas pronto.

### Ejercicio 7.5
Marca cada casilla con el número de salto. Los candidatos son los 8 saltos del caballo desde la posición actual (incrementos de fila y columna), válidos si están dentro del tablero y sin visitar. La solución está completa cuando has hecho $n^2$ saltos. Desmarca al volver.

### Ejercicio 7.6
Fija la ciudad 0 como inicio y permuta las demás. Lleva la longitud acumulada del camino y poda si ya supera la mejor ruta conocida. Al completar, suma la vuelta a la ciudad inicial antes de comparar.

### Ejercicio 7.7
Dos sublistas de $n/2$ elementos: asigna cada elemento a una de las dos. Lleva las dos sumas y los dos contadores. Poda si una sublista ya tiene $n/2$ elementos y se intenta añadir otro. Al llegar al final, calcula la diferencia de sumas y guarda la mejor.

### Ejercicio 7.8
Esquema binario (el elemento entra o no) con la suma y la cardinalidad parciales. Como los números son positivos, poda cuando la suma ya pasa de $s$ o cuando la cardinalidad parcial ya no puede mejorar la mejor. Actualiza el óptimo solo cuando la suma sea exactamente $s$.

### Ejercicio 8.1
Piensa en tres criterios para ordenar las actividades: por inicio, por duración, por fin. Prueba cada uno con un contraejemplo pequeño y quédate con el que siempre da el máximo. Después recorre las actividades en ese orden y acepta cada una que no solape con la última aceptada.

### Ejercicio 8.2
Tres criterios naturales: mayor valor, menor peso y mayor valor/peso. Impleméntalos como "ordena y mete mientras quepan" y compáralos en la simulación contra el óptimo (si puedes calcularlo) o entre sí. Ninguno es óptimo en general en la mochila 0-1.

### Ejercicio 8.3
Trabaja en céntimos enteros para evitar errores de coma flotante. En cada paso, imprime la moneda más grande que no supera lo que queda y resta. Caso base: queda 0.

### Ejercicio 8.4
Mezclar dos listas de tamaños $a$ y $b$ cuesta $a+b$. Piensa en qué listas conviene mezclar antes: las que se vuelven a mezclar muchas veces pesan más. Es la misma idea que en los códigos de Huffman; usa una cola de prioridad.

### Ejercicio 8.5
Parte de un árbol por carácter y fusiona repetidamente los dos de menor frecuencia en un árbol nuevo cuya frecuencia es la suma (cola de prioridad). El código de cada carácter sale recorriendo el árbol final: 0 a la izquierda, 1 a la derecha.

### Ejercicio 8.6
Kruskal: ordena las aristas por peso y añade cada una que no cierre un ciclo. Prim: parte de un vértice y añade siempre la arista más barata que conecte con un vértice nuevo. Con 7 vértices el árbol tiene 6 aristas; ambos deben dar el mismo coste total.

### Ejercicio 8.7
Mantén el conjunto de vértices ya incluidos y una cola de prioridad con las aristas que salen de él. En cada paso, extrae la más barata cuyo destino aún no esté en el árbol y añádela.

### Ejercicio 8.8
Ordena las aristas por peso y recórrelas. Para saber si una arista cierra un ciclo, usa una estructura de conjuntos disjuntos (unión-búsqueda): si sus extremos ya están en el mismo conjunto, descártala; si no, únelos.

### Ejercicio 8.9
Modela la rejilla como un grafo: cada casilla libre es un vértice con aristas de peso 1 a sus vecinas libres. Aplica Dijkstra desde la entrada guardando el predecesor de cada vértice; el camino hasta la salida se reconstruye hacia atrás.

### Ejercicio 9.1
Aísla el último término: $S(n)=S(n-1)+(2n-1)$. Caso base: $S(0)=0$.

### Ejercicio 9.2
Horner: $p(x)=d_0+x\cdot p'(x)$, donde $p'$ es el polinomio con los coeficientes $d_1,\dots,d_n$. Pasa la lista sin su primer elemento. Caso base: un solo coeficiente.

### Ejercicio 9.3
Calcula los primeros valores a mano y reconoce la secuencia. Programa el sumatorio de dos formas: con un bucle que llama a $f(i)$ y con una función recursiva auxiliar que suma $f(1)+\dots+f(n-2)$.

### Ejercicio 9.4
Un disco solo puede ir a una torre adyacente, así que para ir de un extremo al otro hay que pasar por el centro. Para mover $n$ discos del extremo al extremo opuesto: mueve $n-1$ al extremo opuesto, el grande al centro, $n-1$ de vuelta al origen, el grande al destino y $n-1$ de nuevo al destino.

### Ejercicio 9.5
Búsqueda binaria: compara con el elemento central, devuelve su índice si coincide, o baja a la mitad izquierda o derecha. Caso base: tramo vacío, devuelve $-1$.

### Ejercicio 9.6
La fila $i$ tiene $n-i$ espacios y $2i-1$ equis. Escribe una función auxiliar que imprima un carácter $k$ veces, y otra que recorra las filas (de la 1 a la $n$ o de la $n$ a la 1, según cómo quieras recursar).

### Ejercicio 9.7
Calcula el punto medio $z$. Si $f(z)=0$ o el intervalo es menor que $2\varepsilon$, devuelve $z$. Si no, quédate con la mitad donde $f$ cambia de signo (compara $f(a)\cdot f(z)$ con 0).

### Ejercicio 9.8
Función auxiliar: una cadena es palíndromo si tiene menos de dos caracteres o si sus extremos coinciden y lo de en medio lo es. Para la subcadena más larga, prueba longitudes **decrecientes** (desde la de toda la cadena): para cada longitud recorre las posiciones de inicio, y la primera subcadena que sea palíndromo es la más larga.
