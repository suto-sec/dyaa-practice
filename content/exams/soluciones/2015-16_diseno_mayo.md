# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1
**Paso 1. (a) Tamaño del problema.** El número de cifras de $n$.

**Paso 2. (b) Caso base.** $n<10$ (una sola cifra): tiene un dígito impar si y sólo si $n$ es impar. Con $n=0$ da `false`, correcto, porque $0$ es par.

**Paso 3. (c) Subproblema.** $n/10$ (división entera): el mismo número sin su última cifra, con una cifra menos.

**Paso 4. (d) Caso recursivo y diagrama.** Con $n\ge10$, el número tiene un dígito impar si lo es la última cifra (que es impar si y sólo si $n$ lo es) o si lo tiene el resto. Ejemplo con $4082$, que no tiene ninguno:
```
tieneDigitoImpar(4082) = (4082 impar? no) o tieneDigitoImpar(408)
tieneDigitoImpar(408)  = (408 impar?  no) o tieneDigitoImpar(40)
tieneDigitoImpar(40)   = (40 impar?   no) o tieneDigitoImpar(4)
tieneDigitoImpar(4)    = caso base: 4 impar? no  ->  false
```
Con $4821$ basta la primera comprobación: acaba en $1$ y ya devuelve `true` sin llamar a nadie (la $\lor$ es perezosa).

**Paso 5. Código (Java).**
```java
static boolean tieneDigitoImpar(int n) {
    if (n < 10)
        return n % 2 == 1;
    return n % 2 == 1 || tieneDigitoImpar(n / 10);
}
```

**Paso 6. Coste.** Una llamada por cifra como máximo: $O(\log_{10} n)$.

### Ejercicio 2
**Paso 1. Idea.** El vector son pares seguidos de impares, así que la propiedad "es par" es monótona (verdadera y luego falsa). Se busca el último índice donde es verdadera con una búsqueda binaria.

**Paso 2. Casos.** Sea $m$ el índice central de $[ini,fin]$.
- Rango vacío ($ini>fin$): no hay pares, devuelve $-1$.
- $v_m$ par: el último par está en $m$ o a su derecha. Se busca en $[m+1,fin]$; si no hay ninguno (devuelve $-1$), el resultado es $m$.
- $v_m$ impar: todos los de la derecha también son impares, se busca en $[ini,m-1]$.

**Paso 3. Código (Java).** Se comprueba `% 2 == 0` y no `== 1` porque en Java `-15 % 2` vale $-1$.
```java
static int ultimoPar(int[] v, int ini, int fin) {
    if (ini > fin)
        return -1;
    int m = (ini + fin) / 2;
    if (v[m] % 2 == 0) {
        int r = ultimoPar(v, m + 1, fin);
        return r == -1 ? m : r;
    }
    return ultimoPar(v, ini, m - 1);
}
// llamada inicial: ultimoPar(v, 0, v.length - 1)
```

**Paso 4. Comprobación y coste.** Con $v=[2,-4,10,8,0,12,9,3,-15,3,1]$: $m=5$, $v_5=12$ par, se mira $[6,10]$; $m=8$, $v_8=-15$ impar, $[6,7]$; $m=6$, $v_6=9$ impar, $[6,5]$ vacío: $-1$. Vuelve al nivel de $m=5$ con $r=-1$ y devuelve $5$. En cada nivel hay una sola llamada y el rango se divide por 2: $T(n)=T(n/2)+\Theta(1)\in\Theta(\log n)$.

### Ejercicio 4
**Paso 1. Solución parcial.** `p[0..m-1]` son los elementos ya colocados y `usado[x]` dice si $x$ ya está en `p`. Los candidatos del nivel `m` son los elementos no usados. El árbol tiene $n!$ hojas sin poda.

**Paso 2. Sin variables globales.** La mejor permutación y su valor se pasan como parámetros: `mejorP` (vector de salida) y `mejorV` (vector de un elemento, para que el valor se pueda modificar y ver desde fuera).

**Paso 3. Poda.** Como $f(m,p,w)\le f(k,p,w)$ si $m<k$, el valor de una solución parcial es una cota inferior del de cualquier permutación que la complete. Si ya es $\ge$ que el mejor valor, no puede mejorarlo y se corta. Como $f\le m^3\le n^3$, empezar con `mejorV = n^3 + 1` hace que la primera permutación completa se acepte.

**Paso 4. Código (Java).**
```java
static void permOptima(int m, int[] p, boolean[] usado, int[] w,
                       int[] mejorP, int[] mejorV) {
    int n = p.length;
    if (m == n) {                         // aquí f(m) < mejorV por la poda
        mejorV[0] = funcionObjetivo(m, p, w);
        System.arraycopy(p, 0, mejorP, 0, n);
        return;
    }
    for (int x = 0; x < n; x++) {
        if (!usado[x]) {
            usado[x] = true;
            p[m] = x;
            if (funcionObjetivo(m + 1, p, w) < mejorV[0])   // poda
                permOptima(m + 1, p, usado, w, mejorP, mejorV);
            usado[x] = false;
        }
    }
}

static int[] mejorPermutacion(int[] w) {
    int n = w.length;
    int[] mejorP = new int[n];
    int[] mejorV = { n * n * n + 1 };
    permOptima(0, new int[n], new boolean[n], w, mejorP, mejorV);
    return mejorP;
}
```

**Paso 5. Por qué es correcto y coste.** Sólo se baja a un nivel si el valor parcial es estrictamente menor que el mejor conocido, así que en una hoja el valor ya es menor y se actualiza sin volver a comprobarlo. Si se cortara una rama con valor $\ge$ al mejor, ninguna de sus hojas podría ser mejor, así que nunca se pierde el óptimo. En el peor caso (sin podas útiles) sigue siendo $O(n!)$, pero la poda lo reduce mucho cuando $f$ crece deprisa.
