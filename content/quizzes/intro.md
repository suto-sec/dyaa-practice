## t1-problemas

Q: En un problema computacional, ¿qué es una **instancia**?
+ Unas entradas concretas para las que hay que calcular la solución, como $\langle 3,14,7,1,8,12\rangle$ en el problema de ordenación.
- El algoritmo que se usa para resolver el problema.
- El conjunto de todas las salidas válidas.
- El caso en el que el algoritmo falla.
? El problema describe la relación entre entradas y salidas; una instancia fija las entradas concretas y su solución es lo que se calcula.

Q: Un algoritmo es **correcto** cuando...
+ para cada instancia de entrada termina con el resultado correcto.
- devuelve el resultado correcto para la mayoría de las instancias.
- es rápido para entradas pequeñas.
- no usa recursión ni bucles anidados.
? La definición exige terminar con el resultado correcto en todas las instancias; que un algoritmo incorrecto pueda ser útil si su error está controlado es otra cuestión.

Q: ¿Cuál de estas afirmaciones sobre algoritmos iterativos y recursivos es cierta?
+ Todo algoritmo iterativo se puede expresar de forma recursiva y viceversa.
- Un algoritmo recursivo siempre es más eficiente que uno iterativo.
- Hay problemas que sólo se pueden resolver con recursión.
- Un algoritmo iterativo no puede calcular lo mismo que uno recursivo.
? Son dos formas equivalentes de expresar el cálculo; elegir una u otra es cuestión de claridad y de eficiencia, no de poder expresivo.

Q: ¿Qué es un algoritmo **aproximado**?
+ Uno que busca una solución cercana a la verdadera; es útil en problemas duros o intratables.
- Uno que a veces devuelve una solución incorrecta sin que importe.
- Uno que usa números reales en vez de enteros.
- Uno que no termina siempre.
? Frente a los exactos, que alcanzan la solución exacta, los aproximados renuncian a ella cuando obtenerla es demasiado costoso.

## t1-euclides

Q: Según la definición de $mcd2(m,n)$ del tema, ¿cuánto vale $mcd2(6,15)$?
+ 3
- 6
- 1
- 15
? $mcd2(6,15)=mcd2(15\,\%\,6,\,6)=mcd2(3,6)=mcd2(6\,\%\,3,\,3)=mcd2(0,3)=3$.

Q: En la demostración de que $mcd2(m,n)=mcd2(n\%m,m)$ se escribe $m=az$ y $n=bz$. ¿Qué representa $z$ y qué se supone de $a$ y $b$?
+ $z$ es el factor común máximo y $a$ y $b$ no comparten factores primos.
- $z$ es el resto de dividir $n$ entre $m$ y $a$ y $b$ son primos.
- $z$ es el menor de los dos números y $a=b$.
- $z=1$ y $a$ y $b$ son cualesquiera.
? Se factoriza lo que tienen en común ($z$); lo que queda en cada número ($a$ y $b$) no comparte factores primos, y de ahí se deduce que el resto $d$ tampoco comparte factores con $a$.

Q: En la versión por restas, $mcd1(m,n)$ con $m>n$ hace...
+ $mcd1(n,m)$: intercambia los parámetros.
- $mcd1(m,n-m)$ aunque $n-m$ sea negativo.
- $n$.
- $mcd1(m-1,n-1)$.
? La definición tiene tres casos: $m=0$ devuelve $n$; $m>n$ intercambia los parámetros; si $m\le n$ y $m\neq0$ llama con $(m,n-m)$.

## t1-clases-1

Q: ¿Cuál de estos costes se considera **polinómico** en el tema?
+ $n\log n$
- $2^n$
- $n!$
- $n^n$
? Constante, $\log n$, $n$, $n\log n$, $n^2$... son polinómicos (o menores); $2^n$, $n!$ y $n^n$ crecen más que cualquier polinomio.

Q: ¿Qué significa la **N** de NP?
+ No determinista: NP es "tiempo polinómico no determinista", no "tiempo no polinómico".
- No resoluble: son los problemas que ningún algoritmo resuelve.
- Numérico: son los problemas con números enteros.
- Normal: son los problemas de dificultad media.
? Confundirlo con "no polinómico" es el error más común. Los problemas de NP son decisión que un algoritmo no determinista "con suerte" resuelve en tiempo polinómico.

