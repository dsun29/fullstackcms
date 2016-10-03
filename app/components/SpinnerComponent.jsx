import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies


const SpinnerComponent = ({showSpinner}) =>(

        
        showSpinner ? (<div className="spinner-modal">
              <div className='spin-circle-wrapper'>
                <div className="circle1 circle" />
                <div className="circle2 circle" />
                <div className="circle3 circle" />
                <div className="circle4 circle" />
                <div className="circle5 circle" />
                <div className="circle6 circle" />
                <div className="circle7 circle" />
                <div className="circle8 circle" />
                <div className="circle9 circle" />
                <div className="circle10 circle" />
                <div className="circle11 circle" />
                <div className="circle12 circle" />
             </div>
        </div>) : null 
        
    )
       
    

export default SpinnerComponent;