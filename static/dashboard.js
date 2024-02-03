// dashboard.js

let currentEditedCard;

function showPopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
    currentEditedCard = null; // Reset the current edited card
}

function closePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
}

function saveCard() {
    let titleInput = document.getElementById("cardTitle");

    if (currentEditedCard) {
        // Update existing card
        currentEditedCard.querySelector("h3").innerText = titleInput.value;
    } else {
        // Create a new card
        createCard(titleInput.value);
    }

    closePopup();
}

function createCard(cardTitle) {
    let newCard = document.createElement("div");
    newCard.className = "card";

    // Title
    let titleElement = document.createElement("h3");
    titleElement.innerText = cardTitle;
    newCard.appendChild(titleElement);

    // Edit button
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = function () {
        editCard(newCard);
    };
    newCard.appendChild(editButton);

    let cardContainer = document.getElementById("cardContainer");
    cardContainer.appendChild(newCard);
}

function editCard(card) {
    let popup = document.getElementById("popup");
    popup.style.display = "block";

    let titleInput = document.getElementById("cardTitle");
    titleInput.value = card.querySelector("h3").innerText;

    currentEditedCard = card;
}
