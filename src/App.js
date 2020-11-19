import React from "react";
import { Cards, Chart, CountryPicker } from "./Components";
import Styles from "./App.module.css";
import { fetchData } from "./api";

class App extends React.Component {
  state = {
    data: {},
    selectedCountry: "",
  };
  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  handleSelectedCountry = async (country) => {
    const data = await fetchData(country);
    this.setState({ data, selectedCountry: country });
  };
  render() {
    const { data, selectedCountry } = this.state;
    return (
      <div className={Styles.container}>
        <Cards data={data} />
        <CountryPicker handleSelectedCountry={this.handleSelectedCountry} />
        <Chart country={selectedCountry} data={data} />
      </div>
    );
  }
}

export default App;
