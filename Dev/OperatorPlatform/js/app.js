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

//Gets data for a specific path.
function getData(node, callback) {
    firebase.database().ref(node).once('value').then(function (snapshot) {
        callback(snapshot.val());
    });
}

function markCallAsClosed() {
    if (curuser) {
        firebase.database().ref('activecalls/' + curuser).remove();
        $$('#markcall').hide();
        app.addNotification({ message: 'Closed active call.' });
    }
}

//Returns current locale/language
function getLocale() {
    return navigator.language || navigator.userLanguage;
}

//Converts epoch time to proper format in users local time
function formatTimeStamp(time, format = 'full') {
    let res;
    if (format === 'full') {
        res = new Date(parseFloat(time)).toLocaleDateString(getLocale(), { hour: "2-digit", minute: "2-digit" });
    } else if (format === 'date') {
        res = new Date(parseFloat(time)).toLocaleDateString(getLocale(), { hour: "2-digit", minute: "2-digit" }).split(', ')[0];
    } else {
        //Time
        res = new Date(parseFloat(time)).toLocaleDateString(getLocale(), { hour: "2-digit", minute: "2-digit" }).split(', ')[1]
    }
    return res;
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

app.onPageInit('user', function (page) {
    if (curuser) {
        getData('activecalls/' + curuser, function (exists) {
            if (exists) {
                $$('#markcall').show();
            } else {
                $$('#markcall').hide();
            }
        });
        getData('users/' + curuser, function (udata) {
            $$('#u_name').html(udata.name);
            $$('#u_phone').html(udata.phone);
            $$('#u_birthdate').html(udata.birthdate);
            $$('#u_address').html(udata.address);
            $$('#u_bloodtype').html(udata.bloodtype);
            $$('#u_medications').html(udata.medications);
            $$('#u_allergies').html(udata.allergies);
            $$('#u_medicalconditions').html(udata.medicalconditions);
            $$('#u_doctorinfo').html(udata.doctorinfo);
            $$('#u_emergencycontact_name').html(udata.emergencycontact_name);
            $$('#u_emergencycontact_phone').html(udata.emergencycontact_phone);
            $$('#u_usernotes').html(udata.usernotes);
            if (udata.picture) {
                $$('#u_picture').attr('src', udata.picture);
            } else {
                $$('#u_picture').attr('src', 'img/account_96.png');
            }
            map = new GMaps({
                el: '#u_map',
                lat: udata.latitude,
                lng: udata.longitude
            });
            firebase.database().ref('users/' + curuser).on('value', function (snap) {
                if (map) {
                    /* let clat = map.getCenter().toString().split(',')[0].replace(/\(|\)/g,'');
                    let clong = map.getCenter().toString().split(', ')[1].replace(/\(|\)/g,'');
                    if (clat === snap.val().latitude && clong === snap.val().longitude) {
                        alert('same!');
                    } */
                    map.removeMarkers();
                    map.addMarker({
                        lat: snap.val().latitude,
                        lng: snap.val().longitude,
                        title: 'Time: ' + formatTimeStamp(snap.val().timestamp),
                        infoWindow: {
                            content: '<p style="font-weight: bold;">Location of ' + snap.val().name + '</p><p>' + 'Lat: ' + snap.val().latitude + ' Long: ' + snap.val().longitude + '</p><p>' + formatTimeStamp(snap.val().timestamp) + '</p>'
                        }
                    });
                    map.setCenter(snap.val().latitude, snap.val().longitude, function () {
                        //map centered
                    });
                }
            });
        });
    }
});

app.onPageBeforeRemove('user', function (page) {
    firebase.database().ref('users/' + curuser).off();
    curuser = '';
});
/* ============= End Page Init ============= */
/* ============= Map ============ */



var map;

/*========== End Map =========== */