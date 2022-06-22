interface Props {
  onCycle: VoidFunction;
}

export default function Controls(props: Props) {
  return (
    <div className="absolute bottom-0 right-0 p-10 flex z-10">
      <button className="text-white text-6xl" onClick={props.onCycle}>
        Cycle
      </button>
    </div>
  );
}
