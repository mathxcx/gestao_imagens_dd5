import React, { useState } from 'react'

function TelaLogin() {
    const [login,setLogin] = useState('');
    const [senha,setSenha] = useState('');

    async function efetuarLogin() {
        const dadosLogin = {login,senha};

        try {
            const resposta = await fetch('http://localhost:5000/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(dadosLogin)
            });
            if(!resposta.ok){
                alert('Usuário ou senha inválidos!!!');
            }else{
            
            const respostaJSON = await resposta.json();
            localStorage.setItem('id_usuario',respostaJSON.id_usuario);
            window.location.href = '/'

            }
        } catch (error) {
            console.log(error);
            
        }
        
    }

    return (
        <div className='container d-flex justify-content-center'>
            <div className='com-md-3 mt-5'>
                <h1>Tela de Login</h1>
                <label htmlFor="">Login</label>
                
                <input className='form-control' type="text" placeholder='login' value={login} onChange={(e)=>setLogin(e.target.value)} />
            
                <label htmlFor="">Senha</label>
                <input className='form-control' type="password" placeholder='***' value={senha} onChange={(e)=>setSenha(e.target.value)} />
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary' onClick={efetuarLogin}>Logar</button>
                </div>
            </div>
        </div>
    )
}

export default TelaLogin