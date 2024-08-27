import React, { useState, useEffect } from "react";
import './Clima.css';

const API_KEY = 'b4974ef25f3167dbc56d525dfabfab0b'; 
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default function Clima() {
    const [cidade, setCidade] = useState('');
    const [dadosTempo, setDadosTempo] = useState(null);
    const [erro, setErro] = useState('');

    useEffect(() => {
       
    }, []);

    const buscarPrevisao = () => {
        if (!cidade) return;

        fetch(`${API_URL}?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`)
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error('Cidade não encontrada');
                }
                return resposta.json();
            })
            .then(dados => {
                setDadosTempo(dados);
                setErro('');
            })
            .catch(erro => {
                setErro(erro.message);
                setDadosTempo(null);
            });
    };

    return (
        <div className="clima-container">
            <h1>Previsão do Tempo</h1>
            <input
                type="text"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                placeholder="Digite o nome da cidade"
                className="clima-input"
            />
            <button onClick={buscarPrevisao} className="clima-button">
                Buscar
            </button>

            {erro && <p className="clima-erro">{erro}</p>}

            {dadosTempo && (
                <div className="clima-result">
                    <h2>{dadosTempo.name}</h2>
                    <p>Temperatura: {dadosTempo.main.temp}°C</p>
                    <p>Condições: {dadosTempo.weather[0].description}</p>
                
                </div>
            )}
        </div>
    );
}
