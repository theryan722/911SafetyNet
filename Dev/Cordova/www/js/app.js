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
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    loadDialPage();
}
/* ================ End Initialize ============= */

function onDeviceReady() {
    setInterval(function () {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, 5000);
    loadDialPage();
}
/* =========== Load Pages ======== */
function loadAboutPage() {
    mainView.router.loadPage('pages/about.html');
}

function loadDialPage() {
    mainView.router.loadPage('pages/dial.html');
}

function loadSetInfoPage() {
    mainView.router.loadPage('pages/setinfo.html');
    loadSettings();
}

function loadMedicalIDPage() {
    mainView.router.loadPage('pages/medicalid.html');
    loadMedicalIDInfo();
}
/* ============ End Load Pages ======= */
/* ============ Functions ====== */
function goBack() {
    mainView.router.back();
}

function loadMedicalIDInfo() {
    localforage.getItem('u_name').then(function (dat) {
        $$('#u_name').html(dat);
    });
    localforage.getItem('u_phone').then(function (dat) {
        $$('#u_phone').html(dat);
    });
    localforage.getItem('u_birthdate').then(function (dat) {
        $$('#u_birthdate').html(dat);
    });
    localforage.getItem('u_address').then(function (dat) {
        $$('#u_address').html(dat);
    });
    localforage.getItem('u_bloodtype').then(function (dat) {
        $$('#u_bloodtype').html(dat);
    });
    localforage.getItem('u_medications').then(function (dat) {
        $$('#u_medications').html(dat);
    });
    localforage.getItem('u_allergies').then(function (dat) {
        $$('#u_allergies').html(dat);
    });
    localforage.getItem('u_medicalconditions').then(function (dat) {
        $$('#u_medicalconditions').html(dat);
    });
    localforage.getItem('u_doctorinfo').then(function (dat) {
        $$('#u_doctorinfo').html(dat);
    });
    localforage.getItem('u_emergencycontact_name').then(function (dat) {
        $$('#u_emergencycontact_name').html(dat);
    });
    localforage.getItem('u_emergencycontact_phone').then(function (dat) {
        $$('#u_emergencycontact_phone').html(dat);
    });
    localforage.getItem('u_usernotes').then(function (dat) {
        $$('#u_usernotes').html(dat);
    });
    localforage.getItem('u_picture').then(function (pic) {
        if (pic) {
            $$('#u_picture').attr('src', pic);
        } else {
            $$('#u_picture').attr('src', 'img/account_96.png');
        }
    });
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
    localforage.getItem('u_name').then(function (dat) {
        $$('input[name=setting_name').val(dat);
    });
    localforage.getItem('u_phone').then(function (dat) {
        $$('input[name=setting_phone').val(dat);
    });
    localforage.getItem('u_birthdate').then(function (dat) {
        $$('input[name=setting_birthdate').val(dat);
    });
    localforage.getItem('u_address').then(function (dat) {
        $$('input[name=setting_address').val(dat);
    });
    localforage.getItem('u_bloodtype').then(function (dat) {
        $$('input[name=setting_bloodtype').val(dat);
    });
    localforage.getItem('u_medications').then(function (dat) {
        $$('input[name=setting_medications').val(dat);
    });
    localforage.getItem('u_allergies').then(function (dat) {
        $$('input[name=setting_allergies').val(dat);
    });
    localforage.getItem('u_medicalconditions').then(function (dat) {
        $$('input[name=setting_medicalconditions').val(dat);
    });
    localforage.getItem('u_doctorinfo').then(function (dat) {
        $$('input[name=setting_doctorinfo').val(dat);
    });
    localforage.getItem('u_emergencycontact_name').then(function (dat) {
        $$('input[name=setting_emergencycontact_name').val(dat);
    });
    localforage.getItem('u_emergencycontact_phone').then(function (dat) {
        $$('input[name=setting_emergencycontact_phone').val(dat);
    });
    localforage.getItem('u_usernotes').then(function (dat) {
        $$('input[name=setting_usernotes').val(dat);
    });
    localforage.getItem('u_picture').then(function (pic) {
        if (pic) {
            $$('#setting_disp_picture').attr('src', pic);
        } else {
            $$('#setting_disp_picture').attr('src', 'img/account_96.png');
        }

    });
}

function getPhoneNumber(callback) {
    localforage.getItem('u_phone').then(function (value) {
        callback(value);
    }).catch(function (err) {
        app.alert('There was an error attempting to retrieve local data.', 'Error');
    });
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
    localforage.setItem('u_name', uobj.name).then(function () {
        localforage.setItem('u_birthdate', uobj.birthdate).then(function () {
            localforage.setItem('u_phone', uobj.phone).then(function () {
                localforage.setItem('u_address', uobj.address).then(function () {
                    localforage.setItem('u_bloodtype', uobj.bloodtype).then(function () {
                        localforage.setItem('u_medications', uobj.medications).then(function () {
                            localforage.setItem('u_allergies', uobj.allergies).then(function () {
                                localforage.setItem('u_medicalconditions', uobj.medicalconditions).then(function () {
                                    localforage.setItem('u_doctorinfo', uobj.doctorinfo).then(function () {
                                        localforage.setItem('u_emergencycontact_name', uobj.emergencycontact_name).then(function () {
                                            localforage.setItem('u_emergencycontact_phone', uobj.emergencycontact_phone).then(function () {
                                                localforage.setItem('u_usernotes', uobj.usernotes).then(function () {
                                                    firebase.database().ref('users/' + uobj.phone).update(uobj);
                                                    app.addNotification({ message: 'Saved Info.' });
                                                    goBack();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
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
        getPhoneNumber(function (unum) {
            uploadImage('users/' + unum + '/picture.jpg', reader.result, function (profurl) {
                firebase.database().ref('users/' + unum).update({ picture: profurl });
                $$('#setting_disp_picture').attr('src', profurl);
                localforage.setItem('u_picture', profurl);
            });
        });

    }
}

var onSuccess = function (position) {
    getPhoneNumber(function (unum) {
        firebase.database().ref('users/' + unum).update({ latitude: position.coords.latitude, longitude: position.coords.longitude, altitude: position.coords.altitude, timestamp: position.timestamp })
        //app.addNotification({ message: "Updated Location" });
    });
};

// onError Callback receives a PositionError object
//
function onError(error) {
    app.alert('There was an error attempting to fetch your location.', 'Error');
}

function contactEmergencyServices() {
    localforage.getItem('u_name').then(function (uname) {
        getPhoneNumber(function (unum) {
            localforage.getItem('u_picture').then(function (pic) {
                firebase.database().ref('activecalls/' + unum).set({ name: uname, picture: pic });
                window.open(emergencyservicesnumber, '_system', 'location=yes');
            });
        });
    });
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