import Player from "../../models/player.js";
import Team from "../../models/team.js";
import playerController from "./playerController.js";

const getAll = async (req,res) =>{
    
let result = await playerController.getAll();
if (result[0] ===0){
    res.send("players",{players:result[1]});
}else{
    let error = result[1];
    res.status(500).send({
        message:error.message || "some error ocurred while"
    });
}
};

const getById = async (req,res) => {
    let id= req.params.id;
        let result = await playerController.getById(id);
        if(result[0] === 0){
            let player = result[1];
            if (!player){
                res.status(404).send({
                    message:`cannot find player with id= ${id}.`
                });
        }else{
            res.send(player);
        }
    } 
    else{
        let error = result[1];
        res.status(500).send({
            message:error.message || "Some error ocurred"
        });
    }
};


const create = async (req,res) =>{
        let data={
            name:req.body.name,
            last_name: req.body.last_name,
            age: req.body.age,
            idteam: req.body.idteam
        }
        let result = await playerController.create(data);


        if(result[0]===0){
        res.send(result[1]);
    }else{
        let error = result[1];
        res.status(500).send({
            message:error.message || "Some error occurred while creating a player"
        });

    }
}



    const update = async (req,res) => {
        let data= {
             name : req.body.name,
             last_name : req.body.last_name,
             age : req.body.age,
             idteam : req.body.idteam
        }
        let idplayer =req.params.id;
        let result = await playerController.update(data,idplayer);
        if (result[0]===0){
            res.send(result[1]);
        }else{
            let error = result[1];
            res.status(500).send({
                message:error.message || "Some error"
            });
        }
    }


const deletes = async (req,res) => {
    
        let idplayer = req.params.id;
        let result = await playerController.deletes(idplayer);
        if (result[0]===0){
            res.send(result[1]);
        }else{
            let error = result[1];
            res.status(500).send({
                message:error.message || "Some error"
            });
        }
    }


export default {
    getAll,
    getById,
    create,
    update,
    deletes
}