Q: ¿Cuál es la relación de inclusión de las clases del tema?
+ $P\subseteq NP\subseteq EXP\subseteq R$
- $NP\subseteq P\subseteq EXP\subseteq R$
- $P\subseteq EXP\subseteq NP\subseteq R$
- $R\subseteq EXP\subseteq NP\subseteq P$
? Cada clase está contenida en la siguiente: polinómico, polinómico no determinista, exponencial y finito.

## t1-clases-2

Q: Una definición equivalente de **NP** es...
+ los problemas de decisión en los que se puede verificar en tiempo polinómico que una solución lleva a un SÍ.
- los problemas que requieren tiempo exponencial para ser resueltos.
- los problemas que no se pueden resolver con un ordenador.
- los problemas cuyo algoritmo hace muchas comparaciones.
? Verificar una solución es fácil en NP aunque encontrarla pueda ser difícil: en el laberinto, comprobar que una secuencia de pasos es un camino es polinómico.

Q: ¿Qué se dice del problema de encontrar un camino por un laberinto de $n\times n$?
+ Está en NP, pero también en P (por ejemplo con Dijkstra); recuerda que $P\subseteq NP$.
- Está en NP y no en P.
- Es NP-completo.
- Es indecidible.
? Un problema en P también está en NP porque un algoritmo determinista polinómico es un caso particular de uno no determinista.

Q: ¿Qué problema fue el primero demostrado NP-completo?
+ La satisfacibilidad booleana (SAT), por Cook en 1971.
- La mochila 0/1.
- El problema del viajante.
- La suma de subconjuntos.
? Después Karp (1972) presentó 21 problemas NP-completos más.

Q: Si demuestras que tu problema es NP-completo, ¿qué te conviene hacer?
+ Recurrir a soluciones aproximadas en vez de perder tiempo buscando un algoritmo eficiente exacto.
- Escribir un algoritmo polinómico exacto, que existe seguro.
- Cambiar de lenguaje de programación.
- Resolverlo por fuerza bruta siempre.
? Un algoritmo polinómico exacto para un NP-completo resolvería $P=NP$; nadie lo ha encontrado.

## t1-reducciones

Q: Para demostrar que un problema $A$ es NP-completo hay que probar que está en NP y que es NP-duro. Lo más habitual para lo segundo es...
+ reducir a $A$ un problema NP-completo conocido $Q$: $A$ es al menos tan difícil como $Q$.
- reducir $A$ a un problema de P.
- encontrar un algoritmo exponencial para $A$.
- comprobar $A$ con muchas instancias.
? Una reducción transforma cada instancia de $Q$ en una de $A$ con la misma respuesta; así un algoritmo para $A$ resolvería $Q$.

Q: Tienes un algoritmo para el camino más corto con pesos y necesitas el camino **más largo**. Siguiendo el tema, ¿qué transformación aplicas?
+ Multiplicar los pesos por $-1$.
- Aplicar logaritmos a los pesos.
- Dar el mismo peso a todas las aristas.
- Sumar $1$ a los pesos.
? Es un ejemplo de reducción como técnica de diseño ("transforma y vencerás"); aplicar logaritmos sirve para el caso de caminos con producto de pesos.

Q: Si se encontrara un algoritmo polinómico para un problema NP-completo...
+ se tendría $P=NP$.
- se tendría $P\neq NP$.
- dejaría de haber problemas indecidibles.
- sólo ese problema estaría en P.
? Todo problema de NP se reduce a un NP-completo, así que un algoritmo polinómico para uno resuelve todos.

Q: ¿Qué se prueba con el problema de la parada?
+ Que no existe un algoritmo que decida, para cualquier programa y entrada, si termina: es indecidible.
- Que todos los programas terminan en tiempo exponencial.
- Que $P=NP$.
- Que los programas recursivos no terminan.
? Se supone `Termina(p, x)` y se define `d(w)`; entonces `d(d)` termina si y sólo si `d(d)` no termina: contradicción.

## t1-optimizacion

Q: Tienes un problema de **maximizar** $f_0(x)$. ¿Cómo lo conviertes en uno de minimización?
+ Cambiando el signo de la función objetivo: minimizar $-f_0(x)$.
- Invirtiendo las restricciones.
- Imposible: son problemas distintos.
- Sustituyendo $f_0$ por $1/f_0$ siempre.
? Maximizar $f_0$ y minimizar $-f_0$ tienen las mismas soluciones óptimas.

