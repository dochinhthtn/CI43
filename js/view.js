// hiển thị & xử lý trên giao diện
let view = {};


view.showScreen = async function (screenName) {
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

            // xử lý form-sign-in
            let formSignIn = document.getElementById('form-sign-in');
            formSignIn.onsubmit = function (event) {
                event.preventDefault();
                console.log('ok');
                // lấy dữ liệu từ form
                let email = formSignIn.email.value;
                let password = formSignIn.password.value;

                // kiểm tra email, password
                let validateResult = [
                    view.validate(email != "", "email-error", "Input your email"),
                    view.validate(password != "", "password-error", "Input your password")
                ];

                // nếu dữ liệu thỏa mãn --> gửi
                if (isPassed(validateResult)) {
                    // gửi dữ liệu qua controller
                    controller.signIn(email, password);
                }

            }
            break;

        case 'signUp':
            // hiển thị giao diện của sign up
            content.innerHTML = components.signUp;

            // thêm sự kiện click cho sign-in-link --> giao diện sign in
            let signInLink = document.getElementById('sign-in-link');
            signInLink.onclick = function () {
                view.showScreen("signIn");
            }

            // xử lý form-sign-up
            let formSignUp = document.getElementById('form-sign-up');
            formSignUp.onsubmit = function (event) {
                event.preventDefault();
                // console.log("Form đăng kí vừa được submit");
                // lấy dữ liệu từ form
                let name = formSignUp.name.value.trim();
                let email = formSignUp.email.value.trim();
                let password = formSignUp.password.value.trim();
                let passwordConfirmation = formSignUp.passwordConfirmation.value.trim();

                // kiểm tra dữ liệu
                let validateResult = [
                    view.validate(name != "", "name-error", "Input your name"),
                    view.validate(email != "" && validateEmail(email), "email-error", "Invalid email"),
                    view.validate(password != "", "password-error", "Input password"),
                    view.validate(passwordConfirmation != "" && password == passwordConfirmation, "password-confirmation-error", "Password confirmation is not match")
                ];

                // console.log(validateResult);
                // console.log(isPassed(validateResult));

                // nếu dữ liệu thỏa mãn --> gửi dữ liệu
                if (isPassed(validateResult)) {
                    // gửi dữ liệu qua controller
                    controller.signUp(name, email, password);
                }

            }

            break;

        case 'chat':
            //hiển thị giao diện chat
            content.innerHTML = components.chat;

            // lấy conversation & cache lại trong model
            await controller.loadConversations();

            // lấy dữ liệu từ model và hiển thị lên giao diện
            let conversationsList = document.getElementById("conversations-list");
            for(let conversation of model.conversations) {         
                let html = `
                <div class="conversation">
                    <p class="conversation-title">${conversation.title}</p>
                    <p class="conversation-members">
                        ${conversation.users.length} 
                        ${ (conversation.users.length == 1) ? 'member' : 'members' }
                    </p>
                </div>`;

                conversationsList.innerHTML += html;
            }
            console.log("load xong conversation");
            break;
    }
}


view.validate = function (condition, errorTag, message) {
    if (!condition) {
        // document.getElementById(errorTag).innerHTML = message;
        view.setText(errorTag, message);
        return false;
    } else {
        // document.getElementById(errorTag).innerHTML = "";
        view.setText(errorTag, "");
        return true;
    }
}

view.setText = function (tagId, text) {
    document.getElementById(tagId).innerHTML = text;
}

view.setActive = function (tagId, active) {
    document.getElementById(tagId).disabled = !active;
}
