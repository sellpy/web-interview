const resultHandler = (dbResult, res) => {
    if (!dbResult)
        res.status(500);
    res.send(dbResult);
}

module.exports = {
    resultHandler: resultHandler,
};