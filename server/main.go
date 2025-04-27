package main

import (
	"calculator-demo/gen/go/calculator/v1/calculatorv1connect"
	"calculator-demo/server/service"
	"net/http"

	"connectrpc.com/connect"
)

func main() {
	mux := http.NewServeMux()

	mux.Handle(calculatorv1connect.NewCalculatorServiceHandler(
		&service.CalculatorServer{},
	))

	http.ListenAndServe(":8080", mux)
}
