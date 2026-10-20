# Peldaños: Sumatorios y cotas por integrales
stage: sumatorios

## Orden
- t21-potencias-logs: S01 S02 S03 S04
- t21-calculo: S05 S06 S07
- t21-sumas-basicas: S08 S09 1.4 S10 S11 S12 S13 S14 1.5 S15 S16 1.7
- t21-cuadrados-cubos: S17 S18 S19 1.6
- t21-telescopicas: S20 S21 S22
- t21-geometricas: S23 S24 S25 S26 S27 S28 1.9
- t21-integrales: S29 S30 S31 S32 S33 S34 S35

### S01 · Potencias
nivel: 0.2

**Ejemplo resuelto.** Simplifica $\dfrac{2^{n+3}}{2^{n}}$. Con la misma base, los exponentes se restan: $2^{(n+3)-n}=2^{3}=8$.

**Ahora tú.** Simplifica:
- a) $2^{5}\cdot 2^{3}$
- b) $(3^{2})^{3}$
- c) $2^{-3}$
- d) $\dfrac{2^{n+1}}{2^{n-1}}$
- e) $(2n)^{2}$, escrito como un número por $n^{2}$
- f) $4^{n}$, escrito como potencia de $2$

#### Pista
Con la misma base, multiplicar suma los exponentes y dividir los resta. Una potencia de una potencia multiplica los exponentes.

#### Solución
**Paso 1. Misma base.** a) $2^{5}\cdot2^{3}=2^{5+3}=2^{8}=256$. d) $\dfrac{2^{n+1}}{2^{n-1}}=2^{(n+1)-(n-1)}=2^{2}=4$.

**Paso 2. Potencia de una potencia.** b) $(3^{2})^{3}=3^{2\cdot3}=3^{6}=729$. f) $4^{n}=(2^{2})^{n}=2^{2n}$.

**Paso 3. Exponente negativo.** c) $2^{-3}=\dfrac{1}{2^{3}}=\dfrac18$.

**Paso 4. Potencia de un producto.** e) $(2n)^{2}=2^{2}n^{2}=4n^{2}$.

### S02 · Logaritmos
nivel: 0.25

**Ejemplo resuelto.** $\log_2 32=5$, porque hay que elevar $2$ a $5$ para obtener $32$.

**Ahora tú.** Calcula o simplifica:
- a) $\log_3 81$
- b) $\log_2 \tfrac14$
- c) $\log_{10} 1$
- d) $2^{\log_2 7}$
- e) $\log_2(8n)$, en función de $\log_2 n$
- f) $\log_2(n^{3})$, en función de $\log_2 n$

#### Pista
$\log_b x$ es el exponente al que hay que elevar $b$ para obtener $x$. El logaritmo de un producto es la suma de los logaritmos, y el de una potencia saca el exponente multiplicando.

#### Solución
**Paso 1. Pregúntate por el exponente.** a) $3^{4}=81$, luego $\log_3 81=4$. b) $2^{-2}=\tfrac14$, luego $\log_2\tfrac14=-2$. c) $b^{0}=1$ para cualquier base, luego $\log_{10}1=0$.

**Paso 2. Logaritmo y potencia se anulan.** d) $b^{\log_b a}=a$, así que $2^{\log_2 7}=7$.

**Paso 3. Producto y potencia.** e) $\log_2(8n)=\log_2 8+\log_2 n=3+\log_2 n$. f) $\log_2(n^{3})=3\log_2 n$.

### S03 · Potencias y logaritmos a la vez
nivel: 0.35

Simplifica las expresiones. Salen en términos de $n$ sin logaritmos, salvo la d) y la e):
- a) $2^{\log_2 n+3}$
- b) $4^{\log_2 n}$
- c) $n^{\log_2 8}$
- d) $\log_2(n^{2})-\log_2 n$
- e) $\log_4 n$, en función de $\log_2 n$
- f) $9^{\log_3 n}$

#### Pista
Reescribe la base como potencia de la base del logaritmo: $4=2^{2}$. Después usa $b^{\log_b n}=n$.

#### Solución
**Paso 1. Suma en el exponente.** a) $2^{\log_2 n+3}=2^{\log_2 n}\cdot2^{3}=8n$.

**Paso 2. Cambia la base a la del logaritmo.** b) $4^{\log_2 n}=(2^{2})^{\log_2 n}=(2^{\log_2 n})^{2}=n^{2}$. f) $9^{\log_3 n}=(3^{2})^{\log_3 n}=n^{2}$.

**Paso 3. Calcula el logaritmo pequeño primero.** c) $\log_2 8=3$, luego $n^{\log_2 8}=n^{3}$.

**Paso 4. Propiedades del logaritmo.** d) $2\log_2 n-\log_2 n=\log_2 n$. e) Cambio de base: $\log_4 n=\dfrac{\log_2 n}{\log_2 4}=\tfrac12\log_2 n$.

### S04 · Contar parejas
nivel: 0.4

**Ejemplo resuelto.** $\binom52=\dfrac{5!}{2!\,3!}=\dfrac{5\cdot4}{2}=10$: hay $10$ formas de escoger $2$ elementos de $5$.

**Ahora tú.**
- a) Calcula $\binom62$.
- b) Demuestra que $\binom n2=\dfrac{n(n-1)}{2}$ simplificando los factoriales.
- c) Un doble bucle compara cada pareja $(i,j)$ con $i<j$ de una lista de $n=100$ elementos. ¿Cuántas comparaciones hace? ¿De qué orden es en general?

#### Pista
En $\dfrac{n!}{2!\,(n-2)!}$ casi todo el factorial de arriba se cancela con el de abajo: $n!=n\,(n-1)\,(n-2)!$.

#### Solución
**Paso 1. Calcula con la definición.** a) $\binom62=\dfrac{6\cdot5}{2}=15$.

**Paso 2. Cancela.** b) $\binom n2=\dfrac{n!}{2!\,(n-2)!}=\dfrac{n(n-1)(n-2)!}{2\,(n-2)!}=\dfrac{n(n-1)}{2}$.

