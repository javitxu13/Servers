import {Router} from "express";
import isAuthorized from "../middlewares/auth.js";
import playerController from "../controllers/playerController.js";

const router = Router();

router.get("/", (req,res)=>{
    playerController.getAll(req,res);
    //res.send("Mostrar todos los jugadores");
});

router.get("/:id", (req,res)=>{
    playerController.getByid(req,res);
    //res.send("Mostrar un jugador con id " +req.params.id);
});

 //Crear un nuevo jugador

router.post("/",isAuthorized,(req,res)=>{
    playerController.create(req,res);
    // res.send("Crear un nuevo jugador");
});

//Editar un jugador

router.put("/:id",isAuthorized,(req,res)=>{
    playerController.update(req,res);
    //res.send("Editar jugador" +req.params.id);
});

//Eliminar un jugador

router.delete("/:id",isAuthorized,(req,res)=>{
    playerController.deletes(req,res);
    //res.send("Eliminar jugador"+req.params.id);
});

export default router;