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
    "md": "- Los problemas (de decisión) se pueden categorizar en clases de complejidad según su dificultad computacional\n- Clases más importantes:\n  - P: resolubles en tiempo polinómico\n  - NP: resolubles en tiempo polinómico mediante un algoritmo no-determinista\n  - NP-completos: los más difíciles de NP\n  - NP-duros: tan difícil o más que el problema más difícil en NP\n- Otras:\n  - EXP: resolubles en tiempo exponencial\n  - R: resolubles en tiempo finito\n- {{fig img/t1-p34.png | diagrama de Venn de dificultad computacional creciente. Anidamiento: P (polinómico) ⊆ NP (\"no-determinista\" polinómico) ⊆ EXP (computable en tiempo exponencial) ⊆ R (computable en tiempo finito); fuera de R: indecidibles (no computables). Marcadas las zonas NP-completos (frontera superior de NP), EXP-completos (frontera de EXP), NP-duros y EXP-duros (zonas que abarcan los completos y lo que queda por encima). Anotación: \"¿P = NP? Problema del milenio\"}}"
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
    "md": "- Toma decisiones aleatorias (adivina). Siempre acierta\n- Si el resultado del problema de decisión es SÍ (o verdadero) las decisiones aleatorias conducen a obtener ese SÍ\n- {{fig img/t1-p24.png | árbol de decisiones con varias ramas por nodo; la elección de la rama correcta lleva a la hoja SÍ; las otras hojas son NO}}"
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
    "md": "- ¿Cómo demostrar que un problema A es NP-completo?\n  1. Demostrar $A\\in NP$\n  2. Demostrar que es NP-duro\n     - Lo más habitual: \"reducir\" un problema NP-completo Q a A\n     - Si Q NP-completo hay que demostrar que A es tan difícil o más que Q\n- Reducción\n  - En general: transformar cada instancia de un problema Q a otra de un problema A\n  - Al resolver A el resultado es el mismo que para Q\n  - {{fig img/t1-p31.png | entrada x para Q --T (transformación)--> T(x) entrada para A --> Algoritmo para A --> Sí/No; el conjunto T + algoritmo para A forma el \"Algoritmo para Q\"}}\n  - Cada problema NP-completo se puede reducir a los demás"
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
    "md": "- {{fig img/t1-p34.png | diagrama completo de clases (ver arriba): P ⊆ NP ⊆ EXP ⊆ R; indecidibles (no computables) fuera de R; ¿P = NP? problema del milenio}}\n- R = \"recursivo\" (no en el sentido de función recursiva que se llama a sí misma)\n- Problemas no computables = indecidibles = no \"recursivos\"\n  - No existen algoritmos que los resuelvan\n  - Ejemplo más conocido: problema de la parada. Determinar si cualquier programa va a parar en tiempo finito"
   },
   {
    "title": "Problema de la parada",
    "level": 2,
    "md": "```python\ndef Termina(p, x): # p es un programa , x sus entradas\n    # Supongamos que resuelve el problema de la parada\n    # Devuelve True si p(x) termina , y False en otro caso\n\ndef d(w): # w es un programa\n    if Termina(w, w):\n        while True: pass # Bucle infinito\n```\n- d(w) termina $\\Leftrightarrow$ w(w) nunca termina\n```python\nd(d):\n    if Termina(d, d):\n        while True: pass\n```\n- d(d) termina $\\Leftrightarrow$ d(d) nunca termina. Contradicción\n\n# 3. Problemas de optimización"
   },
   {
    "title": "Problemas matemáticos de optimización",
    "level": 2,
    "md": "- Importante clase de problemas computacionales\n- Maximizar/minimizar una función objetivo\n  - Encontrar las variables (\"parámetros\") donde una función toma su mayor/menor valor\n  - Las variables deben satisfacer restricciones que definen la región factible donde se encontrará la solución\n- {{fig img/t1-p38.png | dos gráficas de ejemplo, una función de 2 variables con curvas de nivel y región factible, y una función de 1 variable (eje y de -5 a 15, x de -2 a 4)}}"
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
    "md": "- Función objetivo: hiperplano\n- Restricciones: también hiperplanos. Definen una región factible (donde debe estar la solución)\n- {{fig img/t1-p43.png | en 2D (ejes X1, X2), polígono convexo gris \"Región factible\" con rectas paralelas de nivel de la función objetivo; el \"Óptimo\" es el vértice más extremo en la dirección de mejora (flecha). En 3D (ejes X1, X2, Z), el mismo caso con la función objetivo como plano y el óptimo en un vértice}}"
   },
   {
    "title": "Problemas lineales: algoritmo Simplex",
    "level": 2,
    "md": "- Parte de un punto inicial: vértice de región factible (poliedro convexo)\n- Avanza por aristas hasta un vértice mejor, hasta encontrar el óptimo\n- Hay otros algoritmos para resolver problemas lineales\n- {{fig img/t1-p44.png | poliedro con camino por aristas desde \"Punto inicial\" hasta \"Óptimo\"}}"
   },
   {
    "title": "Problemas convexos",
    "level": 2,
    "md": "- $f_0,\\dots,f_m$ son funciones convexas: $f_i(\\alpha x_1+\\beta x_2)\\le\\alpha f_i(x_1)+\\beta f_i(x_2)$, $\\forall x_1,x_2\\in\\mathbb{R}^n$, $\\forall\\alpha,\\beta\\in[0,1]$, donde $\\alpha+\\beta=1$\n- Las restricciones definen un conjunto convexo\n- No convexo, si no cumple lo anterior\n- Los problemas lineales son convexos\n- Se pueden resolver en tiempo polinómico"
   },
   {
    "title": "Conjuntos convexos",
    "level": 2,
    "md": "- Cualquier segmento entre dos puntos del conjunto debe estar completamente contenido en el conjunto\n- {{fig img/t1-p46.png | ejemplos de conjuntos convexos y de conjuntos no convexos}}"
   },
   {
    "title": "Funciones convexas",
    "level": 2,
    "md": "- {{fig img/t1-p47.png | curva convexa de una variable; el segmento (cuerda) entre $(x_1,f(x_1))$ y $(x_2,f(x_2))$ queda por encima de la curva; en $\\alpha x_1+\\beta x_2$ la curva vale $f(\\alpha x_1+\\beta x_2)$ y la cuerda $\\alpha f(x_1)+\\beta f(x_2)$}}\n- $f_i(\\alpha x_1+\\beta x_2)\\le\\alpha f_i(x_1)+\\beta f_i(x_2)$\n- {{fig img/t1-p48.png | superficie convexa en 3D (valores 0 a 50, un único mínimo)}}"
   },
   {
    "title": "Funciones no convexas",
    "level": 2,
    "md": "- {{fig img/t1-p49.png | superficies 3D con varios mínimos/máximos locales}}\n- Pueden tener múltiples óptimos locales\n- Si el dominio es discreto no tiene sentido hablar de una función convexa\n- No siempre se pueden resolver en tiempo polinómico\n- Para \"resolverlos\" se recurre a heurísticas, pero no garantizan llegar al óptimo global\n  - Búsqueda aleatoria\n  - Algoritmos genéticos\n- Teorema \"no hay comida gratis\": ninguna heurística es mejor que todas en general"
   },
   {
    "title": "Descenso/ascenso de gradiente",
    "level": 2,
    "md": "- Gradiente: vector de derivadas parciales de una función\n- Indica la dirección de mayor pendiente en un punto\n- Algoritmo iterativo que asciende o desciende poco a poco hasta llegar a un óptimo\n- {{fig img/t1-p51.png | curvas de nivel en el plano $(x_1,x_2)$ y superficie $f(x)$ (0 a 600) con la trayectoria del descenso}}"
   },
   {
    "title": "Pseudocódigo",
    "level": 3,
    "md": "```\nfunction AlgoritmoDescensoGradiente()\n    x ← x0                      ▷ Aproximación inicial\n    g ← calculaGradiente(x)     ▷ Gradiente en x\n    while ||g|| > ε do          ▷ Iterar hasta que el módulo del gradiente sea muy pequeño\n        x ← x − α · g           ▷ Actualizar aproximación en dirección del gradiente\n        g ← calculaGradiente(x) ▷ Actualizar gradiente\n    return x                    ▷ Devolver aproximación final\n```\n- Hay muchos más algoritmos (y mejores)\n- Puede no converger o ser muy lento\n\n# 4. Introducción a problemas en Inteligencia Artificial, Aprendizaje Automático y Ciencia de Datos"
   },
   {
    "title": "Predicción - Regresión",
    "level": 2,
    "md": "- Predices un valor real\n- Generas un modelo matemático que se ajuste a los datos lo mejor posible\n  - ¿Qué tipo de modelo? ¿Mejor posible en qué sentido?\n- {{fig img/t1-p54.png | dos gráficas de dispersión con curva de ajuste (ejemplo con eje x de 600 a 1800 y eje y de 0 a 300; otro con x de 0 a 6 e y de 0 a 1500)}}"
   },
   {
    "title": "Predicción - Clasificación",
    "level": 2,
    "md": "- Predices una clase (categoría)\n- Generas un modelo matemático que defina fronteras entre las clases en el espacio de los datos, para separar las clases lo mejor posible\n  - ¿Qué tipo de modelo y fronteras? ¿Mejor posible en qué sentido?\n- {{fig img/t1-p55.png | tres gráficas 2D (x de -5 a 5, y de -4 a 4) con distintas fronteras entre clases}}"
   },
   {
    "title": "Predicción",
    "level": 2,
    "md": "- Para estos \"problemas\" no hay una solución \"correcta\"\n  - Los modelos se crean con unos datos disponibles (de entrenamiento)\n  - El rendimiento a la hora de predecir depende de nuevos datos (de test)\n- No se conoce la relación entre entradas y salidas completamente\n  - No podemos hablar de un \"problema computacional\"\n  - Especificarla (matemática o lógicamente) suele ser complicadísimo\n  - No podremos elaborar un algoritmo"
   },
   {
    "title": "Aprendizaje automático",
    "level": 2,
    "md": "- Construir algoritmos a través de ejemplos\n  - Caso concreto: reconocimiento de dígitos escritos a mano: base de datos MNIST\n- {{fig img/t1-p57.png | muestra de dígitos MNIST}}\n- Dígitos difíciles: {{fig img/t1-p58.png | ejemplos de dígitos manuscritos ambiguos}}"
   },
   {
    "title": "Técnicas: problemas computacionales concretos",
    "level": 2,
    "md": "- Enfoque 1: K vecinos más cercanos, K-NN (K-nearest neighbors). {{fig img/t1-p59a.png | punto a clasificar \"¿?\" con K=7 vecinos}}\n- Enfoque 2: máquinas de vectores soporte, SVM (support vector machines). {{fig img/t1-p59b.png | frontera de máximo margen entre dos clases}}\n- Hay muchos más enfoques"
   },
   {
    "title": "Clustering - agrupamiento",
    "level": 2,
    "md": "- La única información con la que contamos es la posición de los puntos (no hay información sobre clases)\n- Queremos encontrar una agrupación o partición \"razonable\"\n- {{fig img/t1-p60.png | nube de puntos en 3D}}"
   },
   {
    "title": "Posibles agrupaciones",
    "level": 2,
    "md": "- {{fig img/t1-p61.png | la misma nube de puntos 3D con dos agrupaciones posibles distintas}}\n- ¿Cuál es la agrupación correcta? No se sabe...\n  - La tarea no está claramente definida\n  - Aunque existen medidas de bondad para evaluar la calidad de una agrupación"
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
    "md": "- Producto escalar: $\\vec a\\cdot\\vec b=\\langle a,b\\rangle=\\mathbf{a}^T\\mathbf{b}=\\sum_{i=1}^{n}a_ib_i=|a|\\cdot|b|\\cdot\\cos(\\alpha)$\n- Módulo o norma Euclídea: $|a|=\\|a\\|_2=\\sqrt{a_1^2+\\cdots+a_n^2}=\\sqrt{\\mathbf{a}^T\\mathbf{a}}$\n- Otras normas: $\\|a\\|_1=|a_1|+|a_2|+\\cdots+|a_n|$; $\\|a\\|_\\infty=\\max_{i=1,\\dots,n}\\{a_1,a_2,\\dots,a_n\\}$\n- Matriz de rotación: $\\mathbf{R}=\\begin{pmatrix}\\cos t&-\\sin t\\\\\\sin t&\\cos t\\end{pmatrix}$\n- El vector $\\mathbf{R}\\cdot\\mathbf{u}$ corresponde al vector $\\mathbf{u}$ rotado $t$ radianes en sentido contrario a las agujas del reloj\n- {{fig img/t2.1-p19.png | vector u y Ru formando ángulo t}}\n\n# Sumatorios"
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
    "md": "$S(n)=\\sum_{i=1}^{n}i=1+2+\\cdots+(n-1)+n=\\frac{n(n+1)}{2}$\n\nDemostración:\n```\n  S(n) =   1     +   2     + ... + (n-1) +   n\n+ S(n) =   n     + (n-1)   + ... +   2     +   1\n 2S(n) = (n+1)   + (n+1)   + ... + (n+1)   + (n+1)\n```\n$2S(n)=n(n+1)\\Rightarrow S(n)=\\frac{n(n+1)}{2}$\n\nDemostración visual: {{fig img/t2.1-p25.png | dos escaleras de $S(n)$ unidas forman un rectángulo de $n\\times(n+1)$, $2S(n)=n(n+1)$}}"
   },
   {
    "title": "Suma de los primeros n impares",
    "level": 2,
    "md": "$S(n)=\\sum_{i=1}^{n}(2i-1)=1+3+\\cdots+(2n-3)+(2n-1)=n^2$\n\nDemostración: $\\sum_{i=1}^{n}(2i-1)=\\sum_{i=1}^{n}2i-\\sum_{i=1}^{n}1=2\\sum_{i=1}^{n}i-n=2\\frac{n(n+1)}{2}-n=n^2+n-n=n^2$\n\nDemostración visual: {{fig img/t2.1-p26.png | $S(n)$ como cuadrado $n\\times n$ formado por L's de impares}} $\\Rightarrow S(n)=n^2$\n\nDemostración visual alternativa: {{fig img/t2.1-p27.png | dos copias de $S(n)$ forman rectángulo $2n\\times n$; cada fila $2n-1+1=2n$}} $2S(n)=2n\\cdot n\\Rightarrow S(n)=n^2$\n\nAnálogamente:\n```\n  S(n) =   1     +   3     + ... + (2n-3) + (2n-1)\n+ S(n) = (2n-1)  + (2n-3)  + ... +   3     +   1\n 2S(n) =  2n     +  2n     + ... +  2n     +  2n\n```\n$2S(n)=2n(n)\\Rightarrow S(n)=n^2$"
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
    "md": "Usaremos esta descomposición de la suma de cuadrados: {{fig img/t2.1-p33.png | cuadrados de lado 1, 2, 3, 4, ... con áreas 1, 4, 9, 16, ..., suma $S(n)$; cada cuadrado coloreado por capas}}\n\nDemostración visual: {{fig img/t2.1-p34.png | tres copias de $S(n)$ se combinan en un rectángulo de lados $(2n+1)$ y $\\frac{n(n+1)}{2}=1+2+3+\\cdots+n$}}\n$3S(n)=(2n+1)\\frac{n(n+1)}{2}\\Rightarrow S(n)=\\frac{n(2n+1)(n+1)}{6}$"
   },
   {
    "title": "Suma de los primeros n cubos",
    "level": 2,
    "md": "$S(n)=\\sum_{i=1}^{n}i^3=\\left(\\sum_{i=1}^{n}i\\right)^2=\\left(\\frac{n(n+1)}{2}\\right)^2$\n\nSe puede ver gracias a:\n- $1^3=1=1^2=(1)^2$\n- $1^3+2^3=9=3^2=(1+2)^2$\n- $1^3+2^3+3^3=36=6^2=(1+2+3)^2$\n- $1^3+2^3+3^3+4^3=100=10^2=(1+2+3+4)^2$\n\nDemostración visual: {{fig img/t2.1-p36.png | cuadrado de lado $2(1+2+\\cdots+n)$ (tramos $\\ldots,3,2,1,1,2,3,\\ldots$) dividido en marcos concéntricos de $k$ cuadrados}}\n- Marcos: $4\\cdot1^2=4\\cdot1^3$; $8\\cdot2^2=4\\cdot2^3$; $12\\cdot3^2=4\\cdot3^3$; $\\vdots$; $4n\\cdot n^2=4\\cdot n^3$\n- Área total $=\\left[2(1+2+3+\\cdots+n)\\right]^2=4\\cdot S(n)$\n- $S(n)=1^3+2^3+3^3+\\cdots+n^3=(1+2+3+\\cdots+n)^2=\\left(\\frac{n(n+1)}{2}\\right)^2$"
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
    "md": "Contar el número de cajas para una pirámide de altura $n$ {{fig img/t2.1-p41.png | pirámide escalonada de cubos descompuesta en capas triangulares de 1, 3, 6, 10, ... cajas}}"
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
    "md": "{{fig img/t2.1-p50.png | curva creciente $f(x)$ con segmentos verticales de longitud $f(m),f(m+1),\\dots,f(n)$ en $x=m,\\dots,n$}}\n$\\sum_{i=m}^{n}f(i)$ = suma de longitudes de segmentos"
   },
   {
    "title": "Función creciente - Cota superior",
    "level": 3,
    "md": "{{fig img/t2.1-p51.png | rectángulos de ancho 1 y altura $f(i)$ sobre $[i,i+1]$, por encima de la curva}}\n$\\sum_{i=m}^{n}f(i)$ = suma de áreas $\\le\\int_m^{n+1}f(x)dx$ (área debajo de la curva desde $m$ hasta $n+1$)"
   },
   {
    "title": "Función creciente - Cota inferior",
    "level": 3,
    "md": "{{fig img/t2.1-p52.png | rectángulos de ancho 1 y altura $f(i)$ sobre $[i-1,i]$, por debajo de la curva}}\n$\\int_{m-1}^{n}f(x)dx\\le$ suma de áreas $=\\sum_{i=m}^{n}f(i)$ (área debajo de la curva desde $m-1$ hasta $n$)"
   },
   {
    "title": "Función decreciente",
    "level": 3,
    "md": "{{fig img/t2.1-p53.png | curva decreciente con segmentos verticales $f(m),\\dots,f(n)$}}\n$\\sum_{i=m}^{n}f(i)$ = suma de longitudes de segmentos"
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
    "md": "- Expresaremos el tiempo de ejecución mediante una fórmula (función) matemática\n  - Generalmente la llamaremos $T(n)$\n  - Es importante saber qué argumentos debe tomar dicha función\n- Ejemplo: $T(n)=\\frac{1}{2}n^2+2000n+50000$\n  - {{fig img/t2.2-p6.png | curva de $T(n)$ para $n\\in[0,10000]$, eje y hasta $7\\cdot10^7$, creciente convexa}}\n  - ¿Qué términos de $T(n)$ importan más para entender cómo crece?"
   },
   {
    "title": "Descomposición",
    "level": 3,
    "md": "- {{fig img/t2.2-p7.png | dos gráficos con $\\frac{1}{2}n^2$ y $2000n+50000$. Izquierda $n\\in[0,10000]$ (eje y hasta $5\\cdot10^7$): $\\frac{1}{2}n^2$ supera a $2000n+50000$ a partir de $n\\approx4000$. Derecha $n\\in[0,200]$ (eje y hasta $5\\cdot10^5$): $2000n+50000$ queda muy por encima de $\\frac{1}{2}n^2$}}\n- El término cuadrático determina el \"orden\" de crecimiento de la función\n- Para valores pequeños de $n$ todos los términos pueden ser relevantes"
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
    "md": "{{fig img/t2.2-p11.png | curvas de los órdenes anteriores, $n\\in[1,20]$, eje y en escala logarítmica de 1 a 16777216 ($2^{24}$)}}"
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
    "md": "$O(g(n))=\\{f(n): \\exists c>0\\ \\text{y}\\ n_0>0\\ |\\ 0\\le f(n)\\le c\\cdot g(n),\\ \\forall n\\ge n_0\\}$\n- {{fig img/t2.2-p16.png | $f(n)\\in O(g(n))$. Eje $n$ con $n_0$ marcado; $f(n)$ oscila antes de $n_0$ y a partir de $n_0$ queda por debajo de $c\\cdot g(n)$}}\n- A partir de un $n_0$, $c\\cdot g(n)$ siempre supera (o iguala) a $f(n)$\n- $O(g(n))$ es un conjunto de funciones"
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
    "md": "1. Elegir una constante adecuada (por ejemplo $c=1$)\n2. Plantear $5n+2\\le n^2$ (es decir, $5n+2\\le 1\\cdot n^2$)\n3. Buscar qué valores de $n$ hacen que se cumpla que $5n+2\\le n^2$\n   - Ahora no podemos despejar $n$\n   - Analizamos la desigualdad $n^2-5n-2\\ge0$\n   - {{fig img/t2.2-p21.png | parábola $n^2-5n-2$ para $n\\in[-2,7]$, eje y de $-8$ a $6$, cortando el eje x cerca de $-0{,}37$ y $5{,}37$}}\n\nContinuación:\n- $n^2-5n-2$ es una función cuadrática (convexa) con raíces en $-0{,}37$ y $5{,}37$\n- Por tanto, siempre será positiva para $n\\ge6$\n- Para $c=1$ y $n_0=5{,}37$ se cumplen las condiciones de la definición y queda demostrado\n  - $n_0$ también puede ser cualquier valor mayor que $5{,}37$, por ejemplo, $n_0=6$ o $n_0=1000$.\n- Si escogemos $c=5$, $n_0=2$ es suficiente\n- Si escogemos $c=8$, $n_0=1$ es suficiente"
   },
   {
    "title": "Ejemplo. Verificar si $3n^2+2n-2\\in O(n)$",
    "level": 3,
    "md": "- En este caso no vamos a poder encontrar las constantes (ya que $3n^2+2n-2\\notin O(n)$)\n1. Consideramos $3n^2+2n-2\\le cn$\n2. Cojamos la constante $c$ que cojamos $3n^2+2n-2\\le cn$ no se va a verificar en un intervalo de tipo $[n_0,\\infty)$\n   - La inecuación se puede expresar como $3n^2+(2-c)n-2\\le0$\n   - La función $3n^2+(2-c)n-2$ es una parábola convexa, que crece hasta el $+\\infty$ según aumenta $n$, independientemente de $c$\n   - Por tanto, no va a ser negativa siempre a partir de ningún $n_0$\n   - Es imposible encontrar una pareja de constantes $c$ y $n_0$. Por tanto, $3n^2+2n-2\\notin O(n)$."
   },
   {
    "title": "Verificar si $3n^2+2n-2\\in O(n)$ (gráficamente)",
    "level": 3,
    "md": "- {{fig img/t2.2-p24.png | parábola $3n^2+(2-c)n-2$ con $c=4$, $n\\in[-1.5,3]$, eje y de $-2$ a $10$; forma de \"U\"}}\n- Sea cual sea $c$ (en el ejemplo $c=4$) la parábola siempre será convexa (con forma de \"U\"), ya que el coeficiente asociado a $n^2$ es positivo\n- $3n^2+(2-c)n-2\\le0$ se cumplirá, como mucho, en un intervalo finito, y nunca en uno de tipo $[n_0,\\infty)$"
   },
   {
    "title": "Definición formal de cota inferior $\\Omega$",
    "level": 3,
    "md": "$\\Omega(g(n))=\\{f(n): \\exists c>0\\ \\text{y}\\ n_0>0\\ |\\ 0\\le c\\cdot g(n)\\le f(n),\\ \\forall n\\ge n_0\\}$\n- {{fig img/t2.2-p25.png | $f(n)\\in\\Omega(g(n))$; a partir de $n_0$, $f(n)$ queda por encima de $c\\cdot g(n)$}}\n- A partir de $n_0$, $f(n)$ siempre supera (o iguala) a $c\\cdot g(n)$"
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
    "md": "$\\Theta(g(n))=\\{f(n): \\exists c_1>0,\\ c_2>0\\ \\text{y}\\ n_0>0\\ |\\ 0\\le c_1g(n)\\le f(n)\\le c_2g(n),\\ \\forall n\\ge n_0\\}$\n- {{fig img/t2.2-p28.png | $f(n)\\in\\Theta(g(n))$; a partir de $n_0$, $f(n)$ queda entre $c_1\\cdot g(n)$ (abajo) y $c_2\\cdot g(n)$ (arriba)}}\n- A partir de $n_0$, $f(n)$ siempre queda en medio de $c_1g(n)$ y $c_2g(n)$"
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
    "md": "Deben realizar varias comparaciones hasta determinar la permutación correcta para cualquier entrada.\n- Ejemplo, entrada 5 8 2: se compara 1º:2º (resultado $\\le$), luego 2º:3º (resultado $>$), luego 1º:3º (resultado $>$), y se llega a la permutación $\\langle3º,1º,2º\\rangle$, salida 2 5 8\n- {{fig img/t2.2-p46.png | a medida que se hacen comparaciones se reduce la incertidumbre sobre el orden (estados 2 5 2 8 2 / 2 5 2 8 / 2 5 8, con elementos marcados como \"incertidumbre\" y \"ordenados correctamente\"); a la derecha, flechas de la entrada 5 8 2 a la salida 2 5 8}}"
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
    "md": "Algoritmo de ordenación por inserción directa (insert-sort).\n\n{{fig img/t3.1-p8.png | traza sobre el vector `2 4 7 9 5 1 8 3`; parte ordenada a la izquierda, desordenada a la derecha; se toma el elemento a insertar (5), se compara con los anteriores desplazando 9 y 7 a la derecha, y se inserta: `2 4 5 7 9 1 8 3`}}\n\nCódigo y coste por línea (n = len(a)):\n\n```python\n0 def insert_sort(a):                      # Coste   Nº de veces\n1     for j in range(1,len(a)):            # C1      n\n2         val = a[j]                       # C2      n-1\n3         # Inserta a[j] en la lista\n          # ordenada a[0:j-1]              # 0       n-1\n4         i = j-1                          # C4      n-1\n5         while (i>=0) and (a[i]>val):     # C5      sum_{j=1}^{n-1} (t_j + 1)\n6             a[i+1] = a[i]                # C6      sum_{j=1}^{n-1} t_j\n7             i = i-1                      # C7      sum_{j=1}^{n-1} t_j\n8         a[i+1] = val                     # C8      n-1\n```\n\n- $t_j$ = nº de veces que la condición del bucle de la línea 5 es verdadera (que se ejecuta el cuerpo del bucle), para un determinado valor de j\n- Ignoramos el coste concreto de cada operación básica\n- Cada línea l tardará un determinado tiempo o coste, que denotamos por $C_l$\n- La función de coste o tiempo, en función del tamaño del vector n es:\n\n$$T(n)=C_1 n+C_2(n-1)+C_4(n-1)+C_5\\sum_{j=1}^{n-1}(t_j+1)+C_6\\sum_{j=1}^{n-1}t_j+C_7\\sum_{j=1}^{n-1}t_j+C_8(n-1)$$\n\n- $t_j$ depende del vector de entrada particular\n\nMejor caso (vector ordenado de menor a mayor): $t_j=0$, para todo j\n\n$$T(n)=C_1 n+C_2(n-1)+C_4(n-1)+C_5(n-1)+C_8(n-1)$$\n$$=(C_1+C_2+C_4+C_5+C_8)n-(C_2+C_4+C_5+C_8)=K_1 n+K_2\\in\\Theta(n)$$\n\n- El orden de T(n) es lineal\n- ¡Para el orden, el valor de las constantes no importa!\n\nPeor caso (vector ordenado de mayor a menor): $t_j=j$ (valor máximo para cada j)\n\nEn primer lugar observamos que:\n\n$$\\sum_{j=1}^{n-1}(j+1)=\\sum_{j=2}^{n}j=\\frac{n(n+1)}{2}-1 \\qquad\\qquad \\sum_{j=1}^{n-1}j=\\frac{n(n-1)}{2}$$\n\nSustituyendo:\n\n$$T(n)=C_1 n+C_2(n-1)+C_4(n-1)+C_5\\left(\\frac{n(n+1)}{2}-1\\right)+C_6\\frac{n(n-1)}{2}+C_7\\frac{n(n-1)}{2}+C_8(n-1)$$\n$$=\\left(\\frac{C_5}{2}+\\frac{C_6}{2}+\\frac{C_7}{2}\\right)n^2+\\left(C_1+C_2+C_4+\\frac{C_5}{2}-\\frac{C_6}{2}-\\frac{C_7}{2}+C_8\\right)n-(C_2+C_4+C_5+C_8)=K_1 n^2+K_2 n+K_3\\in\\Theta(n^2)$$\n\n- El orden de T(n) es cuadrático"
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
    "md": "Algoritmo de ordenación \"burbuja\" (bubble-sort). Variante: tras cada iteración los elementos más pequeños quedan correctamente ordenados.\n\n{{fig img/t3.1-p16.png | traza sobre `1 2 3 4 7 9 5 8`; parte ordenada a la izquierda (1 2 3), desordenada a la derecha; se comparan elementos adyacentes recorriendo de derecha a izquierda y se intercambian si están desordenados: `...7 9 5 8` -> `...7 5 9 8` -> `...5 7 9 8`}}\n\n```python\n1   def bubble_sort(a):\n2\n3       n = len(a)\n4\n5       for i in range(0,n-1):               # i=0..n-2\n6\n7           for j in range(n-1, i, -1):      # j=n-1..i+1\n8\n9               if(a[j-1]>a[j]):\n10\n11                  aux = a[j-1]\n12                  a[j-1] = a[j]\n13                  a[j] = aux\n```"
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
    "md": "- $T(n)=\\begin{cases}a & n=0\\\\ b+T(n-1) & n>0\\end{cases}$ ⇒ $T(n)=bn+a\\in\\Theta(n)$\n- $T(n)=\\begin{cases}a & n=1\\\\ b+T(n-1) & n>1\\end{cases}$ ⇒ $T(n)=b(n-1)+a\\in\\Theta(n)$\n- $T(n)=\\begin{cases}a & n=1\\\\ b+T(n/2) & n>1\\end{cases}$ ⇒ $T(n)=b\\log_2 n+a\\in\\Theta(\\log n)$\n- $T(n)=\\begin{cases}a & n=0\\\\ b+T(n/2) & n>0\\end{cases}$ ⇒ $T(n)=b\\log_2 n+b+a\\in\\Theta(\\log n)$\n\n#### $T(n)=\\begin{cases}a & n=0\\\\ bn+c+T(n-1) & n>0\\end{cases}$\n$T(n)=bn+c+T(n-1)$\n$=bn+c+b(n-1)+c+T(n-2)=2bn-b+2c+T(n-2)$\n$=2bn-b+2c+b(n-2)+c+T(n-3)=3bn-b(1+2)+3c+T(n-3)$\n$=3bn-b(1+2)+3c+b(n-3)+c+T(n-4)=4bn-b(1+2+3)+4c+T(n-4)$\n$\\dots=ibn-b\\sum_{j=1}^{i-1}j+ic+T(n-i)=ibn+ic-b\\frac{i(i-1)}{2}+T(n-i)$\n- Se alcanza T(0) para i=n. Sustituyendo: $T(n)=bn^2-\\frac b2 n(n-1)+cn+a$\n- $T(n)=\\frac b2 n^2+(c+\\frac b2)n+a\\in\\Theta(n^2)$\n- Tiene sentido: se hacen $n+(n-1)+(n-2)+\\dots+1$ operaciones.\n\n#### $T(n)=\\begin{cases}a & n=0\\\\ bn+c+2T(n/2) & n>0\\end{cases}$\n$T(n)=bn+c+2T(n/2)$\n$=bn+c+2\\left[b\\frac n2+c+2T(n/4)\\right]$\n$=bn+c+2\\left[b\\frac n2+c+2\\left[b\\frac n4+c+2T(n/8)\\right]\\right]$\n$=3bn+c(1+2+4)+2^3T(n/2^3)=3bn+c(2^3-1)+2^3T(n/2^3)$\n$\\dots=ibn+c(2^i-1)+2^iT(n/2^i)$\n- Se alcanza T(1) para $n/2^i=1$, es decir $i=\\log_2 n$. Sustituyendo:\n$T(n)=bn\\log_2 n+c(n-1)+nT(1)=bn\\log_2 n+c(n-1)+n(b+c+2T(0))=bn\\log_2 n+cn-c+nb+nc+2na$\n$T(n)=bn\\log_2 n+(2c+b+2a)n-c\\in\\Theta(n\\log n)$\n- Tiene sentido: se hacen n operaciones $1+\\log_2 n$ veces.\n{{fig img/t3.2-p18.png | árbol de recursión binario completo; raíz n, nivel 1: n/2, n/2; nivel 2: n/4 (x4); ... hojas: n hojas de coste 1; 1+log2 n niveles, cada nivel suma n}}"
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
    "md": "- No siempre se puede aplicar la expansión de recurrencias. Para muchas recurrencias no se conoce la forma de resolverlas (como con integrales o ecuaciones diferenciales: se sabe resolver un subconjunto, no todas).\n- El método general amplía el conjunto de recurrencias resolubles.\n{{fig img/t3.2-p28.png | diagrama de conjuntos; \"Método general de resolución de recurrencias\" contiene a \"Expansión de recurrencias\", dentro del conjunto \"Recurrencias\"}}"
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
    "md": "$$T(n)=\\begin{cases}0 & n=0\\\\ 1 & n=1\\\\ T(n-1)+T(n-2) & n>1\\end{cases}$$\n- Ecuación característica $x^2-x-1=0$, raíces $r_1=\\frac{1+\\sqrt5}2$, $r_2=\\frac{1-\\sqrt5}2$\n- Al ser distintas: $T(n)=C_1r_1^n+C_2r_2^n=C_1\\left(\\frac{1+\\sqrt5}2\\right)^n+C_2\\left(\\frac{1-\\sqrt5}2\\right)^n$\n- Constantes a partir de condiciones iniciales (casos base):\n  - $C_1+C_2=0=T(0)$\n  - $C_1\\frac{1+\\sqrt5}2+C_2\\frac{1-\\sqrt5}2=1=T(1)$\n- Resolviendo: $C_1=\\frac1{\\sqrt5}$, $C_2=-\\frac1{\\sqrt5}$\n- Finalmente: $T(n)=\\frac1{\\sqrt5}\\left(\\frac{1+\\sqrt5}2\\right)^n-\\frac1{\\sqrt5}\\left(\\frac{1-\\sqrt5}2\\right)^n$\n- El segundo término tiende a 0 según n→∞, por tanto $T(n)\\in\\Theta\\left(\\left(\\frac{1+\\sqrt5}2\\right)^n\\right)$\n- El orden es exponencial. El árbol de recursión es binario pero está podado. Para un árbol binario completo el orden es $2^n$. Aquí la base del exponente es $(1+\\sqrt5)/2\\approx1.618<2$.\n{{fig img/t3.2-p33.png | árbol de recursión de Fibonacci con raíz 7; cada nodo k>1 tiene hijos k-1 y k-2; hojas 1 y 0 (árbol podado)}}"
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
 },
 {
  "id": "t4_intro_recursividad",
  "title": "Tema 4 Introducción a la recursividad",
  "sections": [
   {
    "title": "Tema 4 Introducción a la recursividad",
    "level": 2,
    "md": "Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.\nContenido: 1 Introducción; 2 Metodología; 3 Problemas básicos; 4 Problemas adicionales."
   },
   {
    "title": "Introducción",
    "level": 2,
    "md": ""
   },
   {
    "title": "Recursividad",
    "level": 3,
    "md": "- Métodos/funciones/subprogramas que se invocan a sí mismos. Si A llama a B, y B llama a A: A y B también son recursivos.\n- La definición de conceptos en términos de sí mismos.\n- Herramienta muy potente para la resolución de problemas computacionales y matemáticos: una forma de pensar al abordar problemas, enfoque de diseño de algoritmos.\n- Alternativa a los bucles (para ejecutar instrucciones de manera repetida) y a algunas estructuras de datos (pilas y colas)."
   },
   {
    "title": "¿Se puede usar en un diccionario?",
    "level": 3,
    "md": "- Descendientes (RAE): \"Hijos, nietos o personas que descienden de otra\". Descender: \"Proceder, por natural propagación, de un mismo principio o persona común, que es la cabeza de la familia\". Proceder: \"Dicho de una persona o de una cosa: Tener su origen en un determinado lugar, o descender de cierta persona, familia o cosa\".\n- Mejor definición: los hijos más los descendientes de los hijos (H: hijos, D: descendientes, p: persona):\n$$D(p)=\\begin{cases}\\emptyset & H(p)=\\emptyset\\\\ H(p)\\cup D(H(p)) & H(p)\\neq\\emptyset\\end{cases}$$"
   },
   {
    "title": "¿Cuándo es útil aplicar la recursividad?",
    "level": 3,
    "md": "- Especialmente útil cuando la \"estructura\" del problema, algoritmo o los datos no es \"lineal\": arrays, listas (iteración / bucles) frente a grafos, árboles (recursividad).\n- Cuando el método realice dos o más llamadas a sí mismo.\n- Cuando sea más fácil comprender la versión recursiva."
   },
   {
    "title": "Conceptos clave en la recursividad",
    "level": 3,
    "md": "- Descomposición/simplificación de problemas: reconocer que para resolver un problema podemos valernos de soluciones a \"subproblemas\" idénticos al original, pero más sencillos o de menor tamaño.\n- Inducción: construimos nuestra solución suponiendo que ya sabemos la solución a estos problemas más simples. No tenemos que calcular estas \"subsoluciones\" desde cero; se obtienen a través de llamadas recursivas."
   },
   {
    "title": "Primer ejemplo: Factorial",
    "level": 3,
    "md": "$$n!=\\underbrace{1\\times2\\times3\\times\\cdots\\times(n-1)}_{\\text{subproblema: }(n-1)!}\\times n=\\begin{cases}1 & n=0\\\\ n\\times(n-1)! & n>0\\end{cases}$$\n(problema: n!)\n```python\ndef factorial(n):\n    if n==0:\n        return 1\n    else:\n        return factorial(n-1) * n\n```"
   },
   {
    "title": "El paradigma de programación declarativa",
    "level": 3,
    "md": "- En general, hay que pensar en qué se va a hacer mucho más que en cómo se va a hacer.\n- A diferencia del paradigma imperativo, evitaremos pensar en cómo se modifican los parámetros y variables a medida que se ejecuta un programa paso a paso.\n- Suponemos que sabemos qué se resuelve (el subproblema), pero no nos interesa saber cómo.\n- Salto de fe recursivo: usas la función que estás programando, asumiendo que funciona, aunque todavía no la hayas terminado de implementar."
   },
   {
    "title": "Factorial: implementaciones \"iterativas\" (a evitar)",
    "level": 3,
    "md": "```python\ndef fact1(n):\n    p = 1\n    while n>0:\n        p = p*n\n        n = n-1\n    return p\n\nfact1(n)\n```\n```python\ndef fact2(n,p):\n    if n==0:\n        return p\n    else:\n        return fact2(n-1,p*n)\n\nfact2(n,1)\n```\n- Traza de fact1 para n=4: (iteración, n, p) = (0,4,1), (1,3,4), (2,2,12), (3,1,24), (4,0,24).\n- Aunque fact2 sea recursivo (por cola), es equivalente a la versión iterativa fact1.\n- fact2 surge de un enfoque imperativo, donde pensamos en los valores que toman variables y parámetros. No surge de pensar en subproblemas, ni de pensar de manera \"recursiva\"."
   },
   {
    "title": "¿Árbol de recursión?",
    "level": 3,
    "md": "- Si podemos, evitaremos pensar en el árbol de recursión (ejemplo: árbol de llamadas de Fibonacci con raíz 7).\n- Generalmente no ayuda a diseñar el algoritmo. Lo importante es definir la regla recursiva: la relación entre un nodo padre y los hijos, que se aplica en todo el árbol. Aquí es $F(n)=F(n-1)+F(n-2)$ (números de Fibonacci o similares).\n- No perdemos tiempo en pensar cómo se resolverán los subproblemas."
   },
   {
    "title": "Tipos de recursividad",
    "level": 3,
    "md": "- Lineal (no final):\n$$f(n,A)=\\begin{cases}I & n=1\\\\ A\\cdot f(n-1,A) & n>1\\end{cases}\\qquad g(n)=f\\!\\left(n,\\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}\\right)_{1,2}$$\n- Lineal final (por cola):\n$$f(n,a,b)=\\begin{cases}a & n=0\\\\ f(n-1,a+b,a) & n\\ge1\\end{cases}\\qquad g(n)=f(n,0,1)$$\n- Múltiple:\n$$f(n)=\\begin{cases}1 & n=1,2\\\\ 1+\\sum_{i=1}^{n-2}f(i) & n\\ge3\\end{cases}\\qquad g(n)=f(n)$$\n- Mutua:\n$$B(i)=\\begin{cases}1 & i=1\\\\ A(i-1) & i\\ge2\\end{cases}\\qquad A(i)=\\begin{cases}0 & i=1\\\\ A(i-1)+B(i-1) & i\\ge2\\end{cases}\\qquad g(n)=B(n)+A(n)$$\n- Anidada:\n$$f(n,y)=\\begin{cases}1+y & n=1,2\\\\ f(n-1,\\,y+f(n-2,0)) & n\\ge3\\end{cases}\\qquad g(n)=f(n,0)$$"
   },
   {
    "title": "Metodología",
    "level": 2,
    "md": ""
   },
   {
    "title": "Metodología para diseñar algoritmos recursivos",
    "level": 3,
    "md": "1. Identificar el tamaño del problema: lo que determina el número de operaciones a realizar.\n2. Establecer los casos base: instancias sencillas del problema que no requieren llamadas recursivas. Suelen ser instancias de menor tamaño.\n3. Descomposición: escoger instancias del problema de menor tamaño.\n4. Inducción: establecer los casos recursivos a partir de las soluciones de las instancias seleccionadas en la fase de descomposición.\n5. Implementar y probar."
   },
   {
    "title": "Ejemplo: suma de los primeros naturales",
    "level": 3,
    "md": "$$S(n)^{*}=\\sum_{i=1}^{n}i=1+2+3+\\cdots+(n-1)+n$$\n(\\* Suponemos que no conocemos la fórmula $S(n)=n(n+1)/2$, que se calcula en tiempo constante $\\Theta(1)$.)\n- Paso 1 (tamaño del problema): n.\n- Paso 2 (casos base): n=0, S(0)=0. n=1, S(1)=1 (redundante si consideramos S(0)=0).\n- Paso 3 (descomposición): consideramos problemas de tamaño menor: n-1, n-2, n/2, n/10. Algunas descomposiciones no conducen a algoritmos sencillos o eficientes. Lo más sencillo en este caso es considerar S(n-1).\n- Paso 4 (casos recursivos):\n$$S(n)=\\underbrace{1+2+3+\\cdots+(n-1)}_{\\text{subproblema: }S(n-1)}+n=\\begin{cases}0 & n=0\\\\ n+S(n-1) & n>0\\end{cases}$$\n```python\ndef suma(n):\n    if n==0:\n        return 0\n    else:\n        return suma(n-1) + n\n```\n$$T(n)=\\begin{cases}1 & n=0\\\\ T(n-1)+1 & n>0\\end{cases}\\qquad T(n)\\in\\Theta(n)$$"
   },
   {
    "title": "Gráficamente",
    "level": 3,
    "md": "- Paso 3 (descomposición): buena idea usar diagramas para identificar el problema original y el o los subproblemas a considerar.\n- Problema ≡ \"número de cuadrados en una pirámide triangular de altura (y base) n\"; el subproblema es la pirámide de altura n-1."
   },
   {
    "title": "Dividir el tamaño del problema por dos - I",
    "level": 3,
    "md": "- Paso 3 (descomposición): problemas de tamaño n/2 (aproximadamente). // indica división entera ($8//2=4$, $7//2=3$): $x//y=\\lfloor x/y\\rfloor$. Se distingue n par y n impar.\n$$S(n)=\\begin{cases}0 & n=0\\\\ 1 & n=1\\\\ 3S(n/2)+S(n/2-1) & n>1,\\ n\\text{ par}\\\\ 3S((n-1)/2)+S((n+1)/2) & n>1,\\ n\\text{ impar}\\end{cases}$$\n```python\ndef suma(n):\n    if n==0:\n        return 0\n    elif n==1:\n        return 1\n    elif n%2==0:\n        return 3*suma(n//2) + suma(n//2 - 1)\n    else:\n        return 3*suma(n//2) + suma(n//2 + 1)\n```\n- $T(n)=2T(n/2)+1$, con $T(0)=1$ y $T(1)=1$ $\\Rightarrow$ $T(n)\\in\\Theta(n)$."
   },
   {
    "title": "Dividir el tamaño del problema por dos - II",
    "level": 3,
    "md": "- Paso 3 (descomposición): problemas de tamaño n/2 (aproximadamente), con dos subproblemas del mismo tamaño n//2 (n par), o n//2 y n//2+1 (n impar) según el diagrama.\n$$S(n)=\\begin{cases}0 & n=0\\\\ 1 & n=1\\\\ 2S(n/2)+(n/2)^2 & n>1,\\ n\\text{ par}\\\\ 2S((n-1)/2)+((n+1)/2)^2 & n>1,\\ n\\text{ impar}\\end{cases}$$\n```python\ndef suma(n):\n    if n==0:\n        return 0\n    elif n==1:\n        return 1\n    elif n%2==0:\n        return 2*suma(n//2) + (n//2)**2\n    else:\n        return 2*suma(n//2) + (n//2 + 1)**2\n```\n- $T(n)=T(n/2)+1$, con $T(0)=1$ y $T(1)=1$ $\\Rightarrow$ $T(n)\\in\\Theta(\\log n)$."
   },
   {
    "title": "Dividir el tamaño del problema por dos - III",
    "level": 3,
    "md": "- Paso 3 (descomposición): problemas de tamaño n/2 (aproximadamente), con signos \"-\" y \"+\" en el diagrama según n par o impar.\n$$S(n)=\\begin{cases}0 & n=0\\\\ 1 & n=1\\\\ 4S(n/2)-n/2 & n>1,\\ n\\text{ par}\\\\ 4S((n-1)/2)+(n+1)/2 & n>1,\\ n\\text{ impar}\\end{cases}$$\n```python\ndef suma(n):\n    if n==0:\n        return 0\n    elif n==1:\n        return 1\n    elif n%2==0:\n        return 4*suma(n//2) - n//2\n    else:\n        return 4*suma(n//2) + n//2 + 1\n```\n- $T(n)=T(n/2)+1$, con $T(0)=1$ y $T(1)=1$ $\\Rightarrow$ $T(n)\\in\\Theta(\\log n)$."
   },
   {
    "title": "Arrays y listas",
    "level": 3,
    "md": "- Es importante conocer dos formas de implementar código relacionado con listas o arrays:\n  1. Las funciones reciben la lista completa, pudiendo acceder a su longitud (ej. a = [5,-1,3,2,4,-3], len = 6).\n  2. Las funciones reciben la lista completa, pero se trabaja con una sublista de ésta, definida por un índice inferior (inf) y otro superior (sup) (ej. a = [7,0,5,-1,3,2,4,-3,9,2], inf=2, sup=7). Suele ser más eficiente, aunque también más compleja."
   },
   {
    "title": "Arrays y listas: suma de los elementos de una lista",
    "level": 3,
    "md": "- Dado una lista a de n números, hallar la suma de éstos: $s(a)=\\sum_{i=0}^{n-1}a_i$.\n- Hay varias formas de emplear recursividad para resolver este problema, y varias implementaciones posibles:\n  1. $s(a)=\\sum_{i=0}^{n-1}a_i=a_0+\\sum_{i=1}^{n-1}a_i=a_0+s(a_{1..n-1})$\n  2. $s(a)=\\sum_{i=0}^{n-1}a_i=\\sum_{i=0}^{n-2}a_i+a_{n-1}=s(a_{0..n-2})+a_{n-1}$\n  3. $s(a)=\\sum_{i=0}^{n-1}a_i=\\sum_{i=0}^{m}a_i+\\sum_{i=m+1}^{n-1}a_i=s(a_{0..m})+s(a_{m+1..n-1})$"
   },
   {
    "title": "Arrays y listas - Implementación tipo 1",
    "level": 3,
    "md": "```python\n# s(a) => a[0] + s(a[1:n])\ndef suma_lista_1(a):\n    if len(a) == 0:\n        return 0\n    else:\n        return a[0] + suma_lista_1(a[1:])\n\n\n# s(a) => s(a[0:n-1]) + a[n-1]\ndef suma_lista_2(a):\n    if len(a) == 0:\n        return 0\n    else:\n        return suma_lista_2(a[:-1]) + a[-1]\n\n\n# s(a) => s(a[0:n//2]) + s(a[n//2:n])\ndef suma_lista_3(a):\n    if len(a) == 0:\n        return 0\n    elif len(a) == 1:\n        return a[0]\n    else:\n        mitad = len(a)//2\n        return suma_lista_3(a[:mitad]) + suma_lista_3(a[mitad:])\n```"
   },
   {
    "title": "Arrays y listas - Implementación tipo 2",
    "level": 3,
    "md": "```python\n# s(a) => a[0] + s(a[1:n])\ndef suma_lista_limites_1(a,inf,sup):\n    if inf>sup:\n        return 0\n    else:\n        return a[inf] + suma_lista_limites_1(a,inf+1,sup)\n\n\n# s(a) => s(a[0:n-1]) + a[n-1]\ndef suma_lista_limites_2(a,inf,sup):\n    if inf>sup:\n        return 0\n    else:\n        return a[sup] + suma_lista_limites_2(a,inf,sup-1)\n\n\n# s(a) => s(a[0:n//2]) + s(a[n//2:n])\ndef suma_lista_limites_3(a,inf,sup):\n    if inf>sup:\n        return 0\n    elif inf==sup:\n        return a[inf] # or a[sup]\n    else:\n        mitad = (sup+inf)//2\n        return suma_lista_limites_3(a,inf,mitad) + suma_lista_limites_3(a,mitad+1,sup)\n```"
   },
   {
    "title": "Problemas básicos",
    "level": 2,
    "md": ""
   },
   {
    "title": "Suma de los dígitos de un número",
    "level": 3,
    "md": "- Dado un número $n\\in\\mathbb{N}$, hallar la suma de sus dígitos. Ejemplo: para n=3652, se devuelve $s(3652)=3+6+5+2=16$.\n- Paso 1 (tamaño): el número de dígitos de n.\n- Paso 2 (casos base): instancia más pequeña: que el número solo contenga un dígito. Si n<10, s(n)=n.\n- Paso 3 (descomposición). Opciones: eliminar el dígito menos significativo s(365) (más sencillo); eliminar el más significativo s(652); dividir el número por la mitad s(36), s(52).\n- Paso 3: s(n//10) es la suma de todos los dígitos de n, salvo el menos significativo. s(365)=14.\n- Paso 4 (casos recursivos): si conocemos s(n//10) solamente hace falta sumarle el dígito menos significativo de n: (n%10). En el ejemplo: s(3652)=s(365)+2. Caso recursivo: $s(n)=s(n//10)+(n\\%10)$.\n```python\ndef suma_digitos(n):\n    if n<10:\n        return n\n    else:\n        return suma_digitos(n//10) + n%10\n```"
   },
   {
    "title": "Suma lenta",
    "level": 3,
    "md": "- Dados $a,b\\in\\mathbb{N}$, hallar su suma. Solo se puede sumar o restar una unidad a los números. Ejemplo: $s(a,b)=a+b$. Para a=3 y b=5, s(3,5)=8.\n- Paso 1 (tamaño): hay varias opciones. Puede ser a, b o mín(a,b). Empecemos tomando como tamaño a.\n- Paso 2 (casos base): instancia más pequeña: a=0. En ese caso s(0,b)=b.\n- Paso 3 (descomposición): varias opciones válidas: el subproblema s(a-1,b); s(a-1,b+1); s(a-1,b-1).\n\n#### Suma lenta - I\n- Paso 3: s(a-1,b)=a-1+b. Paso 4: ¿cómo conseguir s(a,b) si ya sabemos s(a-1,b)? Solo hace falta sumarle 1. Caso recursivo: s(a,b)=s(a-1,b)+1.\n```python\ndef suma_lenta1(a,b):\n    if a==0:\n        return b\n    else:\n        return suma_lenta1(a-1,b) + 1\n```\n#### Suma lenta - II\n- Paso 3: s(a-1,b+1)=a-1+b+1=a+b. Paso 4: no hace falta hacer nada. Caso recursivo: s(a,b)=s(a-1,b+1).\n```python\ndef suma_lenta2(a,b):\n    if a==0:\n        return b\n    else:\n        return suma_lenta2(a-1,b+1)\n```\n#### Suma lenta - III\n- Paso 3: s(a-1,b-1)=a-1+b-1=a+b-2. Paso 4: sumar 1 dos veces. Caso recursivo: s(a,b)=s(a-1,b-1)+1+1.\n```python\ndef suma_lenta3(a,b):\n    if a==0:\n        return b\n    else:\n        return suma_lenta3(a-1,b-1) + 1 + 1\n```\n#### Suma lenta - IV\n- Paso 1 (tamaño): ahora, tomemos mín(a,b) como tamaño del problema.\n- Paso 2 (casos base): instancia más pequeña: a=0 o b=0. Si a=0 se retorna b, y si b=0 se retorna a. Es decir, s(0,b)=b y s(a,0)=a.\n- Paso 3 (descomposición): consideramos el subproblema s(a-1,b-1). Garantiza que se reduce el tamaño del problema. s(a-1,b-1)=a+b-2.\n- Paso 4: sumar 1 dos veces. Caso recursivo: s(a,b)=s(a-1,b-1)+1+1.\n```python\ndef suma_lenta4(a,b):\n    if a==0:\n        return b\n    elif b==0:\n        return a\n    else:\n        return suma_lenta4(a-1,b-1) + 1 + 1\n```"
   },
   {
    "title": "Máximo de una lista",
    "level": 3,
    "md": "- Dada una lista a, de longitud $n\\ge1$, hallar el máximo de sus elementos: $\\max_{i=0..n-1}\\{a_i\\}$. Ejemplo: m([4,2,7,5]) = 7.\n- Paso 1 (tamaño): n. Paso 2 (casos base): si n=1, $m(a)=a_0$.\n- Paso 3 (descomposición), varias opciones válidas: eliminar el primer elemento (a[1:]) $m(a_{1..n-1})$; eliminar el último (a[:-1]) $m(a_{0..n-2})$; dividir la lista por la mitad (a[:mitad] y a[mitad:]) $m(a_{0..h-1})$ y $m(a_{h..n-1})$, donde $h=n//2=\\lfloor n/2\\rfloor$.\n\n#### Máximo de una lista - I\n- Paso 3: $m(a_{1..n-1})$. Paso 4: será el mayor entre el encontrado en la sublista y el primer elemento de a. Caso recursivo: $m(a)=\\max\\{m(a_{1..n-1}),a_0\\}$.\n```python\ndef maximo1(a):\n    if len(a)==1:\n        return a[0]\n    else:\n        return max(maximo1(a[1:]),a[0])\n```\n#### Máximo de una lista - II\n- Paso 3: $m(a_{0..n-2})$. Caso recursivo: $m(a)=\\max\\{m(a_{0..n-2}),a_{n-1}\\}$.\n```python\ndef maximo2(a):\n    n = len(a)\n    if n==1:\n        return a[0]\n    else:\n        return max(maximo2(a[:-1]),a[n-1])\n```\n#### Máximo de una lista - III\n- Paso 3: $m(a_{0..h-1})$ y $m(a_{h..n-1})$. Será el mayor entre los máximos encontrados en ambas sublistas. Caso recursivo: $m(a)=\\max\\{m(a_{0..h-1}),m(a_{h..n-1})\\}$.\n```python\ndef maximo3(a):\n    n = len(a)\n    if n==1:\n        return a[0]\n    else:\n        mitad = n//2\n        return max(maximo3(a[:mitad]), maximo3(a[mitad:]))\n```"
   },
   {
    "title": "Potencia con exponente no negativo",
    "level": 3,
    "md": "- Calcular $b^n$, donde $b\\in\\mathbb{R}$ y $n\\in\\mathbb{N}$ es un entero no negativo. Ejemplo: si $f(b,n)=b^n$, $f(2,5)=2^5=32$.\n- Paso 1 (tamaño): n. Paso 2 (casos base): si n=0: f(b,n)=1 (se asume que $0^0=1$).\n- Paso 3 (descomposición), opciones: considerar f(b,n-1); considerar f(b,n//2).\n\n#### Potencia - I\n- Paso 4: ¿cómo conseguir $b^n$ si conoces $b^{n-1}$? Caso recursivo: $b^n=b\\cdot b^{n-1}$.\n```python\ndef pot1(b,n):\n    if n==0:\n        return 1\n    else:\n        return b*pot1(b,n-1)\n```\n- $T(n)=\\Theta(n)$.\n\n#### Potencia - II\n- Paso 4: ¿cómo conseguir $b^n$ si conoces $b^{n//2}$? Si n es par: $b^n=(b^{n//2})^2$. Si n es impar: $b^n=b\\cdot(b^{n//2})^2$.\n```python\ndef pot2(b,n):\n    if n==0:\n        return 1\n    elif n%2==0:\n        p = pot2(b,n//2)\n        return p*p\n    else:\n        p = pot2(b,n//2)\n        return b*p*p\n```\n- $T(n)=\\Theta(\\log n)$."
   },
   {
    "title": "Escribir secuencia de caracteres - I",
    "level": 3,
    "md": "- Dada una cadena de n caracteres s, escribir éstos verticalmente y en orden. Si s es la cadena vacía se escribirá un salto de línea. Ejemplo: f('hola') → h, o, l, a (uno por línea).\n- Paso 1 (tamaño): n. Paso 2 (casos base): si n=0: print(); si n=1: print(s).\n- Paso 3 (descomposición): eliminar el primer elemento de s (s[1:]) $f_1(s_{1..n-1})$; eliminar el último (s[:-1]) $f_2(s_{0..n-2})$; escribir ambas mitades por separado (s[:mitad] y s[mitad:]) $f_3(s_{0..h-1})$ y $f_3(s_{h..n-1})$, donde h=n//2."
   },
   {
    "title": "Escribir secuencia de caracteres - II",
    "level": 3,
    "md": "- Igual pero en orden inverso: g('hola') → a, l, o, h (uno por línea). Mismos pasos 1 a 3 con $g_1,g_2,g_3$."
   },
   {
    "title": "Escribir secuencia de caracteres - I y II",
    "level": 3,
    "md": "- Pasos 4 y 5 (casos recursivos e implementación):\n```python\ndef f1(s):\n    n = len(s)\n    if n==0:\n        print()\n    elif n==1:\n        print(s)\n    else:\n        print(s[0])\n        f1(s[1:])\n\ndef f2(s):\n    n = len(s)\n    if n==0:\n        print()\n    elif n==1:\n        print(s)\n    else:\n        f2(s[:-1])\n        print(s[-1])\n\ndef f3(s):\n    n = len(s)\n    if n==0:\n        print()\n    elif n==1:\n        print(s)\n    else:\n        m = n//2\n        f3(s[:m])\n        f3(s[m:])\n```\n```python\ndef g1(s):\n    n = len(s)\n    if n==0:\n        print()\n    elif n==1:\n        print(s)\n    else:\n        g1(s[1:])\n        print(s[0])\n\ndef g2(s):\n    n = len(s)\n    if n==0:\n        print()\n    elif n==1:\n        print(s)\n    else:\n        print(s[-1])\n        g2(s[:-1])\n\ndef g3(s):\n    n = len(s)\n    if n==0:\n        print()\n    elif n==1:\n        print(s)\n    else:\n        m = n//2\n        g3(s[m:])\n        g3(s[:m])\n```"
   },
   {
    "title": "Sumatorio general",
    "level": 3,
    "md": "- Dada una función general g(x) y unos límites m y n, hallar $f(m,n,g)=\\sum_{i=m}^{n}g(i)$.\n- Paso 1 (tamaño): n-m+1 (número de términos a sumar).\n- Paso 2 (casos base): si m>n (el tamaño es 0 o negativo): f(m,n,g)=0. Si m=n (solo necesario si se divide el sumatorio en dos en la fase de descomposición): f(m,n,g)=g(m).\n- Paso 3 (descomposición): eliminamos el primer elemento de la suma, consideramos f(m+1,n,g): $\\sum_m^n g(i)=g(m)+\\sum_{m+1}^n g(i)$. Eliminamos el último, consideramos f(m,n-1,g): $\\sum_m^n g(i)=\\sum_m^{n-1}g(i)+g(n)$. Dividimos el sumatorio en dos (por la mitad), consideramos f(m,h,g) y f(h+1,n,g), donde h=(n+m)//2: $\\sum_m^n g(i)=\\sum_m^h g(i)+\\sum_{h+1}^n g(i)$.\n- Pasos 4 y 5:\n```python\ndef g(x):\n    return x*x;\n\ndef s1(m,n,g):\n    if m>n:\n        return 0\n    else:\n        return g(m) + s1(m+1,n,g)\n\ndef s2(m,n,g):\n    if m>n:\n        return 0\n    else:\n        return s2(m,n-1,g) + g(n)\n\ndef s3(m,n,g):\n    if m>n:\n        return 0\n    elif m==n:\n        return g(m)\n    else:\n        mitad = (n+m)//2\n        return s3(m,mitad,g) + s3(mitad+1,n,g)\n```"
   },
   {
    "title": "¿Contiene dígito?",
    "level": 3,
    "md": "- Dado un entero no negativo n, y un dígito $d\\in\\{0,1,\\dots,9\\}$, determinar si d es una de las cifras de n. Ejemplo: si la función booleana es f(n,d), f(3082,2)=True.\n- Paso 1 (tamaño): el número de dígitos de n.\n- Paso 2 (casos base): si n solo contiene un dígito el resultado es ¿n=d? Si d es el último dígito de n (el menos significativo) el resultado es True (se puede incorporar como caso base o en la regla recursiva).\n- Paso 3 (descomposición): consideramos n//10, que es n sin el último dígito.\n- Paso 4 (casos recursivos): si no estás en un caso base (d no es el último dígito de n) el resultado será f(n//10,d) (si d es una de las cifras restantes de n).\n```python\ndef contiene_digito_cola(n,d):\n    if n<10:\n        return n==d\n    elif n%10==d:\n        return True\n    else:\n        return contiene_digito_cola(n//10,d)\n\ndef contiene_digito_lineal(n,d):\n    if n<10:\n        return n==d\n    else:\n        return (n%10==d) or contiene_digito_lineal(n//10,d)\n```"
   },
   {
    "title": "Problemas adicionales",
    "level": 2,
    "md": ""
   },
   {
    "title": "Cambio de base",
    "level": 3,
    "md": "- Dado un número entero no negativo n, calcular su expresión en base b ($b\\in[2,9]$ es otro entero). Ejemplo: $142_{10}=1032_5$. Por tanto, c(142,5)=1032.\n- Paso 1 (tamaño): el número de dígitos de la salida.\n- Paso 2 (casos base): instancia más pequeña: que la salida solo tenga un dígito, n<b. En ese caso c(n,b)=n.\n- Paso 3 (descomposición): ¿cómo te acercas al caso base? Dividiendo n entre b. c(n//b,b) tendrá un dígito menos que c(n,b).\n- Paso 4 (casos recursivos): ¿si conoces c(n//b,b), cómo construyes c(n,b)? Ejemplo: para n=142, n//5=28. Además, c(142,5)=1032 y c(28,5)=103. Tendríamos que multiplicar 103 por 10, y sumarle 2. La regla recursiva es: $c(n,b)=10\\cdot c(n//b,b)+n\\%b$.\n```python\ndef cambio_base(n,b):\n    if n<b:\n        return n\n    else:\n        return 10*cambio_base(n//b,b) + n%b\n```"
   },
   {
    "title": "Evaluar un polinomio",
    "level": 3,
    "md": "- Sea $P(x,d)=d_nx^n+d_{n-1}x^{n-1}+\\cdots+d_1x+d_0$ un polinomio de grado n, determinado por los coeficientes $d_i$, que se especifican en una lista d de longitud n+1. Evaluar el polinomio para un valor concreto de x. Ejemplo: $P(3,[2,-4,5])=5\\cdot(3)^2-4\\cdot(3)^1+2=35$.\n- Paso 1 (tamaño): n. Paso 2 (casos base): n=0. En ese caso $P(x,d)=d_0$.\n- Paso 3 (descomposición): eliminamos el primer elemento de d (algoritmo de Horner). También se puede eliminar el último, o partir el polinomio en dos.\n- Paso 4 (casos recursivos): asumimos que conocemos $P(x,d_{1..n})=d_nx^{n-1}+d_{n-1}x^{n-2}+\\cdots+d_1$. La regla recursiva es: $P(x,d)=d_0+x\\cdot P(x,d_{1..n})$.\n```python\ndef horner(x,d):\n    if len(d)==1:\n        return d[0]\n    else:\n        return d[0] + x*horner(x,d[1:])\n```"
   },
   {
    "title": "Búsqueda lineal",
    "level": 3,
    "md": "- Dada una lista a de longitud n, no necesariamente ordenada, y un elemento x, devolver un índice de la lista en el que se encuentre x. Si x no está en la lista el método devolverá -1. El método será una función f(a,x).\n- Paso 1 (tamaño): n.\n- Paso 2 (casos base): n=0. En ese caso el método devolverá -1. Otros casos triviales (no es necesario considerar ambos): si $x=a_{n-1}$ el método devolverá n-1; si $x=a_0$ el método devolverá 0.\n- Paso 3 (descomposición): eliminar el último elemento de la lista (veremos solo este caso); eliminar el primer elemento de la lista.\n- Paso 4 (casos recursivos): si hemos comprobado que $x\\ne a_{n-1}$, entonces el resultado será el resultado de buscar a x en la sublista $a_{0..n-2}$. En ese caso $f(a,x)=f(a_{0..n-2},x)$.\n```python\ndef busqueda_lineal(a, x):\n    n = len(a)\n    if n==0:\n        return -1\n    elif a[n-1]==x:\n        return n-1\n    else:\n        return busqueda_lineal(a[:-1], x)\n```"
   },
   {
    "title": "Búsqueda en lista ordenada",
    "level": 3,
    "md": "- Dada una lista a de longitud n, ordenada de manera creciente, y un elemento x, devolver un índice de la lista en el que se encuentre x. Si x no está en la lista el método devolverá -1.\n- Paso 1 (tamaño): n.\n- Paso 2 (casos base): n=0. La lista es vacía; se devuelve -1. Si $x=a_m$ el método devolverá m. En el algoritmo que veremos (búsqueda binaria) m hará referencia a la mitad de la lista.\n- Paso 3 (descomposición): descartar la búsqueda en la mitad superior o inferior de la lista. Esto conducirá a un algoritmo que correrá en tiempo $\\Theta(\\log n)$.\n- Paso 4 (casos recursivos): si $x<a_m$ entonces x solo podrá estar en $a_{0..m-1}$, por lo que la búsqueda debe continuar en esa primera mitad. Si $x>a_m$ entonces x solo podrá estar en $a_{m+1..n-1}$, por lo que la búsqueda debe continuar en la segunda mitad.\n- Paso 5 (implementación): al tener que devolver un índice, es conveniente emplear parámetros que indiquen el principio (inf) y final (sup) de la sublista de a en la que se va a realizar la búsqueda. Se pasa toda la lista a (en realidad, un puntero a ella), pero la función debe trabajar solo con los índices entre inf y sup.\n```python\ndef busqueda_binaria(a, x, inf, sup):\n    if inf>sup:\n        return -1\n    else:\n        mitad = (inf+sup)//2\n\n        if x==a[mitad]:\n            return mitad\n        elif x<a[mitad]:\n            return busqueda_binaria(a, x, inf,mitad-1)\n        else:\n            return busqueda_binaria(a, x, mitad+1, sup)\n```"
   },
   {
    "title": "Formas de subir escaleras",
    "level": 3,
    "md": "- Halla el número de maneras en las que se puede subir unas escaleras de n peldaños, dando pasos de uno o dos peldaños.\n- Paso 1 (tamaño): n. Paso 2 (casos base): n=1: solo hay una forma de subir, f(1)=1. n=2: hay dos formas, f(2)=2.\n- Paso 3 (descomposición): suponemos que sabemos subir tanto n-1 como n-2 peldaños. Intentaremos construir f(n) a partir de f(n-1) y f(n-2).\n- Paso 4 (casos recursivos): en problemas combinatorios (de conteo) es recomendable agrupar los elementos a contar en diferentes categorías. En este caso hay dos tipos de formas de subir: las secuencias que comienzan subiendo un peldaño, y las que empiezan subiendo dos. El número de secuencias que empiezan subiendo un peldaño es f(n-1). El número de secuencias que empiezan subiendo dos peldaños en un paso es f(n-2).\n```python\ndef f(n):\n    if n==1:\n        return 1\n    elif n==2:\n        return 2\n    else:\n        return f(n-1) + f(n-2)\n```"
   },
   {
    "title": "Caminos por Manhattan",
    "level": 3,
    "md": "- Hallar el número de formas de llegar desde el origen (0,0) hasta el punto (x,y), donde $x,y\\in\\mathbb{N}$, dando x+y pasos, donde en cada uno solo se puede avanzar una unidad hacia arriba o hacia la derecha. Es decir, solo se puede incrementar en una unidad la coordenada x o la coordenada y en cada paso.\n- Paso 1 (tamaño): x+y.\n- Paso 2 (casos base): x=0 e y=0 es un caso base, pero hay otro más general: si x=0 o y=0 solo habrá una forma de alcanzar (x,y) (un camino totalmente horizontal o vertical). Si x=0 e y=0 se considera que hay un camino válido.\n- Paso 3 (descomposición): suponemos que sabemos llegar al punto (x-1,y) y al (x,y-1). Es decir, aprovechamos las soluciones f(x-1,y) y f(x,y-1).\n- Paso 4 (casos recursivos): desde (x-1,y) o (x,y-1) solo hay una manera de llegar a (x,y). Por tanto: $f(x,y)=f(x-1,y)+f(x,y-1)$.\n```python\ndef f(x,y):\n    if (x==0) or (y==0):\n        return 1\n    else:\n        return f(x-1,y) + f(x,y-1)\n```\n$$f(x,y)=\\frac{(x+y)!}{x!\\cdot y!}=\\binom{x+y}{y}=\\binom{x+y}{x}$$"
   },
   {
    "title": "Encontrar un 0 de una función: bisección",
    "level": 3,
    "md": "- Sea f(x) una función continua en un intervalo [a,b]. Se sabe que signo(f(a)) ≠ signo(f(b)), por lo que la función tendrá al menos un cero (r). Se pide hallar uno de estos ceros con una precisión de ε (la diferencia con respecto al cero real será ε como mucho). Por tanto, el resultado será una estimación ẑ. La función a implementar será ζ(a,b,f,ε).\n- Paso 1 (tamaño): b-a, que, en función de ε, determinará el número de veces que se reducirá el intervalo de búsqueda por 2.\n- Paso 2 (casos base): si f(ẑ)=0 se podrá parar: se ha encontrado un cero exacto (ẑ=r). Si b-a<2ε, la diferencia entre el cero real (r) y nuestra estimación del cero (ẑ) será menor o igual a ε ($|\\hat z-r|\\le\\epsilon$) y podremos parar.\n- Paso 3 (descomposición): reducimos el ancho del intervalo, dividiéndolo por dos. Tomando ẑ=(a+b)/2, ẑ pasará a ser un extremo de un nuevo intervalo, de manera que los signos de la función en sus extremos sean diferentes.\n- Paso 4 (casos recursivos): inicialmente ẑ=(a+b)/2. Si signo(f(a)) ≠ signo(f(ẑ)) entonces el resultado será ζ(a,ẑ,f,ε). En caso contrario será ζ(ẑ,b,f,ε).\n```python\ndef f(x):\n    return x*x-2\n\ndef biseccion(a, b, f, epsilon):\n    z = (a+b)/2\n\n    if f(z)==0 or b-a<=2*epsilon:\n        return z\n    elif (f(a)>0 and f(z)<0) or (f(a)<0 and f(z)>0):\n        return biseccion(a, z, f, epsilon)\n    else:\n        return biseccion(z, b, f, epsilon)\n```"
   },
   {
    "title": "Torres de Hanoi",
    "level": 3,
    "md": "- Se dispone de n discos de diferente tamaño (el i-ésimo disco tiene radio i), insertados en una torre, en orden decreciente de tamaño (estado inicial). El objetivo es determinar la secuencia de movimientos de discos individuales para ubicar a todos los discos en otra torre (estado final), usando una tercera como auxiliar, con las reglas: 1) solo se puede mover un disco a la vez; 2) no puede haber un disco de mayor tamaño encima de otro de menor tamaño.\n- Cada movimiento se imprimirá por pantalla como \"Mover disco i desde t1 a t2\", donde t1 y t2 podrán ser la torre origen (O), auxiliar (A) o destino (D).\n- Para n=4 se puede resolver en 15 movimientos. No suele ser útil analizar todas las operaciones (las etapas 7 y 8 son especialmente interesantes). Debemos centrarnos en subproblemas y sus soluciones.\n- Paso 1 (tamaño): n. Paso 2 (casos base): si n=1: mover el disco 1 desde la torre origen a la destino. También: si n=0: no se realiza ningún movimiento.\n- Paso 3 (descomposición): consideramos subproblemas de tamaño n-1. Implicación clave: suponemos que sabemos mover toda una pirámide de n-1 discos, desde cualquier torre a otra.\n- Paso 4 (casos recursivos): (1) mueve la pirámide de n-1 discos de O a A (llamada recursiva); (2) mueve el disco n de O a D (operación básica); (3) mueve la pirámide de n-1 discos de A a D (llamada recursiva).\n```python\ndef torres_Hanoi(n,o,d,a):\n    if n==1:\n        print('Mueve disco',n,'desde torre',o,'a torre',d)\n    else:\n        torres_Hanoi(n-1,o,a,d)\n        print('Mueve disco',n,'desde torre',o,'a torre',d)\n        torres_Hanoi(n-1,a,d,o)\n\n\n# Código alternativo\ndef torres_Hanoi_alt(n,o,d,a):\n    if n>0:\n        torres_Hanoi_alt(n-1,o,a,d)\n        print('Mueve disco',n,'desde torre',o,'a torre',d)\n        torres_Hanoi_alt(n-1,a,d,o)\n```"
   },
   {
    "title": "Torres de Hanoi cíclicas",
    "level": 3,
    "md": "- Idéntico al de las torres de Hanoi original, pero añade una restricción: si las torres se ubican en los vértices de un triángulo (A, B, C), los discos solo podrán pasar de una torre a otra en el sentido de las agujas del reloj.\n- Realmente tenemos dos problemas distintos: PROBLEMA 1: mover n discos en el sentido de las agujas del reloj (O → D con A en medio, en sentido reloj). PROBLEMA 2: mover n discos en el sentido contrario al de las agujas del reloj.\n- Paso 1 (tamaño): n.\n- Paso 2 (casos base): si n=1 (\"reloj\"): mover el disco 1 desde la torre origen a la destino. Si n=1 (\"antireloj\"): mover el disco 1 desde la torre origen a la auxiliar, y luego a la destino. También: si n=0: no se realiza ningún movimiento.\n- Paso 3 (descomposición): consideramos subproblemas de tamaño n-1, para ambos problemas. Implicación clave: suponemos que sabemos mover toda una pirámide de n-1 discos, en cualquiera de los dos sentidos.\n- Paso 4 (casos recursivos): operaciones que podemos realizar: instrucción básica (mover un disco); llamadas recursivas (mover n-1 discos en el sentido de las agujas del reloj; mover n-1 discos en el sentido contrario).\n  - Sentido \"reloj\": inicio (n discos en O); paso 1: n-1 discos de O a A (antireloj); paso 2: disco n de O a D; paso 3: n-1 discos de A a D (antireloj).\n  - Sentido \"antireloj\": inicio; paso 1: n-1 discos de O a D (antireloj); paso 2: disco n de O a A; paso 3: n-1 discos de D a O (reloj); paso 4: disco n de A a D; paso 5: n-1 discos de O a D (antireloj).\n- Paso 5 (implementación):\n```python\ndef reloj(n,o,d,a):\n    if n>0:\n        antireloj(n-1,o,a,d)\n        print('Mueve disco',n,'desde torre',o,'a torre',d)\n        antireloj(n-1,a,d,o)\n\n\ndef antireloj(n,o,d,a):\n    if n>0:\n        antireloj(n-1,o,d,a)\n        print('Mueve disco',n,'desde torre',o,'a torre',d)\n        reloj(n-1,d,o,a)\n        print('Mueve disco',n,'desde torre',o,'a torre',d)\n        antireloj(n-1,o,d,a)\n```"
   }
  ]
 },
 {
  "id": "t5_divide_y_venceras",
  "title": "Tema 5 Divide y vencerás",
  "sections": [
   {
    "title": "Tema 5 Divide y vencerás",
    "level": 2,
    "md": "Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.\nContenido: 1 Introducción; 2 Transforma y vencerás; 3 Divide y vencerás (máximo de una lista, ordenación, multiplicación, embaldosado con L-triominós, permutación de inversión de bits)."
   },
   {
    "title": "Introducción",
    "level": 2,
    "md": ""
   },
   {
    "title": "Divide y vencerás",
    "level": 3,
    "md": "- Uno de los más importantes paradigmas de diseño algorítmico.\n- Se basa en la resolución de un problema dividiéndolo en dos o más subproblemas de igual tipo o similar.\n- El proceso continúa hasta que éstos llegan a ser lo suficientemente sencillos como para que se resuelvan directamente.\n- Al final, las soluciones a cada uno de los subproblemas se combinan para dar una solución al problema original.\n- Muchos algoritmos basados en esta estrategia son recursivos; también hay algoritmos iterativos de divide y vencerás."
   },
   {
    "title": "Estrategias de diseño de algoritmos",
    "level": 3,
    "md": "- Transforma y vencerás: reducciones (vistas en el Tema 1).\n- Decrementa y vencerás: se reduce el tamaño del problema (p.e., n-1, n//2, n//10, etc.). Una sola llamada recursiva en cada caso recursivo; se requiere la solución de un solo subproblema. Ejemplos vistos en el Tema 4.\n- Divide y vencerás: se reduce el tamaño del problema (p.e., n//2, n//4, etc.). Más de una llamada en algún caso recursivo; se requiere la solución de varios subproblemas."
   },
   {
    "title": "Transforma y vencerás",
    "level": 2,
    "md": ""
   },
   {
    "title": "Transforma y vencerás",
    "level": 3,
    "md": "- Esta estrategia también se denomina reducción.\n- Resolver un problema transformándolo en otro más simple, conocido, o para el que existan algoritmos eficientes.\n- Esquema: Problema A (resolución difícil o ineficiente) → transformación → Problema B (resolución sencilla o eficiente) → solución B → paso sencillo → solución A."
   },
   {
    "title": "Mediana de un array v desordenado",
    "level": 3,
    "md": "1. Ordenar el array v → $\\Theta(n\\log n)$.\n2. Devolver: $v[n//2]$ si n es impar; $\\dfrac{v[(n//2)-1]+v[n//2]}{2}$ si n es par.\n- Ejemplo: [4,2,5,5,6,1,0,3,4,5,8,7] ordenado [0,1,2,3,4,4,5,5,5,6,7,8] → mediana 4.5.\n- Hay algoritmos más eficientes (p.e., \"Quickselect\")."
   },
   {
    "title": "Estimación del valor de π",
    "level": 3,
    "md": "- Planteamos un problema alternativo: buscamos una aproximación del perímetro p de un círculo de radio R: $p=2\\pi R\\Rightarrow\\pi=\\dfrac{p}{2R}$.\n- Aproximamos un círculo con un polígono regular inscrito o circunscrito al círculo. El perímetro del polígono inscrito $p_i$ nos dará una cota inferior de p; el del circunscrito $p_c$ una cota superior:\n$$\\frac{p_i}{2R}\\le\\pi\\le\\frac{p_c}{2R}$$\n- Comenzamos por un polígono regular inscrito (por ejemplo, un hexágono), cuyo perímetro será 6R. A continuación, doblamos el número de lados, obteniendo una mejor aproximación (hexágono, dodecágono, ...).\n- El perímetro de un polígono con el doble de lados se puede obtener fácilmente a partir del primero. Los perímetros de los polígonos circunscritos se pueden obtener de los perímetros de los polígonos inscritos.\n- Relaciones geométricas:\n{{fig img/t5-p12.png | triángulo con lado inscrito L, lado l del polígono con doble de lados, lado circunscrito L', radio R}}\n$R^2=y^2+\\left(\\tfrac{L}{2}\\right)^2$, $R=x+y$, $l^2=x^2+\\left(\\tfrac{L}{2}\\right)^2$, $\\dfrac{L'}{R}=\\dfrac{l}{y}$.\n- Si el lado de un polígono inscrito mide L, se puede hallar la longitud l de un lado del polígono con el doble de lados:\n$$R^2=y^2+\\left(\\tfrac{L}{2}\\right)^2\\Rightarrow y=\\sqrt{R^2-\\left(\\tfrac{L}{2}\\right)^2},\\quad x=R-y=R-\\sqrt{R^2-\\left(\\tfrac{L}{2}\\right)^2}$$\n$$l=\\sqrt{\\left(\\tfrac{L}{2}\\right)^2+R^2+R^2-\\left(\\tfrac{L}{2}\\right)^2-2R\\sqrt{R^2-\\left(\\tfrac{L}{2}\\right)^2}}=R\\sqrt{2-\\sqrt{4-\\left(\\tfrac{L}{R}\\right)^2}}$$\n- El lado L' de un polígono circunscrito se puede hallar a partir del lado L de un inscrito: $\\dfrac{L'}{R}=\\dfrac{L}{y}\\Rightarrow L'=\\dfrac{LR}{y}$.\n- La estimación de π se obtiene a partir de los perímetros hallados:\n$$\\frac{L\\cdot\\text{número de lados}}{2R}\\le\\pi\\le\\frac{L'\\cdot\\text{número de lados}}{2R}$$\n- Otros métodos para estimar π: simulación Monte Carlo; integración numérica; series: $\\arctan x=x-\\frac{x^3}{3}+\\frac{x^5}{5}-\\frac{x^7}{7}+\\cdots$ para x=1 $\\Rightarrow$ $\\frac{\\pi}{4}=1-\\frac13+\\frac15-\\frac17+\\cdots$."
   },
   {
    "title": "Raíz cuadrada",
    "level": 3,
    "md": "- Deseamos hallar $\\sqrt a$. Transformamos el problema en el de hallar un cero de una función: $x=\\sqrt a\\to x^2=a\\to x^2-a=0$.\n- Por tanto, querremos hallar un cero de la función $y=x^2-a$. Como x será generalmente un número real, nos podemos conformar con una aproximación.\n- Hay varios métodos para resolver este nuevo problema, por ejemplo: método de Newton-Raphson (a continuación); método de bipartición (de \"decrementa y vencerás\")."
   },
   {
    "title": "Método de Newton-Raphson",
    "level": 3,
    "md": "- Método iterativo, que parte de un valor inicial $x_0$, y aplica la siguiente regla para hallar un cero (r) de la función f(x):\n$$x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)}$$\n- En cada iteración se busca la recta tangente a f(x) que pasa por el punto $p=(x_n,f(x_n))$. El corte de la recta con el eje de abscisas constituye el nuevo punto $x_{n+1}$.\n- El método surge del desarrollo de f(x) en serie de Taylor, en un entorno del punto $x_n$:\n$$f(x)=f(x_n)+f'(x_n)(x-x_n)+(x-x_n)^2\\frac{f''(x_n)}{2!}+\\dots$$\n- Si se trunca el desarrollo a partir del término de grado 2, se obtiene la recta tangente (que pasa por $(x_n,f(x_n))$). Posteriormente evaluamos en $x_{n+1}$: $f(x_{n+1})=f(x_n)+f'(x_n)(x_{n+1}-x_n)$. Si asumimos que $x_{n+1}$ tiende hacia el cero de la función, podemos sustituir $f(x_{n+1})=0$, obteniéndose el algoritmo.\n- Raíz cuadrada con Newton-Raphson: se aplica la regla para $f(x)=x^2-a$, con $f'(x)=2x$:\n$$x_{n+1}=x_n-\\frac{x_n^2-a}{2x_n}=\\frac{2x_n^2}{2x_n}-\\frac{x_n^2-a}{2x_n}=\\frac{x_n^2+a}{2x_n}$$\n- Ejemplo (a=13, x0=13): x1=7, x2=4,428571..., x3=3,682027..., x4=3,606345..., x5=3,605551..., x6=3,60555127546399..., que converge a $\\sqrt{13}=3{,}60555127546398912486$."
   },
   {
    "title": "Factorización LU",
    "level": 3,
    "md": "- Supongamos que queremos resolver un sistema de ecuaciones $Ax=b$, donde A es una matriz cuadrada e invertible de dimensiones $n\\times n$. Una solución: $x=A^{-1}b$. $A^{-1}$ se calcula en $O(n^3)$, pero no suele ser buena idea por: errores de precisión; $A^{-1}$ puede ser densa incluso cuando A es dispersa.\n- Alternativa: factorización LU, que también se calcula en $O(n^3)$. $A=LU$, donde L es triangular inferior, y U triangular superior (del mismo tamaño). Para una matriz de 3×3:\n$$\\begin{bmatrix}a_{11}&a_{12}&a_{13}\\\\a_{21}&a_{22}&a_{23}\\\\a_{31}&a_{32}&a_{33}\\end{bmatrix}=\\begin{bmatrix}l_{11}&0&0\\\\l_{21}&l_{22}&0\\\\l_{31}&l_{32}&l_{33}\\end{bmatrix}\\begin{bmatrix}u_{11}&u_{12}&u_{13}\\\\0&u_{22}&u_{23}\\\\0&0&u_{33}\\end{bmatrix}$$\n- Para resolver $Ax=b$ ahora se van a resolver dos sistemas, pero más sencillos: $Ax=LUx=b\\Rightarrow Ly=b,\\ Ux=y$."
   },
   {
    "title": "Divide y vencerás",
    "level": 2,
    "md": ""
   },
   {
    "title": "Divide y vencerás",
    "level": 3,
    "md": "- La descomposición de un problema genera varios subproblemas. Las soluciones a los subproblemas se combinan para generar la solución al problema original, la cual puede requerir alguna operación adicional.\n- Esquema: Problema → divide → varios subproblemas → combina → solución."
   },
   {
    "title": "Divide y vencerás - Ventajas",
    "level": 3,
    "md": "- Base de numerosos algoritmos: Transformada Rápida de Fourier (FFT, posiblemente el algoritmo más importante en la actualidad); problemas geométricos (par de puntos más próximos en el plano, cierre convexo); Skyline (en el libro, apartado 6.7); otros que veremos en este tema.\n- Aumento de eficiencia en términos de coste computacional.\n- Paralelismo (subproblemas tratados en diferentes procesadores).\n- Uso eficiente de jerarquías de memoria (cache)."
   },
   {
    "title": "Máximo de una lista a de n números",
    "level": 3,
    "md": "1. Tamaño: n.\n2. Caso base: si n=1 se devuelve $a_0$.\n3. Descomposición: x = máximo de la primera mitad de a; y = máximo de la segunda mitad de a.\n4. Combinación: $\\max\\{x,y\\}$.\n```python\ndef maximo(a): # Ya visto en el Tema 4\n    n = len(a)\n    if n==1:\n        return a[0]\n    else:\n        mitad = n//2\n        return max(maximo(a[:mitad]), maximo(a[mitad:]))\n```\n- ¿Podríamos conseguir un algoritmo más eficiente que una búsqueda lineal, que tarda O(n)? Claramente, no: sea cual sea nuestra estrategia tenemos que procesar todos los elementos de la lista. Este problema tiene una cota inferior $\\Omega(n)$.\n$$T(n)=\\begin{cases}1 & n=1\\\\ 1+2T(n/2) & n>1\\end{cases}\\qquad T(n)=2n-1\\in\\Theta(n)$$\n- Coste lineal a pesar de dividir el problema por dos, ya que tenemos que resolver dos problemas.\n- El árbol de recursión tiene del orden de $2^h$ nodos ($2\\cdot2^h-1$ si es completo), donde h es la altura del árbol, pero en este problema $h=\\log_2 n$. La función exponencial se cancela con la logarítmica: el árbol tiene 2n-1 nodos, y cada uno requiere $\\Theta(1)$ operaciones. $T(n)\\in\\Theta(n)$. (Niveles: 1, 2, 4, 8, ..., $2^{\\log_2 n}=n$ nodos.)"
   },
   {
    "title": "Problema de ordenación",
    "level": 3,
    "md": "- Algoritmos: Insert-sort; Select-sort; Merge-sort (divide y vencerás); Quicksort (divide y vencerás); Quickselect (algoritmo de búsqueda, no de ordenación).\n- Entradas: una lista a de n números $[a_0,a_1,\\dots,a_{n-1}]$. Salidas: una permutación (reordenación) $[a'_0,a'_1,\\dots,a'_{n-1}]$ de los elementos de a tal que $a'_1\\le a'_2\\le\\cdots\\le a'_n$.\n- Tamaño del problema: n. Casos base: si n≤1 se devuelve la lista de entrada (n podría ser 0, en cuyo caso se devolvería una lista vacía).\n- La descomposición que escojamos determinará el algoritmo a desarrollar."
   },
   {
    "title": "Insert-sort",
    "level": 3,
    "md": "- Descomposición: eliminar el último elemento de la lista de entrada. Ej.: [2,1,9,6,4] → [1,2,4,6,9]; subproblema [2,1,9,6] → [1,2,6,9]; combinación: inserta 4 en lista ordenada.\n```python\ndef insert_sort_rec(a):\n    if len(a) <= 1:\n        return a\n    else:\n        return inserta_en_lista_ordenada(\n            insert_sort_rec(a[:-1]), a[-1])\n```\n- Ejercicio para casa: inserta_en_lista_ordenada()."
   },
   {
    "title": "Select-sort",
    "level": 3,
    "md": "- Descomposición: eliminar el menor elemento de la lista de entrada. Ej.: [7,5,3,8,4] → [3,4,5,7,8]; subproblema [5,7,8,4] → [4,5,7,8]; combinación: concatena [3].\n```python\ndef select_sort_rec(a):\n    if len(a) <= 1:\n        return a\n    else:\n        m = min(a)\n        a.remove(m)\n        return [m] + select_sort_rec(a)\n```\n- Alternativas que no modifican la lista de entrada:\n```python\ndef select_sort_rec(a):\n    if len(a) <= 1:\n        return a\n    else:\n        b = list(a)\n        min_index = b.index(min(b))\n        aux = b[min_index]\n        b[min_index] = b[0]\n        b[0] = aux\n        return [aux] + select_sort_rec(b[1:])\n\ndef select_sort_rec(a):\n    if len(a) <= 1:\n        return a\n    else:\n        b = list(a)\n        m = min(b)\n        b.remove(m)\n        return [m] + select_sort_rec(b)\n```"
   },
   {
    "title": "Merge-sort",
    "level": 3,
    "md": "- Descomposición: dividir la lista de entrada en dos mitades. Ej.: [7,3,4,8,4,6,4,6] → [3,4,4,4,6,6,7,8]; subproblemas [7,3,4,8] → [3,4,7,8] y [4,6,4,6] → [4,4,6,6]; combinación: mezcla.\n```python\ndef merge_sort(a): # Versión out-of-place\n    n = len(a)\n    if n <= 1:\n        return a\n    else:\n        mitad = n//2\n        a1 = merge_sort(a[:mitad])\n        a2 = merge_sort(a[mitad:])\n        return mezcla(a1, a2)\n\n# Versión recursiva sencilla. Es preferible una versión iterativa\n# Las listas a and b están ordenadas de menor a mayor\ndef mezcla(a, b):\n    if a == []:\n        return b\n    elif b == []:\n        return a\n    else:\n        if a[0] < b[0]:\n            return [a[0]] + mezcla(a[1:], b)\n        else:\n            return [b[0]] + mezcla(a, b[1:])\n```"
   },
   {
    "title": "Merge-sort - Versión in-place más eficiente",
    "level": 3,
    "md": "```python\n# Versión in-place, más eficiente\ndef merge_sort_limites(a,ini,fin):\n    if ini<fin:\n        mitad = (ini+fin)//2\n        merge_sort_limites(a,ini,mitad)\n        merge_sort_limites(a,mitad+1,fin)\n        a[ini:fin+1] = mezcla_limites(a,ini,mitad,mitad+1,fin)\n\n\ndef mezcla_limites(a,aI,aF,bI,bF):\n    if aI>aF:\n        return a[bI:bF+1]\n    elif bI>bF:\n        return a[aI:aF+1]\n    else:\n        if a[aI]<a[bI]:\n            return [a[aI]] + mezcla_limites(a,aI+1,aF,bI,bF)\n        else:\n            return [a[bI]] + mezcla_limites(a,aI,aF,bI+1,bF)\n```"
   },
   {
    "title": "Merge-sort - Coste computacional",
    "level": 3,
    "md": "- Coste en tiempo:\n$$T(n)=\\begin{cases}1 & n=1\\\\ n+2T(n/2) & n>1\\end{cases}=n\\log_2(n)+n\\in\\Theta(n\\log n)$$\n- $\\Theta(n\\log n)$ en todos los casos: mejor, peor, y medio.\n- ¿Cuál es el tiempo si no se divide el vector por la mitad, sino según un 10% y 90%? También $\\Theta(n\\log n)$.\n- Memoria auxiliar. \"In-place\": la ordenación se realiza en el propio vector. \"Out-of-place\": se requiere un vector auxiliar de tamaño n; es decir, la ordenación no se realiza en el propio vector."
   },
   {
    "title": "Merge-sort paso a paso",
    "level": 3,
    "md": "- [38,27,43,3,9,82,10] → se divide en [38,27,43,3] y [9,82,10] → [38,27],[43,3],[9],[82,10]... hasta listas de un elemento → se mezclan: [27,38],[3,43] → [3,27,38,43]; [9],[10,82] → [9,10,82] → resultado [3,9,10,27,38,43,82].\n- Para diseñar el código, es mejor pensar en el esquema: descomponer el problema; obtener soluciones de subproblemas (automáticamente) a través de llamadas recursivas; combinar soluciones."
   },
   {
    "title": "Quicksort",
    "level": 3,
    "md": "- Descomposición: se escoge un elemento \"pivote\". Se divide la lista en tres partes: parte izquierda (elementos menores o iguales que el pivote), el propio pivote, parte derecha (elementos mayores que el pivote). Ej.: [6,4,1,7,4,7,3,6,5] con pivote 4 → [4,1,3] 4 [6,7,7,6,5]. Posteriormente se ordenan las partes izquierda y derecha.\n- Combinación: trivial: la lista ya está ordenada, no hay que hacer nada más.\n- El pivote puede ser el primero, el central, uno al azar...\n- Ejemplo alternativo: [26,5,37,1,61,11,59,15,48,19] → descomponer → [11,5,19,1,15] 26 [59,61,48,37] → soluciones de subproblemas (recursivo) → [1,5,11,15,19,26,37,48,59,61] → combinación trivial.\n```python\ndef quick_sort_inplace(a, ini, fin):\n    if ini < fin:\n        indice_pivote = particion_Hoare(a, ini, fin)\n\n        quick_sort_inplace(a, ini, indice_pivote - 1)\n        quick_sort_inplace(a, indice_pivote + 1, fin)\n```\n- Partición de Hoare: algoritmo iterativo para realizar la descomposición. Se usa en otros algoritmos (quickselect). Después de las llamadas recursivas la lista ya queda ordenada."
   },
   {
    "title": "Partición de Hoare",
    "level": 3,
    "md": "- Idea: se coloca el pivote (el elemento central) en la posición ini intercambiándolo; izqa avanza desde ini+1 mientras a[izqa] ≤ pivote; dcha retrocede desde fin mientras a[dcha] > pivote; si izqa < dcha se intercambian; se repite hasta que izqa > dcha; finalmente se intercambia el pivote con a[dcha].\n```python\ndef particion_Hoare(a,ini,fin):\n    if fin >=0:\n        mitad = (ini+fin)//2\n        pivote = a[mitad]\n        a[mitad] = a[ini]\n        a[ini] = pivote\n\n        izqa = ini+1\n        dcha = fin\n\n        ha_terminado = False\n        while not ha_terminado:\n\n            while izqa <=fin and a[izqa]<=pivote:\n                izqa = izqa+1\n\n            while a[dcha]>pivote:\n                dcha = dcha-1\n\n            if izqa<dcha:\n                aux = a[izqa];\n                a[izqa] = a[dcha];\n                a[dcha] = aux;\n\n            ha_terminado = izqa>dcha\n\n        a[ini] = a[dcha]\n        a[dcha] = pivote\n\n        return dcha\n```"
   },
   {
    "title": "Quicksort - Coste",
    "level": 3,
    "md": "- Caso mejor (el elemento pivote está en la mitad):\n$$T(n)=\\begin{cases}1 & n=1\\\\ 2T(n/2)+\\Theta(n) & n>1\\end{cases}\\Rightarrow\\Theta(n\\log n)$$\n- Caso peor (un subvector queda siempre vacío):\n$$T(n)=\\begin{cases}1 & n=1\\\\ T(1)+T(n-1)+\\Theta(n) & n>1\\end{cases}\\Rightarrow\\Theta(n^2)$$\n- Algoritmo de ordenación rápido en la práctica. Caso peor: $\\Theta(n^2)$. Caso mejor: $\\Theta(n\\log n)$. Caso medio: $\\Theta(n\\log n)$.\n- Suele superar a otros algoritmos $\\Theta(n\\log n)$ al utilizar mejor las jerarquías de memoria.\n- Memoria auxiliar: $O(n)$. Puede ser \"out-of-place\" o \"in-place\" (la ordenación no se realiza en el propio vector)."
   },
   {
    "title": "Búsqueda del k-ésimo elemento más pequeño",
    "level": 3,
    "md": "- Dada una lista a de n números, encontrar el k-ésimo elemento más pequeño. Ejemplo: para a=[4,3,7,7,2,5,1,8,9,2,1], y k=5, el algoritmo devuelve 3, ya que es el 5º elemento de la lista ordenada [1,1,2,2,3,4,5,7,7,8,9].\n- Caso general de la búsqueda de la mediana. Veremos el algoritmo Quickselect: basado en la partición de Hoare; solo realiza una llamada recursiva; estrictamente, no es un algoritmo de divide y vencerás.\n- Aplica la partición de Hoare, ubicando el pivote donde quedaría en caso de ordenar la lista (índice ip). Si el pivote está en el índice k-1 se ha encontrado el k-ésimo elemento más pequeño. De lo contrario se sigue buscando, pero solo en la mitad donde se puede encontrar el elemento buscado (si ip > k-1, en la parte izquierda; si ip < k-1, en la derecha).\n```python\ndef quickselect(a,ini,fin,k):\n    if ini==fin:\n        return a[ini]\n    else:\n        indice_pivote = particion_Hoare(a, ini, fin)\n\n        if indice_pivote==k-1:\n            return a[indice_pivote]\n        elif indice_pivote<k-1:\n            return quickselect(a,indice_pivote+1,fin,k)\n        else:\n            return quickselect(a,ini,indice_pivote-1,k)\n```\n- Coste medio: $O(n)$. Coste en el peor caso: $O(n^2)$."
   },
   {
    "title": "Multiplicación",
    "level": 3,
    "md": "- Multiplicación de números naturales en binario: algoritmo de Karatsuba.\n- Multiplicación de matrices: descomposiciones recursivas; algoritmo de Strassen."
   },
   {
    "title": "Multiplicación rápida de números en binario",
    "level": 3,
    "md": "- Dados dos números enteros no negativos x e y, expresados en binario mediante $b_x$ y $b_y$ bits, respectivamente, hallar el producto xy.\n- Tamaño del problema: mín(x,y). Casos base: si x=0 o y=0 (es decir, si mín(x,y)=0) el resultado es 0; si x=1 el resultado es y; si y=1 el resultado es x.\n- Descomposición: $x=a\\cdot2^m+b$, $y=c\\cdot2^m+d$, con $m=\\min\\left(\\lfloor b_x/2\\rfloor,\\lfloor b_y/2\\rfloor\\right)$.\n- Ejemplo. Para x=594 e y=69: $x=1001010010_2=\\underbrace{1001010}_{a=74}\\underbrace{010}_{b=2}=74\\cdot2^3+2$; $y=1000101_2=\\underbrace{1000}_{c=8}\\underbrace{101}_{d=5}=8\\cdot2^3+5$; $b_x=10$, $b_y=7$, m=3, a=74, b=2, c=8, d=5.\n- Regla recursiva básica (lenta): $xy=(a\\cdot2^m+b)(c\\cdot2^m+d)=ac\\,2^{2m}+(ad+bc)2^m+bd$. 4 llamadas recursivas (4 \"subproductos\"). Si x e y tienen n bits el coste en tiempo es:\n$$T(n)=\\begin{cases}1 & n\\le1\\\\ 4T(n/2)+en+f & n>1\\end{cases}\\qquad T(n)\\in\\Theta(n^2)$$\n- Regla recursiva rápida (algoritmo de Karatsuba): $xy=ac\\,2^{2m}+[(a+b)(c+d)-ac-bd]2^m+bd$. 3 llamadas recursivas (3 \"subproductos\"). Coste:\n$$T(n)=\\begin{cases}1 & n\\le1\\\\ 3T(n/2)+en+f & n>1\\end{cases}\\qquad T(n)\\in\\Theta(n^{\\log_2 3})=\\Theta(n^{1{,}585\\dots})$$\n```python\ndef numero_de_bits(n):\n    if n < 2:\n        return 1\n    else:\n        return 1 + numero_de_bits(n >> 1)\n\ndef multiplicacion_karatsuba(x, y):\n    if x == 0 or y == 0:\n        return 0\n    elif x == 1:\n        return y\n    elif y == 1:\n        return x\n    else:\n        n_bits_x = numero_de_bits(x)\n        n_bits_y = numero_de_bits(y)\n\n        m = min(n_bits_x // 2, n_bits_y // 2)\n\n        a = x >> m             # << y >> son operaciones de desplazamiento de bits\n        b = x - (a << m)       # (z << m) equivale a z*(2**m)\n        c = y >> m             # (z >> m) equivale a z//(2**m)\n        d = y - (c << m)\n\n        ac = multiplicacion_karatsuba(a, c)\n        bd = multiplicacion_karatsuba(b, d)\n        t = multiplicacion_karatsuba(a + b, c + d) - ac - bd\n\n        return (ac << (2 * m)) + (t << m) + bd\n```"
   },
   {
    "title": "Multiplicación de matrices",
    "level": 3,
    "md": "- La división de una matriz en bloques tiene varias ventajas: simplifica operaciones algebraicas; se puede aprovechar para construir algoritmos eficientes que hagan buen uso de la memoria caché.\n- Para realizar una multiplicación hay varias formas de dividir la matriz:\n$$A\\cdot B=\\begin{pmatrix}A_1\\\\A_2\\end{pmatrix}\\cdot\\begin{pmatrix}B_1&B_2\\end{pmatrix}=\\begin{pmatrix}A_1B_1&A_1B_2\\\\A_2B_1&A_2B_2\\end{pmatrix}$$\n$$A\\cdot B=\\begin{pmatrix}A_1&A_2\\end{pmatrix}\\cdot\\begin{pmatrix}B_1\\\\B_2\\end{pmatrix}=\\begin{pmatrix}A_1B_1+A_2B_2\\end{pmatrix}$$\n$$A\\cdot B=\\begin{pmatrix}A_{11}&A_{12}\\\\A_{21}&A_{22}\\end{pmatrix}\\begin{pmatrix}B_{11}&B_{12}\\\\B_{21}&B_{22}\\end{pmatrix}=\\begin{pmatrix}A_{11}B_{11}+A_{12}B_{21}&A_{11}B_{12}+A_{12}B_{22}\\\\A_{21}B_{11}+A_{22}B_{21}&A_{21}B_{12}+A_{22}B_{22}\\end{pmatrix}$$"
   },
   {
    "title": "Multiplicación de matrices - complejidad",
    "level": 3,
    "md": "- Sea A una matriz de $p\\times q$, y B una matriz de $q\\times r$. El producto C=AB requiere $O(pqr)$ operaciones.\n- Considérese que las matrices son cuadradas de dimensión $n\\times n$, y la descomposición en 4 bloques anterior:\n$$T(n)=\\begin{cases}1 & n=1\\\\ 8T(n/2)+4\\Theta(n^2) & n>1\\end{cases}$$\n- 8 multiplicaciones (de matrices de $n/2\\times n/2$), 4 sumas (de matrices de $n/2\\times n/2$). Por el teorema maestro: $T(n)=\\Theta(n^{\\log_2 8})=\\Theta(n^3)$.\n```python\nimport numpy as np\n\ndef mult_mat(A, B):\n    p = A.shape[0]; q = A.shape[1]; r = B.shape[1]\n\n    if p == 0 or q == 0 or r == 0:\n        return np.zeros((p, r))\n    elif p == 1 and q == 1 and r == 1:\n        return np.matrix([[A[0, 0] * B[0, 0]]])\n    else:\n        A11 = A[0:p // 2, 0:q // 2]; A21 = A[p // 2:p, 0:q // 2]\n        A12 = A[0:p // 2, q // 2:q]; A22 = A[p // 2:p, q // 2:q]\n\n        B11 = B[0:q // 2, 0:r // 2]; B21 = B[q // 2:q, 0:r // 2]\n        B12 = B[0:q // 2, r // 2:r]; B22 = B[q // 2:q, r // 2:r]\n\n        C11 = mult_mat(A11, B11) + mult_mat(A12, B21)\n        C12 = mult_mat(A11, B12) + mult_mat(A12, B22)\n        C21 = mult_mat(A21, B11) + mult_mat(A22, B21)\n        C22 = mult_mat(A21, B12) + mult_mat(A22, B22)\n\n        return np.vstack([np.hstack([C11, C12]),\n                          np.hstack([C21, C22])])\n\nA = np.matrix([[2, 3, 1, -3], [4, -2, 1, 2]])\nB = np.matrix([[2, 3, 1], [4, -1, -5], [0, -6, 3], [1, -1, 1]])\nprint(mult_mat(A, B))\n```"
   },
   {
    "title": "Multiplicación de matrices - algoritmo de Strassen",
    "level": 3,
    "md": "- La operación básica más costosa es la multiplicación. El algoritmo de Strassen consigue reducir el número de multiplicaciones. Con la descomposición en bloques $\\begin{pmatrix}A_{11}&A_{12}\\\\A_{21}&A_{22}\\end{pmatrix}\\begin{pmatrix}B_{11}&B_{12}\\\\B_{21}&B_{22}\\end{pmatrix}=\\begin{pmatrix}C_{11}&C_{12}\\\\C_{21}&C_{22}\\end{pmatrix}$:\n$$\\begin{aligned}M_1&=(A_{11}+A_{22})(B_{11}+B_{22})&C_{11}&=M_1+M_4-M_5+M_7\\\\M_2&=(A_{21}+A_{22})B_{11}&C_{12}&=M_3+M_5\\\\M_3&=A_{11}(B_{12}-B_{22})&C_{21}&=M_2+M_4\\\\M_4&=A_{22}(B_{21}-B_{11})&C_{22}&=M_1-M_2+M_3+M_6\\\\M_5&=(A_{11}+A_{12})B_{22}\\\\M_6&=(A_{21}-A_{11})(B_{11}+B_{12})\\\\M_7&=(A_{12}-A_{22})(B_{21}+B_{22})\\end{aligned}$$\n- Con esa factorización el algoritmo requiere 7 multiplicaciones y 18 sumas:\n$$T(n)=\\begin{cases}1 & n=1\\\\ 7T(n/2)+18\\Theta(n^2) & n>1\\end{cases}$$\n- Por el teorema maestro: $T(n)=\\Theta(n^{\\log_2 7})=\\Theta(n^{2{,}807})$.\n- Solo es más eficiente que una multiplicación ordinaria si el tamaño de las matrices es muy elevado. Actualmente hay un algoritmo en $O(n^{2{,}376})$ (Coppersmith-Winograd). En la práctica la mejor estrategia para acelerar el producto de dos matrices consiste en aprovechar la estructura jerárquica de la memoria."
   },
   {
    "title": "Embaldosado con L-triominós",
    "level": 3,
    "md": "- Se desea cubrir una cuadrícula de dimensiones $n\\times n$, donde $n=2^k$ con $k\\ge1$ es una potencia de dos, con L-triominós, donde solo un cuadrado no quede cubierto.\n- Casos base: (cuadrícula 2×2 con un cuadrado sin cubrir, cubierto el resto por un triominó).\n- Descomposición y casos recursivos: ubicar un triominó en el centro; realizar 4 llamadas recursivas con cuadrículas de lado n/2. Códigos 6.11, 6.12 y 6.13 en el libro."
   },
   {
    "title": "Permutación de inversión de bits",
    "level": 3,
    "md": "- Dada una lista a de $2^p$ números ($p\\in\\mathbb{N}^+$), devuelva otra lista a' que sea una permutación concreta de los elementos de a. En particular, $a'_j=a_i$ (y $a'_i=a_j$) donde j es el número que resulta de invertir los bits de i, asumiendo que i y j son números binarios de p bits.\n- Relación entre i y j, para p=3: i=0→j=0; 1(001)→4(100); 2(010)→2(010); 3(011)→6(110); 4(100)→1(001); 5(101)→5(101); 6(110)→3(011); 7(111)→7(111). Permutación: a[0]=a'[0], a[1]=a'[4], a[2]=a'[2], a[3]=a'[6], a[4]=a'[1], a[5]=a'[5], a[6]=a'[3], a[7]=a'[7].\n- Ejemplo 1: para p=5, $i=(b_4b_3b_2b_1b_0)_2\\Leftrightarrow j=(b_0b_1b_2b_3b_4)_2$; $a'_{26}=a_{11}$ y $a'_{11}=a_{26}$, ya que $26=11010_2$ y $11=01011_2$.\n- Ejemplo 2: para p=3, a=[3,5,7,2,4,8,1,6] ⇔ a'=[3,4,7,1,5,8,2,6], ya que para p=3 se intercambian los elementos de las posiciones 1 y 4, y los de las posiciones 3 y 6.\n- Notas: el problema de inversión de bits es parte de implementaciones de la FFT (transformada rápida de Fourier). Hay algoritmos más eficientes que los que se describen a continuación.\n- Tamaño: p. Caso base: si p=1 se devuelve la propia lista a (p=1 ⇔ n=2, n: longitud de a). Descomposiciones: veremos dos que conducen a diferentes algoritmos, y una tercera versión \"iterativa\". Para p=2 (n=4) se intercambian los dos elementos centrales (posiciones 1 y 2).\n\n#### Solución I\n- Descomposición: dividir la lista de entrada en dos mitades, resolver cada una e intercalar. [3,5,7,2,4,8,1,6] → mitades [3,5,7,2]→[3,7,5,2] y [4,8,1,6]→[4,1,8,6] → intercala → [3,4,7,1,5,8,2,6].\n```python\ndef intercala(a1,a2):\n    if len(a1)==1:\n        return [a1[0],a2[0]]\n    else:\n        return [a1[0]] + [a2[0]] + intercala(a1[1:],a2[1:])\n\n\ndef invbitperm1(a):\n    if len(a)<=2:\n        return a\n    else:\n        mitad = len(a)//2\n        a1 = invbitperm1(a[:mitad])\n        a2 = invbitperm1(a[mitad:])\n        return intercala(a1,a2)\n```\n\n#### Solución II\n- Descomposición: listas de índices pares e impares, resolver cada una y concatenar. [3,5,7,2,4,8,1,6] → pares [3,7,4,1]→[3,4,7,1] e impares [5,2,8,6]→[5,8,2,6] → concatena → [3,4,7,1,5,8,2,6].\n```python\ndef pares_impares(a):\n    if a==[]:\n        return ([],[])\n    else:\n        (a1,a2) = pares_impares(a[2:])\n        return ([a[0]] + a1, [a[1]] + a2)\n\n\ndef invbitperm2(a):\n    if len(a)<=2:\n        return a\n    else:\n        (a1,a2) = pares_impares(a)\n        return invbitperm2(a1) + invbitperm2(a2)\n```\n\n#### Solución III\n- Descomposición: dividir la lista en dos mitades. Caso base: si la lista tiene un elemento, se calcula el índice invertido, y se actualiza una segunda lista que almacene la solución (análogo a un algoritmo iterativo).\n```python\ndef indice_invertido(x,p):\n    if p==1:\n        return x\n    else:\n        return indice_invertido(x//2,p-1) + (x%2)*2**(p-1)\n\n\ndef invbitperm3(a,ini,fin,b,p):\n    if ini==fin:\n        i = indice_invertido(ini,p)\n        b[i] = a[ini]\n    else:\n        mitad = (ini+fin)//2\n        invbitperm3(a,ini,mitad,b,p)\n        invbitperm3(a,mitad+1,fin,b,p)\n```"
   }
  ]
 },
 {
  "id": "t6_vuelta_atras_backtracking",
  "title": "Tema 6 Vuelta atrás - Backtracking",
  "sections": [
   {
    "title": "Tema 6 Vuelta atrás - Backtracking",
    "level": 2,
    "md": "Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.\nContenido: 1 Introducción; 2 Subconjuntos y permutaciones; 3 N reinas; 4 Otros problemas (suma de subconjuntos, ruta del caballo de ajedrez, laberinto, sudoku, problema de la mochila 0-1); 5 Ramificación y poda."
   },
   {
    "title": "Introducción",
    "level": 2,
    "md": ""
   },
   {
    "title": "Backtracking - Vuelta atrás",
    "level": 3,
    "md": "- Estrategia para encontrar soluciones a problemas con restricciones definidos sobre espacios discretos (de elevado tamaño).\n- Construye soluciones parciales progresivamente, las cuales deben cumplir las restricciones del problema.\n- El recorrido (en profundidad) tiene éxito si, procediendo de esta forma, se puede definir por completo una solución (en una hoja de un árbol de recursión). Puede detenerse al encontrar una solución o seguir hasta encontrar todas.\n- Si en alguna etapa la solución parcial construida hasta el momento no se puede completar, se vuelve atrás deshaciendo la solución parcial, hasta un punto donde puede seguir explorando posibles soluciones.\n- Es un método de \"fuerza bruta\" pero \"inteligente\".\n- Ejemplos: N reinas, laberinto, sudoku, problema del viajante (TSP)."
   },
   {
    "title": "Subconjuntos y permutaciones",
    "level": 2,
    "md": ""
   },
   {
    "title": "Subconjuntos de {a,b,c}: solución con árbol binario",
    "level": 3,
    "md": "- Árbol recursivo del algoritmo (\"árbol de búsqueda\"). Nivel 1: se decide si se incluye a (0/1); nivel 2: b; nivel 3: c. Las hojas, de izquierda a derecha, son: {}, {c}, {b}, {b,c}, {a}, {a,c}, {a,b}, {a,b,c}.\n- Al descender hacia las hojas se decide si los elementos estarán presentes o no en el subconjunto creado.\n- Solución parcial: lista de valores binarios/booleanos. [1,0,1] = {a,c}.\n- Cada hoja representa un subconjunto de los $2^n$ posibles; n es la cardinalidad del conjunto inicial (en este caso n=3)."
   },
   {
    "title": "Implementación - I (árbol binario)",
    "level": 3,
    "md": "```python\ndef genera_subconjuntos_wrapper(elementos):\n    sol = [None] * (len(elementos))\n    genera_subconjuntos(0,sol,elementos)\n\n\ndef imprime_subconjunto(sol,elementos):\n    ha_imprimido_alguno = False\n    print('{',end='')\n    for i in range(0,len(sol)):\n        if sol[i]==1:\n            if ha_imprimido_alguno:\n                print(',',elementos[i],sep='',end='')\n            else:\n                print(elementos[i],sep='',end='')\n                ha_imprimido_alguno = True\n    print('}')\n```"
   },
   {
    "title": "Implementación - II (árbol binario)",
    "level": 3,
    "md": "```python\ndef genera_subconjuntos(i,sol,elementos):\n\n    if i==len(elementos):               # Caso base: solución parcial completa\n\n        imprime_subconjunto(sol,elementos)                          # Imprimir solución\n                                                                    # completa\n    else:\n        for k in range(0,2): # Genera candidatos a incluir en\n                             # solución parcial\n\n            sol[i] = k         # Incluye candidato k en solución parcial\n\n            # Expande solución parcial a partir del índice i+1\n            genera_subconjuntos(i+1,sol,elementos)\n```\n- i: índice del elemento a considerar (nivel del árbol). elementos: lista inicial de elementos. len(elementos): número de elementos (profundidad del árbol). sol: solución parcial (valores binarios que definen los elementos presentes en un subconjunto)."
   },
   {
    "title": "Consideraciones (árbol binario)",
    "level": 3,
    "md": "- Código \"sencillo\", claro. ¡Hay que aprenderse estos códigos/esquemas generales! Los algoritmos de backtracking que veremos tendrán una estructura similar, aunque también más elementos.\n- Buen esquema si los subconjuntos a generar tienen cardinalidades diferentes.\n- Se reserva memoria para toda la solución parcial en la función wrapper. Importante de cara a la eficiencia: es preferible a usar una estructura de datos que crezca y decrezca dinámicamente."
   },
   {
    "title": "Subconjuntos de {a,b,c}: solución con un subconjunto en cada nodo",
    "level": 3,
    "md": "- Árbol: raíz {}; ramas etiquetadas a, b, c (la etiqueta de la rama indica qué elemento insertar): {a}, {b}, {c}; de {a}: b → {a,b}, c → {a,c}; de {b}: c → {b,c}; de {a,b}: c → {a,b,c}. Nivel 0: 0 elementos; nivel 1: 1 elemento; nivel 2: 2 elementos; nivel 3: 3 elementos.\n- El árbol de recursión no es binario. En el nivel i las soluciones tienen i elementos.\n- La solución parcial es una lista con los índices de los elementos que se van incluyendo: [0,2] = {a,c}.\n- Se obtiene un subconjunto en cada nodo (no solo en las hojas). Más eficiente si se buscan subconjuntos de la misma cardinalidad.\n- Ahora es necesario llevar dos índices: i (índice de la solución parcial donde se incluirá un candidato) y j (índice del último candidato incluido). Los candidatos de un nodo son j+1, j+2, ..., n-1 (la raíz tiene j=-1)."
   },
   {
    "title": "Implementación - I (subconjunto en cada nodo)",
    "level": 3,
    "md": "```python\ndef genera_subconjuntos_alt_wrapper(elementos):\n\n    # reserva memoria para la solución parcial\n    sol = [None] * (len(elementos))\n\n    # Llamada a función recursiva. j inicializada a -1 indica\n    # que no se ha incluido ningún candidato en la solución\n    # parcial todavía. La siguiente llamada intentará incluir\n    # en los subconjuntos todos los elementos, empezando por\n    # el del índice 0 = j+1\n    genera_subconjuntos_alt(0,-1,sol,elementos)\n\n\ndef imprime_subconjunto_alt(sol,n_elementos,elementos):\n    print('{',end='')\n    for i in range(0,n_elementos-1):\n        print(elementos[sol[i]],',',sep='',end='')\n    if n_elementos>0:\n        print(elementos[sol[n_elementos-1]],sep='',end='')\n    print('}')\n```"
   },
   {
    "title": "Implementación - II (subconjunto en cada nodo)",
    "level": 3,
    "md": "```python\ndef genera_subconjuntos_alt(i,j,sol,elementos):\n\n    # Imprimir solución completa\n    imprime_subconjunto_alt(sol,i,elementos)\n\n    for k in range(j+1,len(elementos)):                          # genera candidatos\n\n        sol[i] = k         # Incluye candidato k en solución parcial\n\n        # Expande solución parcial a partir del índice i+1\n        # sabiendo que k es el último candidato incluido en sol\n        genera_subconjuntos_alt(i+1,k,sol,elementos)\n```\n- len(elementos): número de elementos (profundidad máxima del árbol). i: índice en la solución parcial (sol) del candidato a incluir. j: índice del último candidato incluido en sol. sol: solución parcial (índices de la lista elementos). elementos: conjunto (lista) original."
   },
   {
    "title": "Implementación - III (sin parámetro j)",
    "level": 3,
    "md": "```python\ndef genera_subconjuntos_alt2(i,sol,elementos):\n\n    imprime_subconjunto_alt(sol,i,elementos)\n\n    if i==0:\n        k_ini = 0\n    else:\n        k_ini = sol[i-1]+1\n\n    for k in range(k_ini,len(elementos)):\n        sol[i] = k\n        genera_subconjuntos_alt2(i+1,sol,elementos)\n```"
   },
   {
    "title": "Permutaciones de {a,b,c}",
    "level": 3,
    "md": "- Árbol: primer elemento (3 llamadas): a, b, c; segundo elemento (2 llamadas); tercer elemento (1 llamada). Hojas: (a,b,c), (a,c,b), (b,a,c), (b,c,a), (c,a,b), (c,b,a).\n- ¿Cuántas llamadas recursivas se hacen en cada nivel? 3, 2, 1 (se podrían controlar con bucles). Pero lo más fácil y eficiente es generar siempre 3 posibles llamadas, y usar una lista de valores binarios o booleanos para ver si realmente se debe realizar la llamada recursiva.\n- La lista de booleanos se puede pasar por valor o referencia. Referencia: habrá que deshacer los cambios al retroceder. Valor: no será necesario deshacer cambios.\n- El nivel de la llamada indica la posición del nuevo elemento a añadir. Al llegar al último nivel (a las hojas) tenemos completada la permutación."
   },
   {
    "title": "Permutaciones: implementación",
    "level": 3,
    "md": "```python\ndef genera_permutaciones_wrapper(elementos):\n\n    # Reserva memoria para la solución parcial y para lista\n    # que indica si un elemento ya se ha incluido en la\n    # solución parcial (si forma parte de la permutación)\n    sol = [None] * (len(elementos))\n    libres = [True] * (len(elementos))\n\n    # Llamada al método recursivo\n    genera_permutaciones(0,libres,sol,elementos)\n\n\ndef imprime_permutacion(sol):\n    for i in range(0,len(sol)):\n        print(sol[i],' ',end='')\n    print()\n```\n```python\ndef genera_permutaciones(i,libres,sol,elementos):\n    n = len(elementos)\n    if i==n: # Caso base\n        imprime_permutacion(sol) # Imprimir solución completa\n    else:\n        # Genera candidatos\n        for k in range(0,n):\n\n            # Comprueba validez del candidato\n            if libres[k]:\n\n                # Incluye candidato k en solución parcial\n                sol[i] = elementos[k]\n\n                # El candidato k deja de estar libre\n                libres[k] = False\n\n                # Expande solución parcial a partir del índice i+1\n                genera_permutaciones(i+1,libres,sol,elementos)\n\n                # El candidato k vuelve a estar libre\n                libres[k] = True\n```"
   },
   {
    "title": "Consideraciones (permutaciones)",
    "level": 3,
    "md": "- Parámetros: i (índice en la solución parcial donde incluir un nuevo elemento); libres (lista booleana que indica si un elemento ya se ha incluido en la solución parcial); sol (solución/permutación parcial construida); elementos (elementos a permutar).\n- ¡Hay que aprenderse estos códigos/esquemas generales! sol también podría contener índices a los elementos.\n- El uso de la lista libres es clave de cara a la eficiencia: se calcula si un elemento está libre en $O(1)$. Si no se usara se necesitaría un bucle para comprobarlo, cuyo coste sería $O(n)$, donde n es el número de elementos a permutar.\n- La reserva de memoria también influye en la eficiencia. Se debe evitar concatenar elementos a sol (o borrarlos)."
   },
   {
    "title": "Permutaciones ineficiente",
    "level": 3,
    "md": "```python\ndef es_factible(elemento,sol,i):\n    esta_elemento = False\n    j = 0\n    while (j<i) and not esta_elemento:\n        esta_elemento = (elemento==sol[j])\n        j = j + 1\n\n    return not esta_elemento\n\n\ndef genera_permutaciones(i,sol,elementos):\n    if i==len(elementos):\n        imprime_permutacion(sol)\n    else:\n        for k in range(0,len(elementos)):\n            if es_factible(elementos[k],sol,i):\n                sol[i] = elementos[k]\n                genera_permutaciones(i+1,sol,elementos)\n```"
   },
   {
    "title": "N reinas",
    "level": 2,
    "md": ""
   },
   {
    "title": "Problema de las N reinas",
    "level": 3,
    "md": "- Dado un \"tablero de ajedrez\" de n×n celdas, se pide ubicar n reinas de modo que no se amenacen: no pueden estar en la misma fila, ni en la misma columna, ni en la misma diagonal (principal o secundaria).\n- Ejemplo más famoso de problema que puede resolverse aplicando backtracking.\n- Para n=8 hay 92 soluciones posibles, aunque 12 únicas (las demás pueden obtenerse aplicando simetrías, rotaciones y traslaciones). El problema puede solicitar encontrar una solución o todas."
   },
   {
    "title": "N reinas: reducción del espacio de búsqueda",
    "level": 3,
    "md": "- Solución obvia pero absurda: probar las $2^{n^2}$ formas de colocar reinas en el tablero: $1{,}84\\cdot10^{19}$ para n=8; 65536 para n=4.\n- Pero los conjuntos solución solo deben contener n elementos: $\\binom{n^2}{n}$: $4{,}42\\cdot10^{10}$ para n=8; 1820 para n=4.\n- Además solo puede haber una reina por cada columna: $n^n$ posibilidades (n formas de colocar una reina en una columna, y n columnas): 16777216 para n=8; 256 para n=4.\n- Pero además, no puede haber dos reinas en la misma fila: esto convierte nuestro problema en la búsqueda de una permutación con n! posibilidades (lo cual sigue siendo elevado): 40320 para n=8; 24 para n=4.\n- Formato de la solución: (fila de la columna 0, fila de la columna 1, ..., fila de la columna n-1). (1,3,0,2) en la figura. Todas las filas son diferentes y tienen que estar representadas. Tendremos que buscar las permutaciones válidas."
   },
   {
    "title": "Árbol de búsqueda para N=4",
    "level": 3,
    "md": "- Árbol de permutaciones de {0,1,2,3} (24 hojas). Podemos emplear un algoritmo para buscar permutaciones. Al llegar a una hoja se \"han colocado\" las cuatro reinas y podemos probar si la solución es válida.\n- Pero podemos comprobar si la solución parcial puede llegar a ser solución final antes de llegar a una hoja. Podaríamos el árbol ahorrando cálculos.\n- Árbol podado: se distinguen solución parcial válida, solución completa válida, solución no válida y nodo no explorado. Hasta encontrar la primera solución válida solo se explora una pequeña parte del árbol."
   },
   {
    "title": "Implementación (N reinas)",
    "level": 3,
    "md": "- Para verificar que una solución parcial es válida usamos: filas_libres (filas libres); pdiags_libres (diagonales principales libres, índice columna-fila+n-1, de 0 a 2n-2); sdiags_libres (diagonales secundarias libres, índice columna+fila).\n```python\ndef nreinas_todas_wrapper(n):\n\n    # reserva de memoria para estructuras de datos booleanas\n    filas_libres = [True] * n\n    pdiags_libres = [True] * (2*n-1)\n    sdiags_libres = [True] * (2*n-1)\n\n    # reserva de memoria para la solución parcial\n    sol = [None] * n\n\n    # llamada a función recursiva\n    nreinas_todas(0,filas_libres,pdiags_libres,sdiags_libres,sol)\n```\n```python\ndef nreinas_todas(i,filas_libres,pdiags_libres,sdiags_libres,sol):\n    n = len(sol)\n    if i==n: # Comprueba si la solución parcial es completa\n        print(sol)\n    else:\n        # Genera candidatos\n        for k in range(0,n):\n            # Comprueba restricciones\n            if filas_libres[k] and pdiags_libres[i-k+n-1] and sdiags_libres[i+k]:\n\n                # Introduce candidato k en la solución parcial\n                sol[i] = k\n\n                # Actualiza estructuras booleanas\n                filas_libres[k] = False\n                pdiags_libres[i-k+n-1] = False\n                sdiags_libres[i+k] = False\n\n                # Intenta expandir la solución parcial\n                nreinas_todas(i+1,filas_libres,pdiags_libres,sdiags_libres,sol)\n\n                # Vuelve a marcar la fila y las diagonales como libres\n                filas_libres[k] = True\n                pdiags_libres[i-k+n-1] = True\n                sdiags_libres[i+k] = True\n```\n- Líneas 3 y 4: si se ha llegado a una solución válida se imprime. Línea 7: se generan los candidatos. Línea 9: se comprueba la validez del candidato. Línea 12: se incluye el candidato en la solución parcial. Líneas 15-17: se marcan como ocupadas las correspondientes filas y diagonales. Línea 20: nueva llamada recursiva para extender la solución parcial. Líneas 23-25: se marcan como libres la fila y diagonales del candidato para que puedan usarse en futuros pasos."
   },
   {
    "title": "Otros problemas",
    "level": 2,
    "md": ""
   },
   {
    "title": "Suma de subconjuntos",
    "level": 3,
    "md": "- Dada una lista L de números no negativos (que pueden repetirse) y otro número s, determinar los subconjuntos de L cuyos elementos suman s. Ejemplo: L=[1,2,3,5,6,7,9], s=13: 13=6+7; 13=2+5+6; 13=1+5+7; 13=1+3+9; 13=1+2+3+7.\n- Las soluciones son subconjuntos de tamaño variable. Usaremos el esquema binario para generar subconjuntos.\n- Ejemplo: L=[2,7,3,5], s=8. Se usará un parámetro que almacene la suma parcial (suma de los elementos de la solución parcial). ¡Con este parámetro mejora la eficiencia! Se podrá obtener la suma parcial en $\\Theta(1)$, en lugar de $O(n)$ si no se usa.\n- Restricción adicional: podar el árbol si la suma parcial es mayor que s. (Árbol: en el nivel i se pregunta \"+L[i]?\"; la rama 0 mantiene la suma, la rama 1 la aumenta; se poda cuando la suma pasa de 8; solución 3+5.)"
   },
   {
    "title": "Suma de subconjuntos: implementación",
    "level": 3,
    "md": "```python\ndef suma_subconjuntos_wrapper(L,s):\n\n    # Reserva memoria para solución parcial\n    sol = [0] * (len(L))\n\n    suma_subconjuntos(0,sol,0,L,s)\n\n\ndef imprime_subconjunto(sol,elementos,j):\n    ha_imprimido_alguno = False\n    print('{',end='')\n    for i in range(0,j):\n        if sol[i]==1:\n            if ha_imprimido_alguno:\n                print(',',elementos[i],sep='',end='')\n            else:\n                print(elementos[i],sep='',end='')\n                ha_imprimido_alguno = True\n    print('}')\n```\n```python\ndef suma_subconjuntos(i,sol,suma_parcial,L,s):\n    # Caso base\n    if suma_parcial==s:\n        imprime_subconjunto(sol,L,i)\n    elif i<len(L):\n        # Genera candidatos\n        for k in range(0,2): # Esquema binario\n\n            # Comprueba si se puede podar el árbol recursivo\n            if suma_parcial + k*L[i]<=s:\n\n                # Expande la solución parcial\n                sol[i] = k\n\n                # Actualiza la solución parcial\n                suma_parcial = suma_parcial + k*L[i]\n\n                # Intenta expandir la solución parcial\n                suma_subconjuntos(i+1,sol,suma_parcial,L,s)\n```"
   },
   {
    "title": "Ruta del caballo de ajedrez",
    "level": 3,
    "md": "- Identificar una ruta de un caballo de ajedrez en un tablero de n×n de manera que salte a todas las casillas sin repetir ninguna. No es requisito que tenga que volver al punto de partida. Variante: ciclo Hamiltoniano (camino cerrado en un grafo). Ejemplo de ruta en 5×5: filas (1,14,9,20,23), (10,19,22,15,8), (5,2,13,24,21), (18,11,4,7,16), (3,6,17,12,25).\n- Árbol de búsqueda: se podría encontrar una permutación de $n^2$ elementos (tablero de n×n), pero las restricciones serían muy complejas. Para tamaños mayores que 6×6 tarda en hallar una solución.\n- Los 8 saltos posibles del caballo se codifican con una lista de incrementos.\n```python\ndef busca_ruta_caballo_ajedrez_wrapper(n,fila_inicial,col_inicial):\n    # lista de incrementos a las coordenadas de una casilla\n    # para especificar un salto de caballo\n    incr = [(1,-2),(2,-1),(2,1),(1,2), \\\n            (-1,2),(-2,1),(-2,-1),(-1,-2)]\n\n    # Inicializar una lista de listas a 0 (solución parcial)\n    B = [None]*n\n    for i in range(0,n):\n        B[i] = [0]*n\n\n    B[fila_inicial][col_inicial] = 1 # ubicamos un primer caballo\n\n    # Si encontramos una solución la imprimimos\n    if busca_ruta_caballo_ajedrez(2,fila_inicial,col_inicial,B,incr):\n        imprime_matriz(B)\n\ndef imprime_matriz(B):\n    n = len(B)\n    for i in range(0,n):\n        for j in range(0,n):\n            print(\" %5d\" % (B[i][j]),end='')\n        print()\n\nbusca_ruta_caballo_ajedrez_wrapper(5,0,0)\n```\n```python\ndef busca_ruta_caballo_ajedrez(i,fila,col,B,incr):\n    if i>len(B)**2: # Comprobar si se ha completado una ruta\n        return True     # Solución encontrada\n    else:\n        sol_encontrada = False\n        k=0\n        while not sol_encontrada and k<8: # Genera candidatos\n            # Nueva casilla candidata\n            nueva_col = col + incr[k][0]\n            nueva_fila = fila + incr[k][1]\n\n            # Comprueba validez de la candidata\n            if nueva_fila>=0 and nueva_fila<len(B) and \\\n               nueva_col>=0 and nueva_col<len(B[0]) and \\\n               B[nueva_fila][nueva_col]==0:\n\n                # Añade casilla a la ruta (a la solución parcial)\n                B[nueva_fila][nueva_col] = i\n\n                # Intenta expandir la ruta empezando desde la nueva casilla\n                sol_encontrada = busca_ruta_caballo_ajedrez(i+1,nueva_fila, \\\n                                                nueva_col,B,incr)\n\n                # Marca la nueva casilla como vacía si no se encuentra solución\n                if not sol_encontrada:\n                      B[nueva_fila][nueva_col] = 0\n\n            k=k+1\n        return sol_encontrada\n```"
   },
   {
    "title": "Laberinto",
    "level": 3,
    "md": "- Hay una entrada y una salida; las celdas pueden ser vacías, paredes, celdas exploradas, camino solución o camino explorado. Se exploran las 4 direcciones en un orden fijo.\n- Árbol de búsqueda: desde la celda (c,f) hay cuatro subproblemas: (c,f+1), (c+1,f), (c,f-1), (c-1,f). No se debe hallar una permutación (el camino puede tener duración variable) ni un subconjunto de celdas (el orden importa). Usaremos un esquema diferente.\n```python\ndef lee_laberinto_de_fichero(nombre_fichero):\n    fichero = open(nombre_fichero,'r')\n    M=[]\n    for line in fichero.readlines():\n         M.append( [ x[0] for x in line.split(' ') ] )\n    fichero.close()\n    return M\n\ndef encuentra_camino_wrapper(M,fila_entrada,col_entrada,\n      fila_salida,col_salida):\n    incr = [(0,1),(1,0),(0,-1),(-1,0)]\n\n    M[fila_entrada][col_entrada] = 'P' # Camino (path)\n    return encuentra_camino(fila_entrada,col_entrada,M, \\\n                          incr,fila_salida,col_salida)\n\nM = lee_laberinto_de_fichero('laberinto_01.txt')\n# Entrada esquina arriba-izquierda, salida abajo-derecha\nif encuentra_camino_wrapper(M,0,0,len(M)-1,len(M[0])-1):\n    dibuja_laberinto(M,0,0,len(M)-1,len(M[0])-1)\n```\n- Fichero de entrada (laberinto_01.txt), E=vacía, W=pared:\n```\nE W E E E E E E W E W W\nE E E W W W E W W E E E\nW W E E W E E E W W W E\nW E E W W E W E E E E E\nE E W W E E E E W E W W\nE W W E E W W W W E E E\nE E E E W W E E E E W E\nE W E W W W W W W W W E\nE W E E E E W E E E W W\nE W W E W E E E W E E E\nW W E E W W E W W E W E\nE E E W W E E E W E W E\n```\n```python\ndef encuentra_camino(fila,col,M,incr,fila_salida,col_salida):\n    if fila==fila_salida and col==col_salida:\n        return True # Caso base. Se encontró una solución\n    else:\n        sol_encontrada = False\n        # Genera candidatos\n        k=0\n        while not sol_encontrada and k<4:\n            # Nueva celda candidata\n            nueva_col = col + incr[k][0]\n            nueva_fila = fila + incr[k][1]\n\n            # Comprueba validez de la nueva celda candidata\n            if nueva_fila>=0 and nueva_fila<len(M) and \\\n                nueva_col>=0 and nueva_col<len(M[0]) and \\\n                M[nueva_fila][nueva_col]=='E':\n\n                # Añade al camino (usamos M como solución parcial)\n                M[nueva_fila][nueva_col] = 'P'\n\n                # Intenta expandir el camino empezando en la nueva celda\n                sol_encontrada = encuentra_camino(nueva_fila,nueva_col, \\\n                                                    M,incr,fila_salida,col_salida)\n\n                # Marca la nueva celda como vacía si no se ha encontrado solución\n                if not sol_encontrada:\n                     M[nueva_fila][nueva_col] = 'E'\n\n            k=k+1\n        return sol_encontrada\n```\n- Dibujo del laberinto con matplotlib: dibuja_laberinto(M, fila_entrada, col_entrada, fila_salida, col_salida) pinta paredes en gris, la entrada en turquesa, la salida en amarillo y el camino con círculos negros (código de visualización, no esencial)."
   },
   {
    "title": "Sudoku",
    "level": 3,
    "md": "- Rellenar el tablero con números: no puede haber dos mismos números en una fila, columna o caja de 3×3. Se muestra un sudoku inicial y su solución.\n- Solución parcial: el propio tablero. Expandimos la solución parcial (por ejemplo) por filas.\n```python\ndef lee_sudoku(nombre_fichero):\n    fichero = open(nombre_fichero,'r')\n    S=[[None]*9]*9\n    i=0\n    for line in fichero.readlines():\n        S[i] = [int(x) for x in line.split(' ')]\n        i=i+1\n\n    fichero.close()\n    return S\n\ndef imprime_sudoku(S):\n    for s in S:\n        print(*s)\n\n# Función auxiliar para expandir la solución parcial fila a fila\ndef avanza(fila,col):\n    if col==8:\n         return (fila+1,0)\n    else:\n         return (fila,col+1)\n\nS = lee_sudoku('sudoku01_input.txt')\nif(resuelve_sudoku(0,0,S)):\n    imprime_sudoku(S)\n```\n- Fichero de entrada (sudoku01_input.txt): 9 filas de 9 números separados por espacios, 0 = celda vacía:\n```\n0 6 0 1 0 4 0 5 0\n0 0 8 3 0 5 6 0 0\n2 0 0 0 0 0 0 0 1\n8 0 0 4 0 7 0 0 6\n0 0 6 0 0 0 3 0 0\n7 0 0 9 0 1 0 0 4\n5 0 0 0 0 0 0 0 2\n0 0 7 2 0 6 9 0 0\n0 4 0 5 0 8 0 7 0\n```\n```python\ndef resuelve_sudoku(i,j,S):\n    if i==9: # Comprueba si la solución parcial está completa\n        return True # Solución encontrada\n    else:\n        # Comprueba si S[i][j] contiene un número inicial fijo\n        if S[i][j]!=0:\n            (i_nueva,j_nueva) = avanza(i,j)\n            return resuelve_sudoku(i_nueva,j_nueva,S)\n        else:\n            sol_encontrada = False\n            k=1\n            # Genera candidatos\n            while k<10 and not sol_encontrada:\n                # Comprueba validez del candidato\n                if es_candidato_valido(i,j,k,S): # ¡¡INEFICIENTE!!\n                    # Incluye dígito en celda (i,j)\n                    S[i][j] = k\n\n                    (i_nueva,j_nueva) = avanza(i,j)\n                    sol_encontrada = resuelve_sudoku(i_nueva,j_nueva,S)\n\n                k=k+1\n\n            # Si no hay solución se marca la celda (i,j) como vacía\n            if not sol_encontrada:\n                S[i][j] = 0\n\n            # Devolver si se ha encontrado una solución\n            return sol_encontrada\n```\n```python\n# Comprueba si el dígito en la celda (fila,col) es válido\ndef es_candidato_valido(fila,col,digito,S):\n    # Comprueba conflicto en fila\n    for k in range(0,9):\n        if k!=col and digito==S[fila][k]:\n            return False\n\n    # Comprueba conflicto en columna\n    for k in range(0,9):\n        if k!=fila and digito==S[k][col]:\n            return False\n\n    # Comprueba conflicto en caja\n    caja_fila= math.floor(fila/3)\n    caja_col = math.floor(col/3)\n    for k in range(0,3):\n        for m in range(0,3):\n            if fila!=3*caja_fila+k and col!=3*caja_col+m:\n                if digito==S[3*caja_fila+k][3*caja_col+m]:\n                    return False\n\n    return True\n```\n- Sudoku - aceleración: matrices booleanas para detectar conflictos en $\\Theta(1)$: una por fila (índice de fila × dígito), una por columna (índice de columna × dígito) y una por caja (índice de caja 0..8 × dígito). Ejercicio para casa/práctica."
   },
   {
    "title": "Problema de la mochila 0-1",
    "level": 3,
    "md": "- Dado un conjunto de n objetos, cada uno con un peso $p_i$ y un valor $v_i$, i=1,...,n, y una mochila con capacidad C. Maximizar la suma de los valores asociados a los objetos que se introducen en la mochila, sin sobrepasar la capacidad C, sabiendo que los objetos NO pueden partirse en fracciones más pequeñas:\n$$\\max_{x}\\sum_{i=1}^{n}x_iv_i\\quad\\text{sujeto a}\\quad x_i\\in\\{0,1\\},\\ i=1,\\dots,n;\\qquad \\sum_{i=1}^{n}x_ip_i\\le C$$\n- Árbol de búsqueda: pesos=(3,6,9,5), beneficios=(7,2,10,4), capacidad=15. Cada nodo es (X,Y)=(capacidad restante, beneficio parcial). Rama 0: se mantiene (X,Y); rama 1: (X-p_i, Y+b_i). Se poda si la capacidad restante es negativa. Hojas (nivel 4), en orden: (15,0), (10,4), (6,10), (1,14), (9,2), (4,6), (0,12), (-5,16), (12,7), (7,11), (3,17), (-2,21), (6,9), (1,13), ... El beneficio óptimo es 17 (objetos 1 y 3: peso 12, capacidad restante 3).\n```python\ndef mochila_01_wrapper(p,v,C):\n    sol = [0] * (len(p))\n    sol_opt = [0] * (len(p))\n\n    v_total = mochila_01(0,C,0,sol,sol_opt,-1,p,v,C)\n\n    return v_total\n\n\np = [3,6,9,5] # pesos\nv = [7,2,10,4] # valores\nC = 15  # capacidad\nprint(mochila_01_wrapper(p,v,C))\n```\n```python\ndef mochila_01(i,C_restante,v_actual,sol,sol_opt,v_opt,p,v,C):\n    if i==len(sol): # Se han analizado todos los objetos\n        if v_actual>v_opt: # Comprueba si se ha encontrado una solución mejor\n            # Actualiza el mejor valor y solución\n            v_opt = v_actual\n            for k in range(0,len(sol)):\n                 sol_opt[k] = sol[k]\n    else:\n        for k in range(0,2): # Genera candidatos\n\n            # Comprueba si se puede podar el árbol de recursión\n            if k*p[i]<=C_restante:\n\n                # Expande la solución parcial\n                sol[i]=k\n\n                # Actualiza la capacidad restante y el valor parcial\n                nueva_C_restante = C_restante - k*p[i]\n                nuevo_v_actual = v_actual + k*v[i]\n\n                # Intenta expandir la solución parcial\n                v_opt = mochila_01(i+1,nueva_C_restante, \\\n                    nuevo_v_actual,sol,sol_opt,v_opt,p,v,C)\n\n    # devuelve el mejor valor encontrado hasta el momento\n    return v_opt\n```"
   },
   {
    "title": "Ramificación y poda",
    "level": 2,
    "md": ""
   },
   {
    "title": "Introducción a la ramificación y poda",
    "level": 3,
    "md": "- Hasta ahora podábamos el árbol de recursión si una solución parcial no cumplía los requisitos del problema para llegar a ser una solución completa.\n- En problemas de optimización se pueden realizar podas adicionales: habiendo conseguido hallar una solución válida con valor óptimo v, podemos descartar soluciones que nunca puedan alcanzar dicho valor óptimo.\n- Es un método exacto de resolución de problemas de optimización. Se aplica a problemas duros (desde un punto de vista computacional), para acelerar la búsqueda del óptimo global."
   },
   {
    "title": "Ramificación y poda: mochila 0-1",
    "level": 3,
    "md": "- pesos=(3,6,9,5), beneficios=(7,2,10,4), capacidad=15. Cada nodo se anota X(Y) = beneficio parcial (máximo beneficio posible). Raíz: 0(23) (23 = suma de todos los beneficios). Al no incluir el objeto i el máximo posible baja en $v_i$; al incluirlo se suma $v_i$ al beneficio parcial y el máximo posible no cambia. Se poda cuando el máximo beneficio posible no supera el mejor beneficio hallado (p. ej., 6<14, 11<14, 13<17, 12<14) o hay exceso de peso. Beneficio óptimo: 17.\n```python\ndef mochila_01_bnb_wrapper(p,v,C):\n    sol = [0] * (len(p))\n    sol_opt = [0] * (len(p))\n\n    v_total = mochila_01_bnb(0,C,0,sum(v),sol,sol_opt,-1,p,v,C)\n\n    return v_total\n\n\np = [3,6,9,5] # pesos\nv = [7,2,10,4] # valores\nC = 15  # capacidad\nprint(mochila_01_bnb_wrapper(p,v,C))\n```\n```python\ndef mochila_01_bnb(i,C_restante,v_actual,max_v,sol,sol_opt,v_opt,p,v,C):\n    if i==len(sol): # Se han analizado todos los objetos\n        if v_actual>v_opt: # Comprueba si se ha encontrado una solución mejor\n            # Actualiza el mejor valor y solución\n            v_opt = v_actual\n            for k in range(0,len(sol)):\n                sol_opt[k] = sol[k]\n    else:\n        for k in range(0,2): # Genera candidatos\n\n            # Comprueba si se puede podar el árbol de recursión por capacidad\n            if k*p[i]<=C_restante:\n\n               # Actualiza el máximo valor alcanzable\n                nuevo_max_v = max_v - (1-k)*v[i]\n\n                # Comprueba si se puede podar el árbol de recursión por valor\n                if nuevo_max_v>v_opt:\n\n                     sol[i]=k # Expande la solución parcial\n\n                     # Actualiza la capacidad restante y el valor parcial\n                     nueva_C_restante = C_restante - k*p[i]\n                     nuevo_v_actual = v_actual + k*v[i]\n\n                     # Intenta expandir la solución parcial\n                     v_opt = mochila_01_bnb(i+1,nueva_C_restante, \\\n                         nuevo_v_actual,nuevo_max_v,sol,sol_opt,v_opt,p,v,C)\n\n    return v_opt # devuelve el mejor valor encontrado hasta el momento\n```"
   },
   {
    "title": "Aspectos a considerar al usar backtracking",
    "level": 3,
    "md": "- ¿Las soluciones son permutaciones, subconjuntos u otra entidad? Si son permutaciones o subconjuntos: usad los esquemas vistos. Son claros y eficientes. Estructura de la solución parcial.\n- ¿Se pueden acelerar cálculos usando estructuras de datos?\n- ¿Se busca una solución o todas? Si solo se busca una, paramos en cuanto la encontremos (while + variable booleana (solución encontrada)). En problemas de optimización se busca solo una (la mejor), pero se analizan todas.\n- En problemas de optimización: añadimos dos parámetros: mejor solución y mejor valor. ¿Se puede podar el árbol de recursión por valor?"
   },
   {
    "title": "Secuencias de paréntesis válidas - I",
    "level": 3,
    "md": "```python\ndef parentesis(i,n_abiertos,sol,n):\n    if i==2*n:\n        return 1\n    else:\n        nsols = 0\n\n        for k in range(0,2):\n            n_abiertos = n_abiertos + (1-k)\n\n            if n_abiertos>=i-n_abiertos+1 and n_abiertos<=n:\n                 sol[i]=k\n                 nsols = nsols + parentesis(i+1,n_abiertos,sol,n)\n\n            n_abiertos = n_abiertos - (1-k)\n\n        return nsols\n\n\ndef parentesis_wrapper(n):\n    sol = [None] * (2*n)\n    return parentesis(0,0,sol,n)\n```"
   },
   {
    "title": "Secuencias de paréntesis válidas - II",
    "level": 3,
    "md": "```python\ndef parentesis_alt(i,sol,n):\n    if i==n:\n        # print(sol)\n\n        return 1\n    else:\n        nsols = 0\n\n        if i==0:\n             k_ini = 0\n        else:\n             k_ini = sol[i-1]+1\n\n        for k in range(k_ini,2*i+1):\n             sol[i]=k\n             nsols = nsols + parentesis_alt(i+1,sol,n)\n\n        return nsols\n\n\ndef parentesis_wrapper_alt(n):\n    sol = [None] * n\n    return parentesis_alt(0,sol,n)\n```"
   }
  ]
 },
 {
  "id": "t7_algoritmos_voraces",
  "title": "Tema 7 Algoritmos voraces",
  "sections": [
   {
    "title": "Tema 7 Algoritmos voraces",
    "level": 2,
    "md": "Diseño y Análisis de Algoritmos. Manuel Rubio Sánchez (URJC), 13 de mayo de 2024. Licencia CC BY-SA 4.0.\nContenido: 1 Introducción; 2 Ejemplos básicos; 3 Problemas clásicos; 4 Problema de la mochila; 5 Grafos; 6 K-medias."
   },
   {
    "title": "Introducción",
    "level": 2,
    "md": ""
   },
   {
    "title": "Algoritmos voraces",
    "level": 3,
    "md": "- Los algoritmos voraces se suelen aplicar a problemas de optimización (maximizar o minimizar una función objetivo).\n- Suelen ser rápidos y fáciles de implementar. Exploran soluciones \"locales\". No siempre garantizan la solución óptima.\n- Son algoritmos que siguen una heurística mediante la cual toman decisiones óptimas locales en cada paso, de manera muy eficiente, con la esperanza de poder encontrar un óptimo global tras una serie de pasos.\n- Se aplican, sobre todo, a problemas duros, desde un punto de vista computacional. Ejemplo: problema del viajante (NP-completo); heurística: \"escoge la ciudad más próxima no visitada aún\".\n- Para ciertos problemas se puede demostrar que algunas estrategias voraces sí que logran hallar un óptimo global de manera eficiente."
   },
   {
    "title": "Ventajas y desventajas",
    "level": 3,
    "md": "- Ventajas: son fáciles de implementar; producen soluciones eficientes; a veces encuentran la solución óptima.\n- Desventajas: no todos los problemas de optimización son resolubles con algoritmos voraces; la búsqueda de un óptimo local no implica encontrar un óptimo global; dificultad de encontrar la función de selección que garantice la elección óptima."
   },
   {
    "title": "Elementos",
    "level": 3,
    "md": "- Conjunto de candidatos C: la solución se construirá con un subconjunto de estos candidatos.\n- Función de selección: selecciona el candidato \"local\" más idóneo.\n- Función de factibilidad: comprueba si un candidato es factible.\n- Función objetivo: determina el valor de la solución (función a optimizar).\n- Función solución: determina si el subconjunto de candidatos ha alcanzado una solución."
   },
   {
    "title": "Esquema general",
    "level": 3,
    "md": "- La técnica voraz funciona por pasos: partimos de una solución vacía y de un conjunto de candidatos a formar parte de la solución. En cada paso se intenta añadir el mejor de los candidatos restantes a la solución parcial. Una vez tomada la decisión, no se puede deshacer. Si la solución ampliada es válida → candidato incorporado. Si no es válida → candidato desechado.\n- El algoritmo acabará cuando el conjunto de elementos seleccionados constituya una solución o cuando no queden elementos sin considerar."
   },
   {
    "title": "Esquema general en pseudocódigo",
    "level": 3,
    "md": "```\nfunción voraz(C)                  // C es el conjunto de candidatos\n    S ← ∅\n    mientras C ≠ ∅ y no solución(S) hacer\n        x ← seleccionar(C)\n        C ← C \\ {x}\n        si factible(S ∪ {x}) entonces\n            S ← S ∪ {x}\n\n    si solución(S) entonces\n        devolver S                // S es una solución\n    si no\n        devolver ∅                // No hay soluciones\n```"
   },
   {
    "title": "Ejemplos básicos",
    "level": 2,
    "md": ""
   },
   {
    "title": "Camino más corto - 1",
    "level": 3,
    "md": "- Encontrar el camino más corto de $v_0$ a $v_n$, donde solo hay caminos entre vértices adyacentes ($v_{i-1}$ y $v_i$, para i=1,...,n). Ejemplo con 4 vértices $v_0,v_1,v_2,v_3$: arcos entre $v_0$ y $v_1$ de longitudes 5, 1, 3; entre $v_1$ y $v_2$ de 10, 9, 2, 6; entre $v_2$ y $v_3$ de 7, 4.\n- ¿Función de selección? Método voraz: en cada paso se coge el arco de menor longitud. Solución óptima: 1+2+4=7.\n- Se demuestra que la estrategia es óptima (por contradicción)."
   },
   {
    "title": "Camino más corto - 2",
    "level": 3,
    "md": "- Encontrar el camino más corto de $v_{0,1}$ a $v_{n,1}$, donde solo hay caminos entre vértices de etapas adyacentes ($v_{i-1,j}$ y $v_{i,k}$, para i=1,...,n, y ∀j,k, donde puede haber cualquier número de vértices en las etapas 1,2,...,n-1).\n- Ejemplo (grafo por etapas; arcos con su longitud):\n  - Etapa 0 → 1: $v_{0,1}\\to v_{1,1}$: 3; $v_{0,1}\\to v_{1,2}$: 1; $v_{0,1}\\to v_{1,3}$: 5; $v_{0,1}\\to v_{1,4}$: 7.\n  - Etapa 1 → 2: $v_{1,1}\\to v_{2,1}$: 2; $v_{1,1}\\to v_{2,2}$: 3; $v_{1,2}\\to v_{2,1}$: 9; $v_{1,2}\\to v_{2,2}$: 10; $v_{1,3}\\to v_{2,1}$: 5; $v_{1,3}\\to v_{2,3}$: 7; $v_{1,4}\\to v_{2,1}$: 6; $v_{1,4}\\to v_{2,2}$: 2; $v_{1,4}\\to v_{2,3}$: 4.\n  - Etapa 2 → 3: $v_{2,1}\\to v_{3,1}$: 13; $v_{2,2}\\to v_{3,1}$: 1; $v_{2,3}\\to v_{3,1}$: 2.\n- Método voraz: en cada paso se coge el arco de menor longitud. Longitud de la solución voraz: 1+9+13=23 ($v_{0,1},v_{1,2},v_{2,1},v_{3,1}$).\n- Se demuestra que la estrategia no es óptima (contraejemplo). Longitud de la solución óptima: 3+3+1=7 ($v_{0,1},v_{1,1},v_{2,2},v_{3,1}$)."
   },
   {
    "title": "Problemas clásicos",
    "level": 2,
    "md": ""
   },
   {
    "title": "Cambio de monedas",
    "level": 3,
    "md": "- Se dispone de n monedas de euro con valores de 1, 2, 5, 10, 20 y 50 céntimos de euro, 1 y 2 euros. Dada una cantidad X de euros, devolver dicha cantidad con el menor número posible de monedas. Ejemplo: devolver 2,24€. Solución: 4 (2 + 0,20 + 0,02 + 0,02).\n- Conjunto de candidatos: todos los tipos de monedas.\n- Función solución: conjunto de monedas que suman X.\n- Función de factibilidad: si $\\sum_i v_in_i>X$, el conjunto obtenido no podrá ser solución ($n_i$ = número de monedas de tipo i, $v_i$ = valor de una moneda de tipo i).\n- Función objetivo: minimizar la cardinalidad de las soluciones posibles.\n- Función de selección: moneda de valor más alto posible, que no supere el valor que queda por devolver.\n- ¿Es óptima la función de selección propuesta? No siempre: con monedas de 1, 2, 5, 10, 12, 20 y 50 céntimos, 1 y 2 euros, y devolver 2,24€: solución voraz: 4 (2 + 0,20 + 0,02 + 0,02); solución óptima: 3 (2 + 0,12 + 0,12)."
   },
   {
    "title": "Minimización del tiempo en el sistema",
    "level": 3,
    "md": "- Considérese un servidor que tiene que dar servicio a n clientes, donde $t_i$, con i=1,...,n, es el tiempo requerido por el cliente i. Suponiendo que todos los clientes llegan al mismo tiempo al servidor pero solo uno puede usarlo, minimizar el tiempo T en el sistema para los n clientes: $T=\\sum_{i=1}^{n}(\\text{tiempo en el sistema para el cliente }i)$.\n- Ejemplo: 3 clientes con $t_1=5$, $t_2=10$, $t_3=3$. Según el orden:\n\n| Orden | T |\n|---|---|\n| 123 | 5+(5+10)+(5+10+3)=38 |\n| 132 | 5+(5+3)+(5+3+10)=31 |\n| 213 | 10+(10+5)+(10+5+3)=43 (peor planificación) |\n| 231 | 10+(10+3)+(10+3+5)=41 |\n| 312 | 3+(3+5)+(3+5+10)=29 (mejor planificación) |\n| 321 | 3+(3+10)+(3+10+5)=34 |\n\n- Estrategia voraz: dar servicio en orden creciente de tiempo $t_i$. Es una estrategia óptima: sea $P=\\langle p_1,p_2,\\dots,p_n\\rangle$ una permutación de los clientes (de enteros de 1 a n), sea $s_i=t_{p_i}$, entonces\n$$T(P)=s_1+(s_1+s_2)+(s_1+s_2+s_3)+\\dots=ns_1+(n-1)s_2+(n-2)s_3+\\dots=\\sum_{k=1}^{n}(n-k+1)s_k$$\nHaciendo $s_1$ lo menor posible, luego $s_2$, etc. conseguimos minimizar T."
   },
   {
    "title": "Mezcla de listas",
    "level": 3,
    "md": "- Sean m listas ordenadas, cada una con $n_i$ elementos (i=1,...,m). ¿Cuál es la sucesión óptima del proceso de mezcla, mezclando listas dos a dos, para mezclar todas las listas de manera ordenada con el menor número de comparaciones?\n- Ejemplo: tres listas $L_1$, $L_2$, $L_3$ con longitudes 10, 20 y 30. Opciones: $L_1+L_2=30$, luego $30+L_3=60$: total 90; $L_1+L_3=40$, luego $40+L_2=60$: total 100; $L_2+L_3=50$, luego $50+L_1=60$: total 110.\n- Solución voraz: escoger en cada momento los dos lotes de menor tamaño. Construye un árbol binario de abajo hacia arriba (árbol de mezclas): (10, $L_1$) y (20, $L_2$) → 30; 30 y ($L_3$=30) → 60."
   },
   {
    "title": "Códigos de Huffman",
    "level": 3,
    "md": "- Dado un conjunto de n objetos y sus respectivas frecuencias de aparición $f_i$, i=1,...,n, obtener una codificación binaria para los objetos que minimice el promedio de bits necesarios para representarlos. (Ejemplo con árbol sobre frecuencias 0,30 B; 0,15 A; 0,15 E; 0,20 C; 0,10 G; 0,05 D; 0,05 F.)\n- La codificación Huffman es un método usado para compresión de datos. Se codifica una serie de objetos mediante una secuencia de bits según su frecuencia de aparición. Los objetos con mayor frecuencia se codifican con menos bits. Minimiza el promedio de bits necesarios para representar los objetos.\n- Ejemplo: texto de 100000 caracteres con 6 caracteres: frecuencias absolutas a=45000, b=13000, c=12000, d=16000, e=9000, f=5000.\n  - Solución 1: usar 3 bits por cada carácter → 300000 bits.\n  - Solución 2: usar códigos de longitud variable en el que los más frecuentes tienen el código más corto → 224000 bits.\n  - Objetivo: crear una codificación de longitud variable para minimizar el número de bits, en promedio, necesarios para representar un texto.\n- Estrategia voraz: asignar códigos más largos a los caracteres con menor frecuencia de aparición. Utiliza la tabla de frecuencias de aparición de cada carácter. Construye un árbol binario de longitud variable de abajo hacia arriba. Utiliza una cola Q de árboles con prioridades. Inicialmente Q contiene un árbol por cada carácter. En cada paso, se \"mezclan\" los dos árboles de Q que tienen menos frecuencia dando lugar a un nuevo árbol.\n- Fase 1: orden creciente de frecuencias (en miles): f:5, e:9, c:12, b:13, d:16, a:45.\n- Fase 2 y posteriores: fusionar árboles hasta obtener un solo árbol manteniendo la ordenación creciente:\n  1. f:5 + e:9 → 14 (rama 0: f, rama 1: e). Cola: c:12, b:13, 14, d:16, a:45.\n  2. c:12 + b:13 → 25 (0: c, 1: b). Cola: 14, d:16, 25, a:45.\n  3. 14 + d:16 → 30 (0: 14, 1: d). Cola: 25, 30, a:45.\n  4. 25 + 30 → 55 (0: 25, 1: 30). Cola: a:45, 55.\n  5. 55 + a:45 → 100 (rama 0: 55, rama 1: a).\n- Codificación final: para hallar la codificación de un carácter se usa el camino desde la raíz del árbol hasta la hoja que representa el carácter. La secuencia de bits la determina la rama (izquierda: 0, derecha: 1) por la que se avanza hasta la hoja.\n\n| carácter | código |\n|---|---|\n| a | 1 |\n| d | 011 |\n| e | 0101 |\n| f | 0100 |\n| b | 001 |\n| c | 000 |"
   },
   {
    "title": "Problema de la mochila",
    "level": 2,
    "md": ""
   },
   {
    "title": "Problema de la mochila - Versión 1",
    "level": 3,
    "md": "- Se tiene un conjunto de n objetos, cada uno con un peso $p_i$, y una mochila con capacidad C. Maximizar el número de objetos que se pueden introducir en la mochila sin sobrepasar la capacidad C.\n$$\\max_x\\sum_{i=1}^{n}x_i\\quad\\text{sujeto a}\\quad x_i\\in\\{0,1\\},\\ i=1,\\dots,n;\\quad\\sum_{i=1}^{n}x_ip_i\\le C$$\n- Las variables $x_i$ determinan si se introduce el objeto i en la mochila. Es un problema de programación lineal entera.\n- Ejemplo: C=15, p=(9,6,5): ¿función de selección? Peso decreciente: solución 2 (9+6). Peso creciente: solución 2 (5+6).\n- Ejemplo: C=15, p=(9,5,6,4): peso decreciente: solución 2 (9+6). Peso creciente: solución 3 (4+5+6).\n- La estrategia voraz escogiendo candidatos en orden creciente de peso es mejor (para este problema es óptima)."
   },
   {
    "title": "Problema de la mochila - Versión 2",
    "level": 3,
    "md": "- Se tiene un conjunto de n objetos, cada uno con un peso $p_i$, y una mochila con capacidad C. Maximizar el peso de los objetos que se introducen en la mochila sin sobrepasar la capacidad C.\n$$\\max_x\\sum_{i=1}^{n}x_ip_i\\quad\\text{sujeto a}\\quad x_i\\in\\{0,1\\},\\ i=1,\\dots,n;\\quad\\sum_{i=1}^{n}x_ip_i\\le C$$\n- Las variables $x_i$ determinan si se introduce el objeto i en la mochila. Es un problema de programación lineal entera.\n- Ejemplo: C=15, p=(9,6,5): peso decreciente: solución 15 (9+6); peso creciente: solución 11 (5+6).\n- Ejemplo: C=15, p=(10,7,6): peso decreciente: solución 10 (10); peso creciente: solución 13 (6+7).\n- Ninguna de las estrategias de selección es óptima, ni mejor que la otra."
   },
   {
    "title": "Problema de la mochila - Versión 3",
    "level": 3,
    "md": "- Se tiene un conjunto de n objetos, cada uno con un peso $p_i$ y un valor $v_i$, y una mochila con capacidad C. Los objetos pueden partirse en fracciones más pequeñas. Maximizar la suma de los valores asociados a los objetos que se introducen en la mochila, sin sobrepasar la capacidad C.\n$$\\max_x\\sum_{i=1}^{n}x_iv_i\\quad\\text{sujeto a}\\quad 0\\le x_i\\le1,\\ i=1,\\dots,n;\\quad\\sum_{i=1}^{n}x_ip_i\\le C$$\n- Las variables $x_i$ determinan la fracción del objeto i que se introduce en la mochila. Es un problema de programación lineal.\n- Conjunto de candidatos: todos los objetos. Función de factibilidad: $\\sum_i x_ip_i\\le C$. Función objetivo: maximizar $\\sum_i x_iv_i$. Función solución: cualquier conjunto de elementos es válido si no se ha sobrepasado C.\n- Funciones de selección posibles: seleccionar el objeto con mayor valor; seleccionar el objeto con menor peso restante; seleccionar el objeto cuyo valor por unidad de peso sea el mayor posible.\n- Ejemplo: C=100, n=5, con:\n\n| i | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| $p_i$ | 10 | 20 | 30 | 40 | 50 |\n| $v_i$ | 20 | 30 | 66 | 40 | 60 |\n| $v_i/p_i$ | 2,0 | 1,5 | 2,2 | 1,0 | 1,2 |\n\n| seleccionar | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | valor total |\n|---|---|---|---|---|---|---|\n| maximizar $v_i$ | 0 | 0 | 1 | 0,5 | 1 | 146 |\n| minimizar $p_i$ | 1 | 1 | 1 | 1 | 0 | 156 |\n| maximizar $v_i/p_i$ | 1 | 1 | 1 | 0 | 0,8 | 164 |\n\n- Función de selección óptima es: maximizar $v_i/p_i$."
   },
   {
    "title": "Problema de la mochila - Versión 4 (mochila 0-1)",
    "level": 3,
    "md": "- Dado un conjunto de n objetos, cada uno con un peso $p_i$ y un valor $v_i$, y una mochila con capacidad C. Maximizar la suma de los valores asociados a los objetos que se introducen en la mochila, sin sobrepasar la capacidad C, sabiendo que los objetos NO pueden partirse en fracciones más pequeñas:\n$$\\max_x\\sum_{i=1}^{n}x_iv_i\\quad\\text{sujeto a}\\quad x_i\\in\\{0,1\\},\\ i=1,\\dots,n;\\quad\\sum_{i=1}^{n}x_ip_i\\le C$$\n- Las variables $x_i$ determinan si se introduce el objeto i en la mochila. Es un problema NP-completo (problema de la mochila 0-1)."
   },
   {
    "title": "Grafos",
    "level": 2,
    "md": ""
   },
   {
    "title": "Árbol de recubrimiento de coste mínimo",
    "level": 3,
    "md": "- Árbol libre: es un grafo no dirigido conexo acíclico. Todo árbol libre con n vértices tiene n-1 aristas. Si se añade una arista se introduce un ciclo. Si se borra una arista quedan vértices no conectados. Cualquier par de vértices está unido por un único camino simple.\n- Árbol de recubrimiento de un grafo no dirigido y ponderado no negativamente: es cualquier subgrafo que contenga todos los vértices y que sea un árbol libre.\n- Árbol de recubrimiento de coste mínimo: es un árbol de recubrimiento y no hay ningún otro árbol de recubrimiento cuya suma de los pesos de las aristas sea menor. Lo denotamos arm(G), donde G es un grafo no dirigido, conexo, y ponderado no negativamente.\n- Problema: dado un grafo $G=\\langle V,E\\rangle$ no dirigido, conexo, y ponderado no negativamente, hallar arm(G). {{fig img/t7-p48.png | grafo ponderado de 10 vértices cuyo árbol de recubrimiento de coste mínimo tiene valor 38. No tiene por qué ser único.}}"
   },
   {
    "title": "Propiedad fundamental",
    "level": 3,
    "md": "- Sea $G=\\langle V,E\\rangle$ un grafo no dirigido, conexo, y ponderado no negativamente, $G\\in\\{f:V\\times V\\to E\\}$. Sea U un conjunto de vértices $U\\subset V$, $U\\ne\\emptyset$.\n- Si $\\langle u,v\\rangle$ es la arista más pequeña de G tal que $u\\in U$, y $v\\in V\\setminus U$, entonces existe algún árbol de recubrimiento de coste mínimo de G que la contiene. Demostración por reducción al absurdo (contradicción)."
   },
   {
    "title": "Algoritmo de Kruskal",
    "level": 3,
    "md": "- Seleccionar la arista más corta en cada etapa y construir el árbol.\n- Se basa en la propiedad de los árboles de recubrimiento de coste mínimo: partiendo del árbol vacío, se selecciona en cada paso la arista de menor peso que no provoque ciclo sin requerir ninguna otra condición sobre sus extremos. Es una estrategia óptima.\n- Ejemplo paso a paso en el grafo con vértices a,b,c,d,e,f y aristas: a-b:3, b-c:1, b-f:4, a-f:5, c-f:4, c-d:6, f-d:5, f-e:2, a-e:6, e-d:8. Orden de selección: b-c (1), f-e (2), a-b (3), b-f (4), f-d (5); con 5 aristas (|V|-1) el árbol queda completo. Coste total del árbol: 15.\n```\nKruskal(G)\n    // Entrada: G = <V,E>, es un grafo no dirigido, conexo,\n    // y ponderado no negativamente\n    // Salida: ET = conjunto de aristas que forman un arm(G)\n\n    ordenar E en orden no decreciente según los pesos asociados a las aristas:\n        w(e_i1) <= ... <= w(e_i|E|)\n    ET <- ∅\n    cont <- 0          // nº de aristas de arm(G)\n    k <- 0             // nº de aristas procesadas\n\n    while cont < |V| - 1\n        k <- k + 1\n        si ET ∪ {e_ik} no contiene ciclos\n            ET <- ET ∪ {e_ik}\n            cont <- cont + 1\n\n    devolver ET\n```"
   },
   {
    "title": "Algoritmo de Prim",
    "level": 3,
    "md": "- Seleccionar un nodo y construir el árbol a partir de él.\n- Aplica reiteradamente la propiedad de los árboles de recubrimiento de coste mínimo incorporando a cada paso una arista. Se usa un conjunto U de vértices tratados y se selecciona en cada paso la arista mínima que une un vértice de U con otro de su complementario. Es una estrategia óptima.\n- Ejemplo paso a paso en el mismo grafo que Kruskal {{fig img/t7-p54.png | aristas añadidas en cada paso a partir de un vértice inicial}}.\n```\nPrim(G)\n    // Entrada: G = <V,E>, es un grafo no dirigido, conexo\n    // (puede usar pesos negativos)\n    // Salida: ET = conjunto de aristas que forman un arm(G)\n\n    VT <- {v0}            // v0 puede ser cualquier vértice\n    ET <- ∅\n\n    desde i <- 1 hasta |V| - 1 hacer\n        encontrar una arista e* = (v*, u*) de peso mínimo entre todas\n            las aristas (v, u) tales que v ∈ VT y u ∈ V \\ VT\n        VT <- VT ∪ {u*}\n        ET <- ET ∪ {e*}\n\n    devolver ET\n```"
   },
   {
    "title": "Caminos mínimos desde un nodo",
    "level": 3,
    "md": "- Dado un grafo $G=\\langle V,E\\rangle$ conexo y ponderado no negativamente, y un vértice $s\\in V$, hallar la longitud de los caminos mínimos desde s al resto de vértices. (Ejemplo: vértices s,a,b,c,d,e.)\n- Sirve para grafos dirigidos y no dirigidos (si es no dirigido se puede sustituir cada arista por dos con el mismo peso, y en \"direcciones\" contrarias). Veremos el algoritmo de Dijkstra."
   },
   {
    "title": "Algoritmo de Dijkstra",
    "level": 3,
    "md": "- Inserta vértices en un árbol T progresivamente, según calcula nuevas longitudes mínimas. El árbol T es conceptual (es una lista de nodos).\n- Para un nuevo vértice tiene en cuenta no sólo la longitud de la nueva arista, sino también todo el camino hasta dicho vértice. Es la diferencia con respecto al algoritmo de Prim.\n- En cada paso inserta en T el vértice con menor longitud desde el origen (estrategia voraz óptima).\n- Tras insertar un nuevo vértice $v_{sig}$, debe recalcular distancias de nodos conectados a $v_{sig}$ y T.\n\n#### Dijkstra en detalle (ejemplo con 5 vértices 0..4, origen 0; \"∞\" = distancia aún desconocida; \"∈ T\" = vértice ya en T)\n- Aristas del grafo (no dirigido): 0-1: 20, 0-2: 10, 1-2: 5, 1-3: 8, 1-4: 15, 2-3: 10, 2-4: 30, 3-4: 20.\n- Paso 1: 0:(camino 0, d=0, ✓); 1:(0,1; 20; ✗); 2:(0,2; 10; ✗); 3:(∞; ✗); 4:(∞; ✗).\n- Paso 2 (se añade 2): 1:(0,2,1; 15; ✗); 2:(0,2; 10; ✓); 3:(0,2,3; 20; ✗); 4:(0,2,4; 40; ✗).\n- Paso 3 (se añade 1): 1:(0,2,1; 15; ✓); 3:(0,2,3; 20; ✗); 4:(0,2,1,4; 30; ✗).\n- Paso 4 (se añade 3): 3:(0,2,3; 20; ✓); 4:(0,2,1,4; 30; ✗).\n- Paso 5 (se añade 4): 4:(0,2,1,4; 30; ✓).\n- Nota: el ejemplo usa un grafo no dirigido.\n\n```\nDijkstra(G, s, t)\n    // Entrada: G = <V,E>, es un grafo no dirigido, conexo,\n    // y ponderado no negativamente con pesos w entre aristas\n    // Salida: Distancias mínima d desde el vértice s hasta el t,\n    // y todas las distancias mínimas a vértices que son menores que d\n\n    T <- {s}\n    desde i <- 1 hasta |V| hacer d_i <- ∞\n    para cada arista (s, v) hacer d_v = w(s, v)\n    ultimo <- s\n    mientras (ultimo ≠ t) hacer\n        seleccionar v_sig ∉ T       // el vértice desconocido que minimiza d\n        para cada arista (v_sig, x) hacer\n            d_x <- mín[d_x, d_vsig + w(v_sig, x)]\n        ultimo <- v_sig\n        T <- T ∪ {v_sig}\n\n    devolver d\n```"
   },
   {
    "title": "K-medias",
    "level": 2,
    "md": ""
   },
   {
    "title": "K-medias",
    "level": 3,
    "md": "- Clustering: identificar grupos de puntos (datos) y asignar a cada punto uno de esos grupos.\n- El algoritmo K-medias procura encontrar los K mejores representantes (\"centroides\", que también son puntos) de los datos, donde cada centroide representa un grupo. El representante de un dato es el más cercano a éste.\n- K-medias intenta resolver el problema cuyo objetivo es minimizar la suma de distancias euclídeas (al cuadrado) entre cada dato y su centroide.\n- (Se muestra una ejecución en 8 pasos sobre datos en el plano.)"
   },
   {
    "title": "K-medias - pseudocódigo",
    "level": 3,
    "md": "- El problema de optimización asociado no es convexo, ni existe una fórmula analítica para la solución. Recurrimos a un algoritmo iterativo.\n```\nK-medias(D, K)\n    Inicializar cada mu_k (valores aleatorios, datos concretos, etc.)\n    repetir:\n        (A) Escoge las mejores asignaciones a_ik para unos centroides mu_k fijos\n        (B) Escoge los mejores centroides mu_k para unas asignaciones a_ik fijas\n    hasta convergencia\n```"
   },
   {
    "title": "K-medias - Dos pasos",
    "level": 3,
    "md": "- (A): asignar $x_i$ a su centroide $\\mu_k$ más cercano (el grupo sería $C_k$):\n$$a_{ik}=\\begin{cases}1 & \\text{si }k=\\arg\\min_l\\lVert x_i-\\mu_l\\rVert^2\\\\ 0 & \\text{en caso contrario}\\end{cases}$$\n- (B): asignar a $\\mu_k$ la media de los puntos asignados a él (a $C_k$):\n$$\\mu_k=\\frac{1}{n_k}\\sum_{i:\\,x_i\\text{ se asigna a }C_k}x_i,\\qquad n_k=\\sum_{i=1}^{N}a_{ik}$$\n($n_k$ es el número de puntos $x_i$ asignados a $C_k$.)"
   },
   {
    "title": "K-medias - problema de clustering que resuelve",
    "level": 3,
    "md": "- Sea $D=\\{x_1,\\dots,x_N\\}$ un conjunto de \"datos\", donde $x_i\\in\\mathbb{R}^d$, que deseamos agrupar en K grupos $\\{C_1,\\dots,C_K\\}$. Cada grupo está representado por un \"centroide\". Denotamos estos centroides mediante $\\mu_1,\\dots,\\mu_K\\in\\mathbb{R}^d$.\n- El problema (no convexo) consiste en minimizar:\n$$L=\\sum_{k=1}^{K}\\sum_{i:\\,x_i\\text{ se asigna a }C_k}\\lVert x_i-\\mu_k\\rVert^2=\\sum_{k=1}^{K}\\sum_{i=1}^{N}a_{ik}\\lVert x_i-\\mu_k\\rVert^2,\\qquad a_{ik}=\\begin{cases}1&\\text{si }x_i\\text{ está asignado a }C_k\\\\0&\\text{en caso contrario}\\end{cases}$$\n- Se garantiza que converge a un óptimo local. Convergencia: los centroides no varían tras una iteración. También se puede parar tras T pasos.\n- No siempre encuentra el óptimo global: se suele ejecutar varias veces con diferentes inicializaciones.\n- Asume que los clusters son \"esféricos\" (poco realista). Hay alternativas mejores de clustering.\n- El problema es NP-duro. Se puede interpretar como un caso particular del algoritmo EM (expectation-maximization) de teoría de probabilidad."
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
  "theory": [
   {
    "lecture": "t4_intro_recursividad",
    "section": "Metodología para diseñar algoritmos recursivos"
   },
   {
    "lecture": "t4_intro_recursividad",
    "section": "Suma de los dígitos de un número"
   },
   {
    "lecture": "t4_intro_recursividad",
    "section": "Búsqueda en lista ordenada"
   }
  ],
  "patterns": []
 },
 {
  "id": "divide-y-venceras",
  "label": "Divide y vencerás",
  "tema": "diseno",
  "theory": [
   {
    "lecture": "t5_divide_y_venceras",
    "section": "Merge-sort"
   },
   {
    "lecture": "t5_divide_y_venceras",
    "section": "Quicksort"
   },
   {
    "lecture": "t5_divide_y_venceras",
    "section": "Multiplicación rápida de números en binario"
   }
  ],
  "patterns": []
 },
 {
  "id": "backtracking",
  "label": "Backtracking",
  "tema": "diseno",
  "theory": [
   {
    "lecture": "t6_vuelta_atras_backtracking",
    "section": "Permutaciones: implementación"
   },
   {
    "lecture": "t6_vuelta_atras_backtracking",
    "section": "Implementación (N reinas)"
   },
   {
    "lecture": "t6_vuelta_atras_backtracking",
    "section": "Aspectos a considerar al usar backtracking"
   }
  ],
  "patterns": []
 },
 {
  "id": "voraz",
  "label": "Algoritmos voraces",
  "tema": "diseno",
  "theory": [
   {
    "lecture": "t7_algoritmos_voraces",
    "section": "Esquema general"
   },
   {
    "lecture": "t7_algoritmos_voraces",
    "section": "Códigos de Huffman"
   },
   {
    "lecture": "t7_algoritmos_voraces",
    "section": "Algoritmo de Dijkstra"
   }
  ],
  "patterns": []
 }
];
window.WORLDS = {"analisis": "Análisis de algoritmos", "diseno": "Diseño de algoritmos"};
window.SCOPES = [
 {
  "id": "todo",
  "title": "Temario completo",
  "blurb": "Temas 1 a 7: análisis y diseño de algoritmos.",
  "worlds": [
   "analisis",
   "diseno"
  ]
 },
 {
  "id": "parcial1",
  "title": "Primer examen (temas 1 a 3)",
  "blurb": "Solo análisis: introducción, preliminares matemáticos, notación asintótica y coste de algoritmos iterativos y recursivos. Acaba con un simulacro de análisis.",
  "worlds": [
   "analisis"
  ]
 }
];
window.STAGES = [
 {
  "id": "intro",
  "world": "analisis",
  "title": "Introducción a la algoritmia",
  "blurb": "Problemas y algoritmos, clases de complejidad, optimización y una visión de la IA. Solo lectura: no hay ejercicios de este tema.",
  "skills": [],
  "theory": [
   {
    "id": "t1-problemas",
    "lecture": "t1_intro_algoritmia",
    "from": 0,
    "to": 6,
    "label": "Tema 1 · Problemas computacionales y algoritmos",
    "idx": 0,
    "upto": 6
   },
   {
    "id": "t1-euclides",
    "lecture": "t1_intro_algoritmia",
    "from": 7,
    "to": 9,
    "label": "Tema 1 · El algoritmo de Euclides",
    "idx": 7,
    "upto": 9
   },
   {
    "id": "t1-clases-1",
    "lecture": "t1_intro_algoritmia",
    "from": 10,
    "to": 14,
    "label": "Tema 1 · Eficiencia y clases P, EXP y NP",
    "idx": 10,
    "upto": 14
   },
   {
    "id": "t1-clases-2",
    "lecture": "t1_intro_algoritmia",
    "from": 15,
    "to": 21,
    "label": "Tema 1 · Verificar soluciones y problemas NP-completos",
    "idx": 15,
    "upto": 21
   },
   {
    "id": "t1-reducciones",
    "lecture": "t1_intro_algoritmia",
    "from": 22,
    "to": 26,
    "label": "Tema 1 · Reducciones, P = NP y el problema de la parada",
    "idx": 22,
    "upto": 26
   },
   {
    "id": "t1-optimizacion",
    "lecture": "t1_intro_algoritmia",
    "from": 27,
    "to": 33,
    "label": "Tema 1 · Problemas de optimización y programación lineal",
    "idx": 27,
    "upto": 33
   },
   {
    "id": "t1-convexos",
    "lecture": "t1_intro_algoritmia",
    "from": 34,
    "to": 39,
    "label": "Tema 1 · Convexidad y descenso de gradiente",
    "idx": 34,
    "upto": 39
   },
   {
    "id": "t1-ia",
    "lecture": "t1_intro_algoritmia",
    "from": 40,
    "to": 48,
    "label": "Tema 1 · Predicción, aprendizaje automático y clustering",
    "idx": 40,
    "upto": 48
   }
  ]
 },
 {
  "id": "sumatorios",
  "world": "analisis",
  "title": "Sumatorios y cotas por integrales",
  "blurb": "La caja de herramientas matemática: sumas cerradas, series geométricas y acotar sumas con integrales.",
  "skills": [
   "sumatorios",
   "cotas-integral"
  ],
  "theory": [
   {
    "id": "t21-potencias-logs",
    "lecture": "t2.1_prelim_matematicos",
    "from": 0,
    "to": 3,
    "label": "Potencias, logaritmos y coeficientes binomiales",
    "idx": 0,
    "upto": 3
   },
   {
    "id": "t21-calculo",
    "lecture": "t2.1_prelim_matematicos",
    "from": 7,
    "to": 11,
    "label": "Derivadas, límites y integrales",
    "idx": 7,
    "upto": 11
   },
   {
    "id": "t21-sumas-basicas",
    "lecture": "t2.1_prelim_matematicos",
    "from": 13,
    "to": 17,
    "label": "Sumatorios: notación, naturales, impares y series aritméticas",
    "idx": 13,
    "upto": 17
   },
   {
    "id": "t21-cuadrados-cubos",
    "lecture": "t2.1_prelim_matematicos",
    "from": 18,
    "to": 21,
    "label": "Suma de los primeros n cuadrados y cubos",
    "idx": 18,
    "upto": 21
   },
   {
    "id": "t21-telescopicas",
    "lecture": "t2.1_prelim_matematicos",
    "from": 22,
    "to": 25,
    "label": "Sumas telescópicas y de potencias; la pirámide",
    "idx": 22,
    "upto": 25
   },
   {
    "id": "t21-geometricas",
    "lecture": "t2.1_prelim_matematicos",
    "from": 26,
    "to": 30,
    "label": "Series geométricas y la suma de i·r^i",
    "idx": 26,
    "upto": 30
   },
   {
    "id": "t21-integrales",
    "lecture": "t2.1_prelim_matematicos",
    "from": 31,
    "to": 38,
    "label": "Acotar sumas con integrales",
    "idx": 31,
    "upto": 38
   }
  ]
 },
 {
  "id": "asintotica",
  "world": "analisis",
  "title": "Notación asintótica",
  "blurb": "O, Ω y Θ: definir, demostrar con la definición o con límites, simplificar y ordenar funciones.",
  "skills": [
   "asint-definiciones"
  ],
  "theory": [
   {
    "id": "t22-por-que",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 0,
    "to": 5,
    "label": "Por qué notación asintótica: los términos dominantes",
    "idx": 0,
    "upto": 5
   },
   {
    "id": "t22-ordenes",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 6,
    "to": 9,
    "label": "Órdenes de crecimiento que más aparecen",
    "idx": 6,
    "upto": 9
   },
   {
    "id": "t22-cota-sup",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 10,
    "to": 15,
    "label": "Cota superior O: definición",
    "idx": 10,
    "upto": 15
   },
   {
    "id": "t22-verificar-o",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 16,
    "to": 18,
    "label": "Demostrar que f está en O(g) con la definición",
    "idx": 16,
    "upto": 18
   },
   {
    "id": "t22-omega",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 19,
    "to": 23,
    "label": "Cuándo no se cumple y cota inferior Ω",
    "idx": 19,
    "upto": 23
   },
   {
    "id": "t22-theta",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 24,
    "to": 30,
    "label": "Cota ajustada Θ, o, ω, dos parámetros y simplificación",
    "idx": 24,
    "upto": 30
   },
   {
    "id": "t22-aspectos",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 31,
    "to": 35,
    "label": "Aspectos y errores frecuentes de la notación",
    "idx": 31,
    "upto": 35
   },
   {
    "id": "t22-lineal",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 36,
    "to": 39,
    "label": "Ordenación en tiempo lineal: counting-sort",
    "idx": 36,
    "upto": 39
   },
   {
    "id": "t22-comparacion",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 40,
    "to": 43,
    "label": "Ordenación por comparaciones y árboles de decisión",
    "idx": 40,
    "upto": 43
   },
   {
    "id": "t22-cota-orden",
    "lecture": "t2.2_notaciones_asintoticas",
    "from": 44,
    "to": 49,
    "label": "La cota inferior Ω(n log n) de la ordenación",
    "idx": 44,
    "upto": 49
   }
  ]
 },
 {
  "id": "bucles",
  "world": "analisis",
  "title": "Coste de algoritmos iterativos",
  "blurb": "Contar operaciones de bucles anidados con sumatorios y deducir su orden.",
  "skills": [
   "contar-bucles"
  ],
  "theory": [
   {
    "id": "t31-insert",
    "lecture": "t3.1_analisis_alg_iterativos",
    "from": 0,
    "to": 6,
    "label": "Eficiencia e insert-sort: mejor y peor caso",
    "idx": 0,
    "upto": 6
   },
   {
    "id": "t31-general",
    "lecture": "t3.1_analisis_alg_iterativos",
    "from": 7,
    "to": 11,
    "label": "Procedimiento general basado en sumatorios",
    "idx": 7,
    "upto": 11
   }
  ]
 },
 {
  "id": "expansion",
  "world": "analisis",
  "title": "Recurrencias: expansión",
  "blurb": "Plantear la recurrencia de un algoritmo recursivo y resolverla expandiéndola.",
  "skills": [
   "rec-expansion"
  ],
  "theory": [
   {
    "id": "t32-expansion",
    "lecture": "t3.2_analisis_alg_recursivos",
    "from": 0,
    "to": 8,
    "label": "Recurrencias y resolución por expansión",
    "idx": 0,
    "upto": 8
   }
  ]
 },
 {
  "id": "general",
  "world": "analisis",
  "title": "Recurrencias: método general y teorema maestro",
  "blurb": "Recurrencias lineales (homogéneas y no homogéneas), cambio de variable y teorema maestro.",
  "skills": [
   "rec-general",
   "complejidad-general"
  ],
  "theory": [
   {
    "id": "t32-maestro",
    "lecture": "t3.2_analisis_alg_recursivos",
    "from": 9,
    "to": 14,
    "label": "Teorema maestro y errores frecuentes de la expansión",
    "idx": 9,
    "upto": 14
   },
   {
    "id": "t32-homogeneas",
    "lecture": "t3.2_analisis_alg_recursivos",
    "from": 15,
    "to": 19,
    "label": "Método general: recurrencias homogéneas",
    "idx": 15,
    "upto": 19
   },
   {
    "id": "t32-no-homogeneas",
    "lecture": "t3.2_analisis_alg_recursivos",
    "from": 20,
    "to": 22,
    "label": "Método general: recurrencias no homogéneas",
    "idx": 20,
    "upto": 22
   },
   {
    "id": "t32-cambio",
    "lecture": "t3.2_analisis_alg_recursivos",
    "from": 23,
    "to": 25,
    "label": "Cambio de variable y errores del método general",
    "idx": 23,
    "upto": 25
   },
   {
    "id": "t32-espacio",
    "lecture": "t3.2_analisis_alg_recursivos",
    "from": 26,
    "to": 32,
    "label": "Eficiencia en espacio: la pila de llamadas",
    "idx": 26,
    "upto": 32
   }
  ]
 },
 {
  "id": "recursion",
  "world": "diseno",
  "title": "Diseño recursivo básico",
  "blurb": "Pensar en subproblemas: casos base, descomposición e inducción. Listas, dígitos, búsqueda y Hanoi.",
  "skills": [
   "recursion-basica"
  ],
  "theory": [
   {
    "id": "t4-intro",
    "lecture": "t4_intro_recursividad",
    "from": 0,
    "to": 6,
    "label": "¿Qué es la recursividad? El factorial",
    "idx": 0,
    "upto": 6
   },
   {
    "id": "t4-paradigma",
    "lecture": "t4_intro_recursividad",
    "from": 7,
    "to": 11,
    "label": "Pensar en subproblemas: paradigma y tipos de recursividad",
    "idx": 7,
    "upto": 11
   },
   {
    "id": "t4-metodologia",
    "lecture": "t4_intro_recursividad",
    "from": 12,
    "to": 17,
    "label": "Metodología de diseño y dividir el problema por dos",
    "idx": 12,
    "upto": 17
   },
   {
    "id": "t4-listas",
    "lecture": "t4_intro_recursividad",
    "from": 18,
    "to": 21,
    "label": "Arrays y listas",
    "idx": 18,
    "upto": 21
   },
   {
    "id": "t4-digitos",
    "lecture": "t4_intro_recursividad",
    "from": 22,
    "to": 24,
    "label": "Suma de los dígitos y suma lenta",
    "idx": 22,
    "upto": 24
   },
   {
    "id": "t4-maximo-potencia",
    "lecture": "t4_intro_recursividad",
    "from": 25,
    "to": 26,
    "label": "Máximo de una lista y potencia",
    "idx": 25,
    "upto": 26
   },
   {
    "id": "t4-secuencias",
    "lecture": "t4_intro_recursividad",
    "from": 27,
    "to": 31,
    "label": "Escribir secuencias, sumatorio general y contiene dígito",
    "idx": 27,
    "upto": 31
   },
   {
    "id": "t4-cambio-lineal",
    "lecture": "t4_intro_recursividad",
    "from": 32,
    "to": 35,
    "label": "Cambio de base, evaluar un polinomio y búsqueda lineal",
    "idx": 32,
    "upto": 35
   },
   {
    "id": "t4-binaria",
    "lecture": "t4_intro_recursividad",
    "from": 36,
    "to": 37,
    "label": "Búsqueda en lista ordenada y formas de subir escaleras",
    "idx": 36,
    "upto": 37
   },
   {
    "id": "t4-manhattan",
    "lecture": "t4_intro_recursividad",
    "from": 38,
    "to": 39,
    "label": "Caminos por Manhattan y bisección",
    "idx": 38,
    "upto": 39
   },
   {
    "id": "t4-hanoi",
    "lecture": "t4_intro_recursividad",
    "from": 40,
    "to": 40,
    "label": "Torres de Hanoi",
    "idx": 40,
    "upto": 40
   },
   {
    "id": "t4-hanoi-ciclico",
    "lecture": "t4_intro_recursividad",
    "from": 41,
    "to": 41,
    "label": "Torres de Hanoi cíclicas",
    "idx": 41,
    "upto": 41
   }
  ]
 },
 {
  "id": "dyv",
  "world": "diseno",
  "title": "Divide y vencerás",
  "blurb": "Dividir en varios subproblemas, resolverlos y combinar: mergesort, quicksort, Karatsuba y más.",
  "skills": [
   "divide-y-venceras"
  ],
  "theory": [
   {
    "id": "t5-intro",
    "lecture": "t5_divide_y_venceras",
    "from": 0,
    "to": 3,
    "label": "Divide, decrementa y transforma y vencerás",
    "idx": 0,
    "upto": 3
   },
   {
    "id": "t5-transforma",
    "lecture": "t5_divide_y_venceras",
    "from": 4,
    "to": 8,
    "label": "Transforma y vencerás: mediana, π y raíz cuadrada",
    "idx": 4,
    "upto": 8
   },
   {
    "id": "t5-newton",
    "lecture": "t5_divide_y_venceras",
    "from": 9,
    "to": 10,
    "label": "Newton-Raphson y factorización LU",
    "idx": 9,
    "upto": 10
   },
   {
    "id": "t5-dyv",
    "lecture": "t5_divide_y_venceras",
    "from": 11,
    "to": 14,
    "label": "Divide y vencerás: esquema y máximo de una lista",
    "idx": 11,
    "upto": 14
   },
   {
    "id": "t5-ordenacion",
    "lecture": "t5_divide_y_venceras",
    "from": 15,
    "to": 21,
    "label": "Ordenación: insert-sort, select-sort y merge-sort",
    "idx": 15,
    "upto": 21
   },
   {
    "id": "t5-quick",
    "lecture": "t5_divide_y_venceras",
    "from": 22,
    "to": 25,
    "label": "Quicksort, partición de Hoare y quickselect",
    "idx": 22,
    "upto": 25
   },
   {
    "id": "t5-multiplicacion",
    "lecture": "t5_divide_y_venceras",
    "from": 26,
    "to": 30,
    "label": "Multiplicación rápida: Karatsuba, matrices y Strassen",
    "idx": 26,
    "upto": 30
   },
   {
    "id": "t5-otros",
    "lecture": "t5_divide_y_venceras",
    "from": 31,
    "to": 32,
    "label": "Embaldosado con L-triominós e inversión de bits",
    "idx": 31,
    "upto": 32
   }
  ]
 },
 {
  "id": "backtracking",
  "world": "diseno",
  "title": "Vuelta atrás (backtracking)",
  "blurb": "Esquemas de subconjuntos y permutaciones, poda por restricciones, N reinas y ramificación y poda.",
  "skills": [
   "backtracking"
  ],
  "theory": [
   {
    "id": "t6-binario",
    "lecture": "t6_vuelta_atras_backtracking",
    "from": 0,
    "to": 7,
    "label": "Backtracking y subconjuntos con árbol binario",
    "idx": 0,
    "upto": 7
   },
   {
    "id": "t6-subconjuntos",
    "lecture": "t6_vuelta_atras_backtracking",
    "from": 8,
    "to": 11,
    "label": "Subconjuntos: un subconjunto en cada nodo",
    "idx": 8,
    "upto": 11
   },
   {
    "id": "t6-permutaciones",
    "lecture": "t6_vuelta_atras_backtracking",
    "from": 12,
    "to": 15,
    "label": "Permutaciones",
    "idx": 12,
    "upto": 15
   },
   {
    "id": "t6-reinas",
    "lecture": "t6_vuelta_atras_backtracking",
    "from": 16,
    "to": 20,
    "label": "El problema de las N reinas",
    "idx": 16,
    "upto": 20
   },
   {
    "id": "t6-suma-caballo",
    "lecture": "t6_vuelta_atras_backtracking",
    "from": 21,
    "to": 24,
    "label": "Suma de subconjuntos y ruta del caballo",
    "idx": 21,
    "upto": 24
   },
   {
    "id": "t6-otros",
    "lecture": "t6_vuelta_atras_backtracking",
    "from": 25,
    "to": 27,
    "label": "Laberinto, sudoku y mochila 0-1",
    "idx": 25,
    "upto": 27
   },
   {
    "id": "t6-poda",
    "lecture": "t6_vuelta_atras_backtracking",
    "from": 28,
    "to": 33,
    "label": "Ramificación y poda y aspectos a considerar",
    "idx": 28,
    "upto": 33
   }
  ]
 },
 {
  "id": "voraz",
  "world": "diseno",
  "title": "Algoritmos voraces",
  "blurb": "Función de selección, factibilidad y cuándo la estrategia es óptima: monedas, Huffman, mochila, Kruskal, Prim, Dijkstra.",
  "skills": [
   "voraz"
  ],
  "theory": [
   {
    "id": "t7-esquema",
    "lecture": "t7_algoritmos_voraces",
    "from": 0,
    "to": 6,
    "label": "Algoritmos voraces: elementos y esquema general",
    "idx": 0,
    "upto": 6
   },
   {
    "id": "t7-camino",
    "lecture": "t7_algoritmos_voraces",
    "from": 7,
    "to": 9,
    "label": "Camino más corto: un ejemplo óptimo y otro que no",
    "idx": 7,
    "upto": 9
   },
   {
    "id": "t7-monedas",
    "lecture": "t7_algoritmos_voraces",
    "from": 10,
    "to": 11,
    "label": "Cambio de monedas",
    "idx": 10,
    "upto": 11
   },
   {
    "id": "t7-tiempo-mezcla",
    "lecture": "t7_algoritmos_voraces",
    "from": 12,
    "to": 13,
    "label": "Minimización del tiempo en el sistema y mezcla de listas",
    "idx": 12,
    "upto": 13
   },
   {
    "id": "t7-huffman",
    "lecture": "t7_algoritmos_voraces",
    "from": 14,
    "to": 14,
    "label": "Códigos de Huffman",
    "idx": 14,
    "upto": 14
   },
   {
    "id": "t7-mochila-1",
    "lecture": "t7_algoritmos_voraces",
    "from": 15,
    "to": 17,
    "label": "La mochila: versiones 1 y 2",
    "idx": 15,
    "upto": 17
   },
   {
    "id": "t7-mochila-3",
    "lecture": "t7_algoritmos_voraces",
    "from": 18,
    "to": 19,
    "label": "La mochila con fracciones y la mochila 0-1",
    "idx": 18,
    "upto": 19
   },
   {
    "id": "t7-arm",
    "lecture": "t7_algoritmos_voraces",
    "from": 20,
    "to": 24,
    "label": "Árbol de recubrimiento mínimo: Kruskal y Prim",
    "idx": 20,
    "upto": 24
   },
   {
    "id": "t7-dijkstra",
    "lecture": "t7_algoritmos_voraces",
    "from": 25,
    "to": 26,
    "label": "Caminos mínimos desde un nodo: Dijkstra",
    "idx": 25,
    "upto": 26
   },
   {
    "id": "t7-kmedias",
    "lecture": "t7_algoritmos_voraces",
    "from": 27,
    "to": 31,
    "label": "K-medias",
    "idx": 27,
    "upto": 31
   }
  ]
 }
];
window.SUMMARIES = {
 "intro": "## Problemas y algoritmos\n- **Problema computacional:** relación entre entradas válidas (instancias) y salidas, descrita con precondiciones y postcondiciones. Una **instancia** son unas entradas concretas.\n- **Algoritmo:** serie de pasos bien definidos que lleva de las entradas a las salidas. Es **correcto** si para toda instancia termina con el resultado correcto (entonces *resuelve* el problema).\n- Tipos de problemas: de decisión (salida sí/no), de ordenación, de búsqueda, combinatorios, de optimización, sobre grafos...\n- Algoritmos según implementación: iterativos/recursivos (todo iterativo se puede escribir recursivo y al revés), en serie/paralelos/distribuidos, deterministas/no deterministas, exactos/aproximados.\n- Según el paradigma de diseño: divide y vencerás, fuerza bruta (backtracking), voraces, programación dinámica (en otra asignatura).\n\n## Euclides (mcd)\n$$mcd2(m,n)=\\begin{cases}n & m=0\\\\ mcd2(n\\,\\%\\,m,\\ m) & m\\ne0\\end{cases}$$\nLa versión por restas es $mcd1(m,n)=mcd1(m,n-m)$ si $m\\le n$ y $m\\neq0$. Ambas se demuestran escribiendo $m=az$, $n=bz$ con $z$ el factor común máximo y $a,b$ sin factores comunes.\n\n## Clases de complejidad (problemas de decisión)\n| Clase | Qué es |\n|---|---|\n| **P** | resoluble en tiempo polinómico (búsqueda, ordenación, Dijkstra, programación lineal, optimización convexa) |\n| **NP** | resoluble en tiempo polinómico por un algoritmo **no determinista \"con suerte\"**; equivale a poder **verificar** una solución \"sí\" en tiempo polinómico |\n| **NP-completo** | los más difíciles de NP |\n| **NP-duro** | tan difícil como los más difíciles de NP (o más) |\n| **EXP** | tiempo exponencial $O(2^{p(n)})$ (ajedrez, damas o Go generalizados) |\n| **R** | resoluble en tiempo finito |\n| fuera de R | **indecidibles** (no computables): el problema de la parada |\n\n$$P\\subseteq NP\\subseteq EXP\\subseteq R$$\n- **NP no significa \"no polinómico\"**: significa polinómico no determinista.\n- ¿$P=NP$? Es un problema del milenio. Si se hallara un algoritmo polinómico para un problema NP-completo, sería $P=NP$. Se cree que $P\\neq NP$: verificar una solución es más fácil que encontrarla.\n- NP-completos: SAT (el primero, Cook 1971), los 21 de Karp (1972), suma de subconjuntos, viajante (decisión), mochila 0/1.\n\n## Reducciones\n- **Para demostrar que $A$ es NP-completo:** (1) $A\\in NP$; (2) $A$ es NP-duro, normalmente **reduciendo un NP-completo conocido $Q$ a $A$**, es decir, transformando en tiempo polinómico cada instancia de $Q$ en una de $A$ con la misma respuesta.\n- Como técnica de diseño (\"transforma y vencerás\"): camino más corto en grafo no ponderado $\\to$ ponderado con todos los pesos iguales; productos de pesos $\\to$ aplicar logaritmos; camino más largo $\\to$ multiplicar los pesos por $-1$.\n- Si tu problema es NP-completo, recurre a soluciones **aproximadas** en lugar de buscar un algoritmo eficiente exacto.\n\n## Problema de la parada\nNo existe `Termina(p, x)` que decida siempre si un programa termina. Prueba por contradicción: define `d(w)` que entra en bucle infinito si `Termina(w, w)`; entonces `d(d)` termina si y sólo si `d(d)` no termina.\n\n## Optimización\n$$\\underset{x}{\\text{minimiza}}\\ f_0(x)\\quad\\text{sujeto a}\\quad f_i(x)\\le b_i,\\ i=1,\\dots,m$$\n- $f_0$ = función objetivo; $f_i\\le b_i$ = restricciones, que definen la **región factible**. Maximizar equivale a minimizar $-f_0$.\n- **Mochila 0/1:** $\\max\\sum x_iv_i$ con $x_i\\in\\{0,1\\}$ y $\\sum x_ip_i\\le C$. NP-completo.\n- **Lineales** ($f_i(\\alpha x_1+\\beta x_2)=\\alpha f_i(x_1)+\\beta f_i(x_2)$): región factible poliédrica; el óptimo está en un vértice; se resuelven con Simplex.\n- **Convexos** ($f_i(\\alpha x_1+\\beta x_2)\\le\\alpha f_i(x_1)+\\beta f_i(x_2)$ con $\\alpha+\\beta=1$, $\\alpha,\\beta\\in[0,1]$; restricciones que definen un conjunto convexo): los lineales son un caso particular de convexos. Los convexos se pueden resolver en tiempo polinómico.\n- **No convexos:** varios óptimos locales, sin garantía polinómica. Se usan heurísticas (búsqueda aleatoria, algoritmos genéticos) que no garantizan el óptimo global. \"No hay comida gratis\": ninguna heurística es la mejor en general.\n- **Descenso de gradiente:** `x <- x - alpha * gradiente`, hasta que $\\lVert g\\rVert\\le\\varepsilon$. Puede no converger o ser lento.\n\n## IA y aprendizaje automático\n- **Regresión:** predecir un valor real. **Clasificación:** predecir una clase. **Clustering:** agrupar sin conocer clases.\n- No tienen una solución \"correcta\" ni una relación entrada-salida especificable, así que no son un problema computacional: se plantean problemas concretos (K-NN, SVM...) que se resuelven con algoritmos.\n- Los modelos se crean con datos de **entrenamiento** y se evalúan con datos nuevos (**test**).\n- Jerarquía: tarea $\\to$ problemas computacionales $\\to$ algoritmos.",
 "sumatorios": "## Potencias y logaritmos\n| Potencias | Logaritmos |\n|---|---|\n| $b^0=1$, $b^{-x}=1/b^x$ | $\\log_b 1=0$, $\\log_b b=1$ |\n| $b^x b^y=b^{x+y}$ | $\\log_b(xy)=\\log_b x+\\log_b y$ |\n| $(ab)^x=a^x b^x$ | $\\log_b(x/y)=\\log_b x-\\log_b y$ |\n| $(b^x)^y=b^{xy}$ | $\\log_b(x^y)=y\\log_b x$ |\n| $b^{\\log_b a}=a$ | $\\log_b x=\\log_a x/\\log_a b$ (cambio de base) |\n| $x^{\\log_b y}=y^{\\log_b x}$ | $\\log_b a=1/\\log_a b$ |\n\n## Sumatorios: reglas\n- $\\sum_{i=m}^{n}f(i)=f(m)+\\cdots+f(n)$, y vale $0$ si $m>n$.\n- **Número de términos: $n-m+1$.** Por eso $\\sum_{i=m}^{n}k=k(n-m+1)$ y $\\sum_{i=m}^{n}1=n-m+1$.\n- Es lineal: $\\sum(f+g)=\\sum f+\\sum g$ y $\\sum kf=k\\sum f$ (la constante sale fuera).\n- La variable contadora es muda: $\\sum_{i}f(i)=\\sum_{j}f(j)$. Sumar al revés: $\\sum_{i=m}^{n}f(i)=\\sum_{i=m}^{n}f(n+m-i)$.\n\n## Fórmulas cerradas que hay que saberse\n| Suma | Resultado |\n|---|---|\n| $\\sum_{i=1}^{n}i$ | $\\dfrac{n(n+1)}{2}$ |\n| $\\sum_{i=1}^{n}(2i-1)$ (impares) | $n^2$ |\n| $\\sum_{i=1}^{n}i^2$ | $\\dfrac{n(n+1)(2n+1)}{6}$ |\n| $\\sum_{i=1}^{n}i^3$ | $\\left(\\dfrac{n(n+1)}{2}\\right)^2$ |\n| Aritmética: $\\sum_{i=m}^{n}a_i$ con $a_i=a_{i-1}+d$ | $\\tfrac12(a_m+a_n)(n-m+1)$ |\n| Geométrica: $\\sum_{i=m}^{n}r^i$, $r\\neq1$ | $\\dfrac{r^{n+1}-r^m}{r-1}$ |\n| $\\sum_{i=0}^{n-1}2^i$ | $2^n-1$ |\n| $\\sum_{i=1}^{n}i\\,r^i$ | $\\dfrac{r+r^{n+1}(nr-n-1)}{(r-1)^2}$ |\n| Telescópica: $\\sum_{i=1}^{n}(a_i-a_{i-1})$ | $a_n-a_0$ |\n| Pirámide: $\\sum_{i=1}^{n}\\frac{i(i+1)}{2}$ | $\\dfrac{n(n+1)(n+2)}{6}$ |\n\n## Trucos de demostración\n- **Gauss** (aritméticas): escribir la suma y su inversa y sumarlas término a término; todos los pares dan lo mismo.\n- **Geométricas**: restar $S$ y $rS$; casi todo se cancela y queda $(r-1)S=r^{n+1}-r^m$.\n- **Telescópicas**: reescribir el término como $a_i-a_{i-1}$, por ejemplo $\\frac{1}{i(i+1)}=\\frac1i-\\frac1{i+1}$.\n- **$\\sum i^p$**: sumar la telescópica $\\sum\\left((i+1)^{p+1}-i^{p+1}\\right)=(n+1)^{p+1}-1$ y despejar $S_p$ (hacen falta $S_0,\\dots,S_{p-1}$).\n- **$\\sum i\\,r^i$**: restar $S-rS$, derivar la suma geométrica o descomponer en sumas geométricas parciales.\n\n## Cotas por integrales (cuando no hay fórmula)\n| $f$ monótona | Cota inferior | Cota superior |\n|---|---|---|\n| creciente | $\\int_{m-1}^{n}f(x)\\,dx$ | $\\int_{m}^{n+1}f(x)\\,dx$ |\n| decreciente | $\\int_{m}^{n+1}f(x)\\,dx$ | $\\int_{m-1}^{n}f(x)\\,dx$ |\n\n- Comprueba **primero** si la función crece o decrece: de ahí salen los límites.\n- Serie armónica: $\\ln(n+1)\\le\\sum_{i=1}^{n}\\frac1i\\le\\ln n+1$ (diverge; $\\approx\\ln n+0{,}577$).\n- Integrales útiles: $\\int x^k\\,dx=\\frac{x^{k+1}}{k+1}$, $\\int\\frac1x\\,dx=\\ln x$, $\\int a^x\\,dx=\\frac{a^x}{\\ln a}$.\n\n## Límites y derivadas que se usan después\n- $\\lim_{n\\to\\infty}k/n=0$; $\\lim\\log_b n=\\infty$ si $b>1$; $\\lim n^a=\\infty$ si $a>0$.\n- L'Hôpital: si sale $\\frac00$ o $\\frac\\infty\\infty$, $\\lim\\frac{f}{g}=\\lim\\frac{f'}{g'}$ (el segundo límite debe existir).\n- $(x^n)'=nx^{n-1}$, $(a^x)'=a^x\\ln a$, $(\\log_a x)'=\\frac{1}{x\\ln a}$.\n\n## Errores típicos\n- Contar mal los términos: $\\sum_{i=0}^{n}$ tiene $n+1$ términos, no $n$.\n- Aplicar la fórmula de Gauss cuando el índice no empieza en 1: usa $\\tfrac12(a_m+a_n)(n-m+1)$ o resta dos sumas.\n- Usar $r^{n+1}-r^m$ con $r=1$: ahí la suma vale $n-m+1$.",
 "asintotica": "## Definiciones (con $n\\to\\infty$)\n| Notación | Significa | Definición: existen $c>0$ y $n_0>0$ tales que, $\\forall n\\ge n_0$ | Límite $\\lim\\frac{f(n)}{g(n)}$ |\n|---|---|---|---|\n| $f\\in O(g)$ | $f\\le g$ (cota superior) | $0\\le f(n)\\le c\\,g(n)$ | constante finita ($0$ incluido) |\n| $f\\in\\Omega(g)$ | $f\\ge g$ (cota inferior) | $0\\le c\\,g(n)\\le f(n)$ | $>0$ (o $\\infty$) |\n| $f\\in\\Theta(g)$ | $f= g$ (cota ajustada) | $0\\le c_1 g(n)\\le f(n)\\le c_2 g(n)$ | constante $>0$ |\n| $f\\in o(g)$ | $f<g$ estricta | | $0$ |\n| $f\\in\\omega(g)$ | $f>g$ estricta | | $\\infty$ |\n\n- $f\\in\\Theta(g)\\iff f\\in O(g)$ **y** $f\\in\\Omega(g)$.\n- $O(g)$ es un **conjunto** de funciones: lo correcto es $f\\in O(g)$ (escribir $f=O(g)$ es un abuso).\n- Para que se cumpla basta que **exista** una pareja $(c,n_0)$; si hay una, hay infinitas.\n\n## Cómo demostrarlo\n**Con la definición** ($f\\in O(g)$):\n1. Elige una $c>0$ razonable.\n2. Plantea $f(n)\\le c\\,g(n)$.\n3. Busca un intervalo $[n_0,\\infty)$ donde se cumpla. Esa pareja $(c,n_0)$ es la prueba.\n\nPara **negarlo** ($f\\notin O(g)$): demuestra que, sea cual sea $c$, no hay ningún $[n_0,\\infty)$ donde $f\\le c\\,g$.\n\n**Con límites** (suele ser más rápido): calcula $\\lim\\frac{f}{g}$ y mira la tabla. Si sale $\\frac00$ o $\\frac\\infty\\infty$, aplica L'Hôpital: $\\lim\\frac{f}{g}=\\lim\\frac{f'}{g'}$.\n\n## Orden de menor a mayor\n$$1<\\log n<n<n\\log n<n^2<n^3<2^n<n!$$\n- Hasta $n^2$: \"tratable\"; desde $n^3$ y exponenciales: \"intratable\" ($n^2$ está en el límite).\n- $n^p<n^q$ si $p<q$; $n^p<n^p\\log n<n^{p+1}$; $n^p<c^n$ si $c>1$.\n- Un exponencial es mucho peor que cualquier polinomio, y el factorial peor que el exponencial.\n\n## Reglas para simplificar\n- Las constantes no importan: $\\Theta(k\\,g(n))=\\Theta(g(n))$.\n- Un polinomio vale su término de mayor grado: $\\Theta(a_mn^m+\\cdots+a_0)=\\Theta(n^m)$.\n- La base del logaritmo no importa: $\\Theta(\\log_b n)=\\Theta(\\log n)$. **La del exponente sí**: $2^n\\neq3^n$ asintóticamente.\n- Con dos parámetros ($n$, $m$): quita las constantes y elimina un término sólo si está **contenido** en otro. Ejemplo: $\\Theta(3m^2n+m^3+10mn+2n^2)=\\Theta(m^2n+m^3+n^2)$, porque $mn\\le m^2n$.\n- Ejemplos con dos parámetros: mezclar dos listas ordenadas de longitudes $n$ y $m$ cuesta $\\Theta(n+m)$.\n\n## Qué recordar (errores típicos)\n- $f\\in O(g)$ **no** quiere decir que tarde \"al menos\" $g$: tarda **como mucho** $g$.\n- $O$ suele referirse al **peor caso** (una garantía). Una cota siempre va asociada a un tipo de entrada: mejor, peor o medio.\n- Pon la cota más ajustada: $2n+5\\in O(n)$, aunque también esté en $O(n!)$.\n- Que un algoritmo tarde $\\Theta(n^2)$ para algunas entradas no significa que lo haga para todas.\n- Cuidado con el tamaño de la entrada: procesar los $n$ bits de los $m=2^n$ números es $\\Theta(n\\,2^n)$ en bits, pero $\\Theta(m\\log m)$ en números.\n\n## Ordenación\n- **Cota inferior:** cualquier ordenación **por comparaciones** necesita $\\Omega(n\\log n)$ comparaciones en el peor caso. Prueba: el árbol de decisión tiene al menos $n!$ hojas y, como mucho, $2^h$, así que $h\\ge\\log_2(n!)\\in\\Omega(n\\log n)$.\n- $\\log(n!)\\in\\Theta(n\\log n)$. Para la cota inferior se usa $\\sum_{i=2}^{n}\\log i\\ge\\int_1^n\\log x\\,dx=n\\log n-n+1$.\n- **Counting-sort** (enteros en $[0,k]$): $\\Theta(n+k)$, es decir, $\\Theta(n)$ si $k\\in O(n)$. No compara, por eso puede ser lineal.",
 "bucles": "## Método general\n1. Elige qué cuentas: operaciones elementales (asignaciones, comparaciones, incrementos...). Fija cuánto cuesta cada una, normalmente 1.\n2. Escribe el coste del **bucle más interno** y sustitúyelo en el de fuera, de dentro hacia fuera.\n3. Cada bucle se convierte en un **sumatorio** sobre su contador. Los límites del sumatorio dependen del contador de los bucles exteriores.\n4. Resuelve con las fórmulas de sumatorios y deduce el orden con $\\Theta$.\n\n## Coste de un bucle de $n$ iteraciones\n$$T_{bucle}=\\underbrace{1}_{\\text{inic.}}+\\sum_{i=1}^{n}\\Big(\\underbrace{1}_{\\text{comp.}}+T_{cuerpo}+\\underbrace{1}_{\\text{incr.}}\\Big)+\\underbrace{1}_{\\text{última comp.}}$$\n- Un `for` de $n$ vueltas hace $n$ comparaciones **más una** para salir.\n- Un `if` suma la comparación y, según el caso (mejor/peor), el cuerpo o nada.\n- Si el cuerpo no depende del contador, el sumatorio es $n\\cdot T_{cuerpo}$.\n\n## Plantilla con tres bucles\n$$T(n)=1+\\sum_{i=0}^{n-1}\\left(1+T_{For2}+1\\right)+1,\\qquad T_{For2}=1+\\sum_{j=i+1}^{n}\\left(1+T_{If}+1\\right)+1$$\n- Límites: `range(i+1, n+1)` va de $j=i+1$ a $n$; `range(0, j)` va de $k=0$ a $j-1$ y da $j$ vueltas.\n- Un bucle `range(a, b)` hace $b-a$ vueltas.\n- Sumatorios que aparecen todo el rato: $\\sum_{j=i+1}^{n}c=c(n-i)$, $\\sum_{i=0}^{n-1}i=\\frac{n(n-1)}{2}$, $\\sum_{i=0}^{n-1}i^2=\\frac{(n-1)n(2n-1)}{6}$.\n\n## Mejor, peor y caso medio\n- **Mejor caso:** la entrada que menos trabajo da (insert-sort con el vector ya ordenado: $t_j=0$, así que $\\Theta(n)$).\n- **Peor caso:** la que más da (insert-sort con el vector al revés: $t_j=j$, así que $\\Theta(n^2)$). Es el que se suele estudiar: es una cota superior que nunca se supera, y suele ocurrir a menudo (búsqueda de algo que no está).\n- **Caso medio:** a menudo sale del mismo orden que el peor (insert-sort insertando hasta la mitad también es cuadrático).\n- Cuenta cada caso por separado: el mejor y el peor pueden tener órdenes distintos.\n\n## Resultados de los ejemplos de la teoría\n| Algoritmo | Caso | $T(n)$ | Orden |\n|---|---|---|---|\n| Insert-sort | mejor | $K_1n+K_2$ | $\\Theta(n)$ |\n| Insert-sort | peor | $K_1n^2+K_2n+K_3$ | $\\Theta(n^2)$ |\n| Bubble-sort (variante) | mejor | $\\frac32n^2+\\frac52n-1$ | $\\Theta(n^2)$ |\n| Tres bucles (con `if`) | mejor | $\\frac{3n^2+11n+4}{2}$ | $\\Theta(n^2)$ |\n| Tres bucles (con `if`) | peor | $\\frac{8n^3+27n^2+43n+12}{6}$ | $\\Theta(n^3)$ |\n\n## Qué recordar\n- Para el **orden** las constantes $C_l$ no importan, pero sí el número de veces que se ejecuta cada línea.\n- Un bucle que acaba antes (`break`, condición compuesta) hay que acotarlo por caso.\n- Una suma con límites que dependen del contador exterior no es $n\\cdot n$: se resuelve con las fórmulas.\n- Dos bucles anidados **no** son siempre $n^2$: cuenta las vueltas reales. `for j in range(i+1, n+1)` dentro de `for i in range(n)` suma $\\frac{n(n+1)}{2}$ (cuadrático), pero un contador que se duplica en cada vuelta (`j *= 2` hasta `n`) hace unas $\\log_2 n$ vueltas, no $n$.",
 "expansion": "## Plantear la recurrencia\n- Elige el **tamaño del problema** $n$ (el exponente, la longitud de la lista, el número de dígitos...).\n- Caso base: operaciones cuando $n$ es el valor mínimo. Caso recursivo: operaciones propias **más** el coste de las llamadas.\n- Ejemplo (`pot1`): $T(n)=\\begin{cases}3 & n=0\\\\5+T(n-1) & n>0\\end{cases}$.\n- Si el parámetro se divide a la mitad (`pot2`) puedes suponer $n=2^x$: el orden sale igual.\n\n## Expansión de recurrencias\n1. Sustituye $T$ por su definición **dos o tres veces** y simplifica.\n2. Descubre el patrón en el paso $i$-ésimo: por ejemplo $T(n)=5i+T(n-i)$.\n3. Calcula cuándo se llega al caso base ($n-i=0\\Rightarrow i=n$; $n/2^i=1\\Rightarrow i=\\log_2 n$).\n4. Sustituye ese $i$ y simplifica. Da el orden con $\\Theta$.\n\n## Soluciones que conviene reconocer\n| Recurrencia | Solución | Orden |\n|---|---|---|\n| $T(n)=b+T(n-1)$, $T(0)=a$ | $bn+a$ | $\\Theta(n)$ |\n| $T(n)=b+T(n-1)$, $T(1)=a$ | $b(n-1)+a$ | $\\Theta(n)$ |\n| $T(n)=b+T(n/2)$, $T(1)=a$ | $b\\log_2 n+a$ | $\\Theta(\\log n)$ |\n| $T(n)=b+T(n/2)$, $T(0)=a$ | $b\\log_2 n+b+a$ | $\\Theta(\\log n)$ |\n| $T(n)=bn+c+T(n-1)$, $T(0)=a$ | $\\frac b2n^2+\\left(c+\\frac b2\\right)n+a$ | $\\Theta(n^2)$ |\n| $T(n)=bn+c+2T(n/2)$, $T(0)=a$ | $bn\\log_2 n+(2c+b+2a)n-c$ | $\\Theta(n\\log n)$ |\n| $T(n)=aT(n-1)$ (con $a>1$) | $a^n\\cdot T(0)$ | exponencial |\n\n## Intuición para comprobar el resultado\n- Restar 1 por llamada con trabajo constante: $n$ veces, así que $\\Theta(n)$.\n- Restar 1 por llamada con trabajo $\\propto n$: $n+(n-1)+\\cdots+1$, así que $\\Theta(n^2)$.\n- Dividir entre 2 con una sola llamada y trabajo constante: $\\log_2 n$ veces, así que $\\Theta(\\log n)$.\n- Dos llamadas con $n/2$ y trabajo $\\propto n$: $n$ operaciones en $1+\\log_2 n$ niveles, así que $\\Theta(n\\log n)$ (el árbol de llamadas lo muestra).\n- Un árbol de recursión suma, nivel a nivel, el trabajo de cada nivel.\n\n## Teorema maestro (versión simple)\nPara $T(n)=aT(n/b)+c\\,n^k$ con $T(1)=d$:\n| Si... | Entonces |\n|---|---|\n| $a<b^k$ ($a/b^k<1$) | $\\Theta(n^k)$ |\n| $a=b^k$ | $\\Theta(n^k\\log n)$ |\n| $a>b^k$ | $\\Theta(n^{\\log_b a})$ |\n\nÚtil: $n^{\\log_b a}=a^{\\log_b n}$.\n\n## Errores frecuentes\n- **No comprobar** que la fórmula final cumple la recurrencia inicial (prueba con $n=0$, $1$, $2$).\n- **Hacer mal la primera expansión**: es el fallo más habitual. Sustituye con paréntesis y no simplifiques de más hasta ver el patrón.\n- **No simplificar** los términos: el patrón se vuelve ilegible.\n- Confundir el caso base: $T(0)$ y $T(1)$ dan constantes distintas.\n- Con $n/2$ nunca se llega a 0 con enteros: para al llegar a $T(1)$.",
 "general": "## Teorema maestro, versión completa\nPara $T(n)=aT(n/b)+f(n)$ con $a>0$, $b>0$ y $f$ asintóticamente positiva. Se compara $f(n)$ con $n^{\\log_b a}$:\n| Caso | Condición | Resultado |\n|---|---|---|\n| 1 | $f(n)=O\\left(n^{\\log_b a-\\epsilon}\\right)$, $\\epsilon>0$ | $T(n)\\in\\Theta\\left(n^{\\log_b a}\\right)$ |\n| 2 | $f(n)=\\Theta\\left(n^{\\log_b a}\\log^k n\\right)$, $k\\ge0$ | $T(n)\\in\\Theta\\left(n^{\\log_b a}\\log^{k+1}n\\right)$ |\n| 3 | $f(n)=\\Omega\\left(n^{\\log_b a+\\epsilon}\\right)$, $\\epsilon>0$, **y** $a\\,f(n/b)\\le c\\,f(n)$ con $c<1$ | $T(n)\\in\\Theta(f(n))$ |\n\n- Versión simple ($f=c\\,n^k$): comparar $a$ con $b^k$ (menor: $\\Theta(n^k)$; igual: $\\Theta(n^k\\log n)$; mayor: $\\Theta(n^{\\log_b a})$).\n- El caso 3 exige la condición de regularidad.\n- No cubre todo: si $f$ cae entre los casos (por ejemplo $f=n^{\\log_b a}/\\log n$), no se puede aplicar.\n\n## Recurrencias lineales homogéneas\n$a_0T(n)+a_1T(n-1)+\\cdots+a_kT(n-k)=0$\n1. **Ecuación característica:** $a_0x^k+a_1x^{k-1}+\\cdots+a_k=0$.\n2. **Raíces distintas** $r_1,\\dots,r_k$: $T(n)=C_1r_1^n+\\cdots+C_kr_k^n$.\n3. **Raíz $r$ de multiplicidad $m$:** aporta $C_1r^n+C_2n\\,r^n+\\cdots+C_m n^{m-1}r^n$.\n4. Las constantes $C_i$ salen de las **condiciones iniciales** (un sistema de ecuaciones).\n\nEjemplos:\n- Fibonacci: $x^2-x-1=0$, $r=\\frac{1\\pm\\sqrt5}{2}$, $T(n)=\\frac1{\\sqrt5}\\left(\\frac{1+\\sqrt5}2\\right)^n-\\frac1{\\sqrt5}\\left(\\frac{1-\\sqrt5}2\\right)^n\\in\\Theta\\left(\\left(\\frac{1+\\sqrt5}{2}\\right)^n\\right)$ (la base es $\\approx1{,}618<2$).\n- $T(n)=5T(n-1)-8T(n-2)+4T(n-3)$: $x^3-5x^2+8x-4=(x-2)^2(x-1)$, así que $T(n)=C_12^n+C_2n2^n+C_31^n$.\n\n## Recurrencias no homogéneas\n$a_0T(n)+\\cdots+a_kT(n-k)=b_1^nP_1(n)+\\cdots+b_s^nP_s(n)$, con $d_i=$ grado de $P_i$.\n\n**Ecuación característica:**\n$$(a_0x^k+\\cdots+a_k)\\,(x-b_1)^{d_1+1}\\cdots(x-b_s)^{d_s+1}=0$$\n- Un término $n$ (polinomio de grado 1, $b=1$) añade $(x-1)^2$. Un término $2^n$ añade $(x-2)$. Una constante añade $(x-1)$.\n- **Saca factor común** de las potencias: $2+k^3+2^k+k2^k=(2+k^3)\\,1^k+(1+k)\\,2^k$, que da $(x-1)\\cdot(x-1)^{3+1}(x-2)^{1+1}=(x-1)^5(x-2)^2$ (el primer $(x-1)$ es el de la parte homogénea).\n- Si $b$ ya es raíz de la parte homogénea, las multiplicidades **se suman** (por ejemplo $(x-2)(x-2)=(x-2)^2$).\n- Ejemplo: $T(n)=2T(n-1)+n+2^n$ da $(x-2)^2(x-1)^2$, así que $T(n)=C_12^n+C_2n2^n+C_3+C_4n\\in\\Theta(n2^n)$.\n- Número de constantes = grado del polinomio característico. Para hallarlas calcula tantos valores $T(0),T(1),\\dots$ como constantes haya.\n- Otro ejemplo: $T(n)-2T(n-1)=n\\Rightarrow(x-2)(x-1)^2=0\\Rightarrow\\Theta(2^n)$.\n\n## Cambio de variable\nPara recurrencias con $T(n/2)$, que no son de la forma $T(n-1)$:\n1. Pon $n=2^k$ y define $t(k)=T(2^k)$.\n2. Transforma la recurrencia **con cuidado**: $T(n)=4T(n/2)+n$ pasa a $t(k)=4t(k-1)+2^k$ (no $+k$).\n3. Resuelve $t(k)$ con el método general.\n4. Deshaz el cambio con $2^k=n$: $4^k=n^2$.\n- Ejemplo: $(x-4)(x-2)=0$, $t(k)=C_14^k+C_22^k$, así que $T(n)=C_1n^2+C_2n$; con $T(1)=1$, $T(2)=6$ sale $T(n)=2n^2-n\\in\\Theta(n^2)$.\n- Conviene que la parte derecha tenga la forma $b^k$: $3^{2k}=9^k$.\n\n## Qué recordar\n- Comprueba que el resultado satisface la recurrencia (y los casos base).\n- Si el miembro derecho es $0$, la recurrencia es homogénea: basta con la ecuación característica.\n- Compara los métodos: la expansión resuelve un subconjunto; el método general resuelve más (lineales con coeficientes constantes).\n- Para decidir el orden basta con la raíz **mayor** y su multiplicidad: se queda el término dominante (por ejemplo $n2^n$ sobre $2^n$).\n- Espacio de un algoritmo recursivo: depende de la profundidad máxima de la pila (con Fibonacci, $\\Theta(n)$) y de lo que reserve cada llamada.",
 "recursion": "## Metodología (los 5 pasos)\n1. **Tamaño del problema:** lo que determina cuántas operaciones se hacen ($n$, nº de dígitos, longitud de la lista, $n-m+1$ términos...).\n2. **Casos base:** las instancias más pequeñas, que se resuelven sin llamadas recursivas (lista vacía, $n=0$, $n<10$...).\n3. **Descomposición:** elige subproblemas **del mismo tipo y más pequeños**: $n-1$, $n-2$, $n/2$... Dibuja un diagrama del problema y del subproblema.\n4. **Inducción:** supón que ya sabes resolver el subproblema (salto de fe recursivo) y construye la solución del problema a partir de él.\n5. **Implementar y probar**, y plantear la recurrencia del coste $T(n)$.\n\n- Piensa en **qué** se resuelve (declarativo), no en cómo cambian las variables paso a paso.\n- Una versión \"por cola\" con acumuladores (`fact2(n, p)`) sale de pensar en valores, no en subproblemas: es una iteración disfrazada.\n- No pierdas tiempo con el árbol de llamadas: lo importante es la **regla** que relaciona padre e hijos.\n\n## Tipos de recursividad\n| Tipo | Idea |\n|---|---|\n| Lineal | una sola llamada recursiva ($n!=n\\cdot(n-1)!$) |\n| Final (por cola) | la llamada es lo último; el resultado va en parámetros: $f(n,a,b)=f(n-1,a+b,a)$ |\n| Múltiple | varias llamadas: $F(n)=F(n-1)+F(n-2)$ |\n| Mutua | dos funciones que se llaman entre sí |\n| Anidada | una llamada dentro de los argumentos de otra: $f(n-1,\\,y+f(n-2,0))$ |\n\n## Formas de dividir el problema\n| Descomposición | Esquema | Coste típico |\n|---|---|---|\n| Quitar 1 elemento | $s(n)=s(n-1)+\\text{algo}$ | $T(n)=T(n-1)+1\\Rightarrow\\Theta(n)$ |\n| Una mitad, la otra se descarta | búsqueda binaria | $T(n)=T(n/2)+1\\Rightarrow\\Theta(\\log n)$ |\n| Las dos mitades | `f(a[:m]) + f(a[m:])` | $T(n)=2T(n/2)+1\\Rightarrow\\Theta(n)$ |\n| Dos subproblemas de tamaño $n-1$ | Hanoi | $T(n)=2T(n-1)+1\\Rightarrow\\Theta(2^n)$ |\n\n- Con $n/2$ distingue **par e impar**: `n//2` y `n//2 + 1`.\n- La recurrencia de coste se plantea igual que la de la función.\n\n## Listas: dos formas de programar\n1. Pasar la lista y mirar `len(a)`: usa rebanadas (`a[1:]`, `a[:-1]`, `a[:mitad]`). **Copiar una rebanada cuesta $\\Theta(n)$**, lo que puede empeorar el coste total.\n2. Pasar la lista **completa** y los límites `inf` y `sup`: no se copia nada. Suele ser más eficiente y algo más difícil.\n\nEsquemas para $s(a)=\\sum a_i$:\n```python\na[0] + s(a[1:])                 # quita el primero\ns(a[:-1]) + a[-1]               # quita el último\ns(a[:m]) + s(a[m:])             # divide por la mitad (caso base: 1 elemento)\n```\nCon límites: caso base `inf > sup` (vacío, devuelve el neutro) y, si divides en dos, también `inf == sup`. La mitad es `(inf + sup) // 2`.\n\n## Dígitos\n- Quitar el menos significativo: `n // 10`; el dígito: `n % 10`.\n- Suma de dígitos: `s(n) = n` si `n < 10`, y `s(n) = s(n // 10) + n % 10` en otro caso.\n- Para ¿contiene dígito $d$?: comprueba `n % 10 == d` y sigue con `n // 10`; caso base: se acabaron los dígitos.\n\n## Plantillas que conviene saber\n| Problema | Recurrencia / caso base |\n|---|---|\n| Suma de los $n$ primeros | $S(n)=n+S(n-1)$, $S(0)=0$ |\n| Sumatorio $\\sum_{i=m}^{n}g(i)$ | $f=0$ si $m>n$; $g(m)+f(m+1,n)$; tamaño $n-m+1$ |\n| Búsqueda binaria | caso base `inf > sup` $\\to-1$; compara con `a[mitad]` y sigue en una mitad; $\\Theta(\\log n)$ |\n| Subir escaleras (pasos de 1 o 2) | $f(n)=f(n-1)+f(n-2)$, $f(1)=1$, $f(2)=2$ |\n| Caminos por Manhattan | $f(x,y)=f(x-1,y)+f(x,y-1)$, $f=1$ si $x=0$ o $y=0$; vale $\\binom{x+y}{x}$ |\n| Bisección | para si $f(z)=0$ o $b-a\\le2\\varepsilon$; $z=(a+b)/2$, sigue en el tramo donde cambia el signo |\n| Torres de Hanoi | mover $n-1$ de O a A, mover el disco $n$ de O a D, mover $n-1$ de A a D |\n\n- **Contar (combinatoria):** agrupa lo que cuentas en categorías disjuntas (en las escaleras: las que empiezan con 1 peldaño y las que empiezan con 2) y suma.\n- **Hanoi:** $T(n)=2T(n-1)+1$, es decir, $2^n-1$ movimientos (15 para 4 discos). Caso base $n=1$ (o $n=0$, sin movimiento).\n- **Hanoi cíclico:** dos funciones que se llaman entre sí (`reloj` y `antireloj`), porque son dos problemas distintos.\n\n## Errores típicos\n- Olvidar un caso base, o que la llamada no acerque al caso base (¿termina?).\n- No distinguir $n$ par e impar al dividir entre 2.\n- Cambiar la firma sin cuidado: las llamadas con `inf`/`sup` deben mantener la misma convención (incluyente) en todas partes.\n- Confiar en el árbol de llamadas en vez de en la regla recursiva.",
 "dyv": "## Esquema\n1. **Dividir** el problema en dos o más subproblemas del mismo tipo (y menor tamaño).\n2. **Resolver** cada subproblema con llamadas recursivas. Si son pequeños, caso base.\n3. **Combinar** las soluciones (puede requerir trabajo extra).\n\n- **Decrementa y vencerás:** una sola llamada recursiva ($n-1$, $n//2$...). Es lo del tema 4.\n- **Divide y vencerás:** dos o más llamadas por caso recursivo.\n- **Transforma y vencerás (reducción):** convertir el problema en otro más simple o conocido (mediana = ordenar y tomar el elemento central, $\\Theta(n\\log n)$; $\\sqrt a$ = cero de $x^2-a$).\n- Ventajas: menor coste, paralelismo, buen uso de la caché. Dividir por la mitad **no** garantiza un coste logarítmico: depende de cuántos subproblemas hay y del coste de combinar.\n\n## Coste: lo que hay que reconocer\n| Algoritmo | Recurrencia | Orden |\n|---|---|---|\n| Máximo (dos mitades) | $T(n)=2T(n/2)+1$, $T(n)=2n-1$ | $\\Theta(n)$ (cota inferior $\\Omega(n)$) |\n| Merge-sort | $T(n)=2T(n/2)+n$, $T(n)=n\\log_2n+n$ | $\\Theta(n\\log n)$ en todos los casos |\n| Quicksort, mejor/medio | $2T(n/2)+\\Theta(n)$ | $\\Theta(n\\log n)$ |\n| Quicksort, peor | $T(n-1)+T(1)+\\Theta(n)$ | $\\Theta(n^2)$ |\n| Quickselect | una sola llamada | medio $O(n)$, peor $O(n^2)$ |\n| Karatsuba | $3T(n/2)+en+f$ | $\\Theta(n^{\\log_23})\\approx n^{1{,}585}$ |\n| Multiplicación \"lenta\" en binario | $4T(n/2)+en+f$ | $\\Theta(n^2)$ |\n| Matrices a bloques (8 productos) | $8T(n/2)+\\Theta(n^2)$ | $\\Theta(n^3)$ |\n| Strassen (7 productos, 18 sumas) | $7T(n/2)+18\\Theta(n^2)$ | $\\Theta(n^{\\log_27})\\approx n^{2{,}807}$ |\n\n- Usa el **teorema maestro**: compara $a$ con $b^k$, o $f(n)$ con $n^{\\log_b a}$.\n- El árbol de 2 llamadas con altura $\\log_2n$ tiene $2n-1$ nodos: la exponencial y el logaritmo se cancelan.\n- Merge-sort con partición 10% y 90% también es $\\Theta(n\\log n)$.\n- Producto de matrices $p\\times q$ por $q\\times r$: $O(pqr)$.\n\n## Ordenación recursiva: la descomposición decide el algoritmo\n| Algoritmo | Divide | Combina |\n|---|---|---|\n| Insert-sort | quita el último | inserta en lista ordenada |\n| Select-sort | quita el menor | concatena el menor delante |\n| Merge-sort | dos mitades | **mezcla** (ahí está el trabajo) |\n| Quicksort | por un **pivote**: menores o iguales, pivote, mayores | nada (ya está ordenada) |\n\n- Caso base: $n\\le1$ devuelve la lista.\n- **Mezcla** de dos listas ordenadas: compara las cabezas y toma la menor; coste $\\Theta(n+m)$.\n- **Quicksort:** el pivote puede ser el primero, el central o uno al azar. La partición de Hoare es iterativa e in-place; devuelve la posición final del pivote. Peor caso: pivote siempre mínimo o máximo (un lado queda vacío).\n- **Quickselect** (k-ésimo menor): se particiona y se sigue **sólo** por el lado que contiene el índice $k-1$; por eso no es estrictamente divide y vencerás.\n- Memoria: merge-sort out-of-place necesita un vector auxiliar de tamaño $n$.\n\n## Karatsuba (multiplicación en binario)\n- $x=a\\cdot2^m+b$, $y=c\\cdot2^m+d$ con $m=\\min(\\lfloor b_x/2\\rfloor,\\lfloor b_y/2\\rfloor)$, siendo $b_x,b_y$ los bits.\n- Regla lenta (4 productos): $xy=ac\\,2^{2m}+(ad+bc)2^m+bd$.\n- **Regla rápida (3 productos):** $xy=ac\\,2^{2m}+\\big[(a+b)(c+d)-ac-bd\\big]2^m+bd$.\n- Casos base: $x=0$ o $y=0$ da $0$; $x=1$ da $y$; $y=1$ da $x$.\n- Desplazamientos: `z << m` $=z\\cdot2^m$; `z >> m` $=\\lfloor z/2^m\\rfloor$.\n\n## Otros problemas del tema\n- **L-triominós:** cuadrícula $2^k\\times2^k$ con un cuadrado vacío. Pon un triominó en el centro, cubriendo un cuadrado de cada cuadrante salvo el que ya tiene el hueco; así los 4 cuadrantes tienen un hueco y haces 4 llamadas con lado $n/2$.\n- **Inversión de bits** ($2^p$ elementos): $a'_j=a_i$ con $j$ = $i$ con los bits invertidos. Tres descomposiciones: dos mitades e **intercalar**; posiciones pares e impares y **concatenar**; mitades y colocar cada elemento en su índice invertido.\n\n## Qué recordar\n- Dibuja cómo se divide y cómo se combina antes de escribir código.\n- El caso base debe cubrir el tamaño mínimo (¿lista vacía? ¿un solo elemento?).\n- Cuenta las llamadas y el trabajo de combinar: $T(n)=aT(n/b)+f(n)$.\n- Copiar rebanadas (`a[:m]`) cuesta $\\Theta(n)$; con `ini` y `fin` no se copia nada.",
 "backtracking": "## Idea\n- Construir la solución **poco a poco** (solución parcial), recorriendo el árbol de recursión en profundidad.\n- Si la solución parcial no puede completarse, se **poda** y se **vuelve atrás** deshaciendo lo último que se hizo.\n- Es fuerza bruta \"inteligente\": el árbol es enorme, pero la poda evita explorarlo todo.\n- Estructura general de cualquier backtracking:\n  1. caso base: solución completa, se usa o se imprime;\n  2. **generar candidatos** (un bucle);\n  3. **comprobar** que el candidato es válido (poda);\n  4. **incluirlo** en la solución parcial y actualizar las estructuras auxiliares;\n  5. **llamada recursiva** con $i+1$;\n  6. **deshacer** los cambios de las estructuras auxiliares (si se pasaron por referencia).\n\n## Los tres esquemas que hay que saberse\n**Subconjuntos, árbol binario** ($2^n$ hojas, subconjuntos de tamaño variable). `sol[i]` vale 0 o 1:\n```python\ndef subconjuntos(i, sol, elementos):\n    if i == len(elementos):\n        imprime(sol, elementos)\n    else:\n        for k in range(0, 2):\n            sol[i] = k\n            subconjuntos(i + 1, sol, elementos)\n```\n**Subconjuntos, uno en cada nodo** (más eficiente si buscas subconjuntos de igual tamaño). `sol` guarda **índices**; $j$ es el último índice incluido:\n```python\ndef subconjuntos_alt(i, j, sol, elementos):\n    imprime(sol, i, elementos)              # cada nodo es un subconjunto\n    for k in range(j + 1, len(elementos)):\n        sol[i] = k\n        subconjuntos_alt(i + 1, k, sol, elementos)    # llamada inicial: (0, -1, ...)\n```\n**Permutaciones** ($n!$ hojas). La lista `libres` comprueba en $O(1)$ si un elemento ya está usado:\n```python\ndef permutaciones(i, libres, sol, elementos):\n    n = len(elementos)\n    if i == n:\n        imprime(sol)\n    else:\n        for k in range(0, n):\n            if libres[k]:\n                sol[i] = elementos[k]\n                libres[k] = False\n                permutaciones(i + 1, libres, sol, elementos)\n                libres[k] = True            # deshacer al volver\n```\n- Reserva la solución parcial **una vez** en la función *wrapper*; no concatenes ni borres elementos en cada llamada.\n- Sin la lista `libres`, comprobar la factibilidad cuesta $O(n)$ en vez de $O(1)$.\n\n## N reinas\n- Colocar $n$ reinas sin que se amenacen (fila, columna ni diagonal). Para $n=8$ hay 92 soluciones (12 distintas por simetría).\n- Reduce el espacio de búsqueda: $2^{n^2}\\to\\binom{n^2}{n}\\to n^n$ (una por columna) $\\to n!$ (una por fila y columna: una **permutación**).\n- Solución: `sol[i]` = fila de la reina de la columna $i$ (por ejemplo $(1,3,0,2)$).\n- Estructuras booleanas para comprobar en $O(1)$:\n  - `filas_libres[k]`;\n  - diagonal principal: índice `i - k + n - 1`, con `2n - 1` posiciones;\n  - diagonal secundaria: índice `i + k`.\n- Candidato válido: `filas_libres[k] and pdiags_libres[i-k+n-1] and sdiags_libres[i+k]`. Se marcan como ocupadas, se llama a `i+1` y se vuelven a marcar libres.\n\n## Otros problemas\n- **Suma de subconjuntos:** esquema binario con un parámetro de **suma parcial** ($\\Theta(1)$ en vez de $O(n)$) y poda si la suma parcial supera $s$.\n- **Mochila 0-1:** $\\max\\sum x_iv_i$ con $x_i\\in\\{0,1\\}$ y $\\sum x_ip_i\\le C$. Esquema binario; poda si `k*p[i] > C_restante`. Es de optimización: se recorren todas las soluciones guardando la mejor (`v_opt`, `sol_opt`).\n- **Laberinto, ruta del caballo, sudoku:** se expande la solución casilla a casilla y se comprueba la validez antes de seguir.\n- **Paréntesis válidos:** se podan los prefijos donde hay más cerrados que abiertos o más de $n$ abiertos.\n\n## Ramificación y poda (optimización)\n- Añade una **poda por valor**: si el máximo valor alcanzable en esa rama no supera el mejor valor ya encontrado, se descarta.\n- En la mochila 0-1: `max_v` empieza en `sum(v)`; no incluir el objeto $i$ lo baja en $v_i$; incluirlo no lo cambia.\n```python\nnuevo_max_v = max_v - (1 - k) * v[i]\nif k * p[i] <= C_restante and nuevo_max_v > v_opt:   # poda por capacidad y por valor\n    ...\n```\n- Pesos $(3,6,9,5)$, valores $(7,2,10,4)$, $C=15$: óptimo 17 (objetos 1 y 3).\n- Es un método **exacto**; sólo acelera la búsqueda del óptimo.\n\n## Qué recordar\n- ¿La solución es una **permutación**, un **subconjunto** u otra cosa? Si lo es, usa el esquema.\n- ¿Una solución o todas? Si una, para al encontrarla (una variable booleana). En optimización se buscan todas para quedarse con la mejor.\n- En optimización añade dos parámetros: mejor valor y mejor solución. Y piensa si hay poda por valor.\n- Guarda en estructuras auxiliares lo que necesites comprobar a menudo (`libres`, diagonales, suma parcial).\n- Si pasas una estructura por referencia, **deshaz** los cambios al volver; por valor no hace falta.\n- El coste en el peor caso sigue siendo del orden del tamaño del árbol ($2^n$, $n!$...): la poda mejora la práctica, no el peor caso.",
 "voraz": "## Idea\n- Para **optimización**. En cada paso se toma la mejor decisión *local* y **no se deshace nunca**. Es rápido y fácil de implementar, pero **no siempre es óptimo**: un óptimo local no implica un óptimo global.\n- Para ciertos problemas se puede **demostrar** que una estrategia voraz concreta sí es óptima. Lo difícil es encontrar la función de selección correcta.\n\n## Elementos de un algoritmo voraz\n| Elemento | Qué es |\n|---|---|\n| Candidatos $C$ | el conjunto del que se construye la solución |\n| Función de **selección** | elige el candidato local más idóneo |\n| Función de **factibilidad** | comprueba si añadir el candidato sigue siendo válido |\n| Función **objetivo** | el valor que se optimiza |\n| Función **solución** | indica si lo construido ya es una solución |\n\n```\nvoraz(C):\n    S <- vacío\n    mientras C no vacío y no solución(S):\n        x <- seleccionar(C);  C <- C \\ {x}\n        si factible(S ∪ {x}): S <- S ∪ {x}\n    si solución(S): devolver S, si no: no hay solución\n```\n\n## Problemas clásicos: selección y si es óptima\n| Problema | Selección voraz | ¿Óptima? |\n|---|---|---|\n| Camino más corto, un arco por etapa | el arco más corto | sí (por contradicción) |\n| Camino más corto en grafo por etapas | el arco más corto | **no** (contraejemplo: 23 frente a 7) |\n| Cambio de monedas | la moneda más alta sin pasarse | sólo con ciertos sistemas (con 12 céntimos falla: devolver 2,24 € da 4 monedas voraz, 3 óptimo) |\n| Tiempo en el sistema | clientes en **orden creciente** de $t_i$ | sí |\n| Mezcla de listas | mezclar las dos **más cortas** | sí |\n| Huffman | fusionar los dos árboles de menor frecuencia | sí |\n| Mochila v.1 (máx. nº de objetos) | por **peso creciente** | sí |\n| Mochila v.2 (máx. peso) | peso creciente o decreciente | **ninguna** es óptima |\n| Mochila v.3 (fracciones) | mayor **valor/peso** $v_i/p_i$ | sí |\n| Mochila v.4 (0-1) | | NP-completo: voraz no basta |\n| Árbol de recubrimiento mínimo: Kruskal, Prim | arista de menor peso | sí |\n| Dijkstra | vértice con menor distancia al origen | sí (pesos no negativos) |\n\n## Tiempo en el sistema\n$T(P)=\\sum_{k=1}^{n}(n-k+1)s_k$ con $s_k=t_{p_k}$: el primero cuenta $n$ veces, el segundo $n-1$... Por eso hay que poner **primero los más cortos**. Con $t=(5,10,3)$, el mejor orden es $3,1,2$: $T=29$.\n\n## Huffman\n- Una cola de árboles ordenada por frecuencia. Mientras haya más de un árbol: fusiona los **dos de menor frecuencia** (suman sus frecuencias) y reinsértalo.\n- Código de un carácter: camino desde la raíz (izquierda $=0$, derecha $=1$). Los más frecuentes tienen código más corto.\n- Ejemplo (miles): $f{:}5,\\ e{:}9,\\ c{:}12,\\ b{:}13,\\ d{:}16,\\ a{:}45$ da $a=1,\\ d=011,\\ e=0101,\\ f=0100,\\ b=001,\\ c=000$. Son 224 000 bits frente a 300 000 con 3 bits por carácter.\n\n## Mochila\n- 0-1: $\\max\\sum x_iv_i$ con $x_i\\in\\{0,1\\}$ y $\\sum x_ip_i\\le C$.\n- Con fracciones ($0\\le x_i\\le1$): ordena por $v_i/p_i$ decreciente y llena; el último objeto entra **parcialmente**.\n- Ejemplo: $C=100$, $p=(10,20,30,40,50)$, $v=(20,30,66,40,60)$: $v/p=(2;1{,}5;2{,}2;1;1{,}2)$. La selección por $v/p$ da **164**; por mayor valor, 146; por menor peso, 156.\n\n## Árbol de recubrimiento de coste mínimo\n- Árbol libre: conexo y acíclico; con $n$ vértices tiene $n-1$ aristas.\n- **Propiedad fundamental:** dado $U\\subset V$ no vacío, la arista más pequeña con un extremo en $U$ y otro fuera está en algún árbol mínimo.\n- **Kruskal:** ordena las aristas por peso y añade la menor que **no forme ciclo**; para al llegar a $|V|-1$ aristas.\n- **Prim:** parte de un vértice y añade siempre la arista mínima entre el conjunto $U$ de tratados y el resto.\n- El árbol mínimo **no tiene por qué ser único**.\n\n## Dijkstra\n- Caminos mínimos desde un origen $s$, con pesos **no negativos**.\n- Mantén $d_v$ (distancia conocida); en cada paso mete en $T$ el vértice **no tratado de menor $d$**, y relaja los vecinos: $d_x\\leftarrow\\min\\left(d_x,\\ d_{v_{sig}}+w(v_{sig},x)\\right)$.\n- Diferencia con Prim: Dijkstra tiene en cuenta **todo el camino** desde el origen, no sólo la arista.\n- Ejemplo (origen 0): distancias $0,15,10,20,30$.\n\n## K-medias (clustering)\n- Minimiza $L=\\sum_k\\sum_i a_{ik}\\lVert x_i-\\mu_k\\rVert^2$. Es iterativo, converge a un **óptimo local**, no al global.\n- (A) asigna cada punto al centroide más cercano; (B) cada centroide pasa a ser la media de sus puntos. Repite hasta que los centroides no cambien.\n- Se ejecuta varias veces con distintas inicializaciones.\n\n## Qué recordar\n- Para mostrar que una estrategia **no** es óptima basta un **contraejemplo**; para mostrar que lo es hace falta una demostración (a menudo por contradicción).\n- Antes de implementar, decide la función de selección y comprueba si es óptima."
};
window.QUIZZES = {
 "t1-problemas": [
  {
   "q": "En un problema computacional, ¿qué es una **instancia**?",
   "options": [
    "El conjunto de todas las salidas válidas.",
    "El caso en el que el algoritmo falla.",
    "El algoritmo que se usa para resolver el problema.",
    "Unas entradas concretas para las que hay que calcular la solución, como $\\langle 3,14,7,1,8,12\\rangle$ en el problema de ordenación."
   ],
   "answer": 3,
   "why": "El problema describe la relación entre entradas y salidas; una instancia fija las entradas concretas y su solución es lo que se calcula."
  },
  {
   "q": "Un algoritmo es **correcto** cuando...",
   "options": [
    "devuelve el resultado correcto para la mayoría de las instancias.",
    "no usa recursión ni bucles anidados.",
    "para cada instancia de entrada termina con el resultado correcto.",
    "es rápido para entradas pequeñas."
   ],
   "answer": 2,
   "why": "La definición exige terminar con el resultado correcto en todas las instancias; que un algoritmo incorrecto pueda ser útil si su error está controlado es otra cuestión."
  },
  {
   "q": "¿Cuál de estas afirmaciones sobre algoritmos iterativos y recursivos es cierta?",
   "options": [
    "Todo algoritmo iterativo se puede expresar de forma recursiva y viceversa.",
    "Hay problemas que sólo se pueden resolver con recursión.",
    "Un algoritmo recursivo siempre es más eficiente que uno iterativo.",
    "Un algoritmo iterativo no puede calcular lo mismo que uno recursivo."
   ],
   "answer": 0,
   "why": "Son dos formas equivalentes de expresar el cálculo; elegir una u otra es cuestión de claridad y de eficiencia, no de poder expresivo."
  },
  {
   "q": "¿Qué es un algoritmo **aproximado**?",
   "options": [
    "Uno que a veces devuelve una solución incorrecta sin que importe.",
    "Uno que busca una solución cercana a la verdadera; es útil en problemas duros o intratables.",
    "Uno que no termina siempre.",
    "Uno que usa números reales en vez de enteros."
   ],
   "answer": 1,
   "why": "Frente a los exactos, que alcanzan la solución exacta, los aproximados renuncian a ella cuando obtenerla es demasiado costoso."
  }
 ],
 "t1-euclides": [
  {
   "q": "Según la definición de $mcd2(m,n)$ del tema, ¿cuánto vale $mcd2(6,15)$?",
   "options": [
    "1",
    "3",
    "6",
    "15"
   ],
   "answer": 1,
   "why": "$mcd2(6,15)=mcd2(15\\,\\%\\,6,\\,6)=mcd2(3,6)=mcd2(6\\,\\%\\,3,\\,3)=mcd2(0,3)=3$."
  },
  {
   "q": "En la demostración de que $mcd2(m,n)=mcd2(n\\%m,m)$ se escribe $m=az$ y $n=bz$. ¿Qué representa $z$ y qué se supone de $a$ y $b$?",
   "options": [
    "$z$ es el menor de los dos números y $a=b$.",
    "$z=1$ y $a$ y $b$ son cualesquiera.",
    "$z$ es el resto de dividir $n$ entre $m$ y $a$ y $b$ son primos.",
    "$z$ es el factor común máximo y $a$ y $b$ no comparten factores primos."
   ],
   "answer": 3,
   "why": "Se factoriza lo que tienen en común ($z$); lo que queda en cada número ($a$ y $b$) no comparte factores primos, y de ahí se deduce que el resto $d$ tampoco comparte factores con $a$."
  },
  {
   "q": "En la versión por restas, $mcd1(m,n)$ con $m>n$ hace...",
   "options": [
    "$mcd1(m-1,n-1)$.",
    "$mcd1(m,n-m)$ aunque $n-m$ sea negativo.",
    "$n$.",
    "$mcd1(n,m)$: intercambia los parámetros."
   ],
   "answer": 3,
   "why": "La definición tiene tres casos: $m=0$ devuelve $n$; $m>n$ intercambia los parámetros; si $m\\le n$ y $m\\neq0$ llama con $(m,n-m)$."
  }
 ],
 "t1-clases-1": [
  {
   "q": "¿Cuál de estos costes se considera **polinómico** en el tema?",
   "options": [
    "$n!$",
    "$n^n$",
    "$2^n$",
    "$n\\log n$"
   ],
   "answer": 3,
   "why": "Constante, $\\log n$, $n$, $n\\log n$, $n^2$... son polinómicos (o menores); $2^n$, $n!$ y $n^n$ crecen más que cualquier polinomio."
  },
  {
   "q": "¿Qué significa la **N** de NP?",
   "options": [
    "Numérico: son los problemas con números enteros.",
    "No determinista: NP es \"tiempo polinómico no determinista\", no \"tiempo no polinómico\".",
    "Normal: son los problemas de dificultad media.",
    "No resoluble: son los problemas que ningún algoritmo resuelve."
   ],
   "answer": 1,
   "why": "Confundirlo con \"no polinómico\" es el error más común. Los problemas de NP son decisión que un algoritmo no determinista \"con suerte\" resuelve en tiempo polinómico."
  },
  {
   "q": "¿Cuál es la relación de inclusión de las clases del tema?",
   "options": [
    "$P\\subseteq EXP\\subseteq NP\\subseteq R$",
    "$P\\subseteq NP\\subseteq EXP\\subseteq R$",
    "$R\\subseteq EXP\\subseteq NP\\subseteq P$",
    "$NP\\subseteq P\\subseteq EXP\\subseteq R$"
   ],
   "answer": 1,
   "why": "Cada clase está contenida en la siguiente: polinómico, polinómico no determinista, exponencial y finito."
  }
 ],
 "t1-clases-2": [
  {
   "q": "Una definición equivalente de **NP** es...",
   "options": [
    "los problemas cuyo algoritmo hace muchas comparaciones.",
    "los problemas que requieren tiempo exponencial para ser resueltos.",
    "los problemas de decisión en los que se puede verificar en tiempo polinómico que una solución lleva a un SÍ.",
    "los problemas que no se pueden resolver con un ordenador."
   ],
   "answer": 2,
   "why": "Verificar una solución es fácil en NP aunque encontrarla pueda ser difícil: en el laberinto, comprobar que una secuencia de pasos es un camino es polinómico."
  },
  {
   "q": "¿Qué se dice del problema de encontrar un camino por un laberinto de $n\\times n$?",
   "options": [
    "Está en NP, pero también en P (por ejemplo con Dijkstra); recuerda que $P\\subseteq NP$.",
    "Está en NP y no en P.",
    "Es NP-completo.",
    "Es indecidible."
   ],
   "answer": 0,
   "why": "Un problema en P también está en NP porque un algoritmo determinista polinómico es un caso particular de uno no determinista."
  },
  {
   "q": "¿Qué problema fue el primero demostrado NP-completo?",
   "options": [
    "La mochila 0/1.",
    "El problema del viajante.",
    "La satisfacibilidad booleana (SAT), por Cook en 1971.",
    "La suma de subconjuntos."
   ],
   "answer": 2,
   "why": "Después Karp (1972) presentó 21 problemas NP-completos más."
  },
  {
   "q": "Si demuestras que tu problema es NP-completo, ¿qué te conviene hacer?",
   "options": [
    "Resolverlo por fuerza bruta siempre.",
    "Cambiar de lenguaje de programación.",
    "Recurrir a soluciones aproximadas en vez de perder tiempo buscando un algoritmo eficiente exacto.",
    "Escribir un algoritmo polinómico exacto, que existe seguro."
   ],
   "answer": 2,
   "why": "Un algoritmo polinómico exacto para un NP-completo resolvería $P=NP$; nadie lo ha encontrado."
  }
 ],
 "t1-reducciones": [
  {
   "q": "Para demostrar que un problema $A$ es NP-completo hay que probar que está en NP y que es NP-duro. Lo más habitual para lo segundo es...",
   "options": [
    "reducir $A$ a un problema de P.",
    "comprobar $A$ con muchas instancias.",
    "encontrar un algoritmo exponencial para $A$.",
    "reducir a $A$ un problema NP-completo conocido $Q$: $A$ es al menos tan difícil como $Q$."
   ],
   "answer": 3,
   "why": "Una reducción transforma cada instancia de $Q$ en una de $A$ con la misma respuesta; así un algoritmo para $A$ resolvería $Q$."
  },
  {
   "q": "Tienes un algoritmo para el camino más corto con pesos y necesitas el camino **más largo**. Siguiendo el tema, ¿qué transformación aplicas?",
   "options": [
    "Sumar $1$ a los pesos.",
    "Aplicar logaritmos a los pesos.",
    "Multiplicar los pesos por $-1$.",
    "Dar el mismo peso a todas las aristas."
   ],
   "answer": 2,
   "why": "Es un ejemplo de reducción como técnica de diseño (\"transforma y vencerás\"); aplicar logaritmos sirve para el caso de caminos con producto de pesos."
  },
  {
   "q": "Si se encontrara un algoritmo polinómico para un problema NP-completo...",
   "options": [
    "dejaría de haber problemas indecidibles.",
    "sólo ese problema estaría en P.",
    "se tendría $P\\neq NP$.",
    "se tendría $P=NP$."
   ],
   "answer": 3,
   "why": "Todo problema de NP se reduce a un NP-completo, así que un algoritmo polinómico para uno resuelve todos."
  },
  {
   "q": "¿Qué se prueba con el problema de la parada?",
   "options": [
    "Que todos los programas terminan en tiempo exponencial.",
    "Que no existe un algoritmo que decida, para cualquier programa y entrada, si termina: es indecidible.",
    "Que los programas recursivos no terminan.",
    "Que $P=NP$."
   ],
   "answer": 1,
   "why": "Se supone `Termina(p, x)` y se define `d(w)`; entonces `d(d)` termina si y sólo si `d(d)` no termina: contradicción."
  }
 ],
 "t1-optimizacion": [
  {
   "q": "Tienes un problema de **maximizar** $f_0(x)$. ¿Cómo lo conviertes en uno de minimización?",
   "options": [
    "Invirtiendo las restricciones.",
    "Imposible: son problemas distintos.",
    "Sustituyendo $f_0$ por $1/f_0$ siempre.",
    "Cambiando el signo de la función objetivo: minimizar $-f_0(x)$."
   ],
   "answer": 3,
   "why": "Maximizar $f_0$ y minimizar $-f_0$ tienen las mismas soluciones óptimas."
  },
  {
   "q": "En la mochila 0/1, las variables $x_i\\in\\{0,1\\}$ indican...",
   "options": [
    "si se introduce o no el objeto $i$ en la mochila; el problema es NP-completo.",
    "el valor del objeto $i$.",
    "la fracción del objeto $i$ que se introduce.",
    "el peso del objeto $i$."
   ],
   "answer": 0,
   "why": "Los pesos $p_i$, los valores $v_i$ y la capacidad $C$ son datos de la instancia; $x$ es lo que se decide."
  },
  {
   "q": "En un problema **lineal**, ¿dónde está el óptimo y cómo avanza Simplex?",
   "options": [
    "En un vértice de la región factible (un poliedro convexo); Simplex parte de un vértice y avanza por aristas hasta otro mejor.",
    "En cualquier punto interior; Simplex elige uno al azar.",
    "En el centro de la región factible; Simplex lo calcula por promedios.",
    "Fuera de la región factible."
   ],
   "answer": 0,
   "why": "La función objetivo y las restricciones son hiperplanos y la región factible es un poliedro convexo."
  }
 ],
 "t1-convexos": [
  {
   "q": "¿Cuál de estas afirmaciones es correcta?",
   "options": [
    "Los problemas lineales son convexos, y los convexos se pueden resolver en tiempo polinómico.",
    "Los problemas lineales no son convexos.",
    "Los problemas no convexos siempre tienen un único óptimo.",
    "Los problemas convexos son siempre NP-completos."
   ],
   "answer": 0,
   "why": "La convexidad es la propiedad que permite una solución eficiente; los lineales son un caso particular."
  },
  {
   "q": "¿Cuándo es convexo un conjunto?",
   "options": [
    "Cuando todos sus puntos están sobre una recta.",
    "Cuando es finito.",
    "Cuando no tiene agujeros en ninguna dimensión.",
    "Cuando cualquier segmento entre dos de sus puntos queda completamente dentro del conjunto."
   ],
   "answer": 3,
   "why": "Un conjunto en forma de media luna no es convexo: hay segmentos entre dos de sus puntos que salen de él."
  },
  {
   "q": "En el descenso de gradiente, ¿cuándo se detiene el algoritmo?",
   "options": [
    "Cuando la función vale 0.",
    "Cuando el módulo del gradiente es menor que un $\\varepsilon$ pequeño.",
    "Cuando el gradiente apunta hacia arriba.",
    "Después de exactamente $n$ iteraciones."
   ],
   "answer": 1,
   "why": "En cada paso se actualiza $x\\leftarrow x-\\alpha g$; puede no converger o ser muy lento."
  },
  {
   "q": "En un problema **no convexo**...",
   "options": [
    "el descenso de gradiente garantiza el óptimo global.",
    "siempre se resuelve en tiempo polinómico.",
    "puede haber varios óptimos locales, y las heurísticas no garantizan llegar al óptimo global.",
    "no tiene sentido buscar un óptimo."
   ],
   "answer": 2,
   "why": "Se usan heurísticas como la búsqueda aleatoria o los algoritmos genéticos; el teorema \"no hay comida gratis\" dice que ninguna es la mejor en general."
  }
 ],
 "t1-ia": [
  {
   "q": "¿En qué se diferencian la regresión y la clasificación?",
   "options": [
    "No se diferencian.",
    "La regresión predice un valor real; la clasificación predice una clase (categoría).",
    "La regresión usa datos de test y la clasificación no.",
    "La regresión agrupa los datos y la clasificación los ordena."
   ],
   "answer": 1,
   "why": "En ambas se crea un modelo matemático ajustado a los datos de entrenamiento."
  },
  {
   "q": "¿Por qué estas tareas no son un \"problema computacional\" en el sentido del tema?",
   "options": [
    "Porque no se conoce completamente la relación entre entradas y salidas ni hay una solución \"correcta\", así que no se puede especificar un algoritmo.",
    "Porque no pueden ejecutarse en un ordenador.",
    "Porque no usan datos.",
    "Porque son siempre NP-completas."
   ],
   "answer": 0,
   "why": "Los modelos se crean con datos de entrenamiento y su rendimiento depende de datos nuevos (test)."
  },
  {
   "q": "En el **clustering**...",
   "options": [
    "sólo se conoce la posición de los puntos, no hay información de clases, y se busca una agrupación razonable.",
    "se predice un valor real.",
    "hay una única agrupación correcta que se puede calcular.",
    "cada dato viene con su clase correcta."
   ],
   "answer": 0,
   "why": "La tarea no está claramente definida: existen medidas de bondad para evaluar la calidad de una agrupación, pero no una agrupación \"correcta\"."
  },
  {
   "q": "En la jerarquía tarea, problema y algoritmo, ¿qué son K-NN y SVM para la tarea de clasificación?",
   "options": [
    "Reducciones de problemas NP-completos.",
    "Algoritmos de ordenación.",
    "Tareas generales de la ciencia.",
    "Problemas computacionales concretos que se plantean para abordarla; cada uno se resuelve con varios algoritmos."
   ],
   "answer": 3,
   "why": "Las tareas generales no son problemas computacionales; se plantean problemas concretos y estos se resuelven mediante algoritmos."
  }
 ],
 "t21-potencias-logs": [
  {
   "q": "¿Cuánto vale $\\log_b(x^y)$?",
   "options": [
    "$(\\log_b x)^y$",
    "$y\\cdot\\log_b x$",
    "$\\log_b x+y$",
    "$x\\cdot\\log_b y$"
   ],
   "answer": 1,
   "why": "El exponente sale multiplicando: $\\log_b(x^y)=y\\log_b x$."
  },
  {
   "q": "Para cambiar de base se usa $\\log_b x=\\dots$",
   "options": [
    "$\\dfrac{\\log_a x}{\\log_a b}$",
    "$\\dfrac{\\log_a b}{\\log_a x}$",
    "$\\log_a x-\\log_a b$",
    "$\\log_a x\\cdot\\log_a b$"
   ],
   "answer": 0,
   "why": "Por eso la base de un logaritmo no importa en notación asintótica: sólo cambia una constante."
  },
  {
   "q": "¿Cuál de estas identidades es cierta?",
   "options": [
    "$(ab)^x=a^x+b^x$",
    "$x^{\\log_b y}=\\log_b(xy)$",
    "$x^{\\log_b y}=y^{\\log_b x}$",
    "$b^{\\log_b a}=\\log_b a$"
   ],
   "answer": 2,
   "why": "Se prueba tomando $\\log_b$ en los dos lados: ambos dan $\\log_b x\\cdot\\log_b y$. Y $b^{\\log_b a}=a$."
  },
  {
   "q": "¿De cuántas formas se pueden escoger $m$ elementos de entre $n$ sin importar el orden?",
   "options": [
    "$\\binom{n}{m}=\\dfrac{n!}{m!\\,(n-m)!}$",
    "$n!/m!$",
    "$n^m$",
    "$\\dfrac{n!}{(n-m)!}$"
   ],
   "answer": 0,
   "why": "El coeficiente binomial cuenta combinaciones; también cumple $\\binom nm=\\binom{n-1}{m-1}+\\binom{n-1}{m}$."
  }
 ],
 "t21-calculo": [
  {
   "q": "¿Cuál es la derivada de $f(x)=a^{g(x)}$?",
   "options": [
    "$a^{g'(x)}$",
    "$g'(x)\\cdot a^{g(x)}$",
    "$g(x)\\cdot a^{g(x)-1}$",
    "$g'(x)\\cdot a^{g(x)}\\cdot\\ln a$"
   ],
   "answer": 3,
   "why": "Se aplica la regla de la cadena a la exponencial, que añade el factor $\\ln a$."
  },
  {
   "q": "¿Cuándo se aplica la regla de L'Hôpital a $\\lim\\frac{f(n)}{g(n)}$?",
   "options": [
    "Cuando sale una indeterminación como $\\frac00$ o $\\frac\\infty\\infty$; entonces $\\lim\\frac fg=\\lim\\frac{f'}{g'}$ (si este existe).",
    "Siempre, aunque el límite sea $5/2$.",
    "Cuando el límite es $\\infty$.",
    "Sólo cuando $g$ es un polinomio."
   ],
   "answer": 0,
   "why": "Hay que comprobar que es una indeterminación y que existe el segundo límite."
  },
  {
   "q": "¿Cuánto vale $\\int\\frac1x\\,dx$?",
   "options": [
    "$\\frac{1}{x^2}$",
    "$x\\ln x$",
    "$\\ln x$ (más una constante)",
    "$\\frac{x^0}{0}$"
   ],
   "answer": 2,
   "why": "La fórmula $\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}$ no sirve para $n=-1$."
  },
  {
   "q": "Con $a>0$, ¿cuánto vale $\\lim_{n\\to\\infty} n^a$ y cuánto $\\lim_{n\\to\\infty}\\log_b n$ si $b>1$?",
   "options": [
    "Ambos tienden a $\\infty$.",
    "Los dos tienden a 0.",
    "$n^a$ tiende a 1 y $\\log_b n$ a $\\infty$.",
    "$n^a$ tiende a $\\infty$ y $\\log_b n$ a 0."
   ],
   "answer": 0,
   "why": "Son límites básicos que se usan al comparar órdenes de crecimiento."
  }
 ],
 "t21-sumas-basicas": [
  {
   "q": "¿Cuánto vale $\\sum_{i=3}^{7}1$?",
   "options": [
    "4",
    "5",
    "7",
    "3"
   ],
   "answer": 1,
   "why": "Hay $n-m+1=7-3+1=5$ términos. Es el error clásico contar $n-m$ en lugar de $n-m+1$."
  },
  {
   "q": "¿Cuánto vale $\\sum_{i=m}^{n}f(i)$ si $m>n$?",
   "options": [
    "Es indefinida.",
    "$f(m)$",
    "$-f(n)$",
    "0, por convención."
   ],
   "answer": 3,
   "why": "Un sumatorio vacío vale 0."
  },
  {
   "q": "La suma de los $n$ primeros números impares, $\\sum_{i=1}^{n}(2i-1)$, vale...",
   "options": [
    "$n^2+n$",
    "$n(n+1)/2$",
    "$n^2$",
    "$2n-1$"
   ],
   "answer": 2,
   "why": "Se separa en $2\\sum i-\\sum 1=n(n+1)-n=n^2$. Para $n=4$: $1+3+5+7=16$."
  },
  {
   "q": "Sea una progresión aritmética $a_i=a_{i-1}+d$. La suma $\\sum_{i=m}^{n}a_i$ vale...",
   "options": [
    "$\\frac12(a_m+a_n)(n-m+1)$",
    "$(a_n-a_m)(n-m+1)$",
    "$\\frac12(a_m+a_n)\\,n$",
    "$a_m\\cdot(n-m)$"
   ],
   "answer": 0,
   "why": "Escribiendo la suma al derecho y al revés, cada columna suma $a_m+a_n$ y hay $n-m+1$ columnas."
  }
 ],
 "t21-cuadrados-cubos": [
  {
   "q": "¿Cuánto vale $\\sum_{i=1}^{4}i^2$ según la fórmula del tema?",
   "options": [
    "20",
    "10",
    "30",
    "100"
   ],
   "answer": 2,
   "why": "$\\frac{n(n+1)(2n+1)}{6}=\\frac{4\\cdot5\\cdot9}{6}=30$."
  },
  {
   "q": "¿Cuánto vale $\\sum_{i=1}^{n}i^3$?",
   "options": [
    "$\\dfrac{n(n+1)(2n+1)}{6}$",
    "$\\left(\\dfrac{n(n+1)}{2}\\right)^2$",
    "$\\dfrac{n^4}{4}$",
    "$\\dfrac{n^3(n+1)}{2}$"
   ],
   "answer": 1,
   "why": "Es el cuadrado de la suma de los $n$ primeros naturales: $1^3+2^3+3^3+4^3=100=10^2$."
  },
  {
   "q": "¿Es $\\sum_{i=1}^{n}i^2$ la suma parcial de una progresión aritmética o geométrica?",
   "options": [
    "Sí, aritmética con diferencia 1.",
    "Sí, aritmética, con diferencia 2.",
    "Sí, geométrica, con razón 2.",
    "No: no es ni aritmética ni geométrica, por eso hace falta otra técnica para hallar su fórmula."
   ],
   "answer": 3,
   "why": "Los términos $1,4,9,16,\\dots$ no tienen diferencia ni cociente constante."
  }
 ],
 "t21-telescopicas": [
  {
   "q": "¿Cuánto vale la suma telescópica $\\sum_{i=1}^{n}(a_i-a_{i-1})$?",
   "options": [
    "$a_n+a_0$",
    "$0$",
    "$a_n-a_0$",
    "$n(a_n-a_0)$"
   ],
   "answer": 2,
   "why": "Los términos intermedios se cancelan por parejas."
  },
  {
   "q": "¿Cuánto vale $\\sum_{i=1}^{n-1}\\frac1{i(i+1)}$?",
   "options": [
    "$\\dfrac1n$",
    "$1-\\dfrac1n$",
    "$\\ln n$",
    "$1+\\dfrac1n$"
   ],
   "answer": 1,
   "why": "Como $\\frac1{i(i+1)}=\\frac1i-\\frac1{i+1}$, la suma es telescópica y queda $1-\\frac1n$."
  },
  {
   "q": "Para calcular $\\sum i^3$ el tema parte de la suma telescópica $\\sum\\big((i+1)^4-i^4\\big)$. ¿Para qué sirve?",
   "options": [
    "Para demostrar que la suma es geométrica.",
    "Para derivar la suma respecto a $n$.",
    "Su valor es $(n+1)^4-1$; desarrollándola aparecen $\\sum i^3,\\sum i^2,\\sum i,\\sum1$, y se despeja $\\sum i^3$ conocidas las otras.",
    "Para acotar la suma con una integral."
   ],
   "answer": 2,
   "why": "Es el método general para $S_p$: hacen falta antes las sumas de potencias menores."
  },
  {
   "q": "El número de cajas de una pirámide escalonada de altura $n$ (capas de $1,3,6,10,\\dots$) es...",
   "options": [
    "$n^3$",
    "$\\dfrac{n(n+1)(2n+1)}{6}$",
    "$\\dfrac{n(n+1)}{2}$",
    "$\\dfrac{n(n+1)(n+2)}{6}$"
   ],
   "answer": 3,
   "why": "Es $\\sum_{i=1}^{n}\\frac{i(i+1)}{2}$; para $n=3$ salen $1+3+6=10$."
  }
 ],
 "t21-geometricas": [
  {
   "q": "¿Cuánto vale $\\sum_{i=0}^{n-1}2^i$?",
   "options": [
    "$2^n-1$",
    "$2^n$",
    "$2^{n-1}$",
    "$2^{n+1}-1$"
   ],
   "answer": 0,
   "why": "Es la serie geométrica de razón 2: $\\frac{2^n-1}{2-1}$."
  },
  {
   "q": "¿Qué truco se usa para sumar $r^m+r^{m+1}+\\cdots+r^n$?",
   "options": [
    "Restar $S$ y $rS$: casi todos los términos se cancelan y queda $(r-1)S=r^{n+1}-r^m$.",
    "Dividirla entre $r$.",
    "Acotarla por una integral.",
    "Derivarla respecto de $n$."
   ],
   "answer": 0,
   "why": "Resulta $S=\\frac{r^{n+1}-r^m}{r-1}$, válida si $r\\neq1$."
  },
  {
   "q": "La suma $\\sum_{i=1}^{n}i\\,r^i$...",
   "options": [
    "vale $n\\cdot r^n$.",
    "no tiene fórmula cerrada.",
    "no es ni aritmética ni geométrica, y se resuelve restando $S-rS$, derivando la geométrica o descomponiéndola en sumas geométricas.",
    "es una suma geométrica de razón $r$."
   ],
   "answer": 2,
   "why": "Los tres métodos dan $\\frac{r+r^{n+1}(nr-n-1)}{(r-1)^2}$."
  },
  {
   "q": "¿Qué ocurre con $\\sum_{i=0}^{n-1}\\left(\\frac12\\right)^i$ cuando $n$ crece?",
   "options": [
    "Se acerca a 2.",
    "Se acerca a 1.",
    "Se acerca a 0.",
    "Crece sin límite."
   ],
   "answer": 0,
   "why": "Vale $2\\frac{2^n-1}{2^n}=2-2^{1-n}$."
  }
 ],
 "t21-integrales": [
  {
   "q": "Si $f$ es **creciente**, ¿entre qué integrales se acota $\\sum_{i=m}^{n}f(i)$?",
   "options": [
    "$\\int_{m-1}^{n}f(x)\\,dx\\le\\sum\\le\\int_{m}^{n+1}f(x)\\,dx$",
    "$\\int_{m}^{n}f\\le\\sum\\le\\int_{m}^{n}f$",
    "$\\int_{0}^{n}f\\le\\sum\\le\\int_{0}^{n+1}f$",
    "$\\int_{m}^{n+1}f\\le\\sum\\le\\int_{m-1}^{n}f$"
   ],
   "answer": 0,
   "why": "Dibujando rectángulos de ancho 1: los de altura $f(i)$ sobre $[i,i+1]$ quedan por encima de la curva y los de $[i-1,i]$ por debajo."
  },
  {
   "q": "¿Qué hay que comprobar antes de acotar una suma con integrales?",
   "options": [
    "Que $m=1$.",
    "Si la función es creciente o decreciente en el intervalo, porque de eso dependen los límites.",
    "Que la suma sea finita y par.",
    "Que la función sea un polinomio."
   ],
   "answer": 1,
   "why": "Con $f$ decreciente las cotas se intercambian."
  },
  {
   "q": "Para la serie armónica $\\sum_{i=1}^{n}\\frac1i$ se obtiene...",
   "options": [
    "$\\frac1n\\le\\sum\\le1$",
    "$\\sum=\\ln n$ exactamente",
    "$\\ln n\\le\\sum\\le n$",
    "$\\ln(n+1)\\le\\sum\\le\\ln n+1$"
   ],
   "answer": 3,
   "why": "La función $1/x$ es decreciente; el término $i=1$ se saca para poder usar $\\int_1^n$. La serie diverge y $\\sum\\approx\\ln n+0{,}577$."
  }
 ],
 "t22-por-que": [
  {
   "q": "En $T(n)=\\frac12n^2+2000n+50000$, ¿qué término determina el orden de crecimiento?",
   "options": [
    "El de $50000$, porque es el mayor.",
    "El cuadrático, porque domina al resto cuando $n\\to\\infty$ (aunque para $n$ pequeña los demás pesen más).",
    "El lineal, porque tiene el coeficiente mayor que el cuadrático.",
    "Todos por igual."
   ],
   "answer": 1,
   "why": "Para $n$ pequeña todos los términos influyen, pero la notación asintótica aísla el de mayor orden."
  },
  {
   "q": "¿Qué quiere decir \"$f(n)$ es asintóticamente menor que $g(n)$\" en la noción informal del tema?",
   "options": [
    "$\\lim_{n\\to\\infty}\\frac{f(n)}{g(n)}=0$",
    "$f(n)<g(n)$ para $n=1$.",
    "$\\lim_{n\\to\\infty}\\frac{f(n)}{g(n)}=\\infty$",
    "$f(n)<g(n)$ para todo $n$."
   ],
   "answer": 0,
   "why": "Lo que importa es el comportamiento para valores grandes."
  },
  {
   "q": "Una función con varios parámetros, como $T(n,m)$, ¿puede tener varios términos de mayor orden?",
   "options": [
    "No: siempre domina uno.",
    "Sí, pero sólo si $n=m$.",
    "Sí: si depende de más de un parámetro, puede haber varios términos que ninguno domine al resto.",
    "No: sólo se estudian funciones de un parámetro."
   ],
   "answer": 2,
   "why": "Por ejemplo $m^2n+m^3+n^2$: ninguno es superior a los otros según los parámetros crecen."
  }
 ],
 "t22-ordenes": [
  {
   "q": "¿Cuál es el orden correcto de menor a mayor?",
   "options": [
    "$1<\\log n<n<n\\log n<n^2<n^3<2^n<n!$",
    "$1<\\log n<n<n^2<n\\log n<2^n<n^3$",
    "$1<n<\\log n<n^2<n\\log n<2^n<n!$",
    "$\\log n<1<n<n^2<n\\log n<n!<2^n$"
   ],
   "answer": 0,
   "why": "$n^2$ es el límite entre \"tratable\" e \"intratable\"; los exponenciales superan a cualquier polinomio y el factorial al exponencial."
  },
  {
   "q": "¿Cuál de estas relaciones es cierta?",
   "options": [
    "$n^p\\log n<n^p$",
    "$n^{p+1}<n^p\\log n$",
    "$n^p<n^p\\log n<n^{p+1}$",
    "$2^n<n^p$ para $p$ grande"
   ],
   "answer": 2,
   "why": "Multiplicar por $\\log n$ da algo mayor, pero menor que multiplicar por $n$."
  },
  {
   "q": "En la tabla de valores, para $n=32$, ¿qué función es la más grande?",
   "options": [
    "$n!$, con unos $2{,}63\\cdot10^{35}$",
    "$n^3$",
    "$2^n$",
    "$n\\log_2n$"
   ],
   "answer": 0,
   "why": "Un orden factorial es incluso más costoso que uno exponencial, que ya lo es mucho más que los polinómicos."
  }
 ],
 "t22-cota-sup": [
  {
   "q": "La definición de $f(n)\\in O(g(n))$ dice que existen constantes $c>0$ y $n_0>0$ tales que...",
   "options": [
    "$f(n)=c\\cdot g(n)$ para algún $n\\ge n_0$.",
    "$f(n)\\le g(n)$ para todo $n$.",
    "$f(n)\\ge c\\cdot g(n)$ para todo $n\\ge n_0$.",
    "$0\\le f(n)\\le c\\cdot g(n)$ para todo $n\\ge n_0$."
   ],
   "answer": 3,
   "why": "A partir de $n_0$, $c\\cdot g(n)$ siempre supera o iguala a $f(n)$."
  },
  {
   "q": "Si $f(n)\\in O(g(n))$, ¿qué se puede afirmar?",
   "options": [
    "Que $f$ es asintóticamente menor o igual que $g$: $g$ es una cota superior; $\\lim f/g$ es una constante finita.",
    "Que $f$ tarda al menos $g(n)$.",
    "Que $\\lim f/g=\\infty$.",
    "Que $f(n)=g(n)$ para $n$ grande."
   ],
   "answer": 0,
   "why": "Decir que tarda \"al menos\" $g$ es un error típico: $O$ da una cota superior."
  },
  {
   "q": "¿Cuál de estas cotas superiores de $2n+5$ es la que querremos dar?",
   "options": [
    "Todas valen lo mismo.",
    "$O(n)$: la cota superior más baja.",
    "$O(n^2)$, porque es la más segura.",
    "$O(n!)$, que también es correcta."
   ],
   "answer": 1,
   "why": "$2n+5\\in O(n)$, $O(n^2)$ y $O(n!)$ son ciertas, pero la más informativa es la más ajustada."
  },
  {
   "q": "¿Cuántas parejas $(c,n_0)$ válidas hay si $f\\in O(g)$?",
   "options": [
    "Ninguna: dependen de $n$.",
    "Exactamente una.",
    "Infinitas: basta con que exista una pareja, y si existe una hay muchas.",
    "Sólo hay una por cada $c$."
   ],
   "answer": 2,
   "why": "Si funciona un par, funcionan también valores mayores de $c$ y de $n_0$."
  }
 ],
 "t22-verificar-o": [
  {
   "q": "Para demostrar $5n+2\\in O(n)$ con la definición, el tema plantea $5n+2\\le c\\,n$. Con $c=6$, ¿a partir de qué $n_0$ se cumple?",
   "options": [
    "$n_0=2$: $5n+2\\le6n\\iff2\\le n$.",
    "$n_0=1$.",
    "$n_0=6$, el valor de $c$.",
    "Nunca se cumple."
   ],
   "answer": 0,
   "why": "Despejando $n$ queda $2\\le n$, así que sirve $n_0=2$ (o cualquier valor mayor)."
  },
  {
   "q": "¿Cuál es el procedimiento para **demostrar** $f(n)\\in O(g(n))$ con la definición?",
   "options": [
    "Derivar $f$ y $g$.",
    "Elegir un $n_0$ y comprobar que $f(n_0)\\le g(n_0)$.",
    "Calcular $f(1000)$ y $g(1000)$.",
    "Elegir una $c>0$ adecuada, plantear $f(n)\\le c\\,g(n)$ y encontrar un intervalo $[n_0,\\infty)$ donde se cumpla."
   ],
   "answer": 3,
   "why": "Esa pareja $(c,n_0)$ es la prueba."
  },
  {
   "q": "Para $5n+2\\in O(n^2)$ el tema plantea $n^2-5n-2\\ge0$. ¿Por qué se cumple para $n\\ge6$ con $c=1$?",
   "options": [
    "Porque $n^2$ siempre es mayor que $5n$.",
    "Porque la derivada es positiva.",
    "Porque $c=1$ siempre sirve.",
    "Es una parábola convexa con raíces en $-0{,}37$ y $5{,}37$: positiva a partir de la raíz mayor."
   ],
   "answer": 3,
   "why": "Con otras constantes (por ejemplo $c=5$) basta incluso $n_0=2$; lo importante es que exista alguna."
  }
 ],
 "t22-omega": [
  {
   "q": "¿Por qué $3n^2+2n-2\\notin O(n)$ según el tema?",
   "options": [
    "Porque $2n-2$ es mayor que $n$.",
    "Porque el coeficiente de $n^2$ es 3.",
    "Porque, sea cual sea $c$, $3n^2+(2-c)n-2\\le0$ no se cumple en ningún intervalo $[n_0,\\infty)$: es una parábola convexa que crece hasta $\\infty$.",
    "Porque $c$ tendría que ser negativa."
   ],
   "answer": 2,
   "why": "Para negar $f\\in O(g)$ hay que probar que ninguna pareja $(c,n_0)$ sirve."
  },
  {
   "q": "La definición de $f(n)\\in\\Omega(g(n))$ es...",
   "options": [
    "existen $c$ y $n_0$ tales que $f(n)\\le c\\cdot g(n)$.",
    "existen $c>0$ y $n_0$ tales que $0\\le c\\cdot g(n)\\le f(n)$ para todo $n\\ge n_0$.",
    "$f(n)\\le g(n)$ para todo $n$.",
    "$f(n)=g(n)$ a partir de $n_0$."
   ],
   "answer": 1,
   "why": "$\\Omega$ es la cota inferior: $f$ queda por encima de $c\\cdot g$."
  },
  {
   "q": "Si $f\\in\\Omega(g)$, ¿qué dice el límite $\\lim\\frac{f(n)}{g(n)}$?",
   "options": [
    "Que es 0.",
    "Que es exactamente 1.",
    "Que es mayor que 0 (una constante positiva o $\\infty$).",
    "Que es una constante finita."
   ],
   "answer": 2,
   "why": "Para $O$ el límite es una constante finita; para $\\Omega$, mayor que 0; para $\\Theta$, una constante mayor que 0."
  },
  {
   "q": "¿Cuál es la cota inferior $\\Omega$ que querremos dar para $2n+5$?",
   "options": [
    "$\\Omega(n^2)$",
    "$\\Omega(1)$",
    "$\\Omega(\\log n)$",
    "$\\Omega(n)$: la más alta posible."
   ],
   "answer": 3,
   "why": "$2n+5\\in\\Omega(1)$ y $\\Omega(\\log n)$ son ciertas, pero la más ajustada es $\\Omega(n)$; $\\Omega(n^2)$ es falsa."
  }
 ],
 "t22-theta": [
  {
   "q": "$f(n)\\in\\Theta(g(n))$ equivale a...",
   "options": [
    "$f(n)=g(n)$ para todo $n$.",
    "$f\\in O(g)$ o $f\\in\\Omega(g)$.",
    "$f\\in O(g)$ y $f\\in\\Omega(g)$ a la vez.",
    "$\\lim\\frac fg=\\infty$."
   ],
   "answer": 2,
   "why": "$\\Theta$ es la cota ajustada: a partir de $n_0$, $f$ queda entre $c_1g$ y $c_2g$."
  },
  {
   "q": "¿Qué significan $o$ y $\\omega$?",
   "options": [
    "Cotas para funciones de dos parámetros.",
    "Cotas **estrictas**: $f\\in o(g)$ si $g$ es estrictamente mayor; $f\\in\\omega(g)$ si $g$ es estrictamente menor.",
    "Cotas para el mejor caso.",
    "Lo mismo que $O$ y $\\Omega$."
   ],
   "answer": 1,
   "why": "$o$ equivale a $f<g$ asintóticamente, mientras $O$ es $f\\le g$."
  },
  {
   "q": "Simplifica $\\Theta(3m^2n+m^3+10mn+2n^2)$.",
   "options": [
    "$\\Theta(m^3)$",
    "$\\Theta(m^2n+m^3+n^2)$",
    "$\\Theta(3m^2n+m^3)$",
    "$\\Theta(m^2n)$"
   ],
   "answer": 1,
   "why": "Se quitan las constantes y los términos contenidos en otros: $mn\\le m^2n$. Entre los tres que quedan ninguno es superior a otro."
  },
  {
   "q": "Para $T(n,m)\\in\\Theta(n+m)$ (mezclar dos listas ordenadas de longitudes $n$ y $m$), ¿por qué no se puede quedar sólo con $n$?",
   "options": [
    "Porque $m$ es siempre mayor que $n$.",
    "Porque la suma siempre es $\\Theta(n\\cdot m)$.",
    "Porque no sabemos cuál de los dos parámetros domina: si $m$ crece más que $n$, el término $m$ es el que manda.",
    "Porque $n+m$ no es un polinomio."
   ],
   "answer": 2,
   "why": "Con dos parámetros hay que comparar con límites en cada variable."
  }
 ],
 "t22-aspectos": [
  {
   "q": "¿Qué ocurre con la base del logaritmo en notación asintótica?",
   "options": [
    "No importa: $\\Theta(\\log_x n)=\\Theta(\\log_yn)$, porque cambiar de base sólo multiplica por una constante.",
    "Importa sólo si la base es mayor que 2.",
    "Importa: $\\log_2n$ y $\\log_{10}n$ son órdenes distintos.",
    "Sólo importa en el peor caso."
   ],
   "answer": 0,
   "why": "$\\log_xg=\\frac{\\log_yg}{\\log_yx}$: el factor $\\frac1{\\log_yx}$ es una constante."
  },
  {
   "q": "¿Qué es incorrecto?",
   "options": [
    "Dar la cota superior para el peor caso.",
    "Escribir $f(n)\\in O(g(n))$ en vez de $f(n)=O(g(n))$.",
    "Decir que si $f\\in O(g)$, entonces $f$ tarda al menos $g(n)$.",
    "Suponer que las funciones del análisis son positivas."
   ],
   "answer": 2,
   "why": "$O(g)$ garantiza que no se supera $g$; escribir $=$ en vez de $\\in$ es un abuso de notación habitual."
  },
  {
   "q": "¿A qué hay que asociar siempre una cota?",
   "options": [
    "A una máquina concreta.",
    "A un valor concreto de $n$.",
    "A un tipo de entrada: mejor caso, peor caso o caso medio.",
    "A un lenguaje de programación."
   ],
   "answer": 2,
   "why": "Que un algoritmo tarde $\\Theta(n^2)$ para algunas entradas no quiere decir que lo haga para todas."
  },
  {
   "q": "Procesar los $n$ bits de los $m=2^n$ números de $n$ bits cuesta...",
   "options": [
    "$\\Theta(m^2)$",
    "$\\Theta(2^n)$",
    "$\\Theta(n\\,2^n)$ en función de $n$, que es lo mismo que $\\Theta(m\\log m)$ en función de $m$.",
    "$\\Theta(n)$"
   ],
   "answer": 2,
   "why": "Las dos expresiones son idénticas: lo que cambia es qué se toma como tamaño de la entrada, y por eso un coste puede parecer intratable o tratable."
  }
 ],
 "t22-lineal": [
  {
   "q": "El **counting-sort** ordena en $\\Theta(n)$ si...",
   "options": [
    "la lista ya está casi ordenada.",
    "se pueden comparar los elementos.",
    "los elementos son reales.",
    "los elementos son enteros en $[0,k]$ con $k\\in O(n)$."
   ],
   "answer": 3,
   "why": "Su coste es $\\Theta(n+k)$ y no es general: sólo sirve para ese tipo de datos."
  },
  {
   "q": "¿Cuántos vectores usa el counting-sort y para qué?",
   "options": [
    "Dos: la entrada y una cola.",
    "Uno: ordena en el propio vector.",
    "Tres: entrada $A$, salida $B$ y un vector auxiliar $C[0..k]$ con las apariciones de cada entero.",
    "Uno por cada elemento distinto."
   ],
   "answer": 2,
   "why": "Se cuentan las apariciones, se acumulan sumas en $C$ y se coloca cada elemento en $B$."
  },
  {
   "q": "¿Por qué el counting-sort puede ser lineal sin contradecir lo que se verá sobre la ordenación?",
   "options": [
    "Porque compara de forma más rápida.",
    "Porque no ordena por comparaciones: no es un algoritmo general y usa que los valores son enteros pequeños.",
    "Porque usa recursión.",
    "Porque trabaja sólo con listas ordenadas."
   ],
   "answer": 1,
   "why": "Radix-sort y bucket-sort también son lineales con hipótesis sobre los datos."
  }
 ],
 "t22-comparacion": [
  {
   "q": "Un algoritmo de ordenación **por comparación**...",
   "options": [
    "sólo ordena enteros.",
    "no puede ordenar cadenas.",
    "sólo usa comparaciones ($<,\\le,=,\\ge,>$) y puede ordenar cualquier tipo de datos que se pueda comparar.",
    "necesita conocer la distribución de los valores."
   ],
   "answer": 2,
   "why": "Sus valores y distribución son irrelevantes: sólo interesa el puesto en la ordenación."
  },
  {
   "q": "Para un vector de $n$ elementos, ¿cuántas permutaciones distintas debe poder generar un algoritmo de ordenación por comparación?",
   "options": [
    "$2^n$",
    "$n$",
    "$n!$",
    "$n^2$"
   ],
   "answer": 2,
   "why": "Debe poder llevar cualquier permutación de la entrada a la salida ordenada."
  },
  {
   "q": "En el árbol de decisión de un algoritmo de ordenación, ¿qué representa cada nodo interno $X{:}Y$?",
   "options": [
    "Un elemento ya ordenado.",
    "Una permutación de la lista.",
    "Una comparación entre los elementos $X$º e $Y$º de la secuencia original.",
    "Una llamada recursiva."
   ],
   "answer": 2,
   "why": "Las hojas son las secuencias finales $\\langle X,Y,Z\\rangle$."
  }
 ],
 "t22-cota-orden": [
  {
   "q": "¿Qué dice el teorema sobre la ordenación por comparaciones?",
   "options": [
    "Necesita exactamente $n^2$ comparaciones.",
    "Cualquier algoritmo necesita $\\Omega(n\\log n)$ comparaciones en el peor caso.",
    "Necesita $\\Theta(n!)$ comparaciones.",
    "Existe uno que ordena en $O(n)$."
   ],
   "answer": 1,
   "why": "Por eso no puede existir un algoritmo general de ordenación por comparaciones asintóticamente más rápido que $n\\log n$."
  },
  {
   "q": "¿De dónde sale la desigualdad $h\\ge\\log_2(n!)$ en la demostración?",
   "options": [
    "De que $n!\\le n^2$.",
    "El árbol necesita al menos $n!$ hojas y un árbol binario de altura $h$ tiene como mucho $2^h$.",
    "De que cada comparación ordena un elemento.",
    "De que hay $n$ niveles."
   ],
   "answer": 1,
   "why": "$n!\\le l\\le2^h$; tomando $\\log_2$ queda $h\\ge\\log_2 n!$."
  },
  {
   "q": "Para probar que $\\log(n!)\\in\\Omega(n\\log n)$ se acota $\\sum_{i=2}^{n}\\log i$ por una integral. ¿Por qué se usa $\\int_1^n\\log x\\,dx$ como cota **inferior**?",
   "options": [
    "Porque $\\log x$ es creciente y la suma de las áreas de los rectángulos supera a la integral.",
    "Porque la integral vale $n$.",
    "Porque empieza en $x=0$.",
    "Porque $\\log x$ es decreciente."
   ],
   "answer": 0,
   "why": "$\\int_1^n\\log x\\,dx=n\\log n-n+1$, y se comprueba que es mayor que $\\frac12n\\log n$ para $n\\ge e^2$."
  }
 ],
 "t31-insert": [
  {
   "q": "En el análisis de insert-sort, $t_j$ es...",
   "options": [
    "el número de elementos del vector.",
    "el número de veces que se cumple la condición del `while` (se ejecuta su cuerpo) para un valor concreto de $j$; depende de la entrada.",
    "el tiempo total del algoritmo.",
    "una constante que no depende de la entrada."
   ],
   "answer": 1,
   "why": "Por eso hay que distinguir mejor y peor caso: $t_j$ cambia según el vector."
  },
  {
   "q": "¿Cuándo se da el mejor caso de insert-sort y qué orden tiene?",
   "options": [
    "Con el vector ordenado de menor a mayor: $\\Theta(n^2)$.",
    "Con el vector ya ordenado de menor a mayor ($t_j=0$): $\\Theta(n)$.",
    "Con el vector ordenado de mayor a menor: $\\Theta(n)$.",
    "Cuando $n$ es par: $\\Theta(n\\log n)$."
   ],
   "answer": 1,
   "why": "Cada elemento se compara una vez y no se desplaza nada."
  },
  {
   "q": "¿Y el peor caso?",
   "options": [
    "No tiene peor caso.",
    "Con el vector ordenado de menor a mayor: $\\Theta(n^2)$.",
    "Con todos los elementos iguales: $\\Theta(n^3)$.",
    "Con el vector ordenado de mayor a menor ($t_j=j$): aparece $\\sum j=\\frac{n(n-1)}2$ y el coste es $\\Theta(n^2)$."
   ],
   "answer": 3,
   "why": "Cada elemento debe recorrer toda la parte ya ordenada."
  },
  {
   "q": "¿Por qué se suele estudiar el caso peor?",
   "options": [
    "Porque el mejor caso no existe.",
    "Porque el caso medio siempre es menor.",
    "Porque es el más fácil de calcular siempre.",
    "Es una cota superior que garantiza que el algoritmo nunca tardará más, y suele ocurrir con frecuencia (por ejemplo, en una búsqueda cuando el elemento no está)."
   ],
   "answer": 3,
   "why": "Además el caso medio suele ser asintóticamente tan malo como el peor."
  }
 ],
 "t31-general": [
  {
   "q": "En un bucle de $n$ iteraciones, ¿cuántas comparaciones se hacen?",
   "options": [
    "$n-1$.",
    "Una sola.",
    "Exactamente $n$.",
    "$n$ más una última para salir del bucle."
   ],
   "answer": 3,
   "why": "$T_{bucle}=1_{inic.}+\\sum_{i=1}^{n}(1_{comp.}+T_{cuerpo}+1_{incr.})+1_{última\\ comp.}$."
  },
  {
   "q": "¿Cómo se plantea el coste de bucles anidados?",
   "options": [
    "Se multiplican los números de iteraciones de cada bucle, siempre.",
    "Se escribe el coste del bucle interno y se sustituye en el sumatorio del externo; los límites del interno pueden depender del contador del externo.",
    "Se suman los números de iteraciones de cada bucle.",
    "Sólo se cuenta el bucle más externo."
   ],
   "answer": 1,
   "why": "Por eso aparecen sumas como $\\sum_{j=i+1}^{n}c=c(n-i)$ y hay que resolverlas con las fórmulas de sumatorios."
  },
  {
   "q": "En el ejemplo de los tres bucles, el `for k in range(0,j)` dentro de un `if`, ¿cuántas vueltas da el bucle más interno?",
   "options": [
    "$j+1$ vueltas.",
    "Una vuelta.",
    "$j$ vueltas (de $k=0$ a $j-1$), y sólo se ejecuta si se cumple la condición del `if`.",
    "$n$ vueltas siempre."
   ],
   "answer": 2,
   "why": "El peor caso es que la condición se cumpla siempre: $T_{If}=3+4j$; el mejor, que no se cumpla nunca: $T_{If}=1$."
  },
  {
   "q": "En el ejemplo de tres bucles el mejor caso sale $\\Theta(n^2)$ y el peor...",
   "options": [
    "$\\Theta(n^3)$, porque la condición siempre se cumple y el bucle interior añade un factor lineal.",
    "$\\Theta(n^2)$ también.",
    "$\\Theta(n^4)$.",
    "$\\Theta(n)$."
   ],
   "answer": 0,
   "why": "Mejor y peor caso pueden tener órdenes distintos: hay que calcularlos por separado."
  }
 ],
 "t32-expansion": [
  {
   "q": "¿Qué significa **resolver** una recurrencia?",
   "options": [
    "Escribirla en forma de bucle.",
    "Calcular $T(n)$ para un valor de $n$.",
    "Dar una fórmula no recursiva equivalente; por ejemplo $T(n)=5+T(n-1)$, $T(0)=3$ se resuelve con $T(n)=5n+3$.",
    "Programar la función recursiva."
   ],
   "answer": 2,
   "why": "Tras resolverla se puede dar su orden de crecimiento."
  },
  {
   "q": "En la expansión de $T(n)=5+T(n-1)$ se llega a $T(n)=5i+T(n-i)$. ¿Cuánto vale $i$ en el caso base $T(0)$?",
   "options": [
    "$i=n$, y se obtiene $T(n)=5n+T(0)$.",
    "$i=5$.",
    "$i=\\log_2n$.",
    "$i=0$."
   ],
   "answer": 0,
   "why": "Se llega al caso base cuando el argumento llega a 0: $n-i=0$."
  },
  {
   "q": "¿Por qué se supone $n=2^x$ al analizar `pot2` (la que hace `pot2(b*b, e//2)`)?",
   "options": [
    "Porque así el coste es siempre constante.",
    "Porque la función sólo funciona con potencias de 2.",
    "Porque así $n$ siempre es par y se puede dividir exactamente; el orden obtenido es el mismo.",
    "Porque $n$ impar no tiene coste."
   ],
   "answer": 2,
   "why": "Si el argumento se divide por 2, se llega a $T(1)$ con $i=\\log_2n$ y sale $\\Theta(\\log n)$."
  },
  {
   "q": "¿Cuál es la solución de $T(n)=b+T(n/2)$ con $T(1)=a$?",
   "options": [
    "$T(n)=bn+a$",
    "$T(n)=a+b$",
    "$T(n)=b\\log_2n+a\\in\\Theta(\\log n)$",
    "$T(n)=b\\,n\\log_2n$"
   ],
   "answer": 2,
   "why": "Se divide $n$ por 2 en cada llamada y se hace trabajo constante: $\\log_2n$ veces."
  },
  {
   "q": "¿Cuál es el orden de $T(n)=bn+c+2T(n/2)$?",
   "options": [
    "$\\Theta(n\\log n)$: se hacen $n$ operaciones $1+\\log_2n$ veces.",
    "$\\Theta(n^2)$",
    "$\\Theta(\\log n)$",
    "$\\Theta(n)$"
   ],
   "answer": 0,
   "why": "El árbol de recursión suma, en cada uno de sus $1+\\log_2n$ niveles, un trabajo del orden de $n$."
  }
 ],
 "t32-maestro": [
  {
   "q": "Para $T(n)=aT(n/b)+c\\,n^k$, ¿qué resultado da el teorema maestro simple si $a<b^k$?",
   "options": [
    "$\\Theta(n^k)$",
    "$\\Theta(n^{\\log_ba})$",
    "$\\Theta(a^n)$",
    "$\\Theta(n^k\\log n)$"
   ],
   "answer": 0,
   "why": "Domina el trabajo de la raíz; si $a=b^k$ sale $\\Theta(n^k\\log n)$ y si $a>b^k$ sale $\\Theta(n^{\\log_ba})$."
  },
  {
   "q": "Aplica el teorema maestro a $T(n)=3T(n/2)+n$.",
   "options": [
    "$\\Theta(n^{\\log_23})$, porque $a=3>b^k=2$.",
    "$\\Theta(n^2)$.",
    "$\\Theta(n)$, porque $a<b^k$.",
    "$\\Theta(n\\log n)$, porque $a=b^k$."
   ],
   "answer": 0,
   "why": "Aquí $a=3$, $b=2$, $k=1$: gana el término de las hojas."
  },
  {
   "q": "En el caso 3 del teorema maestro completo, además de $f(n)=\\Omega(n^{\\log_ba+\\epsilon})$, ¿qué se exige?",
   "options": [
    "Que $f$ sea derivable.",
    "Que $a=b$.",
    "La condición de regularidad: $a\\,f(n/b)\\le c\\,f(n)$ para alguna $c<1$ y $n$ suficientemente grande.",
    "Que $f(n)=n^k$."
   ],
   "answer": 2,
   "why": "Sin esa condición el caso 3 no puede aplicarse."
  },
  {
   "q": "¿Cuál es el error frecuente que el tema señala al expandir recurrencias?",
   "options": [
    "Usar demasiadas expansiones.",
    "Elegir un caso base distinto.",
    "No comprobar que la fórmula final es análoga a la recurrencia inicial, hacer mal la primera expansión y no simplificar.",
    "Aplicar el teorema maestro antes que la expansión."
   ],
   "answer": 2,
   "why": "Conviene verificar el resultado con valores pequeños."
  }
 ],
 "t32-homogeneas": [
  {
   "q": "¿Cuál es la ecuación característica de $T(n)=T(n-1)+T(n-2)$?",
   "options": [
    "$x^2-2x=0$",
    "$x-2=0$",
    "$x^2-x-1=0$",
    "$x^2+x+1=0$"
   ],
   "answer": 2,
   "why": "Se pasa todo a la izquierda, $T(n)-T(n-1)-T(n-2)=0$, y se sustituye $T(n-j)$ por $x^{k-j}$."
  },
  {
   "q": "Si todas las raíces $r_1,\\dots,r_k$ de la ecuación característica son distintas, la solución es...",
   "options": [
    "$T(n)=C_1r_1^n+\\cdots+C_kr_k^n$, y las $C_i$ salen de las condiciones iniciales.",
    "$T(n)=r_1+\\cdots+r_k$.",
    "$T(n)=C\\cdot n^k$.",
    "$T(n)=r_1^{C_1}\\cdots r_k^{C_k}$."
   ],
   "answer": 0,
   "why": "Cada raíz aporta una exponencial $r_i^n$."
  },
  {
   "q": "El polinomio $x^3-5x^2+8x-4=(x-2)^2(x-1)$ tiene la raíz 2 doble. ¿Qué forma tiene $T(n)$?",
   "options": [
    "$C_12^n+C_2n^2+C_3$",
    "$C_12^n+C_2\\,n\\,2^n+C_31^n$",
    "$C_12^n+C_22^n+C_31^n$",
    "$(C_1+C_2+C_3)\\,2^n$"
   ],
   "answer": 1,
   "why": "Una raíz de multiplicidad $m$ aporta $C_1r^n+C_2n\\,r^n+\\cdots+C_mn^{m-1}r^n$."
  },
  {
   "q": "¿Qué orden de crecimiento tiene Fibonacci y por qué es menor que $2^n$?",
   "options": [
    "$\\Theta\\left(\\left(\\frac{1+\\sqrt5}{2}\\right)^n\\right)$: exponencial con base $\\approx1{,}618<2$, porque el árbol de recursión está podado.",
    "$\\Theta(2^n)$ exactamente.",
    "$\\Theta(n\\log n)$.",
    "$\\Theta(n^2)$, porque tiene dos llamadas."
   ],
   "answer": 0,
   "why": "El segundo sumando $\\left(\\frac{1-\\sqrt5}2\\right)^n$ tiende a 0."
  }
 ],
 "t32-no-homogeneas": [
  {
   "q": "Para $T(n)-2T(n-1)=n$ (con $b=1$, polinomio de grado $d=1$), ¿cuál es la ecuación característica?",
   "options": [
    "$(x-2)(x-1)=0$",
    "$(x-2)(x-1)^3=0$",
    "$(x-2)\\,x=0$",
    "$(x-2)(x-1)^2=0$"
   ],
   "answer": 3,
   "why": "Cada término $b^nP(n)$ añade el factor $(x-b)^{d+1}$."
  },
  {
   "q": "¿Qué ecuación característica tiene $T(n)=2T(n-1)+n+2^n$?",
   "options": [
    "$(x-2)(x-1)^3=0$",
    "$(x-2)^2(x-1)^2=0$, porque $2^n$ añade $(x-2)$, que se suma a la raíz $2$ de la parte homogénea.",
    "$(x-2)(x-1)(x-2)=0$ con tres raíces distintas.",
    "$x^2-3x=0$"
   ],
   "answer": 1,
   "why": "Las multiplicidades se suman; por eso aparecen $n2^n$ y $n$ en la solución."
  },
  {
   "q": "En $t(k)-t(k-1)=2+k^3+2^k+k2^k$ hay que sacar factor común de las potencias. ¿Cuál es la agrupación correcta?",
   "options": [
    "$2+k^3+(1+k)2^k$ sin más",
    "$(2+k^3+k)\\,1^k+2^k$",
    "$2^k\\,(2+k^3+1+k)$",
    "$(2+k^3)\\,1^k+(1+k)\\,2^k$"
   ],
   "answer": 3,
   "why": "Eso da $(x-1)(x-1)^4(x-2)^2=(x-1)^5(x-2)^2$."
  },
  {
   "q": "¿Cuántas constantes $C_i$ hay que hallar, y cómo?",
   "options": [
    "Tantas como términos tiene la derecha.",
    "Una sola, con el caso base.",
    "No hacen falta para el orden ni para la solución exacta.",
    "Tantas como el grado de la ecuación característica; se calculan valores $T(0),T(1),\\dots$ y se plantea un sistema."
   ],
   "answer": 3,
   "why": "Para el orden de crecimiento basta saber qué término domina (por ejemplo $n2^n$ sobre $2^n$)."
  }
 ],
 "t32-cambio": [
  {
   "q": "En $T(n)=4T(n/2)+n$ se hace $n=2^k$ y $t(k)=T(2^k)$. ¿Cuál es la nueva recurrencia?",
   "options": [
    "$t(k)=4t(k-1)+k$",
    "$t(k)=4t(k/2)+2^k$",
    "$t(k)=2t(k-1)+k$",
    "$t(k)=4t(k-1)+2^k$"
   ],
   "answer": 3,
   "why": "Error frecuente: escribir $+k$ en vez de $+2^k$; $n$ se sustituye por $2^k$."
  },
  {
   "q": "Resuelta $t(k)$, ¿cómo se deshace el cambio de variable para dar $T(n)$?",
   "options": [
    "No hace falta deshacerlo.",
    "Con $2^k=n$: por ejemplo $4^k=(2^k)^2=n^2$.",
    "Sustituyendo $k=n$.",
    "Derivando respecto a $k$."
   ],
   "answer": 1,
   "why": "Así $T(n)=C_1n^2+C_2n$ y con los casos base $T(n)=2n^2-n$."
  },
  {
   "q": "En $t(k)-t(k-1)=3^{2k}$ no hay una potencia del tipo $b^k$. ¿Qué hay que hacer?",
   "options": [
    "Ignorar el término.",
    "Transformar $3^{2k}=(3^2)^k=9^k$.",
    "Sustituir $k$ por $\\log 3$.",
    "Derivar ambos lados."
   ],
   "answer": 1,
   "why": "Hay que escribir la derecha con la forma $b^kP(k)$ para poder obtener el polinomio característico."
  }
 ],
 "t32-espacio": [
  {
   "q": "En un algoritmo recursivo, ¿qué determina su coste en **espacio**?",
   "options": [
    "Nada: la recursión no usa memoria.",
    "Sólo el número total de llamadas.",
    "Sólo el tamaño del código.",
    "La profundidad del árbol de llamadas (lo que crece la pila) y los recursos de cada llamada: parámetros, variables locales y memoria dinámica."
   ],
   "answer": 3,
   "why": "Cada llamada activa ocupa un registro en la pila."
  },
  {
   "q": "El estado de la pila durante $F_5$ (Fibonacci) tiene como altura máxima...",
   "options": [
    "$2^5$ niveles.",
    "$F_5$ niveles.",
    "Un solo nivel.",
    "4 niveles ($F_5,F_4,F_3,F_2$), es decir, $\\Theta(n)$."
   ],
   "answer": 3,
   "why": "La pila sólo contiene una rama del árbol, aunque el árbol completo tenga muchos más nodos; el espacio es $\\Theta(n)$."
  },
  {
   "q": "¿Qué ocurre con la pila cuando una función retorna?",
   "options": [
    "Se conserva hasta el final del programa.",
    "Se duplica.",
    "Se elimina su registro: la pila crece en cada llamada y decrece al retornar.",
    "Se copia al montículo."
   ],
   "answer": 2,
   "why": "El recorrido del árbol de llamadas es en profundidad."
  }
 ],
 "t4-intro": [
  {
   "q": "¿Qué dos ideas clave describe el tema para diseñar con recursividad?",
   "options": [
    "Dividir en tres partes iguales y mezclar.",
    "Memoria dinámica y punteros.",
    "Iteración y acumuladores.",
    "Descomposición (resolver un problema con soluciones de subproblemas idénticos pero más sencillos) e inducción (suponer ya conocida la solución de los subproblemas)."
   ],
   "answer": 3,
   "why": "No hay que calcular las \"subsoluciones\" desde cero: se obtienen con llamadas recursivas."
  },
  {
   "q": "¿Cuándo es especialmente útil la recursividad?",
   "options": [
    "Siempre, porque es más rápida que un bucle.",
    "Cuando la estructura del problema o de los datos no es lineal (grafos, árboles), cuando hay dos o más llamadas a sí mismo o cuando la versión recursiva es más fácil de entender.",
    "Sólo cuando no se conoce el caso base.",
    "Sólo con números enteros."
   ],
   "answer": 1,
   "why": "Frente a listas y arrays, donde basta un bucle."
  },
  {
   "q": "El factorial se define como $n!=\\begin{cases}1&n=0\\\\n\\times(n-1)!&n>0\\end{cases}$. ¿Cuál es el subproblema?",
   "options": [
    "$0!$",
    "$n!$",
    "$(n-1)!$",
    "$2n!$"
   ],
   "answer": 2,
   "why": "El problema $n!$ se resuelve conociendo la solución de un subproblema de menor tamaño y multiplicando por $n$."
  }
 ],
 "t4-paradigma": [
  {
   "q": "¿Qué es el \"salto de fe recursivo\"?",
   "options": [
    "Saltar el caso base cuando es difícil.",
    "Probar la función con muchos casos.",
    "Convertir la recursión en un bucle.",
    "Usar la función que estás programando asumiendo que funciona, aunque no la hayas terminado."
   ],
   "answer": 3,
   "why": "Suponemos que sabemos *qué* resuelve el subproblema, sin pensar en *cómo*."
  },
  {
   "q": "`fact2(n, p)`, que acumula el producto en un parámetro y hace `fact2(n-1, p*n)`, ¿es un buen diseño recursivo según el tema?",
   "options": [
    "No, porque no termina nunca.",
    "No: es equivalente al factorial iterativo; surge de pensar en cómo cambian las variables, no de pensar en subproblemas.",
    "Sí: es la forma recomendada.",
    "Sí, porque es recursión por cola."
   ],
   "answer": 1,
   "why": "El tema pide pensar de forma declarativa, en subproblemas, en vez de imperativa."
  },
  {
   "q": "¿Cuál de estos tipos de recursividad se describe como \"la llamada recursiva es lo último que se hace y el resultado se acumula en parámetros\"?",
   "options": [
    "Múltiple",
    "Mutua",
    "Lineal final (por cola)",
    "Anidada"
   ],
   "answer": 2,
   "why": "La recursión mutua son dos funciones que se llaman entre sí; la anidada llama a la función dentro de sus propios argumentos; la múltiple hace varias llamadas."
  },
  {
   "q": "¿Cuál de estas definiciones es de recursividad **anidada**?",
   "options": [
    "$f(n)=n\\cdot f(n-1)$",
    "$f(n,y)=f(n-1,\\,y+f(n-2,0))$",
    "$B(i)=A(i-1)$ y $A(i)=A(i-1)+B(i-1)$",
    "$f(n)=f(n-1)+f(n-2)$"
   ],
   "answer": 1,
   "why": "Una llamada recursiva aparece dentro de los argumentos de otra. Las otras son lineal, múltiple y mutua."
  },
  {
   "q": "¿Conviene diseñar un algoritmo recursivo pensando en el árbol de recursión?",
   "options": [
    "Generalmente no: lo importante es definir la regla recursiva que relaciona padre e hijos y aplicarla en todo el árbol.",
    "Sí, para decidir el caso base.",
    "Sí, siempre hay que dibujarlo entero.",
    "Sólo si el algoritmo es iterativo."
   ],
   "answer": 0,
   "why": "No hay que perder tiempo pensando cómo se resolverán los subproblemas."
  }
 ],
 "t4-metodologia": [
  {
   "q": "¿Cuáles son los pasos de la metodología recursiva, en orden?",
   "options": [
    "Implementar, probar, definir casos base, reducir el tamaño.",
    "Tamaño del problema, casos base, descomposición, inducción (casos recursivos) e implementar y probar.",
    "Dividir, vencer y combinar.",
    "Casos base, tamaño, inducción, descomposición."
   ],
   "answer": 1,
   "why": "Primero se identifica lo que determina el número de operaciones; los casos base son las instancias más sencillas."
  },
  {
   "q": "Para $S(n)=\\sum_{i=1}^{n}i$, con la descomposición $S(n-1)$, ¿cuál es el caso recursivo?",
   "options": [
    "$S(n)=n$.",
    "$S(n)=S(n/2)+n$.",
    "$S(n)=n+S(n-1)$ si $n>0$, con $S(0)=0$.",
    "$S(n)=S(n-1)\\cdot n$."
   ],
   "answer": 2,
   "why": "Si conocemos la suma de los $n-1$ primeros, sólo hay que añadir $n$."
  },
  {
   "q": "En \"dividir el tamaño por dos\" con $n$ par e impar, ¿qué hay que cuidar?",
   "options": [
    "Eliminar el caso base.",
    "Sólo considerar $n$ par.",
    "Usar siempre $n/2$ con decimales.",
    "Distinguir los dos casos y usar división entera: $n//2$, $n//2-1$ o $n//2+1$ según corresponda."
   ],
   "answer": 3,
   "why": "Por ejemplo $S(n)=3S(n/2)+S(n/2-1)$ si $n$ es par y $3S(\\frac{n-1}2)+S(\\frac{n+1}2)$ si es impar."
  },
  {
   "q": "¿Para qué sirven los diagramas en el paso de descomposición?",
   "options": [
    "Para identificar el problema original y los subproblemas que se van a considerar, como la pirámide de altura $n$ y la de altura $n-1$.",
    "Para sustituir el código.",
    "Para calcular el coste.",
    "Para ordenar los casos base."
   ],
   "answer": 0,
   "why": "Es una forma de ver cómo se recupera la solución del problema a partir de la del subproblema."
  }
 ],
 "t4-listas": [
  {
   "q": "¿Cuáles son las dos formas de implementar funciones sobre listas que presenta el tema?",
   "options": [
    "Pasar la lista como cadena o como número.",
    "Pasar la lista completa y usar su longitud, o pasar la lista y los límites `inf` y `sup` de la sublista con la que se trabaja.",
    "Pasar un puntero al primer elemento y otro al último, solamente.",
    "Pasar siempre una copia."
   ],
   "answer": 1,
   "why": "La segunda suele ser más eficiente, aunque más compleja."
  },
  {
   "q": "¿Cuál es el caso base de `suma_lista_limites(a, inf, sup)`?",
   "options": [
    "`inf == sup` devuelve 0.",
    "`sup == len(a)`.",
    "`inf == 0`.",
    "`inf > sup` (sublista vacía): devuelve 0."
   ],
   "answer": 3,
   "why": "Si también se divide en dos mitades, hace falta el caso `inf == sup`, que devuelve `a[inf]`."
  },
  {
   "q": "¿Qué descomposiciones se pueden usar para sumar los elementos de una lista?",
   "options": [
    "Quitar el primer elemento, quitar el último o partir la lista por la mitad y sumar los resultados.",
    "Ordenar antes la lista.",
    "Sólo partir por la mitad.",
    "Sólo quitar el primero."
   ],
   "answer": 0,
   "why": "Las tres son válidas: $s(a)=a_0+s(a_{1..n-1})$, $s(a)=s(a_{0..n-2})+a_{n-1}$ y $s(a)=s(a_{0..m})+s(a_{m+1..n-1})$."
  }
 ],
 "t4-digitos": [
  {
   "q": "En la suma de los dígitos de un número, ¿cuál es el caso recursivo?",
   "options": [
    "$s(n)=s(n//2)+n\\%2$.",
    "$s(n)=n+s(n-1)$.",
    "$s(n)=s(n\\%10)+n//10$.",
    "$s(n)=s(n//10)+(n\\%10)$, con $s(n)=n$ si $n<10$."
   ],
   "answer": 3,
   "why": "`n // 10` es el número sin su último dígito y `n % 10` es ese dígito: $s(3652)=s(365)+2$."
  },
  {
   "q": "En la **suma lenta** sólo se puede sumar o restar una unidad. Con la descomposición $s(a-1,b+1)$, ¿cuál es el caso recursivo?",
   "options": [
    "$s(a,b)=s(a-1,b-1)+1$.",
    "$s(a,b)=s(a-1,b+1)$: no hace falta hacer nada más, porque $a-1+b+1=a+b$.",
    "$s(a,b)=s(a,b-1)+a$.",
    "$s(a,b)=s(a-1,b)+2$."
   ],
   "answer": 1,
   "why": "El caso base es $a=0$, con $s(0,b)=b$."
  },
  {
   "q": "Si el tamaño del problema de la suma lenta es $\\min(a,b)$, ¿cuáles son los casos base?",
   "options": [
    "$a=1$ y $b=1$.",
    "Sólo $a=0$.",
    "$a=0$ (devuelve $b$) y $b=0$ (devuelve $a$).",
    "$a=b$."
   ],
   "answer": 2,
   "why": "Con $s(a-1,b-1)$ se reduce el tamaño, y en el caso recursivo se suma 1 dos veces."
  },
  {
   "q": "Al diseñar con un tamaño distinto, ¿hay una sola elección correcta del tamaño del problema?",
   "options": [
    "No: hay varias opciones válidas (como $a$, $b$ o $\\min(a,b)$); cambian los casos base y la descomposición.",
    "No: el tamaño no se define.",
    "Sí, el número de llamadas.",
    "Sí, siempre el mayor de los parámetros."
   ],
   "answer": 0,
   "why": "Lo importante es que la descomposición lo reduzca."
  }
 ],
 "t4-maximo-potencia": [
  {
   "q": "Para el máximo de una lista, ¿cuál es el caso base y por qué?",
   "options": [
    "$n=0$: el máximo es 0.",
    "$n=1$: el máximo es $a_0$. No tiene sentido hablar del máximo de una lista vacía.",
    "No hace falta caso base.",
    "$n=2$."
   ],
   "answer": 1,
   "why": "La lista tiene longitud $n\\ge1$."
  },
  {
   "q": "Con la descomposición \"partir por la mitad\" el máximo es...",
   "options": [
    "$m(a_{0..h-1})+m(a_{h..n-1})$.",
    "$m(a_{0..n-1})$.",
    "$\\min\\{m(a_{0..h-1}),m(a_{h..n-1})\\}$.",
    "$\\max\\{m(a_{0..h-1}),\\,m(a_{h..n-1})\\}$, con $h=n//2$."
   ],
   "answer": 3,
   "why": "El mayor de los máximos de las dos sublistas."
  },
  {
   "q": "¿Qué coste tiene calcular $b^n$ con $b^n=b\\cdot b^{n-1}$ y cuál con $b^n=(b^{n//2})^2$ (con un factor $b$ si $n$ es impar)?",
   "options": [
    "$\\Theta(n)$ y $\\Theta(\\log n)$.",
    "$\\Theta(n)$ en ambos.",
    "$\\Theta(\\log n)$ y $\\Theta(n)$.",
    "$\\Theta(n^2)$ y $\\Theta(n)$."
   ],
   "answer": 0,
   "why": "La segunda reduce el exponente a la mitad en cada llamada."
  },
  {
   "q": "En la segunda versión de la potencia, ¿por qué se guarda `p = pot2(b, n//2)` antes de devolver `p*p`?",
   "options": [
    "Para ahorrar una variable.",
    "Para hacer una sola llamada recursiva; si se llamase dos veces, el coste dejaría de ser logarítmico.",
    "Para evitar el caso base.",
    "Porque Python no permite llamar a la función dos veces."
   ],
   "answer": 1,
   "why": "Con dos llamadas de tamaño $n/2$ el coste sería $\\Theta(n)$."
  }
 ],
 "t4-secuencias": [
  {
   "q": "En las funciones que escriben una cadena en vertical (hola → h, o, l, a), ¿qué cambia entre el orden normal y el inverso con la descomposición \"quitar el primero\"?",
   "options": [
    "No cambia nada.",
    "Se cambia el caso base.",
    "Se imprime `s[0]` antes de la llamada recursiva para el orden normal, y después para el inverso.",
    "Se usa otra descomposición forzosamente."
   ],
   "answer": 2,
   "why": "`f1`: `print(s[0]); f1(s[1:])`; `g1`: `g1(s[1:]); print(s[0])`."
  },
  {
   "q": "En `f3` (dividir la cadena por la mitad), ¿en qué orden hay que hacer las llamadas para escribir en orden normal?",
   "options": [
    "Imprimir en cada llamada.",
    "Da igual.",
    "Primero la mitad derecha.",
    "Primero `f3(s[:m])` y luego `f3(s[m:])`."
   ],
   "answer": 3,
   "why": "Para el orden inverso `g3` llama primero a `g3(s[m:])`."
  },
  {
   "q": "En el sumatorio general $f(m,n,g)=\\sum_{i=m}^{n}g(i)$, ¿cuál es el tamaño del problema y el caso base?",
   "options": [
    "No tiene caso base.",
    "El tamaño es $m$ y el caso base $n=0$.",
    "El tamaño es $n-m+1$ (el número de términos) y el caso base es $m>n$: vale 0.",
    "El tamaño es $n$ y el caso base $m=0$."
   ],
   "answer": 2,
   "why": "Si se divide en dos hace falta además $m=n$, que devuelve $g(m)$."
  },
  {
   "q": "¿Cómo se implementa `contiene_digito_cola(n, d)` frente a la versión lineal?",
   "options": [
    "Son la misma función.",
    "En la de cola la llamada recursiva es lo último; en la lineal hay una operación pendiente tras la llamada (`(n%10==d) or contiene_digito_lineal(n//10, d)`).",
    "La lineal no usa `n//10`.",
    "La de cola no necesita caso base."
   ],
   "answer": 1,
   "why": "Ambas descomponen con `n // 10`; $f(3082,2)=$ `True`."
  }
 ],
 "t4-cambio-lineal": [
  {
   "q": "Para el cambio de base $c(n,b)$ el tema usa la regla $c(n,b)=10\\cdot c(n//b,b)+n\\%b$. ¿Qué ejemplo lo ilustra?",
   "options": [
    "$c(142,5)=c(28,5)+2$.",
    "$c(142,5)=10\\cdot c(28,5)+2=10\\cdot103+2=1032$.",
    "$c(142,5)=5\\cdot c(28,5)+2$.",
    "$c(142,5)=c(142,10)\\cdot5$."
   ],
   "answer": 1,
   "why": "$142=28\\cdot5+2$ y $28$ en base 5 es 103: añadir el dígito $2$ a la derecha equivale a multiplicar por 10 y sumar 2."
  },
  {
   "q": "¿Cuál es el caso base del cambio de base?",
   "options": [
    "$n=b$.",
    "$n=0$ devuelve $b$.",
    "$n<b$: la salida tiene un solo dígito, $c(n,b)=n$.",
    "$b=1$."
   ],
   "answer": 2,
   "why": "El tamaño del problema es el número de dígitos de la salida."
  },
  {
   "q": "En el algoritmo de Horner, ¿cuál es la regla recursiva para evaluar el polinomio?",
   "options": [
    "$P(x,d)=x^n\\cdot P(x,d_{1..n})$",
    "$P(x,d)=P(x,d_{0..n-1})\\cdot x$",
    "$P(x,d)=d_0+x\\cdot P(x,d_{1..n})$",
    "$P(x,d)=d_n+P(x,d_{0..n-1})$"
   ],
   "answer": 2,
   "why": "Se elimina el primer coeficiente; el caso base es el polinomio constante $d_0$."
  },
  {
   "q": "En la búsqueda lineal recursiva, ¿cuál es el caso recursivo tras comprobar que $x\\neq a_{n-1}$?",
   "options": [
    "Buscar $x$ en la mitad derecha.",
    "Buscar $x$ en $a_{0..n-2}$: $f(a,x)=f(a_{0..n-2},x)$.",
    "Devolver $-1$.",
    "Devolver $n$."
   ],
   "answer": 1,
   "why": "El caso base es la lista vacía, que devuelve $-1$."
  }
 ],
 "t4-binaria": [
  {
   "q": "En la búsqueda binaria recursiva, si $x<a_m$ (con $m$ la mitad), ¿dónde se continúa?",
   "options": [
    "Se devuelve $-1$.",
    "En toda la lista.",
    "En $a_{m+1..n-1}$.",
    "En $a_{0..m-1}$, porque $x$ sólo puede estar ahí; el coste es $\\Theta(\\log n)$."
   ],
   "answer": 3,
   "why": "Se descarta la mitad superior de la lista, y el caso base es la lista vacía."
  },
  {
   "q": "¿Por qué conviene pasar los índices `inf` y `sup` en la búsqueda binaria en vez de sublistas?",
   "options": [
    "Para que la búsqueda sea lineal.",
    "Para evitar el caso base.",
    "Para devolver el índice en la lista original: se pasa toda la lista y la función trabaja con los índices entre `inf` y `sup`.",
    "Porque Python no permite sublistas."
   ],
   "answer": 2,
   "why": "Con sublistas habría que sumar desplazamientos a cada resultado."
  },
  {
   "q": "En el problema de las **escaleras** (subir de uno o dos peldaños), ¿cuál es el caso recursivo?",
   "options": [
    "$f(n)=f(n-1)\\cdot f(n-2)$.",
    "$f(n)=f(n/2)+1$.",
    "$f(n)=f(n-1)+f(n-2)$, con $f(1)=1$ y $f(2)=2$.",
    "$f(n)=2f(n-1)$."
   ],
   "answer": 2,
   "why": "Se agrupan las formas según el primer paso: las que empiezan con un peldaño son $f(n-1)$ y las que empiezan con dos son $f(n-2)$."
  },
  {
   "q": "En problemas combinatorios (de conteo), ¿qué recomienda el tema?",
   "options": [
    "Agrupar los elementos a contar en categorías diferentes y sumar los de cada una.",
    "Usar siempre la fórmula con factoriales.",
    "Contarlos uno a uno con un bucle.",
    "Ordenarlos antes."
   ],
   "answer": 0,
   "why": "Es la idea que da la regla recursiva de las escaleras."
  }
 ],
 "t4-manhattan": [
  {
   "q": "¿Cuántos caminos hay de $(0,0)$ a $(x,y)$ avanzando una unidad hacia arriba o hacia la derecha en cada paso?",
   "options": [
    "$f(x,y)=f(x-1,y)+f(x,y-1)$, con $f=1$ si $x=0$ o $y=0$; vale $\\binom{x+y}{x}$.",
    "$x+y$",
    "$2^{x+y}$",
    "$x\\cdot y$"
   ],
   "answer": 0,
   "why": "Sólo se puede llegar a $(x,y)$ desde $(x-1,y)$ o desde $(x,y-1)$."
  },
  {
   "q": "¿Cuál es el caso base general en los caminos por Manhattan?",
   "options": [
    "Sólo $x=0$ e $y=0$.",
    "$x=y$.",
    "Si $x=0$ o $y=0$ hay un único camino (totalmente vertical u horizontal).",
    "Si $x=0$ o $y=0$ no hay caminos."
   ],
   "answer": 2,
   "why": "El caso $x=y=0$ se considera un camino válido."
  },
  {
   "q": "Método de bisección, para $f$ continua con $f(a)$ y $f(b)$ de signo distinto, ¿cuándo se puede parar?",
   "options": [
    "Siempre después de 10 pasos.",
    "Cuando $a=b$.",
    "Si $f(\\hat z)=0$ o si $b-a<2\\varepsilon$ (entonces $|\\hat z-r|\\le\\varepsilon$).",
    "Cuando $f(a)=f(b)$."
   ],
   "answer": 2,
   "why": "Con $\\hat z=(a+b)/2$, el nuevo intervalo conserva el cambio de signo y su ancho se divide por 2."
  },
  {
   "q": "En la bisección, ¿cómo se decide el siguiente intervalo?",
   "options": [
    "El que contiene $f(x)=0$ por tanteo.",
    "El de mayor longitud.",
    "Se queda $[a,\\hat z]$ si el signo de $f(a)$ difiere del de $f(\\hat z)$; si no, $[\\hat z,b]$.",
    "Siempre el de la izquierda."
   ],
   "answer": 2,
   "why": "El tamaño del problema es $b-a$ y se divide por 2 en cada paso."
  }
 ],
 "t4-hanoi": [
  {
   "q": "¿Cuál es la descomposición de las Torres de Hanoi con $n$ discos?",
   "options": [
    "Mover $n/2$ discos y luego los otros $n/2$.",
    "Mover $n-1$ discos de origen a auxiliar, mover el disco $n$ de origen a destino y mover los $n-1$ de auxiliar a destino.",
    "Mover los discos de mayor a menor siempre.",
    "Mover el disco 1 hasta el destino $n$ veces."
   ],
   "answer": 1,
   "why": "Hay dos llamadas recursivas con $n-1$ discos y una operación básica."
  },
  {
   "q": "¿Cuántos movimientos hacen falta para $n=4$?",
   "options": [
    "8",
    "4",
    "15",
    "16"
   ],
   "answer": 2,
   "why": "Con $T(n)=2T(n-1)+1$ y $T(1)=1$: $2^n-1=15$."
  },
  {
   "q": "¿Cuál es el caso base de Hanoi?",
   "options": [
    "Cuando las tres torres están vacías.",
    "$n=2$.",
    "$n=1$: mover el disco 1 de origen a destino (o $n=0$: no se mueve nada).",
    "Hanoi no tiene caso base."
   ],
   "answer": 2,
   "why": "El código alternativo `if n > 0:` usa $n=0$ como único caso base."
  },
  {
   "q": "¿Conviene analizar todos los movimientos a mano para diseñar Hanoi?",
   "options": [
    "No, hay que memorizar la secuencia.",
    "Sí: así se descubre la regla.",
    "Sí, pero sólo con $n=2$.",
    "No: hay que centrarse en subproblemas y sus soluciones, suponiendo que sabemos mover una pirámide de $n-1$ discos de cualquier torre a otra."
   ],
   "answer": 3,
   "why": "Es el salto de fe recursivo aplicado a las pirámides."
  }
 ],
 "t4-hanoi-ciclico": [
  {
   "q": "En las Torres de Hanoi cíclicas, ¿por qué hay dos funciones, `reloj` y `antireloj`?",
   "options": [
    "Porque se usan dos pilas.",
    "Para repartir los discos pares e impares.",
    "Porque Python lo exige.",
    "Porque son dos problemas distintos (mover en el sentido de las agujas del reloj y en el contrario) y se llaman entre sí: recursividad mutua."
   ],
   "answer": 3,
   "why": "Cada uno se descompone usando problemas de tamaño $n-1$ de ambos sentidos."
  },
  {
   "q": "¿Cómo se mueve un disco en sentido \"reloj\" para $n=1$ y en sentido \"antireloj\"?",
   "options": [
    "En antireloj no se puede.",
    "Los dos directamente.",
    "Los dos pasando por la auxiliar.",
    "En reloj, directamente de origen a destino; en antireloj, pasando por la torre auxiliar (origen→auxiliar→destino)."
   ],
   "answer": 3,
   "why": "Los discos sólo pueden pasar de una torre a otra en el sentido de las agujas del reloj."
  },
  {
   "q": "En el caso recursivo de `reloj`, ¿qué se hace?",
   "options": [
    "Se mueven los discos a la torre D uno a uno.",
    "Se mueven $n-1$ discos de O a A en sentido antireloj, el disco $n$ de O a D y los $n-1$ de A a D en antireloj.",
    "Se mueven $n-1$ discos en reloj dos veces.",
    "Se usa la solución de Hanoi normal."
   ],
   "answer": 1,
   "why": "`antireloj` necesita cinco pasos: dos veces el disco $n$ y tres movimientos de pirámides."
  }
 ],
 "t5-intro": [
  {
   "q": "¿En qué se diferencian \"decrementa y vencerás\" y \"divide y vencerás\"?",
   "options": [
    "No hay diferencia: son sinónimos.",
    "El primero es más rápido siempre.",
    "El primero hace una sola llamada recursiva en cada caso recursivo (el problema reduce su tamaño); el segundo divide en varios subproblemas y combina sus soluciones.",
    "El primero usa bucles y el segundo recursión."
   ],
   "answer": 2,
   "why": "Ejemplos del tema 4 (una llamada) frente a mergesort o quicksort (varias)."
  },
  {
   "q": "¿Qué esquema sigue divide y vencerás?",
   "options": [
    "Resolver el problema entero y luego dividirlo.",
    "Transformar el problema en otro y no combinar nada.",
    "Probar todas las soluciones.",
    "Dividir el problema en subproblemas del mismo tipo, resolverlos y combinar sus soluciones en la solución del original."
   ],
   "answer": 3,
   "why": "Puede requerir una operación adicional al combinar."
  },
  {
   "q": "¿Cuál es una ventaja de divide y vencerás citada en el tema?",
   "options": [
    "Evita las llamadas recursivas.",
    "Garantiza coste constante.",
    "Siempre usa menos memoria.",
    "Puede aumentar la eficiencia, permite paralelismo (subproblemas en distintos procesadores) y hace un uso eficiente de la caché."
   ],
   "answer": 3,
   "why": "Muchos algoritmos importantes se basan en él, como la FFT."
  }
 ],
 "t5-transforma": [
  {
   "q": "¿Qué es \"transforma y vencerás\"?",
   "options": [
    "Dividir el problema en dos mitades.",
    "Resolver un problema convirtiéndolo en otro más simple, conocido o con algoritmos eficientes (una reducción).",
    "Resolver con fuerza bruta.",
    "Quitar un elemento del problema."
   ],
   "answer": 1,
   "why": "Esquema: problema A $\\to$ transformación $\\to$ problema B $\\to$ solución de B $\\to$ paso sencillo $\\to$ solución de A."
  },
  {
   "q": "Para hallar la **mediana** de un array desordenado con esta estrategia, ¿qué se hace y cuánto cuesta?",
   "options": [
    "Se calcula en $\\Theta(1)$.",
    "Se ordena el array ($\\Theta(n\\log n)$) y se toma el elemento central, o la media de los dos centrales si $n$ es par.",
    "Se suman todos los elementos y se divide entre $n$.",
    "Se busca el máximo $n/2$ veces."
   ],
   "answer": 1,
   "why": "Existen algoritmos más eficientes, como Quickselect."
  },
  {
   "q": "¿En qué problema se transforma el cálculo de $\\sqrt a$?",
   "options": [
    "En buscar el máximo de $a$.",
    "En hallar un cero de la función $x^2-a$.",
    "En multiplicar matrices.",
    "En ordenar una lista."
   ],
   "answer": 1,
   "why": "Se resuelve con Newton-Raphson o con bipartición."
  },
  {
   "q": "En la estimación de $\\pi$, ¿qué se hace?",
   "options": [
    "Se mide un círculo físico.",
    "Se aproxima el círculo con polígonos regulares cuyo número de lados se duplica; los perímetros dan $\\frac{p_i}{2R}\\le\\pi\\le\\frac{p_c}{2R}$.",
    "Se resuelve con una integral exacta.",
    "Se usa el algoritmo de Euclides."
   ],
   "answer": 1,
   "why": "El perímetro de un polígono con el doble de lados se obtiene fácilmente a partir del anterior."
  }
 ],
 "t5-newton": [
  {
   "q": "¿Cuál es la regla del método de Newton-Raphson?",
   "options": [
    "$x_{n+1}=\\dfrac{f(x_n)}{f'(x_n)}$",
    "$x_{n+1}=x_n+f(x_n)\\,f'(x_n)$",
    "$x_{n+1}=x_n-f'(x_n)$",
    "$x_{n+1}=x_n-\\dfrac{f(x_n)}{f'(x_n)}$"
   ],
   "answer": 3,
   "why": "Es el corte con el eje de abscisas de la recta tangente en $(x_n,f(x_n))$."
  },
  {
   "q": "Para $\\sqrt a$, con $f(x)=x^2-a$, la regla queda...",
   "options": [
    "$x_{n+1}=\\dfrac{x_n+a}{2}$",
    "$x_{n+1}=\\dfrac{a}{x_n}$",
    "$x_{n+1}=\\dfrac{x_n^2+a}{2x_n}$",
    "$x_{n+1}=x_n^2-a$"
   ],
   "answer": 2,
   "why": "Es $x_n-\\frac{x_n^2-a}{2x_n}$; para $a=13$ y $x_0=13$ se llega a $3{,}6055\\ldots$ en pocos pasos."
  },
  {
   "q": "En la factorización LU, ¿por qué se prefiere a calcular $A^{-1}$ para resolver $Ax=b$?",
   "options": [
    "Porque $A^{-1}$ no existe nunca.",
    "Porque $A^{-1}$ da errores de precisión y puede ser densa aunque $A$ no lo sea; con $A=LU$ se resuelven dos sistemas triangulares, $Ly=b$ y $Ux=y$.",
    "Porque LU es de coste $O(n)$.",
    "Porque LU sólo sirve para matrices diagonales."
   ],
   "answer": 1,
   "why": "Ambas se calculan en $O(n^3)$; la ventaja es numérica y de estructura."
  }
 ],
 "t5-dyv": [
  {
   "q": "Para el máximo de una lista con divide y vencerás, ¿cuál es la recurrencia y su solución?",
   "options": [
    "$T(n)=1+T(n/2)$, que da $\\Theta(\\log n)$.",
    "$T(n)=2T(n-1)$, que da $\\Theta(2^n)$.",
    "$T(n)=1+2T(n/2)$ con $T(1)=1$, que da $T(n)=2n-1\\in\\Theta(n)$.",
    "$T(n)=n+2T(n/2)$, que da $\\Theta(n\\log n)$."
   ],
   "answer": 2,
   "why": "Se divide por la mitad pero hay que resolver dos problemas, y la exponencial y el logaritmo se cancelan: el árbol tiene $2n-1$ nodos."
  },
  {
   "q": "¿Podría haber un algoritmo para el máximo más eficiente que una búsqueda lineal?",
   "options": [
    "No: el problema tiene una cota inferior $\\Omega(n)$, porque hay que procesar todos los elementos.",
    "Sí, con tiempo constante.",
    "Sí, uno de coste $\\Theta(\\log n)$ dividiendo siempre por la mitad.",
    "Sí, con divide y vencerás en tiempo $O(\\log n)$."
   ],
   "answer": 0,
   "why": "El tamaño de la entrada ya es $n$: no se puede mirar menos."
  },
  {
   "q": "¿Cuál es la combinación en el máximo por mitades?",
   "options": [
    "$x+y$",
    "$\\max\\{x,y\\}$, siendo $x$ e $y$ los máximos de las dos mitades.",
    "No hay combinación.",
    "$x\\cdot y$"
   ],
   "answer": 1,
   "why": "Caso base: $n=1$ devuelve $a_0$."
  }
 ],
 "t5-ordenacion": [
  {
   "q": "¿Qué descomposición usa cada algoritmo de ordenación recursivo del tema?",
   "options": [
    "Insert-sort quita el último, select-sort quita el menor y merge-sort divide en dos mitades.",
    "Los tres quitan el primer elemento.",
    "Insert-sort divide en dos mitades, select-sort quita el último y merge-sort quita el menor.",
    "Los tres dividen en dos mitades."
   ],
   "answer": 0,
   "why": "La descomposición que escojamos determina el algoritmo."
  },
  {
   "q": "¿Cuál es el coste de merge-sort?",
   "options": [
    "$\\Theta(\\log n)$.",
    "$\\Theta(n)$ en el mejor caso.",
    "$T(n)=n+2T(n/2)$, que da $\\Theta(n\\log n)$ en todos los casos (mejor, peor y medio).",
    "$\\Theta(n^2)$ en el peor caso."
   ],
   "answer": 2,
   "why": "Incluso con división en 10% y 90% el orden sigue siendo $\\Theta(n\\log n)$."
  },
  {
   "q": "¿Dónde está el trabajo de merge-sort?",
   "options": [
    "En ordenar cada mitad por separado, sin mezclar.",
    "En el caso base.",
    "En la combinación: mezclar dos listas ordenadas.",
    "En la descomposición: elegir un pivote."
   ],
   "answer": 2,
   "why": "La mezcla toma el menor de las cabezas de las dos listas, repetidamente."
  },
  {
   "q": "¿Qué es la memoria auxiliar \"out-of-place\" en la ordenación?",
   "options": [
    "Que se ordena en el propio vector.",
    "Que no necesita memoria.",
    "Que se necesita un vector auxiliar de tamaño $n$: la ordenación no se realiza en el propio vector.",
    "Que la lista se guarda en disco."
   ],
   "answer": 2,
   "why": "\"In-place\" es la ordenación realizada en el propio vector."
  }
 ],
 "t5-quick": [
  {
   "q": "En quicksort, ¿cómo se divide la lista?",
   "options": [
    "Se escoge un pivote y se coloca la parte con elementos menores o iguales a la izquierda, el pivote, y los mayores a la derecha; luego se ordenan ambas partes recursivamente.",
    "Se quita el menor.",
    "Se cuentan las apariciones de cada valor.",
    "Se parte por la mitad y se mezcla."
   ],
   "answer": 0,
   "why": "La combinación es trivial: tras las llamadas recursivas la lista ya está ordenada."
  },
  {
   "q": "¿Cuál es el coste de quicksort en el mejor y el peor caso?",
   "options": [
    "Mejor $\\Theta(n\\log n)$ (pivote en la mitad); peor $\\Theta(n^2)$ (un subvector siempre vacío).",
    "$\\Theta(n\\log n)$ en ambos.",
    "$\\Theta(n^2)$ en ambos.",
    "Mejor $\\Theta(n)$ y peor $\\Theta(n\\log n)$."
   ],
   "answer": 0,
   "why": "El caso medio es $\\Theta(n\\log n)$; en la práctica suele superar a otros algoritmos por usar mejor la jerarquía de memoria."
  },
  {
   "q": "¿Qué hace la partición de Hoare?",
   "options": [
    "Ordena la lista entera.",
    "Coloca el pivote en su posición final recorriendo la lista desde los dos extremos e intercambiando elementos, y devuelve ese índice; es iterativa.",
    "Divide la lista en dos mitades iguales.",
    "Elimina el pivote de la lista."
   ],
   "answer": 1,
   "why": "También se usa en quickselect."
  },
  {
   "q": "¿Por qué **quickselect** no es estrictamente divide y vencerás?",
   "options": [
    "Porque no usa recursión.",
    "Porque ordena toda la lista.",
    "Porque no usa un pivote.",
    "Porque sólo hace una llamada recursiva: continúa únicamente en la parte donde puede estar el elemento buscado."
   ],
   "answer": 3,
   "why": "Su coste medio es $O(n)$ y el peor caso $O(n^2)$."
  }
 ],
 "t5-multiplicacion": [
  {
   "q": "En la multiplicación de números en binario, $x=a\\cdot2^m+b$ e $y=c\\cdot2^m+d$. ¿Cuántos productos recursivos hace la regla básica y cuántos la de Karatsuba?",
   "options": [
    "La básica 4 ($ac,ad,bc,bd$), $\\Theta(n^2)$; Karatsuba 3, $\\Theta(n^{\\log_23})$.",
    "Las dos 4.",
    "La básica 2 y Karatsuba 1.",
    "La básica 3 y Karatsuba 4."
   ],
   "answer": 0,
   "why": "Karatsuba obtiene $ad+bc$ como $(a+b)(c+d)-ac-bd$."
  },
  {
   "q": "¿Cuál es el orden de Karatsuba?",
   "options": [
    "$\\Theta(n^{\\log_23})=\\Theta(n^{1{,}585\\ldots})$",
    "$\\Theta(n\\log n)$",
    "$\\Theta(n^2)$",
    "$\\Theta(n^3)$"
   ],
   "answer": 0,
   "why": "Mejor que el $\\Theta(n^2)$ de la multiplicación \"lenta\"."
  },
  {
   "q": "La multiplicación de matrices por bloques (8 productos de $n/2\\times n/2$ y 4 sumas) tiene un coste...",
   "options": [
    "$\\Theta(n^2)$",
    "$\\Theta(n^3)$, por el teorema maestro ($a=8$, $b=2$, $n^{\\log_28}=n^3$).",
    "$\\Theta(n\\log n)$",
    "$\\Theta(n^{2{,}8})$"
   ],
   "answer": 1,
   "why": "Strassen reduce los productos a 7 y llega a $\\Theta(n^{\\log_27})\\approx n^{2{,}807}$."
  },
  {
   "q": "¿Cuántos productos de submatrices usa el algoritmo de Strassen?",
   "options": [
    "4",
    "6",
    "7 multiplicaciones (y 18 sumas), frente a 8 de la descomposición normal.",
    "8"
   ],
   "answer": 2,
   "why": "Sólo es más eficiente que la multiplicación ordinaria si las matrices son muy grandes."
  }
 ],
 "t5-otros": [
  {
   "q": "En el embaldosado con L-triominós de una cuadrícula $2^k\\times2^k$ con un cuadrado sin cubrir, ¿cómo se descompone?",
   "options": [
    "Se rellenan las filas una a una.",
    "Se divide en dos mitades de $n\\times n/2$.",
    "Se coloca un triominó en el centro y se hacen 4 llamadas recursivas con cuadrículas de lado $n/2$.",
    "Se ordenan las casillas."
   ],
   "answer": 2,
   "why": "Los casos base son cuadrículas $2\\times2$ con un cuadrado sin cubrir, que cubre un triominó."
  },
  {
   "q": "En la permutación de inversión de bits ($p$ bits, $2^p$ elementos), ¿qué se intercambia?",
   "options": [
    "El primer elemento con el último.",
    "Los elementos pares con los impares.",
    "Las dos mitades de la lista.",
    "$a_i$ con $a_j$, donde $j$ es $i$ con los bits invertidos (por ejemplo, con $p=3$: la posición 1 con la 4 y la 3 con la 6)."
   ],
   "answer": 3,
   "why": "Es parte de la FFT."
  },
  {
   "q": "¿Cuál de estas es una descomposición válida para la inversión de bits?",
   "options": [
    "Sumar los bits.",
    "Dividir en dos mitades, resolver cada una e **intercalar** los resultados; o separar posiciones pares e impares y **concatenar**.",
    "Quitar el primer elemento.",
    "Ordenar la lista y recorrerla."
   ],
   "answer": 1,
   "why": "El tema muestra dos descomposiciones recursivas y una tercera \"iterativa\"."
  }
 ],
 "t6-binario": [
  {
   "q": "¿Qué es el backtracking?",
   "options": [
    "Una forma de dividir el problema en mitades.",
    "Una estrategia que siempre elige la mejor opción local y no deshace decisiones.",
    "Un algoritmo de ordenación.",
    "Una estrategia que construye soluciones parciales que cumplen las restricciones, recorriendo el árbol en profundidad, y vuelve atrás si una solución parcial no se puede completar."
   ],
   "answer": 3,
   "why": "Es fuerza bruta \"inteligente\": la poda evita explorar todo el árbol."
  },
  {
   "q": "En el esquema binario de subconjuntos de $n$ elementos, ¿cuántas hojas tiene el árbol y qué representa cada una?",
   "options": [
    "$n^2$ hojas.",
    "$n!$ hojas, cada una una permutación.",
    "$2^n$ hojas, cada una un subconjunto; en cada nivel se decide si se incluye (1) o no (0) un elemento.",
    "$n$ hojas, una por elemento."
   ],
   "answer": 2,
   "why": "Por ejemplo, con la solución parcial `[1,0,1]` y los elementos $\\{a,b,c\\}$ se obtiene $\\{a,c\\}$."
  },
  {
   "q": "¿Cuál es el caso base del esquema binario?",
   "options": [
    "`sol[i] == 1`.",
    "No tiene caso base.",
    "`i == 0`.",
    "`i == len(elementos)`: la solución parcial está completa y se imprime."
   ],
   "answer": 3,
   "why": "Si no, se generan los candidatos $k\\in\\{0,1\\}$, se incluye en `sol[i]` y se llama con `i+1`."
  },
  {
   "q": "¿Por qué se reserva la memoria de la solución parcial en la función *wrapper*?",
   "options": [
    "Para poder devolver varias soluciones.",
    "Porque Python lo exige.",
    "Es más eficiente que usar una estructura que crece y decrece dinámicamente en cada llamada.",
    "Para que el árbol sea binario."
   ],
   "answer": 2,
   "why": "Ese esquema es bueno si los subconjuntos tienen cardinalidades diferentes."
  }
 ],
 "t6-subconjuntos": [
  {
   "q": "En el esquema \"un subconjunto en cada nodo\", ¿qué contiene la solución parcial?",
   "options": [
    "Los índices de los elementos que se van incluyendo: `[0,2]` es $\\{a,c\\}$.",
    "Sólo el último elemento.",
    "Los elementos ordenados.",
    "Valores 0 o 1 para cada elemento."
   ],
   "answer": 0,
   "why": "Por eso las soluciones parciales son también completas."
  },
  {
   "q": "¿Cuántos parámetros de posición hacen falta y cuáles son los candidatos?",
   "options": [
    "Ninguno.",
    "Uno: `i`; los candidatos son todos los elementos.",
    "Dos: `i` (posición de `sol` donde incluir) y `j` (índice del último candidato incluido); los candidatos son `j+1, ..., n-1`.",
    "Tres: `i`, `j` y `k`."
   ],
   "answer": 2,
   "why": "La raíz tiene $j=-1$. Se puede evitar `j` usando `sol[i-1]+1`."
  },
  {
   "q": "¿Cuándo es más eficiente este esquema que el binario?",
   "options": [
    "Si se buscan subconjuntos de la misma cardinalidad (en el nivel $i$ las soluciones tienen $i$ elementos).",
    "Si sólo hay un elemento.",
    "Nunca.",
    "Si se buscan subconjuntos de cualquier tamaño."
   ],
   "answer": 0,
   "why": "El árbol deja de ser binario y tiene exactamente $2^n$ nodos."
  }
 ],
 "t6-permutaciones": [
  {
   "q": "En las permutaciones, ¿para qué sirve la lista `libres`?",
   "options": [
    "Para guardar las permutaciones.",
    "Para ordenar los candidatos.",
    "Para comprobar en $O(1)$ si un elemento ya está en la solución parcial; sin ella habría que usar un bucle de $O(n)$.",
    "Para contar los elementos."
   ],
   "answer": 2,
   "why": "Es clave de cara a la eficiencia."
  },
  {
   "q": "Tras la llamada recursiva en `genera_permutaciones`, ¿qué hay que hacer con `libres[k]`?",
   "options": [
    "Volver a marcarlo como `True`, deshaciendo el cambio, porque la lista se pasa por referencia.",
    "Marcarlo como `False` definitivamente.",
    "Eliminarlo de la lista.",
    "Nada."
   ],
   "answer": 0,
   "why": "Si se pasara por valor no haría falta deshacer los cambios."
  },
  {
   "q": "¿Cuántas hojas tiene el árbol de permutaciones de $n$ elementos?",
   "options": [
    "$2^n$",
    "$n^2$",
    "$n$",
    "$n!$"
   ],
   "answer": 3,
   "why": "El primer nivel tiene $n$ candidatos, el segundo $n-1$, etc."
  },
  {
   "q": "¿Qué hace inefectiva la versión \"permutaciones ineficiente\"?",
   "options": [
    "No tiene caso base.",
    "Usa recursión.",
    "No genera todas las permutaciones.",
    "Comprueba la factibilidad de un candidato con un bucle sobre `sol` ($O(n)$) en vez de usar una lista booleana ($O(1)$)."
   ],
   "answer": 3,
   "why": "Las dos versiones generan lo mismo; cambia el coste de cada comprobación."
  }
 ],
 "t6-reinas": [
  {
   "q": "Para el problema de las $n$ reinas, ¿cómo se reduce el espacio de búsqueda?",
   "options": [
    "Se elimina la restricción de filas.",
    "Se coloca la primera reina al azar.",
    "Sólo se prueba la diagonal.",
    "De $2^{n^2}$ a $\\binom{n^2}{n}$, luego a $n^n$ (una por columna) y por último a $n!$ (también una por fila): hay que buscar permutaciones válidas."
   ],
   "answer": 3,
   "why": "Para $n=8$ se pasa de $1{,}84\\cdot10^{19}$ a $40320$."
  },
  {
   "q": "¿Cómo se indexan las diagonales para comprobarlas en $O(1)$ al colocar una reina en la fila `k` de la columna `i`?",
   "options": [
    "Con un bucle sobre las reinas ya colocadas.",
    "`i*k` y `i/k`.",
    "Diagonal principal `i-k+n-1` (de 0 a $2n-2$) y secundaria `i+k`.",
    "`i` y `k` solamente."
   ],
   "answer": 2,
   "why": "Se mantienen listas booleanas `pdiags_libres` y `sdiags_libres` de longitud $2n-1$."
  },
  {
   "q": "¿Qué se hace tras la llamada recursiva en `nreinas_todas`?",
   "options": [
    "Se vuelven a marcar libres la fila y las dos diagonales del candidato.",
    "Se imprime el tablero.",
    "Se elimina la reina de la solución parcial y se detiene la búsqueda.",
    "Nada."
   ],
   "answer": 0,
   "why": "Así el siguiente candidato del bucle encuentra el estado correcto."
  },
  {
   "q": "¿Para qué sirve podar el árbol de búsqueda en las $n$ reinas?",
   "options": [
    "Para ordenar las soluciones.",
    "Para encontrar soluciones que no existen.",
    "Para que el árbol sea binario.",
    "Para no explorar soluciones parciales que ya no pueden llegar a una solución válida, evitando llegar a las hojas."
   ],
   "answer": 3,
   "why": "Hasta encontrar la primera solución sólo se explora una pequeña parte del árbol."
  }
 ],
 "t6-suma-caballo": [
  {
   "q": "En la suma de subconjuntos, ¿qué mejora introduce el parámetro `suma_parcial`?",
   "options": [
    "Permite encontrar un solo subconjunto.",
    "Permite ordenar los elementos.",
    "Evita recalcular la suma en $O(n)$: se obtiene en $\\Theta(1)$.",
    "Evita la recursión."
   ],
   "answer": 2,
   "why": "Y permite podar: si `suma_parcial + k*L[i] > s`, no se expande esa rama."
  },
  {
   "q": "¿Qué esquema se usa para la suma de subconjuntos?",
   "options": [
    "Fuerza bruta sin poda.",
    "El binario, porque las soluciones son subconjuntos de tamaño variable.",
    "Permutaciones.",
    "Un subconjunto en cada nodo."
   ],
   "answer": 1,
   "why": "Se imprime la solución cuando `suma_parcial == s`."
  },
  {
   "q": "En la ruta del caballo, ¿cómo se representan los 8 saltos posibles?",
   "options": [
    "Con una permutación.",
    "Con ocho funciones distintas.",
    "Con una lista de casillas visitadas.",
    "Con una lista de incrementos a las coordenadas: `(1,-2), (2,-1), (2,1), (1,2), (-1,2), (-2,1), (-2,-1), (-1,-2)`."
   ],
   "answer": 3,
   "why": "Se recorre la lista probando cada salto que caiga dentro del tablero y en una casilla no visitada."
  },
  {
   "q": "¿Por qué la ruta del caballo es difícil de resolver con backtracking en tableros grandes?",
   "options": [
    "Porque no existe solución en ningún tablero.",
    "Hay que encontrar una permutación de $n^2$ casillas con restricciones muy complejas; para tableros mayores de $6\\times6$ tarda en hallar una solución.",
    "Porque el caballo no puede saltar.",
    "Porque hay que volver a la casilla inicial."
   ],
   "answer": 1,
   "why": "No se exige una ruta cerrada, pero el espacio de búsqueda sigue siendo enorme."
  }
 ],
 "t6-otros": [
  {
   "q": "En el laberinto, ¿por qué no sirven el esquema de permutaciones ni el de subconjuntos?",
   "options": [
    "Porque no hay caso base.",
    "Porque no hay restricciones.",
    "Porque el laberinto es binario.",
    "Porque el camino puede tener longitud variable y el orden de las celdas importa; se exploran las 4 direcciones desde cada celda en un orden fijo."
   ],
   "answer": 3,
   "why": "Se usa un esquema distinto: desde $(c,f)$ hay cuatro subproblemas."
  },
  {
   "q": "En el sudoku, ¿cuál es la solución parcial y cómo se expande?",
   "options": [
    "Un conjunto de filas.",
    "Un árbol binario.",
    "El propio tablero; se expande, por ejemplo, fila a fila, probando dígitos que no repitan fila, columna ni caja $3\\times3$.",
    "Una lista de 81 dígitos aleatorios."
   ],
   "answer": 2,
   "why": "Con una función `avanza(fila, col)` se pasa a la siguiente casilla."
  },
  {
   "q": "En la mochila 0-1 con backtracking, ¿cuándo se poda?",
   "options": [
    "Cuando el valor es 0.",
    "Nunca se poda.",
    "Cuando se han considerado todos los objetos.",
    "Cuando la capacidad restante sería negativa: `k*p[i] > C_restante`."
   ],
   "answer": 3,
   "why": "En cada nodo $(X,Y)$ guarda capacidad restante y beneficio parcial; la rama 1 resta $p_i$ y suma $v_i$."
  },
  {
   "q": "Como la mochila es un problema de **optimización**, ¿cuántas soluciones se analizan?",
   "options": [
    "Todas las factibles, quedándose con la mejor (`v_opt` y `sol_opt`).",
    "Ninguna: se calcula directamente.",
    "Sólo las de mayor peso.",
    "Sólo la primera."
   ],
   "answer": 0,
   "why": "Se buscan todas porque no se sabe cuál será la óptima hasta explorar el árbol."
  }
 ],
 "t6-poda": [
  {
   "q": "¿Qué añade la **ramificación y poda** al backtracking?",
   "options": [
    "Una poda adicional por valor: si el máximo valor que puede alcanzar una rama no supera el mejor valor ya encontrado, se descarta.",
    "El uso de listas booleanas.",
    "Una poda por capacidad.",
    "Una búsqueda en anchura."
   ],
   "answer": 0,
   "why": "Es un método exacto para problemas de optimización duros."
  },
  {
   "q": "En la mochila 0-1 con ramificación y poda, ¿cómo se actualiza el máximo valor alcanzable `max_v` al decidir sobre el objeto $i$?",
   "options": [
    "Si no se incluye, baja en $v_i$; si se incluye, no cambia.",
    "Sube en $v_i$.",
    "Se pone a 0.",
    "Siempre baja en $v_i$."
   ],
   "answer": 0,
   "why": "En la raíz `max_v` es la suma de todos los beneficios (23 en el ejemplo)."
  },
  {
   "q": "¿Qué hay que añadir a un backtracking de optimización?",
   "options": [
    "Dos parámetros: la mejor solución y el mejor valor hallados hasta el momento; y pensar si se puede podar por valor.",
    "Una lista de permutaciones.",
    "Un parámetro con el número de soluciones.",
    "Nada."
   ],
   "answer": 0,
   "why": "Si sólo se busca una solución, basta una variable booleana de \"solución encontrada\" para detener la búsqueda."
  },
  {
   "q": "Antes de programar un backtracking, ¿qué pregunta conviene hacerse primero?",
   "options": [
    "Cuántas líneas tendrá el código.",
    "Si las soluciones son permutaciones, subconjuntos u otra cosa: si lo son, se usan los esquemas vistos, que son claros y eficientes.",
    "Si la solución es única.",
    "Si el lenguaje soporta recursión."
   ],
   "answer": 1,
   "why": "También: ¿se pueden acelerar cálculos usando estructuras de datos? ¿se busca una solución o todas?"
  }
 ],
 "t7-esquema": [
  {
   "q": "¿En qué consiste un algoritmo voraz?",
   "options": [
    "En tomar en cada paso la decisión localmente óptima, sin poder deshacerla después, con la esperanza de llegar a un óptimo global.",
    "En probar todas las soluciones y quedarse con la mejor.",
    "En dividir el problema en subproblemas y combinar.",
    "En volver atrás cuando una decisión falla."
   ],
   "answer": 0,
   "why": "Son rápidos y fáciles de implementar, pero no siempre dan la solución óptima."
  },
  {
   "q": "¿Cuál de estas NO es una de las funciones de un algoritmo voraz?",
   "options": [
    "Función de ordenación de las soluciones.",
    "Función de selección.",
    "Función objetivo.",
    "Función de factibilidad."
   ],
   "answer": 0,
   "why": "Los elementos son: conjunto de candidatos, selección, factibilidad, objetivo y solución."
  },
  {
   "q": "¿Qué hace la función de **factibilidad**?",
   "options": [
    "Elige el mejor candidato.",
    "Decide el valor de la solución.",
    "Comprueba si añadir un candidato a la solución parcial sigue siendo válido.",
    "Indica si se ha terminado."
   ],
   "answer": 2,
   "why": "Si el candidato no es factible, se desecha."
  },
  {
   "q": "¿Cuál es una desventaja de los algoritmos voraces?",
   "options": [
    "Un óptimo local no implica un óptimo global; y es difícil encontrar la función de selección que garantice la elección óptima.",
    "Son muy lentos.",
    "Son difíciles de implementar.",
    "No sirven para problemas de optimización."
   ],
   "answer": 0,
   "why": "Para ciertos problemas se puede demostrar que una estrategia voraz concreta sí es óptima."
  }
 ],
 "t7-camino": [
  {
   "q": "En el camino más corto entre $v_0$ y $v_n$ (sólo hay caminos entre vértices adyacentes), ¿qué ocurre con la estrategia \"coger el arco más corto en cada paso\"?",
   "options": [
    "Da siempre el camino más largo.",
    "Sólo es óptima con tres vértices.",
    "Es óptima: se demuestra por contradicción.",
    "No es óptima: hay un contraejemplo."
   ],
   "answer": 2,
   "why": "Como entre vértices consecutivos las elecciones son independientes, la suma de los mínimos es el mínimo."
  },
  {
   "q": "Y en el grafo por etapas donde cada vértice se conecta con cualquiera de la etapa siguiente, la misma estrategia...",
   "options": [
    "No se puede aplicar.",
    "Es óptima también.",
    "No es óptima: la voraz da una longitud de 23 y la óptima es 7.",
    "Da 7 y la óptima es 23."
   ],
   "answer": 2,
   "why": "Elegir el arco más corto ahora puede obligar a coger después arcos muy largos."
  },
  {
   "q": "¿Cómo se demuestra que una estrategia voraz **no** es óptima?",
   "options": [
    "Por contradicción siempre.",
    "Con una gráfica.",
    "Con un contraejemplo.",
    "Con una simulación."
   ],
   "answer": 2,
   "why": "Para demostrar que lo es hace falta una prueba (a menudo por contradicción)."
  }
 ],
 "t7-monedas": [
  {
   "q": "En el cambio de monedas, ¿cuál es la función de selección voraz?",
   "options": [
    "Una moneda al azar.",
    "La moneda más frecuente.",
    "La moneda de valor más alto que no supere lo que queda por devolver.",
    "La moneda de menor valor."
   ],
   "answer": 2,
   "why": "Para 2,24 € con monedas de 2, 1, 0,5, 0,2, 0,1, 0,05, 0,02 y 0,01 se obtienen 4 monedas."
  },
  {
   "q": "¿Es óptima siempre esa estrategia?",
   "options": [
    "Sí, siempre.",
    "Nunca es óptima.",
    "No: depende del sistema monetario; con una moneda de 0,12 € para devolver 2,24 € da 4 monedas y la óptima es 3 (2 + 0,12 + 0,12).",
    "Sólo con monedas de 1 céntimo."
   ],
   "answer": 2,
   "why": "Con las monedas del euro sí lo es."
  },
  {
   "q": "¿Cuál es la función de **factibilidad** en el cambio de monedas?",
   "options": [
    "Que se use el mínimo de monedas.",
    "Que la suma de las monedas elegidas no supere la cantidad $X$ a devolver.",
    "Que la suma sea cero.",
    "Que todas las monedas sean distintas."
   ],
   "answer": 1,
   "why": "La función objetivo es minimizar el número de monedas."
  }
 ],
 "t7-tiempo-mezcla": [
  {
   "q": "Para minimizar el tiempo total en el sistema de $n$ clientes con tiempos $t_i$, ¿qué estrategia es óptima?",
   "options": [
    "Atender al azar.",
    "Atender por orden decreciente de $t_i$.",
    "Atender por orden creciente de $t_i$.",
    "Atender primero al que tarde más."
   ],
   "answer": 2,
   "why": "Con $t=(5,10,3)$, el orden $3,1,2$ da 29, el mejor de todos."
  },
  {
   "q": "En $T(P)=\\sum_{k=1}^{n}(n-k+1)s_k$, ¿qué indica el coeficiente $n-k+1$?",
   "options": [
    "El tiempo de cada cliente.",
    "El número de clientes ya atendidos.",
    "La posición del cliente en la cola de espera.",
    "El primer cliente atendido cuenta $n$ veces (todos esperan por él), el segundo $n-1$, etc.; por eso el menor tiempo debe ir primero."
   ],
   "answer": 3,
   "why": "Haciendo $s_1$ lo menor posible, luego $s_2$, etc., se minimiza $T$."
  },
  {
   "q": "Para mezclar $m$ listas ordenadas por parejas con el menor número de operaciones, ¿qué estrategia voraz se usa?",
   "options": [
    "Mezclar en cada momento las dos listas de menor tamaño.",
    "Mezclar siempre la primera con la segunda.",
    "Mezclar las dos más grandes.",
    "Mezclar al azar."
   ],
   "answer": 0,
   "why": "Con tamaños 10, 20 y 30: $10+20=30$ y luego $30+30=60$, total 90, mejor que 100 o 110."
  }
 ],
 "t7-huffman": [
  {
   "q": "En los códigos de Huffman, ¿qué estrategia voraz se sigue?",
   "options": [
    "Asignar a cada carácter un código de longitud fija.",
    "Fusionar los dos árboles de mayor frecuencia.",
    "Fusionar repetidamente los dos árboles de menor frecuencia, hasta obtener un único árbol.",
    "Ordenar por orden alfabético."
   ],
   "answer": 2,
   "why": "Se usa una cola de árboles con prioridades; los caracteres de menor frecuencia terminan con códigos más largos."
  },
  {
   "q": "¿Cómo se obtiene el código de un carácter?",
   "options": [
    "Con su posición en la cola.",
    "Con su código ASCII.",
    "Con su frecuencia en binario.",
    "Con el camino desde la raíz hasta su hoja: 0 si se va por la izquierda y 1 si se va por la derecha."
   ],
   "answer": 3,
   "why": "Los caracteres más frecuentes quedan más cerca de la raíz y tienen códigos más cortos."
  },
  {
   "q": "En el ejemplo de 100000 caracteres con 6 símbolos, 3 bits por carácter son 300000 bits. ¿Y con Huffman?",
   "options": [
    "100000 bits.",
    "600000 bits.",
    "300000 bits también.",
    "224000 bits."
   ],
   "answer": 3,
   "why": "Los códigos de longitud variable asignan 1 bit a `a` (la más frecuente) y 3 o 4 bits a las demás."
  },
  {
   "q": "¿Qué minimiza un código de Huffman?",
   "options": [
    "La longitud del código más largo.",
    "El tamaño del árbol.",
    "El número de caracteres distintos.",
    "El promedio de bits necesarios para representar los objetos, según sus frecuencias."
   ],
   "answer": 3,
   "why": "Es un método de compresión de datos."
  }
 ],
 "t7-mochila-1": [
  {
   "q": "En la mochila de la versión 1 (maximizar el **número** de objetos que caben), ¿qué estrategia voraz es óptima?",
   "options": [
    "Al azar.",
    "Por orden decreciente de peso.",
    "Por mayor valor.",
    "Escoger los objetos por orden creciente de peso."
   ],
   "answer": 3,
   "why": "Con $C=15$ y $p=(9,5,6,4)$: creciente da 3 objetos (4+5+6) y decreciente sólo 2 (9+6)."
  },
  {
   "q": "En la versión 2 (maximizar el **peso** que cabe), ¿qué ocurre con las estrategias por peso creciente o decreciente?",
   "options": [
    "La decreciente siempre es óptima.",
    "Las dos son óptimas.",
    "Ninguna es óptima ni mejor que la otra.",
    "La creciente siempre es óptima."
   ],
   "answer": 2,
   "why": "Con $C=15$ y $p=(9,6,5)$ la decreciente da 15 y la creciente 11; con $p=(10,7,6)$ la decreciente da 10 y la creciente 13."
  },
  {
   "q": "Las versiones 1 y 2 de la mochila son problemas de...",
   "options": [
    "programación lineal entera ($x_i\\in\\{0,1\\}$).",
    "ordenación.",
    "programación lineal continua.",
    "programación convexa."
   ],
   "answer": 0,
   "why": "Las variables sólo pueden valer 0 o 1."
  }
 ],
 "t7-mochila-3": [
  {
   "q": "En la mochila con **fracciones** ($0\\le x_i\\le1$), ¿qué función de selección es óptima?",
   "options": [
    "El de mayor valor.",
    "El de menor peso.",
    "El de mayor peso.",
    "Escoger el objeto con mayor valor por unidad de peso $v_i/p_i$."
   ],
   "answer": 3,
   "why": "Con $C=100$ y los datos del ejemplo, por $v_i/p_i$ se obtiene 164, frente a 146 por valor y 156 por peso."
  },
  {
   "q": "En el ejemplo $p=(10,20,30,40,50)$, $v=(20,30,66,40,60)$, ¿qué objeto tiene el mejor cociente $v_i/p_i$?",
   "options": [
    "El 1, con 2,0.",
    "El 5, con 1,2.",
    "El 4, con 1,0.",
    "El 3, con $66/30=2{,}2$."
   ],
   "answer": 3,
   "why": "Luego van el 1 (2,0) y el 2 (1,5), y el último objeto entra de forma parcial (0,8 del objeto 5)."
  },
  {
   "q": "¿Por qué la mochila 0-1 (sin fracciones) no se resuelve con la estrategia por $v_i/p_i$?",
   "options": [
    "Porque $v_i/p_i$ no está definido.",
    "Es un problema NP-completo; la estrategia óptima para fracciones puede no serlo si los objetos no se pueden partir.",
    "Porque siempre es óptima.",
    "Porque no tiene función objetivo."
   ],
   "answer": 1,
   "why": "Para la mochila 0-1 se usa, por ejemplo, backtracking."
  }
 ],
 "t7-arm": [
  {
   "q": "Un árbol libre con $n$ vértices tiene...",
   "options": [
    "$n$ aristas.",
    "$n^2$ aristas.",
    "$n-1$ aristas, y es un grafo conexo y acíclico.",
    "tantas aristas como se quiera."
   ],
   "answer": 2,
   "why": "Si se añade una arista se crea un ciclo y si se quita una, quedan vértices sin conectar."
  },
  {
   "q": "¿Cuál es la **propiedad fundamental** de los árboles de recubrimiento de coste mínimo?",
   "options": [
    "Todos los árboles de coste mínimo son iguales.",
    "Dado un conjunto $U\\subset V$ no vacío, la arista más pequeña entre un vértice de $U$ y otro fuera de $U$ está en algún árbol de coste mínimo.",
    "La arista más larga siempre está.",
    "La arista más pequeña del grafo nunca está."
   ],
   "answer": 1,
   "why": "Se demuestra por reducción al absurdo; Prim y Kruskal la aplican."
  },
  {
   "q": "¿Qué hace Kruskal en cada paso?",
   "options": [
    "Selecciona la arista de mayor peso.",
    "Selecciona la arista de menor peso que no forme un ciclo con las ya elegidas; para al llegar a $|V|-1$ aristas.",
    "Selecciona la arista de menor peso que salga de un vértice.",
    "Añade un vértice nuevo."
   ],
   "answer": 1,
   "why": "Parte del árbol vacío y no requiere ninguna condición sobre los extremos más allá de no crear ciclos."
  },
  {
   "q": "¿Y Prim?",
   "options": [
    "Parte de un vértice y añade la arista mínima que une un vértice ya tratado con uno que no lo está.",
    "Ordena todas las aristas y toma las menores.",
    "Elige aristas al azar.",
    "Quita aristas hasta que no queden ciclos."
   ],
   "answer": 0,
   "why": "Mantiene un conjunto $U$ de vértices tratados."
  },
  {
   "q": "El árbol de recubrimiento de coste mínimo de un grafo...",
   "options": [
    "No tiene por qué ser único.",
    "No existe en grafos conexos.",
    "Es siempre único.",
    "Es siempre el camino más corto."
   ],
   "answer": 0,
   "why": "Puede haber varios con la misma suma de pesos."
  }
 ],
 "t7-dijkstra": [
  {
   "q": "¿Qué calcula el algoritmo de Dijkstra?",
   "options": [
    "El árbol de recubrimiento mínimo.",
    "El ciclo hamiltoniano.",
    "El camino más largo.",
    "Los caminos mínimos desde un vértice origen al resto, en un grafo ponderado no negativamente."
   ],
   "answer": 3,
   "why": "Sirve en grafos dirigidos y no dirigidos (en estos, cada arista se sustituye por dos con el mismo peso)."
  },
  {
   "q": "¿Qué diferencia a Dijkstra de Prim?",
   "options": [
    "Que Dijkstra no usa aristas.",
    "No hay diferencia.",
    "Dijkstra tiene en cuenta todo el camino desde el origen hasta el nuevo vértice, no sólo la longitud de la nueva arista.",
    "Que Prim usa pesos negativos y Dijkstra no."
   ],
   "answer": 2,
   "why": "En cada paso inserta el vértice con menor longitud desde el origen."
  },
  {
   "q": "Tras insertar un vértice $v_{sig}$ en $T$, ¿qué hace Dijkstra?",
   "options": [
    "Ordena todas las aristas.",
    "Borra $v_{sig}$.",
    "Vuelve a empezar desde el origen.",
    "Recalcula las distancias de los nodos conectados a $v_{sig}$: $d_x\\leftarrow\\min[d_x,\\,d_{v_{sig}}+w(v_{sig},x)]$."
   ],
   "answer": 3,
   "why": "Es una estrategia voraz óptima porque siempre se inserta el vértice con menor $d$."
  },
  {
   "q": "En el ejemplo de 5 vértices con origen 0, ¿cuál es la distancia final al vértice 4?",
   "options": [
    "15",
    "40",
    "20",
    "30, por el camino $0,2,1,4$."
   ],
   "answer": 3,
   "why": "Primero entra el 2 ($d=10$), luego el 1 ($d=15$) y el 4 se alcanza por el 1: $15+15=30$, mejor que $10+30=40$ por el 2."
  }
 ],
 "t7-kmedias": [
  {
   "q": "¿Qué minimiza el algoritmo K-medias?",
   "options": [
    "La suma de las distancias euclídeas al cuadrado entre cada dato y su centroide.",
    "La distancia entre los centroides.",
    "El número de grupos.",
    "El número de datos."
   ],
   "answer": 0,
   "why": "Es un problema no convexo y no hay fórmula analítica, así que se recurre a un algoritmo iterativo."
  },
  {
   "q": "¿Cuáles son los dos pasos que se repiten?",
   "options": [
    "(A) Elegir $K$; (B) contar los puntos.",
    "(A) Ordenar los datos; (B) dividirlos en mitades.",
    "(A) Calcular el gradiente; (B) detener.",
    "(A) Asignar cada punto al centroide más cercano; (B) mover cada centroide a la media de los puntos asignados."
   ],
   "answer": 3,
   "why": "Se repite hasta que los centroides no varían."
  },
  {
   "q": "¿Garantiza K-medias el óptimo global?",
   "options": [
    "Sí, siempre.",
    "Sólo con datos ordenados.",
    "No: converge a un óptimo local, por eso se ejecuta varias veces con distintas inicializaciones.",
    "Sólo si $K=1$."
   ],
   "answer": 2,
   "why": "Además asume clusters \"esféricos\", lo que es poco realista."
  },
  {
   "q": "¿Qué se necesita decidir antes de ejecutar K-medias?",
   "options": [
    "Las clases de cada dato.",
    "El orden de los puntos.",
    "El número $K$ de grupos y los centroides iniciales (aleatorios o datos concretos).",
    "El número de dimensiones."
   ],
   "answer": 2,
   "why": "En clustering no hay información de clases."
  }
 ]
};
window.LADDER = {
 "exam": {
  "id": "peldanos",
  "title": "Peldaños",
  "durationMin": null,
  "exercises": [
   {
    "id": "peldanos#A01",
    "n": "A01",
    "title": "Qué término manda",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.2,
    "steps": true,
    "statement": "Sea $T(n)=\\tfrac12n^{2}+2000n+50000$.\n- a) Calcula $T(n)/n^{2}$ para $n=10$, $n=100$, $n=10^{4}$ y $n=10^{6}$.\n- b) ¿A qué número parece acercarse ese cociente? ¿Qué término de $T$ explica ese número?\n- c) ¿A partir de qué $n$ el término $\\tfrac12n^{2}$ supera a $2000n+50000$?",
    "hint": "En a) divide cada término entre $n^{2}$: $\\frac12+\\frac{2000}{n}+\\frac{50000}{n^{2}}$. En c) pasa todo a un lado y resuelve la ecuación de segundo grado.",
    "solution": "**Paso 1. Calcula los cocientes.** $T(n)/n^{2}=\\tfrac12+\\tfrac{2000}{n}+\\tfrac{50000}{n^{2}}$ vale $700{,}5$ para $n=10$, $25{,}5$ para $n=100$, $0{,}7005$ para $n=10^{4}$ y $0{,}502$ para $n=10^{6}$.\n\n**Paso 2. Interpreta.** Se acerca a $\\tfrac12$: los términos con $\\frac{2000}{n}$ y $\\frac{50000}{n^{2}}$ se hacen despreciables. Manda el término cuadrático: $T(n)$ crece como $\\tfrac12n^{2}$.\n\n**Paso 3. El cruce.** $\\tfrac12n^{2}>2000n+50000\\iff n^{2}-4000n-100000>0$. La raíz positiva es $\\frac{4000+\\sqrt{16\\,400\\,000}}{2}\\approx4024{,}8$, así que desde $n=4025$ manda el cuadrático. Para $n$ pequeños mandan los otros términos, pero la notación asintótica solo mira $n$ grandes."
   },
   {
    "id": "peldanos#A02",
    "n": "A02",
    "title": "Comparar con límites",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "La regla: $f<g$ (asintóticamente) cuando $\\displaystyle\\lim_{n\\to\\infty}\\frac{f(n)}{g(n)}=0$; si el límite es una constante positiva, tienen el mismo orden. Compara cada pareja con $<$, $>$ o \"mismo orden\":\n- a) $n$ y $n^{2}$\n- b) $n\\log_2 n$ y $n$\n- c) $3n^{2}+n$ y $n^{2}$\n- d) $2^{n}$ y $n^{100}$\n- e) $\\log_2 n$ y $\\log_{10}n$",
    "hint": "Calcula el límite del primero entre el segundo. Si te sale $\\infty/\\infty$, usa L'Hôpital o simplifica. En e) recuerda el cambio de base.",
    "solution": "**Paso 1. a).** $\\frac{n}{n^{2}}=\\frac1n\\to0$: $n<n^{2}$.\n\n**Paso 2. b).** $\\frac{n\\log_2n}{n}=\\log_2n\\to\\infty$: $n\\log_2n>n$.\n\n**Paso 3. c).** $\\frac{3n^{2}+n}{n^{2}}=3+\\frac1n\\to3$: mismo orden.\n\n**Paso 4. d).** Es más cómodo el cociente al revés: $\\frac{n^{100}}{2^{n}}\\to0$ (L'Hôpital 100 veces, o recordando que un exponencial gana a cualquier polinomio). Por tanto $2^{n}>n^{100}$.\n\n**Paso 5. e).** $\\log_2n=\\frac{\\log_{10}n}{\\log_{10}2}$, así que el cociente vale la constante $\\frac{1}{\\log_{10}2}\\approx3{,}32$: mismo orden. La base de los logaritmos no importa."
   },
   {
    "id": "peldanos#A03",
    "n": "A03",
    "title": "Ordenar funciones",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "Ordena de menor a mayor orden de crecimiento:\n$$n\\log_2n,\\quad n^{2},\\quad 2^{n},\\quad \\log_2n,\\quad n,\\quad n!,\\quad n^{3},\\quad \\sqrt n$$",
    "hint": "Si dudas entre dos, sustituye un $n$ grande, por ejemplo $n=32$ ($\\log_2 32=5$, $\\sqrt{32}\\approx5{,}7$), o calcula su cociente con un límite.",
    "solution": "**Paso 1. Los pequeños.** $\\log_2n<\\sqrt n<n$. Con $n=32$: $5<5{,}7<32$. Un logaritmo crece más despacio que cualquier potencia $n^{a}$ con $a>0$.\n\n**Paso 2. Los polinómicos.** $n<n\\log_2n<n^{2}<n^{3}$. Con $n=32$: $32<160<1024<32768$.\n\n**Paso 3. Los que explotan.** $n^{3}<2^{n}<n!$. Con $n=32$: $32\\,768<4{,}29\\cdot10^{9}<2{,}6\\cdot10^{35}$.\n\n**Paso 4. Resultado.**\n$$\\log_2n<\\sqrt n<n<n\\log_2n<n^{2}<n^{3}<2^{n}<n!$$"
   },
   {
    "id": "peldanos#A04",
    "n": "A04",
    "title": "Entre dos potencias",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Ordena de menor a mayor: $n^{2}\\log_2 n$, $n^{1{,}5}$, $n^{2{,}5}$, $n\\log_2n$, $n^{2}$.",
    "hint": "La regla del tema: $n^{p}<n^{p}\\log n<n^{p+1}$. Un logaritmo crece más despacio que cualquier potencia positiva de $n$, así que multiplicar por $\\log n$ sube menos que multiplicar por $n^{0{,}5}$.",
    "solution": "**Paso 1. Compara $n\\log_2 n$ con $n^{1{,}5}$.** Dividiendo por $n$: $\\log_2n$ frente a $n^{0{,}5}=\\sqrt n$. Gana la raíz, luego $n\\log_2n<n^{1{,}5}$.\n\n**Paso 2. Compara $n^{2}\\log_2 n$ con $n^{2}$ y $n^{2{,}5}$.** Es mayor que $n^{2}$, porque $\\log_2n$ crece. Y dividiendo por $n^{2}$, queda $\\log_2n$ frente a $n^{0{,}5}$: gana la raíz, luego $n^{2}\\log_2n<n^{2{,}5}$.\n\n**Paso 3. Resultado.**\n$$n\\log_2n<n^{1{,}5}<n^{2}<n^{2}\\log_2n<n^{2{,}5}$$"
   },
   {
    "id": "peldanos#A05",
    "n": "A05",
    "title": "Leer la definición de O con números",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "La definición: $f\\in O(g)$ si existen $c>0$ y $n_0$ tales que $f(n)\\le c\\,g(n)$ para todo $n\\ge n_0$. Toma $f(n)=3n+5$ y $g(n)=n$.\n- a) Con $c=4$, ¿desde qué $n$ se cumple $3n+5\\le4n$?\n- b) Con $c=3$, ¿se cumple alguna vez $3n+5\\le3n$? ¿Y si $c=3{,}5$?\n- c) Con $c=8$, ¿desde qué $n$ se cumple?\n- d) Escribe una pareja $(c,n_0)$ y concluye.",
    "hint": "Pasa los términos con $n$ a un lado: $3n+5\\le4n\\iff5\\le n$.",
    "solution": "**Paso 1. a).** $3n+5\\le4n\\iff5\\le n$. Se cumple desde $n_0=5$.\n\n**Paso 2. b).** $3n+5\\le3n$ es imposible ($5\\le0$): con $c=3$ nunca. Con $c=3{,}5$: $3n+5\\le3{,}5n\\iff10\\le n$, vale desde $n_0=10$. Hace falta una constante algo mayor que el coeficiente de $n$.\n\n**Paso 3. c).** $3n+5\\le8n\\iff5\\le5n\\iff n\\ge1$. Desde $n_0=1$.\n\n**Paso 4. Concluye.** d) Con $c=4$ y $n_0=5$ (o cualquier otra pareja anterior) se cumple la definición: $3n+5\\in O(n)$. Hay infinitas parejas válidas; basta una."
   },
   {
    "id": "peldanos#A06",
    "n": "A06",
    "title": "Encontrar c y n₀",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Demuestra con la definición:\n- a) $2n+10\\in O(n)$\n- b) $2n+10\\in O(n^{2})$\n\nDa en cada caso una pareja $(c,n_0)$.",
    "hint": "En a) prueba con una $c$ algo mayor que $2$, por ejemplo $c=3$. En b) prueba con $c=1$ y resuelve $n^{2}-2n-10\\ge0$.",
    "solution": "**Paso 1. a).** Con $c=3$: $2n+10\\le3n\\iff10\\le n$. Pareja $(3,\\,10)$.\n\n**Paso 2. b), la inecuación.** Con $c=1$: $2n+10\\le n^{2}\\iff n^{2}-2n-10\\ge0$.\n\n**Paso 3. b), cuándo se cumple.** La parábola corta el eje en $1\\pm\\sqrt{11}$, es decir en $\\approx-2{,}3$ y $\\approx4{,}3$. Es positiva a la derecha de $4{,}3$, así que vale para $n\\ge5$ (comprobación: $n=5$ da $25-10-10=5\\ge0$; $n=4$ da $-2$). Pareja $(1,\\,5)$."
   },
   {
    "id": "peldanos#A07",
    "n": "A07",
    "title": "Acotar término a término",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Demuestra con la definición:\n- a) $3n^{2}+4n\\in O(n^{2})$\n- b) $n^{2}+n\\log_2n+5\\in O(n^{2})$",
    "hint": "Para $n\\ge1$ se cumple $n\\le n^{2}$, $1\\le n^{2}$ y $\\log_2n\\le n$. Sustituye cada término por algo mayor que sea múltiplo de $n^{2}$ y suma.",
    "solution": "**Paso 1. a).** Para $n\\ge1$: $4n\\le4n^{2}$, luego $3n^{2}+4n\\le3n^{2}+4n^{2}=7n^{2}$.\n\n**Paso 2. b), cada término.** Para $n\\ge1$: $n\\log_2n\\le n\\cdot n=n^{2}$ y $5\\le5n^{2}$.\n\n**Paso 3. b), suma.** $n^{2}+n\\log_2n+5\\le n^{2}+n^{2}+5n^{2}=7n^{2}$.\n\n**Paso 4. Concluye.** En los dos casos, $c=7$ y $n_0=1$ cumplen la definición."
   },
   {
    "id": "peldanos#A08",
    "n": "A08",
    "title": "Resolver la inecuación",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.55,
    "steps": true,
    "statement": "Demuestra que $n^{2}+3n\\in O(n^{2})$ resolviendo la inecuación de la definición.\n- a) Prueba con $c=2$: ¿desde qué $n$ se cumple $n^{2}+3n\\le2n^{2}$?\n- b) ¿Por qué no sirve $c=1$?\n- c) ¿Y con $c=4$, desde qué $n$?",
    "hint": "$n^{2}+3n\\le2n^{2}\\iff3n\\le n^{2}\\iff3\\le n$ (dividiendo entre $n>0$).",
    "solution": "**Paso 1. a).** $n^{2}+3n\\le2n^{2}\\iff3n\\le n^{2}\\iff n\\ge3$. Pareja $(2,\\,3)$.\n\n**Paso 2. b).** Con $c=1$ habría que cumplir $3n\\le0$, que es falso para todo $n>0$.\n\n**Paso 3. c).** $n^{2}+3n\\le4n^{2}\\iff3n\\le3n^{2}\\iff n\\ge1$. Pareja $(4,\\,1)$. Con una $c$ mayor, el $n_0$ baja."
   },
   {
    "id": "peldanos#A09",
    "n": "A09",
    "title": "Un logaritmo está dentro de O(n)",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Demuestra que $\\log_2n\\in O(n)$.\n- a) Comprueba la desigualdad $\\log_2n\\le n$ para $n=1,2,4,8,16$.\n- b) Demuéstrala para todo $n\\ge1$ usando que $n<2^{n}$.\n- c) ¿Se cumple también $\\log_2n\\in\\Theta(n)$?",
    "hint": "Si $n<2^{n}$, aplica $\\log_2$ a ambos lados (es creciente). Para c), mira el límite de $\\frac{\\log_2 n}{n}$.",
    "solution": "**Paso 1. Prueba con números.** a) $0\\le1$, $1\\le2$, $2\\le4$, $3\\le8$, $4\\le16$. Se cumple con mucha holgura.\n\n**Paso 2. Demostración.** b) Para $n\\ge1$ se cumple $n<2^{n}$. Como $\\log_2$ es creciente, $\\log_2n<\\log_2 2^{n}=n$. Con $c=1$ y $n_0=1$, $\\log_2n\\in O(n)$.\n\n**Paso 3. Θ.** c) No. $\\lim\\frac{\\log_2n}{n}=0$ (L'Hôpital: $\\frac{1/(n\\ln 2)}{1}\\to0$); para $\\Theta$ el límite tendría que ser una constante positiva. Es $\\log_2n\\in O(n)$ pero no $\\Omega(n)$."
   },
   {
    "id": "peldanos#A10",
    "n": "A10",
    "title": "Decidir con límites",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Si $\\displaystyle\\lim_{n\\to\\infty}\\frac{f(n)}{g(n)}$ es una constante finita, entonces $f\\in O(g)$; si es $\\infty$, entonces $f\\notin O(g)$. Decide:\n- a) $n^{2}+5n\\in O(n^{2})$\n- b) $n\\log_2n\\in O(n^{2})$\n- c) $n^{2}\\in O(n\\log_2n)$\n- d) $5\\cdot2^{n}\\in O(3^{n})$",
    "hint": "En b) simplifica antes: $\\frac{n\\log_2 n}{n^{2}}=\\frac{\\log_2n}{n}$. En d), $\\frac{5\\cdot2^{n}}{3^{n}}=5\\left(\\frac23\\right)^{n}$.",
    "solution": "**Paso 1. a).** $\\frac{n^{2}+5n}{n^{2}}=1+\\frac5n\\to1$, finito: sí.\n\n**Paso 2. b).** $\\frac{\\log_2 n}{n}\\to0$ (L'Hôpital), finito: sí.\n\n**Paso 3. c).** $\\frac{n^{2}}{n\\log_2n}=\\frac{n}{\\log_2n}\\to\\infty$: no.\n\n**Paso 4. d).** $5\\left(\\frac23\\right)^{n}\\to0$: sí."
   },
   {
    "id": "peldanos#A11",
    "n": "A11",
    "title": "Una cota inferior Ω",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Demuestra que $n^{2}-10n\\in\\Omega(n^{2})$. En $\\Omega$ hay que cumplir $c\\cdot g(n)\\le f(n)$.\n- a) Prueba con $c=\\tfrac12$: ¿desde qué $n$ se cumple $\\tfrac12n^{2}\\le n^{2}-10n$?\n- b) ¿Por qué no sirve $c=1$?",
    "hint": "$\\tfrac12n^{2}\\le n^{2}-10n\\iff10n\\le\\tfrac12n^{2}$. Divide entre $n$.",
    "solution": "**Paso 1. a).** $\\tfrac12n^{2}\\le n^{2}-10n\\iff10n\\le\\tfrac12n^{2}\\iff20\\le n$. Pareja $(\\tfrac12,\\,20)$. Comprobación: $n=20$ da $200\\ge200$ y $n=19$ da $171<180{,}5$.\n\n**Paso 2. b).** Con $c=1$ habría que cumplir $n^{2}\\le n^{2}-10n$, es decir $10n\\le0$: imposible."
   },
   {
    "id": "peldanos#A12",
    "n": "A12",
    "title": "Demostrar que NO se cumple",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Para demostrar $f\\notin O(g)$ hay que ver que, sea cual sea $c$, la desigualdad $f(n)\\le c\\,g(n)$ falla para $n$ tan grandes como se quiera. Demuestra:\n- a) $n^{3}\\notin O(n^{2})$\n- b) $2n^{2}+5\\notin O(n)$",
    "hint": "Supón que existen $c$ y $n_0$. Simplifica la desigualdad hasta que quede \"$n\\le$ algo\". Eso solo puede valer para $n$ pequeños.",
    "solution": "**Paso 1. a), suposición.** Supón $n^{3}\\le c\\,n^{2}$ para todo $n\\ge n_0$. Dividiendo entre $n^{2}$: $n\\le c$.\n\n**Paso 2. a), contradicción.** Pero eso es falso para $n>c$, y siempre hay $n\\ge n_0$ con $n>c$. Luego no existe ninguna pareja y $n^{3}\\notin O(n^{2})$.\n\n**Paso 3. b).** Supón $2n^{2}+5\\le c\\,n$ para todo $n\\ge n_0$. Como $2n^{2}\\le2n^{2}+5\\le cn$, se tiene $2n\\le c$, es decir $n\\le c/2$, falso para $n>c/2$. Luego $2n^{2}+5\\notin O(n)$."
   },
   {
    "id": "peldanos#A13",
    "n": "A13",
    "title": "Una cota Θ con constantes",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Demuestra con la definición que $2n^{2}+3n\\in\\Theta(n^{2})$ dando $c_1$, $c_2$ y $n_0$ con\n$$c_1n^{2}\\le2n^{2}+3n\\le c_2n^{2}\\quad\\text{para todo }n\\ge n_0.$$",
    "hint": "La parte izquierda es fácil: tira el término $3n$ (que es positivo). Para la derecha usa $3n\\le3n^{2}$ si $n\\ge1$.",
    "solution": "**Paso 1. Cota inferior.** Como $3n\\ge0$, se tiene $2n^{2}\\le2n^{2}+3n$ para todo $n$. Vale $c_1=2$.\n\n**Paso 2. Cota superior.** Para $n\\ge1$: $3n\\le3n^{2}$, así que $2n^{2}+3n\\le5n^{2}$. Vale $c_2=5$.\n\n**Paso 3. Juntas.** Con $c_1=2$, $c_2=5$, $n_0=1$ se cumple la definición. Comprobación con $n=1$: $2\\le5\\le5$."
   },
   {
    "id": "peldanos#A14",
    "n": "A14",
    "title": "Simplificar con dos parámetros",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Simplifica (quita constantes y términos dominados):\n- a) $\\Theta(5m^{2}+3mn+n)$\n- b) $\\Theta(m\\log_2n+n\\log_2m+mn)$\n- c) $\\Theta(m^{3}+m^{2}n+n^{2})$ (¿se puede quitar algún término?)\n\nSuponemos $m,n\\ge2$.",
    "hint": "Un término se puede quitar si otro siempre es mayor o igual (salvo una constante), para cualquier valor de $m$ y $n$. Compara por parejas.",
    "solution": "**Paso 1. a).** Quita constantes: $m^{2}+mn+n$. Como $n\\le mn$ para $m\\ge1$, el término $n$ sobra: $\\Theta(m^{2}+mn)$. Ni $m^{2}$ ni $mn$ dominan al otro ($m^{2}\\le mn$ solo si $m\\le n$).\n\n**Paso 2. b).** $\\log_2n\\le n$ y $\\log_2m\\le m$, luego $m\\log_2n\\le mn$ y $n\\log_2m\\le mn$. Quedan dominados: $\\Theta(mn)$.\n\n**Paso 3. c).** Ninguno sobra. $m^{3}$ gana a $m^{2}n$ si $m>n$, pero pierde si $n>m$; $m^{2}n$ gana a $n^{2}$ si $m^{2}>n$, pero pierde si $n>m^{2}$; $m^{3}$ y $n^{2}$ tampoco son comparables. La expresión se queda como está."
   },
   {
    "id": "peldanos#A15",
    "n": "A15",
    "title": "Verdadero o falso",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Decide si es verdadero y razona:\n- a) $2^{n+1}\\in\\Theta(2^{n})$\n- b) $2^{2n}\\in\\Theta(2^{n})$\n- c) $\\log_2n\\in\\Theta(\\log_{10}n)$\n- d) $n^{2}+n\\log_2n\\in\\Theta(n^{2})$\n- e) $(n+1)!\\in\\Theta(n!)$\n- f) $\\sqrt n\\in O(\\log_2n)$",
    "hint": "Una constante multiplicativa no cambia el orden; una función que se multiplica por algo que crece, sí. Pasa cada caso a un cociente.",
    "solution": "**Paso 1. a) y c).** Verdaderos: $2^{n+1}=2\\cdot2^{n}$ y $\\log_2n=\\log_{10}n/\\log_{10}2$. Solo cambian en una constante.\n\n**Paso 2. b).** Falso: $2^{2n}=4^{n}=2^{n}\\cdot2^{n}$, y el cociente $2^{n}$ no está acotado. No es solo una constante.\n\n**Paso 3. d).** Verdadero: $n\\log_2n\\le n^{2}$ para $n\\ge1$, y $n^{2}$ manda. El cociente tiende a $1$.\n\n**Paso 4. e).** Falso: $(n+1)!=(n+1)\\,n!$, cociente $n+1\\to\\infty$.\n\n**Paso 5. f).** Falso: $\\frac{\\sqrt n}{\\log_2n}\\to\\infty$. Es al revés, $\\log_2n\\in O(\\sqrt n)$."
   },
   {
    "id": "peldanos#A17",
    "n": "A17",
    "title": "Simular counting-sort",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Ordena con counting-sort el vector $A=[3,1,3,0,2]$ (valores en $[0,3]$, así que $k=3$).\n- a) Calcula el vector de cuentas $C[0..3]$.\n- b) Calcula las sumas acumuladas de $C$.\n- c) Da el vector ordenado.\n- d) ¿De qué orden es el coste en función de $n$ y $k$? ¿Qué pasa si $k=n^{2}$?",
    "hint": "$C[v]$ cuenta cuántas veces aparece $v$ en $A$. Las sumas acumuladas dicen cuántos elementos son menores o iguales que $v$.",
    "solution": "**Paso 1. Cuentas.** a) $0$ aparece 1 vez, $1$ una, $2$ una y $3$ dos: $C=[1,1,1,2]$.\n\n**Paso 2. Acumuladas.** b) $C=[1,2,3,5]$: hay 1 elemento $\\le0$, 2 $\\le1$, 3 $\\le2$ y 5 $\\le3$.\n\n**Paso 3. Salida.** c) $B=[0,1,2,3,3]$.\n\n**Paso 4. Coste.** d) Hay dos bucles de tamaño $k$ y dos de tamaño $n$: $\\Theta(n+k)$. Si $k\\in O(n)$ es lineal. Con $k=n^{2}$ sería $\\Theta(n^{2})$, peor que una ordenación por comparaciones."
   },
   {
    "id": "peldanos#A19",
    "n": "A19",
    "title": "log n! entre dos cotas",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Prueba que $\\log_2(n!)\\in\\Theta(n\\log_2n)$ acotando $n!$ por los dos lados (con $n$ par).\n- a) Cota superior: $n!\\le n^{n}$. ¿Qué cota de $\\log_2(n!)$ sale?\n- b) Cota inferior: en $n!=n\\cdot(n-1)\\cdots1$, los $\\tfrac n2$ factores más grandes valen al menos $\\tfrac n2$. ¿Qué cota de $n!$ sale, y de $\\log_2(n!)$?\n- c) Concluye y comprueba con $n=8$.",
    "hint": "Los primeros $n/2$ factores ($n,n-1,\\dots,\\frac n2+1$) son todos mayores que $\\frac n2$. Los demás factores valen al menos $1$.",
    "solution": "**Paso 1. Cota superior.** a) Cada factor es $\\le n$, hay $n$ factores: $n!\\le n^{n}$, luego $\\log_2(n!)\\le n\\log_2n$.\n\n**Paso 2. Cota inferior.** b) $n!\\ge\\left(\\tfrac n2\\right)^{n/2}\\cdot1$, luego $\\log_2(n!)\\ge\\tfrac n2\\log_2\\tfrac n2=\\tfrac n2(\\log_2n-1)$.\n\n**Paso 3. Orden.** El término dominante de la cota inferior es $\\tfrac n2\\log_2n$, que es $\\Theta(n\\log_2n)$, igual que la superior. Por tanto $\\log_2(n!)\\in\\Theta(n\\log_2n)$.\n\n**Paso 4. Comprueba.** c) $n=8$: $\\log_2 40320\\approx15{,}3$; cota inferior $\\tfrac82(3-1)=8$; cota superior $8\\cdot3=24$. Se cumple $8\\le15{,}3\\le24$."
   },
   {
    "id": "peldanos#A20",
    "n": "A20",
    "title": "Ordenar con logaritmos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Ordena de menor a mayor orden de crecimiento:\n$$n^{3},\\quad 2^{n},\\quad n^{\\log_2n},\\quad 3^{n/2},\\quad n!$$",
    "hint": "Compara los logaritmos (en base $2$) de las funciones: como $\\log$ es creciente, el orden se conserva. Los logaritmos son $3\\log_2n$, $n$, $(\\log_2n)^{2}$, $\\tfrac n2\\log_23$ y $\\approx n\\log_2n$.",
    "solution": "**Paso 1. Toma $\\log_2$ de cada una.** $n^{3}\\to3\\log_2n$. $2^{n}\\to n$. $n^{\\log_2n}\\to(\\log_2n)^{2}$. $3^{n/2}\\to\\tfrac n2\\log_23\\approx0{,}79\\,n$. $n!\\to\\log_2(n!)\\in\\Theta(n\\log_2n)$.\n\n**Paso 2. Ordena esos logaritmos.** $3\\log_2n<(\\log_2n)^{2}<0{,}79\\,n<n<n\\log_2n$ (para $n$ grande: un logaritmo al cuadrado crece más despacio que $n$).\n\n**Paso 3. Vuelve a las funciones.**\n$$n^{3}<n^{\\log_2n}<3^{n/2}<2^{n}<n!$$\n\n**Paso 4. Comentario.** $n^{\\log_2n}$ gana a todo polinomio pero pierde con cualquier exponencial. Y $3^{n/2}=(\\sqrt3)^{n}\\approx1{,}73^{n}$ tiene base menor que $2$."
   },
   {
    "id": "peldanos#A21",
    "n": "A21",
    "title": "Cotas con exponenciales",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.9,
    "steps": true,
    "statement": "Decide y demuestra con la definición:\n- a) $2^{n+1}\\in O(2^{n})$\n- b) $3^{n}\\notin O(2^{n})$\n- c) $n\\cdot2^{n}\\notin O(2^{n})$",
    "hint": "En a) saca el factor: $2^{n+1}=2\\cdot2^{n}$. En b) y c) supón que existe $c$ y divide entre $2^{n}$.",
    "solution": "**Paso 1. a).** $2^{n+1}=2\\cdot2^{n}\\le2\\cdot2^{n}$. Pareja $(2,\\,1)$.\n\n**Paso 2. b).** Supón $3^{n}\\le c\\,2^{n}$ para todo $n\\ge n_0$. Dividiendo entre $2^{n}$: $\\left(\\tfrac32\\right)^{n}\\le c$. Pero $\\left(\\tfrac32\\right)^{n}$ crece sin cota, así que supera a cualquier $c$ para $n$ grande. Contradicción.\n\n**Paso 3. c).** Supón $n\\,2^{n}\\le c\\,2^{n}$. Dividiendo entre $2^{n}$: $n\\le c$, falso para $n>c$. Luego $n\\,2^{n}\\notin O(2^{n})$."
   },
   {
    "id": "peldanos#A22",
    "n": "A22",
    "title": "Cambio de base con la definición de Θ",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Demuestra con la definición que $\\log_5 n\\in\\Theta(\\log_2 n)$, dando $c_1$, $c_2$ y $n_0$.\n- a) Escribe $\\log_5 n$ en función de $\\log_2 n$.\n- b) Elige $c_1$ y $c_2$ (con $c_1\\le$ la constante $\\le c_2$) y comprueba la doble desigualdad.",
    "hint": "$\\log_5 n=\\dfrac{\\log_2 n}{\\log_2 5}$. La constante $\\dfrac1{\\log_25}$ vale aproximadamente $0{,}43$.",
    "solution": "**Paso 1. Cambio de base.** a) $\\log_5 n=\\dfrac{1}{\\log_2 5}\\log_2 n\\approx0{,}4307\\,\\log_2 n$.\n\n**Paso 2. Constantes.** b) Con $c_1=0{,}4$ y $c_2=0{,}5$: $0{,}4\\log_2 n\\le0{,}4307\\log_2n\\le0{,}5\\log_2n$ para todo $n\\ge1$ (donde $\\log_2n\\ge0$). Por tanto $n_0=1$.\n\n**Paso 3. Conclusión.** $\\log_5n\\in\\Theta(\\log_2n)$. Vale para cualquier base: la base solo cambia una constante."
   },
   {
    "id": "peldanos#A23",
    "n": "A23",
    "title": "Potencias con un logaritmo en el exponente",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.75,
    "steps": true,
    "statement": "Simplifica a una potencia de $n$ y decide si está en $O(n^{2})$ y en $\\Theta(n^{2})$:\n- a) $3^{\\log_2 n}$\n- b) $2^{\\ln n}$\n- c) $2^{\\log_4 n}$\n- d) $4^{\\log_2 n}$",
    "hint": "Usa $b^{\\log_c n}=n^{\\log_c b}$ (se prueba escribiendo $b=c^{\\log_c b}$). Para $2^{\\ln n}$ conviene pasar a base $e$: $2^{\\ln n}=n^{\\ln 2}$.",
    "solution": "**Paso 1. a).** $3^{\\log_2n}=n^{\\log_23}\\approx n^{1{,}585}$. Está en $O(n^{2})$, pero no en $\\Theta(n^{2})$ porque el exponente es menor.\n\n**Paso 2. b).** $2^{\\ln n}=n^{\\ln2}\\approx n^{0{,}693}$. En $O(n^{2})$, no en $\\Theta(n^{2})$ (tampoco en $\\Theta(n)$).\n\n**Paso 3. c).** $2^{\\log_4n}=n^{\\log_42}=n^{1/2}=\\sqrt n$. En $O(n^{2})$, no en $\\Theta(n^{2})$.\n\n**Paso 4. d).** $4^{\\log_2n}=n^{\\log_24}=n^{2}$. En $O(n^{2})$ y en $\\Theta(n^{2})$."
   },
   {
    "id": "peldanos#A24",
    "n": "A24",
    "title": "Factoriales y exponenciales con la definición",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Decide con la definición de $O$, con $c$ y $n_0$ o demostrando que no existen:\n- a) $(n-1)!\\in O(n!)$\n- b) $(n+1)!\\in O(n!)$\n- c) $2^{n}\\in O(3^{n})$\n- d) $3^{n}\\in O(2^{n})$",
    "hint": "Escribe $(n+1)!=(n+1)\\cdot n!$ y $n!=n\\cdot(n-1)!$. Divide la desigualdad $f\\le c\\,g$ entre $g$ y mira si el cociente queda acotado.",
    "solution": "**Paso 1. a).** $(n-1)!=\\dfrac{n!}{n}\\le n!$ para $n\\ge1$. Sí, con $c=1$ y $n_0=1$.\n\n**Paso 2. b).** Supón $(n+1)!\\le c\\,n!$ para todo $n\\ge n_0$. Dividiendo entre $n!$: $n+1\\le c$, falso para $n\\ge c$. No existe $c$: $(n+1)!\\notin O(n!)$.\n\n**Paso 3. c).** $2^{n}\\le3^{n}$ para todo $n\\ge0$. Sí, con $c=1$ y $n_0=1$.\n\n**Paso 4. d).** Supón $3^{n}\\le c\\,2^{n}$. Dividiendo entre $2^{n}$: $\\left(\\tfrac32\\right)^{n}\\le c$, falso para $n$ grande porque crece sin cota. No: $3^{n}\\notin O(2^{n})$."
   },
   {
    "id": "peldanos#A25",
    "n": "A25",
    "title": "Dos demostraciones de examen: $O$ con logaritmo y $\\Omega$ con resta",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Con la definición (sin límites):\n- a) $5n\\in O(n\\log_2 n)$\n- b) $n^{2}-3n+1\\in\\Omega(n^{2})$\n\nDa $c$ y $n_0$ en cada caso.",
    "hint": "En a), para $n\\ge2$ se tiene $\\log_2n\\ge1$. En b), prueba con $c=\\tfrac14$ y resuelve la desigualdad $\\tfrac34n^{2}-3n+1\\ge0$.",
    "solution": "**Paso 1. a).** Con $c=5$: $5n\\le5\\,n\\log_2n\\iff1\\le\\log_2n\\iff n\\ge2$. Pareja $(5,\\,2)$.\n\n**Paso 2. b), planteamiento.** Queremos $n^{2}-3n+1\\ge\\tfrac14n^{2}\\iff\\tfrac34n^{2}-3n+1\\ge0\\iff3n^{2}-12n+4\\ge0$.\n\n**Paso 3. b), resolución.** Las raíces de $3n^{2}-12n+4$ son $\\dfrac{12\\pm\\sqrt{96}}{6}\\approx0{,}37$ y $3{,}63$. La parábola es positiva a la derecha de $3{,}63$: sirve $n_0=4$ (con $n=4$: $16-12+1=5\\ge4$; con $n=3$: $1<2{,}25$). Pareja $(\\tfrac14,\\,4)$."
   },
   {
    "id": "peldanos#A26",
    "n": "A26",
    "title": "Ordenar funciones con complejidades iguales",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "asint-definiciones"
    ],
    "stage": "asintotica",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Ordena de menor a mayor orden de complejidad y agrupa las que tienen la misma:\n$$7n+\\log n,\\quad n\\log_2 n,\\quad 3\\log n,\\quad \\log(n^{3}),\\quad n^{2},\\quad n^{1{,}5},\\quad n\\log_{10}n,\\quad (\\log n)^{2}$$",
    "hint": "Quita constantes y términos menores. $\\log(n^{3})=3\\log n$ y la base del logaritmo no cambia el orden. Un logaritmo al cuadrado sigue creciendo más despacio que $n$.",
    "solution": "**Paso 1. Simplifica.** $7n+\\log n\\to n$. $3\\log n\\to\\log n$. $\\log(n^{3})=3\\log n\\to\\log n$. $n\\log_{10}n$ y $n\\log_2n$ son $n\\log n$.\n\n**Paso 2. Ordena.** $\\log n=3\\log n=\\log(n^{3})<(\\log n)^{2}<n\\;(=7n+\\log n)<n\\log n\\;(=n\\log_2n=n\\log_{10}n)<n^{1{,}5}<n^{2}$.\n\n**Paso 3. Grupos.** Mismo orden: $\\{3\\log n,\\ \\log(n^{3})\\}$ y $\\{n\\log_2n,\\ n\\log_{10}n\\}$. Las demás están solas."
   },
   {
    "id": "peldanos#K01",
    "n": "K01",
    "title": "Seguir el árbol binario de subconjuntos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.2,
    "steps": true,
    "statement": "```python\ndef genera_subconjuntos(i, sol, elementos):\n    if i == len(elementos):\n        imprime_subconjunto(sol, elementos)     # un subconjunto por hoja\n    else:\n        for k in range(0, 2):\n            sol[i] = k                           # 0 = no incluir, 1 = incluir\n            genera_subconjuntos(i + 1, sol, elementos)\n```\n**Ejemplo resuelto.** Con `elementos = ['x']`: la raíz hace dos llamadas, `sol = [0]` (conjunto $\\{\\}$) y `sol = [1]` (conjunto $\\{x\\}$). Dos hojas, tres llamadas en total.\n\n**Ahora tú**, con `elementos = ['x', 'y']`:\n- a) Escribe los valores de `sol` en cada hoja, de izquierda a derecha, y el subconjunto que representan.\n- b) ¿Cuántas llamadas se hacen en total?\n- c) Y para $n=4$ elementos: ¿cuántas hojas y cuántas llamadas?",
    "hint": "En cada nivel `sol[i]` decide si el elemento $i$ entra. El orden de las hojas es el orden en que `k` toma los valores $0$ y $1$ en cada nivel.",
    "solution": "**Paso 1. Las hojas.** a) `[0,0]`$=\\{\\}$, `[0,1]`$=\\{y\\}$, `[1,0]`$=\\{x\\}$, `[1,1]`$=\\{x,y\\}$.\n\n**Paso 2. Las llamadas.** b) $1$ (raíz) $+\\,2+4=7$.\n\n**Paso 3. Generaliza.** c) Con $n=4$: $2^{4}=16$ hojas, y $1+2+4+8+16=31=2^{5}-1$ llamadas."
   },
   {
    "id": "peldanos#K02",
    "n": "K02",
    "title": "Subconjuntos de un tamaño, con poda",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.35,
    "steps": true,
    "statement": "Se quieren los subconjuntos de **exactamente $K$ elementos**. Se añade el parámetro `n_elegidos` (cuántos elementos hay ya en la solución parcial).\n```python\ndef subconjuntos_de_tamano(i, sol, n_elegidos, K, elementos):\n    if i == len(elementos):\n        if n_elegidos == K:\n            imprime_subconjunto(sol, elementos)\n    else:\n        for k in range(0, 2):\n            if ________:                                  # poda\n                sol[i] = k\n                subconjuntos_de_tamano(i + 1, sol, n_elegidos + k, K, elementos)\n```\n- a) ¿Qué condición va en la poda para no seguir por ramas que ya se pasan de $K$?\n- b) Con $n=4$ y $K=2$, ¿cuántas hojas se llegan a alcanzar y cuántas son solución?\n- c) ¿Cuántas llamadas se hacen en total?",
    "hint": "Añadir el elemento (`k = 1`) aumenta `n_elegidos` en $1$; no añadirlo (`k = 0`) lo deja igual. Una rama es inútil si `n_elegidos + k` ya supera $K$.",
    "solution": "**Paso 1. Condición.** a) `n_elegidos + k <= K`.\n\n**Paso 2. Hojas.** b) Se alcanzan las hojas con $0$, $1$ o $2$ unos: $\\binom40+\\binom41+\\binom42=1+4+6=11$ de las $16$. Solo son solución las de exactamente $2$ unos: $6$.\n\n**Paso 3. Llamadas.** c) $25$ en total (contando la raíz): la poda ahorra $6$ de las $31$ de K01.\n\n**Paso 4. Mejora posible.** También se podría podar cuando ya no quedan elementos suficientes para llegar a $K$."
   },
   {
    "id": "peldanos#K03",
    "n": "K03",
    "title": "Un subconjunto en cada nodo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "```python\ndef genera_subconjuntos_alt(i, j, sol, elementos):\n    imprime_subconjunto_alt(sol, i, elementos)          # se imprime en CADA nodo\n    for k in range(j + 1, len(elementos)):\n        sol[i] = k                                      # k es el índice del elemento\n        genera_subconjuntos_alt(i + 1, k, sol, elementos)\n```\nllamada inicial `genera_subconjuntos_alt(0, -1, sol, ['a','b','c'])`.\n- a) Escribe, en orden, los subconjuntos que se imprimen, y el valor de `(i, j)` de cada llamada.\n- b) ¿Cuántos nodos tiene el árbol? ¿Y con $n=4$?\n- c) ¿Por qué el último elemento no tiene hijos?",
    "hint": "`j` es el índice del último elemento incluido; los candidatos de un nodo son `j+1, j+2, ..., n-1`.",
    "solution": "**Paso 1. El recorrido.** a) Raíz `(0,-1)`: $\\{\\}$. Primer hijo `k=0` $\\to(1,0)$: $\\{a\\}$. Su primer hijo `k=1` $\\to(2,1)$: $\\{a,b\\}$, y su hijo `k=2` $\\to(3,2)$: $\\{a,b,c\\}$. Vuelve a $\\{a\\}$ y su segundo hijo `k=2` $\\to(2,2)$: $\\{a,c\\}$. Después `k=1` en la raíz $\\to(1,1)$: $\\{b\\}$, con su hijo $\\{b,c\\}$ $\\to(2,2)$. Y por último `k=2` $\\to(1,2)$: $\\{c\\}$.\n\n**Paso 2. Orden.** $\\{\\},\\{a\\},\\{a,b\\},\\{a,b,c\\},\\{a,c\\},\\{b\\},\\{b,c\\},\\{c\\}$.\n\n**Paso 3. Nodos.** b) $8=2^{3}$ para $n=3$, y $16$ para $n=4$: un nodo por subconjunto.\n\n**Paso 4. Hojas.** c) Para el último elemento `j + 1 = n`, y `range(n, n)` está vacío: no hay candidatos."
   },
   {
    "id": "peldanos#K04",
    "n": "K04",
    "title": "Seguir las permutaciones",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.35,
    "steps": true,
    "statement": "```python\ndef genera_permutaciones(i, libres, sol, elementos):\n    n = len(elementos)\n    if i == n:\n        imprime_permutacion(sol)\n    else:\n        for k in range(0, n):\n            if libres[k]:\n                sol[i] = elementos[k]\n                libres[k] = False\n                genera_permutaciones(i + 1, libres, sol, elementos)\n                libres[k] = True\n```\ncon `elementos = [1, 2, 3]`.\n- a) Escribe las permutaciones en el orden en que se imprimen.\n- b) ¿Cuántas llamadas hay en cada nivel `i = 0, 1, 2, 3` y en total?\n- c) ¿Por qué hace falta la línea `libres[k] = True`?",
    "hint": "En el nivel $i$ hay $n-i$ elementos libres, y cada uno da una llamada. El nivel $i$ tiene tantas llamadas como caminos distintos hasta él.",
    "solution": "**Paso 1. Orden.** a) $123,\\ 132,\\ 213,\\ 231,\\ 312,\\ 321$. El primer elemento cambia más despacio.\n\n**Paso 2. Llamadas.** b) Nivel $0$: $1$. Nivel $1$: $3$. Nivel $2$: $3\\cdot2=6$. Nivel $3$: $3\\cdot2\\cdot1=6$. Total $16$. Con $n=4$ serían $1+4+12+24+24=65$.\n\n**Paso 3. Deshacer.** c) `libres` se pasa por referencia y se comparte entre llamadas. Al volver de la llamada hay que marcar `k` como libre otra vez, o la siguiente rama (otro valor de `k`) lo vería ocupado y no generaría las demás permutaciones."
   },
   {
    "id": "peldanos#K05",
    "n": "K05",
    "title": "Permutaciones con una restricción",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Un *desorden* de $[1,2,3,\\dots,n]$ es una permutación en la que ningún elemento queda en su posición original (el $1$ no puede estar en la posición $1$, el $2$ en la $2$, ...).\n- a) ¿Qué condición añades en el `if` del código de K04 para que se cumpla?\n- b) Escribe los desórdenes de $[1,2,3]$.\n- c) ¿Cuántos hay de $[1,2,3,4]$? Escríbelos.",
    "hint": "En el nivel `i` (posición `i`, empezando en $0$), el elemento `elementos[k]` es el valor $k+1$. La posición original de ese valor es `k`. No debe cumplirse `k == i`.",
    "solution": "**Paso 1. Condición.** a) `if libres[k] and k != i:`. La poda se hace al elegir, no al final.\n\n**Paso 2. $n=3$.** b) $231$ y $312$. (No valen $123$, $132$, $213$ ni $321$: cada una deja algún elemento en su sitio.)\n\n**Paso 3. $n=4$.** c) Son $9$: $2143,\\ 2341,\\ 2413,\\ 3142,\\ 3412,\\ 3421,\\ 4123,\\ 4312,\\ 4321$."
   },
   {
    "id": "peldanos#K06",
    "n": "K06",
    "title": "N reinas, a mano hasta la primera solución",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Con $n=4$, la solución parcial `sol[i]` es la fila de la reina de la columna `i`, y el código de los apuntes prueba filas en el orden $k=0,1,2,3$. Una reina nueva en `(columna i, fila k)` es válida si no choca en fila ni en diagonal con las anteriores.\n- a) Escribe las soluciones parciales que se visitan (una llamada por cada una), en orden, hasta encontrar la primera solución completa.\n- b) ¿Cuál es? ¿Cuántas llamadas se han hecho?\n- c) Explica por qué `(0, 2)` y `(0, 3)` no llegan a completarse.",
    "hint": "Dos reinas están en la misma diagonal si $|\\text{columna}_1-\\text{columna}_2|=|\\text{fila}_1-\\text{fila}_2|$. Una solución parcial se visita aunque luego no se pueda ampliar.",
    "solution": "**Paso 1. Recorrido.** a) `()` $\\to$ `(0)` $\\to$ `(0,2)` (la fila $0$ ya está usada y la $1$ choca en diagonal con la reina de la columna $0$) $\\to$ sin candidatos: vuelta atrás. `(0,3)` $\\to$ `(0,3,1)` $\\to$ sin candidatos (la única fila libre, $2$, está en diagonal con la reina de la columna $2$): vuelta atrás, y la columna $1$ no tiene más filas. Se vuelve a la columna $0$ y se prueba `(1)` $\\to$ `(1,3)` $\\to$ `(1,3,0)` $\\to$ `(1,3,0,2)`.\n\n**Paso 2. Resultado.** b) La primera solución es $(1,3,0,2)$. Hay $9$ llamadas: `()`, `(0)`, `(0,2)`, `(0,3)`, `(0,3,1)`, `(1)`, `(1,3)`, `(1,3,0)`, `(1,3,0,2)`.\n\n**Paso 3. Callejones.** c) `(0,2)`: en la columna $2$ solo quedan las filas $1$ y $3$; $(2,1)$ choca con $(1,2)$ en diagonal, y $(2,3)$ choca también con $(1,2)$. `(0,3)` sí admite una tercera reina `(0,3,1)`, pero entonces la última columna solo puede usar la fila $2$, y choca en diagonal con $(2,1)$."
   },
   {
    "id": "peldanos#K07",
    "n": "K07",
    "title": "Los índices de las diagonales",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Los apuntes guardan las diagonales con dos listas booleanas: la diagonal principal de una reina en (columna `i`, fila `k`) tiene índice `i - k + n - 1`, y la secundaria `i + k`. Con $n=4$:\n- a) ¿Cuántas diagonales de cada tipo hay y entre qué índices?\n- b) Decide si se atacan por diagonal estas parejas (columna, fila): $(0,1)$ y $(2,3)$; $(0,2)$ y $(1,1)$; $(0,0)$ y $(1,2)$; $(1,3)$ y $(3,1)$.\n- c) ¿Por qué no hace falta comprobar columnas?",
    "hint": "Dos reinas se atacan por diagonal si tienen el mismo índice de diagonal principal o el mismo de secundaria. Calcula los dos índices de cada reina.",
    "solution": "**Paso 1. Rangos.** a) La principal va de $-(n-1)+n-1=0$ hasta $(n-1)+n-1=2n-2=6$: $7$ diagonales, índices $0$ a $6$. La secundaria va de $0$ a $2(n-1)=6$: también $7$.\n\n**Paso 2. Parejas.** b) $(0,1)$ y $(2,3)$: principal $0-1+3=2$ y $2-3+3=2$, iguales: **se atacan**. $(0,2)$ y $(1,1)$: secundaria $0+2=2$ y $1+1=2$: **se atacan**. $(0,0)$ y $(1,2)$: principales $3$ y $2$, secundarias $0$ y $3$: no se atacan. $(1,3)$ y $(3,1)$: secundarias $4$ y $4$: **se atacan**.\n\n**Paso 3. Columnas.** c) Se coloca una sola reina por columna (cada nivel del árbol es una columna), así que nunca hay dos en la misma."
   },
   {
    "id": "peldanos#K08",
    "n": "K08",
    "title": "Suma de subconjuntos a mano",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Con el código de los apuntes (esquema binario, `suma_parcial`, poda si `suma_parcial + k*L[i] > s`, y se imprime al llegar a `suma_parcial == s`), halla los subconjuntos de $L=[3,2,4]$ que suman $s=5$.\n- a) Dibuja el árbol: cada nodo es la solución parcial y su suma.\n- b) ¿Qué ramas se podan y por qué?\n- c) ¿Qué subconjunto se encuentra? ¿Cuántas llamadas se han hecho (con la raíz)?",
    "hint": "En cada nivel se decide si se incluye `L[i]` ($k=1$) o no ($k=0$). Cuando la suma llega a $s$ ya no se sigue bajando desde ese nodo.",
    "solution": "**Paso 1. Recorrido.** a) Nodos (solución parcial y suma): `()`$_0$, `0`$_0$, `00`$_0$, `000`$_0$, `001`$_4$, `01`$_2$, `010`$_2$, `1`$_3$, `10`$_3$, `100`$_3$, `11`$_5$.\n\n**Paso 2. Podas.** b) `011` se poda: $2+4=6>5$. `101` se poda: $3+4=7>5$. Con una suma que ya sobrepasa $s$, añadir números positivos nunca la reduce.\n\n**Paso 3. Resultado.** c) En `11` la suma es $5$: el subconjunto $\\{3,2\\}$. En total son $11$ llamadas. Sin poda serían $2^{4}-1=15$."
   },
   {
    "id": "peldanos#K09",
    "n": "K09",
    "title": "Los saltos del caballo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.55,
    "steps": true,
    "statement": "En el código de los apuntes del caballo, con la lista `incr = [(1,-2),(2,-1),(2,1),(1,2),(-1,2),(-2,1),(-2,-1),(-1,-2)]`, el candidato `k` es la casilla `nueva_col = col + incr[k][0]` y `nueva_fila = fila + incr[k][1]`. El tablero es de $5\\times5$ (índices de $0$ a $4$).\n- a) Desde la fila $0$, columna $0$, ¿qué saltos son válidos y en qué orden se prueban?\n- b) ¿Cuántos saltos válidos hay desde `(fila 0, col 1)`, `(fila 1, col 1)` y `(fila 2, col 2)`?\n- c) ¿Para qué se vuelve a poner `B[nueva_fila][nueva_col] = 0` cuando no se encuentra solución?",
    "hint": "Para cada una de las $8$ parejas, calcula la casilla y comprueba que $0\\le$ fila $<5$ y $0\\le$ columna $<5$ (y que la casilla no esté ya visitada, aquí todavía no hay ninguna).",
    "solution": "**Paso 1. Desde (0,0).** a) Los candidatos $k=0,1$ dan fila $-2$ y $-1$: inválidos. $k=2$: columna $2$, fila $1$, válido. $k=3$: columna $1$, fila $2$, válido. $k=4,5,6,7$ dan columnas o filas negativas: inválidos. Orden: primero `(fila 1, col 2)` y después `(fila 2, col 1)`.\n\n**Paso 2. Cuántos saltos.** b) Desde `(0,1)`: $3$. Desde `(1,1)`: $4$. Desde `(2,2)` (el centro): los $8$.\n\n**Paso 3. Deshacer.** c) La casilla se marca como visitada al probar el salto. Si el resto de la ruta no se puede completar, se vuelve atrás y hay que dejarla libre para que otra ruta pueda pasar por ella."
   },
   {
    "id": "peldanos#K10",
    "n": "K10",
    "title": "La mochila 0-1 por backtracking",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Objetos con pesos $p=(2,3,4)$ y valores $v=(3,4,5)$, y capacidad $C=5$. Se decide para cada objeto (en orden) si se mete ($1$) o no ($0$), y se poda si el peso no cabe.\n- a) Dibuja el árbol de decisiones. En cada nodo anota (capacidad restante, valor acumulado).\n- b) ¿Qué ramas se podan?\n- c) ¿Qué hojas se alcanzan, cuál es el valor óptimo y qué objetos incluye?",
    "hint": "La rama $1$ de un objeto de peso $p_i$ solo existe si $p_i\\le$ capacidad restante.",
    "solution": "**Paso 1. Hojas alcanzadas.** a) De izquierda a derecha, con `x = (x1,x2,x3)`: `000` (cap. $5$, valor $0$); `001` ($1$, $5$); `010` ($2$, $4$); `100` ($3$, $3$); `110` ($0$, $7$).\n\n**Paso 2. Podas.** b) Tres: el objeto $3$ (peso $4$) no cabe después de `01` (queda $2$), ni después de `10` (queda $3$), ni después de `11` (queda $0$).\n\n**Paso 3. Óptimo.** c) El mayor valor es $7$ con `110`: objetos $1$ y $2$ (peso $2+3=5$, valor $3+4=7$). Se han hecho $12$ llamadas, con $5$ hojas en lugar de las $8$ del árbol completo."
   },
   {
    "id": "peldanos#K11",
    "n": "K11",
    "title": "El laberinto con vuelta atrás",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Matriz del laberinto (`E` = vacía, `W` = pared), entrada `(fila 0, col 0)`, salida `(fila 2, col 3)`:\n```\nE E E E\nE W W E\nE E W E\n```\nEl código de los apuntes prueba, en este orden, las celdas: abajo, derecha, arriba, izquierda (`incr = [(0,1),(1,0),(0,-1),(-1,0)]`, con `nueva_col = col + incr[k][0]` y `nueva_fila = fila + incr[k][1]`). Una celda entra en el camino con `P` y, si no lleva a la salida, se vuelve a dejar `E`.\n- a) Sigue el recorrido: ¿por dónde va primero y cuándo se vuelve atrás?\n- b) ¿Qué camino final se obtiene? ¿Cuántas celdas se han marcado y luego desmarcado?",
    "hint": "Desde `(0,0)`, \"abajo\" es `(1,0)`. Sigue siempre bajando mientras se pueda. Una celda con `P` ya no es `E`, así que no se vuelve a pisar.",
    "solution": "**Paso 1. Primer intento.** a) Abajo a `(1,0)` y a `(2,0)`; desde ahí, abajo no existe y se prueba derecha: `(2,1)`. Desde `(2,1)`: abajo no existe, derecha es pared, arriba es pared (`(1,1)`), izquierda es `(2,0)`, que ya es `P`. Callejón: se desmarca `(2,1)`. En `(2,0)` no quedan opciones (arriba es `P`, izquierda no existe): se desmarca. En `(1,0)`, derecha es pared y arriba es `P`: se desmarca.\n\n**Paso 2. Segundo intento.** De vuelta en `(0,0)`: abajo ya se probó; derecha, `(0,1)`, y de ahí `(0,2)`, `(0,3)`. Desde `(0,3)`, abajo es `(1,3)` y después `(2,3)`: es la salida.\n\n**Paso 3. Resultado.** b) El camino es `(0,0)`, `(0,1)`, `(0,2)`, `(0,3)`, `(1,3)`, `(2,3)`. Se marcaron y desmarcaron $3$ celdas: `(1,0)`, `(2,0)` y `(2,1)`."
   },
   {
    "id": "peldanos#K12",
    "n": "K12",
    "title": "Ramificación y poda",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Con la mochila de K10 ($p=(2,3,4)$, $v=(3,4,5)$, $C=5$) añadimos una segunda poda: se lleva el **máximo valor alcanzable** `max_v` (al principio, la suma de todos los valores, $12$); al no incluir el objeto $i$, `max_v` baja en $v_i$. Se poda la rama si `nuevo_max_v` no supera el mejor valor encontrado `v_opt` (al principio $-1$).\n- a) Sigue el recorrido y anota qué ramas se podan por valor.\n- b) ¿Cuántas llamadas se hacen ahora, frente a las $12$ de K10?\n- c) ¿Por qué el orden en que se encuentran las soluciones influye en cuánto se poda?",
    "hint": "La primera hoja (`000`) deja `v_opt = 0`. Después `001` da $5$. Para decidir si una rama no incluyendo un objeto puede mejorar $5$, calcula `max_v - v[i]`.",
    "solution": "**Paso 1. Recorrido.** a) Hoja `000` ($v_{opt}=0$) y hoja `001` ($v_{opt}=5$). En `01`, no incluir el objeto $3$ da `max_v` $=12-3-5=4$ (no se incluyó el objeto $1$ ni el $3$): $4\\le5$, se poda por valor. En `01`, incluirlo no cabe, se poda por capacidad. En `10`, no incluir el objeto $3$ da `max_v` $=12-4-5=3\\le5$: se poda por valor, e incluirlo tampoco cabe. Por último, la hoja `110` mejora a $v_{opt}=7$.\n\n**Paso 2. Llamadas.** b) $10$ llamadas, dos menos que en K10.\n\n**Paso 3. El orden.** c) La poda por valor es más eficaz cuanto antes se encuentre una solución buena: con un `v_opt` alto, muchas ramas con `max_v` bajo se cortan pronto. Por eso suele ordenarse los objetos por valor (o valor por peso) antes de empezar."
   },
   {
    "id": "peldanos#K15",
    "n": "K15",
    "title": "Subconjuntos con suma s, un subconjunto por nodo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.45,
    "steps": true,
    "statement": "Con el esquema de K03 (un subconjunto en cada nodo, índices crecientes) se quieren los subconjuntos de $L=[3,2,4,1]$ cuyos elementos suman $s=5$. Completa el código:\n```python\ndef subconjuntos_suma(i, j, sol, suma_parcial, L, s):\n    if suma_parcial == s:\n        imprime_subconjunto_alt(sol, i, L)\n    if suma_parcial >= s:\n        return\n    for k in range(________, len(L)):\n        if ________:                       # poda: no pasarse de s\n            sol[i] = k\n            subconjuntos_suma(________, k, sol, suma_parcial + L[k], L, s)\n```\n- a) Rellena los tres huecos.\n- b) Escribe los subconjuntos que se imprimen, en orden, y cuántas llamadas se hacen (con la raíz).",
    "hint": "Los candidatos de un nodo son los índices mayores que `j` (el último incluido). Un candidato `k` solo vale si `suma_parcial + L[k] <= s`. Al bajar un nivel, `i` aumenta en $1$.",
    "solution": "**Paso 1. Huecos.** a) `range(j + 1, len(L))`; `if suma_parcial + L[k] <= s:`; y la llamada con `i + 1`.\n\n**Paso 2. Recorrido.** b) Desde la raíz `{}` (suma $0$): `{3}` (3) $\\to$ `{3,2}` (5): se imprime; `{3,4}` se poda ($7>5$); `{3,1}` (4) no llega a $5$. `{2}` (2) $\\to$ `{2,4}` (6) se poda; `{2,1}` (3). `{4}` (4) $\\to$ `{4,1}` (5): se imprime. `{1}` (1).\n\n**Paso 3. Resultado.** Se imprimen $\\{3,2\\}$ y $\\{4,1\\}$, y hay $9$ llamadas."
   },
   {
    "id": "peldanos#K16",
    "n": "K16",
    "title": "Ruta de coste mínimo con poda por coste parcial",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Cuatro ciudades $0,1,2,3$ con distancias $d_{01}=10$, $d_{02}=15$, $d_{03}=20$, $d_{12}=35$, $d_{13}=25$, $d_{23}=30$. Se busca el recorrido más corto que sale de la $0$, pasa por todas las demás una vez y vuelve a la $0$. Las rutas son permutaciones de $1,2,3$; se prueban en orden lexicográfico.\n- a) Calcula el coste de cada una de las $6$ rutas (incluyendo la vuelta a $0$) y la mejor.\n- b) Ahora con poda: no se sigue por una rama si el coste parcial (sin contar la vuelta) ya es **mayor o igual** que el mejor coste encontrado. Anota qué ramas se podan.\n- c) ¿Cuántas llamadas se hacen con poda y cuántas sin ella?",
    "hint": "El coste parcial de la ruta $0,3,1$ es $d_{03}+d_{31}=45$; si luego va a la $2$ se suma $d_{12}$. El mejor coste empieza en $\\infty$ y se actualiza cuando una ruta completa mejora.",
    "solution": "**Paso 1. Todas las rutas.** a) $0123$: $10+35+30+20=95$. $0132$: $10+25+30+15=80$. $0213$: $15+35+25+20=95$. $0231$: $15+30+25+10=80$. $0312$: $20+25+35+15=95$. $0321$: $20+30+35+10=95$. La mejor cuesta $80$ (hay dos rutas, una es la inversa de la otra).\n\n**Paso 2. Con poda.** b) Se recorren $0123$ (mejor $=95$) y $0132$ (mejor $=80$), luego $0213$ ($95$, no mejora) y $0231$ ($80$, no mejora: se exige estrictamente menos). Después, con la ruta $0,3,1$ y la ciudad $2$ el coste parcial es $20+25+35=80\\ge80$: **se poda** (sin la vuelta ya no puede mejorar). Con $0,3,2$ y la ciudad $1$: $20+30+35=85\\ge80$: **se poda**.\n\n**Paso 3. Llamadas.** c) Con poda $14$; sin poda $1+3+6+6=16$. Con muchas ciudades el ahorro es enorme. La poda es válida porque las distancias no son negativas: un coste parcial nunca baja."
   },
   {
    "id": "peldanos#K17",
    "n": "K17",
    "title": "Secuencias de paréntesis válidas",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Con $n$ parejas de paréntesis se quieren todas las secuencias bien formadas. Se construye la secuencia carácter a carácter con un árbol binario (abrir o cerrar), podando las ramas que no pueden llegar a ser válidas.\n- a) ¿Cuándo se puede añadir un `(`? ¿Y un `)`?\n- b) Lista las secuencias para $n=3$ en el orden en que se generan (primero se prueba `(`).\n- c) Para $n=2$, ¿cuántas llamadas se hacen con esas dos condiciones (contando la raíz)?",
    "hint": "Hay que llevar el número de paréntesis abiertos y de cerrados. Un `)` solo es válido si hay algún `(` sin cerrar.",
    "solution": "**Paso 1. Condiciones.** a) Se puede abrir si `abiertos < n`. Se puede cerrar si `cerrados < abiertos`.\n\n**Paso 2. $n=3$.** b) `((()))`, `(()())`, `(())()`, `()(())`, `()()()`: son $5$ (el número de Catalan $C_3$).\n\n**Paso 3. $n=2$.** c) Se generan `(())` y `()()`. El árbol podado tiene $8$ llamadas con la raíz. Sin poda serían $2^{5}-1=31$."
   },
   {
    "id": "peldanos#K18",
    "n": "K18",
    "title": "Combinaciones con repetición",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.55,
    "steps": true,
    "statement": "Se quieren las secuencias de $m=2$ elementos de `['a','b','c']` en orden no decreciente de índice, **pudiendo repetir** elementos: `aa, ab, ac, bb, bc, cc`. Se usa el esquema de K03 (un resultado en cada hoja, índice mínimo `j`).\n- a) ¿Qué cambia respecto a las combinaciones sin repetición en el rango del bucle?\n- b) Escribe el código y las llamadas en orden.\n- c) ¿Cuántas hay en general?",
    "hint": "Sin repetición, el candidato siguiente empieza en `j + 1`. Con repetición, un elemento ya usado se puede volver a usar.",
    "solution": "**Paso 1. El bucle.** a) El rango empieza en `j` (no en `j + 1`): `for k in range(j, n)`.\n\n**Paso 2. Código.** b)\n```python\ndef combinaciones_rep(i, j, sol, a, m):\n    if i == m:\n        print(sol)\n    else:\n        for k in range(j, len(a)):\n            sol[i] = a[k]\n            combinaciones_rep(i + 1, k, sol, a, m)\n```\ncon llamada inicial `combinaciones_rep(0, 0, [None]*m, a, m)`. Imprime `aa, ab, ac, bb, bc, cc` (10 llamadas con la raíz).\n\n**Paso 3. Cuántas.** c) $\\binom{n+m-1}{m}$: con $n=3$, $m=2$, $\\binom42=6$."
   },
   {
    "id": "peldanos#K19",
    "n": "K19",
    "title": "Permutaciones con elementos repetidos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Se quieren las permutaciones de los elementos `x` (dos veces) e `y` (una vez): `xxy`, `xyx`, `yxx`. En vez de la lista `libres` (booleanos) se usa la lista `restantes = [2, 1]`, con las unidades que quedan de cada elemento.\n- a) ¿Qué condición se usa para elegir el candidato `k` en el nivel `i`?\n- b) ¿Qué hay que hacer antes y después de la llamada recursiva?\n- c) Traza y cuenta las permutaciones. ¿Cuántas habría sin repetidos y con la fórmula?",
    "hint": "Un candidato vale si queda alguna unidad: `restantes[k] > 0`. Se gasta una unidad al colocarlo y se devuelve al volver.",
    "solution": "**Paso 1. Condición.** a) `if restantes[k] > 0:`.\n\n**Paso 2. Actualizar.** b) `restantes[k] -= 1` antes de llamar y `restantes[k] += 1` al volver (igual que `libres[k] = False/True`).\n```python\ndef perm_rep(i, restantes, sol, a):\n    if i == len(sol):\n        print(sol)\n    else:\n        for k in range(len(a)):\n            if restantes[k] > 0:\n                sol[i] = a[k]\n                restantes[k] -= 1\n                perm_rep(i + 1, restantes, sol, a)\n                restantes[k] += 1\n```\n**Paso 3. Resultado.** c) Salen `xxy`, `xyx`, `yxx` (9 llamadas con la raíz). Sin repetidos serían $3!=6$. Con repetidos: $\\dfrac{3!}{2!\\,1!}=3$."
   },
   {
    "id": "peldanos#K24",
    "n": "K24",
    "title": "Repartir elementos en grupos de tamaños dados",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Hay que contar de cuántas formas se reparten $n=4$ elementos en $m$ grupos con tamaños $a=[2,1,1]$ (el grupo $1$ con $2$ elementos, el $2$ con $1$ y el $3$ con $1$), siendo los grupos distinguibles.\n- a) Reformula el problema como asignar a cada elemento el número de su grupo. ¿Con qué esquema de backtracking se corresponde?\n- b) Cuenta los repartos para $a=[2,2]$ y para $a=[2,1,1]$ con la fórmula y con el esquema.",
    "hint": "Cada elemento recibe una etiqueta de grupo, y la etiqueta $g$ debe usarse exactamente $a_g$ veces. Es como permutar un multiconjunto con `restantes = a`.",
    "solution": "**Paso 1. Esquema.** a) El nivel $i$ asigna un grupo `g` al elemento $i$ si `restantes[g] > 0`, y gasta una unidad. Es el esquema de las permutaciones con repetidos (K19).\n\n**Paso 2. Cuentas.** b) $a=[2,2]$: $\\dfrac{4!}{2!\\,2!}=6$ repartos (19 llamadas con la raíz). $a=[2,1,1]$: $\\dfrac{4!}{2!\\,1!\\,1!}=12$ (35 llamadas). Con $C=\\{0,1,2,3,4\\}$ y $a=[2,1,2]$ son $\\dfrac{5!}{2!\\,1!\\,2!}=30$."
   },
   {
    "id": "peldanos#K20",
    "n": "K20",
    "title": "Dividir una lista en dos con la misma suma",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Se quieren todas las formas de dividir $S=[1,2,3,4,6]$ en dos listas $A$ y $B$ con la misma suma.\n- a) ¿Cuánto debe sumar cada lista? ¿Puede haber solución si el total fuera impar?\n- b) Esquema: el elemento $i$ va a $A$ ($k=0$) o a $B$ ($k=1$). Para no contar cada división dos veces, ¿qué se fija?\n- c) ¿Qué poda se puede aplicar y qué solución sale?",
    "hint": "Basta controlar la suma de $B$. La división $(A,B)$ y la $(B,A)$ son la misma salvo el nombre, así que se obliga a que el primer elemento esté en $A$.",
    "solution": "**Paso 1. Suma objetivo.** a) El total es $16$, cada lista debe sumar $8$. Con total impar no hay solución.\n\n**Paso 2. Evitar duplicados.** b) Se fija el primer elemento ($1$) en $A$. Así cada división aparece una sola vez.\n\n**Paso 3. Poda y resultado.** c) Se poda si `suma_B > total / 2`. En una hoja es solución si `suma_B == total / 2`. Se hacen $24$ llamadas (con la raíz) y sale una única división: $A=[1,3,4]$ y $B=[2,6]$."
   },
   {
    "id": "peldanos#K25",
    "n": "K25",
    "title": "Del laberinto a un grafo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Para hallar el camino **más corto** en un laberinto se puede transformar en un grafo y aplicar un algoritmo de caminos mínimos (en lugar de backtracking). Con el laberinto de K11:\n```\nE E E E\nE W W E\nE E W E\n```\n- a) ¿Cuántos nodos y cuántas aristas tiene el grafo (un nodo por celda vacía, una arista entre vacías adyacentes)?\n- b) ¿Qué longitud (nº de aristas) tiene el camino más corto de `(0,0)` a `(2,3)`?\n- c) ¿Por qué BFS (o Dijkstra con pesos $1$) lo resuelve?",
    "hint": "Cuenta las celdas `E` y, para las aristas, revisa los pares horizontales y verticales. Para el camino, explora por niveles desde la entrada.",
    "solution": "**Paso 1. Nodos y aristas.** a) Celdas vacías: $4+2+3=9$. Aristas horizontales: $3$ en la fila $0$, $1$ en la fila $2$; verticales: `(0,0)-(1,0)`, `(1,0)-(2,0)`, `(0,3)-(1,3)`, `(1,3)-(2,3)`. En total $9$ nodos y $8$ aristas.\n\n**Paso 2. Camino más corto.** b) `(0,0),(0,1),(0,2),(0,3),(1,3),(2,3)`: $5$ aristas. Es el único camino, porque el grafo no tiene ciclos.\n\n**Paso 3. Algoritmo.** c) Con todas las aristas de peso $1$, el camino más corto es el que tiene menos aristas: BFS lo encuentra por niveles, y Dijkstra da el mismo resultado. Es una transformación (transforma y vencerás), sin backtracking."
   },
   {
    "id": "peldanos#K13",
    "n": "K13",
    "title": "Colorear un grafo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Grafo con aristas $0\\!-\\!1$, $0\\!-\\!2$, $1\\!-\\!2$, $2\\!-\\!3$ (matriz de adyacencia $A$). Se quiere saber si se puede colorear con $m$ colores sin que dos vértices adyacentes tengan el mismo.\n- a) Esquema: ¿qué es la solución parcial y qué candidatos hay en cada nivel? ¿Cuándo es válido un candidato?\n- b) Traza con $m=3$ hasta la primera coloración y cuenta cuántas hay en total.\n- c) ¿Y con $m=2$?",
    "hint": "El nivel $i$ es el vértice $i$ y los candidatos son los colores $0,\\dots,m-1$. Un color vale si ningún vecino **ya coloreado** ($j<i$) lo tiene.",
    "solution": "**Paso 1. Esquema.** a) `sol[i]` es el color del vértice `i`. Candidato `c` válido si para todo `j < i` con `A[i][j] == 1` se cumple `sol[j] != c`.\n```python\ndef valido(i, c, sol, A):\n    return all(not (A[i][j] == 1 and sol[j] == c) for j in range(i))\n```\n**Paso 2. Con 3 colores.** b) Primera coloración: `[0,1,2,0]` (el vértice $3$ solo es vecino del $2$, que tiene el $2$, así que le toca el $0$). En total hay $12$ coloraciones: $3\\cdot2\\cdot1$ para el triángulo y $2$ opciones para el vértice $3$. Si se buscan todas, son $28$ llamadas.\n\n**Paso 3. Con 2 colores.** c) No hay ninguna: el triángulo necesita $3$ colores. El árbol se corta en el vértice $2$ (5 llamadas)."
   },
   {
    "id": "peldanos#K27",
    "n": "K27",
    "title": "Selección de actividades con backtracking",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Actividades $A=[0,10)$, $X=[0,5)$, $Y=[4,6)$, $Z=[5,10)$. Se decide para cada una, en ese orden, si se incluye (sí/no), y solo se puede incluir si es compatible con las ya elegidas.\n- a) ¿Cómo se comprueba la compatibilidad de una candidata?\n- b) Lista los subconjuntos que se llegan a formar y cuántas llamadas hay.\n- c) ¿Cuál es el óptimo?",
    "hint": "Dos actividades $[c_1,f_1)$ y $[c_2,f_2)$ son compatibles si $c_2\\ge f_1$ o $c_1\\ge f_2$. Una candidata hay que compararla con todas las ya elegidas.",
    "solution": "**Paso 1. Compatibilidad.** a) Con todas las elegidas `e`: `c_nueva >= f_e or c_e >= f_nueva`.\n\n**Paso 2. Subconjuntos.** b) Se forman $\\{\\}$, $\\{Z\\}$, $\\{Y\\}$, $\\{X\\}$, $\\{X,Z\\}$ y $\\{A\\}$. $\\{X,Y\\}$, $\\{Y,Z\\}$ y $\\{A,\\ast\\}$ se podan por solaparse. Son $16$ llamadas (con la raíz).\n\n**Paso 3. Óptimo.** c) $\\{X,Z\\}$, con $2$ actividades. Con backtracking se mira todo; con la estrategia voraz de V13 (\"termina antes\") se llega al mismo resultado sin explorar."
   },
   {
    "id": "peldanos#K26",
    "n": "K26",
    "title": "Ciclo euleriano",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "backtracking"
    ],
    "stage": "backtracking",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Grafo con aristas $0\\!-\\!1$, $1\\!-\\!2$, $2\\!-\\!0$, $2\\!-\\!3$, $3\\!-\\!4$, $4\\!-\\!2$. Un ciclo euleriano recorre cada arista **una sola vez** y vuelve al vértice de partida ($0$).\n- a) ¿Qué es la solución parcial y cuándo es completa?\n- b) ¿Qué condición debe cumplir un candidato (vértice siguiente)?\n- c) Traza con vecinos en orden creciente hasta el primer ciclo.",
    "hint": "Hay que recordar qué aristas se han usado (una matriz de booleanos simétrica). Con $6$ aristas, la secuencia tiene $7$ vértices.",
    "solution": "**Paso 1. Solución.** a) La secuencia de vértices recorridos. Completa cuando se han usado todas las aristas ($6$) y el último vértice es el $0$.\n\n**Paso 2. Candidato.** b) Desde `v`, el vértice `w` vale si hay arista `v–w` y todavía no se ha usado. Al incluirlo se marca usada (en los dos sentidos), y al volver atrás se desmarca.\n\n**Paso 3. Traza.** c) $0\\to1\\to2$. Desde $2$ el primer vecino es $0$: se va ($2\\to0$), pero en $0$ no quedan aristas libres y no se han usado las $6$: callejón, vuelta atrás. Siguiente vecino de $2$: $3$, luego $3\\to4$, $4\\to2$ y por último $2\\to0$ ya con las $6$ aristas usadas. Ciclo: $\\langle0,1,2,3,4,2,0\\rangle$ (8 llamadas)."
   },
   {
    "id": "peldanos#B01",
    "n": "B01",
    "title": "Cuántas veces se ejecuta el cuerpo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.2,
    "steps": true,
    "statement": "**Ejemplo resuelto.** `for i in range(5)` da a $i$ los valores $0,1,2,3,4$: el cuerpo se ejecuta $5$ veces. Con $n$ en lugar de $5$, $n$ veces.\n\n**Ahora tú.** ¿Cuántas veces se ejecuta el cuerpo?\n- a) `for i in range(n)`\n- b) `for i in range(1, n)`\n- c) `for i in range(2, n + 1)`\n- d) `for i in range(0, n, 2)`, con $n$ par\n- e) `i = 1` y `while i < n: i = i * 2`, con $n$ potencia de $2$",
    "hint": "Escribe los valores que toma $i$ para un $n$ pequeño, por ejemplo $n=8$, y cuéntalos. Recuerda que `range(a, b)` llega hasta $b-1$.",
    "solution": "**Paso 1. Escribe los valores con $n=8$.** a) $0,\\dots,7$: $8$. b) $1,\\dots,7$: $7$. c) $2,\\dots,8$: $7$. d) $0,2,4,6$: $4$. e) $i=1,2,4$ (cuando $i=8$ ya no se cumple $i<8$): $3$.\n\n**Paso 2. Generaliza.** a) $n$. b) $n-1$. c) $n-1$ (de $2$ a $n$ hay $n-2+1$). d) $n/2$ (se salta de dos en dos). e) $\\log_2n$: en cada vuelta $i$ se dobla, y hacen falta $\\log_2n$ dobles para llegar de $1$ a $n$."
   },
   {
    "id": "peldanos#B02",
    "n": "B02",
    "title": "El coste de un bucle",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "Para contar operaciones, la inicialización, cada comparación y cada incremento cuentan $1$. El coste de un bucle que se repite $n$ veces es\n$$T=1_{\\text{inic.}}+\\sum_{i=1}^{n}\\bigl(1_{\\text{comp.}}+T_{\\text{cuerpo}}+1_{\\text{incr.}}\\bigr)+1_{\\text{última comp.}}$$\n\n**Ejemplo resuelto.** `for i in range(n): x += 1` (el cuerpo es $1$ operación): $T=1+n(1+1+1)+1=3n+2$.\n\n**Ahora tú.** Calcula $T$ en función de $n$:\n- a) `for i in range(n)`, con un cuerpo de $2$ operaciones\n- b) `for i in range(1, n)`, con un cuerpo de $1$ operación\n- c) Comprueba (a) y (b) con $n=3$ contando una a una.",
    "hint": "Primero cuenta las iteraciones (como en el ejercicio anterior); la fórmula es \"$1+$ iteraciones $\\times$ (qué cuesta una vuelta) $+\\,1$\".",
    "solution": "**Paso 1. a).** $n$ iteraciones, cada una $1+2+1=4$: $T=1+4n+1=4n+2$.\n\n**Paso 2. b).** $n-1$ iteraciones, cada una $1+1+1=3$: $T=1+3(n-1)+1=3n-1$.\n\n**Paso 3. Comprueba con $n=3$.** a) $4\\cdot3+2=14$: inicio ($1$), tres vueltas de $4$ ($12$) y la última comparación ($1$). b) $3\\cdot3-1=8$: inicio ($1$), dos vueltas de $3$ ($6$) y la última comparación ($1$).\n\n**Paso 4. Orden.** Los dos son $\\Theta(n)$: las constantes no cambian el orden."
   },
   {
    "id": "peldanos#B03",
    "n": "B03",
    "title": "Dos bucles anidados: contar",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Cuenta cuántas veces se ejecuta `c += 1`:\n```python\nfor i in range(n):            # (a)\n    for j in range(n):\n        c += 1\n\nfor i in range(n):            # (b)\n    for j in range(i):\n        c += 1\n\nfor i in range(n):            # (c)\n    for j in range(i, n):\n        c += 1\n```\n**Ejemplo resuelto para (b) con $n=4$.** $i=0$: $0$ veces; $i=1$: $1$; $i=2$: $2$; $i=3$: $3$. Total $6$.\n\n**Ahora tú.** Haz lo mismo para (a) y (c) con $n=4$, y da la fórmula en función de $n$ para los tres.",
    "hint": "La vuelta $i$ del bucle exterior repite el cuerpo tantas veces como iteraciones tiene el interior para ese $i$. Después suma sobre $i$.",
    "solution": "**Paso 1. Tabla con $n=4$.** (a) $4+4+4+4=16$. (b) $0+1+2+3=6$. (c) $4+3+2+1=10$.\n\n**Paso 2. Fórmulas.** (a) $\\sum_{i=0}^{n-1}n=n^{2}$. (b) $\\sum_{i=0}^{n-1}i=\\dfrac{n(n-1)}{2}$. (c) $\\sum_{i=0}^{n-1}(n-i)=\\dfrac{n(n+1)}{2}$.\n\n**Paso 3. Comprueba y ordena.** Con $n=4$: $16$, $\\frac{4\\cdot3}{2}=6$, $\\frac{4\\cdot5}{2}=10$. Los tres son $\\Theta(n^{2})$, aunque (b) hace la mitad de trabajo que (a)."
   },
   {
    "id": "peldanos#B04",
    "n": "B04",
    "title": "Insertion-sort, a mano",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "```python\ndef insert_sort(a):\n    for j in range(1, len(a)):\n        val = a[j]\n        i = j - 1\n        while i >= 0 and a[i] > val:\n            a[i + 1] = a[i]\n            i = i - 1\n        a[i + 1] = val\n```\nSea $t_j$ el número de veces que se ejecuta el cuerpo del `while` para un valor de $j$.\n- a) Aplícalo a $[2,5,1,4,3]$ y anota $t_1,t_2,t_3,t_4$.\n- b) ¿Qué vale $\\sum t_j$ si el vector ya está ordenado, como $[1,2,3,4,5]$?\n- c) ¿Y si está en orden inverso, $[5,4,3,2,1]$? Da la fórmula para $n$ elementos.",
    "hint": "En cada $j$, el `while` desplaza a la derecha los elementos de la parte ordenada que son mayores que `val`. $t_j$ es cuántos desplaza.",
    "solution": "**Paso 1. a), vuelta a vuelta.** $j=1$: `val`$=5$, no hay nada mayor delante: $t_1=0$. $j=2$: `val`$=1$ desplaza el $5$ y el $2$: $t_2=2$. Queda $[1,2,5,4,3]$. $j=3$: `val`$=4$ desplaza el $5$: $t_3=1$. Queda $[1,2,4,5,3]$. $j=4$: `val`$=3$ desplaza el $5$ y el $4$: $t_4=2$. Total $\\sum t_j=5$.\n\n**Paso 2. Mejor caso.** b) Ordenado: nadie se desplaza, $t_j=0$ para todo $j$ y $\\sum t_j=0$.\n\n**Paso 3. Peor caso.** c) Inverso: cada `val` es menor que todos los de delante, así que $t_j=j$. Para $n=5$: $1+2+3+4=10$. En general $\\sum_{j=1}^{n-1}j=\\dfrac{n(n-1)}{2}$."
   },
   {
    "id": "peldanos#B05",
    "n": "B05",
    "title": "El coste de insertion-sort",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Con el mismo código de insertion-sort del ejercicio anterior, suponemos que **cada línea ejecutada cuesta $1$**. Las veces que se ejecuta cada línea son:\n\n| línea | veces |\n|---|---|\n| `for j ...` | $n$ |\n| `val = a[j]` | $n-1$ |\n| `i = j - 1` | $n-1$ |\n| `while ...` (la condición) | $\\sum_{j=1}^{n-1}(t_j+1)$ |\n| `a[i+1] = a[i]` | $\\sum_{j=1}^{n-1}t_j$ |\n| `i = i - 1` | $\\sum_{j=1}^{n-1}t_j$ |\n| `a[i+1] = val` | $n-1$ |\n\n- a) Calcula $T(n)$ en el mejor caso ($t_j=0$).\n- b) Calcula $T(n)$ en el peor caso ($t_j=j$).\n- c) Comprueba las dos fórmulas con $n=5$ y da el orden de cada una.",
    "hint": "Suma todas las filas de la tabla. En el peor caso necesitas $\\sum_{j=1}^{n-1}j=\\frac{n(n-1)}{2}$ y $\\sum_{j=1}^{n-1}(j+1)=\\frac{n(n+1)}{2}-1$.",
    "solution": "**Paso 1. Mejor caso.** a) $n+(n-1)+(n-1)+(n-1)+0+0+(n-1)=5n-4$. El `while` solo evalúa su condición una vez por vuelta.\n\n**Paso 2. Peor caso, las filas.** b) Condición: $\\frac{n(n+1)}{2}-1$. Cuerpo del `while`, dos líneas: $2\\cdot\\frac{n(n-1)}{2}=n(n-1)$. Las otras cuatro suman $n+3(n-1)=4n-3$.\n\n**Paso 3. Peor caso, el total.** $T(n)=4n-3+\\dfrac{n(n+1)}{2}-1+n(n-1)=\\dfrac{3n^{2}}{2}+\\dfrac{7n}{2}-4$.\n\n**Paso 4. Comprueba con $n=5$.** Mejor: $5\\cdot5-4=21$ (suma de la tabla: $5+4+4+4+4$). Peor: $\\frac{3\\cdot25}{2}+\\frac{35}{2}-4=51$ (suma de la tabla: $5+4+4+14+10+10+4$). Mejor caso $\\Theta(n)$, peor caso $\\Theta(n^{2})$."
   },
   {
    "id": "peldanos#B06",
    "n": "B06",
    "title": "Un doble bucle triangular, con la fórmula",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Con la convención del ejercicio B02 (inicialización, comparación, incremento y cada operación del cuerpo cuentan $1$), calcula $T(n)$ de\n```python\nfor i in range(n):\n    for j in range(i):\n        x += 1\n```\n- a) Coste del bucle interior para un $i$ dado.\n- b) Coste del bucle exterior, sumando sobre $i$.\n- c) Comprueba con $n=2$ contando una a una.",
    "hint": "El bucle interior hace $i$ vueltas de $1+1+1=3$ más $2$ (inicialización y última comparación). El exterior suma ese coste, más $2$ por vuelta, para $i=0,\\dots,n-1$.",
    "solution": "**Paso 1. Bucle interior.** a) $T_{\\text{int}}(i)=1+3i+1=3i+2$.\n\n**Paso 2. Bucle exterior.** b) $T(n)=1+\\sum_{i=0}^{n-1}\\bigl(1+(3i+2)+1\\bigr)+1=2+\\sum_{i=0}^{n-1}(3i+4)$.\n\n**Paso 3. Resuelve las sumas.** $\\sum_{i=0}^{n-1}3i=\\dfrac{3n(n-1)}{2}$ y $\\sum_{i=0}^{n-1}4=4n$. Por tanto $T(n)=2+\\dfrac{3n(n-1)}{2}+4n=\\dfrac{3n^{2}+5n+4}{2}$.\n\n**Paso 4. Comprueba con $n=2$.** El interior cuesta $2$ para $i=0$ y $5$ para $i=1$. El exterior: $1+(1+2+1)+(1+5+1)+1=13$. La fórmula da $\\frac{12+10+4}{2}=13$. Orden: $\\Theta(n^{2})$."
   },
   {
    "id": "peldanos#B07",
    "n": "B07",
    "title": "El orden de un bucle, sin contar todo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Da el orden $\\Theta$ del número de veces que se ejecuta `trabajo()` (una operación) en cada fragmento:\n```python\n# (a)\nfor i in range(n):\n    for j in range(n):\n        trabajo()\n# (b)\nfor i in range(n):\n    j = 1\n    while j < n:\n        trabajo()\n        j = j * 2\n# (c)\nfor i in range(n):\n    for j in range(n):\n        for k in range(n):\n            trabajo()\n# (d)\nfor i in range(n):\n    for j in range(i * i):\n        trabajo()\n# (e)\nfor i in range(n):\n    trabajo()\nfor i in range(n):\n    for j in range(n):\n        trabajo()\n# (f)\nfor i in range(n):\n    for j in range(5):\n        trabajo()\n```",
    "hint": "Escribe, para cada fragmento, el sumatorio de las vueltas: \"bucle exterior $\\times$ vueltas del interior\". Un `while` que dobla `j` da $\\log_2n$ vueltas.",
    "solution": "**Paso 1. (a), (c), (f).** (a) $\\sum_{i}\\sum_{j}1=n^{2}$: $\\Theta(n^{2})$. (c) $n^{3}$: $\\Theta(n^{3})$. (f) $5n$: $\\Theta(n)$.\n\n**Paso 2. (b).** El `while` da $\\log_2n$ vueltas en cada una de las $n$ del bucle exterior: $n\\log_2n$, $\\Theta(n\\log n)$.\n\n**Paso 3. (d).** $\\sum_{i=0}^{n-1}i^{2}=\\dfrac{(n-1)n(2n-1)}{6}\\in\\Theta(n^{3})$.\n\n**Paso 4. (e).** Dos bucles seguidos se suman: $n+n^{2}\\in\\Theta(n^{2})$. Manda el mayor."
   },
   {
    "id": "peldanos#B08",
    "n": "B08",
    "title": "Burbuja: contar comparaciones",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "```python\ndef bubble_sort(a):\n    n = len(a)\n    for i in range(0, n - 1):\n        for j in range(n - 1, i, -1):\n            if a[j - 1] > a[j]:\n                a[j - 1], a[j] = a[j], a[j - 1]\n```\n- a) ¿Cuántas veces se evalúa la condición del `if` para cada $i$?\n- b) ¿Cuántas en total? Calcúlalo para $n=5$ y para $n$ general.\n- c) ¿Cuántos intercambios hace con $[1,2,3,4,5]$? ¿Y con $[5,4,3,2,1]$?\n- d) ¿De qué orden es el algoritmo en el mejor y en el peor caso?",
    "hint": "Para un $i$, `j` va de $n-1$ hasta $i+1$ (bajando): son $n-1-i$ valores.",
    "solution": "**Paso 1. Por cada $i$.** a) $n-1-i$ comparaciones.\n\n**Paso 2. Total.** b) $\\sum_{i=0}^{n-2}(n-1-i)=(n-1)+(n-2)+\\cdots+1=\\dfrac{n(n-1)}{2}$. Con $n=5$: $4+3+2+1=10$.\n\n**Paso 3. Intercambios.** c) Con el vector ordenado la condición nunca es cierta: $0$ intercambios. Con el vector inverso, cada comparación encuentra una pareja desordenada: $10$ intercambios para $n=5$.\n\n**Paso 4. Orden.** d) Las comparaciones no dependen de los datos: siempre $\\frac{n(n-1)}{2}$. En los dos casos el coste es $\\Theta(n^{2})$. Solo cambia el número de intercambios, que es una constante por cada comparación."
   },
   {
    "id": "peldanos#B09",
    "n": "B09",
    "title": "Salir antes de tiempo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Halla el orden $\\Theta$ en el mejor y en el peor caso:\n```python\ndef contiene(a, x):\n    for i in range(len(a)):\n        if a[i] == x:\n            return True\n    return False\n\ndef hay_repetidos(a):\n    n = len(a)\n    for i in range(n):\n        for j in range(i + 1, n):\n            if a[i] == a[j]:\n                return True\n    return False\n```\n- a) `contiene`, mejor y peor caso.\n- b) `hay_repetidos`, mejor y peor caso. En el peor, calcula el número de comparaciones para $n=5$ y para $n$ general.",
    "hint": "El mejor caso es el que sale de los bucles lo antes posible. El peor es el que nunca encuentra lo que busca y recorre todo.",
    "solution": "**Paso 1. a).** Mejor caso: `x` es `a[0]` y se sale tras una comparación: $\\Theta(1)$. Peor caso: `x` no está y se recorre toda la lista: $\\Theta(n)$.\n\n**Paso 2. b), mejor caso.** `a[0] == a[1]`: una comparación, $\\Theta(1)$.\n\n**Paso 3. b), peor caso.** Todos distintos: se comparan todas las parejas. Para cada $i$ hay $n-1-i$ comparaciones: $\\sum_{i=0}^{n-1}(n-1-i)=\\dfrac{n(n-1)}{2}$. Con $n=5$: $10$. Orden $\\Theta(n^{2})$."
   },
   {
    "id": "peldanos#B11",
    "n": "B11",
    "title": "Tres bucles: cambiar el orden de la suma",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.9,
    "steps": true,
    "statement": "```python\nfor i in range(n):\n    for j in range(i + 1, n + 1):\n        for k in range(j):\n            trabajo()\n```\n- a) Cuenta a mano cuántas veces se llama a `trabajo()` con $n=2$.\n- b) Escribe el total como $\\displaystyle\\sum_{i=0}^{n-1}\\sum_{j=i+1}^{n}j$.\n- c) Cambia el orden de las sumas: ¿cuántas veces aparece cada valor de $j$ y cuánto vale el total?\n- d) Comprueba con $n=3$ y da el orden.",
    "hint": "En lugar de fijar $i$ y recorrer $j$, fija $j$ y pregunta: ¿para cuántos valores de $i$ se cumple $i+1\\le j\\le n$? Es decir, $0\\le i\\le j-1$.",
    "solution": "**Paso 1. $n=2$ a mano.** a) $i=0$: $j=1$ da $1$ llamada, $j=2$ da $2$. $i=1$: $j=2$ da $2$. Total $5$.\n\n**Paso 2. Plantea el sumatorio.** b) La vuelta $(i,j)$ ejecuta el `for k` $j$ veces: $\\sum_{i=0}^{n-1}\\sum_{j=i+1}^{n}j$.\n\n**Paso 3. Cambia el orden.** c) El valor $j$ ($1\\le j\\le n$) aparece para $i=0,\\dots,j-1$, es decir, $j$ veces. El total es $\\sum_{j=1}^{n}j\\cdot j=\\sum_{j=1}^{n}j^{2}=\\dfrac{n(n+1)(2n+1)}{6}$. Con $n=2$: $\\frac{2\\cdot3\\cdot5}{6}=5$.\n\n**Paso 4. Comprueba y ordena.** d) $n=3$: $i=0$: $1+2+3=6$; $i=1$: $2+3=5$; $i=2$: $3$. Total $14$ y $\\frac{3\\cdot4\\cdot7}{6}=14$. Orden $\\Theta(n^{3})$."
   },
   {
    "id": "peldanos#B12",
    "n": "B12",
    "title": "Un doble `while` triangular con operaciones",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Con la convención de B02 (inicialización, comparación e incremento cuestan $1$; `procesa` cuesta $3$), calcula $T(n)$ de\n```python\ni = 0\nwhile i < n:\n    j = 0\n    while j <= i:\n        procesa(i, j)        # 3 operaciones\n        j += 1\n    i += 1\n```\n- a) Coste del `while` interior para un $i$.\n- b) Coste total sumando sobre $i$.\n- c) Comprueba con $n=1$ y da el orden.",
    "hint": "El interior ejecuta el cuerpo $i+1$ veces ($j=0,\\dots,i$). Cada vuelta cuesta $1+3+1=5$, y hay que sumar la inicialización de `j` y la última comparación.",
    "solution": "**Paso 1. Interior.** a) $T_{\\text{int}}(i)=1+\\sum_{j=0}^{i}(1+3+1)+1=5(i+1)+2=5i+7$.\n\n**Paso 2. Exterior.** b) $T(n)=1+\\sum_{i=0}^{n-1}\\bigl(1+(5i+7)+1\\bigr)+1=2+\\sum_{i=0}^{n-1}(5i+9)=2+\\dfrac{5n(n-1)}{2}+9n=\\dfrac{5n^{2}+13n+4}{2}$.\n\n**Paso 3. Comprueba.** c) $n=1$: sólo $i=0$, el interior vale $7$ y el total $1+(1+7+1)+1=11$. La fórmula da $\\frac{5+13+4}{2}=11$. Orden $\\Theta(n^{2})$."
   },
   {
    "id": "peldanos#B13",
    "n": "B13",
    "title": "Un `for` interior cuyo límite es $3i$",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Con la convención de B02 (`procesa` cuesta $1$), calcula $T(n)$ de\n```python\nfor i in range(1, n):\n    for j in range(0, 3 * i):\n        procesa(i, j)        # 1 operación\n```\n- a) Coste del bucle interior para un $i$.\n- b) Coste total.\n- c) Comprueba con $n=2$.",
    "hint": "El interior hace $3i$ vueltas (de $j=0$ a $3i-1$). El exterior recorre $i=1,\\dots,n-1$.",
    "solution": "**Paso 1. Interior.** a) $T_{\\text{int}}(i)=1+3i\\,(1+1+1)+1=9i+2$.\n\n**Paso 2. Exterior.** b) $T(n)=1+\\sum_{i=1}^{n-1}\\bigl(1+(9i+2)+1\\bigr)+1=2+\\sum_{i=1}^{n-1}(9i+4)=2+\\dfrac{9n(n-1)}{2}+4(n-1)=\\dfrac{9n^{2}-n-4}{2}$.\n\n**Paso 3. Comprueba.** c) $n=2$: sólo $i=1$; el interior hace $3$ vueltas y cuesta $1+9+1=11$. Total $1+(1+11+1)+1=15$ y la fórmula da $\\frac{36-2-4}{2}=15$."
   },
   {
    "id": "peldanos#B14",
    "n": "B14",
    "title": "Un `if` dentro del bucle: mejor y peor caso",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "contar-bucles"
    ],
    "stage": "bucles",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Con la convención de B02 (la condición del `if` cuesta $1$, `procesa` cuesta $2$), calcula $T(n)$ en el mejor y en el peor caso:\n```python\nfor i in range(n):\n    if condicion(i):             # 1 operación\n        for j in range(i):\n            procesa(i, j)        # 2 operaciones\n```\n- a) Mejor caso: la condición nunca se cumple.\n- b) Peor caso: siempre se cumple.\n- c) Comprueba el peor caso con $n=1$ y da los órdenes.",
    "hint": "En el peor caso el cuerpo del `for` externo cuesta $1$ (la condición) más el coste del `for` interior, que hace $i$ vueltas de $1+2+1$.",
    "solution": "**Paso 1. Mejor caso.** a) El cuerpo cuesta $1$: $T(n)=1+n(1+1+1)+1=3n+2\\in\\Theta(n)$.\n\n**Paso 2. Peor caso, interior.** b) $T_{\\text{int}}(i)=1+4i+1=4i+2$, así que el cuerpo exterior cuesta $1+(4i+2)=4i+3$.\n\n**Paso 3. Peor caso, total.** $T(n)=1+\\sum_{i=0}^{n-1}\\bigl(1+(4i+3)+1\\bigr)+1=2+\\sum_{i=0}^{n-1}(4i+5)=2+2n(n-1)+5n=2n^{2}+3n+2$.\n\n**Paso 4. Comprueba.** c) $n=1$: el cuerpo cuesta $1+(1+0+1)=3$ y $T=1+(1+3+1)+1=7$; la fórmula da $2+3+2=7$. Órdenes: $\\Theta(n)$ en el mejor caso y $\\Theta(n^{2})$ en el peor."
   },
   {
    "id": "peldanos#D01",
    "n": "D01",
    "title": "Qué estrategia es",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.2,
    "steps": true,
    "statement": "Según el número de llamadas recursivas del caso recursivo: ninguna (se reduce a *otro* problema) es **transforma y vencerás**; una sola, con un problema más pequeño, es **decrementa y vencerás**; dos o más es **divide y vencerás**.\n\n**Ejemplo resuelto.** `factorial(n) = n * factorial(n - 1)`: una llamada con $n-1$. Decrementa y vencerás.\n\n**Ahora tú.** Clasifica:\n- a) `pot(x, n) = pot(x, n // 2) ** 2` (para $n$ par)\n- b) `maximo(a) = max(maximo(a[:m]), maximo(a[m:]))`\n- c) La mediana de una lista, ordenándola y mirando el elemento central\n- d) Quicksort: partir según un pivote y ordenar las dos partes\n- e) Búsqueda binaria en una lista ordenada\n- f) $\\sqrt a$ buscando un cero de $x^{2}-a$ con Newton-Raphson",
    "hint": "Cuenta las llamadas recursivas del caso recursivo. Si no hay recursión sino que el problema se convierte en otro, es una transformación.",
    "solution": "**Paso 1. Una llamada.** a) Una llamada con $n/2$: decrementa y vencerás. e) Búsqueda binaria: una llamada con una de las mitades, decrementa y vencerás.\n\n**Paso 2. Dos llamadas.** b) Dos llamadas con las mitades: divide y vencerás. d) Dos llamadas con las partes, y combinar es trivial: divide y vencerás.\n\n**Paso 3. Se transforma en otro problema.** c) La mediana se reduce a ordenar. f) La raíz se reduce a hallar un cero de una función. Ambos son transforma y vencerás."
   },
   {
    "id": "peldanos#D03",
    "n": "D03",
    "title": "Newton-Raphson para una raíz cuadrada",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Para $\\sqrt a$ la regla de Newton-Raphson es $x_{n+1}=\\dfrac{x_n^{2}+a}{2x_n}$. Toma $a=10$ y $x_0=10$.\n- a) Calcula $x_1,x_2,x_3,x_4$ (con 6 decimales).\n- b) Calcula en cada paso el error $x_n^{2}-10$. ¿Cómo evoluciona?\n- c) Escribe una función `raiz(a, tol)` que itere hasta que $|x^{2}-a|<$ `tol`.",
    "hint": "Es un bucle: cada vez sustituyes $x$ por $\\frac{x^{2}+a}{2x}$. Con calculadora, redondea al final, no en medio.",
    "solution": "**Paso 1. Iteraciones.** a) $x_1=\\frac{100+10}{20}=5{,}5$; $x_2=3{,}659091$; $x_3=3{,}196005$; $x_4=3{,}162456$. (El valor exacto es $\\sqrt{10}=3{,}162278\\ldots$)\n\n**Paso 2. Errores.** b) $x_1^{2}-10\\approx20{,}3$; $x_2^{2}-10\\approx3{,}39$; $x_3^{2}-10\\approx0{,}214$; $x_4^{2}-10\\approx0{,}00113$. Baja muy deprisa: cada paso eleva casi al cuadrado el error pequeño que había.\n\n**Paso 3. Código.** c)\n```python\ndef raiz(a, tol):\n    x = a\n    while abs(x * x - a) >= tol:\n        x = (x * x + a) / (2 * x)\n    return x\n```\nCon `raiz(10, 1e-6)` termina en 5 iteraciones."
   },
   {
    "id": "peldanos#D04",
    "n": "D04",
    "title": "Trazar el máximo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "```python\ndef maximo(a):\n    n = len(a)\n    if n == 1:\n        return a[0]\n    mitad = n // 2\n    return max(maximo(a[:mitad]), maximo(a[mitad:]))\n```\n- a) Dibuja el árbol de llamadas de `maximo([3, 9, 2, 7])`: qué lista recibe cada llamada.\n- b) ¿Cuántas llamadas hay en total? ¿Cuántas llamadas al `max` de dos números?\n- c) Generaliza para $n$ potencia de $2$.",
    "hint": "Cada llamada con más de un elemento hace dos llamadas con las mitades. Las llamadas sin hijos son las hojas.",
    "solution": "**Paso 1. Árbol.** a) `[3,9,2,7]` $\\to$ `[3,9]` y `[2,7]`; `[3,9]` $\\to$ `[3]` y `[9]`; `[2,7]` $\\to$ `[2]` y `[7]`. Las hojas devuelven $3,9,2,7$. Después `max(3,9)=9`, `max(2,7)=7`, `max(9,7)=9`.\n\n**Paso 2. Cuenta.** b) $1+2+4=7$ llamadas. Hay $3$ llamadas al `max` (una por llamada interior).\n\n**Paso 3. General.** c) Con $n$ hojas hay $n-1$ llamadas interiores: $2n-1$ llamadas y $n-1$ comparaciones. $T(n)=2T(n/2)+1$ da $\\Theta(n)$: dividir en dos no ayuda, hay que mirar todos los elementos."
   },
   {
    "id": "peldanos#D05",
    "n": "D05",
    "title": "Escribir un divide y vencerás con el esquema",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.45,
    "steps": true,
    "statement": "Diseña `suma(a)` que devuelva la suma de los elementos de una lista no vacía, con divide y vencerás. Rellena el esquema:\n1. Tamaño del problema.\n2. Caso base.\n3. Descomposición.\n4. Combinación.\n\nDespués escribe el código y comprueba con `[1, 2, 3, 4, 5]`. ¿Qué recurrencia sale y cuál es su orden?",
    "hint": "Es el mismo esquema que el máximo; solo cambia qué se hace con los dos resultados. Con una lista de longitud impar las mitades no son iguales; no importa.",
    "solution": "**Paso 1. Esquema.** Tamaño: $n=$`len(a)`. Caso base: si $n=1$, el resultado es `a[0]`. Descomposición: la mitad izquierda `a[:mitad]` y la derecha `a[mitad:]`. Combinación: la suma de las dos sumas.\n\n**Paso 2. Código.**\n```python\ndef suma(a):\n    n = len(a)\n    if n == 1:\n        return a[0]\n    mitad = n // 2\n    return suma(a[:mitad]) + suma(a[mitad:])\n```\n**Paso 3. Prueba.** `suma([1,2,3,4,5])`: `[1,2]` da $3$, `[3,4,5]` da $3+9=12$ (con `[3]` y `[4,5]`), total $15$.\n\n**Paso 4. Coste.** $T(n)=2T(n/2)+c$, $\\Theta(n)$ como el máximo. Recuerda que los trozos `a[:mitad]` cuestan una copia: si se cuenta, saldría $T(n)=2T(n/2)+n$, $\\Theta(n\\log n)$."
   },
   {
    "id": "peldanos#D06",
    "n": "D06",
    "title": "Mezclar dos listas ordenadas",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "La combinación de mergesort compara los primeros elementos de las dos listas, se queda con el menor, y repite. Mezcla a mano $a=[2,5,9]$ y $b=[1,5,6,10]$.\n- a) Escribe qué comparación se hace en cada paso y qué elemento sale. Si hay empate, sale el de $b$.\n- b) ¿Cuántas comparaciones se hacen hasta que una lista se vacía?\n- c) ¿Cuál es el máximo de comparaciones para listas de tamaños $p$ y $q$?",
    "hint": "Cuando una de las listas se vacía, lo que queda de la otra se copia sin comparar.",
    "solution": "**Paso 1. Los pasos.** a) $2$ vs $1$: sale $1$. $2$ vs $5$: sale $2$. $5$ vs $5$: sale el $5$ de $b$. $5$ vs $6$: sale el $5$ de $a$. $9$ vs $6$: sale $6$. $9$ vs $10$: sale $9$ y $a$ queda vacía. Se copia $10$.\n\n**Paso 2. Resultado.** El resultado es $[1,2,5,5,6,9,10]$ y se han hecho $6$ comparaciones.\n\n**Paso 3. Máximo.** c) Cada comparación saca un elemento y la última deja el resto sin comparar: como mucho $p+q-1$ comparaciones. Aquí $3+4-1=6$."
   },
   {
    "id": "peldanos#D07",
    "n": "D07",
    "title": "Mergesort paso a paso",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Con el `merge_sort` de los apuntes (`mitad = n // 2`, `a[:mitad]` y `a[mitad:]`), ordena $[5,2,8,1,9,3]$.\n- a) Dibuja el árbol de divisiones hasta listas de un elemento.\n- b) Anota las mezclas en orden y su resultado.\n- c) ¿Cuántas mezclas hay y cuántos niveles tiene el árbol?",
    "hint": "Con $6$ elementos, `mitad = 3`: salen dos listas de $3$. Con $3$ elementos, `mitad = 1`: salen una de $1$ y una de $2$.",
    "solution": "**Paso 1. Divisiones.** a) `[5,2,8,1,9,3]` $\\to$ `[5,2,8]` y `[1,9,3]`. `[5,2,8]` $\\to$ `[5]` y `[2,8]`. `[2,8]` $\\to$ `[2]` y `[8]`. `[1,9,3]` $\\to$ `[1]` y `[9,3]`. `[9,3]` $\\to$ `[9]` y `[3]`.\n\n**Paso 2. Mezclas.** b) En orden de ejecución: `[2]+[8]`$\\to[2,8]$; `[5]+[2,8]`$\\to[2,5,8]$; `[9]+[3]`$\\to[3,9]$; `[1]+[3,9]`$\\to[1,3,9]$; `[2,5,8]+[1,3,9]`$\\to[1,2,3,5,8,9]$.\n\n**Paso 3. Cuenta.** c) $5$ mezclas, es decir, $n-1$ (cada una une dos listas en una). Niveles: $1+\\lceil\\log_2 6\\rceil=4$ (de $6$ hasta listas de $1$)."
   },
   {
    "id": "peldanos#D08",
    "n": "D08",
    "title": "Insertar en una lista ordenada",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "El insert-sort recursivo de los apuntes dice que falta escribir la función auxiliar:\n```python\ndef insert_sort_rec(a):\n    if len(a) <= 1:\n        return a\n    return inserta_en_lista_ordenada(insert_sort_rec(a[:-1]), a[-1])\n```\n- a) Escribe `inserta_en_lista_ordenada(a, x)` recursiva: `a` ya está ordenada y devuelve una lista ordenada con `x` incluido.\n- b) Pruébala con `([1,3,5], 4)`, `([], 7)` y `([2,2], 2)`.\n- c) ¿Cuál es el coste de `insert_sort_rec`?",
    "hint": "Dos casos: si `x` va delante del primero (o la lista está vacía) se pone al principio; si no, se deja el primero y se inserta en el resto.",
    "solution": "**Paso 1. Código.** a)\n```python\ndef inserta_en_lista_ordenada(a, x):\n    if a == [] or x <= a[0]:\n        return [x] + a\n    return [a[0]] + inserta_en_lista_ordenada(a[1:], x)\n```\n**Paso 2. Pruebas.** b) `([1,3,5], 4)`: $1$ y $3$ se dejan, $4\\le5$ entra antes del $5$: `[1,3,4,5]`. `([], 7)`: `[7]`. `([2,2], 2)`: `2 <= 2`, va delante: `[2,2,2]`.\n\n**Paso 3. Coste de la inserción.** c) En el peor caso recorre toda la lista: $\\Theta(n)$ para una lista de $n$.\n\n**Paso 4. Coste del insert-sort.** $T(n)=T(n-1)+n$ (ordenar los $n-1$ primeros e insertar el último): $\\Theta(n^{2})$."
   },
   {
    "id": "peldanos#D11",
    "n": "D11",
    "title": "Karatsuba con números pequeños",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Multiplica $x=13$ por $y=11$ con la regla de Karatsuba, sin hacer más de tres productos de números más pequeños.\n- a) Escribe $x$ e $y$ en binario y calcula $m=\\min(\\lfloor b_x/2\\rfloor,\\lfloor b_y/2\\rfloor)$.\n- b) Calcula $a,b,c,d$ con $x=a\\cdot2^{m}+b$ e $y=c\\cdot2^{m}+d$.\n- c) Calcula $ac$, $bd$ y $(a+b)(c+d)$, y de ahí $t=(a+b)(c+d)-ac-bd$.\n- d) Recompón $xy=ac\\cdot2^{2m}+t\\cdot2^{m}+bd$ y comprueba.",
    "hint": "$13=1101_2$ y $11=1011_2$ tienen $4$ bits cada uno. Parte cada uno en la mitad alta y la baja.",
    "solution": "**Paso 1. Binario.** a) $b_x=b_y=4$, así que $m=2$.\n\n**Paso 2. Partes.** b) $a=\\lfloor13/4\\rfloor=3$, $b=13-12=1$; $c=\\lfloor11/4\\rfloor=2$, $d=11-8=3$.\n\n**Paso 3. Tres productos.** c) $ac=6$, $bd=3$, $(a+b)(c+d)=4\\cdot5=20$. Entonces $t=20-6-3=11$ (que es $ad+bc=9+2$).\n\n**Paso 4. Recompón.** d) $6\\cdot16+11\\cdot4+3=96+44+3=143=13\\cdot11$ ✓."
   },
   {
    "id": "peldanos#D12",
    "n": "D12",
    "title": "Cuántos productos hacen falta",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.55,
    "steps": true,
    "statement": "Cuenta las multiplicaciones (escalares) para matrices $n\\times n$ con $n=2^{k}$:\n- a) Con la descomposición en bloques de $8$ productos, $M(n)=8M(n/2)$, $M(1)=1$: calcula $M(2),M(4),M(8)$ y da la fórmula.\n- b) Con Strassen, $S(n)=7S(n/2)$, $S(1)=1$: calcula $S(2),S(4),S(8)$ y la fórmula.\n- c) ¿Con qué $n$ (potencia de $2$) Strassen usa menos de la mitad de multiplicaciones?",
    "hint": "Cada vez que $n$ se divide por $2$ el número de productos se multiplica por $8$ (o por $7$). Con $k$ divisiones: $8^{k}$ y $7^{k}$. El cociente es $(7/8)^{k}$.",
    "solution": "**Paso 1. Ingenuo.** a) $M(2)=8$, $M(4)=64$, $M(8)=512$. $M(n)=8^{k}=n^{3}$.\n\n**Paso 2. Strassen.** b) $S(2)=7$, $S(4)=49$, $S(8)=343$. $S(n)=7^{k}=n^{\\log_27}\\approx n^{2{,}807}$.\n\n**Paso 3. Cociente.** c) $S/M=(7/8)^{k}$: $k=5$ da $0{,}513$, $k=6$ da $0{,}449<0{,}5$. Hace falta $n=2^{6}=64$. Por eso Strassen solo compensa con matrices grandes (y además hace más sumas)."
   },
   {
    "id": "peldanos#D14",
    "n": "D14",
    "title": "Inversión de bits",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Para $n=2^{p}$ elementos, el elemento de la posición $i$ va a la posición $j$ cuyo número en binario es el de $i$ escrito al revés (con $p$ bits).\n- a) Con $p=3$ y $a=[10,20,30,40,50,60,70,80]$, ¿cómo queda la permutación?\n- b) Con $p=4$, calcula $j$ para $i=0,\\dots,15$.\n- c) ¿Qué posiciones no se mueven? ¿Cuántas son para $p=4$?",
    "hint": "Escribe $i$ con $p$ bits, dale la vuelta y vuelve a pasarlo a decimal. Las posiciones fijas son las que ya son iguales al revés (capicúas).",
    "solution": "**Paso 1. $p=3$.** a) $1=001_2\\leftrightarrow100_2=4$ y $3=011_2\\leftrightarrow110_2=6$; $0,2,5,7$ no se mueven. Resultado: $[10,50,30,70,20,60,40,80]$.\n\n**Paso 2. $p=4$.** b) $j$ para $i=0..15$: $0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15$.\n\n**Paso 3. Fijas.** c) Las que cumplen $j=i$: $0000$, $0110$, $1001$, $1111$, es decir $0,6,9,15$: son $4=2^{p/2}$."
   },
   {
    "id": "peldanos#D15",
    "n": "D15",
    "title": "Un divide y vencerás con una pieza en el medio",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Diseña `difs(a)` con divide y vencerás que devuelva la lista de diferencias entre elementos consecutivos, `[a[1]-a[0], a[2]-a[1], ...]`. Para `[3, 5, -2, 8]` devuelve `[2, -7, 10]`. Se asume `len(a) >= 1` (con un elemento, lista vacía).\n- a) Si partes `a` en dos mitades, ¿qué diferencia no está en ninguna de las dos listas de resultados?\n- b) Esquema y código.\n- c) Prueba con el ejemplo y da el coste.",
    "hint": "Las diferencias de la mitad izquierda y de la derecha dejan fuera la pareja formada por el último de la izquierda y el primero de la derecha: hay que añadirla al combinar.",
    "solution": "**Paso 1. La pieza que falta.** a) La diferencia `a[mitad] - a[mitad - 1]`.\n\n**Paso 2. Esquema y código.** b) Tamaño: `len(a)`. Caso base: un elemento, `[]`. Descomposición: `a[:mitad]` y `a[mitad:]`. Combinación: `izquierda + [a[mitad] - a[mitad-1]] + derecha`.\n```python\ndef difs(a):\n    n = len(a)\n    if n == 1:\n        return []\n    mitad = n // 2\n    return difs(a[:mitad]) + [a[mitad] - a[mitad - 1]] + difs(a[mitad:])\n```\n**Paso 3. Prueba y coste.** c) `[3,5,-2,8]`: mitades `[3,5]` y `[-2,8]`; `difs([3,5])=[2]`, `difs([-2,8])=[10]`, pieza central $-2-5=-7$: `[2,-7,10]`. El coste es $T(n)=2T(n/2)+n$ por las copias y concatenaciones: $\\Theta(n\\log n)$."
   },
   {
    "id": "peldanos#D16",
    "n": "D16",
    "title": "Evaluar un polinomio dividiendo los coeficientes",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Un polinomio $P(x)=c_0+c_1x+c_2x^{2}+\\cdots+c_{n-1}x^{n-1}$ se guarda como la lista de coeficientes `c`. Se quiere evaluarlo con divide y vencerás.\n- a) Si `mitad = n // 2`, escribe $P(x)$ en función de $P_{bajo}$ (con `c[:mitad]`) y $P_{alto}$ (con `c[mitad:]`).\n- b) Evalúa a mano $P=4-3x+2x^{2}+x^{3}$ en $x=2$ con esa descomposición.\n- c) Escribe `evalua(c, x)` y da la recurrencia de su coste.",
    "hint": "$P_{alto}$ tiene los coeficientes de $x^{mitad}$ en adelante; para evaluarlo como un polinomio normal hay que sacar factor común $x^{mitad}$.",
    "solution": "**Paso 1. Descomposición.** a) $P(x)=P_{bajo}(x)+x^{mitad}\\,P_{alto}(x)$, donde $P_{bajo}$ usa `c[:mitad]` y $P_{alto}$ usa `c[mitad:]` evaluados como polinomios desde $x^{0}$.\n\n**Paso 2. A mano.** b) `c = [4,-3,2,1]`, `mitad = 2`: $P_{bajo}=4-3x\\to4-6=-2$; $P_{alto}=2+x\\to4$; $P(2)=-2+2^{2}\\cdot4=14$. Comprobación directa: $4-6+8+8=14$.\n\n**Paso 3. Código y coste.** c)\n```python\ndef evalua(c, x):\n    n = len(c)\n    if n == 1:\n        return c[0]\n    mitad = n // 2\n    return evalua(c[:mitad], x) + x ** mitad * evalua(c[mitad:], x)\n```\nDos llamadas con tamaño $n/2$ más el cálculo de $x^{mitad}$: $T(n)=2T(n/2)+c\\in\\Theta(n)$ (si se calcula $x^{mitad}$ en tiempo constante)."
   },
   {
    "id": "peldanos#D17",
    "n": "D17",
    "title": "La sublista de suma máxima",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "divide-y-venceras"
    ],
    "stage": "dyv",
    "src": "adic",
    "diff": 0.9,
    "steps": true,
    "statement": "Para la lista $[-1,4,-2,5,-3]$, la sublista contigua de suma máxima se busca con divide y vencerás: la mejor está en la mitad izquierda, en la derecha, o **cruza** la mitad.\n- a) Divide en `[-1,4]` y `[-2,5,-3]`. ¿Cuál es la mejor suma de cada mitad?\n- b) Calcula la mejor sublista que cruza: la mejor \"terminando en el último de la izquierda\" más la mejor \"empezando en el primero de la derecha\".\n- c) ¿Cuál es la respuesta y qué sublista es? Escribe el esquema.",
    "hint": "La mejor que acaba en el último de la izquierda se halla recorriendo hacia atrás y acumulando; la mejor que empieza en el primero de la derecha, hacia delante. Cada una se elige entre todos los puntos de corte.",
    "solution": "**Paso 1. Mitades.** a) Izquierda `[-1,4]`: la mejor es $[4]$ con suma $4$. Derecha `[-2,5,-3]`: la mejor es $[5]$ con suma $5$.\n\n**Paso 2. Cruzando.** b) Terminando en $4$ (hacia atrás): $4$, $4-1=3$; la mejor es $4$. Empezando en $-2$ (hacia delante): $-2$, $-2+5=3$, $3-3=0$; la mejor es $3$. Cruzando: $4+3=7$ (la sublista $[4,-2,5]$).\n\n**Paso 3. Esquema.** c) Respuesta: $\\max\\{4,\\,5,\\,7\\}=7$ con $[4,-2,5]$. Caso base: un elemento, esa suma. Descomposición: mitades. Combinación: máximo de las tres. Las dos búsquedas de la parte cruzada cuestan $\\Theta(n)$ en total: $T(n)=2T(n/2)+n\\in\\Theta(n\\log n)$."
   },
   {
    "id": "peldanos#E01",
    "n": "E01",
    "title": "Calcular valores y ver el patrón",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.2,
    "steps": true,
    "statement": "Una recurrencia dice cómo se calcula $T(n)$ a partir de valores anteriores. Calcula los primeros valores y adivina una fórmula sin recurrencia:\n- a) $T(0)=2$ y $T(n)=T(n-1)+4$. Calcula $T(1),\\dots,T(4)$.\n- b) $T(1)=1$ y $T(n)=T(n-1)+n$. Calcula $T(2),\\dots,T(5)$.\n- c) $T(1)=1$ y $T(n)=2\\,T(n-1)+1$. Calcula $T(2),\\dots,T(5)$.",
    "hint": "Calcula en orden: cada valor usa el anterior. Después mira cómo se relaciona cada resultado con $n$.",
    "solution": "**Paso 1. a).** $T(1)=6$, $T(2)=10$, $T(3)=14$, $T(4)=18$. Crece de $4$ en $4$ desde $2$: parece $T(n)=4n+2$.\n\n**Paso 2. b).** $T(2)=3$, $T(3)=6$, $T(4)=10$, $T(5)=15$: son las sumas $1+2+\\cdots+n$, es decir $\\frac{n(n+1)}{2}$.\n\n**Paso 3. c).** $T(2)=3$, $T(3)=7$, $T(4)=15$, $T(5)=31$: uno menos que una potencia de $2$, $T(n)=2^{n}-1$.\n\n**Paso 4. Qué falta.** Esto es una conjetura a partir de unos pocos valores. La expansión de recurrencias (los siguientes ejercicios) es la forma de demostrarla para todo $n$."
   },
   {
    "id": "peldanos#E02",
    "n": "E02",
    "title": "Plantear la recurrencia de un código",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "Contamos $1$ operación por cada línea ejecutada (sin contar la línea `def`).\n```python\ndef suma(n):\n    if n == 0:\n        return 0\n    return n + suma(n - 1)\n```\n- a) ¿Cuánto vale $T(0)$ (caso base)? ¿Y $T(n)$ para $n>0$, en función de $T(n-1)$?\n- b) Resuélvela con la idea de E01: calcula $T(1)$, $T(2)$, $T(3)$ y da la fórmula.\n- c) Haz lo mismo con\n```python\ndef bits(n):\n    if n <= 1:\n        return 1\n    return 1 + bits(n // 2)\n```\nsuponiendo que $n$ es una potencia de $2$ (así `n // 2` es exacto) y que el caso base es $n=1$.",
    "hint": "En el caso base se ejecutan el `if` y su `return`. En el caso recursivo, el `if` (que sale falso), el `return` de abajo y, además, el tiempo de la llamada recursiva.",
    "solution": "**Paso 1. a).** Caso base: `if` y `return 0`, $T(0)=2$. Caso recursivo: `if` y `return`, $2$ operaciones más lo que cueste `suma(n-1)`: $T(n)=2+T(n-1)$.\n\n**Paso 2. b).** $T(1)=4$, $T(2)=6$, $T(3)=8$: $T(n)=2n+2$.\n\n**Paso 3. c).** $T(1)=2$ y $T(n)=2+T(n/2)$. Para $n=8$: $T(8)=2+T(4)=4+T(2)=6+T(1)=8$. Cada vez el tamaño se divide por $2$ y se suma $2$: $T(n)=2\\log_2n+2$."
   },
   {
    "id": "peldanos#E03",
    "n": "E03",
    "title": "Expandir paso a paso",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.35,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}1 & n=0\\\\ T(n-1)+3 & n>0\\end{cases}$\n- a) Expande tres veces: $T(n)=T(n-1)+3=\\ldots$\n- b) Escribe el patrón después de $i$ expansiones.\n- c) ¿Para qué $i$ se llega al caso base? Sustituye.\n- d) Comprueba con $n=3$.",
    "hint": "Sustituye $T(n-1)$ por su definición: $T(n-1)=T(n-2)+3$. Y así sucesivamente. Anota qué se acumula.",
    "solution": "**Paso 1. Expande.** $T(n)=T(n-1)+3=\\bigl(T(n-2)+3\\bigr)+3=T(n-2)+2\\cdot3=T(n-3)+3\\cdot3$.\n\n**Paso 2. Patrón.** Tras $i$ expansiones: $T(n)=T(n-i)+3i$.\n\n**Paso 3. Caso base.** Se llega a $T(0)$ cuando $n-i=0$, es decir $i=n$. Sustituyendo: $T(n)=T(0)+3n=3n+1\\in\\Theta(n)$.\n\n**Paso 4. Comprueba.** Con $n=3$: $T(1)=4$, $T(2)=7$, $T(3)=10$, y la fórmula da $3\\cdot3+1=10$."
   },
   {
    "id": "peldanos#E04",
    "n": "E04",
    "title": "Expandir con una división",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}1 & n=1\\\\ T(n/2)+5 & n>1\\end{cases}$ suponiendo que $n$ es una potencia de $2$.\n- a) Patrón tras $i$ expansiones.\n- b) ¿Cuándo se llega al caso base? (Ojo: el parámetro es $n/2^{i}$.)\n- c) Resultado y comprobación con $n=8$.",
    "hint": "Igual que el anterior, pero el argumento ya no baja de uno en uno: $n,\\ n/2,\\ n/4,\\ n/8,\\ \\dots$ El caso base es $T(1)$.",
    "solution": "**Paso 1. Patrón.** $T(n)=T(n/2)+5=T(n/4)+2\\cdot5=T(n/8)+3\\cdot5=\\cdots=T(n/2^{i})+5i$.\n\n**Paso 2. Caso base.** $n/2^{i}=1\\iff i=\\log_2n$.\n\n**Paso 3. Resultado.** $T(n)=T(1)+5\\log_2n=5\\log_2n+1\\in\\Theta(\\log n)$.\n\n**Paso 4. Comprueba.** $n=8$: $T(8)=T(4)+5=T(2)+10=T(1)+15=16$ y $5\\cdot3+1=16$."
   },
   {
    "id": "peldanos#E05",
    "n": "E05",
    "title": "Un término que crece con n",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}0 & n=0\\\\ T(n-1)+2n+1 & n>0\\end{cases}$\n- a) Escribe las tres primeras expansiones. ¿Qué cambia en el término que se suma?\n- b) Patrón tras $i$ expansiones, como un sumatorio.\n- c) Resuelve el sumatorio y sustituye el valor de $i$ del caso base.\n- d) Comprueba con $n=2$.",
    "hint": "El término sumado ya no es constante: en la primera expansión es $2n+1$, en la segunda $2(n-1)+1$, en la tercera $2(n-2)+1$. Es $\\sum_{j=0}^{i-1}\\bigl(2(n-j)+1\\bigr)$.",
    "solution": "**Paso 1. Expande.** $T(n)=(2n+1)+T(n-1)=(2n+1)+\\bigl(2(n-1)+1\\bigr)+T(n-2)=(2n+1)+(2n-1)+(2n-3)+T(n-3)$.\n\n**Paso 2. Patrón.** $T(n)=T(n-i)+\\sum_{j=0}^{i-1}\\bigl(2(n-j)+1\\bigr)$.\n\n**Paso 3. Resuelve el sumatorio.** $\\sum_{j=0}^{i-1}(2n+1)-2\\sum_{j=0}^{i-1}j=(2n+1)i-i(i-1)=2ni-i^{2}+2i$.\n\n**Paso 4. Caso base.** Con $i=n$: $T(n)=T(0)+2n^{2}-n^{2}+2n=n^{2}+2n\\in\\Theta(n^{2})$.\n\n**Paso 5. Comprueba.** $n=2$: $T(1)=3$ y $T(2)=3+5=8$. La fórmula da $4+4=8$."
   },
   {
    "id": "peldanos#E06",
    "n": "E06",
    "title": "Comprobar la fórmula obtenida",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.55,
    "steps": true,
    "statement": "Un error muy frecuente es no comprobar el resultado final. Sea $T(0)=2$ y $T(n)=T(n-1)+3$. Tres estudiantes proponen:\n- a) $T(n)=3n+2$\n- b) $T(n)=3n+3$\n- c) $T(n)=3(n-1)+2$\n\nAverigua cuál es correcta con dos pruebas: el caso base, y que la fórmula cumpla la recurrencia.",
    "hint": "Prueba 1: sustituye $n=0$ y mira si da $2$. Prueba 2: sustituye la fórmula en los dos lados de $T(n)=T(n-1)+3$ y mira si coinciden.",
    "solution": "**Paso 1. Caso base.** a) $T(0)=2$ ✓. b) $T(0)=3$ ✗. c) $T(0)=-1$ ✗. Ya descartamos b) y c).\n\n**Paso 2. La recurrencia, para a).** $T(n-1)+3=3(n-1)+2+3=3n+2=T(n)$ ✓.\n\n**Paso 3. Conclusión.** Solo a) es correcta: $T(n)=3n+2$. Con el caso base y la recurrencia basta (es una inducción), y evita fiarse de una expansión mal hecha."
   },
   {
    "id": "peldanos#E07",
    "n": "E07",
    "title": "Dos llamadas y trabajo constante",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}1 & n=1\\\\ 2T(n/2)+1 & n>1\\end{cases}$ con $n$ potencia de $2$.\n- a) Patrón tras $i$ expansiones. ¿Qué se acumula fuera de $T$?\n- b) Resultado.\n- c) Comprueba con $n=8$.",
    "hint": "Ahora hay un factor $2$ delante de $T$ en cada expansión: tras $i$ pasos, $2^{i}\\,T(n/2^{i})$. Lo que se acumula es $1+2+4+\\cdots$, una serie geométrica.",
    "solution": "**Paso 1. Expande.** $T(n)=2T(n/2)+1=2\\bigl(2T(n/4)+1\\bigr)+1=4T(n/4)+2+1=8T(n/8)+4+2+1$.\n\n**Paso 2. Patrón.** $T(n)=2^{i}\\,T(n/2^{i})+\\sum_{j=0}^{i-1}2^{j}=2^{i}\\,T(n/2^{i})+2^{i}-1$.\n\n**Paso 3. Caso base.** Con $i=\\log_2n$ se llega a $T(1)$, y $2^{i}=n$: $T(n)=n\\cdot1+n-1=2n-1\\in\\Theta(n)$.\n\n**Paso 4. Comprueba.** $T(2)=3$, $T(4)=7$, $T(8)=15=2\\cdot8-1$."
   },
   {
    "id": "peldanos#E08",
    "n": "E08",
    "title": "Dos llamadas y trabajo lineal",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}1 & n=1\\\\ 2T(n/2)+n & n>1\\end{cases}$ con $n$ potencia de $2$. Es el coste de mergesort.\n- a) Patrón tras $i$ expansiones. ¿Cuánto vale lo que se acumula en cada paso?\n- b) Resultado y orden.\n- c) Comprueba con $n=8$.",
    "hint": "En la primera expansión se acumula $n$. En la segunda, $2\\cdot\\frac n2=n$. En la tercera, $4\\cdot\\frac n4=n$. Cada nivel aporta $n$.",
    "solution": "**Paso 1. Expande.** $T(n)=2T(n/2)+n=4T(n/4)+n+n=8T(n/8)+n+n+n$.\n\n**Paso 2. Patrón.** $T(n)=2^{i}\\,T(n/2^{i})+i\\,n$.\n\n**Paso 3. Caso base.** Con $i=\\log_2n$: $T(n)=n\\cdot T(1)+n\\log_2n=n\\log_2n+n\\in\\Theta(n\\log n)$.\n\n**Paso 4. Comprueba.** $T(2)=4$, $T(4)=2\\cdot4+4=12$, $T(8)=2\\cdot12+8=32$, y la fórmula da $8\\cdot3+8=32$."
   },
   {
    "id": "peldanos#E09",
    "n": "E09",
    "title": "Plantear la recurrencia (sin resolverla)",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Escribe la recurrencia del coste en tiempo de cada función. Llama $c$ a una cantidad constante de operaciones y da también el caso base.\n```python\ndef f(n):                       # (a)\n    if n <= 1: return 1\n    return f(n - 1) + f(n - 1)\n\ndef g(n):                       # (b)\n    if n <= 1: return 1\n    for i in range(n):\n        trabajo()\n    return g(n // 2)\n\ndef h(n):                       # (c)\n    if n <= 1: return 1\n    return h(n // 3) + h(n // 3) + h(n // 3)\n\ndef k(n):                       # (d)\n    if n <= 1: return 1\n    return k(n - 1) + k(n - 2)\n```",
    "hint": "Para cada una pregúntate tres cosas: ¿cuántas llamadas recursivas hace?, ¿con qué tamaño?, y ¿cuánto trabajo hace *además* de llamarse?",
    "solution": "**Paso 1. (a).** Dos llamadas con $n-1$ y trabajo constante: $T(n)=2T(n-1)+c$, con $T(1)=c$.\n\n**Paso 2. (b).** Una llamada con $n/2$ y un bucle de $n$ vueltas: $T(n)=T(n/2)+n$ (más constantes).\n\n**Paso 3. (c).** Tres llamadas con $n/3$: $T(n)=3T(n/3)+c$.\n\n**Paso 4. (d).** Dos llamadas, una con $n-1$ y otra con $n-2$: $T(n)=T(n-1)+T(n-2)+c$.\n\n**Paso 5. Qué se puede resolver ya.** (a), (b) y (c) se resuelven por expansión: (a) $\\Theta(2^{n})$, (b) $\\Theta(n)$ (el bucle hace $n+\\frac n2+\\frac n4+\\cdots$), (c) $\\Theta(n)$. La (d) es de tipo Fibonacci y necesita el método general."
   },
   {
    "id": "peldanos#E10",
    "n": "E10",
    "title": "Dos llamadas con n−1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.75,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}1 & n=0\\\\ 2T(n-1)+3 & n>0\\end{cases}$\n- a) Patrón tras $i$ expansiones.\n- b) Caso base y resultado.\n- c) Comprueba con $n=2$.",
    "hint": "Cada expansión multiplica por $2$ el $T$ que queda y suma $3$ multiplicado por la potencia correspondiente: $3,\\ 3\\cdot2,\\ 3\\cdot4,\\dots$",
    "solution": "**Paso 1. Expande.** $T(n)=2T(n-1)+3=2\\bigl(2T(n-2)+3\\bigr)+3=4T(n-2)+3\\cdot2+3=8T(n-3)+3\\cdot4+3\\cdot2+3$.\n\n**Paso 2. Patrón.** $T(n)=2^{i}\\,T(n-i)+3\\sum_{j=0}^{i-1}2^{j}=2^{i}\\,T(n-i)+3(2^{i}-1)$.\n\n**Paso 3. Caso base.** Con $i=n$: $T(n)=2^{n}\\cdot1+3(2^{n}-1)=4\\cdot2^{n}-3=2^{n+2}-3\\in\\Theta(2^{n})$.\n\n**Paso 4. Comprueba.** $T(1)=2+3=5$ y $T(2)=10+3=13$. La fórmula da $2^{3}-3=5$ y $2^{4}-3=13$."
   },
   {
    "id": "peldanos#E11",
    "n": "E11",
    "title": "Una recurrencia con una suma",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Sea $T(0)=1$ y $T(n)=2+\\displaystyle\\sum_{j=0}^{n-1}T(j)$ para $n>0$.\n- a) Calcula $T(1),\\dots,T(4)$.\n- b) Resta $T(n)$ y $T(n-1)$ (para $n\\ge2$) y simplifica. ¿Qué recurrencia más sencilla sale?\n- c) Resuélvela por expansión. Comprueba con $n=4$.",
    "hint": "$T(n)$ y $T(n-1)$ tienen casi los mismos sumandos; al restarlos se cancelan todos menos uno.",
    "solution": "**Paso 1. Valores.** a) $T(1)=2+1=3$, $T(2)=2+1+3=6$, $T(3)=2+1+3+6=12$, $T(4)=2+1+3+6+12=24$.\n\n**Paso 2. Resta.** b) $T(n)-T(n-1)=\\Bigl(2+\\sum_{j=0}^{n-1}T(j)\\Bigr)-\\Bigl(2+\\sum_{j=0}^{n-2}T(j)\\Bigr)=T(n-1)$. Por tanto $T(n)=2\\,T(n-1)$ para $n\\ge2$.\n\n**Paso 3. Expansión.** c) $T(n)=2T(n-1)=4T(n-2)=\\cdots=2^{i}\\,T(n-i)$. Se para en $T(1)=3$ cuando $i=n-1$: $T(n)=3\\cdot2^{n-1}\\in\\Theta(2^{n})$. Con $n=4$: $3\\cdot8=24$ ✓."
   },
   {
    "id": "peldanos#E12",
    "n": "E12",
    "title": "Expansión con un término cuadrático que se reduce",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}1 & n=1\\\\ T(n/3)+n^{2} & n>1\\end{cases}$ con $n=3^{k}$.\n- a) Patrón tras $i$ expansiones.\n- b) Resultado con una serie geométrica y orden.\n- c) Comprueba con $n=3$ y $n=9$.",
    "hint": "Las cantidades que se acumulan son $n^{2},\\ (n/3)^{2},\\ (n/9)^{2},\\dots=n^{2},\\ \\frac{n^{2}}9,\\ \\frac{n^{2}}{81},\\dots$ Es una serie geométrica de razón $\\frac19$.",
    "solution": "**Paso 1. Patrón.** a) $T(n)=T(n/3^{i})+n^{2}\\sum_{j=0}^{i-1}\\left(\\tfrac19\\right)^{j}$.\n\n**Paso 2. Caso base.** b) Con $i=\\log_3n=k$: $T(n)=1+n^{2}\\dfrac{1-9^{-k}}{1-\\frac19}=1+\\dfrac98\\left(n^{2}-1\\right)=\\dfrac{9n^{2}-1}{8}\\in\\Theta(n^{2})$, porque $9^{-k}n^{2}=1$.\n\n**Paso 3. Comprueba.** c) $T(3)=1+9=10$ y $\\frac{81-1}{8}=10$. $T(9)=10+81=91$ y $\\frac{729-1}{8}=91$. Manda el primer término ($n^{2}$): los siguientes son cada vez más pequeños."
   },
   {
    "id": "peldanos#E13",
    "n": "E13",
    "title": "Expansión con $\\sqrt n$ y tres llamadas",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.9,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}1 & n=1\\\\ 3T(n/9)+\\sqrt n & n>1\\end{cases}$ con $n=9^{k}$.\n- a) Patrón tras $i$ expansiones.\n- b) Resultado y orden.\n- c) Comprueba con $n=9$ y $n=81$.",
    "hint": "En el paso $j$ hay $3^{j}$ subproblemas de tamaño $n/9^{j}$, y cada uno aporta $\\sqrt{n/9^{j}}=\\sqrt n/3^{j}$. Multiplica: sale $\\sqrt n$ en cada nivel.",
    "solution": "**Paso 1. Patrón.** a) $T(n)=3^{i}\\,T(n/9^{i})+i\\sqrt n$, porque cada nivel aporta $3^{j}\\cdot\\frac{\\sqrt n}{3^{j}}=\\sqrt n$.\n\n**Paso 2. Caso base.** b) Con $i=\\log_9n$: $3^{i}=\\sqrt n$ (porque $9^{i}=n$). $T(n)=\\sqrt n+\\sqrt n\\log_9n=\\sqrt n\\,(1+\\log_9n)\\in\\Theta(\\sqrt n\\log n)$.\n\n**Paso 3. Comprueba.** c) $T(9)=3+3=6$ y $3\\,(1+1)=6$. $T(81)=3\\cdot6+9=27$ y $9\\,(1+2)=27$. Todos los niveles pesan lo mismo: caso $\\frac{a}{b^{k}}=1$."
   },
   {
    "id": "peldanos#E14",
    "n": "E14",
    "title": "Expansión con un logaritmo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.9,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}0 & n=1\\\\ T(n/3)+\\log_3n & n>1\\end{cases}$ con $n=3^{k}$.\n- a) Patrón tras $i$ expansiones.\n- b) Resultado y orden.\n- c) Comprueba con $n=9$ y $n=27$.",
    "hint": "Los logaritmos que se acumulan son $\\log_3n,\\ \\log_3n-1,\\ \\log_3n-2,\\dots,1$. Es la suma $1+2+\\cdots+k$.",
    "solution": "**Paso 1. Patrón.** a) $T(n)=T(n/3^{i})+\\sum_{j=0}^{i-1}(\\log_3n-j)$.\n\n**Paso 2. Caso base.** b) Con $i=k=\\log_3n$: $T(n)=0+\\sum_{m=1}^{k}m=\\dfrac{k(k+1)}{2}=\\dfrac{\\log_3n\\,(\\log_3n+1)}{2}\\in\\Theta(\\log^{2}n)$.\n\n**Paso 3. Comprueba.** c) $T(3)=1$, $T(9)=1+2=3$ y la fórmula da $\\frac{2\\cdot3}{2}=3$. $T(27)=3+3=6$ y $\\frac{3\\cdot4}{2}=6$."
   },
   {
    "id": "peldanos#E15",
    "n": "E15",
    "title": "Expansión con una suma de cuadrados",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}0 & n=0\\\\ T(n-1)+n^{2}+n & n>0\\end{cases}$\n- a) Patrón y sumatorio.\n- b) Resuélvelo con las fórmulas de $\\sum k$ y $\\sum k^{2}$.\n- c) Comprueba con $n=2$ y $n=3$.",
    "hint": "Al llegar al caso base se acumula $\\sum_{k=1}^{n}(k^{2}+k)$. Usa $\\sum k^{2}=\\frac{n(n+1)(2n+1)}{6}$ y $\\sum k=\\frac{n(n+1)}{2}$.",
    "solution": "**Paso 1. Expande.** a) $T(n)=T(n-1)+n^{2}+n=T(n-2)+(n-1)^{2}+(n-1)+n^{2}+n=\\cdots=T(0)+\\sum_{k=1}^{n}(k^{2}+k)$.\n\n**Paso 2. Resuelve.** b) $\\dfrac{n(n+1)(2n+1)}{6}+\\dfrac{n(n+1)}{2}=\\dfrac{n(n+1)(2n+4)}{6}=\\dfrac{n(n+1)(n+2)}{3}\\in\\Theta(n^{3})$.\n\n**Paso 3. Comprueba.** c) $T(1)=2$, $T(2)=2+6=8$ y $\\frac{2\\cdot3\\cdot4}{3}=8$. $T(3)=8+12=20$ y $\\frac{3\\cdot4\\cdot5}{3}=20$."
   },
   {
    "id": "peldanos#E16",
    "n": "E16",
    "title": "Tres llamadas, como Karatsuba",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-expansion"
    ],
    "stage": "expansion",
    "src": "adic",
    "diff": 0.95,
    "steps": true,
    "statement": "Resuelve por expansión $T(n)=\\begin{cases}1 & n=1\\\\ 3T(n/2)+n & n>1\\end{cases}$ con $n=2^{k}$.\n- a) Patrón tras $i$ expansiones.\n- b) Resultado y orden.\n- c) Comprueba con $n=2$ y $n=4$.",
    "hint": "Tras $i$ pasos se acumula $n\\left(1+\\tfrac32+\\left(\\tfrac32\\right)^{2}+\\cdots\\right)$. Y $3^{\\log_2n}=n^{\\log_23}$.",
    "solution": "**Paso 1. Patrón.** a) $T(n)=3^{i}\\,T(n/2^{i})+n\\sum_{j=0}^{i-1}\\left(\\tfrac32\\right)^{j}=3^{i}\\,T(n/2^{i})+2n\\left(\\left(\\tfrac32\\right)^{i}-1\\right)$.\n\n**Paso 2. Caso base.** b) Con $i=\\log_2n$: $3^{i}=n^{\\log_23}$ y $n\\left(\\tfrac32\\right)^{i}=3^{i}$. $T(n)=3^{i}+2\\cdot3^{i}-2n=3\\,n^{\\log_23}-2n\\in\\Theta(n^{\\log_23})$.\n\n**Paso 3. Comprueba.** c) $T(2)=3+2=5$ y $3\\cdot3-4=5$. $T(4)=15+4=19$ y $3\\cdot9-8=19$."
   },
   {
    "id": "peldanos#G01",
    "n": "G01",
    "title": "Qué caso del teorema maestro es",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "El teorema maestro (versión simple) resuelve $T(n)=a\\,T(n/b)+c\\,n^{k}$ comparando $a$ con $b^{k}$:\n$$\\Theta(n^{k})\\ \\text{si } \\tfrac{a}{b^{k}}<1,\\qquad \\Theta(n^{k}\\log n)\\ \\text{si } \\tfrac{a}{b^{k}}=1,\\qquad \\Theta(n^{\\log_b a})\\ \\text{si } \\tfrac{a}{b^{k}}>1.$$\n\n**Ejemplo resuelto.** $T(n)=T(n/2)+n$: $a=1$, $b=2$, $k=1$, $\\frac{a}{b^{k}}=\\frac12<1$, luego $\\Theta(n)$.\n\n**Ahora tú.** Identifica $a$, $b$, $k$, calcula $\\frac{a}{b^{k}}$ y da el orden:\n- a) $T(n)=2T(n/2)+n$\n- b) $T(n)=4T(n/2)+n$\n- c) $T(n)=3T(n/3)+1$\n- d) $T(n)=T(n/2)+1$\n- e) $T(n)=8T(n/2)+n^{2}$\n- f) $T(n)=2T(n/2)+n^{2}$",
    "hint": "$a$ es cuántas llamadas hace, $b$ cuántas veces más pequeño es el subproblema, y $n^{k}$ es el trabajo de fuera. Un trabajo constante es $n^{0}$, es decir $k=0$.",
    "solution": "**Paso 1. Lee los parámetros.** a) $a=2,b=2,k=1$. b) $4,2,1$. c) $3,3,0$. d) $1,2,0$. e) $8,2,2$. f) $2,2,2$.\n\n**Paso 2. Calcula $a/b^{k}$.** a) $2/2=1$. b) $4/2=2$. c) $3/1=3$. d) $1/1=1$. e) $8/4=2$. f) $2/4=\\frac12$.\n\n**Paso 3. Elige el caso.** a) $=1$: $\\Theta(n\\log n)$. b) $>1$: $\\Theta(n^{\\log_24})=\\Theta(n^{2})$. c) $>1$: $\\Theta(n^{\\log_33})=\\Theta(n)$. d) $=1$: $\\Theta(n^{0}\\log n)=\\Theta(\\log n)$. e) $>1$: $\\Theta(n^{\\log_28})=\\Theta(n^{3})$. f) $<1$: $\\Theta(n^{2})$."
   },
   {
    "id": "peldanos#G02",
    "n": "G02",
    "title": "Recurrencias de algoritmos conocidos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Resuelve con el teorema maestro la recurrencia de cada algoritmo:\n- a) Mergesort: $T(n)=2T(n/2)+n$\n- b) Búsqueda binaria: $T(n)=T(n/2)+1$\n- c) Multiplicación de enteros con divide y vencerás sin trucos: $T(n)=4T(n/2)+n$\n- d) Karatsuba: $T(n)=3T(n/2)+n$\n- e) Multiplicación de matrices con $8$ subproblemas: $T(n)=8T(n/2)+n^{2}$\n- f) Strassen: $T(n)=7T(n/2)+n^{2}$",
    "hint": "Para cada una calcula $\\frac{a}{b^{k}}$. Cuando sea mayor que $1$, el resultado es $n^{\\log_ba}$: deja el exponente como un logaritmo y, si quieres, aproxímalo.",
    "solution": "**Paso 1. a) y b).** a) $a=2,b=2,k=1$: $\\frac{a}{b^{k}}=1$, $\\Theta(n\\log n)$. b) $a=1,b=2,k=0$: igual a $1$, $\\Theta(\\log n)$.\n\n**Paso 2. c) y e).** c) $\\frac{4}{2}=2>1$: $\\Theta(n^{\\log_24})=\\Theta(n^{2})$. e) $\\frac{8}{4}=2>1$: $\\Theta(n^{3})$.\n\n**Paso 3. d) y f).** d) $\\frac32>1$: $\\Theta(n^{\\log_23})\\approx\\Theta(n^{1{,}585})$, mejor que $n^{2}$. f) $\\frac74>1$: $\\Theta(n^{\\log_27})\\approx\\Theta(n^{2{,}807})$, mejor que $n^{3}$.\n\n**Paso 4. Moraleja.** Con el mismo trabajo de fuera, reducir el número de llamadas $a$ baja el exponente: de $4$ a $3$ subproblemas (Karatsuba), de $8$ a $7$ (Strassen)."
   },
   {
    "id": "peldanos#G03",
    "n": "G03",
    "title": "Cuando la versión simple no sirve",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Decide si se puede aplicar la versión simple del teorema maestro ($T(n)=aT(n/b)+cn^{k}$). Si no, di qué hacer, y da el orden:\n- a) $T(n)=T(n-1)+n$\n- b) $T(n)=2T(n/2)+n\\log_2n$\n- c) $T(n)=2T(n/2)+\\sqrt n$",
    "hint": "La versión simple pide un subproblema de tamaño $n/b$ (una división, no una resta) y un trabajo de fuera de la forma $c\\,n^{k}$ (una potencia de $n$; $k$ puede ser una fracción). La versión completa admite $\\Theta(n^{\\log_ba}\\log^{k}n)$.",
    "solution": "**Paso 1. a).** No: el subproblema es $n-1$, no $n/b$. Se resuelve por expansión: $T(n)=T(n-i)+\\sum$, y da $\\frac{n(n+1)}{2}+T(0)\\in\\Theta(n^{2})$.\n\n**Paso 2. b).** No es de la forma $cn^{k}$, por el $\\log$. Pero cumple la versión completa, caso 2: $n^{\\log_22}=n$ y $f(n)=n\\log^{1}n$, con $k=1$ en el logaritmo. Resultado: $\\Theta(n\\log^{2}n)$.\n\n**Paso 3. c).** Sí: $\\sqrt n=n^{1/2}$, así que $k=\\frac12$. $\\frac{a}{b^{k}}=\\frac{2}{\\sqrt2}=\\sqrt2>1$: $\\Theta(n^{\\log_22})=\\Theta(n)$."
   },
   {
    "id": "peldanos#G04",
    "n": "G04",
    "title": "La ecuación característica",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Una recurrencia lineal homogénea (por ejemplo $T(n)=5T(n-1)-6T(n-2)$) se resuelve con su **ecuación característica**: se sustituye $T(n-j)$ por $x^{k-j}$ en la ecuación pasada a $=0$.\n\n**Ejemplo resuelto.** $T(n)-5T(n-1)+6T(n-2)=0$ da $x^{2}-5x+6=0$, es decir $(x-2)(x-3)=0$. Las raíces son $2$ y $3$ (distintas), luego $T(n)=C_1\\,2^{n}+C_2\\,3^{n}$, de orden $\\Theta(3^{n})$.\n\n**Ahora tú.** Para cada recurrencia escribe la ecuación característica, sus raíces, la forma general de la solución y el orden (sin calcular constantes):\n- a) $T(n)=T(n-1)+2T(n-2)$\n- b) $T(n)=4T(n-1)-4T(n-2)$\n- c) $T(n)=6T(n-1)-11T(n-2)+6T(n-3)$",
    "hint": "Pasa todo al lado izquierdo. Si una raíz aparece repetida $m$ veces, sus términos son $C\\,r^{n}$, $C\\,n\\,r^{n}$, ..., hasta $n^{m-1}r^{n}$.",
    "solution": "**Paso 1. a).** $x^{2}-x-2=0\\Rightarrow(x-2)(x+1)=0$: raíces $2$ y $-1$. $T(n)=C_1\\,2^{n}+C_2(-1)^{n}\\in\\Theta(2^{n})$.\n\n**Paso 2. b).** $x^{2}-4x+4=(x-2)^{2}=0$: raíz doble $2$. $T(n)=(C_1+C_2n)\\,2^{n}\\in\\Theta(n\\,2^{n})$.\n\n**Paso 3. c).** $x^{3}-6x^{2}+11x-6=(x-1)(x-2)(x-3)=0$: raíces $1,2,3$. $T(n)=C_1+C_2\\,2^{n}+C_3\\,3^{n}\\in\\Theta(3^{n})$.\n\n**Paso 4. Criterio.** Manda la raíz de mayor valor absoluto (y, si se repite, el factor $n^{m-1}$ de más)."
   },
   {
    "id": "peldanos#G05",
    "n": "G05",
    "title": "Hallar las constantes",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Resuelve $T(n)=5T(n-1)-6T(n-2)$ con $T(0)=1$ y $T(1)=4$.\n- a) Forma general de la solución.\n- b) Plantea y resuelve el sistema para las constantes con $T(0)$ y $T(1)$.\n- c) Comprueba con $T(2)$ y $T(3)$ calculados con la recurrencia.",
    "hint": "Ya tienes la forma del ejemplo anterior: $C_1\\,2^{n}+C_2\\,3^{n}$. Evalúa en $n=0$ y $n=1$.",
    "solution": "**Paso 1. Forma general.** a) $T(n)=C_1\\,2^{n}+C_2\\,3^{n}$.\n\n**Paso 2. Sistema.** b) $T(0)=C_1+C_2=1$ y $T(1)=2C_1+3C_2=4$. Restando dos veces la primera a la segunda: $C_2=2$, y entonces $C_1=-1$. $T(n)=2\\cdot3^{n}-2^{n}$.\n\n**Paso 3. Comprueba.** c) Con la recurrencia: $T(2)=5\\cdot4-6\\cdot1=14$ y $T(3)=5\\cdot14-6\\cdot4=46$. La fórmula da $18-4=14$ y $54-8=46$."
   },
   {
    "id": "peldanos#G06",
    "n": "G06",
    "title": "Raíz doble",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Resuelve $T(n)=4T(n-1)-4T(n-2)$ con $T(0)=0$ y $T(1)=2$.\n- a) Forma general (raíz doble).\n- b) Constantes.\n- c) Comprueba con $T(2)$ y $T(3)$.",
    "hint": "La ecuación característica es $(x-2)^{2}=0$. Con una raíz doble, la solución lleva $C_1\\,2^{n}+C_2\\,n\\,2^{n}$.",
    "solution": "**Paso 1. Forma general.** a) $T(n)=(C_1+C_2n)\\,2^{n}$.\n\n**Paso 2. Constantes.** b) $T(0)=C_1=0$. $T(1)=(C_1+C_2)\\cdot2=2\\Rightarrow C_2=1$. Por tanto $T(n)=n\\,2^{n}$.\n\n**Paso 3. Comprueba.** c) $T(2)=4\\cdot2-4\\cdot0=8=2\\cdot4$ y $T(3)=4\\cdot8-4\\cdot2=24=3\\cdot8$. Orden $\\Theta(n\\,2^{n})$."
   },
   {
    "id": "peldanos#G07",
    "n": "G07",
    "title": "Raíces distintas, tipo Fibonacci",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Resuelve $T(n)=T(n-1)+2T(n-2)$ con $T(0)=0$ y $T(1)=1$.\n- a) Ecuación característica y raíces.\n- b) Constantes.\n- c) Comprueba con $T(2),T(3),T(4)$.\n- d) ¿Qué pasa con el término de la raíz negativa cuando $n$ crece?",
    "hint": "Las raíces son $2$ y $-1$. Evalúa $C_1\\,2^{n}+C_2(-1)^{n}$ en $n=0$ y $n=1$.",
    "solution": "**Paso 1. Raíces.** a) $x^{2}-x-2=(x-2)(x+1)$, raíces $2$ y $-1$: $T(n)=C_1\\,2^{n}+C_2(-1)^{n}$.\n\n**Paso 2. Constantes.** b) $T(0)=C_1+C_2=0$ y $T(1)=2C_1-C_2=1$. Sumando: $3C_1=1$, $C_1=\\frac13$ y $C_2=-\\frac13$. $T(n)=\\dfrac{2^{n}-(-1)^{n}}{3}$.\n\n**Paso 3. Comprueba.** c) La recurrencia da $T(2)=1$, $T(3)=1+2=3$, $T(4)=3+2=5$. La fórmula: $\\frac{4-1}{3}=1$, $\\frac{8+1}{3}=3$, $\\frac{16-1}{3}=5$.\n\n**Paso 4. Orden.** d) $(-1)^{n}$ solo vale $\\pm1$, y no pesa frente a $2^{n}$: $T(n)\\in\\Theta(2^{n})$."
   },
   {
    "id": "peldanos#G08",
    "n": "G08",
    "title": "Recurrencias no homogéneas: el polinomio característico",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Si la parte derecha no es $0$, se escribe cada término como (polinomio)$\\cdot b^{n}$ y cada uno añade un factor $(x-b)^{d+1}$, con $d$ el grado del polinomio. El polinomio característico es el de la parte izquierda por esos factores.\n\n**Ejemplo resuelto.** $T(n)-T(n-1)=2^{n}$: izquierda $(x-1)$; derecha $1\\cdot2^{n}$, grado $0$, factor $(x-2)^{1}$. Polinomio: $(x-1)(x-2)$, solución $C_1+C_2\\,2^{n}\\in\\Theta(2^{n})$.\n\n**Ahora tú.** Da el polinomio característico, la forma de la solución y el orden:\n- a) $T(n)-2T(n-1)=3^{n}$\n- b) $T(n)-T(n-1)=n$\n- c) $T(n)-3T(n-1)=n\\cdot2^{n}$\n- d) $T(n)-2T(n-1)=2^{n}$",
    "hint": "En b), $n=n\\cdot1^{n}$, con $b=1$ y grado $1$. En d), la base de la parte derecha coincide con la raíz de la izquierda: sale un factor repetido.",
    "solution": "**Paso 1. a).** $(x-2)(x-3)$: $C_1\\,2^{n}+C_2\\,3^{n}\\in\\Theta(3^{n})$.\n\n**Paso 2. b).** Izquierda $(x-1)$; derecha $n\\cdot1^{n}$, factor $(x-1)^{2}$. Polinomio $(x-1)^{3}$: $C_1+C_2n+C_3n^{2}\\in\\Theta(n^{2})$.\n\n**Paso 3. c).** Izquierda $(x-3)$; derecha $n\\cdot2^{n}$, grado $1$, factor $(x-2)^{2}$. Polinomio $(x-3)(x-2)^{2}$: $C_1\\,3^{n}+(C_2+C_3n)\\,2^{n}\\in\\Theta(3^{n})$.\n\n**Paso 4. d).** Izquierda $(x-2)$; derecha $2^{n}$, factor $(x-2)$. Polinomio $(x-2)^{2}$: $(C_1+C_2n)\\,2^{n}\\in\\Theta(n\\,2^{n})$."
   },
   {
    "id": "peldanos#G09",
    "n": "G09",
    "title": "Constantes de una recurrencia no homogénea",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Resuelve $T(n)=T(n-1)+n$ con $T(0)=0$.\n- a) Polinomio característico y forma de la solución.\n- b) Calcula $T(1),T(2)$ con la recurrencia y plantea el sistema para las constantes con $T(0),T(1),T(2)$.\n- c) Resuelve y compara con lo que sabes de la suma de los $n$ primeros números.",
    "hint": "Pasa a $T(n)-T(n-1)=n\\cdot1^{n}$: el polinomio es $(x-1)^{3}$, así que hay tres constantes y necesitas tres ecuaciones.",
    "solution": "**Paso 1. Forma.** a) $T(n)=C_1+C_2n+C_3n^{2}$.\n\n**Paso 2. Sistema.** b) $T(1)=1$ y $T(2)=3$. Entonces $C_1=0$; $C_2+C_3=1$; $2C_2+4C_3=3$.\n\n**Paso 3. Resuelve.** c) De la segunda $C_2=1-C_3$; en la tercera, $2-2C_3+4C_3=3$, luego $C_3=\\frac12$ y $C_2=\\frac12$. $T(n)=\\dfrac{n^{2}+n}{2}=\\dfrac{n(n+1)}{2}$: la suma de Gauss, como se esperaba."
   },
   {
    "id": "peldanos#G10",
    "n": "G10",
    "title": "Varios términos a la derecha",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Da el polinomio característico y el orden (sin constantes) de:\n- a) $T(n)=T(n-1)+2^{n}+n$\n- b) $T(n)=2T(n-1)-T(n-2)+1$\n- c) $T(n)=3T(n-1)-2T(n-2)+n$",
    "hint": "Pasa los $T$ a la izquierda y saca la parte izquierda como polinomio en $x$. Después añade un factor $(x-b)^{d+1}$ por cada término de la derecha: $2^{n}$ da $(x-2)$; $n$ da $(x-1)^{2}$; la constante $1$ da $(x-1)$.",
    "solution": "**Paso 1. a).** Izquierda $(x-1)$. Derecha: $2^{n}$ aporta $(x-2)$ y $n\\cdot1^{n}$ aporta $(x-1)^{2}$. Polinomio $(x-1)^{3}(x-2)$: la raíz $2$ manda, $\\Theta(2^{n})$.\n\n**Paso 2. b).** Izquierda $x^{2}-2x+1=(x-1)^{2}$. Derecha: $1$, factor $(x-1)$. Polinomio $(x-1)^{3}$: $C_1+C_2n+C_3n^{2}$, $\\Theta(n^{2})$.\n\n**Paso 3. c).** Izquierda $x^{2}-3x+2=(x-1)(x-2)$. Derecha: $n$, factor $(x-1)^{2}$. Polinomio $(x-1)^{3}(x-2)$: $\\Theta(2^{n})$."
   },
   {
    "id": "peldanos#G11",
    "n": "G11",
    "title": "Una recurrencia que salta de dos en dos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Resuelve $T(n)=T(n-2)+3$ con $T(0)=1$, $T(1)=1$.\n- a) Polinomio característico: pasa la recurrencia a $T(n)-T(n-2)=3\\cdot1^{n}$.\n- b) Forma de la solución. ¿Qué raíz inesperada aparece?\n- c) Calcula $T(2)$ y resuelve el sistema con $T(0),T(1),T(2)$.\n- d) Comprueba con $T(3)$ y $T(4)$.",
    "hint": "Izquierda: $x^{2}-1=(x-1)(x+1)$. Derecha: $3\\cdot1^{n}$, grado $0$, factor $(x-1)$. La raíz $-1$ da el término $(-1)^{n}$.",
    "solution": "**Paso 1. Polinomio.** a) $(x^{2}-1)(x-1)=(x-1)^{2}(x+1)$.\n\n**Paso 2. Forma.** b) $T(n)=C_1+C_2n+C_3(-1)^{n}$. La raíz $-1$ aparece porque la recurrencia salta de dos en dos: los índices pares y los impares van por separado.\n\n**Paso 3. Sistema.** c) $T(2)=T(0)+3=4$. Entonces: $C_1+C_3=1$; $C_1+C_2-C_3=1$; $C_1+2C_2+C_3=4$. Restando la primera de la tercera: $2C_2=3$, $C_2=\\frac32$. Después, sumando la primera y la segunda: $2C_1+C_2=2$, $C_1=\\frac14$, y $C_3=\\frac34$. $T(n)=\\dfrac14+\\dfrac{3n}{2}+\\dfrac34(-1)^{n}\\in\\Theta(n)$.\n\n**Paso 4. Comprueba.** d) $T(3)=T(1)+3=4$ y la fórmula da $\\frac14+\\frac92-\\frac34=4$. $T(4)=T(2)+3=7$ y la fórmula da $\\frac14+6+\\frac34=7$."
   },
   {
    "id": "peldanos#G12",
    "n": "G12",
    "title": "Con constantes, como en el examen",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Resuelve $T(n)=2T(n-1)+n$ con $T(0)=1$, hallando las constantes.\n- a) Polinomio característico y forma de la solución.\n- b) Calcula $T(1),T(2)$ y plantea el sistema de $3$ ecuaciones.\n- c) Resuélvelo y comprueba con $T(3)$ y $T(4)$.",
    "hint": "Izquierda $(x-2)$. Derecha $n\\cdot1^{n}$: factor $(x-1)^{2}$. Polinomio $(x-2)(x-1)^{2}$, solución $C_1\\,2^{n}+C_2+C_3n$.",
    "solution": "**Paso 1. Forma.** a) $T(n)=C_1\\,2^{n}+C_2+C_3n$.\n\n**Paso 2. Sistema.** b) $T(1)=3$ y $T(2)=8$. Entonces: $C_1+C_2=1$; $2C_1+C_2+C_3=3$; $4C_1+C_2+2C_3=8$.\n\n**Paso 3. Resuelve.** c) De la primera $C_2=1-C_1$. En la segunda: $C_1+C_3=2$. En la tercera: $3C_1+2C_3=7$. Con $C_3=2-C_1$ queda $C_1+4=7$, luego $C_1=3$, $C_3=-1$, $C_2=-2$. $T(n)=3\\cdot2^{n}-n-2$.\n\n**Paso 4. Comprueba.** $T(3)=2\\cdot8+3=19$ y la fórmula da $24-3-2=19$. $T(4)=2\\cdot19+4=42$ y la fórmula da $48-4-2=42$. Orden $\\Theta(2^{n})$."
   },
   {
    "id": "peldanos#G13",
    "n": "G13",
    "title": "Pasar a la variable k",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Para recurrencias con $n/2$ (o $n/3$...) se hace el cambio $n=2^{k}$ y se define $t(k)=T(2^{k})$. Lo importante es sustituir también el trabajo de fuera.\n\n**Ejemplo resuelto.** $T(n)=4T(n/2)+n$ con $n=2^{k}$: $T(2^{k})=4T(2^{k-1})+2^{k}$, es decir $t(k)=4t(k-1)+2^{k}$. El $n$ de fuera se convierte en $2^{k}$, no en $k$.\n\n**Ahora tú.** Escribe la recurrencia para $t(k)$ con el cambio indicado:\n- a) $T(n)=T(n/2)+n$, con $n=2^{k}$\n- b) $T(n)=2T(n/2)+n^{2}$, con $n=2^{k}$\n- c) $T(n)=9T(n/3)+n$, con $n=3^{k}$\n- d) $T(n)=T(n/2)+1$, con $n=2^{k}$",
    "hint": "$T(n/2)=T(2^{k-1})=t(k-1)$. Y $n^{2}=(2^{k})^{2}=4^{k}$.",
    "solution": "**Paso 1. a).** $t(k)=t(k-1)+2^{k}$.\n\n**Paso 2. b).** $n^{2}=4^{k}$: $t(k)=2t(k-1)+4^{k}$.\n\n**Paso 3. c).** $T(n/3)=T(3^{k-1})=t(k-1)$ y $n=3^{k}$: $t(k)=9t(k-1)+3^{k}$.\n\n**Paso 4. d).** $t(k)=t(k-1)+1$."
   },
   {
    "id": "peldanos#G14",
    "n": "G14",
    "title": "Resolver con el cambio de variable",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Resuelve $T(n)=T(n/2)+n$ con $T(1)=1$ y $n$ potencia de $2$.\n- a) Escribe $t(k)$ y su polinomio característico.\n- b) Forma general de $t(k)$ y constantes con $t(0)$ y $t(1)$.\n- c) Deshaz el cambio para dar $T(n)$ y comprueba con $T(4)$ y $T(8)$.",
    "hint": "De G13: $t(k)=t(k-1)+2^{k}$. Izquierda $(x-1)$, derecha $2^{k}$ aporta $(x-2)$. $t(0)=T(1)=1$ y $t(1)=T(2)=T(1)+2=3$.",
    "solution": "**Paso 1. Recurrencia en $k$.** a) $t(k)-t(k-1)=2^{k}$. Polinomio $(x-1)(x-2)$.\n\n**Paso 2. Constantes.** b) $t(k)=C_1+C_2\\,2^{k}$. $t(0)=C_1+C_2=1$ y $t(1)=C_1+2C_2=3$: $C_2=2$, $C_1=-1$. $t(k)=2\\cdot2^{k}-1$.\n\n**Paso 3. Deshaz el cambio.** c) Con $2^{k}=n$: $T(n)=2n-1\\in\\Theta(n)$. Comprobación: $T(2)=3$, $T(4)=3+4=7=2\\cdot4-1$, $T(8)=7+8=15=2\\cdot8-1$."
   },
   {
    "id": "peldanos#G15",
    "n": "G15",
    "title": "Preparar la parte derecha",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Para el polinomio característico, cada término de la derecha tiene que ser (polinomio)$\\cdot b^{k}$. Escribe el polinomio característico de:\n- a) $t(k)-t(k-1)=3^{2k}$\n- b) $t(k)-2t(k-1)=1+k+2^{k}$\n- c) $t(k)-3t(k-1)=4^{k+1}$\n\nY, para (b) y (c), traduce el orden a $n$ si $n=2^{k}$.",
    "hint": "En a) $3^{2k}=(3^{2})^{k}=9^{k}$. En c) $4^{k+1}=4\\cdot4^{k}$. En b) agrupa: $(1+k)\\cdot1^{k}+1\\cdot2^{k}$.",
    "solution": "**Paso 1. a).** La derecha es $9^{k}$: grado $0$, factor $(x-9)$. Polinomio $(x-1)(x-9)$, solución $C_1+C_2\\,9^{k}\\in\\Theta(9^{k})$.\n\n**Paso 2. b).** Izquierda $(x-2)$. Derecha: $(1+k)\\cdot1^{k}$, grado $1$, factor $(x-1)^{2}$; y $1\\cdot2^{k}$, factor $(x-2)$. Polinomio $(x-2)^{2}(x-1)^{2}$, solución $(C_1+C_2k)\\,2^{k}+C_3+C_4k\\in\\Theta(k\\,2^{k})$. Con $n=2^{k}$: $k\\,2^{k}=n\\log_2n$.\n\n**Paso 3. c).** Izquierda $(x-3)$. Derecha $4\\cdot4^{k}$, factor $(x-4)$. Polinomio $(x-3)(x-4)$, solución $C_1\\,3^{k}+C_2\\,4^{k}\\in\\Theta(4^{k})$. Con $n=2^{k}$: $4^{k}=n^{2}$."
   },
   {
    "id": "peldanos#G17",
    "n": "G17",
    "title": "Cambio de variable con $n/3$ y un término $n^{2}$",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.75,
    "steps": true,
    "statement": "Resuelve con el método general $T(n)=\\begin{cases}1 & n=1\\\\ T(n/3)+n^{2} & n>1\\end{cases}$ con $n=3^{k}$.\n- a) Escribe $t(k)=T(3^{k})$ y su polinomio característico.\n- b) Forma de $t(k)$ y constantes con $t(0)$ y $t(1)$.\n- c) Deshaz el cambio y compara con E12.",
    "hint": "$n^{2}=(3^{k})^{2}=9^{k}$. La recurrencia es $t(k)-t(k-1)=9^{k}$.",
    "solution": "**Paso 1. Recurrencia.** a) $t(k)=t(k-1)+9^{k}$. Polinomio $(x-1)(x-9)$.\n\n**Paso 2. Constantes.** b) $t(k)=C_1+C_2\\,9^{k}$. $t(0)=T(1)=1$ y $t(1)=T(3)=1+9=10$: $C_1+C_2=1$, $C_1+9C_2=10$, luego $C_2=\\frac98$ y $C_1=-\\frac18$.\n\n**Paso 3. Deshaz.** c) $9^{k}=n^{2}$: $T(n)=\\dfrac{9n^{2}-1}{8}\\in\\Theta(n^{2})$, el mismo resultado de E12 por expansión."
   },
   {
    "id": "peldanos#G18",
    "n": "G18",
    "title": "Cambio de variable con $\\sqrt n$ y tres llamadas",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Resuelve con el método general $T(n)=\\begin{cases}1 & n=1\\\\ 3T(n/9)+\\sqrt n & n>1\\end{cases}$ con $n=9^{k}$.\n- a) Escribe $t(k)=T(9^{k})$ y su polinomio característico.\n- b) Forma de $t(k)$ y constantes con $t(0)$ y $t(1)$.\n- c) Deshaz el cambio y compara con E13.",
    "hint": "$\\sqrt n=\\sqrt{9^{k}}=3^{k}$. La recurrencia es $t(k)=3t(k-1)+3^{k}$, y la base de la derecha coincide con la raíz de la izquierda.",
    "solution": "**Paso 1. Recurrencia.** a) $t(k)-3t(k-1)=3^{k}$. Polinomio $(x-3)(x-3)=(x-3)^{2}$.\n\n**Paso 2. Constantes.** b) $t(k)=(C_1+C_2k)\\,3^{k}$. $t(0)=1$ da $C_1=1$; $t(1)=T(9)=3+3=6=(1+C_2)\\cdot3$ da $C_2=1$. Así $t(k)=(1+k)\\,3^{k}$.\n\n**Paso 3. Deshaz.** c) $3^{k}=\\sqrt n$ y $k=\\log_9n$: $T(n)=\\sqrt n\\,(1+\\log_9n)\\in\\Theta(\\sqrt n\\log n)$, igual que en E13."
   },
   {
    "id": "peldanos#G19",
    "n": "G19",
    "title": "Tres términos a la derecha y raíz doble",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.75,
    "steps": true,
    "statement": "Da el polinomio característico y el orden de $T(n)=4T(n-1)-4T(n-2)+n+2^{n}$.\n- a) Parte izquierda.\n- b) Factores de cada término de la derecha.\n- c) Polinomio completo, forma de la solución y orden.",
    "hint": "Izquierda: $x^{2}-4x+4=(x-2)^{2}$. Derecha: $n=n\\cdot1^{n}$ y $2^{n}=1\\cdot2^{n}$.",
    "solution": "**Paso 1. Izquierda.** a) $(x-2)^{2}$.\n\n**Paso 2. Derecha.** b) $n\\cdot1^{n}$: grado $1$, factor $(x-1)^{2}$. $2^{n}$: grado $0$, factor $(x-2)$.\n\n**Paso 3. Todo.** c) $(x-2)^{3}(x-1)^{2}$. Solución: $(C_1+C_2n+C_3n^{2})\\,2^{n}+C_4+C_5n$. Orden $\\Theta(n^{2}2^{n})$."
   },
   {
    "id": "peldanos#G20",
    "n": "G20",
    "title": "Con constantes: $T(n)=T(n-1)+3^{n}+1$",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "rec-general"
    ],
    "stage": "general",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Resuelve $T(n)=T(n-1)+3^{n}+1$ con $T(0)=0$, hallando las constantes.\n- a) Polinomio característico y forma de la solución.\n- b) Calcula $T(1),T(2)$ y plantea el sistema.\n- c) Resuélvelo y comprueba con $T(3)$.",
    "hint": "Izquierda $(x-1)$. Derecha: $3^{n}$ da $(x-3)$ y $1=1\\cdot1^{n}$ da $(x-1)$. Polinomio $(x-1)^{2}(x-3)$.",
    "solution": "**Paso 1. Forma.** a) $T(n)=C_1\\,3^{n}+C_2+C_3n$.\n\n**Paso 2. Sistema.** b) $T(1)=4$ y $T(2)=14$. $C_1+C_2=0$; $3C_1+C_2+C_3=4$; $9C_1+C_2+2C_3=14$.\n\n**Paso 3. Resuelve.** c) De la primera $C_2=-C_1$. La segunda da $2C_1+C_3=4$ y la tercera $8C_1+2C_3=14$, es decir $4C_1+C_3=7$. Restando: $C_1=\\frac32$, $C_3=1$, $C_2=-\\frac32$. $T(n)=\\dfrac{3^{n+1}-3}{2}+n\\in\\Theta(3^{n})$.\n\n**Paso 4. Comprueba.** $T(3)=14+27+1=42$ y la fórmula da $\\frac{81-3}{2}+3=42$."
   },
   {
    "id": "peldanos#R02",
    "n": "R02",
    "title": "Una lista de resultados sobre pares consecutivos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Diseña una función recursiva `maximos_consecutivos(a)` que devuelva la lista de los máximos de cada pareja de elementos consecutivos: para `[1, 5, 10, -2, 1]` devuelve `[5, 10, 10, 1]`. Si la lista tiene menos de dos elementos, devuelve la lista vacía.\n- a) Tamaño, caso base, descomposición y combinación.\n- b) Código y prueba con el ejemplo.\n- c) ¿Cuál es el coste si se usan sublistas `a[1:]`? ¿Y si se pasa un índice en vez de cortar?",
    "hint": "La primera pareja es `(a[0], a[1])`. El resto de parejas son las de la lista sin su primer elemento. Combinar es poner el primer resultado delante.",
    "solution": "**Paso 1. Esquema.** a) Tamaño: `len(a)`. Caso base: menos de $2$ elementos, lista vacía. Descomposición: `a[1:]`, que tiene un elemento menos y cuyas parejas son todas las de `a` salvo la primera. Combinación: `[max(a[0], a[1])] + resultado`.\n\n**Paso 2. Código.** b)\n```python\ndef maximos_consecutivos(a):\n    if len(a) < 2:\n        return []\n    return [max(a[0], a[1])] + maximos_consecutivos(a[1:])\n```\nCon `[1,5,10,-2,1]`: `max(1,5)=5`, `max(5,10)=10`, `max(10,-2)=10`, `max(-2,1)=1`: `[5,10,10,1]`.\n\n**Paso 3. Coste.** c) Cada llamada copia la sublista (`a[1:]`) y la lista resultado: $T(n)=T(n-1)+n$, es decir $\\Theta(n^{2})$. Con un parámetro `i` (`maximos(a, i)`) no hay copias de la entrada y queda $T(n)=T(n-1)+c\\in\\Theta(n)$ (la concatenación del resultado se evita construyéndolo en una lista pasada como parámetro)."
   },
   {
    "id": "peldanos#R01",
    "n": "R01",
    "title": "Devolver dos listas a la vez",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.9,
    "steps": true,
    "statement": "Diseña `separa_signo(a)`, recursiva, que devuelva una pareja de listas: los elementos positivos de `a` y el resto (en el mismo orden). Para `[3, -1, 0, 4, -2]` devuelve `([3, 4], [-1, 0, -2])`.\n- a) Esquema (tamaño, caso base, descomposición, combinación) y código.\n- b) Ahora una variante: `pares_impares(a)` devuelve los elementos de los **índices** pares y los de los índices impares. Para `[10, 20, 30, 40, 50]` devuelve `([10, 30, 50], [20, 40])`. ¿Qué cambia en la combinación?",
    "hint": "En ambas, el resultado de `a[1:]` es una pareja de listas; solo hay que decidir a cuál de las dos añadir `a[0]`. En (b), lo que era el índice $0$ de `a[1:]` pasa a ser el índice $1$ de `a`.",
    "solution": "**Paso 1. Esquema.** a) Tamaño: `len(a)`. Caso base: lista vacía, devuelve `([], [])`. Descomposición: `a[1:]`. Combinación: el primer elemento va a una de las dos listas según su signo.\n```python\ndef separa_signo(a):\n    if a == []:\n        return [], []\n    pos, resto = separa_signo(a[1:])\n    if a[0] > 0:\n        return [a[0]] + pos, resto\n    return pos, [a[0]] + resto\n```\n**Paso 2. Prueba.** `[3,-1,0,4,-2]`: `3` va a los positivos, `-1` y `0` al resto, `4` a positivos, `-2` al resto: `([3,4],[-1,0,-2])`.\n\n**Paso 3. Por posición.** b) `a[0]` siempre está en el índice $0$ (par), así que va a la lista de pares. Y los pares de `a[1:]` pasan a ser impares en `a`, y viceversa: se intercambian.\n```python\ndef pares_impares(a):\n    if a == []:\n        return [], []\n    pares, impares = pares_impares(a[1:])\n    return [a[0]] + impares, pares\n```\nCon `[10,20,30,40,50]` devuelve `([10,30,50],[20,40])`."
   },
   {
    "id": "peldanos#R03",
    "n": "R03",
    "title": "La bisección recursiva",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Para hallar $\\sqrt[3]{a}$ ($a>0$) se busca un cero de $f(x)=x^{3}-a$ en $[lo,hi]$ por bisección: se calcula el punto medio y se sigue en la mitad donde cambia el signo.\n```python\ndef raiz_cubica(a, lo, hi, eps):\n    if hi - lo < eps:\n        return (lo + hi) / 2\n    medio = (lo + hi) / 2\n    if medio ** 3 < a:\n        return raiz_cubica(a, medio, hi, eps)\n    return raiz_cubica(a, lo, medio, eps)\n```\n- a) Traza `raiz_cubica(10, 0, 10, 0.5)`: intervalo de cada llamada.\n- b) ¿Cuántas llamadas y qué devuelve? Compara con $\\sqrt[3]{10}\\approx2{,}154$.\n- c) ¿Cuántas llamadas hacen falta en general?",
    "hint": "En cada llamada el intervalo se divide a la mitad. Se sigue por la derecha si $medio^{3}<a$ (el cero está más allá) y por la izquierda en otro caso. Se para cuando el ancho es menor que `eps`.",
    "solution": "**Paso 1. Traza.** a) $[0,10]$: medio $5$, $125\\ge10$, sigue $[0,5]$. Medio $2{,}5$, $15{,}6\\ge10$, sigue $[0,2{,}5]$. Medio $1{,}25$, $1{,}95<10$, sigue $[1{,}25,2{,}5]$. Medio $1{,}875$, $6{,}6<10$, sigue $[1{,}875,2{,}5]$. Medio $2{,}1875$, $10{,}47\\ge10$, sigue $[1{,}875,2{,}1875]$, de ancho $0{,}3125<0{,}5$.\n\n**Paso 2. Resultado.** b) $6$ llamadas. Devuelve el punto medio $2{,}03125$ (error de unos $0{,}12$, menor que `eps`).\n\n**Paso 3. En general.** c) El ancho pasa de $hi-lo$ a $(hi-lo)/2^{k}$: hacen falta $\\approx\\log_2\\frac{hi-lo}{eps}$ llamadas. Es decrementa y vencerás con $T(k)=T(k-1)+c$ sobre $k=\\log_2$ del ancho relativo."
   },
   {
    "id": "peldanos#R04",
    "n": "R04",
    "title": "Contar lo que aparece en un número",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Diseña `cuenta_digitos(n)`, recursiva, que devuelva una lista de $10$ posiciones con el número de veces que aparece cada dígito $0$–$9$ en el entero no negativo `n`. Por ejemplo, `cuenta_digitos(112358132)` devuelve `[0, 3, 2, 2, 0, 1, 0, 0, 1, 0]`.\n- a) Tamaño, caso base, descomposición y combinación.\n- b) Código y prueba.",
    "hint": "La descomposición es quitar el último dígito: `n // 10`. El último dígito es `n % 10`. Combinar es sumar $1$ en la posición de ese dígito de la lista que ya tienes.",
    "solution": "**Paso 1. Esquema.** a) Tamaño: número de dígitos. Caso base: `n < 10` (un solo dígito): una lista de ceros con un $1$ en la posición `n`. Descomposición: `n // 10`. Combinación: la lista de `n // 10` más $1$ en la posición `n % 10`.\n\n**Paso 2. Código.** b)\n```python\ndef cuenta_digitos(n):\n    if n < 10:\n        c = [0] * 10\n        c[n] = 1\n        return c\n    c = cuenta_digitos(n // 10)\n    c[n % 10] += 1\n    return c\n```\n**Paso 3. Prueba.** Los dígitos de $112358132$ son $1,1,2,3,5,8,1,3,2$: el $1$ aparece $3$ veces, el $2$ y el $3$, $2$ veces, el $5$ y el $8$, una vez: `[0,3,2,2,0,1,0,0,1,0]`. Coste: $\\Theta(\\log n)$ llamadas."
   },
   {
    "id": "peldanos#R05",
    "n": "R05",
    "title": "Menores de una matriz y determinante por adjuntos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "recursion-basica"
    ],
    "stage": "recursion",
    "src": "adic",
    "diff": 1.0,
    "steps": true,
    "statement": "El determinante de una matriz $n\\times n$ se puede definir recursivamente por la primera columna: $|A|=\\sum_{i=0}^{n-1}(-1)^{i}\\,a_{i,0}\\,|M_{i,0}|$, donde $M_{i,0}$ es la matriz que queda al quitar la fila $i$ y la columna $0$. Con $|A|=a_{0,0}$ si es $1\\times1$.\n- a) Escribe `menor(A, i, j)` que devuelva `A` sin la fila `i` ni la columna `j` (listas de listas).\n- b) Calcula a mano $|A|$ para $A=\\begin{pmatrix}2&0&1\\\\1&3&2\\\\1&1&4\\end{pmatrix}$.\n- c) Escribe `det(A)` recursiva y comprueba con ese ejemplo.",
    "hint": "Para (a) basta con una lista por comprensión sobre las filas distintas de `i`, quedándote en cada una con los elementos de columnas distintas de `j`. Para (b), cada menor es una matriz $2\\times2$ con $|M|=ad-bc$.",
    "solution": "**Paso 1. Menor.** a)\n```python\ndef menor(A, i, j):\n    return [[x for c, x in enumerate(fila) if c != j]\n            for r, fila in enumerate(A) if r != i]\n```\n**Paso 2. A mano.** b) $|A|=2\\begin{vmatrix}3&2\\\\1&4\\end{vmatrix}-1\\begin{vmatrix}0&1\\\\1&4\\end{vmatrix}+1\\begin{vmatrix}0&1\\\\3&2\\end{vmatrix}=2(12-2)-1(0-1)+1(0-3)=20+1-3=18$.\n\n**Paso 3. Recursiva.** c)\n```python\ndef det(A):\n    if len(A) == 1:\n        return A[0][0]\n    return sum((-1) ** i * A[i][0] * det(menor(A, i, 0)) for i in range(len(A)))\n```\n`det` del ejemplo da $18$. Cada llamada hace $n$ llamadas con tamaño $n-1$: $T(n)=nT(n-1)+\\cdots\\in\\Theta(n!)$, por eso no se usa así en la práctica."
   },
   {
    "id": "peldanos#S01",
    "n": "S01",
    "title": "Potencias",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.2,
    "steps": true,
    "statement": "**Ejemplo resuelto.** Simplifica $\\dfrac{2^{n+3}}{2^{n}}$. Con la misma base, los exponentes se restan: $2^{(n+3)-n}=2^{3}=8$.\n\n**Ahora tú.** Simplifica:\n- a) $2^{5}\\cdot 2^{3}$\n- b) $(3^{2})^{3}$\n- c) $2^{-3}$\n- d) $\\dfrac{2^{n+1}}{2^{n-1}}$\n- e) $(2n)^{2}$, escrito como un número por $n^{2}$\n- f) $4^{n}$, escrito como potencia de $2$",
    "hint": "Con la misma base, multiplicar suma los exponentes y dividir los resta. Una potencia de una potencia multiplica los exponentes.",
    "solution": "**Paso 1. Misma base.** a) $2^{5}\\cdot2^{3}=2^{5+3}=2^{8}=256$. d) $\\dfrac{2^{n+1}}{2^{n-1}}=2^{(n+1)-(n-1)}=2^{2}=4$.\n\n**Paso 2. Potencia de una potencia.** b) $(3^{2})^{3}=3^{2\\cdot3}=3^{6}=729$. f) $4^{n}=(2^{2})^{n}=2^{2n}$.\n\n**Paso 3. Exponente negativo.** c) $2^{-3}=\\dfrac{1}{2^{3}}=\\dfrac18$.\n\n**Paso 4. Potencia de un producto.** e) $(2n)^{2}=2^{2}n^{2}=4n^{2}$."
   },
   {
    "id": "peldanos#S02",
    "n": "S02",
    "title": "Logaritmos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.25,
    "steps": true,
    "statement": "**Ejemplo resuelto.** $\\log_2 32=5$, porque hay que elevar $2$ a $5$ para obtener $32$.\n\n**Ahora tú.** Calcula o simplifica:\n- a) $\\log_3 81$\n- b) $\\log_2 \\tfrac14$\n- c) $\\log_{10} 1$\n- d) $2^{\\log_2 7}$\n- e) $\\log_2(8n)$, en función de $\\log_2 n$\n- f) $\\log_2(n^{3})$, en función de $\\log_2 n$",
    "hint": "$\\log_b x$ es el exponente al que hay que elevar $b$ para obtener $x$. El logaritmo de un producto es la suma de los logaritmos, y el de una potencia saca el exponente multiplicando.",
    "solution": "**Paso 1. Pregúntate por el exponente.** a) $3^{4}=81$, luego $\\log_3 81=4$. b) $2^{-2}=\\tfrac14$, luego $\\log_2\\tfrac14=-2$. c) $b^{0}=1$ para cualquier base, luego $\\log_{10}1=0$.\n\n**Paso 2. Logaritmo y potencia se anulan.** d) $b^{\\log_b a}=a$, así que $2^{\\log_2 7}=7$.\n\n**Paso 3. Producto y potencia.** e) $\\log_2(8n)=\\log_2 8+\\log_2 n=3+\\log_2 n$. f) $\\log_2(n^{3})=3\\log_2 n$."
   },
   {
    "id": "peldanos#S03",
    "n": "S03",
    "title": "Potencias y logaritmos a la vez",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.35,
    "steps": true,
    "statement": "Simplifica las expresiones. Salen en términos de $n$ sin logaritmos, salvo la d) y la e):\n- a) $2^{\\log_2 n+3}$\n- b) $4^{\\log_2 n}$\n- c) $n^{\\log_2 8}$\n- d) $\\log_2(n^{2})-\\log_2 n$\n- e) $\\log_4 n$, en función de $\\log_2 n$\n- f) $9^{\\log_3 n}$",
    "hint": "Reescribe la base como potencia de la base del logaritmo: $4=2^{2}$. Después usa $b^{\\log_b n}=n$.",
    "solution": "**Paso 1. Suma en el exponente.** a) $2^{\\log_2 n+3}=2^{\\log_2 n}\\cdot2^{3}=8n$.\n\n**Paso 2. Cambia la base a la del logaritmo.** b) $4^{\\log_2 n}=(2^{2})^{\\log_2 n}=(2^{\\log_2 n})^{2}=n^{2}$. f) $9^{\\log_3 n}=(3^{2})^{\\log_3 n}=n^{2}$.\n\n**Paso 3. Calcula el logaritmo pequeño primero.** c) $\\log_2 8=3$, luego $n^{\\log_2 8}=n^{3}$.\n\n**Paso 4. Propiedades del logaritmo.** d) $2\\log_2 n-\\log_2 n=\\log_2 n$. e) Cambio de base: $\\log_4 n=\\dfrac{\\log_2 n}{\\log_2 4}=\\tfrac12\\log_2 n$."
   },
   {
    "id": "peldanos#S04",
    "n": "S04",
    "title": "Contar parejas",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "**Ejemplo resuelto.** $\\binom52=\\dfrac{5!}{2!\\,3!}=\\dfrac{5\\cdot4}{2}=10$: hay $10$ formas de escoger $2$ elementos de $5$.\n\n**Ahora tú.**\n- a) Calcula $\\binom62$.\n- b) Demuestra que $\\binom n2=\\dfrac{n(n-1)}{2}$ simplificando los factoriales.\n- c) Un doble bucle compara cada pareja $(i,j)$ con $i<j$ de una lista de $n=100$ elementos. ¿Cuántas comparaciones hace? ¿De qué orden es en general?",
    "hint": "En $\\dfrac{n!}{2!\\,(n-2)!}$ casi todo el factorial de arriba se cancela con el de abajo: $n!=n\\,(n-1)\\,(n-2)!$.",
    "solution": "**Paso 1. Calcula con la definición.** a) $\\binom62=\\dfrac{6\\cdot5}{2}=15$.\n\n**Paso 2. Cancela.** b) $\\binom n2=\\dfrac{n!}{2!\\,(n-2)!}=\\dfrac{n(n-1)(n-2)!}{2\\,(n-2)!}=\\dfrac{n(n-1)}{2}$.\n\n**Paso 3. Aplícalo.** c) Cada pareja se compara una vez: $\\binom{100}{2}=\\dfrac{100\\cdot99}{2}=4950$. En general $\\dfrac{n(n-1)}{2}=\\dfrac{n^{2}}{2}-\\dfrac n2$, que es del orden de $n^{2}$."
   },
   {
    "id": "peldanos#S05",
    "n": "S05",
    "title": "Derivar",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "**Ejemplo resuelto.** $f(x)=5x^{3}$ se deriva con $(x^{k})'=kx^{k-1}$: $f'(x)=15x^{2}$.\n\n**Ahora tú.** Deriva:\n- a) $f(x)=4x^{3}-2x+7$\n- b) $f(x)=\\sqrt x$\n- c) $f(x)=x\\ln x$\n- d) $f(x)=\\log_2 x$\n- e) $f(x)=2^{x}$",
    "hint": "Una constante se deriva a $0$. La raíz es $x^{1/2}$. Para el producto: $(gh)'=g'h+gh'$. $(\\ln x)'=\\dfrac1x$.",
    "solution": "**Paso 1. Polinomios.** a) $f'(x)=12x^{2}-2$ (la constante $7$ desaparece).\n\n**Paso 2. Raíz como potencia.** b) $x^{1/2}$ da $\\tfrac12x^{-1/2}=\\dfrac{1}{2\\sqrt x}$.\n\n**Paso 3. Producto.** c) $(x)'\\ln x+x(\\ln x)'=\\ln x+x\\cdot\\dfrac1x=\\ln x+1$.\n\n**Paso 4. Logaritmo y exponencial en otra base.** d) $(\\log_2 x)'=\\dfrac{1}{x\\ln2}$. e) $(2^{x})'=2^{x}\\ln2$."
   },
   {
    "id": "peldanos#S06",
    "n": "S06",
    "title": "Límites",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.35,
    "steps": true,
    "statement": "**Ejemplo resuelto.** $\\displaystyle\\lim_{n\\to\\infty}\\frac{3n^{2}+5n}{n^{2}}$: dividiendo arriba y abajo por $n^{2}$ queda $3+\\frac5n\\to3$.\n\n**Ahora tú.** Calcula:\n- a) $\\displaystyle\\lim_{n\\to\\infty}\\frac{n^{2}+1}{3n^{2}}$\n- b) $\\displaystyle\\lim_{n\\to\\infty}\\frac{n}{n^{2}+1}$\n- c) $\\displaystyle\\lim_{n\\to\\infty}\\frac{n^{2}}{n}$\n- d) $\\displaystyle\\lim_{n\\to\\infty}\\frac{\\ln n}{n}$ (regla de L'Hôpital)\n- e) $\\displaystyle\\lim_{n\\to\\infty}\\frac{n^{2}}{2^{n}}$ (L'Hôpital dos veces)",
    "hint": "En a), b) y c) divide por la mayor potencia de $n$. En d) y e) sale $\\infty/\\infty$: deriva el numerador y el denominador por separado.",
    "solution": "**Paso 1. Divide por la mayor potencia.** a) $\\dfrac{1+1/n^{2}}{3}\\to\\dfrac13$. b) $\\dfrac{1/n}{1+1/n^{2}}\\to0$. c) $\\dfrac{n^{2}}{n}=n\\to\\infty$.\n\n**Paso 2. L'Hôpital una vez.** d) $\\dfrac{(\\ln n)'}{(n)'}=\\dfrac{1/n}{1}=\\dfrac1n\\to0$.\n\n**Paso 3. L'Hôpital dos veces.** e) $\\dfrac{2n}{2^{n}\\ln2}$ sigue siendo $\\infty/\\infty$; otra vez: $\\dfrac{2}{2^{n}\\ln^{2}2}\\to0$. Un exponencial crece más deprisa que cualquier polinomio."
   },
   {
    "id": "peldanos#S07",
    "n": "S07",
    "title": "Integrales para sumar áreas",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.35,
    "steps": true,
    "statement": "**Ejemplo resuelto.** $\\displaystyle\\int_0^{n}x\\,dx=\\left[\\frac{x^{2}}{2}\\right]_0^{n}=\\frac{n^{2}}{2}$.\n\n**Ahora tú.** Calcula:\n- a) $\\displaystyle\\int_1^{n}x^{2}\\,dx$\n- b) $\\displaystyle\\int_1^{n}\\frac1x\\,dx$\n- c) $\\displaystyle\\int_0^{n}(3x+1)\\,dx$\n- d) $\\displaystyle\\int_1^{n}\\sqrt x\\,dx$\n- e) $\\displaystyle\\int_0^{n}2^{x}\\,dx$",
    "hint": "$\\int x^{k}dx=\\dfrac{x^{k+1}}{k+1}$, $\\int\\frac1xdx=\\ln x$ y $\\int a^{x}dx=\\dfrac{a^{x}}{\\ln a}$. Después evalúa en el límite superior y resta el inferior.",
    "solution": "**Paso 1. Potencias.** a) $\\left[\\dfrac{x^{3}}{3}\\right]_1^{n}=\\dfrac{n^{3}-1}{3}$. d) $\\left[\\dfrac{x^{3/2}}{3/2}\\right]_1^{n}=\\dfrac23\\left(n^{3/2}-1\\right)$.\n\n**Paso 2. Suma de términos.** c) $\\left[\\dfrac{3x^{2}}{2}+x\\right]_0^{n}=\\dfrac32n^{2}+n$.\n\n**Paso 3. Logaritmo y exponencial.** b) $[\\ln x]_1^{n}=\\ln n-\\ln1=\\ln n$. e) $\\left[\\dfrac{2^{x}}{\\ln2}\\right]_0^{n}=\\dfrac{2^{n}-1}{\\ln2}$."
   },
   {
    "id": "peldanos#S08",
    "n": "S08",
    "title": "Leer un sumatorio",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.2,
    "steps": true,
    "statement": "**Ejemplo resuelto.** $\\displaystyle\\sum_{i=1}^{4}(2i+1)$: el índice $i$ toma los valores $1,2,3,4$, y se suma $2i+1$ en cada uno: $3+5+7+9=24$.\n\n**Ahora tú.** Escribe los términos y calcula:\n- a) $\\displaystyle\\sum_{i=1}^{5}i^{2}$\n- b) $\\displaystyle\\sum_{i=3}^{6}(i-1)$\n- c) $\\displaystyle\\sum_{i=0}^{3}2^{i}$\n- d) $\\displaystyle\\sum_{j=1}^{4}j$ (¿cambia algo por llamarla $j$?)\n- e) $\\displaystyle\\sum_{i=5}^{4}i$",
    "hint": "Fíjate en dónde empieza y dónde acaba el índice. En e) piensa cuántos valores tiene el índice.",
    "solution": "**Paso 1. Lista los valores del índice.** a) $1,2,3,4,5$. b) $3,4,5,6$. c) $0,1,2,3$.\n\n**Paso 2. Sustituye y suma.** a) $1+4+9+16+25=55$. b) $2+3+4+5=14$. c) $1+2+4+8=15$.\n\n**Paso 3. Nombre del índice y sumas vacías.** d) $1+2+3+4=10$: el nombre del índice no importa. e) El límite inferior es mayor que el superior, no hay términos y el sumatorio vale $0$."
   },
   {
    "id": "peldanos#S09",
    "n": "S09",
    "title": "Sumar constantes",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "**Ejemplo resuelto.** $\\displaystyle\\sum_{i=1}^{n}7=\\underbrace{7+7+\\cdots+7}_{n\\text{ veces}}=7n$.\n\n**Ahora tú.** Calcula:\n- a) $\\displaystyle\\sum_{i=1}^{10}3$\n- b) $\\displaystyle\\sum_{i=1}^{n}n$\n- c) $\\displaystyle\\sum_{i=0}^{n-1}1$\n- d) $\\displaystyle\\sum_{i=3}^{8}1$\n- e) $\\displaystyle\\sum_{i=2}^{n}5$",
    "hint": "Si lo que se suma no depende de $i$, solo hay que contar cuántos términos hay y multiplicar. Cuenta: último valor $-$ primero $+\\,1$.",
    "solution": "**Paso 1. Cuenta los términos.** a) $10$ términos. b) $n$ términos. c) de $0$ a $n-1$ hay $n$ valores. d) de $3$ a $8$ hay $8-3+1=6$. e) de $2$ a $n$ hay $n-1$.\n\n**Paso 2. Multiplica por la constante.** a) $3\\cdot10=30$. b) $n\\cdot n=n^{2}$ (aquí la constante es $n$, que no cambia con $i$). c) $n$. d) $6$. e) $5(n-1)$."
   },
   {
    "id": "peldanos#S10",
    "n": "S10",
    "title": "Sumar como Gauss, con números",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "**Ejemplo resuelto.** $1+2+\\cdots+6$: se empareja el primero con el último, $1+6$, el segundo con el penúltimo, $2+5$, y así. Cada pareja suma $7$ y hay $3$ parejas: $21$.\n\n**Ahora tú.** Calcula emparejando:\n- a) $1+2+\\cdots+10$\n- b) $1+2+\\cdots+100$\n- c) $1+2+\\cdots+7$ (aquí sobra un término: ¿qué haces?)\n- d) $11+12+\\cdots+20$",
    "hint": "Escribe la suma dos veces, la segunda al revés, y suma por columnas: todas las columnas dan lo mismo. En c) esa idea no necesita que el número de términos sea par.",
    "solution": "**Paso 1. Parejas.** a) $1+10=11$ y hay $5$ parejas: $55$. b) $1+100=101$ y hay $50$ parejas: $5050$.\n\n**Paso 2. Cuando el número de términos es impar.** c) Hay $7$ términos. Con el truco de escribirla dos veces: $2S=7\\cdot8$, así que $S=28$. (También: $3$ parejas de $8$, más el $4$ que queda en medio: $24+4=28$.)\n\n**Paso 3. Empezar en otro número.** d) $11+20=31$, hay $10$ términos y por tanto $5$ parejas: $155$."
   },
   {
    "id": "peldanos#S11",
    "n": "S11",
    "title": "La fórmula de Gauss, completa",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "Se quiere demostrar que $S(n)=1+2+\\cdots+n=\\dfrac{n(n+1)}{2}$. Escribimos la suma dos veces, la segunda al revés:\n$$S(n)=1+2+\\cdots+(n-1)+n,\\qquad S(n)=n+(n-1)+\\cdots+2+1$$\n- a) ¿Cuánto suma cada columna?\n- b) ¿Cuántas columnas hay?\n- c) Con eso, ¿cuánto vale $2S(n)$ y cuánto $S(n)$?\n- d) Comprueba el resultado con $n=10$.\n- e) Úsalo para calcular $1+2+\\cdots+1000$.",
    "hint": "La primera columna suma $1+n$. Mira la segunda: $2+(n-1)$.",
    "solution": "**Paso 1. Una columna.** $1+n$, $2+(n-1)$, $3+(n-2)$, ... todas suman $n+1$.\n\n**Paso 2. Cuántas.** Hay una columna por término, es decir, $n$.\n\n**Paso 3. Despeja.** $2S(n)=n(n+1)$, luego $S(n)=\\dfrac{n(n+1)}{2}$.\n\n**Paso 4. Comprueba y usa.** d) $\\dfrac{10\\cdot11}{2}=55$, igual que antes. e) $\\dfrac{1000\\cdot1001}{2}=500500$."
   },
   {
    "id": "peldanos#S12",
    "n": "S12",
    "title": "Usar la fórmula de Gauss",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.45,
    "steps": true,
    "statement": "Halla una fórmula sin sumatorio para cada una (y comprueba con $n=4$):\n- a) $\\displaystyle\\sum_{i=1}^{n}(i+3)$\n- b) $\\displaystyle\\sum_{i=1}^{n}(3i-2)$\n- c) $\\displaystyle\\sum_{i=1}^{n}2i$",
    "hint": "El sumatorio de una suma es la suma de los sumatorios, y los números que multiplican salen fuera: $\\sum(3i-2)=3\\sum i-\\sum 2$. Usa $\\sum_{i=1}^{n}i=\\frac{n(n+1)}{2}$.",
    "solution": "**Paso 1. Separa en sumatorios sencillos.** a) $\\sum i+\\sum3$. b) $3\\sum i-\\sum2$. c) $2\\sum i$.\n\n**Paso 2. Sustituye.** a) $\\dfrac{n(n+1)}{2}+3n=\\dfrac{n(n+7)}{2}$. b) $\\dfrac{3n(n+1)}{2}-2n=\\dfrac{n(3n-1)}{2}$. c) $2\\cdot\\dfrac{n(n+1)}{2}=n(n+1)$.\n\n**Paso 3. Comprueba con $n=4$.** a) $4+5+6+7=22$ y $\\frac{4\\cdot11}{2}=22$. b) $1+4+7+10=22$ y $\\frac{4\\cdot11}{2}=22$. c) $2+4+6+8=20$ y $4\\cdot5=20$."
   },
   {
    "id": "peldanos#S13",
    "n": "S13",
    "title": "Una progresión aritmética concreta",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Considera la sucesión $3,7,11,15,\\dots$, donde cada término es el anterior más una cantidad fija $d$, y se numera desde $a_0$.\n- a) ¿Cuánto valen $a_0$ y $d$?\n- b) Escribe $a_i$ en función de $i$.\n- c) Si hay $11$ términos ($a_0,\\dots,a_{10}$), ¿cuánto vale el último?\n- d) Suma los $11$ términos emparejando primero con último.",
    "hint": "$a_1=a_0+d$, $a_2=a_0+2d$, ... ¿Qué pasa con $a_i$?",
    "solution": "**Paso 1. Valores iniciales.** $a_0=3$ y $d=7-3=4$.\n\n**Paso 2. Término general.** $a_i=a_0+i\\,d=3+4i$.\n\n**Paso 3. Último término.** $a_{10}=3+40=43$.\n\n**Paso 4. Emparejar.** $a_0+a_{10}=46$, y cada pareja $a_i+a_{10-i}$ suma lo mismo. Con $11$ términos: $\\dfrac{11\\cdot46}{2}=253$."
   },
   {
    "id": "peldanos#S14",
    "n": "S14",
    "title": "Los primeros impares",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "- a) Suma $1+3+5+7+9$ emparejando.\n- b) Calcula la suma de los $n$ primeros impares para $n=1,2,3,4,5$.\n- c) ¿Qué patrón ves?\n- d) Comprueba que el término número $i$ es $2i-1$ y que \"primero + último\" vale $2n$.",
    "hint": "En una suma de este tipo, \"primero + último\" vale lo mismo que \"segundo + penúltimo\", y así con todas las parejas.",
    "solution": "**Paso 1. Emparejar.** a) $1+9=10$, $3+7=10$, y el $5$ queda solo; el $5$ es la mitad de $10$, así que sale $5\\cdot10/2=25$.\n\n**Paso 2. Tabla.** b) $1,\\ 1+3=4,\\ 4+5=9,\\ 9+7=16,\\ 16+9=25$.\n\n**Paso 3. Patrón.** c) $1^{2},2^{2},3^{2},4^{2},5^{2}$: la suma de los $n$ primeros impares parece $n^{2}$.\n\n**Paso 4. Por qué.** d) El $i$-ésimo impar es $2i-1$ ($i=1$ da $1$). Primero + último $=1+(2n-1)=2n$. Con $n$ términos: $\\dfrac{n\\cdot2n}{2}=n^{2}$."
   },
   {
    "id": "peldanos#S15",
    "n": "S15",
    "title": "Un sumatorio que no empieza en 1",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.55,
    "steps": true,
    "statement": "Calcula $\\displaystyle\\sum_{i=10}^{20}i$ de dos formas:\n- a) Restando dos sumas que empiezan en $1$.\n- b) Emparejando directamente (primero con último).\n- c) Generaliza: ¿cuánto vale $\\displaystyle\\sum_{i=m}^{n}i$?",
    "hint": "$\\sum_{i=10}^{20}i=\\sum_{i=1}^{20}i-\\sum_{i=1}^{9}i$. Y para emparejar, cuenta primero cuántos términos hay.",
    "solution": "**Paso 1. Resta.** a) $\\dfrac{20\\cdot21}{2}-\\dfrac{9\\cdot10}{2}=210-45=165$.\n\n**Paso 2. Empareja.** b) De $10$ a $20$ hay $11$ términos. Primero + último $=30$. Resultado: $\\dfrac{11\\cdot30}{2}=165$.\n\n**Paso 3. Generaliza.** c) $\\displaystyle\\sum_{i=m}^{n}i=\\frac{n(n+1)}{2}-\\frac{(m-1)m}{2}=\\frac{(n-m+1)(m+n)}{2}$. La segunda forma es \"número de términos $\\times$ (primero + último) $/\\,2$\"."
   },
   {
    "id": "peldanos#S16",
    "n": "S16",
    "title": "La suma de una progresión aritmética, con huecos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Sea $s_i=s_0+i\\,d$ una progresión aritmética y $S=\\sum_{i=0}^{n-1}s_i$ la suma de sus $n$ primeros términos. Completa:\n- a) El último término es $s_{n-1}=\\ldots$\n- b) Una pareja $s_i+s_{n-1-i}$ vale $\\ldots$ y no depende de $i$.\n- c) Escribiendo $S$ dos veces (una al revés) y sumando por columnas: $2S=\\ldots$\n- d) Luego $S=\\ldots$\n- e) Aplícalo a $s_0=5$, $d=3$, $n=20$.",
    "hint": "Sustituye en $s_i+s_{n-1-i}$ la fórmula de cada término y observa cómo desaparece $i$.",
    "solution": "**Paso 1. Último término.** a) $s_{n-1}=s_0+(n-1)d$.\n\n**Paso 2. La pareja.** b) $s_i+s_{n-1-i}=(s_0+i\\,d)+(s_0+(n-1-i)d)=2s_0+(n-1)d$. No aparece $i$, y es igual a $s_0+s_{n-1}$.\n\n**Paso 3. Doble suma.** c) Hay $n$ columnas iguales: $2S=n\\,(s_0+s_{n-1})$.\n\n**Paso 4. Resultado.** d) $S=\\dfrac n2\\,(s_0+s_{n-1})$.\n\n**Paso 5. Aplícalo.** e) $s_{19}=5+19\\cdot3=62$ y $S=\\dfrac{20}{2}(5+62)=670$."
   },
   {
    "id": "peldanos#S17",
    "n": "S17",
    "title": "Comprobar la fórmula de los cuadrados",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "La suma de los $n$ primeros cuadrados vale $\\displaystyle\\sum_{i=1}^{n}i^{2}=\\frac{n(n+1)(2n+1)}{6}$.\n- a) Calcula la suma sumando uno a uno para $n=1,2,3,4,5$.\n- b) Comprueba que la fórmula da lo mismo en cada caso.\n- c) Los sumandos $1,4,9,\\dots$, ¿forman una progresión aritmética? ¿Sirve entonces el truco de emparejar? ¿Con qué potencia de $n$ crece la fórmula?",
    "hint": "Para comprobar la fórmula basta sustituir $n$. Por ejemplo, $n=3$ da $\\frac{3\\cdot4\\cdot7}{6}$.",
    "solution": "**Paso 1. Suma directa.** a) $1,\\ 1+4=5,\\ 5+9=14,\\ 14+16=30,\\ 30+25=55$.\n\n**Paso 2. Fórmula.** b) $n=3$: $\\frac{3\\cdot4\\cdot7}{6}=14$. $n=4$: $\\frac{4\\cdot5\\cdot9}{6}=30$. $n=5$: $\\frac{5\\cdot6\\cdot11}{6}=55$. Coinciden también para $n=1$ ($1$) y $n=2$ ($5$).\n\n**Paso 3. Qué tipo de suma es.** c) Las diferencias entre términos son $3,5,7,\\dots$: no son constantes, así que no es una progresión aritmética y el emparejado no sirve. Al desarrollar la fórmula, $\\frac{n(n+1)(2n+1)}{6}=\\frac{2n^{3}+3n^{2}+n}{6}$, el término dominante es $\\frac{n^{3}}{3}$: crece como $n^{3}$."
   },
   {
    "id": "peldanos#S18",
    "n": "S18",
    "title": "Usar la fórmula de los cuadrados",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.55,
    "steps": true,
    "statement": "Calcula sin sumatorio:\n- a) $\\displaystyle\\sum_{i=1}^{10}i^{2}$\n- b) $\\displaystyle\\sum_{i=1}^{n}(i^{2}+i)$\n- c) $\\displaystyle\\sum_{i=1}^{n}(2i-1)^{2}$\n\nComprueba b) con $n=3$ y c) con $n=3$.",
    "hint": "En c) desarrolla el cuadrado: $(2i-1)^{2}=4i^{2}-4i+1$. Luego usa linealidad y las fórmulas de $\\sum i^{2}$, $\\sum i$ y $\\sum 1$.",
    "solution": "**Paso 1. Sustituye $n=10$.** a) $\\dfrac{10\\cdot11\\cdot21}{6}=385$.\n\n**Paso 2. Separa y usa dos fórmulas.** b) $\\dfrac{n(n+1)(2n+1)}{6}+\\dfrac{n(n+1)}{2}=\\dfrac{n(n+1)(2n+4)}{6}=\\dfrac{n(n+1)(n+2)}{3}$. Con $n=3$: $2+6+12=20$ y $\\frac{3\\cdot4\\cdot5}{3}=20$.\n\n**Paso 3. Desarrolla el cuadrado.** c) $4\\sum i^{2}-4\\sum i+\\sum1=\\dfrac{2n(n+1)(2n+1)}{3}-2n(n+1)+n=\\dfrac{4n^{3}-n}{3}=\\dfrac{n(4n^{2}-1)}{3}$. Con $n=3$: $1+9+25=35$ y $\\frac{3\\cdot35}{3}=35$."
   },
   {
    "id": "peldanos#S23",
    "n": "S23",
    "title": "Series geométricas, el truco",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.4,
    "steps": true,
    "statement": "**Ejemplo resuelto.** $S=1+2+4+8+\\cdots+512$. Multiplicando por $2$ se desplaza todo un lugar: $2S=2+4+8+\\cdots+512+1024$. Restando, $2S-S=1024-1$, es decir $S=1023$.\n\n**Ahora tú.**\n- a) Calcula $1+3+9+27+81$ con el mismo truco (multiplica por $3$ y resta).\n- b) Calcula $1+\\frac12+\\frac14+\\frac18+\\frac1{16}$ (multiplica por $\\frac12$).",
    "hint": "Escribe $S$ y $rS$ una debajo de la otra, desplazadas un lugar, y resta: casi todo se cancela.",
    "solution": "**Paso 1. Multiplica y resta.** a) $3S=3+9+27+81+243$, luego $3S-S=243-1=242$ y $S=121$.\n\n**Paso 2. Con razón menor que 1.** b) $\\tfrac12S=\\tfrac12+\\tfrac14+\\tfrac18+\\tfrac1{16}+\\tfrac1{32}$, así que $S-\\tfrac12S=1-\\tfrac1{32}$, es decir $\\tfrac12S=\\tfrac{31}{32}$ y $S=\\tfrac{31}{16}$."
   },
   {
    "id": "peldanos#S24",
    "n": "S24",
    "title": "Fórmula de la serie geométrica",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "La fórmula es $\\displaystyle\\sum_{i=m}^{n}r^{i}=\\frac{r^{n+1}-r^{m}}{r-1}$ (con $r\\ne1$). Calcula en forma cerrada:\n- a) $\\displaystyle\\sum_{i=0}^{n-1}3^{i}$\n- b) $\\displaystyle\\sum_{i=0}^{n}2^{i}$\n- c) $\\displaystyle\\sum_{i=0}^{n-1}\\left(\\tfrac12\\right)^{i}$, y comprueba con $n=3$.",
    "hint": "Identifica $m$, $n$ y $r$ en cada caso. Ojo con el límite superior: en a) y c) llega a $n-1$, no a $n$.",
    "solution": "**Paso 1. a).** $m=0$, último exponente $n-1$, $r=3$: $\\dfrac{3^{n}-1}{3-1}=\\dfrac{3^{n}-1}{2}$.\n\n**Paso 2. b).** Último exponente $n$, $r=2$: $\\dfrac{2^{n+1}-1}{2-1}=2^{n+1}-1$.\n\n**Paso 3. c).** $r=\\tfrac12$: $\\dfrac{(\\tfrac12)^{n}-1}{\\tfrac12-1}=2-\\dfrac{1}{2^{n-1}}$. Con $n=3$: $1+\\tfrac12+\\tfrac14=\\tfrac74$ y $2-\\tfrac14=\\tfrac74$."
   },
   {
    "id": "peldanos#S25",
    "n": "S25",
    "title": "Series geométricas que no empiezan en 0",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Calcula en forma cerrada y comprueba con $n=3$ (o $n=2$ en b):\n- a) $\\displaystyle\\sum_{i=3}^{n}2^{i}$\n- b) $\\displaystyle\\sum_{i=1}^{n}3^{i}$\n- c) $\\displaystyle\\sum_{i=0}^{n-1}5\\cdot2^{i}$\n- d) $\\displaystyle\\sum_{i=0}^{n}4^{\\,n-i}$",
    "hint": "En c) saca el $5$ fuera. En d) la suma recorre las mismas potencias de $4$ pero al revés: con $k=n-i$ queda $\\sum_{k=0}^{n}4^{k}$.",
    "solution": "**Paso 1. Fórmula con $m$.** a) $\\dfrac{2^{n+1}-2^{3}}{2-1}=2^{n+1}-8$. Con $n=3$: $8=16-8$. b) $\\dfrac{3^{n+1}-3}{2}$. Con $n=2$: $3+9=12=\\frac{27-3}{2}$.\n\n**Paso 2. Factor común.** c) $5\\sum_{i=0}^{n-1}2^{i}=5\\,(2^{n}-1)$.\n\n**Paso 3. Suma en sentido contrario.** d) Con $k=n-i$, la suma es $\\sum_{k=0}^{n}4^{k}=\\dfrac{4^{n+1}-1}{3}$. Con $n=1$: $4+1=5=\\frac{16-1}{3}$."
   },
   {
    "id": "peldanos#S26",
    "n": "S26",
    "title": "Cuánto crece una serie geométrica",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Decide el orden $\\Theta(\\cdot)$ de cada suma, usando la fórmula cerrada:\n- a) $\\displaystyle\\sum_{i=0}^{n}2^{i}$\n- b) $\\displaystyle\\sum_{i=0}^{n}\\left(\\tfrac12\\right)^{i}$\n- c) $\\displaystyle\\sum_{i=0}^{\\log_2 n}2^{i}$ (el índice llega hasta $\\log_2 n$)",
    "hint": "Calcula primero la fórmula cerrada. En c) el exponente $2^{\\log_2n}$ es sencillo.",
    "solution": "**Paso 1. a).** $2^{n+1}-1\\in\\Theta(2^{n})$: la suma entera es del orden de su último término.\n\n**Paso 2. b).** $\\dfrac{1-(\\tfrac12)^{n+1}}{1-\\tfrac12}=2-\\dfrac1{2^{n}}$, que siempre está entre $1$ y $2$: $\\Theta(1)$. Si la razón es menor que $1$, domina el primer término.\n\n**Paso 3. c).** $2^{\\log_2n+1}-1=2n-1\\in\\Theta(n)$. Sumar potencias de $2$ hasta $n$ cuesta lo mismo que una pasada lineal. Saldrá en bucles que doblan una variable."
   },
   {
    "id": "peldanos#S27",
    "n": "S27",
    "title": "La suma de $i\\cdot r^{i}$",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.75,
    "steps": true,
    "statement": "La suma $\\displaystyle\\sum_{i=1}^{n}i\\,r^{i}$ vale $\\dfrac{r+r^{n+1}(nr-n-1)}{(r-1)^{2}}$.\n- a) Calcula $\\sum_{i=1}^{3}i\\,2^{i}$ sumando y con la fórmula ($r=2$, $n=3$).\n- b) Simplifica la fórmula para $r=2$.\n- c) Comprueba tu fórmula del apartado b) con $n=4$.",
    "hint": "Con $r=2$, el denominador $(r-1)^{2}$ vale $1$ y $nr-n-1=n-1$.",
    "solution": "**Paso 1. Suma directa.** a) $2+8+24=34$.\n\n**Paso 2. Fórmula.** a) $\\dfrac{2+2^{4}(6-3-1)}{1}=2+32=34$. Coincide.\n\n**Paso 3. Simplifica.** b) $S(n)=2+2^{n+1}(n-1)=(n-1)\\,2^{n+1}+2$.\n\n**Paso 4. Comprueba.** c) $n=4$: $2+8+24+64=98$ y $(4-1)\\cdot32+2=98$."
   },
   {
    "id": "peldanos#S28",
    "n": "S28",
    "title": "Contar bits, un caso pequeño",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Un algoritmo recorre los bits de un número de derecha a izquierda hasta encontrar el primer $1$ (inclusive) y se detiene. Se aplica a todos los números de $1$ a $2^{3}-1=7$, escritos con $3$ bits.\n- a) Para cada número, ¿cuántos bits procesa?\n- b) ¿Cuántos números procesan exactamente $1$ bit? ¿Y $2$? ¿Y $3$?\n- c) ¿Cuántos bits se procesan en total?\n- d) Escribe el total como un sumatorio $\\sum_{k=1}^{3}k\\cdot(\\ldots)$.",
    "hint": "Un número procesa exactamente $k$ bits si termina en $k-1$ ceros seguidos de un $1$. Cuenta cuántos hay de cada tipo.",
    "solution": "**Paso 1. Uno a uno.** a) $001\\to1$, $010\\to2$, $011\\to1$, $100\\to3$, $101\\to1$, $110\\to2$, $111\\to1$.\n\n**Paso 2. Cuántos de cada tipo.** b) Exactamente $1$ bit: los que terminan en $1$, son $4$. Exactamente $2$ bits: los que terminan en $10$, son $2$. Exactamente $3$ bits: solo $100$, es $1$.\n\n**Paso 3. Total.** c) $4\\cdot1+2\\cdot2+1\\cdot3=11$ (coincide con sumar la lista del apartado a).\n\n**Paso 4. Como sumatorio.** d) $\\sum_{k=1}^{3}k\\cdot2^{3-k}$: hay $2^{3-k}$ números que procesan exactamente $k$ bits. Para $n$ bits sale $\\sum_{k=1}^{n}k\\cdot2^{n-k}$."
   },
   {
    "id": "peldanos#S29",
    "n": "S29",
    "title": "Una suma y sus dos integrales",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Sea $f(x)=x$, que es creciente, y la suma $S=\\displaystyle\\sum_{i=1}^{4}f(i)=1+2+3+4=10$.\nPara una función creciente: $\\displaystyle\\int_{m-1}^{n}f(x)\\,dx\\ \\le\\ \\sum_{i=m}^{n}f(i)\\ \\le\\ \\int_{m}^{n+1}f(x)\\,dx$.\n- a) Calcula las dos integrales con $m=1$, $n=4$.\n- b) Comprueba que $S$ queda entre ambas.\n- c) Dibuja o describe qué área representa cada integral frente a los rectángulos de la suma.",
    "hint": "Cada término $f(i)$ es el área de un rectángulo de ancho $1$ y altura $f(i)$. Si la función crece, un rectángulo apoyado a la izquierda queda por debajo de la curva, y uno apoyado a la derecha, por encima.",
    "solution": "**Paso 1. Integral inferior.** a) $\\int_{0}^{4}x\\,dx=\\dfrac{16}{2}=8$.\n\n**Paso 2. Integral superior.** a) $\\int_{1}^{5}x\\,dx=\\dfrac{25-1}{2}=12$.\n\n**Paso 3. Compara.** b) $8\\le10\\le12$. Se cumple.\n\n**Paso 4. Interpreta.** c) Los rectángulos de la cota inferior cubren de $x=i-1$ a $x=i$ con altura $f(i)$, que es el valor de la curva al final del tramo: quedan por debajo. Los de la superior cubren de $x=i$ a $x=i+1$ con altura $f(i)$: quedan por encima de la curva."
   },
   {
    "id": "peldanos#S30",
    "n": "S30",
    "title": "Acotar una suma con integrales",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.8,
    "steps": true,
    "statement": "Acota $\\displaystyle\\sum_{i=1}^{n}i^{2}$ por abajo y por arriba con integrales y deduce su orden $\\Theta$.\n- a) ¿La función $x^{2}$ es creciente o decreciente en $x\\ge0$? ¿Qué fórmula de acotación toca?\n- b) Calcula las dos integrales.\n- c) Comprueba con $n=4$ ($1+4+9+16=30$).",
    "hint": "En funciones crecientes: $\\int_{m-1}^{n}\\le\\sum_{i=m}^{n}\\le\\int_{m}^{n+1}$, con $m=1$.",
    "solution": "**Paso 1. Qué fórmula.** a) $x^{2}$ crece para $x\\ge0$, así que sirve $\\int_{0}^{n}x^{2}dx\\le\\sum_{i=1}^{n}i^{2}\\le\\int_{1}^{n+1}x^{2}dx$.\n\n**Paso 2. Integrales.** b) $\\dfrac{n^{3}}{3}\\le\\sum_{i=1}^{n}i^{2}\\le\\dfrac{(n+1)^{3}-1}{3}$.\n\n**Paso 3. Orden.** Los dos extremos son del orden de $n^{3}$, luego $\\sum i^{2}\\in\\Theta(n^{3})$.\n\n**Paso 4. Comprueba.** c) $n=4$: $\\frac{64}{3}\\approx21{,}3\\le30\\le\\frac{125-1}{3}\\approx41{,}3$."
   },
   {
    "id": "peldanos#S31",
    "n": "S31",
    "title": "Función decreciente: el primer término aparte",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.85,
    "steps": true,
    "statement": "Acota por arriba $\\displaystyle\\sum_{i=1}^{n}\\frac{1}{i^{2}}$ por una constante, usando que $f(x)=\\frac1{x^{2}}$ es decreciente.\nPara decreciente: $\\displaystyle\\sum_{i=m}^{n}f(i)\\le\\int_{m-1}^{n}f(x)\\,dx$.\n- a) ¿Qué problema da usar $m=1$ directamente?\n- b) Separa el primer término y acota el resto con $m=2$.\n- c) Concluye una cota constante para toda la suma.",
    "hint": "Con $m=1$ la integral empieza en $x=0$, donde $\\frac1{x^{2}}$ no está definida. Saca el término $i=1$ y trata la suma que empieza en $i=2$.",
    "solution": "**Paso 1. El problema.** a) La cota pide $\\int_{0}^{n}\\frac{1}{x^{2}}dx$, que no existe (la función se dispara en $0$).\n\n**Paso 2. Separa el primer término.** b) $\\sum_{i=1}^{n}\\frac1{i^{2}}=1+\\sum_{i=2}^{n}\\frac1{i^{2}}\\le1+\\int_{1}^{n}\\frac{dx}{x^{2}}=1+\\left[-\\frac1x\\right]_1^{n}=1+1-\\frac1n$.\n\n**Paso 3. Conclusión.** c) $\\sum_{i=1}^{n}\\frac1{i^{2}}\\le2-\\frac1n<2$: la suma está acotada por una constante, y como además es $\\ge1$, es $\\Theta(1)$."
   },
   {
    "id": "peldanos#S32",
    "n": "S32",
    "title": "Acotar una suma de logaritmos",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.9,
    "steps": true,
    "statement": "Acota $\\displaystyle\\sum_{i=1}^{n}\\ln i$ y deduce el orden de $\\ln(n!)$.\n- a) Cota superior sencilla: cada término es como mucho $\\ln n$.\n- b) Cota inferior con una integral (función creciente), empezando la suma en $i=2$: $\\sum_{i=2}^{n}\\ln i\\ge\\int_{1}^{n}\\ln x\\,dx$. Calcula la integral (por partes: $\\int\\ln x\\,dx=x\\ln x-x$).\n- c) Concluye el orden de $\\ln(n!)$.",
    "hint": "$\\ln(n!)=\\ln1+\\ln2+\\cdots+\\ln n=\\sum_{i=1}^{n}\\ln i$. El término $i=1$ vale $0$.",
    "solution": "**Paso 1. Cota superior.** a) $\\sum_{i=1}^{n}\\ln i\\le n\\ln n$.\n\n**Paso 2. Integral.** b) $\\int_{1}^{n}\\ln x\\,dx=[x\\ln x-x]_1^{n}=n\\ln n-n+1$.\n\n**Paso 3. Une las cotas.** $n\\ln n-n+1\\le\\ln(n!)\\le n\\ln n$.\n\n**Paso 4. Orden.** c) El término dominante de ambas es $n\\ln n$, luego $\\ln(n!)\\in\\Theta(n\\ln n)$."
   },
   {
    "id": "peldanos#S33",
    "n": "S33",
    "title": "Del examen: cerrar una suma de polinomios",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.95,
    "steps": true,
    "statement": "Halla una fórmula sin sumatorio para $\\displaystyle\\sum_{i=1}^{n}(3i^{2}-2i+5)$ y comprueba con $n=2$.",
    "hint": "Separa en tres sumatorios (linealidad), saca los coeficientes y usa $\\sum i^{2}$, $\\sum i$ y $\\sum 1$.",
    "solution": "**Paso 1. Separa.** $3\\sum i^{2}-2\\sum i+5\\sum 1$.\n\n**Paso 2. Sustituye.** $3\\cdot\\dfrac{n(n+1)(2n+1)}{6}-2\\cdot\\dfrac{n(n+1)}{2}+5n=\\dfrac{n(n+1)(2n+1)}{2}-n(n+1)+5n$.\n\n**Paso 3. Agrupa.** $\\dfrac{n(n+1)(2n+1)}{2}-n(n+1)=\\dfrac{n(n+1)(2n-1)}{2}$, luego el total es $\\dfrac{n(n+1)(2n-1)}{2}+5n$.\n\n**Paso 4. Comprueba.** $n=2$: $(3-2+5)+(12-4+5)=6+13=19$ y $\\dfrac{2\\cdot3\\cdot3}{2}+10=19$."
   },
   {
    "id": "peldanos#S34",
    "n": "S34",
    "title": "Del examen: sumas dobles",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 1.0,
    "steps": true,
    "statement": "Calcula en forma cerrada:\n- a) $\\displaystyle\\sum_{i=1}^{n}\\sum_{j=i}^{n}1$\n- b) $\\displaystyle\\sum_{i=1}^{n}\\sum_{j=1}^{i}j$ (y comprueba con $n=3$)",
    "hint": "Resuelve primero la suma de dentro, que depende de $i$, y después la de fuera.",
    "solution": "**Paso 1. a), suma interior.** $\\sum_{j=i}^{n}1=n-i+1$ (cuenta los valores de $j$).\n\n**Paso 2. a), suma exterior.** $\\sum_{i=1}^{n}(n-i+1)=n+(n-1)+\\cdots+1=\\dfrac{n(n+1)}{2}$.\n\n**Paso 3. b), suma interior.** $\\sum_{j=1}^{i}j=\\dfrac{i(i+1)}{2}$.\n\n**Paso 4. b), suma exterior.** $\\dfrac12\\left(\\sum i^{2}+\\sum i\\right)=\\dfrac12\\left(\\dfrac{n(n+1)(2n+1)}{6}+\\dfrac{n(n+1)}{2}\\right)=\\dfrac{n(n+1)(n+2)}{6}$.\n\n**Paso 5. Comprueba.** $n=3$: $1+3+6=10$ y $\\frac{3\\cdot4\\cdot5}{6}=10$."
   },
   {
    "id": "peldanos#S35",
    "n": "S35",
    "title": "Del examen: geométrica más polinomio",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 1.05,
    "steps": true,
    "statement": "Calcula $\\displaystyle\\sum_{i=0}^{n}\\left(2^{i}+i\\right)$ en forma cerrada y di su orden $\\Theta$. Comprueba con $n=2$.",
    "hint": "Separa en dos sumatorios: uno geométrico y otro de naturales (cuidado con que el índice empieza en $0$; el término $i=0$ de la segunda suma es $0$).",
    "solution": "**Paso 1. Separa.** $\\sum_{i=0}^{n}2^{i}+\\sum_{i=0}^{n}i$.\n\n**Paso 2. Cada una.** $\\sum_{i=0}^{n}2^{i}=2^{n+1}-1$ y $\\sum_{i=0}^{n}i=\\dfrac{n(n+1)}{2}$.\n\n**Paso 3. Suma.** Total $=2^{n+1}-1+\\dfrac{n(n+1)}{2}$.\n\n**Paso 4. Orden.** El exponencial domina al polinomio: $\\Theta(2^{n})$.\n\n**Paso 5. Comprueba.** $n=2$: $(1+0)+(2+1)+(4+2)=10$ y $2^{3}-1+3=10$."
   },
   {
    "id": "peldanos#S39",
    "n": "S39",
    "title": "Un sumatorio con varias partes, como en el examen",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.95,
    "steps": true,
    "statement": "Simplifica (sin sumatorios) $\\displaystyle\\sum_{i=1}^{j}\\left(2-j+3i+ni+2^{i}\\right)$ y comprueba con $j=2$, $n=1$.",
    "hint": "Los términos $2$ y $-j$ no dependen de $i$ (solo hay que multiplicar por el número de términos, $j$); $3i+ni=(3+n)\\,i$ es de la forma \"constante por $i$\"; y $2^{i}$ es una serie geométrica que empieza en $i=1$. El resultado puede depender de $j$ y de $n$.",
    "solution": "**Paso 1. Separa en cuatro sumatorios.** $\\sum_{i=1}^{j}2+\\sum_{i=1}^{j}(-j)+(3+n)\\sum_{i=1}^{j}i+\\sum_{i=1}^{j}2^{i}$.\n\n**Paso 2. Resuelve cada uno.** $2j$; $-j\\cdot j=-j^{2}$; $(3+n)\\dfrac{j(j+1)}{2}$; y la geométrica $\\dfrac{2^{j+1}-2^{1}}{2-1}=2^{j+1}-2$.\n\n**Paso 3. Suma.** $2j-j^{2}+\\dfrac{(3+n)\\,j(j+1)}{2}+2^{j+1}-2$.\n\n**Paso 4. Comprueba.** Con $j=2$, $n=1$: los términos son $6$ ($i=1$) y $12$ ($i=2$), suma $18$. La fórmula da $4-4+\\frac{4\\cdot2\\cdot3}{2}+8-2=18$."
   },
   {
    "id": "peldanos#S40",
    "n": "S40",
    "title": "Cotas de $\\sum i\\,e^{i}$ con una primitiva dada",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 1.0,
    "steps": true,
    "statement": "Acota $\\displaystyle\\sum_{i=1}^{n}i\\,e^{i}$ por arriba y por abajo con integrales, sabiendo que $\\displaystyle\\int x\\,e^{x}\\,dx=(x-1)\\,e^{x}$.\n- a) ¿Es $f(x)=x\\,e^{x}$ creciente para $x\\ge0$? ¿Qué desigualdades hay que usar?\n- b) Calcula las dos integrales.\n- c) Comprueba con $n=3$.",
    "hint": "Para $f$ creciente: $\\int_{m-1}^{n}f\\le\\sum_{i=m}^{n}f(i)\\le\\int_{m}^{n+1}f$, aquí con $m=1$.",
    "solution": "**Paso 1. Crecimiento.** a) $f'(x)=e^{x}(1+x)>0$ para $x\\ge0$: es creciente. Sirven $\\int_{0}^{n}f\\le\\sum\\le\\int_{1}^{n+1}f$.\n\n**Paso 2. Integrales.** b) $\\int_{1}^{n+1}f=\\bigl[(x-1)e^{x}\\bigr]_{1}^{n+1}=n\\,e^{n+1}-0$. $\\int_{0}^{n}f=(n-1)e^{n}-(-1)=(n-1)e^{n}+1$. Es decir, $(n-1)e^{n}+1\\le\\sum_{i=1}^{n}i\\,e^{i}\\le n\\,e^{n+1}$.\n\n**Paso 3. Comprueba.** c) $n=3$: la suma vale $e+2e^{2}+3e^{3}\\approx77{,}7$. Cota inferior: $2e^{3}+1\\approx41{,}2$. Cota superior: $3e^{4}\\approx163{,}8$. Ambas son del orden de $n\\,e^{n}$ salvo constantes."
   },
   {
    "id": "peldanos#S41",
    "n": "S41",
    "title": "Un sumatorio con $(n-i)$ y una potencia",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 1.05,
    "steps": true,
    "statement": "Simplifica $\\displaystyle\\sum_{i=0}^{n-1}(n-i)\\,3^{i}$ y comprueba con $n=2$ y $n=3$.",
    "hint": "Separa $n\\sum 3^{i}-\\sum i\\,3^{i}$. La primera es una geométrica; la segunda es la suma $\\sum i\\,r^{i}$ con $r=3$ (el término $i=0$ vale $0$, así que es $\\sum_{i=1}^{n-1}$).",
    "solution": "**Paso 1. Separa.** $n\\displaystyle\\sum_{i=0}^{n-1}3^{i}-\\sum_{i=1}^{n-1}i\\,3^{i}$.\n\n**Paso 2. Cada parte.** La geométrica: $\\dfrac{3^{n}-1}{2}$. La otra, con la fórmula $\\sum_{i=1}^{N}i\\,r^{i}=\\dfrac{r+r^{N+1}(Nr-N-1)}{(r-1)^{2}}$, $N=n-1$ y $r=3$: $\\dfrac{3+3^{n}(2n-3)}{4}$.\n\n**Paso 3. Resta.** $\\dfrac{n(3^{n}-1)}{2}-\\dfrac{3+3^{n}(2n-3)}{4}=\\dfrac{2n\\,3^{n}-2n-3-(2n-3)3^{n}}{4}=\\dfrac{3^{n+1}-2n-3}{4}$.\n\n**Paso 4. Comprueba.** $n=2$: $2\\cdot1+1\\cdot3=5$ y $\\frac{27-4-3}{4}=5$. $n=3$: $3+6+9=18$ y $\\frac{81-6-3}{4}=18$."
   },
   {
    "id": "peldanos#S42",
    "n": "S42",
    "title": "Cota inferior y superior de una serie geométrica",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "sumatorios"
    ],
    "stage": "sumatorios",
    "src": "adic",
    "diff": 0.95,
    "steps": true,
    "statement": "Halla una cota inferior y una superior de $\\displaystyle\\sum_{j=0}^{n-1}3^{j}$ de dos formas:\n- a) Con integrales (la función es creciente).\n- b) Con la fórmula exacta de la serie geométrica.\n- c) Comprueba con $n=3$ y da el orden.",
    "hint": "Con $m=0$: $\\int_{-1}^{n-1}3^{x}dx\\le\\sum_{j=0}^{n-1}3^{j}\\le\\int_{0}^{n}3^{x}dx$, y $\\int a^{x}dx=\\frac{a^{x}}{\\ln a}$.",
    "solution": "**Paso 1. Con integrales.** a) $\\dfrac{3^{n-1}-3^{-1}}{\\ln3}\\le\\sum_{j=0}^{n-1}3^{j}\\le\\dfrac{3^{n}-1}{\\ln3}$.\n\n**Paso 2. Exacta.** b) Es una geométrica: $\\dfrac{3^{n}-1}{3-1}=\\dfrac{3^{n}-1}{2}$. No hace falta acotar.\n\n**Paso 3. Comprueba.** c) $n=3$: la suma vale $1+3+9=13$. Integrales: $\\frac{9-0{,}33}{1{,}0986}\\approx7{,}9\\le13\\le\\frac{26}{1{,}0986}\\approx23{,}7$. El orden es $\\Theta(3^{n})$."
   },
   {
    "id": "peldanos#V01",
    "n": "V01",
    "title": "Los elementos de un voraz, con el cambio de monedas",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.2,
    "steps": true,
    "statement": "Un algoritmo voraz tiene: un conjunto de **candidatos**, una **función de selección** (qué candidato se mira primero), una de **factibilidad** (si cabe en la solución), una **función objetivo** (lo que se optimiza) y una **función solución** (cuándo se ha terminado).\n\nSe quiere devolver $67$ céntimos con el menor número de monedas, con monedas de $50,20,10,5,2,1$ céntimos.\n- a) Identifica los cinco elementos.\n- b) Aplica el esquema paso a paso: moneda elegida y dinero que queda.\n- c) ¿Cuántas monedas salen?",
    "hint": "La selección es la moneda de mayor valor que no se pase de lo que queda por devolver. Una moneda se puede repetir tantas veces como quepa.",
    "solution": "**Paso 1. Elementos.** a) Candidatos: los tipos de moneda. Selección: la de mayor valor posible. Factibilidad: que la suma no supere $67$. Objetivo: minimizar el número de monedas. Solución: monedas que suman exactamente $67$.\n\n**Paso 2. Ejecución.** b) Quedan $67$: toma $50\\to17$. $20$ no cabe; toma $10\\to7$. $10$ no cabe; toma $5\\to2$. Toma $2\\to0$.\n\n**Paso 3. Resultado.** c) $50+10+5+2=67$ con $4$ monedas."
   },
   {
    "id": "peldanos#V03",
    "n": "V03",
    "title": "Cambio de monedas: cuándo no es óptimo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.3,
    "steps": true,
    "statement": "- a) Con monedas de $1,2,5,10,20,50$ céntimos, devuelve $93$ céntimos con la estrategia voraz.\n- b) Con el sistema de monedas $\\{1,3,4\\}$, devuelve $6$ con la estrategia voraz. ¿Cuántas monedas salen?\n- c) ¿Hay una forma mejor con ese sistema? ¿Qué se concluye?",
    "hint": "En b) la estrategia coge siempre la moneda mayor que quepa. Compara el resultado con probar combinaciones de $2$ monedas.",
    "solution": "**Paso 1. a).** $50\\to43$; $20\\to23$; $20\\to3$; $2\\to1$; $1\\to0$. Son $5$ monedas: $50+20+20+2+1$.\n\n**Paso 2. b).** $4\\to2$; $1\\to1$; $1\\to0$. Son $3$ monedas: $4+1+1$.\n\n**Paso 3. c).** Con $3+3=6$ bastan $2$ monedas. La estrategia voraz no es óptima para cualquier sistema de monedas; sí lo es para el euro (y para $1,2,5,10,\\dots$), pero hay que demostrarlo y depende del sistema."
   },
   {
    "id": "peldanos#V05",
    "n": "V05",
    "title": "Mezclar listas ordenadas con el menor coste",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.45,
    "steps": true,
    "statement": "Hay cuatro listas ordenadas de tamaños $6,2,8,4$. Mezclar dos listas de tamaños $p$ y $q$ cuesta $p+q$ operaciones, y el resultado es una lista de tamaño $p+q$.\n- a) Mézclalas en el orden en que están dadas ($6+2$, el resultado con la de $8$, y ese con la de $4$). ¿Cuánto cuesta en total?\n- b) Aplica la estrategia voraz: mezcla siempre las dos listas más pequeñas disponibles.\n- c) ¿Qué relación tiene con los códigos de Huffman?",
    "hint": "Después de cada mezcla, la lista nueva vuelve al conjunto y se vuelven a buscar las dos más pequeñas.",
    "solution": "**Paso 1. En orden.** a) $6+2=8$ (cuesta $8$); $8+8=16$ (cuesta $16$); $16+4=20$ (cuesta $20$). Total $44$.\n\n**Paso 2. Voraz.** b) Tamaños $\\{6,2,8,4\\}$. Las dos menores: $2+4=6$ (coste $6$) $\\to\\{6,8,6\\}$. Las dos menores: $6+6=12$ (coste $12$) $\\to\\{8,12\\}$. Finalmente $8+12=20$ (coste $20$). Total $6+12+20=38<44$.\n\n**Paso 3. Huffman.** c) Es la misma construcción: se juntan siempre los dos \"pesos\" más pequeños. En Huffman el peso es la frecuencia; aquí, el tamaño de la lista."
   },
   {
    "id": "peldanos#V06",
    "n": "V06",
    "title": "Códigos de Huffman",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.45,
    "steps": true,
    "statement": "Seis caracteres con estas frecuencias (en %): $A=40$, $B=25$, $C=15$, $D=10$, $E=6$, $F=4$.\n- a) Construye el árbol de Huffman: ordena y fusiona los dos menores hasta tener uno. Anota las fusiones.\n- b) Escribe la longitud del código de cada carácter (sin el árbol, solo la profundidad de cada hoja).\n- c) Calcula el número medio de bits por carácter y compáralo con usar $3$ bits fijos.",
    "hint": "Si hay empate al elegir las dos menores, cualquiera sirve: el coste final es el mismo. Para una hoja, la longitud del código es el número de fusiones que la separan de la raíz.",
    "solution": "**Paso 1. Fusiones.** a) Ordenadas: $F4,E6,D10,C15,B25,A40$. $F+E=10$. Quedan $D10,(FE)10,C15,B25,A40$: $D+(FE)=20$. Quedan $C15,20,B25,A40$: $C+20=35$. Quedan $B25,35,A40$: $B+35=60$. Quedan $A40,60$: $A+60=100$.\n\n**Paso 2. Longitudes.** b) $A$: $1$. $B$: $2$. $C$: $3$. $D$: $4$. $E$ y $F$: $5$. Los menos frecuentes quedan más profundos.\n\n**Paso 3. Media.** c) $0{,}40\\cdot1+0{,}25\\cdot2+0{,}15\\cdot3+0{,}10\\cdot4+0{,}06\\cdot5+0{,}04\\cdot5=2{,}25$ bits por carácter, frente a $3$ con longitud fija: un $25\\%$ menos."
   },
   {
    "id": "peldanos#V08",
    "n": "V08",
    "title": "La mochila con fracciones",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Mochila con capacidad $C=30$ y objetos de pesos $p=(6,10,12,20)$ y valores $v=(36,40,36,60)$. Los objetos se pueden partir.\n- a) Calcula el valor por unidad de peso de cada objeto.\n- b) Aplica la estrategia \"mayor valor por unidad de peso\" y calcula el valor total.\n- c) Aplica la estrategia \"mayor valor primero\" y compara.\n- d) Con los objetos $p=(10,20,30)$, $v=(60,100,120)$, $C=50$ y **sin** poder partir (mochila 0-1), ¿es óptima la estrategia del apartado b?",
    "hint": "Para (b) mete objetos completos en orden de $v_i/p_i$ y, cuando el siguiente no quepa entero, mete la fracción que quede. En (d), compara el voraz con la combinación de los dos últimos objetos.",
    "solution": "**Paso 1. Ratios.** a) $v_i/p_i=6,\\ 4,\\ 3,\\ 3$.\n\n**Paso 2. Voraz por ratio.** b) Entran el objeto $1$ (peso $6$, valor $36$), el $2$ (peso $10$, valor $40$) y el $3$ (peso $12$, valor $36$): peso $28$, valor $112$. Quedan $2$ unidades y se mete $\\frac{2}{20}$ del objeto $4$: valor $6$. Total $118$.\n\n**Paso 3. Mayor valor primero.** c) Primero el objeto $4$ (peso $20$, valor $60$), luego el $2$ (peso $10$, valor $40$): peso $30$, valor $100<118$. Esa selección no es óptima.\n\n**Paso 4. Mochila 0-1.** d) Los ratios son $6,5,4$: el voraz mete los objetos $1$ y $2$ (peso $30$, valor $160$). Pero los objetos $2$ y $3$ pesan $50$ y valen $220$. En la mochila 0-1 el voraz por ratio **no** es óptimo (el problema es NP-completo)."
   },
   {
    "id": "peldanos#V09",
    "n": "V09",
    "title": "Kruskal y Prim en un grafo pequeño",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.45,
    "steps": true,
    "statement": "Grafo no dirigido con vértices $A,B,C,D,E$ y aristas:\n$$A\\!-\\!B:4,\\ A\\!-\\!C:2,\\ B\\!-\\!C:1,\\ B\\!-\\!D:5,\\ C\\!-\\!D:8,\\ C\\!-\\!E:10,\\ D\\!-\\!E:3.$$\n- a) Kruskal: ordena las aristas y elige en orden las que no formen ciclo, hasta tener $|V|-1$.\n- b) Prim desde $A$: en cada paso, la arista más barata que une el conjunto ya alcanzado con un vértice nuevo.\n- c) Compara los costes.",
    "hint": "Kruskal rechaza una arista si sus dos extremos ya están conectados entre sí. Prim solo mira aristas con un extremo dentro y otro fuera.",
    "solution": "**Paso 1. Kruskal.** a) Orden: $B\\!-\\!C(1),\\ A\\!-\\!C(2),\\ D\\!-\\!E(3),\\ A\\!-\\!B(4),\\ B\\!-\\!D(5),\\dots$ Se aceptan $B\\!-\\!C$, $A\\!-\\!C$, $D\\!-\\!E$. $A\\!-\\!B$ cerraría el ciclo $A,B,C$ y se rechaza. $B\\!-\\!D$ conecta $\\{A,B,C\\}$ con $\\{D,E\\}$: se acepta. Ya hay $4$ aristas.\n\n**Paso 2. Prim.** b) Alcanzado $\\{A\\}$: la menor es $A\\!-\\!C(2)$. Alcanzado $\\{A,C\\}$: la menor es $B\\!-\\!C(1)$. Alcanzado $\\{A,B,C\\}$: la menor es $B\\!-\\!D(5)$. Alcanzado $\\{A,B,C,D\\}$: queda $D\\!-\\!E(3)$.\n\n**Paso 3. Costes.** c) Ambos: $1+2+3+5=11$, con las mismas aristas elegidas en distinto orden."
   },
   {
    "id": "peldanos#V10",
    "n": "V10",
    "title": "Dijkstra paso a paso",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.55,
    "steps": true,
    "statement": "Grafo no dirigido con vértices $s,a,b,c,t$ y aristas:\n$$s\\!-\\!a:2,\\ s\\!-\\!b:5,\\ a\\!-\\!b:1,\\ a\\!-\\!c:6,\\ b\\!-\\!c:2,\\ b\\!-\\!t:7,\\ c\\!-\\!t:1.$$\n- a) Aplica Dijkstra desde $s$: en cada paso, el vértice con menor distancia entre los que faltan, y actualización de sus vecinos.\n- b) ¿Cuáles son las distancias mínimas desde $s$ y el camino hasta $t$?\n- c) ¿En qué se diferencia de Prim?",
    "hint": "Anota una tabla de distancias. Al fijar un vértice $v$, para cada vecino $x$: $d_x=\\min(d_x,\\,d_v+w(v,x))$.",
    "solution": "**Paso 1. Inicio.** a) $d_s=0$; $d_a=2$, $d_b=5$, $d_c=d_t=\\infty$.\n\n**Paso 2. Se fija $a$ (2).** $d_b=\\min(5,2+1)=3$; $d_c=2+6=8$.\n\n**Paso 3. Se fija $b$ (3).** $d_c=\\min(8,3+2)=5$; $d_t=3+7=10$.\n\n**Paso 4. Se fija $c$ (5).** $d_t=\\min(10,5+1)=6$. Se fija $t$ (6).\n\n**Paso 5. Resultado.** b) $d_a=2$, $d_b=3$, $d_c=5$, $d_t=6$. Camino a $t$: $s,a,b,c,t$ ($2+1+2+1$).\n\n**Paso 6. Prim.** c) Prim elige la arista más barata hacia fuera, sin mirar el camino acumulado. Dijkstra elige por la distancia total desde $s$, y por eso recalcula las distancias tras cada paso."
   },
   {
    "id": "peldanos#V13",
    "n": "V13",
    "title": "¿Qué función de selección? Selección de actividades",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "Actividades (intervalos $[c_i,f_i)$, compatibles si no se solapan): $A=[0,10)$, $X=[0,5)$, $Y=[4,6)$, $Z=[5,10)$. Se quiere el mayor número de actividades compatibles. Se prueban tres funciones de selección (siempre que sea factible con lo ya elegido):\n- a) la que **empieza antes** (si empatan, la primera de la lista $A,X,Y,Z$);\n- b) la de **menor duración**;\n- c) la que **termina antes**.\n\nAplica cada una y compara con el óptimo.",
    "hint": "Después de elegir una actividad, descarta las que se solapan con ella. Dos actividades $[c_1,f_1)$ y $[c_2,f_2)$ son compatibles si $c_2\\ge f_1$ o $c_1\\ge f_2$.",
    "solution": "**Paso 1. Empieza antes.** a) Elige $A$ ($[0,10)$): solapa con todas. Total $1$.\n\n**Paso 2. Menor duración.** b) Duraciones: $A=10$, $X=5$, $Y=2$, $Z=5$. Elige $Y$ ($[4,6)$), que solapa con $X$ y con $Z$. Total $1$.\n\n**Paso 3. Termina antes.** c) Terminan en $10,5,6,10$: elige $X$ ($f=5$). Compatibles con $X$: $Z$ ($5\\ge5$). $Y$ y $A$ solapan. Elige $Z$. Total $2$: $\\{X,Z\\}$.\n\n**Paso 4. Conclusión.** El máximo es $2$ y solo \"termina antes\" lo consigue. Las otras dos tienen contraejemplos. (Para demostrar que \"termina antes\" es óptima, se razona que dejar libre el mayor tiempo posible nunca empeora.)"
   },
   {
    "id": "peldanos#V14",
    "n": "V14",
    "title": "El cambio de monedas, en código",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.5,
    "steps": true,
    "statement": "Completa la función que devuelve las monedas (de mayor a menor valor) para pagar una cantidad `x` en céntimos, con `monedas = [200, 100, 50, 20, 10, 5, 2, 1]` ordenadas de mayor a menor:\n```python\ndef cambio(x, monedas):\n    resultado = []\n    for m in monedas:\n        n = ________            # cuántas monedas de valor m caben en x\n        resultado += [m] * n\n        x = ________            # lo que queda por devolver\n    return resultado\n```\n- a) Rellena los dos huecos.\n- b) Ejecútala a mano para `x = 534` (5,34 €). ¿Cuántas monedas salen?\n- c) ¿Qué cambia si `monedas` no está ordenada de mayor a menor?",
    "hint": "`x // m` es el número entero de veces que cabe `m`, y `x % m` lo que sobra.",
    "solution": "**Paso 1. Huecos.** a) `n = x // m` y `x = x % m` (o `x - n * m`).\n\n**Paso 2. Ejecución.** b) $534$: con $200$ caben $2$ (quedan $134$); con $100$, $1$ (quedan $34$); con $50$, $0$; con $20$, $1$ (quedan $14$); con $10$, $1$ (quedan $4$); con $5$, $0$; con $2$, $2$ (quedan $0$); con $1$, $0$. Resultado: $[200,200,100,20,10,2,2]$, $7$ monedas.\n\n**Paso 3. El orden.** c) La función de selección es \"la mayor moneda que quepa\". Si no están ordenadas, se puede coger una moneda pequeña antes de las grandes y salen más monedas de las necesarias."
   },
   {
    "id": "peldanos#V15",
    "n": "V15",
    "title": "Mezclar con el menor coste, en código",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.6,
    "steps": true,
    "statement": "La estrategia de V05 (mezclar siempre las dos listas más pequeñas) se programa con un montículo de mínimos (`heapq`): se sacan las dos menores, se suma su coste y se vuelve a insertar la lista resultante. Completa:\n```python\nimport heapq\n\ndef coste_minimo(tamanos):\n    heapq.heapify(tamanos)\n    total = 0\n    while len(tamanos) > 1:\n        a = heapq.heappop(tamanos)\n        b = ________\n        total += ________\n        heapq.heappush(tamanos, ________)\n    return total\n```\n- a) Rellena los huecos.\n- b) Ejecútala con `[3, 9, 4, 5, 2]` anotando cada mezcla.\n- c) ¿Qué coste tiene con $n$ listas?",
    "hint": "Cada mezcla de listas de tamaños $a$ y $b$ cuesta $a+b$ y produce una lista de tamaño $a+b$. Un montículo da el mínimo en $O(1)$ y lo extrae en $O(\\log n)$.",
    "solution": "**Paso 1. Huecos.** a) `b = heapq.heappop(tamanos)`; `total += a + b`; `heapq.heappush(tamanos, a + b)`.\n\n**Paso 2. Ejecución.** b) $\\{2,3,4,5,9\\}$: $2+3=5$ (coste $5$) $\\to\\{4,5,5,9\\}$; $4+5=9$ (coste $9$) $\\to\\{5,9,9\\}$; $5+9=14$ (coste $14$) $\\to\\{9,14\\}$; $9+14=23$ (coste $23$). Total $5+9+14+23=51$.\n\n**Paso 3. Coste.** c) $n-1$ mezclas, cada una con dos extracciones y una inserción: $O(n\\log n)$. Es el mismo esquema que Huffman, donde en vez de sumar tamaños se unen árboles."
   },
   {
    "id": "peldanos#V16",
    "n": "V16",
    "title": "Kruskal: la pieza del ciclo",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.65,
    "steps": true,
    "statement": "Para saber si una arista cierra un ciclo, Kruskal mantiene cada vértice en un grupo con un representante (`p[x]`). Completa:\n```python\ndef find(p, x):\n    while p[x] != x:\n        x = ________\n    return x\n\ndef kruskal(n, aristas):                 # aristas = [(peso, u, v), ...]\n    p = list(range(n))\n    arm = []\n    for peso, u, v in sorted(aristas):\n        ru, rv = find(p, u), find(p, v)\n        if ________:                      # no cierra ciclo\n            p[ru] = ________              # une los dos grupos\n            arm.append((u, v, peso))\n    return arm\n```\n- a) Rellena los huecos.\n- b) Ejecútala con los vértices $A,B,C,D,E=0..4$ y las aristas de V09: $(4,A,B),(2,A,C),(1,B,C),(5,B,D),(8,C,D),(10,C,E),(3,D,E)$. Anota `p` tras cada arista aceptada.",
    "hint": "Dos vértices están en el mismo grupo si `find` devuelve el mismo representante. Aceptar una arista es unir los dos grupos.",
    "solution": "**Paso 1. Huecos.** a) `x = p[x]`; `if ru != rv:`; `p[ru] = rv`.\n\n**Paso 2. Ejecución.** b) Orden: $(1,B,C)$: acepta, `p = [0,2,2,3,4]`. $(2,A,C)$: `find(A)=0`, `find(C)=2`, acepta: `p = [2,2,2,3,4]`. $(3,D,E)$: acepta: `p = [2,2,2,4,4]`. $(4,A,B)$: `find(A)=2` y `find(B)=2`, mismo grupo: **se rechaza**. $(5,B,D)$: `find(B)=2`, `find(D)=4`, acepta: `p = [2,2,4,4,4]`.\n\n**Paso 3. Resultado.** El árbol tiene las aristas $B\\!-\\!C$, $A\\!-\\!C$, $D\\!-\\!E$, $B\\!-\\!D$, de coste $11$. El resto de aristas se rechazan porque ya están todos en el mismo grupo."
   },
   {
    "id": "peldanos#V17",
    "n": "V17",
    "title": "Dijkstra en código",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Completa Dijkstra con una lista de distancias (sin montículo) para el grafo de V10 con $s,a,b,c,t=0..4$. Las aristas son `ady[u] = [(v, peso), ...]`:\n```python\ndef dijkstra(ady, s):\n    n = len(ady)\n    d = [float('inf')] * n\n    d[s] = 0\n    fijo = [False] * n\n    for _ in range(n):\n        # el vértice sin fijar con menor distancia\n        u = min((x for x in range(n) if not fijo[x]), key=lambda x: d[x])\n        fijo[u] = True\n        for v, w in ady[u]:\n            if ________:                     # mejora el camino a v pasando por u\n                d[v] = ________\n    return d\n```\n- a) Rellena los huecos.\n- b) Ejecútala y anota `d` tras fijar cada vértice.\n- c) ¿Qué coste tiene con $n$ vértices?",
    "hint": "Se mejora $v$ si $d[u]+w<d[v]$, y entonces $d[v]=d[u]+w$. El vértice que se fija en cada paso es el de menor distancia entre los no fijos.",
    "solution": "**Paso 1. Huecos.** a) `if d[u] + w < d[v]:` y `d[v] = d[u] + w`.\n\n**Paso 2. Ejecución.** b) Con $(s,a,b,c,t)$: al empezar `d = [0,∞,∞,∞,∞]`. Se fija $s$: `d = [0,2,5,∞,∞]`. Se fija $a$ (2): `d = [0,2,3,8,∞]`. Se fija $b$ (3): `d = [0,2,3,5,10]`. Se fija $c$ (5): `d = [0,2,3,5,6]`. Se fija $t$ (6): sin cambios. Resultado: `[0,2,3,5,6]`.\n\n**Paso 3. Coste.** c) $n$ vueltas, cada una con una búsqueda del mínimo en $O(n)$ y la revisión de sus aristas: $\\Theta(n^{2})$. Con un montículo baja a $O((n+m)\\log n)$."
   },
   {
    "id": "peldanos#V18",
    "n": "V18",
    "title": "Emparejar para minimizar la mayor suma",
    "points": null,
    "durationMin": null,
    "kind": "ejs",
    "skills": [
     "voraz"
    ],
    "stage": "voraz",
    "src": "adic",
    "diff": 0.7,
    "steps": true,
    "statement": "Un vector $v$ de $n$ enteros ($n$ par) se agrupa en $n/2$ parejas. Se calcula la suma de cada pareja y se toma la mayor. Se quiere que esa mayor suma sea la menor posible. Para $v=[3,9,1,5,4,8]$:\n- a) Prueba la estrategia \"emparejar vecinos en el vector ordenado\". ¿Qué sale?\n- b) Prueba \"emparejar el menor con el mayor, el segundo menor con el segundo mayor...\". ¿Qué sale?\n- c) ¿Cuál es el óptimo y por qué es razonable la segunda estrategia?",
    "hint": "Ordena $v$: $[1,3,4,5,8,9]$. Para (c), piensa dónde acaba el elemento mayor: si se junta con otro grande, la suma crece mucho.",
    "solution": "**Paso 1. Vecinos.** a) Parejas $(1,3),(4,5),(8,9)$ con sumas $4,9,17$: la mayor es $17$.\n\n**Paso 2. Extremos.** b) Parejas $(1,9),(3,8),(4,5)$ con sumas $10,11,9$: la mayor es $11$.\n\n**Paso 3. Óptimo.** c) Probando todas las formas de emparejar, el mínimo es $11$: la estrategia de los extremos es óptima. Razón: el mayor tiene que ir con alguien; lo mejor para no inflar la suma es unirlo con el menor, y el argumento se repite con el resto. Coste: ordenar, $\\Theta(n\\log n)$."
   }
  ],
  "kind": "adic"
 },
 "order": {
  "asintotica": {
   "t22-por-que": [
    "peldanos/peldanos#A01",
    "peldanos/peldanos#A02"
   ],
   "t22-ordenes": [
    "peldanos/peldanos#A03",
    "peldanos/peldanos#A04",
    "peldanos/peldanos#A26",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.1"
   ],
   "t22-cota-sup": [
    "peldanos/peldanos#A05",
    "peldanos/peldanos#A06"
   ],
   "t22-verificar-o": [
    "peldanos/peldanos#A07",
    "peldanos/peldanos#A08",
    "peldanos/peldanos#A09",
    "peldanos/peldanos#A10",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.1",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.5",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.3"
   ],
   "t22-omega": [
    "peldanos/peldanos#A11",
    "peldanos/peldanos#A12"
   ],
   "t22-theta": [
    "peldanos/peldanos#A13",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.4",
    "peldanos/peldanos#A22",
    "peldanos/peldanos#A14",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.2",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.3"
   ],
   "t22-aspectos": [
    "peldanos/peldanos#A15",
    "peldanos/peldanos#A23",
    "peldanos/peldanos#A24"
   ],
   "t22-lineal": [
    "peldanos/peldanos#A17"
   ],
   "t22-cota-orden": [
    "peldanos/peldanos#A19",
    "peldanos/peldanos#A25",
    "peldanos/peldanos#A20",
    "peldanos/peldanos#A21",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.2",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.14"
   ]
  },
  "backtracking": {
   "t6-binario": [
    "peldanos/peldanos#K01",
    "peldanos/peldanos#K02",
    "peldanos/peldanos#K17"
   ],
   "t6-subconjuntos": [
    "peldanos/peldanos#K03",
    "peldanos/peldanos#K15",
    "peldanos/peldanos#K18",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.1"
   ],
   "t6-permutaciones": [
    "peldanos/peldanos#K04",
    "peldanos/peldanos#K05",
    "peldanos/peldanos#K19",
    "peldanos/peldanos#K24",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.3",
    "peldanos/peldanos#K16",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.6"
   ],
   "t6-reinas": [
    "peldanos/peldanos#K06",
    "peldanos/peldanos#K07",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.4"
   ],
   "t6-suma-caballo": [
    "peldanos/peldanos#K08",
    "peldanos/peldanos#K09",
    "peldanos/peldanos#K20",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.5"
   ],
   "t6-otros": [
    "peldanos/peldanos#K10",
    "peldanos/peldanos#K11",
    "peldanos/peldanos#K25",
    "peldanos/peldanos#K13",
    "peldanos/peldanos#K27",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.2",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.7"
   ],
   "t6-poda": [
    "peldanos/peldanos#K12",
    "peldanos/peldanos#K26",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#7.8"
   ]
  },
  "bucles": {
   "t31-insert": [
    "peldanos/peldanos#B01",
    "peldanos/peldanos#B02",
    "peldanos/peldanos#B03",
    "peldanos/peldanos#B04",
    "peldanos/peldanos#B05"
   ],
   "t31-general": [
    "peldanos/peldanos#B06",
    "peldanos/peldanos#B13",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.9",
    "peldanos/peldanos#B07",
    "peldanos/peldanos#B08",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.6",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.7",
    "peldanos/peldanos#B09",
    "peldanos/peldanos#B14",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.8",
    "peldanos/peldanos#B12",
    "peldanos/peldanos#B11"
   ]
  },
  "dyv": {
   "t5-intro": [
    "peldanos/peldanos#D01"
   ],
   "t5-newton": [
    "peldanos/peldanos#D03"
   ],
   "t5-dyv": [
    "peldanos/peldanos#D04",
    "peldanos/peldanos#D05",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.1",
    "peldanos/peldanos#D15",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.2",
    "peldanos/peldanos#D17",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.3"
   ],
   "t5-ordenacion": [
    "peldanos/peldanos#D06",
    "peldanos/peldanos#D07",
    "peldanos/peldanos#D08"
   ],
   "t5-multiplicacion": [
    "peldanos/peldanos#D11",
    "peldanos/peldanos#D12",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.5",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.7",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.8",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.4",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#6.6",
    "peldanos/peldanos#D16"
   ],
   "t5-otros": [
    "peldanos/peldanos#D14"
   ]
  },
  "expansion": {
   "t32-expansion": [
    "peldanos/peldanos#E01",
    "peldanos/peldanos#E02",
    "peldanos/peldanos#E03",
    "peldanos/peldanos#E04",
    "peldanos/peldanos#E05",
    "peldanos/peldanos#E06",
    "peldanos/peldanos#E07",
    "peldanos/peldanos#E08",
    "peldanos/peldanos#E09",
    "peldanos/peldanos#E10",
    "peldanos/peldanos#E11",
    "peldanos/peldanos#E12",
    "peldanos/peldanos#E15",
    "peldanos/peldanos#E14",
    "peldanos/peldanos#E13",
    "peldanos/peldanos#E16",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.12",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.13",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.10",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.13",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.10"
   ]
  },
  "general": {
   "t32-maestro": [
    "peldanos/peldanos#G01",
    "peldanos/peldanos#G02",
    "peldanos/peldanos#G03"
   ],
   "t32-homogeneas": [
    "peldanos/peldanos#G04",
    "peldanos/peldanos#G05",
    "peldanos/peldanos#G06",
    "peldanos/peldanos#G07"
   ],
   "t32-no-homogeneas": [
    "peldanos/peldanos#G08",
    "peldanos/peldanos#G09",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.14",
    "peldanos/peldanos#G10",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.15",
    "peldanos/peldanos#G11",
    "peldanos/peldanos#G19",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.8",
    "peldanos/peldanos#G12",
    "peldanos/peldanos#G20",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.11",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.12"
   ],
   "t32-cambio": [
    "peldanos/peldanos#G13",
    "peldanos/peldanos#G14",
    "peldanos/peldanos#G15",
    "peldanos/peldanos#G17",
    "peldanos/peldanos#G18",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.17",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#2.11",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.16",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.15",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.18"
   ]
  },
  "recursion": {
   "t4-intro": [
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.6",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.1",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.2",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.1",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.9",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.4"
   ],
   "t4-paradigma": [
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.5",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.3",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.10"
   ],
   "t4-listas": [
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.7",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#3.8",
    "peldanos/peldanos#R02",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.13",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.4",
    "peldanos/peldanos#R01",
    "peldanos/peldanos#R05"
   ],
   "t4-secuencias": [
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.12",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.4",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.1",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.3",
    "peldanos/peldanos#R04",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.2",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.6",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.8"
   ],
   "t4-manhattan": [
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.16",
    "peldanos/peldanos#R03",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.9",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.7"
   ],
   "t4-binaria": [
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.15",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.6",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#4.17",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.5",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.7",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.8",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#9.5",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#5.3"
   ]
  },
  "sumatorios": {
   "t21-potencias-logs": [
    "peldanos/peldanos#S01",
    "peldanos/peldanos#S02",
    "peldanos/peldanos#S03",
    "peldanos/peldanos#S04"
   ],
   "t21-calculo": [
    "peldanos/peldanos#S05",
    "peldanos/peldanos#S06",
    "peldanos/peldanos#S07"
   ],
   "t21-sumas-basicas": [
    "peldanos/peldanos#S08",
    "peldanos/peldanos#S09",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.4",
    "peldanos/peldanos#S10",
    "peldanos/peldanos#S11",
    "peldanos/peldanos#S12",
    "peldanos/peldanos#S13",
    "peldanos/peldanos#S14",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.5",
    "peldanos/peldanos#S15",
    "peldanos/peldanos#S16",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.7"
   ],
   "t21-cuadrados-cubos": [
    "peldanos/peldanos#S17",
    "peldanos/peldanos#S18",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.6"
   ],
   "t21-geometricas": [
    "peldanos/peldanos#S23",
    "peldanos/peldanos#S24",
    "peldanos/peldanos#S25",
    "peldanos/peldanos#S26",
    "peldanos/peldanos#S27",
    "peldanos/peldanos#S28",
    "peldanos/peldanos#S41",
    "ejercicios_adicionales_1-2/ejercicios_adicionales_1-2#1.9"
   ],
   "t21-integrales": [
    "peldanos/peldanos#S29",
    "peldanos/peldanos#S30",
    "peldanos/peldanos#S31",
    "peldanos/peldanos#S32",
    "peldanos/peldanos#S33",
    "peldanos/peldanos#S42",
    "peldanos/peldanos#S39",
    "peldanos/peldanos#S34",
    "peldanos/peldanos#S40",
    "peldanos/peldanos#S35"
   ]
  },
  "voraz": {
   "t7-esquema": [
    "peldanos/peldanos#V01"
   ],
   "t7-monedas": [
    "peldanos/peldanos#V03",
    "peldanos/peldanos#V14",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.3"
   ],
   "t7-tiempo-mezcla": [
    "peldanos/peldanos#V05",
    "peldanos/peldanos#V15",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.4",
    "peldanos/peldanos#V13",
    "peldanos/peldanos#V18",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.1"
   ],
   "t7-huffman": [
    "peldanos/peldanos#V06",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.5"
   ],
   "t7-mochila-3": [
    "peldanos/peldanos#V08",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.2"
   ],
   "t7-arm": [
    "peldanos/peldanos#V09",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.6",
    "peldanos/peldanos#V16",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.7",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.8"
   ],
   "t7-dijkstra": [
    "peldanos/peldanos#V10",
    "peldanos/peldanos#V17",
    "ejercicios_adicionales_3-9/ejercicios_adicionales_3-9#8.9"
   ]
  }
 }
};
window.LEGACY_THEORY = {"intro": ["t1-problemas", "t1-clases-1", "t1-optimizacion", "t1-ia"], "sumatorios": ["t21-sumas-basicas", "t21-geometricas", "t21-integrales"], "asintotica": ["t22-cota-sup", "t22-omega", "t22-theta", "t22-theta"], "bucles": ["t31-general", "t31-general"], "expansion": ["t32-expansion", "t32-expansion", "t32-maestro"], "general": ["t32-maestro", "t32-homogeneas", "t32-no-homogeneas", "t32-cambio"], "recursion": ["t4-intro", "t4-metodologia", "t4-listas", "t4-digitos", "t4-binaria", "t4-hanoi"], "dyv": ["t5-dyv", "t5-ordenacion", "t5-quick", "t5-multiplicacion"], "backtracking": ["t6-binario", "t6-permutaciones", "t6-reinas", "t6-suma-caballo", "t6-poda"], "voraz": ["t7-esquema", "t7-monedas", "t7-huffman", "t7-mochila-3", "t7-arm", "t7-dijkstra"]};
