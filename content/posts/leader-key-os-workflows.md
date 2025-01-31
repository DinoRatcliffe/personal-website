+++
title = 'Leader-Based Linux Workflows'
date = 2024-03-18T19:00:41Z
draft = false
author = 'Dino Ratcliffe'
+++
## Introduction

I've configured my Linux workflow with a leader-based keyboard shortcut system, inspired by the Vim text editor, utilizing a single key (the "leader") for various custom actions. I've integrated this with the powerful dmenu tool, making it a breeze to access a list of applications or actions based on a given key combination. The adoption of a leader-based system offers numerous advantages, including enhanced productivity and efficiency. This is achieved by allowing users to execute complex tasks more swiftly, as frequently used commands can be chained together using the leader key. Furthermore, this approach simplifies hand positioning, enabling users to perform operations with more comfortable key combinations. Consequently, this can lead to reduced strain during lengthy work sessions and increased overall ease of use. Lastly, the leader-based system significantly improves discoverability and memory of keyboard shortcuts. By assigning commands to intuitive sequences, users are better equipped to recall and learn new shortcuts, ultimately streamlining their workflows.

{{< dinoai-figure >}}
<video width=100% autoplay loop muted controls>
    <source src="/video/citation-automation.mp4" type="video/mp4">
    <source src="/video/citation-automation.ogg" type="video/ogg">
    Your browser does not support the video tag
</video>
<figcaption>
Demonstration of leader based searching an opening of publications in library.
</figcaption>
{{< /dinoai-figure >}}

## Custom keyboard setup

In order to make this setup work well I have remaped a number of keys to improve erganomics, this includes useing `somethingtodo` to change the behaviour of keys when corded vs pressed. The main changes I have made are:

- The caps lock key is now the leader key when pressed once opening dmenu, however if chorded with another key it acts as a ctrl key, this allows for `C-c` etc when needing to quit processes etc.
- The space key acts as the super key when corded with another key, this allows for window manager commands such as switching tags and moving focus to other windows to remain snappy without much hand movement.

## Demonstartions

Here I will show a few workflows that have been greatly improved by switching to leader based shortcuts with heirarchical key combinations. I'll start with some simple tasks and then give some examples of more complex automations.


### Open Terminal
`<leader>j`: This command is the most used as it opens a terminal, thus I mapped it to the main key on the home row for my dominant hand.

### Wireless connections
`<leader>c` will open up the connection menu that maps single keys to connection based tasks. This is the power of cording as typing `<leader>` then `c` then `b` individually for the logical `<leader>` connections bluetooth makes much for sense than a single corded value of `C-b` and is much easier to type than trying to cord `C-ba` or `C-a` `C-b`.  The following are all the options within the connections menu.


`<leader>cb`: for handling bluetooth connections to devices. This opens a menu that shows a list of paired devices that can be selected through fuzzy search. As soon as you have typed enough letters that only one option is left then that option is selected and the laptop tries to connect to the selected device.

`<leader>cw`: for handling wifi connections. As with bluetooth devices this will show a list of previously connected wifi networks, again when one option remains from your input the laptop will attempt to connect to the given network.

`<leader>ch`: This command connects to my android phone and automatically turns on hotspot sharing, this allows me to connect my laptop to the internet through my phone without having to take my phone out my pocket and enable the hotspot manually. The hotspot will also automatically be turned off as soon as the laptop sleeps or is shutdown. More details of how I set this up can be found here. TODO create hotspot post.

### Audio Output Switching

Similar to the connection automation above we can also apply this to audio outputs, by hitting `<leader>a` a list of current audio output devices is shown. You can then just start typing the name of an output device and as soon as only one option remains the computer will start outputting all audio to that device.

### Display output modes

#### Docked
#### Dual
#### Laptop

### Search Engines

One important aspect of this system is that many subactivities can be elevated to first class actions. This includes actions such as searching the web, instead of having to open up a browser to conduct as websearch all these are elevated to be accessed anywhere in the OS. 

