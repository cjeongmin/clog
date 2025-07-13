'use client';

import { useAlertActionsContext, useAlertStateContext } from '../model/alert.context';

export default function Alert() {
  const { alert } = useAlertStateContext();
  const { hideAlert: hide } = useAlertActionsContext();

  if (!alert) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-overlay text-text-secondary sm:items-start sm:p-10'
      onClick={() => hide()}
    >
      <div
        className='flex max-h-fit min-h-36 w-80 flex-col items-center justify-center gap-4 overflow-auto rounded-md bg-surface-primary p-4 shadow-lg'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex w-full flex-1 items-center justify-center'>
          <p className='w-full overflow-y-auto break-words text-center'>{alert.message ?? 'Alert'}</p>
        </div>
        <div className='flex w-full flex-row gap-2 font-medium'>
          {alert.type === 'confirm' && (
            <button
              className='flex-1 rounded-md bg-interactive-secondary-bg py-2 sm:transition-all sm:hover:bg-interactive-secondary-bg-hover'
              onClick={() => {
                alert.cancel?.();
                hide();
              }}
            >
              취소
            </button>
          )}
          <button
            className='flex-1 rounded-md bg-interactive-primary-bg py-2 text-text-on-accent sm:transition-all sm:hover:bg-interactive-primary-bg-hover'
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
