import { useSortable } from "@dnd-kit/sortable";
import { Section, ID } from "../types";
import DeleteIcon from "./icons/DeleteIcon";
import {CSS} from "@dnd-kit/utilities";
interface Props{
    section:Section;
    deleteSection:(id:ID) => void;
}

function SectionContainer(props:Props) {

const {section, deleteSection} =props;

    const {setNodeRef, attributes, listeners, transform, transition,isDragging}
    =useSortable({
        id:section.id,
        data:{
            type:"Section",
            section,
        },
    });

    const style={
        transition,
        transform:CSS.Transform.toString(transform),
    };

    if(isDragging){
        return<div ref={setNodeRef} style={style} className="bg-slate-500 h-[500px] w-[400px] text-black rounded-xl"></div>
    }

    return (
    <div ref={setNodeRef}
    style={style}
    className="bg-black h-[500px] w-[400px] text-black rounded-xl">
        <div className="top p-5 bg-slate-500 h-[50px] w-full mx-auto rounded-xl rounded-b-none flex justify-between  items-center">
            <div className="number bg-black rounded-full h-[20px] w-[20px] text-white text-center ">0</div>
            <h1 {...attributes} {...listeners}>{section.title}</h1>
            <button><DeleteIcon/></button>
        </div>

        <div className="content">
        </div>

        <div className="footer">
        </div>

    </div>
)
}
export default SectionContainer;
