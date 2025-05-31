import { useTranslation } from 'react-i18next';
import './header.scss';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const switchLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'uk' : 'en';

    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="header">
      <button className="header__button header__button--back"></button>
      <div className="header__text-wrapper">
        <h1 className="header__title">{t('checkout')}</h1>
        <div className="header__description">
          <p className="header__text header__text--large">{t('freeTrial')}</p>
          <p className="header__text header__text--small">{t('priceNote')}</p>
        </div>
      </div>
      <button className="header__button" onClick={switchLanguage}>
        {i18n.language === 'en' ? 'Укр' : 'Eng'}
      </button>
    </header>
  );
};
