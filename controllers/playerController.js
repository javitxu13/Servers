import connection from "../config/db.js";
import Player from "../models/player.js";
import Team from "../models/team.js";


const getAll = async (req,res) =>{
    try{
        let players =await Player.findAll({
            attributes: ["idplayer","name","last_name","age"],
             include:{
                model:Team,
                attributes:["name","idteam"],
                as: "team"
            }
        });
        res.send(players);

    }catch (error){
        res.status(500).send({
            message: error.message || "Error"
        });
    }
};
/* 
const getAll_old = (req,res) => {
    let sql = "SELECT player.idplayer,player.name,player.last_name,player.age,team.idteam as team\
    FROM player\
    LEFT JOIN team ON player.idteam = team.idteam\
    ";
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}; */


const getById = async (req,res) => {
    try{
        let id = req.params.id;
        let player = await Player.findByPk(id,{
            attributes:["idplayer","name","last_name","age"],
            include:{
                model:Team,
                attributes:["name","idteam"],
                as: "team"
            }
        });
        if(!player){
            res.status(404).send({
                message:`Cannot find player with id= ${id},`
            });
        } else{
            res.send(player);
        }
    } catch (error){
        res.status(500).send({
            message:error.message || "Some error occurred while retrieving players"
        });
    }
};

/* const getByid_old = (req,res) => {
    let sql = "SELECT player.idplayer,player.name,player.last_name,player.age,team.name as team\
    FROM player\
    LEFT JOIN team ON player.idteam = team.idteam\
    ";
    connection.query(sql,[req.params.id], (err,result) => {
        if (err) throw err;
        res.send(result);
    });
} */

const create = async (req,res) =>{
    try{
        let name = req.body.name;
        let last_name = req.body.last_name;
        let age = req.body.age;
        let idteam = req.body.idteam;
        let player = await Player.create({"name":name,"last_name":last_name,"age":age,"idteam":idteam});
        res.send(player);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error occurred while creating a player"
        })

    }
}

const create_old = (req,res) => {
    let name = req.body.name;
    let last_name = req.body.last_name;
    let age = req.body.age;
    let idteam = req.body.idteam;
    let sql = "INSERT INTO player (name,last_name,age,idteam)\
    VALUES (?,?,?,?)";
    connection.query(sql,[name,last_name,age,idteam], (err,result) => {
        if (err) throw err;
        res.send(result);
    });

}

    const update = async (req,res) => {
        try{
            let name = req.body.name;
            let last_name = req.body.last_name;
            let age = req.body.age;
            let idteam = req.body.idteam;
            let idplayer =req.body.idplayer;
            let player = await Player.update({"name":name,"last_name":last_name,"age":age,"idteam":idteam},{
                where:{
                    idplayer:idplayer
                }
            });
    res.send(player);
    }catch(error){
        res.status(500).send({
            message:error.message || "Some error occurred while creating a player"
        });
    }
}
    /* const update = (req,res) => {
    let name = req.body.name;
    let last_name = req.body.last_name;
    let age = req.body.age;
    let idteam = req.body.idteam;
    let idplayer =req.body.idplayer;
    let sql = "UPDATE player\
    SET name=?,last_name=?,age =?,idteam =?\
    WHERE idplayer=?";
    connection.query(sql,[name,last_name,age,idteam,idplayer], (err,result) => {
        if (err) throw err;
        res.send(result);
    });

} */
const deletes = async (req,res) => {
    try{
        let idplayer = req.params.id;
        let player = await Player.destroy({
            where:{
                idplayer:idplayer
            }
        });
        res.send("player deleted");
    }catch(error){
        res.status(500).send({
            message:error.message || "Some error occurred while creating a player"
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