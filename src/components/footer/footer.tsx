import './footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        {' '}
        Powered by{' '}
        <img src="./images/icons/footer-logo.svg" alt="footer-logo" />
      </p>
    </footer>
  );
};
