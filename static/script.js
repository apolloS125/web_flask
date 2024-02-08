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

    // Add event listener for Enter key press in contentInput
    contentInput.addEventListener("keydown", function (event) {
    });

    form.appendChild(titleInput);
    form.appendChild(contentInput);

    if (!isViewOnly) {
        let saveButton = createButton("Save", "save-button", function () {
            console.log(//for check data
                'save',
                contentInput.value
            )
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
        form.appendChild(saveButton);
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
    const cardHTML = cardContent.split('\n').join('<br/>')
    // newCard.innerHTML = "<h3 onclick=\"showPopup(this.parentElement, true)\">" + cardTitle + "</h3><p>" + cardContent + "</p>";
    newCard.innerHTML = "<h3 onclick=\"showPopup(this.parentElement, true)\">" + cardTitle + "</h3><p>" + cardHTML + "</p>";

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
            console.log('content', card.content) //for debug content text
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
function search() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector("h3").innerText.toLowerCase();//like .lower() in python medthod

        // Check if the title contains the search input value
        if (title.includes(searchInput)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// Function to clear search
function clearSearch() {
    document.getElementById("searchInput").value = "";
    // Show all cards
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "block";
    }
}

