import {Router} from "express";
import isAuthorized from "../../middlewares/auth.js";

const router = Router();


router.get("/", (req,res)=>{
    res.send("Mostrar todos los juegos");
});


router.get("/:id", (req,res)=>{
    res.send("Mostrar juegos con id " +req.params.id);
});

 
 //Crear un nuevo jugador
 
 router.post("/",isAuthorized,(req,res)=>{
    res.send("Crear un juego nuevo");
});


//Editar un jugador

router.put("/:id",isAuthorized,(req,res)=>{
    res.send("Editar juego" +req.params.id);
});

//Eliminar un jugador

router.delete("/:id",isAuthorized,(req,res)=>{
    res.send("Eliminar juego"+req.params.id);
});

export default router