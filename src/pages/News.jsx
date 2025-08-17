import NewsCard from '../components/NewsCard.jsx'

import news1 from '/media/news/news1.svg'
import news2 from '/media/news/news1.svg'
import news3 from '/media/news/news1.svg'

const demoNews = [
   { id: 1, title: '...', image: news1 },
   { id: 2, title: '...', image: news2 },
   { id: 3, title: '...', image: news3 },
]

export default function News(){
  return (
    <section className="container-p py-12">
      <h1 className="text-3xl font-bold mb-6">Новости</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoNews.map(n => <NewsCard key={n.id} item={n} />)}
      </div>
    </section>
  )
}
