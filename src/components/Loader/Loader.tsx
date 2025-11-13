// import { BeatLoader } from 'react-spinners';

import css from './Loader.module.css';

export default function Loader() {
  return (
    <>
      <p className={css.text}>Loading movies, please wait...</p>
      {/* <BeatLoader
        color="#0a2e98"
        margin={5}
        size={10}
        speedMultiplier={0.5}
      /> */}
    </>
  );
}