Q: En la mochila 0/1, las variables $x_i\in\{0,1\}$ indican...
+ si se introduce o no el objeto $i$ en la mochila; el problema es NP-completo.
- la fracción del objeto $i$ que se introduce.
- el peso del objeto $i$.
- el valor del objeto $i$.
? Los pesos $p_i$, los valores $v_i$ y la capacidad $C$ son datos de la instancia; $x$ es lo que se decide.

Q: En un problema **lineal**, ¿dónde está el óptimo y cómo avanza Simplex?
+ En un vértice de la región factible (un poliedro convexo); Simplex parte de un vértice y avanza por aristas hasta otro mejor.
- En el centro de la región factible; Simplex lo calcula por promedios.
- En cualquier punto interior; Simplex elige uno al azar.
- Fuera de la región factible.
? La función objetivo y las restricciones son hiperplanos y la región factible es un poliedro convexo.

## t1-convexos

Q: ¿Cuál de estas afirmaciones es correcta?
+ Los problemas lineales son convexos, y los convexos se pueden resolver en tiempo polinómico.
- Los problemas convexos son siempre NP-completos.
- Los problemas no convexos siempre tienen un único óptimo.
- Los problemas lineales no son convexos.
? La convexidad es la propiedad que permite una solución eficiente; los lineales son un caso particular.

Q: ¿Cuándo es convexo un conjunto?
+ Cuando cualquier segmento entre dos de sus puntos queda completamente dentro del conjunto.
- Cuando no tiene agujeros en ninguna dimensión.
- Cuando es finito.
- Cuando todos sus puntos están sobre una recta.
? Un conjunto en forma de media luna no es convexo: hay segmentos entre dos de sus puntos que salen de él.

Q: En el descenso de gradiente, ¿cuándo se detiene el algoritmo?
+ Cuando el módulo del gradiente es menor que un $\varepsilon$ pequeño.
- Cuando la función vale 0.
- Después de exactamente $n$ iteraciones.
- Cuando el gradiente apunta hacia arriba.
? En cada paso se actualiza $x\leftarrow x-\alpha g$; puede no converger o ser muy lento.

Q: En un problema **no convexo**...
+ puede haber varios óptimos locales, y las heurísticas no garantizan llegar al óptimo global.
- el descenso de gradiente garantiza el óptimo global.
- siempre se resuelve en tiempo polinómico.
- no tiene sentido buscar un óptimo.
? Se usan heurísticas como la búsqueda aleatoria o los algoritmos genéticos; el teorema "no hay comida gratis" dice que ninguna es la mejor en general.

## t1-ia

Q: ¿En qué se diferencian la regresión y la clasificación?
+ La regresión predice un valor real; la clasificación predice una clase (categoría).
- La regresión usa datos de test y la clasificación no.
- La regresión agrupa los datos y la clasificación los ordena.
- No se diferencian.
? En ambas se crea un modelo matemático ajustado a los datos de entrenamiento.

Q: ¿Por qué estas tareas no son un "problema computacional" en el sentido del tema?
+ Porque no se conoce completamente la relación entre entradas y salidas ni hay una solución "correcta", así que no se puede especificar un algoritmo.
- Porque no pueden ejecutarse en un ordenador.
- Porque no usan datos.
- Porque son siempre NP-completas.
? Los modelos se crean con datos de entrenamiento y su rendimiento depende de datos nuevos (test).

Q: En el **clustering**...
+ sólo se conoce la posición de los puntos, no hay información de clases, y se busca una agrupación razonable.
- cada dato viene con su clase correcta.
- hay una única agrupación correcta que se puede calcular.
- se predice un valor real.
? La tarea no está claramente definida: existen medidas de bondad para evaluar la calidad de una agrupación, pero no una agrupación "correcta".

Q: En la jerarquía tarea, problema y algoritmo, ¿qué son K-NN y SVM para la tarea de clasificación?
+ Problemas computacionales concretos que se plantean para abordarla; cada uno se resuelve con varios algoritmos.
- Algoritmos de ordenación.
- Tareas generales de la ciencia.
- Reducciones de problemas NP-completos.
? Las tareas generales no son problemas computacionales; se plantean problemas concretos y estos se resuelven mediante algoritmos.
