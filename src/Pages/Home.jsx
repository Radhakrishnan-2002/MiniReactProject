import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountryCard from "../Components/CountryCard";
import "./CountryDetails";
import getAllCountries from "../Services";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Home.css";

function Home() {
  const [allCountriesList, setCountriesList] = useState([]);
  const [filteredCountriesList, setFilteredCountriesList] = useState([]);
  const [region, setRegion] = React.useState("");
  const [countryName, setCountryName] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 30;

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value);
  };

  useEffect(() => {
    getAllCountries()
      .then((result) => {
        const countries = result.data;
        setCountriesList(countries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    if (region === "" && countryName === "") {
      setFilteredCountriesList(allCountriesList);
    } else {
      let filterCountries = allCountriesList;
      if (region.length) {
        filterCountries = filterCountries.filter(
          (country) => country.region === region
        );
      }
      if (countryName.length) {
        filterCountries = filterCountries.filter((country) =>
          country.name.toLowerCase().includes(countryName.toLowerCase())
        );
      }

      setFilteredCountriesList(filterCountries);
    }
  }, [region, allCountriesList, countryName]);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountriesList.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  return (
    <div className="Home">
      <div className="header">
        <h1>AGILAM</h1>
      </div>

      <div className="home-wrapper">
        <div className="filter-wrapper">
          <TextField
            id="outlined-basic"
            label="Filter by Name"
            variant="outlined"
            onChange={handleCountryNameChange}
            value={countryName}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Filter by Region
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={region}
              onChange={handleRegionChange}
              label="Filter by Region"
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"Africa"}>Africa</MenuItem>
              <MenuItem value={"Americas"}>Americas</MenuItem>
              <MenuItem value={"Asia"}>Asia</MenuItem>
              <MenuItem value={"Europe"}>Europe</MenuItem>
              <MenuItem value={"Oceania"}>Oceania</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="country-card-wrapper">
          {currentCountries.map((country) => (
            <Link
              to={`/countries/${country.alpha3Code}`}
              key={country.alpha3Code}
              style={{ textDecoration: "none" }}
            >
              <CountryCard
                name={country.name}
                capital={country.capital}
                population={country.population}
                flagUrl={country.flags.png}
              />
            </Link>
          ))}
        </div>
        <div className="pagination">
          <a
            href="#"
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
          >
            &laquo;
          </a>
          {Array.from({
            length: Math.ceil(filteredCountriesList.length / countriesPerPage),
          }).map((_, index) => (
            <a
              key={index}
              href="#"
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </a>
          ))}
          <a
            href="#"
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(
                  prevPage + 1,
                  Math.ceil(filteredCountriesList.length / countriesPerPage)
                )
              )
            }
          >
            &raquo;
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
