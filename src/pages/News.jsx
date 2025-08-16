import NewsCard from '../components/NewsCard.jsx'

const demoNews = [
  { id: 1, title: 'Старт регистрации на сезон осень 2025', excerpt: 'Регистрируйся и собирай команду!', date: '2025-09-01', image: '/src/assets/news1.svg' },
  { id: 2, title: 'Анонс офлайн-финала в Москве', excerpt: 'Финал с призами от партнёров.', date: '2025-10-05', image: '/src/assets/news2.svg' },
  { id: 3, title: 'Новые дисциплины: Valorant и FC25', excerpt: 'Следи за расписанием.', date: '2025-08-20', image: '/src/assets/news3.svg' },
  { id: 4, title: 'Ищем комментаторов-волонтёров', excerpt: 'Хочешь в эфир? Пиши нам!', date: '2025-08-10', image: '/src/assets/news2.svg' }
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
