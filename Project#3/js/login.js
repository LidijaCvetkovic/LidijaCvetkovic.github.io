// Function for registering new user
function signup() {
    var user = {
        id: makeid(),
        first_name: document.getElementById("first-name").value,
        last_name: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value,
        bday: document.getElementById("bday").value,
        gender: document.querySelector('.gender:checked').value,
        image: null
    }

    // Reset error messages
    errors.innerHTML = '';
    success.innerHTML = '';
    
    // Validation rules
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    var phoneFormat = /^\+?([0-9]{3})\)?[-]?([0-9]{2})[-]?([0-9]{2})?([0-9]{2})[-]?([0-9]{3})$/;
    var valid = true;

    if(user.first_name.length == 0 || user.last_name.length == 0 || user.email.length == 0 || user.phone.length == 0 || user.password.length == 0 || user.bday == undefined) {
        errors.innerHTML += '<div class="error-msg">All fields are required.</div>';
        valid = false;
    }
   
    if(format.test(user.password)) {
        errors.innerHTML += '<div class="error-msg">Password can\'t contain special characters.</div>';
        valid = false;
    }

    if(user.password.length < 5 || user.password.length > 12) {
        errors.innerHTML += '<div class="error-msg">Password must contain between 5 and 12 characters.</div>';
        valid = false;
    }

    if(phoneFormat.test(user.phone)) {
        errors.innerHTML += '<div class="error-msg">Phone number must be in a format +381-63-77-77-777.</div>';
        valid = false;
    }

    if(valid) {
        user.password = md5(user.password);
        var http = new XMLHttpRequest();
        http.open('POST', 'php/add_user.php', true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        // Listener for waiting backend actions
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                // Converting JSON to JS object
                var data = JSON.parse(http.responseText);
                if(data.success != '') {
                    success.innerHTML = '<div class="success-msg">New user is registered.</div>';
                }
            }
        }
        var data = JSON.stringify(user);
        http.send(data);
    }    
}

// Function for logging in user
function login() {
    var user = {
        id: null,
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value
    }

    var error_div = document.getElementById('login-error');
    error_div.style.display = "block";
    error_div.innerHTML = '';

    var http = new XMLHttpRequest();
    http.open('GET', 'php/get_users.php', true);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.responseText);
            data.data.forEach(function(user_data) {
                if(user_data.email == user.email && user_data.password == md5(user.password)){
                    localStorage.setItem('user_id', user_data.id);
                    user.id = user_data.id;
                }
            });
            if(user.id != null) {
                document.location.replace('home.html');
            } else {
                error_div.innerHTML = 'Wrong email and password combination.';
            }
        }
    }
    http.send(null);
}