import { useState } from "react";
import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { CalculatorService } from "../proto/calculator/v1/calculator_connect";

export default function Home() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState("");

  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
  });

  const client = createPromiseClient(CalculatorService, transport);

  const calculate = async () => {
    const res = await client.calculate({
      a: parseFloat(a),
      b: parseFloat(b),
      operator: operator,
    });
    setResult(`${res.result} (${res.message})`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <input value={a} onChange={(e) => setA(e.target.value)} placeholder="A" />
      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input value={b} onChange={(e) => setB(e.target.value)} placeholder="B" />
      <button onClick={calculate}>Calculate</button>
      <div style={{ marginTop: "10px" }}>Result: {result}</div>
    </div>
  );
}
