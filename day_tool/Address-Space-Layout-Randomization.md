# Address-Space-Layout-Randomization (ASLR)

The Linux kernel has a defense mechanism named address space layout randomization (ASLR), which make the adress memory of each running 
program random.So the Buffer overflow attack is soo hard for an attacker to be exploited. it is appeared as a patch in 2005 as a solution to prevent stack overflow attack.
#### 1-Sysctl
/usr/sbin/sysctl is a command used to display kernel parameters located in /proc/sys/
in order to enable od disable ASLR, the file /proc/sys/kernel/randomize_va_space contain kernel.randomize_va_space that take:
- 0 if disabled
- 1 id enabled
- 2 Full Randomization <br>
Started by finding if the ASLR is enabled or disabled.
<p align="center">
  <img src="https://rajoul.github.io/day_tool/image/image1.png">
</p>
 ldd command is used to show the library depends to a program. in our example the adress of each library change every time I run it.
 <p align="center">
  <img src="https://rajoul.github.io/day_tool/image/image2.png">
</p>
This allows us to see that the module use a different or random address space each time when ASLR is enabled.<br>
then I disabled ASLR memory space will not be random and we will see the same space used each time.
<p align="center">
  <img src="https://rajoul.github.io/day_tool/image/image3.png">
</p>
Running the same ldd command we see now the modules use the same address space for each execution.<br>
All what is mentionned here is about library. but in executable files there is a little difference. In this case the gcc has an option to enable the ASLR.<br>
this a file that return the adress memory of the application.
```
#include <stdlib.h>
#include <stdio.h>

void* getAddr () {
 return __builtin_return_address(0)-0x5;
};

int main(int argc, char** argv){
 printf("Code located at: %p\n",getAddr());
 return 0;
}
```
we compile normaly our program 
```
$ sudo sysctl -w kernel.randomize_va_space=2
kernel.randomize_va_space = 2
$ gcc pie.c -o getAddr
```
the result :
```
$ ./getAddr 
Code located at: 0x400548
$ ./getAddr 
Code located at: 0x400548
```
the adress memery doesn't change. so gcc make ASLR enabled by adding an option -fPIE -pie
```
$ gcc -fPIE -pie pie.c -o getAddr
$ ./getAddr
Code located at: 0x556d528a5772
$ ./getAddr
Code located at: 0x5638beaa9772
```
