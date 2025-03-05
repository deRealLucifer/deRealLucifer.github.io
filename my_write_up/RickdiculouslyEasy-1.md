# RickdiculouslyEasy-1
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/accueil.png" >
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/netdiscover.png" >
</p>
the adress of my target => 10.0.4.29
Our next step is to scan our target with NMAP.
```
nmap -sC -sV -o scan.nmap 10.0.4.29
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/scan.png" >
</p>
there are three port open: 80=> server APACHE, 22 => SSH et 21 =>FTP ,9090 
Let's check the server Apache on port 80.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/accueil.png" >
</p>
Starting by checking the ftp service that allow anonymous user and retrieve the first flag.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/ftp.png" >
</p>
We start enumerate all ports if there is any other open ports.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/scan2.png" >
</p>
Let's exeminate the 9090 port.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/9090.png" >
</p>
Then the port 13337 with curl or wget command.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/13337.png" >
</p>
Then the port 60000 with netcat command.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/60000.png" >
</p>
Next enumerating directories, with gobuster tool.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/1.png" >
</p>
we look what is in password folder.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/2.png" >
</p>
We get an other flag with 10 points.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/3.png" >
</p>
Inside password.html I found a password of a user.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/4.png" >
</p>
After we look at robots.txt file.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/5.png" >
</p>
then we get an input field that allow us to execute a ping command and also a second command
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/6.png" >
</p>
listing the contain of /etc/passwd file we discover 3 system users.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/7.png" >
</p>
let's enumerate service running on these ports.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/8.png" >
</p>
Great, Ssh is running on 22222 port, let's loggin with 3 users and **winter** password.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/9.png" >
</p>
We get the third flag with 10 points.
Switching to morty home directory and uploads morty's file on my machine.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/10.png" >
</p>
Great, inside the image there is a password to unzip the journal file
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/11.png" >
</p>
retrieving the journal.txt file that contain the Fourth FLAG with 20 points.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/12.png" >
</p>
Going inside the last user Rick,
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/13.png" >
</p>
we found a safe file that can't be executed on the target machine. So we upload it again and then run it with the last code founded.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/14.png" >
</p>
Great, We get an other flag with 20 points and a hint of Rick password, googling for the rick old bands name
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/15.png" >
</p>
The idea is to brute force the Rick password. First we start by making the wordlist with [crunch tool](https://www.hackingarticles.in/comprehensive-guide-on-crunch-tool/)
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/16.png" >
</p>
Then we make our wordlist by respecting the description.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/17.png" >
</p>
Great, we get the Rick password through brute forcing with hydra tool.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/ssh.png" >
</p>
Next, we logged in and looking for priviledge of Rick user.So it can run any command as a root user.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/18.png" >
</p>
Congratulation, We have a root acces and we can read the last Flag and get the 130 points.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/root_access.png" >
</p>
summurizing all flags founded in different ports.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/RickdiculouslyEasy-1/somme.png" >
</p>
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/gif/salut.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)




