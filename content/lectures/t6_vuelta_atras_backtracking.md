# Tema 6 Vuelta atrás - Backtracking
Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.
Contenido: 1 Introducción; 2 Subconjuntos y permutaciones; 3 N reinas; 4 Otros problemas (suma de subconjuntos, ruta del caballo de ajedrez, laberinto, sudoku, problema de la mochila 0-1); 5 Ramificación y poda.

## Introducción
### Backtracking - Vuelta atrás
- Estrategia para encontrar soluciones a problemas con restricciones definidos sobre espacios discretos (de elevado tamaño).
- Construye soluciones parciales progresivamente, las cuales deben cumplir las restricciones del problema.
- El recorrido (en profundidad) tiene éxito si, procediendo de esta forma, se puede definir por completo una solución (en una hoja de un árbol de recursión). Puede detenerse al encontrar una solución o seguir hasta encontrar todas.
- Si en alguna etapa la solución parcial construida hasta el momento no se puede completar, se vuelve atrás deshaciendo la solución parcial, hasta un punto donde puede seguir explorando posibles soluciones.
- Es un método de "fuerza bruta" pero "inteligente".
- Ejemplos: N reinas, laberinto, sudoku, problema del viajante (TSP).

## Subconjuntos y permutaciones
### Subconjuntos de {a,b,c}: solución con árbol binario
- Árbol recursivo del algoritmo ("árbol de búsqueda"). Nivel 1: se decide si se incluye a (0/1); nivel 2: b; nivel 3: c. Las hojas, de izquierda a derecha, son: {}, {c}, {b}, {b,c}, {a}, {a,c}, {a,b}, {a,b,c}.
- Al descender hacia las hojas se decide si los elementos estarán presentes o no en el subconjunto creado.
- Solución parcial: lista de valores binarios/booleanos. [1,0,1] = {a,c}.
- Cada hoja representa un subconjunto de los $2^n$ posibles; n es la cardinalidad del conjunto inicial (en este caso n=3).

### Implementación - I (árbol binario)
```python
def genera_subconjuntos_wrapper(elementos):
    sol = [None] * (len(elementos))
    genera_subconjuntos(0,sol,elementos)


def imprime_subconjunto(sol,elementos):
    ha_imprimido_alguno = False
    print('{',end='')
    for i in range(0,len(sol)):
        if sol[i]==1:
            if ha_imprimido_alguno:
                print(',',elementos[i],sep='',end='')
            else:
                print(elementos[i],sep='',end='')
                ha_imprimido_alguno = True
    print('}')
```

### Implementación - II (árbol binario)
```python
def genera_subconjuntos(i,sol,elementos):

    if i==len(elementos):               # Caso base: solución parcial completa

        imprime_subconjunto(sol,elementos)                          # Imprimir solución
                                                                    # completa
    else:
        for k in range(0,2): # Genera candidatos a incluir en
                             # solución parcial

            sol[i] = k         # Incluye candidato k en solución parcial

            # Expande solución parcial a partir del índice i+1
            genera_subconjuntos(i+1,sol,elementos)
```
- i: índice del elemento a considerar (nivel del árbol). elementos: lista inicial de elementos. len(elementos): número de elementos (profundidad del árbol). sol: solución parcial (valores binarios que definen los elementos presentes en un subconjunto).

### Consideraciones (árbol binario)
- Código "sencillo", claro. ¡Hay que aprenderse estos códigos/esquemas generales! Los algoritmos de backtracking que veremos tendrán una estructura similar, aunque también más elementos.
- Buen esquema si los subconjuntos a generar tienen cardinalidades diferentes.
- Se reserva memoria para toda la solución parcial en la función wrapper. Importante de cara a la eficiencia: es preferible a usar una estructura de datos que crezca y decrezca dinámicamente.

