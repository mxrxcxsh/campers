'use client';

import { Formik, Form, Field } from 'formik';
import css from './Navigation.module.css';

interface FilterValues {
  location: string;
  camperForm: string;
  engine: string;
  transmission: string;
}

const initialValues: FilterValues = {
  location: 'Kyiv',
  camperForm: 'Panel Van',
  engine: 'Petrol',
  transmission: 'Automatic',
};

const camperForms = ['Alcove', 'Panel Van', 'Integrated', 'Semi Integrated'];
const engines = ['Diesel', 'Petrol', 'Hybrid', 'Electric'];
const transmissions = ['Automatic', 'Manual'];

export default function Navigation() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        console.log('Search filters:', values);
      }}
    >
      {({ resetForm }) => (
        <Form className={css.form}>
          <div className={css.info}>
            <div className={css.block}>
              <label className={css.label}>Location</label>
              <div className={css.locationField}>
                <svg className={css.input_icon}>
                  <use
                    width="20"
                    height="20"
                    href="/icons/icons.svg/#icon-map"
                  ></use>
                </svg>
                <Field
                  name="location"
                  type="text"
                  className={css.locationInput}
                />
              </div>
            </div>

            <div className={css.radio_block}>
              <h2 className={css.title}>Filters</h2>

              {/* Camper form */}
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Camper form</legend>
                {camperForms.map(option => (
                  <label key={option} className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="camperForm"
                      value={option}
                      className={css.radio}
                    />
                    {option}
                  </label>
                ))}
              </fieldset>

              {/* Engine */}
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Engine</legend>
                {engines.map(option => (
                  <label key={option} className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="engine"
                      value={option}
                      className={css.radio}
                    />
                    {option}
                  </label>
                ))}
              </fieldset>

              {/* Transmission */}
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Transmission</legend>
                {transmissions.map(option => (
                  <label key={option} className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="transmission"
                      value={option}
                      className={css.radio}
                    />
                    {option}
                  </label>
                ))}
              </fieldset>
            </div>
          </div>

          {/* Buttons */}
          <div className={css.btn_container}>
            <button type="submit" className={css.searchButton}>
              Search
            </button>

            <button
              type="button"
              onClick={() => resetForm()}
              className={css.clearButton}
            >
              <svg className={css.clear_icon}>
                <use
                  width="24"
                  height="24"
                  href="/icons/icons.svg/#icon-close"
                ></use>
              </svg>
              Clear filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
