module.exports.checkParams = function (params) {
    if (!params || !params.users || !params.games)
        return false;

    return true;
};
