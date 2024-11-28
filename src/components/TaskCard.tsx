import { useState } from "react";
import { ID, Task } from "../types";
import DeleteIcon from "./icons/DeleteIcon";

interface Props{
    task:Task;
    deleteTask: (id:ID)=> void;
    updateTask: (id:ID, content:string)=> void;
}

function TaskCard({task,deleteTask,updateTask}:Props) {

    const[editMode,setEditMode]=useState(false);
    
    const toggleEditMode=()=>{
        setEditMode((prev)=> !prev);
    };
    if (editMode){
        return (
            <div
            className='main bg-gray-200 h-[100px] min-h-[100px] flex justify-between items-center text-black text-left rounded-xl p-2 hover:border-4 hover:border-green-700'>
            <textarea
                value={task.content}
                placeholder="Edit Tasks"
                className="h-[50%] w-full"
                autoFocus
                onBlur={toggleEditMode}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter') toggleEditMode();
                }}
                onChange={(e)=>updateTask(task.id, e.target.value)}>
            </textarea>
            </div>
        )
    }

return (
    <div onClick={toggleEditMode}
    className='main bg-gray-200 h-[100px] min-h-[100px] flex justify-between items-center text-black text-left rounded-xl p-2 hover:border-4 hover:border-green-700'>
        <div className="tasks cursor-pointer">
        {task.content}
        </div>
        <button onClick={()=>{deleteTask(task.id)}}><DeleteIcon/></button>
    </div>
)
}

export default TaskCard;
