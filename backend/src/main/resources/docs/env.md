# Configuración de Entornos

## Estructura de Archivos

```plaintext
src/main/resources/
├── application.properties          # Configuración común
├── application-local.properties    # Entorno local
├── application-pre.properties      # Pre-producción
└── application-prod.properties     # Producción
```

### Cómo Activar Cada Entorno

1. Entorno Local (Desarrollo)

```bash
# Opción 1: Variable de entorno
export SPRING_PROFILES_ACTIVE=local

# Opción 2: Parámetros JVM
java -Dspring.profiles.active=local -jar tu-app.jar
```

### .JAR

Es el archvio JAR ejecutable que contiene toda tu aplicación Spring Boot empaquetada. Es un archivo único que incluye:

- Tu código compilado
- Todas las dependencias
- Configuraciones
- Un servidor web embedido (Tomcat)

### PASO A PASO

#### 🔧 Cómo Generar el JAR

##### Con Maven

```bash
    # Limpiar y compilar  [1]
    mvn clean compile

    # Generar JAR (sin tests) [2]
    mvn clean package -DskipTests

    # Generar JAR (con tests)
    mvn clean package

    # Ver el JAR generado  [3]
    ls target/
    # Resultado: plaart-back-app-1.0.0.jar
```

```plaintext
proyecto/
├── src/
├── target/
│   └── plaart-back-app-1.0.0.jar  ← Aquí se genera
├── pom.xml
└── ...
```

##### Ejecutar con perfil específico

```bash
# Entorno local
java -jar target/plaart-back-app-1.0.0.jar --spring.profiles.active=local

# Entorno pre-producción
java -jar target/plaart-back-app-1.0.0.jar --spring.profiles.active=pre

# Entorno producción
java -jar target/plaart-back-app-1.0.0.jar --spring.profiles.active=prod

```
