
const enumsInArray =  ( enumObject ) => {
    var enumArray = [];
    for(let key in enumObject){
        enumArray.push(enumObject[key])
    }
    return enumArray;
};

module.exports = {
    enumsInArray
}