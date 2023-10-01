import nodemailer  from "nodemailer";

export async function sendEmail(dest,subject,message) {

 let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.NodemailerEmail,
      pass: process.env.NodemailerPassword
    }
  });
  


  let info = await transporter.sendMail({
    from:`T-shop ,<${process.env.NodemailerEmail}>` ,
    to: dest, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  });

  return info
}

