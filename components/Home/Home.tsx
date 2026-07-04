import css from './home.module.css';

const Home = () => {
  return (
    <div className={css.container}>
      <div className={css.content_container}>
        <div className={css.text_content}>
          <h1 className={css.header}>Campers of your dreams</h1>
          <h2 className={css.text}>
            You can find everything you want in our catalog
          </h2>
        </div>
        <button className={css.content_btn}>View Now</button>
      </div>
    </div>
  );
};

export default Home;
