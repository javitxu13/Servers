const isAuthorized = (req,res,next) => {
    const password = req.body.password;
    if(password === "mi-contraseña"){
        next();
    }
    else{
        res.send("No tienes autorizacion para esta accion");
    }
}

export default isAuthorized;