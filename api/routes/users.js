var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

/* GET users listing */
router.get('/', function(req, res, next) {
  res.send('derek');
  // This should select from sql table
});

/* GET user record details */

router.get('/:id', (req, res) => {
  parseInt(req.params.id) >= 0
    ? res.status(200).send(`Requested user ${req.params.id}`) // Return a selection from sql table, handle missing user
    : res.status(400).send(`Error: Not a valid user ID`)

  db.serialize(() => {
    db.run("CREATE TABLE users (username TEXT)")

    const stmt = db.prepare("INSERT INTO users VALUES (?)")
    for (let i = 0; i < 10; i++) {
      stmt.run("User " + i)
    }
    stmt.finalize()

    db.each("SELECT rowid AS id, username FROM users", (err, row) => {
      console.log(row.id + ": " + row.username)
    })
  })

  db.close()
});

/* PUT (edit user record) */



/* POST (store new user) */



/* DELETE user record */



module.exports = router;
