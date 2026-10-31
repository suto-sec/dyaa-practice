### Ejercicio 1
Reescribe $2^{\ln n}$ con la base $e$ para dejarlo como una potencia de $n$: $2^{\ln n}=n^{\ln 2}$. Compara el exponente con 1 y busca $c$ y $n_0$.

### Ejercicio 2
Piensa en el peor caso: la condición se cumple siempre. Calcula de dentro hacia fuera: bucle en $k$ (depende de $j$), bucle en $j$ (depende de $i$), bucle en $i$. Cada nivel suma 1 operación de inicialización, 1 de última comparación y, por iteración, comparación e incremento.

### Ejercicio 3
Expande $T(n)$ varias veces y observa qué se acumula: en cada paso aparece un término $2^{n-j}$ y un $1$. Llega hasta $T(0)=0$ y suma una serie geométrica más $n$ unos.

