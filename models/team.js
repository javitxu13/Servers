import connection from "../config/orm.js";
import Sequelize from "sequelize";
import Stadium from "./stadium.js";
import Game from "./game.js";
import Tournament from "./tournament.js";

const Team = connection.define("team",{
    idteam:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unsigned:true,
    },

    name:{
        type:Sequelize.STRING(45),
        allowNull:false
    },
    creation_date:{
        type: Sequelize.DATEONLY,
        allowNull:true,
    },
    idcaptain:{
        type: Sequelize.INTEGER,
        allowNull:true,
        Unsigned:true,
        references:{
            model:"player",
            key:"idplayer"
        }
    },
    idstadium:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unsigned:true,
        references:{
            model:"stadium",
            key:"idstadium"
        }
    }
},
{
    freezeTableName:true,
    timestamps:false
  
});

Team.belongsTo(Stadium,{
    foreignKey:"idstadium"
});

Stadium.hasMany(Team,{
    foreignKey:"idstadium",
});
Team.belongsToMany(Game,{
   through:"team_has_game",
   timestamps:false,
   foreignKey: "idteam",
   otherKey:"idgame"
});

Game.belongsToMany(Team,{
    through:"team_has_game",
    timestamps:false,
    foreignKey: "idgame",
    otherKey:"idteam"
 });

 Team.belongsToMany(Tournament,{
    through:"tournament_has_team",
    timestamps:false,
    foreignKey: "idteam",
    otherKey:"idtournament"
 });

 Tournament.belongsToMany(Team,{
    through:"tournament_has_team",
    timestamps:false,
    foreignKey: "idtournament",
    otherKey:"idteam"
 });


export default Team;