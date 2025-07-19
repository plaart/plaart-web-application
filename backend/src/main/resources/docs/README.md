# Plaart Aplicacion

## Tecnologías Utilizadas

- Java 21
- Spring Boot 3.2.0
- Spring Security 6
- Spring Data MongoDB
- JWT (Json Web Tokens)
- Lombok
- MongoDB
- Maven
- Spring GraphQL

## Estructura del Proyecto

```plaintext
src/main/java/com/example/authapp/
├── config/
│   ├── DataLoader.java
│   ├── JwtAuthenticationFilter.java
│   └── SecurityConfig.java
├── controller/
│   ├── AuthController.java
│   ├── UserController.java
│   └── TestController.java
├── dto/
│   ├── AuthRequest.java
│   ├── AuthResponse.java
│   ├── RegisterRequest.java
│   ├── RefreshTokenRequest.java
│   ├── UpdateUserRequest.java
│   └── UserProfileResponse.java
├── exception/
│   ├── ErrorResponse.java
│   └── GlobalExceptionHandler.java
├── model/
│   ├── Permission.java
│   ├── Role.java
│   └── User.java
├── repository/
│   └── UserRepository.java
├── service/
│   ├── AuthService.java
│   ├── JwtService.java
│   └── UserService.java
└── AuthAppApplication.java
```

## Requisitos Previos

- Java 21
- Maven 3.6+
- MongoDB 4.4+

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <repostory-url>
cd plaart-app
```

### 2. Compilar el proyecto

```bash
mvn clean compile
```

### 3. Ejecutar la aplicación

```bash
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8093`

## Usuarios Predefinidos

Al iniciar la aplicación, se crean automáticamente los siguientes usuarios:

| Email                | Password     | Role    | Descripción         |
|----------------------|--------------|---------|----------------------|
| <admin@example.com>    | admin123     | ADMIN   | Acceso completo      |
| <manager@example.com>  | manager123   | MANAGER | Gestión de usuarios  |
| <user@example.com>     | user123      | USER    | Usuario regular      |

## API Endpoints

### Autenticación

### Gestión de Usuarios
