# Peldaños: Recurrencias, método general y teorema maestro
stage: general

## Orden
- t32-maestro: G01 G02 G03
- t32-homogeneas: G04 G05 G06 G07
- t32-no-homogeneas: G08 G09 1.14 G10 2.15 G11 1.8 G12 1.11 2.12
- t32-cambio: G13 G14 G15 1.17 2.11 1.16 1.15 1.18
### G01 · Qué caso del teorema maestro es
nivel: 0.3

El teorema maestro (versión simple) resuelve $T(n)=a\,T(n/b)+c\,n^{k}$ comparando $a$ con $b^{k}$:
$$\Theta(n^{k})\ \text{si } \tfrac{a}{b^{k}}<1,\qquad \Theta(n^{k}\log n)\ \text{si } \tfrac{a}{b^{k}}=1,\qquad \Theta(n^{\log_b a})\ \text{si } \tfrac{a}{b^{k}}>1.$$

**Ejemplo resuelto.** $T(n)=T(n/2)+n$: $a=1$, $b=2$, $k=1$, $\frac{a}{b^{k}}=\frac12<1$, luego $\Theta(n)$.

**Ahora tú.** Identifica $a$, $b$, $k$, calcula $\frac{a}{b^{k}}$ y da el orden:
- a) $T(n)=2T(n/2)+n$
- b) $T(n)=4T(n/2)+n$
- c) $T(n)=3T(n/3)+1$
- d) $T(n)=T(n/2)+1$
- e) $T(n)=8T(n/2)+n^{2}$
- f) $T(n)=2T(n/2)+n^{2}$

#### Pista
$a$ es cuántas llamadas hace, $b$ cuántas veces más pequeño es el subproblema, y $n^{k}$ es el trabajo de fuera. Un trabajo constante es $n^{0}$, es decir $k=0$.

#### Solución
**Paso 1. Lee los parámetros.** a) $a=2,b=2,k=1$. b) $4,2,1$. c) $3,3,0$. d) $1,2,0$. e) $8,2,2$. f) $2,2,2$.

**Paso 2. Calcula $a/b^{k}$.** a) $2/2=1$. b) $4/2=2$. c) $3/1=3$. d) $1/1=1$. e) $8/4=2$. f) $2/4=\frac12$.

**Paso 3. Elige el caso.** a) $=1$: $\Theta(n\log n)$. b) $>1$: $\Theta(n^{\log_24})=\Theta(n^{2})$. c) $>1$: $\Theta(n^{\log_33})=\Theta(n)$. d) $=1$: $\Theta(n^{0}\log n)=\Theta(\log n)$. e) $>1$: $\Theta(n^{\log_28})=\Theta(n^{3})$. f) $<1$: $\Theta(n^{2})$.

### G02 · Recurrencias de algoritmos conocidos
nivel: 0.4

Resuelve con el teorema maestro la recurrencia de cada algoritmo:
- a) Mergesort: $T(n)=2T(n/2)+n$
- b) Búsqueda binaria: $T(n)=T(n/2)+1$
- c) Multiplicación de enteros con divide y vencerás sin trucos: $T(n)=4T(n/2)+n$
- d) Karatsuba: $T(n)=3T(n/2)+n$
- e) Multiplicación de matrices con $8$ subproblemas: $T(n)=8T(n/2)+n^{2}$
- f) Strassen: $T(n)=7T(n/2)+n^{2}$

#### Pista
Para cada una calcula $\frac{a}{b^{k}}$. Cuando sea mayor que $1$, el resultado es $n^{\log_ba}$: deja el exponente como un logaritmo y, si quieres, aproxímalo.

#### Solución
**Paso 1. a) y b).** a) $a=2,b=2,k=1$: $\frac{a}{b^{k}}=1$, $\Theta(n\log n)$. b) $a=1,b=2,k=0$: igual a $1$, $\Theta(\log n)$.

**Paso 2. c) y e).** c) $\frac{4}{2}=2>1$: $\Theta(n^{\log_24})=\Theta(n^{2})$. e) $\frac{8}{4}=2>1$: $\Theta(n^{3})$.

