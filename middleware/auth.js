export function checkAuthenticated(req,res,next){
    console.log(req);
    if(req.isAuthenticated()){
        console.log('user is authenticated');
        return next();
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"});
}

