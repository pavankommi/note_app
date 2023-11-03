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