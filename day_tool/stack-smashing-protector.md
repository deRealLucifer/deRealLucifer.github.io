# Stack smashing protector
c'est une une technique qui permettait de limiter les dégâts causés par un buffer overflow. Cela s’appelle Stack-Smashing Protector (appelée aussi SSP). C’est une extention de gcc. Dans le cas du binaire que j’ai étudié, pour se protéger des buffer overflows, gcc 
ajoute une valeur secrète sur la stack, appelée canari, juste avant l’adresse contenue dans EBP. Un dépassement de tampon est en 
général utilisé pour réécrire EIP, qui se trouve être juste derrière l’adresse contenue dans EBP. Donc si jamais cela se passait, 
la valeur secrète serait également réécrite. Une vérification de cette valeur est effectuée avant de sortir de la fonction, et si
elle a été modifiée, alors le programme s’arrête brutalement et nous jette des tomates à la figure.
<p align="center">
  <img src="https://rajoul.github.io/day_tool/image/canary.png" width="860" height="310">
</p>
donc on est obligé de faire un brute force pour trouver la valeur de canary qui est de 8 octets pour un fichier de 32bits,16 octets 
pour 64bits.mais noter bien que à chaque nouvelle connexion on a un nouveau canary.
allez lire ce précieux article [hacktion](https://www.hacktion.be/buffer-overflow-stack-smashing-protector/).
