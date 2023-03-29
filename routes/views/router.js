import {Router} from "express";
import playerRouter from "./player.js"

/* import gameRouter from "./game.js"
import stadiumRouter from "./stadium.js"
import teamRouter from "./team.js"
import tournamentRouter from "./tournament.js"
 */

const router = Router();

router.use("/player",playerRouter);
/* router.use("/game",gameRouter);
router.use("/stadium",stadiumRouter);
router.use("/team",teamRouter);
router.use("/tournament",tournamentRouter); */



export default router;