**Paso 3. d) y f).** d) $\frac32>1$: $\Theta(n^{\log_23})\approx\Theta(n^{1{,}585})$, mejor que $n^{2}$. f) $\frac74>1$: $\Theta(n^{\log_27})\approx\Theta(n^{2{,}807})$, mejor que $n^{3}$.

**Paso 4. Moraleja.** Con el mismo trabajo de fuera, reducir el número de llamadas $a$ baja el exponente: de $4$ a $3$ subproblemas (Karatsuba), de $8$ a $7$ (Strassen).

### G03 · Cuando la versión simple no sirve
nivel: 0.6

Decide si se puede aplicar la versión simple del teorema maestro ($T(n)=aT(n/b)+cn^{k}$). Si no, di qué hacer, y da el orden:
- a) $T(n)=T(n-1)+n$
- b) $T(n)=2T(n/2)+n\log_2n$
- c) $T(n)=2T(n/2)+\sqrt n$

#### Pista
La versión simple pide un subproblema de tamaño $n/b$ (una división, no una resta) y un trabajo de fuera de la forma $c\,n^{k}$ (una potencia de $n$; $k$ puede ser una fracción). La versión completa admite $\Theta(n^{\log_ba}\log^{k}n)$.

#### Solución
**Paso 1. a).** No: el subproblema es $n-1$, no $n/b$. Se resuelve por expansión: $T(n)=T(n-i)+\sum$, y da $\frac{n(n+1)}{2}+T(0)\in\Theta(n^{2})$.

**Paso 2. b).** No es de la forma $cn^{k}$, por el $\log$. Pero cumple la versión completa, caso 2: $n^{\log_22}=n$ y $f(n)=n\log^{1}n$, con $k=1$ en el logaritmo. Resultado: $\Theta(n\log^{2}n)$.

**Paso 3. c).** Sí: $\sqrt n=n^{1/2}$, así que $k=\frac12$. $\frac{a}{b^{k}}=\frac{2}{\sqrt2}=\sqrt2>1$: $\Theta(n^{\log_22})=\Theta(n)$.

### G04 · La ecuación característica
nivel: 0.4

Una recurrencia lineal homogénea (por ejemplo $T(n)=5T(n-1)-6T(n-2)$) se resuelve con su **ecuación característica**: se sustituye $T(n-j)$ por $x^{k-j}$ en la ecuación pasada a $=0$.

**Ejemplo resuelto.** $T(n)-5T(n-1)+6T(n-2)=0$ da $x^{2}-5x+6=0$, es decir $(x-2)(x-3)=0$. Las raíces son $2$ y $3$ (distintas), luego $T(n)=C_1\,2^{n}+C_2\,3^{n}$, de orden $\Theta(3^{n})$.

**Ahora tú.** Para cada recurrencia escribe la ecuación característica, sus raíces, la forma general de la solución y el orden (sin calcular constantes):
- a) $T(n)=T(n-1)+2T(n-2)$
- b) $T(n)=4T(n-1)-4T(n-2)$
- c) $T(n)=6T(n-1)-11T(n-2)+6T(n-3)$

#### Pista
Pasa todo al lado izquierdo. Si una raíz aparece repetida $m$ veces, sus términos son $C\,r^{n}$, $C\,n\,r^{n}$, ..., hasta $n^{m-1}r^{n}$.

#### Solución
**Paso 1. a).** $x^{2}-x-2=0\Rightarrow(x-2)(x+1)=0$: raíces $2$ y $-1$. $T(n)=C_1\,2^{n}+C_2(-1)^{n}\in\Theta(2^{n})$.

**Paso 2. b).** $x^{2}-4x+4=(x-2)^{2}=0$: raíz doble $2$. $T(n)=(C_1+C_2n)\,2^{n}\in\Theta(n\,2^{n})$.

**Paso 3. c).** $x^{3}-6x^{2}+11x-6=(x-1)(x-2)(x-3)=0$: raíces $1,2,3$. $T(n)=C_1+C_2\,2^{n}+C_3\,3^{n}\in\Theta(3^{n})$.

**Paso 4. Criterio.** Manda la raíz de mayor valor absoluto (y, si se repite, el factor $n^{m-1}$ de más).

### G05 · Hallar las constantes
nivel: 0.5

