import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { ID, Section, Task, } from "../types";
import DeleteIcon from "./icons/DeleteIcon";
import Plus from "./icons/Plus";
import TaskCard from "./TaskCard";


interface Props{
    section:Section;
    deleteSection:(id:ID) => void;
    updateSection:(id:ID, title:string) => void;
    createTask: (sectionId:ID)=> void;
    deleteTask: (id:ID)=>void;
    updateTask: (id:ID, content:string)=>void;
    tasks:Task[]

}

function SectionContainer(props:Props) {

const {section, deleteSection, updateSection, createTask, tasks,deleteTask,  updateTask} =props;
const [edit,setEdit]=useState(false);

const tasksIds= useMemo(()=>{
    return tasks.map((task)=>task.id);
},[tasks]);

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
    className="bg-bgcolor h-[600px] w-[400px] text-black rounded-xl flex flex-col justify-between gap-5">
        <div className="top p-5 bg-slate-200 h-[50px] w-full mx-auto rounded-xl rounded-b-none flex justify-between  items-center">
            {/* TITLE WITH CHANGE IINPUT */}
            <div {...attributes} {...listeners} onClick={()=>{setEdit(true)}
        }>
            <h1 className=" text-xl"> {!edit && section.title}
                {edit && <input className="bg-black text-white w-full p-2"
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

        <div className="content flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto text-white">
        <SortableContext items={tasksIds}>
            {tasks.map((task)=>(
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>
            ))}
        </SortableContext>
        </div>

        <div className="footer w-full  h-[50px] rounded-xl rounded-t-none text-red-500 flex justify-center items-center">
            <button onClick={()=>{createTask(section.id)}}
            className=" flex justify-center items-center gap-4 font-serif bg-slate-200 p-2 rounded-xl"><Plus/>Create Task</button>
        </div>

    </div>
)
}
export default SectionContainer;
