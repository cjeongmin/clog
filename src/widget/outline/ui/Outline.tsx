interface OutlineProps {
  content: string;
}

function Outline({ content }: Readonly<OutlineProps>) {
  return (
    <div className='bg-surface-secondary flex w-full flex-col gap-4 rounded-md p-4'>
      <p className='m-0 text-xl font-semibold'>개요</p>
      <p className='m-0 font-medium'>{content}</p>
    </div>
  );
}

export default Outline;
