Node.js App – Blogs Project

Node.js application built with Express and MongoDB. RestAPIs for managing blogs.

Features ->
1) RESTful API endpoints
2) MongoDB integration
3) Error handling and validation
4) Token based authentication (Passport.js)

Project Structure ->
.
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── validations/
│   ├── middlewares/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── index.js
│   ├── app.js
├── .env
├── package.json
└── README.md

Installations ->
1) git clone https://github.com/yourusername/your-repo-name.git
2) cd your-repo-name
3) npm install

Usage ->
1) Add your environment variables in .env
2) Start the app:
3) API will run on http://localhost:8000

Setting up .env file ->
1) PORT=8000
2) MONGODB_URL="mongodb://127.0.0.1:27017/blogsDb"
3) SECRET_KEY="secrekeyfortoken"
4) ACCESS_EXPIRATION_DAYS=30
