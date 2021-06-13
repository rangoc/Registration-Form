import React, { useState } from 'react';
import FormWrapper from 'components/form/FormWrapper';
import RegistrationForm from './components/RegistrationForm';
import Lottie from 'react-lottie-player';
import useFormAndValidation from './hooks/useFormAndValidation';
// assets
import monkey from 'assets/monkeyLogo.png';
import wave from 'assets/wave.svg';
// lotties
import dice from 'assets/lotties/dice';
import money from 'assets/lotties/money';
//css
import './registration.scss';
const Registration = () => {
  const [formData, validationSchema] = useFormAndValidation();
  console.log(formData, validationSchema);

  // used when user succesfully registers
  const [isRegistrationComplete, setIsRegistrationComplete] = useState({
    completed: false,
    message: '',
  });
  const formatDataForAPI = (values) => {
    const result = Object.entries(values).map((keyValuePair) => {
      return {
        code: keyValuePair[0],
        valueStr: keyValuePair[1],
        dataType: typeof keyValuePair[1],
      };
    });
    const data = { fields: [...result] };
    return data;
  };

  //  Dummy registration api call with timeout of 1000ms
  const submitRegistration = (fields) => {
    return new Promise((fulfill, reject) => {
      // success
      try {
        setTimeout(() => {
          fulfill({ info: { success: true } });
        }, 1000);
      } catch (err) {
        // error
        setTimeout(() => {
          reject({ info: { success: false } });
        }, 1000);
      }
    });
  };
  // Form submit handler
  const onSubmit = async (values, { setSubmitting }) => {
    const data = formatDataForAPI(values); // data to be sent to backend in appropriate format
    setSubmitting(true);
    try {
      const {
        info: { success },
      } = await submitRegistration(data);
      if (success) {
        setIsRegistrationComplete({
          completed: true,
          message: 'Congratulations! Registration was successful!',
        });
      }
    } catch ({ info: { success } }) {
      setIsRegistrationComplete({
        completed: false,
        message: 'Error',
      });
    }
    setSubmitting(false);
  };
  return (
    <div className="registration">
      <div className="registrationHeader">
        <div className="waveWrapper">
          <img src={wave} className="wave" alt="wave" />
        </div>
        <div className="monkeyWrapper">
          <img src={monkey} alt="monkey" />
        </div>
      </div>
      <div className="contentWrapper">
        <div className="graphics">
          {isRegistrationComplete.completed ? (
            <Lottie
              loop
              animationData={money}
              play
              style={{ width: '90%', height: '90%', margin: 'auto' }}
            />
          ) : (
            <Lottie
              loop
              animationData={dice}
              play
              style={{ width: '90%', height: '90%', margin: 'auto' }}
            />
          )}
        </div>
        <div className="content">
          <h2 className="description">
            Get started with us today in 2 easy steps!
          </h2>
          <FormWrapper
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={formData}
            onSubmit={onSubmit}
          >
            <RegistrationForm isRegistrationComplete={isRegistrationComplete} />
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};

export default Registration;
