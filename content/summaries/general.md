## Teorema maestro, versión completa
Para $T(n)=aT(n/b)+f(n)$ con $a>0$, $b>0$ y $f$ asintóticamente positiva. Se compara $f(n)$ con $n^{\log_b a}$:
| Caso | Condición | Resultado |
|---|---|---|
| 1 | $f(n)=O\left(n^{\log_b a-\epsilon}\right)$, $\epsilon>0$ | $T(n)\in\Theta\left(n^{\log_b a}\right)$ |
| 2 | $f(n)=\Theta\left(n^{\log_b a}\log^k n\right)$, $k\ge0$ | $T(n)\in\Theta\left(n^{\log_b a}\log^{k+1}n\right)$ |
| 3 | $f(n)=\Omega\left(n^{\log_b a+\epsilon}\right)$, $\epsilon>0$, **y** $a\,f(n/b)\le c\,f(n)$ con $c<1$ | $T(n)\in\Theta(f(n))$ |

- Versión simple ($f=c\,n^k$): comparar $a$ con $b^k$ (menor: $\Theta(n^k)$; igual: $\Theta(n^k\log n)$; mayor: $\Theta(n^{\log_b a})$).
- El caso 3 exige la condición de regularidad.
- No cubre todo: si $f$ cae entre los casos (por ejemplo $f=n^{\log_b a}/\log n$), no se puede aplicar.

## Recurrencias lineales homogéneas
$a_0T(n)+a_1T(n-1)+\cdots+a_kT(n-k)=0$
1. **Ecuación característica:** $a_0x^k+a_1x^{k-1}+\cdots+a_k=0$.
2. **Raíces distintas** $r_1,\dots,r_k$: $T(n)=C_1r_1^n+\cdots+C_kr_k^n$.
3. **Raíz $r$ de multiplicidad $m$:** aporta $C_1r^n+C_2n\,r^n+\cdots+C_m n^{m-1}r^n$.
4. Las constantes $C_i$ salen de las **condiciones iniciales** (un sistema de ecuaciones).

Ejemplos:
- Fibonacci: $x^2-x-1=0$, $r=\frac{1\pm\sqrt5}{2}$, $T(n)=\frac1{\sqrt5}\left(\frac{1+\sqrt5}2\right)^n-\frac1{\sqrt5}\left(\frac{1-\sqrt5}2\right)^n\in\Theta\left(\left(\frac{1+\sqrt5}{2}\right)^n\right)$ (la base es $\approx1{,}618<2$).
- $T(n)=5T(n-1)-8T(n-2)+4T(n-3)$: $x^3-5x^2+8x-4=(x-2)^2(x-1)$, así que $T(n)=C_12^n+C_2n2^n+C_31^n$.

## Recurrencias no homogéneas
$a_0T(n)+\cdots+a_kT(n-k)=b_1^nP_1(n)+\cdots+b_s^nP_s(n)$, con $d_i=$ grado de $P_i$.

**Ecuación característica:**
$$(a_0x^k+\cdots+a_k)\,(x-b_1)^{d_1+1}\cdots(x-b_s)^{d_s+1}=0$$
- Un término $n$ (polinomio de grado 1, $b=1$) añade $(x-1)^2$. Un término $2^n$ añade $(x-2)$. Una constante añade $(x-1)$.
- **Saca factor común** de las potencias: $2+k^3+2^k+k2^k=(2+k^3)\,1^k+(1+k)\,2^k$, que da $(x-1)\cdot(x-1)^{3+1}(x-2)^{1+1}=(x-1)^5(x-2)^2$ (el primer $(x-1)$ es el de la parte homogénea).
- Si $b$ ya es raíz de la parte homogénea, las multiplicidades **se suman** (por ejemplo $(x-2)(x-2)=(x-2)^2$).
- Ejemplo: $T(n)=2T(n-1)+n+2^n$ da $(x-2)^2(x-1)^2$, así que $T(n)=C_12^n+C_2n2^n+C_3+C_4n\in\Theta(n2^n)$.
- Número de constantes = grado del polinomio característico. Para hallarlas calcula tantos valores $T(0),T(1),\dots$ como constantes haya.
- Otro ejemplo: $T(n)-2T(n-1)=n\Rightarrow(x-2)(x-1)^2=0\Rightarrow\Theta(2^n)$.

## Cambio de variable
Para recurrencias con $T(n/2)$, que no son de la forma $T(n-1)$:
1. Pon $n=2^k$ y define $t(k)=T(2^k)$.
2. Transforma la recurrencia **con cuidado**: $T(n)=4T(n/2)+n$ pasa a $t(k)=4t(k-1)+2^k$ (no $+k$).
3. Resuelve $t(k)$ con el método general.
4. Deshaz el cambio con $2^k=n$: $4^k=n^2$.
- Ejemplo: $(x-4)(x-2)=0$, $t(k)=C_14^k+C_22^k$, así que $T(n)=C_1n^2+C_2n$; con $T(1)=1$, $T(2)=6$ sale $T(n)=2n^2-n\in\Theta(n^2)$.
- Conviene que la parte derecha tenga la forma $b^k$: $3^{2k}=9^k$.

## Qué recordar
- Comprueba que el resultado satisface la recurrencia (y los casos base).
- Si el miembro derecho es $0$, la recurrencia es homogénea: basta con la ecuación característica.
- Compara los métodos: la expansión resuelve un subconjunto; el método general resuelve más (lineales con coeficientes constantes).
- Para decidir el orden basta con la raíz **mayor** y su multiplicidad: se queda el término dominante (por ejemplo $n2^n$ sobre $2^n$).
- Espacio de un algoritmo recursivo: depende de la profundidad máxima de la pila (con Fibonacci, $\Theta(n)$) y de lo que reserve cada llamada.