**Paso 3. Aplícalo.** c) Cada pareja se compara una vez: $\binom{100}{2}=\dfrac{100\cdot99}{2}=4950$. En general $\dfrac{n(n-1)}{2}=\dfrac{n^{2}}{2}-\dfrac n2$, que es del orden de $n^{2}$.

### S05 · Derivar
nivel: 0.3

**Ejemplo resuelto.** $f(x)=5x^{3}$ se deriva con $(x^{k})'=kx^{k-1}$: $f'(x)=15x^{2}$.

**Ahora tú.** Deriva:
- a) $f(x)=4x^{3}-2x+7$
- b) $f(x)=\sqrt x$
- c) $f(x)=x\ln x$
- d) $f(x)=\log_2 x$
- e) $f(x)=2^{x}$

#### Pista
Una constante se deriva a $0$. La raíz es $x^{1/2}$. Para el producto: $(gh)'=g'h+gh'$. $(\ln x)'=\dfrac1x$.

#### Solución
**Paso 1. Polinomios.** a) $f'(x)=12x^{2}-2$ (la constante $7$ desaparece).

**Paso 2. Raíz como potencia.** b) $x^{1/2}$ da $\tfrac12x^{-1/2}=\dfrac{1}{2\sqrt x}$.

**Paso 3. Producto.** c) $(x)'\ln x+x(\ln x)'=\ln x+x\cdot\dfrac1x=\ln x+1$.

**Paso 4. Logaritmo y exponencial en otra base.** d) $(\log_2 x)'=\dfrac{1}{x\ln2}$. e) $(2^{x})'=2^{x}\ln2$.

### S06 · Límites
nivel: 0.35

**Ejemplo resuelto.** $\displaystyle\lim_{n\to\infty}\frac{3n^{2}+5n}{n^{2}}$: dividiendo arriba y abajo por $n^{2}$ queda $3+\frac5n\to3$.

**Ahora tú.** Calcula:
- a) $\displaystyle\lim_{n\to\infty}\frac{n^{2}+1}{3n^{2}}$
- b) $\displaystyle\lim_{n\to\infty}\frac{n}{n^{2}+1}$
- c) $\displaystyle\lim_{n\to\infty}\frac{n^{2}}{n}$
- d) $\displaystyle\lim_{n\to\infty}\frac{\ln n}{n}$ (regla de L'Hôpital)
- e) $\displaystyle\lim_{n\to\infty}\frac{n^{2}}{2^{n}}$ (L'Hôpital dos veces)

#### Pista
En a), b) y c) divide por la mayor potencia de $n$. En d) y e) sale $\infty/\infty$: deriva el numerador y el denominador por separado.

#### Solución
**Paso 1. Divide por la mayor potencia.** a) $\dfrac{1+1/n^{2}}{3}\to\dfrac13$. b) $\dfrac{1/n}{1+1/n^{2}}\to0$. c) $\dfrac{n^{2}}{n}=n\to\infty$.

**Paso 2. L'Hôpital una vez.** d) $\dfrac{(\ln n)'}{(n)'}=\dfrac{1/n}{1}=\dfrac1n\to0$.

**Paso 3. L'Hôpital dos veces.** e) $\dfrac{2n}{2^{n}\ln2}$ sigue siendo $\infty/\infty$; otra vez: $\dfrac{2}{2^{n}\ln^{2}2}\to0$. Un exponencial crece más deprisa que cualquier polinomio.

### S07 · Integrales para sumar áreas
nivel: 0.35

**Ejemplo resuelto.** $\displaystyle\int_0^{n}x\,dx=\left[\frac{x^{2}}{2}\right]_0^{n}=\frac{n^{2}}{2}$.

**Ahora tú.** Calcula:
- a) $\displaystyle\int_1^{n}x^{2}\,dx$
- b) $\displaystyle\int_1^{n}\frac1x\,dx$
- c) $\displaystyle\int_0^{n}(3x+1)\,dx$
- d) $\displaystyle\int_1^{n}\sqrt x\,dx$
- e) $\displaystyle\int_0^{n}2^{x}\,dx$

#### Pista
$\int x^{k}dx=\dfrac{x^{k+1}}{k+1}$, $\int\frac1xdx=\ln x$ y $\int a^{x}dx=\dfrac{a^{x}}{\ln a}$. Después evalúa en el límite superior y resta el inferior.

#### Solución
**Paso 1. Potencias.** a) $\left[\dfrac{x^{3}}{3}\right]_1^{n}=\dfrac{n^{3}-1}{3}$. d) $\left[\dfrac{x^{3/2}}{3/2}\right]_1^{n}=\dfrac23\left(n^{3/2}-1\right)$.

**Paso 2. Suma de términos.** c) $\left[\dfrac{3x^{2}}{2}+x\right]_0^{n}=\dfrac32n^{2}+n$.

**Paso 3. Logaritmo y exponencial.** b) $[\ln x]_1^{n}=\ln n-\ln1=\ln n$. e) $\left[\dfrac{2^{x}}{\ln2}\right]_0^{n}=\dfrac{2^{n}-1}{\ln2}$.

### S08 · Leer un sumatorio
nivel: 0.2

**Ejemplo resuelto.** $\displaystyle\sum_{i=1}^{4}(2i+1)$: el índice $i$ toma los valores $1,2,3,4$, y se suma $2i+1$ en cada uno: $3+5+7+9=24$.

**Ahora tú.** Escribe los términos y calcula:
- a) $\displaystyle\sum_{i=1}^{5}i^{2}$
- b) $\displaystyle\sum_{i=3}^{6}(i-1)$
- c) $\displaystyle\sum_{i=0}^{3}2^{i}$
- d) $\displaystyle\sum_{j=1}^{4}j$ (¿cambia algo por llamarla $j$?)
- e) $\displaystyle\sum_{i=5}^{4}i$

#### Pista
Fíjate en dónde empieza y dónde acaba el índice. En e) piensa cuántos valores tiene el índice.

#### Solución
**Paso 1. Lista los valores del índice.** a) $1,2,3,4,5$. b) $3,4,5,6$. c) $0,1,2,3$.

**Paso 2. Sustituye y suma.** a) $1+4+9+16+25=55$. b) $2+3+4+5=14$. c) $1+2+4+8=15$.

