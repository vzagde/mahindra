
function j2s(json) {
    return JSON.stringify(json);
}

function goto_page(page) {
    mainView.router.load({
        url: page,
        ignoreCache: false,
    });
}

//app login
function login(){
	var email = $('#login-email').val();
    var password = $('#login-password').val();
    if (email == '') {
        myApp.alert('Email Id should be provided.');
        return false;
    } else if (!email.match(email_regex)) {
        myApp.alert('Valid Email Id should be provided.');
        return false;
    }

    if (password == '') {
        myApp.alert('Password should not be blank.');
        return false;
    }

    myApp.showIndicator();
    $.ajax({
        url: base_url + '/login',
        type: 'POST',
        crossDomain: true,
        data: {
            "email": email,
            "password": password,
        },
    })
    .done(function(res) {
        console.log('done: ' + j2s(res));
        myApp.hideIndicator();
        if (res.status == 'SUCCESS') {
            mainView.router.load({
                url: 'home.html',
                ignoreCache: false,
            });
        } else {
            myApp.alert('Email or Password Mismatch');
        }
    })
    .fail(function(err) {
        myApp.hideIndicator();
        myApp.alert('Some error occurred on connecting.');
        console.log('fail: ' + j2s(err));
    })
    .always(function() {});
}

function logout() {
    Lockr.flush();
    token = false;
    goto_page('index.html');
}



    // $(document).ready(function(){

    //     alert('clicked');
    //     $('img').click(function(){
    //     alert('clicked');


    //         $("img").removeClass('zoomin');
    //         $("img").removeClass('show');

    //         $(this).addClass('zoomin');
    //         $(this).addClass('show');

    //     })
        
    // })


// alert('helo');


// function initMap() {
//     // Create a map object and specify the DOM element for display.
//     var map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: -34.397, lng: 150.644},
//       scrollwheel: false,
//       zoom: 8
//     });
//   }

//back button
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", function(e) {
        e.preventDefault();
        var page = myApp.getCurrentView().activePage;
        myApp.hideIndicator();
         myApp.closePanel();
        if (page.name == "home"  || page.name == "index" ) {
            // lockFile = dataDir.getFile("file:///lockfile.txt", {create: true, exclusive: true});
            // console.log("Created File"+lockFile);
            myApp.confirm('would you like to exit app.', function() {
                navigator.app.clearHistory();
                gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
                navigator.app.exitApp();
            });
        } else {
            mainView.router.back({});
        }
    }, false);
}

function nativePluginResultHandler(result) {
    // console.log('GA result: '+result);
    // alert('GA result: '+result);
}

function nativePluginErrorHandler(error) {
    // console.log('GA error: '+error);
    // alert('GA error: '+error);
}

function inside_outside_text(){
    $('.inside_outside_text').show();
}