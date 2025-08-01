+++
title = 'Rl Training Dag'
date = 2021-01-11T21:06:01+00:00
draft = false
tags = ["Research", "Workflow"]
+++

## Introduction
During my PhD I conducted many experiments that would take multiple hours to run. This included experiments that required multiple runs in order to assess their average performance. This is done to evaluate the effect of the networks initialisation on training and also to account for the stochastic nature of Reinforcement Learning (RL) problems.

In this article I outline the process I have developed in order to automate this whole process with Kubernetes and Argo. This allows me to run experiments end-to-end with evaluation and visualisation averaged across multiple runs with a single command.

## Old Method

At the very beginning of my PhD I already had been using both git and docker for many of the projects I was working on. This meant that I was easily able to version the different experiments I was running and also have them run within containers. However, I had not done much in the area of developing experiment pipelines for the various processes throughout an experiment such as, training, evaluating and plotting the results. I begun by using simple bash scripts in order to chain these steps together. This was very familiar to me as I have written a variety of bash scripts in the past for automating various aspects of Linux. 

This approach has a few main drawbacks, the first being that each script would become very unwieldy for large experiments that contained a large number of individual steps. This made modification difficult and increased the chances of bugs when modifying the experiment. The other main drawback was the fact that all of the steps would be run on the single machine, this reduced the utilisation of certain resources such as GPUs. It would be beneficial to be able to run training on machines with GPUs and then evaluation and plotting can be done on less powerful machines entirely on the CPU. These are the problems that I aimed to solve by moving over to a Kubernetes cluster with Argo.

## Kubernetes & Argo

Although I had been looking into different approaches for running experiments in a better way I didn't actually decide on Kubernetes until I had the opportunity to use it when working at Microsoft Research. There I conducted many experiments on a cluster using Kubernetes and learnt how they had setup running their experiments. It was this experience that gave me the confidence to commit to Kubernetes for the rest of my PhD.

After the internship had finished I setup a personal Kubernetes cluster at home using a few machines that I had been using for my experiments. This consisted of 6 machines and 4 GPUs, composed of 2 high powered nodes with 2 GPUs each and then lower powered nodes just containing CPUs.

Kubernetes splits tasks into pods, with each pod consisting of a Docker container and a command to run. This can then be submitted to Kubernetes with pods being scheduled based on their defined requirements and the available resources of each node. This allows for many pods to be submitted to the cluster and then run when resources become available. With Kubernetes alone it is not possible to have dependencies between pods. It would be desirable to split the training and evaluation of an agent across many different pods. This would allow for the agent to be trained on high powered GPU nodes and then evaluated on lower powered nodes whilst the GPUs can be utilised to train more agents. This is where Argo provides a solution. With Argo, workflows can be defined that allow for pods to have dependencies on the completion of other pods. This means that evaluation pods can be submitted to the cluster but not scheduled until the agents have been trained. In the following section I outline a typical experiment setup that I would use in order to conduct an averaged multirun experiment end-to-end with a single command.

## Experiment Setup