Resuelve $T(n)=5T(n-1)-6T(n-2)$ con $T(0)=1$ y $T(1)=4$.
- a) Forma general de la solución.
- b) Plantea y resuelve el sistema para las constantes con $T(0)$ y $T(1)$.
- c) Comprueba con $T(2)$ y $T(3)$ calculados con la recurrencia.

#### Pista
Ya tienes la forma del ejemplo anterior: $C_1\,2^{n}+C_2\,3^{n}$. Evalúa en $n=0$ y $n=1$.

#### Solución
**Paso 1. Forma general.** a) $T(n)=C_1\,2^{n}+C_2\,3^{n}$.

**Paso 2. Sistema.** b) $T(0)=C_1+C_2=1$ y $T(1)=2C_1+3C_2=4$. Restando dos veces la primera a la segunda: $C_2=2$, y entonces $C_1=-1$. $T(n)=2\cdot3^{n}-2^{n}$.

**Paso 3. Comprueba.** c) Con la recurrencia: $T(2)=5\cdot4-6\cdot1=14$ y $T(3)=5\cdot14-6\cdot4=46$. La fórmula da $18-4=14$ y $54-8=46$.

### G06 · Raíz doble
nivel: 0.6

Resuelve $T(n)=4T(n-1)-4T(n-2)$ con $T(0)=0$ y $T(1)=2$.
- a) Forma general (raíz doble).
- b) Constantes.
- c) Comprueba con $T(2)$ y $T(3)$.

#### Pista
La ecuación característica es $(x-2)^{2}=0$. Con una raíz doble, la solución lleva $C_1\,2^{n}+C_2\,n\,2^{n}$.

#### Solución
**Paso 1. Forma general.** a) $T(n)=(C_1+C_2n)\,2^{n}$.

**Paso 2. Constantes.** b) $T(0)=C_1=0$. $T(1)=(C_1+C_2)\cdot2=2\Rightarrow C_2=1$. Por tanto $T(n)=n\,2^{n}$.

**Paso 3. Comprueba.** c) $T(2)=4\cdot2-4\cdot0=8=2\cdot4$ y $T(3)=4\cdot8-4\cdot2=24=3\cdot8$. Orden $\Theta(n\,2^{n})$.

### G07 · Raíces distintas, tipo Fibonacci
nivel: 0.65

Resuelve $T(n)=T(n-1)+2T(n-2)$ con $T(0)=0$ y $T(1)=1$.
- a) Ecuación característica y raíces.
- b) Constantes.
- c) Comprueba con $T(2),T(3),T(4)$.
- d) ¿Qué pasa con el término de la raíz negativa cuando $n$ crece?

#### Pista
Las raíces son $2$ y $-1$. Evalúa $C_1\,2^{n}+C_2(-1)^{n}$ en $n=0$ y $n=1$.

#### Solución
**Paso 1. Raíces.** a) $x^{2}-x-2=(x-2)(x+1)$, raíces $2$ y $-1$: $T(n)=C_1\,2^{n}+C_2(-1)^{n}$.

**Paso 2. Constantes.** b) $T(0)=C_1+C_2=0$ y $T(1)=2C_1-C_2=1$. Sumando: $3C_1=1$, $C_1=\frac13$ y $C_2=-\frac13$. $T(n)=\dfrac{2^{n}-(-1)^{n}}{3}$.

**Paso 3. Comprueba.** c) La recurrencia da $T(2)=1$, $T(3)=1+2=3$, $T(4)=3+2=5$. La fórmula: $\frac{4-1}{3}=1$, $\frac{8+1}{3}=3$, $\frac{16-1}{3}=5$.

**Paso 4. Orden.** d) $(-1)^{n}$ solo vale $\pm1$, y no pesa frente a $2^{n}$: $T(n)\in\Theta(2^{n})$.

### G08 · Recurrencias no homogéneas: el polinomio característico
nivel: 0.5

Si la parte derecha no es $0$, se escribe cada término como (polinomio)$\cdot b^{n}$ y cada uno añade un factor $(x-b)^{d+1}$, con $d$ el grado del polinomio. El polinomio característico es el de la parte izquierda por esos factores.

**Ejemplo resuelto.** $T(n)-T(n-1)=2^{n}$: izquierda $(x-1)$; derecha $1\cdot2^{n}$, grado $0$, factor $(x-2)^{1}$. Polinomio: $(x-1)(x-2)$, solución $C_1+C_2\,2^{n}\in\Theta(2^{n})$.

