# 🎮 Pokedex API

A RESTful API built with NestJS to manage a Pokémon database. This application provides complete CRUD endpoints for Pokémon operations with a simple web interface.

## 🚀 Features

- **Complete RESTful API** with CRUD operations
- **MongoDB database** for persistent storage
- **Docker Compose** for easy deployment
- **Simple web interface** for visualization
- **Data validation** with DTOs
- **Modular architecture** following NestJS best practices

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) (package manager)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB](https://www.mongodb.com/) (runs automatically with Docker)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pokedex
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start MongoDB database**

   ```bash
   docker-compose up -d
   ```

4. **Run the application in development mode**

   ```bash
   pnpm run start:dev
   ```

The application will be available at `http://localhost:3000`

first run the seed `http://localhost:3000/api/v2/seed`

## 🐳 Docker

### Start services

```bash
docker-compose up -d
```

### Stop services

```bash
docker-compose down
```

### View logs

```bash
docker-compose logs -f
```

## 📚 Available Scripts

```bash
# Development
pnpm run start:dev          # Run in development mode with hot reload
pnpm run start:debug        # Run in debug mode

# Production
pnpm run build             # Build the project
pnpm run start:prod        # Run in production mode

# Testing
pnpm run test              # Run unit tests
pnpm run test:watch        # Run tests in watch mode
pnpm run test:cov          # Run tests with coverage
pnpm run test:e2e          # Run end-to-end tests

# Linting and Formatting
pnpm run lint              # Run ESLint
pnpm run format            # Format code with Prettier
```

## 🔌 API Endpoints

### Base URL: `http://localhost:3000`

| Method   | Endpoint       | Description          |
| -------- | -------------- | -------------------- |
| `GET`    | `/pokemon`     | Get all Pokémon      |
| `GET`    | `/pokemon/:id` | Get a Pokémon by ID  |
| `POST`   | `/pokemon`     | Create a new Pokémon |
| `PATCH`  | `/pokemon/:id` | Update a Pokémon     |
| `DELETE` | `/pokemon/:id` | Delete a Pokémon     |
| `GET` | `/seed` | Populates DB with PokeApi data     |

### Usage Examples

#### Create a Pokémon

```bash
curl -X POST http://localhost:3000/pokemon \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pikachu",
    "type": "Electric",
    "level": 25
  }'
```

#### Get all Pokémon

```bash
curl http://localhost:3000/pokemon
```

#### Get a Pokémon by ID

```bash
curl http://localhost:3000/pokemon/1
```

#### Update a Pokémon

```bash
curl -X PATCH http://localhost:3000/pokemon/1 \
  -H "Content-Type: application/json" \
  -d '{
    "level": 30
  }'
```

#### Delete a Pokémon

```bash
curl -X DELETE http://localhost:3000/pokemon/1
```

## 🏗️ Project Structure

```
pokedex/
├── src/
│   ├── pokemon/
│   │   ├── dto/
│   │   │   ├── create-pokemon.dto.ts
│   │   │   └── update-pokemon.dto.ts
│   │   ├── entities/
│   │   │   └── pokemon.entity.ts
│   │   ├── pokemon.controller.ts
│   │   ├── pokemon.service.ts
│   │   └── pokemon.module.ts
│   ├── app.module.ts
│   └── main.ts
├── public/
│   ├── index.html
│   └── css/
│       └── styles.css
├── test/
├── docker-compose.yml
├── package.json
└── README.md
```

## 🗄️ Database

The application uses MongoDB as the database. The configuration includes:

- **Database**: `nest-pokemon`
- **Port**: `27017`
- **Persistence**: Data is stored in the `./mongo` directory

### MongoDB Configuration

```yaml
# docker-compose.yml
services:
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_DATABASE: nest-pokemon
    ports:
      - 27017:27017
    volumes:
      - ./mongo:/data/db
```

## 🧪 Testing

### Unit Tests

```bash
pnpm run test
```

### Tests with Coverage

```bash
pnpm run test:cov
```

### End-to-End Tests

```bash
pnpm run test:e2e
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/nest-pokemon

# Application port
PORT=3000

# Environment
NODE_ENV=development
```

### TypeScript

The project is configured with TypeScript and includes:

- Strict type configuration
- Validation decorators
- Automatic type mapping

## 🚀 Deployment

### Local Development

```bash
pnpm run start:dev
```

### Production

```bash
# Build
pnpm run build

# Run
pnpm run start:prod
```

### Docker

```bash
# Build image
docker build -t pokedex .

# Run container
docker run -p 3000:3000 pokedex
```
or if you're in a production environment:

```bash
docker-compose -f docker-compose.prod.yaml up --build
```


## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 👨‍💻 Author

**Your Name** - [@Vegito2448](https://github.com/Vegito2448)

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Framework for building scalable applications
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Docker](https://www.docker.com/) - Container platform

---

⭐ If this project has been helpful to you, give it a star!
