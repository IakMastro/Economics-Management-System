package routes

import (
	"github.com/gin-gonic/gin"
)

type User struct {
	ID       int64  `db:"id" json:"id"`
	Name     string `db:"name" json:"name"`
	Created  string `db:"created" json:"created"`
	isActive bool   `db:"isActive" json:"isActive"`
}

func GetUsers(c *gin.Context) {
	var users []User
	_, err := DbMap.Select(&users, "SELECT * FROM users")
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, users)
}

func GetUserById(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	err := DbMap.SelectOne(&user, "SELECT * FROM users WHERE id=$1", id)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, user)
}

func UpdateUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	_, err := DbMap.Update(&user)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, user)
}

func AddUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	err := DbMap.Insert(&user)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, user)
}
