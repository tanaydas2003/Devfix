import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: Promise<{
    serverId: string;
  }>;
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  const resolvedParams = await params; // Await params to resolve the Promise

  const server = await db.server.findUnique({
    where: {
      id: resolvedParams.serverId, // Use resolved params
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (!server || !initialChannel || initialChannel.name !== "general") {
    return redirect("/"); // Redirect to home if server or general channel is missing
  }

  return redirect(`/servers/${resolvedParams.serverId}/channels/${initialChannel.id}`);
};

export default ServerIdPage;