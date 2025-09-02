const chatHistory = [
  {
    role: "system",
    content:
      "You are a kind, caring, and friendly AI wellness assistant. Start by greeting the user, then ask one question at a time to learn how they're feeling. Ask short, empathetic follow-up questions based on their response.",
  },
];

// Make functions global so HTML can access
window.openChatbot = function () {
  document.getElementById("chatbot-container").classList.remove("hidden");

  // Clear previous chat if needed
  const messagesContainer = document.getElementById("chat-messages");
  messagesContainer.innerHTML = "";

  // Show welcome message
  setTimeout(() => {
    appendMessage("bot", "Hi there! I'm your wellness assistant 💙. How are you feeling today?");
  }, 300);
};

window.closeChatbot = function () {
  document.getElementById("chatbot-container").classList.add("hidden");
};

window.sendMessage = async function () {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";
  chatHistory.push({ role: "user", content: message });

  const container = document.getElementById("chat-messages");
  const loadingDiv = document.createElement("div");
  loadingDiv.textContent = "🧠 ...";
  loadingDiv.style.margin = "6px 0";
  loadingDiv.style.textAlign = "left";
  container.appendChild(loadingDiv);
  container.scrollTop = container.scrollHeight;

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const data = await response.json();
    loadingDiv.remove();

    if (data.reply) {
      chatHistory.push({ role: "assistant", content: data.reply });
      appendMessage("bot", data.reply);
    } else {
      appendMessage("bot", "⚠️ Sorry, I didn't get that. Can you try again?");
    }
  } catch (error) {
    loadingDiv.remove();
    appendMessage("bot", "⚠️ Error: Unable to connect to assistant.");
    console.error("API error:", error);
  }
};

function appendMessage(sender, text) {
  const container = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.textContent = (sender === "bot" ? "🧠 " : "🧍 ") + text;
  div.style.margin = "6px 0";
  div.style.textAlign = sender === "bot" ? "left" : "right";
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

document.querySelectorAll('.category-item').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
