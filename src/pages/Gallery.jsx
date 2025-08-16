import gallery1 from '../assets/gallery1.svg' // Vite даст корректный URL

const gallery = [
  { src: gallery1, alt: 'Командные обсуждения' },
  { src: gallery1, alt: 'Игровая арена' },
  { src: gallery1, alt: 'Трофей сезона' },
  { src: gallery1, alt: 'Эмоции победителей' },
  { src: gallery1, alt: 'Комментаторская студия' },
  { src: gallery1, alt: 'Групповое фото' },
]
export default function Gallery(){
  return (
    <section className="container-p py-12">
      <h1 className="text-3xl font-bold mb-6">Галерея</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((g,i)=>(
          <figure key={i} className="group relative overflow-hidden rounded-2xl">
            <img src={g.src} alt={g.alt} className="h-60 w-full object-cover transition duration-500 group-hover:scale-105" />
            <figcaption className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3 text-sm">
              {g.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
