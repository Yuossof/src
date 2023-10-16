import React from 'react';

const MainContent = ({pageName,NameOfdes}) => {
    return (
        <>
           <h1 className='pageNm'>{pageName}    designed by {NameOfdes}</h1>

        </>
    );
}

export default MainContent;
