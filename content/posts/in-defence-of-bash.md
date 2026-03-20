+++
title = 'In Defence of BASH'
date = 2025-07-08T20:49:20+01:00
draft = true
author = 'Dino Ratcliffe'
tags = ["Linux", "Workflow"]
+++

## BASH

I think bash scripting tends to get a bad wrap when it comes to creating software to improve workflows, or for any purpose for that matter. Often it is sited as an outdated tool that has been superseded by more modern alternatives. However I believe that the simplicity of BASH combined with the unix philosophy can allow for rapid development of new tools based on existing highly reliable components.

## Unix Philosophy

The Unix philosophy in my understanding revolves around the idea of doing one thing and doing it well, whilst defining a semi-consistent input output flow allowing for compatibility. This gives us the ability to pipe these programs together to perform more complex tasks. Something like the following where we can list the contents of a file and then search for a specific string:

```bash {linenos=false}
cat some-file.txt | grep foo
```

This is extremely powerful and given that so many great tools exist following this philosophy is what gives BASH scripting such power.

## Avoiding complexity when tools already exist

There is often this idea that BASH is not a good choice for scripting due to many legitimate concerns, such as lack of error handling and difficulty in debugging.

## Personal applications

I have made extensive use of bash scripting for improving workflows for everyday interaction with my PC. This includes creating a tool for aiding in remote deep learning development ([IGOR](/posts/igor)) and creating a new method of user interface with my PC outlined in my post on [leader based workflows.](./content/posts/leader-key-os-workflows.md). Both of these tools could have been constructed using a more typical programming language such as python, rust or even C, however given that they make extensive use of CLI tools it made sense to keep the orcestration as simple as possible. This you are forced into when using exclusivly bash as it make you consider the complexity that you are adding, as well as avoiding the code smell of calling a CLI tool externally from with a python script. 
