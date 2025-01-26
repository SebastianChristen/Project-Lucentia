// read user cookie (where the uuid is stored)
const sessionUuid = document.cookie
  .split("; ")
  .find((row) => row.startsWith("session_uuid="))
  ?.split("=")[1];
//alert(`Your User ID is: ${sessionUuid || "not found"}`); //nur zum developen

// id aus url abrufen
const currentUrl = new URL(window.location.href);
const idFromUrl = currentUrl.searchParams.get("id");

const backendUrl = `http://localhost:8000/chats/${idFromUrl}`;
const backendUrlUser = `http://localhost:8000/users/${sessionUuid}`;

// --- GET alle verschiedenen chats anzeigen
async function getAllChats() {
  const response = await fetch("http://localhost:8000/chats/");
  const chats = await response.json();

  const list2 = document.getElementById("chats-list");
  list2.innerHTML = "";

  chats.forEach((chat) => {
    const listItem2 = document.createElement("a");
    listItem2.href = `${"?id=" + chat.id}`;
    listItem2.className = "chat";
    listItem2.textContent = `${chat.name}`;
    list2.appendChild(listItem2);
  });
}

// --- GET USERNAME and display it
async function loadUsername() {
  const response = await fetch(backendUrlUser);
  const user = await response.json();
  return user.username;
}

// --- random kleine funktion
function logoff() {
  document.cookie = "session_uuid=;"; // uuid aus den cookies entfernen
}

// --- GET MESSAGES
async function loadMessages() {
  const response = await fetch(backendUrl);
  const json = await response.json();
  const messages = await json.messages;

  const list = document.getElementById("messages-list");
  list.innerHTML = "";

  messages.forEach((message) => {
    const listItem = document.createElement("p");
    listItem.textContent = `${message.sender}: ${message.message}`;
    list.appendChild(listItem);
  });
}

// --- random kleine funktion
function scrollToBottom() {
  const list = document.getElementById("messages-list");
  list.scrollTop = list.scrollHeight;
}
