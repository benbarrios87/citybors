async function loadPlayers() {

  const container = document.getElementById("players");

  const { data, error } = await supabaseClient
    .from("players")
    .select("*")
    .eq("active", true)
    .order("shirt_number", { ascending: true });

  if (error) {
    console.error(error);

    container.innerHTML = `
      <div class="error-card">
        Failed to load players.
      </div>
    `;

    return;
  }

  container.innerHTML = "";

  data.forEach(player => {

    const card = document.createElement("article");

    card.className = "player-card";

    card.innerHTML = `
      <div class="player-position">
        #${player.shirt_number || "-"} • ${player.position}
      </div>

      <div class="player-name">
        ${player.name}
      </div>

      <div class="rating-buttons">
        ${createRatingButtons()}
      </div>
    `;

    container.appendChild(card);

  });

}

function createRatingButtons() {

  let buttons = "";

  for (let i = 1; i <= 10; i++) {

    buttons += `
      <button class="rating-button">
        ${i}
      </button>
    `;

  }

  return buttons;

}

loadPlayers();
