import {React,use,useRef,useState} from "react";
import { HiMiniRectangleStack } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiAddLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import  useOnClickOutside  from "../../../hooks/useOnClickOutside";
import SubSectionForm from "./SubSectionForm";
const SubSection = ({ subSections,sectionIndex }) => {
    const dispatch=useDispatch();
    const [createSub,setCreateSub]=useState(false);
    const [editSub,setEditSub]=useState(false);
    const [deleteSub,setDeleteSub]=useState(false);
    const [viewSub,setViewSub]=useState(false);
    const modalRef = useRef(null);
    const removeModal=()=>{
        setCreateSub(false);
        setEditSub(false);
        setDeleteSub(false);
        setViewSub(false);
    }
    useOnClickOutside(modalRef,removeModal);
  return (
    <div>
      {subSections.length > 0 &&
        subSections.map((subSection) => (
          <div>
            <details
              key={subSection._id}
              className="flex items-center gap-3 py-2 pl-10"
            >
              <h3 onClick={()=>setViewSub(true)} className="text-richblack-50 font-semibold">
                {subSection.title}
              </h3>
              <summary className="flex  justify-between">
                <div className="flex items-center gap-3">
                  <HiMiniRectangleStack className="text-richblack-400" />
                  <h3 className="text-richblack-50 font-semibold">
                    {subSection.title}
                  </h3>
                </div>
                <div className="flex gap-1 text-richblack-400 text-xl">
                  <button>
                    <MdOutlineModeEdit onClick={()=>setEditSub(true)} />
                  </button>

                  <button onClick={()=>setDeleteSub(true)}>
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </summary>
            </details>
          </div>
        ))}
      <button onClick={()=>setCreateSub(true)} className="text-yellow-50 ml-1 font-medium flex gap-1 items-center">
        <RiAddLine className="h-6 w-6"/>
        Add Lecture
      </button>
      {
        createSub && <SubSectionForm sectionIndex={sectionIndex} removeForm={removeModal} ref={modalRef} create={true}/> ||
        editSub && <SubSectionForm sectionIndex={sectionIndex} removeForm={removeModal} ref={modalRef} edit={true}/>||
        deleteSub && <SubSectionForm sectionIndex={sectionIndex} removeForm={removeModal} ref={modalRef} dele={true}/>||
        viewSub && <SubSectionForm sectionIndex={sectionIndex} removeForm={removeModal} ref={modalRef} view={true}/>
      }
    </div>
  );
};

export default SubSection;
