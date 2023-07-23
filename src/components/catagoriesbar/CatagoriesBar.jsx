import React, { useState } from 'react';
import './_catagoriesBar.scss';
import { getValue } from '@testing-library/user-event/dist/utils';

const keywords= [
  'All',
  'React js',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art',
  'Guitar',
  'Bangali songs',
  'Coding',
  'Cricket',
  'Football',
  'Real Madrid',
  'Gatesby',
  'Poor Coder',
  'Shwetabh',
]

function CatagoriesBar() {
  const [activeElement, setActiveElement] = useState('All');

  const hanldeClick = (value) => {
    setActiveElement(value);
  }

  return (
    <div className='catagoriesBar'>
      {
        keywords.map((value, i)=>{
          return (
            <span 

              onClick={() => hanldeClick(value)}

              key={i}
              
              className={activeElement === value ? 'active' : ''}

            >{value}</span> //you should use index as key if list is not being modified.
          );
        })
      }
    </div>
  )
}

export default CatagoriesBar
