interface OutlineProps {
  content: string;
}

function Outline({ content }: OutlineProps) {
  return (
    <div className='flex w-full flex-col gap-4 rounded-md bg-[#f7fafc] p-4'>
      <p className='m-0 text-xl font-semibold'>개요</p>
      <p className='m-0 font-medium'>{content}</p>
    </div>
  );
}

export default Outline;
