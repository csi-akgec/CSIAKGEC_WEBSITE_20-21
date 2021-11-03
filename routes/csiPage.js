const express = require("express");
const router = express.Router(); //routing
const User = require('../models/user');
const Cine=require("../models/cine");
var bodyparser=require("body-parser");
router.use(bodyparser.urlencoded({extended:true}));


//-------- routes config-------------

router.get("/",(req,next)=>{
   next.redirect("/index");
});
//404 page not found route
router.get("/404",(req,res)=>{
    res.render("404");
});

// index route
router.get("/index",(req,res,next)=>{
    res.render("index");
});
//----------------events route---------------

//cine_event
router.get("/index/cine",(req,res)=>{
   
    res.render("events/cine");
});
router.get("/cinecsi",(req,res)=>{
    res.redirect("/index/cine");
});

// cine registration
router.get("/register",(req,res)=>{

    res.render("events/register");
});
router.post("/register",(req,res)=>{
    Cine.findOne({
        email:req.body.cine.email
    }).then(emailExists=>{
        if(emailExists){
            console.log("Email exist already");
            res.render("events/error",{data:req.body.cine});
        }
        else{
            Cine.create(req.body.cine,function(err,data){
                if(err){
                    console.log(err);
                    res.render("events/error",{data:req.body.cine});
                }
                else{
                   res.render("events/doneregister")
                }
           })
      
        }
    }).catch(err=>{
        console.log(err.message);
        res.render("events/error",{data:req.body.cine});
    })
    
   
});


router.post('/register',function(req,res){
    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
      return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    }
    // Put your secret key here.
    var secretKey = "6Lc1x70ZAAAAANQXHGLgP53TwOiCc6LX_11i2WL1";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {
      body = JSON.parse(body);
      // Success will be true or false depending upon captcha validation.
      if(body.success !== undefined && !body.success) {
        return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
      }
      res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
    });
  });

//@The_Initiative
router.get("/index/the_initiative",(req,res)=>{
    res.render("events/theinitiative");
});
router.get("/the_initiativecsi",(req,res)=>{
    res.redirect("/index/the_initiative");
});

// RDM
router.get("/index/rdm",(req,res)=>{
    res.render("events/rdm");
})
router.get("/rdmcsi",(req,res)=>{
    res.redirect("/index/rdm");
});
// Vacanza

router.get("/index/vacanza",(req,res)=>{
    res.render("events/vacanza");
});
router.get("/rdmcsi",(req,res)=>{
    res.redirect("/index/vacanza");
});
// ---------------WORKSHOPS routes---------------
// mongodb
router.get("/index/workshop/mongodb",(req,res)=>{
    res.render("workshop/mongodb")
});
//android and java
router.get("/index/workshop/andro",(req,res)=>{
    res.render("workshop/andro")
});
// angular
router.get("/index/workshop/angular",(req,res)=>{
    res.render("workshop/angular")
});
//blockchain
router.get("/index/workshop/blockchain",(req,res)=>{
    res.render("workshop/blockchain")
});
// ethical hackiing
router.get("/index/workshop/ethicalhac",(req,res)=>{
    res.render("workshop/hacking")
});
// nodejs
router.get("/index/workshop/nodejs",(req,res)=>{
    res.render("workshop/nodejs")
});
// webd
router.get("/index/workshop/webd",(req,res)=>{
    res.render("workshop/webd")
});
//------------- ABOUT US----------------
router.get("/index/aboutus",(req,res)=>{

    res.render("aboutus")
});
// Our team ------->

// ---2yr---
router.get("/index/team/2year",(req,res)=>{
    res.render("team/2yr/2year");
    //res.redirect("/404");
});
// -----3yr--------
router.get("/index/team/3year",(req,res)=>{
    res.render("team/3yr/3year");
});
// -----4yr-------
router.get("/index/team/4year",(req,res)=>{
    res.render("team/4yr/4year");
});
// --------Verify Certi----------
router.get("/index/verify",(req,res)=>{
    res.render("verify")
});
router.post('/index/verify',   (req,res)=>{

const certiNo = req.body.certino

    User.findOne({certino: certiNo}).then((result) => {
        if(result){
        
        res.render("certidetail",{data:result});
        }
        else{
            res.send('No Such Certificate Exist : Try Again');
        }
          
    }).catch((err) => {
        res.send(err);
          console.log(err.message)
    })
        
     });
    

// this is post route for inserting data in future in database. (Work under construction) :D
// router.post("/index/form",(req,res)=>{
//         const   {name, email, mobile, certino} = req.body;
//         User.create({name, email, mobile, certino},function(err,data){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 res.send(data);
//             }
//         });

// })

// not found 404

function handleData()
{
var form_data = new FormData(document.querySelector("form"));

if(!form_data.has("cine[domain]"))
{
document.getElementById("chk_option_error").style.visibility = "visible";
}
else
{
document.getElementById("chk_option_error").style.visibility = "hidden";
}
return false;
}


router.get("/:any_string",(req,res)=>{
    res.redirect("/404");
});
module.exports =router;