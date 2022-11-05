import {body} from "express-validator";

export const EventValidatorsGet = [
    body('agent_id', 'Плохой формат идентификатора агента').isInt({min: 1}),
]

export const EventValidatorsCreate = [
    body('agent_id', 'Плохой формат идентификатора агента').isInt({min: 1}),
    body('datetime', 'Плохой формат даты и времени').isString(),
    body('comment', 'Плохой формат комментария').optional().isString(),
    body('duration', 'Плохой формат длительности').optional().isInt({min: 1}),
    body('type_id', 'Плохой формат длительности').isIn([1, 2, 3]),
]
