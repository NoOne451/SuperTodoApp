import { toast } from 'react-toastify';
import { useRef, useState } from 'react';

type props = {
  removeTask: (index: number, id: number) => void;
  updateTask: (task: string, id: number, index: number) => void;
  name: string;
  id: number;
  index: number;
};
export default function Task({
  removeTask,
  name,
  index,
  id,
  updateTask,
}: props) {
  const [iscompleted, setIsCompleted] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const taskName = useRef<HTMLSpanElement>(null);
  function onEdit() {
    setIsEditable((isEditable) => !isEditable);
    taskName.current?.setAttribute('contentEditable', 'true');
    taskName.current?.focus();
    taskName.current?.classList.add('border');
  }
  function onSave() {
    if (taskName.current?.innerHTML == '') {
      alert('please enter some valid data');
      return;
    }
    if (taskName.current?.innerHTML) {
      toast.warn('Task GOT updated!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      updateTask(taskName.current?.innerHTML, id, index);

      taskName.current?.setAttribute('contentEditable', 'false');
      setIsEditable((isEditable) => !isEditable);
      taskName.current?.classList.remove('border');
    }
  }
  function completed() {
    if (!isEditable) {
      setIsCompleted((isCompleted) => !isCompleted);
      if (iscompleted == true) {
        toast.success('Task GOT completed', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.warn('Task not yet completed', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      taskName.current?.classList.toggle('active');
    }
  }
  return (
    <div
      key={index}
      className=" bg-gray-200 p-2 gap-1 rounded-lg flex justify-between items-center  max-w-[500px]"
    >
      <span
        onClick={completed}
        ref={taskName}
        className=" border-solid  p-2 rounded border-gray-400 w-[60%] h-full sm:w-[120px]"
      >
        {name}
      </span>
      <div className="space-x-2">
        {!isEditable ? (
          <button
            onClick={onEdit}
            className="sm:px-3 sm:py-1 bg-black text-white  rounded-lg p-1"
          >
            edit
          </button>
        ) : (
          <button
            onClick={onSave}
            className="sm:px-3 sm:py-1 bg-black text-white  rounded-lg p-1"
          >
            {' '}
            Save
          </button>
        )}

        <button
          onClick={() => {
            removeTask(index, id);
            toast.error('Task Removed!', {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }}
          className="sm:px-3 sm:py-1 bg-black text-white  rounded-lg px-2 py-1"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
