import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../Services";
import "./countryDetails.css";

function CountryDetails() {
  const { countryCode } = useParams();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCountryDetail(countryCode)
      .then((result) => {
        console.log("result.data", result.data);
        setDetail(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country detail:", error);
        setLoading(false);
      });
  }, [countryCode]);

  console.log("countryCode: ", countryCode);

  return (
    <>
      {loading ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="country-detail-wrapper">
          <div>
            <img src={detail.flags?.png} alt={detail.name} />
          </div>
          <div>
            <div>Country Name: {detail.name}</div>
            <div>Capital: {detail.capital}</div>
            <div>Population: {detail.population}</div>
            <div>
              Currencies:{" "}
              {detail.currencies?.map((currency) => currency.name).join(",")}
            </div>
            <div>Time Zone: {detail.timezones}</div>
            <div>Region: {detail.region}</div>
            <div>Sub Region:{detail.subregion}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default CountryDetails;
