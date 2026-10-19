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
    "lecture": "t1_intro_algoritmia",
    "section": "Problema computacional",
    "to": "Demostración mcd2",
    "label": "Tema 1 · Problemas computacionales y algoritmos",
    "idx": 1,
    "upto": 9
   },
   {
    "lecture": "t1_intro_algoritmia",
    "section": "Eficiencia en tiempo y espacio",
    "to": "Problema de la parada",
    "label": "Tema 1 · Clases de complejidad computacional",
    "idx": 10,
    "upto": 26
   },
   {
    "lecture": "t1_intro_algoritmia",
    "section": "Problemas matemáticos de optimización",
    "to": "Pseudocódigo",
    "label": "Tema 1 · Problemas de optimización",
    "idx": 27,
    "upto": 39
   },
   {
    "lecture": "t1_intro_algoritmia",
    "section": "Predicción - Regresión",
    "to": "@end",
    "label": "Tema 1 · Problemas de IA y aprendizaje automático",
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
    "lecture": "t2.1_prelim_matematicos",
    "section": "Suma de los primeros n naturales",
    "idx": 15
   },
   {
    "lecture": "t2.1_prelim_matematicos",
    "section": "Sumas parciales de series geométricas",
    "idx": 26
   },
   {
    "lecture": "t2.1_prelim_matematicos",
    "section": "Aproximación por integrales",
    "idx": 31
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
    "lecture": "t2.2_notaciones_asintoticas",
    "section": "Definición formal de cota superior",
    "idx": 13
   },
   {
    "lecture": "t2.2_notaciones_asintoticas",
    "section": "Definición formal de cota inferior",
    "idx": 21
   },
   {
    "lecture": "t2.2_notaciones_asintoticas",
    "section": "Definición formal de cota ajustada",
    "idx": 24
   },
   {
    "lecture": "t2.2_notaciones_asintoticas",
    "section": "Simplificación",
    "idx": 30
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
    "lecture": "t3.1_analisis_alg_iterativos",
    "section": "Procedimiento general basado en sumatorios",
    "idx": 7
   },
   {
    "lecture": "t3.1_analisis_alg_iterativos",
    "section": "Operaciones de un bucle de n iteraciones",
    "idx": 9
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
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Función potencia - versión 1",
    "idx": 4
   },
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Resolución por expansión de recurrencias",
    "idx": 5
   },
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Errores frecuentes - Expansión de recurrencias",
    "idx": 14
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
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Teorema maestro - versión completa",
    "idx": 13
   },
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Recurrencias homogéneas",
    "idx": 16
   },
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Recurrencias no homogéneas - caso general",
    "idx": 22
   },
   {
    "lecture": "t3.2_analisis_alg_recursivos",
    "section": "Método de cambio de variable",
    "idx": 23
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
    "lecture": "t4_intro_recursividad",
    "section": "Conceptos clave en la recursividad",
    "idx": 5
   },
   {
    "lecture": "t4_intro_recursividad",
    "section": "Metodología para diseñar algoritmos recursivos",
    "idx": 12
   },
   {
    "lecture": "t4_intro_recursividad",
    "section": "Arrays y listas: suma de los elementos de una lista",
    "idx": 19
   },
   {
    "lecture": "t4_intro_recursividad",
    "section": "Suma de los dígitos de un número",
    "idx": 23
   },
   {
    "lecture": "t4_intro_recursividad",
    "section": "Búsqueda en lista ordenada",
    "idx": 36
   },
   {
    "lecture": "t4_intro_recursividad",
    "section": "Torres de Hanoi",
    "idx": 40
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
    "lecture": "t5_divide_y_venceras",
    "section": "Máximo de una lista a de n números",
    "idx": 14
   },
   {
    "lecture": "t5_divide_y_venceras",
    "section": "Merge-sort",
    "idx": 18
   },
   {
    "lecture": "t5_divide_y_venceras",
    "section": "Quicksort",
    "idx": 22
   },
   {
    "lecture": "t5_divide_y_venceras",
    "section": "Multiplicación rápida de números en binario",
    "idx": 27
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
    "lecture": "t6_vuelta_atras_backtracking",
    "section": "Subconjuntos de {a,b,c}: solución con árbol binario",
    "idx": 4
   },
   {
    "lecture": "t6_vuelta_atras_backtracking",
    "section": "Permutaciones: implementación",
    "idx": 13
   },
   {
    "lecture": "t6_vuelta_atras_backtracking",
    "section": "Implementación (N reinas)",
    "idx": 20
   },
   {
    "lecture": "t6_vuelta_atras_backtracking",
    "section": "Suma de subconjuntos",
    "idx": 22
   },
   {
    "lecture": "t6_vuelta_atras_backtracking",
    "section": "Ramificación y poda: mochila 0-1",
    "idx": 30
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
    "lecture": "t7_algoritmos_voraces",
    "section": "Esquema general",
    "idx": 5
   },
   {
    "lecture": "t7_algoritmos_voraces",
    "section": "Cambio de monedas",
    "idx": 11
   },
   {
    "lecture": "t7_algoritmos_voraces",
    "section": "Códigos de Huffman",
    "idx": 14
   },
   {
    "lecture": "t7_algoritmos_voraces",
    "section": "Problema de la mochila - Versión 3",
    "idx": 18
   },
   {
    "lecture": "t7_algoritmos_voraces",
    "section": "Algoritmo de Kruskal",
    "idx": 23
   },
   {
    "lecture": "t7_algoritmos_voraces",
    "section": "Algoritmo de Dijkstra",
    "idx": 26
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
