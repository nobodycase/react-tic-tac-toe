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
  // 当前 state 没有保存在单个的 Square 组件中，而是保存在了 Board 组件中。
  // 每当 Board 的 state 发生变化的时候，这些 Square 组件都会重新渲染一次。
  // 把所有 Square 的 state 保存在 Board 组件中可以让我们在将来判断出游戏的胜者。

  // 因为 Square 组件不再持有 state，因此每次它们被点击的时候，Square 组件就会从 Board 组件中接收值，并且通知 Board 组件。
  // 在 React 术语中，我们把目前的 Square 组件称做“受控组件”。在这种情况下，Board 组件完全控制了 Square 组件。

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true, // x 为先手棋
    };
  }

  handleClick(i) {
    // 这里 slice 什么用？ 用 .slice() 方法创建了 squares 数组的一个副本，而不是直接在现有的数组上进行修改
    const squares = this.state.squares.slice();

    // 当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O"; // 棋子落下
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext, // 棋子落下，下一步是否轮到x就改变
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    ); // Square 的 this.props = {value: i}
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "x" : "o");
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
