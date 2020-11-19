import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import Styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleSelectedCountry }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    (async function () {
      setCountries(await fetchCountries());
    })();
  }, []);

  return (
    <div>
      <FormControl className={Styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(e) => {
            handleSelectedCountry(e.target.value);
          }}
        >
          <option value="">-Select Country-</option>
          {countries.map((country) => (
            <option value={country} key={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
