# Tema 1. Introducción a la algoritmia
Diseño y Análisis de Algoritmos (URJC), Manuel Rubio Sánchez, 13 de mayo de 2024. Licencia CC BY-SA 4.0.
Contenido: 1 Problemas y algoritmos; 2 Complejidad computacional; 3 Problemas de optimización; 4 Problemas en IA.

# 1. Problemas computacionales y algoritmos

## Problema computacional
- Objeto matemático que representa un conjunto de preguntas que queremos resolver (con ayuda de computadoras)
- Usa precondiciones y postcondiciones para describir las salidas o acciones adecuadas para unas entradas (instancias) válidas
- El enunciado especifica la relación entre las entradas y las salidas
- Una instancia del problema define las entradas necesarias para calcular la solución
- Pueden verse como colecciones (a menudo infinitas) de instancias, junto con las soluciones a cada instancia

## Ejemplo: problema de ordenación
- Entradas: secuencia de n números $\langle a_1,a_2,\dots,a_n\rangle$
- Salidas: permutación (reordenación) $\langle a'_1,a'_2,\dots,a'_n\rangle$ de la secuencia de entrada tal que $a'_1\le a'_2\le\dots\le a'_n$
- Instancia: $\langle 3,14,7,1,8,12\rangle$; solución: $\langle 1,3,7,8,12,14\rangle$

## Tipos de problemas computacionales
- Matemáticos o lógicos (funciones), de decisión (salida binaria/booleana), de ordenación, de búsqueda, combinatorios, optimización, geométricos, sobre grafos, sobre cadenas...
- Algunos problemas pueden pertenecer a varias categorías

## Algoritmo
- No hay definición formal aceptada de "algoritmo"
- Procedimiento, conjunto de instrucciones, "receta", que define una serie de pasos, bien definidos, que llevan a obtener las salidas adecuadas para un conjunto de datos de entrada
- La secuencia de pasos no tiene por qué ser determinista
- Un algoritmo es correcto si para cada instancia de entrada para con el resultado correcto; en ese caso, decimos que el algoritmo resuelve el problema computacional
- Algoritmos incorrectos también pueden ser útiles, si el error que cometen puede ser controlado

## Algoritmos según su implementación
- Iterativos/recursivos: todo algoritmo iterativo se puede expresar de forma recursiva y viceversa
- Lógicos: los algoritmos son procesos de deducción lógica controlada
- En serie, paralelos o distribuidos: los paralelos o distribuidos dividen los problemas en subproblemas tratados en diferentes procesadores o máquinas, para posteriormente combinar los resultados
- Deterministas o no deterministas
  - Deterministas: siempre toman la misma decisión en cada paso del algoritmo
  - No deterministas: utilizan algún grado de aleatoriedad para tomar decisiones. Emplean heurísticas, generalmente derivadas del conocimiento humano, para tomar mejores decisiones
- Exactos o aproximados
  - Exactos: alcanzan la solución exacta
  - Aproximados: buscan una solución que se aproxime a la verdadera. Útiles para problemas duros o intratables

## Algoritmos según el paradigma de diseño
- Divide o vencerás
- Fuerza bruta o exhaustivos
  - Backtraking o "vuelta atrás"
- Algoritmos voraces
- Programación dinámica (en la asignatura "Algoritmos avanzados")

## Algoritmos a partir de propiedades matemáticas: algoritmo de Euclides
- Máximo común divisor de dos números naturales. Dos versiones:

$$mcd1(m,n)=\begin{cases} n & m=0\\ mcd1(n,m) & m>n\\ mcd1(m,n-m) & (m\le n)\ \text{y}\ (m\ne 0)\end{cases}$$

$$mcd2(m,n)=\begin{cases} n & m=0\\ mcd2(n\%m,m) & m\ne 0\end{cases}$$

### Demostración mcd1
- Supongamos $m\le n$ (en caso contrario el propio algoritmo intercambia los parámetros)
- $m=az$, $n=bz$, con $a\le b$
  - z son los factores primos (máximo común múltiplo)
  - a y b no comparten factores primos
- Hacemos $b=a+c$
- $n=bz=(a+c)z=(a_1\cdots a_k+c_1\cdots c_l)z$
  - No se puede sacar factor común. Si se pudiera sería otro factor de z. a, c no comparten primos
- Por tanto, dado que $z=mcd1(az,bz)=mcd1(az,cz)$, y $c=b-a$, tenemos: $mcd1(m,n)=mcd1(az,bz)=mcd1(az,cz)=mcd1(m,n-m)$

