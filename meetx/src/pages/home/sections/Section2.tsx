import { MonitorSmartphone } from 'lucide-react';

function Section2() {
    return (
        <div className="flex justify-center items-center box-border flex-col gap-3 max-w-[1500px]">
            <MonitorSmartphone className="w-24 h-24 sm:w-32 sm:h-32" color="white"/>
            <p className="text-white text-lg sm:text-xl md:text-2xl text-center w-4/5">
                Stay Connected Anytime, Anywhere
            </p>
            <div className="w-3/4 sm:w-3/5 h-px bg-white"/>
            <p className="text-white w-3/4 sm:w-3/5 text-center text-[0.8rem] sm:text-sm md:text-base">
                At <span className="text-purple-700">MeetX</span>
                , we understand the importance of seamless communication. That's
                why we've designed our platform to be accessible not only on your
                desktop but also on your mobile device
            </p>
        </div>
    );
  }
  
export default Section2;