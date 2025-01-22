const CarCard = ({ car }) => (
  <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden reveal">
    <div className="relative h-48">
      <Image
        src={car.image}
        alt={car.model}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={car.id === 1}
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400">
        {car.model}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{car.price}</p>
      <span
        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
          car.status === 'Available'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        }`}
      >
        {car.status}
      </span>
    </div>
  </div>
);
