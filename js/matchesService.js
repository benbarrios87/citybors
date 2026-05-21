async function loadMatches() {

  const { data, error } = await supabaseClient
    .from("matches")
    .select("*")
    .order("kickoff_time", { ascending: true });

  if (error) {
    console.error("Supabase-feil:", error);
    return;
  }

  const container = document.getElementById("matches");

  data.forEach(match => {

    const card = document.createElement("div");

card.className = "match-card";

card.innerHTML = `
  <div class="match-title">${match.home_team} vs ${match.away_team}</div>
  <div class="match-meta">${match.competition}</div>
  <div class="badge">Status: ${match.status}</div>
`;

    container.appendChild(card);

  });

}

loadMatches();
