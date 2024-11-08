import { createUsuario, findUserByLoginPassword, showOneUsuario } from "../models/UsuarioModel.js";

export async function criarUsuario(req,res) {
    console.log('UsuarioController :: criarUsuario');
    const usuario = req.body;

    if (!usuario.login || !usuario.senha || !usuario.funcao) {
        res.status(400).json({message:'Login, senha e função são obrigatórios'})
        
    } else {
        try {
            const[status,resposta] = await createUsuario(usuario);
            res.status(status).json(resposta);
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Erro ao criar usuário'})
            
        }
        
    }
    
}

export async function mostrarUsuario(req,res) {
    console.log('UsuarioController :: mostrarUsuario');
    try {
        const [status, resposta] =await readUsuario();
        res.status(status,resposta).json(resposta);
    } catch (error) {
        res.status(500).json({message:'Erro ao mostrar usuarios'})
    }
}

export async function mostrarUmUsuario(req,res) {
    console.log('UsuarioController :: mostrarUmUsuario');
    const {id_usuario} = req.params;

    if (!id_usuario) {
        res.status(400).json({message: 'id inválido!'})
        
    } else {
        try {
            const [status,resposta] = await showOneUsuario(id_usuario);
            res.status(status).json(resposta);
        } catch (error) {
            res.status(500).json({message: 'Erro ao mostrar um usuário'})
            
        }
        
    }
    
}

export async function logarUsuario(req,res) {
    console.log('UsuarioController :: logarUsuario');
    const {login,senha} = req.body;

    if (!login || !senha) {
        res.status(400).json({message:'Usuário e senha são obrigatórios'})
        
    } else {
        try {
            const [status,resposta] = await findUserByLoginPassword(login,senha);
            res.status(status).json(resposta);
        } catch (error) {
            res.status(500).json({message:'Erro ao efetuar login'})
            
        }
        
    }
    
}