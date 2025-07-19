# Comandos Útiles

```bash
    # Ver información del JAR
    java -jar target/plaart-back-app.jar --help

    # Ejecutar en background
    nohup java -jar target/plaart-back-app.jar &

    # Ejecutar con memoria especifica
    java -Xmx512 -jar target/plaart-back-app.jar

    # Ejecutar con puerto especifico
    java -jar target/plaart-back-app.jar --server.port=8090

    # Ver contenido del JAR
    jar -tf target/plaart-back-app.jar

    # Verificar Main Class
    jar -xf target/plaart-back-app.jar META-INF/MANIFEST.MF
    cat META-INF/MANIFEST.MF
```
