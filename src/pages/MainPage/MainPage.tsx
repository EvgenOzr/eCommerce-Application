import React from 'react';
import Banner from '../../components/banner/Banner';
import './MainPage.scss';

const MainPage = () => {
    return (
        <div className='main-container'>
            <Banner textMain={'Discount 20% For New Member, '} textAdd={'ONLY FOR TODAY!!'}/>
        </div>
    );
};

export default MainPage;