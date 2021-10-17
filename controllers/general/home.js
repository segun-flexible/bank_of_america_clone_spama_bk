const { sendInfo } = require("../../email/mails/sendInfo");
const asyncHandler = require("../../helpers/asyncHandler");
const browser = require('browser-detect');
const logger = require("../../helpers/logger");
const { getRandomNumber } = require("../../helpers/uniqueID");
const fs = require("fs");

exports.homePage = asyncHandler(async (req, res, next) => {
    return res.send("Backend Working")
})


exports.homePagePost = asyncHandler(async (req, res, next) => {
    
    //Get Browser Info
    const result = browser(req.headers['user-agent']);
    const obj = JSON.parse(req.body.obj);
    //Adding Ip Address
    obj.ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    sendInfo({ ...obj, ...result }, req.files)
    
    //Response To CLient
    return res.json({status:true})
    
})