I have a notion of general wesearching and specialised websearching. General websearching can be accessed throght the `<leader>s` combination and gives an array of search providers these are:

`<leader>ss`: Google, this is my most used search engine thus it recieves the "power" key of being a double tap of the key that opens the search menu. This is a paradigm I try and follow with many of my leader menus.

`<leader>sa`: Arch Wiki, this is another heavily used search engine that conducts a search of the Arch Linux wiki.

`<leader>sm`: Google Maps, this allows for quick lookup of addresses and searching for various places around London. 

This submenu has many more search providers with similar logical key combinations.

The other form of searching I refer to is specialised search, these searches are not grouped under the `<leader>s` menu but instead reside in their appropriate sub-menus. Such as searhing arxiv or google sholar, these are actually under a citation submenu for handling my library of acedemic references. A google scholar search can be done via `<leader>Cs` and Arxiv through `<leader>Ca`.

### SSH

{{< dinoai-figure >}}
<video width=100% autoplay loop muted controls>
    <source src="/video/ssh-automation.mp4" type="video/mp4">
    <source src="/video/ssh-automation.ogg" type="video/ogg">
    Your browser does not support the video tag
</video>
<figcaption>
Demonstration of leader based opening of ssh connections.
</figcaption>
{{< /dinoai-figure >}}

Another frequent action that I perform is opening an ssh connection to a remote host. So this action was added to another home row key `<leader>;` this gives a list of remote machines populated by a file called `/etc/hosts` that I populate with hostnames of frequently accessed machines. In my case:

- enterprise
- apollo
- heart-of-gold
- psp

as each of these begins with a unique character it mean they can all be accesed with three key presses, such as:

`<leader>;e`: for enterprise or `<leader>;h` for connecting to heart-of-gold. This results in a terminal window opening just like with `<leader>j` but with an ssh connection already started to the selected machine.

### Light control

Another frequently used shortcut is controlling wifi-connected devices. When at my desk I got annoyed by having to fumble around behind the desk in order to switch on my desk lamp. By adding a wifi connected bulb I was able to map a keyboard combination to controlling the desk lamp and other connected lights. This means that I can now toggle on or of my desk lamp using `<leader>ld` or the hallway lamp using `<leader>lh`.

### Citations

{{< dinoai-figure >}}
<video width=100% autoplay loop muted controls>
    <source src="/video/citation-automation.mp4" type="video/mp4">
    <source src="/video/citation-automation.ogg" type="video/ogg">
    Your browser does not support the video tag
</video>
<figcaption>
Demonstration of leader based searching an opening of publications in library.
</figcaption>
{{< /dinoai-figure >}}

As mentioned earlier I have a group of actions associated with handling citations, these actions are mainly for searching through my library of acedemic references performing searches and one that attempts to find, download and open a pdf file of a given title of a paper (a bit hit or miss to be honest).

Papers are mostly added through shortcuts added to my browser and pdf viewer to add currently viewed papers. However one aspect that is highly automated is opening papers currently in my library. This can be done throught the `<leader>Cc` combination, this gives a list of papers that can be searched through using fuzzy finding, these papers are of the form:

`[Ziegler2019] Ziegler, Daniel M. et al. "Fine-Tuning Language Models from Human Preferences" (2019) [pdf] | llm-rl`

This includes the cite tag, lead author, title, year and the tags given to the paper, meaning that any of these can be used for the fuzzy finding search. Once a paper has been selected a few steps are triggered:

1. The paper is opened in the default pdf reader using `xdg-open`
2. A note corresponding to this paper is either opened if it already exists or created.
3. A chat is opened with an LLM model with the paper given as the context, if a previous conversation has already been started then this is the chat that is opened.

The most interesting of these is the LLM chat that is automatically opened or created. This allows for questions to be asked about the paper with the model recieving full context, to be honest the current output of these models is hit or miss in this particular usecase with anything beyond simple questions requiring further investigation to ensure accuracy. It has however been usefull for brainstorming new extensions or applications to specific pieces of work, along with getting psudo code for various equations in papers.

