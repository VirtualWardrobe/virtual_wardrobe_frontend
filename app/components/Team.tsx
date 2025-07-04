import Image from "next/image";

const people = [
  {
    name: "Anirudh P S",
    role: "Member 1",
    imageUrl:
      "https://virtual-wardrobe-s3.s3.ap-southeast-2.amazonaws.com/assets/img/team/Anirudh.jpg",
  },
  {
    name: "Akilesh S",
    role: "Member 2",
    imageUrl:
      "https://virtual-wardrobe-s3.s3.ap-southeast-2.amazonaws.com/assets/img/team/Akilesh.jpg",
  },
  {
    name: "Aaryan P Shreyas",
    role: "Member 3",
    imageUrl:
      "https://virtual-wardrobe-s3.s3.ap-southeast-2.amazonaws.com/assets/img/team/Aaryan.jpg",
  },
];

export default function Team() {
  return (
    <section className="relative isolate bg-white px-6 pt-16 pb-16 sm:pt-24 sm:pb-24 lg:px-8">
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

      <div className="mx-auto grid max-w-2xl gap-y-16 gap-x-8 xl:max-w-7xl xl:grid-cols-3 xl:gap-x-16 xl:gap-y-24">
        <div className="max-w-xl text-center mx-auto xl:mx-0 xl:text-left xl:max-w-none">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Meet our Team
          </h2>
          <p className="mt-8 text-lg leading-8 text-gray-600">
            We&apos;re a dynamic group of individuals who are passionate about
            what we do and dedicated to delivering the best results for our
            users.
          </p>
        </div>

        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <Image
                  alt={person.name}
                  src={person.imageUrl}
                  width={64}
                  height={64}
                  className="size-16 rounded-full"
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

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
