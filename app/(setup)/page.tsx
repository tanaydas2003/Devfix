import { db } from "@/lib/db";
import { initialProfile } from "@/lib/intial-profile";
import { IntialModal } from "@/components/modals/initial-modal";
import { redirect } from "next/navigation";

const SetUpPage = async() =>{
    const profile = await initialProfile();
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    if(server){
        return redirect(`/servers/${server.id}`);
    }
    return <IntialModal />;
}
export default SetUpPage;