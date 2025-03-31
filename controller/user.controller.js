const generateToken = require('../middlewares/jwtGenerate');
const User = require('./../models/user.model')



const getallusers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({ users })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "hubo un error"
        })
    }
}

const createuser = async (req, res) => {
    try {
        const { username, password, clients, pedidos, productos, transportistas, rutas, estado_de_envio, categorias } = req.body;

        // Validación de campos obligatorios
        if (!username || !password) {
            return res.status(400).json({ msg: "Ingrese usuario y contraseña" });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }

        // Crear el usuario con los datos adicionales
        const newUser = new User({
            username,
            password,
            clients: clients || [], // Si no se envían, usa el valor por defecto []
            pedidos: pedidos || [],
            productos: productos || [],
            transportistas: transportistas || [],
            rutas: rutas || [],
            estado_de_envio: estado_de_envio || [],
            categorias: categorias || [],
        });

        await newUser.save();

        return res.status(201).json({
            msg: "El usuario se ha creado correctamente",
            user: newUser
        });
    } catch (error) {
        console.error("Error en createuser:", error);
        return res.status(500).json({ msg: "Ha ocurrido un error inesperado" });
    }
};




const userlogin = async (req, res) => {

    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({
            msg: "ingrese usuario o contraseña"
        })
    }
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                msg: "Usuario no encontrado"
            })
        }
        if (password !== user.password) {

            return res.status(400).json({
                msg: "contraseña erronea"
            })
        }
        const token = await generateToken(username, password)
        return res.status(200).json({
            msg: `bienvenido ${username}`,
            token: token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hay un error inesperado"
        })

    }
}

const finduser = async (req, res) => {
    const { username } = {username : req.params.user};

    if (!username) {
        return res.status(400).json({
            msg: "ingrese un usuario"
        })
    }
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                msg: "Usuario no encontrado"
            })
        }
        return res.status(200).json({ usuario: user.username, id: user._id, estado_de_envio: user.estado_de_envio, pedidos: user.pedidos, productos: user.productos, transportistas: user.transportistas, rutas: user.rutas, clients: user.clients, categorias: user.categorias })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hay un error inesperado"
        })
    }

}

const edituser = async (req, res) => {
    const { username, estado_de_envio } = req.body
   console.log(estado_de_envio);
   
    try {
        const user = await User.findOne({ username })
        user.estado_de_envio = estado_de_envio
        await user.save()
        return res.status(200).json({
            msg: "Estado de envio actualizado",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hay un error inesperado"
        })
    }
}

const deleteuser = async (req, res) => {

    const { username } = {username : req.params.user};
  
    try {
        const user = await User.findOne({ username })
        
            await User.deleteOne({ username })
            return res.status (200).json({
                msg: "Usuario eliminado exitosamente"
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hay un error inesperado"
        })
    }
}


module.exports = { getallusers, createuser, userlogin, finduser, edituser, deleteuser}
