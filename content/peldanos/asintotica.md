# Peldaños: Notación asintótica
stage: asintotica

## Orden
- t22-por-que: A01 A02
- t22-ordenes: A03 A04 A26 1.1
- t22-cota-sup: A05 A06
- t22-verificar-o: A07 A08 A09 A10 2.1 2.5 1.3
- t22-omega: A11 A12
- t22-theta: A13 2.4 A22 A14 2.2 2.3
- t22-aspectos: A15 A23 A24
- t22-lineal: A17
- t22-cota-orden: A19 A25 A20 A21 1.2 2.14

### A01 · Qué término manda
nivel: 0.2

Sea $T(n)=\tfrac12n^{2}+2000n+50000$.
- a) Calcula $T(n)/n^{2}$ para $n=10$, $n=100$, $n=10^{4}$ y $n=10^{6}$.
- b) ¿A qué número parece acercarse ese cociente? ¿Qué término de $T$ explica ese número?
- c) ¿A partir de qué $n$ el término $\tfrac12n^{2}$ supera a $2000n+50000$?

#### Pista
En a) divide cada término entre $n^{2}$: $\frac12+\frac{2000}{n}+\frac{50000}{n^{2}}$. En c) pasa todo a un lado y resuelve la ecuación de segundo grado.

#### Solución
**Paso 1. Calcula los cocientes.** $T(n)/n^{2}=\tfrac12+\tfrac{2000}{n}+\tfrac{50000}{n^{2}}$ vale $700{,}5$ para $n=10$, $25{,}5$ para $n=100$, $0{,}7005$ para $n=10^{4}$ y $0{,}502$ para $n=10^{6}$.

**Paso 2. Interpreta.** Se acerca a $\tfrac12$: los términos con $\frac{2000}{n}$ y $\frac{50000}{n^{2}}$ se hacen despreciables. Manda el término cuadrático: $T(n)$ crece como $\tfrac12n^{2}$.

**Paso 3. El cruce.** $\tfrac12n^{2}>2000n+50000\iff n^{2}-4000n-100000>0$. La raíz positiva es $\frac{4000+\sqrt{16\,400\,000}}{2}\approx4024{,}8$, así que desde $n=4025$ manda el cuadrático. Para $n$ pequeños mandan los otros términos, pero la notación asintótica solo mira $n$ grandes.

### A02 · Comparar con límites
nivel: 0.3

La regla: $f<g$ (asintóticamente) cuando $\displaystyle\lim_{n\to\infty}\frac{f(n)}{g(n)}=0$; si el límite es una constante positiva, tienen el mismo orden. Compara cada pareja con $<$, $>$ o "mismo orden":
- a) $n$ y $n^{2}$
- b) $n\log_2 n$ y $n$
- c) $3n^{2}+n$ y $n^{2}$
- d) $2^{n}$ y $n^{100}$
- e) $\log_2 n$ y $\log_{10}n$

#### Pista
Calcula el límite del primero entre el segundo. Si te sale $\infty/\infty$, usa L'Hôpital o simplifica. En e) recuerda el cambio de base.

#### Solución
**Paso 1. a).** $\frac{n}{n^{2}}=\frac1n\to0$: $n<n^{2}$.

**Paso 2. b).** $\frac{n\log_2n}{n}=\log_2n\to\infty$: $n\log_2n>n$.

**Paso 3. c).** $\frac{3n^{2}+n}{n^{2}}=3+\frac1n\to3$: mismo orden.

**Paso 4. d).** Es más cómodo el cociente al revés: $\frac{n^{100}}{2^{n}}\to0$ (L'Hôpital 100 veces, o recordando que un exponencial gana a cualquier polinomio). Por tanto $2^{n}>n^{100}$.

**Paso 5. e).** $\log_2n=\frac{\log_{10}n}{\log_{10}2}$, así que el cociente vale la constante $\frac{1}{\log_{10}2}\approx3{,}32$: mismo orden. La base de los logaritmos no importa.

### A03 · Ordenar funciones
nivel: 0.3

