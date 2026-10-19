## t22-por-que

Q: En $T(n)=\frac12n^2+2000n+50000$, ¿qué término determina el orden de crecimiento?
+ El cuadrático, porque domina al resto cuando $n\to\infty$ (aunque para $n$ pequeña los demás pesen más).
- El de $50000$, porque es el mayor.
- El lineal, porque tiene el coeficiente mayor que el cuadrático.
- Todos por igual.
? Para $n$ pequeña todos los términos influyen, pero la notación asintótica aísla el de mayor orden.

Q: ¿Qué quiere decir "$f(n)$ es asintóticamente menor que $g(n)$" en la noción informal del tema?
+ $\lim_{n\to\infty}\frac{f(n)}{g(n)}=0$
- $f(n)<g(n)$ para todo $n$.
- $\lim_{n\to\infty}\frac{f(n)}{g(n)}=\infty$
- $f(n)<g(n)$ para $n=1$.
? Lo que importa es el comportamiento para valores grandes.

Q: Una función con varios parámetros, como $T(n,m)$, ¿puede tener varios términos de mayor orden?
+ Sí: si depende de más de un parámetro, puede haber varios términos que ninguno domine al resto.
- No: siempre domina uno.
- Sí, pero sólo si $n=m$.
- No: sólo se estudian funciones de un parámetro.
? Por ejemplo $m^2n+m^3+n^2$: ninguno es superior a los otros según los parámetros crecen.

## t22-ordenes

Q: ¿Cuál es el orden correcto de menor a mayor?
+ $1<\log n<n<n\log n<n^2<n^3<2^n<n!$
- $1<n<\log n<n^2<n\log n<2^n<n!$
- $\log n<1<n<n^2<n\log n<n!<2^n$
- $1<\log n<n<n^2<n\log n<2^n<n^3$
? $n^2$ es el límite entre "tratable" e "intratable"; los exponenciales superan a cualquier polinomio y el factorial al exponencial.

Q: ¿Cuál de estas relaciones es cierta?
+ $n^p<n^p\log n<n^{p+1}$
- $n^p\log n<n^p$
- $2^n<n^p$ para $p$ grande
- $n^{p+1}<n^p\log n$
? Multiplicar por $\log n$ da algo mayor, pero menor que multiplicar por $n$.

Q: En la tabla de valores, para $n=32$, ¿qué función es la más grande?
+ $n!$, con unos $2{,}63\cdot10^{35}$
- $n^3$
- $2^n$
- $n\log_2n$
? Un orden factorial es incluso más costoso que uno exponencial, que ya lo es mucho más que los polinómicos.

## t22-cota-sup

Q: La definición de $f(n)\in O(g(n))$ dice que existen constantes $c>0$ y $n_0>0$ tales que...
+ $0\le f(n)\le c\cdot g(n)$ para todo $n\ge n_0$.
- $f(n)\le g(n)$ para todo $n$.
- $f(n)\ge c\cdot g(n)$ para todo $n\ge n_0$.
- $f(n)=c\cdot g(n)$ para algún $n\ge n_0$.
? A partir de $n_0$, $c\cdot g(n)$ siempre supera o iguala a $f(n)$.

Q: Si $f(n)\in O(g(n))$, ¿qué se puede afirmar?
+ Que $f$ es asintóticamente menor o igual que $g$: $g$ es una cota superior; $\lim f/g$ es una constante finita.
- Que $f$ tarda al menos $g(n)$.
- Que $f(n)=g(n)$ para $n$ grande.
- Que $\lim f/g=\infty$.
? Decir que tarda "al menos" $g$ es un error típico: $O$ da una cota superior.

Q: ¿Cuál de estas cotas superiores de $2n+5$ es la que querremos dar?
+ $O(n)$: la cota superior más baja.
- $O(n!)$, que también es correcta.
- $O(n^2)$, porque es la más segura.
- Todas valen lo mismo.
? $2n+5\in O(n)$, $O(n^2)$ y $O(n!)$ son ciertas, pero la más informativa es la más ajustada.

Q: ¿Cuántas parejas $(c,n_0)$ válidas hay si $f\in O(g)$?
+ Infinitas: basta con que exista una pareja, y si existe una hay muchas.
- Exactamente una.
- Ninguna: dependen de $n$.
- Sólo hay una por cada $c$.
? Si funciona un par, funcionan también valores mayores de $c$ y de $n_0$.

## t22-verificar-o

Q: Para demostrar $5n+2\in O(n)$ con la definición, el tema plantea $5n+2\le c\,n$. Con $c=6$, ¿a partir de qué $n_0$ se cumple?
+ $n_0=2$: $5n+2\le6n\iff2\le n$.
- $n_0=1$.
- $n_0=6$, el valor de $c$.
- Nunca se cumple.
? Despejando $n$ queda $2\le n$, así que sirve $n_0=2$ (o cualquier valor mayor).

