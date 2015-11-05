/**
 * !!! All [view].js methods must have this method defined !!!
 *
 * Perform view logic here, fetch data or whatever you are up to, but remember to
 * always execute the renderViewCallback last!
 *
 * If you do not need to fetch any data, just execute the renderViewCallback()
 * directly in this method.
 *
 * The request data is available to the view:
 *
 * Example:
 *  If the requested URL was:
 *  http://localhost/application.html?_view=devices&namespace=test
 *
 *  Then the namespace parameter is available as:
 *
 *  q['namespace]
 *
 * @param context  - object with useful data to the view
 * @param renderViewCallback - the callback to call last (or pass on for later call).
 */
function modelAndView(context, renderViewCallback) {
    debug(context);
    byteport_client.get_devices(context.q.namespace, renderViewCallback);
}

/**
 * Put all other JavaScript logic related to your view below this line, remember that no
 * javascript can be kept in the .html-file due to browser security issues.
 */