Ordena de menor a mayor orden de crecimiento:
$$n\log_2n,\quad n^{2},\quad 2^{n},\quad \log_2n,\quad n,\quad n!,\quad n^{3},\quad \sqrt n$$

#### Pista
Si dudas entre dos, sustituye un $n$ grande, por ejemplo $n=32$ ($\log_2 32=5$, $\sqrt{32}\approx5{,}7$), o calcula su cociente con un límite.

#### Solución
**Paso 1. Los pequeños.** $\log_2n<\sqrt n<n$. Con $n=32$: $5<5{,}7<32$. Un logaritmo crece más despacio que cualquier potencia $n^{a}$ con $a>0$.

**Paso 2. Los polinómicos.** $n<n\log_2n<n^{2}<n^{3}$. Con $n=32$: $32<160<1024<32768$.

**Paso 3. Los que explotan.** $n^{3}<2^{n}<n!$. Con $n=32$: $32\,768<4{,}29\cdot10^{9}<2{,}6\cdot10^{35}$.

**Paso 4. Resultado.**
$$\log_2n<\sqrt n<n<n\log_2n<n^{2}<n^{3}<2^{n}<n!$$

### A04 · Entre dos potencias
nivel: 0.4

Ordena de menor a mayor: $n^{2}\log_2 n$, $n^{1{,}5}$, $n^{2{,}5}$, $n\log_2n$, $n^{2}$.

#### Pista
La regla del tema: $n^{p}<n^{p}\log n<n^{p+1}$. Un logaritmo crece más despacio que cualquier potencia positiva de $n$, así que multiplicar por $\log n$ sube menos que multiplicar por $n^{0{,}5}$.

#### Solución
**Paso 1. Compara $n\log_2 n$ con $n^{1{,}5}$.** Dividiendo por $n$: $\log_2n$ frente a $n^{0{,}5}=\sqrt n$. Gana la raíz, luego $n\log_2n<n^{1{,}5}$.

**Paso 2. Compara $n^{2}\log_2 n$ con $n^{2}$ y $n^{2{,}5}$.** Es mayor que $n^{2}$, porque $\log_2n$ crece. Y dividiendo por $n^{2}$, queda $\log_2n$ frente a $n^{0{,}5}$: gana la raíz, luego $n^{2}\log_2n<n^{2{,}5}$.

**Paso 3. Resultado.**
$$n\log_2n<n^{1{,}5}<n^{2}<n^{2}\log_2n<n^{2{,}5}$$

### A05 · Leer la definición de O con números
nivel: 0.3

La definición: $f\in O(g)$ si existen $c>0$ y $n_0$ tales que $f(n)\le c\,g(n)$ para todo $n\ge n_0$. Toma $f(n)=3n+5$ y $g(n)=n$.
- a) Con $c=4$, ¿desde qué $n$ se cumple $3n+5\le4n$?
- b) Con $c=3$, ¿se cumple alguna vez $3n+5\le3n$? ¿Y si $c=3{,}5$?
- c) Con $c=8$, ¿desde qué $n$ se cumple?
- d) Escribe una pareja $(c,n_0)$ y concluye.

#### Pista
Pasa los términos con $n$ a un lado: $3n+5\le4n\iff5\le n$.

#### Solución
**Paso 1. a).** $3n+5\le4n\iff5\le n$. Se cumple desde $n_0=5$.

**Paso 2. b).** $3n+5\le3n$ es imposible ($5\le0$): con $c=3$ nunca. Con $c=3{,}5$: $3n+5\le3{,}5n\iff10\le n$, vale desde $n_0=10$. Hace falta una constante algo mayor que el coeficiente de $n$.

**Paso 3. c).** $3n+5\le8n\iff5\le5n\iff n\ge1$. Desde $n_0=1$.

**Paso 4. Concluye.** d) Con $c=4$ y $n_0=5$ (o cualquier otra pareja anterior) se cumple la definición: $3n+5\in O(n)$. Hay infinitas parejas válidas; basta una.

### A06 · Encontrar c y n₀
nivel: 0.4

