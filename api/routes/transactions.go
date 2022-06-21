package routes

import (
	"github.com/gin-gonic/gin"
)

type Transaction struct {
	ID         int64   `db:"id" json:"id"`
	UserID     int64   `db:"userId" json:"userId"`
	Cost       float64 `db:"cost" json:"cost"`
	Date       string  `db:"date" json:"date"`
	CategoryID int64   `db:"categoryId" json:"categoryId"`
}

func GetTransactions(c *gin.Context) {
	var transactions []Transaction
	_, err := DbMap.Select(&transactions, "SELECT * FROM transactions")
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, transactions)
}

func GetTransactionById(c *gin.Context) {
	id := c.Params.ByName("id")
	var transaction Transaction
	err := DbMap.SelectOne(&transaction, "SELECT * FROM transactions WHERE id=$1", id)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, transaction)
}

func UpdateTransaction(c *gin.Context) {
	var transaction Transaction
	c.BindJSON(&transaction)
	_, err := DbMap.Update(&transaction)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, transaction)
}

func AddTransaction(c *gin.Context) {
	var transaction Transaction
	c.BindJSON(&transaction)
	err := DbMap.Insert(&transaction)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, transaction)
}
