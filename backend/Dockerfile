FROM rust:latest

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN cargo fetch

COPY ./src ./src

EXPOSE 8080
