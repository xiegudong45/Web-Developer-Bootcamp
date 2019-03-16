# CSS (Cascading Style Sheets)
## Selectors
* element
```
h1 {
	border: 2px solid red;
}
```

* class
```
.hello {

}
```
* id
```
#name {

}
```
* star
```
* {

}
```

* Descendant

set class which is hello inside li to be ...
```
li .hello {

}
```

* Adjacent
set h4 and ul ...
```
h4 + ul {

}
```

* Attribute
set href attribute in a ...
```
a[href="http://www.google.com"] {

}
```

* nth of type
```
ul: nth-of-type(3) {
	background: purple
}
```
