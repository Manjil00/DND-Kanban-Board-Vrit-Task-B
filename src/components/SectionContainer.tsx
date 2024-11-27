import { Section } from "../types";

interface Props{
    section:Section;
}

function SectionContainer(props:Props) {

const {section} =props;
    return (
    <div className="bg-black h-[300px] w-[300px] text-slate-500">
    </div>
)
}
export default SectionContainer;
