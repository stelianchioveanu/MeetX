import MessageItem from "./message-item";
import stelicas from "../../pages/home/sections/img/stelian.jpeg"

const MessagesFrame = () => {
    const message1 = "salutare prieteni, sunteti cei mai tari, abia astept sa cream jnnsknnrjnsnrnn nsngkrn njnj kjn kjn n jknj kjn kjn k jkn bhkb hbh hbjhb vbgbjhg vhg  jknf uniurn uern ue nurei n" 
    const message = "salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme salutare prieteni, sunteti cei mai tari, abia astept sa cream o comunitate faina si fara probleme" 
    return ( 
        <div className="w-full h-fit overflow-auto
        no-scrollbar flex flex-col gap-3 mt-auto">
            <MessageItem img={stelicas} username={"stelicas"} message={message1} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={message} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
            <MessageItem img={stelicas} username={"stelicas"} message={"hello"} files={null}/>
        </div>
     );
}
 
export default MessagesFrame;