const User = require("../models/User")

const createUser = (req, res) => {
    res.render("createuser", {

    })
}

const saveUser = (req, res, next) => {

    // console.log(req.body);

    User.create(req.body, (error, data) => {
        
        if (error) {
          return next(error)
        }

        console.log(data)
        res.json(data)

    })

    // ################ propre pour express essaie ##################
        //   studentSchema.create(req.body, (error, data) => {
        //     if (error) {
        //       return next(error)
        //     } else {
        //       console.log(data)
        //       res.json(data)
        //     }
        //   })
    // ################ propre pour express essaie ##################
}

const findUser = (req, res) => {
    // const newUser = new User();
 
    const channelid = req.query.channelid

    // console.log(channelid);

    User.find({channelid})
        .select('_id name channelid image linkedIn twitter facebook instagram')
            .exec((err, docs) => {
                if (err) {
                    return res.status(500)
                    .json({ message: 'error querying cities', error: err });
                }
                if (!docs) {
                    return res.status(404)
                    .json({ message: 'No valid entry found for provided City' });
                }
                return res.status(200)
                    .json(docs);
                
            })    

    // User.findById(req.params.id, (error, data) => {
    //     if (error) {
    //         // return next(error)
    //         console.log(error);
    //     } else {
    //         console.log(data);
    //         // res.json(data)
    //     }
    // })

}

const userEdit = (req, res, next) => {
    User.findById(req.params.id, (error, data) => {
        
        if (error) {
          return next(error)
        }
        res.json(data)

    })
}

const updateUser = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {

        if (error) {
            console.log(error)
            return next(error);
        }

        res.json(data)
        console.log('Student updated successfully !')

    })

}

module.exports = {
    createUser,
    saveUser, 
    findUser,
    userEdit,
    updateUser,
}

// router.route('/edit-student/:id').get((req, res) => {
//     studentSchema.findById(req.params.id, (error, data) => {
//     if (error) {
//         return next(error)
//     } else {
//         res.json(data)
//     }
//     })
// })