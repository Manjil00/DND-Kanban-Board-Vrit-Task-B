import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ID, Section } from '../types';
import Plus from './icons/plus';
import SectionContainer from './SectionContainer';

function Kanban_board(){

    const [section, setSection]= useState<Section[]>([]);
    const sectionId= useMemo(() => section.map((sec)=>sec.id),[section]);

    //activesection
    const [activeColumn,setActiveColumn]= useState<Section | null>(null);

    const sensors= useSensors(useSensor(PointerSensor,{activationConstraint:{
        distance:5,
    },
    }))

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

//DraggStart
function OnDragStart(event: DragStartEvent){
    console.log("dragstart",event);
    if(event.active.data.current?.type ==="Section"){
        setActiveColumn(event.active.data.current.section);
        return;
    }
}

//end
function OnDragEnd(event:DragEndEvent){
    const {active,over}=event;
    if(!over)
        return;

    const activeSectionId=active.id;
    const overSectionId=over.id;

    if (activeSectionId===overSectionId)
        return;

    setSection((section)=>{
        const activeSectionIndex =section.findIndex(
            (sec) => sec.id===activeSectionId
        );

        const overSectionIndex =section.findIndex(
        (sec) => sec.id===overSectionId
        );

        return arrayMove(section,activeSectionIndex,overSectionIndex);
    })
}

return (
    <DndContext sensors={sensors} onDragStart={OnDragStart} onDragEnd={OnDragEnd}>
            <div className=' w-auto h-[100vh] p-5'>
    <h1 className='text-4xl font-serif text-center'>Kanban Board</h1>

<div className="Section flex justify-evenly items-center gap-3">

<div className='flex justify-evenly items-center gap-4 p-3'>
    <SortableContext items={sectionId}>
    {section.map(sec => <div><SectionContainer key={sec.id} section={sec} deleteSection={deleteSection}/></div>)}
    </SortableContext>
    
</div>



<div className="btn flex justify-evenly items-center bg-red-600 p-2 rounded-xl">
    <Plus/>
    <button onClick={()=>addSection()}
    className=''> Add Section</button>
    </div>
</div>

    </div>

{createPortal(<DragOverlay>
        {activeColumn && <SectionContainer section={activeColumn} deleteSection={deleteSection}/>}
    </DragOverlay>,document.body
)};

</DndContext>
)
}

export default Kanban_board
