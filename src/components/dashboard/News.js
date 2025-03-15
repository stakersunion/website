'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useNews } from '@/utils/query/news'
import { useVerification } from '@/utils/query/user/verification'

const News = () => {
  const { data: verification, isLoading: loadingVerification } = useVerification()
  const { data: news, isLoading: loadingNews } = useNews()

  console.log(news)
  if (loadingVerification || loadingNews) return null
  if (verification?.independent?.status !== 'approved') return null
  else
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Updates</CardTitle>
          <CardDescription>News for Stakers Union Members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={'flex flex-col'}>
            {news.length === 0 ? (
              <p className={'text-sm text-muted-foreground'}>No news available</p>
            ) : (
              news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2).map((item, index) => (
                <div key={`news-item-${index}`}>
                  <div className={'flex items-center justify-between'}>
                    <div>
                      <h2 className={'text-lg font-bold'}>{item.title}</h2>
                      <p className={'text-xs text-muted-foreground'}>
                        {(() => {
                          const now = new Date()
                          const createdAt = new Date(item.createdAt)
                          const diffInSeconds = Math.floor((now - createdAt) / 1000)
                          const diffInMinutes = Math.floor(diffInSeconds / 60)
                          const diffInHours = Math.floor(diffInMinutes / 60)
                          const diffInDays = Math.floor(diffInHours / 24)

                          if (diffInDays > 0) {
                            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
                          } else if (diffInHours > 0) {
                            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
                          } else if (diffInMinutes > 0) {
                            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
                          } else {
                            return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`
                          }
                        })()}
                      </p>
                      <p className={'text-sm'}>{item.content}</p>
                    </div>
                    {item.link && (
                      <Link
                        href={item.link}
                        target={'_blank'}
                      >
                        <Button
                          variant={'secondary'}
                          className={'text-sm'}
                        >
                          {item.linkText || 'Read More'}
                        </Button>
                      </Link>
                    )}
                  </div>
                  {index < news.slice(0, 2).length - 1 && <Separator className={'my-4'} />}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    )
}

export default News
