const sqlite3 = require('sqlite3').verbose()

const retrieveTab = (req, res) => {
  const db = new sqlite3.Database('db/tsunami.db')
  db.serialize(() => {
    db.get("SELECT title, artist, description, owner, hits, favorites, tab FROM tabs WHERE id= ?", req.params.id,
    (err, row) => {
        // Log error and return 500
        err
        ? (console.log(err), res.sendStatus(500))
        : row
          ? res.json(
             {
              title: row.title,
              artist: row.artist,
              description: row.description,
              owner: row.owner,
              hits: row.hits,
              favorites: row.favorites,
              tab: row.tab
            })
          : res.sendStatus(404)
    })
  })
  db.close()
}

module.exports = { retrieveTab }