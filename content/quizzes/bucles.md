## t31-insert

Q: En el análisis de insert-sort, $t_j$ es...
+ el número de veces que se cumple la condición del `while` (se ejecuta su cuerpo) para un valor concreto de $j$; depende de la entrada.
- el tiempo total del algoritmo.
- el número de elementos del vector.
- una constante que no depende de la entrada.
? Por eso hay que distinguir mejor y peor caso: $t_j$ cambia según el vector.

Q: ¿Cuándo se da el mejor caso de insert-sort y qué orden tiene?
+ Con el vector ya ordenado de menor a mayor ($t_j=0$): $\Theta(n)$.
- Con el vector ordenado de mayor a menor: $\Theta(n)$.
- Con el vector ordenado de menor a mayor: $\Theta(n^2)$.
- Cuando $n$ es par: $\Theta(n\log n)$.
? Cada elemento se compara una vez y no se desplaza nada.

Q: ¿Y el peor caso?
+ Con el vector ordenado de mayor a menor ($t_j=j$): aparece $\sum j=\frac{n(n-1)}2$ y el coste es $\Theta(n^2)$.
- Con el vector ordenado de menor a mayor: $\Theta(n^2)$.
- Con todos los elementos iguales: $\Theta(n^3)$.
- No tiene peor caso.
? Cada elemento debe recorrer toda la parte ya ordenada.

Q: ¿Por qué se suele estudiar el caso peor?
+ Es una cota superior que garantiza que el algoritmo nunca tardará más, y suele ocurrir con frecuencia (por ejemplo, en una búsqueda cuando el elemento no está).
- Porque el mejor caso no existe.
- Porque es el más fácil de calcular siempre.
- Porque el caso medio siempre es menor.
? Además el caso medio suele ser asintóticamente tan malo como el peor.

## t31-general

Q: En un bucle de $n$ iteraciones, ¿cuántas comparaciones se hacen?
+ $n$ más una última para salir del bucle.
- Exactamente $n$.
- $n-1$.
- Una sola.
? $T_{bucle}=1_{inic.}+\sum_{i=1}^{n}(1_{comp.}+T_{cuerpo}+1_{incr.})+1_{última\ comp.}$.

Q: ¿Cómo se plantea el coste de bucles anidados?
+ Se escribe el coste del bucle interno y se sustituye en el sumatorio del externo; los límites del interno pueden depender del contador del externo.
- Se multiplican los números de iteraciones de cada bucle, siempre.
- Se suman los números de iteraciones de cada bucle.
- Sólo se cuenta el bucle más externo.
? Por eso aparecen sumas como $\sum_{j=i+1}^{n}c=c(n-i)$ y hay que resolverlas con las fórmulas de sumatorios.

Q: En el ejemplo de los tres bucles, el `for k in range(0,j)` dentro de un `if`, ¿cuántas vueltas da el bucle más interno?
+ $j$ vueltas (de $k=0$ a $j-1$), y sólo se ejecuta si se cumple la condición del `if`.
- $n$ vueltas siempre.
- $j+1$ vueltas.
- Una vuelta.
? El peor caso es que la condición se cumpla siempre: $T_{If}=3+4j$; el mejor, que no se cumpla nunca: $T_{If}=1$.

Q: En el ejemplo de tres bucles el mejor caso sale $\Theta(n^2)$ y el peor...
+ $\Theta(n^3)$, porque la condición siempre se cumple y el bucle interior añade un factor lineal.
- $\Theta(n^2)$ también.
- $\Theta(n^4)$.
- $\Theta(n)$.
? Mejor y peor caso pueden tener órdenes distintos: hay que calcularlos por separado.
