const users = require('./controllers/users')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var salt=bcrypt.genSaltSync(10)
module.exports = function userRouter(app) {
    
    app.post('/signup', async function (req, res) {
        try{
        if(!req.body.userName||!req.body.Email||!req.body.password){
        res.send('missing details!')
        throw new Error('details missing')}
        const checker=await users.displayOne({"Email":req.body.Email})
        if (checker){
        res.send('email allready exists')
        throw new Error('E-mail allready exsits')}
        else{
        req.body.password=bcrypt.hashSync(req.body.password,salt)
        const user = await users.userCreate(req.body)
        res.send(user)}}
        catch(error){console.error(error)}
    })
    
    app.put('/changeuserd', async function (req, res) {
        try{
        jwt.verify(req.cookies.token,'shhhhh')
        const id = req.body[0]
        const data = req.body[1]
        data.password=bcrypt.hashSync(data.password,salt)
        const changer = await users.userUpdate(id, data)
        res.send(changer)}
        catch(error){console.error(error)}
    })
    app.post('/login', async function (req, res) {
        try {
            const user = await users.displayOne({"Email":req.body.Email})
            if (!user){
            res.send('not a correct email.')
            throw new Error ('not a correct user!')}
            const syncer = bcrypt.compareSync(req.body.password, user.password)
            if (!syncer) {
            res.send('invaild pass')
            throw new Error ('not a correct password')
            }
            else{
            if(req.body.stay){
            const token = jwt.sign({'_id':user._id},'shhhhh')
            const logged = await users.login({"Email":req.body.Email}, { isLogged: true,'token':token })
            res.cookie('token',token,{maxAge:50005*5000,httpOnly:true})
            res.send(logged)}
            else{
            const logged = await users.login({"Email":req.body.Email}, { isLogged: true})
            res.send(logged)}}}
            catch (error) {
            console.error(error)
        }
    })
    app.post('/logout', async function (req, res) {
        try {
        const outer = await users.logout(req.body._id, { isLogged: false , 'token':'' })
        res.cookie('token','',{maxAge:0,httpOnly:true})
        res.send(outer)}
        catch(e){console.error(e)}
    })
    app.post('/cookie',async function (req,res){
        try {
        jwt.verify(req.cookies.token,'shhhhh')
        const tok = await users.displayOne({'token':req.cookies.token})
        const logged = await users.login({'Email':tok.Email}, { isLogged: true})
        res.send(logged)
        }
        catch(e){
        res.send('Invaild Token')
        console.error(e)
        
        }
    })
    app.get('/userstats',async function (req,res){
        try{
        const count = await users.userStats()
        res.send(String(count))
    }
        catch(error){
        console.error(error)
    }
    })
}
