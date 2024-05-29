import { useQuery } from '@tanstack/react-query';
import { useGroupServiceGetApiGroupGetGroupDetailsKey } from '../../../openapi/queries/common';
import { GroupService } from '../../../openapi/requests/services.gen';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useGroupServicePostApiGroupJoinGroup } from '../../../openapi/queries/queries';
import { JoinGroupDTO } from 'openapi/requests/types.gen';

const JoinPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('groupId');
    const token = searchParams.get('token');

    const {data, status} = useQuery({
        queryKey: [useGroupServiceGetApiGroupGetGroupDetailsKey],
        queryFn: () => {
            return GroupService.getApiGroupGetGroupDetails({groupId: id ? id : undefined});
        },
        retry(failureCount) {
            if (failureCount > 0) {
                toast("The invite link is expired!");
                return false;
            }
            return true;
        },
        retryDelay: 0
    });

    const { mutate, isPending } = useGroupServicePostApiGroupJoinGroup({
        onError: () => {
            toast("The invite link is expired!");
        },
        onSuccess: () => {
            
        }
      });

    const joinSubmit = () => {
        const groupId = id !== null ? id : undefined;
        const joinData: JoinGroupDTO = {
            groupId,
            token
        };
        const dataToSend = {
            requestBody: joinData
        };
        mutate(dataToSend);
    }

    return (
        <div className="w-full h-full bg flex justify-center items-center bg-auth">
            <div className="h-fit backdrop-blur-3xl auth-form-bg rounded-2xl box-border px-10 py-12 flex justify-center
                    items-center flex-col gap-5 w-96 shadow-xl shadow-neutral-900">
            {
                status === "error" ?
                <div className='text-lg'>The invite link is expired!</div> :
                status === "success" ?
                <>
                    <p>YOU'VE BEEN INVITED TO A SERVER</p>
                    <div style={{backgroundColor: "" + data?.response?.group?.color}} className='w-20 h-20
                        rounded-full flex justify-center items-center'>
                        <p className='text-3xl'>{data?.response?.group?.shortName}</p>
                    </div>
                    <p className='text-2xl truncate w-[80%] text-center'>{data?.response?.group?.name}</p>
                    <p className=' text-[#9e61d0] text-xl'>{data?.response?.group?.numberMembers} {data?.response?.group?.numberMembers === 1 ? " member" : " members"}</p>
                    {
                        data.response?.isMember === true ?
                        <p>Already in group!</p> :
                        <Button onClick={joinSubmit} className="font w-[80%]">
                            {isPending ? <Loader2 className="animate-spin"></Loader2> :
                            "Join"}
                        </Button>
                    }
                </>:
                <Loader2 className='animate-spin'></Loader2>
            }
            </div>
        </div>
    );
};

export default JoinPage;