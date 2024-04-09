const MessageItem = (props: {img: any, username: String, message: String, files: any}) => {
    const date = "10/25/2022 12:56 AM";
    return (
    <div className="w-full h-fit py-2 hover:bg-[#00000020] flex gap-3">
        <img className="w-10 h-10 rounded-full" src={props.img}/>
        <div className="flex w-full flex-col">
            <div className="flex items-center gap-2">
                <p className="text-white">{props.username}</p>
                <p className="text-gray-500 text-xs">{date}</p>
            </div>
            <p className="flex text-[14px]">{props.message}</p>
        </div>
    </div>);
}
 
export default MessageItem;