+++
title = 'Igor: Tool for remote development'
date = 2025-07-21T17:41:45+01:00
draft = false
author = 'Dino Ratcliffe'
tags = ["Linux", "Workflow", "Deep Learning"]
+++

## Igor 

Turing my PhD I made extensive use of tools such as Docker and kubernetes for running my experiments. I also decided to train all my agents on my own hardware so this meant constructing my own kubernetes cluster with multiple nodes and many GPUs, this ended up being around 6 nodes with 6 GPUs although two of those GPUs where laptop GPUs mainly used for inference. I also have a fondness for old Thinkpad laptops and at the time was using an old Thinkpad X60 as my main computer for all of my work, this is a computer that had a 32bit core2duo processor at a time when a 6 core i7 was not considered to be out of the ordinary on a laptop. Most of my computer use was not impacted by this given that I tended to use very resource efficient programs anyway, such as dwm for a window manager and mpv for playing youtube videos and vim as an IDE, even compiling latex documents was fine. However developing deep learning models and debugging was never going to be possible on this computer. I really didn't want to give up what I still consider to be the best form factor and keyboard I have ever used in a laptop, and that is despite my moving to an x2100 a couple of years ago. So I decided to get the best of both worlds by developing a tool that would allow me to program locally on the X60 with full docker, and debugging support with all the code running remotely on my machine with multiple titan GPUs. 

![What I still consider to be the best laptop form factor ever created. Perfect screen aspect ratio and the best laptop keyboard, even better than x201.](/images/igor/x60.JPG)

## Requirements and Plan

There were a few requirements that needed to be fulfilled in order for me to be able to effectively develop and run deep learning experiments from such a low powered machine.

1. Ability to build docker container remotely (this would be painful on a core2duo).
2. Ability to edit code locally and then easily run and debug code on remote machine invisibly. Effectively a remote development experience but with code running remotely. I don't like the inherent lag with typing over SSH so as much editing would be done on the local machine. 
3. Ability to run full experiments from machine on own kubernets cluster. 
4. integration into vim so all this can be done easily whilst developing. 

I wanted to develop this in such a way that would make modifications easy and also leverage CLI tools as much as possible. I also needed this to be a simple shim so that I could focus my time on research and not maintaining this codebase. Given these requirements I decided to just construct the tool using simple BASH scripting as it would force me to keep it simple and also allow me to leverage the existing tools that would already be installed on the local and remote machine, such as rsync, ssh and docker. It would also make this relatively portable as most cloud bast machines you can spin up are more than likely to come pre installed with all the dependencies.

## Usage 

### CLI

### NVIM Integration

### Remote debugging

## IGOR Implementation

## Demo
