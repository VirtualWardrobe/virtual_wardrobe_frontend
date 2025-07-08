import Image from "next/image";

export default function Team() {
  return (
    <section className="relative isolate bg-white px-6 pt-20 pb-24 sm:pt-32 sm:pb-32 lg:px-8">
      {/* Background shapes */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Meet the Creator
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          I&apos;m Anirudh P S — the mind behind Virtual Wardrobe. I&apos;m
          passionate about building intuitive and innovative experiences that
          help people stay stylish and organized.
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="text-center">
          <Image
            src="https://storage.googleapis.com/vw-media-bucket/Anirudh.jpg"
            alt="Anirudh P S"
            width={128}
            height={128}
            className="aspect-square w-32 rounded-full object-cover object-top mx-auto shadow-lg ring-2 ring-indigo-500"
            unoptimized
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            Anirudh P S
          </h3>
          <p className="text-indigo-600 text-sm font-medium mt-1">
            Creator & Developer
          </p>
          <p className="mt-3 text-sm text-gray-600 max-w-md mx-auto">
            With a blend of creativity and engineering, I&apos;ve built this
            platform to help users manage their wardrobes effortlessly while
            embracing minimalism.
          </p>
        </div>
      </div>

      {/* Bottom background shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </section>
  );
}
