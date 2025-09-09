// import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesContext';
import twemoji from 'twemoji';

const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleDetele(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
      >
        {/* <Twemoji>
          {' '}
          <span className={styles.emoji}>{emoji}</span>{' '}
        </Twemoji>{' '} */}
        <span
          dangerouslySetInnerHTML={{
            __html: twemoji.parse(emoji, { className: styles.emoji }),
          }}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDetele}>
          &times;
        </button>
      </Link>
    </li>
  );
}
