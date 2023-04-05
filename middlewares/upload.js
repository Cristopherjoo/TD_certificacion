const path = require('path');
const {v4: uuid} =require('uuid');
const upload = (req, res, next) => {
    try{
        
        if(req.files == null) return res.status(400).json({code: 400, message: "Debe proporcionar una foto."})
        let {foto} = req.files;
        
        let mimetype = foto.mimetype.split("/")[0];
        if(mimetype != "image") return res.status(400).json({code: 400, message: "El archivo subido no corresponde a una foto."})

        let nombreFoto = `${uuid().slice(0,6)}-${foto.name}`
        let rutaPath = path.resolve(__dirname, "../public/img/"+nombreFoto)

        foto.mv(rutaPath, function(err) {
            if (err) {
              return res.status(500).json({code: 500, message:"No se pudo guardar la imagen de la publicación."});
            }
            req.imagen = nombreFoto;
            next();
          });


    }catch(error){
        res.status(500).json({code: 500, message: "No se pudo cargar la foto."})
    }

}


module.exports = {
    upload
}