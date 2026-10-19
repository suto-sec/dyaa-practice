## t4-intro

Q: ¿Qué dos ideas clave describe el tema para diseñar con recursividad?
+ Descomposición (resolver un problema con soluciones de subproblemas idénticos pero más sencillos) e inducción (suponer ya conocida la solución de los subproblemas).
- Iteración y acumuladores.
- Memoria dinámica y punteros.
- Dividir en tres partes iguales y mezclar.
? No hay que calcular las "subsoluciones" desde cero: se obtienen con llamadas recursivas.

Q: ¿Cuándo es especialmente útil la recursividad?
+ Cuando la estructura del problema o de los datos no es lineal (grafos, árboles), cuando hay dos o más llamadas a sí mismo o cuando la versión recursiva es más fácil de entender.
- Siempre, porque es más rápida que un bucle.
- Sólo con números enteros.
- Sólo cuando no se conoce el caso base.
? Frente a listas y arrays, donde basta un bucle.

Q: El factorial se define como $n!=\begin{cases}1&n=0\\n\times(n-1)!&n>0\end{cases}$. ¿Cuál es el subproblema?
+ $(n-1)!$
- $n!$
- $0!$
- $2n!$
? El problema $n!$ se resuelve conociendo la solución de un subproblema de menor tamaño y multiplicando por $n$.

## t4-paradigma

Q: ¿Qué es el "salto de fe recursivo"?
+ Usar la función que estás programando asumiendo que funciona, aunque no la hayas terminado.
- Saltar el caso base cuando es difícil.
- Convertir la recursión en un bucle.
- Probar la función con muchos casos.
? Suponemos que sabemos *qué* resuelve el subproblema, sin pensar en *cómo*.

Q: `fact2(n, p)`, que acumula el producto en un parámetro y hace `fact2(n-1, p*n)`, ¿es un buen diseño recursivo según el tema?
+ No: es equivalente al factorial iterativo; surge de pensar en cómo cambian las variables, no de pensar en subproblemas.
- Sí: es la forma recomendada.
- Sí, porque es recursión por cola.
- No, porque no termina nunca.
? El tema pide pensar de forma declarativa, en subproblemas, en vez de imperativa.

Q: ¿Cuál de estos tipos de recursividad se describe como "la llamada recursiva es lo último que se hace y el resultado se acumula en parámetros"?
+ Lineal final (por cola)
- Mutua
- Anidada
- Múltiple
? La recursión mutua son dos funciones que se llaman entre sí; la anidada llama a la función dentro de sus propios argumentos; la múltiple hace varias llamadas.

Q: ¿Cuál de estas definiciones es de recursividad **anidada**?
+ $f(n,y)=f(n-1,\,y+f(n-2,0))$
- $f(n)=n\cdot f(n-1)$
- $f(n)=f(n-1)+f(n-2)$
- $B(i)=A(i-1)$ y $A(i)=A(i-1)+B(i-1)$
? Una llamada recursiva aparece dentro de los argumentos de otra. Las otras son lineal, múltiple y mutua.

Q: ¿Conviene diseñar un algoritmo recursivo pensando en el árbol de recursión?
+ Generalmente no: lo importante es definir la regla recursiva que relaciona padre e hijos y aplicarla en todo el árbol.
- Sí, siempre hay que dibujarlo entero.
- Sí, para decidir el caso base.
- Sólo si el algoritmo es iterativo.
? No hay que perder tiempo pensando cómo se resolverán los subproblemas.

## t4-metodologia

Q: ¿Cuáles son los pasos de la metodología recursiva, en orden?
+ Tamaño del problema, casos base, descomposición, inducción (casos recursivos) e implementar y probar.
- Implementar, probar, definir casos base, reducir el tamaño.
- Casos base, tamaño, inducción, descomposición.
- Dividir, vencer y combinar.
? Primero se identifica lo que determina el número de operaciones; los casos base son las instancias más sencillas.