I have a few more automations around reading papers and taking notes especially with an eink device that I will document in a future post.

### LLM

{{< dinoai-figure >}}
<video width=100% autoplay loop muted controls>
    <source src="/video/llm-automation.mp4" type="video/mp4">
    <source src="/video/llm-automation.ogg" type="video/ogg">
    Your browser does not support the video tag
</video>
<figcaption>
Demonstration of leader based interaction with an LLM (Large Language Model).
</figcaption>
{{< /dinoai-figure >}}

Finally I have a few commands for interacting with LLMs, these are accessed using `<leader>L` allowing for a question to be asked to an LLM, with a chat being opened with its response. Other commands are baked into keyboard shortcuts for various applications such as Qutebrowser for opening an LLM chat with a webpage as context or in Zathura (pdf viewer) with the given pdf document as context. Again these are going to be extended in the future as I introduce mulit-modal models incorporating audio and images into my workflow. 

Multi-modal support is not currently up and running as I am only using open source models running on my own hardware with [mudler/LocalAI](https://github.com/mudler/LocalAI) to replicate the OpenAI api, this allows for any application or libary designed for use with the OpenAI api to be used with open source models.

## Light Implementation details

Most of the automations given above are just a collection of simple bash scripts that combine and launch tools created in the unix philosophy of doing one thing and doing it well. Below is an example of the general search sub menu for `<leader>s`.

```bash
#!/bin/bash

declare -A cmds=(["a: Arch Wiki"]="https://wiki.archlinux.org/index.php?search="
                 ["n: Nix Wiki"]="https://nixos.wiki/index.php?search="
                 ["A: Archive Org"]="https://archive.org/search?query="
                 ["e: Ebay"]="https://ebay.co.uk/sch/i.html?_nkw="
                 ["i: IMDB"]="https://imdb.com/find/?q="
                 ["y: Youtube"]="https://www.youtube.com/results?search_query="
                 ["s: Google"]="https://google.com/search?q=" 
                 ["r: Reddit"]="https://reddit.com/r/" 
                 ["m: Maps"]="https://google.com/maps/search/" 
                 ["b: Broadcast"]="https://acestreamsearch.net/en/?q=" )


dmenu_string=""
for key in "${!cmds[@]}"; do
	dmenu_string="$dmenu_string$key\n"
done

selection=$(echo -e $dmenu_string | dmenu -x -n -l 10 -p "Engine:")
cmd=${cmds[$selection]}
search=$(xclip -o | tr -d '\n' | tr -d "'" | dmenu -p "Search:")

echo "qutebrowser '$cmd$search'"
eval "qutebrowser --target window '$cmd$search'"
```

As you can see we declare a set of commands with urls depecting how to perform searches on these various sites. We can then pass these possible options into dmenu that shows the options avaliable to the user, note that the `-x` flag indicates that when there is one option left to automatically select it, this is important for allowing single key presses to move onto the search query intput.

Also when getting the query from the user I also pipe in the contents of the clipboard using `xclip -o`, this allows for easy searching of highlighted text by simply pressing `<leader>ss` and then the enter key. This is especially useful when I want to search for an obscure error message without having to copy and paste.

Finally I pass the url plus the query to qutebrowser in order to perform the search, this could be improved by simply using xdg-open to use the users default browser. Some of the scripts are slightly involved than this but not by much, it's important that these scripts are kept simple in order to allow for quick customisation and extension without too much overhead in making sure there aren't conflicts between scripts.

## Conclusion

The adoption of a leader-based keyboard shortcut system has significantly enhanced my Linux workflow, providing improved productivity, efficiency, discoverability, and memory of commands. By integrating this system with dmenu, I can easily access a list of applications or actions based on intuitive key combinations. Remapping keys such as the caps lock and space keys has further simplified hand positioning and streamlined various tasks. The ability to chain commands together using the leader key has also allowed for the creation of complex workflows that can be executed swiftly and easily. Overall, this leader-based system has transformed my workflow, making it more comfortable, efficient, and enjoyable to use.
