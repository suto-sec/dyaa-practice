### Ejercicio 1
$\Theta$ exige cota superior e inferior. Pasa $\log_4 n$ a base 2 con el cambio de base: es $\log_2 n$ dividido por una constante. Después busca dos constantes $C_1$, $C_2$ que acoten por abajo y por arriba.

### Ejercicio 2
Separa el sumatorio en términos independientes. Los que no dependen de $i$ (como $1$, $j$, $nj$) se multiplican por $j$; saca fuera las constantes y usa $\sum i$, $\sum i^2$ y la suma geométrica $\sum 4^i$. Reagrupa al final.

### Ejercicio 3
La función $e^x$ es creciente, así que puedes acotar la suma por integrales: la integral entre $m-1$ y $n$ es cota inferior y la de $m$ a $n+1$ es cota superior (ajusta los límites a $j=0..n-1$). También sirve la serie geométrica.

### Ejercicio 4
Cambio de variable $n=4^k$ (entonces $\log_2 n=2k$) y $t(k)=T(4^k)$: queda $t(k)=2t(k-1)+2k$. El polinomio característico es $(x-2)(x-1)^2$. Necesitas tres casos base: $T(1)$, $T(4)$ y $T(16)$.

### Ejercicio 5
Expande y verás que el factor de $T$ crece como $2^i$ mientras el argumento se divide por $4^i$, y que en cada paso se añade un $\sqrt n$. Termina cuando $n=4^i$ y observa que $2^i=\sqrt n$.
