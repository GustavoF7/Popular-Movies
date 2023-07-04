import { InserirFilmesNaTela } from "./main.js";

export const apiKey = '9bbf7d734588f0a01ba0510c39e7e786';
let movies = []; // Declara a variável movies no escopo global

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`)
  .then(response => response.json())
  .then(data => {
    movies = data.results.slice(0, 10); // Atribui o valor a movies
    InserirFilmesNaTela(movies);
  })
  .catch(error => {
    console.error('Ocorreu um erro ao obter os filmes populares:', error);
  });

const home = document.querySelector('.cabecalho__titulo');
home.addEventListener('click', () => {
  InserirFilmesNaTela(movies);
});