**Paso 3. Nombre del índice y sumas vacías.** d) $1+2+3+4=10$: el nombre del índice no importa. e) El límite inferior es mayor que el superior, no hay términos y el sumatorio vale $0$.

### S09 · Sumar constantes
nivel: 0.3

**Ejemplo resuelto.** $\displaystyle\sum_{i=1}^{n}7=\underbrace{7+7+\cdots+7}_{n\text{ veces}}=7n$.

**Ahora tú.** Calcula:
- a) $\displaystyle\sum_{i=1}^{10}3$
- b) $\displaystyle\sum_{i=1}^{n}n$
- c) $\displaystyle\sum_{i=0}^{n-1}1$
- d) $\displaystyle\sum_{i=3}^{8}1$
- e) $\displaystyle\sum_{i=2}^{n}5$

#### Pista
Si lo que se suma no depende de $i$, solo hay que contar cuántos términos hay y multiplicar. Cuenta: último valor $-$ primero $+\,1$.

#### Solución
**Paso 1. Cuenta los términos.** a) $10$ términos. b) $n$ términos. c) de $0$ a $n-1$ hay $n$ valores. d) de $3$ a $8$ hay $8-3+1=6$. e) de $2$ a $n$ hay $n-1$.

**Paso 2. Multiplica por la constante.** a) $3\cdot10=30$. b) $n\cdot n=n^{2}$ (aquí la constante es $n$, que no cambia con $i$). c) $n$. d) $6$. e) $5(n-1)$.

### S10 · Sumar como Gauss, con números
nivel: 0.3

**Ejemplo resuelto.** $1+2+\cdots+6$: se empareja el primero con el último, $1+6$, el segundo con el penúltimo, $2+5$, y así. Cada pareja suma $7$ y hay $3$ parejas: $21$.

**Ahora tú.** Calcula emparejando:
- a) $1+2+\cdots+10$
- b) $1+2+\cdots+100$
- c) $1+2+\cdots+7$ (aquí sobra un término: ¿qué haces?)
- d) $11+12+\cdots+20$

#### Pista
Escribe la suma dos veces, la segunda al revés, y suma por columnas: todas las columnas dan lo mismo. En c) esa idea no necesita que el número de términos sea par.

#### Solución
**Paso 1. Parejas.** a) $1+10=11$ y hay $5$ parejas: $55$. b) $1+100=101$ y hay $50$ parejas: $5050$.

**Paso 2. Cuando el número de términos es impar.** c) Hay $7$ términos. Con el truco de escribirla dos veces: $2S=7\cdot8$, así que $S=28$. (También: $3$ parejas de $8$, más el $4$ que queda en medio: $24+4=28$.)

**Paso 3. Empezar en otro número.** d) $11+20=31$, hay $10$ términos y por tanto $5$ parejas: $155$.

### S11 · La fórmula de Gauss, completa
nivel: 0.4

Se quiere demostrar que $S(n)=1+2+\cdots+n=\dfrac{n(n+1)}{2}$. Escribimos la suma dos veces, la segunda al revés:
$$S(n)=1+2+\cdots+(n-1)+n,\qquad S(n)=n+(n-1)+\cdots+2+1$$
- a) ¿Cuánto suma cada columna?
- b) ¿Cuántas columnas hay?
- c) Con eso, ¿cuánto vale $2S(n)$ y cuánto $S(n)$?
- d) Comprueba el resultado con $n=10$.
- e) Úsalo para calcular $1+2+\cdots+1000$.

#### Pista
La primera columna suma $1+n$. Mira la segunda: $2+(n-1)$.

#### Solución
**Paso 1. Una columna.** $1+n$, $2+(n-1)$, $3+(n-2)$, ... todas suman $n+1$.

**Paso 2. Cuántas.** Hay una columna por término, es decir, $n$.

**Paso 3. Despeja.** $2S(n)=n(n+1)$, luego $S(n)=\dfrac{n(n+1)}{2}$.

**Paso 4. Comprueba y usa.** d) $\dfrac{10\cdot11}{2}=55$, igual que antes. e) $\dfrac{1000\cdot1001}{2}=500500$.

### S12 · Usar la fórmula de Gauss
nivel: 0.45

Halla una fórmula sin sumatorio para cada una (y comprueba con $n=4$):
- a) $\displaystyle\sum_{i=1}^{n}(i+3)$
- b) $\displaystyle\sum_{i=1}^{n}(3i-2)$
- c) $\displaystyle\sum_{i=1}^{n}2i$

#### Pista
El sumatorio de una suma es la suma de los sumatorios, y los números que multiplican salen fuera: $\sum(3i-2)=3\sum i-\sum 2$. Usa $\sum_{i=1}^{n}i=\frac{n(n+1)}{2}$.

#### Solución
**Paso 1. Separa en sumatorios sencillos.** a) $\sum i+\sum3$. b) $3\sum i-\sum2$. c) $2\sum i$.

**Paso 2. Sustituye.** a) $\dfrac{n(n+1)}{2}+3n=\dfrac{n(n+7)}{2}$. b) $\dfrac{3n(n+1)}{2}-2n=\dfrac{n(3n-1)}{2}$. c) $2\cdot\dfrac{n(n+1)}{2}=n(n+1)$.

**Paso 3. Comprueba con $n=4$.** a) $4+5+6+7=22$ y $\frac{4\cdot11}{2}=22$. b) $1+4+7+10=22$ y $\frac{4\cdot11}{2}=22$. c) $2+4+6+8=20$ y $4\cdot5=20$.

### S13 · Una progresión aritmética concreta
nivel: 0.5

Considera la sucesión $3,7,11,15,\dots$, donde cada término es el anterior más una cantidad fija $d$, y se numera desde $a_0$.
- a) ¿Cuánto valen $a_0$ y $d$?
- b) Escribe $a_i$ en función de $i$.
- c) Si hay $11$ términos ($a_0,\dots,a_{10}$), ¿cuánto vale el último?
- d) Suma los $11$ términos emparejando primero con último.

#### Pista
$a_1=a_0+d$, $a_2=a_0+2d$, ... ¿Qué pasa con $a_i$?

#### Solución
**Paso 1. Valores iniciales.** $a_0=3$ y $d=7-3=4$.

