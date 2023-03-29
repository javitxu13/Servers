import {Router} from "express";
import isAuthorized from "../../middlewares/auth.js";


const router = Router();


router.get("/", (req,res)=>{
    res.send("Mostrar todos los estadios");
});


router.get("/:id", (req,res)=>{
    res.send("Mostrar un estadio con id " +req.params.id);
});

 
 //Crear un nuevo jugador
 
 router.post("/",isAuthorized,(req,res)=>{
    res.send("Crear un nuevo estadio");
});


//Editar un jugador

router.put("/:id",isAuthorized,(req,res)=>{
    res.send("Editar estadio" +req.params.id);
});

//Eliminar un jugador

router.delete("/:id",isAuthorized,(req,res)=>{
    res.send("Eliminar estadio"+req.params.id);
});

export default router