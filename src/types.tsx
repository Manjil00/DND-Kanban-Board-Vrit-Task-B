export type ID = string | number;

export type Section ={
    id:ID;
    title:String;
};


export type Task={
    id:ID;
    sectionId:ID;
    content:string;
};