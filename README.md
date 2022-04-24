# Bird Migration Visualization-Evolutionary Algorithms
A web project to demonstrate the Evolutionary Algorithm in birds’ adaptation to migration 
 ![Bird Migration Visualization ](https://github.com/yxtao/birdMigration/blob/master/ezgif.com-gif-maker.gif)
## Introduction
Bird Migration Visualization applies Evolutionary Algorithms to populate generations of birds and simulates the survival rate of each generation. It follows these steps: 
 ### Step 1. Initialize a random bird population. Due to the limited time, each bird is defined simply by three variables: starting position, flying direction and speed. 
 ### Step 2. Calculate the fitness of the population, which is measured by if the birds reach the migration destination,
 ### Step 3. Repeat until you reach the goal of the bird's survival rate, which is an input from the player. While stopping criterion is not satisfied, the following steps is processed:
#### Step 3.1. Select parent birds, which are the data from the birds have high fitness score
#### Step 3.2. Perform the crossover to produce offsprings, which means try different combinations of the variables’ values.This may be set to a certain crossover ratio by the player.
#### Step 3.3. Perform mutation to increase the variety of the population, which means change certain values in the offspring. This may be set to a certain mutation ratio by the player.
#### Step 3.4. Calculate the survival rate.
## Link to the deployed game 
https://bird-migration-natasha.netlify.app/