### Demostración mcd2
- Supongamos $m\le n$ (en caso contrario el propio algoritmo intercambia los parámetros)
- $m=az$, $n=bz$, con $a\le b$; z son los factores primos; a y b no comparten factores primos
- Hacemos $b=ac+d$, donde c y d son el cociente y el resto de $b/a$
- a y d no pueden compartir factores, de lo contrario serían también factores de b
- Por tanto: $z=mcd2(az,bz)=mcd2(dz,az)\Rightarrow mcd2(m,n)=mcd2(n\%m,m)$

# 2. Introducción a las clases de complejidad computacional

## Eficiencia en tiempo y espacio
- Escogeremos algoritmos con menor complejidad computacional
  - Coste polinómico: $1$ (constante), $\log n$, $n$, $n\log n$, $n^2$...
  - Coste mayor que polinómico: $2^n$, $n!$, $n^n$...
- Notación también usada para problemas computacionales. Generalmente, para cualquier instancia de un tamaño dado

## Clases de complejidad
- Los problemas (de decisión) se pueden categorizar en clases de complejidad según su dificultad computacional
- Clases más importantes:
  - P: resolubles en tiempo polinómico
  - NP: resolubles en tiempo polinómico mediante un algoritmo no-determinista
  - NP-completos: los más difíciles de NP
  - NP-duros: tan difícil o más que el problema más difícil en NP
- Otras:
  - EXP: resolubles en tiempo exponencial
  - R: resolubles en tiempo finito
- [figura, se construye en capas en las diapositivas 18-34: diagrama de Venn de dificultad computacional creciente. Anidamiento: P (polinómico) ⊆ NP ("no-determinista" polinómico) ⊆ EXP (computable en tiempo exponencial) ⊆ R (computable en tiempo finito); fuera de R: indecidibles (no computables). Marcadas las zonas NP-completos (frontera superior de NP), EXP-completos (frontera de EXP), NP-duros y EXP-duros (zonas que abarcan los completos y lo que queda por encima). Anotación: "¿P = NP? Problema del milenio"]

## P: computable en tiempo polinómico
- $O(p(n))$, p(n): polinomio (de variable n)
- Ejemplos: búsqueda, ordenación, multiplicación de matrices, sistemas de ecuaciones lineales, algoritmo de Dijkstra (caminos más cortos), problemas de programación lineal, problemas de optimización convexa

## EXP: computable en tiempo exponencial
- $O(2^{p(n)})$, p(n): polinomio (de variable n)
- Ajedrez en tablero general $n\times n$. Juegan las blancas, ¿ganan?
  - $\in$ EXP, $\notin$ P
  - $\in$ EXP-completo: tan difícil como cualquier otro problema $\in$ EXP
- Damas, Go (generales)
- EXP-duro: tan difícil o más que el problema más difícil en EXP

## NP: tiempo polinómico no determinista
- Nondeterministic polynomial time. NP no significa "tiempo no polinómico"
- NP: problemas de decisión que pueden ser resueltos en tiempo polinómico por un algoritmo no determinista "con suerte"
- NP-completo: los problemas más difíciles de NP
- NP-duro: tan difícil o más que el problema más difícil de NP

## Algoritmo no determinista "con suerte"
- Toma decisiones aleatorias (adivina). Siempre acierta
- Si el resultado del problema de decisión es SÍ (o verdadero) las decisiones aleatorias conducen a obtener ese SÍ
- [figura: árbol de decisiones con varias ramas por nodo; la elección de la rama correcta lleva a la hoja SÍ; las otras hojas son NO]

## Ejemplo: búsqueda no determinista
```
Algoritmo busquedaNoDeterminista(A,n,elemento) # O(1)
{
    j = escojeIndice(); # No determinista O(1)

    if(A[j]==elemento)
    {
         print(j);
         exito();
    }
    else
    {
         print(-1);
         fracaso();
    }
}
```

## Ejemplo de problema en NP (y P)
- Problema: ¿es posible encontrar un camino por un laberinto de tamaño $n\times n$?
  - Se puede resolver en tiempo polinómico por algoritmo no determinista con suerte, luego el problema $\in$ NP
- ¿Se puede resolver también por un algoritmo determinista en tiempo polinómico?
  - En ese caso el problema $\in$ P. Recordad: $P\subseteq NP$
  - Este problema sí está en P (Dijkstra)

## NP: verificación de soluciones
- Definición equivalente de clase NP: un problema de decisión $\in$ NP si se puede verificar, en tiempo polinómico, si una solución conduce a un SÍ
- Problema del laberinto $n\times n$: podemos verificar, en tiempo polinómico, que una secuencia de pasos (de longitud $\le n^2$) es un camino a través del laberinto

