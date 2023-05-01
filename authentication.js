
var usersDB = firebase.database().ref("registrationForm");

function getLoggedInUser(){
    var userString = localStorage.getItem('loggedInUser');
    var user = JSON.parse(userString);
    return user;
  }
  
  function deleteSession(){
    localStorage.removeItem('loggedInUser');
  }
  function login(e){
    e.preventDefault();

    var email = document.forms["loginForm"]["loginValue"].value;
    var pass = document.forms["loginForm"]["loginPass"].value;

    if(email == "admin@gmail.com" && pass == "admin") {
      var user = {
        "appType": "admin"
      };
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = "admin/index.html";
    }

    usersDB.on('value', (snapshot) => {
      var users = snapshot.val();
      for (const property in users) {
        if (email == users[property]["email"]){
          if (pass == users[property]["pass"]){
            localStorage.setItem('loggedInUser', JSON.stringify(users[property]));
            var loggedInUser = users[property];
            if (loggedInUser["appType"] == "teacher"){
              window.location.href = "teacher/profile.html" 
            }
            if (loggedInUser["appType"] == "student"){
              window.location.href = "student/profileonly.html" 
            }
            return;
          }
        }
        
        
      }
      alert("Invalid user.");
      document.getElementById("loginForm").reset();

      
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    }); 
  }