import './rank.styles.scss'
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context/user.context';

const Rank = () => {
    const { user } = useContext(UserContext);
    const { name, entries } = user;
    

    return(
        <div className=''>
            <div className='white f3'>
                {`${name}, your current entry count is...`}
            </div>            
            <div className='white f1'>
                {entries}
            </div>
        </div>
    );
};

export default Rank;