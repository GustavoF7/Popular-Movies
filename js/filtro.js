import { listaDeFavoritos } from './main.js';
import { apiKey } from './script.js';
import { InserirFilmesNaTela } from './main.js';
const filtroAtivo = document.getElementById('cabecalho__checkbox');


filtroAtivo.addEventListener('change', filtrarFilmesFavoritos);

function filtrarFilmesFavoritos() {
    const elementos = document.querySelectorAll('.cards');
    elementos.forEach(elemento => {
        if (filtroAtivo.checked) {
            const movieId = Number(elemento.dataset.movieId);

            if (!listaDeFavoritos.includes(movieId)) {
                elemento.style.display = "none";
            }
            if (listaDeFavoritos.length === 0) {
                document.querySelector('.card__lista-vazia').style.display = 'flex';
            }
        } else {
            elemento.style.display = "flex";
            document.querySelector('.card__lista-vazia').style.display = 'none';
        }

    });
}

const inputPesquisa = document.querySelector('.cabecalho__pesquisa-input');
const lupa = document.querySelector('.cabecalho__pesquisa-lupa');
lupa.addEventListener('click', pesquisarFilmes);

function pesquisarFilmes() {
    const searchTerm = inputPesquisa.value.trim(); // Obtém o valor do campo de pesquisa e remove espaços em branco no início e no final

    if (searchTerm !== '') {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchTerm}&page=1&include_adult=false`)
            .then(response => response.json())
            .then(data => {
                const movies = data.results; // Array de filmes correspondentes aos resultados da pesquisa
                let movieIds = [];
                let movieList = [];

                const exactMatch = movies.find(movie => movie.title === searchTerm); // Verifica se há um filme com título exato

                if (exactMatch) {
                    movieIds.push(exactMatch.id); // Adiciona o ID do filme com título exato
                    movieList.push(exactMatch); // Adiciona o filme à lista de filmes
                } else {
                    movieIds = movies.map(movie => movie.id); // Adiciona os IDs de todos os filmes correspondentes
                    movieList = movies; // Define a lista de filmes como todos os filmes correspondentes
                }

                InserirFilmesNaTela(movieList);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao pesquisar filmes:', error);
            });
    } else {
        console.log('Nenhum termo de pesquisa foi inserido.');
    }
}

function obterDetalhesFilmes(ids) {
    const urls = ids.map(id => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
    const promises = urls.map(url => fetch(url).then(response => response.json()));
    return Promise.all(promises);
}



