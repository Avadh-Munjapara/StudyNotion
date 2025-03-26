import React from "react";
import Label from "../../comman/Label";
import useFilePreview from "../../../hooks/useFilePreview";
import { IoCloudUpload } from "react-icons/io5";
import ErrorMessage from "../../comman/ErrorMessage";
const ThumbnailUpload = ({ register, erros, watch }) => {
  const file = watch("thumbnail");
  const [filePreview, setFilePreview] = useFilePreview(file);
  return (
    <>
      {filePreview ? (
        <div className="flex items-end gap-3">
          <img className="h-60 w-fit" src={filePreview} alt="" />
          <label className="rounded-lg font-medium text-[#000814] cursor-pointer h-fit bg-[#FFD60A] py-3 px-6 items-center flex gap-2 border border-[#2C333F]" htmlFor="thumbnail">Select other thumnail</label>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <Label
            text={"Course Thumbnail"}
            required={true}
            forwhat={"thumbnail"}
          />
          <div className="flex flex-col border-dashed border-[#424854] border-[1.5px] rounded-lg items-center gap-2 py-8 bg-[#2C333F]">
            <label
              htmlFor="thumbnail"
              className="cursor-pointer p-3 bg-[#171717] rounded-full"
            >
              <IoCloudUpload className="text-[#FFD60A] w-6 h-6" />
            </label>
            <p className="text-[#999DAA] text-center">
              Drag and drop an image, or
              <span>
                <label
                  className="cursor-pointer font-semibold text-[#FFD60A]"
                  htmlFor="thumbnail"
                >
                  {" "}
                  Browse
                </label>
              </span>
              <br />
              Max 6MB each (12MB for videos)
            </p>
            <div className="flex text-[#6E727F] gap-12 font-semibold">
              <p>Aspect ratio 16:9</p>
              <p> Recommended size 1024x576</p>
            </div>
          </div>
        </div>
      )}

      <input
        className="hidden"
        id="thumbnail"
        {...register("thumbnail", {
          required: { value: true, message: "select a thumbnail" },
        })}
        type="file"
      />
      {
        erros.thumbnail && <ErrorMessage message={erros.thumbnail.message}/>
      }
    </>
  );
};

export default ThumbnailUpload;
