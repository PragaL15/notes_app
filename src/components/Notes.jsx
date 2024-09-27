import React  from 'react';
import '../styles/NotesCom.css'
import { CustomTabPanel } from '../components/tabs';
import { BasicTabs } from '../components/tabs';
const Notes = ()=>{
  return (
    <div className='flex'>
    <CustomTabPanel/>
    <BasicTabs/>
    </div>
  );
};

export default Notes;