## Ejemplos de problemas en NP
- Tetris: te dan una lista de piezas en orden. ¿Podrías sobrevivir? Claramente se podría resolver en tiempo exponencial
- Factorización de un entero en producto de números primos. Fundamental en criptografía
- Problema (de decisión) del viajante de comercio: ¿es posible obtener una solución con valor menor que una cierta cantidad?

## Ejemplos de problemas NP-completos
- Satisfacibilidad booleana (SAT)
  - Primer problema demostrado $\in$ NP-completo (Cook, 1971)
  - Ejemplo: ¿existen valores booleanos para $x_1,x_2,x_3,x_4$ tal que $(x_1\lor\lnot x_3)\land(\lnot x_2\lor x_3\lor\lnot x_4)$ sea cierto?
- 21 problemas NP-completos de Karp (1972)
- Suma de subconjuntos: dado un conjunto de enteros, ¿existe algún subconjunto cuya suma sea exactamente cero?
- Problemas de optimización: problema del viajante de comercio, problema de la mochila 0/1

## Importancia de conocer problemas NP-completos
- Parecen inocentes: a veces se parecen mucho a problemas para los que sí existen algoritmos eficientes
- Aparecen frecuentemente
- Soluciones aproximadas: un programador no experimentado puede perder mucho tiempo intentando diseñar un algoritmo eficiente sin éxito. Si demuestras que tu problema es NP-completo (o NP duro) puedes recurrir a soluciones aproximadas

## Reducciones
- ¿Cómo demostrar que un problema A es NP-completo?
  1. Demostrar $A\in NP$
  2. Demostrar que es NP-duro
     - Lo más habitual: "reducir" un problema NP-completo Q a A
     - Si Q NP-completo hay que demostrar que A es tan difícil o más que Q
- Reducción
  - En general: transformar cada instancia de un problema Q a otra de un problema A
  - Al resolver A el resultado es el mismo que para Q
  - [figura: entrada x para Q --T (transformación)--> T(x) entrada para A --> Algoritmo para A --> Sí/No; el conjunto T + algoritmo para A forma el "Algoritmo para Q"]
  - Cada problema NP-completo se puede reducir a los demás

## Reducciones como técnica de diseño de algoritmos
- "Transforma y vencerás": ¿se puede transformar un problema en otro que sepamos resolver eficientemente?
- Ejemplos
  - Camino más corto por grafo no ponderado: camino más corto por grafo ponderado (p.e., algoritmo de Dijkstra), dando el mismo peso a todas las aristas
  - Camino más corto considerando productos de pesos: aplicar logaritmos a los pesos
  - Camino más largo: multiplicar los pesos por $-1$

## Conjetura ¿P = NP?
- Uno de los problemas matemáticos del milenio no resuelto
  - $1.000.000 (Clay Mathematics Institute). Poca cantidad
  - Si existiera (se encontrara) un algoritmo polinómico para resolver un problema NP-completo, entonces P = NP
- Opinión mayoritaria: $P\ne NP$
- $P\ne NP$ equivale a:
  - No puedes implementar la "suerte" al adivinar
  - Hay problemas para los que obtener una solución es más difícil que verificarla

## R: computable en tiempo finito
- [figura: diagrama completo de clases (ver arriba): P ⊆ NP ⊆ EXP ⊆ R; indecidibles (no computables) fuera de R; ¿P = NP? problema del milenio]
- R = "recursivo" (no en el sentido de función recursiva que se llama a sí misma)
- Problemas no computables = indecidibles = no "recursivos"
  - No existen algoritmos que los resuelvan
  - Ejemplo más conocido: problema de la parada. Determinar si cualquier programa va a parar en tiempo finito

## Problema de la parada
```python
def Termina(p, x): # p es un programa , x sus entradas
    # Supongamos que resuelve el problema de la parada
    # Devuelve True si p(x) termina , y False en otro caso

def d(w): # w es un programa
    if Termina(w, w):
        while True: pass # Bucle infinito
```
- d(w) termina $\Leftrightarrow$ w(w) nunca termina
```python
d(d):
    if Termina(d, d):
        while True: pass
```
- d(d) termina $\Leftrightarrow$ d(d) nunca termina. Contradicción

# 3. Problemas de optimización

## Problemas matemáticos de optimización
- Importante clase de problemas computacionales
- Maximizar/minimizar una función objetivo
  - Encontrar las variables ("parámetros") donde una función toma su mayor/menor valor
  - Las variables deben satisfacer restricciones que definen la región factible donde se encontrará la solución
