import { useRef } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Task from './Task';
import EditModal from './EditModal';
import { projectType } from '../Types/Types';
type props = {
  id: number;
  title: string;
  discription: string;
  date: string;
  tasks: string[];
  removeProject: (id: number) => void;
  addTask: (task: string, id: number) => void;
  removeTask: (index: number, id: number) => void;
  updateTask: (task: string, id: number, index: number) => void;
  updateProject: (data: projectType) => void;
};
export default function ProjectPage({
  id,
  title,
  discription,
  date,
  tasks,
  removeProject,
  addTask,
  removeTask,
  updateTask,
  updateProject,
}: props) {
  const task = useRef<HTMLInputElement>(null);
  const modal = useRef() as React.MutableRefObject<HTMLDivElement>;
  var formatedDate = format(new Date(date), 'MMM dd,yyyy');
  function submitHandler() {
    // console.log('clicked');

    if (task.current?.value.trim() == '') {
      alert('please enter the valid task name');
      return;
    } else {
      if (task.current?.value) {
        toast.success('Task Added!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // console.log('adding');
        addTask(task.current.value, id);
        task.current.value = '';
      }
    }
  }
  function closeModal() {
    modal.current?.style.setProperty('display', 'none');
  }

  return (
    <>
      <div className="sm:w-[75%] p-6 sm:p-10 h-full flex flex-col gap-3 ">
        <div className="w-full flex justify-between flex-shrink-0">
          <span className="text-[40px] font-bold">{title}</span>
          <div className="space-x-2">
            <button
              onClick={() =>
                modal.current?.style.setProperty('display', 'flex')
              }
              className="px-5 py-2 bg-black text-white  rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={() => {
                removeProject(id);
                toast.error('Project has been Deleted!', {
                  position: 'top-right',
                  autoClose: 500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                });
              }}
              className="px-5 py-2 bg-black text-white  rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="text-gray-400 flex-shrink-0">{formatedDate}</div>
        <div className="flex-shrink-0">{discription}</div>
        <div className=" border-t border-black border-solid w-[140%] mt-3 ml-[-30px]"></div>
        <div className="flex flex-col sm:gap-6 gap-3">
          <h1 className="text-[35px] font-bold flex-shrink-0">Tasks</h1>
          <div className="flex gap-5 flex-shrink-0">
            <input
              ref={task}
              type="text"
              className=" border-b border-1 border-gray-400 p-1 bg-gray-100 rounded resize-none w-[75%] sm:w-[350px]"
            />
            <button
              onClick={submitHandler}
              className="py-2 px-1 sm:px-5 sm:py-2 bg-black text-white  rounded-lg text-sm w-[25%] sm:w-auto"
            >
              Add Task
            </button>
          </div>
          <div className="w-full space-y-2 flex flex-col overflow-scroll hide">
            {tasks.map((task, index) => (
              <Task
                key={index}
                removeTask={removeTask}
                name={task}
                index={index}
                id={id}
                updateTask={updateTask}
              />
            ))}
          </div>
        </div>
      </div>
      <EditModal
        updateProject={updateProject}
        ref={modal}
        closeModal={closeModal}
        id={id}
        title={title}
        tasks={tasks}
        discription={discription}
        date={date}
      />
    </>
  );
}
