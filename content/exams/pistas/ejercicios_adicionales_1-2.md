### Ejercicio 1.1
Reparte el exponente entre numerador y denominador. En el denominador, $(b^k)^{\log_b n}=(b^{\log_b n})^k$ y $b^{\log_b n}=n$. En el numerador necesitas la identidad $x^{\log_b y}=y^{\log_b x}$ (pruébala tomando $\log_b$ de ambos lados).

### Ejercicio 1.2
$\log n!\in\Theta(n\log n)$ equivale a que el límite del cociente sea una constante positiva y finita. Sustituye $n!$ por Stirling dentro del logaritmo, divide por $n\ln n$ y mira qué términos tienden a 0.

### Ejercicio 1.3
Calcula $\lim \frac{n\log n}{n^{1+a}}=\lim\frac{\log n}{n^a}$: es una indeterminación $\infty/\infty$. Aplica L'Hôpital (deriva arriba y abajo) y simplifica.

### Ejercicio 1.4
Cuenta cuántos valores toma el índice $i$ entre $m$ y $n$ (ambos incluidos). Comprueba con $m=3$, $n=7$.

### Ejercicio 1.5
El $i$-ésimo impar es $2i-1$. Separa $\sum(2i-1)$ en $2\sum i-\sum 1$ y usa las fórmulas conocidas.

### Ejercicio 1.6
Desarrolla cada lado de la identidad en función de $S_1=\sum i$ y $S_2=\sum i^2$. Iguala y despeja $S_2$.

### Ejercicio 1.7
Escribe $s_i=s_0+id$. Truco de Gauss: suma $S$ consigo misma escrita al revés; cada pareja de columnas suma lo mismo.

### Ejercicio 1.8
Pasa los términos con $T$ a la izquierda. La ecuación característica es la de la parte homogénea multiplicada por $(x-b)^{d+1}$ por cada término de la derecha de la forma $b^n\cdot$(polinomio de grado $d$). Las constantes no hacen falta: escribe la forma general con las raíces y sus multiplicidades.

### Ejercicio 1.9
Agrupa los números según cuántos ceros tienen a la derecha del primer 1. Un número con $k$ ceros finales hace procesar $k+1$ bits. Cuenta cuántos números hay de cada tipo (fija el 1 y los ceros; el resto de bits es libre) y suma con un sumatorio.

### Ejercicio 1.10
Para cada función cuenta cuántas llamadas recursivas hace, con qué tamaño, y qué trabajo extra aparte de ellas (constante). Los casos base cuestan una constante. Ojo con (3): hay dos llamadas de tamaño $\approx n/2$.

### Ejercicio 1.11
Cada llamada resta 2 y hace trabajo constante: $T(n)=T(n-2)+c$. Expande hasta llegar a un caso base ($n=0$ o $n=1$, según la paridad). En el método general, la parte no homogénea es una constante.

### Ejercicio 1.12
Calcula $T(0),\dots,T(3)$ para intuir el patrón. Después escribe $T(n)$ y $T(n-1)$ y réstalas: casi todos los sumandos se cancelan y queda una recurrencia sencilla.

### Ejercicio 1.13
Supón $n=4^k$ y expande. Cada paso duplica el coeficiente de $T$ y el término de log baja en $2$ unidades (porque $\log_2(n/4)=\log_2 n-2$): aparece una suma de potencias de 2 por una progresión aritmética. Para al llegar a $T(1)$.

### Ejercicio 1.14
Pasa a la forma $T(n)-T(n-1)=b\cdot1^n$. La raíz $1$ aparece con multiplicidad 2, así que $T(n)=C_1+C_2n$. Usa $T(1)$ y $T(2)$.

### Ejercicio 1.15
Hay una sola llamada recursiva con $n/2$ y trabajo constante. Plantea $T(n)=T(n/2)+c$ y resuélvela de tres formas: teorema maestro (compara $a$ y $b^k$ con $k=0$), expansión y cambio de variable $n=2^k$.

### Ejercicio 1.16
Teorema maestro con $a=3$, $b=2$, $f(n)=n$. En la expansión aparece una serie geométrica de razón $3/2$. En el método general, el cambio $n=2^k$ da raíces 3 y 2.