Demuestra con la definición:
- a) $2n+10\in O(n)$
- b) $2n+10\in O(n^{2})$

Da en cada caso una pareja $(c,n_0)$.

#### Pista
En a) prueba con una $c$ algo mayor que $2$, por ejemplo $c=3$. En b) prueba con $c=1$ y resuelve $n^{2}-2n-10\ge0$.

#### Solución
**Paso 1. a).** Con $c=3$: $2n+10\le3n\iff10\le n$. Pareja $(3,\,10)$.

**Paso 2. b), la inecuación.** Con $c=1$: $2n+10\le n^{2}\iff n^{2}-2n-10\ge0$.

**Paso 3. b), cuándo se cumple.** La parábola corta el eje en $1\pm\sqrt{11}$, es decir en $\approx-2{,}3$ y $\approx4{,}3$. Es positiva a la derecha de $4{,}3$, así que vale para $n\ge5$ (comprobación: $n=5$ da $25-10-10=5\ge0$; $n=4$ da $-2$). Pareja $(1,\,5)$.

### A07 · Acotar término a término
nivel: 0.5

Demuestra con la definición:
- a) $3n^{2}+4n\in O(n^{2})$
- b) $n^{2}+n\log_2n+5\in O(n^{2})$

#### Pista
Para $n\ge1$ se cumple $n\le n^{2}$, $1\le n^{2}$ y $\log_2n\le n$. Sustituye cada término por algo mayor que sea múltiplo de $n^{2}$ y suma.

#### Solución
**Paso 1. a).** Para $n\ge1$: $4n\le4n^{2}$, luego $3n^{2}+4n\le3n^{2}+4n^{2}=7n^{2}$.

**Paso 2. b), cada término.** Para $n\ge1$: $n\log_2n\le n\cdot n=n^{2}$ y $5\le5n^{2}$.

**Paso 3. b), suma.** $n^{2}+n\log_2n+5\le n^{2}+n^{2}+5n^{2}=7n^{2}$.

**Paso 4. Concluye.** En los dos casos, $c=7$ y $n_0=1$ cumplen la definición.

### A08 · Resolver la inecuación
nivel: 0.55

Demuestra que $n^{2}+3n\in O(n^{2})$ resolviendo la inecuación de la definición.
- a) Prueba con $c=2$: ¿desde qué $n$ se cumple $n^{2}+3n\le2n^{2}$?
- b) ¿Por qué no sirve $c=1$?
- c) ¿Y con $c=4$, desde qué $n$?

#### Pista
$n^{2}+3n\le2n^{2}\iff3n\le n^{2}\iff3\le n$ (dividiendo entre $n>0$).

#### Solución
**Paso 1. a).** $n^{2}+3n\le2n^{2}\iff3n\le n^{2}\iff n\ge3$. Pareja $(2,\,3)$.

**Paso 2. b).** Con $c=1$ habría que cumplir $3n\le0$, que es falso para todo $n>0$.

**Paso 3. c).** $n^{2}+3n\le4n^{2}\iff3n\le3n^{2}\iff n\ge1$. Pareja $(4,\,1)$. Con una $c$ mayor, el $n_0$ baja.

### A09 · Un logaritmo está dentro de O(n)
nivel: 0.6

Demuestra que $\log_2n\in O(n)$.
- a) Comprueba la desigualdad $\log_2n\le n$ para $n=1,2,4,8,16$.
- b) Demuéstrala para todo $n\ge1$ usando que $n<2^{n}$.
- c) ¿Se cumple también $\log_2n\in\Theta(n)$?

#### Pista
Si $n<2^{n}$, aplica $\log_2$ a ambos lados (es creciente). Para c), mira el límite de $\frac{\log_2 n}{n}$.

#### Solución
**Paso 1. Prueba con números.** a) $0\le1$, $1\le2$, $2\le4$, $3\le8$, $4\le16$. Se cumple con mucha holgura.

**Paso 2. Demostración.** b) Para $n\ge1$ se cumple $n<2^{n}$. Como $\log_2$ es creciente, $\log_2n<\log_2 2^{n}=n$. Con $c=1$ y $n_0=1$, $\log_2n\in O(n)$.

