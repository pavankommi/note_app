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

const methods = {
    GET: 'get',
    POST: 'post'
}

const urls = {
    loginUrl: 'users/login',
    verifyEmail: 'users/verifyEmail',
    logout: 'users/logout'
}

export {
    methods,
    urls,
}