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
    // load dữ liệu từ firebase
    let result = await firebase.firestore().collection('conversations').get();
    let conversations = [];
    for(let doc of result.docs) {
        conversations.push(refineData(doc));
    }

    // cache dữ liệu vào model
    model.saveConversations(conversations);
}