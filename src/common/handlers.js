module.exports.GET = (req, res, callback) => {
    callback()
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).end();
            }
        })
        .then(() => {console.log(`${req.method} ${req.originalUrl}`);})
        .catch(err => {
            console.log('Error: ' + err.message);
            res.status(500).json({status: "Error", message: err.message});
            //TODO: refactor to user optional chaining
        });

        //console.log(`${req.method} ${req.originalUrl} => ${res.status}`);
};

module.exports.POST = (req, res, callback) => {
    callback()
        .then(data => {
            res.status(200);
            if (data) {
                res.json(data);
            }
        })
        .then(() => {console.log(`${req.method} ${req.originalUrl}`);})
        // .catch(err => {
        //     console.log('Error: ' + err.message);
        //     res.status(500).json({message: err.message});
        //     //TODO: refactor to user optional chaining
        // });

        
};




