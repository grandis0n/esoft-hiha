import pkgUnderscoreString from "underscore.string"

const {levenshtein} = pkgUnderscoreString

export const LevenshteinSearchRealty = (allObjects, searchDTO) => {
    const res = []
    for (let i = 0; i < allObjects.length; i++) {
        let stopFlag = 0
        if (searchDTO.address_city) {
            if (levenshtein(searchDTO.address_city, allObjects[i].dataValues.address_city) > 3) {
                stopFlag = 1
            }
        }
        if (searchDTO.address_street) {
            if (levenshtein(searchDTO.address_street, allObjects[i].dataValues.address_street) > 3) {
                stopFlag = 2
            }
        }
        if (searchDTO.address_apartment_number) {
            if (levenshtein(searchDTO.address_apartment_number, allObjects[i].dataValues.address_apartment_number) > 1) {
                stopFlag = 3
            }
        }
        if (searchDTO.address_house_number) {
            if (levenshtein(searchDTO.address_house_number, allObjects[i].dataValues.address_house_number) > 1) {
                stopFlag = 4
            }
        }
        if (!stopFlag) {
            res.push(allObjects[i].dataValues)
        }
    }
    return res
}