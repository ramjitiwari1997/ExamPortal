const nodemailer=require('nodemailer');
var obj={
sendmail:function(mail,subject,text){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 't.ramji1997@gmail.com',
               pass: 'Tiwariramji@121'
           }
       });
       const mailOptions = {
        from: 't.ramji1997@gmail.com', 
    
        to: mail,
        subject: subject, 
        html: text
      };



      transporter.sendMail(mailOptions, function (err, info) {

         
        
     });

}
}
module.exports=obj;