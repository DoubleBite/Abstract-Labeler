function getLabelingResult() {

    var targetStr = "";
    var methodStr = "";
    var resultStr = "";
    $('.note-editor > .note-editing-area').find("span").each(function () {
        if (/\S/.test($(this).html())) {
            if ($(this).css("color") === "rgb(76, 167, 80)") {
                targetStr = targetStr + $(this).html() + "\n";
            } else if ($(this).css("color") === "rgb(0, 123, 255)") {
                methodStr = methodStr + $(this).html() + "\n";
            } else if ($(this).css("color") === "rgb(220, 53, 69)") {
                resultStr = resultStr + $(this).html() + "\n";
            }
        }
    });

    var confidence = $('input[name="confidence"]:checked').val();
    var type = $('input[name="type"]:checked').val();
    var date = new Date().toString();

    return {
        "target": targetStr,
        "method": methodStr,
        "result": resultStr,
        "confidence": confidence,
        "type": type,
        "date": date,
    };
}


function saveSubmissionLocally(filename, submissionObj) {
    submissionStr = JSON.stringify(submissionObj);
    var blob = new Blob([submissionStr], {
        type: "text/json;charset=utf-8"
    });
    saveAs(blob, filename + ".json");
}


function submit(email) {
    var filename = localStorage.getItem('chosenFile');
    submissionObj = getLabelingResult();
    saveSubmissionLocally(filename, submissionObj);

    $.ajax({
        type: 'POST',
        url: "https://us-central1-abstractlabeling.cloudfunctions.net/submit/",
        data: {
            email: email,
            name: filename,
            data: submissionObj
        },
        crossDomain: true,
        success: function (res) {
            alert(res);
        },
        error: function (error) {
            alert("Submission failed.\n Please try it again.");
        }
    });
}

$(function () {

    var provider = new firebase.auth.GoogleAuthProvider();

    $("#submit-btn").click((event) => {

        // Check if the paper type and the confidence rank have been selected.
        if ($('input[name="confidence"]:checked').length == 0 || $('input[name="type"]:checked').length == 0) {
            alert("Please select the paper type and the confidence rank first.");
            return false;
        }

        firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.user;
            console.log(user.email);
            submit(user.email);
        }).catch(function (error) {

        });
    });
});