**Paso 3. Θ.** c) No. $\lim\frac{\log_2n}{n}=0$ (L'Hôpital: $\frac{1/(n\ln 2)}{1}\to0$); para $\Theta$ el límite tendría que ser una constante positiva. Es $\log_2n\in O(n)$ pero no $\Omega(n)$.

### A10 · Decidir con límites
nivel: 0.65

Si $\displaystyle\lim_{n\to\infty}\frac{f(n)}{g(n)}$ es una constante finita, entonces $f\in O(g)$; si es $\infty$, entonces $f\notin O(g)$. Decide:
- a) $n^{2}+5n\in O(n^{2})$
- b) $n\log_2n\in O(n^{2})$
- c) $n^{2}\in O(n\log_2n)$
- d) $5\cdot2^{n}\in O(3^{n})$

#### Pista
En b) simplifica antes: $\frac{n\log_2 n}{n^{2}}=\frac{\log_2n}{n}$. En d), $\frac{5\cdot2^{n}}{3^{n}}=5\left(\frac23\right)^{n}$.

#### Solución
**Paso 1. a).** $\frac{n^{2}+5n}{n^{2}}=1+\frac5n\to1$, finito: sí.

**Paso 2. b).** $\frac{\log_2 n}{n}\to0$ (L'Hôpital), finito: sí.

**Paso 3. c).** $\frac{n^{2}}{n\log_2n}=\frac{n}{\log_2n}\to\infty$: no.

**Paso 4. d).** $5\left(\frac23\right)^{n}\to0$: sí.

### A11 · Una cota inferior Ω
nivel: 0.6

Demuestra que $n^{2}-10n\in\Omega(n^{2})$. En $\Omega$ hay que cumplir $c\cdot g(n)\le f(n)$.
- a) Prueba con $c=\tfrac12$: ¿desde qué $n$ se cumple $\tfrac12n^{2}\le n^{2}-10n$?
- b) ¿Por qué no sirve $c=1$?

#### Pista
$\tfrac12n^{2}\le n^{2}-10n\iff10n\le\tfrac12n^{2}$. Divide entre $n$.

#### Solución
**Paso 1. a).** $\tfrac12n^{2}\le n^{2}-10n\iff10n\le\tfrac12n^{2}\iff20\le n$. Pareja $(\tfrac12,\,20)$. Comprobación: $n=20$ da $200\ge200$ y $n=19$ da $171<180{,}5$.

**Paso 2. b).** Con $c=1$ habría que cumplir $n^{2}\le n^{2}-10n$, es decir $10n\le0$: imposible.

### A12 · Demostrar que NO se cumple
nivel: 0.7

Para demostrar $f\notin O(g)$ hay que ver que, sea cual sea $c$, la desigualdad $f(n)\le c\,g(n)$ falla para $n$ tan grandes como se quiera. Demuestra:
- a) $n^{3}\notin O(n^{2})$
- b) $2n^{2}+5\notin O(n)$

#### Pista
Supón que existen $c$ y $n_0$. Simplifica la desigualdad hasta que quede "$n\le$ algo". Eso solo puede valer para $n$ pequeños.

#### Solución
**Paso 1. a), suposición.** Supón $n^{3}\le c\,n^{2}$ para todo $n\ge n_0$. Dividiendo entre $n^{2}$: $n\le c$.

**Paso 2. a), contradicción.** Pero eso es falso para $n>c$, y siempre hay $n\ge n_0$ con $n>c$. Luego no existe ninguna pareja y $n^{3}\notin O(n^{2})$.

**Paso 3. b).** Supón $2n^{2}+5\le c\,n$ para todo $n\ge n_0$. Como $2n^{2}\le2n^{2}+5\le cn$, se tiene $2n\le c$, es decir $n\le c/2$, falso para $n>c/2$. Luego $2n^{2}+5\notin O(n)$.

### A13 · Una cota Θ con constantes
nivel: 0.5

