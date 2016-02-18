class MyService {

    find(query, callback) {
        setTimeout(()=> {
            if (!query) return callback('Query is required');
            return callback(undefined, query);
        }, 10);
    }

    findP(query) {
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                if (!query) return reject('Query is required');
                return resolve(query);
            }, 10);
        });
    }
}

export default new MyService();