**Ahora tú.** Da el polinomio característico, la forma de la solución y el orden:
- a) $T(n)-2T(n-1)=3^{n}$
- b) $T(n)-T(n-1)=n$
- c) $T(n)-3T(n-1)=n\cdot2^{n}$
- d) $T(n)-2T(n-1)=2^{n}$

#### Pista
En b), $n=n\cdot1^{n}$, con $b=1$ y grado $1$. En d), la base de la parte derecha coincide con la raíz de la izquierda: sale un factor repetido.

#### Solución
**Paso 1. a).** $(x-2)(x-3)$: $C_1\,2^{n}+C_2\,3^{n}\in\Theta(3^{n})$.

**Paso 2. b).** Izquierda $(x-1)$; derecha $n\cdot1^{n}$, factor $(x-1)^{2}$. Polinomio $(x-1)^{3}$: $C_1+C_2n+C_3n^{2}\in\Theta(n^{2})$.

**Paso 3. c).** Izquierda $(x-3)$; derecha $n\cdot2^{n}$, grado $1$, factor $(x-2)^{2}$. Polinomio $(x-3)(x-2)^{2}$: $C_1\,3^{n}+(C_2+C_3n)\,2^{n}\in\Theta(3^{n})$.

**Paso 4. d).** Izquierda $(x-2)$; derecha $2^{n}$, factor $(x-2)$. Polinomio $(x-2)^{2}$: $(C_1+C_2n)\,2^{n}\in\Theta(n\,2^{n})$.

### G09 · Constantes de una recurrencia no homogénea
nivel: 0.6

Resuelve $T(n)=T(n-1)+n$ con $T(0)=0$.
- a) Polinomio característico y forma de la solución.
- b) Calcula $T(1),T(2)$ con la recurrencia y plantea el sistema para las constantes con $T(0),T(1),T(2)$.
- c) Resuelve y compara con lo que sabes de la suma de los $n$ primeros números.

#### Pista
Pasa a $T(n)-T(n-1)=n\cdot1^{n}$: el polinomio es $(x-1)^{3}$, así que hay tres constantes y necesitas tres ecuaciones.

#### Solución
**Paso 1. Forma.** a) $T(n)=C_1+C_2n+C_3n^{2}$.

**Paso 2. Sistema.** b) $T(1)=1$ y $T(2)=3$. Entonces $C_1=0$; $C_2+C_3=1$; $2C_2+4C_3=3$.

**Paso 3. Resuelve.** c) De la segunda $C_2=1-C_3$; en la tercera, $2-2C_3+4C_3=3$, luego $C_3=\frac12$ y $C_2=\frac12$. $T(n)=\dfrac{n^{2}+n}{2}=\dfrac{n(n+1)}{2}$: la suma de Gauss, como se esperaba.

### G10 · Varios términos a la derecha
nivel: 0.65

Da el polinomio característico y el orden (sin constantes) de:
- a) $T(n)=T(n-1)+2^{n}+n$
- b) $T(n)=2T(n-1)-T(n-2)+1$
- c) $T(n)=3T(n-1)-2T(n-2)+n$

#### Pista
Pasa los $T$ a la izquierda y saca la parte izquierda como polinomio en $x$. Después añade un factor $(x-b)^{d+1}$ por cada término de la derecha: $2^{n}$ da $(x-2)$; $n$ da $(x-1)^{2}$; la constante $1$ da $(x-1)$.

#### Solución
**Paso 1. a).** Izquierda $(x-1)$. Derecha: $2^{n}$ aporta $(x-2)$ y $n\cdot1^{n}$ aporta $(x-1)^{2}$. Polinomio $(x-1)^{3}(x-2)$: la raíz $2$ manda, $\Theta(2^{n})$.

**Paso 2. b).** Izquierda $x^{2}-2x+1=(x-1)^{2}$. Derecha: $1$, factor $(x-1)$. Polinomio $(x-1)^{3}$: $C_1+C_2n+C_3n^{2}$, $\Theta(n^{2})$.

