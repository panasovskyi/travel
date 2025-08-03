import './Directions.css';

type Departure = {
  id: string;
  city: string;
  airport: string;
}
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
  destinations: Destination[];
  departures: Departure[]
}

export const Directions: React.FC<Props> = ({ destinations, departures }) => {
  return (
    <div className="Directions">
      {destinations.map(d => {
        return (
          <div className="destination" key={d.id}>
            <p className="destination__country">{d.country}</p>
            <img src="" alt="" />
            <p className="destination__title">{d.title}</p>
            <p className="destination__description">{d.description}</p>
            <p className="destination__difficulty">Рівень складності: {d.difficulty}</p>
            <p className="destination__difficulty">Кількість ночей: {d.duration}</p>
            <p className="destination__price">${d.price} / особа</p>
          </div>
        )
      })}
    </div>
  )
}