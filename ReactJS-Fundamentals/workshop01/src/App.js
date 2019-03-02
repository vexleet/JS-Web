import React, { Component } from 'react';
import './App.css';
import Navigation from './Common/Navigation';
import Footer from './Common/Footer';
import Page from './Common/Page';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      token: null,
      isAdmin: false,
      books: [],
      myOrderedBooks: [],
      cartOrders: [],
    }

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
    this.fetchBooks = this.fetchBooks.bind(this);
    this.createBook = this.createBook.bind(this);
    this.orderBook = this.orderBook.bind(this);
    this.getUserOrders = this.getUserOrders.bind(this);
    this.addBookToCart = this.addBookToCart.bind(this);
    this.removeBookFromCart = this.removeBookFromCart.bind(this);
    this.approveBook = this.approveBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.editBook = this.editBook.bind(this);
  }

  async registerUser(user) {
    await fetch("http://localhost:5000/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  async loginUser(user) {
    await fetch("http://localhost:5000/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        let isAdmin = data.user.roles.length > 0 ? true : false;
        this.setState({
          user: data.user.username,
          token: data.token,
          isAdmin: isAdmin
        });

        sessionStorage.setItem("user", data.user.username);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("isAdmin", isAdmin);

        isAdmin === false ? this.getUserOrders(data.token) : this.getAdminOrders(data.token);
      });
  }

  logout() {
    sessionStorage.clear();

    this.setState({
      user: null,
      token: null,
      isAdmin: false,
      orders: [],
      cartOrders: [],
    });
  }

  async fetchBooks() {
    await fetch("http://localhost:5000/book/all")
      .then((res) => res.json())
      .then((data) => this.setState({ books: data }));
  }

  async createBook(book) {
    await fetch("http://localhost:5000/book/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.token}`,
      },
      body: JSON.stringify(book),
    })
      .then(() => this.fetchBooks());
  }

  async orderBook(books) {
    await fetch("http://localhost:5000/orders/submit", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.token}`,
      },
      body: JSON.stringify(books),
    })
      .then(() => {
        this.setState({
          cartOrders: []
        });
        //TODO: Show message with toastr
        console.log("Ordered books successfully");
      });
  }

  async getUserOrders(token) {
    await fetch("http://localhost:5000/orders/user", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => this.setState({ myOrderedBooks: data }));
  }

  async getAdminOrders(token) {
    await fetch("http://localhost:5000/orders/pending", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => this.setState({ myOrderedBooks: data }));
  }

  addBookToCart(book) {
    //TODO: Redirect to cart
    let booksInCart = this.state.cartOrders;
    let bookIsInCart = booksInCart.find(x => x._id === book._id);

    if (!bookIsInCart) {
      booksInCart.push(book);
    }

    this.setState({
      cartOrders: booksInCart,
    });

    sessionStorage.setItem("cartOrders", JSON.stringify(booksInCart));
  }

  removeBookFromCart(book) {
    let booksInCart = this.state.cartOrders;
    let indexOfBook = booksInCart.indexOf(book);

    booksInCart.splice(indexOfBook, 1);

    this.setState({
      cartOrders: booksInCart,
    });

    sessionStorage.setItem("cartOrders", JSON.stringify(booksInCart));
  }

  async approveBook(id) {
    await fetch(`http://localhost:5000/orders/approve/${id}`, {
      method: "post",
      headers: {
        "Authorization": `Bearer ${this.state.token}`,
      }
    }).then(() => this.getAdminOrders(this.state.token));
  }

  async deleteBook(id) {
    await fetch(`http://localhost:5000/book/delete/${id}`, {
      method: "delete",
      headers: {
        "Authorization": `Bearer ${this.state.token}`,
      },
    }).then(() => this.fetchBooks());
  }

  async editBook(book, id) {
    await fetch(`http://localhost:5000/book/edit/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.token}`,
      },
      body: JSON.stringify(book),
    })
      .then(() => this.fetchBooks());
  }

  render() {
    let { user, isAdmin, books, myOrderedBooks, cartOrders } = this.state;

    return (
      <div className="App">
        <Navigation user={user} isAdmin={isAdmin} logout={this.logout} />
        <Page registerUser={this.registerUser}
          loginUser={this.loginUser}
          createBook={this.createBook}
          books={books}
          orderBook={this.orderBook}
          myOrderedBooks={myOrderedBooks}
          addBookToCart={this.addBookToCart}
          cartOrders={cartOrders}
          removeBookFromCart={this.removeBookFromCart}
          approveBook={this.approveBook}
          deleteBook={this.deleteBook}
          isAdmin={isAdmin}
          user={user}
          editBook={this.editBook} />
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    let token = sessionStorage.getItem("token") !== null;

    if (token) {
      let user = sessionStorage.getItem("user");
      let isAdmin = sessionStorage.getItem("isAdmin") === 'true';
      token = sessionStorage.getItem("token");
      let cartOrders = sessionStorage.getItem("cartOrders") ? JSON.parse(sessionStorage.getItem("cartOrders")) : [];

      this.setState({
        user: user,
        isAdmin: isAdmin,
        token: token,
        cartOrders: cartOrders
      });

      isAdmin === false ? this.getUserOrders(token) : this.getAdminOrders(token);
    }

    this.fetchBooks();
  }

  componentWillUnmount() {
    this.setState({});
  }
}

export default App;
