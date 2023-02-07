import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import Navigation from '../components/Navigation';

import '../App.css';

function HeaderPage() {
    return(
        <header>
            <h1><Link to="/"><img className="logo" src={logo} alt="Workout!"/></Link></h1>
            <h3>Train today, Earn someday</h3>
            <p>Personal Fitness Recorder</p>
            <Navigation />
        </header>
    );
}

export default HeaderPage;