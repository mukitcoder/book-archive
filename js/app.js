const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs))
}

const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    // console.log(docs);
   searchResult.textContent = '';
    // const docList = docs.docs;
    // console.log(docList);
   docs.forEach(book => {
        // console.log(book)
        // const firstEdition = book.publish_year[book.publish_year.length-1];

       const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card h-100">
                             <img class="img-fluid w-100 h-50 mx-auto d-block" src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" class="card-img-top" alt="...">
                             <div class="card-body">
                                <h3 class="card-title">Book Name: ${book.title}</h3>
                                <p class="card-text">Author Name: ${book.author_name ? book.author_name : "N/A"}</p>
                                <p class="card-text">Publisher Name: ${book.publisher ? book.publisher : "N/A"}</p>
                                <p class="card-text">First published in  </p>
                            </div>
                            <div class = "card-footer text-center">
                            <button class="btn btn-outline-dark" onclick="loadTeamDetail()">Load More</button> 
                        </div>
                         </div>
                         `
        searchResult.appendChild(div);
    });
}