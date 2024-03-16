// VenueCard.js
const VenueCard = ({ imageUrl, name, description, onClick }) => {
    return (
        <div className="bg-base-100 p-4 text-center rounded-lg shadow-lg cursor-pointer" onClick={onClick}>
            <div className="aspect-w-2 aspect-h-3 mb-2">
                <img src={imageUrl} alt={`Image of ${name}`} className="object-cover rounded-lg h-full w-full" />
            </div>
            <h4 className="text-lg font-semibold">{name}</h4>
            <p className="text-sm">{description}</p>
        </div>
    );
};

export default VenueCard;
