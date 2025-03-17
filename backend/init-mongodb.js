const db = db.getSiblingDB("lucentia");

db.chats.insertMany([
  {
    id: "b1f8e7a3-4d2b-4a69-9b7e-1a6f4c3e8d5f",
    name: "General",
    members: [
      "2f4c7a1d-3b5e-4d8c-9f2a-1e7b6d3c5f8a",
      "5d7b2e8a-4f3c-4a6d-9c1b-2f7e3d8b4c5a",
      "7f2a3c8d-1b5e-4d6b-9f4a-3e7c2b5d8a9f",
      "4d7b2f8a-3c5e-4a6d-9b1f-2e7c3d5a8f9b",
      "3c7d2b5e-4a6f-9b1a-5d8c-2f7e3a4d9b6f",
      "1a7c3d5e-4b6f-9b2a-5d8c-2f7e4a3d9b6f",
      "6d2b5e3c-4a7f-9b1a-5d8c-2f7e4a3d9b6f",
      "8a3d5e2b-4c7f-9b1a-5d6c-2f7e4a3d9b6f",
      "9b3d5e2a-4c7f-1a5d-6c8b-2f7e4a3d9b6f",
      "5e3d2b4a-7f9b-1a6d-8c5e-2f7a4c3d9b6f",
      "7f3d5e2b-4a9b-1a6d-8c5e-2f7a4c3d9b6f",
      "4a3d5e2b-7f9b-1a6d-8c5e-2f7a4c3d9b6f",
      "3d5e2b4a-7f9b-1a6d-8c5e-2f7a4c3d9b6f",
    ],
    messages: [
      {
        sender: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
        message: "hello everyone",
        sent_at: Date.now(),
        translations: {
          de: "hallo zusammen",
          it: "ciao a tutti",
          nl: "hallo allemaal",
          es: "hola a todos",
          fr: "bonjour tout le monde",
        },
      },
      {
        sender: "b2c3d4e5-f678-9012-abcd-34ef56gh7890",
        message: "yooo",
        sent_at: Date.now(),
        translations: {
          de: "jooo",
          it: "ehi",
          nl: "jooo",
          es: "yooo",
          fr: "yooo",
        },
      },
      {
        sender: "c3d4e5f6-7890-12ab-cd34-ef56gh789012",
        message: "Nope.",
        sent_at: Date.now(),
        translations: {
          de: "Nein.",
          it: "No.",
          nl: "Nee.",
          es: "No.",
          fr: "Non.",
        },
      },
      {
        sender: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
        message: "how are you?",
        sent_at: Date.now(),
        translations: {
          de: "wie geht's?",
          it: "come stai?",
          nl: "hoe gaat het?",
          es: "¿cómo estás?",
          fr: "comment ça va ?",
        },
      },
      {
        sender: "b2c3d4e5-f678-9012-abcd-34ef56gh7890",
        message: "i am good hows it going mate?",
        sent_at: Date.now(),
        translations: {
          de: "mir geht's gut, wie läuft's, Kumpel?",
          it: "sto bene, come va amico?",
          nl: "het gaat goed, hoe gaat het maat?",
          es: "estoy bien, ¿cómo va, amigo?",
          fr: "ça va bien, comment ça se passe, mec ?",
        },
      },
      {
        sender: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
        message: "I am alright",
        sent_at: Date.now(),
        translations: {
          de: "mir geht's in Ordnung",
          it: "sto bene",
          nl: "het gaat wel",
          es: "estoy bien",
          fr: "ça va",
        },
      },
      {
        sender: "c3d4e5f6-7890-12ab-cd34-ef56gh789012",
        message:
          "Honestly, just see this\nIf I had toiled hard for my entire life, even after all the things I've endured and now I have an option to live a better life somewhere else. No one will stay here.",
        sent_at: Date.now(),
        translations: {
          de: "Ehrlich gesagt, schau dir das an\nWenn ich mein ganzes Leben hart gearbeitet hätte, trotz allem, was ich durchgemacht habe, und nun die Möglichkeit hätte, woanders ein besseres Leben zu führen. Niemand würde hier bleiben.",
          it: "Onestamente, guarda questo\nSe avessi lavorato duramente per tutta la vita, nonostante tutto quello che ho sopportato, e ora avessi l'opportunità di vivere una vita migliore altrove. Nessuno resterebbe qui.",
          nl: "Eerlijk gezegd, kijk hiernaar\nAls ik mijn hele leven hard had gewerkt, ondanks alles wat ik heb doorstaan, en nu de mogelijkheid had om ergens anders een beter leven te leiden. Niemand zou hier blijven.",
          es: "Honestamente, mira esto\nSi hubiera trabajado duro toda mi vida, a pesar de todo lo que he soportado, y ahora tuviera la opción de vivir una vida mejor en otro lugar. Nadie se quedaría aquí.",
          fr: "Honnêtement, regarde ça\nSi j'avais travaillé dur toute ma vie, malgré tout ce que j'ai enduré, et que j'avais maintenant la possibilité de vivre une meilleure vie ailleurs. Personne ne resterait ici.",
        },
      },
    ],
  },
  {
    id: "a8d5b3e7-4f2c-4a69-9b1f-2e7c3d5a8b6f",
    name: "glorp 👽",
    members: [],
    messages: [],
  },
  {
    id: "c7f2a3d5-4e8b-9b6a-1c5d-2f7e4a3d9b6f",
    name: "Memes",
    members: [],
    messages: [],
  },
  {
    id: "d9b3a5e7-4f2c-4a69-9b1f-2e7c3d5a8b6f",
    name: "Gibb",
    members: [],
    messages: [],
  },
  {
    id: "e8f2a3d5-4b7c-9b6a-1d5e-2f7a4c3d9b6f",
    name: "Emo",
    members: [],
    messages: [],
  },
  {
    id: "f7d2a3b5-4e8c-9b6a-1f5d-2e7c4a3d9b6f",
    name: "Programming",
    members: [],
    messages: [],
  },
]);


db.users.insertMany([
  { id: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78", username: "Kilonova", status: "online" },
  { id: "b2c3d4e5-f678-9012-abcd-34ef56gh7890", username: "Gangadhar", status: "online" },
  { id: "c3d4e5f6-7890-12ab-cd34-ef56gh789012", username: "Donna", status: "busy" },
  { id: "d4e5f678-9012-abcd-34ef-56gh789012ab", username: "Menks", status: "away" },
  { id: "e5f67890-12ab-cd34-ef56-gh789012abcd", username: "Fadilah", status: "online" },
  { id: "f6789012-abcd-34ef-56gh-789012abcdef", username: "Zaif", status: "offline" },
]);
