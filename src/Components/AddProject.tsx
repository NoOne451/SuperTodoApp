import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type props = {
  changeToNoProject: () => void;
  addProject: (data: any) => void;
};

export default function AddProject({ changeToNoProject, addProject }: props) {
  const title = useRef<HTMLInputElement>(null);
  const discription = useRef<HTMLTextAreaElement>(null);
  const date = useRef<HTMLInputElement>(null);
  function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      title.current?.value.trim() == '' ||
      discription.current?.value.trim() == '' ||
      date.current?.value.trim() == ''
    ) {
      alert('Please enter valid data');
      return;
    }
    if (
      title.current?.value &&
      discription.current?.value &&
      date.current?.value
    ) {
      const data = {
        id: Math.random(),
        title: title.current.value,
        discription: discription.current.value,
        date: date.current.value,
        tasks: [],
      };
      toast.success('Project has been created!', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      addProject(data);

      title.current.value = '';
      discription.current.value = '';
      date.current.value == '';
    }
    // console.log(data);
  }
  return (
    <>
      <form
        className="sm:w-[75%] p-8 flex flex-col gap-4"
        onSubmit={(e) => SubmitHandler(e)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[22px] font-semibold">
            Title :
          </label>
          <input
            ref={title}
            required
            type="text"
            className=" border-b border-1 border-gray-400 p-1 bg-gray-100 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[22px] font-semibold">
            Discription :
          </label>
          <textarea
            ref={discription}
            required
            className=" border-b border-1 border-gray-400 p-1 bg-gray-100 rounded resize-none h-[120px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[22px] font-semibold">
            Date:
          </label>
          <input
            ref={date}
            required
            type="date"
            className=" border-b border-1 border-gray-400 p-1 bg-gray-100 rounded"
          />
        </div>
        <div className="flex  w-full bg-pink justify-end mt-5">
          <div className="space-x-3">
            <button
              onClick={() => changeToNoProject()}
              className="px-5 py-2 rounded-lg border border-solid border-b-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-black text-white"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