Q: Para $S(n)=\sum_{i=1}^{n}i$, con la descomposición $S(n-1)$, ¿cuál es el caso recursivo?
+ $S(n)=n+S(n-1)$ si $n>0$, con $S(0)=0$.
- $S(n)=S(n-1)\cdot n$.
- $S(n)=S(n/2)+n$.
- $S(n)=n$.
? Si conocemos la suma de los $n-1$ primeros, sólo hay que añadir $n$.

Q: En "dividir el tamaño por dos" con $n$ par e impar, ¿qué hay que cuidar?
+ Distinguir los dos casos y usar división entera: $n//2$, $n//2-1$ o $n//2+1$ según corresponda.
- Usar siempre $n/2$ con decimales.
- Sólo considerar $n$ par.
- Eliminar el caso base.
? Por ejemplo $S(n)=3S(n/2)+S(n/2-1)$ si $n$ es par y $3S(\frac{n-1}2)+S(\frac{n+1}2)$ si es impar.

Q: ¿Para qué sirven los diagramas en el paso de descomposición?
+ Para identificar el problema original y los subproblemas que se van a considerar, como la pirámide de altura $n$ y la de altura $n-1$.
- Para calcular el coste.
- Para sustituir el código.
- Para ordenar los casos base.
? Es una forma de ver cómo se recupera la solución del problema a partir de la del subproblema.

## t4-listas

Q: ¿Cuáles son las dos formas de implementar funciones sobre listas que presenta el tema?
+ Pasar la lista completa y usar su longitud, o pasar la lista y los límites `inf` y `sup` de la sublista con la que se trabaja.
- Pasar la lista como cadena o como número.
- Pasar un puntero al primer elemento y otro al último, solamente.
- Pasar siempre una copia.
? La segunda suele ser más eficiente, aunque más compleja.

Q: ¿Cuál es el caso base de `suma_lista_limites(a, inf, sup)`?
+ `inf > sup` (sublista vacía): devuelve 0.
- `inf == 0`.
- `sup == len(a)`.
- `inf == sup` devuelve 0.
? Si también se divide en dos mitades, hace falta el caso `inf == sup`, que devuelve `a[inf]`.

Q: ¿Qué descomposiciones se pueden usar para sumar los elementos de una lista?
+ Quitar el primer elemento, quitar el último o partir la lista por la mitad y sumar los resultados.
- Sólo quitar el primero.
- Sólo partir por la mitad.
- Ordenar antes la lista.
? Las tres son válidas: $s(a)=a_0+s(a_{1..n-1})$, $s(a)=s(a_{0..n-2})+a_{n-1}$ y $s(a)=s(a_{0..m})+s(a_{m+1..n-1})$.

## t4-digitos

