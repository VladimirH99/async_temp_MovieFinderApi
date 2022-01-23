let moviesList = null;
let inputSearch = null;
let triggerMode = false;

const createElement = (type, attrs, container) => {
    const el = document.createElement(type);

    Object.keys(attrs).forEach(key => {
        if (key !== 'innerText') {
            el.setAttribute(key, attrs[key])
        } else {
            el.innerHTML = attrs[key];
        }
    });
    if (container) container.append(el);
    return el;
}

const createStyle = () => {
    createElement('style', {
        innerText: `
        * {
        box-sizing: border-box;
    }
    
    body {
        margin: 0;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    
    .container {
        padding: 20px;
        max-width: 1280px;
        margin: 0, auto;
    }
    
    .movies {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
    }
    
    .movie {
        display: flex;
        align-content: center;
        justify-content: center;
    }
    
    .movie__image {
        width: 100%;
        object-fit: cover;
    }
    
    .search {
        margin-bottom: 30px;
    }
    
    .search__label-input {
        display: block;
        margin-bottom: 10px;
    }
    
    .search__input {
        display: block;
        padding: 10px 15px;
        max-width: 400px;
        width: 100%;
        border: 2px solid lightslategray;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    
    .search__label-checkbox {
        display: block;
        font-size: 15px;
        margin-top: -18px;
        margin-left: 25px;
    }`
    }, document.head);
};

const triggerModeHandler = () => triggerMode = !triggerMode;

const createSearchBox = (container) => {

    createElement('h1', {
        innerText: 'Приложение для поиска фильмов'
    }, container);

    const searchBox = createElement('div', { class: 'search' }, container);

    createElement('label', {
        class: 'search__label-input',
        for: 'search',
        innerText: 'Поиск фильмов'
    }, searchBox);


    createElement('input', {
        class: 'search__input',
        id: 'search',
        type: 'search',
        placeholder: 'Введите фильм...'
    }, searchBox);


    const el = createElement('input', {
        class: 'search__checkbox',
        id: 'checkbox',
        type: 'checkbox'
    }, searchBox);
    el.addEventListener('click', triggerModeHandler);

    createElement('label', {
        class: 'search__label-checkbox',
        for: 'checkbox',
        innerText: 'Добавлять фильмы к существующему списку'
    }, searchBox);

};

const createMarkup = () => {
    const container = createElement('div', { class: 'container' });

    createSearchBox(container);

    createElement('div', { class: 'movies' }, container);
    // ! реализовать prepend //
    document.body.prepend(container);

    moviesList = document.querySelector('.movies');
    inputSearch = document.querySelector('#search');
};

const addMovieToList = (movie) => {
    const item = createElement('div', { class: 'movie' }, moviesList);
    createElement('img', {
        src: /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/no_image.jpg',
        class: 'movie__image',
        alt: movie.Title,
        title: movie.Title
    }, item);
}


const getData = (url) => fetch(url)
    .then((res) => res.json())
    .then((json) => {
        if (!json || !json.Search) throw Error('Сервер вернул не правильный ответ.');
        return json.Search;
    });

const delay = (() => {
    let timer = 0;
    return (cb, ms) => {
        clearTimeout(timer);
        timer = setTimeout(cb, ms);
    };
})();

const clearMovieMarkup = () => moviesList && (moviesList.innerHTML = '');

const siteUrl = 'http://www.omdbapi.com/';
let searchLast = ' ';

createMarkup();
createStyle();

inputSearch.addEventListener('keyup', (e) => {
    delay(() => {
        const searchString = e.target.value.trim();
        if (searchString && searchString.length > 3 && searchString !== searchLast) {

            if (!triggerMode) clearMovieMarkup();

            getData(`${siteUrl}?apikey=18b8609f&s=${searchString}`)
                .then((movies) => movies.forEach(movie => addMovieToList(movie)))
                .catch((err) => console.log(err));
        }
        searchLast = searchString;
    }, 1500)


});



