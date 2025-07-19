# GraphQL Examples

## Mutations

### Registro de Usuario

```graphql
mutation Register {
  register(
    input: {
      firstName: "Juan"
      lastName: "Pérez"
      email: "juan@example.com"
      username: "juanperez"
      password: "password123"
    }
  ) {
    accessToken
    refreshToken
    user {
      id
      email
      username
      firstName
      lastName
      role
      enabled
      createdAt
    }
  }
}
```

### Login

```graphql
mutation Login {
  login(input: { username: "juan23", password: "password123" }) {
    accessToken
    refreshToken
    user {
      id
      email
      username
      firstName
      lastName
      role
      enabled
      lastLogin
    }
  }
}
```

### Refresh Token

```graphql
mutation RefreshToken {
  refreshToken(refreshToken: "eyJhbGciOiJIUzI1NiJ9...") {
    accessToken
    refreshToken
    user {
      id
      email
      username
      role
    }
  }
}
```

### Actualizar Perfil (Usuario autenticado)

```graphql
mutation UpdateProfile {
  updateProfile(
    input: {
      firstName: "Juan Carlos"
      lastName: "Pérez García"
      username: "juancarlos"
      avatar: "https://example.com/avatar.jpg"
    }
  ) {
    id
    email
    username
    firstName
    lastName
    avatar
    updatedAt
  }
}
```

### Eliminar Perfil

```graphql
mutation DeleteProfile {
  deleteProfile
}
```

### Actualizar Usuario (Solo Admin)

```graphql
mutation UpdateUser {
  updateUser(
    id: "user-id-here"
    input: { firstName: "Nuevo Nombre", lastName: "Nuevo Apellido" }
  ) {
    id
    firstName
    lastName
    updatedAt
  }
}
```

### Eliminar Usuario (Solo Admin)

```graphql
mutation DeleteUser {
  deleteUser(id: "user-id-here")
}
```

### Cambiar Rol de Usuario (Solo Admin)

```graphql
mutation UpdateUserRole {
  updateUserRole(id: "user-id-here", role: MANAGER) {
    id
    role
    updatedAt
  }
}
```

### Habilitar/Deshabilitar Usuario (Solo Admin)

```graphql
mutation EnableUser {
  enableUser(id: "user-id-here") {
    id
    enabled
    updatedAt
  }
}

mutation DisableUser {
  disableUser(id: "user-id-here") {
    id
    enabled
    updatedAt
  }
}
```

## Queries

### Obtener Mi Perfil (Usuario autenticado)

```graphql
query Me {
  me {
    id
    email
    username
    firstName
    lastName
    avatar
    role
    enabled
    emailVerified
    createdAt
    updatedAt
    lastLogin
  }
}
```

### Listar Todos los Usuarios (Manager/Admin)

```graphql
query Users {
  users {
    id
    email
    username
    firstName
    lastName
    role
    enabled
    createdAt
    lastLogin
  }
}
```

### Obtener Usuario por ID (Manager/Admin)

```graphql
query User {
  user(id: "user-id-here") {
    id
    email
    username
    firstName
    lastName
    avatar
    role
    enabled
    emailVerified
    createdAt
    updatedAt
    lastLogin
  }
}
```

### Queries de Prueba

#### Endpoint Público

```graphql
query PublicTest {
  publicTest {
    message
    status
  }
}
```

#### Test para Usuario (requiere autenticación)

```graphql
query UserTest {
  userTest {
    message
    status
    role
  }
}
```

#### Test para Manager (requiere rol MANAGER)

```graphql
query ManagerTest {
  managerTest {
    message
    status
    role
  }
}
```

#### Test para Admin (requiere rol ADMIN)

```graphql
query AdminTest {
  adminTest {
    message
    status
    role
  }
}
```

## Cómo usar con autenticación

Para usar queries/mutations que requieren autenticación, incluye el header:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9..."
}
```

## Ejemplo completo de flujo

1. **Registro**:

```graphql
mutation {
  register(
    input: {
      firstName: "Test"
      lastName: "User"
      email: "test@example.com"
      username: "testuser"
      password: "test123"
    }
  ) {
    accessToken
    refreshToken
    user {
      id
      email
      role
    }
  }
}
```

2. **Usar el token para obtener perfil**:

```graphql
# Headers: { "Authorization": "Bearer <accessToken>" }
query {
  me {
    id
    email
    username
    firstName
    lastName
    role
  }
}
```

3. **Actualizar perfil**:

```graphql
# Headers: { "Authorization": "Bearer <accessToken>" }
mutation {
  updateProfile(input: { firstName: "Updated Name" }) {
    firstName
    updatedAt
  }
}
```

## Variables en GraphQL

También puedes usar variables:

```graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    accessToken
    user {
      email
      username
    }
  }
}
```

Variables:

```json
{
  "input": {
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan@example.com",
    "username": "juanperez",
    "password": "password123"
  }
}
```
