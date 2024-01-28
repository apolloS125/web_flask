// script.js

// Variable to store the dragged element during drag-and-drop
var draggedElement;

function addCard() {
    // Prompt the user for card title and content
    var cardTitle = prompt("Enter card title:");
    var cardContent = prompt("Enter card content:");

    if (cardTitle !== null && cardContent !== null) {
        // Create a new card element
        var newCard = document.createElement("div");
        newCard.className = "card";
        newCard.innerHTML = "<h3>" + cardTitle + "</h3><p>" + cardContent + "</p>";

        // Create an Edit button for the card
        var editButton = createButton("Edit", "edit-button", function() {
            editCard(newCard);
        });

        // Create a Delete button for the card
        var deleteButton = createButton("Delete", "delete-button", function() {
            deleteCard(newCard);
        });

        // Add draggable attribute to the new card
        newCard.setAttribute("draggable", true);

        // Append buttons to the card
        newCard.appendChild(editButton);
        newCard.appendChild(deleteButton);

        // Append the new card to the card container
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
        // Update the card content
        card.querySelector("h3").innerText = newTitle;
        card.querySelector("p").innerText = newContent;
    }
}

function deleteCard(card) {
    var confirmDelete = confirm("Are you sure you want to delete this card?");

    if (confirmDelete) {
        // Remove the card from the card container
        var cardContainer = document.getElementById("cardContainer");
        cardContainer.removeChild(card);
    }
}

// Add event listeners for drag and drop
document.addEventListener("dragstart", function (event) {
    // Store the dragged element
    draggedElement = event.target;
});

document.addEventListener("dragover", function (event) {
    // Prevent the default behavior to enable dropping
    event.preventDefault();
});

document.addEventListener("drop", function (event) {
    // Prevent the default behavior to enable dropping
    event.preventDefault();

    // Get the drop target
    var dropTarget = event.target;

    // If the drop target is a card, move the dragged element before it
    if (dropTarget.className === "card") {
        var parentContainer = dropTarget.parentNode;
        parentContainer.insertBefore(draggedElement, dropTarget);
    }
});
