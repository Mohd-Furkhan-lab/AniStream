# Anime Streaming Website

A full-stack anime streaming platform with user authentication, anime management, watch history tracking, and admin dashboard.

## 🎬 Features

- **User Authentication**: Sign up, login, and JWT-based authentication
- **Anime Catalog**: Browse and search anime titles
- **Watch Episodes**: Stream anime episodes
- **Watch History**: Automatically track watched episodes
- **Save Favorites**: Save anime to your collection
- **Admin Dashboard**: 
  - Add/Edit/Delete anime
  - Manage episodes
  - User management
- **User Profiles**: Manage user account settings
- **Cloudinary Integration**: Image hosting for anime posters

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT (PyJWT)
- **Password Hashing**: bcrypt
- **Image Storage**: Cloudinary
- **Server**: Uvicorn

### Frontend
- **Framework**: React 18 with Vite
- **Language**: JavaScript/TypeScript
- **Styling**: CSS
- **HTTP Client**: Axios
- **Routing**: React Router
- **Deployment**: Vercel

## 📁 Project Structure

```
anime_streaming_wesbite_backend/
├── app/                    # FastAPI application core
│   └── main.py            # App initialization and middleware
├── auth/                   # Authentication logic
│   └── Jwttoken.py        # JWT token handling
├── core/                   # Configuration
│   └── config.py          # App settings
├── models/                 # Database models
│   ├── anime_model.py     # Anime schema
│   └── users_model.py     # User schema
├── routes/                 # API endpoints
│   ├── user.py            # User endpoints
│   ├── admin.py           # Admin endpoints
│   └── anime.py           # Anime endpoints
├── schemas/                # Pydantic validation schemas
│   ├── anime_schemas.py   # Anime validation
│   └── user_schemas.py    # User validation
├── services/               # Business logic
│   ├── anime_servcies.py  # Anime operations
│   └── users_admin_services.py  # Admin operations
├── repo/                   # Database layer
│   └── db.py              # Database connection
├── dependecies/            # FastAPI dependencies
│   └── user_dependencies.py # Auth dependencies
├── anime-frontend/         # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   └── api/           # API configuration
│   └── public/            # Static assets
├── requirements.txt        # Python dependencies
├── run.py                  # Server startup script
└── create_admin.py         # Admin user initialization
```

## 🚀 Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL database
- Cloudinary account (for image hosting)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd anime_streaming_wesbite_backend
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/anime_db
   SECRET_KEY=your-secret-key-here
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

5. **Run migrations and create admin user**
   ```bash
   python create_admin.py
   ```

6. **Start the backend server**
   ```bash
   python run.py
   ```
   The API will be available at `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd anime-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update `src/api/axios.js` with your backend URL if not using localhost.

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/refresh` - Refresh JWT token

### Anime
- `GET /api/anime` - Get all anime
- `GET /api/anime/{id}` - Get anime details
- `GET /api/anime/{id}/episodes` - Get anime episodes
- `POST /api/anime/{id}/watch` - Mark episode as watched

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/history` - Get watch history
- `GET /api/users/saved` - Get saved anime

### Admin
- `POST /api/admin/anime` - Create anime
- `PUT /api/admin/anime/{id}` - Update anime
- `DELETE /api/admin/anime/{id}` - Delete anime
- `POST /api/admin/episodes` - Add episodes
- `PUT /api/admin/episodes/{id}` - Update episode
- `DELETE /api/admin/episodes/{id}` - Delete episode

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are issued on login/signup
- Include token in `Authorization: Bearer <token>` header for protected routes
- Tokens expire after a configured period
- Use refresh endpoints to get new tokens

## 📦 Dependencies

### Backend
- `fastapi` - Web framework
- `sqlalchemy` - ORM
- `pydantic` - Data validation
- `pyjwt` - JWT handling
- `bcrypt` - Password hashing
- `cloudinary` - Image hosting
- `uvicorn` - ASGI server
- `psycopg2` - PostgreSQL driver

### Frontend
- `react` - UI library
- `vite` - Build tool
- `axios` - HTTP client
- `typescript` - Type safety

## 🗄️ Database

The application uses PostgreSQL. Tables are automatically created on startup:
- `users` - User accounts and authentication
- `anime` - Anime catalog
- `episodes` - Individual episodes
- `watch_history` - User watch history
- `saved_anime` - User favorites

## 🚢 Deployment

### Backend
- Deploy to any platform supporting Python/FastAPI (Heroku, Railway, Render, etc.)
- Set environment variables on deployment platform
- Run database migrations before startup

### Frontend
- Frontend is configured for Vercel deployment (see `vercel.json`)
- Can also be deployed to Netlify, GitHub Pages, or any static host
- Run `npm run build` to generate production build

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 🆘 Support

For issues and questions, please open an issue in the repository.

---

**Happy Streaming!** 🎬✨
