

const validetionUser = (username)=>{
    const regex = /^[a-zA-z\d_]{4,20}$/;
    const result = regex.test(username);
  return result;
    
}
const validationPass = (password)=>{
    const regex = /^.{6,20}$/;
    const result = regex.test(password);
    return result;

}

export {validetionUser,validationPass};