### Ejercicio 1.17
Cambio de variable $n=10^k$ y $t(k)=T(10^k)$: queda $t(k)=t(k-1)+1$. La raíz $1$ es doble. Usa $t(0)$ y $t(1)$ para las constantes.

### Ejercicio 1.18
Son diez recurrencias de tipos distintos: la a) es lineal con raíces 2 y 1; las de división se resuelven con expansión (serie geométrica o aritmética) o cambio de variable. Para cada una, identifica primero qué método es más cómodo y comprueba con un par de valores pequeños.

### Ejercicio 2.1
Demuestra que el límite del cociente es 0: $\frac{n\ln n}{n^{1+a}}=\frac{\ln n}{n^a}$. Es del tipo $\infty/\infty$, así que aplica L'Hôpital.

### Ejercicio 2.2
Elimina constantes y términos dominados por otros. Cuidado con dos variables: para comparar $mn^2$ con $m^3$ ningún límite basta, porque dependiendo de qué variable crezca gana uno u otro. Esos dos términos se quedan.

### Ejercicio 2.3
Quita constantes ($\log m^2=2\log m$). Luego compara por límites cada término con $mn$: tanto $m\log n$ como $n\log m$ quedan dominados por él.

### Ejercicio 2.4
$\Theta$ exige dos cotas. Para la inferior, $c_1=1/4$ funciona (queda $3n-1\ge0$). Para la superior, prueba con $c_2=1$ y busca desde qué $n$ se cumple $3n-1\le\frac34n^2$.

### Ejercicio 2.5
Toma $c=1$ y aplica logaritmos naturales: $e\ln n\le n$. Estudia $g(n)=n-e\ln n$: su mínimo está en $n=e$ y vale 0, así que se cumple para todo $n>0$.

### Ejercicio 2.6
El tamaño depende de cómo lo midas: si el lado es $n$, hay $n^2$ elementos. Bubble sort sobre $N$ elementos hace $\Theta(N^2)$ operaciones; sustituye $N$.

### Ejercicio 2.7
Igual que el anterior, pero con dos parámetros: $n$ filas y $m$ columnas, así que $N=nm$ elementos. El resultado se expresa en $n$ y $m$.

### Ejercicio 2.8
Estudia el mejor caso (diferencia en la primera comparación) y el peor (matriz simétrica, recorre todo). En el peor caso, el bucle de fuera va de 1 a $N$ y el interior hace $N-columna$ comparaciones; cuenta una operación por línea.

### Ejercicio 2.9
Es selección directa. Calcula el bucle interno (depende de $i$) con la fórmula de bucles; el `IF` interno tiene mejor y peor caso. Después suma sobre $i$ y compara ambos casos.

### Ejercicio 2.10
$T_n=2T_{n-1}+1$ con $T_0=0$. Expande y reconoce la suma de potencias de 2, o usa el método general (raíces 2 y 1).

### Ejercicio 2.11
$T(n)=1+2T(n/2)$ con $T(1)=1$. Expande: sale una suma geométrica. Con el método general, cambia $n=2^k$ y $t(k)=T(2^k)$.

### Ejercicio 2.12
Elimina la recursión mutua: despeja $C_{n-1}$ de la ecuación (6) y sustitúyelo en (5) para que solo quede $A$. Obtendrás una recurrencia lineal de orden 2 con parte no homogénea constante; resuélvela con el método general.

### Ejercicio 2.13
a) Cuenta las operaciones columna a columna (del bit más significativo al menos): el patrón es 1, 3, 7, 15… y suma esa secuencia. b) Plantea cuánto cuesta añadir un bit más: $T_n$ en función de $T_{n-1}$ más lo que aporta el nuevo bit. c) Con esa recurrencia no homogénea, usa el método general (raíces 2 y 1) con tres casos base. Al final puedes reexpresar el resultado en función del número de palabras procesadas $m=2^n-1$.

### Ejercicio 2.14
a) Con Stirling, el límite del cociente es 1 (positivo). b) Acota $\log n!=\sum\log i$ por abajo con una integral, $\int_1^n\log x\,dx$, y compara con $c\,n\log n$.

### Ejercicio 2.15
Escribe el polinomio característico: la parte homogénea aporta $(x-1)$; cada término de la derecha aporta un factor por su base y su grado. Con las raíces y multiplicidades, el término dominante es el de la base mayor con mayor potencia de $n$.
