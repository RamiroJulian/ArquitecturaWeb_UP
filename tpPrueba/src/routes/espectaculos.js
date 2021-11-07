const {Router} = require ('express');
const router = Router();
const _ = require('underscore');

const espectaculos = require('../sample.json'); //requiero el json que tiene los datos a modo de bd
console.log(espectaculos);

router.get('/', (req, res)=>{
    res.json(espectaculos); //devuelvo los datos de la bd
});

router.post('/', (req, res)=> {
   const{nombre, lugar, hora} = req.body; // guardo en constantes los datos del body del post

    if(nombre&& lugar&& hora){

        const id = espectaculos.length +1; //asigno un id siguiendo la numeracion
        const newEspectaculo = {...req.body, id}; // creo un nuevo objeto y le asigno lo que viene en el bdy del post + id
        espectaculos.push(newEspectaculo); // lo guardo en el arreglo de espectaculos y lo muestro actualizado.
        res.json(espectaculos);

    }else{
        res.status(500).json('Hubo un error'); //respondo con status 500 el error
    }
    res.send('Recibido');
});


router.put('/:id', (req, res)=>{
    const {id} = req.params; // me quedo con el id del put
    const {nombre, lugar, hora} = req.body;

    if (nombre && lugar && hora){
        _.each(espectaculos, (espectaculo, i)=>{ //con el método each de underscore recorro el objeto y le asigno los valores a modificar
            if (espectaculo.id == id){
                espectaculo.nombre = nombre;
                espectaculo.lugar = lugar;
                espectaculo.hora = hora;
            }
        });
        res.json(espectaculos);
    }else {
        res.status(500).json({error: 'Hubo un error.'});
    }

});

router.delete('/:id', (req, res)=>{ // recibimos el id del espectaculo y lo eliminamos
    _.each(espectaculos, (espectaculo, i)=>{
        const{id} = req.params;
        if (espectaculo.id == id){
            espectaculos.splice(i, 1);
        }
    });
    res.send(espectaculos);
})


module.exports = router;