const express = require ('express')
const bodyParser = require ('body-parser')
const cors = require ('cors')
const sendGrid = require ('@sendgrid/mail')

const app = express()
const port = process.env.PORT || 3030

app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Acess-Control-Allow-Origin', '*')
    res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Acess-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/api', (req, res, next) => {
    res.send('API Status: Running')
})

app.post('/api/email', (req, res, next) => {
    sendGrid.setApiKey('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')
    const msg = {
        to: 'leartmekolli@gmail.com',
        from: req.body.email,
        subject: 'Portfolio contact',
        text: req.body.message
    }

    sendGrid.send(msg)
        .then(result => {
            res.status(200).json({
                success:true
            })
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(401).json({
                success:false
            })
        })
})

app.listen(port, () => {
    console.log('Web Server is up and running.')
})
