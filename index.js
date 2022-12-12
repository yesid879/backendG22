const express = require ('express');
const app = express();
const jwt = require ('jsonwebtoken');
const keys = require('./config/clave');

app.set('key', keys.key);
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get('/', (req,res) => {
    res.send(' Servidor configurado para trabajar ');
})


// configuracion JWT 

app.post('/logueo', (req,res) => {
    if(req.body.usuario = 'admin' && req.body.pass == '09876'){
        const payload = {
            check:true
        };
        const token = jwt.sign(payload, app.get('key'), {
            expiresIn:'3d'
        });
        res.json({msg: "se encuetra logueado", token:token});
    }else{
        res.json({msg:"usuario o contraseña incorrectos"});
    }
});

const verificacion = express.Router();

verificacion.use((req,res, next) => {
    let token = req.headers['acces-token'] || req.headers['authorization'];
   //console.log(token);

   if(!token){
    res.status(401).send({ error: "debe tener un token para autenticarse"})
    return
   }
   
    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length);
        console.log(token);
    }

    if(token){
        jwt.verify(token, app.get('key'), (error,decoded) =>{
       if(error){
        res.json({msg: 'token no valido'})
       }else{
        req.decoded = decoded;
        next();
       }

        })
    }

})

app.get('/val', verificacion, (req,res) => {
    res.json('login ok validado' );
})

app.listen(7000, () => {
    console.log("servidor conectado");
})
