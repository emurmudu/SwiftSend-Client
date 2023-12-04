
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div className='flex items-center justify-center h-screen flex-col'>
            <h1 className=' text-5xl'>404</h1>
            <p className=' text-7xl'>{error.statusText || error.message}</p>
            {
                error.status === 404 &&
                <div className='text-center mt-4'>
                    <p>Go Back To Home</p>
                    <Link to='/'><button className='btn btn-info mt-2'>Home</button></Link>
                </div>
            }
        </div>
    );
};

export default ErrorPage;