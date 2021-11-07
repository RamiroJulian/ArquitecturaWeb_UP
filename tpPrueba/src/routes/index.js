const {Router} = require('express'); //requiero el mètodo router
const router = Router();


router.get('/test', (req, res)=>{
    res.json({"Titulo" : "hello World"});
})

module.exports = router;