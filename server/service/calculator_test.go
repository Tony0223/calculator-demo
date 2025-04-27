package service

import (
	"context"
	calculatorv1 "calculator-demo/gen/go/calculator/v1"
	"testing"
)

func TestCalculatorServer_Calculate(t *testing.T) {
	s := &CalculatorServer{}

	tests := []struct {
		a, b     float64
		operator string
		want     float64
		message  string
	}{
		{1, 2, "+", 3, "OK"},
		{5, 3, "-", 2, "OK"},
		{4, 3, "*", 12, "OK"},
		{6, 2, "/", 3, "OK"},
		{3, 0, "/", 0, "Cannot divide by zero."},
		{1, 1, "x", 0, "Invalid operator."},
	}

	for _, tt := range tests {
		resp, err := s.Calculate(context.Background(), &calculatorv1.CalculateRequest{
			A:        tt.a,
			B:        tt.b,
			Operator: tt.operator,
		})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		if resp.Message != tt.message {
			t.Errorf("expected message %s, got %s", tt.message, resp.Message)
		}
		if resp.Message == "OK" && resp.Result != tt.want {
			t.Errorf("for %v %s %v expected result %v, got %v", tt.a, tt.operator, tt.b, tt.want, resp.Result)
		}
	}
}
