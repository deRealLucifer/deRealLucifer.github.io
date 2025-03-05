# DC-3
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/1.png" >
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/netdiscover.png" >
</p>
the adress of my target => 10.0.4.17
Our next step is to scan our target with NMAP.
```
nmap -sC -sV -o scan.nmap 10.0.4.17
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/scan.png">
</p>
there is one port open: 80=> server APACHE.
Let's check the server Apache on port 80.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/1.png" >
</p>
We start enumerating directories with **gobuster tool**.
```
gobuster dir -u 10.0.4.17 -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/2.png" >
</p>
There is an administrator page, that is an admin panel,we need password for admin user.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/3.png" >
</p>
We start identifying first the the CMS.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/4.png" >
</p>
there is different way to get credentials:
1-brute force with hydra
2-use sqlmap
3-use nmap scripts
I tried to find script for joomla CMS.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/5.png" >
</p>
After I started to brute force the admin panel with nmap.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/6.png" >
</p>
Great, we get admin:snoopy, let's authenticate and see what inside the dashboard.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/7.png" >
</p>
Our next challenge is to find a way to upload a reverse shell. although we successfuly upload it in Beez template.
extension -> templates -> index.php
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/8.png" >
</p>
Great, Our reverse shell is sent back to my listener.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/9.png" >
</p>
We are a ww-data user, first we start checking the version of the kernel if it is vulnerable.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/10.png" >
</p>
Searchsploit list all appropriate versions
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/11.png" >
</p>
there are 4 exploits, I tried every one of them , but only one that allow me the root access.
I look for the exploit in github and I upload it to my target machine.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/12.png" >
</p>
Then I unzip it,
```
unzip 39772.zip
cd 39772
tar -xvf exploit.tar
./compile.sh
./doubleput
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/13.png" >
</p>
Boom, we have a root access, so let's more to the root directory to read the flag.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-3/root_access.png" >
</p>
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/gif/lhjar.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)

