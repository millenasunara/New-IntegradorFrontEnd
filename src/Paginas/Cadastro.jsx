import { useState } from 'react';
import estilos from './Cadastro.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
export function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
 
    const navigate = useNavigate();
 
    async function obterDadosFormulario(event) {
        event.preventDefault();
        const data = { username: nome, email: email, password: senha };
        try {
            await axios.post('http://127.0.0.1:8000/api/create_user/', data);
            alert('Usuário cadastrado com sucesso!');
            await loginUser(nome, senha); // Chame a função de login aqui
            navigate('/');
        } catch (error) {
            console.error('Erro no cadastro de usuário', error);
        }
    }
 
    async function loginUser(username, password) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: username,
                password: password
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        } catch (error) {
            console.error('Erro no login do usuário', error);
        }
    }
   
    return (
        <div className={estilos.container}>
            <form className={estilos.formulario} onSubmit={obterDadosFormulario}>
                <div className={estilos.estiloCadastro}>Cadastro</div>
                <input
                    className={estilos.campo}  
                    type="text"
                    name="nome"
                    placeholder='Usuário'
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <input
                    className={estilos.campo}  
                    type="email"
                    name="email"
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className={estilos.campo}  
                    type="password"
                    name="senha"
                    placeholder='Senha'
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button className={estilos.button} type='submit'>Enviar</button>
            </form>
        </div>
    );
}
 