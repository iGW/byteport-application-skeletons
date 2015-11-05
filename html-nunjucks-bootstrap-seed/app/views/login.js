/**
 * All [view].js methods must have this metod defined!
 *
 * @param callback
 */
function modelAndView(callback) {
    callback();
}

function onSuccessfulLogin() {
    redirectTo(ROOT_VIEW);
}

/***
 * GUI Event handlers
 *
 */
function onLoginClick() {
    byteport_client.login('admin', 'admin', onSuccessfulLogin);
}