### Subconjuntos de {a,b,c}: solución con un subconjunto en cada nodo
- Árbol: raíz {}; ramas etiquetadas a, b, c (la etiqueta de la rama indica qué elemento insertar): {a}, {b}, {c}; de {a}: b → {a,b}, c → {a,c}; de {b}: c → {b,c}; de {a,b}: c → {a,b,c}. Nivel 0: 0 elementos; nivel 1: 1 elemento; nivel 2: 2 elementos; nivel 3: 3 elementos.
- El árbol de recursión no es binario. En el nivel i las soluciones tienen i elementos.
- La solución parcial es una lista con los índices de los elementos que se van incluyendo: [0,2] = {a,c}.
- Se obtiene un subconjunto en cada nodo (no solo en las hojas). Más eficiente si se buscan subconjuntos de la misma cardinalidad.
- Ahora es necesario llevar dos índices: i (índice de la solución parcial donde se incluirá un candidato) y j (índice del último candidato incluido). Los candidatos de un nodo son j+1, j+2, ..., n-1 (la raíz tiene j=-1).

### Implementación - I (subconjunto en cada nodo)
```python
def genera_subconjuntos_alt_wrapper(elementos):

    # reserva memoria para la solución parcial
    sol = [None] * (len(elementos))

    # Llamada a función recursiva. j inicializada a -1 indica
    # que no se ha incluido ningún candidato en la solución
    # parcial todavía. La siguiente llamada intentará incluir
    # en los subconjuntos todos los elementos, empezando por
    # el del índice 0 = j+1
    genera_subconjuntos_alt(0,-1,sol,elementos)


def imprime_subconjunto_alt(sol,n_elementos,elementos):
    print('{',end='')
    for i in range(0,n_elementos-1):
        print(elementos[sol[i]],',',sep='',end='')
    if n_elementos>0:
        print(elementos[sol[n_elementos-1]],sep='',end='')
    print('}')
```

### Implementación - II (subconjunto en cada nodo)
```python
def genera_subconjuntos_alt(i,j,sol,elementos):

    # Imprimir solución completa
    imprime_subconjunto_alt(sol,i,elementos)

    for k in range(j+1,len(elementos)):                          # genera candidatos

        sol[i] = k         # Incluye candidato k en solución parcial

        # Expande solución parcial a partir del índice i+1
        # sabiendo que k es el último candidato incluido en sol
        genera_subconjuntos_alt(i+1,k,sol,elementos)
```
- len(elementos): número de elementos (profundidad máxima del árbol). i: índice en la solución parcial (sol) del candidato a incluir. j: índice del último candidato incluido en sol. sol: solución parcial (índices de la lista elementos). elementos: conjunto (lista) original.

### Implementación - III (sin parámetro j)
```python
def genera_subconjuntos_alt2(i,sol,elementos):

    imprime_subconjunto_alt(sol,i,elementos)

    if i==0:
        k_ini = 0
    else:
        k_ini = sol[i-1]+1

    for k in range(k_ini,len(elementos)):
        sol[i] = k
        genera_subconjuntos_alt2(i+1,sol,elementos)
```

### Permutaciones de {a,b,c}
- Árbol: primer elemento (3 llamadas): a, b, c; segundo elemento (2 llamadas); tercer elemento (1 llamada). Hojas: (a,b,c), (a,c,b), (b,a,c), (b,c,a), (c,a,b), (c,b,a).
- ¿Cuántas llamadas recursivas se hacen en cada nivel? 3, 2, 1 (se podrían controlar con bucles). Pero lo más fácil y eficiente es generar siempre 3 posibles llamadas, y usar una lista de valores binarios o booleanos para ver si realmente se debe realizar la llamada recursiva.
- La lista de booleanos se puede pasar por valor o referencia. Referencia: habrá que deshacer los cambios al retroceder. Valor: no será necesario deshacer cambios.
- El nivel de la llamada indica la posición del nuevo elemento a añadir. Al llegar al último nivel (a las hojas) tenemos completada la permutación.

### Permutaciones: implementación
```python
def genera_permutaciones_wrapper(elementos):

    # Reserva memoria para la solución parcial y para lista
    # que indica si un elemento ya se ha incluido en la
    # solución parcial (si forma parte de la permutación)
    sol = [None] * (len(elementos))
    libres = [True] * (len(elementos))

    # Llamada al método recursivo
    genera_permutaciones(0,libres,sol,elementos)


def imprime_permutacion(sol):
    for i in range(0,len(sol)):
        print(sol[i],' ',end='')
    print()
```
```python
def genera_permutaciones(i,libres,sol,elementos):
    n = len(elementos)
    if i==n: # Caso base
        imprime_permutacion(sol) # Imprimir solución completa
    else:
        # Genera candidatos
        for k in range(0,n):

            # Comprueba validez del candidato
            if libres[k]:

                # Incluye candidato k en solución parcial
                sol[i] = elementos[k]

                # El candidato k deja de estar libre
                libres[k] = False

                # Expande solución parcial a partir del índice i+1
                genera_permutaciones(i+1,libres,sol,elementos)

                # El candidato k vuelve a estar libre
                libres[k] = True
```

