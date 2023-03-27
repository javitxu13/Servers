import connection from "../config/db.js";

const getAll = (req,res) => {
    let sql = "SELECT game.idgame,game.name,game.datetime,game.idstadium,game.idtournament as tournament\
    FROM game\
    LEFT JOIN tournament ON game.idtournament = tournament.idtournament\
    ";
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.send(result);
    });
};

const getByid = (req,res) => {
    let sql = "SELECT game.idgame,game.name,game.datetime,game.idstadium,game.idtournament as tournament\
    FROM game\
    LEFT JOIN tournament ON game.idtournament = tournament.idtournament\
    ";
    connection.query(sql,[req.params.id], (err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const create = (req,res) => {
    let idgame = req.body.idgame;
    let name = req.body.name;
    let datetime = req.body.datetime;
    let idstadium = req.body.idstadium;
    let idtournament = req.body.idtournament;
    let sql = "INSERT INTO game (idgame,name,datetime,idstadium,idtournament)\
    VALUES (?,?,?,?)";
    connection.query(sql,[idgame,name,datetime,idstadium,idtournament], (err,result) => {
        if (err) throw err;
        res.send(result);
    });

}

    const update = (req,res) => {
            let idgame = req.body.idgame;
            let name = req.body.name;
            let datetime = req.body.datetime;
            let idstadium = req.body.idstadium;
            let idtournament = req.body.idtournament;
            let sql = "INSERT INTO game (idgame,name,datetime,idstadium,idtournament)\
            VALUES (?,?,?,?)";
            connection.query(sql,[idgame,name,datetime,idstadium,idtournament], (err,result) => {
                if (err) throw err;
                res.send(result);
            });    

}

const deletes = (req,res) => {
    let idgame = req.params.id;
    let sql = "DELETE FROM  game WHERE idgame=?";
    connection.query(sql,[idplayer], (err,result) => {
        if (err) throw err;
        res.send(result);
    });

}

export default {
    getAll,
    getByid,
    create,
    update,
    deletes
}