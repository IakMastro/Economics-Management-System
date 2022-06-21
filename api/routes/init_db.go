package routes

import (
	"api/lib"
	"database/sql"

	"gopkg.in/gorp.v1"
)

var DbMap = initDb()

func initDb() *gorp.DbMap {
	db, err := sql.Open("postgres", "postgres://postgres:1234@sql/economics?sslmode=disable")
	lib.CheckErr(err, "sql.Open failed")
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}
	dbmap.AddTableWithName(User{}, "Users").SetKeys(true, "id")
	dbmap.AddTableWithName(Transaction{}, "Transactions").SetKeys(true, "id")
	err = dbmap.CreateTablesIfNotExists()
	lib.CheckErr(err, "Create tables failed")
	return dbmap
}
