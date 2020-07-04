// điều hướng view & model
let controller = {};

controller.signUp = async function (name, email, password) {
    // xí xóa thông báo lỗi & thành công ở quá trình sign up cũ
    view.setText("sign-up-error", "");
    view.setText("sign-up-success", "");
    view.setActive("sign-up-btn", false);
    try {
        // tạo tài khoản --> tự động đăng nhập --> currentUser
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // thay đổi displayName 
        await firebase.auth().currentUser.updateProfile({
            displayName: name
        });
        // xác thực tài khoản
        await firebase.auth().currentUser.sendEmailVerification();
        // in ra thông báo đăng kí thành công
        view.setText("sign-up-success", "An email verification has been sent");
    } catch (error) {
        view.setText("sign-up-error", error.message);
    }

    view.setActive("sign-up-btn", true);
    // console.log("kết thúc việc đăng kí tài khoản");
}

controller.signIn = async function (email, password) {
    // xí xóa
    view.setText("sign-in-error", "");
    view.setActive("sign-in-btn", false);

    // signInWithEmailAndPassword(email, password);
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        // console.log("Sign in successfully");

        // chuyển qua giao diện chat
        // view.showScreen("chat");
    } catch (error) {
        view.setText("sign-in-error", error.message);
        view.setActive("sign-in-btn", true);
    }
}

controller.loadConversations = async function () {
    let currentEmail = firebase.auth().currentUser.email;
    // load dữ liệu từ firebase
    let result = await firebase
        .firestore()
        .collection('conversations')
        .where("users","array-contains", currentEmail)
        .get();
    let conversations = [];
    for (let doc of result.docs) {
        conversations.push(refineData(doc));
    }
    // cache dữ liệu vào model
    model.saveConversations(conversations);

    // gán 1 nào đó conversation cho currentConversation
    if (conversations.length > 0) {
        // gán currentConversation là phần tử conversation đầu tiên
        model.currentConversation = model.conversations[0];
    }
}

controller.addConversation = async function (title, friendEmail) {
    try {
        // kiểm tra friendEmail
        // nhập vào chính email người dùng hiện tại
        let currentEmail = firebase.auth().currentUser.email;
        if (friendEmail == currentEmail) {
            throw new Error("Invalid email");
        }
        // nhập vào email không tồn tại trong hệ thống
        let signInMethods = await firebase.auth().fetchSignInMethodsForEmail(friendEmail);
        if (signInMethods.length == 0) {
            throw new Error("Your friend email doesn't exist");
        }

        // thêm vào collection conversations 1 conversation mới
        let newConversation = {
            title: title,
            messages: [],
            users: [
                currentEmail,
                friendEmail
            ],
            createdAt: new Date().toLocaleString()
        };

        await firebase.firestore().collection("conversations").add(newConversation);
    } catch (error) {
        view.setText("friend-email-error", error.message);
    }
}

controller.sendMessage = async function (messageContent) {
    let currentEmail = firebase.auth().currentUser.email;
    let message = {
        content: messageContent,
        owner: currentEmail,
        createdAt: new Date().toLocaleString()
    };

    // cập nhật message vào trong currentConversation trên firestore
    await firebase
        .firestore()
        .collection("conversations")
        .doc(model.currentConversation.id)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion(message)
        });


}

controller.listenRealtimeUpdate = function () {
    let isFirstRun = true;
    firebase.firestore().collection("conversations").onSnapshot(function (snapshot) {
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }

        snapshot.docChanges().forEach(function (change) {
            if (change.type == "added") {
                // refine data
                let conversation = refineData(change.doc);

                // cập nhật vào trong model
                model.updateConversation(conversation);

                // hiển thị ra màn hình
                view.showConversations();
            } else if (change.type == "modified") {
                // refine data
                let conversation = refineData(change.doc);

                // cập nhật vào trong model
                model.updateConversation(conversation);

                // hiển thị ra màn hình
                view.showCurrentConversation();
            }
        });

    });
}