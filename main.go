package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Print("Hello bitch")

	router := http.NewServeMux()
	router.Handle("/", http.FileServer(http.Dir("./static")))

	http.ListenAndServe(":8000", router)
}
