export const constants = {
    appName: "Note Down."
}

export function validateEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
        console.log("Email is Not Correct");
        return true;
    }
    else {
        return false;
    }
}

export function validatePhone(text) {
    let reg = /^\d{10}$/;
    if (reg.test(text) === false) {
        console.log("Phone is Not Correct");
        return true;
    }
    else {
        return false;
    }
}

const methods = {
    GET: 'get',
    POST: 'post'
}

const urls = {
    loginUrl: 'users/login',
    signUp: 'users/signUp',
    verifyEmail: 'users/verifyEmail',
    logout: 'users/logout',
    forgotPassword: 'users/forgotPassword',
    resetPassword: 'users/resetPassword'
}

export {
    methods,
    urls,
}