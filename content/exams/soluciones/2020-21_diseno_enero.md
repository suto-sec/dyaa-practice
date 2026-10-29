# Soluciones propuestas (ejercicios sin solución oficial)

### Ejercicio 1
**Paso 1. Tamaño y caso base.** El tamaño es `len(a)`. Con menos de dos elementos no hay ninguna pareja consecutiva: lista vacía.

**Paso 2. Caso recursivo.** La primera suma es $a_0+a_1$ y el resto son las sumas consecutivas de la lista sin su primer elemento (`a[1:]`).

**Paso 3. Código.**
```python
def sumas_consecutivas(a):
    if len(a) < 2:
        return []
    return [a[0] + a[1]] + sumas_consecutivas(a[1:])
```

**Paso 4. Comprobación y coste.** Con $a=[1,5,10,-2,1]$: $[6]+[15]+[8]+[-1]=[6,15,8,-1]$. Cada llamada copia la lista (`a[1:]` y la concatenación), así que el coste es $\Theta(n^2)$. Si importa, se evita pasando un índice $i$ en lugar de recortar la lista.

### Ejercicio 2
**Paso 1. Idea clave.** Como los enteros están ordenados y son **distintos**, cada uno es al menos el anterior más 1: $a[i+1]\ge a[i]+1$. Entonces $g(i)=a[i]-i$ no decrece.

**Paso 2. Qué se deduce.** Mira el centro $m$:
- $a[m]=m$: encontrado.
- $a[m]>m$ ($g(m)>0$): para todo $j>m$ se cumple $g(j)\ge g(m)>0$, no hay punto fijo a la derecha. Se busca a la izquierda.
- $a[m]<m$ ($g(m)<0$): para todo $j<m$ se cumple $g(j)\le g(m)<0$. Se busca a la derecha.

**Paso 3. Código.**
```python
def punto_fijo(a, ini, fin):
    if ini > fin:
        return -1
    m = (ini + fin) // 2
    if a[m] == m:
        return m
    if a[m] > m:
        return punto_fijo(a, ini, m - 1)
    return punto_fijo(a, m + 1, fin)
# llamada inicial: punto_fijo(a, 0, len(a) - 1)
```

**Paso 4. Comprobación y coste.** Con $a=[-3,-1,0,2,4,5,13]$: $m=3$, $a[3]=2<3$, se busca en $[4,6]$; $m=5$, $a[5]=5$: devuelve $5$. Una sola llamada por nivel y rango dividido por 2: $T(n)=T(n/2)+\Theta(1)\in\Theta(\log n)$.

### Ejercicio 3
**Paso 1. Árbol.** Para cada objeto $i$ hay dos opciones: meterlo en la mochila o no. La solución parcial es `sol[i]` (booleano) y se lleva el `peso` acumulado.

**Paso 2. Variables auxiliares.** `peso` (suma de lo metido) y `resto` (suma de los pesos de los objetos $i,\dots,n-1$ que quedan por decidir) se actualizan en $O(1)$ al bajar, sin recalcular sumas.

**Paso 3. Podas.**
- Si `peso > C` no cabe y no cabrá más: se corta.
- Si `peso + resto <= mejor`: ni metiendo todo lo que queda se mejora lo ya hallado: se corta.

**Paso 4. Código.** `mejor` es una lista `[peso, solución]`. Empieza en `[0, [False]*n]`: la mochila vacía es una solución válida de peso $0$.
```python
def mochila(i, peso, resto, p, C, sol, mejor):
    if peso > C:
        return
    if peso + resto <= mejor[0]:
        return
    if i == len(p):                  # aquí peso > mejor[0] y peso <= C
        mejor[0] = peso
        mejor[1] = sol.copy()
        return
    sol[i] = True                    # meterlo
    mochila(i + 1, peso + p[i], resto - p[i], p, C, sol, mejor)
    sol[i] = False                   # no meterlo
    mochila(i + 1, peso, resto - p[i], p, C, sol, mejor)

def mochila_wrapper(p, C):
    mejor = [0, [False] * len(p)]
    mochila(0, 0, sum(p), p, C, [False] * len(p), mejor)
    return mejor                     # [peso total, objetos metidos]
```

**Paso 5. Por qué es correcto y coste.** En una hoja el peso no supera $C$ y ha pasado la poda del mejor, luego es estrictamente mejor y se guarda. Se asume que los pesos no son negativos (así `peso` sólo crece y `resto` sólo disminuye). En el peor caso $O(2^n)$, pero las dos podas reducen el árbol en la práctica; probar primero "meterlo" encuentra pronto soluciones buenas.
