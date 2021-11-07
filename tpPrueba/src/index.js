const express = require ('express');
const app = express();
const morgan = require ('morgan');

//settings

app.set('port', process.env.PORT || 3000); // Se valida si existe o no el puerto seteado


//middlewares
app.use(morgan('dev')); // me permite guardar y levantar automaticamente el servidor
app.use(express.urlencoded({extended:false})); //esto me habilita a enviar y recibir archivos de todo tipo
app.use(express.json()); //este metodo me permitirà recibir y enviar archivos json

//routes
app.use(require ('./routes/index.js'));
app.use('/api/espectaculos',require ('./routes/espectaculos.js')); //agrego el /api/ para esta ruta

//iniciando server
app.listen(app.get('port'), ()=> {
    console.log(`Server inciado en puerto ${app.get('port')}`);
});