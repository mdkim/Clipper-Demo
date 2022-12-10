
## Dev notes

- Requires installed software
  - Node.js [https://nodejs.org/en/download/]

---

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

- TODO: replace with `npm build` and copy to `clipper-api` static
- start `clipper-io`
```sh
cd clipper-io
npm start
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

- start `clipper-api`
```sh
./gradlew bootRun
```
