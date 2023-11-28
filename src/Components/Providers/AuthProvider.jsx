import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const googleProvider = new GoogleAuthProvider()
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
    const axiosPublic = useAxiosPublic();


    const createUser = (email, password, displayName, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;

                return updateProfile(user, {
                    displayName: displayName,
                    photoURL: photoURL,
                }).then(() => {
                    setLoggedInUserEmail(result.user.email);
                    setLoading(false);
                    return result;
                }).catch((error) => {
                    console.error("Error updating user profile:", error);
                    setLoading(false);
                    throw error;
                });
            })
            .catch((error) => {
                console.error("Error creating new user:", error);
                setLoading(false);
                throw error;
            });
    };


    const logInWithUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setLoggedInUserEmail(result.user.email);
                return result;
            });
    }


    const logInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                setLoggedInUserEmail(result.user.email);
                return result;
            });
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, currentUser => {
    //         const userEmail = currentUser?.email || user?.email;
    //         const loggedUser = { email: userEmail };
    //         setUser(currentUser);
    //         console.log('logged in users', currentUser);
    //         setLoading(false);
    //         //if user exist
    //         if (currentUser) {

    //             axiosPublic.post('/jwt', loggedUser, { withCredentials: true })
    //                 .then(res => {
    //                     console.log('token response', res.data);
    //                 })
    //                 .catch(error => {
    //                     console.log('Axios Error', error);
    //                 });
    //         }
    //         else {
    //             axiosPublic.post('/logout', loggedUser, {
    //                 withCredentials: true
    //             })
    //                 .then(res => {
    //                     console.log(res.data)
    //                 })
    //                 .catch(error => {
    //                     console.log('Axios Error', error);
    //                 });
    //         }
    //     })
    //     return () => {
    //         unSubscribe();
    //     }
    // }, [axiosPublic, user?.email])



    ///////////////
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            setLoading(false);

            // If user is logged in
            if (currentUser) {
                try {
                    const response = await axiosPublic.post('/jwt', loggedUser, {
                        withCredentials: true,
                    });

                    console.log('Token response:', response.data);

                    // Store token in local storage
                    if (response.data.token) {
                        localStorage.setItem('access-token', response.data.token);
                    }
                } catch (error) {
                    console.error('Axios Error:', error);
                }
            } else {
                try {
                    const response = await axiosPublic.post('/logout', loggedUser, {
                        withCredentials: true,
                    });

                    console.log('Logout response:', response.data);

                    // Remove token from local storage
                    localStorage.removeItem('access-token');
                } catch (error) {
                    console.error('Axios Error:', error);
                }
            }

            console.log('Current user:', currentUser);
        });

        return () => {
            unSubscribe();
        };
    }, [axiosPublic, user?.email]);

    ///////////////


    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         if (currentUser) {
    //             //get token and store client
    //             const userInfo = { email: currentUser.email };
    //             axiosPublic.post('/jwt', userInfo)
    //                 .then(res => {
    //                     if (res.data.token) {
    //                         localStorage.setItem('access-token', res.data.token);
    //                     }
    //                 })

    //         }
    //         else {
    //             // Todo: remove token(if token stored in the client side: local storage, caching, in memory)
    //             localStorage.removeItem('access-token');
    //         }
    //         console.log('current user :', currentUser);
    //         setLoading(false);
    //     })
    //     return () => {
    //         return unSubscribe();
    //     }
    // }, [axiosPublic])



    const authInfo = { user, createUser, logInWithUser, logInWithGoogle, loading, logOut, loggedInUserEmail }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;