import { MdDelete } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";


function Input({id , text , complete , completeHandler , deleteHandler}) {

    console.log(deleteHandler);

    return (
        <div className = "input flex m-3 flex-row justify-between flex-no-wrap p-6 border-none rounded-md bg-blue-950 hover:scale-105 transition-transform">
            <div className = "check">
                <IoMdCheckmarkCircle className={`text-3xl text-green-600 ${complete ? "text-green-600" : "text-white"}`} />
            </div>   
            <div className = "content text-white sm:ml-[-50%]">
                <p className="text-xl">{text}</p>
            </div>
            <div className = "cross" onClick={deleteHandler}>
                <MdDelete className="text-3xl text-red-800"/>
            </div>
        </div>
    )
}

export default Input;

//141b29