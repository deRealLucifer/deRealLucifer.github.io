# DC-1
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/accueil.png" width="840" height="300">
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/netdiscover.png" width="800" height="200">
</p>
the adress of my target => 10.0.4.15
Our next step is to scan our target with NMAP.
```
nmap -sC -sV -o scan.nmap 10.0.4.13
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/scan.png" width="800" height="500">
</p>
there are three port open: 80=> server APACHE, 22 => SSH et 111 =>RPC(remote procedure call)
Let's check the server Apache on port 80.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/accueil.png" width="740" height="240">
</p>
the website is buit with drupal, wappalyzer extension extend the version of drupal site.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/wappa.png" width="400" height="200">
</p>
The drupal 7 is vulneravle to command injection.this exploit can let us to get in system.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/cve.png" width="550" height="290">
</p>
We upload the script and execute it.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/1.png" width="600" height="300">
</p>
Great we are inside our machine target, first we sent a reverse shell to my listner.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/reverseshell.png" width="800" height="160">
</p>
So, we logged in as www-data user and looking for flags files.the first flag located in /var/www
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/flag1.png" width="500" height="100">
</p>
the second flag in /home directory.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/flag4.png" width="600" height="180">
</p>
We start our enumeration to see if there are any files that can allow us to priviledge escalation
```
find / -perm -u=s 2>/dev/null
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/find.png" width="600" height="300">
</p>
/usr/bin/find is setuid, that means that we can exploit this command to have a root access
```
find / -exec /bin/sh \;
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/root_access.png" width="600" height="260">
</p>
Great satisfaction, we can read the finalflag.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-1/finalflag.png" width="600" height="300">
</p>
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/boom.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)










