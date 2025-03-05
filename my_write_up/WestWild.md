# WestWild 1.1
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/accueil.png" >
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/netdiscover1.png" >
</p>
the adress of my target => 10.0.4.34
Our next step is to scan our target with NMAP.
```
nmap -sC -sV -o scan.nmap 10.0.4.34
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/scan.png">
</p>
there is one port open: 80=> server APACHE , 22 => ssh and 139,445 => samba
Let's check the server Apache on port 80.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/accueil.png">
</p>
There is no directories that can be listed, gobuster did not retrieve any other file or folder.
Let's enumerate shared directories with samba protocol.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/1.png">
</p>
The folder **wave** has the read only permission . let's login and uploads any files inside this folder.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/2.png">
</p>
Great, we get the first flag and a message from aveng, it may contain something valuable.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/4.png">
</p>
the user wave can reset the aveng password.Reading the Flag file give us a clear way .
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/3.png">
</p>
The flag is base64 encoded file , decoding it we get something valuable (password for wavex user).Login with ssh 
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/5.png">
</p>
Great we have a shell, I tried soo many enumeration like :
- trying to change the aveng password
- create .ssh directory
- evaluate the image bkpro.png with zsteg and strings.
- checking the crontabs
All this tries is mentionned in my note book bellow.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/6.png">
</p>
Great we find an interessting folder that contain the aveng password.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/7.png">
</p>
Great we have a root access. We can read the secong flag.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/root_access.png">
</p>
This is my notebook page.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/West_Wild/West_wild.jpg" width="500" height="450">
</p>
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/gif/lhjar.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)