**Paso 2. Término general.** $a_i=a_0+i\,d=3+4i$.

**Paso 3. Último término.** $a_{10}=3+40=43$.

**Paso 4. Emparejar.** $a_0+a_{10}=46$, y cada pareja $a_i+a_{10-i}$ suma lo mismo. Con $11$ términos: $\dfrac{11\cdot46}{2}=253$.

### S14 · Los primeros impares
nivel: 0.5

- a) Suma $1+3+5+7+9$ emparejando.
- b) Calcula la suma de los $n$ primeros impares para $n=1,2,3,4,5$.
- c) ¿Qué patrón ves?
- d) Comprueba que el término número $i$ es $2i-1$ y que "primero + último" vale $2n$.

#### Pista
En una suma de este tipo, "primero + último" vale lo mismo que "segundo + penúltimo", y así con todas las parejas.

#### Solución
**Paso 1. Emparejar.** a) $1+9=10$, $3+7=10$, y el $5$ queda solo; el $5$ es la mitad de $10$, así que sale $5\cdot10/2=25$.

**Paso 2. Tabla.** b) $1,\ 1+3=4,\ 4+5=9,\ 9+7=16,\ 16+9=25$.

**Paso 3. Patrón.** c) $1^{2},2^{2},3^{2},4^{2},5^{2}$: la suma de los $n$ primeros impares parece $n^{2}$.

**Paso 4. Por qué.** d) El $i$-ésimo impar es $2i-1$ ($i=1$ da $1$). Primero + último $=1+(2n-1)=2n$. Con $n$ términos: $\dfrac{n\cdot2n}{2}=n^{2}$.

### S15 · Un sumatorio que no empieza en 1
nivel: 0.55

Calcula $\displaystyle\sum_{i=10}^{20}i$ de dos formas:
- a) Restando dos sumas que empiezan en $1$.
- b) Emparejando directamente (primero con último).
- c) Generaliza: ¿cuánto vale $\displaystyle\sum_{i=m}^{n}i$?

#### Pista
$\sum_{i=10}^{20}i=\sum_{i=1}^{20}i-\sum_{i=1}^{9}i$. Y para emparejar, cuenta primero cuántos términos hay.

#### Solución
**Paso 1. Resta.** a) $\dfrac{20\cdot21}{2}-\dfrac{9\cdot10}{2}=210-45=165$.

**Paso 2. Empareja.** b) De $10$ a $20$ hay $11$ términos. Primero + último $=30$. Resultado: $\dfrac{11\cdot30}{2}=165$.

**Paso 3. Generaliza.** c) $\displaystyle\sum_{i=m}^{n}i=\frac{n(n+1)}{2}-\frac{(m-1)m}{2}=\frac{(n-m+1)(m+n)}{2}$. La segunda forma es "número de términos $\times$ (primero + último) $/\,2$".

### S16 · La suma de una progresión aritmética, con huecos
nivel: 0.65

Sea $s_i=s_0+i\,d$ una progresión aritmética y $S=\sum_{i=0}^{n-1}s_i$ la suma de sus $n$ primeros términos. Completa:
- a) El último término es $s_{n-1}=\ldots$
- b) Una pareja $s_i+s_{n-1-i}$ vale $\ldots$ y no depende de $i$.
- c) Escribiendo $S$ dos veces (una al revés) y sumando por columnas: $2S=\ldots$
- d) Luego $S=\ldots$
- e) Aplícalo a $s_0=5$, $d=3$, $n=20$.

#### Pista
Sustituye en $s_i+s_{n-1-i}$ la fórmula de cada término y observa cómo desaparece $i$.

#### Solución
**Paso 1. Último término.** a) $s_{n-1}=s_0+(n-1)d$.

**Paso 2. La pareja.** b) $s_i+s_{n-1-i}=(s_0+i\,d)+(s_0+(n-1-i)d)=2s_0+(n-1)d$. No aparece $i$, y es igual a $s_0+s_{n-1}$.

**Paso 3. Doble suma.** c) Hay $n$ columnas iguales: $2S=n\,(s_0+s_{n-1})$.

**Paso 4. Resultado.** d) $S=\dfrac n2\,(s_0+s_{n-1})$.

**Paso 5. Aplícalo.** e) $s_{19}=5+19\cdot3=62$ y $S=\dfrac{20}{2}(5+62)=670$.

### S17 · Comprobar la fórmula de los cuadrados
nivel: 0.4

La suma de los $n$ primeros cuadrados vale $\displaystyle\sum_{i=1}^{n}i^{2}=\frac{n(n+1)(2n+1)}{6}$.
- a) Calcula la suma sumando uno a uno para $n=1,2,3,4,5$.
- b) Comprueba que la fórmula da lo mismo en cada caso.
- c) Los sumandos $1,4,9,\dots$, ¿forman una progresión aritmética? ¿Sirve entonces el truco de emparejar? ¿Con qué potencia de $n$ crece la fórmula?

#### Pista
Para comprobar la fórmula basta sustituir $n$. Por ejemplo, $n=3$ da $\frac{3\cdot4\cdot7}{6}$.

#### Solución
**Paso 1. Suma directa.** a) $1,\ 1+4=5,\ 5+9=14,\ 14+16=30,\ 30+25=55$.

**Paso 2. Fórmula.** b) $n=3$: $\frac{3\cdot4\cdot7}{6}=14$. $n=4$: $\frac{4\cdot5\cdot9}{6}=30$. $n=5$: $\frac{5\cdot6\cdot11}{6}=55$. Coinciden también para $n=1$ ($1$) y $n=2$ ($5$).

**Paso 3. Qué tipo de suma es.** c) Las diferencias entre términos son $3,5,7,\dots$: no son constantes, así que no es una progresión aritmética y el emparejado no sirve. Al desarrollar la fórmula, $\frac{n(n+1)(2n+1)}{6}=\frac{2n^{3}+3n^{2}+n}{6}$, el término dominante es $\frac{n^{3}}{3}$: crece como $n^{3}$.

### S18 · Usar la fórmula de los cuadrados
nivel: 0.55

