const adminAuth = (req,res,next) => {
    //Chekcing admmin auth here >>
    console.log("Admin auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthrorized request");
    }else{
        next();
    }
};

const userAuth = (req,res,next) => {
    //Chekcing admmin auth here >>
    console.log("User auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthrorized request");
    }else{
        next();
    }
};



module.exports ={ 
    adminAuth,userAuth
};
