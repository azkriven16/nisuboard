interface ListingCardProps {
  title: string
  description: string
  price: number
  location: string
  imageUrl: string
}

export default function ListingCard({
  title,
  description,
  price,
  location,
  imageUrl
}: ListingCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{location}</p>
        <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{description}</p>
        <p className="text-lg font-bold mt-2">${price.toLocaleString()}</p>
      </div>
    </div>
  )
} 