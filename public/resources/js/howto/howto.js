/*
    這邊的程式全部都是官網教學的sample code
    https: //firebase.google.com/docs/auth/web/google-signin?authuser=0

    主要是用在以 Gmail 授權新增user
    新增之後會在後端觸發新增 user 事件
    接下來的流程請參考 functions / index.js - sendWelcomeEmail()
*/

$("#register-btn").click((event) => {

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

});