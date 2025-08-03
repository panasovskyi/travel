import { StringLiteral } from "typescript";
import "./Filters.css";
enum SORTFIELD {
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  DURATION_ASC = "duration_asc",
  DURATION_DESC = "duration_desc",
  NONE = "none",
}
type Departure = {
  id: string;
  city: string;
  airport: string;
};
type Destination = {
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
type Props = {
  query: string;
  setQuery: (value: string) => void;
  departure: string;
  setDeparture: (value: string) => void;
  destination: string;
  setDestination: (value: string) => void;
  sortField: SORTFIELD;
  setSortField: (value: SORTFIELD) => void;
  duration: number;
  setDuration: (value: number) => void;
  destinations: Destination[];
  departures: Departure[];
};

export const Filters: React.FC<Props> = ({
  query,
  setQuery,
  destinations,
  departures,
  departure,
  setDeparture,
  destination,
  setDestination,
  duration,
  setDuration,
  sortField,
  setSortField,
}) => {
  return (
    <div className="Filters">
      <input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="destination__search"
        type="text"
        placeholder="Введіть назву країни"
      />
      <select
        value={duration}
        onChange={(e) => {
          setDuration(+e.target.value);
        }}
        className="duration__filter"
        name=""
        id=""
      >
        <option value={10000}>Введіть кількість ночей</option>

        <option value={2}>До 3</option>
        <option value={4}>До 5</option>
        <option value={6}>До 7</option>
        <option value={7}>Від 7</option>
      </select>
      <select
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        className="departure__filter"
        name=""
        id=""
      >
        <option value="">Місто вильоту</option>
        {departures.map((d) => {
          return (
            <option key={d.id} value={d.id}>
              {d.city}
            </option>
          );
        })}
      </select>
      <select
        value={destination}
        onChange={(e) => {
          setDestination(e.target.value);
        }}
        className="destination__filter"
        name=""
        id=""
      >
        <option value="">Країна прибуття</option>
        {destinations.map((d) => {
          return (
            <option value={d.country} key={d.id}>
              {d.country}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          setSortField(
            sortField === SORTFIELD.PRICE_ASC
              ? SORTFIELD.PRICE_DESC
              : SORTFIELD.PRICE_ASC
          );
        }}
        className="sort__price"
      >
        Ціна
      </button>
      <button
        onClick={() =>
          setSortField(
            sortField === SORTFIELD.DURATION_ASC
              ? SORTFIELD.DURATION_DESC
              : SORTFIELD.DURATION_ASC
          )
        }
        className="sort__duration"
      >
        Тривалість
      </button>
    </div>
  );
};
