
const SubHeading = ({ heading, subHeading }) => {
    return (
        <div className="  w-3/5 md:w-1/3 mx-auto my-8">
            <h2 className=" text-blue-600 mb-2">----{subHeading}----</h2>
            <h2 className=" text-3xl uppercase border-blue-200 border-y-2 py-4 ">{heading}</h2>
        </div>
    );
};

export default SubHeading;