Calcula sin sumatorio:
- a) $\displaystyle\sum_{i=1}^{10}i^{2}$
- b) $\displaystyle\sum_{i=1}^{n}(i^{2}+i)$
- c) $\displaystyle\sum_{i=1}^{n}(2i-1)^{2}$

Comprueba b) con $n=3$ y c) con $n=3$.

#### Pista
En c) desarrolla el cuadrado: $(2i-1)^{2}=4i^{2}-4i+1$. Luego usa linealidad y las fórmulas de $\sum i^{2}$, $\sum i$ y $\sum 1$.

#### Solución
**Paso 1. Sustituye $n=10$.** a) $\dfrac{10\cdot11\cdot21}{6}=385$.

**Paso 2. Separa y usa dos fórmulas.** b) $\dfrac{n(n+1)(2n+1)}{6}+\dfrac{n(n+1)}{2}=\dfrac{n(n+1)(2n+4)}{6}=\dfrac{n(n+1)(n+2)}{3}$. Con $n=3$: $2+6+12=20$ y $\frac{3\cdot4\cdot5}{3}=20$.

**Paso 3. Desarrolla el cuadrado.** c) $4\sum i^{2}-4\sum i+\sum1=\dfrac{2n(n+1)(2n+1)}{3}-2n(n+1)+n=\dfrac{4n^{3}-n}{3}=\dfrac{n(4n^{2}-1)}{3}$. Con $n=3$: $1+9+25=35$ y $\frac{3\cdot35}{3}=35$.

### S19 · Cubos
nivel: 0.55

- a) Calcula $1^{3}+2^{3}+3^{3}+4^{3}+5^{3}$ y compárala con $(1+2+3+4+5)^{2}$.
- b) La fórmula es $\displaystyle\sum_{i=1}^{n}i^{3}=\left(\frac{n(n+1)}{2}\right)^{2}$. Úsala para $n=20$.
- c) Halla una fórmula para $\displaystyle\sum_{i=1}^{n}(i^{3}-i)$.

#### Pista
Para c), cada sumatorio por separado ya lo conoces: $\sum i^{3}$ y $\sum i$. Factoriza al final.

#### Solución
**Paso 1. Calcula y compara.** a) $1+8+27+64+125=225=15^{2}=(1+2+3+4+5)^{2}$.

**Paso 2. Usa la fórmula.** b) $\left(\dfrac{20\cdot21}{2}\right)^{2}=210^{2}=44100$.

**Paso 3. Resta y factoriza.** c) $\dfrac{n^{2}(n+1)^{2}}{4}-\dfrac{n(n+1)}{2}=\dfrac{n(n+1)\,[\,n(n+1)-2\,]}{4}=\dfrac{(n-1)\,n\,(n+1)\,(n+2)}{4}$. Con $n=3$: $0+6+24=30$ y $\frac{2\cdot3\cdot4\cdot5}{4}=30$.

### S20 · Sumas telescópicas
nivel: 0.5

**Ejemplo resuelto.** $\displaystyle\sum_{i=1}^{n}\bigl(i-(i-1)\bigr)=(1-0)+(2-1)+\cdots+(n-(n-1))=n-0=n$: casi todo se cancela y solo sobran el último y el primero.

**Ahora tú.**
- a) Calcula $\displaystyle\sum_{i=1}^{n}\bigl(i^{2}-(i-1)^{2}\bigr)$.
- b) Desarrolla $i^{2}-(i-1)^{2}$ y deduce el valor de $\displaystyle\sum_{i=1}^{n}(2i-1)$.
- c) Calcula $\displaystyle\sum_{i=1}^{n}\bigl(2^{i}-2^{i-1}\bigr)$.

#### Pista
Escribe los primeros términos y los últimos y fíjate en qué se cancela. Es de la forma $\sum(a_i-a_{i-1})=a_n-a_0$.

#### Solución
**Paso 1. Identifica $a_i$.** a) Aquí $a_i=i^{2}$, así que la suma vale $a_n-a_0=n^{2}-0=n^{2}$.

**Paso 2. Desarrolla.** b) $i^{2}-(i-1)^{2}=2i-1$. Por lo tanto $\sum_{i=1}^{n}(2i-1)=n^{2}$: es la suma de los impares que ya conocías.

**Paso 3. Otra sucesión.** c) $a_i=2^{i}$, luego $a_n-a_0=2^{n}-1$.

### S21 · Una suma de fracciones que se cancela
nivel: 0.6

Calcula $\displaystyle\sum_{i=2}^{n}\frac{1}{i(i-1)}$.
- a) Comprueba que $\dfrac{1}{i(i-1)}=\dfrac{1}{i-1}-\dfrac1i$.
- b) Escribe los primeros y últimos términos y cancela.
- c) Comprueba el resultado con $n=3$.

#### Pista
Pon el lado derecho de a) con denominador común $i(i-1)$ y verás que sale $\frac{1}{i(i-1)}$.

#### Solución
**Paso 1. Descomposición.** a) $\dfrac{1}{i-1}-\dfrac1i=\dfrac{i-(i-1)}{i(i-1)}=\dfrac1{i(i-1)}$.

**Paso 2. Escribe y cancela.** b) $\left(1-\tfrac12\right)+\left(\tfrac12-\tfrac13\right)+\cdots+\left(\tfrac1{n-1}-\tfrac1n\right)=1-\dfrac1n$.

**Paso 3. Comprueba.** c) $n=3$: $\tfrac12+\tfrac16=\tfrac23$ y $1-\tfrac13=\tfrac23$.

### S22 · Telescópica con salto de dos
nivel: 0.75

Calcula $\displaystyle\sum_{i=1}^{n}\frac{1}{i(i+2)}$.
- a) Comprueba que $\dfrac{1}{i(i+2)}=\dfrac12\left(\dfrac1i-\dfrac1{i+2}\right)$.
- b) Escribe los primeros términos de la suma y ve cuáles se cancelan y cuáles sobreviven.
- c) Da el resultado y comprueba con $n=2$.

#### Pista
Ahora el término que se resta es $\frac1{i+2}$, no $\frac1{i+1}$, así que se cancela con el que viene dos pasos después. No todo desaparece: quedan dos términos al principio y dos al final.

