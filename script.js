const leaderboardData = [
  // Example data
  { team: 'Sample Model', submission: 1, score: 23.358, date: '2023-03-21' },
  { team: 'NLL', submission: 1, score: 20.671, date: '2023-04-15' },
  { team: 'heisenberg', submission: 1, score: 18.289, date: '2023-04-26'},
  { team: 'imageseg2023', submission: 1, score: 14.964, date: '2023-04-22'},
  { team: 'segmantics', submission: 1, score: 24.038, date: '2023-05-05'},
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
