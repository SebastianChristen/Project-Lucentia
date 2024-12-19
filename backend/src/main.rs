use actix_web::{get, App, HttpServer, Responder, HttpResponse};
use mongodb::{Client, options::ClientOptions, bson::{doc, Document}};
use futures::stream::TryStreamExt;

#[get("/messages")]
async fn hello_world() -> impl Responder {
    // MongoDB connection string should use the service name from Docker Compose
    let client_options = match ClientOptions::parse("mongodb://mongodb:27017").await {
        Ok(options) => options,
        Err(err) => {
            eprintln!("Error parsing MongoDB URI: {:?}", err);
            return HttpResponse::InternalServerError().body("Failed to connect to MongoDB");
        }
    };

    let client = match Client::with_options(client_options) {
        Ok(client) => client,
        Err(err) => {
            eprintln!("Error creating MongoDB client: {:?}", err);
            return HttpResponse::InternalServerError().body("Failed to create MongoDB client");
        }
    };

    // Fetch all databases
    let databases = match client.list_databases().await {
        Ok(db_list) => db_list,
        Err(err) => {
            eprintln!("Error fetching databases from MongoDB: {:?}", err);
            return HttpResponse::InternalServerError().body(format!("Failed to fetch databases: {:?}", err));
        }
    };

    // Log the list of databases for debugging
    eprintln!("Fetched databases: {:?}", databases);

    // Return the list of databases as a JSON response
    HttpResponse::Ok().json(databases)
}

// Main method with Actix Web setup
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
