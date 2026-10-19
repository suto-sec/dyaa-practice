## Metodología (los 5 pasos)
1. **Tamaño del problema:** lo que determina cuántas operaciones se hacen ($n$, nº de dígitos, longitud de la lista, $n-m+1$ términos...).
2. **Casos base:** las instancias más pequeñas, que se resuelven sin llamadas recursivas (lista vacía, $n=0$, $n<10$...).
3. **Descomposición:** elige subproblemas **del mismo tipo y más pequeños**: $n-1$, $n-2$, $n/2$... Dibuja un diagrama del problema y del subproblema.
4. **Inducción:** supón que ya sabes resolver el subproblema (salto de fe recursivo) y construye la solución del problema a partir de él.
5. **Implementar y probar**, y plantear la recurrencia del coste $T(n)$.

- Piensa en **qué** se resuelve (declarativo), no en cómo cambian las variables paso a paso.
- Una versión "por cola" con acumuladores (`fact2(n, p)`) sale de pensar en valores, no en subproblemas: es una iteración disfrazada.
- No pierdas tiempo con el árbol de llamadas: lo importante es la **regla** que relaciona padre e hijos.

## Tipos de recursividad
| Tipo | Idea |
|---|---|
| Lineal | una sola llamada recursiva ($n!=n\cdot(n-1)!$) |
| Final (por cola) | la llamada es lo último; el resultado va en parámetros: $f(n,a,b)=f(n-1,a+b,a)$ |
| Múltiple | varias llamadas: $F(n)=F(n-1)+F(n-2)$ |
| Mutua | dos funciones que se llaman entre sí |
| Anidada | una llamada dentro de los argumentos de otra: $f(n-1,\,y+f(n-2,0))$ |

## Formas de dividir el problema
| Descomposición | Esquema | Coste típico |
|---|---|---|
| Quitar 1 elemento | $s(n)=s(n-1)+\text{algo}$ | $T(n)=T(n-1)+1\Rightarrow\Theta(n)$ |
| Una mitad, la otra se descarta | búsqueda binaria | $T(n)=T(n/2)+1\Rightarrow\Theta(\log n)$ |
| Las dos mitades | `f(a[:m]) + f(a[m:])` | $T(n)=2T(n/2)+1\Rightarrow\Theta(n)$ |
| Dos subproblemas de tamaño $n-1$ | Hanoi | $T(n)=2T(n-1)+1\Rightarrow\Theta(2^n)$ |

- Con $n/2$ distingue **par e impar**: `n//2` y `n//2 + 1`.
- La recurrencia de coste se plantea igual que la de la función.

## Listas: dos formas de programar
1. Pasar la lista y mirar `len(a)`: usa rebanadas (`a[1:]`, `a[:-1]`, `a[:mitad]`). **Copiar una rebanada cuesta $\Theta(n)$**, lo que puede empeorar el coste total.
2. Pasar la lista **completa** y los límites `inf` y `sup`: no se copia nada. Suele ser más eficiente y algo más difícil.

Esquemas para $s(a)=\sum a_i$:
```python
a[0] + s(a[1:])                 # quita el primero
s(a[:-1]) + a[-1]               # quita el último
s(a[:m]) + s(a[m:])             # divide por la mitad (caso base: 1 elemento)
```
Con límites: caso base `inf > sup` (vacío, devuelve el neutro) y, si divides en dos, también `inf == sup`. La mitad es `(inf + sup) // 2`.

## Dígitos
- Quitar el menos significativo: `n // 10`; el dígito: `n % 10`.
- Suma de dígitos: `s(n) = n` si `n < 10`, y `s(n) = s(n // 10) + n % 10` en otro caso.
- Para ¿contiene dígito $d$?: comprueba `n % 10 == d` y sigue con `n // 10`; caso base: se acabaron los dígitos.

## Plantillas que conviene saber
| Problema | Recurrencia / caso base |
|---|---|
| Suma de los $n$ primeros | $S(n)=n+S(n-1)$, $S(0)=0$ |
| Sumatorio $\sum_{i=m}^{n}g(i)$ | $f=0$ si $m>n$; $g(m)+f(m+1,n)$; tamaño $n-m+1$ |
| Búsqueda binaria | caso base `inf > sup` $\to-1$; compara con `a[mitad]` y sigue en una mitad; $\Theta(\log n)$ |
| Subir escaleras (pasos de 1 o 2) | $f(n)=f(n-1)+f(n-2)$, $f(1)=1$, $f(2)=2$ |
| Caminos por Manhattan | $f(x,y)=f(x-1,y)+f(x,y-1)$, $f=1$ si $x=0$ o $y=0$; vale $\binom{x+y}{x}$ |
| Bisección | para si $f(z)=0$ o $b-a\le2\varepsilon$; $z=(a+b)/2$, sigue en el tramo donde cambia el signo |
| Torres de Hanoi | mover $n-1$ de O a A, mover el disco $n$ de O a D, mover $n-1$ de A a D |

- **Contar (combinatoria):** agrupa lo que cuentas en categorías disjuntas (en las escaleras: las que empiezan con 1 peldaño y las que empiezan con 2) y suma.
- **Hanoi:** $T(n)=2T(n-1)+1$, es decir, $2^n-1$ movimientos (15 para 4 discos). Caso base $n=1$ (o $n=0$, sin movimiento).
- **Hanoi cíclico:** dos funciones que se llaman entre sí (`reloj` y `antireloj`), porque son dos problemas distintos.

## Errores típicos
- Olvidar un caso base, o que la llamada no acerque al caso base (¿termina?).
- No distinguir $n$ par e impar al dividir entre 2.
- Cambiar la firma sin cuidado: las llamadas con `inf`/`sup` deben mantener la misma convención (incluyente) en todas partes.
- Confiar en el árbol de llamadas en vez de en la regla recursiva.
