import Game from "../../models/player.js";
import Stadium from "../../models/team.js";
import Tournament from "../../models/tournament.js";


const getAll = async (req,res) =>{
    try{
        let game =await Game.findAll({
            attributes: ["idgame","name","datetime"],
             include:[
             
             {
                model:Stadium,
                attributes:["idstadium","name",],
                as: "stadium"
            },
            {
                model:Tournament,
                attributes:["idtournament","name"],
                as:"tournament"
            }
        ]
        });
        res.send(game);

    }catch (error){
        res.status(500).send({
            message: error.message || "Error"
        });
    }
};


const getById = async (req,res) => {
    try{
        let id = req.params.id;
        let game = await Game.findByPk(id,{
            attributes:["idgame","name","datetime"],
            include:{
                model:Tournament,
                attributes:["idtournament","name"],
                as:"tournament"
            }
        });
        if(!game){
            res.status(404).send({
                message:`Cannot find game with id= ${id},`
            });
        } else{
            res.send(game);
        }
    } catch (error){
        res.status(500).send({
            message:error.message || "Some error occurred while retrieving games"
        });
    }
};



const create = async (req,res) =>{
    try{
        let name = req.body.name;
        let datetime = req.body.datetime;
        let idstadium = req.body.idstadium;
        let idtournament = req.body.idtournament;
        let game = await Game.create({"name":name,"datetime":datetime,"idstadium":idstadium,"idtournament":idtournament});
        res.send(game);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error occurred while creating a game"
        })

    }
}

const update = async (req,res) => {
    try{
        let idgame = req.params.id;
        let name = req.body.name;
        let datetime = req.body.datetime;
        let idstadium = req.body.idstadium;
        let idtournament =req.body.idtournament;
        let game = await Game.update({"name":name,"datetime":datetime,"idstadium":idstadium,"idtournament":idtournament},{
            where:{
                idgame:idgame
            }
        });
        res.send(game);
    }catch(error){
        res.status(500).send({
            message:error.message || "Some error occurred while updating a game"
        });
    }
}

const deletes = async (req,res) => {
    try{
        let idgame = req.params.id;
        let game = await Game.destroy({
            where:{
                idgame:idgame
            }
        });
        res.send("game deleted");
    }catch(error){
        res.status(500).send({
            message:error.message || "Some error occurred while deleting a game"
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