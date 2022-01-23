let moviesList = null;
let inputSearch = null;
let triggerMode = false;

const createElement = ({
    type,
    attrs,
    container = null,
    position = 'append',
    evt = null,
    handler = null
}) => {
    const el = document.createElement(type);

    Object.keys(attrs).forEach(key => {
        if (key !== 'innerText') {
            el.setAttribute(key, attrs[key])
        } else {
            el.innerHTML = attrs[key];
        }
    });
    if (container && position === 'append') container.append(el);
    if (container && position === 'prepend') container.prepend(el);
    if (evt && handler && typeof handler === 'function') el.addEventListener(evt, handler);
    return el;
}

const createStyle = () => {
    createElement({
        type: 'style',
        attrs: {
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
        },
        container: document.head
    });
};


const createMarkup = () => {
    const container = createElement({
        type: 'div',
        attrs: { class: 'container' },
        container: document.body,
        position: 'prepend'
    });

    createElement({
        type: 'h1',
        attrs: { innerText: 'Приложение для поиска фильмов' },
        container
    });

    const searchBox = createElement({
        type: 'div',
        attrs: { class: 'search' },
        container
    });

    createElement({
        type: 'label',
        attrs: {
            class: 'search__label-input',
            for: 'search',
            innerText: 'Поиск фильмов'
        },
        container: searchBox
    });


    inputSearch = createElement({
        type: 'input',
        attrs: {
            class: 'search__input',
            id: 'search',
            type: 'search',
            placeholder: 'Введите фильм...'
        },
        container: searchBox
    });


    createElement({
        type: 'input',
        attrs: {
            class: 'search__checkbox',
            id: 'checkbox',
            type: 'checkbox'
        },
        container: searchBox,
        evt: 'click',
        handler: () => triggerMode = !triggerMode
    });


    createElement({
        type: 'label',
        attrs: {
            class: 'search__label-checkbox',
            for: 'checkbox',
            innerText: 'Добавлять фильмы к существующему списку'
        },
        container: searchBox
    });

    moviesList = createElement({
        type: 'div',
        attrs: { class: 'movies' },
        container
    });
};

const addMovieToList = (movie) => {
    const item = createElement({
        type: 'div',
        attrs: { class: 'movie' },
        container: moviesList
    });
    createElement({
        type: 'img',
        attrs: {
            src: /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/no_image.jpg',
            class: 'movie__image',
            alt: movie.Title,
            title: movie.Title
        },
        container: item
    });
}


const getData = (url) => fetch(url)
    .then((res) => res.json())
    .then((json) => {
        if (!json || !json.Search) throw Error('Сервер вернул не правильный ответ.');
        return json.Search;
    });

const debounce = (() => {
    let timer = null;
    return (cb, ms) => {
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(cb, ms);
    };
})();

const clearMovieMarkup = () => moviesList && (moviesList.innerHTML = '');

const siteUrl = 'http://www.omdbapi.com/';
let searchLast = ' ';

createMarkup();
createStyle();

inputSearch.addEventListener('keyup', (e) => {
    debounce(() => {
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



