const db = db.getSiblingDB("lucentia");

db.chats.insertMany([
  {
    id: "f4c3b91d-6d4a-4e50-8dcb-3e4a3f6738b7",
    name: "Tech Enthusiasts",
    members: [
      "c56f2b88-9a12-41f4-a1e1-3bc7c9468b2c",
      "d72b2c7f-4b92-47c9-b2f9-ec3e157a3b67",
      "f5e7928d-abfe-4e12-b9c5-f23a9c3ffca3",
      "a847858a-9bc4-49b0-bc93-9ef2cfc4d3d5",
    ],
    messages: [
      {
        sender: "c56f2b88-9a12-41f4-a1e1-3bc7c9468b2c",
        message: "Did you check out the new framework?",
        sent_at: Date.now(),
      },
      {
        sender: "f5e7928d-abfe-4e12-b9c5-f23a9c3ffca3",
        message: "Yes, it's amazing!",
        sent_at: Date.now(),
      },
      {
        sender: "d72b2c7f-4b92-47c9-b2f9-ec3e157a3b67",
        message: "I think we should try it in our next project.",
        sent_at: Date.now(),
      },
    ],
  },
  {
    id: "a5d6c84f-1e4b-4c72-92eb-5bfa4b127a58",
    name: "Sports Fans Club",
    members: [
      "b74d2b11-7c12-45f8-a2f1-4cc3c9479b3c",
      "a63ec7b8-5b92-41c8-b6f9-ec4e157f2a87",
      "c71d9918-dcfe-4f95-b5c4-f25a9c3ffd85",
      "d938758d-9bc4-41d0-cb93-9af3cfb4d3d7",
    ],
    messages: [
      {
        sender: "b74d2b11-7c12-45f8-a2f1-4cc3c9479b3c",
        message: "Who watched the match last night?",
        sent_at: Date.now(),
      },
      {
        sender: "a63ec7b8-5b92-41c8-b6f9-ec4e157f2a87",
        message: "It was a nail-biter!",
        sent_at: Date.now(),
      },
      {
        sender: "c71d9918-dcfe-4f95-b5c4-f25a9c3ffd85",
        message: "That final goal was incredible!",
        sent_at: Date.now(),
      },
    ],
  },
  {
    id: "e3a7b64d-9f2b-4e95-b5e2-f67a8b3ffc12",
    name: "Movie Buffs",
    members: [
      "d83e2b89-1a34-48d9-a2e3-4cb7d9469c3e",
      "f93d3c7e-5d82-48e8-b7f9-ec5e157e2b76",
      "e81f9913-abfd-4d32-b8c5-f26a9c3ffba7",
      "c847158a-1ac3-49d9-bc93-9ff4cfc4e3d9",
    ],
    messages: [
      {
        sender: "d83e2b89-1a34-48d9-a2e3-4cb7d9469c3e",
        message: "What's everyone's favorite movie?",
        sent_at: Date.now(),
      },
      {
        sender: "f93d3c7e-5d82-48e8-b7f9-ec5e157e2b76",
        message: "I love Inception!",
        sent_at: Date.now(),
      },
      {
        sender: "e81f9913-abfd-4d32-b8c5-f26a9c3ffba7",
        message: "The Lord of the Rings is unbeatable for me.",
        sent_at: Date.now(),
      },
    ],
  },
]);

db.users.insertMany([
  {
    id: "c56f2b88-9a12-41f4-a1e1-3bc7c9468b2c",
    username: "TechGuru #101",
    status: "online",
  },
  {
    id: "d72b2c7f-4b92-47c9-b2f9-ec3e157a3b67",
    username: "CodeWizard #102",
    status: "offline",
  },
  {
    id: "f5e7928d-abfe-4e12-b9c5-f23a9c3ffca3",
    username: "DebugMaster #103",
    status: "online",
  },
  {
    id: "a847858a-9bc4-49b0-bc93-9ef2cfc4d3d5",
    username: "DevHero #104",
    status: "busy",
  },
  {
    id: "b74d2b11-7c12-45f8-a2f1-4cc3c9479b3c",
    username: "SportsFan #201",
    status: "offline",
  },
  {
    id: "a63ec7b8-5b92-41c8-b6f9-ec4e157f2a87",
    username: "GoalLover #202",
    status: "online",
  },
  {
    id: "c71d9918-dcfe-4f95-b5c4-f25a9c3ffd85",
    username: "MatchKing #203",
    status: "away",
  },
  {
    id: "d938758d-9bc4-41d0-cb93-9af3cfb4d3d7",
    username: "FinalGoal #204",
    status: "online",
  },
  {
    id: "d83e2b89-1a34-48d9-a2e3-4cb7d9469c3e",
    username: "MovieFanatic #301",
    status: "offline",
  },
  {
    id: "f93d3c7e-5d82-48e8-b7f9-ec5e157e2b76",
    username: "CinemaLover #302",
    status: "online",
  },
  {
    id: "e81f9913-abfd-4d32-b8c5-f26a9c3ffba7",
    username: "LOTRFan #303",
    status: "away",
  },
  {
    id: "c847158a-1ac3-49d9-bc93-9ff4cfc4e3d9",
    username: "ClassicMovies #304",
    status: "busy",
  },
]);
