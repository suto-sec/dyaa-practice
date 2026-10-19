## Plantear la recurrencia
- Elige el **tamaño del problema** $n$ (el exponente, la longitud de la lista, el número de dígitos...).
- Caso base: operaciones cuando $n$ es el valor mínimo. Caso recursivo: operaciones propias **más** el coste de las llamadas.
- Ejemplo (`pot1`): $T(n)=\begin{cases}3 & n=0\\5+T(n-1) & n>0\end{cases}$.
- Si el parámetro se divide a la mitad (`pot2`) puedes suponer $n=2^x$: el orden sale igual.

## Expansión de recurrencias
1. Sustituye $T$ por su definición **dos o tres veces** y simplifica.
2. Descubre el patrón en el paso $i$-ésimo: por ejemplo $T(n)=5i+T(n-i)$.
3. Calcula cuándo se llega al caso base ($n-i=0\Rightarrow i=n$; $n/2^i=1\Rightarrow i=\log_2 n$).
4. Sustituye ese $i$ y simplifica. Da el orden con $\Theta$.

## Soluciones que conviene reconocer
| Recurrencia | Solución | Orden |
|---|---|---|
| $T(n)=b+T(n-1)$, $T(0)=a$ | $bn+a$ | $\Theta(n)$ |
| $T(n)=b+T(n-1)$, $T(1)=a$ | $b(n-1)+a$ | $\Theta(n)$ |
| $T(n)=b+T(n/2)$, $T(1)=a$ | $b\log_2 n+a$ | $\Theta(\log n)$ |
| $T(n)=b+T(n/2)$, $T(0)=a$ | $b\log_2 n+b+a$ | $\Theta(\log n)$ |
| $T(n)=bn+c+T(n-1)$, $T(0)=a$ | $\frac b2n^2+\left(c+\frac b2\right)n+a$ | $\Theta(n^2)$ |
| $T(n)=bn+c+2T(n/2)$, $T(0)=a$ | $bn\log_2 n+(2c+b+2a)n-c$ | $\Theta(n\log n)$ |
| $T(n)=aT(n-1)$ (con $a>1$) | $a^n\cdot T(0)$ | exponencial |

## Intuición para comprobar el resultado
- Restar 1 por llamada con trabajo constante: $n$ veces, así que $\Theta(n)$.
- Restar 1 por llamada con trabajo $\propto n$: $n+(n-1)+\cdots+1$, así que $\Theta(n^2)$.
- Dividir entre 2 con una sola llamada y trabajo constante: $\log_2 n$ veces, así que $\Theta(\log n)$.
- Dos llamadas con $n/2$ y trabajo $\propto n$: $n$ operaciones en $1+\log_2 n$ niveles, así que $\Theta(n\log n)$ (el árbol de llamadas lo muestra).
- Un árbol de recursión suma, nivel a nivel, el trabajo de cada nivel.

## Teorema maestro (versión simple)
Para $T(n)=aT(n/b)+c\,n^k$ con $T(1)=d$:
| Si... | Entonces |
|---|---|
| $a<b^k$ ($a/b^k<1$) | $\Theta(n^k)$ |
| $a=b^k$ | $\Theta(n^k\log n)$ |
| $a>b^k$ | $\Theta(n^{\log_b a})$ |

Útil: $n^{\log_b a}=a^{\log_b n}$.

## Errores frecuentes
- **No comprobar** que la fórmula final cumple la recurrencia inicial (prueba con $n=0$, $1$, $2$).
- **Hacer mal la primera expansión**: es el fallo más habitual. Sustituye con paréntesis y no simplifiques de más hasta ver el patrón.
- **No simplificar** los términos: el patrón se vuelve ilegible.
- Confundir el caso base: $T(0)$ y $T(1)$ dan constantes distintas.
- Con $n/2$ nunca se llega a 0 con enteros: para al llegar a $T(1)$.
