## t32-maestro

Q: Para $T(n)=aT(n/b)+c\,n^k$, ¿qué resultado da el teorema maestro simple si $a<b^k$?
+ $\Theta(n^k)$
- $\Theta(n^{\log_ba})$
- $\Theta(n^k\log n)$
- $\Theta(a^n)$
? Domina el trabajo de la raíz; si $a=b^k$ sale $\Theta(n^k\log n)$ y si $a>b^k$ sale $\Theta(n^{\log_ba})$.

Q: Aplica el teorema maestro a $T(n)=3T(n/2)+n$.
+ $\Theta(n^{\log_23})$, porque $a=3>b^k=2$.
- $\Theta(n)$, porque $a<b^k$.
- $\Theta(n\log n)$, porque $a=b^k$.
- $\Theta(n^2)$.
? Aquí $a=3$, $b=2$, $k=1$: gana el término de las hojas.

Q: En el caso 3 del teorema maestro completo, además de $f(n)=\Omega(n^{\log_ba+\epsilon})$, ¿qué se exige?
+ La condición de regularidad: $a\,f(n/b)\le c\,f(n)$ para alguna $c<1$ y $n$ suficientemente grande.
- Que $f$ sea derivable.
- Que $a=b$.
- Que $f(n)=n^k$.
? Sin esa condición el caso 3 no puede aplicarse.

Q: ¿Cuál es el error frecuente que el tema señala al expandir recurrencias?
+ No comprobar que la fórmula final es análoga a la recurrencia inicial, hacer mal la primera expansión y no simplificar.
- Usar demasiadas expansiones.
- Aplicar el teorema maestro antes que la expansión.
- Elegir un caso base distinto.
? Conviene verificar el resultado con valores pequeños.

## t32-homogeneas

Q: ¿Cuál es la ecuación característica de $T(n)=T(n-1)+T(n-2)$?
+ $x^2-x-1=0$
- $x^2+x+1=0$
- $x^2-2x=0$
- $x-2=0$
? Se pasa todo a la izquierda, $T(n)-T(n-1)-T(n-2)=0$, y se sustituye $T(n-j)$ por $x^{k-j}$.

Q: Si todas las raíces $r_1,\dots,r_k$ de la ecuación característica son distintas, la solución es...
+ $T(n)=C_1r_1^n+\cdots+C_kr_k^n$, y las $C_i$ salen de las condiciones iniciales.
- $T(n)=r_1+\cdots+r_k$.
- $T(n)=C\cdot n^k$.
- $T(n)=r_1^{C_1}\cdots r_k^{C_k}$.
? Cada raíz aporta una exponencial $r_i^n$.

Q: El polinomio $x^3-5x^2+8x-4=(x-2)^2(x-1)$ tiene la raíz 2 doble. ¿Qué forma tiene $T(n)$?
+ $C_12^n+C_2\,n\,2^n+C_31^n$
- $C_12^n+C_22^n+C_31^n$
- $C_12^n+C_2n^2+C_3$
- $(C_1+C_2+C_3)\,2^n$
? Una raíz de multiplicidad $m$ aporta $C_1r^n+C_2n\,r^n+\cdots+C_mn^{m-1}r^n$.

Q: ¿Qué orden de crecimiento tiene Fibonacci y por qué es menor que $2^n$?
+ $\Theta\left(\left(\frac{1+\sqrt5}{2}\right)^n\right)$: exponencial con base $\approx1{,}618<2$, porque el árbol de recursión está podado.
- $\Theta(n^2)$, porque tiene dos llamadas.
- $\Theta(2^n)$ exactamente.
- $\Theta(n\log n)$.
? El segundo sumando $\left(\frac{1-\sqrt5}2\right)^n$ tiende a 0.

## t32-no-homogeneas

Q: Para $T(n)-2T(n-1)=n$ (con $b=1$, polinomio de grado $d=1$), ¿cuál es la ecuación característica?
+ $(x-2)(x-1)^2=0$
- $(x-2)(x-1)=0$
- $(x-2)\,x=0$
- $(x-2)(x-1)^3=0$
? Cada término $b^nP(n)$ añade el factor $(x-b)^{d+1}$.

