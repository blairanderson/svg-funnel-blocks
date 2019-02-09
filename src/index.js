import React from "react";
import { render } from "react-dom";
import COLORS from "./COLORS";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: "",
      screenWidth: 600,
      levelDiff: 75,
      hover: null,
      active: null,
      edit: null,
      levels: [
        {
          header: "Top of Funnel!",
          desc: "Search! SEO! AMS Ads! Main Image! Title!"
        },
        {
          header: "Product Confidence!",
          desc: "InStock!? Content! Multiple Images!"
        },
        { header: "Social Proof!", desc: "Reviews! Questions/Answers!" },
        { header: "Checkout!", desc: "(Amazon Handles This!)" }
      ]
    };
    this.setScreenWidth = this.setScreenWidth.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPanel = this.renderPanel.bind(this);
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
    let color = showColors ? COLORS[index % COLORS.length] : "#bababa";
    let num = this.state.levels.length - index;
    let width = this.state.levelDiff * num + 150;
    let boWidth = width / 6;
    let height = 150;
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
        <div id="pyramid-panel">{this.state.levels.map(this.renderPanel)}</div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
