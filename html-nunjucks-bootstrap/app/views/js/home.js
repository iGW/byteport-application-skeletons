/**
 * All [view].js methods must have this metod defined!
 *
 * @param callback
 */
function modelAndView(context, callback) {
    byteport_client.get_namespaces(callback);
}

/***
 * GUI Event handlers
 *
 * Just request a soft update through updateView() and not a full page reload.
 *
 * This will refresh the contents of the view. This could be called on a clock to obatain fast updates.
 *
 */
function onGetNamespacesClick() {
    updateView('home');
}
