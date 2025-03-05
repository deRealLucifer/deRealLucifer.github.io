# LAMPSecurity 4
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/accueil.png" width="840" height="300">
</p>
##### 1-reconnaissance
Let’s start with scanning my local private network to get the adress IP of my target.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/netdiscover.png" width="800" height="200">
</p>
the adress of my target => 10.0.4.12

Our next step is to scan our target with NMAP.
**nmap -sC -sV -o scan.nmap 10.0.4.12**
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/scan.png" width="800" height="400">
</p>
there are three port open: 80=> server APACHE, 25 => SMTP, 22 => SSH
Let's check the server Apache on port 80 if there is robots.txt file
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/robots.png" width="800" height="180">
</p>
there are three folders in robots.txt file, the sql folder is soo important,it contain sql.db file 
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/sqldb.png" width="800" height="180">
</p>
in the file there is **ehks** database name and table user, before we run **sqlmap** we try to find the injectable parameter
that located in blog identifiant.Finally we send the request to **Burp suite** 
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/burp.png" width="800" height="260">
</p>
We encapsulate all informations about the target and save them in burp.txt file to use it in **sqlmap**.
**sqlmap -r burp.txt --dbs** to list database names.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/database.png" width="800" height="180">
</p>
After we list tables of **ehks** database : **sqlmap -r burp.txt -D ehks --tables**
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/tables.png" width="800" height="180">
</p>
Finally we get all information about user table that contain usernames and passwords.
**sqlmap -r burp.txt -D ehks -T user --dump**
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/dump.png" width="800" height="220">
</p>
Great,we have usernames with password, the next step is to login with these account and see if there is an account with
more priviledge.Let's start with dstevens : **ssh dstevens@10.0.4.12**
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/id.png" width="800" height="100">
</p>
dstevens belong to admins group, let's check the members od this group
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/group.png" width="800" height="80">
</p>
Also achen belong to admin  group,we can discover the privilidge of this account.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/sudol.png" width="800" height="100">
</p>
**Important** the dstevens user has the privilege to run all the commands with sudo.
So, I can run bash shell like an admin.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/LAMPSecurity-4/root_access.png" width="800" height="220">
</p>
Congratulation, We get the root acces in the target machine.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/boom.gif" width="460" height="220">
</p>
support me on [twitter](https://twitter.com/rajoul6)







