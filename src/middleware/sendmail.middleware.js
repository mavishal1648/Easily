import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'mavishal1648@gmail.com',
        pass:'rupawvvnmofkvbaa'
    },
});

export const mailConfirmation = async (userMail) => {
    const mailOptions = {
        from:'mavishal1648@gmail.com',
        to:userMail,
        subject:'Job Application Recieved',
        text:'Your job Applcation is recieved..ALL THE BEST🤞'
    };
    try{
        transporter.sendMail(mailOptions);
        console.log("mail Sent successfully");
    }catch{
        console.log("Mail failed sending to the user");
    };
}