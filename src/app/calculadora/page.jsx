"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Calculadora() {
  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);
  const [operacoes, setOperacoes] = useState([
    { id: 1, description: "Somar" },
    { id: 2, description: "Subtrair" }
  ]);
  const [operacao, setOperacao] = useState();
  useEffect(() => {
    axios.get("https://rpv.cddtecnologia.com.br/operations").then((res) => {
      setOperacoes(res.data.retorno);
    });
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-2xl gap-6">
        <h1 className="text-4xl font-bold">Calculadora RPV</h1>
        <Input
          type="number"
          placeholder="Primeiro número"
          value={numero1}
          onChange={(e) => setNumero1(e.target.value)}
          required
        />
        <Select value={operacao} onValueChange={setOperacao} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a operação" />
          </SelectTrigger>
          <SelectContent>
            {operacoes.map((op) => (
              <SelectItem key={op.id} value={String(op.id)}>
                {op.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Segundo número"
          value={numero2}
          onChange={(e) => setNumero2(e.target.value)}
          required
        />
        <Button className="cursor-pointer ">Realizar operação</Button>
      </div>
    </div>
  );
}
