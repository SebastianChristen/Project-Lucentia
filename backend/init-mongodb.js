const { v4: uuidv4 } = require('uuid');
const db = db.getSiblingDB("lucentia");

db.messages.insertMany([
    {
        id: uuidv4(),
        sender: "user1",
        receivers: ["user2", "user3"],
        message: "Hola mundo!",
        sent_at: Date.now()
    },
    {
        id: uuidv4(),
        sender: "user2",
        receivers: ["user1"],
        message: "Hallo Welt!",
        sent_at: Date.now()
    },
    {
        id: uuidv4(),
        sender: "user3",
        receivers: ["user1", "user2"],
        message: "Ohayou Sekai!",
        sent_at: Date.now()
    },
    {
        id: uuidv4(),
        sender: "user4",
        receivers: ["user5"],
        message: "Privet mir!",
        sent_at: Date.now()
    },
    {
        id: uuidv4(),
        sender: "user1",
        receivers: ["user2", "user3", "user4"],
        message: "Hello world!",
        sent_at: Date.now()
    },
    {
        id: uuidv4(),
        sender: "user6",
        receivers: ["user7"],
        message: "Saluton Mondo!",
        sent_at: Date.now()
    },
    {
        id: uuidv4(),
        sender: "user8",
        receivers: ["user9"],
        message: "Hallo wereld",
        sent_at: Date.now()
    },
    {
        id: uuidv4(),
        sender: "user10",
        receivers: ["user11"],
        message: "bing chilling",
        sent_at: Date.now()
    },
    {
        id: uuidv4(),
        sender: "user12",
        receivers: ["user13", "user14"],
        message: "Aiya Ambar!",
        sent_at: Date.now()
    }
]);
