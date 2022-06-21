package lib

import "log"

func CheckErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}
