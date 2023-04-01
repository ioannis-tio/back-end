module.exports = {
    verifyUser:function (req,res,next){
        const {password} = req.query;
        if(password === "123"){
            next()
        }
        res.send("password needed")
    }
}


 