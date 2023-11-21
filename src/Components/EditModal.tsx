import { createPortal } from 'react-dom';

import { toast } from 'react-toastify';
import { useRef, forwardRef, useEffect } from 'react';
import { projectType } from '../Types/Types';
type props = {
  closeModal: () => void;
  id: number;
  title: string;
  discription: string;
  date: string;
  tasks: string[];
  updateProject: (data: projectType) => void;
};
const EditModal = forwardRef<HTMLDivElement, props>(
  (
    { closeModal, id, title, discription, date, updateProject, tasks }: props,
    ref
  ) => {
    const newtitle = useRef<HTMLInputElement>(null);
    const newdiscription = useRef<HTMLTextAreaElement>(null);
    const newdate = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (newtitle.current && newdiscription.current && newdate.current) {
        newtitle.current.value = title;
        newdiscription.current.value = discription;
        newdate.current.value = date;
      }
    }, [title, discription, date]);
    function SubmitHandler() {
      if (
        newtitle.current?.value.trim() == '' ||
        newdiscription.current?.value.trim() == '' ||
        newdate.current?.value.trim() == ''
      ) {
        alert('Please enter valid data');
        return;
      }
      if (
        newtitle.current?.value &&
        newdiscription.current?.value &&
        newdate.current?.value
      ) {
        const data = {
          id: id,
          title: newtitle.current.value,
          discription: newdiscription.current.value,
          date: newdate.current.value,
          tasks: tasks,
        };
        updateProject(data);
        toast.warn('Project has been Updated!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        newtitle.current.value = '';
        newdiscription.current.value = '';
        newdate.current.value = '';
        closeModal();
      }
    }
    return createPortal(
      <div className="modal" ref={ref}>
        <div className="sm:w-[400px] rounded-xl bg-white w-[75%] p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[22px] font-semibold">
              Title :
            </label>
            <input
              ref={newtitle}
              required
              type="text"
              className=" border-b border-1 border-gray-400 p-1 bg-gray-200 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[22px] font-semibold">
              Discription :
            </label>
            <textarea
              ref={newdiscription}
              required
              className=" border-b border-1 border-gray-400 p-1 bg-gray-100 rounded resize-none h-[120px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[22px] font-semibold">
              Date:
            </label>
            <input
              ref={newdate}
              required
              type="date"
              className=" border-b border-1 border-gray-400 p-1 bg-gray-100 rounded"
            />
          </div>
          <div className="flex  w-full bg-pink justify-end mt-5">
            <div className="space-x-3">
              <button
                onClick={() => closeModal()}
                className="px-5 py-2 rounded-lg border border-solid border-b-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={SubmitHandler}
                className="px-5 py-2 rounded-lg bg-black text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('modal')!
    );
  }
);

export default EditModal;
