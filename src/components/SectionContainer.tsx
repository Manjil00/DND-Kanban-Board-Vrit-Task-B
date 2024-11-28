import { useSortable } from "@dnd-kit/sortable";
import { Section, ID, Task, } from "../types";
import DeleteIcon from "./icons/DeleteIcon";
import {CSS} from "@dnd-kit/utilities";
import { useState } from "react";
import Plus from "./icons/Plus";

interface Props{
    section:Section;
    deleteSection:(id:ID) => void;
    updateSection:(id:ID, title:string) => void;
    createTask: (sectionId:ID)=> void;
    tasks:Task[]
}

function SectionContainer(props:Props) {

const {section, deleteSection, updateSection, createTask, tasks} =props;
const [edit,setEdit]=useState(false);


const {setNodeRef, attributes, listeners, transform, transition,isDragging}
    =useSortable({
        id:section.id,
        data:{
            type:"Section",
            section,
        },
        disabled: edit,
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
    className="bg-black h-[600px] w-[400px] text-black rounded-xl flex flex-col justify-between">
        <div className="top p-5 bg-slate-400 h-[50px] w-full mx-auto rounded-xl rounded-b-none flex justify-between  items-center">
            <div className="number bg-black rounded-full h-[20px] w-[20px] text-white text-center ">0</div>
            
            {/* TITLE WITH CHANGE IINPUT */}
            <div {...attributes} {...listeners} onClick={()=>{setEdit(true)}
        }>
            <h1> {!edit && section.title}
                {edit && <input className="bg-black text-white"
                value={section.title || ""}
            onChange={(e)=>updateSection(section.id,e.target.value)}
            autoFocus onBlur={()=>{setEdit(false);
            }}
            onKeyDown={(e)=>{
                if(e.key !== "Enter") return;
                setEdit(false);
            }}
            />}
            </h1>
            </div>
            
            <button onClick={()=>{deleteSection(section.id)}}
            ><DeleteIcon/></button>
        </div>

        <div className="content flex flex-grow text-white">
            {tasks.map((task)=>(
                <div key={task.id}>{task.content}</div>
            ))}
        </div>

        <div className="footer w-full  h-[50px] rounded-xl rounded-t-none bg-slate-400 hover:bg-black hover:text-red-500">
            <button onClick={()=>{createTask(section.id)}}
            className="flex justify-center items-center gap-3 mx-auto my-auto "><Plus/>Create Task</button>
        </div>

    </div>
)
}
export default SectionContainer;