Demuestra con la definición que $2n^{2}+3n\in\Theta(n^{2})$ dando $c_1$, $c_2$ y $n_0$ con
$$c_1n^{2}\le2n^{2}+3n\le c_2n^{2}\quad\text{para todo }n\ge n_0.$$

#### Pista
La parte izquierda es fácil: tira el término $3n$ (que es positivo). Para la derecha usa $3n\le3n^{2}$ si $n\ge1$.

#### Solución
**Paso 1. Cota inferior.** Como $3n\ge0$, se tiene $2n^{2}\le2n^{2}+3n$ para todo $n$. Vale $c_1=2$.

**Paso 2. Cota superior.** Para $n\ge1$: $3n\le3n^{2}$, así que $2n^{2}+3n\le5n^{2}$. Vale $c_2=5$.

**Paso 3. Juntas.** Con $c_1=2$, $c_2=5$, $n_0=1$ se cumple la definición. Comprobación con $n=1$: $2\le5\le5$.

### A14 · Simplificar con dos parámetros
nivel: 0.7

Simplifica (quita constantes y términos dominados):
- a) $\Theta(5m^{2}+3mn+n)$
- b) $\Theta(m\log_2n+n\log_2m+mn)$
- c) $\Theta(m^{3}+m^{2}n+n^{2})$ (¿se puede quitar algún término?)

Suponemos $m,n\ge2$.

#### Pista
Un término se puede quitar si otro siempre es mayor o igual (salvo una constante), para cualquier valor de $m$ y $n$. Compara por parejas.

#### Solución
**Paso 1. a).** Quita constantes: $m^{2}+mn+n$. Como $n\le mn$ para $m\ge1$, el término $n$ sobra: $\Theta(m^{2}+mn)$. Ni $m^{2}$ ni $mn$ dominan al otro ($m^{2}\le mn$ solo si $m\le n$).

**Paso 2. b).** $\log_2n\le n$ y $\log_2m\le m$, luego $m\log_2n\le mn$ y $n\log_2m\le mn$. Quedan dominados: $\Theta(mn)$.

**Paso 3. c).** Ninguno sobra. $m^{3}$ gana a $m^{2}n$ si $m>n$, pero pierde si $n>m$; $m^{2}n$ gana a $n^{2}$ si $m^{2}>n$, pero pierde si $n>m^{2}$; $m^{3}$ y $n^{2}$ tampoco son comparables. La expresión se queda como está.

### A15 · Verdadero o falso
nivel: 0.6

Decide si es verdadero y razona:
- a) $2^{n+1}\in\Theta(2^{n})$
- b) $2^{2n}\in\Theta(2^{n})$
- c) $\log_2n\in\Theta(\log_{10}n)$
- d) $n^{2}+n\log_2n\in\Theta(n^{2})$
- e) $(n+1)!\in\Theta(n!)$
- f) $\sqrt n\in O(\log_2n)$

#### Pista
Una constante multiplicativa no cambia el orden; una función que se multiplica por algo que crece, sí. Pasa cada caso a un cociente.

#### Solución
**Paso 1. a) y c).** Verdaderos: $2^{n+1}=2\cdot2^{n}$ y $\log_2n=\log_{10}n/\log_{10}2$. Solo cambian en una constante.

**Paso 2. b).** Falso: $2^{2n}=4^{n}=2^{n}\cdot2^{n}$, y el cociente $2^{n}$ no está acotado. No es solo una constante.

**Paso 3. d).** Verdadero: $n\log_2n\le n^{2}$ para $n\ge1$, y $n^{2}$ manda. El cociente tiende a $1$.

**Paso 4. e).** Falso: $(n+1)!=(n+1)\,n!$, cociente $n+1\to\infty$.

**Paso 5. f).** Falso: $\frac{\sqrt n}{\log_2n}\to\infty$. Es al revés, $\log_2n\in O(\sqrt n)$.

### A17 · Simular counting-sort
nivel: 0.5

Ordena con counting-sort el vector $A=[3,1,3,0,2]$ (valores en $[0,3]$, así que $k=3$).
- a) Calcula el vector de cuentas $C[0..3]$.
- b) Calcula las sumas acumuladas de $C$.
- c) Da el vector ordenado.
- d) ¿De qué orden es el coste en función de $n$ y $k$? ¿Qué pasa si $k=n^{2}$?

