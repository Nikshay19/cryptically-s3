// created by nikshay for cryptically
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const {
    google
} = require('googleapis')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const fs = require('fs');
const url = require('url')
const app = express()
const CRED_PATH = '/home/nikshay/Downloads/client_cryptically.json'
const TOKEN_PATH = 'token.json';
var SCOPES
var URI
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    cookie: {
        expires: 6000000000
    },
    store: new MongoStore({
        url: 'mongodb://localhost:27017/EncryptionDecryptionDB',
        ttl: 14 * 24 * 60 * 60,
        touchAfter: 24 * 3600
    })
}));

app.set('trust proxy', true)
app.use(cors({
    credentials: true,
    origin: 'http://www.cryptically.com:4200'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

function portConfig() {
    const port = process.env.PORT || 2000
    return new Promise((resolve, reject) => {
        app.listen(port, (err) => {
            if (err) {
                reject('error')
            }
            resolve('App running on port ' + port)
        })
    })
}

function dbConnection() {
    const constring = 'mongodb://localhost:27017/EncryptionDecryptionDB'
    return new Promise((resolve, reject) => {
        mongoose.connect(constring, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, data) => {
            if (err) {
                reject('connection failure')
            }
            resolve('connection success ' + '\n')
        })


    })
}
async function DATABASE_EXPRESS_PORT_CONFIG() {
    const dbConnect = await dbConnection()
    const portconfig = await portConfig()
    return dbConnect + portconfig
}
DATABASE_EXPRESS_PORT_CONFIG().then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})
const registrationData = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const registrationModel = mongoose.model('regModel', registrationData)
const loginCredential = new mongoose.Schema({
    username: String,
    password: String
});
const loginModel = mongoose.model('logModel', loginCredential)
const oauthSignupModule = new mongoose.Schema({
    username: String,
    refresh_token: String,
    scope: String,
    token_type: String
})
const oauthSignupModuleModel = mongoose.model('oauthsignupmodel', oauthSignupModule)
const fileuploadschema = new mongoose.Schema({
    username: String,
    filename: {type:[String]}
})
const fileuploadmodel = mongoose.model('fileup', fileuploadschema)
app.post('/register', (req, res) => {
    if (req.session.user && req.cookies.userid) {
        return res.json([{
            'redir': 'userprofile',
            'user': req.session.user
        }])
    }

    function registerData() {
        const registerObj = new registrationModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        return new Promise((resolve, reject) => {
            registerObj.save((err) => {
                if (err) {
                    reject('Error in insertion ')
                }
                resolve({
                    'mess': 'Insertion success'
                })
            })
        })
    }

    function loginData() {
        const loginCredObj = new loginModel({
            username: req.body.username,
            password: req.body.password
        })
        return new Promise((resolve, reject) => {
            loginCredObj.save((err, data) => {
                if (err) {
                    return reject('Error ')
                }
                res.cookie('userid', data.id)
                req.session.user = data.username
                console.log(req.cookies)
                resolve([{
                    'mess': 'InsertionSuccess',
                    'user': data.username,
                    'redirect': 'userprofile'
                }])
            })
        })
    }

    async function EXEC_QUERY() {
        const register = await registerData()
        if (register !== 'Error in insertion ') {
            const login = await loginData()
            res.send(login)
        }
        return 'Error in registration'
    }
    EXEC_QUERY()

})

app.post('/login', (req, res) => {
    if (req.session.user && req.cookies.userid) {
        return res.json([{
            'redir': 'userprofile',
            'user': req.session.user
        }])
    }

    function checkIfUserExists() {
        return new Promise((resolve, reject) => {
            loginModel.findOne({
                "username": req.body.username,
                "password": req.body.password
            }, (err, result) => {
                if (err) {
                    return reject('User not found')
                }
                console.log(result + '160')
                res.cookie('userid', result.id)
                req.session.user = result.username
                console.log(req.cookies)
                resolve([{
                    'mess': 'userfound',
                    'redirect': 'userprofile',
                    'user': result.username
                }])
            })
        })

    }
    async function CHECK_USER() {
        const checkuser = await checkIfUserExists()
        res.send(checkuser)
    }
    CHECK_USER()
})
app.post('/logout', (req, res) => {
    console.log(req.headers.cookie, JSON.stringify(req.session.user) + 'line 197')
    if (req.session.user && req.cookies.userid) {
        req.session.destroy((err) => {
            if (err) {
                return console.log('screwed up!')
            }
        })
        res.clearCookie('userid')
        return res.json([{
            'action': 'logout'
        }])
    }
    return res.json([{
        'status': 'already'
    }])
})

