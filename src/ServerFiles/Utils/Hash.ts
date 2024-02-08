const bcrypt = require('bcrypt');
const saltRounds = 10;


export const hashPass = (pass: string) => {
    const hashPass = bcrypt.hashSync(pass, saltRounds);
    return hashPass
}

export const matchPass = (pass: string, hashPass: string) => {
    const isMatch = bcrypt.compareSync(pass, hashPass);
    return isMatch
}