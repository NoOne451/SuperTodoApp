type props = {
  changeToAddProject: () => void;
};

export default function NoProject({ changeToAddProject }: props) {
  return (
    <div className="sm:w-[75%] flex flex-col items-center justify-center gap-5">
      <h1 className="text-[30px] font-bold">No Project is Selected</h1>
      <p className="text-gray-400">
        {' '}
        Select a project or get started with new one
      </p>
      <button
        onClick={() => changeToAddProject()}
        className="px-5 py-2 bg-black text-white  rounded-lg"
      >
        Create New Project
      </button>
    </div>
  );
}