**Paso 3. c).** Izquierda $x^{2}-3x+2=(x-1)(x-2)$. Derecha: $n$, factor $(x-1)^{2}$. Polinomio $(x-1)^{3}(x-2)$: $\Theta(2^{n})$.

### G11 · Una recurrencia que salta de dos en dos
nivel: 0.7

Resuelve $T(n)=T(n-2)+3$ con $T(0)=1$, $T(1)=1$.
- a) Polinomio característico: pasa la recurrencia a $T(n)-T(n-2)=3\cdot1^{n}$.
- b) Forma de la solución. ¿Qué raíz inesperada aparece?
- c) Calcula $T(2)$ y resuelve el sistema con $T(0),T(1),T(2)$.
- d) Comprueba con $T(3)$ y $T(4)$.

#### Pista
Izquierda: $x^{2}-1=(x-1)(x+1)$. Derecha: $3\cdot1^{n}$, grado $0$, factor $(x-1)$. La raíz $-1$ da el término $(-1)^{n}$.

#### Solución
**Paso 1. Polinomio.** a) $(x^{2}-1)(x-1)=(x-1)^{2}(x+1)$.

**Paso 2. Forma.** b) $T(n)=C_1+C_2n+C_3(-1)^{n}$. La raíz $-1$ aparece porque la recurrencia salta de dos en dos: los índices pares y los impares van por separado.

**Paso 3. Sistema.** c) $T(2)=T(0)+3=4$. Entonces: $C_1+C_3=1$; $C_1+C_2-C_3=1$; $C_1+2C_2+C_3=4$. Restando la primera de la tercera: $2C_2=3$, $C_2=\frac32$. Después, sumando la primera y la segunda: $2C_1+C_2=2$, $C_1=\frac14$, y $C_3=\frac34$. $T(n)=\dfrac14+\dfrac{3n}{2}+\dfrac34(-1)^{n}\in\Theta(n)$.

**Paso 4. Comprueba.** d) $T(3)=T(1)+3=4$ y la fórmula da $\frac14+\frac92-\frac34=4$. $T(4)=T(2)+3=7$ y la fórmula da $\frac14+6+\frac34=7$.

### G12 · Con constantes, como en el examen
nivel: 0.8

Resuelve $T(n)=2T(n-1)+n$ con $T(0)=1$, hallando las constantes.
- a) Polinomio característico y forma de la solución.
- b) Calcula $T(1),T(2)$ y plantea el sistema de $3$ ecuaciones.
- c) Resuélvelo y comprueba con $T(3)$ y $T(4)$.

#### Pista
Izquierda $(x-2)$. Derecha $n\cdot1^{n}$: factor $(x-1)^{2}$. Polinomio $(x-2)(x-1)^{2}$, solución $C_1\,2^{n}+C_2+C_3n$.

#### Solución
**Paso 1. Forma.** a) $T(n)=C_1\,2^{n}+C_2+C_3n$.

**Paso 2. Sistema.** b) $T(1)=3$ y $T(2)=8$. Entonces: $C_1+C_2=1$; $2C_1+C_2+C_3=3$; $4C_1+C_2+2C_3=8$.

**Paso 3. Resuelve.** c) De la primera $C_2=1-C_1$. En la segunda: $C_1+C_3=2$. En la tercera: $3C_1+2C_3=7$. Con $C_3=2-C_1$ queda $C_1+4=7$, luego $C_1=3$, $C_3=-1$, $C_2=-2$. $T(n)=3\cdot2^{n}-n-2$.

**Paso 4. Comprueba.** $T(3)=2\cdot8+3=19$ y la fórmula da $24-3-2=19$. $T(4)=2\cdot19+4=42$ y la fórmula da $48-4-2=42$. Orden $\Theta(2^{n})$.

### G13 · Pasar a la variable k
nivel: 0.5

Para recurrencias con $n/2$ (o $n/3$...) se hace el cambio $n=2^{k}$ y se define $t(k)=T(2^{k})$. Lo importante es sustituir también el trabajo de fuera.

**Ejemplo resuelto.** $T(n)=4T(n/2)+n$ con $n=2^{k}$: $T(2^{k})=4T(2^{k-1})+2^{k}$, es decir $t(k)=4t(k-1)+2^{k}$. El $n$ de fuera se convierte en $2^{k}$, no en $k$.