### Consideraciones (permutaciones)
- Parámetros: i (índice en la solución parcial donde incluir un nuevo elemento); libres (lista booleana que indica si un elemento ya se ha incluido en la solución parcial); sol (solución/permutación parcial construida); elementos (elementos a permutar).
- ¡Hay que aprenderse estos códigos/esquemas generales! sol también podría contener índices a los elementos.
- El uso de la lista libres es clave de cara a la eficiencia: se calcula si un elemento está libre en $O(1)$. Si no se usara se necesitaría un bucle para comprobarlo, cuyo coste sería $O(n)$, donde n es el número de elementos a permutar.
- La reserva de memoria también influye en la eficiencia. Se debe evitar concatenar elementos a sol (o borrarlos).

### Permutaciones ineficiente
```python
def es_factible(elemento,sol,i):
    esta_elemento = False
    j = 0
    while (j<i) and not esta_elemento:
        esta_elemento = (elemento==sol[j])
        j = j + 1

    return not esta_elemento


def genera_permutaciones(i,sol,elementos):
    if i==len(elementos):
        imprime_permutacion(sol)
    else:
        for k in range(0,len(elementos)):
            if es_factible(elementos[k],sol,i):
                sol[i] = elementos[k]
                genera_permutaciones(i+1,sol,elementos)
```

## N reinas
### Problema de las N reinas
- Dado un "tablero de ajedrez" de n×n celdas, se pide ubicar n reinas de modo que no se amenacen: no pueden estar en la misma fila, ni en la misma columna, ni en la misma diagonal (principal o secundaria).
- Ejemplo más famoso de problema que puede resolverse aplicando backtracking.
- Para n=8 hay 92 soluciones posibles, aunque 12 únicas (las demás pueden obtenerse aplicando simetrías, rotaciones y traslaciones). El problema puede solicitar encontrar una solución o todas.

### N reinas: reducción del espacio de búsqueda
- Solución obvia pero absurda: probar las $2^{n^2}$ formas de colocar reinas en el tablero: $1{,}84\cdot10^{19}$ para n=8; 65536 para n=4.
- Pero los conjuntos solución solo deben contener n elementos: $\binom{n^2}{n}$: $4{,}42\cdot10^{10}$ para n=8; 1820 para n=4.
- Además solo puede haber una reina por cada columna: $n^n$ posibilidades (n formas de colocar una reina en una columna, y n columnas): 16777216 para n=8; 256 para n=4.
- Pero además, no puede haber dos reinas en la misma fila: esto convierte nuestro problema en la búsqueda de una permutación con n! posibilidades (lo cual sigue siendo elevado): 40320 para n=8; 24 para n=4.
- Formato de la solución: (fila de la columna 0, fila de la columna 1, ..., fila de la columna n-1). (1,3,0,2) en la figura. Todas las filas son diferentes y tienen que estar representadas. Tendremos que buscar las permutaciones válidas.

### Árbol de búsqueda para N=4
- Árbol de permutaciones de {0,1,2,3} (24 hojas). Podemos emplear un algoritmo para buscar permutaciones. Al llegar a una hoja se "han colocado" las cuatro reinas y podemos probar si la solución es válida.
- Pero podemos comprobar si la solución parcial puede llegar a ser solución final antes de llegar a una hoja. Podaríamos el árbol ahorrando cálculos.
- Árbol podado: se distinguen solución parcial válida, solución completa válida, solución no válida y nodo no explorado. Hasta encontrar la primera solución válida solo se explora una pequeña parte del árbol.

