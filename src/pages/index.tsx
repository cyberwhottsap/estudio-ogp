import { DESCRIPCCIONES, NOTICIAS, TITULO_DE_PAGINA } from "~/data/data";

import { Card } from "~/components/card";

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto py-32 sm:py-6 lg:py-6">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          {/*ANUNCIO*/}
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            ¿Quieres conocer más a detalle la informacion?{" "}
            <a
              href="https://i.ibb.co/s6TbdJr/ITMM-CPII-2022-2-027-CAPITULO-LIBRO-MARZO23.jpg"
              className="font-semibold text-indigo-600"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              Clic aquí <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          {/**TITULO */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {TITULO_DE_PAGINA}
          </h1>

          {/**CAROUSEL */}
          <div className="carousel w-full max-w-[800px] py-4">
            <div id="slide1" className="carousel-item relative w-full">
              <img
                src="https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img
                src="https://images.pexels.com/photos/4865545/pexels-photo-4865545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img
                src="https://images.pexels.com/photos/6373289/pexels-photo-6373289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img
                src="https://images.pexels.com/photos/4467739/pexels-photo-4467739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          {/**DESCRIPCION */}
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {DESCRIPCCIONES.inicio}
          </p>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div>
        {/**NOTICIAS */}

        <div className="mx-4 mt-8 grid">
          {NOTICIAS.map((noticia, idx) => (
            <div key={idx} className="col-12 sm:col-6 md:col-4">
              <Card
                img={noticia.img}
                title={noticia.titulo}
                description={noticia.descripcion}
                url={noticia.url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
