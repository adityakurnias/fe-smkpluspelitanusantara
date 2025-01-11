import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface NewsItem {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

const fetchNewsItems = async (): Promise<NewsItem[]> => {
  const response = await fetch('/api/news');
  if (!response.ok) {
    throw new Error('Gblok data berita gagal di-fetch');
  }
  return response.json();
};

const LastestNews: React.FC = () => {
  const {
    data: newsItems,
    isLoading,
    isError,
  } = useQuery<NewsItem[]>({
    queryKey: ['newsItems'],
    queryFn: fetchNewsItems,
  });

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-8 text-red-600">Aduhh, cemana ni lek kok error pulak pecing datanya. kacau kali bah</div>;
  }

  return (
    <section id="berita">
      <h1 className="pt-4 pb-4 font-bold text-slate-200 text-center text-xl md:text-2xl xl:text-4xl bg-gradient-to-tr from-red-800 via-red-700 to-red-600">
        Latest News!
      </h1>

      <div className="container px-5 mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {newsItems?.slice(0, 2).map((item) => (
            <div key={item.id} className="w-full md:w-[48%] lg:w-[48%] bg-white p-4 backdrop-filter shadow-lg rounded-lg">
              <div className="bg-white p-2 rounded-lg overflow-hidden">
                <img
                  className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6 hover:brightness-50 transition duration-300"
                  src={item.image}
                  alt={item.title}
                />
                <h3 className="font-bold tracking-widest text-red-600 text-sm title-font">
                  {item.category}
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  {item.title}
                </h2>
                <p className="leading-relaxed text-base">
                  {item.description}
                </p>
              </div>
              <div className="flex justify-end bottom-0 right-0">
                <a className="text-xs md:text-sm hover:text-red-600 transition duration-300" href={item.link}>
                  Lihat Lebih Banyak &raquo;
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {newsItems?.slice(2, 4).map((item) => (
            <div key={item.id} className="w-full md:w-[48%] lg:w-[48%] bg-white p-4 backdrop-filter shadow-lg rounded-lg">
              <div className="bg-white p-2 rounded-lg">
                <img
                  className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6 hover:brightness-50 transition duration-300"
                  src={item.image}
                  alt={item.title}
                />
                <h3 className="font-bold tracking-widest text-red-600 text-sm title-font">
                  {item.category}
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  {item.title}
                </h2>
                <p className="leading-relaxed text-base">
                  {item.description}
                </p>
              </div>
              <div className="flex justify-end bottom-0 right-0">
                <a className="text-xs md:text-sm hover:text-red-600 transition duration-300" href={item.link}>
                  Lihat Lebih Banyak &raquo;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-6 flex justify-center">
        <a href="#berita">
          <button className="md:w-48 md:h-16 bg-gradient-to-r from-red-800 via-red-600 to-red-500 text-white font-bold py-2 px-4 rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
            Lihat Lebih Banyak
          </button>
        </a>
      </div>
    </section>
  );
};

export default LastestNews;