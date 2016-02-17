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
 *  context.q.namespace
 *
 * @param context  - object with useful data to the view
 * @param renderViewCallback - the callback to call last (or pass on for later call).
 */
function modelAndView(context, renderViewCallback) {
    debug(context);
    byteport_client.get_device(context.q.namespace, context.q.uid, renderViewCallback);
}

/**
 * Put all other JavaScript logic related to your view below this line, remember that no
 * javascript can be kept in the .html-file due to browser security issues.
 */

function dumpObjectIndented(obj, indent)
{
  var result = "";
  if (indent == null) indent = "";

  for (var property in obj)
  {
    var value = obj[property];
    if (typeof value == 'string')
      value = "'" + value + "'";
    else if (typeof value == 'object')
    {
      if (value instanceof Array)
      {
        // Just let JS convert the Array to a string!
        value = "[ " + value + " ]";
      }
      else
      {
        // Recursive dump
        // (replace "  " by "\t" or something else if you prefer)
        var od = DumpObjectIndented(value, indent + "  ");
        // If you like { on the same line as the key
        //value = "{\n" + od + "\n" + indent + "}";
        // If you prefer { and } to be aligned
        value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
      }
    }
    result += indent + "'" + property + "' : " + value + ",\n";
  }
  return result.replace(/,\n$/, "");
}
