/**
 * All [view].js methods must have this metod defined!
 *
 * @param callback
 */
function modelAndView(context, callback) {


    byteport_client.logout(callback);

    // This will logout and redirect to ROOT without doing what the caller wanted.
    //byteport_client.logout(redirectTo(ROOT_VIEW));
}