app.post('/userprofile', (req, res) => {
    console.log(JSON.stringify(req.session.user) + '245')

    if (req.session.user && req.cookies.userid) {
        return res.json([{
            'user': req.session.user,
            'redirect': 'userprofile',
            'cookie': req.cookies.userid,
            'user': req.session.user
        }])
    }
    return res.json([{
        'status': 'noway'
    }])
})
app.post('/fileupload', (req, res) => {
    async function FILE_UPLOAD() {
        const checkfile = await checkIfFileCollExists()
        if (checkfile.length < 1) {
            await insertFileData()
        }
        else {
            await checkFileData()
        }
    }
    function checkIfFileCollExists() {
        return new Promise((resolve, reject) => {
            mongoose.connection.db.listCollections({
                name: 'fileups'
            }).toArray((err, data) => {
                resolve(data)
            })
        })
    }
    function insertFileData() {
        console.log(req.body.name)
        const fileuploadaction = new fileuploadmodel({
            username: req.session.user,
            filename: [req.body.name]
        })
        fileuploadaction.save().then((result) => {
            res.json({
                'status': 'file uploaded'
            })
        }).catch((error) => {
            console.log(error)
            res.json({
                'status': 'file not uploaded'
            })
        })
    }
    function checkFileData() {
        return new Promise((resolve, reject) => {
            fileuploadmodel.findOne({
                username: req.session.user
            }, (err, res) => {
                if (!res) {
                    return resolve(insertFileData())
                }
                resolve(updateFileData())
            })
        })

    }
    function updateFileData() {
        fileuploadmodel.updateOne({
            username: req.session.user
        }, {
            $push: {
                filename: req.body.name
            }
        }, (err, res) => {
            if (err) {
                return console.log(err)
            }
        })
    }

FILE_UPLOAD()
})
app.get('/filelist',(req,res)=>{
fileuploadmodel.findOne({
    "username":req.session.user
},(err,data)=>{
    if(data===null)
    {
        return res.send('nofile')
    }
res.send(data.filename)
})
})
app.post('/oAuthSignup', (req, res) => {
    SCOPES = req.body.SCOPES

    async function OAUTH_SIGNUP_PROCESS() {
        const readclientsecret = await clientSecret()
        const oauthOBJ = await authorize(JSON.parse(readclientsecret))
        const authURL = await getNewToken(oauthOBJ)
        res.send(authURL)
    }
    OAUTH_SIGNUP_PROCESS()

})
app.post('/accessToken', (req, ress) => {
    URI = req.body.uri
    async function OAUTH_TOKEN_GENERATOR() {
        const readclientsecret = await clientSecret()
        const oauthOBJ = await authorize(JSON.parse(readclientsecret))
        const token = await tokenGenerator(oauthOBJ)
        console.log(token)
        if (token.refresh_token !== undefined) {
            const userData = await profileInfo(oauthOBJ, token)
            const checkcoll = await checkIfCollExists()
            console.log(checkcoll.length)
            if (checkcoll.length < 1) {
                await insertData(userData)
            } else {
                await checkIfUserExists(userData)
            }
        }
        else {
            const userData = await profileInfo(oauthOBJ, token)
            ress.cookie('userid', 'iuiououniuni', { httpOnly: true })
            req.session.user = userData.username
            await accessTokenCookie([{ 'cookie': req.cookies, 'status': 'redir', 'user': req.session.user }])

        }
    }
    async function accessTokenCookie(saveCookie) {

        ress.send(saveCookie)
    }
    function checkIfUserExists(userdataobj) {
        return new Promise((resolve, reject) => {
            oauthSignupModuleModel.findOne({
                username: userdataobj.username
            }, (err, res) => {
                if (!res) {
                    return resolve(insertData(userdataobj))
                }
                resolve(updateData(userdataobj))
            })
        })

    }

    function updateData(userdataobj) {
        console.log(userdataobj)
        oauthSignupModuleModel.updateOne({
            username: userdataobj.username
        }, {
            $set: {
                username: userdataobj.username,
                refresh_token: userdataobj.parsedData.refresh_token,
                scope: userdataobj.parsedData.scope,
                token_type: userdataobj.parsedData.token_type
            }
        }, (err, res) => {
            if (err) {
                return console.log(err)
            }
            oauthSignupModuleModel.findOne({
                username: userdataobj.username
            }, (err, res) => {
                if (!res) {
                    return console.log('err!')
                }
                const id = res.id
                ress.cookie('userid', Math.random())
                req.session.user = userdataobj.username
                return ress.send([{ 'cookie': req.cookies, 'status': 'redir', 'user': req.session.user }])


            })
            console.log('Success' + JSON.stringify(res))
        })

    }

    function insertData(userdataobj) {
        const oauthRegisterModel = new oauthSignupModuleModel({
            username: userdataobj.username,
            refresh_token: userdataobj.parsedData.refresh_token,
            scope: userdataobj.parsedData.scope,
            token_type: userdataobj.parsedData.token_type
        })
        return new Promise((resolve, reject) => {
            oauthRegisterModel.save().then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    OAUTH_TOKEN_GENERATOR()
})


async function tokenGenerator(oauthobj) {
    const oAuth2Client = oauthobj
    const code = decodeURIComponent(URI)
    const splitCode = code.substring(18, 107)
    return new Promise((resolve, reject) => {
        oAuth2Client.getToken(decodeURIComponent(splitCode), (err, token) => {
            if (err) {
                reject('Error retrieving access token', err)
            }
            return resolve(token)
        });
    })
}

function checkIfCollExists() {
    console.log('here')
    return new Promise((resolve, reject) => {
        mongoose.connection.db.listCollections({
            name: 'oauthsignupmodels'
        }).toArray((err, data) => {
            resolve(data)
        })
    })
}

function clientSecret() {
    return new Promise((resolve, reject) => {
        fs.readFile(CRED_PATH, (err, data) => {
            if (err) {
                reject(err + 'cannot read client secret')
            }
            resolve(data)
        })
    })

}


function authorize(credentials) {
    return new Promise((resolve, reject) => {
        const {
            client_secret,
            client_id,
            redirect_uris
        } = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        resolve(oAuth2Client)
    })


}

function getNewToken(oAuth2Client) {
    return new Promise((resolve, reject) => {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        resolve(url.parse(authUrl))
    })

}

function profileInfo(auth, token) {
    auth.setCredentials(token)
    const gmail = google.gmail({
        version: 'v1',
        auth
    });
    const stringifiedData = JSON.stringify(token)
    const parsedData = JSON.parse(stringifiedData)
    return new Promise((resolve, reject) => {
        gmail.users.getProfile({
            auth: auth,
            userId: 'me'
        }, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve({
                "username": res.data.emailAddress,
                "parsedData": parsedData
            })

        });
    })
}
