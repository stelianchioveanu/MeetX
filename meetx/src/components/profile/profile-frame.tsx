import { useEffect, useState } from 'react';
import ProfileForm from './profile-form';
import { AvatarDialog } from './avatar-dialog';
import { useQuery } from '@tanstack/react-query';
import { useUserServiceGetApiUserGetMeKey } from '../../../openapi/queries/common';
import { UserService } from '../../../openapi/requests/services.gen';
import { Skeleton } from '../ui/skeleton';
import { UsersTable } from './users-table';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { setAppRole, setUserId } from '@/application/state-slices';
import { useAppDispatch } from '@/application/store';
import { fetchQuery } from '@/App';
import { ContactTable } from './contact-table';

const ProfileFrame = () => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [imageChanged, setImageChanged] = useState<boolean>(false);
    const [imageRemoved, setImageRemoved] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const {data, status, isFetching, isLoading, dataUpdatedAt} = useQuery({
        queryKey: [useUserServiceGetApiUserGetMeKey],
        queryFn: () => {
            return fetchQuery(UserService.getApiUserGetMe(), dispatch);
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
            dispatch(setAppRole(data?.response?.role === "Admin" ? true : false));
            dispatch(setUserId(data.response?.id));
        }
    }, [data, status, dataUpdatedAt])

    return (
    <ScrollArea className='h-[100vh] w-[calc(100%-304px)]'>
    <ScrollBar className='flex'/>
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
        {
            data?.response?.role === "Admin" ?
            <div className='h-fit w-[90%]'>
                <UsersTable/>
            </div> : null
        }
        {
            data?.response?.role === "Admin" || data?.response?.role === "Staff" ?
            <div className='h-fit w-[90%]'>
                <ContactTable/>
            </div> : null
        }
    </ScrollArea> );
}
 
export default ProfileFrame;