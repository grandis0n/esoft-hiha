import {Router} from "express";
import {AgentController} from "../controllers/AgentController.js";
import {errorMiddlewares} from "../middllewares/ErrorMiddlewares.js";
import {AgentValidatorsCreate, AgentValidatorsGet, AgentValidatorsUpdate} from "../validators/AgentValidators.js";
import {ClientValidatorsCreate, ClientValidatorsGet, ClientValidatorsUpdate} from "../validators/ClientValidators.js";
import {ClientController} from "../controllers/ClientController.js";
import {RealtyValidatorsCreate, RealtyValidatorsGet, RealtyValidatorsUpdate} from "../validators/RealtyValidators.js";
import {RealtyController} from "../controllers/RealtyController.js";
import {
    SuggestionValidatorsCreate,
    SuggestionValidatorsGet,
    SuggestionValidatorsUpdate
} from "../validators/SuggestionValidators.js";
import {SuggestionController} from "../controllers/SuggestionController.js";

const router = Router()

router.get('/agent/all', AgentValidatorsGet, AgentController.get, errorMiddlewares)
router.post('/agent/create', AgentValidatorsCreate, AgentController.create, errorMiddlewares)
router.put('/agent/update/:id', AgentValidatorsUpdate, AgentController.update, errorMiddlewares)
router.delete('/agent/delete/:id', AgentController.delete, errorMiddlewares)

router.get('/client/all', ClientValidatorsGet, ClientController.get, errorMiddlewares)
router.post('/client/create', ClientValidatorsCreate, ClientController.create, errorMiddlewares)
router.put('/client/update/:id', ClientValidatorsUpdate, ClientController.update, errorMiddlewares)
router.delete('/client/delete/:id', ClientController.delete, errorMiddlewares)

router.get('/realty/all', RealtyValidatorsGet, RealtyController.get, errorMiddlewares)
router.post('/realty/create', RealtyValidatorsCreate, RealtyController.create, errorMiddlewares)
router.put('/realty/update/:id', RealtyValidatorsUpdate, RealtyController.update, errorMiddlewares)
router.delete('/realty/delete/:id', RealtyController.delete, errorMiddlewares)

router.get('/suggestion/all', SuggestionValidatorsGet, SuggestionController.get, errorMiddlewares)
router.post('/suggestion/create', SuggestionValidatorsCreate, SuggestionController.create, errorMiddlewares)
router.put('/suggestion/update/:id', SuggestionValidatorsUpdate, SuggestionController.update, errorMiddlewares)
router.delete('/suggestion/delete/:id', SuggestionController.delete, errorMiddlewares)


export default router