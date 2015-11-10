var DEBUG = true;
//var byteport_api_host = "https://acc.byteport.se";
var byteport_api_host = "http://localhost:8000";

/**
 * Register views here.
 *
 * Each view must have a corresponding markup and javascript file
 *
 * ie for the view "home", the following files MUST exist.. or else!
 *     app/js/home.js
 *     app/templates/home.html
 *
 * @type {string[]}
 */
var application_views = ['login', 'logout', 'not_found', 'home', 'devices'];

// What GET-parameter to use when determining what view the user requested
var VIEWS_PREFIX='_view';

// Some static views that need to be set for the application to handle errors etc.
var LOGIN_VIEW = 'login';
var ROOT_VIEW = 'home';
var VIEW_NOT_FOUND = 'not_found';
