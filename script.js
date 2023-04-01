const leaderboardData = [
  // Example data
  { rank: 1, team: 'Sample Model', submission: '1/5', score: 'TODO', date: '2023-03-21' },
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
