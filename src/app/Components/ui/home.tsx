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
        <div className="container flex flex-col items-center justify-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-white">
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
              className="px-8 py-3 m-2 text-lg font-semibold rounded bg-white text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Browse Recipes
            </Link>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HomeComponent;