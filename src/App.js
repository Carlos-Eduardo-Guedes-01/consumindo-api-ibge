import { useState } from "react";
import api from './Services';
import './index.css';

function App() {
  // Termo da pesquisa que você vai digitar
  const [termoPesquisa, setTermoPesquisa] = useState("");
  // Resultado da pesquisa que será feita quando clicar em pesquisar

  const [resultados, setResultados] = useState([]);
  // Função que normaliza o texto pra ignorar as acentuações

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Função que traz a api e filtra quando chamada
  const handleTipoNoticiaChange = async (event) => {
    event.preventDefault();
    try {

      // Buscando dados
      // na linha const response = await api.get(""); o termo api é uma função na pasta Services/index.jsx, lá tem a requisição da API
      const response = await api.get("");

      // Filtragem dos dados
      if (Array.isArray(response.data.items)) {

  {
    // Pra você mudar pelo que quer pesquisar, vc muda na linha 25, onde tem item.tipo.toLowerCase() mudo o tipo para o nome do que você 
    // quer filtrar
  }

        const filteredResults = response.data.items.filter(item =>
          removeAccents(item.tipo.toLowerCase()).includes(removeAccents(termoPesquisa.toLowerCase()))
        );

        // Aqui altera os resultados do useState com os resultados da busca
        setResultados(filteredResults);
      } 

      // Isso aqui é pra caso não encontre nada
      else {
        setResultados([]);
        console.error("Os dados retornados não estão em um formato de matriz esperado.");
      }
    } 
    // Aqui é pra casos de erros
    catch (error) {
      setResultados([]);
      console.error("Ops! Ocorreu um erro:", error);
    }
  };

  return (
    <div className="geral">
      <div className="input">
        {// Aqui temos o formulário de busca, quando clicar em enviar o onSubmit vai mandar o que vc digitou pra função handleTipoNoticiaChange
        }
        <form onSubmit={handleTipoNoticiaChange}>
          {// O onChange é pra ir alterando o termo de pesquisa para quando clicar em pesquisar já tá alterado
          }
          <div className="campo">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="search"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
          </div>
        </form>
      </div>
      <div className="dados">
        <ul>
          {
            // Aqui é feita a exibição do resultado de pesquisa, usando o map pra tranformar em algo iterável pro javaScript
            // E a linha resultados.length > 0 ? é pra mostrar o resultado somente quando tiver algo como resultados
          }
          {resultados.length > 0 ? (
            resultados.map((item, index) => (
              <li key={index}>
                <h3>{item.titulo}</h3>
                <p>{item.introducao}</p>
                {item.imagens && typeof item.imagens === 'string' && (
                  <div>
                    {JSON.parse(item.imagens).image_intro && (
                      <img src={JSON.parse(item.imagens).image_intro} alt="Imagem de introdução" />
                    )}
                    {/* Você pode exibir outras imagens ou propriedades conforme necessário */}
                  </div>
                )}
                {/* Renderize outras propriedades da notícia conforme necessário */}
              </li>
            ))
          ) : (
            <li>Nenhum resultado encontrado</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
