+++
title = 'Igor: Tool for remote development'
date = 2025-07-21T17:41:45+01:00
draft = false
author = 'Dino Ratcliffe'
tags = ["Linux", "Workflow"]
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

IGOR is built around the idea of host_groups, this is a set of SSH-able hosts along with their local directory location to store and mount the code in docker. There is a set host_group called dev that is used for development and debugging of the code. 

This notion of having multiple hosts is a hack for allowing experiments to be run without a kubernetes cluster, something that was needed at one point in my career but is hopefully not something I have to deal with ever again. However you will see various properties of IGOR that reflect the need to manually start experiments across many machines simply using SSH, host_groups is one of these properties but we will focus on the dev host_group with a single machine although IGOR can run all commands simultanously over N number of hosts.

### Commands

#### Push
The push command allows you to easly rsync the latest code locally to all machines in a host_group like so:

```bash
igor push --host_group aws
```

This will rsync the code to all of the machines listed in the aws host_group if defined in the config. If no host group is given then the dev host_group is used, allowing for pushing of the code to your remote development machine using:

```bash
igor push
```

#### Docker
This is the most complicated command in igor with many subcommands for dealing with building and running docker containers remotely. The subcommand are detailed below:

- `igor docker build`

This command builds the dockerfile defined in the config on the remote machines in the given `--host_group` in the case of the command above no host_group is given so the `dev` host group is used by default. The docker build command will only be run if there is an update to the dockerfile or any of the files defined in `docker_rebuild_files`.

- `igor docker clean`

This command will stop and remove all running docker containers for the current project for the given host_group.

- `igor docker setup`

This is the most used command as it acts as a shorthand for pushing the new code building the docker image (if needed) and runn

- `igor docker setup`

This is the most used command as it acts as a shorthand for pushing the new code building the docker image (if needed) and running a container using that image with the codebase mounted and the ports for debugging exposed. Again the port to expose for debugging is given in the config using `debug_port`. 

- `igor docker exec [command]`

This allows you to run a bash command with the projects docker container running on remote machines in the given host_group. If there are more than 1 machines then you will recieve back multiple results. This is useful during developement to do quick commands to check various commands remotly, very handy for debugging missing dependencies etc.

- `igor docker repl [repl_cmd]`

This is a very powerfull command when developing remotely as it allows you to open a repl within a remote docker container over ssh. This works will most repl's, obviously in my case this would be ipython and this is set as my default repl in the config under `repl_cmd`. However it is also usefull for getting a quick bash shell within a remote docker container by running `igor docker repl bash` as if you define a command for the repl the default is not used.

#### Deprecated functionality

I have had to work in situations where training was manually started over SSH connections on many machines without the benefits of orchestration utilities such as kubernetes. In this case I expanded IGOR to allow for this usecase however now have no need for it. This resulted in the notion of experiments in IGOR that would allow for you to use tags within host_groups to run different commands on different machines in remote docker containers. I'll give a short showcase below but hopefully this is something I never have to use again.

```bash
{
    "name": "train",
    "default_host_group": "cluster",
    "commands": [{"cmd": "echo $host_idx $n_hosts $manager_0_ip",
                "tag": "manager"},
               {"cmd": "echo $host_idx $n_hosts $manager_0_ip",
                "tag": "worker"}]
}
```

Above is a simple example of an experiment file it allows for running commands for each tag of a host_group that can be defined in the config as below:

```bash
{
    "user": "dino",
    "debug_port": 5556,
    "repl_cmd": "ipython",
    "host_groups": {
        "cluster": {
            "hosts": [
                {"host": "apollo",
                 "dir": "/home/dino/data2/dev_dsk",
                 "tag": "manager"},
                {"host": "enterprise",
                 "dir": "/home/dino/dev_dsk",
                 "tag": "worker"}
            ]
        }
    }
}
```

Various attributes are avaliable when defining a command to run on a host as given above:

- `$host_idx` The index of this specific host
- `$n_hosts` The total number of hosts in the host_group
- `${tag}_{idx}_ip` The ip address of any host under a specific tag

