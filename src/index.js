import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const YELLOW = "rgb(255,229,0)";
const LGREEN = "rgb(194,224,67)";
const DGREEN = "rgb(0,191,176)";
const LBLUE = "rgb(44,197,255)";
const DBLUE = "rgb(0,102,188)";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.colors = [YELLOW, LGREEN, DGREEN, LBLUE, DBLUE];
    this.state = {
      value: "",
      error: "",
      screenWidth: 600,
      levelDiff: 75,
      hover: null,
      active: null,
      edit: null,
      levels: [
        "Top Of Funnel! <br> Search! SEO! AMS Ads! Main Image! Title!",
        "Product Confidence! <br> InStock!? Content! Multiple Images!",
        "Social Proof! <br> Reviews! Questions/Answers!",
        "Checkout! <br> (Amazon Handles This!)"
      ]
    };
    this.setScreenWidth = this.setScreenWidth.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPanel = this.renderPanel.bind(this);
  }

  onDoubleClick(e, index) {
    e.preventDefault();
    const edit = this.state.edit === index ? null : index;
    this.setState({ edit });
  }

  onMouseLeave(index) {
    if (this.state.hover === index) {
      this.setState({
        hover: null
      });
    }
  }

  onMouseEnter(index) {
    this.setState({ hover: index });
  }

  onClick(index) {
    this.setState({
      active: this.state.active === index ? null : index
    });
  }

  handleRemove() {
    let levels = this.state.levels.slice(0, this.state.levels.length - 1);
    this.setState({ levels }, this.setScreenWidth);
  }

  handleChange(event) {
    this.setState({ value: event.target.value }, this.setScreenWidth);
  }

  handleSubmit(event) {
    event.preventDefault();
    let { value } = this.state;
    let newValue = value.trim();
    if (newValue === "") {
      this.setState({ error: "Cannot be empty" });
    } else {
      this.setState(
        {
          levels: this.state.levels.concat(newValue),
          error: "",
          value: ""
        },
        this.setScreenWidth
      );
    }
  }

  setScreenWidth() {
    // let screenWidth = document.documentElement.clientWidth
    // document.getElementById("mydiv").offsetWidth
    let screenWidth = 300;
    let min = 150;
    let levelDiff = (screenWidth - min) / this.state.levels.length;
    this.setState({
      screenWidth,
      levelDiff
    });
  }

  renderPanel(item, index) {
    // if hovers and hovers include index then color
    // if no hovers then color
    let active = this.state.hover === index || this.state.active === index;
    let showColors =
      active || (this.state.hover === null && this.state.active === null);
    let color = showColors
      ? this.colors[index % this.colors.length]
      : "#bababa";
    let num = this.state.levels.length - index;
    let width = this.state.levelDiff * num + 150;
    let boWidth = width / 6;
    let height = 75;
    let divStyle = {
      borderRight: boWidth + "px solid transparent",
      borderTop: `${height}px solid ${color}`,
      borderLeft: boWidth + "px solid transparent",
      width: width + "px",
      margin: "0 auto",
      height: "0",
      marginBottom: "15px",
      position: "relative"
    };
    let spanStyle = {
      position: "absolute",
      top: "0%",
      left: "50%",
      width: width + "px",
      transform: `translate(-50%, -${height - 30}px)`,
      fontWeight: "bold",
      color: "#FFFFFF",
      lineHeight: "16px",
      letterSpacing: "1.5px",
      textRendering: "optimizeLegibility"
    };
    let lessThanIndexActive = false;
    // if the index is 2 then 0, 1, 2 should all return true
    let content = active || lessThanIndexActive ? item : "";

    return (
      <div
        onMouseEnter={e => {
          this.onMouseEnter(index);
        }}
        onDoubleClick={e => this.onDoubleClick(e, index)}
        onMouseLeave={e => {
          this.onMouseLeave(index);
        }}
        onClick={e => {
          this.onClick(index);
        }}
        key={`${item}-${index}`}
        style={divStyle}
        className="pyramid-item"
      >
        {this.state.edit === index && <button>poop</button>}
        <span
          style={spanStyle}
          dangerouslySetInnerHTML={{ __html: content }}
          className="pyramid-content"
        />
      </div>
    );
  }

  render() {
    return (
      <div style={styles}>
        <div className="pyramid-wrap">
          <nav style={{ display: "block", textAlign: "Center" }}>
            <div className="nav-item">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="nav-item-control"
                  placeholder="Please enter the text content for next pyramid item ..."
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <input type="submit" value="Add new pyramid item" />
              </form>
            </div>
            <div className="nav-item">
              <button onClick={this.handleRemove}>
                Remove last pyramid item
              </button>
            </div>
            {this.state.error.length > 0 && (
              <div style={{ color: "red" }}>{this.state.error}</div>
            )}
            <div>Click to HighLight</div>
          </nav>
        </div>
        <div id="pyramid-panel">{this.state.levels.map(this.renderPanel)}</div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));