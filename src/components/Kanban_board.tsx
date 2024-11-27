import { useState } from 'react';
import { Section } from '../types';
import Plus from './icons/plus';
import SectionContainer from './SectionContainer';

const Kanban_board = () => {

    const [section, setSection]= useState<Section[]>([]);
    console.log(section);

function addSection(){
const AddSection: Section={
    id: generateId(),
    title:`Section  ${section.length +1}`,
};
setSection([...section, AddSection]);
};

function generateId(){
    return Math.floor(Math.random() * 100001);
};

return (
    <div className='bg-green-900 w-full h-[100vh] p-5'>
    <h1 className='text-4xl font-serif text-center'>Kanban Board</h1>

<div className="Section flex justify-evenly items-center gap-3">

<div className='flex justify-evenly items-center gap-4 p-3'>
    {section.map(sec => <div className='text-white bg-red-600'><SectionContainer section={sec}/></div>)}
</div>



<div className="btn flex justify-evenly items-center bg-red-600 p-2 rounded-xl">
    <Plus/>
    <button onClick={()=>addSection()}
    className=''> Add Section</button>
    </div>
</div>

    </div>
)
}

export default Kanban_board
