import './App.scss';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Order } from './components/order/order';
import { Payment } from './components/payment/payment';
import './i18n';

function App() {
  return (
    <div className="container">
      <Header></Header>
      <main className="main">
        <Payment></Payment>
        <Order></Order>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