**Ahora tú.** Escribe la recurrencia para $t(k)$ con el cambio indicado:
- a) $T(n)=T(n/2)+n$, con $n=2^{k}$
- b) $T(n)=2T(n/2)+n^{2}$, con $n=2^{k}$
- c) $T(n)=9T(n/3)+n$, con $n=3^{k}$
- d) $T(n)=T(n/2)+1$, con $n=2^{k}$

#### Pista
$T(n/2)=T(2^{k-1})=t(k-1)$. Y $n^{2}=(2^{k})^{2}=4^{k}$.

#### Solución
**Paso 1. a).** $t(k)=t(k-1)+2^{k}$.

**Paso 2. b).** $n^{2}=4^{k}$: $t(k)=2t(k-1)+4^{k}$.

**Paso 3. c).** $T(n/3)=T(3^{k-1})=t(k-1)$ y $n=3^{k}$: $t(k)=9t(k-1)+3^{k}$.

**Paso 4. d).** $t(k)=t(k-1)+1$.

### G14 · Resolver con el cambio de variable
nivel: 0.6

Resuelve $T(n)=T(n/2)+n$ con $T(1)=1$ y $n$ potencia de $2$.
- a) Escribe $t(k)$ y su polinomio característico.
- b) Forma general de $t(k)$ y constantes con $t(0)$ y $t(1)$.
- c) Deshaz el cambio para dar $T(n)$ y comprueba con $T(4)$ y $T(8)$.

#### Pista
De G13: $t(k)=t(k-1)+2^{k}$. Izquierda $(x-1)$, derecha $2^{k}$ aporta $(x-2)$. $t(0)=T(1)=1$ y $t(1)=T(2)=T(1)+2=3$.

#### Solución
**Paso 1. Recurrencia en $k$.** a) $t(k)-t(k-1)=2^{k}$. Polinomio $(x-1)(x-2)$.

**Paso 2. Constantes.** b) $t(k)=C_1+C_2\,2^{k}$. $t(0)=C_1+C_2=1$ y $t(1)=C_1+2C_2=3$: $C_2=2$, $C_1=-1$. $t(k)=2\cdot2^{k}-1$.

**Paso 3. Deshaz el cambio.** c) Con $2^{k}=n$: $T(n)=2n-1\in\Theta(n)$. Comprobación: $T(2)=3$, $T(4)=3+4=7=2\cdot4-1$, $T(8)=7+8=15=2\cdot8-1$.

### G15 · Preparar la parte derecha
nivel: 0.65

Para el polinomio característico, cada término de la derecha tiene que ser (polinomio)$\cdot b^{k}$. Escribe el polinomio característico de:
- a) $t(k)-t(k-1)=3^{2k}$
- b) $t(k)-2t(k-1)=1+k+2^{k}$
- c) $t(k)-3t(k-1)=4^{k+1}$

Y, para (b) y (c), traduce el orden a $n$ si $n=2^{k}$.

#### Pista
En a) $3^{2k}=(3^{2})^{k}=9^{k}$. En c) $4^{k+1}=4\cdot4^{k}$. En b) agrupa: $(1+k)\cdot1^{k}+1\cdot2^{k}$.

#### Solución
**Paso 1. a).** La derecha es $9^{k}$: grado $0$, factor $(x-9)$. Polinomio $(x-1)(x-9)$, solución $C_1+C_2\,9^{k}\in\Theta(9^{k})$.

**Paso 2. b).** Izquierda $(x-2)$. Derecha: $(1+k)\cdot1^{k}$, grado $1$, factor $(x-1)^{2}$; y $1\cdot2^{k}$, factor $(x-2)$. Polinomio $(x-2)^{2}(x-1)^{2}$, solución $(C_1+C_2k)\,2^{k}+C_3+C_4k\in\Theta(k\,2^{k})$. Con $n=2^{k}$: $k\,2^{k}=n\log_2n$.

**Paso 3. c).** Izquierda $(x-3)$. Derecha $4\cdot4^{k}$, factor $(x-4)$. Polinomio $(x-3)(x-4)$, solución $C_1\,3^{k}+C_2\,4^{k}\in\Theta(4^{k})$. Con $n=2^{k}$: $4^{k}=n^{2}$.
