# DC-2
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/3.png" width="840" height="300">
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/netdiscover.png" width="800" height="200">
</p>
the adress of my target => 10.0.4.16
Our next step is to scan our target with NMAP.
```
nmap -sC -sV -o scan.nmap 10.0.4.16
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/scan.png" width="650" height="300">
</p>
there is one port open: 80=> server APACHE.
Let's check the server Apache on port 80.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/1.png" width="660" height="280">
</p>
the page can't be uploaded,So I added the adress of the target machine to the file /etc/hosts with dc-2 hostname.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/2.png" width="740" height="240">
</p>
After, we Can see the page clearly,the website is buit with wordpress.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/3.png" width="740" height="240">
</p>
the firt step after we discover the website is buit with wordpress is fingerprinting, that allow us to discover the version of the
wordpress and exploit vulnerabilities of this one, with **wpscan tool**.
```
./wpscan.rb --url http://dc-2/ 
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/4.png" width="840" height="280">
</p>
the version of wordpress is 4.7.10 and there are 17 vulnerabilities. Let's enumerate users of the app.
```
./wpscan.rb --url http://dc-2/ --enumerate
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/5.png" width="740" height="240">
</p>
There are three users: jerry,tom,admin. I tried to brute force the admin password with rockyou.txt wordlist but nothing useful.
At the home page there is Flag menu,that tell us to make my own wordlist.txt with **cewl tool** 
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/6.png" width="740" height="240">
</p>
Then, this is the commande to make the wordlist.txt.
```
cewl http://dc-2/ -w wordlist.txt -m 5
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/cewl.png" width="740" height="160">
</p>
With wpscan,we can also perform brute force on users and passwords,the file users contain users:jerry,tom and admin,there is the syntax.
```
./wpscan --url http://dc-2/ --usernames users -w wordlist.txt
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/7.png" width="740" height="150">
</p>
wpscan discover two passwords: jerry=>adipiscing, tom => parturient. we authenticate first with tom Credentials but there is nothing inside.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/8.png" width="500" height="200">
</p>
we access to the Jerry's dashboard,he doesn't have enough piviledge to upload images and files.But there is the second flag, that tell us to look somewhere else. (ssh login).
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/9.png">
</p>
We check the all ports for any port open.
```
nmap -p- 10.0.4.16
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/10.png" width="740" height="200">
</p>
Great, there is a port 7744 open, let's login with ssh with tom user.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/11.png" width="740" height="240">
</p>
Successfuly logged in,but with restricted bash. We use vi to get the shell:
```
vi
:set shell=/bin/bash
:shell
```
Then,in order to execute any command as usually, we need to change the PATH variable.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/12.png" width="740" height="240">
</p>
Great, we can read the 3rd flag. What I understand from the flag text is to switch to jerry user
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/13.png" width="740" height="240">
</p>
the 4th flag tell us to look for tha last flag that probably located inside the root directory. We list git command that
jerry can run as a root.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/14.png">
</p>
Finally we get root access.Then read the final flag
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-2/root_access.png" width="740" height="240">
</p>
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/gif/dance.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)







