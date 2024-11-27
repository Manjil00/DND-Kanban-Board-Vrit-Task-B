import { useState } from 'react';
import { ID, Section } from '../types';
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


function deleteSection(id: ID){
    const filterSection = section.filter(sec =>sec.id !== id);
    setSection(filterSection);
}

return (
    <div className=' w-auto h-[100vh] p-5'>
    <h1 className='text-4xl font-serif text-center'>Kanban Board</h1>

<div className="Section flex justify-evenly items-center gap-3">

<div className='flex justify-evenly items-center gap-4 p-3'>
    {section.map(sec => <div><SectionContainer key={sec.id} section={sec} deleteSection={deleteSection}/></div>)}
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
