type props = {
  title: string;
  index: number;
  changeProjectIndex: (index: number) => void;
  activeIndex: any;
};
export default function ProjectBtn({
  title,
  index,
  changeProjectIndex,
  activeIndex,
}: props) {
  // changeProjectIndex(key);
  let activeClass;
  if (typeof activeIndex === 'number') {
    if (index == activeIndex) {
      activeClass = 'bg-white text-black';
    } else {
      activeClass = 'text-white ';
    }
  } else {
    activeClass = 'text-white';
  }
  return (
    <button
      onClick={() => changeProjectIndex(index)}
      className={`sm:px-5 sm:py-3 px-2 py-1 rounded border-[1px] min-h-[35px] border-solid border-gray-700  w-[90%] ${activeClass}`}
    >
      {title}
    </button>
  );
}
