'use client';

import { useAlertStore } from '../model/alert.store';

export default function Alert() {
  const alert = useAlertStore((state) => state.alert);
  const hide = useAlertStore((state) => state.hide);

  if (!alert) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-slate-600 sm:items-start sm:p-10'>
      <div
        className='flex max-h-fit min-h-36 w-80 flex-col items-center justify-center gap-4 overflow-auto rounded-md bg-white p-4 shadow-lg'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex w-full flex-1 items-center justify-center'>
          <p className='w-full overflow-y-auto break-words text-center'>{alert.message ?? 'Alert'}</p>
        </div>
        <div className='flex w-full flex-row gap-2 font-medium'>
          {alert.type === 'confirm' && (
            <button
              className='flex-1 rounded-md bg-gray-200 py-2 sm:transition-all sm:hover:bg-gray-300'
              onClick={() => {
                alert.cancel?.();
                hide();
              }}
            >
              취소
            </button>
          )}
          <button
            className='flex-1 rounded-md bg-slate-500 py-2 text-white sm:transition-all sm:hover:bg-slate-600'
            onClick={() => {
              alert.confirm?.();
              hide();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
