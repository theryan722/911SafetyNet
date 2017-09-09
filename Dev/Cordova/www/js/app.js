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

  loadDialPage();
/* ================ End Initialize ============= */
/* ================ Local Storage ======== */
//Gets the users info
function getUserInfo() {
    return JSON.parse(localStorage.getItem('userinfo'));
}

function setUserInfo(uinfo) {
    //TODO
}

/* ============= End Local Storage ======== */
/* =========== Load Pages ======== */
function loadAboutPage() {
    mainView.router.loadPage('pages/about.html');
}

function loadDialPage() {
    mainView.router.loadPage('pages/dial.html');
}

function loadInfoPage() {
    mainView.router.loadPage('pages/info.html');
}

function loadMedicalIDPage() {
    mainView.router.loadPage('pages/medicalid.html');
}
/* ============ End Load Pages ======= */
/* ============ Functions ====== */
function goBack() {
    mainView.router.back();
}


/* ========= End Functions ======= */

/* ======= Action Sheets ======= */
function displayMenuActions() {
    var buttons1 = [
        {
            text: 'Set Info',
            onClick: function () {
                loadInfoPage();
            }
        }
    ];
    var buttons2 = [
        {
            text: 'About',
            onClick: function () {
                loadAboutPage();
            }
        }
    ];
    var buttons3 = [
        {
            text: 'Cancel',
            color: 'red'
        }
    ];
    app.actions([buttons1, buttons2, buttons3]);
}


/* ======= End Action Sheets ====== */
/* ====== Page Init ======= */

/* ====== End Page Init ===== */