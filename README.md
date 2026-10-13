# ShopKart — MERN Stack E-Commerce Application

ShopKart is a full-stack e-commerce web application developed as part of an engineering lab project. It provides a platform for customers to register, log in, browse products, and explore individual product details through a responsive React-based interface backed by a REST API.

## 🚀 Features

- **User Authentication** — Customer registration and login.
- **Protected Routes** — Restricts access to authenticated pages.
- **Authentication-Based Navigation** — Redirects users according to their authentication status.
- **Product Catalog** — Browse available products.
- **Product Details** — View detailed information about individual products.
- **REST API Integration** — Communicates with the backend using Axios.
- **Component-Based Architecture** — Organizes the frontend into reusable React components.
- **Client-Side Routing** — Uses React Router for navigation between pages.

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- HTML5 and CSS3

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- Configure according to the database used by your backend.

## 📁 Project Structure

```text
ShopKart/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   ├── customerService.js
│   │   │   └── productService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── app.js
│   └── package.json
│
└── README.md
```

*Note: The directory structure above is illustrative. Update it to match your actual repository.*

## ⚙️ Getting Started

### Prerequisites

Ensure that the following are installed:

- Node.js and npm
- Git
- The database required by the backend

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd ShopKart
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Configure the required environment variables in a `.env` file according to your backend implementation.

Start the backend server:

```bash
npm run dev
```

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🔐 Authentication and Routing

The application uses authentication-aware routing to control access to different pages.

| Route | Description | Access |
|---|---|---|
| `/login` | Customer login | Public when logged out |
| `/register` | Customer registration | Public when logged out |
| `/home` | Home page | Authenticated users |
| `/products` | Product catalog | Authenticated users |
| `/products/:id` | Individual product details | Authenticated users |

The frontend uses an authentication context to manage the current user and loading state. Protected routes prevent unauthenticated users from accessing restricted pages, while public routes can redirect authenticated users to the home page.

## 🔌 API Integration

The frontend communicates with the backend through service modules.

### Customer APIs

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/customer/register` | Register a customer |
| `POST` | `/customer/login` | Authenticate a customer |
| `POST` | `/customer/logout` | Log out a customer |
| `GET` | `/customer/...` | Retrieve the current customer, according to the configured backend route |

### Product APIs

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/customer/products` | Retrieve the product catalog |
| `GET` | `/customer/products/:id` | Retrieve a product by ID, if supported by the backend |

The product details endpoint and authentication endpoints should be adjusted to match the routes implemented by the server.

## 🔒 Environment Variables

Store configuration and secrets in environment variables rather than hardcoding them into source files.

Example backend configuration:

```env
PORT=8000
# Add database credentials and authentication
# configuration required by your backend.
```

Do not commit `.env` files, credentials, session secrets, or other sensitive configuration to Git. Add them to `.gitignore`.

## 🧪 Running the Application

1. Start the backend server.
2. Start the Vite development server.
3. Open the application in your browser.
4. Register a new customer or log in.
5. Navigate to the home page and product catalog.
6. Open an individual product to view its details.
7. Verify that protected routes behave correctly when logged in and logged out.

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Building a React frontend using reusable components.
- Implementing client-side routing.
- Managing authentication state using React Context.
- Protecting routes based on authentication status.
- Integrating frontend services with REST APIs using Axios.
- Structuring a full-stack application into maintainable modules.
- Debugging frontend and backend integration issues.

## 👨‍💻 Author

**Tamanwit Sadhukhan**

Developed as part of an engineering lab project focused on full-stack web development.

## 📄 License

This project was developed for educational purposes. Add a license if you intend to distribute it publicly.
