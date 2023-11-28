
const DelivManCard = () => {
    return (
        <div className="stat">
            <div className="stat-figure text-secondary">
                <h1>Elias Murmu</h1>
                <div className="avatar online">
                    <div className="w-16 rounded-full">
                        <img src="https://i.ibb.co/RhkW525/boy2.jpg" />
                    </div>
                </div>
            </div>
            <div className=" flex flex-col items-center">
                <div className="">Parcel Delivered</div>
                <div className="stat-value">86%</div>
                <div className="stat-title">Average Ratings</div>
                <div className="stat-value">5</div>
            </div>
        </div>
    )
};

export default DelivManCard;