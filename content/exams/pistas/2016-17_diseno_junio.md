### Ejercicio 1
Cada número tiene su propio conjunto de dígitos (10 booleanos). Los dígitos comunes a dos listas son los que están en ambas: una operación elemento a elemento. Parte la lista por la mitad, resuelve cada mitad y combina. El caso base es una lista de un solo número.

### Ejercicio 2
Piensa en qué elemento es más problemático: el mayor, que sumado a cualquiera dará un valor grande. ¿Con quién conviene emparejarlo para que la suma sea lo menor posible? Ordena y repite la idea con los extremos que quedan; para justificarlo, intercambia parejas.

### Ejercicio 3
Si las dos sumas han de ser iguales, cada una debe ser la mitad de la total (y si esa mitad no es entera, no hay solución). Genera subconjuntos con un árbol binario (el elemento va a $A$ o a $B$). Con números negativos la poda no es "me pasé del objetivo": precalcula cuánto pueden aportar aún los positivos y los negativos que quedan.
