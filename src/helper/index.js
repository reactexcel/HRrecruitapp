export const modifyEmail = (email) => {
    email.replace(/\./g,"");
    var modifyEmail = email.replace(/\./g,"");
    return modifyEmail
}
export const modifyDate = (date) => {
    date.replace(/\//g,"");
    var modifyDate = date.replace(/\//g,"");
    return modifyDate
}