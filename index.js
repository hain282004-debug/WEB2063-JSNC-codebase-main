
const movieList = document.querySelector("#movie-list");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const message = document.querySelector("#message");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btn-search");

const API = "http://localhost:3000/movies";

async function getMovies(url = API) {
    loading.classList.remove("hidden");
    error.innerHTML = "";
    message.innerHTML = "";

    try {
        const res = await axios.get(url);
        const movies = res.data;

        if (movies.length === 0) {
            movieList.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-4">
                        Không tìm thấy phim
                    </td>
                </tr>
            `;
            return;
        }

        movieList.innerHTML = "";

        movies.forEach((movie, index) => {
            movieList.innerHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-2 border border-gray-300">${index + 1}</td>
                    <td class="px-4 py-2 border border-gray-300">${movie.title}</td>
                    <td class="px-4 py-2 border border-gray-300">${movie.director}</td>
                    <td class="px-4 py-2 border border-gray-300">${movie.year}</td>
                    <td class="px-4 py-2 border border-gray-300">${movie.genre}</td>
                    <td class="px-4 py-2 border border-gray-300">${movie.duration}</td>
                    <td class="px-4 py-2 border border-gray-300">
                        <div class="flex items-center justify-center gap-2">
                            <button
                                onclick="editMovie('${movie.id}')"
                                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                Sửa
                            </button>

                            <button
                                onclick="deleteMovie('${movie.id}')"
                                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                Xóa
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        error.innerHTML = "Lỗi tải danh sách phim!";
        console.log(err);
    } finally {
        loading.classList.add("hidden");
    }
}

async function deleteMovie(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa phim này không?")) {
        return;
    }

    loading.classList.remove("hidden");
    error.innerHTML = "";
    message.innerHTML = "";

    try {
        await axios.delete(`${API}/${id}`);

        message.innerHTML = "Xóa phim thành công!";
        await getMovies(API);
    } catch (err) {
        error.innerHTML = "Xóa phim thất bại!";
        console.log(err);
    } finally {
        loading.classList.add("hidden");
    }
}

function editMovie(id) {
    window.location.href = `edit.html?id=${id}`;
}

btnSearch.addEventListener("click", () => {
    const keyword = search.value.trim();

    if (keyword === "") {
        getMovies(API);
    } else {
        getMovies(`${API}?title_like=${encodeURIComponent(keyword)}`);
    }
});

search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnSearch.click();
    }
});

search.addEventListener("input", () => {
    if (search.value.trim() === "") {
        getMovies(API);
    }
});

getMovies();
