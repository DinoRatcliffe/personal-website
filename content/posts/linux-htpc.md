+++
title = 'Linux HTPC'
date = 2025-08-22T08:29:12+01:00
draft = true
author = 'Dino Ratcliffe'
tags = ["Linux", "HTPC"]
+++

## Introduction

I've recently started ripping UHD blu-ray discs in order to create a library of high bitrate 4k movies arounc (80Mbps). One issue I have run into is the fact that Plex on my aging smart TV isn't able to keep up with playing the high bitrate files. Given this I have a couple of options; I could transcode the files to a smaller bitrate allowing for playing the movies this would work well given that my TV is able to easily cope with 4k movies on streaming platforms, I wouldn't want to go down to the measly bitrates of streaming platforms as they clearly degrade the quality but there probably is a nice middle ground. However I like bigger numbers so instead decided to not transcode the files but instead setup a HTPC (Home Theater Personal Computer) that can hadle the bitrates from raw blu-ray rips.
## Hardware

### Laptop 

I had a spare laptop lying around that I mainly used for video calls and job interviews as it was my only machine that had a webcam. It also has the advantage of being pretty powerful and probably a good machine for running proton under steam for relatively modern lighter weight games, not the purpose of this project but a nice plus. I had already installed Arch linux on this machine and set it up identically to my main computer complete with all my scripts for [Leader-Based linux workflows](/posts/leader-key-os-workflows). This doesn't include any scripts that particularly help with HTPC interaction but it will be nice for all my muscle memory to work when connecting a Bluetooth keyboard. 

### CEC

CEC (Consumer Electronics Control) is a standard for allowing communication between devices over a HDMI connection. This is used to allow for a single remote control to be used for controlling multiple devices in a home theater, with support for changing inputs, volume and sending button commands to different devices. I believe that some older GPUs did have built in support for this, presumably for the express purpose of HTPCs, however this support has been dropped and I don't believe there are any modern GPUs that have support. Thankfully there are solutions, such as the one I went with using the [PulseEight CEC Adapter](https://www.pulse-eight.com/p/104/usb-hdmi-cec-adapter), this adapter is a USB device that sits between the HTPC and TVs HDMI connection and can inject and read communication on the CEC bus of the HDMI connection. All the great work from PulseEight and the linux community means that setup is as simple as plugging it in and installing a package.

```bash {linenos=false}
yay -Ss libcec
```

Installing this package is technically all that is needed for applications that natively support CEC, I have heard that Kodi natively supports it however I've never actually tested it. For my setup I used some python libraries such as [python-cec](https://github.com/trainman419/python-cec). This leads nicely onto the next section where I integrate CEC control with using a Bluetooth remote.

### Siri Remote

As mentioned above I wanted to have a single remote for control of the HTPC and also controlling aspects of the TV such as turning it off and on and controlling the volume.

## Software

- siri remote
- cec integration
- archlinux
    - install
    - setup
    - auto login
    - auto start Plex
- mpv for youtube

## Bluray disc playback

- libredrive
- makemkv
- vlc

## Improvements

- improve youtube experiance to not need keyboard
This requires qutebrowser (or some other browser) to support running scripts when clicking a link with a matching pattern. 
