use actix_web::{get, App, HttpServer, Responder, HttpResponse};
use mongodb::{Client, options::ClientOptions, bson::doc};
use serde::{Serialize, Deserialize};
use futures::stream::TryStreamExt;

#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    pub message: String,  // Change from 'messages' to 'message'
}

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
    
    let db = client.database("lucentia");
    let collection = db.collection::<Message>("messages");

    // Fetch messages from MongoDB with an empty filter
    let messages = match collection.find(doc! {}).await {
        Ok(cursor) => cursor,
        Err(err) => {
            eprintln!("Error fetching messages from MongoDB: {:?}", err);
            return HttpResponse::InternalServerError().body(format!("Failed to fetch messages: {:?}", err));
        }
    };

    // Collect the messages
    let collected: Vec<Message> = match messages.try_collect().await {
        Ok(result) => result,
        Err(err) => {
            eprintln!("Error collecting messages: {:?}", err);
            return HttpResponse::InternalServerError().body(format!("Failed to collect messages: {:?}", err));
        }
    };

    // Return the collected messages as a JSON response
    HttpResponse::Ok().json(collected)
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
