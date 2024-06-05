import { useEffect, useState } from 'react';
import ProfileForm from './profile-form';
import { AvatarDialog } from './avatar-dialog';
import { useQuery } from '@tanstack/react-query';
import { useUserServiceGetApiUserGetMeKey } from '../../../openapi/queries/common';
import { UserService } from '../../../openapi/requests/services.gen';
import { Skeleton } from '../ui/skeleton';
import { UsersTable } from './users-table';
import { ScrollArea } from '../ui/scroll-area';

const ProfileFrame = () => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [imageChanged, setImageChanged] = useState<boolean>(false);
    const [imageRemoved, setImageRemoved] = useState<boolean>(false);

    const {data, status, isFetching, isLoading} = useQuery({
        queryKey: [useUserServiceGetApiUserGetMeKey],
        queryFn: () => {
            return UserService.getApiUserGetMe();
        },
        retry: false
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
    <ScrollArea>
    <div className='flex flex-wrap grow items-center justify-center gap-x-24'>
        <div className='max-w-72 w-[80%] aspect-square relative'>
            {
                isFetching ? 
                <Skeleton className='w-full h-full rounded-full'/> :
                <>
                    {image ?
                    <img className='w-full h-full rounded-full bg-white' src={image ? image : undefined}></img> :
                    <div className="w-full h-full rounded-full flex justify-center items-center" style={{backgroundColor: "" + data?.response?.color}}>
                        <p className='text-9xl text-white'>{data?.response?.shortName}</p>
                    </div>}
                    <AvatarDialog setImage={setImage} setImageChanged={setImageChanged} setImageRemoved={setImageRemoved}/>
                </>
            }
        </div>
        <ProfileForm name={name} email={email} image={image} imageChanged={imageChanged} imageRemoved={imageRemoved}
        isFetching={isFetching} isLoading={isLoading}/>
        <div className='h-fit w-[90%]'>
            <UsersTable/>
        </div>
    </div>
    </ScrollArea> );
}
 
export default ProfileFrame;