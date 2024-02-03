// dashboard.js

function showPopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
}

function closePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
}

function saveCard() {
    let titleInput = document.getElementById("cardTitle");

    // Implement your logic for saving the card details here
    console.log("Title: ", titleInput.value);

    createCard(titleInput.value);

    closePopup();
}

function createCard(cardTitle) {
    let newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = "<h3 onclick=\"showPopup(this.parentElement, true)\">" + cardTitle + "</h3>";

    let cardContainer = document.getElementById("cardContainer");
    cardContainer.appendChild(newCard);
}
