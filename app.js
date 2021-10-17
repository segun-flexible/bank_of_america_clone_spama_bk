const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require('path');
const errorMiddleWare = require("./middleware/errorMiddleware");
const logger = require("./helpers/logger");
const generalRoute = require("./routes/general/general");





try {




require("dotenv").config()




const app = express();

//Cors
app.use(cors({origin:"*"}))


//Helmet

  app.use(helmet(
  {
    contentSecurityPolicy: false,
  }
))


//Hpp Security
app.use(hpp())

  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

  

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join('public')));

  
//Routes
  
//GENERAL ROUTE
app.use("/",generalRoute)




//Error Middleware
app.use(errorMiddleWare)

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>console.log("App Started @ Port", PORT)) 
  

  process.on('uncaughtException', function (err) {
  logger.debug(err)
    
});

process.on('unhandledRejection', (reason, promise) => {
  logger.debug(reason)
})





  
} catch (error) {
  logger.debug(error)
}