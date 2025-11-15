# backend.Dockerfile (recommended)
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /build

COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src ./src
RUN chmod +x mvnw || true
RUN ./mvnw -B -DskipTests clean package || mvn -B -DskipTests clean package

FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /build/target/*-SNAPSHOT.jar /app/app.jar
COPY --from=builder /build/target/*.jar /app/app.jar
EXPOSE 1992
ENTRYPOINT ["java","-jar","/app/app.jar"]
