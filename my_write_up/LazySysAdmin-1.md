# LazySysAdmin-1
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/accueil.png" >
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/netdiscover.png" >
</p>
the adress of my target => 10.0.4.30
Our next step is to scan our target with NMAP.
```
nmap -sC -sV -o scan.nmap 10.0.4.30
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/scan.png" >
</p>
there are three port open: 80=> server APACHE, 22 => SSH et 139,445 =>samba ,3306 => mysql et 6667 => IRC that is a communication's protocol. 
Let's check the server Apache on port 80.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/accueil.png" >
</p>
First I started with enum4linux to list any shared files or system users, I get one system user: togie.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/1.png" >
</p>
Then Starting our [SMB-enumeration](https://www.hackingarticles.in/smb-penetration-testing-port-445/). I get a shared files.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/33.png" >
</p>
Then running nmap script that are always helpfule to retrieve the CVE details.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/44.png" >
</p>
Finally I run smbmap that was great to show us the permession for every shared file.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/2.png" >
</p>
I get in with smbclient to share directory to see what inside, there is multiple files.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/3.png" >
</p>
 I upload them to my local machine and check every one of them.
 <p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/4.png" >
</p>
Great I found a password that may be is for togie user.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/5.png" >
</p>
Successfully logged in with ssh togie credentials.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/11.png" >
</p>
Next, we look for any way that may help to get high priviledge. 
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/12.png" >
</p>
Great, togie user has the absolute priviledge to run every command as a root. Then we get the proof
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LazySysAdmin-1/root_access.png" >
</p>
This is a small simulation.
[![asciicast](https://asciinema.org/a/HtesvSp2psagfVnmOt7HcE91t.svg)](https://asciinema.org/a/HtesvSp2psagfVnmOt7HcE91t)

<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/gif/motivation.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)


