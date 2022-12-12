const Proveedor = require ('../models/Proveedor');

exports.mostrarProveedores = async (req,res) => {

try {
const proveedores = await Proveedor.find();
res.json(proveedores);
    
} catch (error) {
    console.log(error);
    res.status(500).send("error al consultar los proveedores");
}

}

exports.agregarProveedores = async (req,res) => {

    try {
        let proveedor;
        proveedor = new Proveedor(req.body)

        await proveedor.save();
        res.send(proveedor);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("error agregar proveedores");  
    }

    }


exports.mostrarunProveedor = async (req, res) => {

    try {

        let proveedor = await Proveedor.findById(req.params.id);

        if (!proveedor) {

            res.status(404).json({ msg: " no podemos encontrar el proveedor" });
        }

        res.send(proveedor);



    } catch (error) {
        console.log(error);
        res.status(500).send("error al ver un proveedor");
    }


}

exports.eliminarProveedor = async (req, res) => {

    try {

        let proveedor = await Proveedor.findById(req.params.id);

        if (!proveedor) {

            res.status(404).json({ msg: " no existe el proveedor" });
            return
        }

        await Proveedor.findOneAndRemove({_id:req.params.id});
        res.json({msg: " el proveedor fue eliminado"});

        
    } catch (error) {
        console.log(error);
        res.status(500).send("error de conexion");
    }
}
    
// funcion para actualizar   
exports.actualizarProveedor = async (req, res) => {

    try {

        const { nombres, apellidos, documento, correo, telefono, direccion, empresa } = req.body;

        let proveedor = await Proveedor.findById(req.params.id);

        if (!proveedor) {
            res.status(404).json({ msg: " no existe el proveedor" });
            return
        }

        proveedor.nombres = nombres;
        proveedor.apellidos = apellidos;
        proveedor.documento = documento;
        proveedor.correo = correo;
        proveedor.telefono = telefono;
        proveedor.direccion = direccion;
        proveedor.empresa = empresa;

       proveedor = await Proveedor.findOneAndUpdate ({_id: req.params.id}, proveedor, {new: true});
       res.json(proveedor);

    } catch (error) {
        console.log(error);
        res.status(500).send("error de conexion");
    }



}