import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainControl from './Components/MainControl';
import Store from './redux/Store.js';

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <MainControl />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
