let draggedElement;

function addCard() {
    showPopup(null, false);
}

function createButton(text, className, clickHandler) {
    let button = document.createElement("button");
    button.className = className;
    button.innerText = text;
    button.onclick = clickHandler;
    return button;
}

function showPopup(card, isViewOnly) {
    let popup = document.createElement("div");
    popup.className = "popup";

    let form = document.createElement("form");

    let titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = card ? card.querySelector("h3").innerText : "";
    titleInput.readOnly = isViewOnly;

    let contentInput = document.createElement("textarea");
    contentInput.value = card ? card.querySelector("p").innerText : "";
    contentInput.readOnly = isViewOnly;

    form.appendChild(titleInput);
    form.appendChild(contentInput);

    if (!isViewOnly) {
        let saveButton = createButton("Save", "save-button", function () {
            if (card) {
                card.querySelector("h3").innerText = titleInput.value;
                card.querySelector("p").innerText = contentInput.value;
                editCardService(card.id, titleInput.value, contentInput.value)
            } else {
                createCardService(titleInput.value, contentInput.value);
                createCard(titleInput.value, contentInput.value);
                window.location.reload();
            }
            document.body.removeChild(popup);
        });

        let deleteButton = createButton("Delete", "delete-button", function () {
            deleteCard(card);
            document.body.removeChild(popup);
        });

        form.appendChild(saveButton);
        form.appendChild(deleteButton);
    }

    let closeButton = createButton("Close", "close-button", function () {
        document.body.removeChild(popup);
    });

    form.appendChild(closeButton);

    popup.appendChild(form);

    document.body.appendChild(popup);

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            document.body.removeChild(popup);
        }
    });
}
//create card on page
function createCard(cardTitle, cardContent, cardId) {
    let newCard = document.createElement("div");
    newCard.id = cardId;
    console.log(cardId) 
    newCard.className = "card";
    newCard.innerHTML = "<h3 onclick=\"showPopup(this.parentElement, true)\">" + cardTitle + "</h3><p>" + cardContent + "</p>";

    let editButton = createButton("Edit", "edit-button", function () {
        editCard(newCard);
    });

    let deleteButton = createButton("Delete", "delete-button", function () {
        deleteCard(newCard);
    });

    newCard.setAttribute("draggable", true);

    newCard.appendChild(editButton);
    newCard.appendChild(deleteButton);

    editButton.style.display = "none";
    deleteButton.style.display = "none";

    newCard.addEventListener("mouseover", function () {
        editButton.style.display = "inline-block";
        deleteButton.style.display = "inline-block";
    });

    newCard.addEventListener("mouseout", function () {
        editButton.style.display = "none";
        deleteButton.style.display = "none";
    });

    let cardContainer = document.getElementById("cardContainer");
    cardContainer.appendChild(newCard);
}


function editCard(card) {
    showPopup(card, false);
}

function deleteCard(card) {
    let confirmDelete = confirm("Are you sure you want to delete this card?");

    if (confirmDelete) {
        let cardContainer = document.getElementById("cardContainer");
        cardContainer.removeChild(card);
        deleteCardService(card.id)
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    getCardsService().then(cards => {
        cards.forEach(card => {
            createCard(card.title, card.content, card.id);
        });
    });
});

document.addEventListener("dragstart", function (event) {
    draggedElement = event.target;
});

document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.addEventListener("drop", function (event) {
    event.preventDefault();

    let dropTarget = event.target;

    if (dropTarget.className === "card") {
        let parentContainer = dropTarget.parentNode;
        parentContainer.insertBefore(draggedElement, dropTarget);
    }
});