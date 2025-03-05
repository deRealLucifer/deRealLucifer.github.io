# LAMPSecurity-5
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/accueil.png" width="840" height="260">
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/netdiscover.png" width="800" height="200">
</p>
the adress of my target => 10.0.4.13

Our next step is to scan our target with NMAP.
**nmap -sC -sV -o scan.nmap 10.0.4.13**
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/scan.png" width="800" height="500">
</p>
there are three port open: 80=> server APACHE, 25 => SMTP, 22 => SSH, 3306 => mysql, 139,445 => SAMBA et 110 =>pop3
Let's check the server Apache on port 80.
I get the root access with two different ways :
##### first way
At the the Blog menu there is a admin panel authenticity.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/admin_panel.png" width="800" height="230">
</p>
the first thing I do is brute forcing the credentials with Hydra'tool.
```
hydra -l admin -P /usr/share/wordlists/rockyou.txt 10.0.4.13 http-post-form "/~andy/data/nanoadmin.php?:user=
^USER^&pass=^PASS^:wrong Username or Password" -V -t 10
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/hydra.png" width="800" height="230">
</p>
Great, I get the user(admin) and password(shannon).After we authenticate with them and access the admin priviledge zone, there is
a possibility to add a new php page,that give me the power to upload a reverse shell successfully.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/5.png" width="800" height="350">
</p>
After I saved the page, I run it and the shell is sended bask to my listener.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/6.png" width="800" height="300">
</p>
I get the remote access to the target as a **apache** user,I check the version of the OS it seems to be vulnerable to local priviledge escalation.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/7.png" width="800" height="230">
</p>
metasploit is the best tool for discovering exploits, 
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/searchsploit.png" width="800" height="230">
</p> 
So, I upload it,compile it and send it to my target to execute it.And Finally we have a root access.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/root_access.png" width="800" height="300">
</p> 
##### Second way
At the home page there is **?page=.....**, So there is probably a local file inclusion,that may include local files of the target.
At the image below,I was be able to include **/etc/passwd** file through path transversal directory.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/etcpasswd.png" width="800" height="300">
</p> 
The file dispaly 5 different system'users,first i tried to brute force every password user to login with ssh. the file users contain the 
5 users(amy,patrick,....)
```
hydra -L users -P /usr/share/wordlists/rockyou.txt 10.0.4.13 ssh -V
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/amy_ssh.png" width="800" height="130">
</p> 
I retrieved the amy'password, I can login with ssh.So I search for any other password of any other users with this commande.
```
grep -Ri password /home/* 2>/dev/null
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/tomboy.png" width="800" height="130">
</p> 
under the patrick directory,there is a directory named tomboy that cantain root password [**50$cent**].
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/root_pass.png" width="800" height="200">
</p> 
An extreme satisfaction,we have a root access to my target machine.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-5/root_access2.png" width="800" height="180">
</p> 
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/boom.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)






