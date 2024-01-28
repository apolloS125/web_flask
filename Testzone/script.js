var draggedElement;

function addCard() {
    showPopup(null);  // Pass null since we are adding a new card
}

function createButton(text, className, clickHandler) {
    var button = document.createElement("button");
    button.className = className;
    button.innerText = text;
    button.onclick = clickHandler;
    return button;
}

function showPopup(card) {
    var popup = document.createElement("div");
    popup.className = "popup";

    var form = document.createElement("form");

    var titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = card ? card.querySelector("h3").innerText : "";

    var contentInput = document.createElement("textarea");
    contentInput.value = card ? card.querySelector("p").innerText : "";

    var saveButton = createButton("Save", "save-button", function() {
        if (card) {
            saveChanges(card, titleInput.value, contentInput.value);
        } else {
            createCard(titleInput.value, contentInput.value);
        }
        document.body.removeChild(popup);
    });

    var closeButton = createButton("Close", "close-button", function() {
        document.body.removeChild(popup);
    });

    form.appendChild(titleInput);
    form.appendChild(contentInput);
    form.appendChild(saveButton);
    form.appendChild(closeButton);

    popup.appendChild(form);

    document.body.appendChild(popup);
}

function editCard(card) {
    showPopup(card);
}

function saveChanges(card, newTitle, newContent) {
    card.querySelector("h3").innerText = newTitle;
    card.querySelector("p").innerText = newContent;
}

function createCard(cardTitle, cardContent) {
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
