import connection from "../config/db.js";

const getAll = (req,res) => {
    let sql = "SELECT stadium.idstadium,stadium.name,stadium.adress,stadium.capacity\
    FROM Stadium\
    LEFT JOIN game ON stadium.idstadium = game.idstadium\
    ";
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.send(result);
    });
};

const getByid = (req,res) => {
    let sql = "SELECT stadium.idstadium,stadium.name,stadium.adress,stadium.capacity\
    FROM Stadium\
    LEFT JOIN game ON stadium.idstadium = game.idstadium\
    ";
    connection.query(sql,[req.params.id], (err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const create = (req,res) => {
    let idstadium = req.body.idstadium;
    let name = req.body.name;
    let adress = req.body.adress;
    let capacity = req.body.adress;
    let sql = "INSERT INTO stadium (idstadium,name,adress,capacity)\
    VALUES (?,?,?,?)";
    connection.query(sql,[idstadium,name,adress,capacity], (err,result) => {
        if (err) throw err;
        res.send(result);
    });

}

    const update = (req,res) => {
        let idstadium = req.body.idstadium;
        let name = req.body.name;
        let adress = req.body.adress;
        let capacity = req.body.adress;
        let sql = "INSERT INTO stadium (idstadium,name,adress,capacity)\
        VALUES (?,?,?,?)";
        connection.query(sql,[idstadium,name,adress,capacity], (err,result) => {
            if (err) throw err;
            res.send(result);
        });
    
}

const deletes = (req,res) => {
    let idstadium = req.params.id;
    let sql = "DELETE FROM  stadium WHERE idstadium=?";
    connection.query(sql,[idstadium], (err,result) => {
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