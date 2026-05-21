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

    card.innerHTML = `
      <h2>${match.home_team} vs ${match.away_team}</h2>
      <p>${match.competition}</p>
      <p>Status: ${match.status}</p>
    `;

    container.appendChild(card);

  });

}

loadMatches();
