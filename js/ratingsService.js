let selectedRatings = {};

async function loadPlayers() {
  const container = document.getElementById("players");

  const { data, error } = await supabaseClient
    .from("players")
    .select("*")
    .eq("active", true)
    .order("shirt_number", { ascending: true });

  if (error) {
    container.innerHTML = `<div class="error-card">Failed to load players.</div>`;
    return;
  }

  container.innerHTML = "";

  data.forEach(player => {
    const card = document.createElement("article");
    card.className = "player-card";

    card.innerHTML = `
      <div class="player-position">#${player.shirt_number || "-"} • ${player.position}</div>
      <div class="player-name">${player.name}</div>

      <div class="rating-buttons">
        ${createRatingButtons(player.id)}
      </div>
    `;

    container.appendChild(card);
  });

  addRatingListeners();
}

function createRatingButtons(playerId) {
  let buttons = "";

  for (let i = 1; i <= 10; i++) {
    buttons += `
      <button class="rating-button" data-player-id="${playerId}" data-rating="${i}">
        ${i}
      </button>
    `;
  }

  return buttons;
}

function addRatingListeners() {
  document.querySelectorAll(".rating-button").forEach(button => {
    button.addEventListener("click", () => {
      const playerId = button.dataset.playerId;
      const rating = button.dataset.rating;

      selectedRatings[playerId] = rating;

      document
        .querySelectorAll(`.rating-button[data-player-id="${playerId}"]`)
        .forEach(btn => btn.classList.remove("selected"));

      button.classList.add("selected");
    });
  });
}

loadPlayers();
