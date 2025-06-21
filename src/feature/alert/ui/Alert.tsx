'use client';

import { useAlertActionsContext, useAlertStateContext } from '../model/alert.context';

export default function Alert() {
  const { alert } = useAlertStateContext();
  const { hideAlert: hide } = useAlertActionsContext();

  if (!alert) return null;

  return (
    <div
      className='bg-overlay text-text-secondary fixed inset-0 z-50 flex items-center justify-center sm:items-start sm:p-10'
      onClick={() => hide()}
    >
      <div
        className='bg-surface-primary flex max-h-fit min-h-36 w-80 flex-col items-center justify-center gap-4 overflow-auto rounded-md p-4 shadow-lg'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex w-full flex-1 items-center justify-center'>
          <p className='w-full overflow-y-auto break-words text-center'>{alert.message ?? 'Alert'}</p>
        </div>
        <div className='flex w-full flex-row gap-2 font-medium'>
          {alert.type === 'confirm' && (
            <button
              className='bg-interactive-secondary-bg sm:hover:bg-interactive-secondary-bg-hover flex-1 rounded-md py-2 sm:transition-all'
              onClick={() => {
                alert.cancel?.();
                hide();
              }}
            >
              취소
            </button>
          )}
          <button
            className='bg-interactive-primary-bg text-text-on-accent sm:hover:bg-interactive-primary-bg-hover flex-1 rounded-md py-2 sm:transition-all'
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