### Implementación (N reinas)
- Para verificar que una solución parcial es válida usamos: filas_libres (filas libres); pdiags_libres (diagonales principales libres, índice columna-fila+n-1, de 0 a 2n-2); sdiags_libres (diagonales secundarias libres, índice columna+fila).
```python
def nreinas_todas_wrapper(n):

    # reserva de memoria para estructuras de datos booleanas
    filas_libres = [True] * n
    pdiags_libres = [True] * (2*n-1)
    sdiags_libres = [True] * (2*n-1)

    # reserva de memoria para la solución parcial
    sol = [None] * n

    # llamada a función recursiva
    nreinas_todas(0,filas_libres,pdiags_libres,sdiags_libres,sol)
```
```python
def nreinas_todas(i,filas_libres,pdiags_libres,sdiags_libres,sol):
    n = len(sol)
    if i==n: # Comprueba si la solución parcial es completa
        print(sol)
    else:
        # Genera candidatos
        for k in range(0,n):
            # Comprueba restricciones
            if filas_libres[k] and pdiags_libres[i-k+n-1] and sdiags_libres[i+k]:

                # Introduce candidato k en la solución parcial
                sol[i] = k

                # Actualiza estructuras booleanas
                filas_libres[k] = False
                pdiags_libres[i-k+n-1] = False
                sdiags_libres[i+k] = False

                # Intenta expandir la solución parcial
                nreinas_todas(i+1,filas_libres,pdiags_libres,sdiags_libres,sol)

                # Vuelve a marcar la fila y las diagonales como libres
                filas_libres[k] = True
                pdiags_libres[i-k+n-1] = True
                sdiags_libres[i+k] = True
```
- Líneas 3 y 4: si se ha llegado a una solución válida se imprime. Línea 7: se generan los candidatos. Línea 9: se comprueba la validez del candidato. Línea 12: se incluye el candidato en la solución parcial. Líneas 15-17: se marcan como ocupadas las correspondientes filas y diagonales. Línea 20: nueva llamada recursiva para extender la solución parcial. Líneas 23-25: se marcan como libres la fila y diagonales del candidato para que puedan usarse en futuros pasos.

## Otros problemas
### Suma de subconjuntos
- Dada una lista L de números no negativos (que pueden repetirse) y otro número s, determinar los subconjuntos de L cuyos elementos suman s. Ejemplo: L=[1,2,3,5,6,7,9], s=13: 13=6+7; 13=2+5+6; 13=1+5+7; 13=1+3+9; 13=1+2+3+7.
- Las soluciones son subconjuntos de tamaño variable. Usaremos el esquema binario para generar subconjuntos.
- Ejemplo: L=[2,7,3,5], s=8. Se usará un parámetro que almacene la suma parcial (suma de los elementos de la solución parcial). ¡Con este parámetro mejora la eficiencia! Se podrá obtener la suma parcial en $\Theta(1)$, en lugar de $O(n)$ si no se usa.
- Restricción adicional: podar el árbol si la suma parcial es mayor que s. (Árbol: en el nivel i se pregunta "+L[i]?"; la rama 0 mantiene la suma, la rama 1 la aumenta; se poda cuando la suma pasa de 8; solución 3+5.)

### Suma de subconjuntos: implementación
```python
def suma_subconjuntos_wrapper(L,s):

    # Reserva memoria para solución parcial
    sol = [0] * (len(L))

    suma_subconjuntos(0,sol,0,L,s)


def imprime_subconjunto(sol,elementos,j):
    ha_imprimido_alguno = False
    print('{',end='')
    for i in range(0,j):
        if sol[i]==1:
            if ha_imprimido_alguno:
                print(',',elementos[i],sep='',end='')
            else:
                print(elementos[i],sep='',end='')
                ha_imprimido_alguno = True
    print('}')
```
```python
def suma_subconjuntos(i,sol,suma_parcial,L,s):
    # Caso base
    if suma_parcial==s:
        imprime_subconjunto(sol,L,i)
    elif i<len(L):
        # Genera candidatos
        for k in range(0,2): # Esquema binario

            # Comprueba si se puede podar el árbol recursivo
            if suma_parcial + k*L[i]<=s:

                # Expande la solución parcial
                sol[i] = k

                # Actualiza la solución parcial
                suma_parcial = suma_parcial + k*L[i]

                # Intenta expandir la solución parcial
                suma_subconjuntos(i+1,sol,suma_parcial,L,s)
```

