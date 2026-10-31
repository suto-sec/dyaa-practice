### Ejercicio 1
Resuelve el subproblema "todo menos el último elemento" y añade el último a la lista que le corresponda según la paridad de su índice (que es la longitud de la lista menos 1). Casos base: lista vacía y lista de un elemento.

### Ejercicio 2
Divide los coeficientes en pares e impares: $P(x)=P_{par}(x^2)+x\,P_{impar}(x^2)$. Piensa por qué: cada coeficiente par mantiene el exponente $2k$ y cada impar el $2k+1$. Cada subpolinomio se evalúa en $x^2$ con la misma función.

### Ejercicio 3
Es la generación de permutaciones normal, pero en lugar de un booleano "libre/usado" lleva un contador por elemento: cuántas veces puede usarse aún. Un elemento es candidato si su contador es mayor que 0; decrementa antes de bajar y restaura al volver. Cuenta las soluciones completas.
