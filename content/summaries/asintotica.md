## Definiciones (con $n\to\infty$)
| Notación | Significa | Definición: existen $c>0$ y $n_0>0$ tales que, $\forall n\ge n_0$ | Límite $\lim\frac{f(n)}{g(n)}$ |
|---|---|---|---|
| $f\in O(g)$ | $f\le g$ (cota superior) | $0\le f(n)\le c\,g(n)$ | constante finita ($0$ incluido) |
| $f\in\Omega(g)$ | $f\ge g$ (cota inferior) | $0\le c\,g(n)\le f(n)$ | $>0$ (o $\infty$) |
| $f\in\Theta(g)$ | $f= g$ (cota ajustada) | $0\le c_1 g(n)\le f(n)\le c_2 g(n)$ | constante $>0$ |
| $f\in o(g)$ | $f<g$ estricta | | $0$ |
| $f\in\omega(g)$ | $f>g$ estricta | | $\infty$ |

- $f\in\Theta(g)\iff f\in O(g)$ **y** $f\in\Omega(g)$.
- $O(g)$ es un **conjunto** de funciones: lo correcto es $f\in O(g)$ (escribir $f=O(g)$ es un abuso).
- Para que se cumpla basta que **exista** una pareja $(c,n_0)$; si hay una, hay infinitas.

## Cómo demostrarlo
**Con la definición** ($f\in O(g)$):
1. Elige una $c>0$ razonable.
2. Plantea $f(n)\le c\,g(n)$.
3. Busca un intervalo $[n_0,\infty)$ donde se cumpla. Esa pareja $(c,n_0)$ es la prueba.

Para **negarlo** ($f\notin O(g)$): demuestra que, sea cual sea $c$, no hay ningún $[n_0,\infty)$ donde $f\le c\,g$.

**Con límites** (suele ser más rápido): calcula $\lim\frac{f}{g}$ y mira la tabla. Si sale $\frac00$ o $\frac\infty\infty$, aplica L'Hôpital: $\lim\frac{f}{g}=\lim\frac{f'}{g'}$.

## Orden de menor a mayor
$$1<\log n<n<n\log n<n^2<n^3<2^n<n!$$
- Hasta $n^2$: "tratable"; desde $n^3$ y exponenciales: "intratable" ($n^2$ está en el límite).
- $n^p<n^q$ si $p<q$; $n^p<n^p\log n<n^{p+1}$; $n^p<c^n$ si $c>1$.
- Un exponencial es mucho peor que cualquier polinomio, y el factorial peor que el exponencial.

## Reglas para simplificar
- Las constantes no importan: $\Theta(k\,g(n))=\Theta(g(n))$.
- Un polinomio vale su término de mayor grado: $\Theta(a_mn^m+\cdots+a_0)=\Theta(n^m)$.
- La base del logaritmo no importa: $\Theta(\log_b n)=\Theta(\log n)$. **La del exponente sí**: $2^n\neq3^n$ asintóticamente.
- Con dos parámetros ($n$, $m$): quita las constantes y elimina un término sólo si está **contenido** en otro. Ejemplo: $\Theta(3m^2n+m^3+10mn+2n^2)=\Theta(m^2n+m^3+n^2)$, porque $mn\le m^2n$.
- Ejemplos con dos parámetros: mezclar dos listas ordenadas de longitudes $n$ y $m$ cuesta $\Theta(n+m)$.

## Qué recordar (errores típicos)
- $f\in O(g)$ **no** quiere decir que tarde "al menos" $g$: tarda **como mucho** $g$.
- $O$ suele referirse al **peor caso** (una garantía). Una cota siempre va asociada a un tipo de entrada: mejor, peor o medio.
- Pon la cota más ajustada: $2n+5\in O(n)$, aunque también esté en $O(n!)$.
- Que un algoritmo tarde $\Theta(n^2)$ para algunas entradas no significa que lo haga para todas.
- Cuidado con el tamaño de la entrada: procesar los $n$ bits de los $m=2^n$ números es $\Theta(n\,2^n)$ en bits, pero $\Theta(m\log m)$ en números.

## Ordenación
- **Cota inferior:** cualquier ordenación **por comparaciones** necesita $\Omega(n\log n)$ comparaciones en el peor caso. Prueba: el árbol de decisión tiene al menos $n!$ hojas y, como mucho, $2^h$, así que $h\ge\log_2(n!)\in\Omega(n\log n)$.
- $\log(n!)\in\Theta(n\log n)$. Para la cota inferior se usa $\sum_{i=2}^{n}\log i\ge\int_1^n\log x\,dx=n\log n-n+1$.
- **Counting-sort** (enteros en $[0,k]$): $\Theta(n+k)$, es decir, $\Theta(n)$ si $k\in O(n)$. No compara, por eso puede ser lineal.
