window.EXAMS = [
 {
  "id": "2014-15_analisis_mayo_sol",
  "title": "Soluciones examen análisis – mayo 2014-2015",
  "durationMin": 105,
  "exercises": [
   {
    "id": "2014-15_analisis_mayo_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Demostrar mediante la definición de complejidad asintótica $\\Omega$, sin usar límites, si se verifica: $n^2-3n+1\\in\\Omega(n^2)$",
    "solution": "La definición de $\\Omega$ es: $\\Omega(g(n))=\\{f(n):\\exists c>0 \\text{ y } n_0>0\\ /\\ 0\\le c\\cdot g(n)\\le f(n),\\ \\forall n\\ge n_0\\}$\n\nPor tanto, tenemos que ver si es posible encontrar una pareja de constantes $c>0$ y $n_0>0$ de forma que se cumpla la definición. Empezamos analizando: $n^2-3n+1\\ge cn^2$\n\nEscogemos un valor de $c$ lo suficientemente pequeño, pero positivo. En este caso $c=1/2$ resulta ser suficiente. Por tanto, tenemos:\n$$n^2-3n+1\\ge\\tfrac12 n^2$$\n$$\\tfrac12 n^2-3n+1\\ge 0$$\n$$n^2-6n+2\\ge 0$$\nLa función de la izquierda es una parábola convexa, así que ya podemos ver que va a ser posible encontrar un valor para $n_0$. Para ello, analizamos la mayor raíz del polinomio, que es: $\\frac{6+\\sqrt{36-8}}{2}=\\frac{6+\\sqrt{28}}{2}=3+\\sqrt7$\n\nPor tanto, podemos escoger para $n_0$ cualquier valor superior o igual a $3+\\sqrt7$. Por ejemplo, $n_0=6$, ya que $\\sqrt7<3$. De esta manera hemos encontrado las dos constantes $c$ y $n_0$ que satisfacen la definición, y podemos afirmar que $n^2-3n+1\\in\\Omega(n^2)$.",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 4.37
   },
   {
    "id": "2014-15_analisis_mayo_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 4.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Determinar el orden de complejidad (no es necesario hallar las constantes) de la siguiente función recursiva:\n$$T(n)=4T(n-1)-5T(n-2)+2T(n-3)+1+n^2+n2^n$$",
    "solution": "Aplicamos el método general de resolución de recurrencias. Primero pasamos los términos con $T$ del lado derecho al izquierdo, y expresamos el resto de términos de la derecha como polinomios por potencias elevadas a $n$:\n$$T(n)-4T(n-1)+5T(n-2)-2T(n-3)=(1+n^2)1^n+n2^n$$\nEl polinomio característico es:\n$$(x^3-4x^2+5x-2)(x-1)^3(x-2)^2$$\nFactorizamos el primer término aplicando el método de Ruffini y agrupamos términos:\n$$(x-1)^2(x-2)(x-1)^3(x-2)^2=(x-1)^5(x-2)^3$$\nPor tanto, la función $T(n)$ tiene la siguiente expresión:\n$$T(n)=C_1+C_2n+C_3n^2+C_4n^3+C_5n^4+C_62^n+C_7n2^n+C_8n^22^n$$\nFinalmente, el orden de complejidad es: $T(n)\\in\\Theta(n^22^n)$",
    "skills": [
     "complejidad-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 4.9
   },
   {
    "id": "2014-15_analisis_mayo_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 6.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "La fórmula para considerar todas las operaciones que se llevan a cabo en un bucle de tipo FOR o WHILE es:\n$$T_{bucle}=1_{inicialización}+\\sum_{i=1}^{n}(1_{comparación}+T_{cuerpo}+1_{incremento})+1_{última\\ comparación}$$\nUtilízala para hallar el número de operaciones ($T(n)$, simplificada) del siguiente código:\n```java\nfor (int i=0; i<n; i++)\n    for (int j=i; j<=n; j++){\n        int k=0;\n        while (k<j) {\n            procesa(i,j,k); // una operación\n            k++;\n        }\n    }\n```\nSe considera que las inicializaciones, comparaciones, e incrementos siempre necesitan una sola operación.",
    "solution": "El código consta de 3 bucles, que podemos descomponer de la siguiente manera:\n$$T(n)=1+\\sum_{i=0}^{n-1}(1+T_{For1}+1)+1$$\n$$T_{For1}=1+\\sum_{j=i}^{n}(1+T_{For2}+1)+1$$\n$$T_{For2}=1+\\sum_{k=0}^{j-1}(1+1+1)+1=2+3j$$\nSustituyendo en $T_{For1}$ tenemos:\n$$T_{For1}=2+\\sum_{j=i}^{n}(4+3j)=2+\\sum_{j=i}^{n}4+3\\sum_{j=i}^{n}j=2+\\sum_{j=i}^{n}4+3\\left(\\sum_{j=1}^{n}j-\\sum_{j=1}^{i-1}j\\right)$$\n$$=2+4(n-i+1)+3\\left(\\frac{n(n+1)}{2}-\\frac{(i-1)i}{2}\\right)$$\nSimplificando obtenemos:\n$$T_{For1}=\\frac{3n^2+11n+12-3i^2-5i}{2}$$\nSustituyendo en la expresión para el primer bucle tenemos:\n$$T(n)=2+\\sum_{i=0}^{n-1}\\left(2+\\frac{3n^2+11n+12-3i^2-5i}{2}\\right)$$\n$$T(n)=2+\\frac12\\sum_{i=0}^{n-1}(3n^2+11n+16-3i^2-5i)$$\n$$T(n)=2+\\frac32n^3+\\frac{11}{2}n^2+8n-\\frac32\\sum_{i=0}^{n-1}i^2-\\frac52\\sum_{i=0}^{n-1}i$$\nPara terminar el problema hay que resolver los dos últimos sumatorios:\n$$T(n)=2+\\frac32n^3+\\frac{11}{2}n^2+8n-\\frac32\\cdot\\frac{(2(n-1)+1)(n-1)n}{6}-\\frac52\\cdot\\frac{(n-1)n}{2}$$\n$$T(n)=2+\\frac32n^3+\\frac{11}{2}n^2+8n-\\frac{2n^3-3n^2+n}{4}-\\frac{5n^2-5n}{4}$$\nFinalmente:\n$$T(n)=\\frac{4n^3+20n^2+36n+8}{4}=n^3+5n^2+9n+2\\in\\Theta(n^3)$$",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "exam",
    "diff": 6.5
   },
   {
    "id": "2014-15_analisis_mayo_sol#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 6.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Halla una expresión no recursiva para la siguiente recurrencia por el método de expansión de recurrencias: $T(n)=2T(n/2)+n$, donde $n$ es una potencia de 2 ($n=2^k$, para $k=1,2,\\ldots$), y donde $T(1)=1$. Indica además el orden de $T(n)$.",
    "solution": "Procedemos a expandir la recurrencia:\n$$T(n)=2T(n/2)+n$$\n$$=2\\left[2T(n/4)+\\tfrac n2\\right]+n=4T(n/4)+2n$$\n$$=4\\left[2T(n/8)+\\tfrac n4\\right]+2n=8T(n/8)+3n$$\n$$=8\\left[2T(n/16)+\\tfrac n8\\right]+3n=16T(n/16)+4n$$\n$$\\vdots$$\n$$=2^iT(n/2^i)+in$$\nSe llega al caso base cuando $n/2^i=1$. Es decir, cuando $n=2^i$, e $i=\\log_2 n$. Sustituyendo:\n$$T(n)=nT(1)+n\\log_2n=n+n\\log_2n\\in\\Theta(n\\log n)$$",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "exam",
    "diff": 6.02
   },
   {
    "id": "2014-15_analisis_mayo_sol#5",
    "n": "5",
    "title": "Ejercicio 5",
    "points": 6.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Halla una expresión no recursiva para la siguiente recurrencia por el método general de resolución recurrencias: $T(n)=2T(n/2)+n$, donde $n$ es una potencia de 2 ($n=2^k$, para $k=1,2,\\ldots$), y donde $T(1)=1$. Indica además el orden de $T(n)$.",
    "solution": "Para poder aplicar el método primero tenemos que hacer el cambio de variable $n=2^k$:\n$$T(n)=T(2^k)=2T(2^k/2)+2^k=2T(2^{k-1})+2^k$$\nA continuación hacemos un cambio de función $t(k)=T(2^k)$:\n$$T(n)=T(2^k)=t(k)=2t(k-1)+2^k$$\nEl polinomio característico de la recurrencia es: $(x-2)(x-2)=(x-2)^2$\n\nPor tanto, la recurrencia tiene la siguiente forma: $t(k)=C_12^k+C_2k2^k$\n\nPara hallar las constantes necesitamos un segundo caso base. Procedemos a calcular $T(2)=2T(1)+2=4$. Los correspondientes casos base para $t(k)$ son:\n$$T(1)=T(2^0)=t(0)=1$$\n$$T(2)=T(2^1)=t(1)=4$$\nPor tanto, el sistema de ecuaciones a resolver es:\n$$t(0)=C_1=1$$\n$$t(1)=C_12^1+C_22^1=4$$\nLas soluciones son $C_1=1$ y $C_2=1$. Por tanto, $t(k)=2^k+k2^k$. Deshaciendo el cambio de variable, donde $k=\\log_2n$, obtenemos:\n$$t(k)=T(2^k)=T(n)=n+n\\log_2n\\in\\Theta(n\\log n)$$",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 6.03
   },
   {
    "id": "2014-15_analisis_mayo_sol#6",
    "n": "6",
    "title": "Ejercicio 6",
    "points": 5.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Halla una expresión no recursiva para la siguiente recurrencia por el método de expansión de recurrencias:\n$$T(n)=1+\\sum_{i=0}^{n-1}T(i)$$\ndonde $T(0)=1$.",
    "solution": "En primer lugar podemos reescribir la fórmula de la siguiente manera:\n$$T(n)=1+T(n-1)+\\sum_{i=0}^{n-2}T(i)\\quad(1)$$\nA partir de ahora se puede resolver de varias formas.\n\n**Primera forma (difícil).** Expandimos $T(n-1)$, quedando:\n$$T(n)=1+1+\\sum_{i=0}^{n-2}T(i)+\\sum_{i=0}^{n-2}T(i)=2+2\\left[\\sum_{i=0}^{n-2}T(i)\\right]$$\nAhora extraemos $T(n-2)$ del sumatorio, y lo expandimos:\n$$T(n)=2+2\\left[T(n-2)+\\sum_{i=0}^{n-3}T(i)\\right]=2+2\\left[1+\\sum_{i=0}^{n-3}T(i)+\\sum_{i=0}^{n-3}T(i)\\right]$$\n$$=2+2\\left[1+2\\sum_{i=0}^{n-3}T(i)\\right]=4+4\\left[\\sum_{i=0}^{n-3}T(i)\\right]$$\nHacemos lo mismo un paso más:\n$$T(n)=4+4\\left[T(n-3)+\\sum_{i=0}^{n-4}T(i)\\right]=4+4\\left[1+2\\sum_{i=0}^{n-4}T(i)\\right]=8+8\\left[\\sum_{i=0}^{n-4}T(i)\\right]$$\nTras una serie de pasos (en este caso usamos la variable $j$ ya que la $i$ ya aparece en el sumatorio) tenemos:\n$$T(n)=2^{j-1}+2^{j-1}\\left[\\sum_{i=0}^{n-j}T(i)\\right]$$\nAlcanzamos el caso base cuando el sumatorio solo suma un término $T(0)$. Esto sucede cuando $n=j$. Sustituyendo:\n$$T(n)=2^{n-1}+2^{n-1}T(0)=2\\cdot2^{n-1}=2^n\\in\\Theta(2^n)$$\n\n**Segunda forma (fácil).** Por la definición de $T$ tenemos: $1+\\sum_{i=0}^{n-2}T(i)=T(n-1)$\n\nPor tanto, sustituyendo en (1) tenemos una nueva expresión simplificada de la recurrencia: $T(n)=2T(n-1)$\n\nAhora procederíamos a resolverla:\n$$T(n)=2T(n-1)=4T(n-2)=8T(n-3)=\\cdots=2^iT(n-i)$$\nEl caso base se alcanza cuando $n-i=0$, es decir, cuando $n=i$. Sustituyendo:\n$$T(n)=2^nT(0)=2^n\\in\\Theta(2^n)$$",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "exam",
    "diff": 5.41
   }
  ],
  "kind": "analisis"
 },
 {
  "id": "2014-15_diseno_junio",
  "title": "Examen diseño – junio 2014-2015",
  "durationMin": 120,
  "exercises": [
   {
    "id": "2014-15_diseno_junio#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 3.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Un mismo número se puede representar en diferentes \"bases\". Nosotros solemos usar números decimales (es decir, en base 10), donde los dígitos representan unidades, decenas, centenas, etc. Por ejemplo, el número 1473 se puede descomponer en $1\\cdot10^3+4\\cdot10^2+7\\cdot10^1+3\\cdot10^0$. De esta manera, los dígitos del número se multiplican por potencias de 10. Ahora bien, podemos representar ese número (1473) en otra base, obteniendo otros dígitos multiplicados por potencias de esa base. Por ejemplo, en base 5, $1473=2\\cdot5^4+1\\cdot5^3+3\\cdot5^2+4\\cdot5^1+3\\cdot5^0$. En ese caso podemos escribir: $1473_{10}=21343_5$, donde el subíndice denota la base.\n\n```\n142 --/5--> 28 --/5--> 5 --/5--> 1 --/5--> 0\n     %5 -> 2    %5 -> 3   %5 -> 0   %5 -> 1\n```\n\nLa figura de arriba ilustra los pasos de un algoritmo que transformaría $142_{10}$ a $1032_5$, donde '/' es división entera y '%' es el resto de la división entera. Se pide implementar una función recursiva que implemente el algoritmo, el cual calcula el cambio de base de un cierto número decimal $n$ (entero), a su representación en una base entera $b\\in[2,9]$. Se trata de calcular el nuevo entero (no se pide imprimirlo por pantalla). Es decir, la función devolvería el entero 1032 para las entradas $n=142$ y $b=5$.",
    "solution": "**Paso 1. Tamaño del problema.** El número de cifras de $n$ en base $b$, es decir $\\lfloor\\log_b n\\rfloor+1$. Cada división entre $b$ quita una cifra.\n\n**Paso 2. Caso base.** $n=0$: no quedan cifras, el resultado es $0$.\n\n**Paso 3. Caso recursivo.** El resto $n\\%b$ es la última cifra (la menos significativa) y $n/b$ es el número sin ella. Si $r$ es el resultado de convertir $n/b$, el de $n$ es $r$ con la cifra $n\\%b$ añadida a la derecha: $10\\cdot r+n\\%b$.\n\n**Paso 4. Código.**\n```python\ndef cambio_base(n, b):\n    if n == 0:\n        return 0\n    return cambio_base(n // b, b) * 10 + n % b\n```\n\n**Paso 5. Comprobación y coste.** Para $n=142$, $b=5$: `cambio_base(1)` $=0\\cdot10+1=1$; `cambio_base(5)` $=1\\cdot10+0=10$; `cambio_base(28)` $=10\\cdot10+3=103$; `cambio_base(142)` $=103\\cdot10+2=1032$. Hay una llamada por cifra: $\\Theta(\\log_b n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 6.21,
    "own": true
   },
   {
    "id": "2014-15_diseno_junio#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 3.5,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide implementar una función recursiva que calcule el producto de dos matrices $A\\cdot B$ utilizando la técnica de divide y vencerás. La descomposición debe realizarse partiendo el problema en los siguientes bloques:\n\n$$A\\cdot B=\\begin{pmatrix}A_{11}&A_{12}\\\\A_{21}&A_{22}\\end{pmatrix}\\cdot\\begin{pmatrix}B_{11}&B_{12}\\\\B_{21}&B_{22}\\end{pmatrix}=\\begin{pmatrix}A_{11}B_{11}+A_{12}B_{21}&A_{11}B_{12}+A_{12}B_{22}\\\\A_{21}B_{11}+A_{22}B_{21}&A_{21}B_{12}+A_{22}B_{22}\\end{pmatrix}$$\n\nSe deben implementar las funciones auxiliares que se empleen (por ejemplo, la suma de matrices). Las matrices no tienen por qué ser cuadradas.",
    "solution": "**Paso 1. Qué hay que hacer.** Con $A$ de $m\\times p$ y $B$ de $p\\times q$, se parte cada dimensión por la mitad ($m_1=\\lfloor m/2\\rfloor$, $p_1=\\lfloor p/2\\rfloor$, $q_1=\\lfloor q/2\\rfloor$). Así los bloques cuadran aunque las matrices no sean cuadradas: $A_{11}$ es $m_1\\times p_1$, $B_{11}$ es $p_1\\times q_1$, y $A_{12}B_{21}$ tiene el mismo tamaño que $A_{11}B_{11}$.\n\n**Paso 2. Caso base.** Si alguna de las tres dimensiones vale 1 no se puede partir más: se multiplica con la definición (un solo bucle largo, no hay nada que repartir). Si las tres son $\\ge2$, cada mitad es $\\ge1$ y los bloques nunca quedan vacíos.\n\n**Paso 3. Funciones auxiliares.** Extraer un bloque, sumar dos matrices del mismo tamaño y pegar los cuatro bloques del resultado.\n\n**Paso 4. Código.**\n```python\ndef bloque(M, f0, f1, c0, c1):\n    return [fila[c0:c1] for fila in M[f0:f1]]\n\ndef suma(A, B):\n    return [[a + b for a, b in zip(fa, fb)] for fa, fb in zip(A, B)]\n\ndef une(C11, C12, C21, C22):\n    return ([f1 + f2 for f1, f2 in zip(C11, C12)] +\n            [f1 + f2 for f1, f2 in zip(C21, C22)])\n\ndef producto_directo(A, B):\n    return [[sum(A[i][k] * B[k][j] for k in range(len(B)))\n             for j in range(len(B[0]))] for i in range(len(A))]\n\ndef producto(A, B):\n    m, p, q = len(A), len(B), len(B[0])\n    if m == 1 or p == 1 or q == 1:\n        return producto_directo(A, B)\n    m1, p1, q1 = m // 2, p // 2, q // 2\n    A11, A12 = bloque(A, 0, m1, 0, p1), bloque(A, 0, m1, p1, p)\n    A21, A22 = bloque(A, m1, m, 0, p1), bloque(A, m1, m, p1, p)\n    B11, B12 = bloque(B, 0, p1, 0, q1), bloque(B, 0, p1, q1, q)\n    B21, B22 = bloque(B, p1, p, 0, q1), bloque(B, p1, p, q1, q)\n    return une(suma(producto(A11, B11), producto(A12, B21)),\n               suma(producto(A11, B12), producto(A12, B22)),\n               suma(producto(A21, B11), producto(A22, B21)),\n               suma(producto(A21, B12), producto(A22, B22)))\n```\n\n**Paso 5. Coste.** Para matrices $n\\times n$ hay 8 productos de tamaño $n/2$ y sumas y copias de coste $\\Theta(n^2)$: $T(n)=8T(n/2)+\\Theta(n^2)\\in\\Theta(n^3)$, igual que el algoritmo directo. Dividir no mejora el coste, sólo lo reparte.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "exam",
    "diff": 5.59,
    "own": true
   },
   {
    "id": "2014-15_diseno_junio#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 3.5,
    "durationMin": null,
    "kind": "diseno",
    "statement": "[figura: tablero 4x4 con una torre por fila y columna; torres en (fila,col) = (0,0), (1,2), (2,1), (3,3)]\n```\nT . . .\n. . T .\n. T . .\n. . . T\n```\nUno de los problemas más conocidos que se resuelven mediante la técnica de *backtracking* es el de las n reinas de ajedrez. En este ejercicio se pide resolver el problema de las n torres, también usando *backtracking*. Las torres se pueden mover en horizontal y vertical, con lo cual se trata de ubicar n torres en un tablero cuadrado de $n\\times n$ casillas, de manera que solo haya una en cada fila y en cada columna. En concreto se pide escribir un programa que calcule todas las posibles soluciones y las imprima por pantalla.",
    "solution": "**Paso 1. Solución parcial.** `sol[i]` es la columna de la torre de la fila `i`. Una torre por fila queda garantizada por construcción: se decide una fila por nivel. Falta que no se repitan columnas.\n\n**Paso 2. Restricción.** Un vector `usada` de booleanos dice qué columnas ya tienen torre. Una columna sólo es candidata si no está usada, así las podas se hacen antes de bajar y no se generan tableros inválidos. Con esto las soluciones son exactamente las permutaciones de $0,\\dots,n-1$ ($n!$ soluciones).\n\n**Paso 3. Código.** Se marca la columna antes de la llamada y se desmarca después (vuelta atrás).\n```python\ndef torres(i, sol, usada):\n    n = len(sol)\n    if i == n:\n        print(sol)                       # p.ej. [0, 2, 1, 3]\n        return\n    for c in range(n):\n        if not usada[c]:\n            usada[c] = True\n            sol[i] = c\n            torres(i + 1, sol, usada)\n            usada[c] = False\n\ndef torres_wrapper(n):\n    torres(0, [None] * n, [False] * n)\n```\n\n**Paso 4. Comprobación y coste.** Para $n=4$ imprime, entre otras, `[0, 2, 1, 3]`, que es el tablero del enunciado (torres en $(0,0),(1,2),(2,1),(3,3)$). Hay $n!$ hojas y cada impresión cuesta $O(n)$: $O(n\\cdot n!)$.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 5.65,
    "own": true
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2015-16_analisis_mayo_sol",
  "title": "Soluciones examen análisis – mayo 2015-2016",
  "durationMin": 75,
  "exercises": [
   {
    "id": "2015-16_analisis_mayo_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 1.5,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Indicad la definición matemática de $O$, y usadla para demostrar (sin usar límites), si se verifica: $5n\\in O(n\\log(n))$",
    "solution": "La definición de $O$ es: $O(g(n))=\\{f(n):\\exists c>0 \\text{ y } n_0>0\\ /\\ 0\\le f(n)\\le c\\cdot g(n),\\ \\forall n\\ge n_0\\}$\n\nPor tanto, tenemos que ver si es posible encontrar una pareja de constantes $c>0$ y $n_0>0$ de forma que se cumpla la definición. Empezamos analizando: $5n\\le cn\\log(n)$\n\nEscogemos un valor de $c$ lo suficientemente grande. En este caso $c=5$ resulta adecuado para continuar:\n$$5n\\le5n\\log(n)$$\n$$0\\le5n\\log(n)-5n$$\n$$0\\le5n(\\log(n)-1)$$\nEn este caso, sea cual sea la base del logaritmo, por ejemplo $b$, siempre es posible encontrar un $n_0$ de tal manera que se cumpla la definición. Bastaría escoger $n_0=b$, ya que $(\\log_b(n)-1)\\ge0$ para todo $n\\ge b$. Por tanto, podemos afirmar que $5n\\in O(n\\log(n))$.",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 3.61
   },
   {
    "id": "2015-16_analisis_mayo_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.5,
    "durationMin": null,
    "kind": "analisis",
    "statement": "La fórmula para considerar todas las operaciones que se llevan a cabo en un bucle de tipo FOR o WHILE es:\n$$T_{bucle}=1_{inicialización}+\\sum_{i=1}^{n}(1_{comparación}+T_{cuerpo}+1_{incremento})+1_{última\\ comparación}$$\nUtilízala para hallar el número de operaciones ($T(n)$, simplificada) del siguiente código:\n```java\nint i=0;\nwhile (i<n) {\n    int j=i;\n    while (j<=n) {\n        procesa(i,j); // una operación\n        j++;\n    }\n    i++;\n}\n```\nSe considera que las inicializaciones, comparaciones, e incrementos siempre necesitan una sola operación.",
    "solution": "El código consta de 2 bucles, que podemos descomponer de la siguiente manera:\n$$T(n)=1+\\sum_{i=0}^{n-1}(1+T_{While\\ interno}+1)+1$$\n$$T_{While\\ interno}=1+\\sum_{j=i}^{n}(1+1+1)+1=2+3(n-i+1)$$\nSustituyendo en $T(n)$ tenemos:\n$$T(n)=2+\\sum_{i=0}^{n-1}\\left(2+2+3(n-i+1)\\right)=2+\\sum_{i=0}^{n-1}(7+3n-3i)$$\n$$=2+7n+3n^2-3\\sum_{i=0}^{n-1}i=2+7n+3n^2-3\\frac{n(n-1)}{2}$$\nFinalmente:\n$$T(n)=2+7n+3n^2-\\frac32n^2+\\frac32n=\\frac32n^2+\\frac{17}{2}n+2$$",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "exam",
    "diff": 4.69
   },
   {
    "id": "2015-16_analisis_mayo_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Halla una expresión no recursiva para la siguiente recurrencia por el método de expansión de recurrencias: $T(n)=4T(n/2)+n$, donde $n$ es una potencia de 2 ($n=2^k$, para $k=1,2,\\ldots$), y donde $T(1)=1$. Indica además el orden de $T(n)$.",
    "solution": "Procedemos a expandir la recurrencia:\n$$T(n)=4T(n/2)+n$$\n$$=4\\left[4T(n/2^2)+\\tfrac n2\\right]+n=4^2T(n/2^2)+2n+n$$\n$$=4^2\\left[4T(n/2^3)+\\tfrac{n}{2^2}\\right]+2n+n=4^3T(n/2^3)+4n+2n+n$$\n$$=4^3\\left[4T(n/2^4)+\\tfrac{n}{2^3}\\right]+4n+2n+n=4^4T(n/2^4)+8n+4n+2n+n$$\n$$\\vdots$$\n$$=4^iT(n/2^i)+n\\sum_{j=0}^{i-1}2^j=4^iT(n/2^i)+(2^i-1)n$$\nSe llega al caso base cuando $n/2^i=1$. Es decir, cuando $n=2^i$. En ese caso, $n^2=(2^i)^2=(2^2)^i=4^i$. Sustituyendo:\n$$T(n)=n^2+n^2-n=2n^2-n$$",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "exam",
    "diff": 4.52
   },
   {
    "id": "2015-16_analisis_mayo_sol#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Halla una expresión no recursiva para la siguiente recurrencia por el método general de resolución recurrencias: $T(n)=T(n/2)+\\log_2n$, donde $n$ es una potencia de 2 ($n=2^k$, para $k=1,2,\\ldots$), y donde $T(1)=1$. Indica además el orden de $T(n)$.",
    "solution": "Para poder aplicar el método primero tenemos que hacer el cambio de variable $n=2^k$ (donde $k=\\log_2n$):\n$$T(n)=T(2^k)=T(2^k/2)+\\log_22^k=T(2^{k-1})+k$$\nA continuación hacemos un cambio de función $t(k)=T(2^k)$:\n$$T(n)=T(2^k)=t(k)=t(k-1)+k$$\nEl polinomio característico de la recurrencia es: $(x-1)(x-1)^2=(x-1)^3$\n\nPor tanto, la recurrencia tiene la siguiente forma:\n$$t(k)=C_11^k+C_2k1^k+C_3k^21^k=C_1+C_2k+C_3k^2$$\nPara hallar las constantes necesitamos dos casos base adicionales. Procedemos a calcular $T(2)=T(1)+\\log_22=2$, y $T(4)=T(2)+\\log_24=4$. Los correspondientes casos base para $t(k)$ son:\n$$T(1)=T(2^0)=t(0)=1$$\n$$T(2)=T(2^1)=t(1)=2$$\n$$T(4)=T(2^2)=t(2)=4$$\nPor tanto, el sistema de ecuaciones a resolver es:\n$$t(0)=C_1=1$$\n$$t(1)=C_1+C_2+C_3=2$$\n$$t(2)=C_1+2C_2+4C_3=4$$\nLas soluciones son $C_1=1$ y $C_2=C_3=1/2$. Por tanto, $t(k)=1+k/2+k^2/2$. Deshaciendo el cambio de variable, donde $k=\\log_2n$, obtenemos:\n$$t(k)=T(2^k)=T(n)=1+\\tfrac12\\log_2n+\\tfrac12(\\log_2n)^2\\in\\Theta\\left((\\log n)^2\\right)$$",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 4.53
   }
  ],
  "kind": "analisis"
 },
 {
  "id": "2015-16_diseno_mayo",
  "title": "Examen diseño – mayo 2015-2016",
  "durationMin": 120,
  "exercises": [
   {
    "id": "2015-16_diseno_mayo#1",
    "n": "1",
    "title": "¿Dígito impar?",
    "points": 2.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide diseñar e implementar un algoritmo recursivo en java para determinar si un número entero no negativo contiene un dígito impar. Además, se debe especificar:\n(a) El tamaño del problema\n(b) El/los casos base\n(c) El/los subproblemas de menor tamaño similares al original que se usarán para construir los casos recursivos\n(d) El/los casos recursivos, junto con un diagrama que indique el razonamiento seguido para hallar dichos casos recursivos",
    "solution": "**Paso 1. (a) Tamaño del problema.** El número de cifras de $n$.\n\n**Paso 2. (b) Caso base.** $n<10$ (una sola cifra): tiene un dígito impar si y sólo si $n$ es impar. Con $n=0$ da `false`, correcto, porque $0$ es par.\n\n**Paso 3. (c) Subproblema.** $n/10$ (división entera): el mismo número sin su última cifra, con una cifra menos.\n\n**Paso 4. (d) Caso recursivo y diagrama.** Con $n\\ge10$, el número tiene un dígito impar si lo es la última cifra (que es impar si y sólo si $n$ lo es) o si lo tiene el resto. Ejemplo con $4082$, que no tiene ninguno:\n```\ntieneDigitoImpar(4082) = (4082 impar? no) o tieneDigitoImpar(408)\ntieneDigitoImpar(408)  = (408 impar?  no) o tieneDigitoImpar(40)\ntieneDigitoImpar(40)   = (40 impar?   no) o tieneDigitoImpar(4)\ntieneDigitoImpar(4)    = caso base: 4 impar? no  ->  false\n```\nCon $4821$ basta la primera comprobación: acaba en $1$ y ya devuelve `true` sin llamar a nadie (la $\\lor$ es perezosa).\n\n**Paso 5. Código (Java).**\n```java\nstatic boolean tieneDigitoImpar(int n) {\n    if (n < 10)\n        return n % 2 == 1;\n    return n % 2 == 1 || tieneDigitoImpar(n / 10);\n}\n```\n\n**Paso 6. Coste.** Una llamada por cifra como máximo: $O(\\log_{10} n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 4.6,
    "own": true
   },
   {
    "id": "2015-16_diseno_mayo#2",
    "n": "2",
    "title": "Punto de inflexión",
    "points": 3.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Sea $v$ un vector de $n$ números enteros, el cual está organizado de manera que los números pares aparecen antes que los impares. Es decir, el índice de cualquier número par será menor que el índice de cualquier número impar. Por ejemplo:\n\n$v=[2,-4,10,8,0,12,9,3,-15,3,1]$.\n\nSe pide implementar un algoritmo recursivo eficiente en java, que se ejecute en $\\Theta(\\log n)$, para determinar el mayor de los índices de números pares. Es decir, aquel índice $i$ para el cual $v_i$ es par, pero donde todos los elementos $v_j$ serán impares para todo $j>i$. Se considera que el índice del primer elemento es 0. Por tanto, en el ejemplo el resultado sería $i=5$, ya que $v_5=12$ (par), mientras que $v_6=9$ (impar). Si el vector $v$ no contiene números pares entonces la función recursiva devolverá $-1$.",
    "solution": "**Paso 1. Idea.** El vector son pares seguidos de impares, así que la propiedad \"es par\" es monótona (verdadera y luego falsa). Se busca el último índice donde es verdadera con una búsqueda binaria.\n\n**Paso 2. Casos.** Sea $m$ el índice central de $[ini,fin]$.\n- Rango vacío ($ini>fin$): no hay pares, devuelve $-1$.\n- $v_m$ par: el último par está en $m$ o a su derecha. Se busca en $[m+1,fin]$; si no hay ninguno (devuelve $-1$), el resultado es $m$.\n- $v_m$ impar: todos los de la derecha también son impares, se busca en $[ini,m-1]$.\n\n**Paso 3. Código (Java).** Se comprueba `% 2 == 0` y no `== 1` porque en Java `-15 % 2` vale $-1$.\n```java\nstatic int ultimoPar(int[] v, int ini, int fin) {\n    if (ini > fin)\n        return -1;\n    int m = (ini + fin) / 2;\n    if (v[m] % 2 == 0) {\n        int r = ultimoPar(v, m + 1, fin);\n        return r == -1 ? m : r;\n    }\n    return ultimoPar(v, ini, m - 1);\n}\n// llamada inicial: ultimoPar(v, 0, v.length - 1)\n```\n\n**Paso 4. Comprobación y coste.** Con $v=[2,-4,10,8,0,12,9,3,-15,3,1]$: $m=5$, $v_5=12$ par, se mira $[6,10]$; $m=8$, $v_8=-15$ impar, $[6,7]$; $m=6$, $v_6=9$ impar, $[6,5]$ vacío: $-1$. Vuelve al nivel de $m=5$ con $r=-1$ y devuelve $5$. En cada nivel hay una sola llamada y el rango se divide por 2: $T(n)=T(n/2)+\\Theta(1)\\in\\Theta(\\log n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 5.56,
    "own": true
   },
   {
    "id": "2015-16_diseno_mayo#3",
    "n": "3",
    "title": "Camino de longitud mínima por un laberinto",
    "points": 1.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Dado un laberinto, se desea encontrar un camino que no solo sea una solución, sino que además sea de longitud más corta. Este problema se puede resolver con la técnica de backtracking, pero en este ejercicio se pide una solución mediante un algoritmo voraz. La solución consiste en aplicar una estrategia de \"transforma y vencerás\", para poder aplicar uno de los algoritmos voraces vistos en clase.\nSe pide describir cómo se puede resolver el problema concreto (cómo se transformaría el problema, y qué algoritmo voraz se aplicaría). No hay que escribir código. La descripción será muy breve: 5 líneas como máximo.",
    "solution": "Primero se genera un grafo asociado al laberinto. En concreto, tendrá un nodo por cada celda vacía en el laberinto. En cuanto a las aristas, habrá una entre dos nodos si sus respectivas celdas son adyacentes. Finalmente, el camino más corto a través del laberinto es el camino más corto a través del grafo. Por tanto, el problema se puede resolver aplicando el algoritmo de Dijkstra.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 4.32,
    "solutionFrom": "2016-17_diseno_mayo_sol#1"
   },
   {
    "id": "2015-16_diseno_mayo#4",
    "n": "4",
    "title": "Permutación optima",
    "points": 4.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "En este problema se trata de implementar una función recursiva en java, basada en la técnica de backtracking, para hallar una permutación óptima de $n$ elementos distintos (por ejemplo, enteros desde 0 hasta $n-1$), de acuerdo a una determinada función objetivo, que hay que minimizar. Dicha función no solo es capaz de devolver un valor para una permutación completa de $n$ elementos, sino que también puede retornar el valor asociado a una permutación (solución) parcial de $m<n$ elementos. En concreto, la función es $f(m,p,w)$, donde $m\\le n$, y evalúa únicamente los primeros $m$ elementos de la permutación $p$. Además, usa un vector de $n$ pesos $w$, que está fijado de antemano, pero se pasa igualmente como parámetro a la función. En este problema $f(m,p,w)\\le f(k,p,w)$ si $m<k$ (es decir, la función objetivo no puede disminuir al ampliar una solución parcial).\nLa búsqueda debe tener en cuenta el mejor valor hallado hasta el momento para no proseguir en caso de que no pueda mejorarse una solución parcial con $m\\le n$ elementos. Se asume que $f(m,p,w)$ ya está implementada, y se puede invocar mediante la instrucción `funcionObjetivo(m,p,w)`. Aunque varias permutaciones diferentes podrían conseguir el menor valor para $f$, solo se pide hallar una (cualquiera) de ellas. El valor máximo de $f(m,p,w)$ será $m^3$. Finalmente, la función recursiva deberá recibir como parámetros de entrada toda la información necesaria para hallar la mejor permutación (no podrán usarse variables globales o no locales a la función).",
    "solution": "**Paso 1. Solución parcial.** `p[0..m-1]` son los elementos ya colocados y `usado[x]` dice si $x$ ya está en `p`. Los candidatos del nivel `m` son los elementos no usados. El árbol tiene $n!$ hojas sin poda.\n\n**Paso 2. Sin variables globales.** La mejor permutación y su valor se pasan como parámetros: `mejorP` (vector de salida) y `mejorV` (vector de un elemento, para que el valor se pueda modificar y ver desde fuera).\n\n**Paso 3. Poda.** Como $f(m,p,w)\\le f(k,p,w)$ si $m<k$, el valor de una solución parcial es una cota inferior del de cualquier permutación que la complete. Si ya es $\\ge$ que el mejor valor, no puede mejorarlo y se corta. Como $f\\le m^3\\le n^3$, empezar con `mejorV = n^3 + 1` hace que la primera permutación completa se acepte.\n\n**Paso 4. Código (Java).**\n```java\nstatic void permOptima(int m, int[] p, boolean[] usado, int[] w,\n                       int[] mejorP, int[] mejorV) {\n    int n = p.length;\n    if (m == n) {                         // aquí f(m) < mejorV por la poda\n        mejorV[0] = funcionObjetivo(m, p, w);\n        System.arraycopy(p, 0, mejorP, 0, n);\n        return;\n    }\n    for (int x = 0; x < n; x++) {\n        if (!usado[x]) {\n            usado[x] = true;\n            p[m] = x;\n            if (funcionObjetivo(m + 1, p, w) < mejorV[0])   // poda\n                permOptima(m + 1, p, usado, w, mejorP, mejorV);\n            usado[x] = false;\n        }\n    }\n}\n\nstatic int[] mejorPermutacion(int[] w) {\n    int n = w.length;\n    int[] mejorP = new int[n];\n    int[] mejorV = { n * n * n + 1 };\n    permOptima(0, new int[n], new boolean[n], w, mejorP, mejorV);\n    return mejorP;\n}\n```\n\n**Paso 5. Por qué es correcto y coste.** Sólo se baja a un nivel si el valor parcial es estrictamente menor que el mejor conocido, así que en una hoja el valor ya es menor y se actualiza sin volver a comprobarlo. Si se cortara una rama con valor $\\ge$ al mejor, ninguna de sus hojas podría ser mejor, así que nunca se pierde el óptimo. En el peor caso (sin podas útiles) sigue siendo $O(n!)$, pero la poda lo reduce mucho cuando $f$ crece deprisa.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 7.0,
    "own": true
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2016-17_analisis_junio",
  "title": "Examen análisis – junio 2016-2017",
  "durationMin": 60,
  "exercises": [
   {
    "id": "2016-17_analisis_junio#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 2.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Determina mediante la definición de $O$ si:\n\n$2^{\\ln(n)}\\in O(n)$",
    "solution": "**Paso 1. Qué hay que probar.** $f\\in O(g)$ si existen $c>0$ y $n_0$ con $f(n)\\le c\\,g(n)$ para todo $n\\ge n_0$. Aquí $f(n)=2^{\\ln n}$ y $g(n)=n$.\n\n**Paso 2. Simplifica $f$.** $2^{\\ln n}=e^{\\ln 2\\cdot\\ln n}=n^{\\ln 2}$, y $\\ln 2\\approx0{,}693<1$.\n\n**Paso 3. Busca $c$ y $n_0$.** Para $n\\ge1$ se cumple $n^{\\ln 2}\\le n^{1}$ porque la base es $\\ge1$ y el exponente $\\ln2$ es menor que $1$. Basta $c=1$ y $n_0=1$.\n\n**Paso 4. Resultado.** $2^{\\ln n}\\le 1\\cdot n$ para todo $n\\ge1$, luego $2^{\\ln n}\\in O(n)$ (sí se verifica). $\\blacksquare$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 4.09,
    "own": true
   },
   {
    "id": "2016-17_analisis_junio#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 4.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "La fórmula para considerar todas las operaciones que se llevan a cabo en un bucle de tipo FOR o WHILE es:\n\n$T_{bucle}=1_{inicialización}+\\sum_{i=1}^{n}(1_{comparación}+T_{cuerpo}+1_{incremento})+1_{última\\ comparación}$\n\nUtilízala para hallar el número de operaciones ($T(n)$, simplificada) del siguiente código en el PEOR caso:\n```java\nfor (int i=0; i<n; i++)\n  if (condicion(i))                // una operación\n    for (int j=i; j<=n; j++)\n      for (int k=0; k<j; k++)\n        procesa(i,j,k);            // dos operaciones\n```",
    "solution": "**Paso 1. Peor caso.** `condicion(i)` es cierta para todo $i$: el bucle en $j$ se ejecuta siempre.\n\n**Paso 2. Bucle más interno ($k$).** Hace $j$ iteraciones ($k=0,\\dots,j-1$) con el cuerpo de 2 operaciones:\n$$T_k(j)=1+\\sum_{k=0}^{j-1}(1+2+1)+1=4j+2$$\n\n**Paso 3. Bucle en $j$.** Va de $i$ a $n$, es decir, $n-i+1$ iteraciones, y su cuerpo es el bucle $k$:\n$$T_j(i)=1+\\sum_{j=i}^{n}(1+T_k(j)+1)+1=2+\\sum_{j=i}^{n}(4j+4)=2+4(n-i+1)+4\\sum_{j=i}^{n}j$$\nComo $\\sum_{j=i}^{n}j=\\frac{n(n+1)-i(i-1)}{2}$:\n$$T_j(i)=2n^2+6n+6-2i-2i^2$$\n\n**Paso 4. Bucle en $i$.** El cuerpo es la comprobación (1 operación) más $T_j(i)$:\n$$T(n)=1+\\sum_{i=0}^{n-1}\\big(1+1+T_j(i)+1\\big)+1=2+\\sum_{i=0}^{n-1}\\big(2n^2+6n+9-2i-2i^2\\big)$$\n(cada iteración cuesta $1$ de la comparación, $1$ del incremento, $1$ de `condicion(i)` y $T_j(i)$: en total $T_j(i)+3$.)\n\n**Paso 5. Calcula la suma.** Con $\\sum i=\\frac{n(n-1)}{2}$ y $\\sum i^2=\\frac{(n-1)n(2n-1)}{6}$:\n$$T(n)=2+n(2n^2+6n+9)-n(n-1)-\\frac{n(n-1)(2n-1)}{3}=\\frac{4n^3+18n^2+29n+6}{3}$$\n\n**Paso 6. Comprobación.** Con $n=1$ se cuentan a mano $19$ operaciones, y la fórmula da $\\frac{4+18+29+6}{3}=19$. Por tanto $T(n)=\\frac43n^3+6n^2+\\frac{29}{3}n+2\\in\\Theta(n^3)$.",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "exam",
    "diff": 5.71,
    "own": true
   },
   {
    "id": "2016-17_analisis_junio#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 4.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Resuelve la siguiente relación de recurrencia (se puede resolver mediante cualquiera de los dos métodos vistos en clase):\n\n$T(n)=\\begin{cases}0&\\text{si }n=0\\\\T(n-1)+2^n+1&\\text{si }n>0\\end{cases}$",
    "solution": "**Paso 1. Expande.** $T(n)=T(n-1)+2^n+1=T(n-2)+(2^{n-1}+1)+(2^n+1)=\\cdots$\n\n**Paso 2. Forma general.** Tras $i$ pasos: $T(n)=T(n-i)+\\sum_{j=0}^{i-1}\\big(2^{n-j}+1\\big)$.\n\n**Paso 3. Llega al caso base.** Con $i=n$, $T(0)=0$:\n$$T(n)=\\sum_{k=1}^{n}(2^k+1)=\\big(2^{n+1}-2\\big)+n$$\n\n**Paso 4. Resultado.** $T(n)=2^{n+1}+n-2\\in\\Theta(2^n)$. Comprobación: $T(1)=T(0)+2+1=3$ y la fórmula da $4+1-2=3$; $T(2)=3+4+1=8$ y la fórmula da $8+2-2=8$.",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 5.26,
    "own": true
   }
  ],
  "kind": "analisis"
 },
 {
  "id": "2016-17_analisis_mayo",
  "title": "Examen análisis – mayo 2016-2017",
  "durationMin": 90,
  "exercises": [
   {
    "id": "2016-17_analisis_mayo#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 2.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Demostrar mediante las definiciones de complejidad asintótica si se verifican:\na) ¿ $(n+1)!\\in O(n!)$ ? [1 punto]\nb) ¿ $2^n\\in O(3^n)$ ? [1 punto]",
    "solution": "**Paso 1. a) Qué habría que probar.** $(n+1)!\\in O(n!)$ exige $c>0$ y $n_0$ con $(n+1)!\\le c\\,n!$ para todo $n\\ge n_0$.\n\n**Paso 2. a) Simplifica.** $(n+1)!=(n+1)\\,n!$. Dividiendo por $n!>0$ la condición queda $n+1\\le c$ para todo $n\\ge n_0$.\n\n**Paso 3. a) No se cumple.** Ninguna constante $c$ supera a todos los $n+1$: para $n=\\lceil c\\rceil$ se rompe. Es decir, no existen $c$ y $n_0$ y $(n+1)!\\notin O(n!)$. (Se ve también con el límite: $\\frac{(n+1)!}{n!}=n+1\\to\\infty$.) $\\blacksquare$\n\n**Paso 4. b) Qué probar.** $2^n\\in O(3^n)$: hay que encontrar $c$ y $n_0$ con $2^n\\le c\\,3^n$.\n\n**Paso 5. b) Se cumple.** Para $n\\ge0$, $2^n\\le3^n$ (la base es menor). Basta $c=1$ y $n_0=0$, luego $2^n\\in O(3^n)$. $\\blacksquare$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 4.19,
    "own": true
   },
   {
    "id": "2016-17_analisis_mayo#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Expresa los siguientes sumatorios mediante fórmulas que no incluyan los sumatorios ($\\sum$). Ambas expresiones resultan ser iguales:\na) [1 punto] $\\sum_{i=1}^{n}(2i-1)$\nb) [1 punto] $\\sum_{i=0}^{n-1}(n-i)2^i$",
    "solution": "**Paso 1. a) Separa en dos sumas.** $\\sum_{i=1}^{n}(2i-1)=2\\sum_{i=1}^{n}i-\\sum_{i=1}^{n}1$.\n\n**Paso 2. a) Usa las fórmulas.** $\\sum_{i=1}^{n}i=\\frac{n(n+1)}{2}$, luego $2\\cdot\\frac{n(n+1)}{2}-n=n^2+n-n=n^2$.\n\n**Paso 3. b) Separa.** $\\sum_{i=0}^{n-1}(n-i)2^i=n\\sum_{i=0}^{n-1}2^i-\\sum_{i=0}^{n-1}i\\,2^i$.\n\n**Paso 4. b) Geométrica.** $\\sum_{i=0}^{n-1}2^i=2^n-1$. Para la otra, con $\\sum_{i=0}^{n-1}i\\,2^i=(n-2)2^n+2$ (se comprueba por inducción: $n=1$ da $0$; $n=2$ da $2$; el paso suma $n2^n$).\n\n**Paso 5. b) Resultado.**\n$$n(2^n-1)-(n-2)2^n-2=2^{n+1}-n-2$$\n\n**Paso 6. Comprobación y una advertencia.** Con $n=1,2,3$ la suma b) vale $1,4,11$ y la fórmula $2^{n+1}-n-2$ da $1,4,11$. La suma a) vale $1,4,9$. Las dos coinciden hasta $n=2$ pero **no son iguales** para $n=3$ ($9\\ne11$), así que la frase \"ambas expresiones resultan ser iguales\" del enunciado parece un error (o de transcripción). Las fórmulas obtenidas son $n^2$ y $2^{n+1}-n-2$.",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "exam",
    "diff": 4.78,
    "own": true
   },
   {
    "id": "2016-17_analisis_mayo#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Halla una expresión no recursiva para la siguiente recurrencia por el método de expansión de recurrencias:\n\n$T(n)=2T(n/2)+n\\log_2 n$\n\ndonde $n$ es una potencia de 2 ($n=2^k$, para $k=1,2,\\ldots$), y donde $T(1)=1$. Indica además el orden de $T(n)$.",
    "solution": "**Paso 1. Expande.** Con $n=2^k$:\n$$T(n)=2T(n/2)+n\\log n=4T(n/4)+n\\log\\tfrac n2+n\\log n=\\cdots$$\n\n**Paso 2. Forma general.** Tras $i$ pasos, el término de cada nivel $j$ es $2^j\\cdot\\frac{n}{2^j}\\log\\frac{n}{2^j}=n(\\log n-j)$:\n$$T(n)=2^iT(n/2^i)+n\\sum_{j=0}^{i-1}(\\log n-j)$$\n\n**Paso 3. Llega al caso base.** Con $i=k=\\log n$ y $T(1)=1$:\n$$T(n)=n+n\\sum_{j=0}^{k-1}(k-j)=n+n\\cdot\\frac{k(k+1)}{2}$$\n\n**Paso 4. Resultado.**\n$$T(n)=n+\\frac{n\\log n(\\log n+1)}{2}=\\frac{n(\\log^2n+\\log n+2)}{2}\\in\\Theta(n\\log^2n)$$\nComprobación: $T(2)=2\\cdot1+2\\cdot1=4$ y la fórmula da $\\frac{2(1+1+2)}{2}=4$; $T(4)=2\\cdot4+4\\cdot2=16$ y da $\\frac{4(4+2+2)}{2}=16$.",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "exam",
    "diff": 4.83,
    "own": true
   },
   {
    "id": "2016-17_analisis_mayo#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Halla una expresión no recursiva para la siguiente recurrencia por el método general de resolución recurrencias:\n\n$T(n)=2T(n/2)+n\\log_2 n$\n\ndonde $n$ es una potencia de 2 ($n=2^k$, para $k=1,2,\\ldots$), y donde $T(1)=1$. Indica además el orden de $T(n)$.",
    "solution": "**Paso 1. Cambio de variable.** Con $n=2^k$ y $t_k=T(2^k)$: $t_k=2t_{k-1}+k\\,2^k$, con $t_0=1$.\n\n**Paso 2. Ecuación característica.** La parte homogénea da $(x-2)$. El término $k\\,2^k$ es un polinomio de grado 1 por $2^k$, que añade $(x-2)^2$. En total $(x-2)^3$: raíz $2$ triple.\n\n**Paso 3. Forma de la solución.** $t_k=(c_0+c_1k+c_2k^2)\\,2^k$.\n\n**Paso 4. Constantes.** Valores: $t_0=1$, $t_1=T(2)=2\\cdot1+2=4$, $t_2=T(4)=2\\cdot4+4\\cdot2=16$.\n- $t_0=1\\Rightarrow c_0=1$.\n- $t_1=2(1+c_1+c_2)=4\\Rightarrow c_1+c_2=1$.\n- $t_2=4(1+2c_1+4c_2)=16\\Rightarrow 2c_1+4c_2=3$.\n\nDe las dos últimas, $c_2=\\tfrac12$ y $c_1=\\tfrac12$.\n\n**Paso 5. Deshaz el cambio.** $2^k=n$ y $k=\\log n$:\n$$T(n)=n\\Big(1+\\frac{\\log n}{2}+\\frac{\\log^2n}{2}\\Big)\\in\\Theta(n\\log^2n)$$\nEs la misma solución que con el método de expansión (ejercicio 3).",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 4.84,
    "own": true
   }
  ],
  "kind": "analisis"
 },
 {
  "id": "2016-17_diseno_junio",
  "title": "Examen diseño – junio 2016-2017",
  "durationMin": 105,
  "exercises": [
   {
    "id": "2016-17_diseno_junio#1",
    "n": "1",
    "title": "Dígitos comunes",
    "points": 4.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Sea $a$ un array o lista de números naturales. Se quiere hallar el conjunto de dígitos comunes a todos los elementos de $a$. Por ejemplo, para $a=[2348,1349,7523,3215]$, la solución es $\\{3\\}$.\nPara representar el conjunto de dígitos del resultado se usará un array o lista de booleanos de tamaño 10, que expresará si un elemento es común o no. De esta manera, la solución del ejemplo anterior se representará con el array o lista [false, false, false, true, false, false, false, false, false, false].\nSe pide implementar un algoritmo basado en la técnica de divide y vencerás que resuelva el problema.",
    "solution": "**Paso 1. Qué se combina.** Cada número tiene su conjunto de dígitos (array de 10 booleanos). Los dígitos comunes a toda la lista son la intersección, es decir, la conjunción posición a posición.\n\n**Paso 2. Divide y vencerás.** Se parte la lista en dos mitades, se resuelve cada una y se combinan los resultados con un AND elemento a elemento.\n\n**Paso 3. Caso base.** Lista de un elemento: sus dígitos. Se asume la lista no vacía.\n\n**Paso 4. Código.**\n```python\ndef digitos(x):\n    d = [False] * 10\n    while True:\n        d[x % 10] = True\n        x //= 10\n        if x == 0:\n            break\n    return d\n\ndef comunes(a, ini, fin):\n    if ini == fin:\n        return digitos(a[ini])\n    m = (ini + fin) // 2\n    izq = comunes(a, ini, m)\n    der = comunes(a, m + 1, fin)\n    return [i and d for i, d in zip(izq, der)]\n\n# comunes([2348, 1349, 7523, 3215], 0, 3) -> sólo True en la posición 3\n```\n\n**Paso 5. Coste.** $T(n)=2T(n/2)+\\Theta(1)$ (combinar cuesta $10$ operaciones) más el coste de los casos base, que es el número de cifras de cada número. Con $d$ cifras como máximo por número: $\\Theta(n\\,d)$.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "exam",
    "diff": 5.8,
    "own": true
   },
   {
    "id": "2016-17_diseno_junio#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Sea un vector $v$ formado por un número $n$ par de enteros. Hay que agrupar a los elementos de $v$ en $n/2$ parejas de forma que si se halla la suma de los dos miembros de cada pareja y se toma el máximo de estas sumas, el número resultante sea el menor posible.\nPor ejemplo, dado el vector $v=[-1,5,12,7,0,2,-3,9]$, una partición óptima de $v$ es el conjunto de pares $\\{(0,7),(-1,9),(2,5),(-3,12)\\}$, donde la suma máxima de sus pares es 9, del par $(-3,12)$. Puede comprobarse que cualquier otra partición produce una suma máxima mayor o igual que 9.\nSe pide describir una estrategia voraz que obtenga una solución óptima al problema propuesto. En este ejercicio no se pide código.",
    "solution": "**Paso 1. Estrategia.** Ordenar $v$ y emparejar el menor con el mayor, el segundo menor con el segundo mayor, y así: $(v_0,v_{n-1}),(v_1,v_{n-2}),\\dots$\n\n**Paso 2. Ejemplo.** $v$ ordenado es $[-3,-1,0,2,5,7,9,12]$. Los pares son $(-3,12),(-1,9),(0,7),(2,5)$ con sumas $9,8,7,7$. El máximo es $9$, el óptimo del enunciado.\n\n**Paso 3. Por qué es óptimo (intercambio).** Sean $a$ el menor y $z$ el mayor, y supón una solución óptima donde $a$ va con $y$ y $z$ con $x$ (si ya van juntos no hay nada que hacer). Como $a\\le x$ y $y\\le z$:\n- el máximo de esos dos pares es $\\ge x+z$.\n- si se cambian por $(a,z)$ y $(x,y)$: $a+z\\le x+z$ y $x+y\\le x+z$.\n\nEl nuevo máximo no supera al anterior, así que existe una solución óptima con $(a,z)$. Se repite el argumento con los $n-2$ elementos restantes.\n\n**Paso 4. Coste.** Dominado por la ordenación: $\\Theta(n\\log n)$. El emparejado es $\\Theta(n)$.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "exam",
    "diff": 4.91,
    "own": true
   },
   {
    "id": "2016-17_diseno_junio#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 4.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Sea una lista $S$ de números enteros. Se desea hallar todas las formas de dividir $S$ en dos listas $A$ y $B$, tal que las sumas de sus elementos sean iguales. Por ejemplo, dado $S=[1,2,3,4,5,9]$, dos posibles particiones son ($A=[1,2,4,5]$, $B=[3,9]$) y ($A=[1,2,9]$, $B=[3,4,5]$). Se pide implementar un algoritmo eficiente (que realice podas en el árbol de recursión) para resolver el problema basado en la estrategia de backtracking. Para ello se deberá partir de alguno de los esquemas explicados en las transparencias para generar subconjuntos. El algoritmo imprimirá por pantalla las parejas de listas cada vez que las encuentre.",
    "solution": "**Paso 1. Reformulación.** Hay que repartir cada elemento en $A$ o en $B$ con suma de $A$ igual a la de $B$. Entonces cada una vale $\\text{objetivo}=\\frac{\\sum S}{2}$. Si la suma total es impar no hay solución.\n\n**Paso 2. Esquema de subconjuntos.** Un árbol binario por posición: el elemento $i$ va a $A$ o a $B$ (`en_A[i]`). Se lleva `suma_A`, y la de $B$ se deduce.\n\n**Paso 3. Poda.** Los enteros pueden ser negativos, así que no basta con cortar cuando `suma_A` supera el objetivo. Se precalcula, para cada $i$, la suma de los positivos que quedan (`pos[i]`) y de los negativos (`neg[i]`). Desde `suma_A` ya no se puede llegar al objetivo si `suma_A + pos[i] < objetivo` (aunque se tomen todos los positivos, no se alcanza) o `suma_A + neg[i] > objetivo` (aunque se tomen todos los negativos, se pasa). Con todos los números positivos la segunda condición no corta nada y la primera da la poda habitual.\n\n**Paso 4. Sin duplicados.** Las particiones $(A,B)$ y $(B,A)$ son la misma. Se fija el primer elemento en $A$ y se empieza en $i=1$.\n\n**Paso 5. Código.**\n```python\ndef particiones(S):\n    n = len(S)\n    total = sum(S)\n    if n == 0 or total % 2 != 0:\n        return\n    objetivo = total // 2\n    pos, neg = [0] * (n + 1), [0] * (n + 1)\n    for i in range(n - 1, -1, -1):\n        pos[i] = pos[i + 1] + max(S[i], 0)\n        neg[i] = neg[i + 1] + min(S[i], 0)\n    en_A = [False] * n\n    en_A[0] = True\n\n    def bt(i, suma_A):\n        if suma_A + pos[i] < objetivo or suma_A + neg[i] > objetivo:\n            return\n        if i == n:\n            print([S[k] for k in range(n) if en_A[k]],\n                  [S[k] for k in range(n) if not en_A[k]])\n            return\n        for opcion in (True, False):\n            en_A[i] = opcion\n            bt(i + 1, suma_A + (S[i] if opcion else 0))\n\n    bt(1, S[0])\n```\n\n**Paso 6. Comprobación y coste.** Con $S=[1,2,3,4,5,9]$ el objetivo es $12$ y se imprimen `[1, 2, 4, 5] [3, 9]` y `[1, 2, 9] [3, 4, 5]`. En una hoja ($i=n$) las sumas restantes valen $0$, así que la poda sólo deja pasar `suma_A == objetivo`. En el peor caso es $O(n\\,2^n)$ y las podas lo reducen en la práctica.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 5.85,
    "own": true
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2016-17_diseno_mayo_sol",
  "title": "Soluciones examen diseño – mayo 2016-2017",
  "durationMin": 105,
  "exercises": [
   {
    "id": "2016-17_diseno_mayo_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 1.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Dado un laberinto, se desea encontrar un camino que no solo sea una solución, sino que además sea de longitud más corta. Este problema se puede resolver con la técnica de backtracking, pero en este ejercicio se pide una solución mediante un algoritmo voraz. La solución consiste en aplicar una estrategia de \"transforma y vencerás\", para poder aplicar uno de los algoritmos voraces vistos en clase.\n\nSe pide describir cómo se puede resolver el problema concreto (cómo se transformaría el problema, y qué algoritmo voraz se aplicaría). No hay que escribir código. La descripción será muy breve: 5 líneas como máximo.",
    "solution": "Primero se genera un grafo asociado al laberinto. En concreto, tendrá un nodo por cada celda vacía en el laberinto. En cuanto a las aristas, habrá una entre dos nodos si sus respectivas celdas son adyacentes. Finalmente, el camino más corto a través del laberinto es el camino más corto a través del grafo. Por tanto, el problema se puede resolver aplicando el algoritmo de Dijkstra.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 4.02
   },
   {
    "id": "2016-17_diseno_mayo_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Considera un número entero no negativo `a` cuyos dígitos aparecen ordenados en orden creciente desde el más significativo hasta el menos (por ejemplo, `a = 245778`). Dado un dígito `x`, implementa una función que devuelva un nuevo número resultante de insertar `x` en `a`, de manera que los dígitos también queden ordenados en orden creciente. Ejemplos:\n- a = 245778, x = 0 → 245778\n- a = 245778, x = 1 → 1245778\n- a = 245778, x = 6 → 2456778\n- a = 245778, x = 9 → 2457789",
    "solution": "```python\ndef inserta_en_entero_creciente(x,a):\n    if x>=a %10: # caso base\n        return a*10 + x\n    else: # caso recursivo\n        return a %10 + 10*inserta_en_entero_creciente(x,a//10)\n```",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 4.33
   },
   {
    "id": "2016-17_diseno_mayo_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 3.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Sea `a` una lista ordenada de $n$ enteros (pueden ser negativos) todos distintos. Se pide diseñar un algoritmo de complejidad $O(\\log n)$ en el peor caso, capaz de encontrar un índice $i$ tal que $a[i]=i$, suponiendo que tal índice $i$ exista (donde $0\\le i\\le n-1$). El algoritmo devolverá el valor $i$ en caso de que exista, y $-1$ en caso contrario.",
    "solution": "```python\ndef elemento_en_posicion(a, inf, sup):\n    mitad = (inf+sup)//2\n\n    if mitad==a[mitad]: # Caso base 1\n        return mitad\n    elif inf>=sup: # Caso base 2\n        return -1\n    elif mitad<a[mitad]: # Casos recursivos\n        return elemento_en_posicion(a, inf, mitad-1)\n    else:\n        return elemento_en_posicion(a, mitad+1, sup)\n```",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 4.67
   },
   {
    "id": "2016-17_diseno_mayo_sol#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 4.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide implementar un algoritmo basado en la técnica de backtracking para resolver el siguiente problema.\n\nDada una lista `L` de números enteros no negativos (almacenada en un simple array/lista), y otro número entero no negativo `s`, se desea hallar un conjunto de números de `L` tal que su suma sea igual a `s`, y que además dicho conjunto sea el de menor cardinalidad de entre todos los posibles que cumplan la restricción asociada a la suma. El conjunto se especificará mediante un vector de booleanos de la misma longitud que `L`.\n\nEn el siguiente ejemplo hay varios conjuntos de elementos de `L` tal que su suma sea igual a 13 (`s`). El algoritmo devolvería el conjunto {6, 7} al ser el de menor cardinalidad (es el que tiene el menor número de elementos):\n\n`L` = [1, 2, 3, 5, 6, 7, 9], `s` = 13\n- 13 = 6 + 7\n- 13 = 2 + 5 + 6\n- 13 = 1 + 5 + 7\n- 13 = 1 + 3 + 9\n- 13 = 1 + 2 + 3 + 7\n\nNOTA: la solución no tiene por qué ser única. Si hay varios conjuntos que cumplan que la suma de sus elementos es `s`, y además tienen la misma mínima cardinalidad, basta con devolver cualquiera de esos conjuntos.",
    "solution": "```python\ndef busca_subconj_aux(L,s):\n    sol_parcial = [False] * (len(L))\n    sol_opt = [False] * (len(L))\n\n    card_opt = busca_subconj(0,0,L,s,sol_parcial,sol_opt,len(L)+1,0)\n\n    print(card_opt)\n    print(sol_opt)\n```\n```python\ndef busca_subconj(i,suma_parcial,L,s,sol_parcial,sol_opt,card_opt,card):\n\n    # genera candidatos (esquema para búsqueda de SUBCONJUNTOS)\n    for k in range(0,2):\n\n        nueva_suma_parcial = suma_parcial + k*L[i]\n\n        # Comprueba si se puede podar el árbol de recursión\n        if nueva_suma_parcial<=s:\n\n            # Actualiza solución parcial\n            sol_parcial[i] = (k==1)\n\n            # Incrementa cardinalidad si se incluye el candidato\n            if k==1:\n                card = card+1\n\n            # Comprueba si se ha alcanzado el valor en s\n            if nueva_suma_parcial==s:\n                # Actualiza solución y valor óptimos si menor cardinalidad\n                if card<card_opt:\n                    card_opt = card\n                    for j in range(0,len(L)):\n                        sol_opt[j] = sol_parcial[j]\n\n            elif i<len(L)-1 and card<card_opt-1:\n                card_opt = busca_subconj(i+1,nueva_suma_parcial,L,s,\n                      sol_parcial,sol_opt,card_opt,card)\n\n    sol_parcial[i] = False\n\n    return card_opt\n```",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 6.17
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2018-19_mostoles_mayo_sol",
  "title": "Soluciones examenes – mayo 2018-2019 Móstoles",
  "durationMin": 165,
  "exercises": [
   {
    "id": "2018-19_mostoles_mayo_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 1.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Ordena de menor a mayor orden de complejidad $O$ las siguientes funciones (algunas pueden tener la misma complejidad):\n\n$10n,\\ n\\log_{10}n,\\ n^2\\log n,\\ 5\\log n,\\ \\log n^2,\\ n^2,\\ n^{1+a}$ con $0<a<1$",
    "solution": "$\\log n^2 = 5\\log n < 10n < n\\log_{10}n < n^{1+a}$ (con $0<a<1$) $< n^2 < n^2\\log n$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 3.47
   },
   {
    "id": "2018-19_mostoles_mayo_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Calcula el número de operaciones ($T(n)$) que realiza el siguiente código:\n```java\nfor (int i=0; i<n; i++)\n    for (int j=i+1; j<=n; j++)\n        if (condicion(i))          // una operación\n            for (int k=0; k<j; k++)\n                procesa(i,j,k);    // dos operaciones\n```\nSe considera que las inicializaciones, comparaciones, e incrementos siempre necesitan una sola operación.",
    "solution": "El código consta de 3 bucles, que podemos descomponer de la siguiente manera:\n\n$T(n)=1+\\sum_{i=0}^{n-1}(1+T_{For2}+1)+1$\n\n$T_{For2}=1+\\sum_{j=i+1}^{n}(1+T_{If}+1)+1$\n\n$T_{If}=\\begin{cases}1 & \\text{en el mejor caso}\\\\ 1+1+\\sum_{k=0}^{j-1}(1+2+1)+1=3+4j & \\text{en el peor caso}\\end{cases}$\n\nVeamos primero el coste en el mejor caso. Si $T_{If}=1$, entonces sustituyendo en $T_{For2}$ tenemos:\n\n$T_{For2}=2+\\sum_{j=i+1}^{n}3=2+3(n-i)=3n+2-3i.$\n\nSustituyendo en $T(n)$ obtenemos:\n\n$T(n)=2+\\sum_{i=0}^{n-1}(3n+4-3i)=2+3n^2+4n-3\\sum_{i=0}^{n-1}i$\n\n$=2+3n^2+4n-3\\frac{(n-1)n}{2}=\\frac{4+6n^2+8n-3n^2+3n}{2}=\\frac{3n^2+11n+4}{2}\\in\\Theta(n^2)$\n\nEn el peor caso, sustituyendo $T_{If}$ en $T_{For2}$ tenemos:\n\n$T_{For2}=2+\\sum_{j=i+1}^{n}(5+4j)=2+5(n-i)+4\\sum_{j=i+1}^{n}j$\n\n$=2+5n-5i+4\\left[\\sum_{j=1}^{n}j-\\sum_{j=1}^{i}j\\right]$\n\n$=2+5n-5i+4\\left[\\frac{n(n+1)}{2}-\\frac{i(i+1)}{2}\\right]$\n\nSimplificando obtenemos:\n\n$T_{For2}=2+5n-5i+2n^2+2n-2i^2-2i=2n^2+7n+2-7i-2i^2$\n\nSustituyendo en la expresión para el primer bucle tenemos:\n\n$T(n)=2+\\sum_{i=0}^{n-1}(2n^2+7n+4-7i-2i^2)=2+2n^3+7n^2+4n-7\\sum_{i=0}^{n-1}i-2\\sum_{i=0}^{n-1}i^2$\n\n$=2+2n^3+7n^2+4n-7\\frac{(n-1)n}{2}-2\\frac{(n-1)n(2n-1)}{6}$\n\n$=2+2n^3+7n^2+4n-7\\frac{n^2}{2}+7\\frac{n}{2}-2\\frac{2n^3-3n^2+n}{6}$\n\n$=\\frac{12+12n^3+42n^2+24n-21n^2+21n-4n^3+6n^2-2n}{6}$\n\nFinalmente:\n\n$T(n)=\\frac{8n^3+27n^2+43n+12}{6}\\in\\theta(n^3)$",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "exam",
    "diff": 4.72
   },
   {
    "id": "2018-19_mostoles_mayo_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Resolved la siguiente relación de recurrencia por el **método general de resolución de recurrencias**:\n\n$T(n)=\\begin{cases}1 & \\text{si } n=1,\\\\ T(n/4)+n^2 & \\text{si } n>1.\\end{cases}$",
    "solution": "Para poder aplicar el método primero tenemos que hacer el cambio de variable $n=4^k$. Además, en ese caso: $n^2=(4^k)^2=4^{2k}=(4^2)^k=16^k$.\n\nPodemos reescribir la expresión para $T(n)$ de la siguiente manera:\n\n$T(n)=T(4^k)=T(4^k/4)+16^k=T(4^{k-1})+16^k$\n\nA continuación hacemos un cambio de función $t(k)=T(4^k)$:\n\n$T(n)=T(4^k)=t(k)=t(k-1)+16^k$\n\nEl polinomio característico de la recurrencia $t(k)=t(k-1)+16^k$ es: $(x-1)(x-16)$\n\nPor tanto, la recurrencia tiene la siguiente forma:\n\n$t(k)=C_1 1^k+C_2 16^k=C_1+C_2 16^k$\n\nEn este momento podemos deshacer el cambio de variable fácilmente:\n\n$T(n)=C_1+C_2 n^2$\n\nPara hallar las constantes necesitamos dos casos base. Procedemos a calcular $T(4)=T(1)+4^2=17$. Por tanto, el sistema de ecuaciones a resolver es:\n\n$T(1)=C_1+C_2=1$\n$T(4)=C_1+16C_2=17$\n\nLas soluciones son $C_1=-1/15$ y $C_2=16/15$. Por tanto:\n\n$T(n)=\\frac{16}{15}n^2-\\frac{1}{15}\\in\\Theta(n^2)$",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 4.45
   },
   {
    "id": "2018-19_mostoles_mayo_sol#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Resolved la siguiente relación de recurrencia por el **método de expansión de recurrencias**:\n\n$T(n)=\\begin{cases}1 & \\text{si } n=1,\\\\ T(n/4)+n^2 & \\text{si } n>1.\\end{cases}$",
    "solution": "Procedemos a expandir la recurrencia:\n\n$T(n)=T(n/4)+n^2$\n$=\\left[T(n/4^2)+\\left(\\frac{n}{4}\\right)^2\\right]+n^2=T(n/4^2)+n^2\\left(1+\\frac{1}{16}\\right)$\n$=\\left[T(n/4^3)+\\left(\\frac{n}{4^2}\\right)^2\\right]+n^2\\left(1+\\frac{1}{16}\\right)=T(n/4^3)+n^2\\left(1+\\frac{1}{16}+\\frac{1}{16^2}\\right)$\n$\\vdots$\n$=T(n/4^i)+n^2\\left(1+\\frac{1}{16}+\\frac{1}{16^2}+\\cdots+\\frac{1}{16^{i-1}}\\right)=T(n/4^i)+n^2\\sum_{j=0}^{i-1}\\frac{1}{16^j}$\n\nEl último sumatorio es una serie geométrica:\n\n$\\sum_{j=0}^{i-1}\\frac{1}{16^j}=\\frac{\\frac{1}{16^i}-1}{\\frac{1}{16}-1}.$\n\nPor tanto, tenemos:\n\n$T(n)=T(n/4^i)+n^2\\left[\\frac{\\frac{1}{16^i}-1}{\\frac{1}{16}-1}\\right]=T(n/4^i)+n^2\\left[\\frac{\\frac{1}{16^i}-1}{-\\frac{15}{16}}\\right]=T(n/4^i)+n^2\\left[-\\frac{16}{15}\\cdot\\frac{1}{16^i}+\\frac{16}{15}\\right]$\n\nSe llega al caso base cuando $n/4^i=1$. Es decir, cuando $n=4^i$. En ese caso $n^2=16^i$. Sustituyendo:\n\n$T(n)=T(1)+n^2\\left[-\\frac{16}{15}\\frac{1}{n^2}+\\frac{16}{15}\\right]=1-\\frac{16}{15}+\\frac{16}{15}n^2=\\frac{16}{15}n^2-\\frac{1}{15}\\in\\Theta(n^2)$",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "exam",
    "diff": 4.43
   },
   {
    "id": "2018-19_mostoles_mayo_sol#5",
    "n": "5",
    "title": "Ejercicio 5",
    "points": 5.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide implementar un algoritmo basado en la estrategia de divide y vencerás para resolver el problema de la sublista de máxima suma. Dada una lista de números el objetivo es hallar una sublista de elementos contiguos cuya suma sea máxima. Por ejemplo, dada la lista $[-1,-4,5,2,-3,4,2,-5]$, la lista óptima es $[5,2,-3,4,2]$, cuyos elementos suman 10. Se asumirá que la lista inicial no es vacía, y está compuesta de números enteros.",
    "solution": "El algoritmo debe descomponer la lista dada en dos mitades. La sublista de suma máxima estará en alguna de esas mitades (esto se calcula mediante dos llamadas recursivas), o será la concatenación de dos sublistas de ambas mitades, que sean contiguas en la original. Por ejemplo, la sublista de suma máxima de la mitad izquierda contendrá el elemento en la posición (mitad-1), mientras que la sublista de suma máxima de la mitad derecha contendrá el elemento en la posición (mitad). Ambas sublistas máximas se pueden hallar mediante simples bucles, y la suma máxima de su concatenación es la suma sus respectivas sumas máximas. El siguiente código describe el algoritmo:\n\nJava:\n```java\nimport java.io.*;\n\npublic class MaxSumList {\n\n    public static int max(int a, int b) {\n        if (a>b)\n            return a;\n        else\n            return b;\n    }\n\n    public static int maxima_suma_sublista(int a[], int ini, int fin) {\n        int n = a.length;\n        if (ini==fin)\n            return a[ini];\n        else {\n            int mitad = (ini+fin)/2;\n\n            // Calculas la suma máxima de ambas mitades de la lista a\n            int max_mitad_izq = maxima_suma_sublista(a,ini,mitad);\n            int max_mitad_dcha = maxima_suma_sublista(a,mitad+1,fin);\n\n            // suma máxima de las listas de la mitad izquierda\n            // que contienen el índice (mitad -1)\n            int max_izq = -Integer.MAX_VALUE;\n            int aux_suma = 0;\n            for (int i=mitad; i>=0; i--) {\n                aux_suma = aux_suma + a[i];\n                max_izq = max(max_izq,aux_suma);\n            }\n\n            // suma máxima de las listas de la mitad derecha\n            // que contienen el índice (mitad)\n            int max_dcha = -Integer.MAX_VALUE;\n            aux_suma = 0;\n            for (int i=mitad+1; i<n; i++) {\n                aux_suma = aux_suma + a[i];\n                max_dcha = max(max_dcha,aux_suma);\n            }\n\n            return max(max(max_mitad_izq,max_mitad_dcha), max_izq+max_dcha);\n        }\n    }\n\n    // función no pedida en el enunciado:\n    public static void main(String args[]) throws Exception {\n        //lectura:\n        BufferedReader cin =\n            new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(cin.readLine());\n\n        int a[] = new int[n];\n\n        //lectura:\n        String[] listaEnteros = cin.readLine().split(\" \");\n        for (int i=0; i<n; i++) {\n            int m = Integer.parseInt(listaEnteros[i]);\n            a[i] = m;\n        }\n\n        //escritura:\n        System.out.println(maxima_suma_sublista(a,0,n-1));\n    }\n}\n```\nPython:\n```python\nimport math\n\ndef maxima_suma_sublista(a):\n    n = len(a)\n    if n==1:\n        return a[0]\n    else:\n        mitad = n//2\n\n        # Calculas la suma máxima de ambas mitades de la lista a\n        max_mitad_izq = maxima_suma_sublista(a[0:mitad])\n        max_mitad_dcha = maxima_suma_sublista(a[mitad:])\n\n        # suma máxima de las listas de la mitad izquierda\n        # que contienen el índice (mitad -1)\n        max_izq = -math.inf\n        aux_suma = 0\n        for i in range(mitad-1,-1,-1):\n            aux_suma = aux_suma + a[i]\n            max_izq = max(max_izq,aux_suma)\n\n        # suma máxima de las listas de la mitad derecha\n        # que contienen el índice (mitad)\n        max_dcha = -math.inf\n        aux_suma = 0\n        for i in range(mitad,n):\n            aux_suma = aux_suma + a[i]\n            max_dcha = max(max_dcha,aux_suma)\n\n        return max(max_mitad_izq, max_mitad_dcha, max_izq+max_dcha)\n\n# No pedido en el enunciado:\na = [int(x) for x in input().split()]\nprint(maxima_suma_sublista(a))\n```",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "exam",
    "diff": 5.78
   },
   {
    "id": "2018-19_mostoles_mayo_sol#6",
    "n": "6",
    "title": "Ejercicio 6",
    "points": 5.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide implementar un algoritmo basado en la técnica de backtracking para resolver el problema de selección de actividades. Sea un conjunto $A$ de $n$ actividades $\\{a_0,a_1,\\ldots,a_{n-1}\\}$ que necesitan utilizar un recurso común, por ejemplo, una sala de reuniones. El recurso solo puede ser usado por una actividad en cada momento. Cada actividad tiene un instante de comienzo $c_i$ y un instante de finalización $f_i$, donde $0\\le c_i<f_i<\\infty$. Si se selecciona la actividad $a_i$, se desarrolla en el intervalo semiabierto de tiempo $[c_i,f_i)$. Las actividades $a_i$ y $a_j$ son compatibles si sus intervalos $[c_i,f_i)$ y $[c_j,f_j)$ no se solapan, es decir, si $c_i\\ge f_j$ o $c_j\\ge f_i$.\n\nEl objetivo de este ejercicio es determinar un subconjunto de actividades compatibles cuya cardinalidad sea máxima. Por ejemplo, sea el siguiente conjunto de actividades:\n\n| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n| c_i | 1 | 2 | 0 | 5 | 8 | 5 | 6 | 8 | 3 | 3 | 12 |\n| f_i | 4 | 13 | 6 | 7 | 12 | 9 | 10 | 11 | 8 | 5 | 14 |\n\n[figura: diagrama de Gantt de las 11 actividades a0..a10 como barras [c_i,f_i) sobre eje de tiempo 0..14; en naranja a0, a3, a7, a10]\n\nUn subconjunto $S$ de actividades compatibles es $\\{a_2,a_4,a_{10}\\}$. Sin embargo, no es un subconjunto de cardinalidad máxima, como lo son $\\{a_0,a_3,a_7,a_{10}\\}$ (en naranja en la figura) y $\\{a_9,a_3,a_4,a_{10}\\}$ (ya que tienen 4 elementos).\n\nAunque este problema se puede resolver con un algoritmo voraz, el método desarrollado deberá seguir una estrategia basada en backtracking. Se asumirá que las tareas no están ordenadas. Además, el algoritmo desarrollado no ordenará las tareas de ninguna manera. El algoritmo podrá usar funciones auxiliares para verificar la validez de los candidatos a introducir en la solución parcial.",
    "solution": "La solución consiste en analizar todos los subconjuntos posibles de tareas. Para ello el siguiente código usa el esquema para buscar subconjuntos basado en un árbol binario. Para podar el árbol de recursión se usa una función que comprueba si hay solapamiento entre la tarea $i$ y las contenidas en la solución parcial (desde el índice 0 hasta el $i-1$). En caso de haber analizado todos los posibles candidatos (tareas), se actualiza la mejor solución y su cardinalidad si la cardinalidad del conjunto definido por solución parcial es mayor que la encontrada previamente por el algoritmo de backtracking.\n\nJava:\n```java\nimport java.io.*;\n\npublic class Tareas {\n\n    public static boolean es_candidato_valido(int i, int sol[],\n                                              int c[], int f[]) {\n\n        boolean es_valido = true;\n\n        int j=0;\n        while ((j<i) && es_valido) {\n            if (sol[j]==1)\n                es_valido = (c[i]>=f[j] || c[j]>=f[i]);\n\n            j = j + 1;\n        }\n\n        return es_valido;\n    }\n\n\n    public static int busca_maxima_cardinalidad(int i, int card_actual,\n                                                int sol[], int opt_sol[],\n                                                int card_opt,\n                                                int c[], int f[]) {\n\n        int n = sol.length;\n\n        if (i==n) {\n            if (card_actual>card_opt) {\n                card_opt = card_actual;\n                for (int k=0; k<n; k++)\n                    opt_sol[k] = sol[k];\n            }\n        }\n        else {\n            for (int k=0; k<=1; k++) {\n\n                if ((k==0) || es_candidato_valido(i,sol,c,f)) {\n\n                    sol[i] = k;\n\n                    card_actual = card_actual + k;\n\n                    card_opt = busca_maxima_cardinalidad(i+1,card_actual,\n                                               sol,opt_sol,card_opt,c,f);\n                }\n            }\n        }\n\n        return card_opt;\n    }\n\n    public static int planificacion_tareas(int c[], int f[]) {\n\n        int n = c.length;\n\n        int sol[] = new int[n];\n        int opt_sol[] = new int[n];\n\n        int card_opt = busca_maxima_cardinalidad(0,0,sol,opt_sol,-1,c,f);\n\n        // opcional\n        for (int i=0; i<n-1; i++)\n            System.out.print(opt_sol[i] + \" \");\n        System.out.println(opt_sol[n-1]);\n\n        return card_opt;\n    }\n\n    // función no pedida en el enunciado:\n    public static void main(String args[]) throws Exception {\n        //lectura:\n        BufferedReader cin =\n            new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(cin.readLine());\n\n        int c[] = new int[n];\n        int f[] = new int[n];\n\n        //lectura:\n        String[] listaEnteros = cin.readLine().split(\" \");\n        for (int i=0; i<n; i++) {\n            int m = Integer.parseInt(listaEnteros[i]);\n            c[i] = m;\n        }\n\n        listaEnteros = cin.readLine().split(\" \");\n        for (int i=0; i<n; i++) {\n            int m = Integer.parseInt(listaEnteros[i]);\n            f[i] = m;\n        }\n\n        //escritura:\n        System.out.println(planificacion_tareas(c,f));\n    }\n}\n```\nPython:\n```python\ndef es_candidato_valido(i,sol,c,f):\n\n    es_valido = True\n\n    j=0\n    while j<i and es_valido:\n        # ver si la tarea i se solapa con las anteriores,\n        # previamente incluidas en la solución parcial\n        if sol[j]==1:\n            es_valido = (c[i]>=f[j] or c[j]>=f[i])\n\n        j = j + 1\n\n    return es_valido\n\ndef busca_maxima_cardinalidad(i,card_actual,sol,opt_sol,card_opt,c,f):\n    n = len(sol)\n\n    if i==n:\n        if card_actual>card_opt: # actualizar si se encuentra una solución mejor\n            card_opt = card_actual\n            for k in range(n):\n                opt_sol[k] = sol[k]\n    else:\n        for k in range(0,2): # árbol de recursión binario\n\n            if k==0 or es_candidato_valido(i,sol,c,f):\n\n                sol[i]=k\n\n                card_actual = card_actual + k\n\n                card_opt = busca_maxima_cardinalidad(i+1,card_actual,sol,\n                      opt_sol,card_opt,c,f)\n\n    return card_opt\n\ndef planificacion_tareas(c,f):\n    n = len(c)\n\n    sol = [None]*n\n    opt_sol = [None]*n\n\n    card_opt = busca_maxima_cardinalidad(0,0,sol,opt_sol,-1,c,f)\n\n    print(opt_sol) # opcional\n    return card_opt\n\n# No pedido en el enunciado:\nc = [int(x) for x in input().split()]\nf = [int(x) for x in input().split()]\n\nprint(planificacion_tareas(c,f))\n```",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 7.2
   }
  ],
  "kind": "mixto"
 },
 {
  "id": "2018-19_vicalvaro_mayo_sol",
  "title": "Soluciones examenes – mayo 2018-2019 Vicálvaro",
  "durationMin": 165,
  "exercises": [
   {
    "id": "2018-19_vicalvaro_mayo_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 2.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Demostrar **mediante la definición** de complejidad asintótica $O$, si se verifican:\na) ¿ $2^{n+1}\\in O(2^n)$ ? [1 punto]\nb) ¿ $2^{2n}\\in O(2^n)$ ? [1 punto]",
    "solution": "En primer lugar, $2^{n+1}\\in O(2^n)$ es cierto. Aplicando la definición debemos buscar una constante $c>0$ y otra $n_0>0$ tal que:\n\n$2^{n+1}\\le c\\cdot 2^n$\n\nen un intervalo $[n_0,\\infty)$. Como $2^{n+1}=2\\cdot 2^n$, tenemos que encontrar una $c$ que cumpla:\n\n$2\\cdot 2^n\\le c\\cdot 2^n$\n\nEscogiendo $c=2$, la desigualdad anterior naturalmente se cumple para todo $n$. Por tanto, se cumple en un intervalo $[n_0,\\infty)$ para cualquier valor de de $n_0$. Como al aplicar la definición $n_0>0$, podemos escoger $n_0=1$. De esta manera, hemos hallado una pareja de constantes que hacen que $2^{n+1}\\in O(2^n)$ sea cierto.\n\nEn segundo lugar, $2^{2n}\\in O(2^n)$ no es cierto. Por eso, en vez de intentar encontrar las constantes $c$ y $n_0$, tenemos que demostrar que no va a ser posible hallarlas. Inicialmente, al intentar aplicar la definición deberíamos encontrar una constante $c>0$ y otra $n_0>0$ tal que:\n\n$2^{2n}\\le c\\cdot 2^n$\n\nen un intervalo $[n_0,\\infty)$. Aplicamos logaritmos (en base 2) a ambos lados:\n\n$\\log_2(2^{2n})\\le\\log_2 c\\cdot 2^n$\n$2n\\le\\log_2 c+n$\n$n\\le\\log_2 c$\n\nLa última expresión indica que la desigualdad se cumple para todo $n$ menor o igual que la constante $\\log_2 c$. Por tanto, sea cual sea el valor de $c$, la desigualdad se cumple en el intervalo $(-\\infty,\\log_2 c]$, pero nunca en un intervalo $[n_0,\\infty)$. Por tanto, es imposible hallar la pareja de constantes $c$ y $n_0$ que necesitamos para verificar $2^{2n}\\in O(2^n)$.",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 3.91
   },
   {
    "id": "2018-19_vicalvaro_mayo_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Calcula el número de operaciones ($T(n)$) que realiza el siguiente código:\n```java\nint i=0;\nwhile (i<=n){\n    int j=i;\n    while (j<=n){\n        procesa(i,j);   // dos operaciones\n        j++;\n    }\n    i++;\n}\n```\nSe considera que las inicializaciones, comparaciones, e incrementos siempre necesitan una sola operación.",
    "solution": "El código consta de 2 bucles, que podemos descomponer de la siguiente manera:\n\n$T(n)=1+\\sum_{i=0}^{n}(1+T_{For2}+1)+1$\n\n$T_{For2}=1+\\sum_{j=i}^{n}(1+2+1)+1=2+4(n-i+1)=4n+6-4i$\n\nSustituyendo $T_{For2}$ en $T(n)$ obtenemos:\n\n$T(n)=2+\\sum_{i=0}^{n}(2+4n+6-4i)=2+\\sum_{i=0}^{n}(4n+8-4i)$\n\n$=2+4n(n+1)+8(n+1)-4\\sum_{i=0}^{n}i$\n\n$=2+4n^2+4n+8n+8-4\\frac{n(n+1)}{2}$\n\n$=2n^2+10n+10\\in\\Theta(n^2)$",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "exam",
    "diff": 4.13
   },
   {
    "id": "2018-19_vicalvaro_mayo_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Resolved la siguiente relación de recurrencia por el **método general de resolución de recurrencias**:\n\n$T(n)=\\begin{cases}1 & \\text{si } n=1,\\\\ T(n/10)+\\log_{10}(n^2) & \\text{si } n>1.\\end{cases}$",
    "solution": "En primer lugar podemos expresar $\\log_{10}(n^2)$ como $2\\log_{10}(n)$. Luego, para poder aplicar el método, tenemos que hacer el cambio de variable $n=10^k$. Además, en ese caso $k=\\log_{10}(n)$. Por tanto, podemos reescribir la expresión para $T(n)$ de la siguiente manera:\n\n$T(n)=T(10^k)=T(10^k/10)+2k=T(10^{k-1})+2k$\n\nA continuación hacemos un cambio de función $t(k)=T(10^k)$:\n\n$T(n)=T(10^k)=t(k)=t(k-1)+2k\\cdot 1^k$\n\nEl polinomio característico de la recurrencia $t(k)=t(k-1)+2k\\cdot 1^k$ es: $(x-1)^3$\n\nPor tanto, la recurrencia tiene la siguiente forma:\n\n$t(k)=C_1 1^k+C_2 k\\cdot 1^k+C_2 k^2\\cdot 1^k=C_1+C_2k+C_3k^2$\n\nPara hallar las constantes necesitamos tres casos base. En primer lugar conocemos $T(1)=t(0)=1$. Aplicando $t(k)=t(k-1)+2k$ vemos que:\n\n$t(1)=t(0)+2\\cdot 1=1+2=3$\n$t(2)=t(1)+2\\cdot 2=3+4=7$\n\nPor tanto, el sistema de ecuaciones a resolver es:\n\n$t(0)=C_1=1$\n$t(1)=C_1+C_2+C_3=3$\n$t(2)=C_1+2C_2+4C_3=7$\n\nLas soluciones son $C_1=1$, $C_2=1$ y $C_3=1$. Por tanto:\n\n$t(k)=1+k+k^2$\n\nFinalmente, deshaciendo el cambio de variable y función obtenemos:\n\n$T(n)=1+\\log_{10}(n)+[\\log_{10}(n)]^2\\in\\Theta[(\\log n)^2]$",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 4.46
   },
   {
    "id": "2018-19_vicalvaro_mayo_sol#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Resolved la siguiente relación de recurrencia por el **método de expansión de recurrencias**:\n\n$T(n)=\\begin{cases}1 & \\text{si } n=1,\\\\ T(n/10)+\\log_{10}(n^2) & \\text{si } n>1.\\end{cases}$",
    "solution": "En primer lugar podemos expresar $\\log_{10}(n^2)$ como $2\\log_{10}(n)$, quedando:\n\n$T(n)=\\begin{cases}1 & \\text{si } n=1,\\\\ T(n/10)+2\\log_{10}(n) & \\text{si } n>1.\\end{cases}$\n\nProcedemos a expandir la recurrencia:\n\n$T(n)=T(n/10)+2\\log_{10}n$\n$=[T(n/10^2)+2\\log_{10}(n/10)]+2\\log_{10}n$\n$=T(n/10^2)+2\\log_{10}n-2\\log_{10}10+2\\log_{10}n$\n$=[T(n/10^3)+2\\log_{10}(n/100)]+2\\log_{10}n-2\\log_{10}10+2\\log_{10}n$\n$=T(n/10^3)+2\\log_{10}n-2\\log_{10}100+2\\log_{10}n-2\\log_{10}10+2\\log_{10}n$\n$=T(n/10^3)+3\\cdot 2\\log_{10}n-2(1+2)$\n$\\vdots$\n$=T(n/10^4)+4\\cdot 2\\log_{10}n-2(1+2+3)$\n$\\vdots$\n$=T(n/10^i)+2i\\log_{10}n-2\\sum_{j=1}^{i-1}j$\n$=T(n/10^i)+2i\\log_{10}n-(i-1)i$\n\nSe llega al caso base cuando $n/10^i=1$. Es decir, cuando $n=10^i$, o de manera equivalente, cuando $i=\\log_{10}n$. Sustituyendo:\n\n$T(n)=T(1)+2(\\log_{10}n)(\\log_{10}n)-(\\log_{10}n-1)(\\log_{10}n)$\n\n$T(n)=1+\\log_{10}(n)+[\\log_{10}(n)]^2\\in\\Theta[(\\log n)^2]$",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "exam",
    "diff": 4.45
   },
   {
    "id": "2018-19_vicalvaro_mayo_sol#5",
    "n": "5",
    "title": "Ejercicio 5",
    "points": 5.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide implementar un algoritmo basado en la estrategia de divide y vencerás para determinar si una matriz $\\mathbf{A}$ de números enteros está \"ordenada\" por filas y columnas independientemente. Para ello, los elementos de cada fila y cada columna deben aparecer en orden no-decreciente. La matriz $\\mathbf{A}$ no es necesariamente cuadrada. La siguiente matriz estaría ordenada según el criterio descrito:\n\n$\\mathbf{A}=\\begin{pmatrix}1&3&6&8&10\\\\2&4&7&9&10\\\\4&8&11&14&14\\\\5&10&12&15&16\\end{pmatrix}$",
    "solution": "Una posible solución consiste en dividir la matriz en cuatro submatrices (partimos la matriz por la fila central y por la columna central). En el caso recursivo cada una de las submatrices debe estar \"ordenada\" según especifica el enunciado. Para ello se realizarían cuatro llamadas recursivas. Además, los elementos de las dos columnas centrales, y de las dos filas centrales deben estar ordenados de menor a mayor. Esto se puede ver empleando un bucle en cada caso. El siguiente código ilustra una posible implementación de la función.\n```python\ndef esta_ordenada_matriz(A):\n    (n,m) = A.shape\n\n    if n==1 and m==1:\n        return True\n    elif n==0 or m==0:\n        return True\n    else:\n\n        mitad_n = n//2\n        mitad_m = m//2\n\n        elementos_centrales_ordenados = True;\n        i = 0\n        while i<n and elementos_centrales_ordenados:\n            elementos_centrales_ordenados = A[i,mitad_m-1]<=A[i,mitad_m]\n            i = i+1\n\n        j = 0\n        while j<m and elementos_centrales_ordenados:\n            elementos_centrales_ordenados = A[mitad_n-1,j]<=A[mitad_n,j]\n            j = j+1\n\n        return (elementos_centrales_ordenados and\n                esta_ordenada_matriz(A[0:mitad_n,0:mitad_m]) and\n                esta_ordenada_matriz(A[0:mitad_n,mitad_m:m]) and\n                esta_ordenada_matriz(A[mitad_n:n,0:mitad_m]) and\n                esta_ordenada_matriz(A[mitad_n:n,mitad_m:m]))\n```",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "exam",
    "diff": 5.87
   },
   {
    "id": "2018-19_vicalvaro_mayo_sol#6",
    "n": "6",
    "title": "Ejercicio 6",
    "points": 5.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Sea un grafo $G$ no dirigido, y no ponderado, compuesto por $n$ vértices. El grafo $G$ estará definido mediante una matriz de adyacencia simétrica y cuadrada $\\mathbf{A}$ de tamaño $n\\times n$, cuyos elementos serán 0 o 1. Si el elemento $a_{i,j}=0$, no habrá una arista conectando a los vértices $i$ y $j$, mientras que si $a_{i,j}=1$ sí que habrá una arista conectándolos y serán adyacentes. Se asumirá que no habrá aristas desde un vértice a sí mismo (es decir, $a_{i,i}=0$ para todo $i$).\n\nDado un número entero $m\\le n$, se pide implementar un algoritmo basado en la técnica de backtracking que determine si es posible colorear los vértices del grafo con $m$ colores diferentes, de manera que no se asigne el mismo color a dos vértices adyacentes. El siguiente grafo se puede colorear usando 3 colores, pero no es posible colorearlo usando menos colores:\n\n[figura: grafo de 5 vértices 0..4 con aristas 0-1, 0-2, 0-3, 0-4, 1-2, 2-4; coloreado con 3 colores: vértice 0 oscuro, 1 y 3 gris claro, 2 y 4 blanco]\n\n$\\mathbf{A}=\\begin{pmatrix}0&1&1&1&1\\\\1&0&1&0&0\\\\1&1&0&0&1\\\\1&0&0&0&0\\\\1&0&1&0&0\\end{pmatrix}$\n\nEl algoritmo podrá usar funciones auxiliares para verificar la validez de los candidatos a introducir en la solución parcial.",
    "solution": "En este ejercicio la solución parcial será una lista de $n$ enteros, correspondientes a los $n$ vértices del grafo. Los elementos de la solución parcial podrán tomar $m$ valores diferentes (por ejemplo, desde 0 hasta $m-1$), donde cada uno representará un color diferente. Por tanto, el algoritmo de backtracking tendrá un bucle para generar los $m$ posibles candidatos (colores). El bucle será de tipo While, para para en cuanto se haya encontrado una coloración válida. A continuación, se analiza si el color para el vértice $i$-ésimo es válido. Para ello se puede llamar a una función que compruebe si el color que pretendemos usar para el vértice $i$-ésimo ya aparece en uno de sus vértices adyacentes. Si el candidato es válido se actualiza la solución parcial y se llama a la función recursiva para expandir la solución parcial a partir del vértice $i+1$. El caso recursivo termina devolviendo si ha encontrado una coloración válida. Por último, el caso base del algoritmo simplemente comprueba si la solución parcial se ha completado, en cuyo caso la coloración sería válida, y la función puede devolver `True`. El siguiente código ilustra una posible implementación.\n```python\nimport numpy as np\n\ndef es_candidato_valido(k,i,sol,A):\n\n    es_valido = True\n\n    j=0\n    while j<i and es_valido:\n        if A[j,i]==1 and sol[j]==k:\n            es_valido = False\n        j = j + 1\n\n    return es_valido\n\n\ndef colorear_backtracking(i,m,sol,A):\n    n = A.shape[0]\n\n    if i==n:\n        print(sol) # opcional\n        return True\n    else:\n\n        exito = False\n        k = 0\n        while k<m and not exito:\n\n            if es_candidato_valido(k,i,sol,A):\n\n                sol[i] = k\n\n                exito = colorear_backtracking(i+1,m,sol,A)\n\n            k = k + 1\n\n    return exito\n\n\ndef puede_colorear(A,m):\n    n = A.shape[0]\n\n    sol = np.empty(n)\n\n    return colorear_backtracking(0,m,sol,A)\n```",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 6.85
   }
  ],
  "kind": "mixto"
 },
 {
  "id": "2019-20_analisis_junio_sol",
  "title": "Soluciones examen análisis – junio 2019-2020",
  "durationMin": null,
  "exercises": [
   {
    "id": "2019-20_analisis_junio_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 1.0,
    "durationMin": 10,
    "kind": "analisis",
    "statement": "Demuestra usando la definición de $\\Theta$ que: $\\log_4(n)\\in\\Theta(\\log_2(n))$",
    "solution": "Como nos piden demostrar una expresión que involucra a $\\Theta$ (cota ajustada), debemos demostrar tanto $\\log_4(n)\\in O(\\log_2(n))$, como $\\log_4(n)\\in\\Omega(\\log_2(n))$. Además, podemos transformar el logaritmo en base 4 en un logaritmo en base 2 para facilitar las operaciones:\n$$\\log_4(n)=\\frac{\\log_2(n)}{\\log_2(4)}=\\frac{1}{2}\\log_2(n)$$\nPara la cota inferior $\\Omega$ tenemos que encontrar dos constantes constante $C_1$ y $n_1$ tal que:\n$$\\frac{1}{2}\\log_2(n)\\ge C_1\\log_2(n)$$\nse cumpla par todo $n\\ge n_1$. Por ejemplo, podemos elegir $C_1=1/4$. En ese caso la expresión queda:\n$$2\\log_2(n)\\ge\\log_2(n)$$\nLa cual se verifica para todo $n\\ge1$ (si $n<1$ los logaritmos serían negativos, y por tanto sería mayor el miembro derecho de la inecuación). Finalmente, podemos asignar $n_1=1$, y habríamos encontrado una pareja de constantes que verifica la definición de $\\Omega$.\n\nPara $O$ el procedimiento es similar. Debemos encontrar dos constantes constante $C_2$ y $n_2$ tal que:\n$$\\frac{1}{2}\\log_2(n)\\le C_2\\log_2(n)$$\nse cumpla par todo $n\\ge n_2$. Por ejemplo, eligiendo $C_2=1$ tenemos:\n$$\\frac{1}{2}\\log_2(n)\\le\\log_2(n)$$\nla cual también se cumple para todo $n\\ge1$. Por tanto, podemos escoger $n_2=1$, y habríamos encontrado una pareja de constantes que verifican la definición de $O$. De esta manera habríamos terminado la demostración y por tanto el ejercicio.\n\nNOTA: la definición formal de $\\Theta$ pide hallar tres constantes: $C_1$, $C_2$ y $n_0$. Como hemos hecho la demostración para $\\Omega$ y $O$ de manera independiente hemos obtenido $C_1$ y $C_2$, pero dos constantes $n_1$ y $n_2$ (que no siempre son iguales). En general, $n_0$ simplemente sería el máximo de $n_1$ y $n_2$.",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 3.31
   },
   {
    "id": "2019-20_analisis_junio_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.0,
    "durationMin": 10,
    "kind": "analisis",
    "statement": "Simplifica el siguiente sumatorio (la expresión final no debe contener ningún sumatorio):\n$$\\sum_{i=1}^{j}\\left(1-j-2i+6i^2+nj+8ni+3\\cdot4^i\\right)$$",
    "solution": "El sumatorio consta de siete términos, con lo cual podemos interpretar que tenemos siete sumatorios independientes:\n$$\\sum_{i=1}^{j}1-\\sum_{i=1}^{j}j-\\sum_{i=1}^{j}2i+\\sum_{i=1}^{j}6i^2+\\sum_{i=1}^{j}nj+\\sum_{i=1}^{j}8ni+\\sum_{i=1}^{j}3\\cdot4^i$$\nLas expresiones dentro del primer, segundo y quinto sumatorio no dependen de la variable $i$, por tanto solo tenemos que sumarlas $j$ veces, lo que es equivalente a multiplicarlas por $j$. Del resto de sumatorios podemos extraer fuera todos los términos multiplicativos que no involucren a la variable $i$. De esta manera obtenemos:\n$$j-j^2-2\\sum_{i=1}^{j}i+6\\sum_{i=1}^{j}i^2+nj^2+8n\\sum_{i=1}^{j}i+3\\sum_{i=1}^{j}4^i$$\nAplicando las fórmulas para la suma de los primeros naturales y sus cuadrados, y la fórmula para series geométricas (último sumatorio), obtenemos:\n$$j-j^2-2\\frac{j(j+1)}{2}+6\\frac{(2j+1)j(j+1)}{6}+nj^2+8n\\frac{j(j+1)}{2}+3\\frac{4^{j+1}-4}{4-1}$$\nOpcionalmente podemos cancelar denominadores:\n$$j-j^2-j(j+1)+(2j+1)j(j+1)+nj^2+4nj(j+1)+4^{j+1}-4$$",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "exam",
    "diff": 3.9
   },
   {
    "id": "2019-20_analisis_junio_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 1.0,
    "durationMin": 10,
    "kind": "analisis",
    "statement": "Halla una cota inferior y una superior del siguiente sumatorio: $\\sum_{j=0}^{n-1}e^j$",
    "solution": "Este ejercicio se puede resolver de dos maneras teniendo en cuenta el contenido de la asignatura. En primer lugar, se puede usar la técnica de aproximación por integrales. En ese caso la función dentro del sumatorio, que es $f(x)=e^x$, es monótona creciente. Por tanto, de manera general las cotas vendrían dadas por:\n$$\\int_{m-1}^{n}f(x)dx\\le\\sum_{j=m}^{n}f(j)\\le\\int_{m}^{n+1}f(x)dx$$\nEn nuestro caso el límite inferior es 0 ($m=0$), mientras que el superior es $n-1$ (en vez de $n$). Así que tendríamos:\n$$\\int_{-1}^{n-1}e^x dx\\le\\sum_{j=0}^{n-1}e^j\\le\\int_{0}^{n}e^x dx$$\nAdemás, $\\int e^x dx=e^x$. Por tanto:\n$$[e^x]_{-1}^{n-1}\\le\\sum_{j=0}^{n-1}e^j\\le[e^x]_{0}^{n}$$\nQuedando:\n$$e^{n-1}-e^{-1}=\\frac{e^n-1}{e}\\le\\sum_{j=0}^{n-1}e^j\\le e^n-1$$\nLa segunda forma de resolver este ejercicio simplemente consiste en darse cuenta de que el sumatorio del enunciado es una serie geométrica, para la cual podemos hallar una expresión exacta:\n$$\\sum_{j=0}^{n-1}e^j=\\frac{e^n-1}{e-1}$$\nEsta expresión sería tanto cota superior como inferior (considerando desigualdades del tipo $\\le$ y $\\ge$).",
    "skills": [
     "sumatorios",
     "cotas-integral"
    ],
    "stage": "sumatorios",
    "src": "exam",
    "diff": 3.31
   },
   {
    "id": "2019-20_analisis_junio_sol#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 3.0,
    "durationMin": 15,
    "kind": "analisis",
    "statement": "Resolved la siguiente relación de recurrencia por el método general de resolución de recurrencias:\n$$T(n)=\\begin{cases}1 & \\text{si } n=1,\\\\ 2T(n/4)+\\log_2(n) & \\text{si } n>1.\\end{cases}$$",
    "solution": "Para poder aplicar el método tenemos que hacer el cambio de variable $n=4^k$. En ese caso podemos reescribir la expresión para $T(n)$ de la siguiente manera:\n$$T(n)=T(4^k)=2T(4^k/4)+\\log_2(4^k)=2T(4^k/4)+k\\log_2(4)=2T(4^k/4)+2k$$\nA continuación hacemos un cambio de función $t(k)=T(4^k)$:\n$$T(n)=T(4^k)=t(k)=2t(k-1)+2k\\cdot1^k$$\nEl polinomio característico de la recurrencia $t(k)=2t(k-1)+2k\\cdot1^k$ es: $(x-2)(x-1)^2$\n\nPor tanto, la recurrencia tiene la siguiente forma:\n$$t(k)=C_12^k+C_2\\cdot1^k+C_3\\cdot k\\cdot1^k=C_12^k+C_2+C_3k$$\nPara hallar las constantes necesitamos tres casos base. En primer lugar conocemos $T(1)=t(0)=1$. Aplicando $t(k)=2t(k-1)+2k$ vemos que:\n$t(1)=2t(0)+2\\cdot1=2+2=4$\n$t(2)=2t(1)+2\\cdot2=8+4=12$\n\nPor tanto, el sistema de ecuaciones a resolver es:\n$t(0)=C_1+C_2=1$\n$t(1)=2C_1+C_2+C_3=4$\n$t(2)=4C_1+C_2+2C_3=12$\n\nLas soluciones son $C_1=5$, $C_2=-4$ y $C_3=-2$. Por tanto: $t(k)=5\\cdot2^k-4-2k$\n\nFinalmente, debemos deshacer el cambio de variable. Por un lado, dado el cambio de variable aplicado, $k=\\log_4(n)$. Además, $n=4^k=(2^2)^k=2^{2k}=(2^k)^2$. Por tanto, $2^k=\\sqrt{n}$. De esta manera la expresión final para $T(n)$ es:\n$$T(n)=5\\sqrt{n}-4-2\\log_4(n)\\in\\Theta[\\sqrt{n}]$$",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 4.45
   },
   {
    "id": "2019-20_analisis_junio_sol#5",
    "n": "5",
    "title": "Ejercicio 5",
    "points": 3.0,
    "durationMin": 15,
    "kind": "analisis",
    "statement": "Resolved la siguiente relación de recurrencia por el método de expansión de recurrencias:\n$$T(n)=\\begin{cases}1 & \\text{si } n=1,\\\\ 2T(n/4)+\\sqrt{n} & \\text{si } n>1.\\end{cases}$$",
    "solution": "Procedemos a expandir la recurrencia:\n$T(n)=2T(n/4)+\\sqrt{n}$\n$=2\\left(2T(n/4^2)+\\sqrt{n/4}\\right)+\\sqrt{n}$\n$=4T(n/4^2)+2\\sqrt{n}$\n$=4\\left(2T(n/4^3)+\\sqrt{n/4^2}\\right)+2\\sqrt{n}$\n$=8T(n/4^3)+3\\sqrt{n}$\n$\\vdots$\n$=2^iT(n/4^i)+i\\sqrt{n}$\n\nSe llega al caso base cuando $n/4^i=1$. Es decir, cuando $n=4^i$, o de manera equivalente, cuando $i=\\log_4(n)$. Además, como $n=4^i=(2^2)^i=2^{2i}=(2^i)^2$ entonces $2^i=\\sqrt{n}$. Sustituyendo:\n$$T(n)=\\sqrt{n}\\,T(1)+\\log_4(n)\\cdot\\sqrt{n}=\\sqrt{n}+\\sqrt{n}\\cdot\\log_4(n)\\in\\Theta[\\sqrt{n}\\log(n)]$$",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "exam",
    "diff": 4.44
   }
  ],
  "kind": "analisis"
 },
 {
  "id": "2019-20_diseno_mostoles_junio_sol",
  "title": "Soluciones examen diseño – junio 2019-2020 Móstoles",
  "durationMin": null,
  "exercises": [
   {
    "id": "2019-20_diseno_mostoles_junio_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 2.0,
    "durationMin": 20,
    "kind": "diseno",
    "statement": "Implementa un algoritmo recursivo que reciba una lista de elementos (se pueden considerar números reales) y genere dos listas. La primera contendrá los elementos que se encuentren en índices pares, mientras que la segunda contendrá los elementos que se encuentran en índices impares. Suponed que el primer índice de una lista es el 0. Por ejemplo, dada la lista $a=[3,6,5,7,0,9,2]$, el algoritmo generará las listas: $a_{par}=[3,5,0,2]$ y $a_{impar}=[6,7,9]$",
    "solution": "En Python se pueden devolver varias salidas simultáneamente. El siguiente código devuelve las dos listas mediante una \"tupla\" (solo hay que especificar las salidas entre paréntesis y separadas por comas). Si la lista de entrada es vacía se devuelven dos listas vacías. Si tiene un elemento la lista de índices pares será la propia lista, mientras que la de impares será vacía. En el caso recursivo se extraen las listas de índices pares e impares de toda la lista exceptuando al último elemento (mediante una llamada recursiva). Después, lo único que falta es concatenar el último elemento a la lista de índices pares o impares, dependiendo de la paridad de la longitud de la lista original.\n\n```python\ndef extrae_indices_pares_impares(a):\n    n = len(a)\n    if n==0:\n        return ([],[])\n    elif n==1:\n        return (a,[])\n    else:\n        (lista_pares , lista_impares) = extrae_indices_pares_impares(a[:n-1])\n\n        if n %2==0:\n            return (lista_pares , lista_impares + [a[n-1]])\n        else:\n            return (lista_pares + [a[n-1]], lista_impares)\n```",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 4.31
   },
   {
    "id": "2019-20_diseno_mostoles_junio_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 3.0,
    "durationMin": 30,
    "kind": "diseno",
    "statement": "Implementa un algoritmo basado en la estrategia de DIVIDE Y VENCERÁS para evaluar un polinomio $P$ de grado $n-1$: $P=c_{n-1}x^{n-1}+\\cdots+c_1x+c_0$ en un determinado valor real $x$. Evaluar un polinomio simplemente consiste en determinar qué valor toma el polinomio para un valor de $x$ concreto. Por ejemplo, si $P=2x^3-x+2$, evaluarlo en $x=1$ sería calcular $P(1)=2\\cdot(1)^3-1+2=3$.\n\nEl polinomio se definirá mediante una lista $c=[c_0,c_1,\\ldots,c_{n-1}]$ de longitud $n$, que contiene los coeficientes (reales) del polinomio. Además, el algoritmo de divide y vencerás se basará necesariamente en el método descrito en el Ejercicio 1 para dividir la lista $c$ en dos: $a_{par}=[c_0,c_2,\\ldots]$ y $a_{impar}=[c_1,c_3,\\ldots]$. Se puede asumir que habéis implementado correctamente el método del Ejercicio 1 (podéis hacer llamadas al método como si estuviese implementado en alguna librería).",
    "solution": "Si el polinomio es una constante $c$ tendrá longitud 1, y el resultado siempre será $c_0$. En caso contrario el polinomio se descompone en dos según los índices pares e impares. Por ejemplo, supongamos que deseamos evaluar $P(x)=2x^6+9x^5+0x^4+7x^3+5x^2+6x+3$ en un valor de $x$. La lista asociada al polinomio $c=[3,6,5,7,0,9,2]$ primero se divide en: $a_{pares}=[3,5,0,2]$ y $a_{impares}=[6,7,9]$\n\nEsta descomposición daría lugar a dos subproblemas asociados a la evaluación de los polinomios: $P_{pares}(x)=2x^3+0x^2+5x^1+3$ y $P_{impares}(x)=9x^2+7x^1+6$\n\nPara obtener el algoritmo de divide y vencerás hay que pensar en cómo podemos modificar y combinar las soluciones a estos subproblemas (que obtenemos mediante llamadas recursivas). Para este problema si evaluamos $P_{pares}$ y $P_{impares}$ en $x^2$ obtendríamos: $P_{pares}(x^2)=2x^6+0x^4+5x^2+3$ y $P_{impares}(x^2)=9x^4+7x^2+6$ cuya suma es casi $P(x)$. Lo único que faltaría sería multiplicar el polinomio de índices impares por $x$. Por tanto, podemos recuperar $P(x)$ de la siguiente manera, lo cual nos indica la regla recursiva:\n$$P(x)=P_{pares}(x^2)+x\\cdot P_{impares}(x^2).$$\n\n```python\ndef evalua_polinomio(c, x):\n    if len(c)==1:\n        return c[0]\n    else:\n        (cp,ci) = extrae_indices_pares_impares(c)\n\n        return evalua_polinomio(cp, x*x) + x*evalua_polinomio(ci, x*x)\n```",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "exam",
    "diff": 5.4
   },
   {
    "id": "2019-20_diseno_mostoles_junio_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 5.0,
    "durationMin": 50,
    "kind": "diseno",
    "statement": "Implementa un algoritmo basado en la técnica de BACKTRACKING para generar permutaciones con repetición. Los datos de entrada son una lista $a=[a_0,a_1,\\ldots,a_{m-1}]$ de $m$ elementos distintos, y otra lista $r=[r_0,r_1,\\ldots,r_{m-1}]$, también de longitud $m$, que indica el número de veces que un elemento de $a$ debe aparecer en cada permutación. En concreto, $r_i$ indica el número de repeticiones de $a_i$ en una permutación. Esto implica que las permutaciones tendrán $n=r_0+r_1+\\cdots+r_{m-1}$ elementos.\n\nPor ejemplo, para $a=$ ['a','b','c'] y $r=[1,2,1]$, generaremos permutaciones de $n=4$ elementos en las que 'a' y 'c' aparecerán una vez, y 'b' dos veces. En este ejemplo las permutaciones con repetición son:\ncbba, cbab, cabb, bcba, bcab, bbca, bbac, bacb, babc, acbb, abcb, abbc\n\nEl método a desarrollar debe imprimir todas las permutaciones con repetición. Además, debe calcular el número $P$ de permutaciones generadas, a medida que las va creando. Podéis verificar si el algoritmo está generando $P$ correctamente ya que:\n$$P=\\frac{n!}{r_0!\\cdot r_1!\\cdot\\ldots\\cdot r_{m-1}!}$$\nEn el ejemplo, $P=4!/(1!\\cdot2!\\cdot1!)=12$.\nSe valorará el uso de estructuras de datos para acelerar la comprobación de validez de candidatos/soluciones parciales.",
    "solution": "La solución es muy parecida al algoritmo para generar permutaciones (sin repetición) visto en teoría (transparencias/libro). En ese método se usaba una lista de valores Booleanos que indicaban si un elemento todavía no se había utilizado en la permutación (es decir, si estaba libre). Esa lista también se puede interpretar como una lista binaria, donde un 0 indica que ya no puedes usar un elemento, mientras que un 1 indica que se puede utilizar una vez. Es decir, podemos interpretar que la lista indica el número de veces que puedes usar un elemento. Pues bien, para generar permutaciones con repetición el algoritmo es prácticamente idéntico, pero esa lista podrá tener valores mayores que 1. En concreto, inicialmente contendrá el número de repeticiones de los elementos. Es decir, la lista será precisamente $r$. Si la vamos modificando a medida que avance el algoritmo la condición de validez es simplemente $r_k>0$ para el $k$-ésimo elemento. Además, debemos decrementar $r_k$ si incorporamos el elemento $k$ a la solución parcial, y debemos incrementar $r_k$ al retornar de la llamada recursiva. Por último, en el caso base se imprime una permutación y se devuelve un 1. En el caso recursivo se acumulan los resultados de las llamadas en la variable $s$, por lo que el método acaba devolviendo el número de permutaciones halladas.\n\n```python\ndef genera_permutaciones_repeticion(i,sol,r,a):\n    n = len(sol)\n    m = len(a)\n\n    # Caso base\n    if i==n:\n        for i in range(0,n):\n            print(sol[i],' ',end='')\n        print()\n\n        return 1\n    else:\n        s = 0 # Número de permutaciones halladas\n\n        # Genera candidatos (todos los posibles elementos)\n        for k in range(m):\n\n            # Comprueba su validez\n            if r[k]>0:\n\n                # Incluye candidato en solución parcial\n                sol[i] = a[k]\n\n                # Decrementa el número de apariciones del candidato k\n                r[k] = r[k]-1\n\n                # Expande la solución parcial a partir de la posición i+1\n                s = s + genera_permutaciones_repeticion(i+1,sol,r,a)\n\n                # Incrementa el número de apariciones del candidato k\n                r[k] = r[k]+1\n\n        return s     # Devolvemos el valor acumulado en s\n\ndef genera_permutaciones_repeticion_wrapper(a,r):\n    n = 0\n    for i in range(len(r)):\n        n = n + r[i]\n\n    sol = [None] * n\n    nsols = genera_permutaciones_repeticion(0,sol,r,a)\n    print('Permutaciones con repetición halladas = ',nsols)\n\n    # Comprobación opcional\n    m = len(r)\n    p = 1\n    for i in range(m):\n        p = p * factorial(r[i])\n    print('Permutaciones con repetición correctas = ',\n          int(factorial(n)/p))\n\n# Ejemplo\ngenera_permutaciones_repeticion_wrapper(['a','b','c'],[1,2,1])\n```",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 6.88
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2019-20_diseno_vicalvaro_junio_sol",
  "title": "Soluciones examen diseño – junio 2019-2020 Vicálvaro",
  "durationMin": null,
  "exercises": [
   {
    "id": "2019-20_diseno_vicalvaro_junio_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 3.0,
    "durationMin": 30,
    "kind": "diseno",
    "statement": "Implementa un algoritmo recursivo que, dada una lista $l=[l_0,l_1,\\ldots,l_{n-1}]$ de longitud $n$ (podéis considerar que contiene caracteres) cuyos elementos se pueden repetir, calcule el número de apariciones de cada elemento distinto de la lista. Suponiendo que $l$ contiene $m$ elementos distintos, generará dos listas de longitud $m$. La primera ($d=[d_0,d_1,\\ldots,d_{m-1}]$) contendrá los elementos distintos de $l$, mientras que la segunda ($a=[a_0,a_1,\\ldots,a_{m-1}]$) contendrá el número de apariciones de los elementos de $d$ en la lista $l$. Es decir, el elemento $d_i$ aparecerá $a_i$ veces en $l$.\n\nPor ejemplo, para $l=$ ['b','a','c','b','a','a','d','a','c','a'], el algoritmo debe generar: $d=$ ['a','c','d','b'] y $a=[5,2,1,2]$ ya que 'a' aparece 5 veces en $l$, 'c' y 'b' aparecen 2 veces, y solo hay una 'd'.\n\nEl algoritmo podrá llamar a una función para buscar un elemento concreto en una lista. Esta función de búsqueda devolverá el índice en el que se encuentre el elemento, o $-1$ si éste no aparece en la lista. No es necesario implementar esta función.",
    "solution": "En Python se pueden devolver varias salidas simultáneamente. El siguiente código devuelve las dos listas mediante una \"tupla\" (solo hay que especificar las salidas entre paréntesis y separadas por comas). Si la lista de entrada es vacía se devuelven dos listas vacías. En el caso recursivo primero se resuelve el subproblema más sencillo (mediante una llamada recursiva), que en este caso contempla la lista de entrada menos su primer elemento ($l_0$). Con esta operación obtenemos una lista de elementos y otra de apariciones, y casi tenemos la solución completa, pero falta por tratar $l_0$. Primero, hacemos una búsqueda de $l_0$ en la lista de elementos. Si no lo encontramos entonces debemos aumentar la lista de elementos con $l_0$ (en este caso lo concatenamos al final) y debemos concatenar también un 1 a la de apariciones. En cambio, si $l_0$ está en la lista de elementos, en una determinada posición, entonces tendremos que incrementar el valor de la lista de apariciones en esa posición.\n\n```python\n# No es necesario implementar esta función\ndef busqueda_lineal(a, x):\n    n = len(a)\n    if a==[]:\n        return -1\n    elif a[n-1]==x:\n        return n-1\n    else:\n        return busqueda_lineal(a[:n-1], x)\n\ndef elementos_y_apariciones(a):\n    if a==[]:\n        return ([], [])\n    else:\n        (elems , aps) = elementos_y_apariciones(a[1:])\n\n        pos = busqueda_lineal(elems , a[0])\n\n        if pos==-1:\n            return (elems + [a[0]], aps + [1])\n        else:\n            aps[pos] = aps[pos]+1\n            return (elems , aps)\n\n# Ejemplo\nprint(elementos_y_apariciones(\n        ['b','a','c','b','a','a','d','a','c','a']))\n```",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 5.64
   },
   {
    "id": "2019-20_diseno_vicalvaro_junio_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.0,
    "durationMin": 20,
    "kind": "diseno",
    "statement": "Implementa un algoritmo recursivo basado en la estrategia de DIVIDE Y VENCERÁS para evaluar un polinomio $P$ de grado $n-1$: $P=c_{n-1}x^{n-1}+\\cdots+c_1x+c_0$ en un determinado valor real $x$. Evaluar un polinomio simplemente consiste en determinar qué valor toma el polinomio para un valor de $x$ concreto. Por ejemplo, si $P=2x^3-x+2$, evaluarlo en $x=1$ sería calcular $P(1)=2\\cdot(1)^3-1+2=3$.\n\nEl polinomio se definirá mediante una lista $c=[c_0,c_1,\\ldots,c_{n-1}]$ de longitud $n$, que contiene los coeficientes (reales) del polinomio. El método podrá llamar a una función para calcular una potencia $x^t$, donde $t$ es un entero (en python se puede usar la expresión x**t).",
    "solution": "Si el polinomio es una constante $c$ tendrá longitud 1, y el resultado siempre será $c_0$. En el caso recursivo realizamos dos llamadas recursivas con cada una de las mitades de $c$. El resultado será la suma de estos dos valores, pero debemos multiplicar uno de ellos por $x^m$, donde $m$ es la longitud de la primera mitad de la lista. Por ejemplo, supongamos que deseamos evaluar $P(x)=2x^6+9x^5+0x^4+7x^3+5x^2+6x+3$ en un valor de $x$. La lista asociada al polinomio $c=[3,6,5,7,0,9,2]$ primero se divide en: $c_1=[3,6,5]$ y $c_2=[7,0,9,2]$ las cuales definen: $P_1(x)=5x^2+6x+3$ y $P_2(x)=2x^3+9x^2+0x+7$\n\nFinalmente, podemos recuperar $P(x)$ sumando los dos polinomios, pero multiplicando $P_2(x)$ por $x^m$ para $m=3$, que es la longitud de $c_1$:\n$$P(x)=P_2(x)\\cdot x^m+P_1(x).$$\n\n```python\ndef eval_dyv_alt(c, x):\n    n = len(c)\n    if n==1:\n        return c[0]\n    else:\n        mitad = n//2\n\n        val_1 = eval_dyv_alt(c[:mitad], x)\n        val_2 = eval_dyv_alt(c[mitad:], x)\n\n        return val_2*(x**(mitad)) + val_1\n\n# Ejemplo\nc = [2, -3, -1, 0, 1] # x^4 - x^2 - 3x + 2\nx = 2\n\nprint(eval_dyv(c, 0, len(c)-1, x))\nprint(eval_dyv_alt(c, x))\n```",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "exam",
    "diff": 4.61
   },
   {
    "id": "2019-20_diseno_vicalvaro_junio_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 5.0,
    "durationMin": 50,
    "kind": "diseno",
    "statement": "Implementa un algoritmo basado en la técnica de BACKTRACKING para generar combinaciones con repetición de $n$ elementos tomados de $m$ en $m$. Los datos de entrada son una lista $a=[a_0,a_1,\\ldots,a_{n-1}]$ de $n$ elementos distintos, y un entero $m$ ($1\\le m\\le n$). Las combinaciones con repetición son secuencias de $m$ elementos de $a$, en las que se pueden repetir los elementos, y el orden en el que aparecen los elementos no importa.\n\nPor ejemplo, para $a=$ ['a','b','c','d'] y $m=3$ las combinaciones con repetición son:\naaa, aab, aac, aad, abb, abc, abd, acc, acd, add, bbb, bbc, bbd, bcc, bcd, bdd, ccc, ccd, cdd, ddd\n\nObservad que la combinación (a a b) indica que escoges dos 'a' y una 'b', sin importar el orden. Por eso, sería un error generar además (a b a) o (b a a).\n\nEl método a desarrollar debe imprimir todas las combinaciones con repetición. Además, debe calcular el número $C$ de permutaciones generadas, a medida que las va creando. Podéis verificar si el algoritmo está generando $C$ correctamente ya que:\n$$C=\\frac{(n+m-1)!}{m!\\cdot(n-1)!}$$\nEn el ejemplo, $C=6!/(3!\\cdot3!)=20$.\nSe valorará el uso de estructuras de datos para acelerar la comprobación de validez de candidatos/soluciones parciales.",
    "solution": "La solución es muy parecida al segundo esquema para generar subconjuntos, en el que se obtenía una solución de tamaño $m$ en el nivel $m$ del árbol recursivo. La propiedad clave en este problema está relacionada con el orden de los elementos en la lista $a$ (notad que los caracteres en el ejemplo siempre aparecen en orden ascendente en las combinaciones). En concreto, si en la posición $i$-ésima de la solución parcial aparece el elemento $a_j$, entonces en la $i+1$ solo podremos ubicar los elementos $a_j,a_{j+1},\\ldots,a_{n-1}$. Por tanto, debemos pasarle al método un parámetro con el valor de $j$. Otra forma (menos eficiente y más confusa) de implementar el algoritmo sería considerar los $n$ candidatos de la lista $a$, mediante un bucle donde $k$ va desde 1 hasta $n$, pero usar la condición de validez $k\\ge j$. Por último, en el caso base se imprime una combinación y se devuelve un 1. En el caso recursivo se acumulan los resultados de las llamadas en la variable $s$, por lo que el método acaba devolviendo el número de combinaciones halladas.\n\n```python\ndef genera_combinaciones_repeticion(i,j,sol,a):\n    n = len(a)\n    m = len(sol)\n\n    # Caso base\n    if i==m:\n        for i in range(0,m):\n            print(sol[i],' ',end='')\n        print()\n\n        return 1\n    else:\n        s = 0\n\n        # Genera candidatos\n        for k in range(j,n):\n\n            # Incluye candidato en solución parcial\n            sol[i] = a[k]\n\n            # Expande la solución parcial en la posición i+1\n            s = s + genera_combinaciones_repeticion(i+1,k,sol,a)\n\n        return s\n\n\ndef genera_combinaciones_repeticion_wrapper(a,m):\n    sol = [None] * m\n    nsols = genera_combinaciones_repeticion(0,0,sol,a)\n    print('Combinaciones con repetición halladas = ',nsols)\n\n    # Opcional\n    n = len(a)\n    print('Combinaciones con repetición correctas = ',\n          int(factorial(n+m-1)/factorial(m)/factorial(n-1)))\n\n\n# Ejemplo\ngenera_combinaciones_repeticion_wrapper(['a','b','c','d'],3);\n```",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 6.83
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2020-21_analisis_enero",
  "title": "Examen análisis – enero 2020-2021",
  "durationMin": null,
  "exercises": [
   {
    "id": "2020-21_analisis_enero#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 2.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Demuestra utilizando la definición formal de $\\Theta$ si se verifica:\n\n$2^{\\log_3(n)}\\in\\Theta(n)$",
    "solution": "**Paso 1. Simplifica.** $2^{\\log_3 n}=n^{\\log_3 2}$ (se toma $\\log_3$ de ambos lados: $\\log_3 n\\cdot\\log_3 2$). Y $a=\\log_3 2=\\frac{\\ln2}{\\ln3}\\approx0{,}63<1$.\n\n**Paso 2. Qué exige $\\Theta(n)$.** $f\\in\\Theta(g)$ si existen $c_1,c_2>0$ y $n_0$ con $c_1\\,g(n)\\le f(n)\\le c_2\\,g(n)$ para $n\\ge n_0$. Hay que ver las dos desigualdades.\n\n**Paso 3. Cota superior: sí.** $n^{a}\\le n$ para $n\\ge1$ porque $a<1$: vale $c_2=1$, $n_0=1$.\n\n**Paso 4. Cota inferior: no.** Supón que existen $c_1>0$ y $n_0$ con $c_1\\,n\\le n^{a}$ para todo $n\\ge n_0$. Dividiendo por $n^{a}$: $c_1\\,n^{1-a}\\le1$, es decir, $n\\le c_1^{-1/(1-a)}$ para todo $n\\ge n_0$. Pero $1-a>0$, así que $n^{1-a}\\to\\infty$ y la desigualdad se rompe para $n$ grande. Contradicción.\n\n**Paso 5. Resultado.** No se verifica: $2^{\\log_3n}\\notin\\Theta(n)$ (está en $O(n)$ pero crece estrictamente más despacio: es $\\Theta(n^{\\log_32})$). $\\blacksquare$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 4.13,
    "own": true
   },
   {
    "id": "2020-21_analisis_enero#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "La fórmula para considerar todas las operaciones que se llevan a cabo en un bucle de tipo FOR o WHILE es:\n\n$T_{bucle}=1_{inicialización}+\\sum_{i=1}^{n}(1_{comparación}+T_{cuerpo}+1_{incremento})+1_{última\\ comparación}$\n\nUtilízala para hallar el número de operaciones ($T(n)$, simplificada) del siguiente código:\n```java\nfor (int i=0; i<n; i++)\n  for (int j=n; j>i; j--)\n    procesa(i,j);   // dos operaciones\n```",
    "solution": "**Paso 1. Bucle interno.** Para un $i$ dado, $j$ va de $n$ a $i+1$: $n-i$ iteraciones, cada una con el cuerpo (2 operaciones):\n$$T_j(i)=1+\\sum_{k=1}^{n-i}(1+2+1)+1=4(n-i)+2$$\n\n**Paso 2. Bucle externo.** Con $i=0,\\dots,n-1$:\n$$T(n)=1+\\sum_{i=0}^{n-1}\\big(1+T_j(i)+1\\big)+1=2+\\sum_{i=0}^{n-1}\\big(4(n-i)+4\\big)$$\n\n**Paso 3. Suma.** $\\sum_{i=0}^{n-1}(n-i)=\\frac{n(n+1)}{2}$, así:\n$$T(n)=2+4n+4\\cdot\\frac{n(n+1)}{2}=2n^2+6n+2$$\n\n**Paso 4. Comprobación.** Con $n=1$: $i=0$, $j=1$, una iteración; el bucle interno cuesta $1+(1+2+1)+1=6$ y el externo $1+(1+6+1)+1=10$, y la fórmula da $2+6+2=10$. $T(n)\\in\\Theta(n^2)$.",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "exam",
    "diff": 4.55,
    "own": true
   },
   {
    "id": "2020-21_analisis_enero#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 6.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Resuelve la siguiente relación de recurrencia:\n\n$T(n)=\\begin{cases}1&\\text{si }n=1,\\\\2T(n/4)+\\sqrt{n}&\\text{si }n>1,\\end{cases}$\n\npor el:\n(a) Método general de resolución de recurrencias [3 puntos]\n(b) Método de expansión de recurrencias [3 puntos]\n\nAdemás, indica el orden de complejidad de $T$.",
    "solution": "**Paso 1. (a) Datos.** $T(n)=2T(n/4)+n^{1/2}$: $a=2$, $b=4$, $f(n)=n^{1/2}$, $T(1)=1$. Se toma $n=4^k$.\n\n**Paso 2. (a) Cambio de variable.** Con $t_k=T(4^k)$: $t_k=2t_{k-1}+(4^k)^{1/2}=2t_{k-1}+2^k$, $t_0=1$.\n\n**Paso 3. (a) Ecuación característica.** La homogénea da $(x-2)$ y el término $2^k$ otro $(x-2)$: $(x-2)^2$. Solución: $t_k=(c_0+c_1k)\\,2^k$.\n\n**Paso 4. (a) Constantes.** $t_0=1\\Rightarrow c_0=1$. $t_1=T(4)=2\\cdot1+\\sqrt4=4$, así $(1+c_1)\\cdot2=4$ y $c_1=1$.\n\n**Paso 5. (a) Deshaz el cambio.** $2^k=\\sqrt n$ y $k=\\log_4n$:\n$$T(n)=\\sqrt n\\,(1+\\log_4n)$$\n\n**Paso 6. (b) Expansión.** $T(n)=2T(n/4)+\\sqrt n=4T(n/16)+2\\sqrt{n/4}+\\sqrt n=\\cdots$ El término del nivel $j$ es $2^j\\sqrt{n/4^j}=2^j\\sqrt n/2^j=\\sqrt n$: cada nivel aporta lo mismo. Tras $i$ pasos:\n$$T(n)=2^iT(n/4^i)+i\\sqrt n$$\n\n**Paso 7. (b) Caso base.** Con $i=k=\\log_4n$ y $T(1)=1$: $2^k=\\sqrt n$, luego $T(n)=\\sqrt n+\\sqrt n\\log_4n$, igual que por el método general.\n\n**Paso 8. Orden.** $T(n)\\in\\Theta(\\sqrt n\\log n)$. Es el caso del teorema maestro en el que $f$ coincide con $n^{\\log_ba}=n^{\\log_42}=n^{1/2}$. Comprobación: $T(16)=2T(4)+4=12$ y la fórmula da $4(1+2)=12$.",
    "skills": [
     "rec-expansion",
     "rec-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 6.39,
    "own": true
   }
  ],
  "kind": "analisis"
 },
 {
  "id": "2020-21_analisis_junio",
  "title": "Examen análisis – junio 2020-2021",
  "durationMin": 40,
  "exercises": [
   {
    "id": "2020-21_analisis_junio#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 2.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Demuestra utilizando la definición formal de $O$ si se verifica:\n\n$n^{1,5}\\in O(n^2)$",
    "solution": "**Paso 1. Qué hay que probar.** $f\\in O(g)$ si existen $c>0$ y $n_0$ con $f(n)\\le c\\,g(n)$ para todo $n\\ge n_0$. Aquí $f(n)=n^{1{,}5}$ y $g(n)=n^2$.\n\n**Paso 2. Busca $c$ y $n_0$.** Para $n\\ge1$, $n^{1{,}5}\\le n^{2}$ porque la base es $\\ge1$ y $1{,}5<2$. Basta $c=1$ y $n_0=1$.\n\n**Paso 3. Resultado.** $n^{1{,}5}\\le1\\cdot n^2$ para todo $n\\ge1$: $n^{1{,}5}\\in O(n^2)$ (sí se verifica). $\\blacksquare$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 4.11,
    "own": true
   },
   {
    "id": "2020-21_analisis_junio#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Usando la técnica de aproximación por integrales, halla la cota superior de:\n\n$\\sum_{i=1}^{n} i\\cdot\\ln(i)$\n\nsabiendo que:\n\n$\\int x\\ln(x)\\,dx=\\frac{x^2}{2}\\left(\\ln(x)-\\frac{1}{2}\\right)$",
    "solution": "**Paso 1. Función creciente.** $f(x)=x\\ln x$ es creciente para $x\\ge1$ ($f'(x)=\\ln x+1>0$). Para una función creciente, $f(i)\\le\\int_i^{i+1}f(x)\\,dx$.\n\n**Paso 2. Cota superior.** Sumando de $i=1$ a $n$:\n$$\\sum_{i=1}^{n}i\\ln i\\le\\int_1^{n+1}x\\ln x\\,dx$$\n\n**Paso 3. Evalúa la integral.** Con $F(x)=\\frac{x^2}{2}\\big(\\ln x-\\tfrac12\\big)$, $F(1)=\\frac12(0-\\frac12)=-\\frac14$:\n$$\\int_1^{n+1}x\\ln x\\,dx=F(n+1)-F(1)=\\frac{(n+1)^2}{2}\\Big(\\ln(n+1)-\\frac12\\Big)+\\frac14$$\n\n**Paso 4. Resultado.** $\\sum_{i=1}^{n}i\\ln i\\le\\frac{(n+1)^2}{2}\\big(\\ln(n+1)-\\frac12\\big)+\\frac14\\in O(n^2\\ln n)$. Comprobación con $n=2$: la suma vale $2\\ln2\\approx1{,}39$ y la cota $\\approx2{,}94$.",
    "skills": [
     "cotas-integral"
    ],
    "stage": "sumatorios",
    "src": "exam",
    "diff": 4.25,
    "own": true
   },
   {
    "id": "2020-21_analisis_junio#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 6.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Resuelve la siguiente relación de recurrencia:\n\n$T(n)=\\begin{cases}0&\\text{si }n=0,\\\\T(n-1)+n^2&\\text{si }n>0,\\end{cases}$\n\npor el método que consideréis oportuno (general o expansión de recurrencias).",
    "solution": "**Paso 1. Expande.** $T(n)=T(n-1)+n^2=T(n-2)+(n-1)^2+n^2=\\cdots$\n\n**Paso 2. Forma general.** Tras $i$ pasos: $T(n)=T(n-i)+\\sum_{j=0}^{i-1}(n-j)^2$.\n\n**Paso 3. Llega al caso base.** Con $i=n$ y $T(0)=0$:\n$$T(n)=\\sum_{k=1}^{n}k^2=\\frac{n(n+1)(2n+1)}{6}$$\n\n**Paso 4. Resultado.** $T(n)=\\frac{n(n+1)(2n+1)}{6}\\in\\Theta(n^3)$. Comprobación: $T(2)=0+1+4=5$ y la fórmula da $\\frac{2\\cdot3\\cdot5}{6}=5$.",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "exam",
    "diff": 6.27,
    "own": true
   }
  ],
  "kind": "analisis"
 },
 {
  "id": "2020-21_diseno_enero",
  "title": "Examen diseño – enero 2020-2021",
  "durationMin": null,
  "exercises": [
   {
    "id": "2020-21_diseno_enero#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 2.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide implementar un método recursivo que, dada una lista $a$ de números, devuelva otra cuyos elementos sean la suma de elementos consecutivos de $a$. Por ejemplo, para $a=[1,5,10,-2,1]$ el método devolverá la lista [6,15,8,-1]. Si la lista de entrada tiene menos de dos elementos el método deberá devolver una lista vacía.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es `len(a)`. Con menos de dos elementos no hay ninguna pareja consecutiva: lista vacía.\n\n**Paso 2. Caso recursivo.** La primera suma es $a_0+a_1$ y el resto son las sumas consecutivas de la lista sin su primer elemento (`a[1:]`).\n\n**Paso 3. Código.**\n```python\ndef sumas_consecutivas(a):\n    if len(a) < 2:\n        return []\n    return [a[0] + a[1]] + sumas_consecutivas(a[1:])\n```\n\n**Paso 4. Comprobación y coste.** Con $a=[1,5,10,-2,1]$: $[6]+[15]+[8]+[-1]=[6,15,8,-1]$. Cada llamada copia la lista (`a[1:]` y la concatenación), así que el coste es $\\Theta(n^2)$. Si importa, se evita pasando un índice $i$ en lugar de recortar la lista.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 4.43,
    "own": true
   },
   {
    "id": "2020-21_diseno_enero#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 3.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Sea $a$ un vector ordenado de $n$ enteros (pueden ser negativos) todos distintos. Se pide escribir un método recursivo de complejidad $\\Theta(\\log n)$, capaz de encontrar un índice $i$ tal que $a[i]=i$, suponiendo que tal índice $i$ exista (donde $0\\le i\\le n-1$). El método devolverá un valor $i$ en caso de que exista, y $-1$ en caso contrario. Por ejemplo, para $a=[-3,-1,0,2,4,5,13]$, el método deberá devolver 4 o 5 (en este ejemplo $a[4]=4$ y $a[5]=5$, así que el método podrá devolver cualquiera de los dos valores).",
    "solution": "**Paso 1. Idea clave.** Como los enteros están ordenados y son **distintos**, cada uno es al menos el anterior más 1: $a[i+1]\\ge a[i]+1$. Entonces $g(i)=a[i]-i$ no decrece.\n\n**Paso 2. Qué se deduce.** Mira el centro $m$:\n- $a[m]=m$: encontrado.\n- $a[m]>m$ ($g(m)>0$): para todo $j>m$ se cumple $g(j)\\ge g(m)>0$, no hay punto fijo a la derecha. Se busca a la izquierda.\n- $a[m]<m$ ($g(m)<0$): para todo $j<m$ se cumple $g(j)\\le g(m)<0$. Se busca a la derecha.\n\n**Paso 3. Código.**\n```python\ndef punto_fijo(a, ini, fin):\n    if ini > fin:\n        return -1\n    m = (ini + fin) // 2\n    if a[m] == m:\n        return m\n    if a[m] > m:\n        return punto_fijo(a, ini, m - 1)\n    return punto_fijo(a, m + 1, fin)\n# llamada inicial: punto_fijo(a, 0, len(a) - 1)\n```\n\n**Paso 4. Comprobación y coste.** Con $a=[-3,-1,0,2,4,5,13]$: $m=3$, $a[3]=2<3$, se busca en $[4,6]$; $m=5$, $a[5]=5$: devuelve $5$. Una sola llamada por nivel y rango dividido por 2: $T(n)=T(n/2)+\\Theta(1)\\in\\Theta(\\log n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 5.2,
    "own": true
   },
   {
    "id": "2020-21_diseno_enero#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 5.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide implementar un algoritmo empleando la técnica de backtracking para hallar una solución a una variante del problema de la mochila, así como el método que llamaría a dicha función recursiva.\nEn particular, se tiene un conjunto de $n$ objetos, cada uno con un peso $p_i$, para $i=0,\\ldots,n-1$, y una mochila con capacidad $C$ (el peso máximo que puede soportar la mochila). El algoritmo debe buscar un subconjunto de objetos que pueden introducirse en la mochila sin sobrepasar su capacidad $C$, y de manera que se maximice el peso de los objetos que se introducen en ella. Para obtener la máxima nota el algoritmo debe ser eficiente (usad variables auxiliares para evitar repetir cálculos, y podad el árbol recursivo en cuanto se pase de la capacidad de la mochila o no se pueda mejorar una solución hallada en un paso anterior).",
    "solution": "**Paso 1. Árbol.** Para cada objeto $i$ hay dos opciones: meterlo en la mochila o no. La solución parcial es `sol[i]` (booleano) y se lleva el `peso` acumulado.\n\n**Paso 2. Variables auxiliares.** `peso` (suma de lo metido) y `resto` (suma de los pesos de los objetos $i,\\dots,n-1$ que quedan por decidir) se actualizan en $O(1)$ al bajar, sin recalcular sumas.\n\n**Paso 3. Podas.**\n- Si `peso > C` no cabe y no cabrá más: se corta.\n- Si `peso + resto <= mejor`: ni metiendo todo lo que queda se mejora lo ya hallado: se corta.\n\n**Paso 4. Código.** `mejor` es una lista `[peso, solución]`. Empieza en `[0, [False]*n]`: la mochila vacía es una solución válida de peso $0$.\n```python\ndef mochila(i, peso, resto, p, C, sol, mejor):\n    if peso > C:\n        return\n    if peso + resto <= mejor[0]:\n        return\n    if i == len(p):                  # aquí peso > mejor[0] y peso <= C\n        mejor[0] = peso\n        mejor[1] = sol.copy()\n        return\n    sol[i] = True                    # meterlo\n    mochila(i + 1, peso + p[i], resto - p[i], p, C, sol, mejor)\n    sol[i] = False                   # no meterlo\n    mochila(i + 1, peso, resto - p[i], p, C, sol, mejor)\n\ndef mochila_wrapper(p, C):\n    mejor = [0, [False] * len(p)]\n    mochila(0, 0, sum(p), p, C, [False] * len(p), mejor)\n    return mejor                     # [peso total, objetos metidos]\n```\n\n**Paso 5. Por qué es correcto y coste.** En una hoja el peso no supera $C$ y ha pasado la poda del mejor, luego es estrictamente mejor y se guarda. Se asume que los pesos no son negativos (así `peso` sólo crece y `resto` sólo disminuye). En el peor caso $O(2^n)$, pero las dos podas reducen el árbol en la práctica; probar primero \"meterlo\" encuentra pronto soluciones buenas.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 6.61,
    "own": true
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2020-21_diseno_junio",
  "title": "Examen diseño – junio 2020-2021",
  "durationMin": 75,
  "exercises": [
   {
    "id": "2020-21_diseno_junio#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 3.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide implementar un algoritmo recursivo para calcular el determinante de una matriz cuadrada $A$ de dimensiones $n\\times n$, cuyos elementos son $a_{i,j}$, por el método de los adjuntos.\nEl determinante a calcular se puede definir como:\n\n$|A|=\\sum_{i=0}^{n-1}(-1)^i a_{i,0}\\cdot|M_{i,0}|$\n\ndonde $M_{i,j}$ es la matriz complementaria de $a_{i,j}$, es decir, la resultante de eliminar la fila $i$ y la columna $j$ de la matriz $A$. Nota: en esta fórmula se consideran los matrices complementarias de la primera columna ($j=0$). También se puede hallar el determinante considerando las de otras filas o columnas, pero implementad el algoritmo según la fórmula descrita.\nEl algoritmo usará matrices de la librería numpy. Para implementar el algoritmo solo necesitaréis lo siguiente:\n- Se asume que habéis importado numpy mediante: `import numpy as np`\n- `A[i][j]` representa al elemento $a_{i,j}$\n- `len(A)` es el número de filas de A\n- `B = np.copy(A)` realiza una copia de A y la guarda en B\n- `B = np.delete(B,f,0)` elimina la fila f de la matriz B\n- `B = np.delete(B,0,1)` elimina la columna 0 de la matriz B\n\nFinalmente, el método puede contener bucles, pero debe llamarse a sí mismo necesariamente ya que debe ser recursivo.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es $n$, la dimensión. Una matriz $1\\times1$ tiene como determinante su único elemento.\n\n**Paso 2. Caso recursivo.** Se aplica la fórmula por la primera columna: para cada fila $i$ se construye la matriz complementaria $M_{i,0}$ (sin la fila $i$ ni la columna 0), se calcula su determinante recursivamente y se suma $(-1)^i\\,a_{i,0}\\,|M_{i,0}|$.\n\n**Paso 3. Código.**\n```python\nimport numpy as np\n\ndef determinante(A):\n    n = len(A)\n    if n == 1:\n        return A[0][0]\n    d = 0\n    for i in range(n):\n        M = np.copy(A)\n        M = np.delete(M, i, 0)       # quita la fila i\n        M = np.delete(M, 0, 1)       # quita la columna 0\n        d += (-1) ** i * A[i][0] * determinante(M)\n    return d\n```\n\n**Paso 4. Comprobación y coste.** Con $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$: $i=0$ da $a\\cdot d$ y $i=1$ da $-c\\cdot b$: $ad-bc$. Cada llamada hace $n$ llamadas de tamaño $n-1$: $T(n)=n\\,T(n-1)+\\Theta(n^2)\\in\\Theta(n!)$ (con los factores de copiar matrices).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 6.14,
    "own": true
   },
   {
    "id": "2020-21_diseno_junio#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 7.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Sea un grafo $G$ no dirigido, y no ponderado, compuesto por $n$ vértices. El grafo $G$ estará definido mediante una matriz de adyacencia simétrica y cuadrada $A$ de tamaño $n\\times n$, cuyos elementos serán 0 o 1. Si el elemento $a_{i,j}=0$ no habrá una arista conectando a los vértices $i$ y $j$, mientras que si $a_{i,j}=1$ sí que habrá una arista conectándolos y serán adyacentes. Se asumirá que no habrá aristas desde un vértice a sí mismo (es decir, $a_{i,i}=0$ para todo $i$).\nSe pide implementar un algoritmo recursivo basado en la técnica de backtracking para encontrar un ciclo Euleriano en un grafo. Un ciclo Euleriano es un camino que pasa por cada arista una y solo una vez, y comienza y termina en el mismo vértice. Se puede entender como una secuencia de los vértices del grafo, en la que vértices contiguos en la secuencia deben estar conectados mediante una arista en el grafo, y donde el primer vértice debe ser igual al último.\nLa siguiente figura ilustra un ejemplo en el que una posible solución es la secuencia:\n\n$\\langle 0,1,2,3,1,4,3,5,4,2,0\\rangle$\n\n[figura: grafo de 6 vértices (0..5) cuya matriz de adyacencia es A]\n$$A=\\begin{pmatrix}0&1&1&0&0&0\\\\1&0&1&1&1&0\\\\1&1&0&1&1&0\\\\0&1&1&0&1&1\\\\0&1&1&1&0&1\\\\0&0&0&1&1&0\\end{pmatrix}$$\n\nAristas: 0-1, 0-2, 1-2, 1-3, 1-4, 2-3, 2-4, 3-4, 3-5, 4-5.\n\nEl algoritmo debe parar en cuanto encuentre un ciclo Euleriano, e imprimir la secuencia de vértices que lo compone, en caso de existir. Se puede asumir que la secuencia empezará en el vértice 0. Se valorará la eficiencia del algoritmo desarrollado.",
    "solution": "**Paso 1. Qué es un ciclo euleriano.** Una secuencia de vértices que recorre cada arista exactamente una vez y acaba donde empezó. Si hay $m$ aristas, la secuencia tiene $m+1$ vértices.\n\n**Paso 2. Condición previa (eficiencia).** Un ciclo euleriano exige que todos los vértices tengan grado par. Se comprueba al principio: si alguno es impar, se responde \"no hay\" sin buscar. (Con grados pares y todas las aristas en una sola componente siempre existe.)\n\n**Paso 3. Solución parcial.** `camino` empieza en $[0]$. En cada nivel se elige una arista **no usada** que salga del último vértice $u$. Para marcar las usadas se pone `A[u][v] = A[v][u] = 0` y se restaura al volver atrás. Así un candidato es simplemente un $v$ con `A[u][v] == 1`.\n\n**Paso 4. Solución completa.** Cuando `camino` tiene $m+1$ vértices ya se han usado todas las aristas. Como todos los grados son pares, el camino cerrado vuelve a $0$, pero se comprueba igualmente.\n\n**Paso 5. Parar al encontrar.** La función devuelve un booleano: cuando una rama tiene éxito, devuelve `True` sin deshacer nada y las llamadas superiores terminan.\n\n**Paso 6. Código.**\n```python\ndef ciclo_euleriano(A):\n    n = len(A)\n    A = [fila[:] for fila in A]              # copia: se va modificando\n    m = sum(sum(fila) for fila in A) // 2\n    if any(sum(fila) % 2 for fila in A):     # grado impar: no hay ciclo\n        return None\n    camino = [0]\n\n    def bt(u):\n        if len(camino) == m + 1:\n            return u == 0\n        for v in range(n):\n            if A[u][v] == 1:\n                A[u][v] = A[v][u] = 0        # usa la arista\n                camino.append(v)\n                if bt(v):\n                    return True\n                camino.pop()\n                A[u][v] = A[v][u] = 1        # vuelta atrás\n        return False\n\n    return camino if bt(0) else None\n\n# ciclo_euleriano(A) con la matriz del enunciado devuelve\n# [0, 1, 2, 3, 1, 4, 3, 5, 4, 2, 0]\n```\n\n**Paso 7. Comprobación y coste.** El grafo del enunciado tiene grados $2,4,4,4,4,2$ (todos pares) y $10$ aristas, así que devuelve un camino de $11$ vértices que empieza y acaba en $0$. La secuencia exacta depende del orden en que se recorren los vecinos, y el enunciado sólo da una de las posibles. En el peor caso el coste es exponencial; la comprobación de grados evita buscar cuando no puede haber solución, y marcar las aristas usadas sobre la matriz evita recorrerlas dos veces.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 8.5,
    "own": true
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2021-22_analisis_mayo_sol",
  "title": "Soluciones examen análisis – mayo 2021-2022",
  "durationMin": 50,
  "exercises": [
   {
    "id": "2021-22_analisis_mayo_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 1.5,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Analiza aplicando la definición formal de $O$ si se verifica:\n$$n^3+6n^2-11n+6\\in O(n^3)$$",
    "solution": "Como nos piden demostrar una expresión que involucra a $O$ debemos encontrar una pareja de constantes $c>0$ y $n_0>0$ tal que se verifique:\n$$n^3+6n^2-11n+6\\le c\\cdot n^3,$$\npara todo $n\\ge n_0$. Como queremos que el miembro derecho sea mayor o igual que el izquierdo debemos escoger una $c>1$. Por ejemplo, $c=2$. En ese caso tenemos:\n$$n^3+6n^2-11n+6\\le 2n^3,$$\n$$0\\le n^3-6n^2+11n-6.$$\nFactorizando el polinomio (por ejemplo, por Ruffini) tenemos:\n$$0\\le(n-1)(n-2)(n-3),$$\nlo cual es cierto para todo $n\\ge3$. Por tanto, para $c=2$ podemos escoger $n_0=3$, y hemos encontrado una pareja de constantes que verifica la definición de $O$ y podemos afirmar que $n^3+6n^2-11n+6\\in O(n^3)$.",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "exam",
    "diff": 3.57
   },
   {
    "id": "2021-22_analisis_mayo_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.5,
    "durationMin": null,
    "kind": "analisis",
    "statement": "La fórmula para considerar todas las operaciones que se llevan a cabo en un bucle de tipo FOR o WHILE es:\n$$T_{bucle}=1_{inicialización}+\\sum^{n}(1_{comparación}+T_{cuerpo}+1_{incremento})+1_{última\\ comparación}$$\nUtilízala para hallar el número de operaciones ($T(n)$, simplificada) del siguiente código:\n```java\nfor (int i=1; i<n; i++)\n    for (int j=0; j<2i; j++)\n        procesa(i,j); // dos operaciones\n```",
    "solution": "En este caso, la función T que mide el número de operaciones (en función de n) será igual a la función asociada al bucle externo:\n$$T(n)=1+\\sum_{i=1}^{n-1}(1+T_{bucle\\_interno}+1)+1,$$\nmientras que\n$$T_{bucle\\_interno}=1+\\sum_{j=0}^{2i-1}(1+T_{cuerpo}+1)+1.$$\nComo $T_{cuerpo}=2$, por la instrucción `procesa(i,j)` tenemos:\n$$T_{bucle\\_interno}=1+\\sum_{j=0}^{2i-1}(1+2+1)+1=2+\\sum_{j=0}^{2i-1}4=2+4(2i)=2+8i.$$\nSustituyendo en $T(n)$ obtenemos:\n$$T(n)=2+\\sum_{i=1}^{n-1}(2+2+8i)=2+\\sum_{i=1}^{n-1}4+8\\sum_{i=1}^{n-1}i.$$\nResolviendo los sumatorios obtenemos:\n$$T(n)=2+4(n-1)+8\\frac{(n-1)n}{2}.$$\nFinalmente, simplificando:\n$$T(n)=2+4n-4+4n^2-4n=4n^2-2.$$",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "exam",
    "diff": 4.5
   },
   {
    "id": "2021-22_analisis_mayo_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Resuelve la siguiente relación de recurrencia por el método de EXPANSIÓN de recurrencias, e indica su orden:\n$$T(n)=\\begin{cases}0&\\text{si }n=1,\\\\3T(n/3)+n^2&\\text{si }n>1.\\end{cases}$$",
    "solution": "Procedemos a expandir la recurrencia:\n$$\\begin{aligned}T(n)&=3T(n/3)+n^2\\\\&=3\\left(3T(n/9)+\\left(\\tfrac n3\\right)^2\\right)+n^2=9T(n/9)+\\tfrac{n^2}{3}+n^2\\\\&=9\\left(3T(n/27)+\\left(\\tfrac n9\\right)^2\\right)+\\tfrac{n^2}{3}+n^2=27T(n/27)+\\tfrac{n^2}{9}+\\tfrac{n^2}{3}+n^2\\\\&\\ \\ \\vdots\\\\&=3^iT(n/3^i)+n^2\\left(1+\\tfrac13+\\tfrac1{3^2}+\\cdots+\\tfrac1{3^{i-1}}\\right)=3^iT(n/3^i)+n^2\\sum_{j=0}^{i-1}\\left(\\tfrac13\\right)^j\\end{aligned}$$\nEl sumatorio es una simple serie geométrica:\n$$\\sum_{j=0}^{i-1}\\left(\\tfrac13\\right)^j=\\frac{\\left(\\frac13\\right)^i-1}{\\frac13-1}=\\frac{\\frac1{3^i}-1}{-\\frac23}=\\frac32\\cdot\\frac{3^i-1}{3^i}.$$\nSe llega al caso base cuando $n/3^i=1$. Es decir, cuando $n=3^i$. Sustituyendo tenemos:\n$$T(n)=nT(1)+n^2\\cdot\\frac32\\cdot\\frac{n-1}{n}=n\\cdot0+\\frac32n(n-1)=\\frac32n^2-\\frac32n\\in\\Theta(n^2).$$",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "exam",
    "diff": 4.45
   },
   {
    "id": "2021-22_analisis_mayo_sol#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 3.0,
    "durationMin": null,
    "kind": "analisis",
    "statement": "Resuelve la siguiente relación de recurrencia (incluyendo las constantes) por el método GENERAL de resolución de recurrencias, e indica su orden:\n$$T(n)=\\begin{cases}0&\\text{si }n=1,\\\\3T(n/3)+n^2&\\text{si }n>1.\\end{cases}$$",
    "solution": "Para poder aplicar el método tenemos que hacer el cambio de variable $n=3^k$. En ese caso podemos reescribir la expresión para $T(n)$ de la siguiente manera:\n$$T(n)=T(3^k)=3T(3^k/3)+(3^k)^2=3T(3^{k-1})+3^{2k}=3T(3^{k-1})+9^k.$$\nA continuación hacemos un cambio de función $t(k)=T(3^k)$:\n$$T(n)=T(3^k)=t(k)=3t(k-1)+9^k.$$\nEl polinomio característico de la recurrencia $t(k)$ es:\n$$(x-3)(x-9).$$\nPor tanto, la recurrencia tiene la siguiente forma:\n$$t(k)=C_13^k+C_29^k.$$\nDeshaciendo los cambios tenemos:\n$$T(n)=C_1n+C_2n^2.$$\nPara hallar las constantes necesitamos dos casos base. En primer lugar conocemos $T(1)=0$ del enunciado. Por otro lado,\n$$T(3)=3T(1)+3^2=9.$$\nPor tanto, el sistema de ecuaciones a resolver es:\n$$\\begin{cases}T(1)=C_1+C_2=0\\\\T(3)=3C_1+9C_2=9\\end{cases}$$\nLas soluciones son $C_1=-3/2$ y $C_2=3/2$. Por tanto:\n$$T(n)=\\frac32n^2-\\frac32n\\in\\Theta(n^2).$$",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "exam",
    "diff": 4.5
   }
  ],
  "kind": "analisis"
 },
 {
  "id": "2021-22_diseno_enero_sol",
  "title": "Soluciones examen diseño – enero 2021-2022",
  "durationMin": null,
  "exercises": [
   {
    "id": "2021-22_diseno_enero_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 2.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Diseña un método recursivo basado en la técnica de divide y vencerás que, dada una lista `a` de números, devuelva una lista cuyos elementos sean la suma de dos elementos consecutivos de `a`. Por ejemplo, si `a = [3, 5, −2, 8]`, el método debe devolver `[8, 3, 6]`. Se asumirá que la lista `a` no es vacía.",
    "solution": "Al aplicar divide y vencerás sobre una lista la estrategia debe basarse en las soluciones a los subproblemas que consideran las dos mitades de la lista de entrada. Para este problema el diagrama recursivo (como los vistos en clase) podría ser:\n\n```\nEntrada                          Resultado\n[7, 3, 4, 8, 3, -6, -4, 5]  -->  [10, 7, 12, 11, -3, -10, 1]\n                                 = [10, 7, 12] + [11] + [-3, -10, 1]\n  [7, 3, 4, 8]              -->  [10, 7, 12]\n  [3, -6, -4, 5]            -->  [-3, -10, 1]\n```\n\nLa regla recursiva debe concatenar el resultado del primer subproblema con la (lista de la) suma de los elementos centrales, y luego con el resultado del segundo subproblema. El código resultante podría ser el siguiente, donde se retorna una lista vacía en el caso base (cuando la lista de entrada solo tiene un elemento):\n\n```python\ndef f(a):\n    if len(a)==1:\n        return []\n    else:\n        mitad = len(a)//2\n\n        return f(a[:mitad]) + [a[mitad-1]+a[mitad]] + f(a[mitad:])\n```",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "exam",
    "diff": 4.11
   },
   {
    "id": "2021-22_diseno_enero_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 3.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Dada una circunferencia C de radio r centrada en el origen, y un punto q en el plano, se pide implementar una variante recursiva del algoritmo de bipartición (también denominado \"bisección\") para hallar el punto de corte s entre C y el segmento cuyos extremos son el origen y q. [figura: circunferencia C de radio r centrada en (0,0); segmento del origen a q (fuera de C); s es el punto donde el segmento corta a C.]\n\nSe recuerda que la función que define la circunferencia C es: $x^2+y^2=r^2$. Además, un punto $p=(p_x,p_y)$ se encontrará:\n- Dentro de C si $p_x^2+p_y^2<r^2$,\n- fuera de C si $p_x^2+p_y^2>r^2$,\n- exactamente sobre C si $p_x^2+p_y^2=r^2$.\n\nSe asumirá que el punto q inicial estará fuera de la circunferencia.\nPor último, el método debe parar cuando la distancia entre el punto hallado por el algoritmo y el punto s sea menor o igual a un valor $\\epsilon$ muy pequeño. Este valor se pasará como parámetro a la función a implementar.",
    "solution": "El algoritmo debe considerar como posible aproximación a s el punto medio (llamémosle z) de un segmento tq, donde inicialmente t es el origen (0, 0). Posteriormente hará varias llamadas recursivas, dividiendo el segmento por dos, y analizando solo la mitad que pueda contener a s. El algoritmo irá dividiendo el segmento progresivamente hasta encontrar la solución exacta o hasta que su longitud sea lo suficientemente pequeña. A continuación se muestra una posible implementación:\n\n```python\ndef modulo(v):\n    return math.sqrt(v[0]**2 + v[1]**2)\n\ndef biparticion_listas(r, t, q, epsilon):\n    # Punto medio entre t y q\n    z = [(t[0]+q[0])/2, (t[1]+q[1])/2]\n\n    # Vector q-t. Su módulo es la distancia entre t y q\n    q_t = [q[0]-t[0], q[1]-t[1]]\n\n    if modulo(z)==r or modulo(q_t)<=2*epsilon:\n        return z\n    elif modulo(z) > r:\n        return biparticion_listas(r, t, z, epsilon)\n    else:\n        return biparticion_listas(r, z, q, epsilon)\n```\n\nEl caso base corresponde a la situación en la que se halla la solución exacta (porque $\\|z\\|=r$), o si la aproximación es lo suficientemente buena. Este segundo caso se da cuando la distancia entre t y q es menor que $2\\epsilon$, ya que asegura que la distancia entre z y s sea menor que $\\epsilon$. En ambos casos el algoritmo devuelve z.\nEn los casos recursivos resolvemos el mismo problema pero usando un segmento cuya longitud es la mitad de la del original. Si el punto medio z se encuentra fuera de la circunferencia debemos usar tz, mientras que si está dentro debemos usar zq. Esto garantiza que la solución (s) esté contenida en el segmento considerado.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 5.46
   },
   {
    "id": "2021-22_diseno_enero_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 5.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Sea un grafo G no dirigido compuesto por n vértices, indexados desde 0 hasta $n-1$. El grafo G estará definido mediante una matriz de adyacencia simétrica y cuadrada A de tamaño $n\\times n$, cuyos elementos serán 0 o 1. Si el elemento $a_{i,j}=0$ no habrá una arista conectando a los vértices i y j, mientras que si $a_{i,j}=1$ sí que habrá una arista conectándolos y serán adyacentes. Se asumirá que no habrá aristas desde un vértice a sí mismo (es decir, $a_{i,i}=0$ para todo i). A continuación se muestra un ejemplo de un grafo con n = 6 nodos, donde los números en el grafo representan índices de los nodos:\n\n[figura: hexágono con nodos 0..5; aristas 0-1, 0-3, 0-5, 1-2, 1-4, 2-3, 3-4, 3-5]\n\n$$A=\\begin{pmatrix}0&1&0&1&0&1\\\\1&0&1&0&1&0\\\\0&1&0&1&0&0\\\\1&0&1&0&1&1\\\\0&1&0&1&0&0\\\\1&0&0&1&0&0\\end{pmatrix}$$\n\nSe pide implementar un algoritmo basado en la técnica de backtracking para etiquetar los nodos del grafo con números diferentes desde 0 hasta $n-1$ con las siguientes condiciones:\n- Las etiquetas de dos nodos adyacentes (conectados mediante una arista) no pueden ser números consecutivos.\n- Por otro lado, considerad que ponderamos las aristas con pesos correspondientes a los valores absolutos de las diferencias entre las etiquetas de nodos adyacentes. El algoritmo debe asignar etiquetas a los nodos de manera que se minimice la suma total de estos pesos.\n\nLa siguiente figura ilustra dos ejemplos donde los números dentro de los nodos circulares son las etiquetas, y los números en los cuadrados son los pesos de las aristas. En este caso la solución óptima corresponde al grafo etiquetado de la derecha.\n\n[figura: dos grafos con el mismo esquema de aristas, etiquetas dentro de los nodos y pesos |diferencia| en cada arista]\n- Izquierda. Etiquetas: `[0, 4, 1, 5, 2, 3]`. Suma de pesos asociados a las aristas: 2 + 2 + 3 + 3 + 3 + 4 + 4 + 5 = 26\n- Derecha. Etiquetas: `[1, 4, 0, 5, 2, 3]`. Suma de pesos asociados a las aristas: 2 + 2 + 2 + 3 + 3 + 4 + 4 + 5 = 25",
    "solution": "Como el grafo tiene n nodos y debemos asignarles una etiqueta diferente la solución consiste en hallar una *permutación*. Por tanto, podemos usar y adaptar el esquema de generación de permutaciones. Además, debemos usar parámetros para almacenar la solución (permutación) óptima y el valor óptimo que se pide minimizar. Para acelerar el algoritmo también es conveniente usar un parámetro que contenga la suma o \"coste\" (de los valores absolutos de las diferencias entre las etiquetas de nodos adyacentes) asociada a la solución parcial. Este parámetro evitará que tengamos que calcular toda la suma cada vez que se ejecute el método. Además, podremos usar su valor para podar el árbol recursivo si éste es mayor que el de la mejor solución hallada hasta el momento. Finalmente, la solución que se describe a continuación usa una función auxiliar para asegurar que no haya etiquetas consecutivas entre nodos adyacentes:\n\n```python\ndef condicion_consecutivos(k,i,sol,A):\n    for j in range(i):\n        if A[i][j]==1 and abs(k-sol[j])<=1:\n            return False\n\n    return True\n\n\ndef genera_etiquetas(i,coste,libres,sol,A,opt_val,opt_sol):\n    n = len(sol)\n\n    # Caso base\n    if i==n:\n        if coste<opt_val:  # Actualizamos opt_val y opt_sol\n            opt_val = coste\n            for j in range(n):\n                opt_sol[j] = sol[j]\n\n    else:\n        # Genera candidatos\n        for k in range(n):\n\n            # Comprueba validez del candidato\n            if libres[k] and condicion_consecutivos(k,i,sol,A):\n\n                sol[i] = k  # Incluye candidato en solución parcial\n                libres[k] = False  # Candidate k-ésimo ya no libre\n\n                # Calculamos el coste asociado a añadir la etiqueta k\n                coste_extra = 0\n                for j in range(i):\n                    if A[i][j]==1:\n                        coste_extra = coste_extra + abs(k-sol[j])\n\n                # Expande solución parcial si es posible mejorar la mejor solución hallada\n                if coste+coste_extra<opt_val:\n                    opt_val = genera_etiquetas(i+1,coste+coste_extra,libres,sol,A,\n                        opt_val,opt_sol)\n\n                libres[k] = True  # Candidate k-ésimo vuelve a estar libre\n\n    return opt_val\n\n\ndef genera_etiquetas_wrapper(A):\n    n = len(A)\n    libres = [True] * n\n    sol = [0] * n\n    opt_sol = [0] * n\n    opt_val = genera_etiquetas(0,0,libres,sol,A,n**3,opt_sol)\n```",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 7.2
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2021-22_diseno_mayo_sol",
  "title": "Soluciones examen diseño – mayo 2021-2022",
  "durationMin": 120,
  "exercises": [
   {
    "id": "2021-22_diseno_mayo_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 1.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide diseñar un algoritmo recursivo que, dada una lista $a=[a_0,a_1,\\ldots,a_{n-1}]$ de n números calcule la suma/resta alternante $s=a_0-a_1+a_2-a_3\\cdots$.",
    "solution": "Una solución muy concisa consiste en devolver $a_0$ menos la suma alternante de la lista `a[1:]` en el caso recursivo. Esto es correcto ya que el signo menos afecta a toda la suma de la llamada recursiva.\n\n```python\ndef suma_resta_alternante1(a):\n    if len(a)==0:\n        return 0\n    else:\n        return a[0] - suma_resta_alternante1(a[1:])\n```\n\nOtra solución consiste en considerar el subproblema de tamaño $n-2$ que calcula la suma alternante de los elementos $a_2,\\ldots,a_{n-1}$. El caso recursivo simplemente calcula la resta $a_0-a_1$ y le suma el resultado del subproblema. Por otro lado, en esta solución se necesitan dos casos base triviales:\n\n```python\ndef suma_resta_alternante2(a):\n    if len(a)==0:\n        return 0\n    elif len(a)==1:\n        return a[0]\n    else:\n        return a[0] - a[1] + suma_resta_alternante2(a[2:])\n```\n\nEn la siguiente solución consideramos el subproblema con la lista inicial a la que le quitamos el último elemento (`a[:-1]`). Si la longitud de la lista inicial es par el método debe devolver el resultado del subproblema menos el último elemento de la lista (`a[-1]`). En cambio, si es impar debemos sumar el último elemento. El método se puede implementar de la siguiente manera:\n\n```python\ndef suma_resta_alternante3(a):\n    if len(a)==0:\n        return 0\n    elif len(a)%2==0:\n        return suma_resta_alternante3(a[:-1]) - a[-1]\n    else:\n        return suma_resta_alternante3(a[:-1]) + a[-1]\n```",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 3.41
   },
   {
    "id": "2021-22_diseno_mayo_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 4.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "En este ejercicio se pide diseñar un algoritmo recursivo basado en la técnica de divide y vencerás que, dada una lista `a` de $2^p$ números (donde p es un entero no negativo), devuelva una lista que sea una permutación concreta de los elementos de `a`. En particular, la permutación se define invirtiendo los bits de los índices de los elementos, asumiendo que los índices son números binarios de p bits.\n\nPor ejemplo, para p = 5, considérese que un índice i es el número binario $b_4b_3b_2b_1b_0$. Entonces el índice $j=b_0b_1b_2b_3b_4$ sería el correspondiente tras haber invertido el orden de los bits de i. La permutación pedida tendrá que intercambiar los elementos ubicados en los todos los posibles índices i y j. Por ejemplo, para p = 5 el elemento `a[26]` se intercambiará con el elemento `a[11]` ya que 26 en binario es 11010, mientras que 11 es 01011. Se asumirá por tanto que los índices tomarán los valores desde 0 hasta $2^p-1$.\n\nEl siguiente ejemplo presenta un caso concreto para p = 3, con la lista `a = [3, 5, 7, 2, 4, 8, 1, 6]`:\n\nRelación entre i y j, y permutación (intercambios) para p = 3:\n\n| i | b2 b1 b0 | b0 b1 b2 | j | a[i] | a[j] |\n|---|---|---|---|---|---|\n| 0 | 0 0 0 | 0 0 0 | 0 | 3 = a[0] | a[0] = 3 |\n| 1 | 0 0 1 | 1 0 0 | 4 | 5 = a[1] | a[4] = 4 |\n| 2 | 0 1 0 | 0 1 0 | 2 | 7 = a[2] | a[2] = 7 |\n| 3 | 0 1 1 | 1 1 0 | 6 | 2 = a[3] | a[6] = 1 |\n| 4 | 1 0 0 | 0 0 1 | 1 | 4 = a[4] | a[1] = 5 |\n| 5 | 1 0 1 | 1 0 1 | 5 | 8 = a[5] | a[5] = 8 |\n| 6 | 1 1 0 | 0 1 1 | 3 | 1 = a[6] | a[3] = 2 |\n| 7 | 1 1 1 | 1 1 1 | 7 | 6 = a[7] | a[7] = 6 |\n\n(columna a[i]: lista a; columna a[j]: lista permutada)\n\nEjemplo: lista a = `[3, 5, 7, 2, 4, 8, 1, 6]`, lista permutada = `[3, 4, 7, 1, 5, 8, 2, 6]`\n\nSe podrán usar funciones auxiliares. Todas deberán ser recursivas.",
    "solution": "Como en todas las soluciones recursivas, los algoritmos se construyen asumiendo que se conocen las soluciones a subproblemas (instancias más pequeñas del mismo problema). Considérese la lista del enunciado `[3,5,7,2,4,8,1,6]`, para la cual la solución es `[3,4,7,1,5,8,2,6]`. Dividiéndola por la mitad tenemos las sublistas `[3, 5, 7, 2]` y `[4, 8, 1, 6]`. Por otro lado, la permutación para una lista genérica g de longitud 4 (p = 2) es $[g_0,g_2,g_1,g_3]$. Por tanto, aplicando la función recursiva a ambas sublistas obtendríamos $a_1=[3,7,5,2]$ y $a_2=[4,1,8,6]$. Para obtener el resultado final hay que mezclar $a_1$ con $a_2$ tomando elementos de ambas listas de manera alternante. El siguiente código muestra la función recursiva basada en divide y vencerás (`invbitperm`) y la función recursiva para mezclar las dos listas:\n\n```python\ndef mezcla(a1,a2):\n    if len(a1)==1:\n        return [a1[0],a2[0]]\n    else:\n        return [a1[0]] + [a2[0]] + mezcla(a1[1:],a2[1:])\n\ndef invbitperm(a):\n    if len(a)<=2:\n        return a\n    else:\n        mitad = len(a)//2\n        a1 = invbitperm(a[:mitad])\n        a2 = invbitperm(a[mitad:])\n        return mezcla(a1,a2)\n```\n\nOtra solución consiste en dividir la lista original en dos que contengan los elementos en índices pares e impares. Por ejemplo, podemos descomponer `[3,5,7,2,4,8,1,6]` en las listas $a_1=[3,7,4,1]$ y $a_2=[5,2,8,6]$. Aplicando el método recursivo a estas listas obtendríamos $t_1=[3,4,7,1]$ y $t_2=[5,8,2,6]$. En este caso el resultado final es la simple concatenación de $t_1$ y $t_2$: `[3,4,7,1,5,8,2,6]`. A continuación se muestra esta solución:\n\n```python\ndef pares_impares(a):\n    if a==[]:\n        return ([],[])\n    else:\n        (a1,a2) = pares_impares(a[2:])\n        return ([a[0]] + a1, [a[1]] + a2)\n\ndef invbitperm2(a):\n    if len(a)<=2:\n        return a\n    else:\n        (a1,a2) = pares_impares(a)\n        return invbitperm2(a1) + invbitperm2(a2)\n```",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "exam",
    "diff": 6.7
   },
   {
    "id": "2021-22_diseno_mayo_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 4.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Considérese un conjunto C de cardinalidad n (es decir, de n elementos). Por otro lado, sea $a=[n_1,n_2,\\ldots,n_m]$ una lista de m enteros positivos de manera que $n_1+n_2+\\cdots+n_m=n$. Se pide implementar un algoritmo basado en la técnica de backtracking para calcular el número total de particiones de C en m subconjuntos tal que el primero tenga $n_1$ elementos, el segundo tenga $n_2$ elementos, etc. En otras palabras, se pide hallar el número de formas de generar m subconjuntos de C, tal que sus cardinalidades sean precisamente $n_1,n_2,\\ldots,n_m$.\n\nPor ejemplo, si $C=\\{0,1,2,3,4\\}$, donde n = 5, y tenemos `a = [2, 1, 2]`, hay un total de 30 posibles particiones (subíndice = número de subconjunto):\n\n```\n{0,1}1 {2}2 {3,4}3    {2,3}1 {0}2 {1,4}3\n{0,1}1 {3}2 {2,4}3    {2,4}1 {0}2 {1,3}3\n{0,1}1 {4}2 {2,3}3    {3,4}1 {0}2 {1,2}3\n{0,2}1 {1}2 {3,4}3    {1,2}1 {3}2 {0,4}3\n{0,3}1 {1}2 {2,4}3    {1,2}1 {4}2 {0,3}3\n{0,4}1 {1}2 {2,3}3    {1,3}1 {2}2 {0,4}3\n{0,2}1 {3}2 {1,4}3    {1,4}1 {2}2 {0,3}3\n{0,2}1 {4}2 {1,3}3    {1,3}1 {4}2 {0,2}3\n{0,3}1 {2}2 {1,4}3    {1,4}1 {3}2 {0,2}3\n{0,4}1 {2}2 {1,3}3    {2,3}1 {1}2 {0,4}3\n{0,3}1 {4}2 {1,2}3    {2,4}1 {1}2 {0,3}3\n{0,4}1 {3}2 {1,2}3    {3,4}1 {1}2 {0,2}3\n{1,2}1 {0}2 {3,4}3    {2,3}1 {4}2 {0,1}3\n{1,3}1 {0}2 {2,4}3    {2,4}1 {3}2 {0,1}3\n{1,4}1 {0}2 {2,3}3    {3,4}1 {2}2 {0,1}3\n```\n\nUn detalle importante para simplificar el ejercicio es que la partición $\\{0,1\\}_1\\{2\\}_2\\{3,4\\}_3$ se considera distinta de $\\{3,4\\}_1\\{2\\}_2\\{0,1\\}_3$.\nPor otro lado $\\{0,1\\}_1\\{2\\}_2\\{3,4\\}_3$ y $\\{1,0\\}_1\\{2\\}_2\\{3,4\\}_3$ son la misma partición (no importa el orden de los elementos en un subconjunto).\nImplementad también una función \"wrapper\" que llame a la función recursiva con los parámetros adecuados.\nFinalmente, el método recursivo devolverá un valor numérico y no imprimirá nada.",
    "solution": "En este ejercicio no debemos buscar permutaciones de n elementos ya que $\\{0,1\\}_1\\{2\\}_2\\{3,4\\}_3$ es equivalente a $\\{1,0\\}_1\\{2\\}_2\\{4,3\\}_3$. En otras palabras, las permutaciones `[0,1,2,3,4]`, `[1,0,2,3,4]`, `[0,1,2,4,3]` y `[1,0,2,4,3]` realmente corresponden a la misma partición. Tampoco debemos buscar subconjuntos. Lo importante en este ejercicio es comprender que cada uno de los n elementos puede incorporarse a uno de los m conjuntos. Por tanto, cuando formemos la solución parcial tenemos que considerar los m candidatos para cada uno de los n elementos. De esta manera, si `a = [2, 1, 2]` (y $C=\\{0,1,2,3,4\\}$ con n = 5), la solución parcial será una lista de n valores entre 0 y $m-1$. Por ejemplo, una solución válida podría ser `s = [0, 2, 0, 1, 2]`, que correspondería con la partición $\\{0,2\\}_1\\{3\\}_2\\{1,4\\}_3$. Como $s_0=0$ y $s_2=0$ entonces el 0 y el 2 deben ir en el primer conjunto de la partición. El 3 iría en el segundo conjunto, y el 1 y el 4 irían en el tercer conjunto.\n\nUna vez definida la estructura de la solución parcial y los candidatos, debemos considerar restricciones para no incluir un elemento en un conjunto si éste ya está lleno. Para hacer esto de manera eficiente se puede usar la lista `a`, que indica el número de elementos que se podrían incluir en los m conjuntos. Si incluimos un elemento en el conjunto k-ésimo (donde k toma valores de 0 a $m-1$), tendremos que decrementar $a_k$ (este cambio tendrá que deshacerse después de realizar la llamada recursiva). A continuación se muestra esta solución, que devuelve 1 cuando se completa una solución, y retorna la suma de los resultados de las diversas llamadas recursivas:\n\n```python\ndef particiones(i,a,sol):\n    n = len(sol)\n    m = len(a)\n    if i==n:\n        return 1\n    else:\n        nsols = 0\n        for k in range(m):\n            if a[k]>0:\n                sol[i] = k\n                a[k] = a[k]-1\n                nsols = nsols + particiones(i+1,a,sol)\n                a[k] = a[k]+1\n\n        return nsols\n\n\na = [2,1,2]\nn = sum(a)\nm = len(a)\nsol = [None]*n\nprint(particiones(0,a,sol))\n```\n\nUn detalle adicional es que como no se pide imprimir o procesar las particiones (solo se pide contarlas), no es necesario usar la solución parcial `sol`. Por tanto, la siguiente solución también sería válida, donde podemos aprovechar que la profundidad del árbol recursivo será n, la cual podemos decrementar hasta que sea 0 (no sería necesario usar un índice i para saber la profundidad de un nodo del árbol recursivo):\n\n```python\ndef particiones_simple(n,a):\n    m = len(a)\n    if n==0:\n        return 1\n    else:\n        nsols = 0\n        for k in range(m):\n            if a[k]>0:\n                a[k] = a[k]-1\n                nsols = nsols + particiones_simple(n-1,a)\n                a[k] = a[k]+1\n\n        return nsols\n\na = [2,1,2]\nn = sum(a)\nprint(particiones_simple(n,a))\n```",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 6.7
   },
   {
    "id": "2021-22_diseno_mayo_sol#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 1.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide diseñar un (solo) método recursivo que implemente la estrategia voraz óptima para el problema del cambio de monedas. Dada una cierta cantidad de dinero x, el algoritmo debe imprimir por pantalla los valores de las monedas tal que su suma sea igual a x, teniendo en cuenta que:\n- Los posibles valores de las monedas son: {2, 1, 0,5, 0,2, 0,1, 0,05, 0,02, 0,01}\n- Se usará el mínimo número de monedas posible\n- Se asumirá que $x\\ge0{,}01$ y que x estará redondeado a dos cifras decimales\n\nPor ejemplo, para x = 5,34 el método debe imprimir la secuencia: `2 2 1 0,2 0,1 0,02 0,02`\n\nEl método será recursivo, pero podrá usar bucles.",
    "solution": "El método debe recibir la cantidad x y una lista de monedas que en este caso asumiremos que está ordenada de mayor a menor. El caso base corresponde a la situación en la que x = 0, en cuyo caso no habría que imprimir nada. En el caso recursivo primero determinamos qué moneda debemos \"devolver\" (es decir, imprimir), que será la de mayor valor que no sea inferior a x. Esto lo podemos calcular mediante un simple bucle (también se puede usar una función recursiva alternativa). Asumiendo que se ha imprimido la moneda i-ésima (llamémosla $m_i$) el algoritmo debe continuar resolviendo el problema para $x-m_i$ haciendo una nueva llamada recursiva. En el siguiente código se redondea la cantidad $x-m_i$ por cuestiones de precisión a la hora de trabajar con números reales (esto no se tendrá en cuenta a la hora de corregir el ejercicio):\n\n```python\ndef devolucion_cambio(x,monedas):\n    if x>0:\n        i = 0\n        while x<monedas[i]:\n            i = i+1\n\n        print(monedas[i],' ',end='')\n\n        c = round(x-monedas[i],2)\n        devolucion_cambio(c,monedas)\n\nmonedas = [2,1,0.5,0.2,0.1,0.05,0.02,0.01]\nx = 5.34\ndevolucion_cambio(round(x,2),monedas)\n```\n\nSe puede sustituir el código de las líneas 3–5 (`i = 0` ... `i = i+1`) por la llamada `i = indice_moneda(x,monedas)`, donde:\n\n```python\n# Se asume que x no puede ser menor que el valor más pequeño de la lista de\n# monedas, por lo que la lista de monedas nunca será vacía\ndef indice_moneda(x,monedas):\n    if x>=monedas[0]:\n        return 0\n    else:\n        return 1 + indice_moneda(x,monedas[1:])\n```\n\nOtra solución consiste en usar un bucle para imprimir la moneda de mayor valor todas las veces que haga falta usando un bucle o una función auxiliar. Posteriormente se realiza una llamada recursiva para resolver el problema con la cantidad que quede por devolver, pero eliminando la moneda de mayor valor de la lista de monedas:\n\n```python\ndef cambio_monedas(x,monedas):\n    if x>0:\n        while x>=monedas[0]:\n            print(monedas[0],' ',end='')\n            x = round(x-monedas[0],2)\n\n        cambio_monedas(x,monedas[1:])\n```",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "exam",
    "diff": 4.05
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "2022-23_diseno_mayo_sol",
  "title": "Soluciones examen diseño – mayo 2022-2023",
  "durationMin": 120,
  "exercises": [
   {
    "id": "2022-23_diseno_mayo_sol#1",
    "n": "1",
    "title": "Ejercicio 1",
    "points": 1.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide diseñar una función recursiva que, dado un número entero n no negativo, devuelva el número de dígitos impares de n. Por ejemplo, para n = 727368238 la función devolverá 4.",
    "solution": "```python\ndef digitos_impares(n):\n    if n<10:\n        return n%2\n    else:\n        return digitos_impares(n//10) + n%2\n```\nEl tamaño del problema es el número de dígitos de n. Por tanto, el caso base ocurre cuando n solo contiene un dígito (n < 10). Si el dígito es impar se devolverá un 1 y si es par un 0. Por tanto, simplemente se puede devolver `n%2`. En el caso recursivo la función devolverá el número de dígitos impares de n ignorando su dígito menos significativo (a través de la llamada recursiva `digitos_impares(n//10)`), más 1 en caso de que el dígito menos significativo sea impar (a través de `n%2`).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 3.44
   },
   {
    "id": "2022-23_diseno_mayo_sol#2",
    "n": "2",
    "title": "Ejercicio 2",
    "points": 2.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide diseñar un algoritmo recursivo basado en la técnica de divide y vencerás que, dada una lista `a` de $2^p$ números (donde p es un entero no negativo), devuelva una lista de la misma longitud, que contenga en su primera mitad los elementos de `a` ubicados en los índices pares, y en su segunda mitad los ubicados en índices impares. Además se preservará el orden de los elementos de `a` en ambas mitades. Por ejemplo, para `a = [3, 8, 1, 2, 4, 5, 7, 6]` la salida debe ser `[3, 1, 4, 7, 8, 2, 5, 6]`.",
    "solution": "```python\ndef particiona(a):\n    if len(a)<=2:\n        return a\n    else:\n        mitad = len(a)//2\n        b = particiona(a[:mitad])\n        c = particiona(a[mitad:])\n        m = mitad//2\n        return b[:m] + c[:m] + b[m:] + c[m:]\n```\nEl tamaño de este problema es la longitud de la lista (determinada por p). Si esta longitud es 1 o 2 la lista a devolver sería la misma que la de entrada. Este sería el caso base. En el caso recursivo se puede dividir la lista de entrada por la mitad. Para el ejemplo del enunciado tendríamos las listas `[3,8,1,2]` y `[4,5,7,6]`. Resolviendo el problema para ambas (es decir, realizando llamadas recursivas para estas sublistas) tendríamos `b = [3, 1, 8, 2]` para la primera mitad, y `c = [4, 7, 5, 6]` para la segunda. Para obtener la solución `[3, 1, 4, 7, 8, 2, 5, 6]` debemos concatenar la primera mitad de b con la primera mitad de c, y a continuación la segunda mitad de b con la segunda mitad de c.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "exam",
    "diff": 4.37
   },
   {
    "id": "2022-23_diseno_mayo_sol#3",
    "n": "3",
    "title": "Ejercicio 3",
    "points": 4.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Considérese una expresión matemática con n parejas de paréntesis – uno abierto y otro cerrado. Se pide implementar un algoritmo basado en la técnica de backtracking que imprima por pantalla todas las secuencias válidas que se puedan formar con n parejas de paréntesis. Además la función deberá retornar el número total de estas secuencias válidas. Por ejemplo, para n = 3, hay 5 secuencias válidas:\n```\n((()))\n(()())\n(())()\n()(())\n()()()\n```",
    "solution": "```python\ndef parentesis(i,n_abiertos,sol,n):\n    if i==2*n: # Solución completa y válida\n        # Imprimir la solución\n        for j in range(2*n):\n            if sol[j]==0:\n                print('(',end='')\n            else:\n                print(')',end='')\n        print()\n        return 1\n    else:\n        nsols = 0\n        # Genera candidatos (0: paréntesis abierto, 1: paréntesis cerrado)\n        for k in range(0,2):\n\n            # número de paréntesis abiertos\n            n_abiertos = n_abiertos + (1-k)\n\n            # Comprueba validez (i-n_abiertos+1 es el número de paréntesis cerrados)\n            if n_abiertos>=i-n_abiertos+1 and n_abiertos<=n:\n\n                # Expande la solución parcial\n                sol[i]=k\n\n                # Intenta seguir expandiendo la solución parcial\n                nsols = nsols + parentesis(i+1,n_abiertos,sol,n)\n\n            n_abiertos = n_abiertos - (1-k)\n\n        return nsols\n\n\ndef parentesis_wrapper(n):\n    sol = [None] * (2*n)\n    return parentesis(0,0,sol,n)\n```\nLa solución parcial en este problema es una lista de tamaño 2n, que debe contener dos tipos de candidatos para indicar un paréntesis abierto o cerrado. En esta solución un 0 indicará un paréntesis abierto y un 1 uno cerrado. El parámetro i indicará el índice de la solución parcial donde ubicaremos un nuevo candidato. Por tanto, si i es 2n la solución parcial estará completa y podremos proceder a imprimirla y a retornar un 1, indicando que hemos encontrado una solución válida.\nEn el caso recursivo usamos un bucle para generar los dos candidatos. Además, la función puede llevar la cuenta del número de paréntesis abiertos (`n_abiertos`) y cerrados (o su diferencia), para poder determinar la validez de un candidato en $O(1)$. Habiendo actualizado `n_abiertos`, el número de paréntesis cerrados es `i-n_abiertos+1` (también se puede usar un parámetro que lleve la cuenta del número de paréntesis cerrados). La condición de validez es que el número de paréntesis abiertos sea mayor o igual que el número de paréntesis cerrados. Además, el número de paréntesis abiertos no puede ser mayor que n. Si el candidato es válido se actualiza la solución parcial y se realiza una nueva llamada recursiva para intentar expandir la solución parcial (si estuviese completa se llegaría al caso base). Por último, se deshace la modificación realizada sobre el número de paréntesis abiertos, y se retorna el número de soluciones halladas, que se actualiza al hacer la llamada recursiva.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "exam",
    "diff": 5.29
   },
   {
    "id": "2022-23_diseno_mayo_sol#4",
    "n": "4",
    "title": "Ejercicio 4",
    "points": 3.0,
    "durationMin": null,
    "kind": "diseno",
    "statement": "Se pide implementar una función **recursiva** para dibujar una variante del fractal conocido como la curva de Koch, de orden n. La curva de orden 0 es un simple segmento, mientras que la de orden 1 está compuesto por cinco segmentos de un tercio de la longitud del segmento de orden 0, como se ilustra en la siguiente figura.\n\n[figura: curvas de orden 0, 1, 2 y 3. Orden 0: segmento horizontal. Orden 1: 5 segmentos de longitud 1/3: derecho, arriba (90°), derecho, abajo, derecho, formando un saliente rectangular en el tercio central. Órdenes 2 y 3: cada segmento del orden anterior se sustituye por este patrón de 5 segmentos.]\n\nPara obtener sucesivos fractales de orden superior n se descompondría cada segmento del fractal de orden $n-1$ en otros 5 segmentos de manera análoga.\nPara dibujar un segmento se usará una función `dibuja(p,q)` que tomará como parámetros los extremos (puntos en el plano) del segmento p y q. No hay que implementar esta función. Se recomienda usar vectores y matrices, como los que se pueden crear con la librería numpy de Python.",
    "solution": "Este problema es análogo al de la curva de Koch. La clave es comprender que un fractal de orden n se compone de 5 fractales de orden $n-1$, como ilustra la siguiente figura:\n\n[figura: fractal de orden 3 y el mismo descompuesto en 5 subfractales de orden 2 coloreados]\n\nPor tanto, en el caso recursivo la función tendrá que hacer 5 llamadas recursivas a fractales de orden $n-1$, donde tendremos que elegir los puntos de los extremos de cada subfractal adecuadamente. La siguiente figura ilustra estos puntos, donde se hace uso de una matriz de rotación $R_{90^\\circ}$ para calcularlos (matriz que, si se multiplica por un vector, lo rota 90 grados en sentido contrario a las agujas del reloj), junto con los extremos iniciales p y q.\n\n[figura (3 paneles): (1) segmento de p a q con vector $v=q-p$; (2) desde p, $\\frac13 v$ a lo largo del segmento y $w=R_{90^\\circ}\\frac13 v$ perpendicular hacia arriba; (3) puntos del saliente: p, $p+\\frac13v$, $p+\\frac13v+w$, $p+\\frac23v+w$, $p+\\frac23v$, q]\n\nEn concreto:\n$$R_{90^\\circ}=\\begin{bmatrix}\\cos(90^\\circ)&-\\sin(90^\\circ)\\\\\\sin(90^\\circ)&\\cos(90^\\circ)\\end{bmatrix}=\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$$\nComo en el caso base (si el orden es 0) solo es necesario dibujar un segmento entre p y q, el fractal se puede implementar de la siguiente manera (el ejercicio solo pide implementar la función `fractal`):\n\n```python\nimport matplotlib.pyplot as plt\nimport numpy as np\n\ndef dibuja(p,q):\n    plt.plot([p[0,0],q[0,0]],[p[1,0],q[1,0]],'k-')\n\ndef fractal(p, q, n, R_90):\n    if n == 0:  # Caso base\n        dibuja(p,q)\n    else:\n        v = q-p\n        fractal(p, p+v/3, n-1, R_90)\n        x = p+v/3+R_90*v/3\n        fractal(p+v/3, x, n-1, R_90)\n        fractal(x, x+v/3, n-1, R_90)\n        fractal(x+v/3, p+2*v/3, n-1, R_90)\n        fractal(p+2*v/3, q, n-1, R_90)\n\n\n# Matriz de rotación (90 grados en sentido contrario a las agujas del reloj)\nR_90 = np.matrix([[0, -1], [1, 0]])\n\n# Dos puntos iniciales\np = np.array([[0], [0]])\nq = np.array([[1], [0]])\n\n# Orden\nn = 4\n\nfig1 = plt.figure()\nfractal(p, q, n, R_90)\nplt.axis('equal')\nplt.axis('off')\nplt.show()\n```",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "exam",
    "diff": 5.61
   }
  ],
  "kind": "diseno"
 },
 {
  "id": "ejercicios_adicionales_1-2",
  "title": "Ejercicios adicionales",
  "durationMin": null,
  "exercises": [
   {
    "id": "ejercicios_adicionales_1-2#1.1",
    "n": "1.1",
    "title": "Ejercicio 1.1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Demuestra la siguiente identidad: $\\left(\\frac{a}{b^k}\\right)^{\\log_b n} = \\frac{n^{\\log_b a}}{n^k}$",
    "solution": "**Paso 1. Reparte el exponente.** La potencia de un cociente es el cociente de las potencias: $\\left(\\frac{a}{b^k}\\right)^{\\log_b n}=\\frac{a^{\\log_b n}}{(b^k)^{\\log_b n}}$.\n\n**Paso 2. Simplifica el denominador.** $(b^k)^{\\log_b n}=(b^{\\log_b n})^k=n^k$, porque $b^{\\log_b n}=n$.\n\n**Paso 3. Cambia el numerador.** Se usa $x^{\\log_b y}=y^{\\log_b x}$. Se prueba tomando $\\log_b$ en los dos lados: $\\log_b\\left(a^{\\log_b n}\\right)=\\log_b n\\cdot\\log_b a=\\log_b\\left(n^{\\log_b a}\\right)$. Por tanto $a^{\\log_b n}=n^{\\log_b a}$.\n\n**Paso 4. Resultado.** $\\left(\\frac{a}{b^k}\\right)^{\\log_b n}=\\frac{n^{\\log_b a}}{n^k}$. $\\blacksquare$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 1.11,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.2",
    "n": "1.2",
    "title": "Ejercicio 1.2",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Muestra que $\\log n! \\in \\Theta(n\\log n)$ usando límites. Pista: cuando $n$ tiende a infinito $n!$ se puede sustituir por la \"aproximación de Stirling\": $n! \\sim \\sqrt{2\\pi n}\\left(\\frac{n}{e}\\right)^n$.",
    "solution": "**Paso 1. Qué hay que probar.** $\\log n!\\in\\Theta(n\\log n)$ equivale a que $\\lim_{n\\to\\infty}\\frac{\\log n!}{n\\log n}$ sea una constante positiva y finita. Trabaja con $\\ln$: cambiar de base sólo multiplica por una constante.\n\n**Paso 2. Aplica Stirling dentro del logaritmo.** Como $n!\\sim\\sqrt{2\\pi n}\\left(\\frac ne\\right)^n$ (el cociente tiende a 1), el logaritmo del cociente tiende a 0 y se puede sustituir:\n$$\\ln n!\\approx\\tfrac12\\ln(2\\pi n)+n\\ln n-n$$\n\n**Paso 3. Divide por $n\\ln n$.**\n$$\\frac{\\ln n!}{n\\ln n}\\approx\\frac{\\ln(2\\pi n)}{2n\\ln n}+1-\\frac{1}{\\ln n}$$\n\n**Paso 4. Calcula el límite.** El primer término vale $\\frac{\\ln 2\\pi}{2n\\ln n}+\\frac1{2n}\\to0$ y el último $\\frac1{\\ln n}\\to0$. El límite es $1$.\n\n**Paso 5. Resultado.** Un límite igual a una constante positiva implica $\\Theta$: $\\log n!\\in\\Theta(n\\log n)$. $\\blacksquare$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 1.23,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.3",
    "n": "1.3",
    "title": "Ejercicio 1.3",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Demuestra que $n\\log n \\in O(n^{1+a})$, donde $a>0$. Usa límites y la regla de L'Hopital.",
    "solution": "**Paso 1. Qué hay que probar.** $f\\in O(g)$ se cumple si $\\lim\\frac{f}{g}$ es una constante finita. Aquí $\\frac{f}{g}=\\frac{n\\log n}{n^{1+a}}=\\frac{\\log n}{n^a}$.\n\n**Paso 2. Es una indeterminación.** Con $a>0$, $\\log n\\to\\infty$ y $n^a\\to\\infty$: es del tipo $\\frac\\infty\\infty$. Usa $\\ln$ (otra base sólo añade una constante).\n\n**Paso 3. L'Hôpital.** Deriva arriba y abajo:\n$$\\lim_{n\\to\\infty}\\frac{\\ln n}{n^a}=\\lim_{n\\to\\infty}\\frac{1/n}{a\\,n^{a-1}}=\\lim_{n\\to\\infty}\\frac{1}{a\\,n^{a}}=0$$\n\n**Paso 4. Resultado.** El límite es $0$, una constante finita, luego $n\\log n\\in O(n^{1+a})$ (de hecho está en $o(n^{1+a})$). $\\blacksquare$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 1.1,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.4",
    "n": "1.4",
    "title": "Ejercicio 1.4",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Sean $m$ y $n$ un par de números enteros. Determina el valor del siguiente sumatorio: $\\sum_{i=m}^{n} 1$.",
    "solution": "**Paso 1. Cuenta los términos.** En $\\sum_{i=m}^{n}1$ el índice $i$ toma los valores $m,m+1,\\dots,n$ y cada uno suma $1$. El resultado es cuántos valores hay.\n\n**Paso 2. Cuántos valores hay.** Con $m\\le n$ hay $n-m+1$ (por ejemplo $m=3$, $n=7$: $3,4,5,6,7$, es decir, $5=7-3+1$). Otra forma: $\\sum_{i=m}^{n}1=\\sum_{i=1}^{n}1-\\sum_{i=1}^{m-1}1=n-(m-1)$.\n\n**Paso 3. Casos extremos.** Si $m=n$ hay un término y $n-m+1=1$. Si $m>n$ el sumatorio está vacío y vale $0$ por convención (la fórmula daría un número $\\le 0$).\n\n**Paso 4. Resultado.**\n$$\\sum_{i=m}^{n}1=\\begin{cases}n-m+1 & m\\le n\\\\ 0 & m>n\\end{cases}=\\max(0,\\,n-m+1)$$",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 1.12,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.5",
    "n": "1.5",
    "title": "Ejercicio 1.5",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Escribe la suma de los primeros $n$ enteros impares usando un sumatorio, y simplifícala (es decir, indica una expresión equivalente que no contenga un sumatorio). El resultado es un polinomio sencillo.",
    "solution": "**Paso 1. Escribe la suma.** El $i$-ésimo impar es $2i-1$, así que la suma de los $n$ primeros es $\\sum_{i=1}^{n}(2i-1)=1+3+5+\\cdots+(2n-1)$.\n\n**Paso 2. Separa con la linealidad.** $\\sum_{i=1}^{n}(2i-1)=2\\sum_{i=1}^{n}i-\\sum_{i=1}^{n}1$.\n\n**Paso 3. Sustituye las fórmulas.** $\\sum i=\\frac{n(n+1)}{2}$ y $\\sum 1=n$:\n$$2\\cdot\\frac{n(n+1)}{2}-n=n^2+n-n$$\n\n**Paso 4. Resultado.** $\\sum_{i=1}^{n}(2i-1)=n^2$. Comprobación: $n=4$ da $1+3+5+7=16=4^2$.",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 1.22,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.6",
    "n": "1.6",
    "title": "Ejercicio 1.6",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Usa la siguiente identidad: $\\sum_{i=1}^{n}\\frac{i(i+1)}{2} = \\sum_{i=1}^{n} i(n-i+1)$ para hallar una expresión de los primeros $n$ enteros al cuadrado ($1^2+2^2+\\cdots+n^2$).",
    "solution": "**Paso 1. Escribe cada lado con sumas conocidas.** Sea $S_2=\\sum_{i=1}^{n}i^2$ y $S_1=\\sum_{i=1}^{n}i=\\frac{n(n+1)}{2}$.\n- Izquierda: $\\sum\\frac{i(i+1)}{2}=\\frac12S_2+\\frac12S_1$.\n- Derecha: $\\sum i(n-i+1)=(n+1)S_1-S_2$.\n\n**Paso 2. Iguala.** $\\frac12S_2+\\frac12S_1=(n+1)S_1-S_2$.\n\n**Paso 3. Despeja $S_2$.** Pasa los $S_2$ a un lado: $\\frac32S_2=\\left(n+1-\\frac12\\right)S_1=\\frac{2n+1}{2}S_1$, luego $S_2=\\frac{2n+1}{3}S_1$.\n\n**Paso 4. Sustituye $S_1$.**\n$$S_2=\\frac{2n+1}{3}\\cdot\\frac{n(n+1)}{2}=\\frac{n(n+1)(2n+1)}{6}$$\n\n**Paso 5. Resultado.** $1^2+2^2+\\cdots+n^2=\\frac{n(n+1)(2n+1)}{6}$. Comprobación: $n=3$ da $14=\\frac{3\\cdot4\\cdot7}{6}$.",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 1.2,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.7",
    "n": "1.7",
    "title": "Ejercicio 1.7",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Demuestra que una suma parcial general de $n$ términos de una secuencia aritmética ($s_i = s_{i-1}+d$, para algún valor inicial $s_0$) sigue: $\\sum_{i=0}^{n-1} s_i = \\frac{n}{2}(s_0+s_{n-1})$.",
    "solution": "**Paso 1. Expresa $s_i$.** Como $s_i=s_{i-1}+d$, se tiene $s_i=s_0+id$. En particular $s_{n-1}=s_0+(n-1)d$.\n\n**Paso 2. Escribe la suma dos veces, la segunda al revés.**\n$$S=s_0+s_1+\\cdots+s_{n-1},\\qquad S=s_{n-1}+s_{n-2}+\\cdots+s_0$$\n\n**Paso 3. Suma por columnas.** El par de la posición $i$ vale $s_i+s_{n-1-i}=(s_0+id)+(s_0+(n-1-i)d)=2s_0+(n-1)d=s_0+s_{n-1}$. Todos los pares valen lo mismo.\n\n**Paso 4. Resultado.** Hay $n$ pares, así que $2S=n(s_0+s_{n-1})$ y\n$$\\sum_{i=0}^{n-1}s_i=\\frac n2(s_0+s_{n-1}).\\ \\blacksquare$$",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 1.21,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.8",
    "n": "1.8",
    "title": "Ejercicio 1.8",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Resuelve las siguientes recurrencias, sin calcular las constantes multiplicativas ($C_i$). Esto implica que los casos base no son necesarios en este ejercicio.\n- a) $T(n)=4T(n-1)-5T(n-2)+2T(n-3)+n-3+5n^2\\cdot 2^n$\n- b) $T(n)=T(n-1)+3n-3+n^3\\cdot 3^n$\n- c) $T(n)=5T(n-1)-8T(n-2)+4T(n-3)+3+n^2+n2^n$",
    "solution": "**Paso 1. Método.** Escribe la parte homogénea, saca su ecuación característica y multiplícala por un factor $(x-b)^{d+1}$ por cada término de la derecha de la forma $b^n P(n)$, con $d$ el grado de $P$. La solución lleva, por cada raíz $r$ de multiplicidad $m$, el bloque $(C_1+C_2n+\\cdots+C_mn^{m-1})\\,r^n$.\n\n**Paso 2. Apartado a).** Homogénea: $x^3-4x^2+5x-2=(x-1)^2(x-2)$.\n- $n-3$ es $1^n$ por un polinomio de grado 1: añade $(x-1)^2$.\n- $5n^2\\cdot2^n$ es $2^n$ por un polinomio de grado 2: añade $(x-2)^3$.\n\nEcuación característica: $(x-1)^4(x-2)^4=0$. Solución:\n$$T(n)=(C_1+C_2n+C_3n^2+C_4n^3)+(C_5+C_6n+C_7n^2+C_8n^3)\\,2^n$$\nEl término dominante es $n^3\\,2^n$: $T(n)\\in\\Theta(n^32^n)$.\n\n**Paso 3. Apartado b).** Homogénea: $x-1$.\n- $3n-3$ es $1^n$ por un polinomio de grado 1: añade $(x-1)^2$.\n- $n^3\\,3^n$ es $3^n$ por un polinomio de grado 3: añade $(x-3)^4$.\n\nEcuación característica: $(x-1)^3(x-3)^4=0$. Solución:\n$$T(n)=(C_1+C_2n+C_3n^2)+(C_4+C_5n+C_6n^2+C_7n^3)\\,3^n$$\nOrden: $\\Theta(n^33^n)$.\n\n**Paso 4. Apartado c).** Homogénea: $x^3-5x^2+8x-4=(x-1)(x-2)^2$.\n- $3+n^2$ es $1^n$ por un polinomio de grado 2: añade $(x-1)^3$.\n- $n\\,2^n$ es $2^n$ por un polinomio de grado 1: añade $(x-2)^2$.\n\nEcuación característica: $(x-1)^4(x-2)^4=0$. Solución:\n$$T(n)=(C_1+C_2n+C_3n^2+C_4n^3)+(C_5+C_6n+C_7n^2+C_8n^3)\\,2^n$$\nOrden: $\\Theta(n^32^n)$.",
    "skills": [
     "complejidad-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 1.33,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.9",
    "n": "1.9",
    "title": "Ejercicio 1.9",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Un algoritmo procesa algunos bits de la representación binaria de los números desde 1 a $2^n-1$, donde $n$ es el número de bits de cada número. En concreto, el algoritmo procesa los bits menos significativos de cada número (de derecha a izquierda), hasta que encuentra el primer bit a 1. Dado $n$, determina, usando sumatorios, el número total de bits que procesa el algoritmo. Por ejemplo, para $n=4$ el algoritmo procesa los 26 bits sombreados de la siguiente figura:\n\n| Número | bit 3 | bit 2 | bit 1 | bit 0 | bits procesados |\n|---|---|---|---|---|---|\n| 0001 | 0 | 0 | 0 | ==1== | 1 |\n| 0010 | 0 | 0 | ==1== | ==0== | 2 |\n| 0011 | 0 | 0 | 1 | ==1== | 1 |\n| 0100 | 0 | ==1== | ==0== | ==0== | 3 |\n| 0101 | 0 | 1 | 0 | ==1== | 1 |\n| 0110 | 0 | 1 | ==1== | ==0== | 2 |\n| 0111 | 0 | 1 | 1 | ==1== | 1 |\n| 1000 | ==1== | ==0== | ==0== | ==0== | 4 |\n| 1001 | 1 | 0 | 0 | ==1== | 1 |\n| 1010 | 1 | 0 | ==1== | ==0== | 2 |\n| 1011 | 1 | 0 | 1 | ==1== | 1 |\n| 1100 | 1 | ==1== | ==0== | ==0== | 3 |\n| 1101 | 1 | 1 | 0 | ==1== | 1 |\n| 1110 | 1 | 1 | ==1== | ==0== | 2 |\n| 1111 | 1 | 1 | 1 | ==1== | 1 |\n\nBits sombreados: los que procesa el algoritmo, leyendo cada número de derecha a izquierda hasta el primer 1 inclusive.",
    "solution": "**Paso 1. Agrupa los números por cuántos ceros tienen a la derecha.** Un número cuyo primer 1 (empezando por la derecha) está tras $k$ ceros hace procesar $k+1$ bits. Es de la forma `xxx…x 1 0…0` con $k$ ceros finales.\n\n**Paso 2. Cuenta cuántos hay de cada tipo.** Fijados el 1 y los $k$ ceros, quedan $n-(k+1)$ bits libres a la izquierda: hay $2^{n-k-1}$ números, con $k=0,\\dots,n-1$ (el 0 no se incluye).\n\n**Paso 3. Plantea el sumatorio.** Bits totales $=\\sum_{k=0}^{n-1}(k+1)\\,2^{n-k-1}$. Con $j=k+1$: $\\sum_{j=1}^{n}j\\,2^{n-j}=2^n\\sum_{j=1}^{n}j\\left(\\tfrac12\\right)^j$.\n\n**Paso 4. Usa la fórmula de $\\sum j\\,r^j$.** Con $r=\\frac12$: $\\sum_{j=1}^{n}j\\,r^j=\\frac{r+r^{n+1}(nr-n-1)}{(r-1)^2}=4\\left[\\frac12-\\frac{n+2}{2^{n+2}}\\right]=2-\\frac{n+2}{2^n}$.\n\n**Paso 5. Resultado.** Multiplica por $2^n$:\n$$\\text{bits}=2^{n+1}-(n+2)$$\nComprobación: $n=4$ da $32-6=26$, como en el enunciado; $n=1$ da $1$ y $n=2$ da $4$.",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 2.0,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.10",
    "n": "1.10",
    "title": "Ejercicio 1.10",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Especifica relaciones de recurrencia que describan el coste computacional en tiempo de algoritmos que implementen las siguientes funciones:\n\n(1) $f(n)=\\begin{cases}1 & n=1 \\text{ o } n=2\\\\ \\left\\lfloor \\Phi\\cdot f(n-1)+\\frac12\\right\\rfloor & n>2\\end{cases}$ donde $\\Phi=(1+\\sqrt5)/2$ es la \"proporción aurea\" y $\\lfloor\\cdot\\rfloor$ es la función suelo.\n\n(2) $f(n,a,b)=\\begin{cases}b & n=1\\\\ f(n-1,a+b,a) & n>1\\end{cases}$\n\n(3) $f(n)=\\begin{cases}1 & n=1 \\text{ o } n=2\\\\ \\left[f\\left(\\frac n2+1\\right)\\right]^2-\\left[f\\left(\\frac n2-1\\right)\\right]^2 & n>2 \\text{ y } n \\text{ par}\\\\ \\left[f\\left(\\frac{n+1}{2}\\right)\\right]^2+\\left[f\\left(\\frac{n-1}{2}\\right)\\right]^2 & n>2 \\text{ y } n \\text{ impar}\\end{cases}$\n\n(4) $f(n,s)=\\begin{cases}1+s & n=1 \\text{ o } n=2\\\\ f(n-1,\\,s+f(n-2,0)) & n>2\\end{cases}$",
    "solution": "**Paso 1. Idea.** El coste $T$ depende del tamaño del problema $n$: cuenta cuántas llamadas recursivas hace la función y cuánto trabajo extra hace además (operaciones aritméticas y comparaciones, constantes). Los casos base cuestan una constante $d$ y el trabajo extra de cada llamada otra constante $c$.\n\n**Paso 2. Apartado (1).** Una llamada con $n-1$ y trabajo constante (un producto, una suma y el suelo):\n$$T(n)=\\begin{cases}d & n\\le2\\\\ T(n-1)+c & n>2\\end{cases}\\quad\\Rightarrow\\quad\\Theta(n)$$\n\n**Paso 3. Apartado (2).** Una llamada con $n-1$ y una suma de parámetros:\n$$T(n)=\\begin{cases}d & n=1\\\\ T(n-1)+c & n>1\\end{cases}\\quad\\Rightarrow\\quad\\Theta(n)$$\n\n**Paso 4. Apartado (3).** En cada caso recursivo hay **dos** llamadas de tamaño aproximadamente $n/2$ y un trabajo constante (dos cuadrados y una suma o resta):\n$$T(n)=\\begin{cases}d & n\\le2\\\\ 2T(n/2)+c & n>2\\end{cases}\\quad\\Rightarrow\\quad\\Theta(n)$$\n(teorema maestro: dos subproblemas de la mitad de tamaño y trabajo constante $n^0$; como $2>2^0$, sale $\\Theta(n^{\\log_22})=\\Theta(n)$).\n\n**Paso 5. Apartado (4).** La llamada exterior es de tamaño $n-1$, pero su segundo argumento contiene otra llamada, $f(n-2,0)$, que se evalúa antes. Hay dos llamadas, de tamaños $n-1$ y $n-2$:\n$$T(n)=\\begin{cases}d & n\\le2\\\\ T(n-1)+T(n-2)+c & n>2\\end{cases}$$\nEs del tipo Fibonacci, así que $T(n)\\in\\Theta\\left(\\left(\\frac{1+\\sqrt5}{2}\\right)^n\\right)$, exponencial.",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 1.9,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.11",
    "n": "1.11",
    "title": "Ejercicio 1.11",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Define una relación de recurrencia para el coste computacional en tiempo del siguiente código:\n```python\ndef es_par(n):\n    if n == 0:\n        return True\n    elif n == 1:\n        return False\n    else:\n        return es_par(n - 2)\n```\nResuelve la relación de recurrencia por el método de expansión de recurrencias y el método general de resolución de recurrencias. Por último, indica su orden de crecimiento.",
    "solution": "**Paso 1. Plantea la recurrencia.** Sea $a$ el coste del caso `n == 0`, $b$ el de `n == 1` y $c$ el trabajo propio del caso recursivo (dos comparaciones y la resta) más la llamada:\n$$T(n)=\\begin{cases}a & n=0\\\\ b & n=1\\\\ T(n-2)+c & n>1\\end{cases}$$\n\n**Paso 2. Expansión.** Cada llamada resta 2 y suma $c$:\n$$T(n)=T(n-2)+c=T(n-4)+2c=\\cdots=T(n-2i)+i\\,c$$\n\n**Paso 3. Llega al caso base.** Si $n$ es par, $n-2i=0$ cuando $i=n/2$ y $T(n)=a+\\frac{c}{2}n$. Si $n$ es impar, $n-2i=1$ cuando $i=\\frac{n-1}2$ y $T(n)=b+\\frac{c}{2}(n-1)$.\n\n**Paso 4. Método general.** $T(n)-T(n-2)=c$. La parte homogénea da $x^2-1=(x-1)(x+1)$; la constante $c=c\\cdot1^n$ añade $(x-1)$. Ecuación característica $(x-1)^2(x+1)=0$:\n$$T(n)=C_1+C_2n+C_3(-1)^n$$\nCon $T(0)=a$, $T(1)=b$, $T(2)=a+c$ salen $C_2=\\frac c2$, $C_1=\\frac{a+b-c/2}{2}$ y $C_3=\\frac{a-b+c/2}{2}$.\n\n**Paso 5. Orden de crecimiento.** Ambos métodos dan una función lineal: $T(n)\\in\\Theta(n)$ (hay $\\approx n/2$ llamadas).",
    "skills": [
     "rec-expansion",
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 1.45,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.12",
    "n": "1.12",
    "title": "Ejercicio 1.12",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Resuelve la siguiente recurrencia por el método de expansión de recurrencias: $T(n)=\\begin{cases}1 & n=0\\\\ 1+\\sum_{j=0}^{n-1}T(j) & n>0\\end{cases}$",
    "solution": "**Paso 1. Calcula unos valores.** $T(0)=1$, $T(1)=1+T(0)=2$, $T(2)=1+T(0)+T(1)=4$, $T(3)=8$. Parece $2^n$.\n\n**Paso 2. Simplifica la recurrencia.** Para $n\\ge2$ separa el último sumando: $T(n)=1+\\sum_{j=0}^{n-2}T(j)+T(n-1)$. Pero $1+\\sum_{j=0}^{n-2}T(j)=T(n-1)$ por la propia definición, así que\n$$T(n)=2\\,T(n-1)\\qquad(n\\ge2)$$\n\n**Paso 3. Expande.** $T(n)=2T(n-1)=4T(n-2)=\\cdots=2^iT(n-i)$.\n\n**Paso 4. Llega al caso base.** Para $i=n-1$ se llega a $T(1)=2$:\n$$T(n)=2^{n-1}\\cdot2=2^n$$\n\n**Paso 5. Resultado.** $T(n)=2^n\\in\\Theta(2^n)$ (también vale para $n=0$ y $n=1$).",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 1.16,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.13",
    "n": "1.13",
    "title": "Ejercicio 1.13",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Resuelve la siguiente recurrencia por el método de expansión de recurrencias: $T(n)=\\begin{cases}1 & n=1\\\\ 2T(n/4)+\\log_2 n & n>1\\end{cases}$",
    "solution": "**Paso 1. Supón $n=4^k$.** Así $\\frac n{4^i}$ es entero y se llega a $T(1)$ cuando $i=k=\\log_4n=\\frac12\\log_2n$.\n\n**Paso 2. Expande.** Cada paso duplica el coeficiente y reduce el argumento:\n$$T(n)=2T(n/4)+\\log_2n=2^2T(n/4^2)+2\\log_2(n/4)+\\log_2n=\\cdots=2^iT(n/4^i)+\\sum_{j=0}^{i-1}2^j\\log_2\\!\\left(n/4^j\\right)$$\nY $\\log_2(n/4^j)=\\log_2n-2j$.\n\n**Paso 3. Sustituye $i=k$.** Con $L=\\log_2n=2k$ y $2^k=\\sqrt n$:\n$$T(n)=\\sqrt n\\cdot T(1)+\\sum_{j=0}^{k-1}2^j(2k-2j)=\\sqrt n+2\\sum_{j=0}^{k-1}2^j(k-j)$$\n\n**Paso 4. Resuelve el sumatorio.** Con $m=k-j$: $\\sum_{j=0}^{k-1}2^j(k-j)=\\sum_{m=1}^{k}m\\,2^{k-m}=2^{k+1}-(k+2)$ (es la misma suma que en el ejercicio 1.9).\n\n**Paso 5. Resultado.**\n$$T(n)=\\sqrt n+2\\left(2^{k+1}-k-2\\right)=5\\sqrt n-\\log_2n-4\\in\\Theta(\\sqrt n)$$\nComprobación: $T(4)=2\\cdot1+2=4=5\\cdot2-2-4$. Concuerda con el teorema maestro: $a=2$, $b=4$, $n^{\\log_42}=\\sqrt n$ y $\\log n$ es polinómicamente menor.",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 1.16,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.14",
    "n": "1.14",
    "title": "Ejercicio 1.14",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Resuelve la siguiente recurrencia por el método general de resolución de recurrencias: $T(n)=\\begin{cases}a & n=1\\\\ T(n-1)+b & n>1\\end{cases}$",
    "solution": "**Paso 1. Pasa a la forma estándar.** $T(n)-T(n-1)=b$. La derecha es $b\\cdot1^n$ (polinomio de grado 0).\n\n**Paso 2. Ecuación característica.** Parte homogénea: $x-1$. Término de la derecha: añade $(x-1)^{0+1}$. Queda $(x-1)^2=0$, con la raíz $1$ doble.\n\n**Paso 3. Forma de la solución.** $T(n)=C_1+C_2n$.\n\n**Paso 4. Constantes.** $T(1)=a$ y $T(2)=a+b$:\n- $C_1+C_2=a$\n- $C_1+2C_2=a+b$\n\nRestando: $C_2=b$ y $C_1=a-b$.\n\n**Paso 5. Resultado.** $T(n)=bn+a-b=b(n-1)+a\\in\\Theta(n)$.",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 1.16,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.15",
    "n": "1.15",
    "title": "Ejercicio 1.15",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Define una relación de recurrencia para el coste computacional en tiempo de la siguiente función:\n```python\ndef suma_naturales(n):\n    if n == 1:\n        return 1\n    elif n % 2 == 0:\n        return 2 * suma_naturales(n / 2) + (n / 2)**2\n    else:\n        return (2 * suma_naturales((n - 1) / 2) + ((n + 1) / 2)**2)\n```\nResuélvela usando el teorema maestro, el método de expansión de recurrencias y el método general de resolución de recurrencias. Por último, indica su orden de crecimiento.",
    "solution": "**Paso 1. Plantea la recurrencia.** En cada caso recursivo hay **una sola** llamada, con la mitad del argumento, y trabajo constante (un producto, una suma, una potencia):\n$$T(n)=\\begin{cases}d & n=1\\\\ T(n/2)+c & n>1\\end{cases}$$\n(para $n$ impar el argumento es $\\frac{n-1}2$; el orden es el mismo, así que se supone $n=2^k$).\n\n**Paso 2. Teorema maestro.** Una llamada ($a=1$) con tamaño $n/2$ ($b=2$) y trabajo $f(n)=c\\,n^0$ ($k=0$). Como $a=b^k$ ($1=2^0$): $T(n)\\in\\Theta(n^0\\log n)=\\Theta(\\log n)$.\n\n**Paso 3. Expansión.** $T(n)=c+T(n/2)=2c+T(n/4)=\\cdots=ic+T(n/2^i)$. Se llega a $T(1)$ con $i=\\log_2n$, luego $T(n)=c\\log_2n+d$.\n\n**Paso 4. Método general.** Con $n=2^k$ y $t(k)=T(2^k)$: $t(k)=t(k-1)+c$. Ecuación característica $(x-1)^2=0$, así que $t(k)=C_1+C_2k$. Con $t(0)=d$ y $t(1)=d+c$: $C_1=d$, $C_2=c$. Deshaciendo el cambio, $T(n)=d+c\\log_2n$.\n\n**Paso 5. Orden de crecimiento.** Los tres métodos coinciden: $T(n)\\in\\Theta(\\log n)$.",
    "skills": [
     "rec-expansion",
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 1.55,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.16",
    "n": "1.16",
    "title": "Ejercicio 1.16",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Resuelve la siguiente recurrencia usando el teorema maestro, el método de expansión de recurrencias y el método general de resolución de recurrencias. Por último, indica su orden de crecimiento. $T(n)=\\begin{cases}1 & n=1\\\\ 3T(n/2)+n & n>1\\end{cases}$ donde $n$ es una potencia de 2.",
    "solution": "**Paso 1. Teorema maestro.** $a=3$, $b=2$, $f(n)=n$ ($k=1$). Como $a=3>b^k=2$: $T(n)\\in\\Theta\\left(n^{\\log_23}\\right)\\approx\\Theta(n^{1{,}585})$.\n\n**Paso 2. Expansión.** Con $n=2^k$:\n$$T(n)=3^iT(n/2^i)+n\\sum_{j=0}^{i-1}\\left(\\tfrac32\\right)^j=3^iT(n/2^i)+2n\\left[\\left(\\tfrac32\\right)^i-1\\right]$$\n\n**Paso 3. Llega al caso base.** Para $i=\\log_2n$: $3^i=n^{\\log_23}$ y $\\left(\\frac32\\right)^i=\\frac{n^{\\log_23}}{n}$. Entonces\n$$T(n)=n^{\\log_23}+2\\left(n^{\\log_23}-n\\right)=3\\,n^{\\log_23}-2n$$\n\n**Paso 4. Método general.** Con $n=2^k$ y $t(k)=T(2^k)$: $t(k)=3t(k-1)+2^k$. Ecuación característica $(x-3)(x-2)=0$, así que $t(k)=C_13^k+C_22^k$. Con $t(0)=1$ y $t(1)=5$: $C_1+C_2=1$ y $3C_1+2C_2=5$, es decir, $C_1=3$ y $C_2=-2$. Como $3^k=n^{\\log_23}$ y $2^k=n$: $T(n)=3n^{\\log_23}-2n$.\n\n**Paso 5. Resultado.** $T(n)=3n^{\\log_23}-2n\\in\\Theta(n^{\\log_23})$. Comprobación: $T(2)=3+2=5=3\\cdot3-4$.",
    "skills": [
     "rec-expansion",
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 1.31,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.17",
    "n": "1.17",
    "title": "Ejercicio 1.17",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Resuelve la siguiente recurrencia por el método general de resolución de recurrencias: $T(n)=\\begin{cases}1 & n=1\\\\ T(n/10)+1 & n>1\\end{cases}$",
    "solution": "**Paso 1. Cambio de variable.** Con $n=10^k$ y $t(k)=T(10^k)$: $t(k)=t(k-1)+1$, con $t(0)=T(1)=1$.\n\n**Paso 2. Ecuación característica.** $t(k)-t(k-1)=1\\cdot1^k$: homogénea $(x-1)$ y el término de la derecha añade otro $(x-1)$. Queda $(x-1)^2=0$.\n\n**Paso 3. Forma de la solución.** $t(k)=C_1+C_2k$.\n\n**Paso 4. Constantes.** $t(0)=1$ da $C_1=1$. $t(1)=T(10)=T(1)+1=2$ da $C_1+C_2=2$, es decir, $C_2=1$.\n\n**Paso 5. Resultado.** $t(k)=k+1$. Deshaciendo el cambio, $k=\\log_{10}n$:\n$$T(n)=\\log_{10}n+1\\in\\Theta(\\log n)$$",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 1.16,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#1.18",
    "n": "1.18",
    "title": "Ejercicio 1.18",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Resuelve las siguientes recurrencias:\n- a) $T(n)=2T(n-1)+3n-2$, donde $T(0)=0$.\n- b) $T(n)=T(n/2)+n$, donde $T(1)=1$, y $n$ es una potencia de 2.\n- c) $T(n)=T(n/\\alpha)+n$, donde $T(1)=0$, and donde $\\alpha\\ge2$ es un entero.\n- d) $T(n)=T(n/3)+n^2$, donde $T(1)=1$, y $n$ es una potencia de 3.\n- e) $T(n)=3T(n/3)+n^2$, donde $T(1)=0$, y $n$ es una potencia de 3.\n- f) $T(n)=2T(n/4)+n$, donde $T(1)=1$, y $n$ es una potencia de 4.\n- g) $T(n)=T(n/2)+\\log_2 n$, donde $T(1)=1$, y $n$ es una potencia de 2.\n- h) $T(n)=4T(n/2)+n$, donde $T(1)=1$, y $n$ es una potencia de 2.\n- i) $T(n)=2T(n/2)+n\\log_2 n$, donde $T(1)=1$, y $n$ es una potencia de 2.\n- j) $T(n)=\\frac32 T(n/2)-\\frac12 T(n/4)-\\frac1n$, donde $T(1)=1$, $T(2)=3/2$, y $n$ es una potencia de 2.",
    "solution": "**Paso 1. a) $T(n)=2T(n-1)+3n-2$, $T(0)=0$.** Homogénea: $x-2$. El término $3n-2$ es $1^n$ por un polinomio de grado 1: añade $(x-1)^2$. Ecuación característica $(x-2)(x-1)^2$:\n$$T(n)=C_12^n+C_2+C_3n$$\nValores: $T(0)=0$, $T(1)=1$, $T(2)=6$. De $C_1+C_2=0$, $2C_1+C_2+C_3=1$ y $4C_1+C_2+2C_3=6$ sale $C_1=4$, $C_2=-4$, $C_3=-3$:\n$$T(n)=2^{n+2}-3n-4\\in\\Theta(2^n)$$\n\n**Paso 2. b) $T(n)=T(n/2)+n$, $T(1)=1$.** Expande con $n=2^k$: $T(n)=n+\\frac n2+\\frac n4+\\cdots+2+T(1)$. La suma geométrica es $n\\sum_{j=0}^{k-1}2^{-j}=2n-2$.\n$$T(n)=2n-2+1=2n-1\\in\\Theta(n)$$\n\n**Paso 3. c) $T(n)=T(n/\\alpha)+n$, $T(1)=0$.** Con $n=\\alpha^k$: $T(n)=\\sum_{j=0}^{k-1}\\frac n{\\alpha^j}=n\\,\\frac{1-\\alpha^{-k}}{1-1/\\alpha}=\\frac{\\alpha}{\\alpha-1}(n-1)$.\n$$T(n)=\\frac{\\alpha(n-1)}{\\alpha-1}\\in\\Theta(n)$$\n\n**Paso 4. d) $T(n)=T(n/3)+n^2$, $T(1)=1$.** Con $n=3^k$: $T(n)=1+\\sum_{j=0}^{k-1}\\frac{n^2}{9^j}=1+n^2\\,\\frac{1-9^{-k}}{1-1/9}=1+\\frac98(n^2-1)$.\n$$T(n)=\\frac{9n^2-1}{8}\\in\\Theta(n^2)$$\n\n**Paso 5. e) $T(n)=3T(n/3)+n^2$, $T(1)=0$.** El nivel $j$ aporta $3^j(n/3^j)^2=n^2/3^j$. Suma: $n^2\\sum_{j=0}^{k-1}3^{-j}=n^2\\,\\frac{1-1/n}{1-1/3}$.\n$$T(n)=\\frac{3}{2}\\,n(n-1)\\in\\Theta(n^2)$$\n\n**Paso 6. f) $T(n)=2T(n/4)+n$, $T(1)=1$.** Con $n=4^k$ ($2^k=\\sqrt n$): el nivel $j$ aporta $2^j\\frac n{4^j}=\\frac n{2^j}$. Suma: $n\\sum_{j=0}^{k-1}2^{-j}=2n-2\\sqrt n$, y el caso base aporta $2^kT(1)=\\sqrt n$.\n$$T(n)=2n-\\sqrt n\\in\\Theta(n)$$\n\n**Paso 7. g) $T(n)=T(n/2)+\\log_2n$, $T(1)=1$.** El teorema maestro no sirve ($\\log n$ no es polinómicamente mayor que $n^0$). Expande con $n=2^k$: $T(n)=1+\\sum_{j=1}^{k}j$ (el término del nivel con $n/2^i=2^j$ es $\\log_2 2^j=j$).\n$$T(n)=1+\\frac{k(k+1)}{2}=1+\\frac{\\log_2n\\,(\\log_2n+1)}{2}\\in\\Theta(\\log^2n)$$\n\n**Paso 8. h) $T(n)=4T(n/2)+n$, $T(1)=1$.** Es el ejemplo de la teoría. Cambio de variable: $t(k)=4t(k-1)+2^k$, $(x-4)(x-2)=0$, $t(k)=C_14^k+C_22^k$; con $t(0)=1$ y $t(1)=6$ salen $C_1=2$, $C_2=-1$.\n$$T(n)=2n^2-n\\in\\Theta(n^2)$$\n\n**Paso 9. i) $T(n)=2T(n/2)+n\\log_2n$, $T(1)=1$.** El nivel $j$ aporta $2^j\\cdot\\frac n{2^j}\\log_2\\frac n{2^j}=n(k-j)$ con $n=2^k$. Suma: $n\\sum_{j=0}^{k-1}(k-j)=n\\frac{k(k+1)}{2}$, más $2^kT(1)=n$.\n$$T(n)=n+\\frac{n\\log_2n\\,(\\log_2n+1)}{2}\\in\\Theta(n\\log^2n)$$\nConcuerda con el teorema maestro, caso 2 con $k=1$.\n\n**Paso 10. j) $T(n)=\\frac32T(n/2)-\\frac12T(n/4)-\\frac1n$.** Con $n=2^k$ y $t(k)=T(2^k)$: $t(k)=\\frac32t(k-1)-\\frac12t(k-2)-2^{-k}$. Homogénea: $x^2-\\frac32x+\\frac12=(x-1)(x-\\frac12)$. El término $-\\left(\\frac12\\right)^k$ añade $(x-\\frac12)$. Ecuación característica $(x-1)(x-\\frac12)^2$:\n$$t(k)=C_1+(C_2+C_3k)\\left(\\tfrac12\\right)^k$$\nValores: $t(0)=1$, $t(1)=\\frac32$ y $t(2)=T(4)=\\frac32\\cdot\\frac32-\\frac12\\cdot1-\\frac14=\\frac32$. De ellos: $C_1=1$, $C_2=0$, $C_3=1$.\n$$T(n)=1+\\frac{\\log_2n}{n}\\in\\Theta(1)$$\nComprobación: $T(8)=\\frac32\\cdot\\frac32-\\frac12\\cdot\\frac32-\\frac18=\\frac{11}8=1+\\frac38$.",
    "skills": [
     "complejidad-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 1.83,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_1-2#2.1",
    "n": "2.1",
    "title": "Ejercicio 2.1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Demostrar: $n\\ln n = O(n^{1+a})$, donde $0<a<1$.",
    "solution": "Podemos demostrar que $n^{1+a}$ ($0<a<1$) es cota superior de $n\\ln n$ si se verifica: $\\lim_{n\\to\\infty}\\frac{n\\ln n}{n^{1+a}}=0$\n\nProcedemos a calcular el límite: $\\lim_{n\\to\\infty}\\frac{n\\ln n}{n^{1+a}}=\\lim_{n\\to\\infty}\\frac{\\ln n}{n^a}=\\frac{\\infty}{\\infty}$\n\nAplicando L'Hopital (derivando numerador y denominador) se obtiene: $\\lim_{n\\to\\infty}\\frac{1/n}{an^{a-1}}=\\lim_{n\\to\\infty}\\frac{1}{an^a}=0$\n\nNOTA: se ha utilizado un logaritmo neperiano, pero el resultado es válido independientemente de la base del logaritmo.",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.75
   },
   {
    "id": "ejercicios_adicionales_1-2#2.2",
    "n": "2.2",
    "title": "Ejercicio 2.2",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Simplificar: $O(3m^3+2mn^2+n^2+10m+m^2)$",
    "solution": "Para simplificar la expresión, en primer lugar, podemos eliminar las constantes, quedando: $O(m^3+mn^2+n^2+m+m^2)$\n\nEn segundo lugar, resulta trivial ver que los términos $m$ y $m^2$ son de menor orden que $m^3$, por tanto también se pueden cancelar: $O(m^3+mn^2+n^2)$\n\nFinalmente $n^2$ también se puede eliminar dado que el término $mn^2$ es de mayor orden. Esto puede comprobarse hallando los siguientes límites: $\\lim_{n\\to\\infty}\\frac{n^2}{mn^2}=\\frac1m\\neq\\infty$ y $\\lim_{m\\to\\infty}\\frac{n^2}{mn^2}=0$\n\nComo uno es igual a 0 y otro distinto de 0 se verifica que $mn^2$ es de mayor orden $n^2$. Finalmente la expresión no puede simplificarse más, quedando: $O(m^3+mn^2)$\n\nNOTA: los dos últimos términos no se pueden eliminar. No se puede afirmar que $m^3$ sea de mayor orden que $mn^2$ ya que: $\\lim_{n\\to\\infty}\\frac{mn^2}{m^3}=\\infty$ y $\\lim_{m\\to\\infty}\\frac{mn^2}{m^3}=0$\n\nEs decir, un límite es 0 y el otro infinito. Análogamente, tampoco se puede afirmar que $mn^2$ sea de mayor orden que $m^3$ dado que: $\\lim_{n\\to\\infty}\\frac{m^3}{mn^2}=0$ y $\\lim_{m\\to\\infty}\\frac{m^3}{mn^2}=\\infty$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.74
   },
   {
    "id": "ejercicios_adicionales_1-2#2.3",
    "n": "2.3",
    "title": "Ejercicio 2.3",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Simplificar la siguiente expresión: $O(m^2+m\\log n+n\\log m^2+mn)$",
    "solution": "En primer lugar eliminamos las constantes:\n$O(m^2+m\\log n+n\\log m^2+mn)=O(m^2+m\\log n+2n\\log m+mn)=O(m^2+m\\log n+n\\log m+mn)$\n\nA continuación comprobamos término a término si uno tiene mayor orden que otro. De esta manera podemos ver que podemos eliminar dos términos, ya que $mn>m\\log n$: $\\lim_{n\\to\\infty}\\frac{m\\log n}{mn}=0$, $\\lim_{m\\to\\infty}\\frac{m\\log n}{mn}=\\frac{\\log n}{n}<\\infty$\n\ny $mn>n\\log m$: $\\lim_{n\\to\\infty}\\frac{n\\log m}{mn}=\\frac{\\log m}{m}<\\infty$, $\\lim_{m\\to\\infty}\\frac{n\\log m}{mn}=0$\n\nPor tanto, la expresión simplificada final es: $O(m^2+mn)$\n\nPara calcular los límites se ha usado: $\\lim_{x\\to\\infty}\\frac{\\log x}{x}=\\frac{\\infty}{\\infty}$. Donde aplicando la regla de L'Hopital: $\\lim_{x\\to\\infty}\\frac{\\log x}{x}=\\lim_{x\\to\\infty}\\frac1x=0$",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.77
   },
   {
    "id": "ejercicios_adicionales_1-2#2.4",
    "n": "2.4",
    "title": "Ejercicio 2.4",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Demostrar utilizando la definición de $\\Theta$: $n^2/4+3n-1\\in\\Theta(n^2)$",
    "solution": "Para hacer la demostración debemos comprobar que $n^2$ es tanto cota inferior como superior. Es decir, $n^2/4+3n-1\\in\\Omega(n^2)$ y $n^2/4+3n-1\\in O(n^2)$.\n\n$\\Omega$:\nDebemos encontrar un par de constantes positivas $c_1$ y $n_1$ tal que se cumpla: $n^2/4+3n-1\\ge c_1n^2$ para todo $n\\ge n_1$. Por ejemplo, podemos elegir $c_1=1/4$. En ese caso tenemos $n^2/4+3n-1\\ge n^2/4$, es decir $3n-1\\ge0$. Lo cual se cumple para todo $n\\ge1$. Por tanto, simplemente escogemos $n_1=1$. Finalmente, hemos visto que existen esas constantes y queda demostrado.\n\n$O$:\nDebemos encontrar un par de constantes positivas $c_2$ y $n_2$ tal que se cumpla: $n^2/4+3n-1\\le c_2n^2$ para todo $n\\ge n_2$. Por ejemplo, podemos elegir $c_2=1$. En ese caso tenemos $n^2/4+3n-1\\le n^2$, es decir $3n-1\\le 3n^2/4$. El orden del termino cuadrático naturalmente es superior al lineal, con lo cual la desigualdad se va a cumplir a partir de un $n$ dado. En ese caso, se cumple a partir de $n\\ge4$, y podemos elegir $n_2=4$. Una vez más, hemos visto que existen esas constantes y queda demostrado.\n\nNOTA: podíamos haber elegido otras constantes. Lo importante es que existan, no sus valores concretos.",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.78
   },
   {
    "id": "ejercicios_adicionales_1-2#2.5",
    "n": "2.5",
    "title": "Ejercicio 2.5",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Demostrar mediante la definición de $O$: $n^e\\in O(e^n)$",
    "solution": "Para hacer la demostración debemos encontrar un par de constantes positivas $c$ y $n_0$ tal que se cumpla: $n^e\\le ce^n$ para todo $n\\ge n_0$. Podemos escoger $c=1$. En ese caso tenemos: $n^e\\le e^n$\n\nAplicando logaritmos a ambos lados: $e\\log_e n\\le\\log_e e^n=n$\n\nEsta operación se puede realizar sin que afecte a la desigualdad ya que el logaritmo es una función monótona creciente, por lo que \"preserva el orden\" (es decir, si $a<b$, entonces $\\log a<\\log b$).\n\nAhora necesitamos encontrar un $n_0$ para el que se cumpla la expresión para todo $n\\ge n_0$. En este ejercicio no podemos despejar $n$, por lo que seguiremos otra estrategia (hay varias estrategias válidas). Nos fijamos en los valores de las funciones y sus derivadas (pendientes) con respecto a $n$. Para $e\\log_e n$ la derivada es $e/n$, mientras que para $n$ la derivada es 1. Por tanto, las dos son funciones crecientes para $n>0$, pero $e\\log_e n$ crece igual o más lentamente que $n$ para $n\\ge e$ (ya que su pendiente sería menor o igual a 1). Por tanto, si encontramos un $n_0\\ge e$, de tal forma que la función $n$ sea mayor que $e\\log_e n$ en $n_0$ ($e\\log_e n_0\\le n_0$), la fórmula se verificará para todo $n\\ge n_0$. En otras palabras, la función $n$ no solamente será mayor o igual que $e\\log_e n$ en $n_0$, sino que lo será también para todo $n\\ge n_0$.\n\nEn este caso, tomamos $n_0=e=2{,}718\\ldots$ Como ambas funciones toman el mismo valor en $e$, que vale justamente $e$, entonces $e\\log_e n\\le n$ para todo $n\\ge e=n_0$, terminando la demostración.\n\nAunque no es necesario para la demostración, la siguiente figura muestra las dos funciones $e\\log_e n$, y $n$, donde se puede ver que se verifica $e\\log_e n\\le n$ incluso para todo $n>0$:\n\n[figura: gráfica de $n$ (recta) y $e\\log_e n$ (curva logarítmica) para $n\\in[-1,6]$; se cortan en $n=e$ (valor $e$), con $e\\log_e n\\le n$ en todo $n>0$]",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.76
   },
   {
    "id": "ejercicios_adicionales_1-2#2.6",
    "n": "2.6",
    "title": "Ejercicio 2.6",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Determinar la complejidad $\\theta$ del siguiente algoritmo: se trata de ordenar los elementos de una matriz cuadrada, por filas, utilizando una variante del algoritmo de ordenación Bubble-sort (Burbuja).\n\n[figura: matriz 4x4 desordenada -> matriz ordenada por filas]\n```\n5  8  6  13        1  2  3  3\n14 1  3  3    ->    4  5  5  5\n4  6  5  5          6  6  7  8\n7  10 12 2          10 12 13 14\n```",
    "solution": "La variante del algoritmo podría consistir en transformar la matriz en un vector auxiliar, ordenarlo, y volver a convertir el vector ordenado en una matriz. Otra posibilidad sería realizar la ordenación sin el vector auxiliar. En cualquier caso, la solución a este ejercicio depende de la medida que usemos del tamaño de la matriz cuadrada. De esta manera podemos considerar dos posibilidades:\n- Si suponemos que la matriz cuadrada tiene $n$ elementos (tendría $\\sqrt n$ filas y columnas), entonces el algoritmo tendría complejidad cuadrática: $\\theta(n^2)$ ya que el algoritmo de ordenación Bubble-sort tiene complejidad $\\theta(n^2)$, tanto en el peor como el mejor caso, para un vector de tamaño $n$.\n- Si suponemos que la matriz cuadrada tiene $n$ filas y columnas entonces el número de elementos de la matriz es $n^2$, y el algoritmo de ordenación sobre $n^2$ elementos tiene complejidad: $\\theta(n^4)$",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 1.14
   },
   {
    "id": "ejercicios_adicionales_1-2#2.7",
    "n": "2.7",
    "title": "Ejercicio 2.7",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Determinar la complejidad $\\theta$ del siguiente algoritmo: se trata de ordenar los elementos de una matriz rectangular, por filas, utilizando una variante del algoritmo de ordenación Bubble-sort (Burbuja).\n\n[figura: matriz 4x6 desordenada -> matriz ordenada por filas]\n```\n14 16 5  8  6  13       1  2  3  3  4  4\n4  5  14 1  3  3   ->   4  5  5  5  5  6\n10 4  4  6  5  5        6  6  7  8  9  10\n6  9  7  10 12 2        10 12 13 14 14 16\n```",
    "solution": "Este ejercicio es idéntico al anterior, salvo que en este caso es necesario considerar dos parámetros a la hora de definir el tamaño del problema: el número de filas ($n$) y columnas ($m$). De esta manera, la matriz tiene $nm$ elementos, y el algoritmo de ordenación Bubble-sort siempre necesita del orden de $(nm)^2$ operaciones. Por tanto, la medida de complejidad $\\theta$ para este algoritmo es: $\\theta(m^2n^2)$",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 1.19
   },
   {
    "id": "ejercicios_adicionales_1-2#2.8",
    "n": "2.8",
    "title": "Ejercicio 2.8",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Considérese el siguiente algoritmo, que determina si una matriz cuadrada $A$ de tamaño $N\\times N$ es simétrica ($A=A^T$):\n```\n 1 es_traspuesta = TRUE;\n 2 columna = 1;\n 3 while (columna<=N) AND es_traspuesta\n 4     fila = N;\n 5     while (fila>columna) AND es_traspuesta\n 6         if A(fila,columna)!=A(columna,fila)\n 7              es_traspuesta = FALSE;\n 8         end\n 9         fila = fila-1;\n10     end\n11     columna = columna+1;\n12 end\n13 return es_traspuesta;\n```\nSe pide hallar la complejidad $\\Theta$ asumiendo que se realiza una operación por cada línea de código (se valorará el uso de sumatorios en la respuesta).",
    "solution": "Analizamos la complejidad del algoritmo en el mejor y peor caso:\n- Mejor caso: Si los dos primeros elementos comparados de la matriz son diferentes entonces el algoritmo devuelve el valor FALSE en un número constante de pasos, independientemente del tamaño del problema. Por tanto la complejidad en este caso es: $\\Theta(1)$\n- Peor caso: El peor caso ocurre cuando la matriz es simétrica, y la variable es_traspuesta siempre toma el valor verdadero. Para facilitar los cálculos dividimos el código en los siguientes bloques:\n```\nes_traspuesta = TRUE;\ncolumna = 1;\nwhile (columna<=N) AND es_traspuesta\n  fila = N;\n  while (fila>columna) AND es_traspuesta\n    if A(fila,columna)!=A(columna,fila)\n      es_traspuesta = FALSE;\n    end\n    fila = fila-1;\n  end\n  columna = columna+1;\nend\nreturn es_traspuesta;\n```\nConsiderando que se realiza una operación por cada línea de código (sin contar los `end`, ni la instrucción en el cuerpo del `if`, ya que no se ejecuta en el peor caso), la fórmula para el tiempo de ejecución suponiendo que la matriz es de tamaño $N$ es:\n\n$T(N)=1+1+\\sum_{c=1}^{N}\\Big[1+1+\\sum_{f=N}^{c+1}(1+1+1)+1+1+1+1\\Big]$\n\nSimplificando y resolviendo los sumatorios se obtiene:\n\n$T(N)=4+\\sum_{c=1}^{N}\\Big[4+\\sum_{f=N}^{c+1}3\\Big]=4+\\sum_{c=1}^{N}\\big[4+3(N-c)\\big]$\n\n$T(N)=4+4N+3N^2-3\\sum_{c=1}^{N}c=4+4N+3N^2-3\\frac{N(N+1)}{2}$\n\n$T(N)=\\frac{3N^2}{2}+\\frac{5N}{2}+4\\in\\Theta(N^2)$",
    "skills": [
     "sumatorios"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 1.4
   },
   {
    "id": "ejercicios_adicionales_1-2#2.9",
    "n": "2.9",
    "title": "Ejercicio 2.9",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Determina el coste del siguiente algoritmo de ordenación:\n```pascal\n 1 FOR i:=1 TO n-1 DO\n 2 BEGIN\n 3   valMenor := v[i];\n 4   posMenor := i;\n 5   FOR j:=i+1 TO n DO\n 6   BEGIN\n 7     IF v[j] < valMenor THEN\n 8     BEGIN\n 9       valMenor:= v[j];\n10       posMenor := j\n11     END;\n12   END;\n13   IF posMenor <> i THEN\n14   BEGIN\n15     v[posMenor] := v[i];\n16     v[i] := valMenor;\n17   END;\n18 END;\n```",
    "solution": "Se trata del algoritmo de ordenación por selección directa (select-sort). Para analizarlo usaremos la fórmula asociada al coste de un bucle:\n\n$T_{bucle}=1_{inic.}+\\sum^{n}(1_{comp.}+T_{cuerpo}+1_{incr.})+1_{última\\ comp.}$\n\nAdemás consideraremos los siguientes bloques de código:\n```pascal\nFOR i:=1 TO n-1 DO\nBEGIN\n  valMenor := v[i];\n  posMenor := i;\n  FOR j:=i+1 TO n DO\n  BEGIN\n     IF v[j] <valMenor THEN\n     BEGIN\n       valMenor:= v[j];\n       posMenor := j\n     END;\n  END;\n  IF posMenor <>i THEN\n  BEGIN\n     v[posMenor] := v[i];\n     v[i] := valMenor;\n  END;\nEND;\n```\nConsiderando el primer bucle la función del coste se puede expresar como:\n\n$T(n)=1+\\sum_{i=1}^{n-1}(1+T_{cuerpo\\ FOR\\ externo}+1)+1$\n\ndonde\n\n$T_{cuerpo\\ FOR\\ externo}=2+1+\\sum_{j=i+1}^{n}(1+T_{cuerpo\\ FOR\\ interno}+1)+1+1+C_1$\n\ndonde $C_1$ es coste del interior del último IF, y: $T_{cuerpo\\ FOR\\ interno}=1+C_2$ donde $C_2$ es el coste del interior del primer IF.\n\nSe han introducido las constantes $C_1$ y $C_2$ simplemente para diferenciar los costes en el caso mejor y peor. El mejor caso se da cuando el vector está previamente ordenado, en cuyo caso las comparaciones de los IF siempre son falsas, por lo que $C_1=C_2=0$. En cambio, en el peor caso siempre son verdaderas por lo que $C_1=C_2=2$. De esta manera, una constante $C=C_1=C_2$ es suficiente en este ejercicio.\n\nEl coste total viene dado por:\n\n$T(n)=1+\\sum_{i=1}^{n-1}\\Big[1+2+1+\\sum_{j=i+1}^{n}(1+1+C+1)+1+1+C+1+1\\Big]$\n\n$=2+\\sum_{i=1}^{n-1}\\Big[7+C+\\sum_{j=i+1}^{n}(3+C)\\Big]$\n\nComo el segundo sumatorio realiza $(n-i)$ operaciones:\n\n$=2+\\sum_{i=1}^{n-1}\\big[7+C+(3+C)(n-i)\\big]$\n\nEl sumatorio que queda realiza $(n-1)$ operaciones:\n\n$=2+(7+C)(n-1)+(3+C)n(n-1)-(3+C)n(n-1)/2$\n\n$=2+(7+C)(n-1)+(3+C)n(n-1)/2$\n\nSimplificando: $=\\frac{3+C}{2}n^2+\\frac{11+C}{2}n-(C+5)\\in\\theta(n^2)$\n\ndonde $T_{mejor}(n)=\\frac32n^2+\\frac{11}{2}n-5$ y $T_{peor}(n)=\\frac52n^2+\\frac{13}{2}n-7$",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 1.15
   },
   {
    "id": "ejercicios_adicionales_1-2#2.10",
    "n": "2.10",
    "title": "Ejercicio 2.10",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Analizar la complejidad $\\Theta$ del problema de las Torres de Hanoi para $n$ discos. Es decir, hallar la expresión no recursiva del número de movimientos de discos $T_n$, para $n$ discos, y describir su cota ajustada $\\Theta$. (Ayuda: ver el enunciado del siguiente ejercicio). El pseudocódigo del algoritmo es:\n```\n1 hanoi(int n, int destino, int origen, int auxiliar)\n2   if (n > 0)\n3      hanoi(n-1, auxiliar, origen, destino);\n4      << Mover disco n desde origen a destino >>\n5      hanoi(n-1, destino, auxiliar, origen);\n```",
    "solution": "La expresión recursiva del algoritmo es la siguiente: $T_n=2T_{n-1}+1$, $T_0=0$\n\nPara resolver la recurrencia y hallar una expresión no recursiva de $T_n$ se puede proceder de dos maneras:\n\n1. Expansión de recurrencias:\n\n$T_n=2T_{n-1}+1$\n$=2(2T_{n-2}+1)+1=2^2T_{n-2}+2+1$\n$=2(2(2T_{n-3}+1)+1)+1=2^3T_{n-3}+4+2+1$\n$=2(2(2(2T_{n-4}+1)+1)+1)+1=2^4T_{n-4}+8+4+2+1$\n\nSe puede ver, por tanto, que la expresión general es: $T_n=2^iT_{n-i}+\\sum_{j=0}^{i-1}2^j$\n\nSe llega al caso base cuando el parámetro de la $T$ es cero. Es decir, cuando $n-i=0$. Despejando la $i$, se obtiene $i=n$. Sustituyendo en la expresión obtenemos: $T_n=2^nT_0+\\sum_{j=0}^{n-1}2^j$\n\nViendo que $T(0)=0$ y resolviendo la serie geométrica queda finalmente: $T_n=2^n-1\\in\\Theta(2^n)$\n\n2. Método general de resolución de recurrencias: La recurrencia se puede expresar como: $T_n-2T_{n-1}=1\\cdot n^0\\cdot1^n$. La cual es una recurrencia no homogénea, cuya ecuación característica es: $(x-2)(x-1)=0$\n\nPor tanto, la solución final tiene la forma $T_n=c_12^n+c_21^n=c_12^n+c_2$\n\nTeniendo en cuenta dos casos base o condiciones iniciales podemos hallar el valor de las constantes resolviendo el siguiente sistema:\n$c_1+c_2=0=T_0$\n$2c_1+c_2=1=T_1$\n\nDe donde obtenemos $c_1=1$ y $c_2=-1$. Finalmente, concluimos que la solución es: $T_n=2^n-1\\in\\Theta(2^n)$\n\nNOTA: No es necesario resolver el ejercicio usando los dos métodos. Uno es suficiente. Por otro lado, también se podía haber escogido el caso base $T_1=1$ en el método de expansión de recurrencias.",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 1.29
   },
   {
    "id": "ejercicios_adicionales_1-2#2.11",
    "n": "2.11",
    "title": "Ejercicio 2.11",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "La siguiente función recursiva calcula el máximo de un vector $v$ de $n$ números reales utilizando el paradigma de divide y vencerás: $f(v)=\\begin{cases}v_1 & n=1\\\\ \\max\\{f(v_1,\\ldots,v_{n/2}),\\,f(v_{n/2+1},\\ldots,v_n)\\} & n>1\\end{cases}$\n\nA partir de la expresión recursiva $T$ del número de operaciones que realiza la función $f$ para un determinado tamaño de entrada, se pide obtener la expresión no recursiva de $T$:\n- a) Por el método de expansión de recurrencias (indicando además su orden de complejidad)\n- b) Por el método general de resolución de recurrencias (pista: usad un cambio de variable)",
    "solution": "En primer lugar es necesario definir correctamente la función del número de operaciones que realiza el algoritmo para un vector de tamaño $n$: $T(n)=\\begin{cases}1 & n=1\\\\ 1+2T(n/2) & n>1\\end{cases}$\n\na) Expansión de recurrencias:\n\n$T(n)=1+2T(n/2)$\n$=1+2[1+2T(n/4)]=1+2+2^2T(n/2^2)$\n$=1+2+4[1+2T(n/8)]=1+2+4+2^3T(n/2^3)$\n$=1+2+4+8[1+2T(n/16)]=1+2+4+8+2^4T(n/2^4)$\n$=\\sum_{j=0}^{i-1}2^j+2^iT(n/2^i)=2^i-1+2^iT(n/2^i)$\n\nSe alcanza el caso base cuando $n/2^i=1$. Es decir, cuando $2^i=n$. Sustituyendo: $T(n)=n-1+nT(1)=2n-1\\in\\theta(n)$\n\nb) Método general de resolución de recurrencias:\n\nPartimos de la expresión recursiva: $T(n)=1+2T(n/2)$\n\nComo no podemos aplicar el método directamente con argumentos de $T$ que sean fracciones de $n$, realizamos un cambio de variable: $n=2^k$\n\nDe esta forma tenemos: $T(2^k)=1+2T(2^k/2)=1+2T(2^{k-1})$\n\nque se puede expresar mediante otra función $t$ que dependa de $k$: $t(k)=1+2t(k-1)$ donde $t(k)=T(2^k)$. En este momento podemos aplicar el método general de resolución de recurrencias con $t$. Para ello pasamos todos los términos de $t$ a la izquierda, y expresamos el resto como productos de polinomios por constantes elevadas a $k$: $t(k)-2t(k-1)=1\\cdot1^k$\n\nSu polinomio característico es: $(x-2)(x-1)$ por lo que su solución es: $t(k)=C_12^k+C_2$\n\nComo $t(k)=T(2^k)$, los casos base son $t(0)=T(1)=1$, y $t(1)=T(2)=3$. Con esta información podemos formar un sistema de ecuaciones para hallar las constantes $C_1$ y $C_2$:\n$t(0)=C_1+C_2=1$\n$t(1)=2C_1+C_2=3$\n\nResolviendo, $C_1=2$ y $C_2=-1$, por lo que $t(k)=T(2^k)=2\\cdot2^k-1$. Finalmente, deshaciendo el cambio $2^k=n$ obtenemos: $T(n)=2n-1\\in\\theta(n)$\n\nque naturalmente tiene la misma expresión que la hallada por el método de expansión de recurrencias.",
    "skills": [
     "contar-bucles",
     "rec-expansion",
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 1.37
   },
   {
    "id": "ejercicios_adicionales_1-2#2.12",
    "n": "2.12",
    "title": "Ejercicio 2.12",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "En este ejercicio se pide analizar la complejidad $\\Theta$ del problema de las Torres de Hanoi Cíclicas para $n$ (discos)\n\n[figura: tres torres en los vértices de un triángulo (Torre X arriba con los discos apilados, Torre Z a la izquierda, Torre Y a la derecha), con una flecha circular antihoraria (X -> Z -> Y) en el centro]\n\nSi a la función AntiClock la denominamos $A$, y Clock $C$, entonces tenemos las siguientes definiciones recursivas del número de operaciones (movimientos de discos), para $n$ discos:\n\n(5) $A_n=\\begin{cases}0 & n=0\\\\ 2A_{n-1}+C_{n-1}+2 & n>0\\end{cases}$\n\n(6) $C_n=\\begin{cases}0 & n=0\\\\ 2A_{n-1}+1 & n>0\\end{cases}$\n\nSe pide demostrar:\n$A_n=\\frac{1}{4\\sqrt3}\\Big[(1+\\sqrt3)^{n+2}-(1-\\sqrt3)^{n+2}\\Big]-1$\n$C_n=\\frac{1}{2\\sqrt3}\\Big[(1+\\sqrt3)^{n+1}-(1-\\sqrt3)^{n+1}\\Big]-1$",
    "solution": "En este ejercicio el primer paso consiste en eliminar la recursividad mutua, y expresar las funciones $A_n$ y $C_n$ en términos de sí mismas.\n\nDado que $C_n=2A_{n-1}+1$, decrementando el índice una unidad obtenemos $C_{n-1}=2A_{n-2}+1$. Sustituyendo en (5) logramos una definición recursiva que sólo depende de $A$, a la que añadimos los dos casos base necesarios:\n\n$A_n=\\begin{cases}0 & n=0\\\\ 2 & n=1\\\\ 2A_{n-1}+2A_{n-2}+3 & n\\ge2\\end{cases}$\n\nSe puede observar que $A_1=C_0+2=2$. Además $A_2=7$.\n\nTambién podemos hallar una expresión recursiva de $C$ solamente en términos de sí misma. Por ejemplo, de (6) obtenemos las igualdades $2A_{n-1}=C_n-1$, y $A_n=(C_{n+1}-1)/2$, que podemos sustituir en (5) para obtener:\n\n$\\frac{C_{n+1}-1}{2}=C_n-1+C_{n-1}+2$\n\n$C_{n+1}=2C_n+2C_{n-1}+3$\n\nFinalmente, decrementando el índice y añadiendo los casos base, se obtiene:\n\n$C_n=\\begin{cases}0 & n=0\\\\ 1 & n=1\\\\ 2C_{n-1}+2C_{n-2}+3 & n\\ge2\\end{cases}$\n\nSe puede observar que $C_1=A_0+1=1$. Además $C_2=5$.\n\nEn primer lugar, desarrollamos la fórmula no recursiva para $A$ resolviendo la recurrencia no homogénea: $A_n-2A_{n-1}-2A_{n-2}=3$\n\nLa ecuación característica es: $(x^2-2x-2)(x-1)=0$\n\nLas raíces del primer polinomio son: $x=\\frac{2\\pm\\sqrt{4+8}}{2}=1\\pm\\sqrt3$\n\nPor tanto, la ecuación característica es: $(x-(1+\\sqrt3))(x-(1-\\sqrt3))(x-1)=0$ (en el original: $(1+\\sqrt3)(1-\\sqrt3)(x-1)=0$)\n\nY la solución tiene la siguiente forma: $A_n=c_1(1+\\sqrt3)^n+c_2(1-\\sqrt3)^n+c_31^n$\n\nPara hallar los valores de las constantes resolvemos el siguiente sistema de ecuaciones, usando 3 casos base:\n$c_1+c_2+c_3=0=A_0$\n$c_1(1+\\sqrt3)+c_2(1-\\sqrt3)+c_3=2=A_1$\n$c_1(1+\\sqrt3)^2+c_2(1-\\sqrt3)^2+c_3=7=A_2$\n\nDe la primera ecuación obtenemos (7) $c_3=-c_1-c_2$ que sustituimos en las dos restantes ecuaciones para obtener:\n$c_1(1+\\sqrt3)+c_2(1-\\sqrt3)-c_1-c_2=2$\n$c_1(1+\\sqrt3)^2+c_2(1-\\sqrt3)^2-c_1-c_2=7$\n\nDe la primera ecuación se obtiene la expresión: (8) $c_1=\\frac{2}{\\sqrt3}+c_2$\n\nque sustituyendo en la segunda se puede verificar que el valor de la constante $c_2$ es:\n$c_2=\\frac{\\sqrt3-2}{2\\sqrt3}=-\\frac{2-\\sqrt3}{2\\sqrt3}=-\\frac{4-2\\sqrt3}{4\\sqrt3}=-\\frac{(1-\\sqrt3)^2}{4\\sqrt3}$\n\nSustituyendo el valor de $c_2$ en (8) se obtiene:\n$c_1=\\frac{2}{\\sqrt3}+\\frac{\\sqrt3-2}{2\\sqrt3}=\\frac{2+\\sqrt3}{2\\sqrt3}=\\frac{4+2\\sqrt3}{4\\sqrt3}=\\frac{(1+\\sqrt3)^2}{4\\sqrt3}$\n\nFinalmente, sustituyendo $c_1$ y $c_2$ en (7) se obtiene $c_3=-1$, con lo cual la definición de $A$ resulta ser:\n\n(9) $A_n=\\frac{1}{4\\sqrt3}\\Big[(1+\\sqrt3)^{n+2}-(1-\\sqrt3)^{n+2}\\Big]-1\\in\\Theta\\big((1+\\sqrt3)^n\\big)$\n\ntal y como se había pedido.\n\nLa expresión no recursiva de $C_n$ se puede hallar de forma análoga, resolviendo un sistema de ecuaciones lineales. Sin embargo, dado que ya se ha calculado una expresión no recursiva para $A_n$, podemos combinar (6) y (9) para hallar $C_n$:\n\n$C_n=2A_{n-1}+1=2\\left(\\frac{1}{4\\sqrt3}\\Big[(1+\\sqrt3)^{n+1}-(1-\\sqrt3)^{n+1}\\Big]-1\\right)+1$\n\n$C_n=\\frac{1}{2\\sqrt3}\\Big[(1+\\sqrt3)^{n+1}-(1-\\sqrt3)^{n+1}\\Big]-1\\in\\Theta\\big((1+\\sqrt3)^n\\big)$",
    "skills": [
     "contar-bucles"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 1.59
   },
   {
    "id": "ejercicios_adicionales_1-2#2.13",
    "n": "2.13",
    "title": "Ejercicio 2.13",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Considérese un algoritmo que procesa una serie de números en base 2 distintos del 0. Para cada número empieza a procesar cada bit (realiza una operación por bit), empezando por el bit menos significativo, hasta el bit más significativo, pero para en el momento que encuentra el primer 1. La siguiente figura ilustra las operaciones (sombreadas) que haría con todos los números de 4 bits distintos de 0, es decir, procesa desde el 1 hasta el 15.\n\n| Número | bit 3 | bit 2 | bit 1 | bit 0 | bits procesados |\n|---|---|---|---|---|---|\n| 0001 | 0 | 0 | 0 | ==1== | 1 |\n| 0010 | 0 | 0 | ==1== | ==0== | 2 |\n| 0011 | 0 | 0 | 1 | ==1== | 1 |\n| 0100 | 0 | ==1== | ==0== | ==0== | 3 |\n| 0101 | 0 | 1 | 0 | ==1== | 1 |\n| 0110 | 0 | 1 | ==1== | ==0== | 2 |\n| 0111 | 0 | 1 | 1 | ==1== | 1 |\n| 1000 | ==1== | ==0== | ==0== | ==0== | 4 |\n| 1001 | 1 | 0 | 0 | ==1== | 1 |\n| 1010 | 1 | 0 | ==1== | ==0== | 2 |\n| 1011 | 1 | 0 | 1 | ==1== | 1 |\n| 1100 | 1 | ==1== | ==0== | ==0== | 3 |\n| 1101 | 1 | 1 | 0 | ==1== | 1 |\n| 1110 | 1 | 1 | ==1== | ==0== | 2 |\n| 1111 | 1 | 1 | 1 | ==1== | 1 |\n\nBits sombreados: los que procesa el algoritmo, leyendo cada número de derecha a izquierda hasta el primer 1 inclusive.\n\nSi se procesan todos los números el algoritmo habrá realizado 26 operaciones (que es el número de bits sombreados).\n\nSe pide hallar la complejidad $\\theta$ para este algoritmo si procesa todos los números:\n- a) Contando operaciones\n- b) Resolviendo la recurrencia no homogénea mediante la técnica de expansión de recurrencias\n- c) Resolviendo la recurrencia no homogénea mediante el método de resolución de relaciones en recurrencias",
    "solution": "a) Analizando las operaciones que se realizan por cada columna, empezando desde el bit más significativo al menos, podemos ver que la secuencia es 1,3,7,15... Es decir, para $n$ bits el número de operaciones que se realizan se puede expresar como: $T_n=\\sum_{i=1}^{n}(2^i-1)=\\sum_{i=1}^{n}2^i-n$\n\nPor tanto, resolviendo la serie geométrica: $T_n=2^{n+1}-2-n\\in\\theta(2^n)$\n\nb) En primer lugar, es necesario obtener una fórmula recursiva del número de operaciones que se realizan. Podemos descomponer el número de operaciones de la siguiente manera:\n\n[figura: tabla de los 16 números de 4 bits (0000 a 1111) dividida en tres bloques: las 8 primeras filas (0000-0111) etiquetadas $T_{n-1}$; la fila central 1000 (la palabra $2^{n-1}$) etiquetada $n$; las 7 últimas filas (1001-1111) etiquetadas $T_{n-1}$]\n\nPara $n$ bits contamos $n$ operaciones (correspondientes a la palabra central $2^{n-1}$), además de resolver dos veces el mismo problema para $n-1$ bits, la fórmula recursiva es:\n\n(10) $T_n=2T_{n-1}+n$, $T_0=0$\n\nUna vez hallada la fórmula recursiva procedemos a realizar la expansión de recurrencias:\n$T_n=2T_{n-1}+n$\n$=2(2T_{n-2}+n-1)+n=2^2T_{n-2}+2(n-1)+n$\n$=2(2(2T_{n-3}+n-2)+n-1)+n=2^3T_{n-3}+2^2(n-2)+2(n-1)+n$\n$=2(2(2(2T_{n-4}+n-3)+n-2)+n-1)+n=2^4T_{n-4}+2^3(n-3)+2^2(n-2)+2(n-1)+n$\n\nSe puede ver, por tanto, que la expresión general es:\n$T_n=2^iT_{n-i}+\\sum_{j=0}^{i-1}2^j(n-j)=2^iT_{n-i}+\\sum_{j=0}^{i-1}n2^j-\\sum_{j=0}^{i-1}j2^j$\n\nEl caso base se alcanza en $T_0=0$. Es decir, cuando $i=n$. Realizando las correspondientes sustituciones obtenemos:\n\n(11) $T_n=\\sum_{j=0}^{n-1}n2^j-\\sum_{j=0}^{n-1}j2^j=n(2^n-1)-\\sum_{j=0}^{n-1}j2^j$\n\nLa dificultad en este ejercicio radica en hallar una expresión para el sumatorio de la fórmula anterior:\n\n(12) $\\sum_{j=0}^{n-1}j2^j=1\\cdot2^1+2\\cdot2^2+3\\cdot2^3+\\cdots+(n-1)\\cdot2^{n-1}$\n\nPara hallarla partimos de una serie geométrica general: $S=1+x+x^2+\\cdots+x^{m-1}=\\frac{x^m-1}{x-1}$\n\nderivando $S$ con respecto a $x$ obtenemos la siguiente igualdad:\n\n$1+2x+3x^2+\\cdots+(m-1)x^{m-2}=\\frac{mx^{m-1}(x-1)-(x^m-1)}{(x-1)^2}=\\frac{mx^m-mx^{m-1}-x^m+1}{(x-1)^2}$\n\nMultiplicando por $x$ a ambos lados obtenemos:\n\n(13) $x^1+2x^2+3x^3+\\cdots+(m-1)x^{m-1}=\\frac{mx^{m+1}-mx^m-x^{m+1}+x}{(x-1)^2}$\n\nPor tanto, podemos ver que el sumatorio que queremos calcular en (12) es idéntico al descrito en (13) realizando los (cambios $x=2$, $m=n$):\n\n$\\sum_{j=0}^{n-1}j2^j=\\frac{n2^{n+1}-n2^n-2^{n+1}+2}{(2-1)^2}=n2^{n+1}-n2^n-2^{n+1}+2$\n\nFinalmente, sustituyendo en (11) obtenemos la expresión final de $T_n$:\n\n$T_n=n2^n-n-n2^{n+1}+n2^n+2^{n+1}-2=2^{n+1}-n-2\\in\\theta(2^n)$\n\nc) La ecuación característica de asociada a (10) es: $(x-2)(x-1)^2=0$\n\nPor tanto, la solución tiene la siguiente forma: (14) $T_n=c_12^n+c_21^n+c_3n1^n$\n\nPara hallar el valor de las constantes debemos resolver el siguiente sistema de ecuaciones (teniendo en cuenta que $T_0=0$, $T_1=1$, y $T_2=4$):\n$c_1+c_2=0=T_0$\n$2c_1+c_2+c_3=1=T_1$\n$4c_1+c_2+2c_3=4=T_2$\n\nResolviendo el sistema se obtiene $c_1=2$, $c_2=-2$, y $c_3=-1$. Por tanto, sustituyendo en (14), la expresión final del número de operaciones en función del número de bits $n$ es: $T_n=2^{n+1}-2-n\\in\\theta(2^n)$\n\nNOTA: El algoritmo tiene un coste exponencial dado el número de bits de las palabras. También podríamos haber calculado la complejidad en función del número total de palabras procesadas ($m$). En ese caso, dado que $m=2^n-1$, bastaría con realizar la sustitución ($n=\\log_2(m+1)$) en la fórmula del número de operaciones $T_n=2^{n+1}-2-n$:\n\n$T'(m)=2\\cdot2^{\\log_2(m+1)}-\\log_2(m+1)-2=2m-\\log_2(m+1)\\in\\theta(m)$",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 1.7
   },
   {
    "id": "ejercicios_adicionales_1-2#2.14",
    "n": "2.14",
    "title": "Ejercicio 2.14",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Demostrar que $\\log(n!)\\in\\Omega(n\\log n)$, de dos formas diferentes:\n- a) Usando la aproximación de Stirling: $n!\\sim\\sqrt{2\\pi n}\\left(\\frac ne\\right)^n$ para valores muy grandes de $n$.\n- b) Utilizando la definición de $\\Omega$. Ayuda: usad la aproximación por integrales",
    "solution": "a) Podemos demostrar que $n\\log n$ es cota inferior de $\\log(n!)$ si se verifica: $\\lim_{n\\to\\infty}\\frac{\\log(n!)}{n\\log n}>0$\n\nProcedemos a calcular el límite: $\\lim_{n\\to\\infty}\\frac{\\log(n!)}{n\\log n}=\\frac\\infty\\infty$\n\nAplicamos la aproximación de Stirling (ya que estamos calculando el límite cuando $n$ toma valores muy grandes):\n\n$\\lim_{n\\to\\infty}\\frac{\\log\\left(\\sqrt{2\\pi n}\\left(\\frac ne\\right)^n\\right)}{n\\log n}=\\lim_{n\\to\\infty}\\frac{\\log\\sqrt{2\\pi}+\\log\\sqrt n+\\log\\left(\\frac ne\\right)^n}{n\\log n}=$\n$\\lim_{n\\to\\infty}\\frac{\\log\\sqrt{2\\pi}+\\frac12\\log n+n\\log\\frac ne}{n\\log n}=$\n$\\lim_{n\\to\\infty}\\frac{\\log\\sqrt{2\\pi}+\\frac12\\log n+n\\log n-n\\log e}{n\\log n}=0+0+1+0=1>0$\n\nEn efecto, como el límite es una constante, no solo $\\log(n!)\\in\\Omega(n\\log n)$, sino que además $\\log(n!)\\in\\Theta(n\\log n)$.\n\nb) Utilizando la definición de $\\Omega$ tenemos que demostrar que existe una constante $c>0$ y un $n_0>0$ tal que $\\log(n!)\\ge cn\\log n$ para todo $n\\ge n_0$. Comenzamos transformando la parte izquierda en un sumatorio: $\\log(n!)=\\sum_{i=1}^{n}\\log i=\\sum_{i=2}^{n}\\log i$\n\nEl logaritmo es una función monótona creciente, por lo que se puede acotar utilizando la aproximación por integrales. En este caso nos interesa encontrar una cota inferior: $\\sum_{i=2}^{n}\\log i\\ge\\int_1^n\\log x\\,dx$\n\nResolviendo la integral por partes: $\\int_1^n\\log x\\,dx=\\big[x\\log x-x\\big]_1^n=n\\log n-n-0+1$\n\nPor tanto, combinando estos resultados: $\\log(n!)=\\sum_{i=2}^{n}\\log i\\ge\\int_1^n\\log x\\,dx=n\\log n-n+1\\ge cn\\log n$\n\nLo cual implica que si podemos demostrar que $n\\log n$ es cota inferior de $n\\log n-n+1$, entonces necesariamente será cota inferior de $\\log(n!)$. De esta manera, solo queda encontrar las constantes $c$ y $n_0$ para: $n\\log n-n+1\\ge cn\\log n$\n\nEscojamos $c=1/2$:\n$n\\log n-n+1\\ge\\frac12n\\log n\\Rightarrow\\frac12n\\log n-n+1\\ge0\\Rightarrow n\\left(\\frac12\\log n-1\\right)+1\\ge0$\n\nLo cual es cierto para: $\\frac12\\log n-1\\ge0\\Rightarrow\\log n\\ge2$\n\nFinalmente, para cualquier base del logaritmo $b$, la desigualdad se cumple para todo $n\\ge b^2$, y podemos escoger un valor de $n_0=b^2$ finito y positivo, terminando la demostración.",
    "skills": [
     "asint-definiciones",
     "cotas-integral"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 1.0
   },
   {
    "id": "ejercicios_adicionales_1-2#2.15",
    "n": "2.15",
    "title": "Ejercicio 2.15",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Indicar el orden de la siguiente recurrencia, a partir de su expresión no recursiva en la que no es necesario calcular constantes: $T(n)=T(n-1)+3n-3+n^3\\cdot3^n$",
    "solution": "En primer lugar pasamos todos los términos con $T$ al lado izquierdo, y expresamos cada término del derecho como un producto de un polinomio por una constante elevada a $n$:\n\n$T(n)-T(n-1)=(3n-3)\\cdot1^n+n^3\\cdot3^n$\n\nEl siguiente paso consiste en hallar el polinomio característico. De la parte izquierda obtenemos el factor $(x-1)$. De la parte derecha obtenemos los factores $(x-1)^2$ y $(x-3)^4$. Combinando los factores el polinomio característico final es: $(x-1)^3(x-3)^4$\n\nPor tanto la solución es:\n\n$T(n)=C_11^n+C_2n1^n+C_3n^21^n+C_43^n+C_5n3^n+C_6n^23^n+C_7n^33^n$\n\n$T(n)\\in\\theta(n^33^n)$",
    "skills": [
     "complejidad-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.88
   }
  ],
  "kind": "adic"
 },
 {
  "id": "ejercicios_adicionales_3-9",
  "title": "ejercicios_adicionales_3-9",
  "durationMin": null,
  "exercises": [
   {
    "id": "ejercicios_adicionales_3-9#3.1",
    "n": "3.1",
    "title": "Ejercicio 3.1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "¿Qué calcula la siguiente función?\n$f(n)=\\begin{cases}1 & n=0\\\\ f(n-1)\\times n & n>0\\end{cases}$",
    "solution": "**Paso 1. Calcula unos valores.** $f(0)=1$, $f(1)=f(0)\\times1=1$, $f(2)=f(1)\\times2=2$, $f(3)=f(2)\\times3=6$, $f(4)=24$.\n\n**Paso 2. Expande la definición.** $f(n)=f(n-1)\\times n=f(n-2)\\times(n-1)\\times n=\\cdots=f(0)\\times1\\times2\\times\\cdots\\times n$.\n\n**Paso 3. Resultado.** La función calcula el **factorial**: $f(n)=n!=1\\times2\\times\\cdots\\times n$, con $0!=1$. Hace $n$ multiplicaciones: $\\Theta(n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.61,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.2",
    "n": "3.2",
    "title": "Ejercicio 3.2",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Considera una secuencia definida por la siguiente definición recursiva: $s_n = s_{n-1} + 3$. Calcula sus cuatro primeros términos teniendo en cuenta que: (a) $s_0=0$, y (b) $s_0=4$. Indica una definición no recursiva de $s_n$ en ambos casos.",
    "solution": "**Paso 1. Calcula los cuatro primeros términos.**\n- (a) $s_0=0$: $s_0=0,\\ s_1=3,\\ s_2=6,\\ s_3=9$.\n- (b) $s_0=4$: $s_0=4,\\ s_1=7,\\ s_2=10,\\ s_3=13$.\n\n**Paso 2. Busca el patrón.** Cada término suma 3 al anterior: $s_n=s_{n-1}+3=s_{n-2}+3+3=\\cdots=s_0+3n$.\n\n**Paso 3. Definición no recursiva.**\n- (a) $s_n=3n$.\n- (b) $s_n=4+3n$.\n\nSon progresiones aritméticas de diferencia 3; sólo cambia el valor inicial.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.77,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.3",
    "n": "3.3",
    "title": "Ejercicio 3.3",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Considera una secuencia definida por la siguiente definición recursiva: $s_n = s_{n-1} + s_{n-2}$. Si tuviéramos los dos valores iniciales $s_1$ y $s_2$ tendríamos la información suficiente como para construir la secuencia entera. Demuestra que también se puede construir la secuencia dados dos valores cualquiera $s_i$ y $s_j$, donde $i<j$. Finalmente, encuentra los elementos de la secuencia entre $s_1=1$ y $s_5=17$.",
    "solution": "**Paso 1. Dos valores consecutivos bastan.** Si se conocen $s_i$ y $s_{i+1}$, el resto sale hacia delante con $s_{n}=s_{n-1}+s_{n-2}$ y hacia atrás con $s_{n-2}=s_n-s_{n-1}$.\n\n**Paso 2. Dos valores cualesquiera $s_i$ y $s_j$ ($i<j$).** Con $k=j-i$ y los números de Fibonacci $F_0=0$, $F_1=1$, $F_2=1,\\dots$ se tiene\n$$s_{i+k}=F_{k-1}\\,s_i+F_k\\,s_{i+1}$$\nSe prueba por inducción: para $k=1$ y $k=2$ da $s_{i+1}$ y $s_i+s_{i+1}$; y si es cierta para $k$ y $k-1$, entonces $s_{i+k+1}=s_{i+k}+s_{i+k-1}=F_k\\,s_i+F_{k+1}\\,s_{i+1}$.\n\n**Paso 3. Despeja la incógnita.** Como $F_k\\ge1$ para $k\\ge1$, de $s_j=F_{k-1}s_i+F_ks_{i+1}$ se despeja $s_{i+1}=\\dfrac{s_j-F_{k-1}s_i}{F_k}$. Con $s_i$ y $s_{i+1}$ ya se puede construir toda la secuencia.\n\n**Paso 4. El ejemplo $s_1=1$, $s_5=17$.** Aquí $k=4$, $F_3=2$ y $F_4=3$: $17=2\\cdot1+3\\,s_2$, luego $s_2=5$.\n\n**Paso 5. Resultado.** $s_3=s_2+s_1=6$ y $s_4=s_3+s_2=11$. Los elementos entre $s_1$ y $s_5$ son $5,\\ 6,\\ 11$ (y $s_5=11+6=17$ lo confirma).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.97,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.4",
    "n": "3.4",
    "title": "Ejercicio 3.4",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "El conjunto \"descendientes de una persona\" se puede definir recursivamente como los hijos de la persona, junto con los descendientes de esos hijos. Indica una definición matemática de ese concepto empleando notación de conjuntos. En concreto, define una función $D(p)$, donde $D$ denota descendientes, y el parámetro $p$ se refiere a una persona concreta. Además, considera que se puede usar una función $H(p)$, que retornaría el conjunto de hijos de $p$.",
    "solution": "**Paso 1. Qué entra en $D(p)$.** Los hijos de $p$ y, además, los descendientes de cada uno de esos hijos.\n\n**Paso 2. Definición.** Con $H(p)$ el conjunto de hijos de $p$:\n$$D(p)=H(p)\\ \\cup\\ \\bigcup_{h\\in H(p)}D(h)$$\n\n**Paso 3. Caso base.** Si $p$ no tiene hijos, $H(p)=\\emptyset$ y la unión es vacía: $D(p)=\\emptyset$. No hace falta un caso base aparte, pero se puede escribir explícitamente.\n\n**Paso 4. Ejemplo.** Si $p$ tiene hijos $a$ y $b$, $a$ tiene un hijo $c$ y $b$ ninguno: $D(p)=\\{a,b\\}\\cup D(a)\\cup D(b)=\\{a,b\\}\\cup\\{c\\}\\cup\\emptyset=\\{a,b,c\\}$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.01,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.5",
    "n": "3.5",
    "title": "Ejercicio 3.5",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Sea $F(n)=F(n-1)+F(n-2)$ una función recursiva, donde $n$ es un entero positivo, y donde $F(1)$ y $F(2)$ son valores iniciales arbitrarios. Demuestra que $F(n)=F(2)+\\sum_{i=1}^{n-2}F(i)$, para $n\\ge 2$.",
    "solution": "**Paso 1. Qué se prueba.** $F(n)=F(2)+\\sum_{i=1}^{n-2}F(i)$ para $n\\ge2$, con $F(n)=F(n-1)+F(n-2)$ si $n\\ge3$.\n\n**Paso 2. Caso base $n=2$.** La suma $\\sum_{i=1}^{0}$ es vacía y vale 0: $F(2)=F(2)+0$. Se cumple.\n\n**Paso 3. Hipótesis de inducción.** Se supone cierto para $n\\ge2$: $F(n)=F(2)+\\sum_{i=1}^{n-2}F(i)$.\n\n**Paso 4. Paso inductivo.** Para $n+1\\ge3$:\n$$F(n+1)=F(n)+F(n-1)=F(2)+\\sum_{i=1}^{n-2}F(i)+F(n-1)=F(2)+\\sum_{i=1}^{n-1}F(i)$$\nque es la fórmula para $n+1$, porque $(n+1)-2=n-1$.\n\n**Paso 5. Resultado.** Por inducción, la identidad vale para todo $n\\ge2$. $\\blacksquare$",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.72,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.6",
    "n": "3.6",
    "title": "Ejercicio 3.6",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa en Python la función factorial: $n!=(n-1)!\\times n$ si $n>0$, donde $0!=1$.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es $n$. El caso base es $n=0$, con $0!=1$.\n\n**Paso 2. Descomposición y regla.** El subproblema es $(n-1)!$ y $n!=(n-1)!\\times n$.\n\n**Paso 3. Código.**\n```python\ndef factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return factorial(n - 1) * n\n```\n\n**Paso 4. Comprobación y coste.** `factorial(5)` devuelve 120. Hay $n$ llamadas con trabajo constante: $T(n)=T(n-1)+c\\in\\Theta(n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.6,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.7",
    "n": "3.7",
    "title": "Ejercicio 3.7",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Al considerar tipos abstractos de datos, una lista puede ser vacía, o puede consistir en un solo elemento (la \"cabeza\" de la lista, es decir, su primer elemento), junto con otra lista (la \"cola\"), que podría estar vacía. Sea `a` una lista en Python. Hay varias formas de comprobar si está vacía. Por ejemplo, la condición `a==[]` devuelve `True` si la lista está vacía, y `False` en caso contrario. Además, la cabeza de la lista es simplemente `a[0]`, mientras que la cola se puede especificar mediante `a[1:]`. Escribe una versión alternativa de la siguiente función:\n```python\ndef sum_list_length_2(a):\n    if len(a) == 0:\n        return 0\n    else:\n        return a[0] + sum_list_length_2(a[1:len(a)])\n```\nusando los elementos mencionados, pero que no use la longitud de la lista (`len`).",
    "solution": "**Paso 1. Qué hay que sustituir.** `len(a) == 0` se puede escribir como `a == []`, y `a[1:len(a)]` como `a[1:]` (la cola).\n\n**Paso 2. Código.** La cabeza es `a[0]` y la cola `a[1:]`:\n```python\ndef suma_lista(a):\n    if a == []:\n        return 0\n    else:\n        return a[0] + suma_lista(a[1:])\n```\n\n**Paso 3. Comprobación y coste.** `suma_lista([5, 1, 12])` devuelve 18. Hay $n+1$ llamadas, pero cada rebanada `a[1:]` copia la lista, así que el coste total es $\\Theta(n^2)$ copiando (y $\\Theta(n)$ sumas).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.38,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.8",
    "n": "3.8",
    "title": "Ejercicio 3.8",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa tres funciones que calculen la suma de los elementos de una lista usando las tres descomposiciones indicadas en la siguiente figura:\n```\nLista a (n=9), índices 0..8:  5 1 12 4 2 5 6 3 7\n(a) Problema original: s(a) = a[0] + a[1] + ... + a[n-1]\n(b) Primera descomposición: s(a) = s(a[0:n-1]) + a[n-1]\n    sublista a[0:n-1] = 5 1 12 4 2 5 6 3 (índices 0..7), elemento aislado a[8]=7\n(c) Segunda descomposición: s(a) = a[0] + s(a[1:n])\n    elemento aislado a[0]=5, sublista a[1:n] = 1 12 4 2 5 6 3 7 (índices 1..8)\n(d) Tercera descomposición: s(a) = s(a[0:n//2]) + s(a[n//2:n])\n    a[0:n//2] = 5 1 12 4 (índices 0..3), a[n//2:n] = 2 5 6 3 7 (índices 4..8)\n```\nLas funciones recibirán dos parámetros de entrada: una lista, y su tamaño (es decir, su longitud). Además, indica ejemplos de llamadas a estas funciones, e imprime sus resultados.",
    "solution": "**Paso 1. Una función por descomposición.** Reciben la lista `a` y su tamaño `n`. El caso base es `n == 0` (suma 0); la tercera necesita además `n == 1`.\n\n**Paso 2. $s(a)=s(a[0:n-1])+a[n-1]$.** Se quita el último elemento: la sublista sigue empezando en 0, así que basta bajar `n`.\n```python\ndef suma_1(a, n):\n    if n == 0:\n        return 0\n    else:\n        return suma_1(a, n - 1) + a[n - 1]\n```\n\n**Paso 3. $s(a)=a[0]+s(a[1:n])$.** Se quita el primero: se pasa la sublista `a[1:]`, de tamaño `n - 1`.\n```python\ndef suma_2(a, n):\n    if n == 0:\n        return 0\n    else:\n        return a[0] + suma_2(a[1:], n - 1)\n```\n\n**Paso 4. $s(a)=s(a[0:n//2])+s(a[n//2:n])$.** Se divide por la mitad; el caso $n=1$ evita llamar con una lista vacía infinitamente.\n```python\ndef suma_3(a, n):\n    if n == 0:\n        return 0\n    elif n == 1:\n        return a[0]\n    else:\n        m = n // 2\n        return suma_3(a[:m], m) + suma_3(a[m:], n - m)\n```\n\n**Paso 5. Llamadas de ejemplo.**\n```python\na = [5, 1, 12, 4, 2, 5, 6, 3, 7]\nprint(suma_1(a, len(a)))   # 45\nprint(suma_2(a, len(a)))   # 45\nprint(suma_3(a, len(a)))   # 45\n```",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.44,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.9",
    "n": "3.9",
    "title": "Ejercicio 3.9",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Demuestra por inducción matemática la siguiente identidad asociada a series geométricas, donde $n$ es un entero positivo, y $x\\neq 1$ es un número real:\n$\\sum_{i=0}^{n-1}x^i=\\frac{x^n-1}{x-1}.$",
    "solution": "**Paso 1. Qué se prueba.** $P(n)$: $\\sum_{i=0}^{n-1}x^i=\\frac{x^n-1}{x-1}$, para $n\\ge1$ y $x\\neq1$.\n\n**Paso 2. Caso base $n=1$.** El lado izquierdo es $x^0=1$ y el derecho $\\frac{x-1}{x-1}=1$.\n\n**Paso 3. Hipótesis.** Se supone cierto $P(n)$.\n\n**Paso 4. Paso inductivo.** Se añade el término $x^n$:\n$$\\sum_{i=0}^{n}x^i=\\frac{x^n-1}{x-1}+x^n=\\frac{x^n-1+x^{n+1}-x^n}{x-1}=\\frac{x^{n+1}-1}{x-1}$$\n\n**Paso 5. Resultado.** Es $P(n+1)$, así que la identidad vale para todo entero positivo $n$. $\\blacksquare$",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.71,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.10",
    "n": "3.10",
    "title": "Ejercicio 3.10",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Codifica las siguientes funciones que calculan números de Fibonacci $F(n)$ descritas en el Ejercicio 1.10. Además codifica las siguientes funciones, que también sirven para hallar números de Fibonacci:\n$A(n)=\\begin{cases}0 & n=1\\\\ A(n-1)+B(n-1) & n>1\\end{cases}$\n$B(n)=\\begin{cases}1 & n=1\\\\ A(n-1) & n>1\\end{cases}$\nComo algunas de estas funciones requieren parámetros adicionales, además de $n$, o no calculan un número de Fibonacci directamente, implementa funciones auxiliares (\"wrapper\") adicionales que solo reciban el parámetro $n$, y llamen a las funciones implementadas para calcular los números de Fibonacci. Por último, comprueba que producen las salidas correctas para $n=1,\\ldots,10$.",
    "solution": "**Paso 1. Las cuatro funciones del ejercicio 1.10.** Cada una con su valor de partida: (1) $f(n)=\\lfloor\\Phi f(n-1)+\\frac12\\rfloor$ con $f(1)=f(2)=1$; (2) $f(n,a,b)$ por cola; (3) $f$ con $f(\\frac n2\\pm1)$ para $n$ par y $f(\\frac{n\\pm1}2)$ para $n$ impar; (4) $f(n,s)$ anidada. Y las dos funciones mutuamente recursivas $A$ y $B$.\n\n**Paso 2. Wrappers.** Hay que encontrar qué argumentos adicionales dan la sucesión de Fibonacci $F(1)=F(2)=1$: para (2) sirve $f(n,1,1)$ (pruébalo: $f(3,1,1)=f(2,2,1)=f(1,3,2)=2$) y para (4), $f(n,0)$. Para $A$ y $B$ se cumple $A(n)=F(n-1)$ y $B(n)=F(n-2)$, así que $F(n)=A(n)+B(n)$.\n\n**Paso 3. Código.**\n```python\nfrom math import sqrt, floor\n\nPHI = (1 + sqrt(5)) / 2\n\ndef fib1(n):                      # (1)\n    if n <= 2:\n        return 1\n    else:\n        return floor(PHI * fib1(n - 1) + 0.5)\n\ndef f2(n, a, b):                  # (2) recursión por cola\n    if n == 1:\n        return b\n    else:\n        return f2(n - 1, a + b, a)\n\ndef fib2(n):\n    return f2(n, 1, 1)\n\ndef fib3(n):                      # (3)\n    if n <= 2:\n        return 1\n    elif n % 2 == 0:\n        return fib3(n // 2 + 1) ** 2 - fib3(n // 2 - 1) ** 2\n    else:\n        return fib3((n + 1) // 2) ** 2 + fib3((n - 1) // 2) ** 2\n\ndef f4(n, s):                     # (4) recursión anidada\n    if n <= 2:\n        return 1 + s\n    else:\n        return f4(n - 1, s + f4(n - 2, 0))\n\ndef fib4(n):\n    return f4(n, 0)\n\ndef A(n):                         # recursión mutua\n    if n == 1:\n        return 0\n    else:\n        return A(n - 1) + B(n - 1)\n\ndef B(n):\n    if n == 1:\n        return 1\n    else:\n        return A(n - 1)\n\ndef fib_ab(n):\n    return A(n) + B(n)\n```\n\n**Paso 4. Comprobación para $n=1,\\dots,10$.**\n```python\nfor fib in (fib1, fib2, fib3, fib4, fib_ab):\n    print([fib(n) for n in range(1, 11)])\n# todas: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]\n```",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.27,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.11",
    "n": "3.11",
    "title": "Ejercicio 3.11",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Sea $n$ un entero positivo. Considera el problema de determinar el número de bits puestos a 1 en la representación binaria de $n$ (es decir, $n$ expresado en base 2). Por ejemplo, para $n=25_{10}=11001_2$ (el subíndice indica la base en la que se expresa el número), el resultado es 3 bits. Indica el tamaño del problema (con palabras) y una expresión matemática para definirlo.",
    "solution": "**Paso 1. Tamaño del problema.** Es el **número de bits** de la representación binaria de $n$, es decir, $\\lfloor\\log_2n\\rfloor+1$: es lo que determina cuántas operaciones hay que hacer.\n\n**Paso 2. Caso base.** Con un solo bit ($n=1$) el resultado es 1 (y para $n=0$, 0).\n\n**Paso 3. Descomposición.** Quitar el bit menos significativo equivale a $\\lfloor n/2\\rfloor$. Ese bit es $n\\bmod2$.\n\n**Paso 4. Expresión matemática.** Sea $u(n)$ el número de unos de $n$ en binario:\n$$u(n)=\\begin{cases}n & n\\le1\\\\ u(\\lfloor n/2\\rfloor)+(n\\bmod2) & n>1\\end{cases}$$\nComprobación: $u(25)=u(12)+1=u(6)+0+1=u(3)+0+0+1=u(1)+1+0+0+1=3$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.92,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.12",
    "n": "3.12",
    "title": "Ejercicio 3.12",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Considera la función que suma los primeros $n$ enteros positivos en:\n$S(n)=\\begin{cases}1 & n=1\\\\ S(n-1)+n & n>1\\end{cases}$\nDefine una función más general que pueda aplicarse también a números no negativos. En otras palabras, modifica la función para considerar que $n$ puede ser 0. Por último, codifica la función.",
    "solution": "**Paso 1. Qué cambia.** Ahora $n$ puede ser 0 y la suma de los primeros 0 enteros es 0. El caso base pasa a ser $n=0$.\n\n**Paso 2. Definición.**\n$$S(n)=\\begin{cases}0 & n=0\\\\ S(n-1)+n & n>0\\end{cases}$$\nEl caso $n=1$ ya no hace falta: $S(1)=S(0)+1=1$.\n\n**Paso 3. Código.**\n```python\ndef suma_naturales(n):\n    if n == 0:\n        return 0\n    else:\n        return suma_naturales(n - 1) + n\n```\n\n**Paso 4. Comprobación.** `suma_naturales(0)` devuelve 0 y `suma_naturales(4)` devuelve 10.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.85,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.13",
    "n": "3.13",
    "title": "Ejercicio 3.13",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Usa diagramas similares a los siguientes:\n[figura: dos pares de diagramas de escalera de cuadrados unidad (triángulo de $n$ filas, la fila $i$ tiene $i$ cuadrados, altura $n$). Par 1: (a) \"Problema original: S(n)\", escalera completa de altura $n$; (b) $S(n)=2S(\\frac n2)+(\\frac n2)^2$: la escalera se divide en dos escaleras de altura $n/2$ (una abajo-izquierda, otra arriba-derecha, sombreadas) y un cuadrado de lado $n/2$ (abajo-derecha, sin sombrear). Par 2: (a) \"Problema original: S(n)\", escalera de altura $n$; (b) $S(n)=2S(\\frac{n-1}{2})+(\\frac{n+1}{2})^2$: dos escaleras de altura $\\frac{n-1}{2}$ (sombreadas, la de abajo-izquierda y la de arriba-derecha) y un cuadrado de lado $\\frac{n+1}{2}$ (parte baja derecha, rodeado por llaves de $\\frac{n+1}{2}$ abajo y $\\frac{n-1}{2}$ arriba).]\npara derivar definiciones recursivas de la suma de los primeros $n$ enteros positivos ($S(n)$), donde el caso recursivo sume los resultados de cuatro subproblemas de aproximadamente la mitad del tamaño del problema original. Finalmente, define y codifica la función recursiva completa (caso base y casos cuando $n$ es par e impar).",
    "solution": "**Paso 1. La idea de los diagramas.** $S(n)$ es el número de cuadrados de una escalera de altura $n$. Se divide en cuatro cuadrantes de lado $\\approx n/2$: dos son escaleras (arriba a la izquierda y abajo a la derecha), uno está vacío y el cuarto es un cuadrado completo de lado $n/2$ (la parte de abajo a la izquierda).\n\n**Paso 2. Cuatro subproblemas.** Un cuadrado de lado $m=n/2$ se corta por su diagonal en una escalera de altura $m$ (con la diagonal) y otra de altura $m-1$ (sin ella). Por tanto, para $n$ par:\n$$S(n)=S(\\tfrac n2)+S(\\tfrac n2)+\\big[S(\\tfrac n2)+S(\\tfrac n2-1)\\big]=3\\,S(\\tfrac n2)+S(\\tfrac n2-1)$$\n\n**Paso 3. Caso impar.** Con $n=2k+1$: la escalera de arriba tiene altura $k$, el cuadrado de abajo a la izquierda tiene lado $k+1$ (se corta en $S(k+1)+S(k)$) y la escalera de abajo a la derecha tiene altura $k$:\n$$S(n)=S(k)+\\big[S(k+1)+S(k)\\big]+S(k)=3\\,S\\!\\left(\\tfrac{n-1}2\\right)+S\\!\\left(\\tfrac{n+1}2\\right)$$\n\n**Paso 4. Comprobación algebraica.** Para $n=2k$: $3\\frac{k(k+1)}2+\\frac{(k-1)k}2=2k^2+k=\\frac{2k(2k+1)}2$. Para $n=2k+1$: $3\\frac{k(k+1)}2+\\frac{(k+1)(k+2)}2=(k+1)(2k+1)=\\frac{(2k+1)(2k+2)}2$.\n\n**Paso 5. Función completa.** Casos base $S(0)=0$ y $S(1)=1$ (con $n=1$ el caso impar llamaría a $S(0)$ y $S(1)$, es decir, a sí misma):\n```python\ndef suma(n):\n    if n == 0:\n        return 0\n    elif n == 1:\n        return 1\n    elif n % 2 == 0:\n        return 3 * suma(n // 2) + suma(n // 2 - 1)\n    else:\n        return 3 * suma(n // 2) + suma(n // 2 + 1)\n```\nHay dos llamadas (la de `suma(n // 2)` se hace una sola vez y se multiplica por 3): $T(n)=2T(n/2)+c\\in\\Theta(n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.5,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.14",
    "n": "3.14",
    "title": "Ejercicio 3.14",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Considera el problema de imprimir los dígitos de un número entero no negativo $n$ en una consola, uno a uno, en vertical, y en orden \"normal\", donde el dígito más significativo aparezca en la primera línea, el segundo más significativo en la segunda línea, etc. Por ejemplo, si $n=2743$ el programa debe imprimir las siguientes líneas en la consola:\n```\n2¶\n7¶\n4¶\n3¶\n```\nIndica el tamaño del problema y su caso base. Dibuja un diagrama para un entero no negativo general $n=d_{m-1}\\cdots d_1 d_0$, donde $m$ es el número de dígitos de $n$, para poder ilustrar la descomposición del problema, y como recuperar la solución al problema original dada la solución de un subproblema. Por último, deriva el caso recursivo e implementa el método.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es el número de dígitos $m$ de $n$. El caso base es $m=1$ ($n<10$): se imprime el dígito.\n\n**Paso 2. Descomposición.** Se quita el dígito menos significativo: $n=d_{m-1}\\cdots d_1\\,|\\,d_0$. El subproblema es $n//10=d_{m-1}\\cdots d_1$ y el dígito aislado es $d_0=n\\%10$.\n```\nn  =  d_{m-1} ... d_1  |  d_0\n      \\_______________/    \\__/\n      subproblema n//10     n % 10\n```\n\n**Paso 3. Cómo recuperar la solución.** La solución del subproblema imprime $d_{m-1},\\dots,d_1$ en orden, una por línea. El dígito menos significativo debe ir **al final**, así que se imprime **después** de la llamada recursiva.\n\n**Paso 4. Caso recursivo.** `imprime(n)`: `imprime(n // 10)` y luego `print(n % 10)`.\n```python\ndef imprime_digitos(n):\n    if n < 10:\n        print(n)\n    else:\n        imprime_digitos(n // 10)\n        print(n % 10)\n```\n`imprime_digitos(2743)` imprime 2, 7, 4 y 3, una por línea. Coste: $m$ llamadas, $\\Theta(m)=\\Theta(\\log n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.32,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.15",
    "n": "3.15",
    "title": "Ejercicio 3.15",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Define un diagrama general que use un esquema de divide y vencerás para calcular el máximo de una lista `a` de $n$ elementos. Usa notación general en lugar de ejemplos concretos.",
    "solution": "**Paso 1. Notación general.** Sea `a` una lista de $n$ elementos y $h=\\lfloor n/2\\rfloor$.\n\n**Paso 2. Diagrama.**\n```\n a = [ a_0  a_1 ... a_{h-1} | a_h ... a_{n-1} ]\n       \\________izq________/   \\______der______/\n          x = máximo(izq)          y = máximo(der)\n                     \\              /\n                  máximo(a) = max{ x, y }\n```\n\n**Paso 3. Casos base y recursivo.** Si $n=1$, el máximo es $a_0$. Si $n>1$:\n$$m(a)=\\max\\{m(a_{0..h-1}),\\ m(a_{h..n-1})\\},\\qquad h=\\lfloor n/2\\rfloor$$\n\n**Paso 4. Coste.** Dos llamadas con $n/2$ y trabajo constante: $T(n)=2T(n/2)+1\\in\\Theta(n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.7,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#3.16",
    "n": "3.16",
    "title": "Ejercicio 3.16",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Define una función recursiva que calcule el máximo de una lista `a` de $n$ elementos, en la que la descomposición simplemente reduzca el tamaño del problema en una unidad.",
    "solution": "**Paso 1. Descomposición.** Se quita el último elemento: la sublista es `a[:-1]`, de tamaño $n-1$.\n\n**Paso 2. Regla.** $m(a)=\\max\\{m(a_{0..n-2}),\\ a_{n-1}\\}$, con el caso base $n=1$: $m(a)=a_0$ (la lista tiene al menos un elemento).\n\n**Paso 3. Código.**\n```python\ndef maximo(a):\n    if len(a) == 1:\n        return a[0]\n    else:\n        return max(maximo(a[:-1]), a[-1])\n```\n\n**Paso 4. Comprobación y coste.** `maximo([4, 2, 7, 5])` devuelve 7. Hay $n$ llamadas con trabajo constante más la copia de la rebanada: $\\Theta(n)$ comparaciones (y $\\Theta(n^2)$ al copiar rebanadas; con índices `inf` y `sup` no se copia).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.69,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.1",
    "n": "4.1",
    "title": "Ejercicio 4.1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "El siguiente código es una función booleana que determina si un número entero no negativo `n` es par:\n```python\ndef es_par(n):\n    if n == 0:\n        return True\n    elif n == 1:\n        return False\n    else:\n        return es_par(n - 2)\n```\nLa descomposición empleada reduce el tamaño ($n$) en dos unidades. Define y codifica una versión alternativa donde la descomposición reduzca el tamaño del problema en una sola unidad.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es $n$. Con una descomposición que sólo quita una unidad, basta el caso base $n=0$: el caso $n=1$ deja de ser necesario.\n\n**Paso 2. Descomposición.** El subproblema es `es_par(n - 1)`.\n\n**Paso 3. Regla recursiva.** $n$ es par exactamente cuando $n-1$ no lo es: `es_par(n) = not es_par(n - 1)`.\n\n**Paso 4. Código.**\n```python\ndef es_par(n):\n    if n == 0:\n        return True\n    else:\n        return not es_par(n - 1)\n```\n\n**Paso 5. Coste.** Hay $n+1$ llamadas con trabajo constante: $T(n)=T(n-1)+c\\in\\Theta(n)$, el doble de llamadas que la versión que resta 2.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.47,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.2",
    "n": "4.2",
    "title": "Ejercicio 4.2",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función recursiva que calcule la potencia $b^n$ en tiempo logarítmico, para una base real $b$, y un entero $n$, el cual puede ser negativo.",
    "solution": "**Paso 1. Tamaño y casos.** El tamaño es $|n|$. Para $n=0$, $b^0=1$. Para $n<0$ se usa $b^{n}=1/b^{-n}$.\n\n**Paso 2. Reglas para $n>0$.** Se reduce $n$ a la mitad:\n- $n$ par: $b^n=(b^{n/2})^2$.\n- $n$ impar: $b^n=b\\cdot(b^{\\lfloor n/2\\rfloor})^2$.\n\n**Paso 3. Código.** Se guarda el resultado de la llamada recursiva en una variable para hacer **una sola** llamada:\n```python\ndef potencia(b, n):\n    if n < 0:\n        return 1 / potencia(b, -n)\n    elif n == 0:\n        return 1\n    else:\n        p = potencia(b, n // 2)\n        if n % 2 == 0:\n            return p * p\n        else:\n            return b * p * p\n```\n\n**Paso 4. Comprobación y coste.** `potencia(2, 10)` da 1024 y `potencia(2, -3)` da 0,125. Cada llamada divide $n$ por 2: $T(n)=T(n/2)+c\\in\\Theta(\\log n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.17,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.3",
    "n": "4.3",
    "title": "Ejercicio 4.3",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función recursiva que calcule la $n$-ésima potencia de una matriz cuadrada, que será otra matriz cuadrada de las mismas dimensiones. Usa el paquete de Python NumPy y los métodos:\n- `identity`: devuelve la matriz identidad.\n- `shape`: indica las dimensiones de una matriz.\n- `dot`: multiplica matrices.\n\nPor último, calcula las matrices:\n$\\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}^n$\npara $n=1,\\ldots,10$, e imprime el elemento de la primera fila y segunda columna. ¿Reconoces estos números?",
    "solution": "**Paso 1. Idea.** Es la misma estrategia que la potencia de un número, pero con matrices: el caso base es la matriz identidad ($A^0=I$), y $A^n=(A^{n/2})^2$ o $A\\cdot(A^{\\lfloor n/2\\rfloor})^2$.\n\n**Paso 2. Código.** `shape[0]` da la dimensión de la matriz cuadrada.\n```python\nimport numpy as np\n\ndef potencia_matriz(A, n):\n    if n == 0:\n        return np.identity(A.shape[0], dtype=int)\n    else:\n        M = potencia_matriz(A, n // 2)\n        if n % 2 == 0:\n            return M.dot(M)\n        else:\n            return A.dot(M).dot(M)\n\nF = np.array([[1, 1], [1, 0]])\nfor n in range(1, 11):\n    print(n, potencia_matriz(F, n)[0, 1])\n```\n\n**Paso 3. Resultado.** El elemento de la primera fila y segunda columna vale $1,1,2,3,5,8,13,21,34,55$: son los **números de Fibonacci**, porque $\\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}^n=\\begin{pmatrix}F_{n+1}&F_n\\\\F_n&F_{n-1}\\end{pmatrix}$.\n\n**Paso 4. Coste.** Hay $\\Theta(\\log n)$ llamadas, cada una con a lo sumo dos productos de matrices $2\\times2$ (constante): $\\Theta(\\log n)$. Es una forma de calcular Fibonacci en tiempo logarítmico.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.56,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.4",
    "n": "4.4",
    "title": "Ejercicio 4.4",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "En Python y otros lenguajes de programación las funciones pueden ser también parámetros de otras funciones. Define e implementa una función general recursiva que calcule el siguiente sumatorio:\n$g(m,n,f)=\\sum_{i=m}^{n}f(i)=f(m)+f(m+1)+\\cdots+f(n-1)+f(n),$\ndonde $m$ y $n$ son enteros, y $f$ es una función. Úsala para calcular e imprimir:\n$\\sum_{i=1}^{n}i^3,$\npara $n=0,\\ldots,4$.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es el número de términos, $n-m+1$. Si $m>n$ la suma está vacía y vale 0.\n\n**Paso 2. Regla.** Se aísla el primer término: $g(m,n,f)=f(m)+g(m+1,n,f)$.\n\n**Paso 3. Código.** La función `f` es un parámetro más.\n```python\ndef suma(m, n, f):\n    if m > n:\n        return 0\n    else:\n        return f(m) + suma(m + 1, n, f)\n\nfor n in range(0, 5):\n    print(n, suma(1, n, lambda i: i ** 3))\n```\n\n**Paso 4. Resultado.** Imprime $0,1,9,36,100$ para $n=0,\\dots,4$, que coincide con $\\left(\\frac{n(n+1)}2\\right)^2$. Coste: $n-m+2$ llamadas, es decir, $\\Theta(n-m)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.42,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.5",
    "n": "4.5",
    "title": "Ejercicio 4.5",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa funciones recursivas para calcular un \"producto lento\" entre dos números enteros no negativos $m$ y $n$. Los algoritmos pueden sumar y restar números, pero no los pueden multiplicar (no puede usar el operador `*`). Usa descomposiciones que reduzcan uno o ambos parámetros de entrada en una unidad. Además, crea diagramas en los que se aprecie el proceso de diseño recursivo (descomposición y generación de la regla recursiva). Pueden ser diagramas donde el producto de $m$ y $n$ sea el área de un rectángulo de base $m$ y altura $n$ (el rectángulo tendrá $mn$ bloques cuadrados de área 1 (cuadrados de $1\\times 1$), como se ilustra en la siguiente figura:\n[figura: rectángulo de cuadrículas unidad, base $m$ (horizontal), altura $n$ (vertical)]",
    "solution": "**Paso 1. Tamaño y casos base.** El tamaño es $\\min(m,n)$ (o uno de los dos parámetros). Si $m=0$ o $n=0$ el producto es 0.\n\n**Paso 2. Diagramas.** El producto es el área de un rectángulo de base $m$ y altura $n$.\n```\nQuitar una fila:                Quitar una columna:        Quitar ambas:\n m·n = m·(n-1) + m               m·n = (m-1)·n + n          m·n = (m-1)(n-1) + (m-1) + (n-1) + 1\n ┌──────────┐                    ┌─────────┬─┐              ┌─────────┬─┐\n │ m·(n-1)  │                    │(m-1)·n  │n│              │(m-1)(n-1)│ │ n-1\n ├──────────┤ 1 fila de m        │         │ │              ├─────────┼─┤\n │    m     │                    └─────────┴─┘              │  m-1    │1│\n └──────────┘                                               └─────────┴─┘\n```\n\n**Paso 3. Reglas recursivas.**\n- Quitando una fila: $m\\cdot n=m\\cdot(n-1)+m$.\n- Quitando una columna: $m\\cdot n=(m-1)\\cdot n+n$.\n- Quitando fila y columna: $m\\cdot n=(m-1)(n-1)+(m-1)+(n-1)+1$, es decir, $+\\,m+n-1$ (una \"L\" de $m+n-1$ cuadrados).\n\n**Paso 4. Código.**\n```python\ndef producto_1(m, n):             # quita una fila: reduce n\n    if n == 0:\n        return 0\n    else:\n        return producto_1(m, n - 1) + m\n\ndef producto_2(m, n):             # quita una columna: reduce m\n    if m == 0:\n        return 0\n    else:\n        return producto_2(m - 1, n) + n\n\ndef producto_3(m, n):             # quita fila y columna: reduce los dos\n    if m == 0 or n == 0:\n        return 0\n    else:\n        return producto_3(m - 1, n - 1) + m + n - 1\n```\n\n**Paso 5. Coste.** $\\Theta(n)$, $\\Theta(m)$ y $\\Theta(\\min(m,n))$ llamadas, respectivamente.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.84,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.6",
    "n": "4.6",
    "title": "Ejercicio 4.6",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una versión recursiva más eficiente del \"producto lento\" empleando una descomposición que divida a ambos parámetros de entrada por dos. Emplea diagramas rectangulares como el del ejercicio 4.5 para hallar los casos recursivos.",
    "solution": "**Paso 1. Idea.** Se divide el rectángulo en cuatro bloques con $a=\\lfloor m/2\\rfloor$ y $b=\\lfloor n/2\\rfloor$: el bloque grande $2a\\times2b$ vale $4ab$ y sobran, como mucho, una fila y una columna.\n```\n m = 2a + r,   n = 2b + s     (r, s son 0 o 1)\n m·n = 4ab + 2as + 2br + rs\n```\n\n**Paso 2. Casos.** Con $p=a\\cdot b$ (la llamada recursiva sobre $a$ y $b$):\n- $m$ y $n$ pares: $m\\,n=4p$.\n- $m$ impar, $n$ par: $m\\,n=4p+n$ (sobra una fila de longitud $n$).\n- $m$ par, $n$ impar: $m\\,n=4p+m$.\n- Ambos impares: $m\\,n=4p+m+n-1$ (una \"L\").\n\n**Paso 3. Código.** Sin usar `*`, el 4 se obtiene sumando dos veces:\n```python\ndef producto_rapido(m, n):\n    if m == 0 or n == 0:\n        return 0\n    p = producto_rapido(m // 2, n // 2)\n    p2 = p + p\n    p4 = p2 + p2\n    if m % 2 == 0 and n % 2 == 0:\n        return p4\n    elif m % 2 == 1 and n % 2 == 0:\n        return p4 + n\n    elif m % 2 == 0 and n % 2 == 1:\n        return p4 + m\n    else:\n        return p4 + m + n - 1\n```\n\n**Paso 4. Coste.** Los dos parámetros se dividen por 2 en cada llamada, así que hay $\\Theta(\\log\\min(m,n))$ llamadas.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.26,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.7",
    "n": "4.7",
    "title": "Ejercicio 4.7",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Define e implementa una función recursiva que calcule el número de dígitos de un número entero $n$ no negativo.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es el número de dígitos. Si $n<10$ tiene un dígito (el 0 también).\n\n**Paso 2. Regla.** Quitando el dígito menos significativo, `n // 10` tiene un dígito menos: $d(n)=1+d(n//10)$.\n\n**Paso 3. Código.**\n```python\ndef num_digitos(n):\n    if n < 10:\n        return 1\n    else:\n        return 1 + num_digitos(n // 10)\n```\n\n**Paso 4. Coste.** $\\Theta(\\log n)$ llamadas. `num_digitos(3652)` devuelve 4.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.12,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.8",
    "n": "4.8",
    "title": "Ejercicio 4.8",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Define e implementa una función recursiva que, dado un número decimal $n$, cuyos dígitos son ceros o unos, retorne el número cuya representación en binario fuera precisamente la secuencia de unos y ceros de $n$. Por ejemplo, si $n=10110_{10}$, la función devolverá 22, ya que $10110_2=22$.",
    "solution": "**Paso 1. Idea.** Un número decimal con sólo ceros y unos se interpreta como binario: $10110_2=22$. El tamaño es el número de dígitos; si $n<10$ el resultado es el propio $n$ (0 o 1).\n\n**Paso 2. Descomposición.** Quitar el último dígito: $n//10$. Si su valor binario es $v$, el de $n$ es $2v$ más el último dígito $n\\%10$.\n\n**Paso 3. Regla.** $b(n)=2\\cdot b(n//10)+n\\%10$.\n\n**Paso 4. Código.**\n```python\ndef binario_a_entero(n):\n    if n < 10:\n        return n\n    else:\n        return 2 * binario_a_entero(n // 10) + n % 10\n```\n\n**Paso 5. Comprobación.** `binario_a_entero(10110)` devuelve 22: $b(1)=1$, $b(10)=2$, $b(101)=5$, $b(1011)=11$, $b(10110)=22$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.32,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.9",
    "n": "4.9",
    "title": "Ejercicio 4.9",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa un algoritmo que realice el cambio de base de decimal a una base $b$ ($2\\le b\\le 9$). Usa un diagrama general que ilustre el proceso mental de diseño de algoritmos recursivos.",
    "solution": "**Paso 1. Diagrama del proceso mental.** El problema es escribir $n$ en base $b$; el subproblema es escribir $n//b$, que tiene un dígito menos. El dígito que falta es el resto:\n```\n n  en base b  =  [ n // b en base b ] [ n % b ]\n 142 en base 5  =  [ 28 en base 5 = 103 ] [ 2 ] = 1032\n```\n\n**Paso 2. Caso base.** Si $n<b$, la salida tiene un solo dígito: $c(n,b)=n$.\n\n**Paso 3. Regla.** Se desplaza el resultado del subproblema un dígito a la izquierda (multiplicar por 10) y se añade el resto: $c(n,b)=10\\cdot c(n//b,b)+n\\%b$. Como $b\\le9$, cada dígito es menor que 10 y el resultado se puede devolver como un entero.\n\n**Paso 4. Código.**\n```python\ndef cambio_base(n, b):\n    if n < b:\n        return n\n    else:\n        return 10 * cambio_base(n // b, b) + n % b\n```\n\n**Paso 5. Comprobación y coste.** `cambio_base(142, 5)` devuelve 1032 y `cambio_base(25, 2)` devuelve 11001. Hay tantas llamadas como dígitos de la salida: $\\Theta(\\log_bn)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.21,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.10",
    "n": "4.10",
    "title": "Ejercicio 4.10",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Considérese el problema del ejercicio 1.9. Define e implementa un algoritmo que, dado un número $x$ de $n$ bits, determine la posición de su bit menos significativo puesto a 1. Considera además que la posición del bit menos significativo es la 1. Por ejemplo, para $x=01110100$ el bit menos significativo (más a la derecha) puesto a 1 está en la posición 3.",
    "solution": "**Paso 1. Planteamiento.** Se busca la posición (empezando en 1 por la derecha) del bit menos significativo puesto a 1 de $x>0$. El tamaño es el número de bits.\n\n**Paso 2. Caso base.** Si el último bit es 1 ($x$ impar), la posición es 1.\n\n**Paso 3. Descomposición y regla.** Si el último bit es 0, se quita con `x // 2` y la posición es una más: $p(x)=1+p(x//2)$.\n\n**Paso 4. Código.**\n```python\ndef posicion_bit_uno(x):\n    if x % 2 == 1:\n        return 1\n    else:\n        return 1 + posicion_bit_uno(x // 2)\n```\n\n**Paso 5. Comprobación y coste.** Para $x=01110100_2=116$ devuelve 3. Se procesan como mucho $n$ bits: $\\Theta(n)$ (es el número de bits que procesa el algoritmo del ejercicio 1.9).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.4,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.11",
    "n": "4.11",
    "title": "Ejercicio 4.11",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Escribe un método recursivo que emplee la función desarrollada en el ejercicio 4.10 para resolver el ejercicio 1.9 de manera computacional. Imprime las soluciones para números expresados en $n=1,\\ldots,5$ bits.",
    "solution": "**Paso 1. Qué se cuenta.** El ejercicio 1.9 pide la suma, para todos los números de 1 a $2^n-1$, de los bits que procesa el algoritmo, que es justo la posición de su primer 1: $\\sum_{x=1}^{2^n-1}p(x)$ con $p$ la función del ejercicio 4.10.\n\n**Paso 2. Suma recursiva.** Se suma de $x=2^n-1$ hacia abajo: $S(x)=p(x)+S(x-1)$ con $S(0)=0$.\n\n**Paso 3. Código.**\n```python\ndef suma_posiciones(x):\n    if x == 0:\n        return 0\n    else:\n        return posicion_bit_uno(x) + suma_posiciones(x - 1)\n\nfor n in range(1, 6):\n    print(n, suma_posiciones(2 ** n - 1))\n```\n\n**Paso 4. Resultado.** Imprime $1,4,11,26,57$, que coincide con la fórmula $2^{n+1}-(n+2)$ del ejercicio 1.9 (26 para $n=4$).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.23,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.12",
    "n": "4.12",
    "title": "Ejercicio 4.12",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función recursiva que retorne el número de vocales en una cadena de caracteres.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es la longitud de la cadena; la cadena vacía no tiene vocales.\n\n**Paso 2. Regla.** Se quita el primer carácter: el resultado es 1 si es una vocal (más lo que haya en el resto) y 0 si no.\n\n**Paso 3. Código.**\n```python\ndef cuenta_vocales(s):\n    if s == \"\":\n        return 0\n    else:\n        esta = 1 if s[0].lower() in \"aeiouáéíóúü\" else 0\n        return esta + cuenta_vocales(s[1:])\n```\n\n**Paso 4. Comprobación y coste.** `cuenta_vocales(\"Recursión\")` devuelve 4. Hay $n+1$ llamadas.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.1,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.13",
    "n": "4.13",
    "title": "Ejercicio 4.13",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Considera el siguiente código para generar la $n$-ésima fila del triángulo de Pascal:\n```python\ndef pascal(n):\n    if n == 0:\n        return [1]\n    else:\n        fila = [1]\n\n        fila_previa = pascal(n - 1)\n\n        for i in range(len(fila_previa) - 1):\n            row.append(fila_previa[i] + fila_previa[i + 1])\n\n        fila.append(1)\n        return fila\n```\nReemplaza el bucle por una función recursiva. Deberá recibir una fila del triángulo de Pascal mediante una lista, y devolverá la lista con las sumas de sus elementos consecutivos. Por ejemplo, para la entrada `[1, 3, 3, 1]` el resultado deberá ser `[4, 6, 4]`.",
    "solution": "**Paso 1. Un fallo del código dado.** El bucle usa `row`, una variable que no existe: debería ser `fila`. La fila $n$ es $[1]$, seguida de las sumas de elementos consecutivos de la fila anterior, y terminada en $1$.\n\n**Paso 2. Función recursiva para el bucle.** Recibe una fila y devuelve la lista de sumas de elementos consecutivos. Si tiene menos de dos elementos, no hay parejas.\n\n**Paso 3. Código.**\n```python\ndef suma_consecutivos(fila):\n    if len(fila) < 2:\n        return []\n    else:\n        return [fila[0] + fila[1]] + suma_consecutivos(fila[1:])\n\ndef pascal(n):\n    if n == 0:\n        return [1]\n    else:\n        return [1] + suma_consecutivos(pascal(n - 1)) + [1]\n```\n\n**Paso 4. Comprobación.** `suma_consecutivos([1, 3, 3, 1])` devuelve `[4, 6, 4]`, y `pascal(4)` devuelve `[1, 4, 6, 4, 1]`.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.7,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.14",
    "n": "4.14",
    "title": "Ejercicio 4.14",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Considera un número entero no negativo $n$ cuyos dígitos siempre aparecen en orden ascendente de izquierda a derecha, como el 24667. En otras palabras, si $d_{m-1}\\cdots d_1 d_0$ representa la secuencia de ($m$) dígitos de $n$, entonces $d_i\\le d_j$ para $i<j$. Dado un dígito adicional $0\\le x\\le 9$, implementa una función que devuelva el entero que resulta de insertar $x$ en $n$, de manera que los dígitos sigan apareciendo ordenados de izquierda a derecha. Por ejemplo, si $n=24667$ y $x=5$, la función deberá devolver 245667. Evita incluir casos base redundantes.",
    "solution": "**Paso 1. Tamaño.** Es el número de dígitos de $n$. Los dígitos están ordenados, así que el mayor es el último, `n % 10`.\n\n**Paso 2. Caso base único.** Si $x\\ge$ último dígito (o $n=0$, sin dígitos) se pone $x$ al final: $n\\cdot10+x$. Basta una sola condición, sin casos base redundantes.\n\n**Paso 3. Caso recursivo.** Si $x$ es menor que el último dígito, hay que insertarlo antes: se inserta en `n // 10` y se vuelve a pegar el último dígito.\n\n**Paso 4. Código.**\n```python\ndef inserta_digito(n, x):\n    if n == 0 or x >= n % 10:\n        return n * 10 + x\n    else:\n        return inserta_digito(n // 10, x) * 10 + n % 10\n```\n\n**Paso 5. Comprobación y coste.** `inserta_digito(24667, 5)` devuelve 245667. En el peor caso se recorren todos los dígitos: $\\Theta(m)$ con $m$ el número de dígitos.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.63,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.15",
    "n": "4.15",
    "title": "Ejercicio 4.15",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Este ejercicio es similar al 4.14. Dada una lista ordenada de números en orden ascendente, y un número $x$ cualquiera, implementa una función que inserte $x$ en la lista de manera que ésta siga estando ordenada.",
    "solution": "**Paso 1. Mismo esquema que 4.14.** El mayor elemento es el último de la lista ordenada.\n\n**Paso 2. Caso base y regla.** Si la lista está vacía o $x\\ge$ último elemento, $x$ va al final. Si no, se inserta en `a[:-1]` y se añade el último elemento.\n\n**Paso 3. Código.**\n```python\ndef inserta_ordenada(a, x):\n    if a == [] or x >= a[-1]:\n        return a + [x]\n    else:\n        return inserta_ordenada(a[:-1], x) + [a[-1]]\n```\n\n**Paso 4. Comprobación y coste.** `inserta_ordenada([1, 3, 5, 5, 6], 4)` devuelve `[1, 3, 4, 5, 5, 6]`. En el peor caso hay $n$ llamadas con copias de lista: $O(n)$ llamadas, $O(n^2)$ con las copias.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.23,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.16",
    "n": "4.16",
    "title": "Ejercicio 4.16",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Un coeficiente binomial $\\binom{n}{m}$ es una función de dos parámetros enteros $n$ y $m$, con $n\\ge m\\ge 0$. Define tres funciones recursivas lineales para calcular coeficientes binomiales basadas en descomposiciones que: (i) decrementen $n$ en una unidad, (ii) decrementen $m$ en una unidad, y (iii) decrementen tanto $n$ como $m$ en una unidad. Usa las siguientes definiciones para desarrollar los casos recursivos:\n$\\binom{n}{m}=\\begin{cases}1 & m=0 \\text{ o } n=m\\\\ \\frac{n!}{m!(n-m)!} & \\text{en otro caso,}\\end{cases}$\n$\\binom{n}{m}=\\begin{cases}1 & m=0 \\text{ o } n=m\\\\ \\binom{n-1}{m-1}+\\binom{n-1}{m} & \\text{en otro caso.}\\end{cases}$",
    "solution": "**Paso 1. Casos base.** $\\binom nm=1$ si $m=0$ o $n=m$.\n\n**Paso 2. Recursión lineal con la fórmula factorial.** Basta una llamada recursiva si se usa $\\binom nm=\\frac{n!}{m!\\,(n-m)!}$:\n- (i) Decrementa $n$: $\\binom nm=\\dfrac{n}{n-m}\\binom{n-1}{m}$.\n- (ii) Decrementa $m$: $\\binom nm=\\dfrac{n-m+1}{m}\\binom{n}{m-1}$.\n- (iii) Decrementa $n$ y $m$: $\\binom nm=\\dfrac{n}{m}\\binom{n-1}{m-1}$.\n\nCada una se comprueba sustituyendo los factoriales: por ejemplo, $\\frac nm\\binom{n-1}{m-1}=\\frac nm\\cdot\\frac{(n-1)!}{(m-1)!(n-m)!}=\\frac{n!}{m!(n-m)!}$.\n\n**Paso 3. Código.** Se multiplica antes de dividir y se usa `//`: el producto es siempre divisible (por ejemplo, $n\\binom{n-1}{m-1}=m\\binom nm$).\n```python\ndef binom_n(n, m):               # decrementa n\n    if m == 0 or n == m:\n        return 1\n    else:\n        return n * binom_n(n - 1, m) // (n - m)\n\ndef binom_m(n, m):               # decrementa m\n    if m == 0 or n == m:\n        return 1\n    else:\n        return (n - m + 1) * binom_m(n, m - 1) // m\n\ndef binom_nm(n, m):              # decrementa n y m\n    if m == 0 or n == m:\n        return 1\n    else:\n        return n * binom_nm(n - 1, m - 1) // m\n```\n\n**Paso 4. Comprobación y coste.** Las tres dan $\\binom{10}{4}=210$. Cada una hace, como mucho, $n$ llamadas: $O(n)$, frente a la versión con dos llamadas, que es exponencial.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.72,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#4.17",
    "n": "4.17",
    "title": "Ejercicio 4.17",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "El algoritmo \"insertion sort\" ordena una lista aplicando repetidamente el procedimiento que se ilustra en la siguiente figura:\n```\nLista (índices 0..12), \"ordenado\" = índices 0..4, \"desordenado\" = 5..12; el elemento de índice 5 (4) se inserta:\n1 3 5 5 6 | 4 2 8 1 9 3 7 8\n                         paso 5\nResultado: \"ordenado\" = índices 0..5, \"desordenado\" = 6..12:\n1 3 4 5 5 6 | 2 8 1 9 3 7 8\n```\nEn la etapa $i$-ésima los elementos desde el índice 0 hasta el $i-1$ estarán ordenados correctamente, mientras el resto de la lista no estará (necesariamente) ordenada. Para proceder, el método inserta el elemento correspondiente al índice $i$ en la sublista ordenada, de manera que la sublista desde el índice 0 al $i$ quede ordenada. Si esta operación se realiza desde el índice (paso) 1 (o 0) hasta el $n-1$, la lista quedará ordenada al final del proceso. Implementa una variante recursiva del método para ordenar una lista, que use la función desarrollada en el ejercicio 4.15.",
    "solution": "**Paso 1. Descomposición.** Para ordenar una lista de $n$ elementos se ordenan los $n-1$ primeros y se **inserta** el último en el resultado, que ya está ordenado. La inserción es la función del ejercicio 4.15.\n\n**Paso 2. Caso base.** Una lista de 0 o 1 elementos ya está ordenada.\n\n**Paso 3. Código.**\n```python\ndef insertion_sort(a):\n    if len(a) <= 1:\n        return a\n    else:\n        return inserta_ordenada(insertion_sort(a[:-1]), a[-1])\n```\n\n**Paso 4. Comprobación y coste.** `insertion_sort([4, 2, 8, 1, 9, 3])` devuelve `[1, 2, 3, 4, 8, 9]`. Hay $n$ llamadas, cada una con una inserción de coste $O(n)$: $O(n^2)$ en el peor caso.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.0,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#5.1",
    "n": "5.1",
    "title": "Ejercicio 5.1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Define e implementa funciones booleanas, basadas en recursividad lineal y recursividad por cola, que determinen si un número entero no negativo contiene un dígito impar.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es el número de dígitos. Cuando ya no quedan dígitos ($n=0$) no hay ninguno impar. (El número 0 tiene el dígito 0, que es par: también da `False`.)\n\n**Paso 2. Descomposición.** Se quita el último dígito: `n // 10`. El último dígito es impar si y sólo si `n` es impar (porque 10 es par).\n\n**Paso 3. Recursión lineal.** Queda una operación pendiente tras la llamada: la disyunción con el dígito actual.\n```python\ndef contiene_impar(n):\n    if n == 0:\n        return False\n    else:\n        return contiene_impar(n // 10) or n % 2 == 1\n```\n\n**Paso 4. Recursión por cola.** El resultado se va acumulando en un parámetro y la llamada recursiva es lo último que se hace:\n```python\ndef contiene_impar_cola(n, hay_impar=False):\n    if n == 0:\n        return hay_impar\n    else:\n        return contiene_impar_cola(n // 10, hay_impar or n % 2 == 1)\n```\n\n**Paso 5. Comprobación y coste.** `contiene_impar(2468)` es `False` y `contiene_impar(2463)` es `True`. Hay una llamada por dígito: $\\Theta(\\log n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.69,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#5.2",
    "n": "5.2",
    "title": "Ejercicio 5.2",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Es más agradable mostrar polinomios en un estilo formateado que mediante una lista de coeficientes. Escribe un método que reciba una lista de longitud $n$ que represente un polinomio de grado $n-1$, y lo imprima de manera formateada. Por ejemplo, dada la lista de entrada `p = [3, -5, 0, 1]`, asociada al polinomio $x^3-5x^1+3$ (es decir, $p_i$ es el coeficiente asociado al término $x^i$), el método deberá imprimir una línea similar a: `+ 1x^3 - 5x^1 + 3`. Asume que $p_{n-1}\\neq 0$, salvo si el polinomio es la constante 0. Finalmente, indica su coste computacional en tiempo.",
    "solution": "**Paso 1. Idea.** Se recorren los coeficientes desde el término de mayor grado ($i=n-1$) hasta el de grado 0. Cada coeficiente no nulo se imprime con su signo.\n\n**Paso 2. Reglas de formato.** Signo `+` o `-`, valor absoluto, y `x^i` salvo en el término constante. Si todos los coeficientes son 0 se imprime `0`.\n\n**Paso 3. Código.**\n```python\ndef imprime_polinomio(p):\n    if len(p) == 1 and p[0] == 0:\n        print('0')\n    else:\n        imprime_terminos(p, len(p) - 1)\n        print()\n\ndef imprime_terminos(p, i):\n    if i >= 0:\n        if p[i] != 0:\n            signo = '+' if p[i] > 0 else '-'\n            if i == 0:\n                print(signo, abs(p[i]), end=' ')\n            else:\n                print(signo, str(abs(p[i])) + 'x^' + str(i), end=' ')\n        imprime_terminos(p, i - 1)\n```\n\n**Paso 4. Comprobación.** `imprime_polinomio([3, -5, 0, 1])` imprime `+ 1x^3 - 5x^1 + 3`.\n\n**Paso 5. Coste.** Hay $n+1$ llamadas, cada una con un trabajo constante (una impresión): $T(n)=T(n-1)+c\\in\\Theta(n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.14,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#5.3",
    "n": "5.3",
    "title": "Ejercicio 5.3",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "El algoritmo \"counting sort\" es un método para ordenar una lista `a` de $n$ enteros pertenecientes al intervalo $[0,k]$, donde $k$ suele ser pequeño. Su coste en tiempo es $O(n+k)$, lo cual implica que corre en tiempo $O(n)$ si $k\\in O(n)$.\nDada una lista `a`, el método crea una lista `b` que contiene el número de apariciones de cada entero en `a`, como se muestra en el paso 1 de la siguiente figura:\n```\na: 2 2 3 2 0 1 3 2 0 0 4\n        paso 1\nb: 3 1 4 2 1        (índices 0 1 2 3 4)\n        paso 2\nc: 0 0 0 1 2 2 2 2 3 3 4\n```\nPor ejemplo, $b_2=4$, ya que el entero 2 aparece cuatro veces en `a`. Implementa un procedimiento recursivo por cola que reciba las listas `a` and `b` (ésta inicializada con ceros), y rellene `b` con las apariciones de los enteros en `a`. Además, implementa una función recursiva lineal que reciba la lista de apariciones `b`, y devuelva una nueva lista (`c`) que sea la versión ordenada (de menor a mayor) de `a`, como se mostraba en el paso 2 de la figura anterior. Finalmente, implementa una función que llame a las dos anteriores para codificar esta versión recursiva del algoritmo counting sort, y especifica su coste computacional en espacio y en tiempo.",
    "solution": "**Paso 1. Rellenar `b` (recursión por cola).** Se recorre `a` con un índice `i`; en cada paso se cuenta una aparición y la llamada recursiva es lo último que se hace. El caso base es haber recorrido toda la lista.\n```python\ndef cuenta(a, b, i=0):\n    if i < len(a):\n        b[a[i]] += 1\n        cuenta(a, b, i + 1)\n```\n\n**Paso 2. Construir `c` (recursión lineal).** Para el valor $i$ se escriben `b[i]` copias de $i$ y después el resultado de los valores siguientes; queda una concatenación pendiente tras la llamada.\n```python\ndef construye(b, i=0):\n    if i == len(b):\n        return []\n    else:\n        return [i] * b[i] + construye(b, i + 1)\n```\n\n**Paso 3. Counting sort.** Una función que llama a las dos anteriores:\n```python\ndef counting_sort(a):\n    if a == []:\n        return []\n    b = [0] * (max(a) + 1)\n    cuenta(a, b)\n    return construye(b)\n```\n\n**Paso 4. Comprobación.** Con `a = [2, 2, 3, 2, 0, 1, 3, 2, 0, 0, 4]`, `b` queda `[3, 1, 4, 2, 1]` y el resultado es `[0, 0, 0, 1, 2, 2, 2, 2, 3, 3, 4]`.\n\n**Paso 5. Coste en tiempo.** `cuenta` hace $n$ llamadas de coste constante y `construye` hace $k+1$ llamadas que, en conjunto, escriben $n$ elementos: $\\Theta(n+k)$, es decir, $\\Theta(n)$ si $k\\in O(n)$. (Con la concatenación `+` se copia la cola en cada llamada, lo que en el peor caso eleva el coste a $O(k\\cdot n)$; si se construye la lista en sitio, por ejemplo con `extend`, se mantiene $\\Theta(n+k)$.)\n\n**Paso 6. Coste en espacio.** La lista `b` ocupa $k+1$ y la lista resultado $n$: $\\Theta(n+k)$ de memoria auxiliar, más la pila de llamadas, que llega a $\\Theta(n)$ en `cuenta` y $\\Theta(k)$ en `construye` (con listas largas hay que subir el límite de recursión de Python).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.5,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#5.4",
    "n": "5.4",
    "title": "Ejercicio 5.4",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función que busque al elemento con la clave más pequeña en un árbol de búsqueda binario $T$, el cual se define como una lista de cuatro componentes: clave, elemento, subárbol izquierdo y subárbol derecho.",
    "solution": "**Paso 1. Representación.** Un árbol es `[clave, elemento, izq, der]` y el árbol vacío es `[]`.\n\n**Paso 2. Regla.** En un árbol de búsqueda binario las claves menores están a la izquierda: la clave más pequeña es la del nodo más a la izquierda. Si el subárbol izquierdo está vacío, la raíz es el mínimo; si no, se busca en el izquierdo (recursión por cola).\n\n**Paso 3. Código.** Devuelve la pareja (clave, elemento), o `None` si el árbol está vacío:\n```python\ndef minimo(T):\n    if T == []:\n        return None\n    elif T[2] == []:\n        return (T[0], T[1])\n    else:\n        return minimo(T[2])\n```\n\n**Paso 4. Comprobación y coste.** Con `T = [5, 'e', [3, 'c', [1, 'a', [], []], []], [8, 'h', [], []]]`, `minimo(T)` es `(1, 'a')`. Se recorre una rama: $\\Theta(h)$, siendo $h$ la altura (hasta $n$ si el árbol es una lista).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.74,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#5.5",
    "n": "5.5",
    "title": "Ejercicio 5.5",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una versión alternativa del siguiente código asociado a una búsqueda binaria:\n```python\ndef busqueda_binaria(a, x, inf, sup):\n    if inf > sup: # lista vacia\n        return -1\n    else:\n        mitad = (inf + sup) // 2\n\n        if x == a[mitad]:\n            return mitad\n        elif x < a[mitad]:\n            return busqueda_binaria(a, x, inf, mitad - 1)\n        else:\n            return busqueda_binaria(a, x, mitad + 1, sup)\n\ndef busqueda_binaria_wrapper(a, x):\n    return busqueda_binaria(a, x, 0, len(a) - 1)\n```\nque no use el parámetro `sup`. Especifica también su coste computacional en tiempo.",
    "solution": "**Paso 1. Idea.** Sin `sup`, se trabaja con una sublista y se lleva la cuenta de dónde empieza dentro de la lista original con un desplazamiento `inf`.\n\n**Paso 2. Código.** La mitad izquierda no cambia el desplazamiento; la derecha lo aumenta en `mitad + 1`:\n```python\ndef busqueda_binaria_2(a, x, inf=0):\n    if a == []:\n        return -1\n    else:\n        mitad = len(a) // 2\n        if x == a[mitad]:\n            return inf + mitad\n        elif x < a[mitad]:\n            return busqueda_binaria_2(a[:mitad], x, inf)\n        else:\n            return busqueda_binaria_2(a[mitad + 1:], x, inf + mitad + 1)\n```\n\n**Paso 3. Coste.** Hay $\\log_2n$ llamadas, pero cada rebanada copia $\\Theta(n/2^i)$ elementos: $T(n)=T(n/2)+\\Theta(n)\\in\\Theta(n)$ (teorema maestro: $a=1<b^k=2$). Las comparaciones siguen siendo $\\Theta(\\log n)$, pero el coste total es lineal por las copias.\n\n**Paso 4. Variante logarítmica.** Para conservar $\\Theta(\\log n)$ se pasa el tamaño en vez de copiar:\n```python\ndef busqueda_binaria_3(a, x, inf, n):\n    if n == 0:\n        return -1\n    else:\n        mitad = n // 2\n        if x == a[inf + mitad]:\n            return inf + mitad\n        elif x < a[inf + mitad]:\n            return busqueda_binaria_3(a, x, inf, mitad)\n        else:\n            return busqueda_binaria_3(a, x, inf + mitad + 1, n - mitad - 1)\n```\nSe llama con `busqueda_binaria_3(a, x, 0, len(a))`.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.18,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#5.6",
    "n": "5.6",
    "title": "Ejercicio 5.6",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función booleana que realice una búsqueda binaria de un elemento `x` en una lista ordenada `a`. La función retornará `True` si `x` está presente en `a`. La función solo debe tener dos parámetros de entrada: `x` y `a`. Además, descompondrá el problema en otro de la mitad de su tamaño. Especifica también el coste computacional en tiempo de la función.",
    "solution": "**Paso 1. Descomposición.** Con sólo `x` y `a`, el problema se reduce a la mitad pasando la sublista sin el elemento central.\n\n**Paso 2. Casos.** Lista vacía: `False`. Si `x` es el elemento central: `True`. Si es menor: se busca en la mitad izquierda; si es mayor, en la derecha.\n\n**Paso 3. Código.**\n```python\ndef esta(x, a):\n    if a == []:\n        return False\n    else:\n        m = len(a) // 2\n        if x == a[m]:\n            return True\n        elif x < a[m]:\n            return esta(x, a[:m])\n        else:\n            return esta(x, a[m + 1:])\n```\n\n**Paso 4. Comprobación y coste.** `esta(5, [1, 3, 5, 7])` es `True` y `esta(4, [1, 3, 5, 7])` es `False`. Hay $\\Theta(\\log n)$ comparaciones; como cada llamada copia una sublista, el coste total es $T(n)=T(n/2)+\\Theta(n)\\in\\Theta(n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.91,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#5.7",
    "n": "5.7",
    "title": "Ejercicio 5.7",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Sea `a` una lista ordenada en orden creciente de enteros diferentes. Se pide desarrollar un algoritmo eficiente para buscar un elemento en una lista `a` que tenga el mismo valor que el índice en el que se encuentra. Es decir, queremos encontrar un elemento $i$ para el que $a_i=i$. Por ejemplo, si `a = [-3, -1, 2, 5, 6, 7, 9]`, entonces la función devolverá un 2, ya que $a_2=2$. Observa que el primer elemento se localiza en la posición 0 de la lista. Por simplicidad, asume que tendrá como mucho un elemento que satisfaga la propiedad $a_i=i$. Si la lista no contiene un elemento que la satisfaga la función deberá retornar un $-1$. Finalmente, especifica el coste computacional en tiempo de la función.",
    "solution": "**Paso 1. Observación clave.** Los elementos son enteros **distintos** y están en orden creciente, así que $a_{i+1}\\ge a_i+1$ y la diferencia $a_i-i$ **no decrece** al aumentar $i$.\n\n**Paso 2. Consecuencia.** Mirando el elemento central $m$:\n- Si $a_m=m$, se ha encontrado.\n- Si $a_m>m$, entonces $a_j-j\\ge a_m-m>0$ para todo $j\\ge m$: no puede haber punto fijo a la derecha. Se busca a la izquierda.\n- Si $a_m<m$, entonces $a_j-j\\le a_m-m<0$ para $j\\le m$: se busca a la derecha.\n\n**Paso 3. Código.**\n```python\ndef punto_fijo(a, inf, sup):\n    if inf > sup:\n        return -1\n    else:\n        m = (inf + sup) // 2\n        if a[m] == m:\n            return m\n        elif a[m] > m:\n            return punto_fijo(a, inf, m - 1)\n        else:\n            return punto_fijo(a, m + 1, sup)\n\ndef busca_punto_fijo(a):\n    return punto_fijo(a, 0, len(a) - 1)\n```\n\n**Paso 4. Comprobación y coste.** Con `a = [-3, -1, 2, 5, 6, 7, 9]` devuelve 2. Se descarta la mitad en cada llamada y no se copia nada: $T(n)=T(n/2)+c\\in\\Theta(\\log n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.28,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#5.8",
    "n": "5.8",
    "title": "Ejercicio 5.8",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Sea `a` una lista de $n$ enteros, organizados de manera que los pares aparezcan antes que los impares (es decir, el índice asociado a cualquier elemento par será menor que el índice de un elemento impar). Por ejemplo: la lista `a = [2, -4, 10, 8, 0, 12, 9, 3, -15, 3, 1]` cumple esa condición. Se pide desarrollar un algoritmo recursivo eficiente para calcular el mayor índice asociado a elementos pares. En otras palabras, se busca el índice $i$ para el que $a_i$ es par, pero donde $a_j$ será impar para todo $j>i$. En el ejemplo el método retornaría 5, ya que $a_5=12$ es par, pero $a_6$, $a_7$, $a_8$, etc., son impares. Si `a` no contuviera números pares la función deberá retornar $-1$. Por otro lado, si la lista solo contiene números pares deberá devolver $n-1$. Finalmente, especifica el coste computacional en tiempo de la función.",
    "solution": "**Paso 1. Invariante.** Todos los pares están antes que los impares, así que si $a_m$ es par, todos los elementos hasta $m$ también lo son; si es impar, todos desde $m$ lo son. Se busca la frontera con una búsqueda binaria.\n\n**Paso 2. Qué devuelve cuando no quedan elementos.** Se mantiene: *todos los índices menores que `inf` son pares y todos los mayores que `sup` son impares*. Al acabar ($\\text{inf}>\\text{sup}$), `sup` es el último índice par (o $-1$ si no hay ninguno).\n\n**Paso 3. Código.**\n```python\ndef ultimo_par(a, inf, sup):\n    if inf > sup:\n        return sup\n    else:\n        m = (inf + sup) // 2\n        if a[m] % 2 == 0:\n            return ultimo_par(a, m + 1, sup)\n        else:\n            return ultimo_par(a, inf, m - 1)\n\ndef indice_ultimo_par(a):\n    return ultimo_par(a, 0, len(a) - 1)\n```\n\n**Paso 4. Comprobación.** Con `a = [2, -4, 10, 8, 0, 12, 9, 3, -15, 3, 1]` devuelve 5. Si no hay pares (`[3, 5]`) devuelve $-1$, y si todos son pares ($n$ elementos), $n-1$.\n\n**Paso 5. Coste.** $T(n)=T(n/2)+c\\in\\Theta(\\log n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.43,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#5.9",
    "n": "5.9",
    "title": "Ejercicio 5.9",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "El método de Newton-Raphson es una estrategia para encontrar una aproximación a la raíz de una función real $f(x)$ que sea derivable, es decir, un valor $\\hat z$ donde $f(\\hat z)$ sea cero o tome un valor muy pequeño. Está basada en la siguiente regla recursiva:\n$x_n=x_{n-1}-\\frac{f(x_{n-1})}{f'(x_{n-1})},$\nexplicada geométricamente en la siguiente figura:\n[figura: curva $f(x)$ con raíz $r$ en el eje x; punto $(x_{n-1}, f(x_{n-1}))$ sobre la curva a un lado de $r$; recta tangente en ese punto que corta al eje x en $x_n$, más cerca de $r$ que $x_{n-1}$]\nConsidera una aproximación inicial $x_{n-1}$ de la raíz $r$ de la función $f(x)$. El procedimiento encuentra la recta tangente a $f(x)$ en $x_{n-1}$, y calcula una nueva aproximación ($x_n$) de $r$ que es el valor de $x$ en el que la recta corta al eje de abscisas (observa que $x_n$ se encuentra más cerca de $r$ que $x_{n-1}$). Por tanto, dado un valor inicial $x_0$, $\\hat z=x_n$ será la aproximación de la raíz de $f(x)$ tras aplicar la regla recursiva $n$ veces.\nEste procedimiento se puede usar, por ejemplo, para hallar aproximaciones muy precisas de la raíz cuadrada de un número, en solo unos pocos pasos. Supóngase que se desea calcular $\\sqrt a$, que será algún valor $x$ a priori desconocido. En ese caso tenemos las identidades: $x=\\sqrt a$, donde $x^2=a$, lo cual implica que $x^2-a=0$. Por tanto, la raíz de la parábola $x^2-a$ será la raíz cuadrada de $a$. En ese caso, la fórmula recursiva asociada al método es:\n$x_n=x_{n-1}-\\frac{x_{n-1}^2-a}{2x_{n-1}}.$\nImplementa una función recursiva lineal y otra recursiva por cola que reciban el valor de $a$, una estimación inicial de su raíz cuadrada $x_0$ y un cierto número de pasos $n$, y retorne la estimación $\\hat z=x_n$ de $\\sqrt a$ aplicando la regla recursiva anterior $n$ veces. Finalmente, especifica su coste computacional en tiempo.",
    "solution": "**Paso 1. Regla.** $x_n=x_{n-1}-\\dfrac{x_{n-1}^2-a}{2x_{n-1}}$. El tamaño es el número de pasos $n$; el caso base es $n=0$, donde la estimación es $x_0$.\n\n**Paso 2. Recursión lineal.** La aproximación tras $n$ pasos se obtiene aplicando la regla al resultado de $n-1$ pasos; queda una operación tras la llamada.\n```python\ndef raiz_lineal(a, x0, n):\n    if n == 0:\n        return x0\n    else:\n        x = raiz_lineal(a, x0, n - 1)\n        return x - (x * x - a) / (2 * x)\n```\n\n**Paso 3. Recursión por cola.** Se aplica la regla **antes** de llamar, y la llamada es lo último:\n```python\ndef raiz_cola(a, x, n):\n    if n == 0:\n        return x\n    else:\n        return raiz_cola(a, x - (x * x - a) / (2 * x), n - 1)\n```\n\n**Paso 4. Comprobación.** Con $a=13$, $x_0=13$ y $n=6$ las dos devuelven $3{,}6055512754\\ldots$ ($\\sqrt{13}$), como en el ejemplo del tema.\n\n**Paso 5. Coste.** Cada paso hace un número constante de operaciones: $T(n)=T(n-1)+c\\in\\Theta(n)$ (la convergencia es muy rápida: el error se eleva aproximadamente al cuadrado en cada paso).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.5,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#6.1",
    "n": "6.1",
    "title": "Ejercicio 6.1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función booleana basada en divide y vencerás que determine si una lista `a` contiene un elemento concreto `x`.",
    "solution": "**Paso 1. Tamaño y casos base.** El tamaño es el número de elementos del tramo `inf..sup`. Si el tramo está vacío (`inf > sup`), `x` no está. Si tiene un solo elemento, se compara con él.\n\n**Paso 2. Descomposición.** Se divide el tramo en dos mitades.\n\n**Paso 3. Combinación.** `x` está en el tramo si está en la mitad izquierda **o** en la derecha.\n\n**Paso 4. Código.** Con límites no se copian rebanadas:\n```python\ndef contiene(a, x, inf, sup):\n    if inf > sup:\n        return False\n    elif inf == sup:\n        return a[inf] == x\n    else:\n        m = (inf + sup) // 2\n        return contiene(a, x, inf, m) or contiene(a, x, m + 1, sup)\n\ndef contiene_wrapper(a, x):\n    return contiene(a, x, 0, len(a) - 1)\n```\n\n**Paso 5. Coste.** En el peor caso (`x` no está) $T(n)=2T(n/2)+c\\in\\Theta(n)$, igual que una búsqueda lineal: dividir no mejora nada si hay que mirar todos los elementos.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 1.14,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#6.2",
    "n": "6.2",
    "title": "Ejercicio 6.2",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Sea `a` una lista de $n$ enteros no negativos. Escribe una función basada en divide y vencerás que retorne el conjunto de dígitos que aparezcan en todos los elementos de `a`, y determina su coste computacional en tiempo. Por ejemplo, para `a = [2348, 1349, 7523, 3215]`, la solución es $\\{3\\}$. La función a implementar deberá llamar a otra que devuelva el conjunto de dígitos de un entero no negativo. Implementa esta función también.",
    "solution": "**Paso 1. Función auxiliar.** El conjunto de dígitos de un entero $n\\ge0$: si $n<10$ es $\\{n\\}$; si no, el dígito menos significativo junto con los dígitos de `n // 10`.\n```python\ndef digitos(n):\n    if n < 10:\n        return {n}\n    else:\n        return {n % 10} | digitos(n // 10)\n```\n\n**Paso 2. Divide y vencerás.** Un dígito aparece en **todos** los elementos de la lista si aparece en todos los de la mitad izquierda **y** en todos los de la derecha: se **intersectan** los conjuntos de las dos mitades. El caso base es un solo elemento, cuyo conjunto son sus dígitos (se supone la lista no vacía).\n\n**Paso 3. Código.**\n```python\ndef digitos_comunes(a, inf, sup):\n    if inf == sup:\n        return digitos(a[inf])\n    else:\n        m = (inf + sup) // 2\n        return digitos_comunes(a, inf, m) & digitos_comunes(a, m + 1, sup)\n\ndef digitos_comunes_wrapper(a):\n    return digitos_comunes(a, 0, len(a) - 1)\n```\n\n**Paso 4. Comprobación.** `digitos_comunes_wrapper([2348, 1349, 7523, 3215])` devuelve `{3}`.\n\n**Paso 5. Coste.** Cada intersección trabaja con conjuntos de, como mucho, 10 dígitos (constante). Hay $\\Theta(n)$ llamadas y en las hojas se calculan los dígitos de cada número ($\\Theta(m)$ para $m$ dígitos): $T(n)=2T(n/2)+c$ más $n$ llamadas a `digitos`, es decir, $\\Theta(n\\cdot m)$ con $m$ el máximo número de dígitos.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 1.48,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#6.3",
    "n": "6.3",
    "title": "Ejercicio 6.3",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "El problema de la máxima sublista consiste en encontrar la sublista de elementos contiguos de una lista tal que la suma de sus elementos sea la mayor de todas. Por ejemplo, para la lista `[-1, -4, 5, 2, -3, 4, 2, -5]`, la sublista óptima es `[5, 2, -3, 4, 2]`, cuyos elementos suman 10. Dada una lista no vacía `a` de números, implementa una función de divide y vencerás que retorne la suma de los elementos de su máxima sublista.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es la longitud del tramo. Con un solo elemento, la mejor sublista es el propio elemento.\n\n**Paso 2. Descomposición.** Se divide por la mitad. La mejor sublista está **en la mitad izquierda**, **en la derecha** o **cruza la mitad**.\n\n**Paso 3. Sublista que cruza.** Contiene $a_m$ y $a_{m+1}$. Su suma máxima es (la mejor suma de una sublista que *termina* en $m$) más (la mejor que *empieza* en $m+1$): se calculan recorriendo hacia la izquierda y hacia la derecha desde la mitad.\n\n**Paso 4. Código.**\n```python\ndef max_sublista(a, inf, sup):\n    if inf == sup:\n        return a[inf]\n    m = (inf + sup) // 2\n    izq = max_sublista(a, inf, m)\n    der = max_sublista(a, m + 1, sup)\n    mejor_izq, s = float('-inf'), 0\n    for i in range(m, inf - 1, -1):\n        s += a[i]\n        mejor_izq = max(mejor_izq, s)\n    mejor_der, s = float('-inf'), 0\n    for i in range(m + 1, sup + 1):\n        s += a[i]\n        mejor_der = max(mejor_der, s)\n    return max(izq, der, mejor_izq + mejor_der)\n\ndef max_sublista_wrapper(a):\n    return max_sublista(a, 0, len(a) - 1)\n```\n\n**Paso 5. Comprobación y coste.** `[-1, -4, 5, 2, -3, 4, 2, -5]` da 10 (la sublista `[5, 2, -3, 4, 2]`). El cruce cuesta $\\Theta(n)$: $T(n)=2T(n/2)+n\\in\\Theta(n\\log n)$.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 1.48,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#6.4",
    "n": "6.4",
    "title": "Ejercicio 6.4",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Diseña un algoritmo recursivo rápido para multiplicar polinomios basada en la técnica de divide y vencerás, que sea análoga al enfoque empleado por el algoritmo de Karatsuba. Usa listas para codificar los polinomios. Por ejemplo, el polinomio de grado $n-1$: $P=u_{n-1}x^{n-1}+\\cdots+u_1x+u_0$ se indicará mediante una lista `a` de longitud $n$, donde el elemento `a[i]` contendrá el valor del coeficiente $u_i$. Por último, el método necesitará métodos para sumar y restar polinomios. Implementa estas funciones también.",
    "solution": "**Paso 1. Representación y operaciones.** El polinomio $u_{n-1}x^{n-1}+\\cdots+u_0$ es la lista `a` con `a[i]` $=u_i$. Hacen falta la suma y la resta de polinomios, que rellenan con ceros la lista más corta.\n```python\ndef suma_poli(a, b):\n    n = max(len(a), len(b))\n    a = a + [0] * (n - len(a))\n    b = b + [0] * (n - len(b))\n    return [a[i] + b[i] for i in range(n)]\n\ndef resta_poli(a, b):\n    n = max(len(a), len(b))\n    a = a + [0] * (n - len(a))\n    b = b + [0] * (n - len(b))\n    return [a[i] - b[i] for i in range(n)]\n```\n\n**Paso 2. Descomposición.** Con $m=\\lfloor n/2\\rfloor$, se parte cada polinomio en la parte baja $P_0$ (coeficientes $0..m-1$) y la alta $P_1$: $P=P_1x^m+P_0$ y $Q=Q_1x^m+Q_0$.\n\n**Paso 3. Regla de Karatsuba.**\n$$PQ=P_1Q_1\\,x^{2m}+\\big[(P_1+P_0)(Q_1+Q_0)-P_1Q_1-P_0Q_0\\big]x^m+P_0Q_0$$\nSólo hacen falta **tres** productos recursivos: $P_0Q_0$, $P_1Q_1$ y $(P_1+P_0)(Q_1+Q_0)$.\n\n**Paso 4. Código.** Se igualan las longitudes y se combinan los resultados desplazados.\n```python\ndef mult_poli(a, b):\n    if len(a) == 0 or len(b) == 0:\n        return []\n    n = max(len(a), len(b))\n    if n == 1:\n        return [a[0] * b[0]]\n    a = a + [0] * (n - len(a))\n    b = b + [0] * (n - len(b))\n    m = n // 2\n    a0, a1 = a[:m], a[m:]\n    b0, b1 = b[:m], b[m:]\n    z0 = mult_poli(a0, b0)\n    z2 = mult_poli(a1, b1)\n    z1 = resta_poli(resta_poli(mult_poli(suma_poli(a0, a1), suma_poli(b0, b1)), z0), z2)\n    res = [0] * (2 * n - 1)\n    for i, c in enumerate(z0):\n        res[i] += c\n    for i, c in enumerate(z1):\n        res[i + m] += c\n    for i, c in enumerate(z2):\n        res[i + 2 * m] += c\n    return res\n```\n\n**Paso 5. Comprobación y coste.** `mult_poli([1, 2], [3, 4])` devuelve `[3, 10, 8]`, es decir, $(1+2x)(3+4x)=3+10x+8x^2$. Con tres llamadas de tamaño $n/2$ y trabajo lineal para sumar y combinar: $T(n)=3T(n/2)+\\Theta(n)\\in\\Theta(n^{\\log_23})$ frente a $\\Theta(n^2)$ del producto escolar.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 1.58,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#6.5",
    "n": "6.5",
    "title": "Ejercicio 6.5",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función recursiva que reciba una matriz ($A$) de dimensiones $n\\times m$ y devuelva su traspuesta ($A^T$), de dimensiones $m\\times n$. Utiliza el paquete NumPy, y realiza una descomposición basada en divide y vencerás que considere que $A$ está formada por cuatro submatrices \"bloque\", resultado de dividir $m$ y $n$ por dos:\n$A=\\begin{bmatrix}A_{1,1}&A_{1,2}\\\\A_{2,1}&A_{2,2}\\end{bmatrix}.$\nEn ese caso, la traspuesta de $A$ se define como:\n$A^T=\\begin{bmatrix}A_{1,1}^T&A_{2,1}^T\\\\A_{1,2}^T&A_{2,2}^T\\end{bmatrix}.$",
    "solution": "**Paso 1. Casos base.** Si la matriz tiene una sola fila o una sola columna, la traspuesta es la misma lista de elementos con las dimensiones intercambiadas (`reshape`). Esto incluye el caso $1\\times1$.\n\n**Paso 2. Descomposición en bloques.** Si $n\\ge2$ y $m\\ge2$ se divide en cuatro bloques $A_{1,1},A_{1,2},A_{2,1},A_{2,2}$ (por $n//2$ filas y $m//2$ columnas).\n\n**Paso 3. Combinación.** Se traspone cada bloque y se colocan intercambiando los bloques de las posiciones $(1,2)$ y $(2,1)$:\n$$A^T=\\begin{bmatrix}A_{1,1}^T&A_{2,1}^T\\\\A_{1,2}^T&A_{2,2}^T\\end{bmatrix}$$\n\n**Paso 4. Código.**\n```python\nimport numpy as np\n\ndef traspuesta(A):\n    n, m = A.shape\n    if n == 1 or m == 1:\n        return A.reshape(m, n)\n    h, w = n // 2, m // 2\n    T11 = traspuesta(A[:h, :w])\n    T12 = traspuesta(A[:h, w:])\n    T21 = traspuesta(A[h:, :w])\n    T22 = traspuesta(A[h:, w:])\n    return np.vstack([np.hstack([T11, T21]), np.hstack([T12, T22])])\n```\n\n**Paso 5. Comprobación y coste.** Para cualquier matriz coincide con `A.T`. Con $N=nm$ elementos hay cuatro subproblemas de $N/4$ elementos y componer el resultado copia $N$ elementos: $T(N)=4T(N/4)+\\Theta(N)\\in\\Theta(N\\log N)$ (la traspuesta directa es $\\Theta(N)$).",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 1.59,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#6.6",
    "n": "6.6",
    "title": "Ejercicio 6.6",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa el algoritmo de multiplicación de matrices de Strassen. El código deberá contener una función auxiliar (wrapper) que permita multiplicar una matriz de dimensiones $p\\times q$ por otra de dimensiones $q\\times r$, rellenando las matrices de entrada con ceros.",
    "solution": "**Paso 1. Regla de Strassen.** Para matrices $2^k\\times2^k$ divididas en cuatro bloques:\n$$\\begin{aligned}M_1&=(A_{11}+A_{22})(B_{11}+B_{22})&M_5&=(A_{11}+A_{12})B_{22}\\\\M_2&=(A_{21}+A_{22})B_{11}&M_6&=(A_{21}-A_{11})(B_{11}+B_{12})\\\\M_3&=A_{11}(B_{12}-B_{22})&M_7&=(A_{12}-A_{22})(B_{21}+B_{22})\\\\M_4&=A_{22}(B_{21}-B_{11})\\end{aligned}$$\ny $C_{11}=M_1+M_4-M_5+M_7$, $C_{12}=M_3+M_5$, $C_{21}=M_2+M_4$, $C_{22}=M_1-M_2+M_3+M_6$.\n\n**Paso 2. Código de Strassen** (matrices cuadradas de lado potencia de 2; el caso base $1\\times1$ es un producto):\n```python\nimport numpy as np\n\ndef strassen(A, B):\n    n = A.shape[0]\n    if n == 1:\n        return A * B\n    h = n // 2\n    A11, A12, A21, A22 = A[:h, :h], A[:h, h:], A[h:, :h], A[h:, h:]\n    B11, B12, B21, B22 = B[:h, :h], B[:h, h:], B[h:, :h], B[h:, h:]\n    M1 = strassen(A11 + A22, B11 + B22)\n    M2 = strassen(A21 + A22, B11)\n    M3 = strassen(A11, B12 - B22)\n    M4 = strassen(A22, B21 - B11)\n    M5 = strassen(A11 + A12, B22)\n    M6 = strassen(A21 - A11, B11 + B12)\n    M7 = strassen(A12 - A22, B21 + B22)\n    C11 = M1 + M4 - M5 + M7\n    C12 = M3 + M5\n    C21 = M2 + M4\n    C22 = M1 - M2 + M3 + M6\n    return np.vstack([np.hstack([C11, C12]), np.hstack([C21, C22])])\n```\n\n**Paso 3. Wrapper con relleno de ceros.** Para $A$ de $p\\times q$ y $B$ de $q\\times r$ se toma el lado $s$, la menor potencia de 2 que es $\\ge\\max(p,q,r)$, se rellenan ambas con ceros hasta $s\\times s$ y se recorta el producto a $p\\times r$:\n```python\ndef strassen_wrapper(A, B):\n    p, q = A.shape\n    r = B.shape[1]\n    s = 1\n    while s < max(p, q, r):\n        s *= 2\n    Ap = np.zeros((s, s), dtype=A.dtype)\n    Bp = np.zeros((s, s), dtype=B.dtype)\n    Ap[:p, :q] = A\n    Bp[:q, :r] = B\n    return strassen(Ap, Bp)[:p, :r]\n```\n\n**Paso 4. Comprobación y coste.** El resultado coincide con `A.dot(B)` para dimensiones cualesquiera, por ejemplo $3\\times5$ por $5\\times2$. Siete llamadas de tamaño $n/2$ y trabajo $\\Theta(n^2)$ para las 18 sumas y restas: $T(n)=7T(n/2)+\\Theta(n^2)\\in\\Theta(n^{\\log_27})\\approx\\Theta(n^{2{,}81})$. El relleno puede duplicar el lado, lo que sólo multiplica el coste por una constante.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 1.3,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#6.7",
    "n": "6.7",
    "title": "Ejercicio 6.7",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función de divide y vencerás para multiplicar matrices basada en la siguiente descomposición de las matrices de entrada:\n$A\\cdot B=\\begin{bmatrix}A_1&A_2\\end{bmatrix}\\cdot\\begin{bmatrix}B_1\\\\B_2\\end{bmatrix}=A_1B_1+A_2B_2.$",
    "solution": "**Paso 1. Descomposición.** $A$ ($p\\times q$) se parte por columnas y $B$ ($q\\times r$) por filas, en el índice interno $q$:\n$$A\\cdot B=\\begin{bmatrix}A_1&A_2\\end{bmatrix}\\begin{bmatrix}B_1\\\\B_2\\end{bmatrix}=A_1B_1+A_2B_2$$\n\n**Paso 2. Caso base.** Si $q=1$, $A$ es una columna y $B$ una fila: el producto es una matriz $p\\times r$ (producto exterior), que `dot` calcula directamente.\n\n**Paso 3. Código.**\n```python\nimport numpy as np\n\ndef mult_interna(A, B):\n    q = A.shape[1]\n    if q == 1:\n        return A.dot(B)\n    h = q // 2\n    return mult_interna(A[:, :h], B[:h, :]) + mult_interna(A[:, h:], B[h:, :])\n```\n\n**Paso 4. Comprobación y coste.** Coincide con `A.dot(B)`. Cada nivel suma matrices de $p\\times r$ ($\\Theta(pr)$) y hay $q$ casos base de coste $pr$: $T(q)=2T(q/2)+\\Theta(pr)\\in\\Theta(pqr)$, igual que el producto ordinario.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 1.26,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#6.8",
    "n": "6.8",
    "title": "Ejercicio 6.8",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función de divide y vencerás para multiplicar matrices basada en la siguiente descomposición de las matrices de entrada:\n$A\\cdot B=\\begin{bmatrix}A_1\\\\A_2\\end{bmatrix}\\cdot\\begin{bmatrix}B_1&B_2\\end{bmatrix}=\\begin{bmatrix}A_1B_1&A_1B_2\\\\A_2B_1&A_2B_2\\end{bmatrix}.$",
    "solution": "**Paso 1. Descomposición.** Se parte $A$ por filas y $B$ por columnas:\n$$A\\cdot B=\\begin{bmatrix}A_1\\\\A_2\\end{bmatrix}\\begin{bmatrix}B_1&B_2\\end{bmatrix}=\\begin{bmatrix}A_1B_1&A_1B_2\\\\A_2B_1&A_2B_2\\end{bmatrix}$$\nSon cuatro subproblemas de $p/2\\times q\\times r/2$.\n\n**Paso 2. Implementación en dos etapas.** Primero se parten las filas de $A$ (da dos mitades de filas del resultado) y, cuando $A$ ya tiene una fila, se parten las columnas de $B$; es la misma descomposición en cuatro bloques. El caso base es una fila por una columna, que da un único elemento.\n```python\nimport numpy as np\n\ndef mult_bloques(A, B):\n    p, r = A.shape[0], B.shape[1]\n    if p > 1:\n        h = p // 2\n        return np.vstack([mult_bloques(A[:h], B), mult_bloques(A[h:], B)])\n    elif r > 1:\n        h = r // 2\n        return np.hstack([mult_bloques(A, B[:, :h]), mult_bloques(A, B[:, h:])])\n    else:\n        return A.dot(B)\n```\n\n**Paso 3. Comprobación y coste.** Coincide con `A.dot(B)`. Hay $pr$ casos base de coste $q$ (una fila por una columna): $\\Theta(pqr)$, el mismo orden que el producto ordinario.",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 1.31,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#7.1",
    "n": "7.1",
    "title": "Ejercicio 7.1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Existen varias formas de obtener todos los subconjuntos de un conjunto inicial. Una forma sencilla consiste en generar un árbol binario, donde en cada nodo se decida si se incorpora un elemento del conjunto inicial a un subconjunto. El objetivo en este ejercicio es implementar un procedimiento alternativo, cuyo árbol de recursión sea como el de la siguiente figura:\n```\n{}\n├─0─ {a}\n│     ├─1─ {a,b}\n│     │      └─2─ {a,b,c}\n│     └─2─ {a,c}\n├─1─ {b}\n│     └─2─ {b,c}\n└─2─ {c}\n```\nComo puede apreciarse, se genera un subconjunto en cada nodo del árbol. Por tanto, el árbol tiene exactamente $2^n$ nodos, donde $n$ es la cardinalidad del conjunto inicial. Asumiendo que el conjunto inicial viene especificado en una lista de longitud $n$, observa que las etiquetas del árbol hacen referencia a los índices de la lista (en la figura la lista de entrada sería `[a, b, c]`). Además, la solución parcial será una lista que contenga los índices de los elementos que forman un subconjunto. En el ejemplo, la lista `[0, 2]` representará al conjunto $\\{a,c\\}$. Por tanto, las soluciones parciales también serán soluciones completas. Finalmente, el método desarrollado deberá imprimir los elementos de cada subconjunto.",
    "solution": "**Paso 1. Qué hay que construir.** Un árbol donde cada nodo es un subconjunto: la raíz es $\\{\\}$ y los hijos de un nodo se obtienen añadiendo un elemento **de índice mayor** que el último incluido. Así cada subconjunto aparece una sola vez y hay $2^n$ nodos.\n\n**Paso 2. Solución parcial y parámetros.** `sol` guarda los **índices** incluidos (`[0, 2]` es $\\{a,c\\}$). Se necesitan `i`, el número de elementos de `sol`, y `j`, el índice del último incluido (en la raíz, $-1$). Los candidatos son $j+1,\\dots,n-1$.\n\n**Paso 3. Esquema.**\n- Cada nodo **es** una solución: se imprime en cada llamada, no sólo en las hojas.\n- Para cada candidato `k`: se incluye en `sol[i]` y se llama con `i + 1` y `j = k`.\n- No hace falta deshacer nada: la siguiente iteración sobrescribe `sol[i]`.\n\n**Paso 4. Código.**\n```python\ndef imprime_subconjunto(sol, i, elementos):\n    print('{' + ','.join(str(elementos[sol[k]]) for k in range(i)) + '}')\n\ndef subconjuntos(i, j, sol, elementos):\n    imprime_subconjunto(sol, i, elementos)\n    for k in range(j + 1, len(elementos)):\n        sol[i] = k\n        subconjuntos(i + 1, k, sol, elementos)\n\ndef subconjuntos_wrapper(elementos):\n    subconjuntos(0, -1, [None] * len(elementos), elementos)\n```\n\n**Paso 5. Comprobación y coste.** `subconjuntos_wrapper(['a', 'b', 'c'])` imprime `{}`, `{a}`, `{a,b}`, `{a,b,c}`, `{a,c}`, `{b}`, `{b,c}`, `{c}`: $2^3=8$ subconjuntos. Hay $2^n$ llamadas y cada impresión cuesta hasta $O(n)$: $O(n\\,2^n)$.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 2.0,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#7.2",
    "n": "7.2",
    "title": "Ejercicio 7.2",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa una función de backtracking que cuente el número de soluciones válidas de un Sudoku que, posiblemente, no esté bien planteado (es decir, que pueda tener 0, 1, o más soluciones).",
    "solution": "**Paso 1. Solución parcial.** El propio tablero, con 0 en las casillas vacías. Se rellenan las casillas vacías en orden (fila a fila), de la 0 a la 80.\n\n**Paso 2. Candidatos y restricciones.** Para una casilla vacía los candidatos son los dígitos 1 a 9. Uno es válido si no está ya en su **fila**, su **columna** o su **caja** $3\\times3$. Se mantienen tres matrices booleanas (`filas[f][d]`, `columnas[c][d]`, `cajas[b][d]`) para comprobarlo en $O(1)$.\n\n**Paso 3. Caso base y cuenta.** Al pasar la casilla 80, el tablero está completo y válido: cuenta como **una** solución. En una casilla vacía se suman las soluciones de cada candidato válido; en una casilla fija simplemente se avanza. Se deshace la colocación al volver.\n\n**Paso 4. Código.** También se detecta un tablero inicial con dígitos repetidos (0 soluciones):\n```python\ndef cuenta_sudoku(T):\n    filas = [[False] * 10 for _ in range(9)]\n    columnas = [[False] * 10 for _ in range(9)]\n    cajas = [[False] * 10 for _ in range(9)]\n    for f in range(9):\n        for c in range(9):\n            d = T[f][c]\n            if d != 0:\n                b = 3 * (f // 3) + c // 3\n                if filas[f][d] or columnas[c][d] or cajas[b][d]:\n                    return 0\n                filas[f][d] = columnas[c][d] = cajas[b][d] = True\n    return _cuenta(T, 0, filas, columnas, cajas)\n\ndef _cuenta(T, i, filas, columnas, cajas):\n    if i == 81:\n        return 1\n    f, c = divmod(i, 9)\n    if T[f][c] != 0:\n        return _cuenta(T, i + 1, filas, columnas, cajas)\n    b = 3 * (f // 3) + c // 3\n    n = 0\n    for d in range(1, 10):\n        if not filas[f][d] and not columnas[c][d] and not cajas[b][d]:\n            T[f][c] = d\n            filas[f][d] = columnas[c][d] = cajas[b][d] = True\n            n += _cuenta(T, i + 1, filas, columnas, cajas)\n            filas[f][d] = columnas[c][d] = cajas[b][d] = False\n            T[f][c] = 0\n    return n\n```\n\n**Paso 5. Comprobación y coste.** Un sudoku bien planteado da 1; uno con dos números iguales en una fila da 0; uno con pocas pistas puede dar muchas. En el peor caso el árbol tiene hasta $9^{k}$ nodos con $k$ casillas vacías, pero la poda por las tres restricciones lo reduce muchísimo.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 1.21,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#7.3",
    "n": "7.3",
    "title": "Ejercicio 7.3",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa un algoritmo de backtracking que imprima todas las soluciones del problema de las $n$ torres de ajedrez. Se trata de un problema análogo al de las $n$ reinas, pero usa torres en lugar de reinas. Como las torres solo se pueden mover de manera vertical u horizontal, dos o más torres no pueden estar en la misma columna ni fila. Sin embargo, puede haber torres en la misma diagonal. La siguiente figura muestra una solución al problema para 4 torres:\n```\nT . . .\n. T . .\n. . . T\n. . T .\n```",
    "solution": "**Paso 1. Reducción al esquema de permutaciones.** Como no puede haber dos torres en la misma fila ni columna, una solución coloca una torre por fila y sus columnas son todas distintas: es una **permutación** de $0,\\dots,n-1$. `sol[i]` es la columna de la torre de la fila `i`. No hay restricción de diagonales.\n\n**Paso 2. Esquema.** Una lista booleana `libres` indica qué columnas están ocupadas (comprobación en $O(1)$); al volver de la recursión se vuelve a marcar la columna como libre.\n\n**Paso 3. Código.**\n```python\ndef torres(i, libres, sol):\n    n = len(sol)\n    if i == n:\n        print(sol)\n    else:\n        for k in range(n):\n            if libres[k]:\n                sol[i] = k\n                libres[k] = False\n                torres(i + 1, libres, sol)\n                libres[k] = True\n\ndef torres_wrapper(n):\n    torres(0, [True] * n, [None] * n)\n```\n\n**Paso 4. Comprobación y coste.** Para $n=4$ imprime las 24 soluciones, una de ellas `[0, 1, 3, 2]` (la de la figura). Hay $n!$ soluciones y cada una se imprime en $O(n)$: $\\Theta(n\\cdot n!)$.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 1.55,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#7.4",
    "n": "7.4",
    "title": "Ejercicio 7.4",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Un cuadrado mágico es una rejilla (o matriz) de $n\\times n$, que contiene los primeros $n^2$ enteros positivos tales que la suma de los elementos en cada fila, columna, y diagonales sea la misma. Esa cantidad se denomina \"constante mágica\" y es $n(n^2+1)/2$ para un $n$ general. La siguiente figura muestra un cuadrado mágico de dimensiones $3\\times 3$, donde la constante mágica es 15:\n```\n8 1 6 | 15\n3 5 7 | 15\n4 9 2 | 15\n15 15 15 (columnas), 15 15 (diagonales)\n```\nDiseña un algoritmo basado en backtracking para imprimir todos los posibles cuadrados mágicos de dimensiones $3\\times 3$. Nota: no es necesario implementar un método para un $n$ general. ¿Qué problema podríamos tener al intentar calcular cuadrados mágicos más grandes?",
    "solution": "**Paso 1. Representación.** Se colocan los dígitos 1 a 9 en las 9 casillas (en orden de fila), sin repetir: es una **permutación**. Constante mágica: $3(3^2+1)/2=15$.\n\n**Paso 2. Poda.** No hay que esperar a la hoja: en cuanto se completa una línea se comprueba que suma 15:\n- al llenar la casilla 2, 5 u 8 (final de fila) se comprueba la fila;\n- al llenar las casillas 6, 7 u 8 (fila de abajo) se comprueba la columna correspondiente;\n- la diagonal secundaria (casillas 2, 4, 6) se comprueba al llenar la 6 y la principal (0, 4, 8) al llenar la 8.\n\n**Paso 3. Código.**\n```python\ndef cuadrados_magicos(i, libres, sol):\n    if i == 9:\n        print(sol[0:3], sol[3:6], sol[6:9])\n        return\n    for d in range(1, 10):\n        if libres[d]:\n            sol[i] = d\n            if es_valido(i, sol):\n                libres[d] = False\n                cuadrados_magicos(i + 1, libres, sol)\n                libres[d] = True\n\ndef es_valido(i, sol):\n    f, c = divmod(i, 3)\n    if c == 2 and sol[3 * f] + sol[3 * f + 1] + sol[3 * f + 2] != 15:\n        return False\n    if f == 2 and sol[c] + sol[c + 3] + sol[c + 6] != 15:\n        return False\n    if i == 6 and sol[2] + sol[4] + sol[6] != 15:\n        return False\n    if i == 8 and sol[0] + sol[4] + sol[8] != 15:\n        return False\n    return True\n\ndef cuadrados_magicos_wrapper():\n    cuadrados_magicos(0, [True] * 10, [None] * 9)\n```\n\n**Paso 4. Resultado.** Hay **8** cuadrados mágicos $3\\times3$: el de la figura (`8 1 6 / 3 5 7 / 4 9 2`) y sus rotaciones y reflexiones.\n\n**Paso 5. Problema con tamaños mayores.** El espacio de búsqueda crece como $(n^2)!$: unos $2\\cdot10^{13}$ permutaciones para $n=4$ y $1{,}5\\cdot10^{25}$ para $n=5$. La poda por líneas completas ayuda, pero el número de nodos sigue siendo enorme, y además el número de cuadrados mágicos crece (880 de $4\\times4$ salvo simetrías). Hacen falta podas más fuertes (por ejemplo, calcular directamente la última casilla de cada línea como $15-\\ldots$) o métodos constructivos.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 1.82,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#7.5",
    "n": "7.5",
    "title": "Ejercicio 7.5",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Un caballo en ajedrez puede saltar desde una casilla a otra en patrones de tipo L, como se muestra en la siguiente figura (izquierda).\n```\nIzquierda (tablero 5x5, fila,col desde 0): caballo en (2,2); posibles saltos a\n(0,1) (0,3) (1,0) (1,4) (3,0) (3,4) (4,1) (4,3)\nDerecha (tablero 5x5): cuatro saltos consecutivos desde la casilla superior-izquierda:\n(0,0) -> (2,1) -> (4,0) -> (3,2) -> (2,0)\n```\nEn la derecha se muestran cuatro saltos consecutivos de una caballo que empieza en la celda superior-izquierda. El problema de la \"ruta del caballo\" consiste en determinar una secuencia de saltos de un caballo, en un tablero de dimensiones $n\\times n$, que empiece en una casilla determinada, y consiga visitar el resto de casillas, sin pasar dos o más veces por la misma. Implementa un algoritmo de backtracking que encuentre una ruta del caballo, y prueba el código para $n=5$ y $n=6$. Además de la $n$ inicial, el método recibirá las coordenadas de la casilla inicial en el tablero. Por último, no es necesario encontrar una ruta \"cerrada\", tal que se pueda saltar desde la casilla final a la inicial con un movimiento legal del caballo.",
    "solution": "**Paso 1. Solución parcial.** El tablero $n\\times n$ con el número de salto en cada casilla (0 si no se ha visitado). La casilla inicial es el salto 1.\n\n**Paso 2. Candidatos.** Los 8 saltos del caballo, dados por incrementos a la fila y a la columna. Un salto es válido si cae dentro del tablero y en una casilla no visitada.\n\n**Paso 3. Caso base y búsqueda de una sola solución.** Cuando se ha colocado el salto $n^2$ se ha encontrado una ruta y se devuelve `True`, que se propaga hacia arriba para detener la búsqueda. Si ningún salto lleva a una solución, se deshace la casilla y se devuelve `False`.\n\n**Paso 4. Código.**\n```python\nSALTOS = [(1, -2), (2, -1), (2, 1), (1, 2), (-1, 2), (-2, 1), (-2, -1), (-1, -2)]\n\ndef ruta_caballo(n, f0, c0):\n    T = [[0] * n for _ in range(n)]\n    T[f0][c0] = 1\n    return T if _salta(T, n, f0, c0, 2) else None\n\ndef _salta(T, n, f, c, paso):\n    if paso == n * n + 1:\n        return True\n    for df, dc in SALTOS:\n        f2, c2 = f + df, c + dc\n        if 0 <= f2 < n and 0 <= c2 < n and T[f2][c2] == 0:\n            T[f2][c2] = paso\n            if _salta(T, n, f2, c2, paso + 1):\n                return True\n            T[f2][c2] = 0\n    return False\n```\n\n**Paso 5. Comprobación y coste.** `ruta_caballo(5, 0, 0)` y `ruta_caballo(6, 0, 0)` devuelven al instante un tablero con los números 1 a $n^2$, y cada salto es un movimiento de caballo. Pero el orden en que se prueban los saltos importa mucho: con la misma función, `ruta_caballo(6, 1, 2)` tardó más de un minuto en la prueba. En un tablero de lado impar sólo hay ruta si se empieza en una casilla del color de las esquinas; desde las demás el backtracking tiene que agotar todas las posibilidades. En el peor caso el coste es $O(8^{n^2})$.\n\n**Paso 6. Mejora: probar antes los saltos con menos salidas (regla de Warnsdorff).** Se ordenan los candidatos por el número de saltos válidos que tendrían desde la casilla de destino y se prueba primero la que tiene menos. Sigue siendo backtracking (si falla se prueba el siguiente), pero encuentra la ruta casi sin retroceder:\n```python\ndef ruta_caballo_w(n, f0, c0):\n    T = [[0] * n for _ in range(n)]\n    T[f0][c0] = 1\n    return T if _salta_w(T, n, f0, c0, 2) else None\n\ndef _libres(T, n, f, c):\n    return [(f + df, c + dc) for df, dc in SALTOS\n            if 0 <= f + df < n and 0 <= c + dc < n and T[f + df][c + dc] == 0]\n\ndef _salta_w(T, n, f, c, paso):\n    if paso == n * n + 1:\n        return True\n    cand = _libres(T, n, f, c)\n    cand.sort(key=lambda p: len(_libres(T, n, p[0], p[1])))\n    for f2, c2 in cand:\n        T[f2][c2] = paso\n        if _salta_w(T, n, f2, c2, paso + 1):\n            return True\n        T[f2][c2] = 0\n    return False\n```",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 2.0,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#7.6",
    "n": "7.6",
    "title": "Ejercicio 7.6",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "El problema del viajante de comercio (\"traveling salesman problem\" o simplemente TSP), es un problema clásico de optimización discreta. Dadas $n$ ciudades, el objetivo es hallar el camino más corto que visite cada ciudad una sola vez y retorne a la ciudad inicial. La siguiente figura ilustra un ejemplo del camino más corto para 10 ciudades:\n[figura: 10 ciudades como puntos en el plano unidos por un ciclo cerrado (el camino más corto)]\nImplementa un algoritmo de backtracking que resuelva el problema. Asume que las posiciones de las ciudades se especifican en un fichero de texto, donde cada línea contiene las coordenadas $x$ e $y$ de una ciudad en un mapa bidimensional. El fichero se puede leer empleando el método `loadtxt` del paquete NumPy. La ciudad inicial será la de la primera línea del fichero. Además, considera distancias euclídeas entre las ciudades (el viajante iría de una ciudad a otra en línea recta). Estas distancias se pueden calcular con el método `pdist` del paquete SciPy. En concreto, el método recursivo de backtracking deberá recibir una matriz de distancias entre las ciudades (las coordenadas $x$ e $y$ son irrelevantes si se dispone de las distancias). Finalmente, prueba el código con ejemplos donde $n\\le 10$.",
    "solution": "**Paso 1. Solución parcial.** Una permutación de las ciudades que empieza siempre en la 0: `sol[0] = 0` y `sol[1..n-1]` son las demás ciudades en orden de visita. Una lista `libres` marca las ya visitadas.\n\n**Paso 2. Longitud parcial y poda.** Se pasa la longitud acumulada del camino. Si ya es **mayor o igual** que la mejor longitud encontrada, esa rama no puede mejorarla: se poda. Al completar la permutación se suma la vuelta a la ciudad 0 y se actualiza la mejor solución.\n\n**Paso 3. Código.**\n```python\ndef viajante(D):\n    n = len(D)\n    sol = [0] * n\n    libres = [True] * n\n    libres[0] = False\n    mejor = [None, float('inf')]       # mejor camino y su longitud\n    _viajante(1, 0.0, D, libres, sol, mejor)\n    return mejor\n\ndef _viajante(i, longitud, D, libres, sol, mejor):\n    n = len(D)\n    if i == n:\n        total = longitud + D[sol[n - 1]][0]\n        if total < mejor[1]:\n            mejor[0], mejor[1] = sol[:], total\n    else:\n        for k in range(1, n):\n            if libres[k]:\n                nueva = longitud + D[sol[i - 1]][k]\n                if nueva < mejor[1]:\n                    sol[i] = k\n                    libres[k] = False\n                    _viajante(i + 1, nueva, D, libres, sol, mejor)\n                    libres[k] = True\n```\n\n**Paso 4. Lectura de las ciudades y matriz de distancias.** Con NumPy y SciPy:\n```python\nimport numpy as np\nfrom scipy.spatial.distance import pdist, squareform\n\n# puntos = np.loadtxt('ciudades.txt')       # una ciudad por línea: x y\npuntos = np.array([[0, 0], [0, 3], [4, 3], [4, 0], [2, 1]])\nD = squareform(pdist(puntos))               # distancias euclídeas\ncamino, longitud = viajante(D)\nprint(camino, round(longitud, 3))\n```\n\n**Paso 5. Comprobación y coste.** El resultado coincide con el de probar todas las permutaciones. Hay $(n-1)!$ caminos; la poda reduce mucho el trabajo medio, pero el peor caso sigue siendo $O((n-1)!)$, por eso se prueba con $n\\le10$.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 2.0,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#7.7",
    "n": "7.7",
    "title": "Ejercicio 7.7",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "El siguiente problema, denominado \"tug of war\" en inglés, busca dividir un conjunto de elementos en dos lo más \"parecidos\" como sea posible. Formalmente, dada una lista no vacía de $n$ números (que corresponderían a valoraciones de los elementos del conjunto original), donde $n$ es par, el objetivo consiste en dividirla en dos de $n/2$ elementos, de manera que se minimice la diferencia absoluta entre la suma de los elementos de cada sublista. Por ejemplo, la forma óptima de dividir la lista `[3, 5, 9, 14, 20, 24]` consiste en considerar las sublistas `[5, 9, 24]`, y `[3, 14, 20]`. La suma de sus elementos es 38 y 37, respectivamente, y la diferencia absoluta entre esas sumas es 1.\nImplementa un algoritmo basado en backtracking que genere las sublistas que resuelven el problema. La solución puede ser una lista binaria de longitud $n$ con $n/2$ ceros y $n/2$ unos. Los ceros estarían asociados a una sublista y los unos a la otra. En el ejemplo anterior la solución sería la lista `[0, 1, 1, 0, 0, 1]` (`[1, 0, 0, 1, 1, 0]` sería equivalente).\nAdemás, implementa un algoritmo más eficiente donde la solución sea una lista de longitud $n/2$ que contenga los índices (en orden creciente) de la lista original en los que se encuentran los elementos de una de las sublistas. Por ejemplo, la sublista $\\{5,9,24\\}$ se representaría mediante la lista de índices `[1, 2, 5]`. La siguiente figura ilustra las dos formas de representar la solución:\n```\n(a) lista:    3 5 9 14 20 24      (b) lista:    3 5 9 14 20 24\n    solución: 0 1 1 0  0  1           solución: 1 2 5\n    (cada solución[i] se asocia con lista[i]; los 1 marcan 5, 9, 24)   (solución[0]->lista[1], solución[1]->lista[2], solución[2]->lista[5])\n```",
    "solution": "**Paso 1. Versión con lista binaria.** `sol[i]` vale 0 o 1 (a qué sublista pertenece el elemento `i`). Se llevan los contadores de ceros y de unos y las dos sumas parciales. Se **poda** si una sublista ya tiene $n/2$ elementos y se intenta añadir otro a ella. Al completar la solución, la diferencia es $|s_1-s_0|$.\n```python\ndef tug_binario(a):\n    n = len(a)\n    mejor = {'dif': float('inf'), 'sol': None}\n    sol = [0] * n\n    _tb(0, [0, 0], [0, 0], a, sol, mejor)\n    return mejor['sol'], mejor['dif']\n\ndef _tb(i, cuenta, suma, a, sol, mejor):\n    n = len(a)\n    if i == n:\n        dif = abs(suma[1] - suma[0])\n        if dif < mejor['dif']:\n            mejor['dif'], mejor['sol'] = dif, sol[:]\n    else:\n        for k in (0, 1):\n            if cuenta[k] < n // 2:\n                sol[i] = k\n                cuenta[k] += 1\n                suma[k] += a[i]\n                _tb(i + 1, cuenta, suma, a, sol, mejor)\n                cuenta[k] -= 1\n                suma[k] -= a[i]\n```\n\n**Paso 2. Versión más eficiente: lista de índices.** La solución son los $n/2$ índices (crecientes) de una de las sublistas: es el esquema de subconjuntos de tamaño fijo. Se prueba, para cada posición `i`, `k` desde `j + 1` hasta `n - n/2 + i` (para que sigan quedando elementos suficientes). La otra sublista tiene suma `total - suma`, así que la diferencia es $|\\text{total}-2\\cdot\\text{suma}|$.\n```python\ndef tug_indices(a):\n    n = len(a)\n    mejor = {'dif': float('inf'), 'sol': None}\n    _ti(0, -1, 0, a, sum(a), [0] * (n // 2), mejor)\n    return mejor['sol'], mejor['dif']\n\ndef _ti(i, j, suma, a, total, sol, mejor):\n    m = len(sol)\n    if i == m:\n        dif = abs(total - 2 * suma)\n        if dif < mejor['dif']:\n            mejor['dif'], mejor['sol'] = dif, sol[:]\n    else:\n        for k in range(j + 1, len(a) - m + i + 1):\n            sol[i] = k\n            _ti(i + 1, k, suma + a[k], a, total, sol, mejor)\n```\n\n**Paso 3. Comprobación y coste.** Para `[3, 5, 9, 14, 20, 24]` la diferencia mínima es 1 (por ejemplo, la sublista de índices `[1, 2, 5]`, es decir, $\\{5,9,24\\}$, que suma 38 frente a 37). La segunda versión explora $\\binom{n}{n/2}$ hojas frente a $2^n$ casos (y se puede fijar el primer elemento en una sublista para no contar cada reparto dos veces).",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 2.0,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#7.8",
    "n": "7.8",
    "title": "Ejercicio 7.8",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "El problema de la suma de subconjuntos consiste en determinar los subconjuntos de uno inicial compuesto de números positivos, y especificado a través de una lista `L`, tal que la suma de sus elementos sea igual a una cantidad $s$. Implementa una función recursiva alternativa basada en backtracking que calcule el subconjunto válido (sus elementos suman $s$) que además tenga la menor cardinalidad. El método almacenará el conjunto óptimo a través de una lista, y retornará la cardinalidad óptima (menor). Por ejemplo, para el conjunto $\\{1,2,3,5,6,7,9\\}$ y $s=13$, el método almacenará el conjunto $\\{6,7\\}$, y devolverá el valor 2. Además, la solución no tiene por qué ser única, pero la cardinalidad óptima sí lo es. Por ejemplo, para $\\{2,6,3,5\\}$ y $s=8$, tanto $\\{2,6\\}$ como $\\{3,5\\}$ son subconjuntos óptimos. Codifica la solución parcial (y óptima) como una lista de dígitos binarios. Además, poda el árbol de recursión considerando la validez de una solución y la mejor cardinalidad encontrada hasta el momento. Por último, codifica una función auxiliar wrapper que calcule el subconjunto óptimo y lo imprima en caso de existir.",
    "solution": "**Paso 1. Esquema.** Esquema binario con solución parcial `sol` de 0 y 1 (1 = el elemento está en el subconjunto). Se llevan la suma parcial y la cardinalidad parcial.\n\n**Paso 2. Caso base y poda.** Como los números son **positivos**, en cuanto la suma parcial iguala a $s$ se tiene una solución válida (añadir más elementos la pasaría) y no hay que seguir. Se compara su cardinalidad con la mejor y, si es menor, se guarda. Se poda cuando:\n- la suma parcial supera $s$ (la solución deja de ser válida), o\n- la cardinalidad parcial ya es mayor o igual que la mejor encontrada (no puede mejorarla).\n\n**Paso 3. Código.** `mejor` es la cardinalidad óptima encontrada (infinito si aún no hay solución):\n```python\ndef suma_min_card(i, suma, card, L, s, sol, sol_opt, mejor):\n    if suma == s:\n        if card < mejor:\n            sol_opt[:] = sol[:i] + [0] * (len(L) - i)\n            mejor = card\n    elif i < len(L):\n        for k in (0, 1):\n            nueva_suma = suma + k * L[i]\n            nueva_card = card + k\n            if nueva_suma <= s and nueva_card < mejor:\n                sol[i] = k\n                mejor = suma_min_card(i + 1, nueva_suma, nueva_card, L, s, sol, sol_opt, mejor)\n    return mejor\n\ndef suma_min_card_wrapper(L, s):\n    sol = [0] * len(L)\n    sol_opt = [0] * len(L)\n    mejor = suma_min_card(0, 0, 0, L, s, sol, sol_opt, float('inf'))\n    if mejor == float('inf'):\n        print('No hay ningún subconjunto que sume', s)\n    else:\n        print([L[i] for i in range(len(L)) if sol_opt[i] == 1], 'cardinalidad', mejor)\n    return mejor\n```\n\n**Paso 4. Comprobación y coste.** Para $\\{1,2,3,5,6,7,9\\}$ y $s=13$ imprime $[6,7]$ con cardinalidad 2; para $\\{2,6,3,5\\}$ y $s=8$, cardinalidad 2 (con $\\{2,6\\}$ o $\\{3,5\\}$). En el peor caso el árbol binario tiene $2^n$ hojas: $O(2^n)$, aunque las dos podas lo recortan en la práctica.",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 2.0,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#8.1",
    "n": "8.1",
    "title": "Ejercicio 8.1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Sea un conjunto $A$ de $n$ actividades $\\{a_0,a_1,\\ldots,a_{n-1}\\}$ que necesitan utilizar un recurso común, por ejemplo, una sala de reuniones. El recurso solo puede ser usado por una actividad en cada momento. Cada actividad tiene un instante de comienzo $c_i$ y un instante de finalización $f_i$, donde $0\\le c_i<f_i<\\infty$.\nSi se selecciona la actividad $a_i$, se desarrolla en el intervalo semiabierto de tiempo $[c_i,f_i)$. Las actividades $a_i$ y $a_j$ son compatibles si sus intervalos $[c_i,f_i)$ y $[c_j,f_j)$ no se solapan, es decir, si $c_i\\ge f_j$ o $c_j\\ge f_i$.\nEl objetivo de este ejercicio es elaborar e implementar una estrategia voraz para seleccionar un subconjunto de actividades compatibles cuya cardinalidad sea máxima.\nPor ejemplo, sea el siguiente conjunto de actividades:\n\n| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |\n|---|---|---|---|---|---|---|---|---|---|---|----|\n| c_i | 1 | 2 | 0 | 5 | 8 | 5 | 6 | 8 | 3 | 3 | 12 |\n| f_i | 4 | 13 | 6 | 7 | 12 | 9 | 10 | 11 | 8 | 5 | 14 |\n\n[figura: diagrama de Gantt, eje x de 0 a 14, una barra horizontal $[c_i,f_i)$ por actividad $a_0..a_{10}$ según la tabla; resaltadas en naranja $a_0,a_3,a_7,a_{10}$]\nUn subconjunto $S$ de actividades compatibles es $\\{a_2,a_4,a_{10}\\}$. Sin embargo, no es un subconjunto de cardinalidad máxima, como lo son $\\{a_0,a_3,a_7,a_{10}\\}$ (en naranja en la figura) y $\\{a_9,a_3,a_4,a_{10}\\}$ (ya que tienen 4 elementos).",
    "solution": "**Paso 1. Elementos del algoritmo voraz.** Candidatos: las actividades. Factibilidad: no solaparse con las ya elegidas. Objetivo: maximizar el **número** de actividades. Falta la función de selección.\n\n**Paso 2. Estrategias posibles.** Se pueden ordenar los candidatos por: (a) instante de comienzo, (b) duración, (c) instante de **finalización**. Sólo la (c) es óptima. Un contraejemplo para (a) con la tabla del enunciado: por comienzo más temprano se eligen $a_2$ $[0,6)$, luego $a_6$ $[6,10)$ y $a_{10}$ $[12,14)$: sólo 3 actividades, y hay soluciones de 4.\n\n**Paso 3. Estrategia óptima.** Elegir siempre, entre las actividades compatibles con lo ya elegido, la que **termina antes**. Idea de la demostración (intercambio): sea $a^*$ la actividad que termina antes. En cualquier solución óptima se puede cambiar su primera actividad por $a^*$: termina no más tarde, así que sigue siendo compatible con el resto y el número de actividades no cambia. Por tanto hay una solución óptima que contiene a $a^*$, y el resto es el mismo problema con las actividades que empiezan después de $f^*$.\n\n**Paso 4. Código.** Se ordenan por instante de finalización y se recorren una vez:\n```python\ndef seleccion_actividades(c, f):\n    orden = sorted(range(len(c)), key=lambda i: f[i])\n    seleccion = []\n    fin = float('-inf')\n    for i in orden:\n        if c[i] >= fin:\n            seleccion.append(i)\n            fin = f[i]\n    return seleccion\n```\n\n**Paso 5. Comprobación y coste.** Con $c=(1,2,0,5,8,5,6,8,3,3,12)$ y $f=(4,13,6,7,12,9,10,11,8,5,14)$ elige $a_0,a_3,a_7,a_{10}$ (4 actividades, como la solución del enunciado). Coste: $\\Theta(n\\log n)$ por la ordenación.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 2.0,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#8.2",
    "n": "8.2",
    "title": "Ejercicio 8.2",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Propón varias estrategias voraces para el problema de la mochila-01. Impleméntalas y realiza una simulación con 1000 instancias del problema, donde el número de objetos $n$ varíe entre 10 y 100, y los pesos y valores estén en el intervalo $(0,10)$. Tanto $n$ como los pesos y valores se escogerán aleatoriamente de distribuciones uniformes. ¿Hay alguna estrategia óptima o que ofrezca mejores resultados en general?",
    "solution": "**Paso 1. Estrategias voraces para la mochila 0-1.** Se ordenan los objetos por un criterio y se van metiendo mientras quepan:\n- (a) mayor valor $v_i$ primero;\n- (b) menor peso $p_i$ primero;\n- (c) mayor cociente $v_i/p_i$ primero.\n\n**Paso 2. Simulación.** Para cada instancia: $n$ uniforme entre 10 y 100, pesos y valores uniformes en $(0,10)$ y, como el enunciado no la fija, capacidad $C=\\frac12\\sum p_i$. Se comparan los valores obtenidos con la cota superior que da la mochila con fracciones (que se resuelve con (c)).\n```python\nimport random\n\ndef voraz(p, v, C, clave):\n    valor = peso = 0.0\n    for i in sorted(range(len(p)), key=clave, reverse=True):\n        if peso + p[i] <= C:\n            peso += p[i]\n            valor += v[i]\n    return valor\n\ndef cota_fraccion(p, v, C):\n    valor, resto = 0.0, C\n    for i in sorted(range(len(p)), key=lambda i: v[i] / p[i], reverse=True):\n        x = min(1, resto / p[i])\n        valor += x * v[i]\n        resto -= x * p[i]\n        if resto <= 0:\n            break\n    return valor\n\ndef simula(instancias=1000, semilla=0):\n    random.seed(semilla)\n    estrategias = {\n        'mayor valor': lambda p, v: (lambda i: v[i]),\n        'menor peso': lambda p, v: (lambda i: -p[i]),\n        'valor/peso': lambda p, v: (lambda i: v[i] / p[i]),\n    }\n    suma = {k: 0.0 for k in estrategias}\n    mejor = {k: 0 for k in estrategias}\n    for _ in range(instancias):\n        n = random.randint(10, 100)\n        p = [random.uniform(0.001, 10) for _ in range(n)]\n        v = [random.uniform(0.001, 10) for _ in range(n)]\n        C = sum(p) / 2\n        cota = cota_fraccion(p, v, C)\n        res = {k: voraz(p, v, C, f(p, v)) for k, f in estrategias.items()}\n        top = max(res.values())\n        for k in res:\n            suma[k] += res[k] / cota\n            mejor[k] += res[k] >= top - 1e-12\n    return {k: (suma[k] / instancias, mejor[k]) for k in estrategias}\n```\n\n**Paso 3. Resultado.** Con 1000 instancias y semilla 0 (`simula(1000, 0)`), la fracción media de la cota superior que alcanza cada estrategia y el número de instancias en las que fue la mejor (o empató) salen así:\n\n| Estrategia | Fracción media de la cota | Mejor o empatada |\n|---|---|---|\n| mayor $v_i/p_i$ | 0,991 | 953 de 1000 |\n| mayor valor | 0,946 | 89 |\n| menor peso | 0,857 | 6 |\n\n**Paso 4. Conclusión.** Ninguna estrategia es **óptima** (la mochila 0-1 es NP-completa y siempre hay instancias donde fallan); los números dependen de la capacidad elegida y de la semilla. En cambio la de mayor $v_i/p_i$ es, con mucha diferencia, la mejor en media: es la que es óptima para la mochila con fracciones, y al no poder partir sólo pierde lo que queda sin llenar. Con capacidades pequeñas respecto a los objetos la diferencia entre estrategias cambia, así que conviene repetir el experimento con otras capacidades.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 1.46,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#8.3",
    "n": "8.3",
    "title": "Ejercicio 8.3",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Se pide diseñar un método recursivo que implemente la estrategia voraz óptima para el problema del cambio de monedas. Dada una cierta cantidad de dinero $x$, el algoritmo debe imprimir por pantalla los valores de las monedas tal que su suma sea igual a $x$, teniendo en cuenta que:\n- Los posibles valores de las monedas son: $\\{2, 1, 0{,}5, 0{,}2, 0{,}1, 0{,}05, 0{,}02, 0{,}01\\}$\n- Se usará el mínimo número de monedas posible\n- Se asumirá que $x\\ge 0{,}01$ y que $x$ estará redondeado a dos cifras decimales\n\nPor ejemplo, para $x=5{,}34$ el método debe imprimir la secuencia: `2 2 1 0,2 0,1 0,02 0,02`\nEl método será recursivo, pero podrá usar bucles.",
    "solution": "**Paso 1. Trabajar en céntimos.** Con decimales (`0.1`, `5.34`) hay errores de redondeo; se convierte la cantidad a un entero de céntimos: $x=5{,}34$ son 534.\n\n**Paso 2. Estrategia voraz óptima.** Devolver siempre la moneda de **mayor valor que no supere** lo que queda. Es óptima para el sistema del euro (2, 1, 0,5, 0,2, 0,1, 0,05, 0,02, 0,01): en una solución óptima las monedas más pequeñas no pueden sumar el valor de otra mayor sin poder sustituirse por ella, así que la moneda mayor siempre debe usarse.\n\n**Paso 3. Método recursivo.** Si queda 0 se termina; si la moneda actual cabe, se devuelve y se sigue con el resto **sin** avanzar a la siguiente moneda; si no cabe, se pasa a la siguiente.\n```python\nMONEDAS = [200, 100, 50, 20, 10, 5, 2, 1]        # céntimos\n\ndef formato(c):\n    return str(c // 100) if c % 100 == 0 else ('%g' % (c / 100)).replace('.', ',')\n\ndef cambio(centimos, i=0):\n    if centimos == 0:\n        return []\n    elif MONEDAS[i] <= centimos:\n        return [MONEDAS[i]] + cambio(centimos - MONEDAS[i], i)\n    else:\n        return cambio(centimos, i + 1)\n\ndef imprime_cambio(x):\n    print(' '.join(formato(c) for c in cambio(round(x * 100))))\n```\n\n**Paso 4. Comprobación y coste.** `imprime_cambio(5.34)` imprime `2 2 1 0,2 0,1 0,02 0,02`. Hay, como mucho, tantas llamadas como monedas más tipos de moneda: $O(k+m)$.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 1.73,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#8.4",
    "n": "8.4",
    "title": "Ejercicio 8.4",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Este problema está relacionado con la eficiencia de una generalización del algoritmo de ordenación mergesort, en el que la lista original a ordenar se descompone en varias sublistas de tamaños diferentes. El algoritmo emplea un método para combinar las sublistas mezclando parejas de éstas progresivamente hasta ordenar la lista original.\nEste ejercicio consiste implementar un método para hallar el número mínimo de operaciones que necesitaría una estrategia (voraz) óptima para ordenar la lista original, cuando se desea mezclar $n$ listas ordenadas, las cuales pueden tener tamaños diferentes. Se supondrá que se realiza una operación por cada elemento a ordenar de una pareja de sublistas.\n```\nSublistas iniciales (tamaños 8, 5, 7, 4):\nL1 = 1 2 3 3 5 7 7 8\nL2 = 1 1 4 5 5\nL3 = 1 2 3 6 7 8 9\nL4 = 1 4 5 6\nPaso 1 (11 operaciones): L3+L4 -> 1 1 2 3 4 5 6 6 7 8 9\nPaso 2 (19 operaciones): L1 + (1 1 2 3 4 5 6 6 7 8 9) -> 1 1 1 2 2 3 3 3 4 5 5 6 6 7 7 7 8 8 9   (L2 sin mezclar)\nPaso 3 (24 operaciones): (lista de 19) + L2 -> 1 1 1 1 1 2 2 3 3 3 4 4 5 5 5 5 6 6 7 7 7 8 8 9\nNº total operaciones = 11 + 19 + 24 = 54\n```\nEn el ejemplo de la figura partimos de cuatro sublistas de tamaños 8, 5, 7 y 4. Al mezclar por parejas de la forma ilustrada el número total de operaciones realizadas es 54. Sin embargo, esa estrategia no es óptima. Hay una forma más eficiente de mezclar que lleva a cabo solo 48 operaciones.",
    "solution": "**Paso 1. Coste de una mezcla.** Mezclar dos listas de tamaños $a$ y $b$ cuesta $a+b$ operaciones, y el resultado es una lista de tamaño $a+b$.\n\n**Paso 2. Estrategia voraz.** Mezclar siempre las **dos listas más pequeñas**. Es el mismo argumento que en los códigos de Huffman: las listas que se mezclan antes participan en más mezclas posteriores, así que conviene que sean las más pequeñas.\n\n**Paso 3. Código.** Con un montículo (cola de prioridad):\n```python\nimport heapq\n\ndef coste_mezcla_optimo(tamanos):\n    h = list(tamanos)\n    heapq.heapify(h)\n    total = 0\n    while len(h) > 1:\n        x = heapq.heappop(h)\n        y = heapq.heappop(h)\n        total += x + y\n        heapq.heappush(h, x + y)\n    return total\n```\n\n**Paso 4. Comprobación y coste.** Con tamaños $8,5,7,4$: se mezclan $4+5=9$ (9 operaciones), $7+8=15$ (15) y $9+15=24$ (24): **48** operaciones, frente a las 54 de la mezcla del enunciado. Coste del algoritmo: $\\Theta(n\\log n)$.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 2.0,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#8.5",
    "n": "8.5",
    "title": "Ejercicio 8.5",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Sea una lista `a` que contenga las frecuencias de aparición de $n$ caracteres en un documento. Implementa un programa que calcule los códigos de Huffman asociados a los caracteres a partir de las frecuencias en `a`.",
    "solution": "**Paso 1. Estrategia.** Se parte de un árbol por carácter y, mientras haya más de uno, se fusionan los **dos de menor frecuencia** en un árbol cuya frecuencia es la suma. Se usa una cola de prioridad.\n\n**Paso 2. Árboles.** Una hoja es el índice del carácter y un nodo interno una pareja `(izquierdo, derecho)`. Para desempatar sin comparar árboles, cada elemento de la cola es `(frecuencia, número, árbol)` con un número único.\n\n**Paso 3. Códigos.** Se recorre el árbol: 0 al ir a la izquierda y 1 a la derecha; el código de una hoja es el camino desde la raíz.\n\n**Paso 4. Código.**\n```python\nimport heapq\n\ndef huffman(a):\n    h = [(f, i, i) for i, f in enumerate(a)]\n    heapq.heapify(h)\n    contador = len(a)\n    while len(h) > 1:\n        f1, _, t1 = heapq.heappop(h)\n        f2, _, t2 = heapq.heappop(h)\n        heapq.heappush(h, (f1 + f2, contador, (t1, t2)))\n        contador += 1\n    codigos = [''] * len(a)\n    _asigna(h[0][2], '', codigos)\n    return codigos\n\ndef _asigna(t, prefijo, codigos):\n    if isinstance(t, tuple):\n        _asigna(t[0], prefijo + '0', codigos)\n        _asigna(t[1], prefijo + '1', codigos)\n    else:\n        codigos[t] = prefijo or '0'\n```\n\n**Paso 5. Comprobación y coste.** Con las frecuencias $45,13,12,16,9,5$ (miles) la longitud de los códigos es $1,3,3,3,4,4$ y el total de bits es 224 (miles), frente a 300 con 3 bits por carácter. Los códigos concretos pueden variar según el desempate, pero su longitud total no. Coste: $\\Theta(n\\log n)$.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 1.24,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#8.6",
    "n": "8.6",
    "title": "Ejercicio 8.6",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Halla un árbol de recubrimiento de coste mínimo para el siguiente grafo ponderado empleando las estrategias de Prim y Kruskal.\n```\nAristas (no dirigidas, peso):\nA-B 10, A-C 7, B-C 8, B-D 15, B-E 12, C-D 6, C-F 9, D-E 12, D-F 11, E-F 10, E-G 8, F-G 9\n```\n(disposición: B y E arriba, A y D y G en el centro, C y F abajo; arista superior B-E peso 12, arista inferior C-F peso 9)",
    "solution": "**Paso 1. Aristas por orden de peso.** $C$-$D$ 6, $A$-$C$ 7, $B$-$C$ 8, $E$-$G$ 8, $C$-$F$ 9, $F$-$G$ 9, $A$-$B$ 10, $E$-$F$ 10, $D$-$F$ 11, $B$-$E$ 12, $D$-$E$ 12, $B$-$D$ 15. Con 7 vértices el árbol tiene 6 aristas.\n\n**Paso 2. Kruskal** (la arista más pequeña que no forme ciclo):\n\n| Paso | Arista | Peso | ¿Ciclo? |\n|---|---|---|---|\n| 1 | $C$-$D$ | 6 | no, se añade |\n| 2 | $A$-$C$ | 7 | no, se añade |\n| 3 | $B$-$C$ | 8 | no, se añade |\n| 4 | $E$-$G$ | 8 | no, se añade |\n| 5 | $C$-$F$ | 9 | no, se añade |\n| 6 | $F$-$G$ | 9 | no (une $\\{A,B,C,D,F\\}$ con $\\{E,G\\}$), se añade |\n\nYa hay 6 aristas. El resto ($A$-$B$, $E$-$F$, ...) formarían ciclo.\n\n**Paso 3. Prim** desde $A$ (se añade la arista mínima entre el conjunto $U$ de vértices tratados y el resto):\n\n| Paso | $U$ | Arista | Peso |\n|---|---|---|---|\n| 1 | $\\{A\\}$ | $A$-$C$ | 7 (frente a $A$-$B$ 10) |\n| 2 | $\\{A,C\\}$ | $C$-$D$ | 6 |\n| 3 | $\\{A,C,D\\}$ | $B$-$C$ | 8 |\n| 4 | $\\{A,B,C,D\\}$ | $C$-$F$ | 9 |\n| 5 | $\\{A,B,C,D,F\\}$ | $F$-$G$ | 9 |\n| 6 | $\\{A,B,C,D,F,G\\}$ | $E$-$G$ | 8 |\n\n**Paso 4. Resultado.** Los dos algoritmos dan el mismo árbol: $\\{C\\text{-}D,\\ A\\text{-}C,\\ B\\text{-}C,\\ E\\text{-}G,\\ C\\text{-}F,\\ F\\text{-}G\\}$, de coste $6+7+8+8+9+9=47$.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 1.42,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#8.7",
    "n": "8.7",
    "title": "Ejercicio 8.7",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa el algoritmo de Prim para hallar el árbol de recubrimiento de coste mínimo (minimum spanning tree).",
    "solution": "**Paso 1. Idea.** Se parte de un vértice, se mantiene el conjunto de vértices tratados y en cada paso se añade la arista de menor peso que sale de él hacia un vértice nuevo. Una cola de prioridad con las aristas candidatas lo hace eficiente.\n\n**Paso 2. Detalle.** Al sacar una arista cuyo destino ya está tratado se descarta (la cola puede contener aristas obsoletas). Si el grafo es conexo se añaden $|V|-1$ aristas.\n\n**Paso 3. Código.** El grafo es un diccionario `{vértice: [(vecino, peso), ...]}`:\n```python\nimport heapq\n\ndef prim(grafo, origen):\n    tratados = {origen}\n    arbol = []\n    cola = [(w, origen, v) for v, w in grafo[origen]]\n    heapq.heapify(cola)\n    while cola and len(tratados) < len(grafo):\n        w, u, v = heapq.heappop(cola)\n        if v in tratados:\n            continue\n        tratados.add(v)\n        arbol.append((u, v, w))\n        for x, wx in grafo[v]:\n            if x not in tratados:\n                heapq.heappush(cola, (wx, v, x))\n    return arbol\n```\n\n**Paso 4. Comprobación y coste.** Con el grafo del ejercicio 8.6 devuelve un árbol de coste 47. Cada arista entra y sale de la cola a lo sumo una vez: $O(E\\log E)=O(E\\log V)$.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 1.12,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#8.8",
    "n": "8.8",
    "title": "Ejercicio 8.8",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa el algoritmo de Kruskal para hallar el árbol de recubrimiento de coste mínimo (minimum spanning tree).",
    "solution": "**Paso 1. Idea.** Se ordenan las aristas por peso y se recorren en ese orden añadiendo cada una si **no forma un ciclo** con las ya elegidas. Se detecta con una estructura de conjuntos disjuntos (unión-búsqueda): dos vértices están en el mismo componente si tienen la misma raíz.\n\n**Paso 2. Código.** Las aristas son `(peso, u, v)` y los vértices van de 0 a `n-1`:\n```python\ndef kruskal(n, aristas):\n    padre = list(range(n))\n\n    def raiz(x):\n        while padre[x] != x:\n            padre[x] = padre[padre[x]]\n            x = padre[x]\n        return x\n\n    arbol = []\n    for w, u, v in sorted(aristas):\n        ru, rv = raiz(u), raiz(v)\n        if ru != rv:\n            padre[ru] = rv\n            arbol.append((u, v, w))\n            if len(arbol) == n - 1:\n                break\n    return arbol\n```\n\n**Paso 3. Comprobación y coste.** Con el grafo del ejercicio 8.6 (vértices $A..G$ como $0..6$) da un árbol de coste 47. Ordenar cuesta $O(E\\log E)$ y las operaciones de conjuntos son casi constantes: $O(E\\log E)$ en total.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 1.13,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#8.9",
    "n": "8.9",
    "title": "Ejercicio 8.9",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa el algoritmo de Dijkstra y úsalo para hallar el camino más corto desde la entrada a un laberinto (definido sobre una rejilla rectangular como el de la figura de abajo) hasta la correspondiente casilla de salida.\n[figura: laberinto en rejilla cuadrada de unas 16x16 celdas con celdas de pared sombreadas (ladrillo); \"entrada\" con flecha hacia abajo en la esquina superior izquierda, por encima de la primera columna; \"salida\" con flecha hacia abajo en la parte inferior derecha. La disposición exacta de las paredes no se transcribe]",
    "solution": "**Paso 1. Modelo.** El laberinto es una rejilla; las casillas libres son vértices y cada casilla se conecta con sus 4 vecinas libres con una arista de peso 1. Las paredes no son vértices.\n\n**Paso 2. Dijkstra.** Se parte de la entrada con distancia 0. Se extrae de una cola de prioridad la casilla de menor distancia, se **relajan** sus vecinas (`dist[v] = min(dist[v], dist[u] + 1)`) y se guarda de qué casilla se llegó para reconstruir el camino. Se puede parar al extraer la salida.\n\n**Paso 3. Código.** Las paredes son `'W'` y las casillas libres `'E'` (u otro carácter):\n```python\nimport heapq\n\ndef camino_laberinto(L, entrada, salida):\n    filas, cols = len(L), len(L[0])\n    dist = {entrada: 0}\n    previo = {}\n    cola = [(0, entrada)]\n    while cola:\n        d, (f, c) = heapq.heappop(cola)\n        if (f, c) == salida:\n            break\n        if d > dist[(f, c)]:\n            continue\n        for df, dc in ((0, 1), (1, 0), (0, -1), (-1, 0)):\n            g, h = f + df, c + dc\n            if 0 <= g < filas and 0 <= h < cols and L[g][h] != 'W':\n                if d + 1 < dist.get((g, h), float('inf')):\n                    dist[(g, h)] = d + 1\n                    previo[(g, h)] = (f, c)\n                    heapq.heappush(cola, (d + 1, (g, h)))\n    if salida not in dist:\n        return None\n    camino = [salida]\n    while camino[-1] != entrada:\n        camino.append(previo[camino[-1]])\n    return camino[::-1]\n```\n\n**Paso 4. Comprobación y coste.** En un laberinto pequeño devuelve la lista de casillas desde la entrada hasta la salida (o `None` si no hay camino). Con $V$ casillas libres y $E\\le4V$ aristas el coste es $O(E\\log V)$. Como todas las aristas pesan 1, una búsqueda en anchura da el mismo resultado en $O(V)$.",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 1.6,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#9.1",
    "n": "9.1",
    "title": "Ejercicio 9.1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Se pide implementar un método recursivo que, dado un determinado entero no negativo $n$, calcule la siguiente suma:\n$S(n)=\\sum_{i=1}^{n}(2i-1)$",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es $n$ (el número de términos). Para $n=0$ la suma está vacía y vale 0.\n\n**Paso 2. Descomposición.** Se aísla el último término: $S(n)=\\sum_{i=1}^{n-1}(2i-1)+(2n-1)=S(n-1)+(2n-1)$.\n\n**Paso 3. Código.**\n```python\ndef suma_impares(n):\n    if n == 0:\n        return 0\n    else:\n        return suma_impares(n - 1) + 2 * n - 1\n```\n\n**Paso 4. Comprobación y coste.** `suma_impares(5)` devuelve 25: la suma de los $n$ primeros impares es $n^2$ (ejercicio 1.5). Hay $n+1$ llamadas con trabajo constante: $\\Theta(n)$ (la fórmula $n^2$ calcula lo mismo en $\\Theta(1)$).",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.16,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#9.2",
    "n": "9.2",
    "title": "Ejercicio 9.2",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "En este ejercicio se pide implementar una versión recursiva del algoritmo de Horner, que sirve para evaluar polinomios de manera eficiente. En concreto, evalúa un polinomio de grado $n$ utilizando solamente $n$ multiplicaciones. La clave detrás del algoritmo de Horner es la descomposición de un polinomio $p(x)$ de grado $n$ de la siguiente manera:\n$p(x,\\mathbf d)=d_0+x(d_1+x(d_2+\\cdots+x(d_{n-1}+d_n x)\\cdots))$\ndonde $\\mathbf d$ representa los coeficientes del polinomio de grado $n$. En concreto, $d_0$ es la constante, mientras que $d_n$ es el coeficiente asociado al término $x^n$. El método recibirá la lista de coeficientes $\\mathbf d$ que definen el polinomio, y el número real $x$.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es el número de coeficientes. Con un solo coeficiente el polinomio es la constante $d_0$.\n\n**Paso 2. Regla de Horner.** $p(x,\\mathbf d)=d_0+x\\cdot p(x,\\mathbf d_{1..n})$, donde $\\mathbf d_{1..n}$ son los coeficientes sin el primero. Por cada coeficiente (salvo el último) hay **una** multiplicación: $n$ para grado $n$.\n\n**Paso 3. Código.** Con un índice para no copiar la lista:\n```python\ndef horner(d, x, i=0):\n    if i == len(d) - 1:\n        return d[i]\n    else:\n        return d[i] + x * horner(d, x, i + 1)\n```\n\n**Paso 4. Comprobación y coste.** `horner([2, -4, 5], 3)` devuelve 35 ($2-4\\cdot3+5\\cdot9$). Hay $n+1$ llamadas y $n$ multiplicaciones: $\\Theta(n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.77,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#9.3",
    "n": "9.3",
    "title": "Ejercicio 9.3",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Se pide implementar la siguiente función mediante métodos recursivos, para un entero positivo $n$:\n$f(n)=\\begin{cases}1 & n=1,2\\\\ 1+\\sum_{i=1}^{n-2}f(i) & n\\ge 3\\end{cases}$\nEl sumatorio en el caso recursivo se puede implementar de dos maneras: (1) usando un bucle, y (2) mediante una segunda función recursiva. Implementad ambos casos.",
    "solution": "**Paso 1. Qué calcula.** $f(1)=f(2)=1$, $f(3)=1+f(1)=2$, $f(4)=1+f(1)+f(2)=3$, $f(5)=1+1+1+2=5$: son los **números de Fibonacci** (por el ejercicio 3.5, $F(n)=F(2)+\\sum_{i=1}^{n-2}F(i)$ con $F(2)=1$).\n\n**Paso 2. Versión 1: el sumatorio con un bucle.**\n```python\ndef f_bucle(n):\n    if n <= 2:\n        return 1\n    else:\n        s = 0\n        for i in range(1, n - 1):\n            s += f_bucle(i)\n        return 1 + s\n```\n\n**Paso 3. Versión 2: el sumatorio con una segunda función recursiva.** `suma_f(m)` calcula $\\sum_{i=1}^{m}f(i)$ con la regla $\\text{suma\\_f}(m)=\\text{suma\\_f}(m-1)+f(m)$ y caso base $m=0$; las dos funciones se llaman entre sí (recursión mutua):\n```python\ndef f_rec(n):\n    if n <= 2:\n        return 1\n    else:\n        return 1 + suma_f(n - 2)\n\ndef suma_f(m):\n    if m == 0:\n        return 0\n    else:\n        return suma_f(m - 1) + f_rec(m)\n```\n\n**Paso 4. Comprobación y coste.** Las dos dan $1,1,2,3,5,8,13,\\dots$ ($f(10)=55$). Es un árbol de llamadas muy ramificado: en la versión con bucle $T(n)=\\sum_{i<n-1}T(i)+c$, que (como en el ejercicio 1.12) crece exponencialmente. Ambas son de coste exponencial.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.37,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#9.4",
    "n": "9.4",
    "title": "Ejercicio 9.4",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Asuma que las tres torres están dispuestas de izquierda a derecha. En esta variante las reglas del problema son las mismas que las del original, pero NO se permite mover discos directamente desde la torre de la izquierda a la de la derecha, ni viceversa, como ilustra la siguiente figura:\n[figura: tres torres (izquierda, centro, derecha); movimientos permitidos (marca de verificación): izquierda<->centro y centro<->derecha; movimiento prohibido (cruz): izquierda<->derecha directamente]\nDados $n$ discos ubicados en la torre de la izquierda, implementa un procedimiento que resuelva el problema, y mueva los $n$ discos a la torre de la derecha.",
    "solution": "**Paso 1. Qué cambia.** Un disco sólo puede ir de una torre a una **adyacente**: izquierda$\\leftrightarrow$centro y centro$\\leftrightarrow$derecha. Para ir de un extremo al otro hay que pasar por el centro.\n\n**Paso 2. Descomposición.** Para mover $n$ discos de un extremo $o$ al otro $d$ (la torre del centro está siempre libre para ser la intermedia):\n1. mover $n-1$ discos de $o$ a $d$ (problema del mismo tipo);\n2. mover el disco $n$ de $o$ al centro;\n3. mover los $n-1$ discos de $d$ de vuelta a $o$;\n4. mover el disco $n$ del centro a $d$;\n5. mover otra vez los $n-1$ discos de $o$ a $d$.\n\nAsí el disco $n$ nunca queda sobre uno más pequeño: en los pasos 2 y 4 los $n-1$ discos están en la torre de enfrente y el centro y el destino están libres.\n\n**Paso 3. Caso base.** $n=0$: no se mueve nada.\n\n**Paso 4. Código.**\n```python\ndef hanoi_adyacente(n, o, d, medio='C'):\n    if n > 0:\n        hanoi_adyacente(n - 1, o, d)\n        print('Mueve disco', n, 'de', o, 'a', medio)\n        hanoi_adyacente(n - 1, d, o)\n        print('Mueve disco', n, 'de', medio, 'a', d)\n        hanoi_adyacente(n - 1, o, d)\n```\nSe llama con `hanoi_adyacente(n, 'I', 'D')`.\n\n**Paso 5. Coste.** $M(n)=3M(n-1)+2$ con $M(0)=0$, que resuelve a $M(n)=3^n-1$ movimientos (frente a $2^n-1$ del Hanoi original): $\\Theta(3^n)$. Para $n=1$ son 2 movimientos y para $n=2$, 8.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.72,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#9.5",
    "n": "9.5",
    "title": "Ejercicio 9.5",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa un método recursivo que corra en tiempo logarítmico para buscar un elemento `x` en una lista o array ordenado `a`. El método devolverá el índice en el que se encuentre `x` dentro de la lista. Es decir, si `a[i] = x` el método devolverá `i`. Si `x` aparece varias veces en la lista basta con devolver cualquier índice `i` que satisfaga `a[i] = x`. Si `x` no se encuentra en la lista el resultado será $-1$.",
    "solution": "**Paso 1. Tamaño y caso base.** El tamaño es la longitud del tramo `inf..sup`. Si está vacío (`inf > sup`), `x` no está: devuelve $-1$.\n\n**Paso 2. Descomposición.** Se compara `x` con el elemento central. Si es igual, se devuelve su índice; si es menor, se descarta la mitad derecha; si es mayor, la izquierda. Una sola llamada con la mitad del tamaño.\n\n**Paso 3. Código.**\n```python\ndef busqueda_binaria(a, x, inf, sup):\n    if inf > sup:\n        return -1\n    else:\n        m = (inf + sup) // 2\n        if a[m] == x:\n            return m\n        elif x < a[m]:\n            return busqueda_binaria(a, x, inf, m - 1)\n        else:\n            return busqueda_binaria(a, x, m + 1, sup)\n\ndef busca(a, x):\n    return busqueda_binaria(a, x, 0, len(a) - 1)\n```\n\n**Paso 4. Comprobación y coste.** `busca([1, 3, 5, 7, 9], 7)` devuelve 3 y `busca([1, 3, 5, 7, 9], 4)` devuelve $-1$. No se copia la lista: $T(n)=T(n/2)+c\\in\\Theta(\\log n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.46,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#9.6",
    "n": "9.6",
    "title": "Ejercicio 9.6",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa un método recursivo que, dado un entero positivo `n`, imprima por pantalla una pirámide de `n` filas con la siguiente estructura (para `n = 4`):\n```\n   X\n  XXX\n XXXXX\nXXXXXXX\n```\nEl método puede usar funciones auxiliares recursivas.",
    "solution": "**Paso 1. Estructura de cada fila.** En una pirámide de $n$ filas, la fila $i$ ($i=1..n$) tiene $n-i$ espacios y $2i-1$ caracteres `X`.\n\n**Paso 2. Funciones auxiliares recursivas.** Una que imprime un carácter $k$ veces y otra que recorre las filas:\n```python\ndef repite(c, k):\n    if k > 0:\n        print(c, end='')\n        repite(c, k - 1)\n\ndef fila(i, n):\n    repite(' ', n - i)\n    repite('X', 2 * i - 1)\n    print()\n\ndef piramide(n, i=1):\n    if i <= n:\n        fila(i, n)\n        piramide(n, i + 1)\n```\n\n**Paso 3. Comprobación y coste.** `piramide(4)` imprime\n```\n   X\n  XXX\n XXXXX\nXXXXXXX\n```\nSe imprimen $\\sum_{i=1}^{n}(n-i+2i-1)=\\sum(n+i-1)\\in\\Theta(n^2)$ caracteres, así que el coste es $\\Theta(n^2)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.27,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#9.7",
    "n": "9.7",
    "title": "Ejercicio 9.7",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa el método recursivo de bisección para hallar una raíz de una función continua $f(x)$ en un intervalo $(a,b)$. Para aplicar el método sabemos que $f(a)\\cdot f(b)<0$. Es decir, tiene diferentes signos en los extremos del intervalo, lo cual implica que debe tener al menos un cero en $(a,b)$. El método debe retornar un valor $z$ en cuanto encuentre un valor para el cual $|b-a|<2\\varepsilon$, donde $\\varepsilon$ es un valor pequeño que se pasará al método como parámetro.",
    "solution": "**Paso 1. Planteamiento.** $f$ es continua en $[a,b]$ con $f(a)\\cdot f(b)<0$, así que tiene un cero en $(a,b)$. El tamaño es el ancho $b-a$. Caso base: $|b-a|<2\\varepsilon$ (o $f(z)=0$): el punto medio $z$ está a menos de $\\varepsilon$ del cero.\n\n**Paso 2. Descomposición.** Con $z=(a+b)/2$: si $f(a)\\cdot f(z)<0$ hay un cero en $[a,z]$ (si $f(z)=0$ ya se ha terminado); si no, en $[z,b]$ (porque entonces $f(z)\\cdot f(b)<0$). Se divide el ancho entre 2.\n\n**Paso 3. Código.**\n```python\ndef biseccion(f, a, b, eps):\n    z = (a + b) / 2\n    if abs(b - a) < 2 * eps or f(z) == 0:\n        return z\n    elif f(a) * f(z) < 0:\n        return biseccion(f, a, z, eps)\n    else:\n        return biseccion(f, z, b, eps)\n```\n\n**Paso 4. Comprobación y coste.** Para $f(x)=x^2-2$ en $(1,2)$ con $\\varepsilon=10^{-6}$ devuelve $1{,}41421\\ldots$ ($\\sqrt2$) con un error menor que $\\varepsilon$. El ancho se divide por 2 en cada llamada: hay $\\lceil\\log_2\\frac{b-a}{2\\varepsilon}\\rceil$ llamadas, $\\Theta(\\log\\frac{b-a}\\varepsilon)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.53,
    "own": true
   },
   {
    "id": "ejercicios_adicionales_3-9#9.8",
    "n": "9.8",
    "title": "Ejercicio 9.8",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "statement": "Implementa el método recursivo que, dada una cadena `s`, encuentre la subcadena más larga contenida en `s` que constituya un palíndromo (es decir, que sea \"capicúa\"). El método podrá llamar a otro auxiliar Booleano que determine si una cadena es un palíndromo.",
    "solution": "**Paso 1. Función auxiliar.** Una cadena es un palíndromo si tiene menos de dos caracteres o si sus extremos coinciden y lo que queda entre ellos es un palíndromo:\n```python\ndef es_palindromo(s):\n    if len(s) < 2:\n        return True\n    else:\n        return s[0] == s[-1] and es_palindromo(s[1:-1])\n```\n\n**Paso 2. Planteamiento.** El tamaño es la longitud $L$ que se busca. Se prueban las subcadenas por longitud **decreciente**: la primera que sea palíndromo es la más larga. Para una longitud, se recorren las posiciones de inicio.\n\n**Paso 3. Código.**\n```python\ndef busca_longitud(s, L, i=0):\n    if i + L > len(s):\n        return None\n    elif es_palindromo(s[i:i + L]):\n        return s[i:i + L]\n    else:\n        return busca_longitud(s, L, i + 1)\n\ndef palindromo_mas_largo(s, L=None):\n    if L is None:\n        L = len(s)\n    if L == 0:\n        return ''\n    r = busca_longitud(s, L)\n    return r if r is not None else palindromo_mas_largo(s, L - 1)\n```\n\n**Paso 4. Comprobación.** `palindromo_mas_largo('babad')` devuelve `'bab'` (también valdría `'aba'`) y `palindromo_mas_largo('abc')` devuelve `'a'`.\n\n**Paso 5. Coste.** Hay $O(n^2)$ subcadenas y comprobar cada una cuesta $O(n)$: $O(n^3)$. Una descomposición ingenua que pruebe `s[:-1]` y `s[1:]` a la vez sería exponencial: $T(n)=2T(n-1)+\\ldots\\in\\Theta(2^n)$.",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 2.29,
    "own": true
   }
  ],
  "kind": "adic"
 }
];
window.STAGE_EX = {
 "intro": [],
 "sumatorios": [
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.4",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.6",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.7",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.5",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.9",
  "2019-20_analisis_junio_sol/2019-20_analisis_junio_sol#3",
  "2019-20_analisis_junio_sol/2019-20_analisis_junio_sol#2",
  "2020-21_analisis_junio/2020-21_analisis_junio#2",
  "2016-17_analisis_mayo/2016-17_analisis_mayo#2"
 ],
 "asintotica": [
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.2",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.1",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.5",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.3",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.4",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.14",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.3",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.1",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.2",
  "2019-20_analisis_junio_sol/2019-20_analisis_junio_sol#1",
  "2018-19_mostoles_mayo_sol/2018-19_mostoles_mayo_sol#1",
  "2021-22_analisis_mayo_sol/2021-22_analisis_mayo_sol#1",
  "2015-16_analisis_mayo_sol/2015-16_analisis_mayo_sol#1",
  "2018-19_vicalvaro_mayo_sol/2018-19_vicalvaro_mayo_sol#1",
  "2016-17_analisis_junio/2016-17_analisis_junio#1",
  "2020-21_analisis_junio/2020-21_analisis_junio#1",
  "2020-21_analisis_enero/2020-21_analisis_enero#1",
  "2016-17_analisis_mayo/2016-17_analisis_mayo#1",
  "2014-15_analisis_mayo_sol/2014-15_analisis_mayo_sol#1"
 ],
 "bucles": [
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.6",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.9",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.7",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.8",
  "2018-19_vicalvaro_mayo_sol/2018-19_vicalvaro_mayo_sol#2",
  "2021-22_analisis_mayo_sol/2021-22_analisis_mayo_sol#2",
  "2020-21_analisis_enero/2020-21_analisis_enero#2",
  "2015-16_analisis_mayo_sol/2015-16_analisis_mayo_sol#2",
  "2018-19_mostoles_mayo_sol/2018-19_mostoles_mayo_sol#2",
  "2016-17_analisis_junio/2016-17_analisis_junio#2",
  "2014-15_analisis_mayo_sol/2014-15_analisis_mayo_sol#3"
 ],
 "expansion": [
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.12",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.13",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.10",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.13",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.10",
  "2018-19_mostoles_mayo_sol/2018-19_mostoles_mayo_sol#4",
  "2019-20_analisis_junio_sol/2019-20_analisis_junio_sol#5",
  "2018-19_vicalvaro_mayo_sol/2018-19_vicalvaro_mayo_sol#4",
  "2021-22_analisis_mayo_sol/2021-22_analisis_mayo_sol#3",
  "2015-16_analisis_mayo_sol/2015-16_analisis_mayo_sol#3",
  "2016-17_analisis_mayo/2016-17_analisis_mayo#3",
  "2014-15_analisis_mayo_sol/2014-15_analisis_mayo_sol#6",
  "2014-15_analisis_mayo_sol/2014-15_analisis_mayo_sol#4",
  "2020-21_analisis_junio/2020-21_analisis_junio#3"
 ],
 "general": [
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.15",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.14",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.17",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.16",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.8",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.11",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.11",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.15",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.12",
  "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.18",
  "2018-19_mostoles_mayo_sol/2018-19_mostoles_mayo_sol#3",
  "2019-20_analisis_junio_sol/2019-20_analisis_junio_sol#4",
  "2018-19_vicalvaro_mayo_sol/2018-19_vicalvaro_mayo_sol#3",
  "2021-22_analisis_mayo_sol/2021-22_analisis_mayo_sol#4",
  "2015-16_analisis_mayo_sol/2015-16_analisis_mayo_sol#4",
  "2016-17_analisis_mayo/2016-17_analisis_mayo#4",
  "2014-15_analisis_mayo_sol/2014-15_analisis_mayo_sol#2",
  "2016-17_analisis_junio/2016-17_analisis_junio#3",
  "2014-15_analisis_mayo_sol/2014-15_analisis_mayo_sol#5",
  "2020-21_analisis_enero/2020-21_analisis_enero#3"
 ],
 "recursion": [
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.6",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.1",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.16",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.15",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.9",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.5",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.2",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.12",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.11",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.3",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.4",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.12",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.7",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.2",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.9",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.15",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.10",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.14",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.8",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.7",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.10",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.11",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.4",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.8",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.1",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.13",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.3",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.14",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.1",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.13",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.16",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.4",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.5",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.6",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.6",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.17",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.2",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.1",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.5",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.6",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.7",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.8",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.3",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.8",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.5",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.3",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.9",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.7",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.4",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.2",
  "2021-22_diseno_mayo_sol/2021-22_diseno_mayo_sol#1",
  "2022-23_diseno_mayo_sol/2022-23_diseno_mayo_sol#1",
  "2019-20_diseno_mostoles_junio_sol/2019-20_diseno_mostoles_junio_sol#1",
  "2016-17_diseno_mayo_sol/2016-17_diseno_mayo_sol#2",
  "2020-21_diseno_enero/2020-21_diseno_enero#1",
  "2015-16_diseno_mayo/2015-16_diseno_mayo#1",
  "2016-17_diseno_mayo_sol/2016-17_diseno_mayo_sol#3",
  "2020-21_diseno_enero/2020-21_diseno_enero#2",
  "2021-22_diseno_enero_sol/2021-22_diseno_enero_sol#2",
  "2015-16_diseno_mayo/2015-16_diseno_mayo#2",
  "2022-23_diseno_mayo_sol/2022-23_diseno_mayo_sol#4",
  "2019-20_diseno_vicalvaro_junio_sol/2019-20_diseno_vicalvaro_junio_sol#1",
  "2020-21_diseno_junio/2020-21_diseno_junio#1",
  "2014-15_diseno_junio/2014-15_diseno_junio#1"
 ],
 "dyv": [
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.1",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.7",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.6",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.8",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.2",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.3",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.4",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.5",
  "2021-22_diseno_enero_sol/2021-22_diseno_enero_sol#1",
  "2022-23_diseno_mayo_sol/2022-23_diseno_mayo_sol#2",
  "2019-20_diseno_vicalvaro_junio_sol/2019-20_diseno_vicalvaro_junio_sol#2",
  "2019-20_diseno_mostoles_junio_sol/2019-20_diseno_mostoles_junio_sol#2",
  "2014-15_diseno_junio/2014-15_diseno_junio#2",
  "2018-19_mostoles_mayo_sol/2018-19_mostoles_mayo_sol#5",
  "2016-17_diseno_junio/2016-17_diseno_junio#1",
  "2018-19_vicalvaro_mayo_sol/2018-19_vicalvaro_mayo_sol#5",
  "2021-22_diseno_mayo_sol/2021-22_diseno_mayo_sol#2"
 ],
 "backtracking": [
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.2",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.3",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.4",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.1",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.5",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.6",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.7",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.8",
  "2016-17_diseno_mayo_sol/2016-17_diseno_mayo_sol#1",
  "2015-16_diseno_mayo/2015-16_diseno_mayo#3",
  "2022-23_diseno_mayo_sol/2022-23_diseno_mayo_sol#3",
  "2014-15_diseno_junio/2014-15_diseno_junio#3",
  "2016-17_diseno_junio/2016-17_diseno_junio#3",
  "2016-17_diseno_mayo_sol/2016-17_diseno_mayo_sol#4",
  "2020-21_diseno_enero/2020-21_diseno_enero#3",
  "2021-22_diseno_mayo_sol/2021-22_diseno_mayo_sol#3",
  "2019-20_diseno_vicalvaro_junio_sol/2019-20_diseno_vicalvaro_junio_sol#3",
  "2018-19_vicalvaro_mayo_sol/2018-19_vicalvaro_mayo_sol#6",
  "2019-20_diseno_mostoles_junio_sol/2019-20_diseno_mostoles_junio_sol#3",
  "2015-16_diseno_mayo/2015-16_diseno_mayo#4",
  "2018-19_mostoles_mayo_sol/2018-19_mostoles_mayo_sol#6",
  "2021-22_diseno_enero_sol/2021-22_diseno_enero_sol#3",
  "2020-21_diseno_junio/2020-21_diseno_junio#2"
 ],
 "voraz": [
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.7",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.8",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.5",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.6",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.2",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.9",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.3",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.1",
  "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.4",
  "2021-22_diseno_mayo_sol/2021-22_diseno_mayo_sol#4",
  "2016-17_diseno_junio/2016-17_diseno_junio#2"
 ]
};
window.STAGE_AT = {
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.4": 2,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.6": 3,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.7": 2,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.5": 2,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.9": 5,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.2": 5,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.1": 3,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.5": 3,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.3": 5,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.4": 5,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.14": 9,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.3": 3,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.1": 1,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.2": 9,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.6": 0,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.9": 0,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.7": 1,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.8": 1,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.12": 0,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.13": 0,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.10": 0,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.13": 0,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.10": 0,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.15": 2,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.14": 2,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.17": 3,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.16": 0,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.8": 2,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.11": 0,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.11": 2,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.15": 3,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.12": 1,
 "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.18": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.6": 0,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.1": 0,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.16": 5,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.15": 5,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.9": 0,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.5": 1,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.2": 0,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.12": 2,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.11": 2,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.3": 1,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.4": 0,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.12": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.7": 4,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.2": 5,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.9": 7,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.11": 7,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.15": 8,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.6": 4,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.10": 1,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.14": 4,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.8": 4,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.7": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.10": 4,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.4": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.8": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.1": 2,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.13": 2,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.3": 5,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.14": 4,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.1": 1,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.13": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.16": 9,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.4": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.5": 4,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.6": 8,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.17": 8,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.2": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.1": 0,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.5": 8,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.6": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.7": 8,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.8": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.3": 1,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.8": 8,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.5": 8,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.3": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.9": 9,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.7": 9,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.4": 10,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.2": 7,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.1": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.7": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.6": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.8": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.2": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.3": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.4": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.5": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.2": 5,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.3": 2,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.4": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.1": 1,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.5": 4,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.6": 2,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.7": 5,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.8": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.7": 7,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.8": 7,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.5": 4,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.6": 7,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.2": 6,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.9": 8,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.3": 2,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.1": 3,
 "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.4": 3
};
