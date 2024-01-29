var draggedElement;

function addCard() {
    showPopup(null, false);
}

function createButton(text, className, clickHandler) {
    var button = document.createElement("button");
    button.className = className;
    button.innerText = text;
    button.onclick = clickHandler;
    return button;
}

function showPopup(card, isViewOnly) {
    var popup = document.createElement("div");
    popup.className = "popup";

    var form = document.createElement("form");

    var titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = card ? card.querySelector("h3").innerText : "";
    titleInput.readOnly = isViewOnly; // Make the title input read-only if it's a view-only popup

    var contentInput = document.createElement("textarea");
    contentInput.value = card ? card.querySelector("p").innerText : "";
    contentInput.readOnly = isViewOnly; // Make the content input read-only if it's a view-only popup

    form.appendChild(titleInput);
    form.appendChild(contentInput);

    if (!isViewOnly) {
        // Add save and delete buttons only for edit popup
        var saveButton = createButton("Save", "save-button", function() {
            if (card) {
                saveChanges(card, titleInput.value, contentInput.value);
            } else {
                createCard(titleInput.value, contentInput.value);
            }
            document.body.removeChild(popup);
        });

        var deleteButton = createButton("Delete", "delete-button", function() {
            deleteCard(card);
            document.body.removeChild(popup);
        });

        form.appendChild(saveButton);
        form.appendChild(deleteButton);
    }

    var closeButton = createButton("Close", "close-button", function() {
        document.body.removeChild(popup);
    });

    form.appendChild(closeButton);

    popup.appendChild(form);

    document.body.appendChild(popup);

    // Add an event listener to close the popup when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === popup) {
            document.body.removeChild(popup);
        }
    });
}

function createCard(cardTitle, cardContent) {
    var newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = "<h3 onclick=\"showPopup(this.parentElement, true)\">" + cardTitle + "</h3><p>" + cardContent + "</p>";

    var editButton = createButton("Edit", "edit-button", function() {
        editCard(newCard);
    });

    var deleteButton = createButton("Delete", "delete-button", function() {
        deleteCard(newCard);
    });

    newCard.setAttribute("draggable", true);

    newCard.appendChild(editButton);
    newCard.appendChild(deleteButton);

    // Initially hide the buttons
    editButton.style.display = "none";
    deleteButton.style.display = "none";

    // Add a mouseover event listener to show the buttons when the card is hovered
    newCard.addEventListener("mouseover", function() {
        editButton.style.display = "inline-block";
        deleteButton.style.display = "inline-block";
    });

    // Add a mouseout event listener to hide the buttons when the mouse leaves the card
    newCard.addEventListener("mouseout", function() {
        editButton.style.display = "none";
        deleteButton.style.display = "none";
    });

    var cardContainer = document.getElementById("cardContainer");
    cardContainer.appendChild(newCard);
}

function editCard(card) {
    showPopup(card, false);
}

function saveChanges(card, newTitle, newContent) {
    card.querySelector("h3").innerText = newTitle;
    card.querySelector("p").innerText = newContent;
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