### Ruta del caballo de ajedrez
- Identificar una ruta de un caballo de ajedrez en un tablero de n×n de manera que salte a todas las casillas sin repetir ninguna. No es requisito que tenga que volver al punto de partida. Variante: ciclo Hamiltoniano (camino cerrado en un grafo). Ejemplo de ruta en 5×5: filas (1,14,9,20,23), (10,19,22,15,8), (5,2,13,24,21), (18,11,4,7,16), (3,6,17,12,25).
- Árbol de búsqueda: se podría encontrar una permutación de $n^2$ elementos (tablero de n×n), pero las restricciones serían muy complejas. Para tamaños mayores que 6×6 tarda en hallar una solución.
- Los 8 saltos posibles del caballo se codifican con una lista de incrementos.
```python
def busca_ruta_caballo_ajedrez_wrapper(n,fila_inicial,col_inicial):
    # lista de incrementos a las coordenadas de una casilla
    # para especificar un salto de caballo
    incr = [(1,-2),(2,-1),(2,1),(1,2), \
            (-1,2),(-2,1),(-2,-1),(-1,-2)]

    # Inicializar una lista de listas a 0 (solución parcial)
    B = [None]*n
    for i in range(0,n):
        B[i] = [0]*n

    B[fila_inicial][col_inicial] = 1 # ubicamos un primer caballo

    # Si encontramos una solución la imprimimos
    if busca_ruta_caballo_ajedrez(2,fila_inicial,col_inicial,B,incr):
        imprime_matriz(B)

def imprime_matriz(B):
    n = len(B)
    for i in range(0,n):
        for j in range(0,n):
            print(" %5d" % (B[i][j]),end='')
        print()

busca_ruta_caballo_ajedrez_wrapper(5,0,0)
```
```python
def busca_ruta_caballo_ajedrez(i,fila,col,B,incr):
    if i>len(B)**2: # Comprobar si se ha completado una ruta
        return True     # Solución encontrada
    else:
        sol_encontrada = False
        k=0
        while not sol_encontrada and k<8: # Genera candidatos
            # Nueva casilla candidata
            nueva_col = col + incr[k][0]
            nueva_fila = fila + incr[k][1]

            # Comprueba validez de la candidata
            if nueva_fila>=0 and nueva_fila<len(B) and \
               nueva_col>=0 and nueva_col<len(B[0]) and \
               B[nueva_fila][nueva_col]==0:

                # Añade casilla a la ruta (a la solución parcial)
                B[nueva_fila][nueva_col] = i

                # Intenta expandir la ruta empezando desde la nueva casilla
                sol_encontrada = busca_ruta_caballo_ajedrez(i+1,nueva_fila, \
                                                nueva_col,B,incr)

                # Marca la nueva casilla como vacía si no se encuentra solución
                if not sol_encontrada:
                      B[nueva_fila][nueva_col] = 0

            k=k+1
        return sol_encontrada
```

