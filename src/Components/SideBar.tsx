import ProjectBtn from './ProjectBtn';
type projectType = {
  id: number;
  title: string;
  discription: string;
  date: string;
};
type props = {
  changeToAddProject: () => void;
  projects: projectType[];
  changeProjectIndex: (index: number) => void;
  activeIndex: any;
};
export default function SideBar({
  changeToAddProject,
  changeProjectIndex,
  projects,
  activeIndex,
}: props) {
  return (
    <div className="bg-black  p-5 sm:p-8 flex sm:flex-col gap-5  w-[95%] sm:w-[300px] rounded-r-[20px] items-start h-[25%] sm:h-full overflow-auto">
      <div className="flex flex-col gap-5 w-[40%] sm:w-full">
        <h1 className="text-white font-bold sm:text-[30px] text-lg overflow-hidden ">
          Your Projects
        </h1>
        <button
          onClick={() => changeToAddProject()}
          className="bg-white text-sm bg-opacity-20 text-white p-2 sm:py-2 sm:px-3 rounded-lg items-start"
        >
          + Add Project
        </button>
        <div className="hidden sm:block border-t border-white border-solid w-[140%] mt-3 ml-[-30px]"></div>
      </div>

      <div className=" flex flex-col gap-3 w-[60%] sm:w-full overflow-scroll max-h-[100%] hide">
        {projects.map((project, index) => (
          <ProjectBtn
            title={project.title}
            key={project.id}
            changeProjectIndex={changeProjectIndex}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
