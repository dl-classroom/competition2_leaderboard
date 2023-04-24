const leaderboardData = [
  // Example data
  { rank: 1, team: 'Sample Model', submission: 1, score: 23.358, date: '2023-03-21' },
  { rank: 2, team: 'NLL', submission: 1, score: 20.671, date: '2023-04-15' },
  { rank: 3, team: 'imageseg2023', submission: 1, score: 14.964, date: '2023-04-22'},
  // Add more leaderboard data here
];

const tableBody = document.getElementById('table-body');

// Group scores by team
const groupedData = leaderboardData.reduce((acc, entry) => {
  if (!acc[entry.team]) {
    acc[entry.team] = [];
  }
  acc[entry.team].push(entry);
  return acc;
}, {});

// Sort scores within each team by descending score
Object.values(groupedData).forEach((teamScores) =>
  teamScores.sort((a, b) => b.score - a.score)
);

// Create table rows
Object.entries(groupedData).forEach(([team, scores]) => {
  scores.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.classList.add(`team-${team.replace(/\s+/g, '-')}`);

    if (index > 0) {
      row.style.display = 'none';
    }

    Object.keys(entry).forEach((key) => {
      const cell = document.createElement('td');

      if (key === 'score') {
        cell.textContent = `${entry[key]}%`; // Append the percentage sign to the score
      } else {
        cell.textContent = entry[key];
      }

      if (key === 'team') {
        cell.classList.add('team-cell');
        cell.style.cursor = 'pointer';
      }

      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
});

// Toggle scores event listener
tableBody.addEventListener('click', (event) => {
  if (!event.target.classList.contains('team-cell')) {
    return;
  }

  const team = event.target.textContent;
  const teamRows = document.querySelectorAll(`.team-${team.replace(/\s+/g, '-')}`);

  teamRows.forEach((row, index) => {
    if (index > 0) {
      row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
    }
  });
});

