// DIESES FILE FUNKTIONIERT Überhaupt nicht LOL
db = db.getSiblingDB("lucentia");

use "lucentia"

db.messages.insertMany([
    { "message": "Hola mundo!" },
    { "message": "Hallo Welt!" },
    { "message": "Ohayou Sekai!" },
    { "message": "Privet mir!" },
    { "message": "Hello world!" },
    { "message": "Saluton Mondo!" },
    { "message": "Hallo wereld" },
    { "message": 'bing chilling' },
    { "message": "Aiya Ambar!" }
]);
