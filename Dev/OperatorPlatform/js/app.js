/* =============== Initialize ============== */
var app = new Framework7({
    material: true,
    uniqueHistory: true,
    domCache: true,
    modalTitle: 'ImusChat',
    notificationHold: 3000,
    animatePages: false,
    smartSelectSearchbar: true,
    fastClicks: false,
    //swipePanel: 'left',
    onAjaxStart: function (xhr) {
        app.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        app.hideIndicator();
    }
});
var $$ = Dom7; //DOM Library

var mainView = app.addView('.view-main', {
    main: true
});

// Initialize Firebase
var firebaseconfig = {
    apiKey: "AIzaSyB0Un11MtCRHsWRA0DnfkfOWS6HB57DCnA",
    authDomain: "safety-net-7ef75.firebaseapp.com",
    databaseURL: "https://safety-net-7ef75.firebaseio.com",
    projectId: "safety-net-7ef75",
    storageBucket: "safety-net-7ef75.appspot.com",
    messagingSenderId: "304105351563"
};
firebase.initializeApp(firebaseconfig);

getHtmlFromFile('desktopmenu.html', function (deskmenusrc) {
    $$('.views').prepend(deskmenusrc);
    var desktopMenuView = app.addView('.view-left');
});

loadAboutPage();
/* ================ End Initialize ============= */
/* ============ Functions ============ */
//Load the contents of the url into the specified id
function loadElementHtml(element, url, callback = undefined) {
    $$.get(url, undefined, function (data) {
        $$(element).html(data);
        if (typeof callback !== 'undefined') { callback(); }
    });
}

//Gets html from a file
function getHtmlFromFile(url, callback) {
    $$.get(url, undefined, function (data) {
        callback(data);
    });
}

/* =========== End Functions ============ */
/* =========== Load Pages ============= */
function loadAboutPage() {
    mainView.router.loadPage('pages/about.html');
}

/* ============= End Load Pages ============ */