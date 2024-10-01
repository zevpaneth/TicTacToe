document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/users/login', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('שם משתמש או סיסמה אינם נכונים.');
        }
        return response.json();
    })
    .then(data => {
        document.cookie = `token=${data.token}; path=/;`;

        // בקשה לקבלת פרטי המשתמש
        return fetch('http://localhost:3000/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${data.token}`,
            },
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('לא ניתן לקבל את הפרטים האישיים.');
        }
        return response.json();
    })
    .then(profileData => {
        // הצגת הפרטים האישיים
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.profile-container').style.display = 'block';
        document.getElementById('profileName').innerText = `welcome, ${profileData.username}!`;
        document.getElementById('profileImage').src = profileData.profileImage; 
    })
    .catch(error => {
        alert(error.message);
    });
});
