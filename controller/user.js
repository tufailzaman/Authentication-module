const bcrypt = require('bcryptjs');
const userModel = require('../model/user');

exports.postUser = async (req, res, next) => {
    try{
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        const user = await userModel.findOne({email: email});
        if(user) {
            res.send({
                sucess: true,
                error: false,
                message: `This gmail ${email} already exist `
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const data = new userModel ({
            firstName : firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            confirmPassword: hashedPassword

        })
        const dsave = await data.save();
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