import { useTranslation, Trans } from 'react-i18next';
import './order.scss';

export const Order = () => {
  const { t } = useTranslation();

  return (
    <div className="order">
      <p className="order__title">{t('orderInfo')}</p>

      <div className="order__description">
        <p className="order__description-text order__description-text--note">
          {t('descriptionNote')}
        </p>
        <div className="order__description-wrapper">
          <p className="order__description-text order__description-text--product-name">
            {t('productName')}
          </p>
          <p className="order__description-text order__description-text--category">
            {t('productCategory')}
          </p>
        </div>
      </div>

      <p className="order__price">
        <Trans
          i18nKey="pricePerMonth"
          components={{ 1: <span className="order__price-unit" /> }}
        />
      </p>
    </div>
  );
};
