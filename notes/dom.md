# DOM Manipulation
## Document (JavaScript Object)
![](/img/dom/1.png)
### Selecting Methods
* ```document.getElementById()``` returns a list
* ```document.getElementsByClassName()``` returns a list
* ```document.getElementsByTagName()```returns a list
* ```document.querySelector()``` returns the **first element** that matches a given CSS-style selector. (parameter: for class name: ".className", for id: "#id")
* ```document.querySelectorAll()``` returns a list
### Manipulating Methods
* changing an element's style
* adding/removing classes
* changing the content of a tag
* changing attributes(src, href, etc.)
#### Manipulating using Style
```
/SELECT
var tag = document.getElementById("highlight");

//MANIPULATE
tag.style.color = "blue";
tag.style.border = "10px solid red";
tag.style.fontSize = "70px";
tag.style.background = "yellow";
tag.style.marginTop = "200px";
```
#### Manipulating using classList
```
/*DEFINE A CLASS IN CSS*/
.another-class {
  color: purple;
  fontSize: 76px;
}
```

```
var tag = document.querySelector("h1");

//ADD A CLASS TO THE SELECTED ELEMENT
tag.classList.add("another-class");

//REMOVE A CLASS
tag.classList.remove("another-class");

//TOGGLE A CLASS
tag.classList.toggle("another-class");
```
### textContent
* Returns a string of all the text contained in a given element
* May break the sturcture
```
<p>
  This is an <strong>awesome</strong> paragraph
</p>
```
```
/Select the <p> tag:
var tag = document.querySelector("p");

//Retrieve the textContent:
tag.textContent //"This is an awesome paragraph"

//alter the textContent:
tag.textContent = "blah blah blah";
```


### innerHTML
```
<p>
  This is an <strong>awesome</strong> paragraph
</p>
```

```
//Select the <p> tag:
var tag = document.querySelector("p");

tag.innerHTML
//"This is an <strong>awesome</strong> paragraph"
```
### Manipulating Attributes
* Use getAttribute() and setAttribute() to read and write attributes like src or href

```
<a href="www.google.com">I am a link</a>
<img src="logo.png">
```

```
var link = document.querySelector("a");
link.getAttribute("href");  //"www.google.com"
//CHANGE HREF ATTRIBUTE
link.setAttribute("href","www.dogs.com");
///<a href="www.dogs.com">I am a link</a>

//TO CHANGE THE IMAGE SRC
var img = document.querySelector("img");
img.setAttribute("src", "corgi.png");
//<img src="corgi.png">
```

### DOM Events
* Clicking on a button
* Hovering over a link
* Dragging and Dropping
* Pressing the Enter key
#### Add a Listener
* ```addEventListener```
```
element.addEventListener(type, functionToCall);
```

```
var button = document.querySelector("button");
button.addEventListener("click", function() {
  console.log("SOMEONE CLICKED THE BUTTON!");
});
```
