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

            // xử lý form thêm conversation
            let formAddConversation = document.getElementById('form-add-conversation');
            formAddConversation.onsubmit = function (event) {
                event.preventDefault();
                // lấy title, friendEmail từ form-add-conversation
                let title = formAddConversation.title.value.trim();
                let friendEmail = formAddConversation.friendEmail.value.trim();
                // kiểm tra title, friendEmail
                let validateResult = [
                    view.validate(title != '', 'title-error', 'Invalid title'),
                    view.validate(friendEmail != '' && validateEmail(friendEmail), 'friend-email-error', 'Invalid friend email')
                ];
                // gửi lên controller để xử lý
                if (isPassed(validateResult)) {
                    controller.addConversation(title, friendEmail);
                }
            }

            // lấy conversation & cache lại trong model
            await controller.loadConversations();

            // hiển thị conversations
            view.showConversations();

            // hiển thị cuộc hội thoại hiện tại
            view.showCurrentConversation();
            break;
    }
}

view.showConversations = function () {
    // lấy dữ liệu từ model và hiển thị lên giao diện
    let conversationsList = document.getElementById("conversations-list");
    conversationsList.innerHTML = "";
    for (let conversation of model.conversations) {
        let html = `
                <div class="conversation" id="conversation-${conversation.id}">
                    <p class="conversation-title">${conversation.title}</p>
                    <p class="conversation-members">
                        ${conversation.users.length} 
                        ${ (conversation.users.length == 1) ? 'member' : 'members'}
                    </p>
                </div>`;

        conversationsList.innerHTML += html;
    }

    // bắt sự kiện cho từng conversation
    for (let conversation of model.conversations) {
        let conversationDOM = document.getElementById("conversation-" + conversation.id);
        conversationDOM.onclick = function () {
            // gán lại current conversation 
            model.saveCurrentConversation(conversation);
            // hiển thị lại current conversation
            view.showCurrentConversation();
        }
    }
}

// hiển thị các tin nhắn, thông tin chi tiết của conversation mà người dùng chọn
view.showCurrentConversation = function () {
    if (model.currentConversation == null) return;

    // hiển thị tin nhắn
    // lấy messages-list
    let currentEmail = firebase.auth().currentUser.email;
    let messagesList = document.getElementById("messages-list");
    messagesList.innerHTML = "";
    for (let message of model.currentConversation.messages) {
        let isYourMessage = (message.owner == currentEmail) ? 'your' : '';
        let html = `
        <div class="message ${isYourMessage}">
            <span>${message.content}</span>
        </div>`;
        messagesList.innerHTML += html;
    }
    // hiển thị thông tin chi tiết

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
