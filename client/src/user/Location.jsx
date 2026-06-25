import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const Location = () => {

  /* ================= STATES ================= */
  const [countriesList, setCountriesList] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  /* ================= FLAG FUNCTION ================= */
  const getFlag = (name) => {
    const code = countries.getAlpha2Code(name, "en");
    return code
      ? `https://flagcdn.com/w40/${code.toLowerCase()}.png`
      : "";
  };

  /* ================= FETCH COUNTRIES ================= */
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const { data } = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/positions"
    );

    const formatted = data.data.map((c) => ({
      value: c.name,
      label: c.name,
      flag: getFlag(c.name),
    }));

    setCountriesList(formatted);
  };

  /* ================= FETCH STATES ================= */
  const fetchStates = async (countryName) => {
    const { data } = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      { country: countryName }
    );

    const formatted = data.data.states.map((s) => ({
      value: s.name,
      label: s.name,
    }));

    setStates(formatted);
    setCities([]);
  };

  /* ================= FETCH CITIES ================= */
  const fetchCities = async (stateName) => {
    const { data } = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        country: country.value,
        state: stateName,
      }
    );

    const formatted = data.data.map((c) => ({
      value: c,
      label: c,
    }));

    setCities(formatted);
  };

  /* ================= CUSTOM OPTION WITH FLAG ================= */
  const CountryOption = (props) => (
    <div
      {...props.innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px",
        cursor: "pointer",
      }}
    >
      <img src={props.data.flag} width="22" />
      {props.data.label}
    </div>
  );
return (
  <div className="w-full px-4 py-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {/* COUNTRY */}
      <div className="w-full">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Country
        </label>

        <Select
          options={countriesList}
          value={country}
          placeholder="Select Country"
          components={{ Option: CountryOption }}
          onChange={(selected) => {
            setCountry(selected);
            setState(null);
            setCity(null);
            fetchStates(selected.value);
          }}
          className="w-full"
        />
      </div>

      {/* STATE */}
      <div className="w-full">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          State
        </label>

        <Select
          options={states}
          value={state}
          placeholder="Select State"
          onChange={(selected) => {
            setState(selected);
            setCity(null);
            fetchCities(selected.value);
          }}
          isDisabled={!country}
          className="w-full"
        />
      </div>

      {/* CITY */}
      <div className="w-full">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          City
        </label>

        <Select
          options={cities}
          value={city}
          placeholder="Select City"
          onChange={(selected) => setCity(selected)}
          isDisabled={!state}
          className="w-full"
        />
      </div>

    </div>

    {/* Selected Values */}
    {(country || state || city) && (
      <div className="mt-6 p-4 rounded-xl bg-gray-100 border">
        <h3 className="font-bold text-lg mb-2">
          Selected Location
        </h3>

        <div className="space-y-1 text-gray-700">
          {country && <p>🌍 Country: {country.label}</p>}
          {state && <p>🏛 State: {state.label}</p>}
          {city && <p>📍 City: {city.label}</p>}
        </div>
      </div>
    )}
  </div>
);
};

export default Location;