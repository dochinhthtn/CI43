// lưu trữ html
let components = {};

components.signUp = `
<section class="sign-up-container">
    <form id="form-sign-up" class="form-sign-up">
        <h2 class="form-title">Sign Up</h2>

        <div class="input-wrapper">
            <label for="name">
                <i class="fa fa-user"></i>
            </label>
            <input type="text" name="name" placeholder="Your name" id="name">
        </div>
        <div class="message-error" id="name-error"></div>

        <div class="input-wrapper">
            <label for="email">
                <i class="fa fa-envelope"></i>
            </label>
            <input type="text" name="email" placeholder="Email" id="email">
        </div>
        <div class="message-error" id="email-error"></div>

        <div class="input-wrapper">
            <label for="password">
                <i class="fa fa-lock"></i>
            </label>
            <input type="password" name="password" placeholder="Password" id="password">
        </div>
        <div class="message-error" id="password-error"></div>

        <div class="input-wrapper">
            <label for="password-confirmation">
                <i class="fa fa-lock"></i>
            </label>
            <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" id="password-confirmation">
        </div>
        <div class="message-error" id="password-confirmation-error"></div>
        
        <button class="btn-primary" id="sign-up-btn">Register</button>
        <div class="message-error" id="sign-up-error"></div>
        <div class="message-success" id="sign-up-success"></div>
    </form>

    <div class="decoration-container">
        <img class="decoration-img" src="./images/logo.png" alt="This is sign up decoration image">
        <div class="decoration-link-container">
            <a href="#" class="decoration-link" id="sign-in-link">I am already member</a>
        </div>
    </div>
</section>
`;

components.signIn = `
<section class="sign-in-container">
    <form class="form-sign-in" id="form-sign-in">
        <h2 class="form-title">Sign In</h2>

        <div class="input-wrapper">
            <label for="email">
                <i class="fa fa-envelope"></i>
            </label>
            <input type="text" name="email" placeholder="Email" id="email">
        </div>
        <div class="message-error" id="email-error"></div>

        <div class="input-wrapper">
            <label for="password">
                <i class="fa fa-lock"></i>
            </label>
            <input type="password" name="password" placeholder="Password" id="password">
        </div>
        <div class="message-error" id="password-error"></div>

        <button class="btn-primary" id="sign-in-btn">Login</button>
        <div class="message-error" id="sign-in-error"></div>
    </form>

    <div class="decoration-container">
        <img class="decoration-img" src="./images/logo.png" alt="This is sign up decoration image">
        <div class="decoration-link-container">
            <a href="#" class="decoration-link" id="sign-up-link">Not have account? Sign Up</a>
        </div>
    </div>
</section>
`;