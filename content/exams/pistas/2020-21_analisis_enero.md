### Ejercicio 1
Simplifica $2^{\log_3 n}$ a una potencia de $n$ (toma $\log_3$ de ambos lados): queda $n^a$ con $a=\log_3 2$. Compara $a$ con 1 y mira las **dos** cotas que exige $\Theta$ con una constante: ¿se cumple la superior? ¿y la inferior? Si falla una, la afirmación es falsa.

### Ejercicio 2
Calcula de dentro hacia fuera. El bucle interno va de $n$ a $i+1$ decreciendo, así que hace $n-i$ iteraciones (cada una cuesta $1+2+1$). Sustitúyelo en el externo y suma con $\sum_{i=0}^{n-1}(n-i)=\frac{n(n+1)}{2}$.

### Ejercicio 3
(a) Cambio $n=4^k$ y $t(k)=T(4^k)$: queda $t(k)=2t(k-1)+2^k$, con raíz doble $2$; casos base $T(1)$ y $T(4)$. (b) Expande: el factor de $T$ crece como $2^i$ y en cada paso se suma un $\sqrt n$; para y compara con (a).
