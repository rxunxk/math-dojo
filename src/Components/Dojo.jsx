import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const DojoContainer = styled.div`
  height: 100dvh;
  width: 100dvw;
  background-color: #f6ecf8;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Navbar = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background-color: #813795;
  color: white;
`;

const Arena = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const Score = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ScoreChip = styled.div`
  background-color: #eeddf3;
  color: black;
  padding: 1rem;
  min-width: 16px;
  margin-top: 1rem;
  border-radius: 8px;
`;

const Operand = styled.div`
  font-size: 4rem;
  color: #813795;
`;
const Operator = styled.div`
  font-size: 4rem;
  margin: 0 1rem;
  color: #813795;
`;

const Input = styled.input`
  outline: 0;
  background-color: #eeddf3;
  font-size: 2rem;
  padding: 1rem;
  text-align: center;
  border: none;
  border-radius: 8px;
  width: 50%;
  margin-top: 2rem;

  &::-webkit-inner-spin-button,
  .no-spin-buttons::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

let opsTimer;
let result;

setInterval(() => {
  console.log("-------");
}, 1000);

const Dojo = () => {
  const [ans, setAns] = useState("");
  const [ops, setOps] = useState({
    op1: 2,
    op2: 3,
    operator: 1,
  });
  const [change, setChange] = useState(true);
  const characters = ["+", "-", "x"];

  useEffect(() => {
    if (ops.operator === 1) {
      result = ops.op1 + ops.op2;
      console.log(result);
    } else if (ops.operator === 2) {
      result = ops.op1 - ops.op2;
      console.log(result);
    } else {
      result = ops.op1 * ops.op2;
      console.log(result);
    }

    opsTimer = setTimeout(
      () => {
        setOps({
          op1: Math.floor(Math.random() * (100 - 1 + 1) + 1),
          op2: Math.floor(Math.random() * (100 - 1 + 1) + 1),
          operator: Math.floor(Math.random() * (3 - 1 + 1) + 1),
        });
        setAns("");
        setChange(!change);
      },
      ops.operator === 3 ? 5000 : 3000
    );
  }, [change]);

  const inputHandler = (e) => {
    if (result === parseInt(e.target.value)) {
      console.log("correct answer!");
      clearTimeout(opsTimer);
      setOps({
        op1: Math.floor(Math.random() * (100 - 1 + 1) + 1),
        op2: Math.floor(Math.random() * (100 - 1 + 1) + 1),
        operator: Math.floor(Math.random() * (3 - 1 + 1) + 1),
      });
      setAns("");
      setChange(!change);
    } else {
      setAns(e.target.value);
    }
  };

  return (
    <DojoContainer>
      <Navbar>Math Dojo</Navbar>
      <Arena>
        <Score>
          <ScoreChip>Score1</ScoreChip>
          <ScoreChip>Score2</ScoreChip>
        </Score>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Operand>{ops.op1}</Operand>
          <Operator>{characters[ops.operator - 1]}</Operator>
          <Operand>{ops.op2}</Operand>
        </div>
        <Input type="number" value={ans} onChange={inputHandler} />
      </Arena>
    </DojoContainer>
  );
};

export default Dojo;
