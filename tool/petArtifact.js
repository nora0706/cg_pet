const fs = require('fs');
const path = require('path');

const petsPath = path.join(__dirname, '..', 'public', 'pets');
const outputPath = path.join(__dirname, '..', 'public', 'pet_list.json');

fs.readdir(petsPath, (err, files) => {
  const names = files.map(file => file.substring(0, file.length-('.json'.length)));
  fs.writeFileSync(outputPath, JSON.stringify(names));
});
