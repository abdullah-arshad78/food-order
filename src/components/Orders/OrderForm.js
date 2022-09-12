import React, { useState, useEffect } from "react";
import classes from "./OrderForm.module.css";
import useFormInput from "../../hooks/useFormInput";

const fetchingDataFromServer = async (items) => {
  const fetchData = await fetch("/create-checkout-session", {
    method: "POST",
    body: JSON.stringify(items),
    headers: { "Content-Type": "application/json" },
  });

  const data = await fetchData.json();
  window.location = data.url;
};
const countriesList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const OrderForm = (props) => {
  const [countryValue, setCountryValue] = useState("Afghanistan");
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    value: name,
    valueIsValid: nameIsValid,
    valueHasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useFormInput((value) => value.trim() !== "");
  const {
    value: email,
    valueIsValid: emailIsValid,
    valueHasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useFormInput(validateEmail);
  const {
    value: address,
    valueIsValid: addressIsValid,
    valueHasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useFormInput((value) => value.trim() !== "");
  const {
    value: postcode,
    valueIsValid: postcodeIsValid,
    valueHasError: postcodeHasError,
    valueChangeHandler: postcodeChangeHandler,
    valueBlurHandler: postcodeBlurHandler,
    reset: postcodeReset,
  } = useFormInput((value) => value.trim() !== "");
  const {
    value: state,
    valueIsValid: stateIsValid,
    valueHasError: stateHasError,
    valueChangeHandler: stateChangeHandler,
    valueBlurHandler: stateBlurHandler,
    reset: stateReset,
  } = useFormInput((value) => value.trim() !== "");
  const formIsValid =
    nameIsValid &&
    emailIsValid &&
    postcodeIsValid &&
    stateIsValid &&
    addressIsValid;

  useEffect(() => {
    let newInterval;
    if (isSubmit) {
      newInterval = setTimeout(() => {
        setIsSubmit(false);
      }, 5000);
    }
    return () => {
      clearInterval(newInterval);
    };
  }, [isSubmit]);
  const countryChangeHandler = (e) => {
    setCountryValue(e.target.value);
  };
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    nameReset();
    emailReset();
    postcodeReset();
    addressReset();
    stateReset();
    setIsSubmit(true);
    const orderObj = {
      ordersList: props.orderList,
      user: { name, email, address, postcode, state, country: countryValue },
    };

    console.log(props.orderList);
    if (props.orderList.length > 0) {
      fetchingDataFromServer(props.orderList);
    }
  };
  return (
    <form className={classes["order-form"]} onSubmit={submitFormHandler}>
      <div
        className={`${classes["form-control"]} ${
          nameHasError ? classes["invalid"] : ""
        }`}
      >
        <label htmlFor="name">Fullname</label>
        <input
          id="name"
          type="text"
          placeholder="John Baker"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <p className={classes.error}>Please add a valid name</p>
        )}
      </div>
      <div
        className={`${classes["form-control"]} ${
          emailHasError ? classes["invalid"] : ""
        }`}
      >
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          id="email"
          type="email"
          placeholder="JohnBaker@example.com"
        />
        {emailHasError && (
          <p className={classes.error}>Please add a valid email</p>
        )}
      </div>
      <div
        className={`${classes["form-control"]} ${
          addressHasError ? classes["invalid"] : ""
        }`}
      >
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          placeholder="House 123, Street 345, Austin Road"
          value={address}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
        />
        {addressHasError && (
          <p className={classes.error}> Please add a valid address</p>
        )}
      </div>
      <div
        className={`${classes["form-control"]} ${classes["postcode"]} ${
          postcodeHasError ? classes["invalid"] : ""
        }`}
      >
        <label htmlFor="postcode">Postcode</label>
        <input
          id="postcode"
          type="text"
          placeholder="ABC WXYZ"
          value={postcode}
          onChange={postcodeChangeHandler}
          onBlur={postcodeBlurHandler}
        />
        {postcodeHasError && (
          <p className={classes.error}>Please add a valid postcode</p>
        )}
      </div>
      <div
        className={`${classes["form-control"]} ${classes["state"]} ${
          stateHasError ? classes["invalid"] : ""
        }`}
      >
        <label htmlFor="state">State/Province</label>
        <input
          id="state"
          type="text"
          placeholder="Texas"
          value={state}
          onChange={stateChangeHandler}
          onBlur={stateBlurHandler}
        />
        {stateHasError && (
          <p className={classes.error}> Please add a valid state/province</p>
        )}
      </div>
      <div className={`${classes["form-control"]} ${classes["country"]}`}>
        <label htmlFor="country">Country</label>
        <select value={countryValue} onChange={countryChangeHandler}>
          Country
          {countriesList.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <button disabled={!formIsValid}>Submit</button>
      {isSubmit && (
        <p className={classes.success}>
          Thank you for proving your information. We will be in touch shortly.
        </p>
      )}
    </form>
  );
};

export default OrderForm;