### Laberinto
- Hay una entrada y una salida; las celdas pueden ser vacías, paredes, celdas exploradas, camino solución o camino explorado. Se exploran las 4 direcciones en un orden fijo.
- Árbol de búsqueda: desde la celda (c,f) hay cuatro subproblemas: (c,f+1), (c+1,f), (c,f-1), (c-1,f). No se debe hallar una permutación (el camino puede tener duración variable) ni un subconjunto de celdas (el orden importa). Usaremos un esquema diferente.
```python
def lee_laberinto_de_fichero(nombre_fichero):
    fichero = open(nombre_fichero,'r')
    M=[]
    for line in fichero.readlines():
         M.append( [ x[0] for x in line.split(' ') ] )
    fichero.close()
    return M

def encuentra_camino_wrapper(M,fila_entrada,col_entrada,
      fila_salida,col_salida):
    incr = [(0,1),(1,0),(0,-1),(-1,0)]

    M[fila_entrada][col_entrada] = 'P' # Camino (path)
    return encuentra_camino(fila_entrada,col_entrada,M, \
                          incr,fila_salida,col_salida)

M = lee_laberinto_de_fichero('laberinto_01.txt')
# Entrada esquina arriba-izquierda, salida abajo-derecha
if encuentra_camino_wrapper(M,0,0,len(M)-1,len(M[0])-1):
    dibuja_laberinto(M,0,0,len(M)-1,len(M[0])-1)
```
- Fichero de entrada (laberinto_01.txt), E=vacía, W=pared:
```
E W E E E E E E W E W W
E E E W W W E W W E E E
W W E E W E E E W W W E
W E E W W E W E E E E E
E E W W E E E E W E W W
E W W E E W W W W E E E
E E E E W W E E E E W E
E W E W W W W W W W W E
E W E E E E W E E E W W
E W W E W E E E W E E E
W W E E W W E W W E W E
E E E W W E E E W E W E
```
```python
def encuentra_camino(fila,col,M,incr,fila_salida,col_salida):
    if fila==fila_salida and col==col_salida:
        return True # Caso base. Se encontró una solución
    else:
        sol_encontrada = False
        # Genera candidatos
        k=0
        while not sol_encontrada and k<4:
            # Nueva celda candidata
            nueva_col = col + incr[k][0]
            nueva_fila = fila + incr[k][1]

            # Comprueba validez de la nueva celda candidata
            if nueva_fila>=0 and nueva_fila<len(M) and \
                nueva_col>=0 and nueva_col<len(M[0]) and \
                M[nueva_fila][nueva_col]=='E':

                # Añade al camino (usamos M como solución parcial)
                M[nueva_fila][nueva_col] = 'P'

                # Intenta expandir el camino empezando en la nueva celda
                sol_encontrada = encuentra_camino(nueva_fila,nueva_col, \
                                                    M,incr,fila_salida,col_salida)

                # Marca la nueva celda como vacía si no se ha encontrado solución
                if not sol_encontrada:
                     M[nueva_fila][nueva_col] = 'E'

            k=k+1
        return sol_encontrada
```
- Dibujo del laberinto con matplotlib: dibuja_laberinto(M, fila_entrada, col_entrada, fila_salida, col_salida) pinta paredes en gris, la entrada en turquesa, la salida en amarillo y el camino con círculos negros (código de visualización, no esencial).

### Sudoku
- Rellenar el tablero con números: no puede haber dos mismos números en una fila, columna o caja de 3×3. Se muestra un sudoku inicial y su solución.
- Solución parcial: el propio tablero. Expandimos la solución parcial (por ejemplo) por filas.
```python
def lee_sudoku(nombre_fichero):
    fichero = open(nombre_fichero,'r')
    S=[[None]*9]*9
    i=0
    for line in fichero.readlines():
        S[i] = [int(x) for x in line.split(' ')]
        i=i+1

    fichero.close()
    return S

def imprime_sudoku(S):
    for s in S:
        print(*s)

# Función auxiliar para expandir la solución parcial fila a fila
def avanza(fila,col):
    if col==8:
         return (fila+1,0)
    else:
         return (fila,col+1)

S = lee_sudoku('sudoku01_input.txt')
if(resuelve_sudoku(0,0,S)):
    imprime_sudoku(S)
```
- Fichero de entrada (sudoku01_input.txt): 9 filas de 9 números separados por espacios, 0 = celda vacía:
```
0 6 0 1 0 4 0 5 0
0 0 8 3 0 5 6 0 0
2 0 0 0 0 0 0 0 1
8 0 0 4 0 7 0 0 6
0 0 6 0 0 0 3 0 0
7 0 0 9 0 1 0 0 4
5 0 0 0 0 0 0 0 2
0 0 7 2 0 6 9 0 0
0 4 0 5 0 8 0 7 0
```
```python
def resuelve_sudoku(i,j,S):
    if i==9: # Comprueba si la solución parcial está completa
        return True # Solución encontrada
    else:
        # Comprueba si S[i][j] contiene un número inicial fijo
        if S[i][j]!=0:
            (i_nueva,j_nueva) = avanza(i,j)
            return resuelve_sudoku(i_nueva,j_nueva,S)
        else:
            sol_encontrada = False
            k=1
            # Genera candidatos
            while k<10 and not sol_encontrada:
                # Comprueba validez del candidato
                if es_candidato_valido(i,j,k,S): # ¡¡INEFICIENTE!!
                    # Incluye dígito en celda (i,j)
                    S[i][j] = k

                    (i_nueva,j_nueva) = avanza(i,j)
                    sol_encontrada = resuelve_sudoku(i_nueva,j_nueva,S)

                k=k+1

            # Si no hay solución se marca la celda (i,j) como vacía
            if not sol_encontrada:
                S[i][j] = 0

            # Devolver si se ha encontrado una solución
            return sol_encontrada
```
```python
# Comprueba si el dígito en la celda (fila,col) es válido
def es_candidato_valido(fila,col,digito,S):
    # Comprueba conflicto en fila
    for k in range(0,9):
        if k!=col and digito==S[fila][k]:
            return False

    # Comprueba conflicto en columna
    for k in range(0,9):
        if k!=fila and digito==S[k][col]:
            return False

    # Comprueba conflicto en caja
    caja_fila= math.floor(fila/3)
    caja_col = math.floor(col/3)
    for k in range(0,3):
        for m in range(0,3):
            if fila!=3*caja_fila+k and col!=3*caja_col+m:
                if digito==S[3*caja_fila+k][3*caja_col+m]:
                    return False

    return True
```
- Sudoku - aceleración: matrices booleanas para detectar conflictos en $\Theta(1)$: una por fila (índice de fila × dígito), una por columna (índice de columna × dígito) y una por caja (índice de caja 0..8 × dígito). Ejercicio para casa/práctica.

