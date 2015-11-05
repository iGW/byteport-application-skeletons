/**
 * All [view].js methods must have this metod defined!
 *
 * @param callback
 */
function modelAndView(context, callback) {
    callback();
}

function onSuccessfulLogin(data) {
    debug('onSuccessfulLogin()');
    redirectTo(ROOT_VIEW);
}

/***
 * GUI Event handlers
 *
 */
function onLoginClick() {
    var username = $('#login-username').val();
    var password = $('#login-password').val();
    byteport_client.login(username, password, onSuccessfulLogin);
}
