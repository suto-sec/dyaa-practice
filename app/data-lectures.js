window.LECTURES = [
 {
  "id": "t1_intro_algoritmia",
  "title": "Tema 1. Introducción a la algoritmia",
  "sections": [
   {
    "title": "Tema 1. Introducción a la algoritmia",
    "level": 2,
    "md": "Diseño y Análisis de Algoritmos (URJC), Manuel Rubio Sánchez, 13 de mayo de 2024. Licencia CC BY-SA 4.0.\nContenido: 1 Problemas y algoritmos; 2 Complejidad computacional; 3 Problemas de optimización; 4 Problemas en IA.\n\n# 1. Problemas computacionales y algoritmos"
   },
   {
    "title": "Problema computacional",
    "level": 2,
    "md": "- Objeto matemático que representa un conjunto de preguntas que queremos resolver (con ayuda de computadoras)\n- Usa precondiciones y postcondiciones para describir las salidas o acciones adecuadas para unas entradas (instancias) válidas\n- El enunciado especifica la relación entre las entradas y las salidas\n- Una instancia del problema define las entradas necesarias para calcular la solución\n- Pueden verse como colecciones (a menudo infinitas) de instancias, junto con las soluciones a cada instancia"
   },
   {
    "title": "Ejemplo: problema de ordenación",
    "level": 2,
    "md": "- Entradas: secuencia de n números $\\langle a_1,a_2,\\dots,a_n\\rangle$\n- Salidas: permutación (reordenación) $\\langle a'_1,a'_2,\\dots,a'_n\\rangle$ de la secuencia de entrada tal que $a'_1\\le a'_2\\le\\dots\\le a'_n$\n- Instancia: $\\langle 3,14,7,1,8,12\\rangle$; solución: $\\langle 1,3,7,8,12,14\\rangle$"
   },
   {
    "title": "Tipos de problemas computacionales",
    "level": 2,
    "md": "- Matemáticos o lógicos (funciones), de decisión (salida binaria/booleana), de ordenación, de búsqueda, combinatorios, optimización, geométricos, sobre grafos, sobre cadenas...\n- Algunos problemas pueden pertenecer a varias categorías"
   },
   {
    "title": "Algoritmo",
    "level": 2,
    "md": "- No hay definición formal aceptada de \"algoritmo\"\n- Procedimiento, conjunto de instrucciones, \"receta\", que define una serie de pasos, bien definidos, que llevan a obtener las salidas adecuadas para un conjunto de datos de entrada\n- La secuencia de pasos no tiene por qué ser determinista\n- Un algoritmo es correcto si para cada instancia de entrada para con el resultado correcto; en ese caso, decimos que el algoritmo resuelve el problema computacional\n- Algoritmos incorrectos también pueden ser útiles, si el error que cometen puede ser controlado"
   },
   {
    "title": "Algoritmos según su implementación",
    "level": 2,
    "md": "- Iterativos/recursivos: todo algoritmo iterativo se puede expresar de forma recursiva y viceversa\n- Lógicos: los algoritmos son procesos de deducción lógica controlada\n- En serie, paralelos o distribuidos: los paralelos o distribuidos dividen los problemas en subproblemas tratados en diferentes procesadores o máquinas, para posteriormente combinar los resultados\n- Deterministas o no deterministas\n  - Deterministas: siempre toman la misma decisión en cada paso del algoritmo\n  - No deterministas: utilizan algún grado de aleatoriedad para tomar decisiones. Emplean heurísticas, generalmente derivadas del conocimiento humano, para tomar mejores decisiones\n- Exactos o aproximados\n  - Exactos: alcanzan la solución exacta\n  - Aproximados: buscan una solución que se aproxime a la verdadera. Útiles para problemas duros o intratables"
   },
   {
    "title": "Algoritmos según el paradigma de diseño",
    "level": 2,
    "md": "- Divide o vencerás\n- Fuerza bruta o exhaustivos\n  - Backtraking o \"vuelta atrás\"\n- Algoritmos voraces\n- Programación dinámica (en la asignatura \"Algoritmos avanzados\")"
   },
   {
    "title": "Algoritmos a partir de propiedades matemáticas: algoritmo de Euclides",
    "level": 2,
    "md": "- Máximo común divisor de dos números naturales. Dos versiones:\n\n$$mcd1(m,n)=\\begin{cases} n & m=0\\\\ mcd1(n,m) & m>n\\\\ mcd1(m,n-m) & (m\\le n)\\ \\text{y}\\ (m\\ne 0)\\end{cases}$$\n\n$$mcd2(m,n)=\\begin{cases} n & m=0\\\\ mcd2(n\\%m,m) & m\\ne 0\\end{cases}$$"
   },
   {
    "title": "Demostración mcd1",
    "level": 3,
    "md": "- Supongamos $m\\le n$ (en caso contrario el propio algoritmo intercambia los parámetros)\n- $m=az$, $n=bz$, con $a\\le b$\n  - z son los factores primos (máximo común múltiplo)\n  - a y b no comparten factores primos\n- Hacemos $b=a+c$\n- $n=bz=(a+c)z=(a_1\\cdots a_k+c_1\\cdots c_l)z$\n  - No se puede sacar factor común. Si se pudiera sería otro factor de z. a, c no comparten primos\n- Por tanto, dado que $z=mcd1(az,bz)=mcd1(az,cz)$, y $c=b-a$, tenemos: $mcd1(m,n)=mcd1(az,bz)=mcd1(az,cz)=mcd1(m,n-m)$"
   },
   {
    "title": "Demostración mcd2",
    "level": 3,
    "md": "- Supongamos $m\\le n$ (en caso contrario el propio algoritmo intercambia los parámetros)\n- $m=az$, $n=bz$, con $a\\le b$; z son los factores primos; a y b no comparten factores primos\n- Hacemos $b=ac+d$, donde c y d son el cociente y el resto de $b/a$\n- a y d no pueden compartir factores, de lo contrario serían también factores de b\n- Por tanto: $z=mcd2(az,bz)=mcd2(dz,az)\\Rightarrow mcd2(m,n)=mcd2(n\\%m,m)$\n\n# 2. Introducción a las clases de complejidad computacional"
   },
   {
    "title": "Eficiencia en tiempo y espacio",
    "level": 2,
    "md": "- Escogeremos algoritmos con menor complejidad computacional\n  - Coste polinómico: $1$ (constante), $\\log n$, $n$, $n\\log n$, $n^2$...\n  - Coste mayor que polinómico: $2^n$, $n!$, $n^n$...\n- Notación también usada para problemas computacionales. Generalmente, para cualquier instancia de un tamaño dado"
   },
   {
    "title": "Clases de complejidad",
    "level": 2,
    "md": "- Los problemas (de decisión) se pueden categorizar en clases de complejidad según su dificultad computacional\n- Clases más importantes:\n  - P: resolubles en tiempo polinómico\n  - NP: resolubles en tiempo polinómico mediante un algoritmo no-determinista\n  - NP-completos: los más difíciles de NP\n  - NP-duros: tan difícil o más que el problema más difícil en NP\n- Otras:\n  - EXP: resolubles en tiempo exponencial\n  - R: resolubles en tiempo finito\n- [figura, se construye en capas en las diapositivas 18-34: diagrama de Venn de dificultad computacional creciente. Anidamiento: P (polinómico) ⊆ NP (\"no-determinista\" polinómico) ⊆ EXP (computable en tiempo exponencial) ⊆ R (computable en tiempo finito); fuera de R: indecidibles (no computables). Marcadas las zonas NP-completos (frontera superior de NP), EXP-completos (frontera de EXP), NP-duros y EXP-duros (zonas que abarcan los completos y lo que queda por encima). Anotación: \"¿P = NP? Problema del milenio\"]"
   },
   {
    "title": "P: computable en tiempo polinómico",
    "level": 2,
    "md": "- $O(p(n))$, p(n): polinomio (de variable n)\n- Ejemplos: búsqueda, ordenación, multiplicación de matrices, sistemas de ecuaciones lineales, algoritmo de Dijkstra (caminos más cortos), problemas de programación lineal, problemas de optimización convexa"
   },
   {
    "title": "EXP: computable en tiempo exponencial",
    "level": 2,
    "md": "- $O(2^{p(n)})$, p(n): polinomio (de variable n)\n- Ajedrez en tablero general $n\\times n$. Juegan las blancas, ¿ganan?\n  - $\\in$ EXP, $\\notin$ P\n  - $\\in$ EXP-completo: tan difícil como cualquier otro problema $\\in$ EXP\n- Damas, Go (generales)\n- EXP-duro: tan difícil o más que el problema más difícil en EXP"
   },
   {
    "title": "NP: tiempo polinómico no determinista",
    "level": 2,
    "md": "- Nondeterministic polynomial time. NP no significa \"tiempo no polinómico\"\n- NP: problemas de decisión que pueden ser resueltos en tiempo polinómico por un algoritmo no determinista \"con suerte\"\n- NP-completo: los problemas más difíciles de NP\n- NP-duro: tan difícil o más que el problema más difícil de NP"
   },
   {
    "title": "Algoritmo no determinista \"con suerte\"",
    "level": 2,
    "md": "- Toma decisiones aleatorias (adivina). Siempre acierta\n- Si el resultado del problema de decisión es SÍ (o verdadero) las decisiones aleatorias conducen a obtener ese SÍ\n- [figura: árbol de decisiones con varias ramas por nodo; la elección de la rama correcta lleva a la hoja SÍ; las otras hojas son NO]"
   },
   {
    "title": "Ejemplo: búsqueda no determinista",
    "level": 2,
    "md": "```\nAlgoritmo busquedaNoDeterminista(A,n,elemento) # O(1)\n{\n    j = escojeIndice(); # No determinista O(1)\n\n    if(A[j]==elemento)\n    {\n         print(j);\n         exito();\n    }\n    else\n    {\n         print(-1);\n         fracaso();\n    }\n}\n```"
   },
   {
    "title": "Ejemplo de problema en NP (y P)",
    "level": 2,
    "md": "- Problema: ¿es posible encontrar un camino por un laberinto de tamaño $n\\times n$?\n  - Se puede resolver en tiempo polinómico por algoritmo no determinista con suerte, luego el problema $\\in$ NP\n- ¿Se puede resolver también por un algoritmo determinista en tiempo polinómico?\n  - En ese caso el problema $\\in$ P. Recordad: $P\\subseteq NP$\n  - Este problema sí está en P (Dijkstra)"
   },
   {
    "title": "NP: verificación de soluciones",
    "level": 2,
    "md": "- Definición equivalente de clase NP: un problema de decisión $\\in$ NP si se puede verificar, en tiempo polinómico, si una solución conduce a un SÍ\n- Problema del laberinto $n\\times n$: podemos verificar, en tiempo polinómico, que una secuencia de pasos (de longitud $\\le n^2$) es un camino a través del laberinto"
   },
   {
    "title": "Ejemplos de problemas en NP",
    "level": 2,
    "md": "- Tetris: te dan una lista de piezas en orden. ¿Podrías sobrevivir? Claramente se podría resolver en tiempo exponencial\n- Factorización de un entero en producto de números primos. Fundamental en criptografía\n- Problema (de decisión) del viajante de comercio: ¿es posible obtener una solución con valor menor que una cierta cantidad?"
   },
   {
    "title": "Ejemplos de problemas NP-completos",
    "level": 2,
    "md": "- Satisfacibilidad booleana (SAT)\n  - Primer problema demostrado $\\in$ NP-completo (Cook, 1971)\n  - Ejemplo: ¿existen valores booleanos para $x_1,x_2,x_3,x_4$ tal que $(x_1\\lor\\lnot x_3)\\land(\\lnot x_2\\lor x_3\\lor\\lnot x_4)$ sea cierto?\n- 21 problemas NP-completos de Karp (1972)\n- Suma de subconjuntos: dado un conjunto de enteros, ¿existe algún subconjunto cuya suma sea exactamente cero?\n- Problemas de optimización: problema del viajante de comercio, problema de la mochila 0/1"
   },
   {
    "title": "Importancia de conocer problemas NP-completos",
    "level": 2,
    "md": "- Parecen inocentes: a veces se parecen mucho a problemas para los que sí existen algoritmos eficientes\n- Aparecen frecuentemente\n- Soluciones aproximadas: un programador no experimentado puede perder mucho tiempo intentando diseñar un algoritmo eficiente sin éxito. Si demuestras que tu problema es NP-completo (o NP duro) puedes recurrir a soluciones aproximadas"
   },
   {
    "title": "Reducciones",
    "level": 2,
    "md": "- ¿Cómo demostrar que un problema A es NP-completo?\n  1. Demostrar $A\\in NP$\n  2. Demostrar que es NP-duro\n     - Lo más habitual: \"reducir\" un problema NP-completo Q a A\n     - Si Q NP-completo hay que demostrar que A es tan difícil o más que Q\n- Reducción\n  - En general: transformar cada instancia de un problema Q a otra de un problema A\n  - Al resolver A el resultado es el mismo que para Q\n  - [figura: entrada x para Q --T (transformación)--> T(x) entrada para A --> Algoritmo para A --> Sí/No; el conjunto T + algoritmo para A forma el \"Algoritmo para Q\"]\n  - Cada problema NP-completo se puede reducir a los demás"
   },
   {
    "title": "Reducciones como técnica de diseño de algoritmos",
    "level": 2,
    "md": "- \"Transforma y vencerás\": ¿se puede transformar un problema en otro que sepamos resolver eficientemente?\n- Ejemplos\n  - Camino más corto por grafo no ponderado: camino más corto por grafo ponderado (p.e., algoritmo de Dijkstra), dando el mismo peso a todas las aristas\n  - Camino más corto considerando productos de pesos: aplicar logaritmos a los pesos\n  - Camino más largo: multiplicar los pesos por $-1$"
   },
   {
    "title": "Conjetura ¿P = NP?",
    "level": 2,
    "md": "- Uno de los problemas matemáticos del milenio no resuelto\n  - $1.000.000 (Clay Mathematics Institute). Poca cantidad\n  - Si existiera (se encontrara) un algoritmo polinómico para resolver un problema NP-completo, entonces P = NP\n- Opinión mayoritaria: $P\\ne NP$\n- $P\\ne NP$ equivale a:\n  - No puedes implementar la \"suerte\" al adivinar\n  - Hay problemas para los que obtener una solución es más difícil que verificarla"
   },
   {
    "title": "R: computable en tiempo finito",
    "level": 2,
    "md": "- [figura: diagrama completo de clases (ver arriba): P ⊆ NP ⊆ EXP ⊆ R; indecidibles (no computables) fuera de R; ¿P = NP? problema del milenio]\n- R = \"recursivo\" (no en el sentido de función recursiva que se llama a sí misma)\n- Problemas no computables = indecidibles = no \"recursivos\"\n  - No existen algoritmos que los resuelvan\n  - Ejemplo más conocido: problema de la parada. Determinar si cualquier programa va a parar en tiempo finito"
   },
   {
    "title": "Problema de la parada",
    "level": 2,
    "md": "```python\ndef Termina(p, x): # p es un programa , x sus entradas\n    # Supongamos que resuelve el problema de la parada\n    # Devuelve True si p(x) termina , y False en otro caso\n\ndef d(w): # w es un programa\n    if Termina(w, w):\n        while True: pass # Bucle infinito\n```\n- d(w) termina $\\Leftrightarrow$ w(w) nunca termina\n```python\nd(d):\n    if Termina(d, d):\n        while True: pass\n```\n- d(d) termina $\\Leftrightarrow$ d(d) nunca termina. Contradicción\n\n# 3. Problemas de optimización"
   },
   {
    "title": "Problemas matemáticos de optimización",
    "level": 2,
    "md": "- Importante clase de problemas computacionales\n- Maximizar/minimizar una función objetivo\n  - Encontrar las variables (\"parámetros\") donde una función toma su mayor/menor valor\n  - Las variables deben satisfacer restricciones que definen la región factible donde se encontrará la solución\n- [figura: dos gráficas de ejemplo, una función de 2 variables con curvas de nivel y región factible, y una función de 1 variable (eje y de -5 a 15, x de -2 a 4)]"
   },
   {
    "title": "Ejemplo: problema de la mochila 0/1",
    "level": 2,
    "md": "- Considérese un conjunto de n objetos, cada uno con un peso $p_i$ y un valor $v_i$, para $i=1,\\dots,n$, y una mochila con capacidad C, que es el máximo peso que puede soportar la mochila\n- Seleccionar el subconjunto de objetos que puedan introducirse en la mochila, sin sobrepasar la capacidad C, tal que la suma de sus valores sea máxima"
   },
   {
    "title": "Notación matemática",
    "level": 2,
    "md": "$$\\underset{x}{\\text{minimiza}}\\ f_0(x)\\quad \\text{sujeto a}\\ f_i(x)\\le b_i,\\ i=1,\\dots,m$$\n- $f_0$ es la función objetivo\n- x representa varias variables (no tiene por qué ser un escalar)\n- $f_i(x)\\le b_i$, $i=1\\dots m$ son las restricciones\n- El propósito es hallar los valores de x que optimicen la función\n- Un problema de maximización se puede convertir fácilmente a uno de minimización cambiando el signo de $f_0$"
   },
   {
    "title": "Ejemplo: problema de la mochila 0/1 (formulación)",
    "level": 2,
    "md": "$$\\underset{x}{\\text{maximiza}}\\ \\sum_{i=1}^{n}x_iv_i\\quad \\text{sujeto a}\\ x_i\\in\\{0,1\\},\\ i=1,\\dots,n;\\quad \\sum_{i=1}^{n}x_ip_i\\le C$$\n- Las variables $x_i$ determinan si se introduce el objeto i en la mochila (x es un vector)\n- C, $p_i$, $v_i$ son datos del problema (indican una instancia concreta)\n- Es un problema NP-completo"
   },
   {
    "title": "Problemas lineales",
    "level": 2,
    "md": "- $f_0,\\dots,f_m$ son funciones lineales: $f_i(\\alpha x_1+\\beta x_2)=\\alpha f_i(x_1)+\\beta f_i(x_2)$, $\\forall x_1,x_2\\in\\mathbb{R}^n$, $\\forall\\alpha,\\beta\\in\\mathbb{R}$\n- No lineal, si no cumple lo anterior\n- Los problemas lineales suelen llamarse \"problemas de programación lineal\"\n- Son estudiados en profundidad por la Investigación Operativa"
   },
   {
    "title": "Problemas lineales: interpretación geométrica",
    "level": 2,
    "md": "- Función objetivo: hiperplano\n- Restricciones: también hiperplanos. Definen una región factible (donde debe estar la solución)\n- [figura: en 2D (ejes X1, X2), polígono convexo gris \"Región factible\" con rectas paralelas de nivel de la función objetivo; el \"Óptimo\" es el vértice más extremo en la dirección de mejora (flecha). En 3D (ejes X1, X2, Z), el mismo caso con la función objetivo como plano y el óptimo en un vértice]"
   },
   {
    "title": "Problemas lineales: algoritmo Simplex",
    "level": 2,
    "md": "- Parte de un punto inicial: vértice de región factible (poliedro convexo)\n- Avanza por aristas hasta un vértice mejor, hasta encontrar el óptimo\n- Hay otros algoritmos para resolver problemas lineales\n- [figura: poliedro con camino por aristas desde \"Punto inicial\" hasta \"Óptimo\"]"
   },
   {
    "title": "Problemas convexos",
    "level": 2,
    "md": "- $f_0,\\dots,f_m$ son funciones convexas: $f_i(\\alpha x_1+\\beta x_2)\\le\\alpha f_i(x_1)+\\beta f_i(x_2)$, $\\forall x_1,x_2\\in\\mathbb{R}^n$, $\\forall\\alpha,\\beta\\in[0,1]$, donde $\\alpha+\\beta=1$\n- Las restricciones definen un conjunto convexo\n- No convexo, si no cumple lo anterior\n- Los problemas lineales son convexos\n- Se pueden resolver en tiempo polinómico"
   },
   {
    "title": "Conjuntos convexos",
    "level": 2,
    "md": "- Cualquier segmento entre dos puntos del conjunto debe estar completamente contenido en el conjunto\n- [figura: ejemplos de conjuntos convexos y de conjuntos no convexos]"
   },
   {
    "title": "Funciones convexas",
    "level": 2,
    "md": "- [figura: curva convexa de una variable; el segmento (cuerda) entre $(x_1,f(x_1))$ y $(x_2,f(x_2))$ queda por encima de la curva; en $\\alpha x_1+\\beta x_2$ la curva vale $f(\\alpha x_1+\\beta x_2)$ y la cuerda $\\alpha f(x_1)+\\beta f(x_2)$]\n- $f_i(\\alpha x_1+\\beta x_2)\\le\\alpha f_i(x_1)+\\beta f_i(x_2)$\n- [figura: superficie convexa en 3D (valores 0 a 50, un único mínimo)]"
   },
   {
    "title": "Funciones no convexas",
    "level": 2,
    "md": "- [figura: superficies 3D con varios mínimos/máximos locales]\n- Pueden tener múltiples óptimos locales\n- Si el dominio es discreto no tiene sentido hablar de una función convexa\n- No siempre se pueden resolver en tiempo polinómico\n- Para \"resolverlos\" se recurre a heurísticas, pero no garantizan llegar al óptimo global\n  - Búsqueda aleatoria\n  - Algoritmos genéticos\n- Teorema \"no hay comida gratis\": ninguna heurística es mejor que todas en general"
   },
   {
    "title": "Descenso/ascenso de gradiente",
    "level": 2,
    "md": "- Gradiente: vector de derivadas parciales de una función\n- Indica la dirección de mayor pendiente en un punto\n- Algoritmo iterativo que asciende o desciende poco a poco hasta llegar a un óptimo\n- [figura: curvas de nivel en el plano $(x_1,x_2)$ y superficie $f(x)$ (0 a 600) con la trayectoria del descenso]"
   },
   {
    "title": "Pseudocódigo",
    "level": 3,
    "md": "```\nfunction AlgoritmoDescensoGradiente()\n    x ← x0                      ▷ Aproximación inicial\n    g ← calculaGradiente(x)     ▷ Gradiente en x\n    while ||g|| > ε do          ▷ Iterar hasta que el módulo del gradiente sea muy pequeño\n        x ← x − α · g           ▷ Actualizar aproximación en dirección del gradiente\n        g ← calculaGradiente(x) ▷ Actualizar gradiente\n    return x                    ▷ Devolver aproximación final\n```\n- Hay muchos más algoritmos (y mejores)\n- Puede no converger o ser muy lento\n\n# 4. Introducción a problemas en Inteligencia Artificial, Aprendizaje Automático y Ciencia de Datos"
   },
   {
    "title": "Predicción - Regresión",
    "level": 2,
    "md": "- Predices un valor real\n- Generas un modelo matemático que se ajuste a los datos lo mejor posible\n  - ¿Qué tipo de modelo? ¿Mejor posible en qué sentido?\n- [figura: dos gráficas de dispersión con curva de ajuste (ejemplo con eje x de 600 a 1800 y eje y de 0 a 300; otro con x de 0 a 6 e y de 0 a 1500)]"
   },
   {
    "title": "Predicción - Clasificación",
    "level": 2,
    "md": "- Predices una clase (categoría)\n- Generas un modelo matemático que defina fronteras entre las clases en el espacio de los datos, para separar las clases lo mejor posible\n  - ¿Qué tipo de modelo y fronteras? ¿Mejor posible en qué sentido?\n- [figura: tres gráficas 2D (x de -5 a 5, y de -4 a 4) con distintas fronteras entre clases]"
   },
   {
    "title": "Predicción",
    "level": 2,
    "md": "- Para estos \"problemas\" no hay una solución \"correcta\"\n  - Los modelos se crean con unos datos disponibles (de entrenamiento)\n  - El rendimiento a la hora de predecir depende de nuevos datos (de test)\n- No se conoce la relación entre entradas y salidas completamente\n  - No podemos hablar de un \"problema computacional\"\n  - Especificarla (matemática o lógicamente) suele ser complicadísimo\n  - No podremos elaborar un algoritmo"
   },
   {
    "title": "Aprendizaje automático",
    "level": 2,
    "md": "- Construir algoritmos a través de ejemplos\n  - Caso concreto: reconocimiento de dígitos escritos a mano: base de datos MNIST\n- [figura: muestra de dígitos MNIST]\n- Dígitos difíciles: [figura: ejemplos de dígitos manuscritos ambiguos]"
   },
   {
    "title": "Técnicas: problemas computacionales concretos",
    "level": 2,
    "md": "- Enfoque 1: K vecinos más cercanos, K-NN (K-nearest neighbors). [figura: punto a clasificar \"¿?\" con K=7 vecinos]\n- Enfoque 2: máquinas de vectores soporte, SVM (support vector machines). [figura: frontera de máximo margen entre dos clases]\n- Hay muchos más enfoques"
   },
   {
    "title": "Clustering - agrupamiento",
    "level": 2,
    "md": "- La única información con la que contamos es la posición de los puntos (no hay información sobre clases)\n- Queremos encontrar una agrupación o partición \"razonable\"\n- [figura: nube de puntos en 3D]"
   },
   {
    "title": "Posibles agrupaciones",
    "level": 2,
    "md": "- [figura: la misma nube de puntos 3D con dos agrupaciones posibles distintas]\n- ¿Cuál es la agrupación correcta? No se sabe...\n  - La tarea no está claramente definida\n  - Aunque existen medidas de bondad para evaluar la calidad de una agrupación"
   },
   {
    "title": "Tareas - Problemas - Algoritmos",
    "level": 2,
    "md": "- Existen \"tareas\" generales en ciencias e ingenierías que no se pueden definir como problemas computacionales\n- Para abordarlas se plantean problemas computacionales concretos\n- Los problemas computacionales se resuelven mediante algoritmos\n- Jerarquía: Tarea -> Problema 1, 2, 3 -> cada problema con varios algoritmos (Alg 11, 12, 13; Alg 21, 22, 23; Alg 31, 32, 33)"
   },
   {
    "title": "Tareas - Problemas - Algoritmos: Clasificación",
    "level": 2,
    "md": "- Tarea Clasificación -> problemas K-NN y SVM\n  - K-NN -> algoritmo básico, algoritmo Árboles KD\n  - SVM -> algoritmo SMO, algoritmo sub-gradientes\n- Hay numerosos problemas y algoritmos alternativos\n- Actualmente las redes neuronales artificiales profundas (deep learning) ofrecen el mejor rendimiento en muchas tareas"
   }
  ]
 },
 {
  "id": "t2.1_prelim_matematicos",
  "title": "Tema 2.1 Preliminares matemáticos",
  "sections": [
   {
    "title": "Tema 2.1 Preliminares matemáticos",
    "level": 2,
    "md": "Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.\nContenido: 1 Fundamentos; 2 Sumatorios (propiedades básicas, progresiones aritméticas, sumatorios de potencias, progresiones geométricas y variantes, aproximación por integrales); 3 Productos (propiedades básicas).\n\n# Fundamentos"
   },
   {
    "title": "Propiedades de potencias",
    "level": 2,
    "md": "- $b^1=b$\n- $b^0=1$\n- $b^{-x}=1/b^x$\n- $b^x b^y=b^{x+y}$\n- $(ab)^x=a^x b^x$\n- $(b^x)^y=b^{xy}=(b^y)^x$"
   },
   {
    "title": "Propiedades de logaritmos",
    "level": 2,
    "md": "- Definición: $\\log_b x=y \\Rightarrow b^y=x$, con $b>0$, $b\\neq1$, $x>0$\n- $\\log_b b=1$\n- $\\log_b 1=0$\n- $\\log_b(x^y)=y\\log_b x$\n- $\\log_b(b^x)=x$\n- $b^{\\log_b a}=a$\n- $\\log_b(xy)=\\log_b x+\\log_b y$\n- $\\log_b(x/y)=\\log_b x-\\log_b y$\n- $\\log_b x=\\log_a x/\\log_a b$\n- $x^{\\log_b y}=y^{\\log_b x}$\n- $\\log_b a=1/\\log_a b$"
   },
   {
    "title": "Coeficientes binomiales",
    "level": 2,
    "md": "$\\binom{n}{m}$, con $n\\ge m\\ge0$, se puede definir de varias formas:\n- $\\binom{n}{m}=1$ si $m=0$ o $n=m$; $\\frac{n!}{m!(n-m)!}$ en otro caso\n- $\\binom{n}{m}=1$ si $m=0$ o $n=m$; $\\binom{n-1}{m-1}+\\binom{n-1}{m}$ en otro caso\n- Son enteros que aparecen en la expansión de $(1+x)^n$\n- Son el número de combinaciones de $n$ elementos tomados de $m$ en $m$ (las formas de escoger $m$ elementos de entre $n$, donde el orden no importa)"
   },
   {
    "title": "Vectores",
    "level": 2,
    "md": "- $\\mathbf{x}=(x_1,\\dots,x_n)$, vector columna\n- $\\mathbf{x}\\in\\mathbb{R}^n$, $\\mathbf{x}\\in\\mathbb{C}^n$\n- $\\mathbf{0}=(0,0,\\dots,0)$\n- $\\mathbf{e}_j=(0,\\dots,\\underset{j}{1},\\dots,0)$\n- \"vector\" se puede usar en términos más generales para denotar un elemento de un espacio vectorial (por ejemplo, un vector podría ser un polinomio)"
   },
   {
    "title": "Matrices",
    "level": 2,
    "md": "- Matriz cero ($\\mathbf{0}$), matriz identidad ($\\mathbf{I}$), matriz diagonal, matriz triangular superior/inferior, matriz permutación\n- Rango: $rg(\\mathbf{A})$, número de columnas o filas linealmente independientes de $\\mathbf{A}$\n- Traza: $tr(\\mathbf{A})=\\sum_{i=1}^{n}a_{i,i}$, donde $\\mathbf{A}\\in\\mathbb{R}^{n\\times n}$\n- Determinante ($|\\mathbf{A}|$ o $\\det(\\mathbf{A})$): $|\\mathbf{ABC}|=|\\mathbf{BCA}|=|\\mathbf{CAB}|$\n- Matriz traspuesta ($\\mathbf{A}^T$): $(\\mathbf{ABC})^T=\\mathbf{C}^T\\mathbf{B}^T\\mathbf{A}^T$\n- Matriz simétrica: $\\mathbf{A}=\\mathbf{A}^T$\n- Matriz inversa: $\\mathbf{A}^{-1}$, con $\\mathbf{A}$ cuadrada, donde $rg(\\mathbf{A})=n$, $|\\mathbf{A}|\\neq0$\n- Matriz ortogonal: $\\mathbf{Q}^T\\mathbf{Q}=\\mathbf{Q}\\mathbf{Q}^T=\\mathbf{I}$, con $|\\det(\\mathbf{Q})|=1$\n- Autovalores ($\\lambda$) y autovectores ($\\mathbf{v}$): $\\mathbf{Av}=\\lambda\\mathbf{v}$, con $\\mathbf{v}\\neq\\mathbf{0}$\n  - Los autovalores son las raíces del polinomio característico $\\det(\\mathbf{A}-\\lambda\\mathbf{I})=0$"
   },
   {
    "title": "Matrices - descomposiciones",
    "level": 2,
    "md": "- LU: $\\mathbf{A}=\\mathbf{PLU}$, con $\\mathbf{P}$ matriz permutación, $\\mathbf{L}$ triangular inferior y $\\mathbf{U}$ triangular superior\n- QR: $\\mathbf{A}=\\mathbf{QR}$, con $\\mathbf{Q}$ ortogonal y $\\mathbf{R}$ triangular superior\n- Descomposición de autovalores: $\\mathbf{A}=\\mathbf{V}\\Lambda\\mathbf{V}^T$, con $\\mathbf{A}$ cuadrada e invertible, $\\mathbf{V}$ es la matriz cuyas columnas son los autovectores de $\\mathbf{A}$ y $\\Lambda$ es la matriz diagonal con los correspondientes autovalores\n- Descomposición de valores singulares: $\\mathbf{A}=\\mathbf{U}\\Sigma\\mathbf{V}^T$, con $\\mathbf{U}$ y $\\mathbf{V}$ ortogonales y $\\Sigma$ diagonal"
   },
   {
    "title": "Derivadas",
    "level": 2,
    "md": "| Función | Derivada |\n|---|---|\n| $f(x)=k$ | $f'(x)=0$ |\n| $f(x)=x$ | $f'(x)=1$ |\n| $f(x)=x^n$ | $f'(x)=n\\cdot x^{n-1}$ |\n| $f(x)=a^{g(x)}$ | $f'(x)=g'(x)\\cdot a^{g(x)}\\cdot\\ln(a)$ |\n| $f(x)=\\log_a(g(x))$ | $f'(x)=\\frac{g'(x)}{g(x)\\cdot\\ln(a)}$ |\n| $f(x)=ag(x)$ | $f'(x)=ag'(x)$ |\n| $f(x)=g(x)+h(x)$ | $f'(x)=g'(x)+h'(x)$ |\n| $f(x)=g(x)\\cdot h(x)$ | $f'(x)=g'(x)\\cdot h(x)+g(x)\\cdot h'(x)$ |\n| $f(x)=\\frac{g(x)}{h(x)}$ | $f'(x)=\\frac{g'(x)\\cdot h(x)-g(x)\\cdot h'(x)}{(h(x))^2}$ |\n| $f(x)=g(h(x))$ | $f'(x)=g'(h(x))\\cdot h'(x)$ |"
   },
   {
    "title": "Derivadas de varias variables",
    "level": 2,
    "md": "- $f(x_1,x_2,\\dots,x_n)$, $f(\\mathbf{x})$. Símbolos en negrita: vectores y matrices (habitualmente)\n- Gradiente: vector de derivadas parciales: $\\nabla f(x_1,\\dots,x_n)=\\nabla f(\\mathbf{x})=\\frac{\\partial f}{\\partial\\mathbf{x}}=\\left(\\frac{\\partial f}{\\partial x_1},\\frac{\\partial f}{\\partial x_2},\\dots,\\frac{\\partial f}{\\partial x_n}\\right)$\n- Fórmulas útiles: $\\frac{\\partial\\mathbf{x}^T\\mathbf{a}}{\\partial\\mathbf{x}}=\\frac{\\partial\\mathbf{a}^T\\mathbf{x}}{\\partial\\mathbf{x}}=\\mathbf{a}$; $\\frac{\\partial\\mathbf{x}^T\\mathbf{Bx}}{\\partial\\mathbf{x}}=(\\mathbf{B}+\\mathbf{B}^T)\\mathbf{x}$\n- Matriz Hessiana: matriz de derivadas parciales de segundo orden: $\\nabla^2 f(\\mathbf{x})$ es la matriz $n\\times n$ con elemento $(i,j)$ igual a $\\frac{\\partial^2 f(\\mathbf{x})}{\\partial x_i\\partial x_j}$ (diagonal: $\\frac{\\partial^2 f(\\mathbf{x})}{\\partial x_i^2}$)"
   },
   {
    "title": "Límites y la regla de L'Hopital",
    "level": 2,
    "md": "- $\\lim_{n\\to\\infty}\\frac{k}{n}=0$\n- $\\lim_{n\\to\\infty}\\frac{n}{k}=\\infty$\n- $\\lim_{n\\to\\infty}\\log_b n=\\infty$, si $b>1$\n- $\\lim_{n\\to\\infty}n^a=\\infty$, si $a>0$\n- Regla de L'Hopital: $\\lim_{n\\to\\infty}\\frac{f(n)}{g(n)}=\\lim_{n\\to\\infty}\\frac{f'(n)}{g'(n)}$\n  - Tiene que existir el segundo límite (suele existir)\n- Indeterminaciones: $1^\\infty$, $0^0$, $\\infty^0$, $0/0$, $\\infty/\\infty$, $\\infty^0$, $+\\infty-\\infty$ (tal cual aparece en la diapositiva)"
   },
   {
    "title": "Integrales",
    "level": 2,
    "md": "- Asumiendo $f(x)=F'(x)$ (en un intervalo $[a,b]$): $\\int f(x)\\,dx=F(x)+C$; $\\int_a^b f(x)\\,dx=F(b)-F(a)$\n- Técnicas de integración comunes: cambio de variable (sustitución; sustitución trigonométrica); descomposición en fracciones simples; integración por partes: $\\int u\\,dv=uv-\\int v\\,du$"
   },
   {
    "title": "Integrales - Algunos ejemplos",
    "level": 2,
    "md": "- $\\int dx=x$\n- $\\int x^n dx=\\frac{x^{n+1}}{n+1}$\n- $\\int\\frac{1}{x}dx=\\ln(x)$\n- $\\int a^x dx=\\frac{a^x}{\\ln(a)}$\n- $\\int(f(x)+g(x))dx=\\int f(x)dx+\\int g(x)dx$\n- $\\int af(x)dx=a\\int f(x)dx$"
   },
   {
    "title": "Geometría",
    "level": 2,
    "md": "- Producto escalar: $\\vec a\\cdot\\vec b=\\langle a,b\\rangle=\\mathbf{a}^T\\mathbf{b}=\\sum_{i=1}^{n}a_ib_i=|a|\\cdot|b|\\cdot\\cos(\\alpha)$\n- Módulo o norma Euclídea: $|a|=\\|a\\|_2=\\sqrt{a_1^2+\\cdots+a_n^2}=\\sqrt{\\mathbf{a}^T\\mathbf{a}}$\n- Otras normas: $\\|a\\|_1=|a_1|+|a_2|+\\cdots+|a_n|$; $\\|a\\|_\\infty=\\max_{i=1,\\dots,n}\\{a_1,a_2,\\dots,a_n\\}$\n- Matriz de rotación: $\\mathbf{R}=\\begin{pmatrix}\\cos t&-\\sin t\\\\\\sin t&\\cos t\\end{pmatrix}$\n- El vector $\\mathbf{R}\\cdot\\mathbf{u}$ corresponde al vector $\\mathbf{u}$ rotado $t$ radianes en sentido contrario a las agujas del reloj\n- [figura: vector u y Ru formando ángulo t]\n\n# Sumatorios"
   },
   {
    "title": "Notación básica",
    "level": 2,
    "md": "- Definición: $\\sum_{i=m}^{n}f(i)=f(m)+f(m+1)+\\cdots+f(n-1)+f(n)$\n- No depende de la variable contadora: $\\sum_{i=m}^{n}f(i)=\\sum_{j=m}^{n}f(j)$\n- Suma en sentido contrario: $\\sum_{i=m}^{n}f(i)=\\sum_{i=m}^{n}f(n+m-i)$"
   },
   {
    "title": "Propiedades básicas",
    "level": 2,
    "md": "- $\\sum_{i=1}^{n}1=\\underbrace{1+1+\\cdots+1+1}_{n\\text{ veces}}=n$\n- $\\sum_{i=1}^{n}k=\\underbrace{k+k+\\cdots+k+k}_{n\\text{ veces}}=kn$\n- $\\sum_{i=m}^{n}k=\\underbrace{k+k+\\cdots+k+k}_{n-m+1\\text{ veces}}=k(n-m+1)$\n- Operador lineal: $\\sum_{i=m}^{n}(f(i)+g(i))=\\sum_{i=m}^{n}f(i)+\\sum_{i=m}^{n}g(i)$; $\\sum_{i=m}^{n}kf(i)=k\\sum_{i=m}^{n}f(i)$ (factor común)\n- Convención: $\\sum_{i=m}^{n}f(i)=0$ si $m>n$"
   },
   {
    "title": "Suma de los primeros n naturales",
    "level": 2,
    "md": "$S(n)=\\sum_{i=1}^{n}i=1+2+\\cdots+(n-1)+n=\\frac{n(n+1)}{2}$\n\nDemostración:\n```\n  S(n) =   1     +   2     + ... + (n-1) +   n\n+ S(n) =   n     + (n-1)   + ... +   2     +   1\n 2S(n) = (n+1)   + (n+1)   + ... + (n+1)   + (n+1)\n```\n$2S(n)=n(n+1)\\Rightarrow S(n)=\\frac{n(n+1)}{2}$\n\nDemostración visual: [figura: dos escaleras de $S(n)$ unidas forman un rectángulo de $n\\times(n+1)$, $2S(n)=n(n+1)$]"
   },
   {
    "title": "Suma de los primeros n impares",
    "level": 2,
    "md": "$S(n)=\\sum_{i=1}^{n}(2i-1)=1+3+\\cdots+(2n-3)+(2n-1)=n^2$\n\nDemostración: $\\sum_{i=1}^{n}(2i-1)=\\sum_{i=1}^{n}2i-\\sum_{i=1}^{n}1=2\\sum_{i=1}^{n}i-n=2\\frac{n(n+1)}{2}-n=n^2+n-n=n^2$\n\nDemostración visual: [figura: $S(n)$ como cuadrado $n\\times n$ formado por L's de impares] $\\Rightarrow S(n)=n^2$\n\nDemostración visual alternativa: [figura: dos copias de $S(n)$ forman rectángulo $2n\\times n$; cada fila $2n-1+1=2n$] $2S(n)=2n\\cdot n\\Rightarrow S(n)=n^2$\n\nAnálogamente:\n```\n  S(n) =   1     +   3     + ... + (2n-3) + (2n-1)\n+ S(n) = (2n-1)  + (2n-3)  + ... +   3     +   1\n 2S(n) =  2n     +  2n     + ... +  2n     +  2n\n```\n$2S(n)=2n(n)\\Rightarrow S(n)=n^2$"
   },
   {
    "title": "Sumas parciales de series aritméticas",
    "level": 2,
    "md": "- Progresión aritmética: $a_i=a_{i-1}+d$\n  - $a_i=a_{i-1}+d=a_{i-2}+2d=\\cdots=a_0+id$\n  - $a_{m+k}+a_{n-k}=a_m+a_n$\n- Fórmula general: $S(m,n)=\\sum_{i=m}^{n}a_i=\\frac12(a_m+a_n)(n-m+1)$\n\nDemostración:\n```\n  S(m,n) =   a_m     +  a_{m+1}  + ... + a_{n-1} +  a_n\n+ S(m,n) =   a_n     +  a_{n-1}  + ... + a_{m+1} +  a_m\n 2S(m,n) = (a_m+a_n) + (a_m+a_n) + ... + (a_m+a_n) + (a_m+a_n)\n```\n$2S(m,n)=(a_m+a_n)(n-m+1)\\Rightarrow S(m,n)=\\frac12(a_m+a_n)(n-m+1)$"
   },
   {
    "title": "Suma de los primeros n cuadrados",
    "level": 2,
    "md": "$S(n)=\\sum_{i=1}^{n}i^2=1^2+2^2+\\cdots+(n-1)^2+n^2=\\frac{(2n+1)n(n+1)}{6}$\n- $\\sum_{i=1}^{n}i$ (suma naturales) y $\\sum_{i=1}^{n}(2i-1)$ (suma impares) son sumas parciales de progresiones aritméticas\n- $\\sum_{i=1}^{n}i^2$ no es una suma parcial de una progresión aritmética (ni geométrica)\n- Sumas del tipo $\\sum_{i=1}^{n}i^p$ son importantes ya que aparecen en análisis de algoritmos, tanto iterativos como recursivos"
   },
   {
    "title": "Suma de los primeros n cuadrados: demostración 1",
    "level": 2,
    "md": "$\\sum_{i=1}^{n}i^2=1^2+2^2+3^2+\\cdots+n^2=\\frac{n(2n+1)(n+1)}{6}$\n\nDemostración 1 (descomponemos los cuadrados en sumas de impares): $S(n)=1+4+9+16+\\cdots+n^2$\n```\n1 + 1 + 1 + 1 + ... + 1      = 1(n)\n    + 3 + 3 + 3 + ... + 3    = 3(n-1)\n        + 5 + 5 + ... + 5    = 5(n-2)\n            + 7 + ... + 7    = 7(n-3)\n                  ...  ...\n                  + 2n-1     = (2n-1)1\n```\nSumamos los términos de la última columna:\n$S(n)=\\sum_{i=1}^{n}i^2=1\\cdot n+3\\cdot(n-1)+5\\cdot(n-2)+\\cdots+(2n-1)\\cdot1$\n$=\\sum_{i=1}^{n}(2i-1)(n-i+1)=\\sum_{i=1}^{n}(2in-2i^2+2i-n+i-1)$\n$=\\sum_{i=1}^{n}(2n+3)i-2\\underbrace{\\sum_{i=1}^{n}i^2}_{S(n)}-\\sum_{i=1}^{n}n-\\sum_{i=1}^{n}1$\n$=(2n+3)\\sum_{i=1}^{n}i-2S(n)-n^2-n$\n\nContinuando:\n$S(n)=\\frac{(2n+3)n(n+1)}{2}-2S(n)-n^2-n$\n$3S(n)=\\frac{(2n+3)n(n+1)}{2}-n^2-n$\n$S(n)=\\frac{n(2n^2+3n+1)}{6}=\\frac{n\\cdot2(n+\\frac12)(n+1)}{6}$\n$S(n)=\\frac{n(2n+1)(n+1)}{6}$"
   },
   {
    "title": "Suma de los primeros n cuadrados: demostración visual",
    "level": 2,
    "md": "Usaremos esta descomposición de la suma de cuadrados: [figura: cuadrados de lado 1, 2, 3, 4, ... con áreas 1, 4, 9, 16, ..., suma $S(n)$; cada cuadrado coloreado por capas]\n\nDemostración visual: [figura: tres copias de $S(n)$ se combinan en un rectángulo de lados $(2n+1)$ y $\\frac{n(n+1)}{2}=1+2+3+\\cdots+n$]\n$3S(n)=(2n+1)\\frac{n(n+1)}{2}\\Rightarrow S(n)=\\frac{n(2n+1)(n+1)}{6}$"
   },
   {
    "title": "Suma de los primeros n cubos",
    "level": 2,
    "md": "$S(n)=\\sum_{i=1}^{n}i^3=\\left(\\sum_{i=1}^{n}i\\right)^2=\\left(\\frac{n(n+1)}{2}\\right)^2$\n\nSe puede ver gracias a:\n- $1^3=1=1^2=(1)^2$\n- $1^3+2^3=9=3^2=(1+2)^2$\n- $1^3+2^3+3^3=36=6^2=(1+2+3)^2$\n- $1^3+2^3+3^3+4^3=100=10^2=(1+2+3+4)^2$\n\nDemostración visual: [figura: cuadrado de lado $2(1+2+\\cdots+n)$ (tramos $\\ldots,3,2,1,1,2,3,\\ldots$) dividido en marcos concéntricos de $k$ cuadrados]\n- Marcos: $4\\cdot1^2=4\\cdot1^3$; $8\\cdot2^2=4\\cdot2^3$; $12\\cdot3^2=4\\cdot3^3$; $\\vdots$; $4n\\cdot n^2=4\\cdot n^3$\n- Área total $=\\left[2(1+2+3+\\cdots+n)\\right]^2=4\\cdot S(n)$\n- $S(n)=1^3+2^3+3^3+\\cdots+n^3=(1+2+3+\\cdots+n)^2=\\left(\\frac{n(n+1)}{2}\\right)^2$"
   },
   {
    "title": "Sumatorios telescópicos",
    "level": 2,
    "md": "$S(n)=\\sum_{i=1}^{n}(a_i-a_{i-1})=a_n-a_0$\n\nDemostración: $S(n)=-a_0+\\underbrace{a_1-a_1}_{0}+\\underbrace{a_2-a_2}_{0}\\cdots+\\underbrace{a_{n-1}-a_{n-1}}_{0}+a_n=a_n-a_0$\n\nEjemplo:\n$\\sum_{i=1}^{n-1}\\frac{1}{i(i+1)}=\\sum_{i=1}^{n-1}\\left(\\frac1i-\\frac1{i+1}\\right)=\\frac11-\\frac12+\\frac12-\\frac13+\\cdots+\\frac1{n-1}-\\frac1n=1-\\frac1n$\n\nHemos hecho: $a_i=-1/(i+1)$\n$\\sum_{i=1}^{n-1}\\frac{1}{i(i+1)}=\\sum_{i=1}^{n-1}\\left(\\left(-\\frac{1}{i+1}\\right)-\\left(-\\frac1i\\right)\\right)=-\\frac1n-(-1)=1-\\frac1n$"
   },
   {
    "title": "Suma de las primeras n potencias",
    "level": 2,
    "md": "Método general para hallar $S_p=\\sum_{i=1}^{n}i^p$\n- Es necesario conocer $\\sum_{i=1}^{n}i^k$ para $k<p$\n- Ejemplo: $S_3=\\sum_{i=1}^{n}i^3$. Necesitamos:\n  - $S_0=\\sum_{i=1}^{n}i^0=n$\n  - $S_1=\\sum_{i=1}^{n}i^1=\\frac{n(n+1)}{2}$\n  - $S_2=\\sum_{i=1}^{n}i^2=\\frac{(2n+1)n(n+1)}{6}$\n\nSe plantea el sumatorio telescópico: $S=\\sum_{i=1}^{n}\\left((i+1)^{p+1}-i^{p+1}\\right)$\n- En el ejemplo ($p=3$): $S=\\sum_{i=1}^{n}\\left((i+1)^4-i^4\\right)$\n- Al ser telescópico: $S=\\sum_{i=1}^{n}\\left((i+1)^4-i^4\\right)=(n+1)^4-1^4$\n- y desarrollando: $S=\\sum_{i=1}^{n}\\left(i^4+4i^3+6i^2+4i+1-i^4\\right)=\\sum_{i=1}^{n}(4i^3+6i^2+4i+1)=4S_3+6S_2+4S_1+S_0$\n\nIgualando ambas expresiones: $(n+1)^4-1^4=4S_3+6S_2+4S_1+S_0$\n$4S_3=(n+1)^4-1-6S_2-4S_1-S_0$\n\nDesarrollando y sustituyendo $S_0$, $S_1$ y $S_2$:\n$4S_3=n^4+4n^3+6n^2+4n+1-1-2n^3-3n^2-n-2n^2-2n-n$\n$4S_3=n^4+2n^3+n^2$\n$S_3=\\frac{n^4+2n^3+n^2}{4}=\\left(\\frac{n(n+1)}{2}\\right)^2=(1+2+\\cdots+n)^2$"
   },
   {
    "title": "Ejercicio",
    "level": 2,
    "md": "Contar el número de cajas para una pirámide de altura $n$ [figura: pirámide escalonada de cubos descompuesta en capas triangulares de 1, 3, 6, 10, ... cajas]"
   },
   {
    "title": "Solución",
    "level": 2,
    "md": "$S(n)=1+(1+2)+(1+2+3)+\\cdots+(1+2+3+\\cdots+n)$\n- Agrupando los términos en cada paréntesis: $S(n)=\\sum_{i=1}^{n}\\sum_{j=1}^{i}j=\\sum_{i=1}^{n}\\frac{i(i+1)}{2}=\\frac12\\sum_{i=1}^{n}i^2+\\frac12\\sum_{i=1}^{n}i$\n- Agrupando según el número de veces que se suma un determinado entero: $S(n)=\\sum_{i=1}^{n}i(n-i+1)=n\\sum_{i=1}^{n}i-\\sum_{i=1}^{n}i^2+\\sum_{i=1}^{n}i$\n- La solución es: $S(n)=\\frac{n(n+1)(n+2)}{6}$"
   },
   {
    "title": "Sumas parciales de series geométricas",
    "level": 2,
    "md": "- Progresión geométrica (la diapositiva dice \"aritmética\"): $a_i=a_{i-1}\\cdot r$\n  - $a_i=a_{i-1}r=a_{i-2}r^2=\\cdots=a_0r^i$\n- Fórmula general: $S(n)=\\sum_{i=m}^{n}a_i=a_0\\sum_{i=m}^{n}r^i=a_0\\frac{r^{n+1}-r^m}{r-1}$\n\nDemostración (asumiendo $a_0=1$):\n```\n  S(n) = r^m + r^{m+1} + r^{m+2} + ... + r^{n-1} + r^n\n rS(n) =       r^{m+1} + r^{m+2} + ... + r^{n-1} + r^n + r^{n+1}\nrS(n)-S(n) = -r^m                                       + r^{n+1}\n```\n$S(n)=\\sum_{i=m}^{n}r^i=\\frac{r^{n+1}-r^m}{r-1}$\n\nEjemplo 1: $S(n)=\\sum_{i=0}^{n-1}2^i=2^n-1$\n```\n  S(n) = 2^0 + 2^1 + 2^2 + ... + 2^{n-1}\n rS(n) =       2^1 + 2^2 + ... + 2^{n-1} + 2^n\n2S(n)-S(n) = -1                          + 2^n\n```\n$S(n)=2^n-1$\n\nEjemplo 2: $S(n)=\\sum_{i=0}^{n-1}\\frac1{2^i}=\\sum_{i=0}^{n-1}\\left(\\frac12\\right)^i=\\frac{\\left(\\frac12\\right)^n-1}{\\frac12-1}=\\frac{\\frac{1-2^n}{2^n}}{-\\frac12}=2\\frac{2^n-1}{2^n}$"
   },
   {
    "title": "Sumas parciales alternativa",
    "level": 2,
    "md": "$S(n)=\\sum_{i=1}^{n}ir^i=1\\cdot r^1+2\\cdot r^2+3\\cdot r^3+\\cdots+(n-1)\\cdot r^{n-1}+n\\cdot r^n$\n- No corresponde a una progresión geométrica (ni aritmética)\n- Se puede deducir su fórmula procediendo: 1) resta de sumatorios; 2) aplicando derivadas; 3) descomponiendo la suma en varias sumas parciales geométricas\n- Resultado (los tres métodos): $S(n)=\\frac{r+r^{n+1}(nr-n-1)}{(r-1)^2}$"
   },
   {
    "title": "Método 1 (resta de sumatorios)",
    "level": 3,
    "md": "```\n  S(n) = 1·r^1 + 2·r^2 + 3·r^3 + ... +      n·r^n\n rS(n) =         1·r^2 + 2·r^3 + ... + (n-1)·r^n + n·r^{n+1}\nS(n)-rS(n) = r^1 + r^2 + r^3 + ... + r^n - n·r^{n+1}\n```\n$r^1+r^2+r^3+\\cdots+r^n$ es una suma geométrica con fórmula $(r^{n+1}-r)/(r-1)$:\n$S(n)-rS(n)=\\frac{r^{n+1}-r}{r-1}-nr^{n+1}$\n$S(n)=\\frac{r-r^{n+1}}{(r-1)^2}+\\frac{nr^{n+1}}{r-1}=\\frac{r-r^{n+1}+(r-1)nr^{n+1}}{(r-1)^2}=\\frac{r+r^{n+1}(nr-n-1)}{(r-1)^2}$"
   },
   {
    "title": "Método 2 (derivada de suma parcial geométrica)",
    "level": 3,
    "md": "Consideramos una suma parcial geométrica general y su derivada:\n- $T=1+x+x^2+\\cdots+x^{m-1}=\\frac{x^m-1}{x-1}$\n- Derivando: $\\frac{dT}{dx}=1+2x+3x^2+\\cdots+(m-1)x^{m-2}=\\frac{mx^{m-1}(x-1)-1\\cdot(x^m-1)}{(x-1)^2}$\n\nEn este caso tenemos:\n$S(n)=x\\frac{dT}{dx}\\Big|_{x=r,\\,m=n+1}=r\\frac{(n+1)r^n(r-1)-(r^{n+1}-1)}{(r-1)^2}=\\frac{r+r^{n+1}(nr-n-1)}{(r-1)^2}$"
   },
   {
    "title": "Método 3 (descomposición)",
    "level": 3,
    "md": "$S(n)=\\sum_{i=1}^{n}ir^i=r+2r^2+3r^3+\\cdots+nr^n$\n```\nr + r^2 + r^3 + ... + r^n = (r^{n+1} - r)/(r-1)\n  + r^2 + r^3 + ... + r^n = (r^{n+1} - r^2)/(r-1)\n        + r^3 + ... + r^n = (r^{n+1} - r^3)/(r-1)\n                ...    ...\n                    + r^n = (r^{n+1} - r^n)/(r-1)\n```\n$S(n)=\\frac{1}{r-1}\\left[nr^{n+1}-\\sum_{i=1}^{n}r^i\\right]=\\frac{1}{r-1}\\left[nr^{n+1}-\\frac{r^{n+1}-r}{r-1}\\right]=\\frac{(r-1)nr^{n+1}-r^{n+1}+r}{(r-1)^2}=\\frac{r+r^{n+1}(nr-n-1)}{(r-1)^2}$"
   },
   {
    "title": "Aproximación por integrales",
    "level": 2,
    "md": "- Para muchos sumatorios no obtendremos una fórmula analítica; tendremos que recurrir a cotas\n- Para $f(x)$ monótona creciente: $\\int_{m-1}^{n}f(x)dx\\le\\sum_{i=m}^{n}f(i)\\le\\int_{m}^{n+1}f(x)dx$\n- Para $f(x)$ monótona decreciente: $\\int_{m}^{n+1}f(x)dx\\le\\sum_{i=m}^{n}f(i)\\le\\int_{m-1}^{n}f(x)dx$"
   },
   {
    "title": "Función creciente",
    "level": 3,
    "md": "[figura: curva creciente $f(x)$ con segmentos verticales de longitud $f(m),f(m+1),\\dots,f(n)$ en $x=m,\\dots,n$]\n$\\sum_{i=m}^{n}f(i)$ = suma de longitudes de segmentos"
   },
   {
    "title": "Función creciente - Cota superior",
    "level": 3,
    "md": "[figura: rectángulos de ancho 1 y altura $f(i)$ sobre $[i,i+1]$, por encima de la curva]\n$\\sum_{i=m}^{n}f(i)$ = suma de áreas $\\le\\int_m^{n+1}f(x)dx$ (área debajo de la curva desde $m$ hasta $n+1$)"
   },
   {
    "title": "Función creciente - Cota inferior",
    "level": 3,
    "md": "[figura: rectángulos de ancho 1 y altura $f(i)$ sobre $[i-1,i]$, por debajo de la curva]\n$\\int_{m-1}^{n}f(x)dx\\le$ suma de áreas $=\\sum_{i=m}^{n}f(i)$ (área debajo de la curva desde $m-1$ hasta $n$)"
   },
   {
    "title": "Función decreciente",
    "level": 3,
    "md": "[figura: curva decreciente con segmentos verticales $f(m),\\dots,f(n)$]\n$\\sum_{i=m}^{n}f(i)$ = suma de longitudes de segmentos"
   },
   {
    "title": "Función decreciente - Cota superior",
    "level": 3,
    "md": "$\\sum_{i=m}^{n}f(i)$ = suma de áreas $\\le\\int_{m-1}^{n}f(x)dx$ (área debajo de la curva desde $m-1$ hasta $n$)"
   },
   {
    "title": "Función decreciente - Cota inferior",
    "level": 3,
    "md": "$\\int_m^{n+1}f(x)dx\\le$ suma de áreas $=\\sum_{i=m}^{n}f(i)$ (área debajo de la curva desde $m$ hasta $n+1$)"
   },
   {
    "title": "Ejemplo: Suma parcial de la serie armónica",
    "level": 2,
    "md": "Acotar $\\sum_{i=1}^{n}\\frac1i=1+\\sum_{i=2}^{n}\\frac1i$\n- Cota superior: $\\sum_{i=2}^{n}\\frac1i\\le\\int_1^n\\frac1x dx=\\ln(n)\\Rightarrow\\sum_{i=1}^{n}\\frac1i\\le\\ln(n)+1$\n- Cota inferior: $\\sum_{i=1}^{n}\\frac1i\\ge\\int_1^{n+1}\\frac1x dx=\\ln(n+1)$\n\n$\\ln(n+1)\\le S=\\sum_{i=1}^{n}\\frac1i=\\ln n+\\gamma+O(1/n)\\le\\ln(n)+1$\n- $\\gamma\\simeq0{,}577$ es la constante de Euler\n- $O(1/n)$ es un término muy pequeño\n- La serie diverge: $\\sum_{i=1}^{\\infty}\\frac1i=\\infty$\n\n# Productos"
   },
   {
    "title": "Notación básica",
    "level": 2,
    "md": "- Definición: $\\prod_{i=m}^{n}f(i)=f(m)\\times f(m+1)\\times\\cdots\\times f(n-1)\\times f(n)$\n- Convención: $\\prod_{i=m}^{n}f(i)=1$ si $m>n$"
   },
   {
    "title": "Productos o \"productorios\"",
    "level": 2,
    "md": "- Relación entre productos y sumatorios al utilizar logaritmos: $\\log\\left(\\prod_{i=1}^{n}a_i\\right)=\\sum_{i=1}^{n}\\log a_i$\n- Se emplea mucho en probabilidad\n  - Para simplificar cálculos\n  - Para evitar desbordamientos (underflows), ya que al multiplicar muchas probabilidades (números entre 0 y 1) el resultado se hace muy pequeño\n  - Al comparar probabilidades ($\\log_b(x)$ es creciente para $b>1$: no afecta desigualdades)"
   },
   {
    "title": "Truco \"log-suma-exp\" para evitar underflows",
    "level": 2,
    "md": "- Ejemplo: $P=\\sum_{i}^{m}e^{a_i}$ ($P$ muy pequeña)\n- En muchos modelos probabilistas $a_i$ son números negativos grandes, resultado de sumas de logaritmos de probabilidades (logaritmos de productos de probabilidades)\n  - $e^{a_i}$ causaría un error de underflow (por ejemplo, $e^{-1000}$)\n- Aplicamos logaritmos: $\\log(P)=\\log\\left(\\sum_{i=1}^{m}e^{a_i}\\right)\\approx\\max_{i=1..m}\\{a_i\\}$\n- Truco: $b=\\max_{i=1..m}\\{a_i\\}$\n  - $\\log(P)=\\log\\left(e^b\\sum_{i=1}^{m}e^{a_i-b}\\right)=b+\\log\\left(\\sum_{i=1}^{m}e^{a_i-b}\\right)$"
   }
  ]
 },
 {
  "id": "t2.2_notaciones_asintoticas",
  "title": "Tema 2.2 Notaciones asintóticas",
  "sections": [
   {
    "title": "Tema 2.2 Notaciones asintóticas",
    "level": 2,
    "md": "Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez, 13 de mayo de 2024 (URJC). Licencia CC Atribución-CompartirIgual 4.0 Internacional.\n\nContenido: 1 Introducción; 2 Notaciones asintóticas (cota superior O, cota inferior Ω, cota ajustada Θ); 3 Aspectos adicionales; 4 Ordenación (ordenación en tiempo lineal, ordenación por comparación)."
   },
   {
    "title": "Introducción",
    "level": 2,
    "md": ""
   },
   {
    "title": "Notaciones asintóticas",
    "level": 3,
    "md": "- Nos interesa cómo crece el tiempo de ejecución\n  - Según aumenta el tamaño de la entrada\n  - \"En el límite\", según el tamaño crece sin cota (hasta $\\infty$)\n- Eficiencia asintótica de algoritmos\n  - Asumimos que las entradas son muy grandes\n  - Nos interesa el \"orden de crecimiento\"\n  - Las constantes y términos de orden inferior no son relevantes, al ser dominados por un término de orden superior\n- El algoritmo con mejor coste o eficiencia asintótica suele ser la mejor elección\n  - Salvo para entradas muy pequeñas"
   },
   {
    "title": "Tiempo de ejecución de un algoritmo",
    "level": 3,
    "md": "- Expresaremos el tiempo de ejecución mediante una fórmula (función) matemática\n  - Generalmente la llamaremos $T(n)$\n  - Es importante saber qué argumentos debe tomar dicha función\n- Ejemplo: $T(n)=\\frac{1}{2}n^2+2000n+50000$\n  - [figura: curva de $T(n)$ para $n\\in[0,10000]$, eje y hasta $7\\cdot10^7$, creciente convexa]\n  - ¿Qué términos de $T(n)$ importan más para entender cómo crece?"
   },
   {
    "title": "Descomposición",
    "level": 3,
    "md": "- [figura: dos gráficos con $\\frac{1}{2}n^2$ y $2000n+50000$. Izquierda $n\\in[0,10000]$ (eje y hasta $5\\cdot10^7$): $\\frac{1}{2}n^2$ supera a $2000n+50000$ a partir de $n\\approx4000$. Derecha $n\\in[0,200]$ (eje y hasta $5\\cdot10^5$): $2000n+50000$ queda muy por encima de $\\frac{1}{2}n^2$]\n- El término cuadrático determina el \"orden\" de crecimiento de la función\n- Para valores pequeños de $n$ todos los términos pueden ser relevantes"
   },
   {
    "title": "Términos de mayor orden",
    "level": 3,
    "md": "- El término que más nos importa es $n^2$\n  - Es el término de mayor orden\n  - Domina al resto de términos a medida que $n\\to\\infty$\n  - Puede haber varios (si la función depende de más de un parámetro)\n- Para valores pequeños de $n$ todos los términos influyen\n- Mediante la notación asintótica vamos a simplificar y a aislar los términos que más influyen cuando $n$ toma valores muy grandes"
   },
   {
    "title": "Primeras nociones informales",
    "level": 3,
    "md": "Supongamos que tenemos dos funciones $f(n)$ y $g(n)$.\n- $f(n)$ es asintóticamente menor que $g(n)$ cuando: $f(n)<g(n)\\iff\\lim_{n\\to\\infty}\\frac{f(n)}{g(n)}=0$\n- $f(n)$ es asintóticamente mayor que $g(n)$ cuando: $f(n)>g(n)\\iff g(n)<f(n)$\n- $f(n)$ es asintóticamente igual que $g(n)$ cuando: $f(n)=g(n)\\iff f(n)\\nless g(n)$ y $g(n)\\nless f(n)$"
   },
   {
    "title": "Órdenes que más aparecen",
    "level": 3,
    "md": "- Considerados generalmente como \"tratables\": $1<\\log(n)<n<n\\log(n)<n^2$\n- Considerados generalmente como \"intratables\": $n^2<n^3<2^n<n!$\n- $n^2$ se encuentra en el límite\n  - En la práctica dependerá de $n$ (tamaño de la entrada)\n- $n^p<n^q$ para $p<q$\n- $n^p<n^p\\log(n)<n^{p+1}$\n- $f(n)<f(n)\\log(n)$\n- $n^p<c^n$ para $c>1$"
   },
   {
    "title": "Curvas de órdenes",
    "level": 3,
    "md": "[figura: curvas de los órdenes anteriores, $n\\in[1,20]$, eje y en escala logarítmica de 1 a 16777216 ($2^{24}$)]"
   },
   {
    "title": "Valores de funciones",
    "level": 3,
    "md": "| 1 | $\\log_2 n$ | $n$ | $n\\log_2 n$ | $n^2$ | $n^3$ | $2^n$ | $n!$ |\n|---|---|---|---|---|---|---|---|\n| 1 | 0 | 1 | 0 | 1 | 1 | 2 | 1 |\n| 1 | 1 | 2 | 2 | 4 | 8 | 4 | 2 |\n| 1 | 2 | 4 | 8 | 16 | 64 | 16 | 24 |\n| 1 | 3 | 8 | 24 | 64 | 512 | 256 | 40320 |\n| 1 | 4 | 16 | 64 | 256 | 4096 | 65.536 | 2,09 · 10^13 |\n| 1 | 5 | 32 | 160 | 1024 | 32.768 | 4.295.967.296 | 2,63 · 10^35 |\n\n- Un orden exponencial es extremadamente costoso, incluso frente a órdenes polinómicos\n- Un orden factorial es incluso más costoso que un orden exponencial"
   },
   {
    "title": "Notaciones asintóticas",
    "level": 2,
    "md": ""
   },
   {
    "title": "Concepto básico de cota superior",
    "level": 3,
    "md": "- En general, $g(n)$ es cota superior de $f(n)$ cuando: $f(n)\\le g(n),\\ \\forall n$.\n- Así, dada una función $g(n)$, podemos definir el conjunto de todas las funciones para las que $g(n)$ es cota superior: $\\{f(n): f(n)\\le g(n),\\ \\forall n\\}$"
   },
   {
    "title": "Concepto alternativo de cota superior",
    "level": 3,
    "md": "- Definición alternativa: $g(n)$ es \"cota superior para valores grandes\" de $f(n)$ si: $f(n)\\le g(n)$, en un intervalo $[n_0,\\infty)$, para algún valor de $n_0$.\n- Bajo esta nueva definición el conjunto de todas las funciones para las que $g(n)$ es cota superior para valores grandes sería: $\\{f(n): \\exists n_0\\ f(n)\\le g(n),\\ \\forall n\\ge n_0\\}$"
   },
   {
    "title": "Definición formal de cota superior $O$",
    "level": 3,
    "md": "$O(g(n))=\\{f(n): \\exists c>0\\ \\text{y}\\ n_0>0\\ |\\ 0\\le f(n)\\le c\\cdot g(n),\\ \\forall n\\ge n_0\\}$\n- [figura: $f(n)\\in O(g(n))$. Eje $n$ con $n_0$ marcado; $f(n)$ oscila antes de $n_0$ y a partir de $n_0$ queda por debajo de $c\\cdot g(n)$]\n- A partir de un $n_0$, $c\\cdot g(n)$ siempre supera (o iguala) a $f(n)$\n- $O(g(n))$ es un conjunto de funciones"
   },
   {
    "title": "Cota superior $O$ (1)",
    "level": 3,
    "md": "- Es la cota superior para valores grandes, pero donde\n  - Se puede multiplicar $g(n)$ por cualquier constante\n  - Es decir, no importan las constantes multiplicativas\n- La definición no debe cumplirse para dos valores concretos de $c$ y $n_0$, lo único que importa para que se cumpla es que exista alguna pareja de estos valores\n  - Si se cumple la definición habrá infinitas parejas válidas\n- La definición también considera:\n  - $0\\le f(n)$ (las funciones con las que trabajaremos miden cantidades no negativas: tiempos, operaciones, memoria, etc.)\n  - $c>0$ y $n_0>0$"
   },
   {
    "title": "Cota superior $O$ (2)",
    "level": 3,
    "md": "- Ejemplos:\n  - $2n+5\\in O(3n^2-8n)$\n  - $2n+5\\in O(n+10)$\n  - $2n+5\\in O(n!)$\n  - $2n+5\\in O(n)\\Leftarrow$ Querremos la cota superior más baja\n- $f(n)\\in O(g(n))$ implica:\n  - $f(n)$ es asintóticamente menor o igual que $g(n)$\n  - $g(n)$ es una cota superior de $f(n)$ (asintóticamente)\n  - $\\lim_{n\\to\\infty}\\frac{f(n)}{g(n)}=$ constante finita"
   },
   {
    "title": "Verificación formal de $f(n)\\in O(g(n))$",
    "level": 3,
    "md": "Cuando $f(n)\\in O(g(n))$:\n1. Escoger una constante $c>0$ adecuada\n2. Plantear la inecuación $f(n)\\le c\\cdot g(n)$\n3. Encontrar los intervalos de $n$ en los que se cumple $f(n)\\le c\\cdot g(n)$\n   - Si uno de los intervalos es del tipo $[n_0,\\infty)$ podremos afirmar que $f(n)\\in O(g(n))$\n   - $c$ y $n_0$ constituirán una de las parejas de constantes buscadas\n\nCuando $f(n)\\notin O(g(n))$:\n1. Plantear la inecuación $f(n)\\le c\\cdot g(n)$\n2. Demostrar que, sea cual sea $c$, será imposible encontrar un intervalo del tipo $[n_0,\\infty)$ en el que se verifique $f(n)\\le c\\cdot g(n)$"
   },
   {
    "title": "Ejemplo. Demostrar que: $5n+2\\in O(n)$",
    "level": 3,
    "md": "- Hay que encontrar $c>0$ y $n_0>0$ tales que $5n+2\\le cn,\\ \\forall n\\ge n_0$\n- Pasos:\n  1. Elegimos una constante adecuada (por ejemplo $c=6$)\n     - Para que la parte derecha de la inecuación sea mayor que la izquierda\n  2. Planteamos $5n+2\\le 6n$ (es decir, $5n+2\\le cn$)\n  3. Determinamos cuándo se cumple la inecuación. Lo ideal es poder despejar la $n$, y en este caso se puede: $2\\le 6n-5n\\Rightarrow 2\\le n$. Por tanto, se cumple en el intervalo $[2,\\infty)$, y podríamos escoger $n_0=2$ (cualquier valor mayor también sería válido).\n- Al haber encontrado $c$ y $n_0$ afirmamos que $5n+2\\in O(n)$"
   },
   {
    "title": "Ejemplo. Demostrar que: $5n+2\\in O(n^2)$",
    "level": 3,
    "md": "1. Elegir una constante adecuada (por ejemplo $c=1$)\n2. Plantear $5n+2\\le n^2$ (es decir, $5n+2\\le 1\\cdot n^2$)\n3. Buscar qué valores de $n$ hacen que se cumpla que $5n+2\\le n^2$\n   - Ahora no podemos despejar $n$\n   - Analizamos la desigualdad $n^2-5n-2\\ge0$\n   - [figura: parábola $n^2-5n-2$ para $n\\in[-2,7]$, eje y de $-8$ a $6$, cortando el eje x cerca de $-0{,}37$ y $5{,}37$]\n\nContinuación:\n- $n^2-5n-2$ es una función cuadrática (convexa) con raíces en $-0{,}37$ y $5{,}37$\n- Por tanto, siempre será positiva para $n\\ge6$\n- Para $c=1$ y $n_0=5{,}37$ se cumplen las condiciones de la definición y queda demostrado\n  - $n_0$ también puede ser cualquier valor mayor que $5{,}37$, por ejemplo, $n_0=6$ o $n_0=1000$.\n- Si escogemos $c=5$, $n_0=2$ es suficiente\n- Si escogemos $c=8$, $n_0=1$ es suficiente"
   },
   {
    "title": "Ejemplo. Verificar si $3n^2+2n-2\\in O(n)$",
    "level": 3,
    "md": "- En este caso no vamos a poder encontrar las constantes (ya que $3n^2+2n-2\\notin O(n)$)\n1. Consideramos $3n^2+2n-2\\le cn$\n2. Cojamos la constante $c$ que cojamos $3n^2+2n-2\\le cn$ no se va a verificar en un intervalo de tipo $[n_0,\\infty)$\n   - La inecuación se puede expresar como $3n^2+(2-c)n-2\\le0$\n   - La función $3n^2+(2-c)n-2$ es una parábola convexa, que crece hasta el $+\\infty$ según aumenta $n$, independientemente de $c$\n   - Por tanto, no va a ser negativa siempre a partir de ningún $n_0$\n   - Es imposible encontrar una pareja de constantes $c$ y $n_0$. Por tanto, $3n^2+2n-2\\notin O(n)$."
   },
   {
    "title": "Verificar si $3n^2+2n-2\\in O(n)$ (gráficamente)",
    "level": 3,
    "md": "- [figura: parábola $3n^2+(2-c)n-2$ con $c=4$, $n\\in[-1.5,3]$, eje y de $-2$ a $10$; forma de \"U\"]\n- Sea cual sea $c$ (en el ejemplo $c=4$) la parábola siempre será convexa (con forma de \"U\"), ya que el coeficiente asociado a $n^2$ es positivo\n- $3n^2+(2-c)n-2\\le0$ se cumplirá, como mucho, en un intervalo finito, y nunca en uno de tipo $[n_0,\\infty)$"
   },
   {
    "title": "Definición formal de cota inferior $\\Omega$",
    "level": 3,
    "md": "$\\Omega(g(n))=\\{f(n): \\exists c>0\\ \\text{y}\\ n_0>0\\ |\\ 0\\le c\\cdot g(n)\\le f(n),\\ \\forall n\\ge n_0\\}$\n- [figura: $f(n)\\in\\Omega(g(n))$; a partir de $n_0$, $f(n)$ queda por encima de $c\\cdot g(n)$]\n- A partir de $n_0$, $f(n)$ siempre supera (o iguala) a $c\\cdot g(n)$"
   },
   {
    "title": "Cota inferior $\\Omega$",
    "level": 3,
    "md": "- Ejemplos:\n  - $2n+5\\in\\Omega(3\\log n)$\n  - $2n+5\\in\\Omega(4n+10)$\n  - $2n+5\\in\\Omega(1)$\n  - $2n+5\\in\\Omega(n)\\Leftarrow$ Querremos la cota inferior más alta\n- $f(n)\\in\\Omega(g(n))$ implica:\n  - $f(n)$ es asintóticamente mayor o igual que $g(n)$\n  - $g(n)$ es una cota inferior de $f(n)$ (asintóticamente)\n  - $\\lim_{n\\to\\infty}\\frac{f(n)}{g(n)}>0$ (constante $>0$, o $\\infty$)"
   },
   {
    "title": "Ejemplo. Verificar si $3n^2+2\\in\\Omega(n)$",
    "level": 3,
    "md": "- Mismos pasos que para $O$, pero usando $f(n)\\ge c\\cdot g(n)$\n- Para $3n^2+2\\in\\Omega(n)$:\n  1. Elegimos una constante adecuada (por ejemplo $c=5$)\n  2. Planteamos $3n^2+2\\ge5n$ (es decir, $3n^2+2\\ge cn$)\n  3. Determinamos qué valores de $n$ satisfacen la inecuación\n     - Analizamos la desigualdad $3n^2-5n+2\\ge0$\n     - $3n^2-5n+2$ es una función cuadrática (convexa) con raíces en $2/3$ y $1$\n     - Por tanto, se cumple la inecuación en el intervalo $[1,\\infty)$\n     - Para $c=5$ y $n_0=1$ se cumplen las condiciones de la definición y podemos afirmar que $3n^2+2\\in\\Omega(n)$"
   },
   {
    "title": "Definición formal de cota ajustada $\\Theta$",
    "level": 3,
    "md": "$\\Theta(g(n))=\\{f(n): \\exists c_1>0,\\ c_2>0\\ \\text{y}\\ n_0>0\\ |\\ 0\\le c_1g(n)\\le f(n)\\le c_2g(n),\\ \\forall n\\ge n_0\\}$\n- [figura: $f(n)\\in\\Theta(g(n))$; a partir de $n_0$, $f(n)$ queda entre $c_1\\cdot g(n)$ (abajo) y $c_2\\cdot g(n)$ (arriba)]\n- A partir de $n_0$, $f(n)$ siempre queda en medio de $c_1g(n)$ y $c_2g(n)$"
   },
   {
    "title": "Cota ajustada $\\Theta$",
    "level": 3,
    "md": "- Ejemplos:\n  - $2n+5\\in\\Theta(8n+10)$\n  - $2n+5\\in\\Theta(n)$\n- $f(n)\\in\\Theta(g(n))$ implica:\n  - $f(n)$ es asintóticamente igual que $g(n)$\n  - $g(n)$ es una cota ajustada de $f(n)$ (asintóticamente)\n  - $\\lim_{n\\to\\infty}\\frac{f(n)}{g(n)}=$ constante $>0$\n- $f(n)\\in\\Theta(g(n))\\iff\\begin{cases}f(n)\\in O(g(n))\\\\ \\text{y}\\\\ f(n)\\in\\Omega(g(n))\\end{cases}$"
   },
   {
    "title": "Ejemplo. Demostrar $n^2/2-3n\\in\\Theta(n^2)$",
    "level": 3,
    "md": "- Tenemos que demostrar tanto $n^2/2-3n\\in O(n^2)$ como $n^2/2-3n\\in\\Omega(n^2)$\n- Se busca que $c_1n^2\\le n^2/2-3n\\le c_2n^2$\n- Encontramos, por ejemplo: $c_1=1/14$ para $n\\ge7$ ($\\Omega$)\n- Y, por ejemplo: $c_2=1/2$ para $n\\ge1$ ($O$)\n- Según la definición habríamos encontrado $c_1=1/14$, $c_2=1/2$, y $n_0=7$"
   },
   {
    "title": "Otras notaciones asintóticas: $o$ y $\\omega$",
    "level": 3,
    "md": "- $f(n)\\in o(g(n))$ (cota superior estricta)\n  - El orden de $g(n)$ es mayor, estrictamente, que el de $f(n)$\n  - $f(n)<g(n)$ (asintóticamente)\n    - Si $f(n)\\in O(g(n))$ entonces $f(n)\\le g(n)$ (asintóticamente)\n- $f(n)\\in\\omega(g(n))$ (cota inferior estricta)\n  - El orden de $g(n)$ es menor, estrictamente, que el de $f(n)$\n  - $f(n)>g(n)$ (asintóticamente)\n    - Si $f(n)\\in\\Omega(g(n))$ entonces $f(n)\\ge g(n)$ (asintóticamente)"
   },
   {
    "title": "Funciones de dos parámetros",
    "level": 3,
    "md": "- Hay problemas y algoritmos cuya complejidad computacional depende de varios parámetros\n- Ejemplo: mezclar dos vectores ordenados de longitudes $n$ y $m$\n  - $T(n,m)\\in\\Theta(n+m)$\n- Definición formal de $O$ para funciones de dos parámetros:\n  $O(g(n,m))=\\{f(n,m): \\exists c>0,\\ n_0>0,\\ \\text{y}\\ m_0>0\\ |\\ 0\\le f(n,m)\\le c\\cdot g(n,m),\\ \\forall n\\ge n_0,\\ \\text{y}\\ m\\ge m_0\\}$"
   },
   {
    "title": "Funciones de dos parámetros: comparación",
    "level": 3,
    "md": "En la práctica usaremos límites para determinar si un orden es mayor que otro:\n\n$f(n,m)>g(n,m)\\iff$\n- $\\lim_{n\\to\\infty}\\frac{g(n,m)}{f(n,m)}=0$ y $\\lim_{m\\to\\infty}\\frac{g(n,m)}{f(n,m)}\\ne\\infty$\n- o $\\lim_{m\\to\\infty}\\frac{g(n,m)}{f(n,m)}=0$ y $\\lim_{n\\to\\infty}\\frac{g(n,m)}{f(n,m)}\\ne\\infty$"
   },
   {
    "title": "Simplificación",
    "level": 3,
    "md": "Simplificar $\\Theta(3m^2n+m^3+10mn+2n^2)$\n1. Eliminar constantes: $\\Theta(m^2n+m^3+mn+n^2)$\n2. Simplificar términos \"contenidos\" en otros\n   - $m^2n>mn$, por tanto, se puede eliminar el término $mn$\n   - $\\lim_{n\\to\\infty}\\frac{mn}{m^2n}=\\frac{1}{m}\\ne\\infty$ y $\\lim_{m\\to\\infty}\\frac{mn}{m^2n}=0$\n   - Resultado: $\\Theta(m^2n+m^3+n^2)$\n- Si probamos las tres combinaciones de parejas de funciones que aparecen en la fórmula final veremos que ninguna es superior a otra"
   },
   {
    "title": "Aspectos adicionales",
    "level": 2,
    "md": ""
   },
   {
    "title": "Aspectos adicionales (1)",
    "level": 3,
    "md": "Sea $\\rho$ alguna medida de complejidad computacional asintótica:\n- Las constantes no importan: $\\rho(k\\,g(n))=\\rho(g(n))$\n- Término de mayor orden de un polinomio: $\\rho(a_mx^m+a_{m-1}x^{m-1}+\\dots+a_1x^1+a_0)=\\rho(x^m)$\n- La base de los logaritmos no importa: $\\rho(\\log_x g(n))=\\rho\\left(\\frac{\\log_y g(n)}{\\log_y x}\\right)=\\rho\\left(\\frac{1}{\\log_y x}\\log_y g(n)\\right)=\\rho(\\log_y g(n))=\\rho(\\log g(n))$"
   },
   {
    "title": "Aspectos adicionales (2)",
    "level": 3,
    "md": "- $O$, $\\Omega$, y $\\Theta$ definen conjuntos\n  - Lo correcto es escribir $f(n)\\in O(g(n))$\n  - A veces se escribe $f(n)=O(g(n))$, aunque es un \"abuso\" de notación\n  - Y lo mismo con $\\Omega$ y $\\Theta$\n- Las funciones ($f(n)$, $g(n)$, $f(n,m)$, etc.) son siempre positivas\n- Es un error decir que si $f(n)\\in O(g(n))$, entonces $f(n)$ tarda al menos $g(n)$\n  - Al contrario, tarda como mucho $g(n)$ ($g(n)$ es cota superior)\n- Con estas definiciones las constantes no influyen: se proporcionan cotas hasta un factor constante multiplicativo\n- Hay notaciones en las que tratan a los términos logarítmicos como irrelevantes también"
   },
   {
    "title": "Comentarios adicionales (1)",
    "level": 3,
    "md": "- ¡Que un algoritmo tarde $O(n^2)$, $\\Omega(n^2)$, o $\\Theta(n^2)$ para algunas entradas no quiere decir que tarde $O(n^2)$, $\\Omega(n^2)$, o $\\Theta(n^2)$ para todas, o en general!\n- Cuando hablamos de $O$ normalmente lo hacemos en referencia al peor caso, que es cuando un algoritmo tarda más\n  - En ese caso damos una cota superior del tiempo o número de operaciones\n  - Es como una \"garantía\" de que el coste nunca va a superar la cota proporcionada\n- Cuando se indica una cota, siempre hay que asociarla a un determinado tipo de entrada:\n  - Caso mejor, peor, o medio"
   },
   {
    "title": "Comentarios adicionales (2)",
    "level": 3,
    "md": "Un algoritmo debe procesar todos los bits de todos los ($m=2^n$) números de $n$ bits. Para $n=3$ procesa $24$ bits:\n\n| decimal | binario |\n|---|---|\n| 0 | 000 |\n| 1 | 001 |\n| 2 | 010 |\n| 3 | 011 |\n| 4 | 100 |\n| 5 | 101 |\n| 6 | 110 |\n| 7 | 111 |\n\nTamaño de entrada:\n- $n$ bits $\\Rightarrow\\Theta(n\\cdot2^n)$ (¿intratable?)\n- $m$ números $\\Rightarrow\\Theta(m\\cdot\\log(m))$ (¿tratable?)\n- Ambas expresiones son idénticas"
   },
   {
    "title": "Ordenación",
    "level": 2,
    "md": ""
   },
   {
    "title": "Ordenación en tiempo lineal",
    "level": 3,
    "md": "- Existen algoritmos de ordenación que tardan $O(n)$, pero no son generales (no pueden ordenar cualquier tipo de datos)\n- Radix-sort, Bucket-sort, Counting-sort...\n- Counting-sort\n  - Los elementos a ordenar son enteros y pertenecen al intervalo $[0,k]$\n  - Si $k\\in O(n)$, entonces el algoritmo tarda $\\Theta(n)$\n  - Usa tres vectores:\n    - $A[1..n]$, es el vector de entrada\n    - $B[1..n]$, es el vector de salida\n    - $C[0..k]$, es un vector auxiliar"
   },
   {
    "title": "Idea del counting-sort",
    "level": 3,
    "md": "Se recorre la secuencia A y se cuenta el número de veces que aparece cada entero.\n- A = [2, 5, 3, 0, 2, 3, 0, 3], $n=8$\n- C (índices 0..5) = [2, 0, 2, 3, 0, 1], $k=5$\n- Hay varias formas de obtener el vector ordenado: B = [0, 0, 2, 2, 3, 3, 3, 5]\n- A continuación se describe un algoritmo eficiente"
   },
   {
    "title": "Counting-sort",
    "level": 3,
    "md": "```\nCounting-sort(A)\n\nFOR i=0..k                                    Θ(k)\n  C[i] = 0\n\nFOR j=1..length(A)                            Θ(n)\n  C[A[j]]++\n\nFOR j=1..k                                    Θ(k)\n  C[i] = C[i] + C[i-1]\n\nFOR j=length(A)..1                            Θ(n)\n  B[C[A[j]]] = A[j]\n  C[A[j]]--\n```\n$T(n)\\in\\Theta(n+k)$. Si $k\\in O(n)$, entonces $T(n)\\in\\Theta(n)$."
   },
   {
    "title": "Ordenación por comparación",
    "level": 3,
    "md": "- Algoritmos basados en ordenación por comparación:\n  - Se basan en comparaciones del tipo $<,\\le,=,\\ge$ y $>$\n  - No se determina el orden de los elementos de otra manera\n  - No necesitan conocer los valores de los elementos a ordenar\n    - Sus valores y distribución son irrelevantes\n    - Solo interesa el puesto en la ordenación (1º, 2º, ...)\n  - Son generales: pueden ordenar datos de cualquier tipo, siempre que existan funciones $<,\\le,=,\\ge$ y $>$ para compararlos\n    - Enteros, reales, cadenas de caracteres, etc.\n- Se analizan en el caso mejor, peor, medio...\n- Insert-sort, Bubble-sort, Select-sort, Merge-sort, Quicksort, Heap-sort..."
   },
   {
    "title": "Algoritmos de ordenación y permutaciones",
    "level": 3,
    "md": "Los algoritmos de ordenación por comparación tienen que ser capaces de generar cualquier permutación de un vector:\n\n| Entrada | 2 5 8 | 2 8 5 | 5 2 8 | 5 8 2 | 8 2 5 | 8 5 2 |\n|---|---|---|---|---|---|---|\n| Salida | 2 5 8 | 2 5 8 | 2 5 8 | 2 5 8 | 2 5 8 | 2 5 8 |\n\nPara un vector de $n$ elementos, hay $n!$ posibles permutaciones."
   },
   {
    "title": "Algoritmos de ordenación y comparaciones",
    "level": 3,
    "md": "Deben realizar varias comparaciones hasta determinar la permutación correcta para cualquier entrada.\n- Ejemplo, entrada 5 8 2: se compara 1º:2º (resultado $\\le$), luego 2º:3º (resultado $>$), luego 1º:3º (resultado $>$), y se llega a la permutación $\\langle3º,1º,2º\\rangle$, salida 2 5 8\n- [figura: a medida que se hacen comparaciones se reduce la incertidumbre sobre el orden (estados 2 5 2 8 2 / 2 5 2 8 / 2 5 8, con elementos marcados como \"incertidumbre\" y \"ordenados correctamente\"); a la derecha, flechas de la entrada 5 8 2 a la salida 2 5 8]"
   },
   {
    "title": "Algoritmos de ordenación como árboles de decisión",
    "level": 3,
    "md": "Los algoritmos de ordenación pueden verse de manera abstracta en términos de un árbol de decisión:\n```\n1:2\n  <=  -> 2:3\n           <= -> <1,2,3>\n           >  -> 1:3\n                   <= -> <1,3,2>\n                   >  -> <3,1,2>\n  >   -> 1:3\n           <= -> <2,1,3>\n           >  -> 2:3\n                   <= -> <2,3,1>\n                   >  -> <3,2,1>\n```\n- X:Y  Se comparan los elementos Xº e Yº de la secuencia original\n- <X,Y,Z>  Secuencia final <Xº, Yº, Zº>"
   },
   {
    "title": "Cota inferior para algoritmos de ordenación (1)",
    "level": 3,
    "md": "- Cualquier permutación de los $n$ elementos debe aparecer como hoja del árbol\n- Hay $n!$ permutaciones posibles\n- La profundidad o altura máxima de una hoja determina el nº de comparaciones en el peor caso\n- Nos interesaría diseñar un algoritmo cuyo árbol tuviera la profundidad mínima\n- Una cota inferior de la altura de árbol en el peor caso es una cota inferior del nº de comparaciones para cualquier algoritmo de ordenación por comparación"
   },
   {
    "title": "Cota inferior para algoritmos de ordenación (2)",
    "level": 3,
    "md": "Teorema: Cualquier algoritmo de ordenación por comparaciones necesita $\\Omega(n\\log n)$ comparaciones en el peor caso.\n\nDemostración: Tenemos un árbol de decisión de altura $h$ con $l$ hojas. Hay que demostrar que $h\\in\\Omega(n\\log n)$.\n- $n!\\le l$, tiene que haber por lo menos $n!$ hojas\n- $l\\le2^h$, un árbol binario de altura $h$ tiene como mucho $2^h$ hojas\n- $n!\\le l\\le2^h\\Rightarrow n!\\le2^h$\n- $\\log_2(n!)\\le\\log_2(2^h)\\Rightarrow h\\ge\\log_2(n!)$\n- Como $h\\ge\\log_2(n!)$, nos interesa conocer el orden de complejidad $\\log(n!)$, y nos basta con conocer una cota inferior"
   },
   {
    "title": "Cota inferior para algoritmos de ordenación (3)",
    "level": 3,
    "md": "Demostración: Queda por demostrar que $\\log(n!)\\in\\Omega(n\\log(n))$. Para ello usamos la definición formal. Antes transformamos $\\log(n!)$ en un sumatorio:\n\n$\\log(n!)=\\sum_{i=1}^{n}\\log(i)=\\sum_{i=2}^{n}\\log(i)\\ge c\\,n\\log(n)$\n\nProblema: ¿Cómo expresar $\\sum_{i=2}^{n}\\log(i)$ mediante una fórmula?\n\nTenemos que recurrir a cotas: $\\sum_{i=2}^{n}\\log(i)\\ge g(n)\\ge c\\,n\\log(n)$, donde $g(n)$ es una cota inferior de $\\sum_{i=2}^{n}\\log(i)$.\n\nSi demostramos $g(n)\\ge c\\,n\\log(n)$, entonces $\\sum_{i=2}^{n}\\log(i)\\ge c\\,n\\log(n)$."
   },
   {
    "title": "Cota inferior para algoritmos de ordenación (4)",
    "level": 3,
    "md": "Demostración: Cota inferior para $\\sum_{i=2}^{n}\\log(i)$:\n- Como $\\log(x)$ es creciente: $\\sum_{i=2}^{n}\\log(i)\\ge\\int_1^n\\log(x)\\,dx$\n- Integral por partes (asumimos que la base del logaritmo es $e$), con $u=\\log(x)$, $dv=dx$, $v=x$, $du=\\frac{1}{x}dx$:\n\n$\\int\\log(x)\\,dx=x\\log(x)-\\int x\\cdot\\frac{1}{x}\\,dx=x\\log(x)-\\int dx=x\\log(x)-x$"
   },
   {
    "title": "Cota inferior para algoritmos de ordenación (5)",
    "level": 3,
    "md": "Demostración: Cota inferior para $\\sum_{i=2}^{n}\\log(i)$:\n\n$\\sum_{i=2}^{n}\\log(i)\\ge\\int_1^n\\log(x)\\,dx=\\left[x\\log(x)-x\\right]_1^n=n\\log(n)-n+1$\n\nVolviendo a la demostración, buscamos una $c$ tal que $n\\log(n)-n+1\\ge c\\,n\\log(n)$ se cumpla en un intervalo $[n_0,\\infty]$:\n1. Cogemos $c=1/2$\n2. Planteamos $n\\log(n)-n+1\\ge\\frac12n\\log(n)$\n3. Hallamos un intervalo $[n_0,\\infty]$ donde se satisfaga la inecuación"
   },
   {
    "title": "Cota inferior para algoritmos de ordenación (6)",
    "level": 3,
    "md": "Demostración:\n- $n\\log(n)-n+1\\ge\\frac12n\\log(n)$\n- $\\frac12n\\log(n)-n+1\\ge0$\n- $n(\\frac12\\log(n)-1)+1\\ge0$\n- Se verifica si $\\frac12\\log(n)-1\\ge0$\n- $\\log(n)\\ge2$\n- $n\\ge e^2\\Rightarrow$ Se verifica en $[e^2,\\infty)$\n\nPor tanto, $n\\log(n)-n+1\\in\\Omega(n\\log(n))$.\n\nComo $n\\log(n)-n+1$ es cota inferior de $\\sum_{i=2}^{n}\\log(i)$, y $h\\ge\\sum_{i=2}^{n}\\log(i)$, tenemos: $h\\in\\Omega(n\\log(n))$ ∎"
   }
  ]
 },
 {
  "id": "t3.1_analisis_alg_iterativos",
  "title": "Tema 3.1 Análisis de algoritmos iterativos",
  "sections": [
   {
    "title": "Tema 3.1 Análisis de algoritmos iterativos",
    "level": 2,
    "md": "Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.\n\nContenido: 1 Introducción; 2 Análisis de eficiencia; 3 Procedimiento general"
   },
   {
    "title": "Introducción",
    "level": 2,
    "md": ""
   },
   {
    "title": "Eficiencia de algoritmos",
    "level": 3,
    "md": "- ¿Qué recursos necesitan los algoritmos?\n  - Espacio (memoria)\n  - Tiempo (número de operaciones)\n  - Otros: ancho de banda"
   },
   {
    "title": "Características del software",
    "level": 3,
    "md": "Amigabilidad, buen estilo, comentarios, corrección, escalabilidad, funcionalidad, mantenibilidad, modularidad, rendimiento, robustez, seguridad, simplicidad, tiempo de programación, ...\n- La eficiencia ayuda a alcanzar algunas de estas características"
   },
   {
    "title": "Análisis de eficiencia de algoritmos iterativos",
    "level": 2,
    "md": ""
   },
   {
    "title": "Un ejemplo: Insert-sort",
    "level": 3,
    "md": "Algoritmo de ordenación por inserción directa (insert-sort).\n\n[figura: traza sobre el vector `2 4 7 9 5 1 8 3`; parte ordenada a la izquierda, desordenada a la derecha; se toma el elemento a insertar (5), se compara con los anteriores desplazando 9 y 7 a la derecha, y se inserta: `2 4 5 7 9 1 8 3`]\n\nCódigo y coste por línea (n = len(a)):\n\n```python\n0 def insert_sort(a):                      # Coste   Nº de veces\n1     for j in range(1,len(a)):            # C1      n\n2         val = a[j]                       # C2      n-1\n3         # Inserta a[j] en la lista\n          # ordenada a[0:j-1]              # 0       n-1\n4         i = j-1                          # C4      n-1\n5         while (i>=0) and (a[i]>val):     # C5      sum_{j=1}^{n-1} (t_j + 1)\n6             a[i+1] = a[i]                # C6      sum_{j=1}^{n-1} t_j\n7             i = i-1                      # C7      sum_{j=1}^{n-1} t_j\n8         a[i+1] = val                     # C8      n-1\n```\n\n- $t_j$ = nº de veces que la condición del bucle de la línea 5 es verdadera (que se ejecuta el cuerpo del bucle), para un determinado valor de j\n- Ignoramos el coste concreto de cada operación básica\n- Cada línea l tardará un determinado tiempo o coste, que denotamos por $C_l$\n- La función de coste o tiempo, en función del tamaño del vector n es:\n\n$$T(n)=C_1 n+C_2(n-1)+C_4(n-1)+C_5\\sum_{j=1}^{n-1}(t_j+1)+C_6\\sum_{j=1}^{n-1}t_j+C_7\\sum_{j=1}^{n-1}t_j+C_8(n-1)$$\n\n- $t_j$ depende del vector de entrada particular\n\nMejor caso (vector ordenado de menor a mayor): $t_j=0$, para todo j\n\n$$T(n)=C_1 n+C_2(n-1)+C_4(n-1)+C_5(n-1)+C_8(n-1)$$\n$$=(C_1+C_2+C_4+C_5+C_8)n-(C_2+C_4+C_5+C_8)=K_1 n+K_2\\in\\Theta(n)$$\n\n- El orden de T(n) es lineal\n- ¡Para el orden, el valor de las constantes no importa!\n\nPeor caso (vector ordenado de mayor a menor): $t_j=j$ (valor máximo para cada j)\n\nEn primer lugar observamos que:\n\n$$\\sum_{j=1}^{n-1}(j+1)=\\sum_{j=2}^{n}j=\\frac{n(n+1)}{2}-1 \\qquad\\qquad \\sum_{j=1}^{n-1}j=\\frac{n(n-1)}{2}$$\n\nSustituyendo:\n\n$$T(n)=C_1 n+C_2(n-1)+C_4(n-1)+C_5\\left(\\frac{n(n+1)}{2}-1\\right)+C_6\\frac{n(n-1)}{2}+C_7\\frac{n(n-1)}{2}+C_8(n-1)$$\n$$=\\left(\\frac{C_5}{2}+\\frac{C_6}{2}+\\frac{C_7}{2}\\right)n^2+\\left(C_1+C_2+C_4+\\frac{C_5}{2}-\\frac{C_6}{2}-\\frac{C_7}{2}+C_8\\right)n-(C_2+C_4+C_5+C_8)=K_1 n^2+K_2 n+K_3\\in\\Theta(n^2)$$\n\n- El orden de T(n) es cuadrático"
   },
   {
    "title": "Caso medio frente a caso peor",
    "level": 3,
    "md": "En ocasiones se puede calcular el caso medio, pero nos centraremos en el estudio de caso peor debido a:\n- El caso peor representa una cota superior para cualquier entrada, dándonos una garantía de que el algoritmo no tardará más\n- El caso peor suele ocurrir con frecuencia\n  - En una búsqueda, ocurre cuando el elemento buscado no se encuentra\n- El tiempo medio suele ser tan malo como el peor en términos asintóticos\n  - Si en el insert-sort hay que insertar el elemento hasta la posición j/2, el tiempo también sale cuadrático"
   },
   {
    "title": "Procedimiento general basado en sumatorios",
    "level": 2,
    "md": ""
   },
   {
    "title": "Otro ejemplo: Bubble-sort (variante)",
    "level": 3,
    "md": "Algoritmo de ordenación \"burbuja\" (bubble-sort). Variante: tras cada iteración los elementos más pequeños quedan correctamente ordenados.\n\n[figura: traza sobre `1 2 3 4 7 9 5 8`; parte ordenada a la izquierda (1 2 3), desordenada a la derecha; se comparan elementos adyacentes recorriendo de derecha a izquierda y se intercambian si están desordenados: `...7 9 5 8` -> `...7 5 9 8` -> `...5 7 9 8`]\n\n```python\n1   def bubble_sort(a):\n2\n3       n = len(a)\n4\n5       for i in range(0,n-1):               # i=0..n-2\n6\n7           for j in range(n-1, i, -1):      # j=n-1..i+1\n8\n9               if(a[j-1]>a[j]):\n10\n11                  aux = a[j-1]\n12                  a[j-1] = a[j]\n13                  a[j] = aux\n```"
   },
   {
    "title": "Operaciones de un bucle de n iteraciones",
    "level": 3,
    "md": "- 1 inicialización\n- n comparaciones\n- Tiempo de ejecutar el cuerpo del bucle n veces\n- n incrementos\n- 1 última comparación para salir del bucle\n\n$$T_{bucle}=1_{inic.}+\\sum_{i=1}^{n}\\left(1_{comp.}+T_{cuerpo}+1_{incr.}\\right)+1_{última\\ comp.}$$"
   },
   {
    "title": "Tiempo en el mejor caso",
    "level": 3,
    "md": "1ª forma: simplemente contando operaciones\n\n- For 1: $1_{inic.}+(n-1)_{incr.}+(n-1)_{comp.}+1_{última\\ comp.}=2n$\n- For 2: $(n-1)_{inic.}+\\big[(n-1)+(n-2)+\\dots+1\\big]_{comp.}+(n-1)_{última\\ comp.}+\\big[(n-1)+(n-2)+\\dots+1\\big]_{decr.}+\\big[(n-1)+(n-2)+\\dots+1\\big]_{comp.\\ del\\ IF}$\n- Sumando todo:\n\n$$T_{mejor}(n)=1+2n+2(n-1)+3\\frac{n(n-1)}{2}=\\frac{3}{2}n^2+\\frac{5}{2}n-1\\in\\Theta(n^2)$$\n\n2ª forma: usando la fórmula del bucle\n\n$$T_{mejor}(n)=1+1+\\sum_{i=0}^{n-2}\\left[1+1+\\sum_{j=i+1}^{n-1}(1+1+1)+1+1\\right]+1$$\n\n- For 1: $T_{mejor}(n)=1_{inic.}+\\sum_{i=0}^{n-2}\\left[1_{comp.}+T_{For\\ 2}+1_{incr.}\\right]+1_{última\\ comp.}$\n- For 2: $T_{mejor}(n)=1_{inic.}+\\sum_{j=i+1}^{n-1}\\left[1_{comp.}+1_{comp.\\ IF}+1_{incr.}\\right]+1_{última\\ comp.}$\n\nSimplificando:\n\n$$T_{mejor}(n)=3+\\sum_{i=0}^{n-2}\\left(4+\\sum_{j=i+1}^{n-1}3\\right)$$\n\nEl sumatorio interno suma 3, (n − i − 1) veces. Por tanto:\n\n$$T_{mejor}(n)=3+4(n-1)+\\sum_{i=0}^{n-2}3(n-i-1)$$\n$$=3+4n-4+3n(n-1)-3\\frac{(n-1)(n-2)}{2}-3(n-1)$$\n$$T_{mejor}(n)=\\frac{3}{2}n^2+\\frac{5}{2}n-1\\in\\Theta(n^2)$$"
   },
   {
    "title": "Ejemplo con tres bucles",
    "level": 3,
    "md": "Calculad el número de operaciones (T(n)) que realiza el siguiente código:\n\n```python\n1 def codigo(n):\n2     for i in range(0,n):\n3         for j in range(i+1,n+1):\n4             if (condicion(i)):   # una operación\n5                 for k in range(0,j):\n6                     procesa(i,j,k); # dos operaciones\n```\n\n- Se considera que las inicializaciones, comparaciones, e incrementos siempre necesitan una sola operación.\n\nEl código consta de 3 bucles, que podemos descomponer de la siguiente manera:\n\n$$T(n)=1+\\sum_{i=0}^{n-1}(1+T_{For\\ 2}+1)+1$$\n$$T_{For\\ 2}=1+\\sum_{j=i+1}^{n}(1+T_{If}+1)+1$$\n$$T_{If}=\\begin{cases}1 & \\text{en el mejor caso}\\\\ 1+1+\\sum_{k=0}^{j-1}(1+2+1)+1=3+4j & \\text{en el peor caso}\\end{cases}$$\n\nMejor caso. Si $T_{If}=1$, entonces sustituyendo en $T_{For\\ 2}$ tenemos:\n\n$$T_{For\\ 2}=2+\\sum_{j=i+1}^{n}3=2+3(n-i)=3n+2-3i$$\n\nSustituyendo en T(n) obtenemos:\n\n$$T(n)=2+\\sum_{i=0}^{n-1}(3n+4-3i)=2+3n^2+4n-3\\sum_{i=0}^{n-1}i=2+3n^2+4n-3\\frac{(n-1)n}{2}=\\frac{4+6n^2+8n-3n^2+3n}{2}=\\frac{3n^2+11n+4}{2}\\in\\Theta(n^2)$$\n\nPeor caso. Sustituyendo $T_{If}$ en $T_{For\\ 2}$ tenemos:\n\n$$T_{For\\ 2}=2+\\sum_{j=i+1}^{n}(5+4j)=2+5(n-i)+4\\sum_{j=i+1}^{n}j=2+5n-5i+4\\left(\\sum_{j=1}^{n}j-\\sum_{j=1}^{i}j\\right)=2+5n-5i+4\\left(\\frac{n(n+1)}{2}-\\frac{i(i+1)}{2}\\right)$$\n\nSimplificando obtenemos:\n\n$$T_{For\\ 2}=2+5n-5i+2n^2+2n-2i^2-2i=2n^2+7n+2-7i-2i^2$$\n\nSustituyendo en la expresión para el primer bucle tenemos:\n\n$$T(n)=2+\\sum_{i=0}^{n-1}(2n^2+7n+4-7i-2i^2)=2+2n^3+7n^2+4n-7\\sum_{i=0}^{n-1}i-2\\sum_{i=0}^{n-1}i^2$$\n$$=2+2n^3+7n^2+4n-7\\frac{(n-1)n}{2}-2\\frac{(n-1)n(2n-1)}{6}$$\n$$=2+2n^3+7n^2+4n-7\\frac{n^2}{2}+7\\frac{n}{2}-2\\frac{2n^3-3n^2+n}{6}$$\n$$=\\frac{12+12n^3+42n^2+24n-21n^2+21n-4n^3+6n^2-2n}{6}$$\n\nFinalmente:\n\n$$T(n)=\\frac{8n^3+27n^2+43n+12}{6}\\in\\Theta(n^3)$$"
   }
  ]
 },
 {
  "id": "t3.2_analisis_alg_recursivos",
  "title": "Tema 3.2 Análisis de algoritmos recursivos",
  "sections": [
   {
    "title": "Tema 3.2 Análisis de algoritmos recursivos",
    "level": 2,
    "md": "Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.\nContenido: 1 Introducción; 2 Expansión de recurrencias; 3 Método general; 4 Eficiencia en espacio."
   },
   {
    "title": "Introducción",
    "level": 2,
    "md": ""
   },
   {
    "title": "Análisis de algoritmos recursivos",
    "level": 3,
    "md": "- La matemática necesaria son las relaciones de recurrencia (ecuaciones en diferencias, o simplemente recurrencias): expresiones matemáticas recursivas.\n$$T(n)=\\begin{cases}3 & n=0\\\\ 5+T(n-1) & n>0\\end{cases}$$\n- Resolver una recurrencia = dar una fórmula no recursiva equivalente: $T(n)=5n+3$\n- Dos formas de resolverlas: expansión de recurrencias; \"método general\"."
   },
   {
    "title": "Análisis de eficiencia en tiempo: expansión de recurrencias",
    "level": 2,
    "md": ""
   },
   {
    "title": "Función potencia - versión 1",
    "level": 3,
    "md": "```python\ndef pot1(b,e): # e de tipo entero no negativo\n    if e==0:\n        return 1;\n    else:\n        return b*pot1(b,e-1)\n```\n$$T(n)=\\begin{cases}3 & n=0\\\\ 5+T(n-1) & n>0\\end{cases}$$\n- n está relacionado con el tamaño del problema, aquí el exponente e.\n- En el caso base se realizan 3 operaciones, y 5 en el recursivo (además del tiempo de otra llamada con parámetro n-1)."
   },
   {
    "title": "Resolución por expansión de recurrencias",
    "level": 3,
    "md": "$T(n)=5+T(n-1)=5+5+T(n-2)=5\\cdot2+T(n-2)=5+5+5+T(n-3)=5\\cdot3+T(n-3)=\\dots=5i+T(n-i)$\n- Se llega al caso base T(0) cuando i=n.\n- Sustituyendo: $T(n)=5n+T(0)=5n+3\\in\\Theta(n)$\n- Tiene sentido: se decrementa n en cada llamada recursiva."
   },
   {
    "title": "Función potencia - versión 2",
    "level": 3,
    "md": "```python\ndef pot2(b,e): # e de tipo entero no negativo\n    if e==0:\n        return 1;\n    elif e%2==0:\n        return pot2(b*b,e//2)\n    else:\n        return b*pot2(b*b,e//2)\n```\n$$T(n)=\\begin{cases}3 & n=0\\\\ 8+T(n/2) & n>0,\\ n\\text{ par}\\\\ 9+T((n-1)/2) & n>0,\\ n\\text{ impar}\\end{cases}$$\n- Función difícil de analizar, pero se puede suponer $n=2^x$ potencia de dos; el resultado del análisis es el mismo."
   },
   {
    "title": "Resolución por expansión de recurrencias",
    "level": 3,
    "md": "- Asumimos $n=2^x$ (por tanto par):\n$T(n)=8+T(n/2)=8+8+T(n/4)=8\\cdot2+T(n/2^2)=8+8+8+T(n/8)=8\\cdot3+T(n/2^3)=\\dots=8i+T(n/2^i)$\n- ¿Cuándo se llega a T(0)? i→∞, no tiene sentido: el parámetro de T es entero.\n- Se llega a T(1) cuando $n/2^i=1$, es decir $i=\\log_2 n$.\n- Sustituyendo: $T(n)=8\\log_2 n+T(1)=8\\log_2 n+9+T(0)=8\\log_2 n+9+3=8\\log_2 n+12\\in\\Theta(\\log n)$\n- Tiene sentido: se divide n por 2 en cada llamada recursiva."
   },
   {
    "title": "Soluciones generales a relaciones de recurrencia",
    "level": 3,
    "md": "- $T(n)=\\begin{cases}a & n=0\\\\ b+T(n-1) & n>0\\end{cases}$ ⇒ $T(n)=bn+a\\in\\Theta(n)$\n- $T(n)=\\begin{cases}a & n=1\\\\ b+T(n-1) & n>1\\end{cases}$ ⇒ $T(n)=b(n-1)+a\\in\\Theta(n)$\n- $T(n)=\\begin{cases}a & n=1\\\\ b+T(n/2) & n>1\\end{cases}$ ⇒ $T(n)=b\\log_2 n+a\\in\\Theta(\\log n)$\n- $T(n)=\\begin{cases}a & n=0\\\\ b+T(n/2) & n>0\\end{cases}$ ⇒ $T(n)=b\\log_2 n+b+a\\in\\Theta(\\log n)$\n\n#### $T(n)=\\begin{cases}a & n=0\\\\ bn+c+T(n-1) & n>0\\end{cases}$\n$T(n)=bn+c+T(n-1)$\n$=bn+c+b(n-1)+c+T(n-2)=2bn-b+2c+T(n-2)$\n$=2bn-b+2c+b(n-2)+c+T(n-3)=3bn-b(1+2)+3c+T(n-3)$\n$=3bn-b(1+2)+3c+b(n-3)+c+T(n-4)=4bn-b(1+2+3)+4c+T(n-4)$\n$\\dots=ibn-b\\sum_{j=1}^{i-1}j+ic+T(n-i)=ibn+ic-b\\frac{i(i-1)}{2}+T(n-i)$\n- Se alcanza T(0) para i=n. Sustituyendo: $T(n)=bn^2-\\frac b2 n(n-1)+cn+a$\n- $T(n)=\\frac b2 n^2+(c+\\frac b2)n+a\\in\\Theta(n^2)$\n- Tiene sentido: se hacen $n+(n-1)+(n-2)+\\dots+1$ operaciones.\n\n#### $T(n)=\\begin{cases}a & n=0\\\\ bn+c+2T(n/2) & n>0\\end{cases}$\n$T(n)=bn+c+2T(n/2)$\n$=bn+c+2\\left[b\\frac n2+c+2T(n/4)\\right]$\n$=bn+c+2\\left[b\\frac n2+c+2\\left[b\\frac n4+c+2T(n/8)\\right]\\right]$\n$=3bn+c(1+2+4)+2^3T(n/2^3)=3bn+c(2^3-1)+2^3T(n/2^3)$\n$\\dots=ibn+c(2^i-1)+2^iT(n/2^i)$\n- Se alcanza T(1) para $n/2^i=1$, es decir $i=\\log_2 n$. Sustituyendo:\n$T(n)=bn\\log_2 n+c(n-1)+nT(1)=bn\\log_2 n+c(n-1)+n(b+c+2T(0))=bn\\log_2 n+cn-c+nb+nc+2na$\n$T(n)=bn\\log_2 n+(2c+b+2a)n-c\\in\\Theta(n\\log n)$\n- Tiene sentido: se hacen n operaciones $1+\\log_2 n$ veces.\n[figura: árbol de recursión binario completo; raíz n, nivel 1: n/2, n/2; nivel 2: n/4 (x4); ... hojas: n hojas de coste 1; 1+log2 n niveles, cada nivel suma n]"
   },
   {
    "title": "Teorema maestro - versión simple",
    "level": 3,
    "md": "Fórmula útil para algoritmos \"divide y vencerás\":\n$$T(n)=\\begin{cases}d & n=1\\\\ aT(n/b)+cn^k & n>1\\end{cases}$$\n$$T(n)=\\begin{cases}\\Theta(n^k) & \\text{si } a/b^k<1\\\\ \\Theta(n^k\\log n) & \\text{si } a/b^k=1\\\\ \\Theta(n^{\\log_b a}) & \\text{si } a/b^k>1\\end{cases}$$"
   },
   {
    "title": "Teorema maestro - demostración",
    "level": 3,
    "md": "$T(n)=aT(n/b)+cn^k$\n$=a\\left[aT\\left(\\frac n{b^2}\\right)+c\\left(\\frac nb\\right)^k\\right]+cn^k=a^2T\\left(\\frac n{b^2}\\right)+cn^k\\left(1+\\frac a{b^k}\\right)$\n$=a^2\\left[aT\\left(\\frac n{b^3}\\right)+c\\left(\\frac n{b^2}\\right)^k\\right]+cn^k\\left(1+\\frac a{b^k}\\right)=a^3T\\left(\\frac n{b^3}\\right)+cn^k\\left(1+\\frac a{b^k}+\\frac{a^2}{b^{2k}}\\right)$\n$\\dots=a^iT\\left(\\frac n{b^i}\\right)+cn^k\\sum_{j=0}^{i-1}\\left(\\frac a{b^k}\\right)^j$\n- Se alcanza T(1)=c cuando $i=\\log_b n$:\n$=ca^{\\log_b n}+cn^k\\sum_{j=0}^{\\log_b n-1}\\left(\\frac a{b^k}\\right)^j=cn^k\\left(\\frac a{b^k}\\right)^{\\log_b n}+cn^k\\sum_{j=0}^{\\log_b n-1}\\left(\\frac a{b^k}\\right)^j$"
   },
   {
    "title": "Teorema maestro - demostración (logaritmos)",
    "level": 3,
    "md": "- La última igualdad se debe a: $cn^k\\left(\\frac a{b^k}\\right)^{\\log_b n}=cn^k\\frac{a^{\\log_b n}}{b^{k\\log_b n}}=cn^k\\frac{a^{\\log_b n}}{n^k}=ca^{\\log_b n}$\n- Más adelante también se necesita: $n^{\\log_b a}=a^{\\log_b n}$, ya que $\\log_b n^{\\log_b a}=\\log_b a^{\\log_b n}=\\log_b a\\cdot\\log_b n$\n- Finalmente: $T(n)=cn^k\\sum_{j=0}^{\\log_b n}\\left(\\frac a{b^k}\\right)^j$\n- Hay 3 casos según los valores de a, b y k."
   },
   {
    "title": "Teorema maestro - demostración (casos)",
    "level": 3,
    "md": "$T(n)=cn^k\\sum_{j=0}^{\\log_b n}\\left(\\frac a{b^k}\\right)^j$\n1. $a<b^k\\Rightarrow T(n)\\in\\Theta(n^k)$. Como $\\sum_{i=0}^{\\infty}r^i=\\frac1{1-r}$ = constante (no diverge) para r<1.\n2. $a=b^k\\Rightarrow T(n)\\in\\Theta(n^k\\log n)$. $T(n)=cn^k(\\log_b n+1)$\n3. $a>b^k\\Rightarrow T(n)\\in\\Theta(n^{\\log_b a})$\n$T(n)=cn^k\\frac{\\left(\\frac a{b^k}\\right)^{\\log_b n+1}-1}{\\frac a{b^k}-1}=\\frac{cn^k\\left(\\frac a{b^k}\\right)\\frac{a^{\\log_b n}}{n^k}-cn^k}{K_1}=\\frac{K_2a^{\\log_b n}-cn^k}{K_1}=\\frac{K_2n^{\\log_b a}-cn^k}{K_1}$\nComo $a>b^k\\Rightarrow\\log_b a>k\\Rightarrow T(n)\\in\\Theta(n^{\\log_b a})$"
   },
   {
    "title": "Teorema maestro - versión completa",
    "level": 3,
    "md": "Dada una recurrencia $T(n)=aT(n/b)+f(n)$ donde a>0, b>0 y f(n) asintóticamente positiva, se puede aplicar el teorema maestro en estos tres casos:\n1. Si $f(n)=O(n^{\\log_b a-\\epsilon})$ para alguna constante $\\epsilon>0$, entonces $T(n)\\in\\Theta(n^{\\log_b a})$\n2. Si $f(n)=\\Theta(n^{\\log_b a}\\log^k n)$ con k≥0 (k suele ser 0), entonces $T(n)\\in\\Theta(n^{\\log_b a}\\log^{k+1}n)$\n3. Si $f(n)=\\Omega(n^{\\log_b a+\\epsilon})$ con $\\epsilon>0$, y f(n) satisface la condición de regularidad ($af(n/b)\\le cf(n)$ para alguna constante c<1 y para todo n suficientemente grande), entonces $T(n)\\in\\Theta(f(n))$"
   },
   {
    "title": "Errores frecuentes - Expansión de recurrencias",
    "level": 3,
    "md": "- No comprobar que la fórmula final sea análoga a la recurrencia inicial (también al aplicar el método general).\n- No realizar correctamente la primera expansión (muy frecuente).\n- No simplificar: los patrones serán mucho más complicados."
   },
   {
    "title": "Análisis de eficiencia en tiempo: método general",
    "level": 2,
    "md": "- No siempre se puede aplicar la expansión de recurrencias. Para muchas recurrencias no se conoce la forma de resolverlas (como con integrales o ecuaciones diferenciales: se sabe resolver un subconjunto, no todas).\n- El método general amplía el conjunto de recurrencias resolubles.\n[figura: diagrama de conjuntos; \"Método general de resolución de recurrencias\" contiene a \"Expansión de recurrencias\", dentro del conjunto \"Recurrencias\"]"
   },
   {
    "title": "Recurrencias homogéneas",
    "level": 3,
    "md": "- Recurrencia homogénea (aparece un 0 en la parte derecha): $a_0T(n)+a_1T(n-1)+\\dots+a_kT(n-k)=0$\n- Se buscan soluciones del tipo: $T(n)=C_1P_1(n)r_1^n+\\dots+C_kP_k(n)r_k^n=\\sum_{i=1}^{k}C_iP_i(n)r_i^n$\n- Realizando el cambio $x^{z-n+k}=T(z)$ se obtiene la ecuación característica asociada: $a_0x^k+a_1x^{k-1}+\\dots+a_{k-1}x+a_k=0$"
   },
   {
    "title": "Primer caso: raíces distintas",
    "level": 3,
    "md": "- Si todas las raíces del polinomio de la ecuación característica son distintas: $T(n)=C_1r_1^n+\\dots+C_kr_k^n=\\sum_{i=1}^{k}C_ir_i^n$\n- Las constantes $r_i$ son las raíces de la ecuación característica.\n- $P_i(n)=1$, para todo i.\n- Las constantes $C_i$ se hallan a partir de las condiciones iniciales, resolviendo un sistema de ecuaciones."
   },
   {
    "title": "Ejemplo: Números de Fibonacci",
    "level": 3,
    "md": "$$T(n)=\\begin{cases}0 & n=0\\\\ 1 & n=1\\\\ T(n-1)+T(n-2) & n>1\\end{cases}$$\n- Ecuación característica $x^2-x-1=0$, raíces $r_1=\\frac{1+\\sqrt5}2$, $r_2=\\frac{1-\\sqrt5}2$\n- Al ser distintas: $T(n)=C_1r_1^n+C_2r_2^n=C_1\\left(\\frac{1+\\sqrt5}2\\right)^n+C_2\\left(\\frac{1-\\sqrt5}2\\right)^n$\n- Constantes a partir de condiciones iniciales (casos base):\n  - $C_1+C_2=0=T(0)$\n  - $C_1\\frac{1+\\sqrt5}2+C_2\\frac{1-\\sqrt5}2=1=T(1)$\n- Resolviendo: $C_1=\\frac1{\\sqrt5}$, $C_2=-\\frac1{\\sqrt5}$\n- Finalmente: $T(n)=\\frac1{\\sqrt5}\\left(\\frac{1+\\sqrt5}2\\right)^n-\\frac1{\\sqrt5}\\left(\\frac{1-\\sqrt5}2\\right)^n$\n- El segundo término tiende a 0 según n→∞, por tanto $T(n)\\in\\Theta\\left(\\left(\\frac{1+\\sqrt5}2\\right)^n\\right)$\n- El orden es exponencial. El árbol de recursión es binario pero está podado. Para un árbol binario completo el orden es $2^n$. Aquí la base del exponente es $(1+\\sqrt5)/2\\approx1.618<2$.\n[figura: árbol de recursión de Fibonacci con raíz 7; cada nodo k>1 tiene hijos k-1 y k-2; hojas 1 y 0 (árbol podado)]"
   },
   {
    "title": "Segundo caso: raíces con multiplicidad mayor que 1",
    "level": 3,
    "md": "- En general el polinomio de la ecuación característica puede tener raíces con multiplicidad 1 o mayor: $(x-r_1)^{m_1}(x-r_2)^{m_2}\\cdots(x-r_k)^{m_k}=0$\n- La solución tiene la forma: $T(n)=\\sum_{i=1}^{m_1}C_{1i}n^{i-1}r_1^n+\\sum_{i=1}^{m_2}C_{2i}n^{i-1}r_2^n+\\dots+\\sum_{i=1}^{m_k}C_{ki}n^{i-1}r_k^n$\n- Ejemplo: $T(n)=5T(n-1)-8T(n-2)+4T(n-3)$\n  - Ecuación característica: $x^3-5x^2+8x-4=(x-2)^2(x-1)=0$\n  - El 2 es raíz doble, por tanto: $T(n)=C_12^n+C_2n2^n+C_31^n$"
   },
   {
    "title": "Recurrencias no homogéneas - una primera idea",
    "level": 3,
    "md": "- La parte derecha ya no es 0: $T(n)-2T(n-1)=3^n$ (a)\n- Se convierte en homogénea:\n  - $T(n+1)-2T(n)=3^{n+1}$ (1)\n  - $3T(n)-6T(n-1)=3^{n+1}$ (2)\n  - $T(n+1)-5T(n)+6T(n-1)=0$ (1)-(2)\n- En (1) se incrementa n en (a); en (2) se multiplica (a) por 3.\n- Con T(0)=0 y T(1)=3: $T(n)=3\\cdot3^n-3\\cdot2^n\\in\\Theta(3^n)$"
   },
   {
    "title": "Recurrencias no homogéneas - caso simple",
    "level": 3,
    "md": "- Un solo término a la derecha, donde d es el orden del polinomio P(n): $a_0T(n)+a_1T(n-1)+\\dots+a_kT(n-k)=b^nP^d(n)$\n- Ecuación característica: $(a_0x^k+a_1x^{k-1}+\\dots+a_k)(x-b)^{d+1}=0$\n- Ejemplo: $T(n)-2T(n-1)=n$, con $b=1$, $P(n)=n$, $d=1$\n  - $(x-2)(x-1)^2=0\\Rightarrow T(n)=C_12^n+C_21^n+C_3n1^n\\in\\Theta(2^n)$"
   },
   {
    "title": "Recurrencias no homogéneas - caso general",
    "level": 3,
    "md": "- Recurrencia general: $a_0T(n)+a_1T(n-1)+\\dots+a_kT(n-k)=b_1^nP_1^{d_1}(n)+\\dots+b_s^nP_s^{d_s}(n)$\n- Ecuación característica: $(a_0x^k+a_1x^{k-1}+\\dots+a_k)(x-b_1)^{d_1+1}\\cdots(x-b_s)^{d_s+1}=0$\n- Ejemplo: $T(n)=2T(n-1)+n+2^n$ con $T(0)=1$\n  - Ecuación característica: $(x-2)(x-1)^2(x-2)=(x-2)^2(x-1)^2=0$\n  - Solución (sin hallar constantes): $T(n)=C_12^n+C_2n2^n+C_31^n+C_4n1^n$\n- Dado T(0)=1, y usando $T(n)=2T(n-1)+n+2^n$, hay que hallar T(1), T(2), T(3) para formar un sistema de 4 ecuaciones con 4 incógnitas (las constantes): $T(1)=5$, $T(2)=16$, $T(3)=43$\n  - $C_1+C_3=1=T(0)$\n  - $2C_1+2C_2+C_3+C_4=5=T(1)$\n  - $4C_1+8C_2+C_3+2C_4=16=T(2)$\n  - $8C_1+24C_2+C_3+3C_4=43=T(3)$\n- Solución final ($C_1=3$, $C_2=1$, $C_3=-2$, $C_4=-1$): $T(n)=3\\cdot2^n+n2^n-2-n\\in\\Theta(n2^n)$"
   },
   {
    "title": "Método de cambio de variable",
    "level": 3,
    "md": "- Recurrencia: $T(n)=4T(n/2)+n$, $T(1)=1$, $T(2)=6$\n- Cambio $n=2^k\\Rightarrow T(2^k)=4T(2^{k-1})+2^k$\n- $T(n)=T(2^k)=t(k)\\Rightarrow t(k)=4t(k-1)+2^k$ (nueva recurrencia)\n- Ecuación característica: $(x-4)(x-2)=0$\n- $t(k)=C_1(4^k)+C_2(2^k)=C_1(2^k)^2+C_2(2^k)$\n- Deshaciendo el cambio: $T(n)=C_1n^2+C_2n$\n- Hallando las constantes: $T(n)=2n^2-n\\in\\Theta(n^2)$"
   },
   {
    "title": "Expansión de recurrencias (mismo ejemplo)",
    "level": 3,
    "md": "$T(n)=4T(n/2)+n$\n$=4\\left[4T\\left(\\frac n4\\right)+\\frac n2\\right]+n=4^2T\\left(\\frac n{2^2}\\right)+2n+n$\n$=4\\left[4\\left[4T\\left(\\frac n8\\right)+\\frac n4\\right]+\\frac n2\\right]+n=4^3T\\left(\\frac n{2^3}\\right)+4n+2n+n$\n$=4^iT\\left(\\frac n{2^i}\\right)+n\\sum_{j=0}^{i-1}2^j=4^iT\\left(\\frac n{2^i}\\right)+n(2^i-1)$\n- El caso base T(1) se alcanza cuando $n=2^i$; $n^2=(2^i)^2=(2^2)^i=4^i$. Sustituyendo: $T(n)=n^2+n(n-1)=2n^2-n$"
   },
   {
    "title": "Errores frecuentes - método general",
    "level": 3,
    "md": "- Cambio de variable $n=2^k$ y ecuación $T(2^k)=4T(2^{k-1})+2^k$:\n  - Error: al cambiar $t(k)=T(2^k)$ hacer $t(k)=4t(k-1)+k$\n  - Correcto: $t(k)=4t(k-1)+2^k$\n- Si $t(k)-t(k-1)=3^{2k}$ no hay una potencia del tipo $b^k$ en el miembro derecho. Hay que transformarla: $3^{2k}=(3^2)^k=9^k$\n- Para hallar el polinomio característico hay que sacar factor común de las potencias en el miembro derecho:\n  - $t(k)-t(k-1)=2+k^3+2^k+k2^k$ es $t(k)-t(k-1)=(2+k^3)1^k+(1+k)2^k$\n  - El polinomio característico sería $(x-1)(x-1)^4(x-2)^2=(x-1)^5(x-2)^2$"
   },
   {
    "title": "Análisis de eficiencia en espacio",
    "level": 2,
    "md": ""
   },
   {
    "title": "Modelo de memoria",
    "level": 3,
    "md": "Modelo (simple) de memoria, de arriba abajo: Pila / Subprogramas; Montículo (heap); Datos estáticos; Código.\n- Código del algoritmo.\n- Datos estáticos: variables globales.\n- Llamadas a subprogramas (pila): parámetros, variables locales.\n- Memoria dinámica (montículo)."
   },
   {
    "title": "Árbol y proceso de llamadas a funciones",
    "level": 3,
    "md": "```\n...\nA(..)\n...\n\ndef A(...)\n    ...\n    B(..)\n    ...\n\ndef B(...)\n    ...\n    C(..)\n    ...\n\ndef C(...)\n    ...\n```\n- Árbol de llamadas: main -> A -> B -> C (cadena).\n- Proceso de llamadas (orden): main; 1 llamada a A; 2 llamada a B; 3 llamada a C; 4 fin de C; 5 fin de B; 6 fin de A."
   },
   {
    "title": "Estado de la pila",
    "level": 3,
    "md": "Secuencia de estados de la pila (sobre datos dinámicos, datos estáticos, código): vacía -> A -> A,B -> A,B,C -> A,B -> A -> vacía."
   },
   {
    "title": "Árbol recursivo",
    "level": 3,
    "md": "- Caso recursivo: $F_{n+2}=F_{n+1}+F_n$. Casos base $F_1=F_2=1$.\n```\nF5\n  F4\n    F3\n      F2\n      F1\n    F2\n  F3\n    F2\n    F1\n```"
   },
   {
    "title": "Estado de la pila",
    "level": 3,
    "md": "Secuencia de estados de la pila para el cálculo de F5 (recorrido en profundidad del árbol anterior; la pila crece en cada llamada y decrece al retornar). Altura máxima de la pila: F5,F4,F3,F2 (4 niveles).\n$$Espacio(n)\\in\\Theta(n)$$"
   },
   {
    "title": "Llamadas a subprogramas",
    "level": 3,
    "md": "- La complejidad depende de la profundidad del árbol recursivo de llamadas (para ilustrarlo, los nodos de un mismo nivel se colorean igual).\n- También depende de los recursos que requiera cada subprograma (función/método/subrutina) ejecutado:\n  - Parámetros de los subprogramas\n  - Variables locales a los subprogramas\n  - Memoria dinámica reservada al ejecutar el subprograma"
   }
  ]
 }
];
window.SKILLS = [
 {
  "id": "asint-definiciones",
  "label": "Definición de O/Ω/Θ",
  "tema": "analisis",
  "theory": [
   {
    "lecture": "t2.2_notaciones_asintoticas",
    "section": "Definición formal de cota superior"
   },
   {
    "lecture": "t2.2_notaciones_asintoticas",
    "section": "Definición formal de cota inferior"
   },
   {
    "lecture": "t2.2_notaciones_asintoticas",
    "section": "Definición formal de cota ajustada"
   }
  ],
  "patterns": [
   "\\\\in\\s*(O|\\\\Omega|\\\\Theta|\\\\theta)\\b",
   "definición de .*(O|complejidad asintótica)",
   "Ordena de menor a mayor"
  ]
 },
 {
  "id": "contar-bucles",
  "label": "Contar operaciones de bucles",
  "tema": "analisis",
  "theory": [
   {
    "lecture": "t3.1_analisis_alg_iterativos",
    "section": "Procedimiento general basado en sumatorios"
   },
   {
    "lecture": "t3.1_analisis_alg_iterativos",
    "section": "Operaciones de un bucle de n iteraciones"
   }
  ],
  "patterns": [
   "número de operaciones",
   "bucle de tipo FOR",
   "procesa\\("
  ]
 },
 {
  "id": "sumatorios",
  "label": "Sumatorios y fórmulas cerradas",
  "tema": "analisis",
  "theory": [
   {
    "lecture": "t2.1_prelim_matematicos",
    "section": "Suma de los primeros n naturales"
   },
   {
    "lecture": "t2.1_prelim_matematicos",
    "section": "Sumas parciales de series geométricas"
   }
  ],
  "patterns": [
   "fórmulas que no incluyan",
   "sumatorio",
   "Simplifica el siguiente sumatorio"
  ]
 },
 {
  "id": "cotas-integral",
  "label": "Cotas por integrales",
  "tema": "analisis",
  "theory": [
   {
    "lecture": "t2.1_prelim_matematicos",
    "section": "Aproximación por integrales"
   }
  ],
  "patterns": [
   "aproximación por integrales",
   "cota inferior y una superior"
  ]
 },
 {
  "id": "rec-expansion",
  "label": "Recurrencias: expansión",
  "tema": "analisis",
  "theory": [
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Resolución por expansión de recurrencias"
   },
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Función potencia - versión 1"
   }
  ],
  "patterns": [
   "expansión de recurrencias"
  ]
 },
 {
  "id": "rec-general",
  "label": "Recurrencias: método general",
  "tema": "analisis",
  "theory": [
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Análisis de eficiencia en tiempo: método general"
   },
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Recurrencias no homogéneas - caso general"
   },
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Método de cambio de variable"
   }
  ],
  "patterns": [
   "método general",
   "relación de recurrencia"
  ]
 },
 {
  "id": "complejidad-general",
  "label": "Complejidad (general)",
  "tema": "analisis",
  "theory": [
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Teorema maestro - versión completa"
   }
  ],
  "patterns": []
 },
 {
  "id": "recursion-basica",
  "label": "Recursión básica",
  "tema": "diseno",
  "theory": [],
  "patterns": []
 },
 {
  "id": "divide-y-venceras",
  "label": "Divide y vencerás",
  "tema": "diseno",
  "theory": [],
  "patterns": []
 },
 {
  "id": "backtracking",
  "label": "Backtracking",
  "tema": "diseno",
  "theory": [],
  "patterns": []
 },
 {
  "id": "voraz",
  "label": "Algoritmos voraces",
  "tema": "diseno",
  "theory": [],
  "patterns": []
 }
];
