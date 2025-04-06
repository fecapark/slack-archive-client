import { getArchiveCounts } from '@/apis/counts'
import { ArchiveCountList } from '@/app/archives/components/ArchiveCountList'
import { InteractiveLogo } from '@/components/InteractiveLogo/InteractiveLogo'

const Archives = async () => {
  const { channels, messages, threads } = await getArchiveCounts()

  return (
    <div className="flex size-full -translate-y-[64px] items-center justify-center">
      <div className="invisible flex flex-col items-center gap-8 md:visible">
        <div className="h-[86px] w-[64px]">
          <InteractiveLogo />
        </div>
        <h1 className="text-xl font-bold">지금까지 이만큼 일했어요.</h1>
        <ArchiveCountList channels={channels} messages={messages} threads={threads} />
      </div>
    </div>
  )
}

export default Archives
