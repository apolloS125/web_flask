var draggedElement;

function addCard() {
    var cardTitle = prompt("Enter card title:");
    var cardContent = prompt("Enter card content:");

    if (cardTitle !== null && cardContent !== null) {
        var newCard = document.createElement("div");
        newCard.className = "card";
        newCard.innerHTML = "<h3>" + cardTitle + "</h3><p>" + cardContent + "</p>";

        var editButton = createButton("Edit", "edit-button", function() {
            editCard(newCard);
        });

        var deleteButton = createButton("Delete", "delete-button", function() {
            deleteCard(newCard);
        });

        newCard.setAttribute("draggable", true);

        newCard.appendChild(editButton);
        newCard.appendChild(deleteButton);

        var cardContainer = document.getElementById("cardContainer");
        cardContainer.appendChild(newCard);
    }
}

function createButton(text, className, clickHandler) {
    var button = document.createElement("button");
    button.className = className;
    button.innerText = text;
    button.onclick = clickHandler;
    return button;
}

function editCard(card) {
    var newTitle = prompt("Enter new title:");
    var newContent = prompt("Enter new content:");

    if (newTitle !== null && newContent !== null) {
        card.querySelector("h3").innerText = newTitle;
        card.querySelector("p").innerText = newContent;
    }
}

function deleteCard(card) {
    var confirmDelete = confirm("Are you sure you want to delete this card?");

    if (confirmDelete) {
        var cardContainer = document.getElementById("cardContainer");
        cardContainer.removeChild(card);
    }
}

document.addEventListener("dragstart", function (event) {
    draggedElement = event.target;
});

document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.addEventListener("drop", function (event) {
    event.preventDefault();

    var dropTarget = event.target;

    if (dropTarget.className === "card") {
        var parentContainer = dropTarget.parentNode;
        parentContainer.insertBefore(draggedElement, dropTarget);
    }
});
