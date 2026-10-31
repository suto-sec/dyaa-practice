### Ejercicio 1
Simplifica primero lo que sea igual (constantes y bases de logaritmos no cuentan; $\log n^2=2\log n$). Luego ordena por familias: logarítmicas, lineales, $n\log n$, $n^{1+a}$ con $0<a<1$, cuadráticas. ¿Dónde cae $n^{1+a}$ respecto a $n\log n$ y a $n^2$?

### Ejercicio 2
Descompón de fuera a dentro con la fórmula de los bucles. La clave está en el `if`: cuesta 1 si no se cumple y 1 más el bucle de $k$ si se cumple, así que hay mejor y peor caso. Los sumatorios de $j$ empiezan en $i+1$.

### Ejercicio 3
Cambio de variable $n=4^k$ (así $n^2=16^k$) y $t(k)=T(4^k)$: queda $t(k)=t(k-1)+16^k$. Las raíces características son $1$ y $16$. Necesitas un segundo caso base, $T(4)$, para fijar las dos constantes.

### Ejercicio 4
Expande el mismo $T(n)=T(n/4)+n^2$ tres o cuatro pasos. Verás que lo que se acumula delante de $n^2$ es una serie geométrica de razón $1/16$. Termina cuando $n/4^i=1$.

### Ejercicio 5
Divide la lista en dos mitades. La mejor sublista está en la izquierda, en la derecha, o **cruza** el punto medio. Para la que cruza, calcula con dos bucles la mejor suma que termina en `mitad-1` hacia la izquierda y la mejor que empieza en `mitad` hacia la derecha, y súmalas.

### Ejercicio 6
Genera subconjuntos de actividades con el árbol binario (la actividad $i$ entra o no). Antes de incluirla, comprueba que no solape con las ya elegidas: esa es la poda. Al llegar al final, compara su cardinalidad con la mejor.
