function createCardService(title, content) {
    return fetch("/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
}

function getCardsService() {
    return fetch("/cards", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error("Error:", error));
}

function deleteCardService(id) {
    return fetch(`/cards/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
}
function editCardService(id, updatedTitle, updatedContent) {
    console.log( id,  updatedTitle, updatedContent );
    return fetch(`/cards/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: updatedTitle,
            content: updatedContent,
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
}