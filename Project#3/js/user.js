// Fetch user id from get parameter
var url = new URL(window.location.href);
var user_id = url.searchParams.get("id");
var user_image = document.getElementById('user-image');
var feeds = document.getElementById('feed-list');
var info = document.getElementsByClassName('info');

// Load user data
function loadUserData() {
	getUsers(true);
	getStatuses(user_id);
    getImages(user_id);
}

function displayUser() {
    var user_profile = {};

    var http = new XMLHttpRequest();
    http.open('GET', 'php/get_users.php', true);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.responseText);
            if(data.data != '') {
                data.data.forEach(function(user) {
                    if(user.id == user_id){              
                        user_profile = user;
                    }
                });                
                if(user_profile.image != null) {
                    user_image.innerHTML = '<img src="img/'+user_profile.image+'" />';
                } else {
                    user_image.innerHTML = '<img src="img/no-img.png" />';
                } 
                info[0].innerHTML = user_profile.first_name + " " + user_profile.last_name;
                info[1].innerHTML = user_profile.email;
                info[2].innerHTML = user_profile.phone;
                info[3].innerHTML = user_profile.bday;
                info[4].innerHTML = user_profile.gender;
            }
        }
    }
    http.send(null);
}


