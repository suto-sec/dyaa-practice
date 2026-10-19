## Potencias y logaritmos
| Potencias | Logaritmos |
|---|---|
| $b^0=1$, $b^{-x}=1/b^x$ | $\log_b 1=0$, $\log_b b=1$ |
| $b^x b^y=b^{x+y}$ | $\log_b(xy)=\log_b x+\log_b y$ |
| $(ab)^x=a^x b^x$ | $\log_b(x/y)=\log_b x-\log_b y$ |
| $(b^x)^y=b^{xy}$ | $\log_b(x^y)=y\log_b x$ |
| $b^{\log_b a}=a$ | $\log_b x=\log_a x/\log_a b$ (cambio de base) |
| $x^{\log_b y}=y^{\log_b x}$ | $\log_b a=1/\log_a b$ |

## Sumatorios: reglas
- $\sum_{i=m}^{n}f(i)=f(m)+\cdots+f(n)$, y vale $0$ si $m>n$.
- **Número de términos: $n-m+1$.** Por eso $\sum_{i=m}^{n}k=k(n-m+1)$ y $\sum_{i=m}^{n}1=n-m+1$.
- Es lineal: $\sum(f+g)=\sum f+\sum g$ y $\sum kf=k\sum f$ (la constante sale fuera).
- La variable contadora es muda: $\sum_{i}f(i)=\sum_{j}f(j)$. Sumar al revés: $\sum_{i=m}^{n}f(i)=\sum_{i=m}^{n}f(n+m-i)$.

## Fórmulas cerradas que hay que saberse
| Suma | Resultado |
|---|---|
| $\sum_{i=1}^{n}i$ | $\dfrac{n(n+1)}{2}$ |
| $\sum_{i=1}^{n}(2i-1)$ (impares) | $n^2$ |
| $\sum_{i=1}^{n}i^2$ | $\dfrac{n(n+1)(2n+1)}{6}$ |
| $\sum_{i=1}^{n}i^3$ | $\left(\dfrac{n(n+1)}{2}\right)^2$ |
| Aritmética: $\sum_{i=m}^{n}a_i$ con $a_i=a_{i-1}+d$ | $\tfrac12(a_m+a_n)(n-m+1)$ |
| Geométrica: $\sum_{i=m}^{n}r^i$, $r\neq1$ | $\dfrac{r^{n+1}-r^m}{r-1}$ |
| $\sum_{i=0}^{n-1}2^i$ | $2^n-1$ |
| $\sum_{i=1}^{n}i\,r^i$ | $\dfrac{r+r^{n+1}(nr-n-1)}{(r-1)^2}$ |
| Telescópica: $\sum_{i=1}^{n}(a_i-a_{i-1})$ | $a_n-a_0$ |
| Pirámide: $\sum_{i=1}^{n}\frac{i(i+1)}{2}$ | $\dfrac{n(n+1)(n+2)}{6}$ |

## Trucos de demostración
- **Gauss** (aritméticas): escribir la suma y su inversa y sumarlas término a término; todos los pares dan lo mismo.
- **Geométricas**: restar $S$ y $rS$; casi todo se cancela y queda $(r-1)S=r^{n+1}-r^m$.
- **Telescópicas**: reescribir el término como $a_i-a_{i-1}$, por ejemplo $\frac{1}{i(i+1)}=\frac1i-\frac1{i+1}$.
- **$\sum i^p$**: sumar la telescópica $\sum\left((i+1)^{p+1}-i^{p+1}\right)=(n+1)^{p+1}-1$ y despejar $S_p$ (hacen falta $S_0,\dots,S_{p-1}$).
- **$\sum i\,r^i$**: restar $S-rS$, derivar la suma geométrica o descomponer en sumas geométricas parciales.

## Cotas por integrales (cuando no hay fórmula)
| $f$ monótona | Cota inferior | Cota superior |
|---|---|---|
| creciente | $\int_{m-1}^{n}f(x)\,dx$ | $\int_{m}^{n+1}f(x)\,dx$ |
| decreciente | $\int_{m}^{n+1}f(x)\,dx$ | $\int_{m-1}^{n}f(x)\,dx$ |

- Comprueba **primero** si la función crece o decrece: de ahí salen los límites.
- Serie armónica: $\ln(n+1)\le\sum_{i=1}^{n}\frac1i\le\ln n+1$ (diverge; $\approx\ln n+0{,}577$).
- Integrales útiles: $\int x^k\,dx=\frac{x^{k+1}}{k+1}$, $\int\frac1x\,dx=\ln x$, $\int a^x\,dx=\frac{a^x}{\ln a}$.

## Límites y derivadas que se usan después
- $\lim_{n\to\infty}k/n=0$; $\lim\log_b n=\infty$ si $b>1$; $\lim n^a=\infty$ si $a>0$.
- L'Hôpital: si sale $\frac00$ o $\frac\infty\infty$, $\lim\frac{f}{g}=\lim\frac{f'}{g'}$ (el segundo límite debe existir).
- $(x^n)'=nx^{n-1}$, $(a^x)'=a^x\ln a$, $(\log_a x)'=\frac{1}{x\ln a}$.

## Errores típicos
- Contar mal los términos: $\sum_{i=0}^{n}$ tiene $n+1$ términos, no $n$.
- Aplicar la fórmula de Gauss cuando el índice no empieza en 1: usa $\tfrac12(a_m+a_n)(n-m+1)$ o resta dos sumas.
- Usar $r^{n+1}-r^m$ con $r=1$: ahí la suma vale $n-m+1$.