This ends up being the minimal information needed in order to be able to start an MPI job across all of the machines in a given host_group.

Finally actually starting an experiment can be done like so:

```bash
igor experiment run --host_group cluster training
```

What this does is it will start a new tmux session with a page per host in the host_group and run the appropriate command. Before running the command it will rsync the latest code to all the hosts rebuild the docker images if necessary and start docker containers with the lates images tagged with the experiment id. 

### NVIM Integration

Having these short and sweet commands it becomes very easy to integrate these commands into NVIM or VIM, I have a few configs setup for igor given below:

```lua
-- Igor commands
vim.keymap.set("n", "<leader>ip", ":! igor push<CR>")
vim.keymap.set("n", "<leader>idc", ":! igor docker clean<CR>")
vim.keymap.set("n", "<leader>idb", ":! igor docker build<CR>")
vim.keymap.set("n", "<leader>ids", ":! igor docker setup<CR>")
```

I also make use of the iron plugin for having a repl within nvim and I have set this so that it will use the remote docker repl if in an igor project.

### Remote debugging

This is for me the most powerfull aspect of this whole setup, by combining the busy work of pushing building and running the code above with vimspector for VIM we are able to now setup seamless debugging within remote docker containers.

This is relativly seamless with a simple vim command that can push and build the code remotly (if needed) and run the debugger and attach locally. An example of debugging a simple python script completly remotly is given below:



## Final thoughts

The use of IGOR and developing remotely with as much of the actual coding being done locally has made development much more enjoyable. This allows for low latency text editing and git management as it is done locally not over ssh, however retaining the ability to use more powerful remote machines when running or debugging the actual code.

Another key benefit of this approach is that your dockerfile tends to never be out of date as it is always within this image that you are running and debugging the code, this also reduces that gap between how the code is run using kubernetes within the docker image and how you are developing the code. 

## Appendix

### IGOR Configuration

A simple config file for IGOR is given below and is contained in the project root under the `.igor/config.json` path:

```JSON
{
    "user": "dino",
    "debug_port": 5556,
    "docker_rebuild_files": [ "requirements.txt" ],
    "dockerfile": "dockerfile",
    "repl_cmd": "ipython",
    "host_groups": {
        "dev": {
            "hosts": [
                {"host": "apollo",
                 "dir": "/home/dino/data2/dev_dsk"}
            ]
        }
    }
}
```

### Vimspector Configuration

The .vimspector config I use is given below:

```bash
{
  "adapters": {
    "python-remote": {
      "port": "5556",
      "host": "apollo",
      "launch": {
        "remote": {
          "host": "apollo",
          "runCommand": [
            "docker", "exec", "dino-project-dev",
            "/venv/project/bin/python -m debugpy --log-to 'debug_log' --listen 0.0.0.0:5556 --wait-for-client", "%CMD%"
          ]
        },
      },
      "attach": {
        "remote": {
          "host": "apollo",
          "pidCommand": [
            "docker exec dino-project-dev pgrep -f", "${fileBasename}"
          ],
          "attachCommand": [
            "python", "-m", "debugpy", "--listen", "0.0.0.0:5556",
            "--pid", "%PID%"
          ]
        }
      }
    }
  },
  "configurations": {
    "remote-launch": {
      "adapter": "python-remote",

      "remote-request": "launch",
      "remote-cmdLine": [
        "/workspace/${fileBasename}"
      ],
      "configuration": {
        "request": "attach",
        "justMyCode": "false",
        "pathMappings": [
          {
            "localRoot": "${workspaceRoot}",
            "remoteRoot": "/workspace"
          },
          {
            "localRoot": "/venv",
            "remoteRoot": "/venv"
          }
        ]
      }
    }
  }
}
```

This above configuration unfortunatly has quite a few magic values as I haven't fully finished my work on having this automatically generated from the igor config. However I put it here as it took me awhile to figure out and there weren't many examples online that I could base this on, hopefully someone may find this usefull.

