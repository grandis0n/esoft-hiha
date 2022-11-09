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
    SuggestionValidatorsSearchForDemand,
    SuggestionValidatorsUpdate
} from "../validators/SuggestionValidators.js";
import {SuggestionController} from "../controllers/SuggestionController.js";
import {
    DemandValidatorsCreate,
    DemandValidatorsGet,
    DemandValidatorsSearchForSuggestion,
    DemandValidatorsUpdate
} from "../validators/DemandValidators.js";
import {DemandController} from "../controllers/DemandController.js";
import {DealValidatorsCreate, DealValidatorsUpdate} from "../validators/DealValidatots.js";
import {DealController} from "../controllers/DealController.js";
import {EventController} from "../controllers/EventController.js";
import {EventValidatorsCreate, EventValidatorsGet} from "../validators/EventValidators.js";

const router = Router()

router.post('/agent/all', AgentValidatorsGet, AgentController.get, errorMiddlewares)
router.post('/agent/create', AgentValidatorsCreate, AgentController.create, errorMiddlewares)
router.put('/agent/update/:id', AgentValidatorsUpdate, AgentController.update, errorMiddlewares)
router.delete('/agent/delete/:id', AgentController.delete, errorMiddlewares)

router.post('/client/all', ClientValidatorsGet, ClientController.get, errorMiddlewares)
router.post('/client/create', ClientValidatorsCreate, ClientController.create, errorMiddlewares)
router.put('/client/update/:id', ClientValidatorsUpdate, ClientController.update, errorMiddlewares)
router.delete('/client/delete/:id', ClientController.delete, errorMiddlewares)

router.post('/realty/all', RealtyValidatorsGet, RealtyController.get, errorMiddlewares)
router.post('/realty/create', RealtyValidatorsCreate, RealtyController.create, errorMiddlewares)
router.put('/realty/update/:id', RealtyValidatorsUpdate, RealtyController.update, errorMiddlewares)
router.delete('/realty/delete/:id', RealtyController.delete, errorMiddlewares)

router.post('/suggestion/all', SuggestionValidatorsGet, SuggestionController.get, errorMiddlewares)
router.post('/suggestion/create', SuggestionValidatorsCreate, SuggestionController.create, errorMiddlewares)
router.put('/suggestion/update/:id', SuggestionValidatorsUpdate, SuggestionController.update, errorMiddlewares)
router.delete('/suggestion/delete/:id', SuggestionController.delete, errorMiddlewares)
router.post('/suggestion/search-for-demand', SuggestionValidatorsSearchForDemand,
    SuggestionController.searchForDemand, errorMiddlewares)

router.post('/demand/all', DemandValidatorsGet, DemandController.get, errorMiddlewares)
router.post('/demand/create', DemandValidatorsCreate, DemandController.create, errorMiddlewares)
router.put('/demand/update/:id', DemandValidatorsUpdate, DemandController.update, errorMiddlewares)
router.delete('/demand/delete/:id', DemandController.delete, errorMiddlewares)
router.post('/demand/search-for-suggestion', DemandValidatorsSearchForSuggestion,
    DemandController.searchForSuggestion, errorMiddlewares)

router.post('/deal/all', DealController.get, errorMiddlewares)
router.post('/deal/create', DealValidatorsCreate, DealController.create, errorMiddlewares)
router.put('/deal/update/:id', DealValidatorsUpdate, DealController.update, errorMiddlewares)
router.delete('/deal/delete/:id', DealController.delete, errorMiddlewares)

router.post('/event/', EventValidatorsGet, EventController.get, errorMiddlewares)
router.post('/event/create', EventValidatorsCreate, EventController.create, errorMiddlewares)
router.delete('/event/delete/:id', EventController.delete, errorMiddlewares)


export default router
