import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class Square extends React.Component {
  // 构造函数，props 为接收的参数
  constructor(props) {
    super(props); // 定义子类的构造函数时，都需要调用 super 方法
    this.state = { value: null }; // 给 Square 类定义一个属性 state
  }

  render() {
    return (
      // this.setState 更新 state 的数据
      <button className="square" onClick={() => this.setState({ value: "x" })}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />; // Square 的 this.props = {value: i}
  }

  render() {
    const status = "Next player: X";

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
