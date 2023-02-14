---
title: FlappyBird
data: 2021-12-05 21:23:47
---
## **使用MLP与遗传算法玩FlappyBird** [GitHub链接](https://github.com/waleyCode/FlappyBird)
![flappyBird](./flappyBird.jpg)


## 所需环境
- [Python 3.9](https://www.python.org/downloads/release/python-394/)
- [DEAP Library](https://deap.readthedocs.io/en/master/)
- [Juypter Notebook](https://jupyter.org)

## 代码 Code

### MLP神经网络 neural network controller

```python
import numpy as np
import math

class MLP(object):
    def __init__(self, numInput, numHidden1, numHidden2, numOutput):
        self.fitness = 0
        self.numInput = numInput + 1 # Add bias node from input to hidden layer␣ 􏰀→1 only
        self.numHidden1 = numHidden1 # Feel free to adapt the code to add more␣ 􏰀→biases if you wish
        self.numHidden2 = numHidden2
        self.numOutput = numOutput
        self.w_i_h1 = np.random.randn(self.numHidden1, self.numInput)
        self.w_h1_h2 = np.random.randn(self.numHidden2, self.numHidden1)
        self.w_h2_o = np.random.randn(self.numOutput, self.numHidden2)
        self.ReLU = lambda x : max(0,x)
    def sigmoid(self, x):
        try:
            ans = (1 / (1 + math.exp(-x)))
        except OverflowError:
            ans = float('inf')
        return ans
```
<!-- more -->

```python
class MLP(MLP):
     def feedForward(self, inputs):
        inputsBias = inputs[:]
        inputsBias.insert(len(inputs), 1)
        h1 = np.dot(self.w_i_h1, inputsBias)
        h1 = [self.ReLU(x) for x in h1]
        h2 = np.dot(self.w_h1_h2, h1)
        h2 = [self.ReLU(x) for x in h2]
        output = np.dot(self.w_h2_o, h2)
        output = [self.sigmoid(x) for x in output]
        return output
```

```python
class MLP(MLP):
    def getWeightsLinear(self):
        flat_w_i_h1 = list(self.w_i_h1.flatten())
        flat_w_h1_h2 = list(self.w_h1_h2.flatten())
        flat_w_h2_o = list(self.w_h2_o.flatten())
        return (flat_w_i_h1 + flat_w_h1_h2 + flat_w_h2_o)
    def setWeightsLinear(self, Wgenome):
        numWeights_I_H1 = self.numHidden1 * self.numInput
        numWeights_H1_H2 = self.numHidden2 * self.numHidden1
        numWeights_H2_O = self.numOutput * self.numHidden2
            
        self.w_i_h1 = np.array(Wgenome[:numWeights_I_H1])
        self.w_i_h1 = self.w_i_h1.reshape((self.numHidden1, self.numInput))
            
        self.w_h1_h2 = np.array(Wgenome[numWeights_I_H1:(numWeights_H1_H2+numWeights_I_H1)])
        self.w_h1_h2 = self.w_h1_h2.reshape((self.numHidden2, self.numHidden1))
            
        self.w_h2_o = np.array(Wgenome[(numWeights_H1_H2 + numWeights_I_H1):])
        self.w_h2_o = self.w_h2_o.reshape((self.numOutput, self.numHidden2))
```

### 游戏 Game
```python
import pygame

```

```python
class FlappyBird:
    def __init__(self):
        self.screen = pygame.display.set_mode((400, 708))
        self.bird = pygame.Rect(65, 50, 50, 50)
        self.background = pygame.image.load("assets/background.png").convert()
        self.birdSprites = [pygame.image.load("assets/1.png").convert_alpha(),
                            pygame.image.load("assets/2.png").convert_alpha(),
                            pygame.image.load("assets/dead.png")]
        self.wallUp = pygame.image.load("assets/bottom.png").convert_alpha()
        self.wallDown = pygame.image.load("assets/top.png").convert_alpha()
        self.gap = 130
        self.gravity = 5
        self.delay = False
        self.restart()

    def updateWalls(self):
        self.wallx -= 5
        self.distanceMoved += 5
        if self.wallx < -80:
            self.wallx = 400
            self.counter += 1
            self.offset = np.random.randint(-180, 200)

    def birdUpdate(self):
        if self.jump:
            self.jumpSpeed -= 1
            self.birdY -= self.jumpSpeed
            self.jump -= 1
        else:
            self.birdY += self.gravity
            self.gravity += 0.2
        self.bird[1] = self.birdY
        upRect = pygame.Rect(self.wallx,
                             360 + self.gap - self.offset + 10,
                             self.wallUp.get_width() - 10,
                             self.wallUp.get_height())
        downRect = pygame.Rect(self.wallx,
                               0 - self.gap - self.offset - 10,
                               self.wallDown.get_width() - 10,
                               self.wallDown.get_height())

        if upRect.colliderect(self.bird):
            self.dead = True
        if downRect.colliderect(self.bird):
            self.dead = True

        if not 0 < self.bird[1] < 720:
            self.dead = True

    def updateScreen(self):
        font = pygame.font.SysFont("Arial", 50)
        self.screen.fill((255, 255, 255))
        self.screen.blit(self.background, (0, 0))
        self.wallUpY = 360 + self.gap - self.offset
        self.wallDownY = 0 - self.gap - self.offset
        self.screen.blit(self.wallUp, (self.wallx, self.wallUpY))
        self.screen.blit(self.wallDown, (self.wallx, self.wallDownY))
        self.screen.blit(font.render(str(self.counter), -1, (255, 255, 255)),(200, 50))
        self.screen.blit(self.birdSprites[self.sprite], (70, self.birdY))

    def makeJump(self):
        self.jump = 17
        self.gravity = 5
        self.jumpSpeed = 10

    def restart(self):
        self.wallx = 400
        self.wallUpY = 0
        self.wallDownY = 0
        self.birdY = 400
        self.jump = 0 # A timer for the jump
        self.jumpSpeed = 10
        self.dead = False
        self.sprite = 1
        self.distanceMoved = 0
        self.counter = 0
        self.stepsSinceLastJump = 0
        self.offset = np.random.randint(-180, 300)

    def run(self, network):
        pygame.font.init()

        while self.dead == False:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    sys.exit()
                if (event.type == pygame.KEYDOWN) and not self.dead:
                    #self.makeJump()
                    if self.delay:
                        self.delay = False
                    else:
                        self.delay = True

            if self.delay: time.sleep(0.01)
                    
            # We don't want it going on forever, so set an upper limit
            if self.counter == 10:
                self.dead = True

            self.xdiff = 70 - self.wallx
            ydiffUp = self.birdY - self.wallUpY
            ydiffDown = self.birdY - self.wallDownY
            
            decision = network.feedForward([self.xdiff, ydiffUp, ydiffDown])

            if decision[0] > 0.5 and not self.dead:
                self.makeJump()

            self.updateScreen()
            self.updateWalls()
            self.birdUpdate()
            
            pygame.display.update()

        return self.distanceMoved
```



### 遗传算法 The Genetic Algorithm
```python
from deap import base
from deap import creator
from deap import tools

import random
import time
```

```python
numInputNodes = 3
numHiddenNodes1 = 3
numHiddenNodes2 = 2
numOutputNodes = 1

IND_SIZE = ((numInputNodes+1) * numHiddenNodes1) + (numHiddenNodes1 * numHiddenNodes2) + (numHiddenNodes2 * numOutputNodes)
```

Create a single neural network controller that we will use. We will evolve weights and pass them to this network when we need to evaluate their fitness.

```python
myNet = MLP(numInputNodes, numHiddenNodes1, numHiddenNodes2, numOutputNodes)

```

```python
creator.create("FitnessMax", base.Fitness, weights=(1.0,))
creator.create("Individual", list, fitness=creator.FitnessMax)

toolbox = base.Toolbox()
toolbox.register("attr_float", random.uniform, -1.0, 1.0)
toolbox.register("individual", tools.initRepeat, creator.Individual,toolbox.attr_float, n=IND_SIZE)
```

```python
def evaluate(indiv, myNet, game):
    myNet.setWeightsLinear(indiv)   # Load the individual's weights into the neural network
    game.restart()
    fitness = game.run(myNet) # Evaluate the individual by running the game (discuss)
    return fitness,
```

```python
toolbox.register("evaluate", evaluate)
toolbox.register("select", tools.selTournament, tournsize=3)

toolbox.register("mutate", tools.mutGaussian, mu=0.0, sigma=0.5, indpb=0.1)
```

```python
toolbox.register("population", tools.initRepeat, list, toolbox.individual)
```

```python
stats = tools.Statistics(key=lambda ind: ind.fitness.values)
stats.register("avg", np.mean)
stats.register("std", np.std)
stats.register("min", np.min)
stats.register("max", np.max)
```

```python
logbook = tools.Logbook()

pop = toolbox.population(n=100)
```

Create a single game object. We will use this single object evaluate each of our solutions.


```python
game = FlappyBird()
```


```python
fitnesses = [toolbox.evaluate(indiv, myNet, game) for indiv in pop]
for ind, fit in zip(pop, fitnesses):
    ind.fitness.values = fit
```

```python
NGEN = 10

for g in range(NGEN):
    print("-- Generation %i --" % g)
      
    offspring = toolbox.select(pop, len(pop))
    offspring = list(map(toolbox.clone, offspring))

    for mutant in offspring:
        toolbox.mutate(mutant)
        del mutant.fitness.values
                         
    invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
    fitnesses = [toolbox.evaluate(indiv, myNet, game) for indiv in invalid_ind]
    for ind, fit in zip(invalid_ind, fitnesses):
         ind.fitness.values = fit
    
    pop[:] = offspring
    record = stats.compile(pop)
    logbook.record(gen=g, **record)
```

## 检验算法 Examination of the algorithm
```python
logbook.header = "gen", "avg", "evals", "std", "min", "max"
```

```python
import matplotlib.pyplot as plt
%matplotlib inline
gen = logbook.select("gen")
avgs = logbook.select("avg")
stds = logbook.select("std")
```


```python
plt.rc('axes', labelsize=14)
plt.rc('xtick', labelsize=14)
plt.rc('ytick', labelsize=14) 
plt.rc('legend', fontsize=14)

fig, ax1 = plt.subplots()

line1 = ax1.errorbar(gen, avgs, yerr=stds, errorevery=2)
ax1.set_xlabel("Generation")
ax1.set_ylabel("Mean Fitness")
```

![FPresults](./FPresults.jpg)
## 检验最优解 Examine the best solution

```python
indiv1 = tools.selBest(pop, 1)[0]
toolbox.evaluate(indiv1, myNet, game)
```