Q: ¿Qué ecuación característica tiene $T(n)=2T(n-1)+n+2^n$?
+ $(x-2)^2(x-1)^2=0$, porque $2^n$ añade $(x-2)$, que se suma a la raíz $2$ de la parte homogénea.
- $(x-2)(x-1)(x-2)=0$ con tres raíces distintas.
- $(x-2)(x-1)^3=0$
- $x^2-3x=0$
? Las multiplicidades se suman; por eso aparecen $n2^n$ y $n$ en la solución.

Q: En $t(k)-t(k-1)=2+k^3+2^k+k2^k$ hay que sacar factor común de las potencias. ¿Cuál es la agrupación correcta?
+ $(2+k^3)\,1^k+(1+k)\,2^k$
- $(2+k^3+k)\,1^k+2^k$
- $2^k\,(2+k^3+1+k)$
- $2+k^3+(1+k)2^k$ sin más
? Eso da $(x-1)(x-1)^4(x-2)^2=(x-1)^5(x-2)^2$.

Q: ¿Cuántas constantes $C_i$ hay que hallar, y cómo?
+ Tantas como el grado de la ecuación característica; se calculan valores $T(0),T(1),\dots$ y se plantea un sistema.
- Una sola, con el caso base.
- Tantas como términos tiene la derecha.
- No hacen falta para el orden ni para la solución exacta.
? Para el orden de crecimiento basta saber qué término domina (por ejemplo $n2^n$ sobre $2^n$).

## t32-cambio

Q: En $T(n)=4T(n/2)+n$ se hace $n=2^k$ y $t(k)=T(2^k)$. ¿Cuál es la nueva recurrencia?
+ $t(k)=4t(k-1)+2^k$
- $t(k)=4t(k-1)+k$
- $t(k)=4t(k/2)+2^k$
- $t(k)=2t(k-1)+k$
? Error frecuente: escribir $+k$ en vez de $+2^k$; $n$ se sustituye por $2^k$.

Q: Resuelta $t(k)$, ¿cómo se deshace el cambio de variable para dar $T(n)$?
+ Con $2^k=n$: por ejemplo $4^k=(2^k)^2=n^2$.
- Sustituyendo $k=n$.
- Derivando respecto a $k$.
- No hace falta deshacerlo.
? Así $T(n)=C_1n^2+C_2n$ y con los casos base $T(n)=2n^2-n$.

Q: En $t(k)-t(k-1)=3^{2k}$ no hay una potencia del tipo $b^k$. ¿Qué hay que hacer?
+ Transformar $3^{2k}=(3^2)^k=9^k$.
- Derivar ambos lados.
- Ignorar el término.
- Sustituir $k$ por $\log 3$.
? Hay que escribir la derecha con la forma $b^kP(k)$ para poder obtener el polinomio característico.

## t32-espacio

Q: En un algoritmo recursivo, ¿qué determina su coste en **espacio**?
+ La profundidad del árbol de llamadas (lo que crece la pila) y los recursos de cada llamada: parámetros, variables locales y memoria dinámica.
- Sólo el número total de llamadas.
- Sólo el tamaño del código.
- Nada: la recursión no usa memoria.
? Cada llamada activa ocupa un registro en la pila.

Q: El estado de la pila durante $F_5$ (Fibonacci) tiene como altura máxima...
+ 4 niveles ($F_5,F_4,F_3,F_2$), es decir, $\Theta(n)$.
- $2^5$ niveles.
- Un solo nivel.
- $F_5$ niveles.
? La pila sólo contiene una rama del árbol, aunque el árbol completo tenga muchos más nodos; el espacio es $\Theta(n)$.

Q: ¿Qué ocurre con la pila cuando una función retorna?
+ Se elimina su registro: la pila crece en cada llamada y decrece al retornar.
- Se conserva hasta el final del programa.
- Se copia al montículo.
- Se duplica.
? El recorrido del árbol de llamadas es en profundidad.