### Problema de la mochila 0-1
- Dado un conjunto de n objetos, cada uno con un peso $p_i$ y un valor $v_i$, i=1,...,n, y una mochila con capacidad C. Maximizar la suma de los valores asociados a los objetos que se introducen en la mochila, sin sobrepasar la capacidad C, sabiendo que los objetos NO pueden partirse en fracciones más pequeñas:
$$\max_{x}\sum_{i=1}^{n}x_iv_i\quad\text{sujeto a}\quad x_i\in\{0,1\},\ i=1,\dots,n;\qquad \sum_{i=1}^{n}x_ip_i\le C$$
- Árbol de búsqueda: pesos=(3,6,9,5), beneficios=(7,2,10,4), capacidad=15. Cada nodo es (X,Y)=(capacidad restante, beneficio parcial). Rama 0: se mantiene (X,Y); rama 1: (X-p_i, Y+b_i). Se poda si la capacidad restante es negativa. Hojas (nivel 4), en orden: (15,0), (10,4), (6,10), (1,14), (9,2), (4,6), (0,12), (-5,16), (12,7), (7,11), (3,17), (-2,21), (6,9), (1,13), ... El beneficio óptimo es 17 (objetos 1 y 3: peso 12, capacidad restante 3).
```python
def mochila_01_wrapper(p,v,C):
    sol = [0] * (len(p))
    sol_opt = [0] * (len(p))

    v_total = mochila_01(0,C,0,sol,sol_opt,-1,p,v,C)

    return v_total


p = [3,6,9,5] # pesos
v = [7,2,10,4] # valores
C = 15  # capacidad
print(mochila_01_wrapper(p,v,C))
```
```python
def mochila_01(i,C_restante,v_actual,sol,sol_opt,v_opt,p,v,C):
    if i==len(sol): # Se han analizado todos los objetos
        if v_actual>v_opt: # Comprueba si se ha encontrado una solución mejor
            # Actualiza el mejor valor y solución
            v_opt = v_actual
            for k in range(0,len(sol)):
                 sol_opt[k] = sol[k]
    else:
        for k in range(0,2): # Genera candidatos

            # Comprueba si se puede podar el árbol de recursión
            if k*p[i]<=C_restante:

                # Expande la solución parcial
                sol[i]=k

                # Actualiza la capacidad restante y el valor parcial
                nueva_C_restante = C_restante - k*p[i]
                nuevo_v_actual = v_actual + k*v[i]

                # Intenta expandir la solución parcial
                v_opt = mochila_01(i+1,nueva_C_restante, \
                    nuevo_v_actual,sol,sol_opt,v_opt,p,v,C)

    # devuelve el mejor valor encontrado hasta el momento
    return v_opt
```

## Ramificación y poda
### Introducción a la ramificación y poda
- Hasta ahora podábamos el árbol de recursión si una solución parcial no cumplía los requisitos del problema para llegar a ser una solución completa.
- En problemas de optimización se pueden realizar podas adicionales: habiendo conseguido hallar una solución válida con valor óptimo v, podemos descartar soluciones que nunca puedan alcanzar dicho valor óptimo.
- Es un método exacto de resolución de problemas de optimización. Se aplica a problemas duros (desde un punto de vista computacional), para acelerar la búsqueda del óptimo global.

