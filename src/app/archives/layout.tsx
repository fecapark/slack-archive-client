import { getChannels } from '@/apis/channels'
import { ArchivePannel } from '@/app/archives/components/ArchivePannel'
import { SidebarChannelItem } from '@/app/archives/components/SidebarChannelItem'

const ArchivesLayout = async ({ children }: React.PropsWithChildren<unknown>) => {
  const channels = await getChannels()

  return (
    <div className="relative grid h-full grid-cols-[1fr] grid-rows-[1fr] gap-2 overflow-hidden px-0 py-2 md:grid-cols-[320px_1fr] md:px-5">
      <ArchivePannel className="absolute z-[1] w-full md:static" title="채널">
        <div className="flex h-0 grow flex-col gap-1 overflow-y-auto">
          {channels.map((channel) => (
            <SidebarChannelItem channel={channel} key={channel.id} />
          ))}
        </div>
      </ArchivePannel>
      {children}
    </div>
  )
}

export default ArchivesLayout
