const formEdit = document.querySelector("#form-edit");
const title = document.querySelector("#title");
const director = document.querySelector("#director");
const year = document.querySelector("#year");
const genre = document.querySelector("#genre");
const duration = document.querySelector("#duration");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");

const API = "http://localhost:3000/movies";
const id = new URLSearchParams(window.location.search).get("id");

async function getMovie() {
    loading.classList.remove("hidden");
    error.innerHTML = "";

    try {
        if (!id) {
            throw new Error("Không tìm thấy ID phim!");
        }

        const res = await axios.get(`${API}/${id}`);
        const movie = res.data;

        title.value = movie.title;
        director.value = movie.director;
        year.value = movie.year;
        genre.value = movie.genre;
        duration.value = movie.duration;
    } catch (err) {
        error.innerHTML = "Không tải được thông tin phim!";
        console.log(err);
    } finally {
        loading.classList.add("hidden");
    }
}

formEdit.addEventListener("submit", async (e) => {
    e.preventDefault();

    const movieTitle = title.value.trim();
    const movieDirector = director.value.trim();
    const movieYear = year.value;
    const movieGenre = genre.value;
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

    try {
        const updatedMovie = {
            title: movieTitle,
            director: movieDirector,
            year: Number(movieYear),
            genre: movieGenre,
            duration: Number(movieDuration)
        };

        await axios.put(`${API}/${id}`, updatedMovie);

        alert("Cập nhật phim thành công!");
        window.location.href = "index.html";
    } catch (err) {
        error.innerHTML = "Cập nhật phim thất bại!";
        console.log(err);
    } finally {
        loading.classList.add("hidden");
    }
});

getMovie();
