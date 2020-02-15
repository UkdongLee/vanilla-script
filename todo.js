const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; //locarstorage 'key' value

    let toDos = []; //this gonna contain 'to do' things

    function deleteToDo(event) {
        const btn = event.target;
        const li = btn.parentNode;
        toDoList.removeChild(li); // this's just remove on the display
        const cleanToDos = toDos.filter(function(toDo) {
            return toDo.id !== parseInt(li.id);
        }); // filter transfer new array when something goes throught it, if they are 'true'
        toDos = cleanToDos
        saveToDos();
    }    

    function saveToDos() { //this bring a 'toDos' and save to local storage
        localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON = JavaScript Object Notation, it change to object when data's saved in javascript and it's changed to String(reverse ok)
    }

    function paintToDo(text) { //add tags in html
        const li = document.createElement("li");
        const delBtn = document.createElement("button");
        const span = document.createElement("span");
        const newId = toDos.length + 1; //why we use var? because we need to save data to local storage
        // these also make some tags but it's have vertical relration
        toDoList.appendChild(li); //positioning tags
        li.appendChild(delBtn);
        li.appendChild(span);
        li.id = newId; //array index number = toDos.array number
        
        delBtn.innerText = "👊" //push input data to html tags
        delBtn.addEventListener("click", deleteToDo);
        span.innerText = text
        
        const toDoObj = { 
            text: text, //// key : data
            id: newId // same shit
        };

        toDos.push(toDoObj); // {"text" : "dave", "id" : 1}
        saveToDos(); //this should be behind of 'toDos.push(toDoObj)'. if not, there's nothing to save
    }

    function loadToDos() {
        const loadedToDos = localStorage.getItem(TODOS_LS); //The getItem() method of the Storage interface, when passed a key name, will return that key's value, or null if the key does not exist, in the given Storage object.
        if (loadedToDos !== null) {
            const parsedToDos = JSON.parse(loadedToDos); // String to Object with parse
            parsedToDos.forEach(function(list) { //'forEach' order do something(function) for each one 
                paintToDo(list.text);
            });
        }
    }

    function handleSubmit(event) {
        event.preventDefault() // stoping initcialized event
        const currentValue = toDoInput.value;
        paintToDo(currentValue);
        toDoInput.value = ""; // this init input box 
    }

    function init() {
        loadToDos();
        toDoForm.addEventListener("submit", handleSubmit) //the 'submit' event is delivered to the toDoForm and handleSubmit is object which acting the function
    }

    init();