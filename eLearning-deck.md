---
title:        Probieren hilft beim Studieren
subtitle:     Interaktive Vorlesungsfolien im Webbrowser
author:       Prof. Dr. Mario Botsch
affiliation:  Lehrstuhl für Computergraphik, TU Dortmund
feedback:
  deck-id:  'mb-elearning-example'
...


# Anleitung für die HTML-Folien

::: small
- **Cursor-links**/**Cursor-rechts** blättern durch Folien.
- **f**/**ESC** schalten Fullscreen-Modus an/aus.
- **Ctrl/Cmd-f** öffnet Such-Dialog, **ESC** schließt ihn wieder.
- <i class="fas fa-bars"></i> (links oben) öffnet das Navigationsmenü.
- <i class="fas fa-edit"></i> (links unten) schaltet das virtuelle Whiteboard an/aus.
- <i class="fas fa-play"></i> (rechts oben) spielt aufgezeichnetes Erklärvideo (wenn vorhanden) ab.
- <i class="fas fa-question-circle"></i> (rechts oben) öffnet das Frage-Panel, wo Fragen pro Folie submitted werden können.
- <i class="fas fa-expand-arrows-alt"></i> (recht oben im Demo-Fenster) 
  bringt Demo-Apps in den Fullscreen-Modus.
- **Doppelklick** auf ein Element (z.B. ein Bild) für Rein-/Raus-Zoomen.
- Wenn der untere Rand blinkt: Zum virtuellen Whiteboard **runter-scrollen**.
:::

::: notes
Speaker Notes, hurra!
:::


# Videoaufzeichnungen