#### Solución
**Paso 1. Descomposición.** a) $\dfrac12\cdot\dfrac{(i+2)-i}{i(i+2)}=\dfrac12\cdot\dfrac{2}{i(i+2)}=\dfrac1{i(i+2)}$.

**Paso 2. Qué sobrevive.** b) $\tfrac12\left[\left(1-\tfrac13\right)+\left(\tfrac12-\tfrac14\right)+\left(\tfrac13-\tfrac15\right)+\cdots+\left(\tfrac1{n-1}-\tfrac1{n+1}\right)+\left(\tfrac1n-\tfrac1{n+2}\right)\right]$. Se cancelan todos los términos salvo $1$ y $\tfrac12$ del principio, y $-\tfrac1{n+1}$ y $-\tfrac1{n+2}$ del final.

**Paso 3. Resultado.** c) $\dfrac12\left(\dfrac32-\dfrac1{n+1}-\dfrac1{n+2}\right)$. Para $n=2$: $\tfrac13+\tfrac18=\tfrac{11}{24}$ y $\tfrac12\left(\tfrac32-\tfrac13-\tfrac14\right)=\tfrac12\cdot\tfrac{11}{12}=\tfrac{11}{24}$.

### S23 · Series geométricas, el truco
nivel: 0.4

**Ejemplo resuelto.** $S=1+2+4+8+\cdots+512$. Multiplicando por $2$ se desplaza todo un lugar: $2S=2+4+8+\cdots+512+1024$. Restando, $2S-S=1024-1$, es decir $S=1023$.

**Ahora tú.**
- a) Calcula $1+3+9+27+81$ con el mismo truco (multiplica por $3$ y resta).
- b) Calcula $1+\frac12+\frac14+\frac18+\frac1{16}$ (multiplica por $\frac12$).

#### Pista
Escribe $S$ y $rS$ una debajo de la otra, desplazadas un lugar, y resta: casi todo se cancela.

#### Solución
**Paso 1. Multiplica y resta.** a) $3S=3+9+27+81+243$, luego $3S-S=243-1=242$ y $S=121$.

**Paso 2. Con razón menor que 1.** b) $\tfrac12S=\tfrac12+\tfrac14+\tfrac18+\tfrac1{16}+\tfrac1{32}$, así que $S-\tfrac12S=1-\tfrac1{32}$, es decir $\tfrac12S=\tfrac{31}{32}$ y $S=\tfrac{31}{16}$.

### S24 · Fórmula de la serie geométrica
nivel: 0.5

La fórmula es $\displaystyle\sum_{i=m}^{n}r^{i}=\frac{r^{n+1}-r^{m}}{r-1}$ (con $r\ne1$). Calcula en forma cerrada:
- a) $\displaystyle\sum_{i=0}^{n-1}3^{i}$
- b) $\displaystyle\sum_{i=0}^{n}2^{i}$
- c) $\displaystyle\sum_{i=0}^{n-1}\left(\tfrac12\right)^{i}$, y comprueba con $n=3$.

#### Pista
Identifica $m$, $n$ y $r$ en cada caso. Ojo con el límite superior: en a) y c) llega a $n-1$, no a $n$.

#### Solución
**Paso 1. a).** $m=0$, último exponente $n-1$, $r=3$: $\dfrac{3^{n}-1}{3-1}=\dfrac{3^{n}-1}{2}$.

**Paso 2. b).** Último exponente $n$, $r=2$: $\dfrac{2^{n+1}-1}{2-1}=2^{n+1}-1$.

**Paso 3. c).** $r=\tfrac12$: $\dfrac{(\tfrac12)^{n}-1}{\tfrac12-1}=2-\dfrac{1}{2^{n-1}}$. Con $n=3$: $1+\tfrac12+\tfrac14=\tfrac74$ y $2-\tfrac14=\tfrac74$.

### S25 · Series geométricas que no empiezan en 0
nivel: 0.6

Calcula en forma cerrada y comprueba con $n=3$ (o $n=2$ en b):
- a) $\displaystyle\sum_{i=3}^{n}2^{i}$
- b) $\displaystyle\sum_{i=1}^{n}3^{i}$
- c) $\displaystyle\sum_{i=0}^{n-1}5\cdot2^{i}$
- d) $\displaystyle\sum_{i=0}^{n}4^{\,n-i}$

#### Pista
En c) saca el $5$ fuera. En d) la suma recorre las mismas potencias de $4$ pero al revés: con $k=n-i$ queda $\sum_{k=0}^{n}4^{k}$.

#### Solución
**Paso 1. Fórmula con $m$.** a) $\dfrac{2^{n+1}-2^{3}}{2-1}=2^{n+1}-8$. Con $n=3$: $8=16-8$. b) $\dfrac{3^{n+1}-3}{2}$. Con $n=2$: $3+9=12=\frac{27-3}{2}$.

**Paso 2. Factor común.** c) $5\sum_{i=0}^{n-1}2^{i}=5\,(2^{n}-1)$.

**Paso 3. Suma en sentido contrario.** d) Con $k=n-i$, la suma es $\sum_{k=0}^{n}4^{k}=\dfrac{4^{n+1}-1}{3}$. Con $n=1$: $4+1=5=\frac{16-1}{3}$.

### S26 · Cuánto crece una serie geométrica
nivel: 0.65

Decide el orden $\Theta(\cdot)$ de cada suma, usando la fórmula cerrada:
- a) $\displaystyle\sum_{i=0}^{n}2^{i}$
- b) $\displaystyle\sum_{i=0}^{n}\left(\tfrac12\right)^{i}$
- c) $\displaystyle\sum_{i=0}^{\log_2 n}2^{i}$ (el índice llega hasta $\log_2 n$)

#### Pista
Calcula primero la fórmula cerrada. En c) el exponente $2^{\log_2n}$ es sencillo.

#### Solución
**Paso 1. a).** $2^{n+1}-1\in\Theta(2^{n})$: la suma entera es del orden de su último término.

**Paso 2. b).** $\dfrac{1-(\tfrac12)^{n+1}}{1-\tfrac12}=2-\dfrac1{2^{n}}$, que siempre está entre $1$ y $2$: $\Theta(1)$. Si la razón es menor que $1$, domina el primer término.

