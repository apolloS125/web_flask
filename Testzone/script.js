function addCard() {
    var newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = "<h3>Card Title</h3><p>Card Content</p>";

    var editButton = createButton("Edit", "edit-button", function() {
        editCard(newCard);
    });

    var deleteButton = createButton("Delete", "delete-button", function() {
        deleteCard(newCard);
    });

    newCard.appendChild(editButton);
    newCard.appendChild(deleteButton);

    // Append the new card to the card container
    var cardContainer = document.getElementById("cardContainer");
    cardContainer.appendChild(newCard);
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
        var cardContainer = document.getElementById("cardContainer");
        cardContainer.removeChild(card);
    }
}
