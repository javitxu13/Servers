import Player from "../../models/player.js";
import Team from "../../models/team.js";


const getAll = async () =>{
    try{
        let players = await Player.findAll({
            attributes: ["idplayer","name","last_name","age"],
             include:{
                model:Team,
                attributes:["name","idteam"],
                as: "team"
            }
        });
        return [0,players];
    }catch (error){
        return [1,error];
    }
};


const getById = async (id) => {
    try{
        let player = await Player.findByPk(id,{
            attributes:["idplayer","name","last_name","age"],
            include:{
                model:Team,
                attributes:["name","idteam"],
                as: "team"
            }
        });return [0,player,]
    } catch (error){
        return [1,error]
    }
};



const create = async (data) =>{
    try{
        let player = await Player.create(data);
        return [0,player];
    }catch (error){
        return[1,error];
    }
}

    const update = async (data,idplayer) => {
        try{
            let player = await Player.update(data,{
                where:{
                    idplayer:idplayer
                }
            });
    return [0,player];
    }catch(error){
        return[1,error];
    }
}


const deletes = async (idplayer) => {
    try{
        let player = await Player.destroy({
            where:{
                idplayer:idplayer
            }
        });
        return [0,player];
    }catch (error){
        return[1,error];
    }
}


export default {
    getAll,
    getById,
    create,
    update,
    deletes
}