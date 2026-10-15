
const formAdd = document.querySelector("#form-add");
const title = document.querySelector("#title");
const director = document.querySelector("#director");
const year = document.querySelector("#year");
const genre = document.querySelector("#genre");
const duration = document.querySelector("#duration");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const message = document.querySelector("#message");

const API = "http://localhost:3000/movies";

formAdd.addEventListener("submit", async (e) => {
    e.preventDefault();

    const movieTitle = title.value.trim();
    const movieDirector = director.value.trim();
    const movieYear = year.value;
    const movieGenre = genre.value.trim();
    const movieDuration = duration.value;

    if (!movieTitle || !movieDirector || !movieYear || !movieGenre || !movieDuration) {
        error.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    if (!Number.isInteger(Number(movieYear)) || Number(movieYear) <= 0) {
        error.innerHTML = "Năm phát hành phải là số nguyên hợp lệ!";
        return;
    }

    if (!Number.isInteger(Number(movieDuration)) || Number(movieDuration) <= 0) {
        error.innerHTML = "Thời lượng phải là số nguyên lớn hơn 0!";
        return;
    }

    loading.classList.remove("hidden");
    error.innerHTML = "";
    message.innerHTML = "";

    try {
        const newMovie = {
            title: movieTitle,
            director: movieDirector,
            year: Number(movieYear),
            genre: movieGenre,
            duration: Number(movieDuration)
        };

        await axios.post(API, newMovie);

        alert("Thêm phim thành công!");
        formAdd.reset();
        window.location.href = "index.html";
    } catch (err) {
        error.innerHTML = "Thêm phim thất bại!";
        console.log(err);
    } finally {
        loading.classList.add("hidden");
    }
});