- [figura: dos gráficas de ejemplo, una función de 2 variables con curvas de nivel y región factible, y una función de 1 variable (eje y de -5 a 15, x de -2 a 4)]

## Ejemplo: problema de la mochila 0/1
- Considérese un conjunto de n objetos, cada uno con un peso $p_i$ y un valor $v_i$, para $i=1,\dots,n$, y una mochila con capacidad C, que es el máximo peso que puede soportar la mochila
- Seleccionar el subconjunto de objetos que puedan introducirse en la mochila, sin sobrepasar la capacidad C, tal que la suma de sus valores sea máxima

## Notación matemática
$$\underset{x}{\text{minimiza}}\ f_0(x)\quad \text{sujeto a}\ f_i(x)\le b_i,\ i=1,\dots,m$$
- $f_0$ es la función objetivo
- x representa varias variables (no tiene por qué ser un escalar)
- $f_i(x)\le b_i$, $i=1\dots m$ son las restricciones
- El propósito es hallar los valores de x que optimicen la función
- Un problema de maximización se puede convertir fácilmente a uno de minimización cambiando el signo de $f_0$

## Ejemplo: problema de la mochila 0/1 (formulación)
$$\underset{x}{\text{maximiza}}\ \sum_{i=1}^{n}x_iv_i\quad \text{sujeto a}\ x_i\in\{0,1\},\ i=1,\dots,n;\quad \sum_{i=1}^{n}x_ip_i\le C$$
- Las variables $x_i$ determinan si se introduce el objeto i en la mochila (x es un vector)
- C, $p_i$, $v_i$ son datos del problema (indican una instancia concreta)
- Es un problema NP-completo

## Problemas lineales
- $f_0,\dots,f_m$ son funciones lineales: $f_i(\alpha x_1+\beta x_2)=\alpha f_i(x_1)+\beta f_i(x_2)$, $\forall x_1,x_2\in\mathbb{R}^n$, $\forall\alpha,\beta\in\mathbb{R}$
- No lineal, si no cumple lo anterior
- Los problemas lineales suelen llamarse "problemas de programación lineal"
- Son estudiados en profundidad por la Investigación Operativa

## Problemas lineales: interpretación geométrica
- Función objetivo: hiperplano
- Restricciones: también hiperplanos. Definen una región factible (donde debe estar la solución)
- [figura: en 2D (ejes X1, X2), polígono convexo gris "Región factible" con rectas paralelas de nivel de la función objetivo; el "Óptimo" es el vértice más extremo en la dirección de mejora (flecha). En 3D (ejes X1, X2, Z), el mismo caso con la función objetivo como plano y el óptimo en un vértice]

## Problemas lineales: algoritmo Simplex
- Parte de un punto inicial: vértice de región factible (poliedro convexo)
- Avanza por aristas hasta un vértice mejor, hasta encontrar el óptimo
- Hay otros algoritmos para resolver problemas lineales
- [figura: poliedro con camino por aristas desde "Punto inicial" hasta "Óptimo"]

## Problemas convexos
- $f_0,\dots,f_m$ son funciones convexas: $f_i(\alpha x_1+\beta x_2)\le\alpha f_i(x_1)+\beta f_i(x_2)$, $\forall x_1,x_2\in\mathbb{R}^n$, $\forall\alpha,\beta\in[0,1]$, donde $\alpha+\beta=1$
- Las restricciones definen un conjunto convexo
- No convexo, si no cumple lo anterior
- Los problemas lineales son convexos
- Se pueden resolver en tiempo polinómico

## Conjuntos convexos
- Cualquier segmento entre dos puntos del conjunto debe estar completamente contenido en el conjunto
- [figura: ejemplos de conjuntos convexos y de conjuntos no convexos]

## Funciones convexas
- [figura: curva convexa de una variable; el segmento (cuerda) entre $(x_1,f(x_1))$ y $(x_2,f(x_2))$ queda por encima de la curva; en $\alpha x_1+\beta x_2$ la curva vale $f(\alpha x_1+\beta x_2)$ y la cuerda $\alpha f(x_1)+\beta f(x_2)$]
- $f_i(\alpha x_1+\beta x_2)\le\alpha f_i(x_1)+\beta f_i(x_2)$
- [figura: superficie convexa en 3D (valores 0 a 50, un único mínimo)]

## Funciones no convexas
- [figura: superficies 3D con varios mínimos/máximos locales]
- Pueden tener múltiples óptimos locales
- Si el dominio es discreto no tiene sentido hablar de una función convexa
- No siempre se pueden resolver en tiempo polinómico
- Para "resolverlos" se recurre a heurísticas, pero no garantizan llegar al óptimo global
  - Búsqueda aleatoria
  - Algoritmos genéticos
