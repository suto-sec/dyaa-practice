### Ejercicio 1
Escribe la desigualdad de la definición de $O$ con una constante $c>1$ (por ejemplo, 2), pasa todo a un lado y factoriza el polinomio que queda (Ruffini: prueba con raíces enteras pequeñas). Comprueba para qué $n$ es positivo el producto de factores.

### Ejercicio 2
Aplica la fórmula del enunciado de dentro hacia fuera. El bucle interno recorre $j=0..2i-1$, es decir, $2i$ iteraciones, con cuerpo de 2 operaciones. Sustituye su coste en el externo (que va de 1 a $n-1$) y resuelve con $\sum i=\frac{(n-1)n}{2}$.

### Ejercicio 3
Expande tres o cuatro pasos: el factor de $T$ crece como $3^i$ y lo que se acumula delante de $n^2$ es una serie geométrica de razón $1/3$. Termina en $n=3^i$ y usa $T(1)=0$.

### Ejercicio 4
Cambio de variable $n=3^k$ y $t(k)=T(3^k)$: queda $t(k)=3t(k-1)+9^k$. Las raíces características son 3 y 9. Necesitas dos casos base: $T(1)$ y $T(3)$. Compara el resultado con el del ejercicio anterior.
