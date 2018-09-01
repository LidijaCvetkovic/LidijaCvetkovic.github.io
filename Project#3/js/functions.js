// Reloading current image
function refreshPage() {
    location.reload();
}

// Sort feeds by timestamp
function sortFeeds() {
    feed_list.sort(function(x, y){
        return y.timestamp - x.timestamp;
    });
    if((image_loaded || status_loaded) && users_loaded) {
        displayFeeds();
    }
}

// Sort comments by timestamp
function sortComments() {
    comment_list.sort(function(x, y){
        return x.timestamp - y.timestamp;
    });
    if(comments_loaded) {
        displayComments();
    }
}

// Return current datetime string
function getDateTime() {
    var currentdate = new Date(); 

    var minutes = currentdate.getMinutes();
    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    var seconds = currentdate.getSeconds();
    if(seconds < 10) {
        seconds = "0" + seconds;
    }

    return currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " "  
            + currentdate.getHours() + ":"  
            + minutes + ":"
            + seconds;
}

// Return current timestamp as numeric record
function getTimestamp() {
    return new Date().getTime();
}

// Generate random characters for id
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// Function for logging out user
function logout() {
    localStorage.removeItem('user_id');
    document.location.replace('index.html');
}

// Function for checking if user is logged in
function checkLogin(){
    if(user_id == null) {
        document.location.replace('index.html');
    } else {
        document.getElementById('navbar').innerHTML += '<a href="#" onclick="logout()">Log Out</a>';
    }
}

//Filtering user's post
var searchbox = document.getElementById('search-box');
searchbox.addEventListener('keyup', (e) => {
    const filter = searchbox.value.toUpperCase();
    const feedlist = document.getElementById('feed-list');
    const feedcontent = feedlist.getElementsByClassName('feed-content');

    for (let i = 0; i < feedcontent.length; i++) {
        if (feedcontent[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            feedcontent[i].style.display = "";
        } else {
            feedcontent[i].style.display = "none";
        }
    }
});
