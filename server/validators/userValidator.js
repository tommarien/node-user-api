module.exports = {
    validate: function(resource) {
        var result = [];
        if (!resource.name) {
            result.push({
                key: 'name',
                error: 'is required'
            })
        }
        if (!resource.email) {
            result.push({
                key: 'email',
                error: 'is required'
            })
        }
        result.isValid = false;
        if (result.length == 0)
            result.isValid = true;
        return result;
    }
}
