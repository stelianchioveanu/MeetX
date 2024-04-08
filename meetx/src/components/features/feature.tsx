export const FirstComponent = (props: {title: String,
    description: String, image: any}) => {
    return (
        <div className='flex flex-col gap-4 aspect-square w-[calc(400px/1.4)] sm:w-[calc(400px/1.2)] md:w-[calc(400px/1.1)]
        lg:w-[calc(400px/1.4)] xl:w-[calc(400px/1.1)] relative
        shadow-feature rounded-lg overflow-hidden'>
            <img alt="home-feature" src={props.image} className='w-full
            h-full absolute object-cover' loading="lazy"/>
            <div className='w-full h-full bg-feature z-10 absolute'></div>
            <p className='flex text-purple-700 h-fit w-full
            text-2xl sm:text-xl font-light box-border px-7 z-20 bg-title-feature mt-6'>
                {props.title}
            </p>
            <p className="text-gray-300 text-base font-light box-border
            p-7 pt-0 z-20 lg:text-xs xl:text-base">
                {props.description}
            </p>
        </div>
    )
}

export const SecondComponent = (props: {image: any, right: Boolean}) => {
    const isOnRight = props.right ? "rounded-r-lg" : "rounded-l-lg";
    const className = `hidden sm:flex md:w-[calc(300px/1.1)] sm:w-[calc(300px/1.2)]
    lg:w-[calc(300px/1.4)] xl:w-[calc(300px/1.1)]
    aspect-feature shadow-feature object-cover ${isOnRight}`;
    return (
        <img alt="home-feature" src={props.image}
        className={className} loading="lazy"/>
    )
}

const Feature = (props: {image: any, title: String,
    description: String, type: Boolean}) => {
    return (
    <div className="w-4/5 h-fit flex justify-center items-center">
        {props.type === true ? 
        <>
            <FirstComponent title={props.title}
            description={props.description} image={props.image}/>
            <SecondComponent image={props.image} right={true}/>
        </> :
        <>
            <SecondComponent image={props.image} right={false}/>
            <FirstComponent title={props.title}
            description={props.description} image={props.image}/>
        </>}
    </div> );
}
 
export default Feature;