# Mr-robot-1
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/1.png" >
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image//Mr-robot-1/netdiscover.png" >
</p>
the adress of my target => 10.0.4.23
Our next step is to scan our target with NMAP.
```
nmap -sC -sV -o scan.nmap 10.0.4.23
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image//Mr-robot-1/scan.png">
</p>
there is one port open: 80=> server APACHE et 443 => ssl/http
Let's check the server Apache on port 80.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/1.png" >
</p>
 Mr. Robot, it has three keys hidden in different locations. The main goal is to find all three tokens hidden in the system. Each key is progressively difficult to find.First we check the robots.txt if there is any hidden file.
 <p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/key1.png" >
</p>
Great, we get the first key.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/key11.png" >
</p>
The next step is to start enumeration with **Gobuster tool**
```
gobuster dir -u http://10.0.4.23 -w /usr/share/dirbuster/wordlists/directory-2.3-medium.txt
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/2.png" >
</p>
all directories are prefixed with wp, Our Apache server is then running Wordpress.Let's check the authentication panel.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/3.png" >
</p>
I started for trying to enumerate users using **wpscan tool**, but can't find any user. So to find a great wordlist for enumerating.
under the robots.txt directory there is a wordlist named fsocity.dic.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/word.png" >
</p>
Hydra is the best tool for brute forcing authentication. We start first with username discovering
```
hydra -L fsociety.dic -p whatever 10.0.4.23 http-get-form "/wp-login.php:log=^USER^&pws=^PASS^&wp-submit=login+In:F=Invalid username" -V
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/username.png" >
</p>
Great, we get username **Elliot/elliot/ELLIot/....** . Next step is to look for elliot's password.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/username1.png" >
</p>
IMPORTANT: wordpress check first if the username is correct after check the password => get first the username then password.
To get the password there is two ways:
1-using hydra
```
hydra -l elliot -P fsociety.dic 10.0.4.23 http-get-form "/wp-login.php:log=^USER^&pws=^PASS^&wp-submit=login+In:F=is incorrect" -V
```
2- using wpscan
```
./wpscan -u http://10.0.4.23/ -w fsociety.dic -U elliot 
```
Great, we get the password successfully.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/password.png" >
</p>
We logged in admin.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/4.png" >
</p>
we start by installing file manager plugin.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/5.png" >
</p>
then Upload our shell. And finnaly execute it on the server.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/6.png" >
</p>
having a remote access as daemon user. we get hash password for robot user.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/7.png" >
</p>
We crack the hash password with **hash killer** website.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/8.png" >
</p>
Bom, we get robot password. So we can read the 2nd key.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/9.png" >
</p>
Our next goal is to look for last key that is root key. we list all commands that can be executed as a root.
```
find / -perm -u=s 2>/dev/null
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/10.png" >
</p>
Great Nmap that is a tool for scanning port and enumerate services can be executed as a root.
```
nmap --interactive
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/11.png" >
</p>
great satisfaction, we have root access. we can then read the root key.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/Mr-robot-1/root_access.png" >
</p>
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/gif/dance.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)







