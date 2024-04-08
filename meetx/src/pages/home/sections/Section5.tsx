import test_img from "./img/text_img.png"

const Section5 = () => {
    return (
    <div className="w-full h-fit flex justify-center items-center py-20 box-border max-w-[1500px]">
        <img src={test_img} className="shadow-app w-11/12 sm:w-3/4" loading="lazy"/>
    </div> );
}
 
export default Section5;