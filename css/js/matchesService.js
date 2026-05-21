
async function loadMatches() {

  const { data, error } = await supabaseClient
    .from("matches")
    .select("*")
    .order("kickoff_time", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("matches");

  data.forEach(match => {

    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${match.home_team} vs ${match.away_team}</h3>
      <p>${match.competition}</p>
    `;

    container.appendChild(card);

  });

}

loadMatches();
