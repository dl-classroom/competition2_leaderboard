const leaderboardData = [
  // Example data
  { rank: 1, team: 'Team A', submission: 4, score: 98, date: '2023-03-21' },
  { rank: 2, team: 'Team B', submission: 3, score: 95, date: '2023-03-22' },
  // Add more leaderboard data here
];

const tableBody = document.getElementById('table-body');

leaderboardData.forEach((entry) => {
  const row = document.createElement('tr');

  Object.keys(entry).forEach((key) => {
    const cell = document.createElement('td');
    cell.textContent = entry[key];
    row.appendChild(cell);
  });

  tableBody.appendChild(row);
});
