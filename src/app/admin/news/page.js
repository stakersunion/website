'use client'

import { NewsTable, AddNews } from '@/components/admin/news'

const News = () => {
  return (
    <div>
      <NewsTable />
      <div className={'my-4'}>
        <AddNews />
      </div>
    </div>
  )
}

export default News
