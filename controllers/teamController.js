import Player from "../models/player.js";
import Team from "../models/team.js";

const getAll = async (req, res) => {
  try {
    let id = req.params.id;
    let team = await Team.findByPk(id, {
      attributes: ["idteam", "name", "creation_date", "idcaptain", "idstadium"],
      include: [
        {
          model: Player,
          attributes: ["name", "idplayer"],
          as: "players",
        },
        {
          model: Stadium,
          attributes: ["idstadium", "name", "capacity"],
          as: "stadium",
        },
        {
          model: Player,
          attributes: ["idplayer", "name", "last_name", "age"],
          as: "captain",
        },
      ],
    });

    if (!team) {
      res.status(500).send({
        message: error.message || "Error",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let player = await Player.findByPk(id, {
      attributes: ["idplayer", "name", "last_name", "age"],
      include: {
        model: Team,
        attributes: ["name", "idteam"],
        as: "team",
      },
    });
    if (!player) {
      res.status(404).send({
        message: `Cannot find player with id= ${id}`,
      });
    } else {
      res.send(player);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving players",
    });
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name;
    let last_name = req.body.last_name;
    let age = req.body.age;
    let idteam = req.body.idteam;
    let player = await Player.create({
      name: name,
      last_name: last_name,
      age: age,
      idteam: idteam,
    });
    res.send(player);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating a player",
    });
  }
};

const update = async (req, res) => {
  try {
    let name = req.body.name;
    let last_name = req.body.last_name;
    let age = req.body.age;
    let idteam = req.body.idteam;
    let idplayer = req.body.idplayer;
    let player = await Player.update(
      {
        name: name,
        last_name: last_name,
        age: age,
        idteam: idteam,
      },
      {
        where: {
          idplayer: idplayer,
        },
      }
    );
    res.send(player);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating a player",
    });
  }
};

const deletes = async (req, res) => {
  try {
    let idplayer = req.params.id;
    await Player.destroy({
      where: {
        idplayer: idplayer,
      },
    });
    res.send("Player deleted");
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while deleting a player",
    });
  }
};

export default {
    getAll,
    getById,
    create,
    update,
    deletes
}