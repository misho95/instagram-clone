import CircularProgress from "@mui/material/CircularProgress";

const LoadingComponent = () => {
  return (
    <div className="bg-black/50 fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50">
      <div className="bg-white rounded-full p-5">
        <CircularProgress />
      </div>
    </div>
  );
};

export default LoadingComponent;
