const db = db.getSiblingDB("lucentia");

db.messages.insertMany([
    {
        id: "d9b2d63d-84b5-4c85-b4e5-e1e430d165f7",
        sender: "user1",
        receivers: ["user2", "user3"],
        message: "Hola mundo!",
        sent_at: Date.now()
    },
    {
        id: "e89f2b55-9b21-4e4b-b1e1-3bc5c9464a1a",
        sender: "user2",
        receivers: ["user1"],
        message: "Hallo Welt!",
        sent_at: Date.now()
    },
    {
        id: "ab63cc6f-7422-44c7-bcfa-ec1e157b2e87",
        sender: "user3",
        receivers: ["user1", "user2"],
        message: "Ohayou Sekai!",
        sent_at: Date.now()
    },
    {
        id: "e2a9918a-fbfe-4e75-b9a4-f23a9c1ffdb5",
        sender: "user4",
        receivers: ["user5"],
        message: "Privet mir!",
        sent_at: Date.now()
    },
    {
        id: "b745758d-9ac3-48a0-bb93-9ef4cfb3d3d4",
        sender: "user1",
        receivers: ["user2", "user3", "user4"],
        message: "Hello world!",
        sent_at: Date.now()
    },
    {
        id: "fc4709a7-087d-4d6e-9435-cf8653db1f25",
        sender: "user6",
        receivers: ["user7"],
        message: "Saluton Mondo!",
        sent_at: Date.now()
    },
    {
        id: "f4624eaf-81b2-406b-8b6d-cadbfbc0b30b",
        sender: "user8",
        receivers: ["user9"],
        message: "Hallo wereld",
        sent_at: Date.now()
    },
    {
        id: "7be5296d-5a5d-4775-8e0f-0c3cf9488fc3",
        sender: "user10",
        receivers: ["user11"],
        message: "bing chilling",
        sent_at: Date.now()
    },
    {
        id: "ada9c20a-2a64-48f5-a1c8-dcc3c1b15a02",
        sender: "user12",
        receivers: ["user13", "user14"],
        message: "Aiya Ambar!",
        sent_at: Date.now()
    }
]);



db.users.insertMany([
    {
        id: "d9b2d63d-84b5-4c85-b4e5-e1e430d165f7",
        username: "SebuPro #000",
        status: "online",
    },
    {
        id: "ad38137f-0e16-4e26-9a23-fd185dd2695b",
        username: "Lorinator #007",
        status: "offline",
    }
]);
