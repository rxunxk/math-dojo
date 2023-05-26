import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "./Dojo.css";

//#region
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
//#endregion

//Global variable of timer so I dont have to worry about re initialization during re render
let opsTimer;
let scoreInterval;
//Same as the above. used to store the result of the math operation.
let result;

//Array of symbols to be used to assign the corresponding Signs of +, - & *
const characters = ["+", "-", "x"];

const Dojo = () => {
  const [ans, setAns] = useState("");
  const [ops, setOps] = useState({
    op1: 2,
    op2: 3,
    operator: 1,
  });
  //state to trigger useState upon correct answer
  const [change, setChange] = useState(true);
  const [scoreTimer, setScoreTimer] = useState(0);
  const [barWidth, setBarWidth] = useState(100);

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

    if (ops.operator === 1 || ops.operator === 2) {
      setScoreTimer(3);
      scoreInterval = setInterval(() => {
        if (barWidth < 99) {
          setBarWidth(barWidth - 33);
          setScoreTimer((timer) => timer - 1);
        }
      }, 1000);
    } else {
      setScoreTimer(5);
      scoreInterval = setInterval(() => {
        console.log("multiplication time");
        if (barWidth < 100) {
          setBarWidth(barWidth - 20);
          setScoreTimer((timer) => timer - 1);
        }
      }, 1000);
    }

    opsTimer = setTimeout(
      () => {
        clearInterval(scoreInterval);
        setBarWidth(0);
        setOps({
          op1: Math.floor(Math.random() * (100 - 1 + 1) + 1),
          op2: Math.floor(Math.random() * (100 - 1 + 1) + 1),
          operator: Math.floor(Math.random() * (3 - 1 + 1) + 1),
        });
        setAns("");
        setChange(!change);
      },
      ops.operator === 3 ? 5100 : 3100
    );

    return () => {
      clearInterval(scoreInterval);
    };
  }, [change]);

  const inputHandler = (e) => {
    if (result === parseInt(e.target.value)) {
      console.log("correct answer!");
      clearTimeout(opsTimer);
      clearInterval(scoreInterval);
      setBarWidth(0);
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
      {console.log("scoreTimer: " + scoreTimer)}
      <Navbar>Math Dojo</Navbar>
      <Arena>
        <Score>
          <ScoreChip>Score1</ScoreChip>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${barWidth}%` }}>
              {`${scoreTimer} s`}
            </div>
          </div>
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
