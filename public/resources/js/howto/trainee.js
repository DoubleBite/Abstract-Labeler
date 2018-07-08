$("#email-submit").click(
    (event) => {

        // Check if the email is valid.
        event.preventDefault();

        // Get email address
        var email = $('input[name="email"]').val();
        console.log("User entered email:" + email);

        // Create a new user with status: trainee 
        var db = firebase.firestore();
        db.collection("users").doc(email)
            .get()
            .then(function (doc) {
                // Check whether user has been registered before, creating one if not.
                if (doc.exists) {
                    alert("The email address has been registered.");
                    return false;
                }

                // Create a new user.
                console.log("Successfully creating user");
                db.collection("users")
                    .doc(email)
                    .set({
                        status: "trainee",
                    });

                // A background function will be triggered and will sends email to the user.
                // See functions/index.js 
            });


    });