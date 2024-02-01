document.addEventListener('DOMContentLoaded', function () {
    let editProfileForm = document.querySelector('.edit-profile form');

    editProfileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let formData = new FormData(editProfileForm);
        let headers = new Headers();
        headers.append('X-CSRFToken', formData.get('csrf_token'));

        fetch('/update_profile', {
            method: 'PUT',
            body: formData,
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});
