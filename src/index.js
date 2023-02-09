import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// 组件只包含一个 render 方法，并且不包含 state，使用函数组件会更简单
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      // 让 Board 组件从 Game 组件中接收 squares 和 onClick 这两个 props
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.squares(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    // 初始化 state
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    // 这里 slice 什么用？ 用 .slice() 方法创建了 squares 数组的一个副本，而不是直接在现有的数组上进行修改
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // 当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O"; // 棋子落下
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext, // 棋子落下，下一步是否轮到x就改变
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      // 使用最新一次历史记录来确定并展示游戏的状态
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

// 传入长度为 9 的数组，此函数将判断出获胜者，并根据情况返回 “X”，“O” 或 “null”。
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
