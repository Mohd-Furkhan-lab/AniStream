import sqlite3

db=sqlite3.connect("Anime.db")

with db as conn:
    cursor = conn.cursor()
    cursor.execute("DELETE FROM anime WHERE id == ?",(4,))
    conn.commit()