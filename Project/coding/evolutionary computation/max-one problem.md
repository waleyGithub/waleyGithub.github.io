---
title: OneMax Problem
data: 2021-05-02 16:41:47
---
**OneMax问题是遗传算法的入门问题：如何使一段长度固定的二进制字符串所有位置上数字之和最大。**
下面以长度10为例。

# 所需环境
- [Python 3.9](https://www.python.org/downloads/release/python-394/)
- [DEAP Library](https://deap.readthedocs.io/en/master/)
- [Juypter Notebook](https://jupyter.org)

# 代码
```python
import random
from deap import algorithms, base, creator, tools
```
## 定义个体
```python
creator.create("FitnessMax", base.Fitness, weights=(1.0,))
creator.create("Individual", list, fitness=creator.FitnessMax)
```

```python
toolbox = base.Toolbox()
```

```python
toolbox.register("attr_bool", random.randint, 0, 1)
toolbox.register("individual", tools.initRepeat, creator.Individual, toolbox.attr_bool, n=100)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)
```
## 定义遗传操作
```python
def evalOneMax(individual): 
    return (sum(individual),)
```

```python
toolbox.register("evaluate", evalOneMax)
toolbox.register("select", tools.selTournament, tournsize=3)

toolbox.register("mate", tools.cxUniform, indpb=0.1)
toolbox.register("mutate", tools.mutFlipBit, indpb=0.01)

logbook = tools.Logbook()
```


## 主体部分
```python
pop = toolbox.population(n=300)

fitnesses = list(map(toolbox.evaluate, pop)) 
for ind, fit in zip(pop, fitnesses):
    ind.fitness.values = fit

NGEN = 50

for g in range(NGEN):
   print("-- Generation %i --" % g)
   
   offspring = toolbox.select(pop, len(pop))
   offspring = list(map(toolbox.clone, offspring))
   
   for child1, child2 in zip(offspring[::2], offspring[1::2]): 
       toolbox.mate(child1, child2)
       del child1.fitness.values
       del child2.fitness.values
       
   for mutant in offspring: 
       toolbox.mutate(mutant) 
       del mutant.fitness.values
       
   invalid_ind = [ind for ind in offspring if not ind.fitness.valid] 
   fitnesses = map(toolbox.evaluate, invalid_ind)
   for ind, fit in zip(invalid_ind, fitnesses):
       ind.fitness.values = fit
       
   pop[:] = offspring
```

## 最优个体
```python
best_ind = tools.selBest(pop, 1)[0]
print("Best individual is %s" % (best_ind)) 
print("With fitness %s" % (best_ind.fitness.values))
```
Best individual is [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] With fitness 100.0

## 记录数据

```python
stats = tools.Statistics(key=lambda ind: ind.fitness.values)
```

```python
import numpy 
stats.register("avg", numpy.mean) 
stats.register("std", numpy.std) 
stats.register("min", numpy.min) 
stats.register("max", numpy.max)
```
{'avg': 98.19, 'std': 1.2438783434618248, 'min': 93.0, 'max': 100.0}

```python
record = stats.compile(pop)
print(record)
```

```python
logbook = tools.Logbook()
logbook.record(gen=0, evals=30, **record)
```

```python
logbook.header = "gen", "avg", "evals", "std", "min", "max"
```

```python
print(logbook)
```

| gen | avg | evals  |std  | min | max |
| ---- | ---- | ----- | ----- | ----- | ----- |
|   0  |  98.19 |  30  | 1.24388 | 93  |100|

## 数据可视化

```python
import matplotlib.pyplot as plt 
%matplotlib inline
```
```python
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
Text(0, 0.5, 'Mean Fitness')

![oneMax](./oneMax.png)
