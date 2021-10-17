exports.getRandomNumber = (limit) => {
    let result = "";
    for (i = 0; i < limit; i++){
        result += Math.floor(Math.random() * 10)
    };

    return result;

}