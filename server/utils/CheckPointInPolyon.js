import classifyPoint from 'robust-point-in-polygon'


export const CheckPointInPolyon = (array, polygon) => {
    const res = []
    for (let i = 0; i < array.length; i++) {
        if (classifyPoint(polygon, [array[i].coordinate_latitude, array[i].coordinate_longitude]) <= 0) {
            res.push(array[i])
        }
    }
    return res
}