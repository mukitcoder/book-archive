document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
document.getElementById('book-details').textContent = ''

// Search Book Handler
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";

    // For Error Msg
    if ((searchText === '') || (searchText === 'number')) {
        // please write something to display
        displayError();
    } else {
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('book-details').textContent = '';
        document.getElementById('search-result').textContent = '';
        const url = `http://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
    }

}


const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';
    document.getElementById('book-details').textContent = '';

}

// Display Search Result
const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    // console.log(docs);
    searchResult.textContent = '';
    if (docs == null) {
        displayError();
    } else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('book-numbers').innerText = `Books Found ${docs.length}`;

        docs.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `<div class="card h-100 shadow">
                             <img src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" class="card-img-top" alt="...">
                             <div class="card-body">
                             <h5 class="card-title"><span class="fw-bold">Book Name:</span> ${book.title}</h5>
                             <p class="card-text"><span class="fw-bold">Author Name:</span> ${book.author_name ? book.author_name : "N/A"}</p>
                             <p class="card-text"><span class="fw-bold">Publisher Name:</span> ${book.publisher ? book.publisher : "N/A"}</p>
                             <p class="card-text"><span class="fw-bold">Contributor Name:</span> ${book.contributor ?book.contributor : "N/A"}</p>
                             <p class="card-text"><span class="fw-bold">First published in</span> ${book.first_publish_year ?book.first_publish_year : "N/A"}</p>
                            </div>
                                <div class = "card-footer text-center">
                                <a href="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" target="_blank" class="btn btn-outline-dark">View Book Cover</a>
                                </div>
                         </div>
                         `
            searchResult.appendChild(div);
        });
    }
};