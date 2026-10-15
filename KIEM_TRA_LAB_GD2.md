# BÀI KIỂM TRA LẤY ĐIỂM LAB GIAI ĐOẠN 2 -- 60 PHÚT

## JavaScript nâng cao + HTML/CSS + Axios + JSON Server

**Thời gian:** 60 phút\
**Tổng điểm:** 10 điểm\
**Hình thức:** Thực hành cá nhân

## Đề bài

Xây dựng ứng dụng **Quản lý danh sách phim (Movies Management)** bằng
JavaScript thuần, HTML/CSS, Axios và JSON Server.

**Không sử dụng React, TypeScript hoặc thư viện giao diện.**

**API:** `http://localhost:3000/movies`

### Kiến thức được sử dụng

- DOM: `querySelector`, `addEventListener`, cập nhật nội dung HTML.
- Axios với các request `GET`, `POST`, `PUT`, `DELETE`.
- `async/await`, `try/catch/finally`.
- Hiển thị trạng thái Loading và thông báo Error.
- Lấy dữ liệu form, kiểm tra dữ liệu đầu vào.
- Query String để tìm kiếm và sắp xếp dữ liệu bằng JSON Server.

## Dữ liệu mẫu

Tạo file `db.json`:

```json
{
  "movies": [
    {
      "id": "1",
      "title": "Avengers: Endgame",
      "director": "Anthony Russo",
      "year": 2019,
      "genre": "Action",
      "duration": 181
    },
    {
      "id": "2",
      "title": "Interstellar",
      "director": "Christopher Nolan",
      "year": 2014,
      "genre": "Sci-Fi",
      "duration": 169
    },
    {
      "id": "3",
      "title": "Inception",
      "director": "Christopher Nolan",
      "year": 2010,
      "genre": "Sci-Fi",
      "duration": 148
    },
    {
      "id": "4",
      "title": "The Conjuring",
      "director": "James Wan",
      "year": 2013,
      "genre": "Horror",
      "duration": 112
    },
    {
      "id": "5",
      "title": "Fast & Furious 7",
      "director": "James Wan",
      "year": 2015,
      "genre": "Action",
      "duration": 137
    }
  ]
}
```

Chạy JSON Server bằng lệnh phù hợp với phiên bản đã học, ví dụ:

```bash
npx json-server --watch db.json
```

## Câu 1 -- Hiển thị danh sách phim (2 điểm)

Sử dụng Axios để gọi API:

```http
GET /movies
```

Hiển thị danh sách phim dưới dạng bảng gồm các cột:

- STT
- Tên phim
- Đạo diễn
- Năm phát hành
- Thể loại
- Thời lượng (phút)
- Chức năng

**Yêu cầu:**

1.  Dùng `async/await` để gọi API.
2.  Hiển thị dữ liệu API lên bảng bằng JavaScript và DOM.
3.  Có thông báo khi danh sách phim trống.
4.  Có trạng thái `Loading...` trong khi chờ API.
5.  Dùng `try/catch/finally`: hiển thị thông báo khi lỗi và luôn tắt
    Loading trong `finally`.

## Câu 2 -- Thêm phim mới (2 điểm)

Tạo form thêm phim gồm các trường:

- Tên phim
- Đạo diễn
- Năm phát hành
- Thể loại
- Thời lượng (phút)

Khi nhấn nút **Thêm phim**, gửi request:

```http
POST /movies
```

**Yêu cầu:**

1.  Lấy dữ liệu từ form bằng JavaScript.
2.  Không cho phép các trường bắt buộc bị để trống.
3.  Năm phát hành phải là số nguyên hợp lệ; thời lượng phải lớn hơn 0.
4.  Dùng `async/await` và `try/catch/finally` khi gửi request.
5.  Thêm thành công thì thông báo kết quả, xóa dữ liệu form và cập nhật
    danh sách trên giao diện mà không tải lại trang.

## Câu 3 -- Sửa và xóa phim (2,5 điểm)

### a. Sửa phim (1,5 điểm)

Mỗi dòng phim có nút **Sửa**.

**Yêu cầu:**

1.  Khi nhấn **Sửa**, đưa dữ liệu phim hiện tại lên form.
2.  Lưu lại `id` của phim đang sửa để phân biệt thao tác cập nhật với
    thêm mới.
