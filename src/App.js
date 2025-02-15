import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './Hero';
import MapPage from './MapPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/map" element={<MapPage />} />
            </Routes>
        </Router>
    );
}

export default App;
