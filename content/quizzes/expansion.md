## t32-expansion

Q: ¿Qué significa **resolver** una recurrencia?
+ Dar una fórmula no recursiva equivalente; por ejemplo $T(n)=5+T(n-1)$, $T(0)=3$ se resuelve con $T(n)=5n+3$.
- Calcular $T(n)$ para un valor de $n$.
- Programar la función recursiva.
- Escribirla en forma de bucle.
? Tras resolverla se puede dar su orden de crecimiento.

Q: En la expansión de $T(n)=5+T(n-1)$ se llega a $T(n)=5i+T(n-i)$. ¿Cuánto vale $i$ en el caso base $T(0)$?
+ $i=n$, y se obtiene $T(n)=5n+T(0)$.
- $i=0$.
- $i=\log_2n$.
- $i=5$.
? Se llega al caso base cuando el argumento llega a 0: $n-i=0$.

Q: ¿Por qué se supone $n=2^x$ al analizar `pot2` (la que hace `pot2(b*b, e//2)`)?
+ Porque así $n$ siempre es par y se puede dividir exactamente; el orden obtenido es el mismo.
- Porque la función sólo funciona con potencias de 2.
- Porque así el coste es siempre constante.
- Porque $n$ impar no tiene coste.
? Si el argumento se divide por 2, se llega a $T(1)$ con $i=\log_2n$ y sale $\Theta(\log n)$.

Q: ¿Cuál es la solución de $T(n)=b+T(n/2)$ con $T(1)=a$?
+ $T(n)=b\log_2n+a\in\Theta(\log n)$
- $T(n)=bn+a$
- $T(n)=b\,n\log_2n$
- $T(n)=a+b$
? Se divide $n$ por 2 en cada llamada y se hace trabajo constante: $\log_2n$ veces.

Q: ¿Cuál es el orden de $T(n)=bn+c+2T(n/2)$?
+ $\Theta(n\log n)$: se hacen $n$ operaciones $1+\log_2n$ veces.
- $\Theta(n)$
- $\Theta(n^2)$
- $\Theta(\log n)$
? El árbol de recursión suma, en cada uno de sus $1+\log_2n$ niveles, un trabajo del orden de $n$.