{{< dinoai-figure >}}
<pre style="width: fit-content; margin: auto; font-family: inherit;">
   N RUNS                                                         
  ╔══════════════════════════════════════════════════════════════╗
  ║ ╔══════════════════╗                                         ║
  ║ ║ TRAIN DEEP       ║                                         ║
  ║ ║ RL AGENT    ┌───────────┐                                  ║
  ║ ║             │ TRAIN CSV ├────────────────────┐             ║
  ║ ║             └───────────┘                    ▼             ║
  ║ ║ ┌─────────────┐  ║                   ╔═══════════════╗     ║
  ║ ╚═│ SAVED AGENT │══╝                   ║ PLOT FINAL    ║     ║
  ║   └──────┬──────┘                      ║ TRAINING      ║     ║
  ║          │                             ║ DATA          ║     ║
  ║          ├─────────────────────┐       ║┌─────────────┐║     ║
  ║          │                     │       ╚│ TRAIN PLOTS │╝     ║
  ║          │                     │        └─────────────┘      ║
  ║          ▼                     ▼                             ║
  ║  ╔════════════════╗    ╔═════════════════╗                   ║
  ║  ║ AGENT          ║    ║ AGENT PLAY      ║                   ║
  ║  ║ EVALUATION     ║    ║ EXAMPLES        ║                   ║
  ║  ║  ┌──────────┐  ║    ║ ┌─────────────┐ ║                   ║
  ║  ╚══│ EVAL CSV │══╝    ╚═│ PLAY VIDEOS │═╝                   ║
  ║     └────┬─────┘         └─────────────┘                     ║
  ║          │                                                   ║
  ║          │                                                   ║
  ║          │                                                   ║
  ║          ▼                                                   ║
  ║  ╔════════════════╗                                          ║
  ║  ║ PLOT           ║                                          ║
  ║  ║ EVALUATION     ║                                          ║
  ║  ║                ║                                          ║
  ║  ║ ┌────────────┐ ║                                          ║
  ║  ╚═│ EVAL PLOTS │═╝                                          ║
  ║    └────────────┘                                            ║
  ║                                                              ║
  ║ ┌────────┐ ┌────────┐ ┌──────┐ ┌───────┐ ┌───────┐ ┌───────┐ ║
  ╚═│ SAVED  │═│ PLAY   │═│ EVAL │═│ TRAIN │═│ TRAIN │═│ EVAL  │═╝
    │ AGENTS │ │ VIDEOS │ │ CSVS │ │ CSVS  │ │ PLOTS │ │ PLOTS │  
    └────────┘ └────────┘ └──┬───┘ └───┬───┘ └───────┘ └───────┘  
                             └────┬────┘                          
                                  ▼                               
                          ╔═══════════════╗                       
                          ║ OUTPUT STATS  ║                       
                          ║ OVER ALL      ║                       
                          ║ RUNS          ║                       
                          ║┌─────────────┐║                       
                          ╚│ AVERAGE CSV │╝                       
                           └──────┬──────┘                        
                                  ▼                               
                          ╔═══════════════╗                       
                          ║ PLOT STATS    ║                       
                          ║ OVER ALL      ║                       
                          ║ RUNS          ║                       
                          ║┌─────────────┐║                       
                          ╚│AVERAGE PLOTS│╝                       
                           └─────────────┘                        
                                                                  
</pre>
<figcaption>
Diagram showing the separate tasks conducted on the Kubernetes cluster for an example experiment.
</figcaption>
{{< /dinoai-figure >}}

In Figure 1 I give an example of a workflow that I would use for training a set of Deep RL agents. Each solid square represents individual pods run on the cluster with connections representing dependencies. The tasks within the pods do not have any direct communication with previous or future tasks, instead they are written to load required data from disk written by the previous tasks. This written data is given by the white circles. For example, in the top left where we have the main training pod the agent checkpoint is saved to disk. This is then loaded by the evaluation pod. This pod also writes logs to Tensorboard and CSV that can then be read for plotting. It is also possible to have multiple runs complete and then automatically average the results over those runs and plot the appropriate data.


An example of the command used to begin an experiment is given below.

```bash {linenos=false}
argo submit ppo.yaml --name ppo-breakout -p game=breakout -p outdir=/storage/ppo-breakout/example -p epochs=300000
```

These workflows are defined within YAML files that outline the individual tasks and their dependencies. These can then be submitted to the Kubernetes cluster using the Argo Command Line Interface (CLI). Each parameter of an experiment can also be set through the CLI, in this case epochs and the game being played, others could be learning rate and batch size etc.

## Conclusion

I have shown how I use Kubernetes with Argo in order to run large scale experiments. This approach allows me to define complex experiment pipelines with dependencies between a variety of tasks. This gives me the ability to run end-to-end experiments without needing any interaction after starting the experiment. This means an experiment can be started and then many hours later I can navigate to a directory that contains all logs, saved models and final plots of the results.

This method also opens up the possibility of having conditional statements on the creation of pods. This would allow for situations where an agent is only evaluated if a certain performance threshold is met. This is not something I have utilised in my experiments but could save resources when training very large numbers of agents.
