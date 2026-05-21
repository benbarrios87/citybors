async function loadMatches() {
  const container = document.getElementById("matches");

  const { data, error } = await supabaseClient
    .from("matches")
    .select("*")
    .order("kickoff_time", { ascending: true });

  if (error) {
    console.error("Supabase-feil:", error);

    container.innerHTML = `
      <div class="error-card">
        <h2>Noe skjedde</h2>
        <p>Klarte ikke å hente kampene fra Supabase.</p>
      </div>
    `;

    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = `
      <div class="empty-card">
        <h2>Ingen kamper ennå</h2>
        <p>Legg inn kamper i Supabase, så dukker de opp her.</p>
      </div>
    `;

    return;
  }

  container.innerHTML = "";

  data.forEach(match => {
    const card = document.createElement("article");
    card.className = "match-card";

    const kickoff = match.kickoff_time
      ? new Date(match.kickoff_time)
      : null;

    const formattedKickoff = kickoff
      ? kickoff.toLocaleString("no-NO", {
          weekday: "short",
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit"
        })
      : "Tidspunkt ikke satt";

    const statusClass = getStatusClass(match.status);
    const statusText = getStatusText(match.status);

    card.innerHTML = `
      <div class="match-top">
        <div class="competition">${match.competition || "Turnering ikke satt"}</div>
        <div class="status-badge ${statusClass}">${statusText}</div>
      </div>

      <div class="teams">
        ${match.home_team || "Hjemmelag"}<br>
        vs<br>
        ${match.away_team || "Bortelag"}
      </div>

      <div class="meta">
        Avspark: ${formattedKickoff}
      </div>

      <div class="actions">
        <button class="button">Tipp resultat</button>
        <button class="button secondary">Kampcenter</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function getStatusClass(status) {
  if (status === "open") return "status-open";
  if (status === "closed") return "status-closed";
  if (status === "finished") return "status-finished";
  return "status-closed";
}

function getStatusText(status) {
  if (status === "open") return "Open";
  if (status === "closed") return "Closed";
  if (status === "finished") return "Finished";
  return "Unknown";
}

loadMatches();
