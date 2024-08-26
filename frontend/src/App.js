import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SponsorPayments from './pages/SponsorPayments';
import MatchSponsors from './pages/MatchSponsors';
import MatchPayments from './pages/MatchPayments';
import Layout from './pages/Layout';
import { AppProvider } from './context/AppContext';
import AddPayment from './pages/AddPayment';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/sponsors/payments-info' element={<SponsorPayments/>}/>
            <Route path='/sponsors/matches-info' element={<MatchSponsors/>}/>
            <Route path='/matches/payments-info' element={<MatchPayments/>}/>
            <Route path='/add-payment' element={<AddPayment/>}/>
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
