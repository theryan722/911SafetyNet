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
//localstorage was freaking out for some reason with parsing stringified json???? so gotta use this stupid method
function getInfo_Name() {
    localStorage.getItem('uinfo_name');
}

function getInfo_Phone() {
    localStorage.getItem('uinfo_phone');
}

function getInfo_Address() {
    localStorage.getItem('uinfo_address');
}

function getInfo_BloodType() {
    localStorage.getItem('uinfo_bloodtype');
}

function getInfo_Medications() {
    localStorage.getItem('uinfo_medications');
}

function getInfo_Allergies() {
    localStorage.getItem('uinfo_allergies');
}

function getInfo_MedicalConditions() {
    localStorage.getItem('uinfo_medicalconditions');
}

function getInfo_DoctorInfo() {
    localStorage.getItem('uinfo_doctorinfo');
}

function getInfo_EmergencyContact_Name() {
    localStorage.getItem('uinfo_name');
}

function getInfo_EmergencyContact_Phone() {
    localStorage.getItem('uinfo_phone');
}

function getInfo_UserNotes() {
    localStorage.getItem('uinfo_usernotes');
}

function setInfo_Name(info) {
    localStorage.setItem('uinfo_name', info);
}

function setInfo_Phone(info) {
    localStorage.setItem('uinfo_phone', info);
}

function setInfo_Address(info) {
    localStorage.setItem('uinfo_address', info);
}

function setInfo_BloodType(info) {
    localStorage.setItem('uinfo_bloodtype', info);
}

function setInfo_Medications(info) {
    localStorage.setItem('uinfo_medications', info);
}

function setInfo_Allergies(info) {
    localStorage.setItem('uinfo_allergies', info);
}

function setInfo_MedicalConditions(info) {
    localStorage.setItem('uinfo_medicalconditions', info);
}

function setInfo_DoctorInfo(info) {
    localStorage.setItem('uinfo_doctorinfo', info);
}

function setInfo_EmergencyContact_Name(info) {
    localStorage.setItem('uinfo_name', info);
}

function setInfo_EmergencyContact_Phone(info) {
    localStorage.setItem('uinfo_phone', info);
}

function setInfo_UserNotes(info) {
    localStorage.setItem('uinfo_usernotes', info);
}

/* ============= End Local Storage ======== */
/* =========== Load Pages ======== */
function loadAboutPage() {
    mainView.router.loadPage('pages/about.html');
}

function loadDialPage() {
    mainView.router.loadPage('pages/dial.html');
}

function loadSetInfoPage() {
    mainView.router.loadPage('pages/setinfo.html');
}

function loadMedicalIDPage() {
    mainView.router.loadPage('pages/medicalid.html');
}
/* ============ End Load Pages ======= */
/* ============ Functions ====== */
function goBack() {
    mainView.router.back();
}

function loadSettings() {
    $$('input[name=setting_name').val(getInfo_Name());
    $$('input[name=setting_phone').val(getInfo_Phone());
    $$('input[name=setting_address').val(getInfo_Address());
    $$('input[name=setting_bloodtype').val(getInfo_BloodType());
    $$('input[name=setting_medications').val(getInfo_Medications());
    $$('input[name=setting_allergies').val(getInfo_Allergies());
    $$('input[name=setting_medicalconditions').val(getInfo_MedicalConditions());
    $$('input[name=setting_doctorinfo').val(getInfo_DoctorInfo());
    $$('input[name=setting_emergencycontact_name').val(getInfo_EmergencyContact_Name());
    $$('input[name=setting_emergencycontact_phone').val(getInfo_EmergencyContact_Phone());
    $$('input[name=setting_usernotes').val(getInfo_UserNotes());
}

function saveSettings() {
}
/* ========= End Functions ======= */

/* ======= Action Sheets ======= */
function displayMenuActions() {
    var buttons1 = [
        {
            text: 'Set Info',
            onClick: function () {
                loadSetInfoPage();
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
app.onPageInit('setinfo', function (page) {
    loadSettings();
});
/* ====== End Page Init ===== */