Q: En la suma de los dígitos de un número, ¿cuál es el caso recursivo?
+ $s(n)=s(n//10)+(n\%10)$, con $s(n)=n$ si $n<10$.
- $s(n)=s(n\%10)+n//10$.
- $s(n)=n+s(n-1)$.
- $s(n)=s(n//2)+n\%2$.
? `n // 10` es el número sin su último dígito y `n % 10` es ese dígito: $s(3652)=s(365)+2$.

Q: En la **suma lenta** sólo se puede sumar o restar una unidad. Con la descomposición $s(a-1,b+1)$, ¿cuál es el caso recursivo?
+ $s(a,b)=s(a-1,b+1)$: no hace falta hacer nada más, porque $a-1+b+1=a+b$.
- $s(a,b)=s(a-1,b)+2$.
- $s(a,b)=s(a-1,b-1)+1$.
- $s(a,b)=s(a,b-1)+a$.
? El caso base es $a=0$, con $s(0,b)=b$.

Q: Si el tamaño del problema de la suma lenta es $\min(a,b)$, ¿cuáles son los casos base?
+ $a=0$ (devuelve $b$) y $b=0$ (devuelve $a$).
- Sólo $a=0$.
- $a=b$.
- $a=1$ y $b=1$.
? Con $s(a-1,b-1)$ se reduce el tamaño, y en el caso recursivo se suma 1 dos veces.

Q: Al diseñar con un tamaño distinto, ¿hay una sola elección correcta del tamaño del problema?
+ No: hay varias opciones válidas (como $a$, $b$ o $\min(a,b)$); cambian los casos base y la descomposición.
- Sí, siempre el mayor de los parámetros.
- Sí, el número de llamadas.
- No: el tamaño no se define.
? Lo importante es que la descomposición lo reduzca.

## t4-maximo-potencia

Q: Para el máximo de una lista, ¿cuál es el caso base y por qué?
+ $n=1$: el máximo es $a_0$. No tiene sentido hablar del máximo de una lista vacía.
- $n=0$: el máximo es 0.
- $n=2$.
- No hace falta caso base.
? La lista tiene longitud $n\ge1$.

Q: Con la descomposición "partir por la mitad" el máximo es...
+ $\max\{m(a_{0..h-1}),\,m(a_{h..n-1})\}$, con $h=n//2$.
- $m(a_{0..h-1})+m(a_{h..n-1})$.
- $m(a_{0..n-1})$.
- $\min\{m(a_{0..h-1}),m(a_{h..n-1})\}$.
? El mayor de los máximos de las dos sublistas.

Q: ¿Qué coste tiene calcular $b^n$ con $b^n=b\cdot b^{n-1}$ y cuál con $b^n=(b^{n//2})^2$ (con un factor $b$ si $n$ es impar)?
+ $\Theta(n)$ y $\Theta(\log n)$.
- $\Theta(\log n)$ y $\Theta(n)$.
- $\Theta(n)$ en ambos.
- $\Theta(n^2)$ y $\Theta(n)$.
? La segunda reduce el exponente a la mitad en cada llamada.

Q: En la segunda versión de la potencia, ¿por qué se guarda `p = pot2(b, n//2)` antes de devolver `p*p`?
+ Para hacer una sola llamada recursiva; si se llamase dos veces, el coste dejaría de ser logarítmico.
- Porque Python no permite llamar a la función dos veces.
- Para evitar el caso base.
- Para ahorrar una variable.
? Con dos llamadas de tamaño $n/2$ el coste sería $\Theta(n)$.

## t4-secuencias

Q: En las funciones que escriben una cadena en vertical (hola → h, o, l, a), ¿qué cambia entre el orden normal y el inverso con la descomposición "quitar el primero"?
+ Se imprime `s[0]` antes de la llamada recursiva para el orden normal, y después para el inverso.
- Se cambia el caso base.
- Se usa otra descomposición forzosamente.
- No cambia nada.
? `f1`: `print(s[0]); f1(s[1:])`; `g1`: `g1(s[1:]); print(s[0])`.

Q: En `f3` (dividir la cadena por la mitad), ¿en qué orden hay que hacer las llamadas para escribir en orden normal?
+ Primero `f3(s[:m])` y luego `f3(s[m:])`.
- Primero la mitad derecha.
- Da igual.
- Imprimir en cada llamada.
? Para el orden inverso `g3` llama primero a `g3(s[m:])`.

Q: En el sumatorio general $f(m,n,g)=\sum_{i=m}^{n}g(i)$, ¿cuál es el tamaño del problema y el caso base?
+ El tamaño es $n-m+1$ (el número de términos) y el caso base es $m>n$: vale 0.
- El tamaño es $n$ y el caso base $m=0$.
- El tamaño es $m$ y el caso base $n=0$.
- No tiene caso base.
? Si se divide en dos hace falta además $m=n$, que devuelve $g(m)$.

Q: ¿Cómo se implementa `contiene_digito_cola(n, d)` frente a la versión lineal?
+ En la de cola la llamada recursiva es lo último; en la lineal hay una operación pendiente tras la llamada (`(n%10==d) or contiene_digito_lineal(n//10, d)`).
- La de cola no necesita caso base.
- La lineal no usa `n//10`.
- Son la misma función.
? Ambas descomponen con `n // 10`; $f(3082,2)=$ `True`.

## t4-cambio-lineal

Q: Para el cambio de base $c(n,b)$ el tema usa la regla $c(n,b)=10\cdot c(n//b,b)+n\%b$. ¿Qué ejemplo lo ilustra?
+ $c(142,5)=10\cdot c(28,5)+2=10\cdot103+2=1032$.
- $c(142,5)=c(28,5)+2$.
- $c(142,5)=5\cdot c(28,5)+2$.
- $c(142,5)=c(142,10)\cdot5$.
? $142=28\cdot5+2$ y $28$ en base 5 es 103: añadir el dígito $2$ a la derecha equivale a multiplicar por 10 y sumar 2.

Q: ¿Cuál es el caso base del cambio de base?
+ $n<b$: la salida tiene un solo dígito, $c(n,b)=n$.
- $n=0$ devuelve $b$.
- $n=b$.
- $b=1$.
? El tamaño del problema es el número de dígitos de la salida.

Q: En el algoritmo de Horner, ¿cuál es la regla recursiva para evaluar el polinomio?
+ $P(x,d)=d_0+x\cdot P(x,d_{1..n})$
- $P(x,d)=d_n+P(x,d_{0..n-1})$
- $P(x,d)=x^n\cdot P(x,d_{1..n})$
- $P(x,d)=P(x,d_{0..n-1})\cdot x$
? Se elimina el primer coeficiente; el caso base es el polinomio constante $d_0$.

Q: En la búsqueda lineal recursiva, ¿cuál es el caso recursivo tras comprobar que $x\neq a_{n-1}$?
+ Buscar $x$ en $a_{0..n-2}$: $f(a,x)=f(a_{0..n-2},x)$.
- Devolver $-1$.
- Buscar $x$ en la mitad derecha.
- Devolver $n$.
? El caso base es la lista vacía, que devuelve $-1$.

## t4-binaria

Q: En la búsqueda binaria recursiva, si $x<a_m$ (con $m$ la mitad), ¿dónde se continúa?
+ En $a_{0..m-1}$, porque $x$ sólo puede estar ahí; el coste es $\Theta(\log n)$.
- En $a_{m+1..n-1}$.
- En toda la lista.
- Se devuelve $-1$.
? Se descarta la mitad superior de la lista, y el caso base es la lista vacía.

Q: ¿Por qué conviene pasar los índices `inf` y `sup` en la búsqueda binaria en vez de sublistas?
+ Para devolver el índice en la lista original: se pasa toda la lista y la función trabaja con los índices entre `inf` y `sup`.
- Porque Python no permite sublistas.
- Para evitar el caso base.
- Para que la búsqueda sea lineal.
? Con sublistas habría que sumar desplazamientos a cada resultado.

Q: En el problema de las **escaleras** (subir de uno o dos peldaños), ¿cuál es el caso recursivo?
+ $f(n)=f(n-1)+f(n-2)$, con $f(1)=1$ y $f(2)=2$.
- $f(n)=f(n-1)\cdot f(n-2)$.
- $f(n)=2f(n-1)$.
- $f(n)=f(n/2)+1$.
? Se agrupan las formas según el primer paso: las que empiezan con un peldaño son $f(n-1)$ y las que empiezan con dos son $f(n-2)$.

Q: En problemas combinatorios (de conteo), ¿qué recomienda el tema?
+ Agrupar los elementos a contar en categorías diferentes y sumar los de cada una.
- Contarlos uno a uno con un bucle.
- Ordenarlos antes.
- Usar siempre la fórmula con factoriales.
? Es la idea que da la regla recursiva de las escaleras.

## t4-manhattan

Q: ¿Cuántos caminos hay de $(0,0)$ a $(x,y)$ avanzando una unidad hacia arriba o hacia la derecha en cada paso?
+ $f(x,y)=f(x-1,y)+f(x,y-1)$, con $f=1$ si $x=0$ o $y=0$; vale $\binom{x+y}{x}$.
- $x\cdot y$
- $x+y$
- $2^{x+y}$
? Sólo se puede llegar a $(x,y)$ desde $(x-1,y)$ o desde $(x,y-1)$.

Q: ¿Cuál es el caso base general en los caminos por Manhattan?
+ Si $x=0$ o $y=0$ hay un único camino (totalmente vertical u horizontal).
- Sólo $x=0$ e $y=0$.
- $x=y$.
- Si $x=0$ o $y=0$ no hay caminos.
? El caso $x=y=0$ se considera un camino válido.

Q: Método de bisección, para $f$ continua con $f(a)$ y $f(b)$ de signo distinto, ¿cuándo se puede parar?
+ Si $f(\hat z)=0$ o si $b-a<2\varepsilon$ (entonces $|\hat z-r|\le\varepsilon$).
- Cuando $a=b$.
- Cuando $f(a)=f(b)$.
- Siempre después de 10 pasos.
? Con $\hat z=(a+b)/2$, el nuevo intervalo conserva el cambio de signo y su ancho se divide por 2.

Q: En la bisección, ¿cómo se decide el siguiente intervalo?
+ Se queda $[a,\hat z]$ si el signo de $f(a)$ difiere del de $f(\hat z)$; si no, $[\hat z,b]$.
- Siempre el de la izquierda.
- El de mayor longitud.
- El que contiene $f(x)=0$ por tanteo.
? El tamaño del problema es $b-a$ y se divide por 2 en cada paso.

## t4-hanoi

Q: ¿Cuál es la descomposición de las Torres de Hanoi con $n$ discos?
+ Mover $n-1$ discos de origen a auxiliar, mover el disco $n$ de origen a destino y mover los $n-1$ de auxiliar a destino.
- Mover el disco 1 hasta el destino $n$ veces.
- Mover $n/2$ discos y luego los otros $n/2$.
- Mover los discos de mayor a menor siempre.
? Hay dos llamadas recursivas con $n-1$ discos y una operación básica.

Q: ¿Cuántos movimientos hacen falta para $n=4$?
+ 15
- 8
- 16
- 4
? Con $T(n)=2T(n-1)+1$ y $T(1)=1$: $2^n-1=15$.

Q: ¿Cuál es el caso base de Hanoi?
+ $n=1$: mover el disco 1 de origen a destino (o $n=0$: no se mueve nada).
- $n=2$.
- Hanoi no tiene caso base.
- Cuando las tres torres están vacías.
? El código alternativo `if n > 0:` usa $n=0$ como único caso base.

Q: ¿Conviene analizar todos los movimientos a mano para diseñar Hanoi?
+ No: hay que centrarse en subproblemas y sus soluciones, suponiendo que sabemos mover una pirámide de $n-1$ discos de cualquier torre a otra.
- Sí: así se descubre la regla.
- Sí, pero sólo con $n=2$.
- No, hay que memorizar la secuencia.
? Es el salto de fe recursivo aplicado a las pirámides.

## t4-hanoi-ciclico

Q: En las Torres de Hanoi cíclicas, ¿por qué hay dos funciones, `reloj` y `antireloj`?
+ Porque son dos problemas distintos (mover en el sentido de las agujas del reloj y en el contrario) y se llaman entre sí: recursividad mutua.
- Porque se usan dos pilas.
- Para repartir los discos pares e impares.
- Porque Python lo exige.
? Cada uno se descompone usando problemas de tamaño $n-1$ de ambos sentidos.

Q: ¿Cómo se mueve un disco en sentido "reloj" para $n=1$ y en sentido "antireloj"?
+ En reloj, directamente de origen a destino; en antireloj, pasando por la torre auxiliar (origen→auxiliar→destino).
- Los dos directamente.
- En antireloj no se puede.
- Los dos pasando por la auxiliar.
? Los discos sólo pueden pasar de una torre a otra en el sentido de las agujas del reloj.

Q: En el caso recursivo de `reloj`, ¿qué se hace?
+ Se mueven $n-1$ discos de O a A en sentido antireloj, el disco $n$ de O a D y los $n-1$ de A a D en antireloj.
- Se mueven $n-1$ discos en reloj dos veces.
- Se mueven los discos a la torre D uno a uno.
- Se usa la solución de Hanoi normal.
? `antireloj` necesita cinco pasos: dos veces el disco $n$ y tres movimientos de pirámides.
