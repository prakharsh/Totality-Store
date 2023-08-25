import Navbar from './components/Navbar'
import Checkout from './components/Checkout'
import {BrowserRouter,Routes,Route} from 'react-router-dom' ;
import Home from './components/Home'
import Cart from './components/Cart'
import {Provider} from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react';
import store from './store/store.js'
import OrderSummary from './components/OrderSummary';
function App() {
  return (
    <>
      <Auth0Provider
        domain="prakhar-world.us.auth0.com"
        clientId="6QE4194fjapfdUplyWwZJ5TlITYHHNPv"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}>
          <BrowserRouter>
          <Provider store={store}>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/checkout" element={<><OrderSummary/> <Checkout /></>} />
            </Routes>
            </Provider>
          </BrowserRouter>
      </Auth0Provider>
    </>
  );
}

export default App;
