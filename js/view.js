// hiển thị & xử lý trên giao diện
let view = {};


view.showScreen = function (screenName) {
    /* 
        signIn --> show giao diện của sign in
        signUp --> show giao diện của sign up
        chat --> show giao diện của chat 
    */

    let content = document.getElementById('content');

    switch (screenName) {
        case 'signIn':
            // hiển thị giao diện của sign in
            content.innerHTML = components.signIn;

            // thêm sự kiện click cho sign-up-link --> giao diện sign up
            let signUpLink = document.getElementById('sign-up-link');
            signUpLink.onclick = function () {
                view.showScreen("signUp");
            }
            break;

        case 'signUp':
            // hiển thị giao diện của sign up
            content.innerHTML = components.signUp;

            // thêm sự kiện click cho sign-in-link --> giao diện sign in
            let signInLink = document.getElementById('sign-in-link');
            signInLink.onclick = function() {
                view.showScreen("signIn");
            }

            // xử lý form-sign-up
            let formSignUp = document.getElementById('form-sign-up');
            formSignUp.onsubmit = function(event) {
                event.preventDefault();
                // console.log("Form đăng kí vừa được submit");
                // lấy dữ liệu từ form
                let name = formSignUp.name.value;
                let email = formSignUp.email.value;
                let password = formSignUp.password.value;
                let passwordConfirmation = formSignUp.passwordConfirmation.value;

                view.validate(name != "", "name-error", "Input your name");
                view.validate(email != "", "email-error", "Input your email");
                view.validate(password != "", "password-error", "Input password");
                view.validate(passwordConfirmation != "" && password == passwordConfirmation, "password-confirmation-error", "Password confirmation is not match");
                
                // gửi dữ liệu & lưu trong cơ sở dữ liệu
                // thư viện firebase

            }

            break;
    }
}


view.validate = function (condition, errorTag, message) {
    if(!condition) {
        document.getElementById(errorTag).innerHTML = message;
    } else {
        document.getElementById(errorTag).innerHTML = "";
    }
}