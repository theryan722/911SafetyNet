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
var emergencyservicesnumber = 'tel:+1-347-781-9684';

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
var isCordovaApp = !!window.cordova;
if (isCordovaApp) {
    document.addEventListener("deviceready", loadDialPage(), false);
    alert('cordova');
} else {
    loadDialPage();
}
/* ================ End Initialize ============= */
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

function loadMedicalIDInfo() {
    let uinf = JSON.parse(localStorage.getItem('uinfo'));
    if (uinf) {
        $$('#u_name').html(uinf.name);
        $$('#u_phone').html(uinf.phone);
        $$('#u_birthdate').html(uinf.birthdate);
        $$('#u_address').html(uinf.address);
        $$('#u_bloodtype').html(uinf.bloodtype);
        $$('#u_medications').html(uinf.medications);
        $$('#u_allergies').html(uinf.allergies);
        $$('#u_medicalconditions').html(uinf.medicalconditions);
        $$('#u_doctorinfo').html(uinf.doctorinfo);
        $$('#u_emergencycontact_name').html(uinf.emergencycontact_name);
        $$('#u_emergencycontact_phone').html(uinf.emergencycontact_phone);
        $$('#u_usernotes').html(uinf.usernotes);
        $$('#u_picture').attr('src', localStorage.getItem('upicture'));
    }
}

//Uploads an image to the specified path
function uploadImage(loc, img, callback = undefined) {
    var storageRef = firebase.storage().ref(loc).put(img, { contentType: 'image/jpeg' });
    storageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
        //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                app.showIndicator();
                break;
        }
    }, function (error) {
        app.hideIndicator();
        app.alert('There was an error attempting to upload the image.', 'Error');
        return;
    }, function () {
        // Upload completed successfully, now we can get the download URL
        app.hideIndicator();
        if (typeof callback !== 'undefined') {
            callback(storageRef.snapshot.downloadURL);
        }
    });
}

function loadSettings() {
    let uinf = JSON.parse(localStorage.getItem('uinfo'));
    if (uinf) {
        $$('input[name=setting_name').val(uinf.name);
        $$('input[name=setting_birthdate').val(uinf.birthdate);
        $$('input[name=setting_phone').val(uinf.phone);
        $$('input[name=setting_address').val(uinf.address);
        $$('input[name=setting_bloodtype').val(uinf.bloodtype);
        $$('input[name=setting_medications').val(uinf.medications);
        $$('input[name=setting_allergies').val(uinf.allergies);
        $$('input[name=setting_medicalconditions').val(uinf.medicalconditions);
        $$('input[name=setting_doctorinfo').val(uinf.doctorinfo);
        $$('input[name=setting_emergencycontact_name').val(uinf.emergencycontact_name);
        $$('input[name=setting_emergencycontact_phone').val(uinf.emergencycontact_phone);
        $$('input[name=setting_usernotes').val(uinf.usernotes);
        $$('#setting_disp_picture').attr('src', localStorage.getItem('upicture'));
    }
}

function getPhoneNumber() {
    return JSON.parse(localStorage.getItem('uinfo')).phone;
}

function saveSettings() {
    let uobj = {
        name: $$('input[name=setting_name').val(),
        birthdate: $$('input[name=setting_birthdate').val(),
        phone: $$('input[name=setting_phone').val(),
        address: $$('input[name=setting_address').val(),
        bloodtype: $$('input[name=setting_bloodtype').val(),
        medications: $$('input[name=setting_medications').val(),
        allergies: $$('input[name=setting_allergies').val(),
        medicalconditions: $$('input[name=setting_medicalconditions').val(),
        doctorinfo: $$('input[name=setting_doctorinfo').val(),
        emergencycontact_name: $$('input[name=setting_emergencycontact_name').val(),
        emergencycontact_phone: $$('input[name=setting_emergencycontact_phone').val(),
        usernotes: $$('input[name=setting_usernotes').val()
    };
    firebase.database().ref('users/' + uobj.phone).update(uobj);
    localStorage.setItem('uinfo', JSON.stringify(uobj));
    app.addNotification({ message: 'Saved Info.' });
    goBack();
}

//Checks if a files size is within the max limit
function validateFileSize(file, maxsize = 50) {
    var FileSize = file.size / 1024; // in KB
    return FileSize < maxsize;
}

function updatePicture() {
    var reader = new FileReader();
    if (document.querySelector('input[name=setting_picture]').files[0]) {
        if (validateFileSize(document.querySelector('input[name=setting_picture]').files[0], 15000)) {
            reader.readAsArrayBuffer(document.querySelector('input[name=setting_picture]').files[0]);
        } else {
            app.alert('The file you uploaded is too large. Please make sure it is less than ' + 15000 + 'KB.', 'Error');
        }
    } else {
        app.alert('Please select an image before uploading.', 'Select Image');
    }
    reader.onloadend = function () {
        uploadImage('users/' + getPhoneNumber() + '/picture.jpg', reader.result, function (profurl) {
            firebase.database().ref('users/' + getPhoneNumber()).update({ picture: profurl });
            $$('#setting_disp_picture').attr('src', profurl);
            localStorage.setItem('upicture', profurl);
        });
    }
}

function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                        'Longitude: ' + position.coords.longitude     + '<br />' +
                        '<hr />'      + element.innerHTML;
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

// Options: throw an error if no update is received every 30 seconds.
//
var watchID;

function contactEmergencyServices() {
    //Place the call
    //window.open(emergencyservicesnumber, '_system', 'location=yes');
    //Upload latest user data
    //let uobj = JSON.parse(localStorage.getItem('uinfo'));
    //firebase.database().ref('users/' + uobj.phone).update(uobj);
    //Mark user as active call
    //firebase.database().ref('activecalls/' + getPhoneNumber()).set({ name: uobj.name, picture: localStorage.getItem('upicture') });
    //Begin sending live location
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
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

app.onPageInit('medicalid', function (page) {
    loadMedicalIDInfo();
});
/* ====== End Page Init ===== */