import joi from "joi";

export const signup={
    body:joi.object().required().keys({
        userName:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required().pattern(new RegExp(/^[A-Z][a-z]{2,6}/)), //بمعنى لازم يبدا بكبتل وبعدين سمول ويكون من 2 ل 6 احرف
        cPassword:joi.string().valid(joi.ref('password')).required()
    })
}

export const signin={
    body:joi.object().required().keys({
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp(/^[A-Z][a-z]{2,6}/)).required()
    })
}