**Paso 3. c).** $2^{\log_2n+1}-1=2n-1\in\Theta(n)$. Sumar potencias de $2$ hasta $n$ cuesta lo mismo que una pasada lineal. Saldrá en bucles que doblan una variable.

### S27 · La suma de $i\cdot r^{i}$
nivel: 0.75

La suma $\displaystyle\sum_{i=1}^{n}i\,r^{i}$ vale $\dfrac{r+r^{n+1}(nr-n-1)}{(r-1)^{2}}$.
- a) Calcula $\sum_{i=1}^{3}i\,2^{i}$ sumando y con la fórmula ($r=2$, $n=3$).
- b) Simplifica la fórmula para $r=2$.
- c) Comprueba tu fórmula del apartado b) con $n=4$.

#### Pista
Con $r=2$, el denominador $(r-1)^{2}$ vale $1$ y $nr-n-1=n-1$.

#### Solución
**Paso 1. Suma directa.** a) $2+8+24=34$.

**Paso 2. Fórmula.** a) $\dfrac{2+2^{4}(6-3-1)}{1}=2+32=34$. Coincide.

**Paso 3. Simplifica.** b) $S(n)=2+2^{n+1}(n-1)=(n-1)\,2^{n+1}+2$.

**Paso 4. Comprueba.** c) $n=4$: $2+8+24+64=98$ y $(4-1)\cdot32+2=98$.

### S28 · Contar bits, un caso pequeño
nivel: 0.8

Un algoritmo recorre los bits de un número de derecha a izquierda hasta encontrar el primer $1$ (inclusive) y se detiene. Se aplica a todos los números de $1$ a $2^{3}-1=7$, escritos con $3$ bits.
- a) Para cada número, ¿cuántos bits procesa?
- b) ¿Cuántos números procesan exactamente $1$ bit? ¿Y $2$? ¿Y $3$?
- c) ¿Cuántos bits se procesan en total?
- d) Escribe el total como un sumatorio $\sum_{k=1}^{3}k\cdot(\ldots)$.

#### Pista
Un número procesa exactamente $k$ bits si termina en $k-1$ ceros seguidos de un $1$. Cuenta cuántos hay de cada tipo.

#### Solución
**Paso 1. Uno a uno.** a) $001\to1$, $010\to2$, $011\to1$, $100\to3$, $101\to1$, $110\to2$, $111\to1$.

**Paso 2. Cuántos de cada tipo.** b) Exactamente $1$ bit: los que terminan en $1$, son $4$. Exactamente $2$ bits: los que terminan en $10$, son $2$. Exactamente $3$ bits: solo $100$, es $1$.

**Paso 3. Total.** c) $4\cdot1+2\cdot2+1\cdot3=11$ (coincide con sumar la lista del apartado a).

**Paso 4. Como sumatorio.** d) $\sum_{k=1}^{3}k\cdot2^{3-k}$: hay $2^{3-k}$ números que procesan exactamente $k$ bits. Para $n$ bits sale $\sum_{k=1}^{n}k\cdot2^{n-k}$.

### S29 · Una suma y sus dos integrales
nivel: 0.6

Sea $f(x)=x$, que es creciente, y la suma $S=\displaystyle\sum_{i=1}^{4}f(i)=1+2+3+4=10$.
Para una función creciente: $\displaystyle\int_{m-1}^{n}f(x)\,dx\ \le\ \sum_{i=m}^{n}f(i)\ \le\ \int_{m}^{n+1}f(x)\,dx$.
- a) Calcula las dos integrales con $m=1$, $n=4$.
- b) Comprueba que $S$ queda entre ambas.
- c) Dibuja o describe qué área representa cada integral frente a los rectángulos de la suma.

#### Pista
Cada término $f(i)$ es el área de un rectángulo de ancho $1$ y altura $f(i)$. Si la función crece, un rectángulo apoyado a la izquierda queda por debajo de la curva, y uno apoyado a la derecha, por encima.

#### Solución
**Paso 1. Integral inferior.** a) $\int_{0}^{4}x\,dx=\dfrac{16}{2}=8$.

**Paso 2. Integral superior.** a) $\int_{1}^{5}x\,dx=\dfrac{25-1}{2}=12$.

**Paso 3. Compara.** b) $8\le10\le12$. Se cumple.

**Paso 4. Interpreta.** c) Los rectángulos de la cota inferior cubren de $x=i-1$ a $x=i$ con altura $f(i)$, que es el valor de la curva al final del tramo: quedan por debajo. Los de la superior cubren de $x=i$ a $x=i+1$ con altura $f(i)$: quedan por encima de la curva.

### S30 · Acotar una suma con integrales
nivel: 0.8

Acota $\displaystyle\sum_{i=1}^{n}i^{2}$ por abajo y por arriba con integrales y deduce su orden $\Theta$.
- a) ¿La función $x^{2}$ es creciente o decreciente en $x\ge0$? ¿Qué fórmula de acotación toca?
- b) Calcula las dos integrales.
- c) Comprueba con $n=4$ ($1+4+9+16=30$).

#### Pista
En funciones crecientes: $\int_{m-1}^{n}\le\sum_{i=m}^{n}\le\int_{m}^{n+1}$, con $m=1$.

#### Solución
**Paso 1. Qué fórmula.** a) $x^{2}$ crece para $x\ge0$, así que sirve $\int_{0}^{n}x^{2}dx\le\sum_{i=1}^{n}i^{2}\le\int_{1}^{n+1}x^{2}dx$.

**Paso 2. Integrales.** b) $\dfrac{n^{3}}{3}\le\sum_{i=1}^{n}i^{2}\le\dfrac{(n+1)^{3}-1}{3}$.

**Paso 3. Orden.** Los dos extremos son del orden de $n^{3}$, luego $\sum i^{2}\in\Theta(n^{3})$.

**Paso 4. Comprueba.** c) $n=4$: $\frac{64}{3}\approx21{,}3\le30\le\frac{125-1}{3}\approx41{,}3$.

### S31 · Función decreciente: el primer término aparte
nivel: 0.85