### Ramificación y poda: mochila 0-1
- pesos=(3,6,9,5), beneficios=(7,2,10,4), capacidad=15. Cada nodo se anota X(Y) = beneficio parcial (máximo beneficio posible). Raíz: 0(23) (23 = suma de todos los beneficios). Al no incluir el objeto i el máximo posible baja en $v_i$; al incluirlo se suma $v_i$ al beneficio parcial y el máximo posible no cambia. Se poda cuando el máximo beneficio posible no supera el mejor beneficio hallado (p. ej., 6<14, 11<14, 13<17, 12<14) o hay exceso de peso. Beneficio óptimo: 17.
```python
def mochila_01_bnb_wrapper(p,v,C):
    sol = [0] * (len(p))
    sol_opt = [0] * (len(p))

    v_total = mochila_01_bnb(0,C,0,sum(v),sol,sol_opt,-1,p,v,C)

    return v_total


p = [3,6,9,5] # pesos
v = [7,2,10,4] # valores
C = 15  # capacidad
print(mochila_01_bnb_wrapper(p,v,C))
```
```python
def mochila_01_bnb(i,C_restante,v_actual,max_v,sol,sol_opt,v_opt,p,v,C):
    if i==len(sol): # Se han analizado todos los objetos
        if v_actual>v_opt: # Comprueba si se ha encontrado una solución mejor
            # Actualiza el mejor valor y solución
            v_opt = v_actual
            for k in range(0,len(sol)):
                sol_opt[k] = sol[k]
    else:
        for k in range(0,2): # Genera candidatos

            # Comprueba si se puede podar el árbol de recursión por capacidad
            if k*p[i]<=C_restante:

               # Actualiza el máximo valor alcanzable
                nuevo_max_v = max_v - (1-k)*v[i]

                # Comprueba si se puede podar el árbol de recursión por valor
                if nuevo_max_v>v_opt:

                     sol[i]=k # Expande la solución parcial

                     # Actualiza la capacidad restante y el valor parcial
                     nueva_C_restante = C_restante - k*p[i]
                     nuevo_v_actual = v_actual + k*v[i]

                     # Intenta expandir la solución parcial
                     v_opt = mochila_01_bnb(i+1,nueva_C_restante, \
                         nuevo_v_actual,nuevo_max_v,sol,sol_opt,v_opt,p,v,C)

    return v_opt # devuelve el mejor valor encontrado hasta el momento
```

### Aspectos a considerar al usar backtracking
- ¿Las soluciones son permutaciones, subconjuntos u otra entidad? Si son permutaciones o subconjuntos: usad los esquemas vistos. Son claros y eficientes. Estructura de la solución parcial.
- ¿Se pueden acelerar cálculos usando estructuras de datos?
- ¿Se busca una solución o todas? Si solo se busca una, paramos en cuanto la encontremos (while + variable booleana (solución encontrada)). En problemas de optimización se busca solo una (la mejor), pero se analizan todas.
- En problemas de optimización: añadimos dos parámetros: mejor solución y mejor valor. ¿Se puede podar el árbol de recursión por valor?

### Secuencias de paréntesis válidas - I
```python
def parentesis(i,n_abiertos,sol,n):
    if i==2*n:
        return 1
    else:
        nsols = 0

        for k in range(0,2):
            n_abiertos = n_abiertos + (1-k)

            if n_abiertos>=i-n_abiertos+1 and n_abiertos<=n:
                 sol[i]=k
                 nsols = nsols + parentesis(i+1,n_abiertos,sol,n)

            n_abiertos = n_abiertos - (1-k)

        return nsols


def parentesis_wrapper(n):
    sol = [None] * (2*n)
    return parentesis(0,0,sol,n)
```

### Secuencias de paréntesis válidas - II
```python
def parentesis_alt(i,sol,n):
    if i==n:
        # print(sol)

        return 1
    else:
        nsols = 0

        if i==0:
             k_ini = 0
        else:
             k_ini = sol[i-1]+1

        for k in range(k_ini,2*i+1):
             sol[i]=k
             nsols = nsols + parentesis_alt(i+1,sol,n)

        return nsols


def parentesis_wrapper_alt(n):
    sol = [None] * n
    return parentesis_alt(0,sol,n)
```
