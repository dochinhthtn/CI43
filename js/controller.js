// điều hướng view & model
let controller = {};

controller.signUp = async function (name, email, password) {
    // tạo tài khoản --> tự động đăng nhập --> currentUser
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    // thay đổi displayName 
    await firebase.auth().currentUser.updateProfile({
        displayName: name
    });
    // xác thực tài khoản
    await firebase.auth().currentUser.sendEmailVerification();

    console.log("Tạo tài khoản thành công");
}