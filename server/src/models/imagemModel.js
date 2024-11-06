import mysql from 'mysql2/promise';
import path from 'path';
import url from 'url';
import fs from 'fs/promises';
import db from '../conexao.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createImagem(descricao, nomeImg, imagem) {
    const conexao = mysql.createPool(db);
    console.log('ImagemModel :: createImagem');
    const sql = 'INSERT INTO imagens (descricao,caminho) VALUES (?,?);';
    const params = [descricao, nomeImg];

    try {
        await imagem.mv(path.join(__dirname, '..', '..', 'public', 'img', nomeImg));
        const [retorno] = await conexao.query(sql, params);
        return [201, 'Imagem Cadastrada'];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function readImagem() {
    const conexao = mysql.createPool(db);
    console.log('ImagemModel :: readImagem');
    const sql = 'SELECT * FROM imagens';

    try {
        const [retorno] = await conexao.query(sql);
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];

    }

}

export async function updateImagem(descricao, id_imagem) {
    const conexao = mysql.createPool(db);
    console.log('ImagemModel :: updateImagem');
    const sql = 'UPDATE imagens SET descricao=? WHERE id_imagem = ?;';
    const params = [descricao, id_imagem];

    try {
        const [retorno] = await conexao.query(sql, params);

        if (retorno.affectedRows < 1) {
            return [404, { message: 'Imagem não encontrada!' }];

        }
        return [200, { message: 'Imagem atualizada!' }]
    } catch (error) {
        console.log(error);
        return [500, error];

    }

}

export async function deleteImagem(id_imagem) {
    console.log('ImagemModel ::deleteImagem')
    const conexao = mysql.createPool(db);
    const sqlImagem = 'SELECT * FROM imagens WHERE id_imagem=?'
    const sql = 'DELETE FROM imagens WHERE id_imagem=?';
    const params = [id_imagem];

    try {
        const [imagem] = await conexao.query(sqlImagem, params);
        if (imagem.length > 0) {
            const nomeImg = imagem[0].caminho;
            await conexao.query(sql, params);
            await fs.unlink(path.join(__dirname, '..', '..', 'public', 'img', nomeImg));
            return [200, { message: 'Imagem deletada' }];
        } else {
            return [404, { message: 'Imagem não encontrada' }];
        }



    } catch (error) {
        console.log(error);
        return [500, error];

    }

}

export async function showOneImagem(id_imagem) {
    const conexao = mysql.createPool(db);

    console.log('Mostrando uma imagem no Model Imagem');
    const sql = 'SELECT * FROM  imagens WHERE id_imagem =?';
    const params = [id_imagem];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Mostrando uma imagem');
        return [200, retorno[0]];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}