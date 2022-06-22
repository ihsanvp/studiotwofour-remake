import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";

interface Props {
  onCycle: VoidFunction;
}

export default function Controls(props: Props) {
  return (
    <div className="absolute bottom-0 right-0 p-10 flex z-10">
      <button
        className="
          text-white border border-white bg-white bg-opacity-30 hover:bg-opacity-100 
          hover:text-black backdrop-blur flex items-center justify-center w-20 h-20 rounded-full
        "
        onClick={props.onCycle}
      >
        <AiOutlineRight size={25} />
      </button>
    </div>
  );
}
