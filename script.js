const leaderboardData = [
  { team: 'Sample Model', submission: 1, score: 22.650, oldScore: 23.358, date: '2023-03-21' },
  { team: 'NLL', submission: 1, score: 22.957, oldScore: 20.671, date: '2023-04-15' },
  { team: 'heisenberg', submission: 1, score: 19.514, oldScore: 18.289, date: '2023-04-26'},
  { team: 'imageseg2023', submission: 1, score: 19.416, oldScore: 14.964, date: '2023-04-22'},
  { team: 'segmantics', submission: 1, score: 22.854, oldScore: 24.038, date: '2023-05-05'},
  { team: 'segmantics', submission: 2, score: 24.170, oldScore: 0, date: '2023-05-16'},
];

const tableBody = document.getElementById('table-body');

// Sort leaderboardData by descending score
leaderboardData.sort((a, b) => b.score - a.score);

// Assign ranks based on the sorted leaderboardData
leaderboardData.forEach((entry, index) => {
  entry.rank = index + 1;
});

// Group scores by team
const groupedData = leaderboardData.reduce((acc, entry) => {
  if (!acc[entry.team]) {
    acc[entry.team] = [];
  }
  acc[entry.team].push(entry);
  return acc;
}, {});

// Create table rows
Object.entries(groupedData).forEach(([team, scores]) => {
  scores.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.classList.add(`team-${team.replace(/\s+/g, '-')}`);

    if (index > 0) {
      row.style.display = 'none';
    }

    // Create rank cell
    const rankCell = document.createElement('td');
    rankCell.textContent = entry.rank;
    row.appendChild(rankCell);

    // Create team cell
    const teamCell = document.createElement('td');
    teamCell.textContent = entry.team;
    teamCell.classList.add('team-cell');
    teamCell.style.cursor = 'pointer';
    row.appendChild(teamCell);

    // Create submission cell
    const submissionCell = document.createElement('td');
    submissionCell.textContent = entry.submission;
    row.appendChild(submissionCell);

    // Create Old Data Score cell
    const oldScoreCell = document.createElement('td');
    oldScoreCell.textContent = `${entry.oldScore}%`;
    row.appendChild(oldScoreCell);

    // Create score cell
    const scoreCell = document.createElement('td');
    scoreCell.textContent = `${entry.score}%`;
    row.appendChild(scoreCell);

    // Create date cell
    const dateCell = document.createElement('td');
    dateCell.textContent = entry.date;
    row.appendChild(dateCell);

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
