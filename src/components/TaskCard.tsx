import { useState } from "react";
import { ID, Task } from "../types";
import DeleteIcon from "./icons/DeleteIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props{
    task:Task;
    deleteTask: (id:ID)=> void;
    updateTask: (id:ID, content:string)=> void;
}

function TaskCard({task,deleteTask,updateTask}:Props) {

    const[editMode,setEditMode]=useState(false);
    
    const {setNodeRef, attributes, listeners, transform, transition,isDragging}
    =useSortable({
        id:task.id,
        data:{
            type:"Task",
            task,
        },
        disabled: editMode,
    });
        const style={
        transition,
        transform:CSS.Transform.toString(transform),
    };

    const toggleEditMode=()=>{
        setEditMode((prev)=> !prev);
    };

if(isDragging){
    return<div ref={setNodeRef} style={style}
    className=" bg-gray-200 h-[100px] min-h-[100px] flex justify-between items-center text-black text-left rounded-xl p-2 opacity-30"></div>
}


    if (editMode){
        return (
            <div ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className='main bg-gray-200 h-[100px]  min-h-[100px] flex justify-between items-center text-black text-left rounded-xl p-2 hover:border-4 hover:border-green-700'>
            <textarea
                value={task.content}
                placeholder="Edit Tasks"
                className="h-[95%] w-full"
                autoFocus
                onBlur={toggleEditMode}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter' && e.shiftKey) toggleEditMode();
                }}
                onChange={(e)=>updateTask(task.id, e.target.value)}>
            </textarea>
            </div>
        )
    }

return (
    <div ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    onClick={toggleEditMode}
    className='main bg-gray-200 h-[100px] min-h-[100px] flex justify-between items-center text-black text-left rounded-xl p-2 hover:border-4 hover:border-green-700'>
        <div className="tasks cursor-pointer">
        <p className="taskdesign my-auto h-[90%] w-full overfolw-y-auto overflow-x-auto whitespace-pre-wrap">
        {task.content} </p>
        </div>
        <button onClick={()=>{deleteTask(task.id)}}><DeleteIcon/></button>
    </div>
)
}

export default TaskCard;