- Teorema "no hay comida gratis": ninguna heurística es mejor que todas en general

## Descenso/ascenso de gradiente
- Gradiente: vector de derivadas parciales de una función
- Indica la dirección de mayor pendiente en un punto
- Algoritmo iterativo que asciende o desciende poco a poco hasta llegar a un óptimo
- [figura: curvas de nivel en el plano $(x_1,x_2)$ y superficie $f(x)$ (0 a 600) con la trayectoria del descenso]

### Pseudocódigo
```
function AlgoritmoDescensoGradiente()
    x ← x0                      ▷ Aproximación inicial
    g ← calculaGradiente(x)     ▷ Gradiente en x
    while ||g|| > ε do          ▷ Iterar hasta que el módulo del gradiente sea muy pequeño
        x ← x − α · g           ▷ Actualizar aproximación en dirección del gradiente
        g ← calculaGradiente(x) ▷ Actualizar gradiente
    return x                    ▷ Devolver aproximación final
```
- Hay muchos más algoritmos (y mejores)
- Puede no converger o ser muy lento

# 4. Introducción a problemas en Inteligencia Artificial, Aprendizaje Automático y Ciencia de Datos

## Predicción - Regresión
- Predices un valor real
- Generas un modelo matemático que se ajuste a los datos lo mejor posible
  - ¿Qué tipo de modelo? ¿Mejor posible en qué sentido?
- [figura: dos gráficas de dispersión con curva de ajuste (ejemplo con eje x de 600 a 1800 y eje y de 0 a 300; otro con x de 0 a 6 e y de 0 a 1500)]

## Predicción - Clasificación
- Predices una clase (categoría)
- Generas un modelo matemático que defina fronteras entre las clases en el espacio de los datos, para separar las clases lo mejor posible
  - ¿Qué tipo de modelo y fronteras? ¿Mejor posible en qué sentido?
- [figura: tres gráficas 2D (x de -5 a 5, y de -4 a 4) con distintas fronteras entre clases]

## Predicción
- Para estos "problemas" no hay una solución "correcta"
  - Los modelos se crean con unos datos disponibles (de entrenamiento)
  - El rendimiento a la hora de predecir depende de nuevos datos (de test)
- No se conoce la relación entre entradas y salidas completamente
  - No podemos hablar de un "problema computacional"
  - Especificarla (matemática o lógicamente) suele ser complicadísimo
  - No podremos elaborar un algoritmo

## Aprendizaje automático
- Construir algoritmos a través de ejemplos
  - Caso concreto: reconocimiento de dígitos escritos a mano: base de datos MNIST
- [figura: muestra de dígitos MNIST]
- Dígitos difíciles: [figura: ejemplos de dígitos manuscritos ambiguos]

## Técnicas: problemas computacionales concretos
- Enfoque 1: K vecinos más cercanos, K-NN (K-nearest neighbors). [figura: punto a clasificar "¿?" con K=7 vecinos]
- Enfoque 2: máquinas de vectores soporte, SVM (support vector machines). [figura: frontera de máximo margen entre dos clases]
- Hay muchos más enfoques

## Clustering - agrupamiento
- La única información con la que contamos es la posición de los puntos (no hay información sobre clases)
- Queremos encontrar una agrupación o partición "razonable"
- [figura: nube de puntos en 3D]

## Posibles agrupaciones
- [figura: la misma nube de puntos 3D con dos agrupaciones posibles distintas]
- ¿Cuál es la agrupación correcta? No se sabe...
  - La tarea no está claramente definida
  - Aunque existen medidas de bondad para evaluar la calidad de una agrupación

## Tareas - Problemas - Algoritmos
- Existen "tareas" generales en ciencias e ingenierías que no se pueden definir como problemas computacionales
- Para abordarlas se plantean problemas computacionales concretos
- Los problemas computacionales se resuelven mediante algoritmos
- Jerarquía: Tarea -> Problema 1, 2, 3 -> cada problema con varios algoritmos (Alg 11, 12, 13; Alg 21, 22, 23; Alg 31, 32, 33)

## Tareas - Problemas - Algoritmos: Clasificación
- Tarea Clasificación -> problemas K-NN y SVM
  - K-NN -> algoritmo básico, algoritmo Árboles KD
  - SVM -> algoritmo SMO, algoritmo sub-gradientes
- Hay numerosos problemas y algoritmos alternativos
- Actualmente las redes neuronales artificiales profundas (deep learning) ofrecen el mejor rendimiento en muchas tareas
