import Link from "next/link";
const HomeComponent = () => {
  return (
    <section>
      <div 
        className="dark:bg-violet-600 bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1579027989536-b7b1f875659b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container  flex flex-col items-center justify-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-none sm:text-4xl xl:max-w-3xl">
            Discover Delicious Recipes
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl">
            Explore thousands of mouth-watering recipes from around the world.
            Find your next favorite dish and start cooking like a pro!
          </p>
          <div className="flex flex-wrap justify-center">
            <Link
              href="/dashboard"
              type="button"
              className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-yellow-700 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group text-gray-800"
            >
              Browse Recipes
              <svg
                className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-800 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-gray-800 group-hover:fill-yellow-700"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HomeComponent;