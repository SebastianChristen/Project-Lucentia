use actix_web::{get, App, HttpServer, Responder};

#[get("/messages")]
async fn hello_world() -> impl Responder {
    let messages = vec![
        "Hola mundo!",
        "Hallo Welt!",
        "Ohayou Sekai!",
        "Privet mir!",
        "Hello world!",
        "Saluton Mondo!",
        "Hallo wereld",
        "Dàn shì \"sù dù yǔ jī qíng jiǔ\" bǐ bing chilling",
        "Aiya Ambar!",
    ];
    messages.join("\n")
}

// Main method. Probably don't need to change to much except add services
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello_world)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
