
const Intro = () =>{
    return (
        <div className="container bg-dark mt-5" style={{height:"800px", border: "1px solid white"}}>
            <div className="h4 d-flex justify-content-center font-weight-bold mt-3">
                Bird Migration Visualization 
            </div>
            <div className="h4 d-flex justify-content-center">
                 Evolutionary Algorithms in birds’ adaptation to migration 
            </div>
            <div className="h5 d-flex justify-content-left pt-3" style={{overflow:"auto", height:"600px"}}>
                <ul>
                    <li>
                    Darwin's Theory of Evolution-
                    Individuals with traits that enable them to adapt to their environments will
                    <ul>
                        <li>
                           survive
                        </li>
                        <li>
                          have more offspring who inherit those traits
                        </li>
                    </ul>
                    </li>
                    <li>
                        Evolutionary Algorithms 
                        <ul>
                            <li>
                            create optimization procedures to solve problems
                            </li>
                            <li>
                            require a large amount of trials to gather, select and mutate the produced data to achieve the desired goals
                            </li>
                            <li>
                            have four elements: <span className="text-danger">Population, source of variation, reproductive fitness, selection </span> 
                            </li>
                            <li>  Components : <br/>
                                 Genetic Algorithms– invented by John Holland in the 1960’s <br/>
                                 Evolution Strategies– invented by Ingo Rechenberg in the 1960's         
                            </li>
                        </ul>
                    </li>
                    <li>
                    Steps :
                    <ol>
                        <li>
                        <div className="text-success">Initialize a random population</div>
                        Each bird is defined simply by three variables: starting position, flying direction and speed
                        </li>
                        <li>
                        <div className="text-success">Calculate the fitness of the population</div>
                        In the game it is measured by if the birds reach the migration destination
                        </li>
                        <li>
                        <div className="text-success"> Repeat until you reach the goal   </div>
                        In the game it is the bird's survival rate. 
                        <p>While stopping criterion is not satisfied, the following steps is processed : </p>
                            <ul>
                                <li>
                                <div className="text-primary">3.1. Select parents </div>
                                 Select the data from the birds have high fitness score
                                </li>
                                <li>
                                <div className="text-primary"> 3.2. Perform the crossover to produce offsprings </div>
                                Try different combinations of the variables’ values from the selected data
                                </li>
                                <li>
                                <div className="text-primary">  3.3. Perform mutation to increase the variety of the population </div>
                                Change certain values in the offspring. Each offspring inherits traits from the parents,
                                which are starting position, flying direction and speed. Randomly pick one of the traits and replace it with an arbitrary value.
                                </li>
                                <li>            
                                <div className="text-primary">  3.4. Calculate the survival rate</div>
                                Set the next input to be : crossover number counts + mutation number counts + clone counts
                                 (Evolutionary Algorithms allow some children to be exact copy of parents)
                                </li>
                            </ul>
                        </li>
                    </ol>
                    </li>
                </ul>
            </div>
        </div>
    )}

export default Intro
