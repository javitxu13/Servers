import Game from "../../models/game.js";
import Team from "../../models/team.js";
import Stadium from "../../models/stadium.js";


const getAll = async (req, res) => {
  try {
    let stadiums = await Stadium.findAll({
      attributes: ["idstadium", "name", "address", "capacity"],
      include: [
        {
          model: Team,
          attributes: ["name", "idteam"],
          as: "team",
        },
        {
          model: Game,
          attributes: ["name", "idgame"],
          as: "game",
        },
      ],
    });
    res.send(stadiums);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let stadium = await Stadium.findByPk(id, {
      attributes: ["idstadium", "name", "address", "capacity"],
      include: [
        {
          model: Team,
          attributes: ["name", "idteam"],
          as: "team",
        },
        {
          model: Game,
          attributes: ["name", "idgame"],
          as: "game",
        },
      ],
    });
    if (!stadium) {
      res.status(404).send({
        message: `Cannot find stadium with id= ${id}`,
      });
    } else {
      res.send(stadium);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving stadiums",
    });
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name;
    let address = req.body.address;
    let capacity = req.body.capacity;
    let stadium = await Stadium.create({
      name: name,
      address: address,
      capacity: capacity,
    });
    res.send(stadium);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating a stadium",
    });
  }
};

const update = async (req, res) => {
  try {
    let idstadium = req.params.id;
    let name = req.body.name;
    let address = req.body.address;
    let capacity = req.body.capacity;
    let stadium = await Stadium.findByPk(idstadium);
    if (!stadium) {
      res.status(404).send({
        message: `Cannot find stadium with id= ${idstadium}`,
      });
    } else {
      await stadium.update({
        name: name,
        address: address,
        capacity: capacity,
      });
      res.send(stadium);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating a stadium",
    });
  }
};

const deletes = async (req, res) => {
  try {
    let idstadium = req.params.id;
    let stadium = await Stadium.destroy({
      where: {
        idstadium: idstadium,
      },
    });
    res.send("Stadium deleted");
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting a stadium",
    });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  deletes,
};