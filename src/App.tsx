import React, { useState } from "react";
import "./App.css";
import { Directions } from "./components/Directions";
import countries from "./countries.json";
import departures from "./departures.json";
import { Filters } from "./components/Filters";

type Departure = {
  id: string;
  city: string;
  airport: string;
};
type Country = {
  id: string;
  country: string;
  title: string;
  duration: number;
  price: number;
  image: string;
  difficulty: string;
  description: string;
  departureId: string;
  departureCity?: string[];
};

type Params = {
  query: string;
  departure: string;
  destination: string;
  duration: number;
  sortField: string;
};

enum SORTFIELD {
  PRICE_ASC = 'price_asc', 
  PRICE_DESC = 'price_desc',
  DURATION_ASC = 'duration_asc', 
  DURATION_DESC = 'duration_desc',
  NONE = 'none'
}

function getDepartureCityName(departureId: string): string[] {
  const found = departures.find((dep) => dep.id === departureId);
  return found ? [found.city] : [];
}

const countriesWithCities = countries.map((country) => ({
  ...country,
  departureCity: getDepartureCityName(country.departureId),
}));

function getPreparedCountries(
  array: Country[],
  { query, departure, destination, duration, sortField }: Params
): Country[] {
  let preparedCountries = [...array];

  if (query) {
    preparedCountries = preparedCountries.filter((c) =>
      c.country.toLowerCase().includes(query.trim().toLowerCase())
    );
  }

  if (departure) {
    preparedCountries = preparedCountries.filter(
      (c) => c.departureId === departure
    );
  }

  if (destination) {
    preparedCountries = preparedCountries.filter(
      (c) => c.country === destination
    );
  }

  if (duration !== 10000) {
    if (duration === 7) {
      preparedCountries = preparedCountries.filter(
        (c) => c.duration >= duration
      );
    } else {
      preparedCountries = preparedCountries.filter(
        (c) => c.duration <= duration
      );
    }
  }

  if (sortField === SORTFIELD.PRICE_ASC) {
    preparedCountries.sort((a, b) => a.price - b.price);
  } 
  if (sortField === SORTFIELD.DURATION_ASC) {
    preparedCountries.sort((a, b) => a.duration - b.duration);
  } 
  if (sortField === SORTFIELD.PRICE_DESC) {
    preparedCountries.sort((a, b) => b.price - a.price);
  } 
  if (sortField === SORTFIELD.DURATION_DESC) {
    preparedCountries.sort((a, b) => b.duration - a.duration);
  } 

  return preparedCountries;
}

function App() {
  const [query, setQuery] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(10000);
  const [sortField, setSortField] = useState<SORTFIELD>(SORTFIELD.NONE);
  let visibleCountries = getPreparedCountries(countriesWithCities, {
    query,
    sortField,
    duration,
    departure,
    destination,
  });
  return (
    <div className="App">
      <header className="header">
        <img className="header__logo" src="" alt="" />
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">Тури</li>
            <li className="header__item">Про нас</li>
            <li className="header__item">Контакти</li>
            <li className="header__item">Мій кабінет</li>
          </ul>
        </nav>
      </header>
      <Filters
        query={query}
        setQuery={setQuery}
        destinations={visibleCountries}
        departures={departures}
        departure={departure}
        setDeparture={setDeparture}
        destination={destination}
        setDestination={setDestination}
        duration={duration}
        setDuration={setDuration}
        sortField={sortField}
        setSortField={setSortField}
      />
      <Directions destinations={visibleCountries} departures={departures} />
      <footer className="footer">
        Всі тури створено з любов’ю до мандрівок. Відкривайте світ разом із
        нами.
      </footer>
    </div>
  );
}

export default App;