Acota por arriba $\displaystyle\sum_{i=1}^{n}\frac{1}{i^{2}}$ por una constante, usando que $f(x)=\frac1{x^{2}}$ es decreciente.
Para decreciente: $\displaystyle\sum_{i=m}^{n}f(i)\le\int_{m-1}^{n}f(x)\,dx$.
- a) ¿Qué problema da usar $m=1$ directamente?
- b) Separa el primer término y acota el resto con $m=2$.
- c) Concluye una cota constante para toda la suma.

#### Pista
Con $m=1$ la integral empieza en $x=0$, donde $\frac1{x^{2}}$ no está definida. Saca el término $i=1$ y trata la suma que empieza en $i=2$.

#### Solución
**Paso 1. El problema.** a) La cota pide $\int_{0}^{n}\frac{1}{x^{2}}dx$, que no existe (la función se dispara en $0$).

**Paso 2. Separa el primer término.** b) $\sum_{i=1}^{n}\frac1{i^{2}}=1+\sum_{i=2}^{n}\frac1{i^{2}}\le1+\int_{1}^{n}\frac{dx}{x^{2}}=1+\left[-\frac1x\right]_1^{n}=1+1-\frac1n$.

**Paso 3. Conclusión.** c) $\sum_{i=1}^{n}\frac1{i^{2}}\le2-\frac1n<2$: la suma está acotada por una constante, y como además es $\ge1$, es $\Theta(1)$.

### S32 · Acotar una suma de logaritmos
nivel: 0.9

Acota $\displaystyle\sum_{i=1}^{n}\ln i$ y deduce el orden de $\ln(n!)$.
- a) Cota superior sencilla: cada término es como mucho $\ln n$.
- b) Cota inferior con una integral (función creciente), empezando la suma en $i=2$: $\sum_{i=2}^{n}\ln i\ge\int_{1}^{n}\ln x\,dx$. Calcula la integral (por partes: $\int\ln x\,dx=x\ln x-x$).
- c) Concluye el orden de $\ln(n!)$.

#### Pista
$\ln(n!)=\ln1+\ln2+\cdots+\ln n=\sum_{i=1}^{n}\ln i$. El término $i=1$ vale $0$.

#### Solución
**Paso 1. Cota superior.** a) $\sum_{i=1}^{n}\ln i\le n\ln n$.

**Paso 2. Integral.** b) $\int_{1}^{n}\ln x\,dx=[x\ln x-x]_1^{n}=n\ln n-n+1$.

**Paso 3. Une las cotas.** $n\ln n-n+1\le\ln(n!)\le n\ln n$.

**Paso 4. Orden.** c) El término dominante de ambas es $n\ln n$, luego $\ln(n!)\in\Theta(n\ln n)$.

### S33 · Del examen: cerrar una suma de polinomios
nivel: 0.95

Halla una fórmula sin sumatorio para $\displaystyle\sum_{i=1}^{n}(3i^{2}-2i+5)$ y comprueba con $n=2$.

#### Pista
Separa en tres sumatorios (linealidad), saca los coeficientes y usa $\sum i^{2}$, $\sum i$ y $\sum 1$.

#### Solución
**Paso 1. Separa.** $3\sum i^{2}-2\sum i+5\sum 1$.

**Paso 2. Sustituye.** $3\cdot\dfrac{n(n+1)(2n+1)}{6}-2\cdot\dfrac{n(n+1)}{2}+5n=\dfrac{n(n+1)(2n+1)}{2}-n(n+1)+5n$.

**Paso 3. Agrupa.** $\dfrac{n(n+1)(2n+1)}{2}-n(n+1)=\dfrac{n(n+1)(2n-1)}{2}$, luego el total es $\dfrac{n(n+1)(2n-1)}{2}+5n$.

**Paso 4. Comprueba.** $n=2$: $(3-2+5)+(12-4+5)=6+13=19$ y $\dfrac{2\cdot3\cdot3}{2}+10=19$.

### S34 · Del examen: sumas dobles
nivel: 1.0

Calcula en forma cerrada:
- a) $\displaystyle\sum_{i=1}^{n}\sum_{j=i}^{n}1$
- b) $\displaystyle\sum_{i=1}^{n}\sum_{j=1}^{i}j$ (y comprueba con $n=3$)

#### Pista
Resuelve primero la suma de dentro, que depende de $i$, y después la de fuera.

#### Solución
**Paso 1. a), suma interior.** $\sum_{j=i}^{n}1=n-i+1$ (cuenta los valores de $j$).

**Paso 2. a), suma exterior.** $\sum_{i=1}^{n}(n-i+1)=n+(n-1)+\cdots+1=\dfrac{n(n+1)}{2}$.

**Paso 3. b), suma interior.** $\sum_{j=1}^{i}j=\dfrac{i(i+1)}{2}$.

**Paso 4. b), suma exterior.** $\dfrac12\left(\sum i^{2}+\sum i\right)=\dfrac12\left(\dfrac{n(n+1)(2n+1)}{6}+\dfrac{n(n+1)}{2}\right)=\dfrac{n(n+1)(n+2)}{6}$.

**Paso 5. Comprueba.** $n=3$: $1+3+6=10$ y $\frac{3\cdot4\cdot5}{6}=10$.

### S35 · Del examen: geométrica más polinomio
nivel: 1.05

Calcula $\displaystyle\sum_{i=0}^{n}\left(2^{i}+i\right)$ en forma cerrada y di su orden $\Theta$. Comprueba con $n=2$.

#### Pista
Separa en dos sumatorios: uno geométrico y otro de naturales (cuidado con que el índice empieza en $0$; el término $i=0$ de la segunda suma es $0$).

#### Solución
**Paso 1. Separa.** $\sum_{i=0}^{n}2^{i}+\sum_{i=0}^{n}i$.

**Paso 2. Cada una.** $\sum_{i=0}^{n}2^{i}=2^{n+1}-1$ y $\sum_{i=0}^{n}i=\dfrac{n(n+1)}{2}$.

**Paso 3. Suma.** Total $=2^{n+1}-1+\dfrac{n(n+1)}{2}$.

**Paso 4. Orden.** El exponencial domina al polinomio: $\Theta(2^{n})$.

**Paso 5. Comprueba.** $n=2$: $(1+0)+(2+1)+(4+2)=10$ y $2^{3}-1+3=10$.