#### Pista
$C[v]$ cuenta cuántas veces aparece $v$ en $A$. Las sumas acumuladas dicen cuántos elementos son menores o iguales que $v$.

#### Solución
**Paso 1. Cuentas.** a) $0$ aparece 1 vez, $1$ una, $2$ una y $3$ dos: $C=[1,1,1,2]$.

**Paso 2. Acumuladas.** b) $C=[1,2,3,5]$: hay 1 elemento $\le0$, 2 $\le1$, 3 $\le2$ y 5 $\le3$.

**Paso 3. Salida.** c) $B=[0,1,2,3,3]$.

**Paso 4. Coste.** d) Hay dos bucles de tamaño $k$ y dos de tamaño $n$: $\Theta(n+k)$. Si $k\in O(n)$ es lineal. Con $k=n^{2}$ sería $\Theta(n^{2})$, peor que una ordenación por comparaciones.

### A19 · log n! entre dos cotas
nivel: 0.8

Prueba que $\log_2(n!)\in\Theta(n\log_2n)$ acotando $n!$ por los dos lados (con $n$ par).
- a) Cota superior: $n!\le n^{n}$. ¿Qué cota de $\log_2(n!)$ sale?
- b) Cota inferior: en $n!=n\cdot(n-1)\cdots1$, los $\tfrac n2$ factores más grandes valen al menos $\tfrac n2$. ¿Qué cota de $n!$ sale, y de $\log_2(n!)$?
- c) Concluye y comprueba con $n=8$.

#### Pista
Los primeros $n/2$ factores ($n,n-1,\dots,\frac n2+1$) son todos mayores que $\frac n2$. Los demás factores valen al menos $1$.

#### Solución
**Paso 1. Cota superior.** a) Cada factor es $\le n$, hay $n$ factores: $n!\le n^{n}$, luego $\log_2(n!)\le n\log_2n$.

**Paso 2. Cota inferior.** b) $n!\ge\left(\tfrac n2\right)^{n/2}\cdot1$, luego $\log_2(n!)\ge\tfrac n2\log_2\tfrac n2=\tfrac n2(\log_2n-1)$.

**Paso 3. Orden.** El término dominante de la cota inferior es $\tfrac n2\log_2n$, que es $\Theta(n\log_2n)$, igual que la superior. Por tanto $\log_2(n!)\in\Theta(n\log_2n)$.

**Paso 4. Comprueba.** c) $n=8$: $\log_2 40320\approx15{,}3$; cota inferior $\tfrac82(3-1)=8$; cota superior $8\cdot3=24$. Se cumple $8\le15{,}3\le24$.

### A20 · Ordenar con logaritmos
nivel: 0.85

Ordena de menor a mayor orden de crecimiento:
$$n^{3},\quad 2^{n},\quad n^{\log_2n},\quad 3^{n/2},\quad n!$$

#### Pista
Compara los logaritmos (en base $2$) de las funciones: como $\log$ es creciente, el orden se conserva. Los logaritmos son $3\log_2n$, $n$, $(\log_2n)^{2}$, $\tfrac n2\log_23$ y $\approx n\log_2n$.

#### Solución
**Paso 1. Toma $\log_2$ de cada una.** $n^{3}\to3\log_2n$. $2^{n}\to n$. $n^{\log_2n}\to(\log_2n)^{2}$. $3^{n/2}\to\tfrac n2\log_23\approx0{,}79\,n$. $n!\to\log_2(n!)\in\Theta(n\log_2n)$.

**Paso 2. Ordena esos logaritmos.** $3\log_2n<(\log_2n)^{2}<0{,}79\,n<n<n\log_2n$ (para $n$ grande: un logaritmo al cuadrado crece más despacio que $n$).

**Paso 3. Vuelve a las funciones.**
$$n^{3}<n^{\log_2n}<3^{n/2}<2^{n}<n!$$

