# Clipper Demo

1. start `clipper-api`
```sh
# using Maven
cd clipper-api
./mvnw spring-boot:run
```
-- or --
```sh
# using Gradle
cd clipper-api
./gradlew bootRun

# or using Gradle on Windows
cd clipper-api
.\gradlew bootRun
```
  - (optional) H2 database console: http://localhost:8080/api/h2-console

---

> Requires installed software
>  - Node.js [https://nodejs.org/en/download/]

2. start `clipper-io`
```sh
# first time install of `package.json` modules
cd clipper-io
npm install

# to run front-end after `npm install`
npm start
```
  - Open: http://localhost:3000/

---

3. Clean-up
```sh
# delete H2 database files
rm -r ~/temp-h2
```

---

###### &nbsp;
## Dev notes

## `clipper-io`

- `clipper-io` dependencies
```sh
npx create-react-app clipper-io

cd clipper-io
npm install @mui/joy @emotion/react @emotion/styled
npm install @mui/icons-material
npm install react-router-dom
npm install axios
```

---

## `clipper-api`

- Spring Initializer [https://start.spring.io/]
    - Project: Gradle
    - Language: Java
    - Spring Boot: 3.0.0
    - Metadata: org.kpcc, clipper-api
    - Packaging: JAR
    - Java: 17
    - Dependencies: Spring Web
```gradle
// in `build.gradle
plugins {
  ...
  id "io.freefair.lombok" version "6.6"
}
dependencies {
    ...
    implementation 'com.h2database:h2:2.1.214'
    implementation 'org.springframework.boot:spring-boot-starter-webflux'
}
```
