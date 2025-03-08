import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { contactEndpoint } from "../apis"

const {SENDMESSAGEAPI}=contactEndpoint;
export async function sendContactReq (payLoad){
    const tId=toast.loading("Sending message...");
    const token=localStorage.getItem("token")&&JSON.parse(localStorage.getItem("token"));
    try {
        const response= await apiConnector(SENDMESSAGEAPI,"POST",payLoad,{
            Authorization:`bearer ${token}`
        });
        if(response.data.success){
            toast.success("message sent!")
        }
    } catch (error) {
        console.log("error in contact operation",error.message);
        toString.error("message not sent!");
    }
    toast.dismiss(tId);

}