**Paso 4. Comentario.** $n^{\log_2n}$ gana a todo polinomio pero pierde con cualquier exponencial. Y $3^{n/2}=(\sqrt3)^{n}\approx1{,}73^{n}$ tiene base menor que $2$.

### A21 · Cotas con exponenciales
nivel: 0.9

Decide y demuestra con la definición:
- a) $2^{n+1}\in O(2^{n})$
- b) $3^{n}\notin O(2^{n})$
- c) $n\cdot2^{n}\notin O(2^{n})$

#### Pista
En a) saca el factor: $2^{n+1}=2\cdot2^{n}$. En b) y c) supón que existe $c$ y divide entre $2^{n}$.

#### Solución
**Paso 1. a).** $2^{n+1}=2\cdot2^{n}\le2\cdot2^{n}$. Pareja $(2,\,1)$.

**Paso 2. b).** Supón $3^{n}\le c\,2^{n}$ para todo $n\ge n_0$. Dividiendo entre $2^{n}$: $\left(\tfrac32\right)^{n}\le c$. Pero $\left(\tfrac32\right)^{n}$ crece sin cota, así que supera a cualquier $c$ para $n$ grande. Contradicción.

**Paso 3. c).** Supón $n\,2^{n}\le c\,2^{n}$. Dividiendo entre $2^{n}$: $n\le c$, falso para $n>c$. Luego $n\,2^{n}\notin O(2^{n})$.

### A22 · Cambio de base con la definición de Θ
nivel: 0.7

Demuestra con la definición que $\log_5 n\in\Theta(\log_2 n)$, dando $c_1$, $c_2$ y $n_0$.
- a) Escribe $\log_5 n$ en función de $\log_2 n$.
- b) Elige $c_1$ y $c_2$ (con $c_1\le$ la constante $\le c_2$) y comprueba la doble desigualdad.

#### Pista
$\log_5 n=\dfrac{\log_2 n}{\log_2 5}$. La constante $\dfrac1{\log_25}$ vale aproximadamente $0{,}43$.

#### Solución
**Paso 1. Cambio de base.** a) $\log_5 n=\dfrac{1}{\log_2 5}\log_2 n\approx0{,}4307\,\log_2 n$.

**Paso 2. Constantes.** b) Con $c_1=0{,}4$ y $c_2=0{,}5$: $0{,}4\log_2 n\le0{,}4307\log_2n\le0{,}5\log_2n$ para todo $n\ge1$ (donde $\log_2n\ge0$). Por tanto $n_0=1$.

**Paso 3. Conclusión.** $\log_5n\in\Theta(\log_2n)$. Vale para cualquier base: la base solo cambia una constante.

### A23 · Potencias con un logaritmo en el exponente
nivel: 0.75

Simplifica a una potencia de $n$ y decide si está en $O(n^{2})$ y en $\Theta(n^{2})$:
- a) $3^{\log_2 n}$
- b) $2^{\ln n}$
- c) $2^{\log_4 n}$
- d) $4^{\log_2 n}$

#### Pista
Usa $b^{\log_c n}=n^{\log_c b}$ (se prueba escribiendo $b=c^{\log_c b}$). Para $2^{\ln n}$ conviene pasar a base $e$: $2^{\ln n}=n^{\ln 2}$.

#### Solución
**Paso 1. a).** $3^{\log_2n}=n^{\log_23}\approx n^{1{,}585}$. Está en $O(n^{2})$, pero no en $\Theta(n^{2})$ porque el exponente es menor.

**Paso 2. b).** $2^{\ln n}=n^{\ln2}\approx n^{0{,}693}$. En $O(n^{2})$, no en $\Theta(n^{2})$ (tampoco en $\Theta(n)$).

**Paso 3. c).** $2^{\log_4n}=n^{\log_42}=n^{1/2}=\sqrt n$. En $O(n^{2})$, no en $\Theta(n^{2})$.

**Paso 4. d).** $4^{\log_2n}=n^{\log_24}=n^{2}$. En $O(n^{2})$ y en $\Theta(n^{2})$.

