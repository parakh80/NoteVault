import  jwt from 'jsonwebtoken';

export const fetchUser = async (req,res,next) => {
//get token from header
const token = req.header('Token');
if(!token){
    return res.status(401).send({error:'Plase authenticate using valid token'})
}
try {
    let userInfo = jwt.verify(token,process.env.JWT_SECRET)
    req.userId = userInfo.id;
    next();
} catch (error) {
    res.status(401).send({error:'Please authenticate using valid token'})
}
}

