import pkgUnderscoreString from "underscore.string"

const {levenshtein} = pkgUnderscoreString

export const LevenshteinSearchAgentAndClient = (allObjects, searchDTO) => {
    const res = []
    for (let i = 0; i < allObjects.length; i++) {
        let stopFlag = 0
        if (searchDTO.first_name) {
            if (levenshtein(searchDTO.first_name, allObjects[i].dataValues.first_name) > 3) {
                stopFlag = 1
            }
        }
        if (searchDTO.last_name) {
            if (levenshtein(searchDTO.last_name, allObjects[i].dataValues.last_name) > 3) {
                stopFlag = 2
            }
        }
        if (searchDTO.middle_name) {
            if (levenshtein(searchDTO.middle_name, allObjects[i].dataValues.middle_name) > 3) {
                stopFlag = 3
            }
        }
        if (!stopFlag) {
            res.push(allObjects[i].dataValues)
        }
    }
    return res
}