### A24 · Factoriales y exponenciales con la definición
nivel: 0.8

Decide con la definición de $O$, con $c$ y $n_0$ o demostrando que no existen:
- a) $(n-1)!\in O(n!)$
- b) $(n+1)!\in O(n!)$
- c) $2^{n}\in O(3^{n})$
- d) $3^{n}\in O(2^{n})$

#### Pista
Escribe $(n+1)!=(n+1)\cdot n!$ y $n!=n\cdot(n-1)!$. Divide la desigualdad $f\le c\,g$ entre $g$ y mira si el cociente queda acotado.

#### Solución
**Paso 1. a).** $(n-1)!=\dfrac{n!}{n}\le n!$ para $n\ge1$. Sí, con $c=1$ y $n_0=1$.

**Paso 2. b).** Supón $(n+1)!\le c\,n!$ para todo $n\ge n_0$. Dividiendo entre $n!$: $n+1\le c$, falso para $n\ge c$. No existe $c$: $(n+1)!\notin O(n!)$.

**Paso 3. c).** $2^{n}\le3^{n}$ para todo $n\ge0$. Sí, con $c=1$ y $n_0=1$.

**Paso 4. d).** Supón $3^{n}\le c\,2^{n}$. Dividiendo entre $2^{n}$: $\left(\tfrac32\right)^{n}\le c$, falso para $n$ grande porque crece sin cota. No: $3^{n}\notin O(2^{n})$.

### A25 · Dos demostraciones de examen: $O$ con logaritmo y $\Omega$ con resta
nivel: 0.8

Con la definición (sin límites):
- a) $5n\in O(n\log_2 n)$
- b) $n^{2}-3n+1\in\Omega(n^{2})$

Da $c$ y $n_0$ en cada caso.

#### Pista
En a), para $n\ge2$ se tiene $\log_2n\ge1$. En b), prueba con $c=\tfrac14$ y resuelve la desigualdad $\tfrac34n^{2}-3n+1\ge0$.

#### Solución
**Paso 1. a).** Con $c=5$: $5n\le5\,n\log_2n\iff1\le\log_2n\iff n\ge2$. Pareja $(5,\,2)$.

**Paso 2. b), planteamiento.** Queremos $n^{2}-3n+1\ge\tfrac14n^{2}\iff\tfrac34n^{2}-3n+1\ge0\iff3n^{2}-12n+4\ge0$.

**Paso 3. b), resolución.** Las raíces de $3n^{2}-12n+4$ son $\dfrac{12\pm\sqrt{96}}{6}\approx0{,}37$ y $3{,}63$. La parábola es positiva a la derecha de $3{,}63$: sirve $n_0=4$ (con $n=4$: $16-12+1=5\ge4$; con $n=3$: $1<2{,}25$). Pareja $(\tfrac14,\,4)$.

### A26 · Ordenar funciones con complejidades iguales
nivel: 0.5

Ordena de menor a mayor orden de complejidad y agrupa las que tienen la misma:
$$7n+\log n,\quad n\log_2 n,\quad 3\log n,\quad \log(n^{3}),\quad n^{2},\quad n^{1{,}5},\quad n\log_{10}n,\quad (\log n)^{2}$$

#### Pista
Quita constantes y términos menores. $\log(n^{3})=3\log n$ y la base del logaritmo no cambia el orden. Un logaritmo al cuadrado sigue creciendo más despacio que $n$.

#### Solución
**Paso 1. Simplifica.** $7n+\log n\to n$. $3\log n\to\log n$. $\log(n^{3})=3\log n\to\log n$. $n\log_{10}n$ y $n\log_2n$ son $n\log n$.

**Paso 2. Ordena.** $\log n=3\log n=\log(n^{3})<(\log n)^{2}<n\;(=7n+\log n)<n\log n\;(=n\log_2n=n\log_{10}n)<n^{1{,}5}<n^{2}$.

**Paso 3. Grupos.** Mismo orden: $\{3\log n,\ \log(n^{3})\}$ y $\{n\log_2n,\ n\log_{10}n\}$. Las demás están solas.
