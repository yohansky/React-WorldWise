import twemoji from 'twemoji';
import styles from './CountryItem.module.css';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      {/* <span>{country.emoji}</span> */}
      <span
        dangerouslySetInnerHTML={{
          __html: twemoji.parse(country.emoji, { className: styles.emoji }),
        }}
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
