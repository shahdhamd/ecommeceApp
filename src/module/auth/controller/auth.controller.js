import {userModel} from "../../../../DB/model/user.model.js";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";
import { sendEmail } from "../../../services/email.js";
export const signup=async(req,res)=>{
    const{userName,email,password}=req.body;
    const user=await userModel.findOne({email}).select('email') // يفحص اذا موجود في الداتا من قبل
    if(user){
        res.status(409).json('email exit')
    }else{
        const hash=bcrypt.hashSync(password,parseInt(process.env.SaltRound)) // شفرت
        const newUser=new userModel({userName:userName,email,password:hash}) // لسا ما حفظه في الداتا بيس
        // const link=`localhost:3000/api/v1/auth/confirmEmail/token`;
        const token= jwt.sign({id:newUser._id},process.env.EmailToken,{expiresIn: '1h'})
        // const link=`${req.protocol}://${req.headers.host}${process.env.BASEURL}auth/confirmEmail/${token}`;
        // res.json(link)
        const message=`<!DOCTYPE html>
        <html>
        <head>
        
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Email Confirmation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
          /**
           * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
           */
          @media screen {
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 400;
              src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 700;
              src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
          }
          /**
           * Avoid browser level font resizing.
           * 1. Windows Mobile
           * 2. iOS / OSX
           */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
           * Remove extra space added to tables and cells in Outlook.
           */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
           * Better fluid images in Internet Explorer.
           */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
           * Remove blue links for iOS devices.
           */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
           * Fix centering issues in Android 4.4.
           */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
           * Collapse table borders to avoid space between cells.
           */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #1a82e2;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
          </style>
        
        </head>
        <body style="background-color: #e9ecef;">
        
          <!-- start preheader -->
          <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
            A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
          </div>
          <!-- end preheader -->
        
          <!-- start body -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 50px">
        
            <!-- start logo -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end logo -->
        
            <!-- start hero -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                      <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end hero -->
        
            <!-- start copy block -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                  <!-- start button -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="margin: 20px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" bgcolor="#ffffff" style="padding: 30px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                  <a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}auth/confirmEmail/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">verify Email</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end button -->
        
                  <!-- start copy -->
                  
                  <!-- end copy -->
        
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end copy block -->
        
            <!-- start footer -->
            
            <!-- end footer -->
        
          </table>
          <!-- end body -->
        
        </body>
        </html>`
        const info=await sendEmail(email,'verify email',message)
        // res.json(info)
        if(info.accepted.length){ // اذا بعتت الرسالة للايميل 
            const saveUser=await newUser.save();  // يقوم بحفظ الكولوم الجديد قي الداتا بيس
            res.status(201).json({message:'sucess',saveUser})
        }else{
            res.status(404).json({message:'email rejected'})
        }
    }
}

export const confirmEmail=async(req,res)=>{
    try{
        const {token}=req.params;
        const decoded=jwt.verify(token,process.env.EmailToken)
        // res.json(decoded)
        if(!decoded.id){
            res.status(400).json({message:'invalid payload'})
        }else{
            const user=await userModel.findByIdAndUpdate({_id:decoded.id,confirmEmail:false},{confirmEmail:true})
            // res.status(200).json({message:'sucess',user})
            res.status(200).redirect(process.env.loginPage) // مشان يحول يحولني على صفحة تانية
        }

    }catch(error){
        res.status(500).json({message:'error',error})
    }
}

export const signin=async(req,res,next)=>{
        const {email,password,userName}=req.body;  
        const user=await userModel.findOne({email});
        // res.json(user)
        if(!user){
            // res.status(404).json({message:'email not exist'})
            return next(new Error("email not exist",{cause:404}))
        }else{
            if(!user.confirmEmail){
                // res.status(400).json({message:'email not confirmed'})
                return next(new Error("email not confirmed",{cause:400}))
              }else{
                if(user.blocked){
                    // res.status(400).json({message:'blocked account'})
                    return next(new Error("blocked account",{cause:400}))
                }else{
                    const match=await bcrypt.compare(password,user.password)
                    if(!match){
                        // res.status(400).json({message:'invalid password'})
                        return next(new Error("invalid password",{cause:400}))
                      }else{
                        const token= jwt.sign({id:user._id},process.env.TokenSignIn,{expiresIn:60 * 60 * 24})
                        res.status(200).json({message:'sucess',token})
                    }
                }
            }
        }
}