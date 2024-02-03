let draggedElement;

function addCard() {
    const cardContainer = document.getElementById("cardContainer");
    const newCard = createCardElement("New Card", "Card content goes here");
    cardContainer.appendChild(newCard);
}

function createCardElement(title, content) {
    const newCard = document.createElement("div");
    newCard.className = "card";
    
    const titleElement = document.createElement("h3");
    titleElement.innerText = title;

    const contentElement = document.createElement("p");
    contentElement.innerText = content;

    newCard.appendChild(titleElement);
    newCard.appendChild(contentElement);

    // Add event listeners for card actions (e.g., click, drag, etc.)
    newCard.addEventListener("click", function () {
        // Add your action when clicking on a card
        console.log("Card clicked:", title);
    });

    newCard.setAttribute("draggable", true);

    newCard.addEventListener("dragstart", function (event) {
        draggedElement = event.target;
    });

    newCard.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    newCard.addEventListener("drop", function (event) {
        event.preventDefault();
        const dropTarget = event.target;

        if (dropTarget.className === "card") {
            const parentContainer = dropTarget.parentNode;
            parentContainer.insertBefore(draggedElement, dropTarget);
        }
    });

    return newCard;
}

// You can dynamically load existing cards here using API calls or any other method
// Example: const existingCard = createCardElement("Existing Card", "Content");
// document.getElementById("cardContainer").appendChild(existingCard);
