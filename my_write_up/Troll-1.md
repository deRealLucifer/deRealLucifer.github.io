# Troll-1
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/1.png">
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/netdiscover.png">
</p>
the adress of my target => 10.0.4.26
Our next step is to scan our target with NMAP.
```
nmap -sC -sV -o scan.nmap 10.0.4.26
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/scan.png" >
</p>
there are three port open: 80=> server APACHE, 22 => SSH et 21 =>FTP(remote procedure call)
Let's check the server Apache on port 80.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/1.png">
</p>
Starting our enumeration with FTP service,it allow anonymous login.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/2.png">
</p>
Getting the file lol.pcap before we open it with wireshark. We try to extract strings it may contain an important word.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/3.png" width="800">
</p>
then we get an import word that may serve us as directory.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/4.png">
</p>
then we get an other file roflmao, we upload it and check strings inside it.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/5.png">
</p>
It is may be a directory.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/6.png">
</p>
then we get important files that can serve us to get ssh credentials. First I make a list of username and list of passswords.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/7.png">
</p>
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/8.png">
</p>
Then we brute force the ssh login with these wordlists. 
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/ssh.png">
</p>
Great we get the username and the password, so we logged in and try to find any interessting information. The version of the kernel is may be vulnerable.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/11.png">
</p>
I make a research in metasploit .
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/12.png">
</p>
Then I upload the exploit to my target machine and compile it then execute it .
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Troll-1/13.png">
</p>
Great we have root access.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/gif/dance.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)




















