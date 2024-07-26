import { useState } from "react";
import api from "./api";
interface Book {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: string;
  title: string;
  year: string;
}

function App() {
  const emptyUpdateBook = {
    author: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: "",
    title: "",
    year: "",
    new_title: "",
    new_year: "",
    new_author: "",
  };
  const emptyBook = {
    author: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: "",
    title: "",
    year: "",
  };
  const emptySearch = { title: "", year: "", author: "" };

  const [books, setBooks] = useState<Book[]>([]);
  const [newBookData, setNewBookData] = useState<Book>(emptyBook);
  const [searchBook, setSearchBook] = useState(emptySearch);
  const [deleteBook, setDeleteBook] = useState(emptySearch);
  const [updateBook, setUpdateBook] = useState(emptyUpdateBook);
  //Trae todos los libros
  const fetchAllBooks = async () => {
    const response = await api.get("/books-store-all");
    setBooks(response.data);
  };
  //Vacia la lista con los libros
  const emptyList = () => {
    setBooks([]);
  };
  //Los handleInput leen los eventos que ocurren en los formularios y guardan la informacion en sus respectivos estados
  const handleInputDelete = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeleteBook({
      ...deleteBook,
      [name]: value,
    });
  };
  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchBook({
      ...searchBook,
      [name]: value,
    });
  };
  const handleInputNewBook = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBookData({
      ...newBookData,
      [name]: value,
    });
  };
  const handleInputUpdateBook = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setUpdateBook({
      ...updateBook,
      [name]: value,
    });
  };
  //Los handleSubmit se encargan de enviar los formularios a sus respectivas a apis y reciben las respuestas
  const handleSubmitDelete = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.delete("/books-store", {
        params: deleteBook,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteBook(emptySearch);
    }
  };
  const handleSubmitSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.get("/books-store", {
        params: searchBook,
      });
      if (typeof response.data != typeof "") {
        setBooks(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSearchBook(emptySearch);
    }
  };
  const handleSubmitNewBook = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/books-store", null, {
        params: newBookData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setBooks([...books, newBookData]), setNewBookData(emptyBook);
    }
  };
  const handleSubmitUpdateBook = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.put("/books-store", null, {
        params: updateBook,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateBook(emptyUpdateBook);
    }
  };
  return (
    <>
      <button className="btn btn-primary" onClick={fetchAllBooks}>
        Todos los libros
      </button>
      <button className="btn btn-danger" onClick={emptyList}>
        Sacar libros
      </button>
      <header className="container my-4 d-flex">
        <form onSubmit={handleSubmitNewBook} className="mb-4 mx-4">
          <h3>Cargar nuevo libro</h3>
          <div className="form-group">
            <label>Autor:</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={newBookData.author}
              onChange={handleInputNewBook}
            />
          </div>
          <div className="form-group">
            <label>Pais:</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={newBookData.country}
              onChange={handleInputNewBook}
            />
          </div>
          <div className="form-group">
            <label>Imagen Link:</label>
            <input
              type="text"
              className="form-control"
              name="imageLink"
              value={newBookData.imageLink}
              onChange={handleInputNewBook}
            />
          </div>
          <div className="form-group">
            <label>Lenguaje:</label>
            <input
              type="text"
              className="form-control"
              name="language"
              value={newBookData.language}
              onChange={handleInputNewBook}
            />
          </div>
          <div className="form-group">
            <label>Link:</label>
            <input
              type="text"
              className="form-control"
              name="link"
              value={newBookData.link}
              onChange={handleInputNewBook}
            />
          </div>
          <div className="form-group">
            <label>Paginas:</label>
            <input
              type="number"
              className="form-control"
              name="pages"
              value={newBookData.pages}
              onChange={handleInputNewBook}
            />
          </div>
          <div className="form-group">
            <label>Titulo:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={newBookData.title}
              onChange={handleInputNewBook}
            />
          </div>
          <div className="form-group">
            <label>Año:</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={newBookData.year}
              onChange={handleInputNewBook}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Cargar libro
          </button>
        </form>

        <form onSubmit={handleSubmitSearch} className="mb-4 mx-4">
          <h3>Buscar libro</h3>
          <div className="form-group">
            <label>Autor:</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={searchBook.author}
              onChange={handleInputSearch}
            />
          </div>
          <div className="form-group">
            <label>Titulo:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={searchBook.title}
              onChange={handleInputSearch}
            />
          </div>
          <div className="form-group">
            <label>Año:</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={searchBook.year}
              onChange={handleInputSearch}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Buscar libro
          </button>
        </form>

        <form onSubmit={handleSubmitDelete} className="mb-4 mx-4">
          <h3>Borrar libro</h3>
          <div className="form-group">
            <label>Autor:</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={deleteBook.author}
              onChange={handleInputDelete}
            />
          </div>
          <div className="form-group">
            <label>Titulo:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={deleteBook.title}
              onChange={handleInputDelete}
            />
          </div>
          <div className="form-group">
            <label>Año:</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={deleteBook.year}
              onChange={handleInputDelete}
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Borrar libro
          </button>
        </form>

        <form onSubmit={handleSubmitUpdateBook} className="mb-4 mx-4">
          <h3>Actualizar libro</h3>
          <div className="form-group">
            <label>Titulo:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={updateBook.title}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Año:</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={updateBook.year}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Autor:</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={updateBook.author}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Nuevo Titulo:</label>
            <input
              type="text"
              className="form-control"
              name="new_title"
              value={updateBook.new_title}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Nuevo Año:</label>
            <input
              type="number"
              className="form-control"
              name="new_year"
              value={updateBook.new_year}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Nuevo Autor:</label>
            <input
              type="text"
              className="form-control"
              name="new_author"
              value={updateBook.new_author}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Nuevo Pais:</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={updateBook.country}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Nuevo Imagen Link:</label>
            <input
              type="text"
              className="form-control"
              name="imageLink"
              value={updateBook.imageLink}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Nuevo Lenguaje:</label>
            <input
              type="text"
              className="form-control"
              name="language"
              value={updateBook.language}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Nuevo Link:</label>
            <input
              type="text"
              className="form-control"
              name="link"
              value={updateBook.link}
              onChange={handleInputUpdateBook}
            />
          </div>
          <div className="form-group">
            <label>Nueva cantidad de paginas:</label>
            <input
              type="number"
              className="form-control"
              name="pages"
              value={updateBook.pages}
              onChange={handleInputUpdateBook}
            />
          </div>

          <button type="submit" className="btn btn-warning">
            Actualizar libro
          </button>
        </form>
      </header>
      <div className="row">
        {books.map((book) => (
          <div className="col-md-3 mb-2" key={book.imageLink}>
            <div className="card h-100">
              <img
                src={book.imageLink}
                className="card-img-top"
                alt={book.title}
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}
                  <br />
                  <strong>Country:</strong> {book.country}
                  <br />
                  <strong>Language:</strong> {book.language}
                  <br />
                  <strong>Pages:</strong> {book.pages}
                  <br />
                  <strong>Year:</strong> {book.year}
                </p>
                <a
                  href={book.link}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
