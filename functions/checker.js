var fs = require('fs');

function string2words(string) {
    var words = string.replace(/\./g, "").split(" ");
    return words;
}

function computeCoverage(answer, submission) {
    var ans_target = string2words(answer.target);
    var ans_method = string2words(answer.method);
    var ans_result = string2words(answer.result);
    var sub_target = string2words(submission.target);
    var sub_method = string2words(submission.method);
    var sub_result = string2words(submission.result);

    var intersection_target = ans_target.filter(value => -1 !== sub_target.indexOf(value));
    var intersection_method = ans_method.filter(value => -1 !== sub_method.indexOf(value));
    var intersection_result = ans_result.filter(value => -1 !== sub_result.indexOf(value));

    var coverage = 100.0 * (intersection_target.length + intersection_method.length + intersection_result.length) /
        (ans_target.length + ans_method.length + ans_result.length);
    console.log(coverage);
    return coverage;
}

function checkSubmit(filename, submissionObj) {

    return new Promise((resolve) => {
        fs.readFile("./answers/" + filename + ".json", 'utf8', function (err, data) {
            if (err) throw err;
            console.log("111 " + JSON.parse(data.slice(1, data.length)).target);

            var score = computeCoverage(JSON.parse(data.slice(1, data.length)), submissionObj);

            resolve(score);
        });
    });

}


exports.checkSubmit = checkSubmit;