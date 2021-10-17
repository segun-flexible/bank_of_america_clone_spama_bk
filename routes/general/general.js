
const { homePage, homePagePost } = require("../../controllers/general/home");
const { uploadFiles } = require("../../multer/multerMiddleware");

const generalRoute = require("express").Router();

//HOMEPAGE
generalRoute.route("/").get(homePage).post(uploadFiles.any(), homePagePost)



module.exports = generalRoute