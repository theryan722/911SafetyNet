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
var curuser = '';
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

loadHomePage();
/* ================ End Initialize ============= */
/* ============ Functions ============ */
//Handle browser back button
window.onpopstate = function (event) {
    if (event) {
        mainView.router.back();
    }
}

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

function loadUserFromSearch() {
    if ($$('input[name=useridsearch]').val()) {
        loadUserPage($$('input[name=useridsearch]').val());
    }   
}

/* =========== End Functions ============ */
/* =========== Load Pages ============= */
function loadAboutPage() {
    mainView.router.loadPage('pages/about.html');
}

function loadUserPage(userid) {
    curuser = userid;
    mainView.router.loadPage('pages/user.html');
}

function loadHomePage() {
    mainView.router.loadPage('pages/home.html');
}

/* ============= End Load Pages ============ */
/* ============= Page Init ============== */
app.onPageInit('*', function (page) {
    location.hash = page.name;
});

app.onPageInit('*', function (page) {
    location.hash = page.name;
});
/* ============= End Page Init ============= */