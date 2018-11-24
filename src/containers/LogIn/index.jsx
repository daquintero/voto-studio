import React from 'react';
import LogInForm from './components/LogInForm';

const LogIn = () => (
  <div className="account">
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">Welcome to
            <span className="account__logo"> Voto
              <span className="account__logo-accent">Studio</span>
            </span>
          </h3>
          <h4 className="account__subhead subhead">Control content seamlessly</h4>
        </div>
        <LogInForm />
      </div>
    </div>
  </div>
);

export default LogIn;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
