import React from "react";
import Label from "../../comman/Label";
import ErrorMessage from "../../comman/ErrorMessage";
import { RxCross2 } from "react-icons/rx";
const Tags = ({ tags, register, errors, setTags, watch, getValues }) => {
  const tagWatch = watch("tags");
  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      const value = getValues("tags");
      if (value && value.trim()) {
        const updValue=value.replace(' ','_');
        const updTags = [...tags, updValue];
        setTags(updTags);
        e.target.value = "";
      }
    }
  };
  const removeTag = (index) => {
    tags.splice(index,1);
    const updTags=[...tags];
    setTags(updTags);
  };
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Label text={"Tags"} forwhat={"tags"} required={true} />
          <input
            className="field2"
            {...register("tags", {
              required: { value: true, message: "Tags is required" },
            })}
            placeholder="Enter Tags"
            type="text"
            name="tags"
            id="tags"
            onKeyDown={keyDownHandler}
          />
        </div>
        {tags.length > 0 && (
          <ul className="flex  gap-3">
            {tags.map((item, index) => (
              <li
                key={index}
                className="bg-[#FFD60A] flex items-center  gap-1 p-1 text-black rounded-lg"
              >
                {item}
                <button
                  onClick={() => {
                    removeTag(index);
                  }}
                >
                  <RxCross2 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {errors.tags && <ErrorMessage message={errors.tags.message} />}
    </>
  );
};

export default Tags;
