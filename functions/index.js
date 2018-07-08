const admin = require('firebase-admin');
const functions = require('firebase-functions');
const email_sender = require('./email');
const checker = require('./checker');
const express = require('express');
const cors = require('cors');
var serviceAccount = require("./abstractlabeling-firebase-adminsdk-mo3e5-db2442f321.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://abstractlabeling.firebaseio.com"
});

var db = admin.firestore();



// Send welcome email with test files.
// 詳細的 email 內容定義在email.js
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {

    console.log("New user was created in authentication: " + user.email);
    email_sender.send(user.email);

    // Create user in database
    db.collection("users").doc(user.email)
        .set({
            status: "trainee",
        });
    db.collection("users").doc(user.email).collection("test_submissions").doc("records")
        .set({
            cs_CL_2049: 0,
            cs_DM_791: 0,
            cs_CV_4304: 0
        });
    console.log("New user was created in cloud store: " + user.email);
});


// Handeling submission
const app = express();

app.use(cors({
    origin: true
}));

app.post('/', (req, res) => {
    var ID = req.body.email;
    var filename = req.body.name;
    var data = req.body.data;
    var test_files = ['cs_CL_2049', 'cs_DM_791', 'cs_CV_4304'];
    var docRef = db.collection("users").doc(ID);
    var docData = docRef.get()
        .then(doc => {
            var status = doc.data().status;
            console.log('User status:', status);

            // If status is trainee, he/she can only submit the three test files
            if (status === 'trainee') {
                if (test_files.indexOf(filename) === -1) {
                    res.send("You should only submit test files.");
                } else {

                    checker.checkSubmit(filename, data)
                        .then((score) => {
                            return new Promise((resolver) => {
                                // Store labeling result and update score.
                                db.collection("users").doc(ID).collection("test_submissions").doc(filename)
                                    .set(data);
                                db.collection("users").doc(ID).collection("test_submissions").doc("records")
                                    .update({
                                        [filename]: score
                                    });
                                resolver(score);
                            });
                        })
                        .then((score) => {
                            // Check whether trainee finish probation
                            db.collection("users").doc(ID).collection("test_submissions").doc("records").get()
                                .then((records) => {
                                    if (records.data().cs_CL_2049 === 0 || records.data().cs_DM_791 === 0 || records.data().cs_CV_4304 === 0) {
                                        res.send("You got score " + score);
                                    } else {
                                        var totalScore = records.data().cs_CL_2049 + records.data().cs_DM_791 + records.data().cs_CV_4304;
                                        if (totalScore >= 210) {
                                            res.send("You got total score " + totalScore + ".\n" +
                                                "You've passed the test.\nPlease wait for our notification.");
                                            email_sender.send_notification(ID);
                                            db.collection("users").doc(ID)
                                                .update({
                                                    status: "labeler",
                                                });
                                        } else {
                                            res.send("You got total score " + totalScore + ".\n" +
                                                "Sorry, but you do not pass the test. Please keep going!");
                                        }
                                    }
                                    return 0;
                                })
                                .catch();
                            return 0;
                        })
                        .catch();
                }
            }
            // If he/she is a qualified labeler.
            else {
                res.send("Thanks for your submission.");
                db.collection("users").doc(ID).collection("submissions").doc(filename)
                    .set(data);
            }
            return doc.data();
        });
});

exports.submit = functions.https.onRequest(app);