import { useTranslation, Trans } from 'react-i18next';
import './payment.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import PopUp from '../popUp/popUp';

export const Payment = () => {
  const { t } = useTranslation();

  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [isApplePay, setIsApplePay] = useState(false);

  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [expirationDateError, setExpirationDateError] = useState<string | null>(
    null,
  );

  const [cvcError, setCvcError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    setExpirationDate(input);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvc(input);
  };

  const isExpirationValid = (exp: string) => {
    const parts = exp.split('/');
    if (parts.length !== 2) return false;

    const [monthStr, yearStr] = parts;
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (
      isNaN(month) ||
      isNaN(year) ||
      month < 1 ||
      month > 12 ||
      yearStr.length !== 2
    ) {
      return false;
    }

    const fullYear = 2000 + year;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    return !(
      fullYear < currentYear ||
      (fullYear === currentYear && month < currentMonth)
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsApplePay(false);

    setCardNumberError(null);
    setExpirationDateError(null);
    setCvcError(null);

    let hasError = false;

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setCardNumberError(t('invalidCardNumber', { min: 16 }));
      hasError = true;
    }

    if (!isExpirationValid(expirationDate)) {
      setExpirationDateError(t('invalidExpirationDate'));
      hasError = true;
    }

    if (cvc.length !== 3) {
      setCvcError(t('invalidCvc', { digits: 3 }));
      hasError = true;
    }

    setShowPopUp(true);
  };

  const handleApplePayClick = () => {
    setIsApplePay(true);
    setShowPopUp(true);
  };

  return (
    <div className="payment">
      <button
        className="payment__button payment__button-apple-pay"
        aria-label="Apple Pay"
        onClick={handleApplePayClick}
      ></button>

      <div className="payment__divider">
        <div className="payment__text payment__text--with-dividers">
          {t('payWithCard')}
        </div>
      </div>

      <form className="payment__form" onSubmit={onSubmit}>
        <label className="payment__form-label" htmlFor="card-number">
          {t('cardNumber')}
        </label>
        <input
          id="card-number"
          className={classNames('payment__input', 'payment__input--large', {
            'payment__input--error': !!cardNumberError,
          })}
          type="text"
          value={cardNumber}
          onChange={handleChange}
          placeholder="1234 1234 1234 1234"
          maxLength={19}
        />

        <div className="payment__form-wrapper">
          <div className="payment__form-column">
            <label className="payment__form-label" htmlFor="expiration-date">
              {t('expirationDate')}
            </label>
            <input
              id="expiration-date"
              className={classNames('payment__input', 'payment__input--small', {
                'payment__input--error': !!expirationDateError,
              })}
              type="text"
              value={expirationDate}
              onChange={handleExpirationChange}
              placeholder="MM/YY"
              maxLength={7}
            />
          </div>

          <div className="payment__form-column">
            <label className="payment__form-label" htmlFor="cvc">
              {t('cvc')}
            </label>
            <input
              id="cvc"
              className={classNames('payment__input', 'payment__input--small', {
                'payment__input--error': !!cvcError,
              })}
              type="password"
              placeholder="•••"
              onChange={handleCvcChange}
              value={cvc}
              maxLength={3}
            />
          </div>
        </div>

        <button
          className="payment__button payment__button-form-submit"
          type="submit"
        >
          {t('startTrial')}
        </button>

        <p className="payment__text payment__text-conditions">
          <Trans
            i18nKey="conditions"
            components={{ 1: <strong />, 3: <strong /> }}
          />
        </p>
      </form>

      {showPopUp && (
        <PopUp
          setShowPopup={val => {
            setShowPopUp(val);
            if (!val) setIsApplePay(false);
          }}
          message={
            isApplePay
              ? t('formSuccess')
              : cardNumberError ||
                expirationDateError ||
                cvcError ||
                t('formSuccess')
          }
          isError={
            isApplePay
              ? false
              : !!(cardNumberError || expirationDateError || cvcError)
          }
        />
      )}
    </div>
  );
};
