import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.overlay} role="status" aria-live="polite">
      <div className={css.card}>
        <span className={css.spinner} aria-hidden="true" />
        <p className={css.title}>Loading tracks...</p>
        <p className={css.text}>
          Please wait while we fetch the best
          <br />
          travel trucks for you
        </p>
      </div>
    </div>
  );
};

export default Loader;
