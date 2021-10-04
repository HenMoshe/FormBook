const forms = require('./controllers/forms')
const jwt = require('jsonwebtoken')
module.exports = function formRouter(app) {
    app.post('/fcreate', async function (req, res) {
        try{
        const data = req.body
        const newform = await forms.formCreate(data)
        res.send(newform._id)
       }
        catch(error){console.error(error)}
    })
    app.post('/qacreate', async function (req, res) {
        try{
        const data = req.body[2]
        const type = req.body[1]
        const id = req.body[0]
        const newQ = await forms.qaUpdate(id,type, data )
        res.send(newQ)}
        catch(error){console.error(error)}
    })
    app.post('/myfdisplay', async function (req, res) {
        try{
        const key = Object.keys(req.body)[0]
        const value = Object.values(req.body)[0]
        const formsList = await forms.myformsDisplay(key,value)
        res.send(formsList)}
        catch(error){console.log(error)}
    })
 
    app.post('/adddone',async function(req,res){
        try {
        const doneEmail = req.body[0]
        const id=req.body[1]
        const data=req.body[2]
        const type = req.body[3]
        await forms.qaUpdate(id,type,data)
        await forms.formsToDoRemove({_id:id},doneEmail)
        res.send('ok!')
        }
        catch(error){console.error(error)}
    })
    app.post('/doneuserfdisplay', async function (req, res) {
        try{
        const filter = req.body.finished
        const formsList = await forms.doneformDisplay(filter)
        res.send(formsList)}
        catch(error){console.log(error)}
    })

    app.post('/fdisplay', async function (req, res) {
        try{
        const filter = req.body.filter
        const form = await forms.openformDisplay(filter)
        res.send(form)}
        catch(error){console.error(error)}
    })
    app.post('/editformdisplay',async function (req,res){
        try{
        const filter = req.body
        const form = await forms.formdisplayOne(filter)
        res.send(form)}
        catch(error){console.error(error)}
    })
    app.post('/editformsave',async function (req,res){
        try{
        const filter = req.body[0]
        const data = req.body[1]
        const form = await forms.formdisplayOne(filter)
        const saver = await forms.formUpdate(form,data)
        res.send(saver)}
        catch(error){console.error(error)}
    })
    app.get('/sitestats',async function (req,res){
        try{
        const count = await forms.formStats()
        res.send(String(count))
    }
        catch(error){
        console.error(error)
    }
    })
}