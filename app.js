
// افزودن فیلم جدید
function addMovie() {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = parseFloat(document.getElementById('rating').value);

    if (!title || !genre || isNaN(rating)) {
        alert('لطفاً تمامی فیلدها را پر کنید.');
        return;
    }

    fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, genre, rating })
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('addResult').innerText = 'فیلم با موفقیت اضافه شد: ' + data;
        })
        .catch(error => {
            document.getElementById('addResult').innerText = 'خطا در افزودن فیلم: ' + error;
        });
}

// // حذف فیلم
// function deleteMovie() {
//     const id = parseInt(document.getElementById('deleteId').value);

//     if (isNaN(id)) {
//         alert('لطفاً یک ID معتبر وارد کنید.');
//         return;
//     }

//     fetch(`http://localhost:8080/movies/${id}`, {
//         method: 'DELETE',
//     })
//     .then(response => {
//         if (!response.ok) {
//             return Promise.reject('خطا در حذف فیلم');
//         }
//         return response.text();
//     })
//     .then(data => {
//         document.getElementById('deleteResult').innerText = 'فیلم با موفقیت حذف شد: ' + data;
//     })
//     .catch(error => {
//         document.getElementById('deleteResult').innerText = 'خطا در حذف فیلم: ' + error;
//     });

// }

// نمایش فیلم‌ها
function fetchMovies() {
    fetch('http://localhost:8080/movies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            const movieListContainer = document.getElementById('movieList');
            movieListContainer.innerHTML = ''; // پاک کردن محتویات قبلی

            if (data.length == 0) {
                movieListContainer.innerHTML = 'هیچ فیلمی در پایگاه داده موجود نیست.';
            } else {

                data.forEach(movie => {

                    movieListContainer.insertAdjacentHTML('beforeend', `

                        
                    <li><a href="http://127.0.0.1:5500/movie.html?id=${movie.id}">ID: ${movie.id} | عنوان: ${movie.title} | ژانر: ${movie.genre} | امتیاز: ${movie.rating}</a></li>
                    
                    `)

                });


                // movieListContainer.innerHTML = movieListHtml;
            }


        })
        .catch(error => {
            document.getElementById('movieList').innerText = 'خطا در دریافت فیلم‌ها: ' + error;
        });
}



setTimeout(() => {

    document.addEventListener('load', fetchMovies())
}, 0);
