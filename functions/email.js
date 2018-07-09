var nodemailer = require('nodemailer');

// Initialize transporter
transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 447, // Gmail Port
    auth: {
        user: "ntuabstractlabeler@gmail.com",
        pass: "abstract_labeler_admin"
    }
});

// Set email options
var mailOptions = {
    from: "ntuabstractlabeler@gmail.com",
    to: "",
    subject: "標註者您好！",
    html: `感謝您申請成為本計畫的標註者， <br/> 
            您必須先通過基本的標註測試， 我們才會正式聘雇您為標註者。 <br/> <br/>
            請下載附檔的三份測試文件， <br/>
            並至 <a href="https://abstractlabeling.firebaseapp.com/labeling-tool.html"> 標註工具 </a> 完成您的標註測試。`,
    attachments: [{
            path: './data/raw/cs_CL_2049.txt'
        },
        {
            path: './data/raw/cs_DM_791.txt'
        },
        {
            path: './data/raw/cs_CV_4304.txt'
        }
    ]
};

// Function to send eamil
exports.send = function (email) {
    console.log("Send email to " + email);
    mailOptions.to = email;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log('Email sending error: ' + error);
        }
        console.log('Message sent: ' + info.response);
    });
};



var notifications = {
    from: "ntuabstractlabeler@gmail.com",
    to: "jk78346@gmail.com",
    subject: "標註者入取通知您好！",
    html: ``,
};

exports.send_notification = function (ID) {
    console.log("Send email to owner.");
    notifications.html = ID + "已經通過標註測試。 \n請盡快備妥100份標註文件寄給他。";
    transporter.sendMail(notifications, function (error, info) {
        if (error) {
            return console.log('Email sending error: ' + error);
        }
        console.log('Message sent: ' + info.response);
    });
};