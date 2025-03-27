import { getChannels } from '@/apis/channels'
import { SidebarChannelItem } from '@/app/archives/components/SidebarChannelItem'

const ArchivesLayout = async ({ children }: React.PropsWithChildren<unknown>) => {
  const channels = await getChannels()

  return (
    <div className="flex h-full gap-2 px-5 py-2">
      <div className="h-full w-[320px] rounded-2xl bg-white p-2">
        <div className="p-2 text-base font-bold">채널</div>
        <div className="flex flex-col gap-1">
          {channels.map((channel) => (
            <SidebarChannelItem channel={channel} key={channel.id} />
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}

export default ArchivesLayout
