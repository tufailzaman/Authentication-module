const bcrypt = require('bcryptjs');
const userSchema = require('../model/validator');
const nodemailer = require('nodemailer');
const sendgridTranport = require('nodemailer-sendgrid-transport')
const userModel = require('../model/user');
const {config} = require('dotenv');
config();



const transporter = nodemailer.createTransport(sendgridTranport({
    auth: {
            api_key: process.env.api_key
    }
}))

exports.postUser = async (req, res, next) => {
    const {error} = userSchema.validate(req.body);
    if(error) {
     return   res.status(400).send(error.details[0].message);
    }
    try{
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        const user = await userModel.findOne({email: email});
        if(user) {
         return   res.send({
                sucess: true,
                error: false,
                message: `${firstName} ${lastName} your gmail, ${email} already exist `
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 12);

        const data = new userModel ({
            firstName : firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword

        })
        const dsave = await data.save();
        transporter.sendMail({
            to: email,
            from: 'tufailzaman789@gmail.com',
            subject: 'Welcomed to Sign up page',
            html: `<html> 
                         <head>
                         <style>
    body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
    
    
    .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-decoration: none;
        }
        
        .button {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .button:hover {
            background-color: #3e8e41;
        }
                         </style>
                         </head>
                         <body>
                         <div class="container">
    
    
    <h2>Welcome to Sign up, ${firstName} ${lastName}!</h2>
    
    
    <p>Thank you for signing up for our Sign Up Page! We're excited to help you take your career to the next level.</p>
    
    
    <p>With our cutting-edge technology, you'll be able to create a professional CV in minutes and apply to your dream jobs with ease. Our system is designed to help you stand out from the competition and increase your chances of getting hired.</p>
    
    
    <p>If you have any questions or need assistance, please don't hesitate to reach out to us at tufailzaman789@gmail.com. We're here to help.</p>
    
    
    <p>Best regards,</p>
    <p>Automated Cv genration and apply system </p>
    
        </div>
        </body>
                         
                 </html>`
          });
        res.send({
            sucess: true,
            error: false,
            message: "data saved in the database"
        })
    }
    catch (error){
        res.send({
            sucess: false,
            error: true,
            message: "can not post data in the database"
        })
    }
};