Q: ¿Cuál es el procedimiento para **demostrar** $f(n)\in O(g(n))$ con la definición?
+ Elegir una $c>0$ adecuada, plantear $f(n)\le c\,g(n)$ y encontrar un intervalo $[n_0,\infty)$ donde se cumpla.
- Elegir un $n_0$ y comprobar que $f(n_0)\le g(n_0)$.
- Calcular $f(1000)$ y $g(1000)$.
- Derivar $f$ y $g$.
? Esa pareja $(c,n_0)$ es la prueba.

Q: Para $5n+2\in O(n^2)$ el tema plantea $n^2-5n-2\ge0$. ¿Por qué se cumple para $n\ge6$ con $c=1$?
+ Es una parábola convexa con raíces en $-0{,}37$ y $5{,}37$: positiva a partir de la raíz mayor.
- Porque $n^2$ siempre es mayor que $5n$.
- Porque $c=1$ siempre sirve.
- Porque la derivada es positiva.
? Con otras constantes (por ejemplo $c=5$) basta incluso $n_0=2$; lo importante es que exista alguna.

## t22-omega

Q: ¿Por qué $3n^2+2n-2\notin O(n)$ según el tema?
+ Porque, sea cual sea $c$, $3n^2+(2-c)n-2\le0$ no se cumple en ningún intervalo $[n_0,\infty)$: es una parábola convexa que crece hasta $\infty$.
- Porque el coeficiente de $n^2$ es 3.
- Porque $c$ tendría que ser negativa.
- Porque $2n-2$ es mayor que $n$.
? Para negar $f\in O(g)$ hay que probar que ninguna pareja $(c,n_0)$ sirve.

Q: La definición de $f(n)\in\Omega(g(n))$ es...
+ existen $c>0$ y $n_0$ tales que $0\le c\cdot g(n)\le f(n)$ para todo $n\ge n_0$.
- existen $c$ y $n_0$ tales que $f(n)\le c\cdot g(n)$.
- $f(n)=g(n)$ a partir de $n_0$.
- $f(n)\le g(n)$ para todo $n$.
? $\Omega$ es la cota inferior: $f$ queda por encima de $c\cdot g$.

Q: Si $f\in\Omega(g)$, ¿qué dice el límite $\lim\frac{f(n)}{g(n)}$?
+ Que es mayor que 0 (una constante positiva o $\infty$).
- Que es 0.
- Que es exactamente 1.
- Que es una constante finita.
? Para $O$ el límite es una constante finita; para $\Omega$, mayor que 0; para $\Theta$, una constante mayor que 0.

Q: ¿Cuál es la cota inferior $\Omega$ que querremos dar para $2n+5$?
+ $\Omega(n)$: la más alta posible.
- $\Omega(1)$
- $\Omega(\log n)$
- $\Omega(n^2)$
? $2n+5\in\Omega(1)$ y $\Omega(\log n)$ son ciertas, pero la más ajustada es $\Omega(n)$; $\Omega(n^2)$ es falsa.

## t22-theta

Q: $f(n)\in\Theta(g(n))$ equivale a...
+ $f\in O(g)$ y $f\in\Omega(g)$ a la vez.
- $f\in O(g)$ o $f\in\Omega(g)$.
- $f(n)=g(n)$ para todo $n$.
- $\lim\frac fg=\infty$.
? $\Theta$ es la cota ajustada: a partir de $n_0$, $f$ queda entre $c_1g$ y $c_2g$.

Q: ¿Qué significan $o$ y $\omega$?
+ Cotas **estrictas**: $f\in o(g)$ si $g$ es estrictamente mayor; $f\in\omega(g)$ si $g$ es estrictamente menor.
- Lo mismo que $O$ y $\Omega$.
- Cotas para funciones de dos parámetros.
- Cotas para el mejor caso.
? $o$ equivale a $f<g$ asintóticamente, mientras $O$ es $f\le g$.

Q: Simplifica $\Theta(3m^2n+m^3+10mn+2n^2)$.
+ $\Theta(m^2n+m^3+n^2)$
- $\Theta(m^3)$
- $\Theta(m^2n)$
- $\Theta(3m^2n+m^3)$
? Se quitan las constantes y los términos contenidos en otros: $mn\le m^2n$. Entre los tres que quedan ninguno es superior a otro.

Q: Para $T(n,m)\in\Theta(n+m)$ (mezclar dos listas ordenadas de longitudes $n$ y $m$), ¿por qué no se puede quedar sólo con $n$?
+ Porque no sabemos cuál de los dos parámetros domina: si $m$ crece más que $n$, el término $m$ es el que manda.
- Porque $n+m$ no es un polinomio.
- Porque $m$ es siempre mayor que $n$.
- Porque la suma siempre es $\Theta(n\cdot m)$.
? Con dos parámetros hay que comparar con límites en cada variable.

## t22-aspectos

Q: ¿Qué ocurre con la base del logaritmo en notación asintótica?
+ No importa: $\Theta(\log_x n)=\Theta(\log_yn)$, porque cambiar de base sólo multiplica por una constante.
- Importa: $\log_2n$ y $\log_{10}n$ son órdenes distintos.
- Importa sólo si la base es mayor que 2.
- Sólo importa en el peor caso.
? $\log_xg=\frac{\log_yg}{\log_yx}$: el factor $\frac1{\log_yx}$ es una constante.

