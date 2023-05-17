import { Tilt } from 'react-tilt';
import './logo.styles.scss'
import Brain from '../../assets/brain.png'


const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }}>
                <div className="Tilt-inner pa3">
                    <img className="brain-logo" alt='brain-icon' src={Brain}/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;