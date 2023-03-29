import Game from "../../models/game.js";
import Team from "../../models/team.js";
import Tournament from "../../models/tournament.js";

const getAll = async (req, res) => {
  try {
    let tournaments = await Tournament.findAll({
      attributes: ["idtournament", "name"],
      include: [
        {
          model: Team,
          attributes: ["name", "idstadium"],
          as: "team",
        },
        {
          model: Game,
          attributes: ["name", "idgame"],
          as: "game",
        },
      ],
    });
    res.send(tournaments);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let tournament = await Tournament.findByPk(id, {
      attributes: ["idtournament", "name"],
      include: [
        {
          model: Team,
          attributes: ["name", "idstadium"],
          as: "team",
        },
        {
          model: Game,
          attributes: ["name", "idgame"],
          as: "game",
        },
      ],
    });
    if (!tournament) {
      res.status(404).send({
        message: `Cannot find tournament with id = ${id}`,
      });
    } else {
      res.send(tournament);
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tournament",
    });
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name;
    let idtournament = req.body.idtournament;
    let tournament = await Tournament.create({
      name: name,
      idtournament: idtournament,
    });
    res.send(tournament);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating a tournament",
    });
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let name = req.body.name;
    let idtournament = req.body.idtournament;
    let tournament = await Tournament.update(
      { name: name, idtournament: idtournament },
      { where: { idtournament: id } }
    );
    if (tournament == 1) {
      res.send({
        message: "Tournament updated successfully.",
      });
    } else {
      res.status(404).send({
        message: `Cannot update tournament with id = ${id}. Maybe tournament was not found or req.body is empty.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating a tournament",
    });
  }
};

const deletes = async (req, res) => {
  try {
    let id = req.params.id;
    let tournament = await Tournament.destroy({
      where: { idtournament: id },
    });
    if (tournament == 1) {
      res.send({
        message: "Tournament deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete tournament with id = ${id}. Maybe tournament was not found.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while deleting a tournament",
    });
  }
} 