Q: ¿Qué es incorrecto?
+ Decir que si $f\in O(g)$, entonces $f$ tarda al menos $g(n)$.
- Escribir $f(n)\in O(g(n))$ en vez de $f(n)=O(g(n))$.
- Suponer que las funciones del análisis son positivas.
- Dar la cota superior para el peor caso.
? $O(g)$ garantiza que no se supera $g$; escribir $=$ en vez de $\in$ es un abuso de notación habitual.

Q: ¿A qué hay que asociar siempre una cota?
+ A un tipo de entrada: mejor caso, peor caso o caso medio.
- A una máquina concreta.
- A un lenguaje de programación.
- A un valor concreto de $n$.
? Que un algoritmo tarde $\Theta(n^2)$ para algunas entradas no quiere decir que lo haga para todas.

Q: Procesar los $n$ bits de los $m=2^n$ números de $n$ bits cuesta...
+ $\Theta(n\,2^n)$ en función de $n$, que es lo mismo que $\Theta(m\log m)$ en función de $m$.
- $\Theta(n)$
- $\Theta(2^n)$
- $\Theta(m^2)$
? Las dos expresiones son idénticas: lo que cambia es qué se toma como tamaño de la entrada, y por eso un coste puede parecer intratable o tratable.

## t22-lineal

Q: El **counting-sort** ordena en $\Theta(n)$ si...
+ los elementos son enteros en $[0,k]$ con $k\in O(n)$.
- la lista ya está casi ordenada.
- se pueden comparar los elementos.
- los elementos son reales.
? Su coste es $\Theta(n+k)$ y no es general: sólo sirve para ese tipo de datos.

Q: ¿Cuántos vectores usa el counting-sort y para qué?
+ Tres: entrada $A$, salida $B$ y un vector auxiliar $C[0..k]$ con las apariciones de cada entero.
- Uno: ordena en el propio vector.
- Dos: la entrada y una cola.
- Uno por cada elemento distinto.
? Se cuentan las apariciones, se acumulan sumas en $C$ y se coloca cada elemento en $B$.

Q: ¿Por qué el counting-sort puede ser lineal sin contradecir lo que se verá sobre la ordenación?
+ Porque no ordena por comparaciones: no es un algoritmo general y usa que los valores son enteros pequeños.
- Porque compara de forma más rápida.
- Porque usa recursión.
- Porque trabaja sólo con listas ordenadas.
? Radix-sort y bucket-sort también son lineales con hipótesis sobre los datos.

## t22-comparacion

Q: Un algoritmo de ordenación **por comparación**...
+ sólo usa comparaciones ($<,\le,=,\ge,>$) y puede ordenar cualquier tipo de datos que se pueda comparar.
- necesita conocer la distribución de los valores.
- sólo ordena enteros.
- no puede ordenar cadenas.
? Sus valores y distribución son irrelevantes: sólo interesa el puesto en la ordenación.

Q: Para un vector de $n$ elementos, ¿cuántas permutaciones distintas debe poder generar un algoritmo de ordenación por comparación?
+ $n!$
- $n^2$
- $2^n$
- $n$
? Debe poder llevar cualquier permutación de la entrada a la salida ordenada.

Q: En el árbol de decisión de un algoritmo de ordenación, ¿qué representa cada nodo interno $X{:}Y$?
+ Una comparación entre los elementos $X$º e $Y$º de la secuencia original.
- Una permutación de la lista.
- Un elemento ya ordenado.
- Una llamada recursiva.
? Las hojas son las secuencias finales $\langle X,Y,Z\rangle$.

## t22-cota-orden

Q: ¿Qué dice el teorema sobre la ordenación por comparaciones?
+ Cualquier algoritmo necesita $\Omega(n\log n)$ comparaciones en el peor caso.
- Existe uno que ordena en $O(n)$.
- Necesita exactamente $n^2$ comparaciones.
- Necesita $\Theta(n!)$ comparaciones.
? Por eso no puede existir un algoritmo general de ordenación por comparaciones asintóticamente más rápido que $n\log n$.

Q: ¿De dónde sale la desigualdad $h\ge\log_2(n!)$ en la demostración?
+ El árbol necesita al menos $n!$ hojas y un árbol binario de altura $h$ tiene como mucho $2^h$.
- De que cada comparación ordena un elemento.
- De que hay $n$ niveles.
- De que $n!\le n^2$.
? $n!\le l\le2^h$; tomando $\log_2$ queda $h\ge\log_2 n!$.

Q: Para probar que $\log(n!)\in\Omega(n\log n)$ se acota $\sum_{i=2}^{n}\log i$ por una integral. ¿Por qué se usa $\int_1^n\log x\,dx$ como cota **inferior**?
+ Porque $\log x$ es creciente y la suma de las áreas de los rectángulos supera a la integral.
- Porque $\log x$ es decreciente.
- Porque la integral vale $n$.
- Porque empieza en $x=0$.
? $\int_1^n\log x\,dx=n\log n-n+1$, y se comprueba que es mayor que $\frac12n\log n$ para $n\ge e^2$.
