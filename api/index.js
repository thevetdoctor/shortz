const app = require('./server');
const port = process.env.PORT || 4000;
const db = require('./db/index');

db();

app.listen(port, () => console.log(`Server running @ port ${port}`));
