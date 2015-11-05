/**
 * All [view].js methods must have this metod defined!
 *
 * @param callback
 */
function modelAndView(callback) {
    byteport_client.get_namespaces(callback);
}

/***
 * GUI Event handlers
 *
 */
function onGetNamespacesClick() {
    renderView('home');
}
