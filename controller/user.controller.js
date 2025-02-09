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

    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({
            msg: "ingrese usuario o contraseña"
        })
    }
    try {
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({
                msg: "El usuario ya existe"
            })
        }
        const DBuser = new User({
            username: username,
            password: password
        })
        await DBuser.save()
        return res.status(200).json({
            msg: "El usuario se ha creado"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Ha ocurrido un error inesperado"
        })
    }
}



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
        return res.status(200).json({ usuario: user.username, id: user._id })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hay un error inesperado"
        })
    }

}

const edituser = async (req, res) => {
    const { username, password } = req.body
    if (!password) {
        return res.status(400).json({
            msg: "Ponga una contraseña"
        })
    }
    try {
        const user = await User.findOne({ username })
        user.password = password
        await user.save()
        return res.status(200).json({
            msg: "constraseña editada exitosamente"
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