3.  Khi nhấn **Cập nhật**, gửi request:

```http
PUT /movies/:id
```

4.  Cập nhật thành công thì hiển thị dữ liệu mới trên bảng, không tạo
    thêm bản ghi.
5.  Có xử lý lỗi bằng `try/catch` và tắt Loading trong `finally`.

### b. Xóa phim (1 điểm)

Mỗi dòng phim có nút **Xóa**.

**Yêu cầu:**

1.  Sử dụng `confirm()` để xác nhận trước khi xóa.
2.  Gửi request:

```http
DELETE /movies/:id
```

3.  Sau khi xóa thành công, cập nhật danh sách trên giao diện mà không
    tải lại trang.
4.  Có thông báo lỗi nếu không xóa được phim.

## Câu 4 -- Tìm kiếm phim bằng JSON Server (1,5 điểm)

Tạo ô nhập tìm kiếm theo tên phim.

Ví dụ request:

```http
GET /movies?title_like=Avengers
```

**Yêu cầu:**

1.  Tìm kiếm theo trường `title` thông qua API JSON Server.
2.  Không dùng `filter()` để tìm kiếm ở phía JavaScript.
3.  Hiển thị kết quả trả về trên bảng.
4.  Khi xóa nội dung tìm kiếm, hiển thị lại toàn bộ danh sách.
5.  Hiển thị thông báo phù hợp khi không tìm thấy phim.
6.  Sử dụng `async/await`, `try/catch/finally` để xử lý request.

## Câu 5 -- Nâng cao: Sắp xếp dữ liệu từ API (2 điểm)

Bổ sung hai danh sách lựa chọn:

```text
Sắp xếp theo: [Năm phát hành ▼]
Thứ tự:       [Giảm dần ▼]
```

**Sắp xếp theo:**

- Năm phát hành (`year`)
- Thời lượng phim (`duration`)

**Thứ tự:**

- Tăng dần (`asc`)
- Giảm dần (`desc`)

**Yêu cầu:**

1.  Khi thay đổi lựa chọn, gọi lại API với tham số sắp xếp tương ứng.
2.  Không dùng `sort()` để sắp xếp dữ liệu ở phía JavaScript.
3.  Cập nhật kết quả lên bảng mà không tải lại trang.
4.  Kết hợp tìm kiếm và sắp xếp trong cùng một request.
5.  Mặc định sắp xếp theo năm phát hành giảm dần.
6.  Xử lý trường hợp API trả về danh sách rỗng.

### Ví dụ request

Sắp xếp theo năm phát hành giảm dần:

```http
GET /movies?_sort=year&_order=desc
```

Tìm phim có tên chứa `Fast`, sau đó sắp xếp theo thời lượng giảm dần:

```http
GET /movies?title_like=Fast&_sort=duration&_order=desc
```

**Lưu ý:** Điều kiện tìm kiếm và sắp xếp phải được gửi lên JSON Server
trong cùng request. Không lấy toàn bộ dữ liệu về rồi tự tìm kiếm hoặc
sắp xếp bằng JavaScript.

## Yêu cầu chung

- Đặt URL API trong một biến dùng chung, ví dụ `API_URL`.
- Gắn sự kiện bằng `addEventListener`.
- Không để thao tác gửi form làm tải lại trang; sử dụng
  `event.preventDefault()`.
- Các thao tác gọi API cần sử dụng `async/await`, `try/catch/finally`
  phù hợp.
- Hiển thị thông báo dễ hiểu khi API lỗi.
- Không cần làm giao diện đẹp; ưu tiên chức năng hoạt động đúng.

## Tổng kết điểm

| Nội dung                                      | Điểm |
| --------------------------------------------- | ---- |
| Câu 1 -- Hiển thị danh sách, Loading và Error | 2,0  |
| Câu 2 -- Thêm phim và kiểm tra dữ liệu        | 2,0  |
| Câu 3 -- Sửa và xóa phim                      | 2,5  |
| Câu 4 -- Tìm kiếm bằng API                    | 1,5  |
| Câu 5 -- Sắp xếp bằng API                     | 2,0  |

**Tổng cộng** **10,0**
