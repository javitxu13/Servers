import connection from "../config/db.js";

const getAll = (req,res) => {
    let sql = "SELECT tournament.idtournament,tournament.name\
    FROM tournament\
    JOIN game ON tournament.idtournament = game.idtournament\
    ";
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.send(result);
    });
};

const getByid = (req,res) => {
    let sql = "SELECT tournament.idtournament,tournament.name\
    FROM tournament\
    LEFT JOIN game ON tournament.idtournament = game.idtournament\
    ";
    connection.query(sql,[req.params.id], (err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const create = (req,res) => {
    let idtournament = req.body.idtournament;
    let name = req.body.name;
    let sql = "INSERT INTO tournament (idtournament,name)\
    VALUES (?,?,?,?)";
    connection.query(sql,[idtournament,name,], (err,result) => {
        if (err) throw err;
        res.send(result);
    });

}

    const update = (req,res) => {
    let idtournament = req.body.idtournament;
    let name = req.body.name;
    let sql = "UPDATE tournament\
    SET name=?,last_name=?,age =?,idteam =?\
    WHERE idtournament=?";
    connection.query(sql,[idtournament,name], (err,result) => {
        if (err) throw err;
        res.send(result);
    });

}

const deletes = (req,res) => {
    let idtournament = req.params.id;
    let sql = "DELETE FROM  tournament WHERE idtournament=?";
    connection.query(sql,[idtournament], (err,result) => {
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