import Feature from "@/components/features/feature";
import img from "../sections/img/image8.jpg"

function Section3() {
    return (
        <div id="features" className="flex flex-col box-border
        pb-20 w-full h-fit relative max-w-[1500px]">
            <div className='flex flex-col justify-center items-center
            w-full h-fit p-10 box-border gap-3'>
                <div className='text-white text-3xl sm:text-4xl
                md:text-5xl xl:text-6xl font-semibold mb-5'>
                    Features
                </div>
                <div className='text-white text-lg sm:text-xl md:text-2xl text-center
                font-light'>
                    Empower Collaboration: Explore Our Features
                </div>
            </div>
            <div className='flex w-full justify-center items-center h-fit flex-wrap gap-y-10'>
                <div className='flex h-fit justify-center items-center
                flex-col gap-10'>
                    <Feature image={img} title={"Live Chat"}
                    description={"Instantly connect, communicate, and solve problems together in real-time."} type={true}/>
                    <Feature image={img} title={"File Sharing"}
                    description={"Seamlessly share documents, images, and other files within the chat interface."} type={false}/>
                </div>
                <div className='flex h-fit justify-center items-center
                flex-col gap-10'>
                    <Feature image={img} title={"Video Call"}
                    description={"Connect visually with your peers using our platform's integrated video calls."} type={true}/>
                    <Feature image={img} title={"Mobile Friendly"}
                    description={"Stay connected on the go with mobile-friendly chat interface."} type={false}/>
                </div>
            </div>
        </div>
    );
}

export default Section3;
