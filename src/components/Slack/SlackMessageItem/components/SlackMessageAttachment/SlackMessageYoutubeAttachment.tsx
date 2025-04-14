'use client'

import { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'

import AutoHeightImage from '@/components/AutoHeightImage'
import { SlackMessageAttachmentLayout } from '@/components/Slack/SlackMessageItem/components/SlackMessageAttachment/SlackMessageAttachmentLayout'
import { MessageYoutubeAttachmentItem } from '@/types/schema'
import { useRefEffect } from '@toss/react'

interface SlackMessageYoutubeAttachmentProps {
  attachment: MessageYoutubeAttachmentItem
}

export const SlackMessageYoutubeAttachment = ({
  attachment,
}: SlackMessageYoutubeAttachmentProps) => {
  const [playing, setPlaying] = useState(false)

  const containerRef = useRefEffect<HTMLDivElement>(
    (container) => {
      const handleResize = () => {
        const aspectRatio = attachment.thumbWidth / attachment.thumbHeight
        const { width } = container.getBoundingClientRect()
        const height = Math.floor(width / aspectRatio)
        container.style.height = `${height}px`
      }

      window.addEventListener('resize', handleResize)
      handleResize()

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    [attachment.thumbWidth, attachment.thumbHeight]
  )

  return (
    <SlackMessageAttachmentLayout>
      <SlackMessageAttachmentLayout.Header imageUrl={attachment.serviceIcon}>
        {attachment.serviceName}

        <span className="text-slack-divider-inline font-normal">{' | '}</span>
        <span className="text-slack-text-secondary font-normal">{attachment.authorName}</span>
      </SlackMessageAttachmentLayout.Header>
      <SlackMessageAttachmentLayout.TitleLink href={attachment.titleLink}>
        {attachment.title}
      </SlackMessageAttachmentLayout.TitleLink>
      <SlackMessageAttachmentLayout.Text>{attachment.text}</SlackMessageAttachmentLayout.Text>
      <div
        className="mt-1.5 w-full max-w-[360px] overflow-hidden rounded-lg bg-black"
        ref={containerRef}
      >
        {playing ? (
          <div className="yt-embed" dangerouslySetInnerHTML={{ __html: attachment.videoHTML }} />
        ) : (
          <div className="relative w-full">
            <button
              className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setPlaying(true)}
            >
              <div className="ease-ease absolute top-0 z-0 size-4 -translate-x-1/2 -translate-y-1/2 bg-white opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="ease-ease absolute z-10 -translate-x-1/2 -translate-y-1/2 text-5xl text-[red] opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                <FaYoutube />
              </div>
            </button>
            <AutoHeightImage alt="유튜브 임베드" src={attachment.thumbUrl} />
          </div>
        )}
      </div>
    </SlackMessageAttachmentLayout>
  )
}
