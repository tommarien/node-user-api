class UserValidator{
    validate(resource){
        const result = [];
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

export default new UserValidator();
