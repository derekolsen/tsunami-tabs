const sqlite3 = require('sqlite3').verbose()
const crypto = require('crypto-js')

const handleLogin = (req, res) => {
  const db = new sqlite3.Database('db/tsunami.db')
  db.serialize(() => {
    db.get("SELECT email, passhash, salt FROM users WERE email= ?", req.body.email,
    (err, row) => {
      err
        // Log error and return 500
        ? (console.log(err), res.sendStatus(500))
        : row
          ? crypto.SHA256(row.salt + req.body.password).toString() == row.passhash
            ? res.send(JSON.stringify("Login success!")) // should hand back a session cookie
            : res.send(JSON.stringify("Login failed!")) // should hand back a failed login
          : res.send(JSON.stringify("Email not found"))
    })
  })
  db.close()
}

module.exports = { handleLogin }