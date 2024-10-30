import mysql from 'mysql2/promise';
import path from 'path';
import url from 'url';
import fs from 'fs/promises';
import db from '../conexao.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createImagem(descricao,nomeImg,imagem) {
    const conexao = mysql.createPool(db);
    console.log('ImagemModel :: createImagem');
    const sql = 'INSERT INTO imagens (descricao,caminho) VALUES (?,?);';
    const params = [descricao,nomeImg];

    try {
        await imagem.mv(path.join(__dirname,'..','..','public','img',nomeImg));
        const [retorno] = await conexao.query(sql,params);
        return [201,'Imagem Cadastrada'];
    } catch (error) {
        console.log(error);
        return [500,error];
    }
}