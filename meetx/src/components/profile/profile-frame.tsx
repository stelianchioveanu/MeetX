import { useEffect, useState } from 'react';
import ProfileForm from './profile-form';
import { AvatarDialog } from './avatar-dialog';
import { useQuery } from '@tanstack/react-query';
import { useUserServiceGetApiUserGetMeKey } from '../../../openapi/queries/common';
import { UserService } from '../../../openapi/requests/services.gen';
import { toast } from 'react-toastify';

const ProfileFrame = () => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [imageChanged, setImageChanged] = useState<boolean>(false);
    const [imageRemoved, setImageRemoved] = useState<boolean>(false);

    const {data, status} = useQuery({
        queryKey: [useUserServiceGetApiUserGetMeKey],
        queryFn: () => {
            return UserService.getApiUserGetMe();
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("Get my data failed! Please try again later!");
                return false;
            }
            return true;
        },
        retryDelay: 0
    });

    useEffect(() => {
        if (status === "success") {
            data.response?.avatarPath !== null && data.response?.avatarPath !== "" ?
                setImage(`http://localhost:5000/${data.response?.id}/Avatar/${data.response?.avatarPath}`) :
                setImage(null);
            setEmail(data.response?.email === null || data.response?.email === undefined ? "" : data.response?.email);
            setName(data.response?.name === null || data.response?.name === undefined ? "" : data.response?.name);
        }

    }, [data, status])

    return (
    <div className='flex flex-wrap grow items-center justify-center gap-x-24'>
        <div className='max-w-72 w-[80%] aspect-square relative'>
            {image ?
            <img className='w-full h-full rounded-full bg-white' src={image ? image : undefined}></img> :
            <div className="w-full h-full rounded-full flex justify-center items-center" style={{backgroundColor: "" + data?.response?.color}}>
                <p className='text-9xl text-white'>{data?.response?.shortName}</p>
            </div>}
            <AvatarDialog setImage={setImage} setImageChanged={setImageChanged} setImageRemoved={setImageRemoved}/>
        </div>
        <ProfileForm name={name} email={email} image={image} imageChanged={imageChanged} imageRemoved={imageRemoved}/>
    </div> );
}
 
export default ProfileFrame;