import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Providers/AuthProvider";
import { useState } from "react";

const UpdateBooking = () => {
    const { user } = useContext(AuthContext);
    const [price, setPrice] = useState(0);
    const updateBookings = useLoaderData();
    // console.log('let me:', updateBookings);
    const { name, _id, users_phone, parcel_type, email, parcel_weight, receiver_name, receiver_phone, delivery_address, requested_delivery_date, latitude, longitude, status, booking_date, approximateDeliveryDate, deliveryMenId } = updateBookings;


    const handleUpdateParcel = e => {
        e.preventDefault();
        const form = e.target;
        const email = user?.email;
        const name = user.displayName;
        const users_phone = form.users_phone.value;
        const parcel_type = form.parcel_type.value;
        // const parcel_weight = form.parcel_weight.value;
        const parcel_weight = parseFloat(form.parcel_weight.value);
        const receiver_name = form.receiver_name.value;
        const receiver_phone = form.receiver_phone.value;
        const delivery_address = form.delivery_address.value;
        const requested_delivery_date = form.requested_delivery_date.value;
        const latitude = parseFloat(form.latitude.value);
        const longitude = parseFloat(form.longitude.value);
        // const price = form.price.value;

        let calculatedPrice = 0;
        if (parcel_weight === 1) {
            calculatedPrice = 50;
        } else if (parcel_weight === 2) {
            calculatedPrice = 100;
        } else if (parcel_weight > 2) {
            calculatedPrice = 150;
        }

        setPrice(calculatedPrice);


        const updatedParcels = {
            name,
            users_phone,
            parcel_type,
            email,
            parcel_weight,
            receiver_name,
            receiver_phone,
            delivery_address,
            requested_delivery_date: new Date().toLocaleDateString('en-GB'),
            latitude,
            longitude,
            price: calculatedPrice,
            status: 'pending',
            booking_date: new Date().toLocaleDateString('en-GB'),
            // booking_date: new Date().toLocaleDateString('en-GB'),

        }

        console.log(updatedParcels)

        fetch(`https://assignment-12-server-c6usoj9ec-elias-murmus-projects.vercel.app/updateBooking/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedParcels)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast('Parcel updated successfully')
                    form.reset();
                    setPrice(0);
                }

            })

    }

    const handleParcelWeight = (e) => {
        const weight = parseFloat(e.target.value);
        let calculatedPrice = 0;

        if (weight === 1) {
            calculatedPrice = 50;
        } else if (weight === 2) {
            calculatedPrice = 100;
        } else if (weight > 2) {
            calculatedPrice = 150;
        }

        setPrice(calculatedPrice);
    };



    return (
        <div>
            <form onSubmit={handleUpdateParcel} className="card-body">
                <h1 className=" text-center text-3xl font-bold">Update Your Parcel </h1>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" name="name" defaultValue={user?.displayName} placeholder="Your Name" className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" defaultValue={user?.email} placeholder="Your Email" className="input input-bordered" readOnly />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="tel" name="users_phone" placeholder="Your Phone Number" defaultValue={users_phone} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Type</span>
                        </label>
                        <input type="text" name="parcel_type" defaultValue={parcel_type} placeholder="Parcel Type" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Weight(Kgs)</span>
                        </label>
                        <input onChange={handleParcelWeight} type="number" name="parcel_weight" defaultValue={parcel_weight} placeholder="Parcel Weight" className="input input-bordered" required />
                        {/* <input type="number" name="parcel_weight" defaultValue={parcel_weight} placeholder="Parcel Weight" className="input input-bordered" required /> */}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Receiver's Name</span>
                        </label>
                        <input type="text" name="receiver_name" defaultValue={receiver_name} placeholder="Receiver Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Receiver's Phone</span>
                        </label>
                        <input type="tel" name="receiver_phone" defaultValue={receiver_phone} placeholder="Receiver Phone" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address</span>
                        </label>
                        <textarea className="input input-bordered h-24" name="delivery_address" defaultValue={delivery_address} id="" cols="10" rows="1" placeholder="write receiver's address here...."></textarea>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </label>
                        <input type="date" name="requested_delivery_date" defaultValue={requested_delivery_date} placeholder="Requested Delivery Date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </label>
                        <input type="number" step="any" id="latitude" name="latitude" defaultValue={latitude} placeholder="Enter Latitude" className="input input-bordered" required></input>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address Longitude</span>
                        </label>
                        <input type="number" step="any" id="longitude" name="longitude" defaultValue={longitude} placeholder="Enter Longitude" className="input input-bordered" required></input>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" name="price" defaultValue={price} placeholder="Price" value={price} className="input input-bordered" required readOnly />
                    </div>
                </div>
                <div className="form-control w-full">
                    <div className="form-control mt-6">
                        <input className=" btn bg-red-300 hover:bg-blue-400 btn-block" type="submit" value='Update Now' />
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};


export default UpdateBooking;