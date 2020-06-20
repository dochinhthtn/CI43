window.onload = function() {
    view.showScreen('signUp');
    
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        if(user != null && user.emailVerified) {
            view.showScreen("chat");
        } else {
            view.showScreen("signIn");
        }
    });
}