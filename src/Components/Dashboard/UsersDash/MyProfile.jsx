// MyProfile.js
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const onUploadSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const imgbbResponse = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });

            if (imgbbResponse.data.success) {
                const uploadedImageURL = imgbbResponse.data.data.display_url;
                setUploadedImageUrl(uploadedImageURL);
                console.log('Image uploaded successfully:', uploadedImageURL);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const onUpdateProfileClick = async () => {
        if (uploadedImageUrl) {
            try {
                // Update user profile with the new image URL
                const success = await updateUserProfile(user.uid, uploadedImageUrl);

                if (success) {
                    console.log('Profile picture updated successfully:', uploadedImageUrl);
                } else {
                    console.error('Failed to update profile picture.');
                }
            } catch (error) {
                console.error('Error updating profile picture:', error);
            }
        } else {
            console.error('No image uploaded. Upload an image first.');
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="card lg:card-side bg-base-100 shadow-xl">

                {/* <figure><img src={uploadedImageUrl || user.profilePicture || 'default-profile-picture.jpg'} alt="Profile" /></figure> */}
                <figure>
                    <img
                        src={
                            (uploadedImageUrl && user.profilePicture) // If both uploaded and current profile picture exist, show the uploaded one
                                ? uploadedImageUrl
                                : user.photoURL || 'default-profile-picture.jpg' // Otherwise, show the current profile picture or default
                        }
                        alt="Profile"
                    />
                </figure>

                <div className="card-body">
                    <h2 className="card-title">User Name: {user.displayName}</h2>
                    <p>User Email: {user.email}</p>
                    <div>
                        <div>
                            <form onSubmit={handleSubmit(onUploadSubmit)}>
                                <div className="card-actions justify-end">
                                    <div className="py-4 flex">
                                        <input type="file" {...register("image", { required: true })} className="file-input w-full" />
                                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">
                                            Upload
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="card-actions justify-end">
                            <button onClick={onUpdateProfileClick} className="bg-green-500 text-white py-2 px-4 rounded-md mr-2">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
