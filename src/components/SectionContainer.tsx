import { Section, ID } from "../types";
import DeleteIcon from "./icons/DeleteIcon";

interface Props{
    section:Section;
    deleteSection:(id:ID) => void;
}

function SectionContainer(props:Props) {

const {section, deleteSection} =props;
    return (
    <div className="bg-black h-[500px] w-[400px] text-black rounded-xl">
        <div className="top p-5 bg-slate-500 h-[50px] w-full mx-auto rounded-xl rounded-b-none flex justify-between  items-center">
            <div className="number bg-black rounded-full h-[20px] w-[20px] text-white text-center ">0</div>
            <h1 className=" ">{section.title}</h1>
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
