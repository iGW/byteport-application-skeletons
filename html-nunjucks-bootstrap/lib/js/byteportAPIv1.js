/**
 * Byteport API
 *
 * @param api_host
 * @param username
 * @param password
 * @param ajaxSetupErrorHandler
 *  - Supply a custom error handle to override the default alert() on error behaviour.
 * @constructor
 */
var ByteportAPIv1 = function (api_host, username, password, ajaxSetupErrorHandler) {
    if (typeof jQuery === 'undefined') {
        throw new Error('Byteport\'s JavaScript requires jQuery')
    }

    var that = this;

    this.api_host = api_host;
    this.API_URL_BASE = '/api/v1/';

    // Methods
    this.ECHO = '/api/v1/echo/';
    this.SESSION_STATUS = '/api/v1/session/';
    this.ACCOUNT_LOGIN = '/api/v1/login/';
    this.ACCOUNT_LOGOUT = '/api/v1/logout/';
    this.LIST_NAMESPACES = '/api/v1/namespaces/';
    this.LIST_DEVICES = '/api/v1/devices/[namespace]/';

    this.csrftoken = undefined;

    if (ajaxSetupErrorHandler != undefined) {
        $.ajaxSetup({
            error: ajaxSetupErrorHandler
        });
    } else {
        $.ajaxSetup({
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    alert('Not connected.\n Verify Network.');
                } else if (jqXHR.status == 403) {
                    alert('Forbidden. [403]');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found. [404]');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error.\n' + jqXHR.responseText);
                }
            }
        });
    }

    that.get_apiv1_url = function () {
        return that.api_host + that.API_URL_BASE;
    };

    that.csrftoken_url = function () {
        return that.api_host + "/api/";
    };

    that.login_url = function () {
        return that.api_host + that.ACCOUNT_LOGIN;
    };

    that.logout_url = function () {
        return that.api_host + that.ACCOUNT_LOGOUT;
    };

    that.login = function (username, password, callback) {
        console.log('ByteportAPIv1 vs ' + that.get_apiv1_url());

        var login_url = that.login_url();

        // Make initial call to obtain csrftoken

        /* Commented out as the call to obtrain csrftoken should have been made before the login
        jQuery.ajax({
            url: that.login_url(),
            method: "GET",
            async: false,
            xhrFields: {
                withCredentials: true
            }
        });
        */

        var csrftokencookie = that.csrftoken;

        if (csrftokencookie == undefined) {
            alert("No CSRF Token was obtained (ie. cookie problems)! Can not login to Byteport instance without it!");
            return 1;
        }

        var login_data = {
            'username': username,
            'password': password,
            'csrfmiddlewaretoken': csrftokencookie
        };

        jQuery.ajax({
            url: login_url,
            data: login_data,
            method: "POST",
            success: function (data) {
                callback(data);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    };

    that.logout = function(callback) {
        var logout_data = {
            'csrfmiddlewaretoken': that.csrftoken
        };

        jQuery.ajax({
            url: that.logout_url(),
            data: logout_data,
            method: "POST",
            success: function (data) {
                callback(data);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    };

    that.is_authenticated = function(callback) {
        async_get_jsonp(that.SESSION_STATUS, callback);
    };

    that.get_namespaces = function (callback) {
        async_get_jsonp(that.LIST_NAMESPACES, callback);
    };

    that.get_devices = function (namespace, callback) {
        async_get_jsonp(that.LIST_DEVICES.replace('[namespace]', namespace), callback);
    };

    function async_get_jsonp(method, callback) {
        jQuery.ajax({
                url: that.api_host + method,
                method: "GET",
                dataType: "jsonp",
                success: function (data) {
                    callback(data);
                },
                xhrFields: {
                    withCredentials: true
                }
            }
        );
    }

    that.setSessionData = function (csrftoken, sessionid) {
        // or aybe jQuery.cookie("csrftoken")
        that.csrftoken = csrftoken;
        that.sessionid = sessionid;
    };

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return null;
    }
};


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {
        }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, {expires: -1}));
        return !$.cookie(key);
    };

}));