::: incremental
- Erklärvideos abspielen:
  - Video springt automatisch an die Stelle, wo die aktuelle Folie erklärt wird.
  - **Cursor-links**/**Cursor-rechts** springt im Video folien-weise vor/zurück.
  - **Space** oder **Maus-Klick** pausiert das Video.
  - Abspielgeschwindigkeit lässt sich einstellen (von halber bis zu doppelter Geschwindigkeit).
  - Beenden des Videos springt automatisch auf die zuletzt erklärte Folie.
- Erklärvideos aufnehmen:
  - Videos können direkt in den HTML-Folien aufgenommen werden.
  - Bildschirm, Kamera und Mikrophon werden aufgezeichnet.
  - Videos werden automatisch mit Folien synchronisiert.
:::



--------------------------------------------------------------------------------

# Features der HTML-Folien

--------------------------------------------------------------------------------

# Bilder und Videos

::: columns-50-50

![Bilder lassen sich einfach einbinden](data/arcarde.png){ height=400px }

![Videos lassen sich genauso einfach einbinden](data/donkeykong.mp4){ height=400px .controls .autoplay .muted }

:::


# Aufzählungen

::: columns-40-50

:::: incremental
- Mario
    - Der Held
- Peach
    - Die Prinzessin
- Donkey Kong
    - Der Böse
::::

:::: pics
![Mario](data/supermario.png){ height=180px }
![Peach](data/peach.png){      height=220px }
![Donkey Kong](data/donkeykong.png){ height=300px }
::::

:::


# Textauszeichnungen

::: columns-40-50

- **Mario**
    - ist fett (gedruckt)
- Prinzessin ^Peach^
    - ist hochgestellt
- *Donkey Kong*
    - ist schräg

:::: pics
![Mario](data/supermario.png){ height=180px }
![Peach](data/peach.png){      height=220px }
![Donkey Kong](data/donkeykong.png){ height=300px }
::::

:::


# Nummerierungen

::: columns-30-50

1. Donkey Kong
    - entführt Peach
2. Mario
    - rettet Peach
3. Peach
    - findet Mario toll

![](data/donkeykong-2.png){ width=500px }

:::


# Task-Listen

::: columns-1-1

:::: check-cross
- Was können wir?
    - [X] Mathe
    - [X] Informatik
    - [ ] alles andere
::::

:::: plus-minus
- Stärken/Schwächen?
    - [X] Mathe
    - [X] Informatik
    - [ ] alles andere
::::

:::: thumb
- Was ist cool?
    - [X] Mathe
    - [X] Informatik
    - [ ] alles andere
::::

:::: bla
- Wer braucht mehr :moneybag:?
    - [X] Mathe
    - [X] Informatik
    - [X] alle anderen
::::

:::

# Mathe-Formeln mit [MathJax](https://www.mathjax.org/)

::: incremental
- Navier-Stokes-Gleichungen
  $$\begin{eqnarray}
    \dot{\vec{u}} &=& 
    \fragment{-\vec{u}\cdot\grad\vec{u}}
    \fragment{\;-\; \frac{1}{\rho}\grad p}
    \fragment{\;+\; \nu \laplace \vec{u}}
    \fragment{\;+\; \vec{f}} 
    \label{eq:momentum} \\[2mm]
    \grad \cdot \vec{u} &=& 0 
    \label{eq:incompressibility}
  \end{eqnarray}$$
- Formeln können schrittweise eingeblendet werden
- Formeln können referenziert und verlinkt werden\
  (siehe nächste Folie)
:::


# Virtuelle Tafel

::: incremental

- Herleitungen an der Tafel sind nicht in Videoaufzeichnung
- Herleitungen auf den Folien sind zu schnell
  [$$
  \begin{eqnarray*}
  a &=& b \\
  a^2 &=& ab \\
  2a^2 &=& a^2 + ab \\
  2a^2-2ab &=& a^2 - ab \\
  2a(a-b) &=& a (a-b) \\
  2a &=& a \\
  2 &=& 1
  \end{eqnarray*}
  $$]{ .math-incremental }
- Die virtuelle Tafel ist ein guter Kompromiss :thumbsup:

:::

::: footer
Hier der Link auf Navier-Stokes-Gleichungen: $\eqref{eq:momentum}$.
:::


# Source Code mit [highlight.js](https://highlightjs.org/)

::: columns-50-50

``` {.haskell .line-numbers}
qsort []     = []
qsort (x:xs) = qsort small ++ mid ++ qsort large
  where
    small = [y | y<-xs, y<x]
    mid   = [y | y<-xs, y==x] ++ [x]
    large = [y | y<-xs, y>x]
```
Caption: Quicksort in Haskell


``` {.cpp line-numbers="5-10" width=80%}
int     i, N=100000000;
double  x, dx=1.0/(double)N;
double  f, pi=0.0;

for (i=0; i<N; ++i)
{
  x = (i+0.5) * dx;
  f = 4.0 / (1.0 + x*x);
  pi += dx * f;
}

printf("pi = %f\n", pi);
```
Caption: $\pi$ ausrechnen in C++

:::



# Webseiten

![](https://graphics.cs.tu-dortmund.de/){ width=1000px height=550px .print .iframe }



# Tabellen

|                     | Powerpoint | LaTeX-Beamer | HTML-Folien |
|---------------------|:----------:|:------------:|:-----------:|
| plattformunabhängig |     😢     |      😊      |      😊     |
| Mathe-Formelsatz    |     😢     |      😊      |      😊     |
| Videos              |     😊     |      😢      |      😊     |
| Export für Studierende |     😢     |      😢      |      😍     |
| erweiterbar         |     😢     |      😢      |      😍     |
| interaktiv          |     😢     |      😢      |      😍     |
| Aufwand             |     😊     |      😢      |      😭     |

Table: Warum sind HTML-Folien so toll?


# Bibliographie mit BibTeX

- Bibliographie kann mit BibTeX verwaltet werden. 
- Die Referenzliste wird dann automatisch erstellt (siehe nächste Folie).
- Zitationsstil über CSL (Citation Style Language) einstellbar.
- Hier ein Beispiel:
    - Realistische Avatare sind toll [@waltemate2018].
    - @achenbach2017 können sie in <10 Minuten erzeugen.
    - Sie können in Echtzeit animiert werden [@komaritzan2019].


# Referenzen

::: { #refs }
:::


# PDF-Unterstützung

::: columns-50-50
- Folien lassen sich auf Knopfdruck als PDF-Dokument exportieren.
- PDF-Dokumente lassen sich in Präsentationen einbinden.

![](eLearning.pdf){ width=600px height=500px }
:::



--------------------------------------------------------------------------------

# Statische und dynamische Visualisierungen

--------------------------------------------------------------------------------


# Bild-Sequenzen

::: r-stack
![](data/laserMario4.jpg){ height=500px .fragment }
![](data/laserMario3.jpg){ height=500px .fragment }
![](data/laserMario2.jpg){ height=500px .fragment }
![](data/laserMario1.jpg){ height=500px .fragment }
:::



# Animierte Vektorgrafiken

![de Casteljau Algorithmus](data/deCasteljau.svg){ .embed width=800px }



# Interaktive Charts mit [chart.js](https://www.chartjs.org/)

``` { .bar-chart width=1000px }
1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 5.0
Irgendwelche Zahlen, 5, 6, 5, 2, 3, 3, 4, 3, 3, 5, 11
Andere Zahlen, 11, 8, 5, 5, 2, 7, 4, 1, 5, 0, 15
```


# Interaktive Charts mit [chart.js](https://www.chartjs.org/)

``` { .pie-chart width=500px }
1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 5.0
Irgendwelche Zahlen, 5, 6, 5, 2, 3, 3, 4, 3, 3, 5, 11
```


# Interaktive Charts mit [chart.js](https://www.chartjs.org/)

``` { .line-chart width=1000px title="Poisson-System lösen" }
100k, 200k, 300k, 400k, 500k
Conjugate Gradients, 3.19, 11.6, 23.6, 37.3, 47.4
Sparse Cholesky, 0.21, 0.52, 0.83, 1.21, 1.54
```



# Graph-Diagramme mit [GraphViz](https://www.graphviz.org/)

``` {.dot .render height=500px }
digraph {
    node [style = filled]
    A [fillcolor = red]
    C [fillcolor = green]
    D [fillcolor = blue]
    A -> B 
    A -> C
    C -> D
    C -> E
    C -> F
    B -> D
}
```



# Diagramme mit Tikz/Latex

``` {.tex .render width=500px}
\documentclass{standalone}
\usepackage{tikz}
\usepackage{verbatim}
\begin{document}
\pagestyle{empty}
\begin{tikzpicture}[scale=3,cap=round]
  % Local definitions
  \def\costhirty{0.8660256}

  % Colors
  \colorlet{anglecolor}{green!50!black}
  \colorlet{sincolor}{red}
  \colorlet{tancolor}{orange!80!black}
  \colorlet{coscolor}{blue}

  % Styles 
  \tikzstyle{axes}=[]
  \tikzstyle{important line}=[very thick]
  \tikzstyle{information text}=[rounded corners,fill=red!10,inner sep=1ex]

  % The graphic
  \draw[style=help lines,step=0.5cm] (-1.4,-1.4) grid (1.4,1.4);

  \draw (0,0) circle (1cm);

  \begin{scope}[style=axes]
    \draw[->] (-1.5,0) -- (1.5,0) node[right] {$x$};
    \draw[->] (0,-1.5) -- (0,1.5) node[above] {$y$};

    \foreach \x/\xtext in {-1, -.5/-\frac{1}{2}, 1}
      \draw[xshift=\x cm] (0pt,1pt) -- (0pt,-1pt) node[below,fill=white]
            {$\xtext$};

    \foreach \y/\ytext in {-1, -.5/-\frac{1}{2}, .5/\frac{1}{2}, 1}
      \draw[yshift=\y cm] (1pt,0pt) -- (-1pt,0pt) node[left,fill=white]
            {$\ytext$};
  \end{scope}

  \filldraw[fill=green!20,draw=anglecolor] (0,0) -- (3mm,0pt) arc(0:30:3mm);
  \draw (15:2mm) node[anglecolor] {$\alpha$};

  \draw[style=important line,sincolor]
    (30:1cm) -- node[left=1pt,fill=white] {$\sin \alpha$} +(0,-.5);

  \draw[style=important line,coscolor]
    (0,0) -- node[below=2pt,fill=white] {$\cos \alpha$} (\costhirty,0);

  \draw[style=important line,tancolor] (1,0) --
    node [right=1pt,fill=white]
    {
      $\displaystyle \tan \alpha \color{black}=
      \frac{ {\color{sincolor}\sin \alpha} }{\color{coscolor}\cos \alpha}$
    } (intersection of 0,0--30:1cm and 1,0--1,1) coordinate (t);

  \draw (0,0) -- (t);
\end{tikzpicture}
\end{document}
```




# Plots mit [gnuplot](http://www.gnuplot.info/)

``` {.gnuplot .render height=500px }
set xrange [0:2500]
set yrange [0:1500]
set fit quiet
set xtics nomirror
set ytics nomirror 
set key off
set tic font ",20"
set border 3
set margins 15

set xlabel "Grundstückspreis in 1000€" textcolor rgb "black" font "Arial, 25" offset 0
set ylabel "Grundstücksgröße in m^2" textcolor rgb "black" font "Arial, 25" offset 0 rotate by 90

f1(x) = a + b * x
f2(x) = c + d * x + e * x * x
f3(x) = f + g * x + h * x * x + i * x * x * x

FIT_LIMIT = 1e-6

fit [0:2000] [0:1500] f1(x) "data/house-price-to-size.dat" via a,b
fit [0:2000] [0:1500] f2(x) "data/house-price-to-size.dat" via c,d,e
fit [0:2000] [0:1500] f3(x) "data/house-price-to-size.dat" via f,g,h,i

plot "data/house-price-to-size.dat" with points pt 7 ps 1 lw 1 lc rgb "#F09838", f1(x) title "Test" lc "blue"  lw 3, f2(x) lc "green" lw 3,  f3(x) lc "red" lw 3
```
Caption: Marc Latoschik, Uni Würzburg



# Interaktive Plots

![Auf `3D Surface` klicken!](demos/plotly/plotly.html){ width=1000px height=500px .print }

[Martin Heistermann, Uni Bern]{.footer}



# 3D-Modelle

![Space-Taste: Zeichenmodus ändern. Linke Maus: Rotieren](data/amo.off){ width=800px height=500px }

[[Polygon Mesh Processing Library](http://pmp-library.org)]{.footer}



--------------------------------------------------------------------------------

# Interaktive Demos

--------------------------------------------------------------------------------


# Interaktive Demos in Javascript

![de Casteljau Algorithmus: Kontrollpunkte verschieben, Parameter t verändern](demos/bezier/deCasteljau.html){ width=1000px height=500px .print css:border="2px solid red" }


# Interaktive Demos mit [D3.js](https://d3js.org/)

![Voronoi-Diagramm (Punkte mit Maus verschieben)](demos/voronoi/voronoi.html){ width=1000px height=500px .print }


# Komplexere Demos in C++

![Rechte Maustaste: Flüssigkeit injizieren. Linke Maustaste: Verwirbeln](demos/fluids/fluids.html){ width=1000px height=500px  }


# Interaktive Mathe mit SAGE

::: { .sageCell .print width=100% height=500px }

Wir definieren ein paar Punkte $\mathbf{x}_1, \dots, \mathbf{x}_6$ und verbinden sie zu einem Linienzug:

``` sage
points = matrix([ [0,0], [1,1], [2,-1], [3,0], [2.5,0.5], [3,1] ])
pointsPlot = plot(line(points, color="red", aspect_ratio=1))
show(pointsPlot)
```

Jetzt interpolieren wir die Punkte $\mathbf{x}_1, \dots, \mathbf{x}_n$ mit einem Polynom vom Grad $n-1$.
Testen Sie verschiedene Werte für $n \in \{2, \dots, 6 \}$. Was fällt auf?

``` sage
# select n points
n = 6
B = points.submatrix(0,0,n,2)

# define matrix for polynomial interpolation
A = matrix(n, n, lambda i,j: i^j)

# solve A*X=B, then X contains the poly coefficients
X = A\B

# define function for evaluating polynomial
var('k, coeffs, t')
def curve(coeffs, t):
    return sum(coeffs[k] * t^k for k in [0..n-1])
   
# finally, plot fitted curves and point set
curvePlot = parametric_plot(curve(X,t), (t, 0, n-1))
show(pointsPlot + curvePlot)
```
:::


# Interaktives Python

::: { .sageCell width=100% height=500px  .print }
``` python
from math import exp,pi,cos,sin
import matplotlib.pyplot as plt
import numpy as np
x0=1; t0=0; tf=25; x=x0; t=t0;
h = pi/16
X=[]
T=[]
while t < tf:
    X.append(x)
    T.append(t)
    x = x + h*(-x*cos(t));
    t = t+h
plt.plot(T,X,'b*--')
T1=np.linspace(t0,tf,200);
plt.plot(T1,[exp(-sin(t)) for t in T1],'r-')
plt.title('h = %f' % (h))
plt.legend(('Numerical solution','Exact solution'),loc='upper left')
plt.show()
```
:::

[Example from Roberto De Leo, Howard University]{.footer}


# Interaktive Statistik mit R

::: { .sageCell width=100% height=500px  .print }
Die Trainingsdaten bestehen aus Alter und Maximalpuls als $x$- und $y$-Koordinaten.

``` rr
x = c(18,23,25,35,65,54,34,56,72,19,23,42,18,39,37) # ages of individuals
y = c(202,186,187,180,156,169,174,172,153,199,193,174,198,183,178) # maximum heart rate of each one
plot(x,y) # make a plot
```

Wir fitten jetzt eine Gerade durch lineare Regression:

``` rr
plot(x,y) # make a plot
lm(y ~ x) # do the linear regression
abline(lm(y ~ x)) # plot the regression line
```
:::


# Shader-Programmierung

![Press `Ctrl-Enter` or `Cmd-Enter` to compile shaders](demos/webgl-shader/alpha-map.html){ width=100% height=500px  }



# Quizzes und Selbstlernphase




# Audience Response System 

::: center
Wer bekommt am Ende die Prinzessin?
![](data/peach.png){height=70px}
:::

::: {.quiz .w80}
- [ ] Donkey Kong ![](data/donkeykong.png){height=70px}
    - Nein, der ist böse!
- [ ] Sponge Bob ![](data/spongebob.png){height=70px}
    - Nein, der lebt unter Wasser!
- [ ] Kleine A-Loch ![](data/arschloch.png){height=70px}
    - Nein, den mag keiner!
- [X] Supermario ![](data/supermario.png){height=70px} 
    - Klar!
:::



# Zuordnungsaufgaben

::: quiz-mi
Prinzessin
: ![](data/peach.png){height=100px}

Donkey Kong
: ![](data/donkeykong.png){height=100px}

Supermario
: ![](data/supermario.png){height=100px}
:::


# Zuordnungsaufgaben

::: quiz-mi
Laplace
: $\laplace f$

Gradient
: $\grad f$

Divergenz
: $\grad \cdot f$ 

Quatsch
: $\laplace \cdot f$ 
:::



# Freitextaufgaben

::: columns-50-50

:::: {.center .quiz-ft}
![](data/peach.png){height=150px}
[:vspace](30px)
Wie heißt die Prinzessin?

- [x] Peach
- [ ] Lilifee
::::

:::: {.center .quiz-ic}
![](data/donkeykong.png){height=150px}
[:hspace](30px)
![](data/supermario.png){height=150px}
[:hspace](30px)
![](data/spongebob.png){height=130px}\
[:vspace](40px)
Die Prinzessin ist verliebt in 

- [ ] Donkey Kong
- [x] Supermario
- [ ] Sponge Bob
::::

:::



# Fragensammlung

- Mit dem Icon <i class="fas fa-question-circle"></i> (oben rechts) können Studierende pro Folie anonym Fragen posten.
- Die Fragen sind für alle Vorlesungsteilnehmer*innen sichtbar und können dann z.B. in einer Online-Fragestunde besprochen werden.
- Fragen können von Lehrenden als erledigt markiert oder gelöscht werden.
- Im Menu (Icon <i class="fas fa-bars"></i> oben links) werden die Fragen in der Folienübersicht auch angezeigt.



--------------------------------------------------------------------------------

# Folienerstellung

--------------------------------------------------------------------------------


# Von Markdown zu HTML

![](data/pipeline.svg){ .embed width=90% }



# Open-Source "Zutatenliste"

::: w90

- [Reveal.js](https://github.com/hakimel/reveal.js/)
    - Javascript-Framework zur Darstellung von Folien im Webbrowser
- [Pandoc](https://pandoc.org/)
    - Tool/Bibliothek zur Konvertierung von Markdown in Reveal.js-Folien.
- [decker](https://gitlab2.informatik.uni-wuerzburg.de/decker/decker)
    - `decker` basiert auf `pandoc` und übersetzt Markdown in HTML-Folien.
    - Es erweitert `pandoc` und `reveal.js` um zusätzliche Filter und Plugins.
    - Wird entwickelt von 
      [Prof. Henrik Tramberend](https://tramberend.beuth-hochschule.de/) (Beuth Hochschule Berlin),
      [Prof. Mario Botsch](https://graphics.uni-bielefeld.de/people/botsch_mario/botsch_mario.html) (TU Dortmund) und
      [Prof. Marc Latoschik & Team](http://hci.uni-wuerzburg.de/people/marc/) (Uni Würzburg).
    - Wird verwendet an Uni Würzburg, Beuth Hochschule Berlin, TU Dortmund, Uni Osnabrück, Uni Magdeburg, Uni Bern und EPFL.
:::