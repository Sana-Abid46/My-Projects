document.addEventListener("DOMContentLoaded", function() { 
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list");

    function addTask() {
        if (inputBox.value.trim() === '') {  // Ensure the input is not just spaces
            alert("You must write something!");
        } else {
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;
            listContainer.appendChild(li);

            let span = document.createElement("span");
            span.innerHTML = "\u00d7"; // This creates the "×" symbol for the delete button
            li.appendChild(span);

            span.onclick = function() {
                this.parentElement.remove();
                saveData();
            };

            li.onclick = function() {
                this.classList.toggle('checked');
                saveData();
            };
        }
        inputBox.value = '';
        saveData();
    }

    // Attach the addTask function to the button's onclick event
    document.querySelector("button").onclick = addTask;

    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    function showTask() {
        listContainer.innerHTML = localStorage.getItem("data");
        // Reattach event listeners to the existing tasks
        let items = listContainer.getElementsByTagName("li");
        for (let i = 0; i < items.length; i++) {
            items[i].onclick = function() {
                this.classList.toggle('checked');
                saveData();
            };
            let span = items[i].getElementsByTagName("span")[0];
            span.onclick = function() {
                this.parentElement.remove();
                saveData();
            };
        }
    }

    showTask(); // Load saved tasks when the page loads
});
