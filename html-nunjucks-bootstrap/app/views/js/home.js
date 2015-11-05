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
 * DEMO:
 * Here we request a soft update through updateView() and not a full page reload (as a redirect would force)
 *
 * This will refresh the contents of the main div <div id="nunjucks_application></div> defined in application.html
 *
 */
function onGetNamespacesClick() {
    updateView('home');
}
