import connection from "../config/db.js";

const getAll = (req,res) => {
    let sql = "SELECT team.idteam,team.name,team.creation_date,team.idcaptain,team.idstadium as stadium\
    FROM team\
    LEFT JOIN stadium ON team.idstadium = stadium.idstadium\
    ";
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.send(result);
    });
};

const getByid = (req,res) => {
    let sql = "SELECT team.idteam,team.name,team.creation_date,team.idcaptain,team.idstadium as stadium\
    FROM team\
    LEFT JOIN stadium ON team.idstadium = stadium.idstadium\
    ";
    connection.query(sql,[req.params.id], (err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const create = (req,res) => {
    let idteam = req.body.idteam;
    let name = req.body.name;
    let creation_date = req.body.creation_date;
    let idcaptain = req.body.idcaptain;
    let idstadium = req.body.idstadium;
   
    let sql = "INSERT INTO team (idteam,name,creation_date,idcaptain,idstadium)\
    VALUES (?,?,?,?)";
    connection.query(sql,[idteam,name,creation_date,idcaptain,idstadium], (err,result) => {
        if (err) throw err;
        res.send(result);
    });

}

    const update = (req,res) => {
        let idteam = req.body.idteam;
        let name = req.body.name;
        let creation_date = req.body.creation_date;
        let idcaptain = req.body.idcaptain;
        let idstadium = req.body.idstadium;
    let sql = "UPDATE player\
    SET idteam=?,name=?,creation_date=?,idcapatain =?\
    WHERE idstadium=?";
    connection.query(sql,[idteam,name,creation_date,idcaptain,idstadium], (err,result) => {
        if (err) throw err;
        res.send(result);
    });

}

const deletes = (req,res) => {
    let idteam = req.params.id;
    let sql = "DELETE FROM  team WHERE idteam=?";
    connection.query(sql,[idteam], (err,result) => {
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