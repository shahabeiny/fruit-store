import Swal, { SweetAlertOptions } from 'sweetalert2';

export const handleSwal = (type: string, options: SweetAlertOptions, callback?: () => void) => {
  const defaultOptions: SweetAlertOptions = {
    showCancelButton: true,
    confirmButtonColor: 'rgb(239 68 68)',
    
    cancelButtonColor: 'rgb(13 148 136)',
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر'
  };

  const mergedOptions: any = {
    ...defaultOptions,
    ...options,
    
  };

  Swal.fire(mergedOptions).then((result) => {
    if (result.isConfirmed && callback) {
      callback();
    }
  });
};

export const handleWarningSwal = (
  onDelete: () => void,
  title: string,
  confirmButtonTitle: string = 'حذف'
) => {
  handleSwal(
    'warning',
    {
      title,
      text: 'شما نمی توانید این را برگردانید!',
      icon: 'warning',
      confirmButtonText: `بله, ${confirmButtonTitle} شود!`
    },
    onDelete
  );
};

export const showErrorSwal = (title: string) => {
  handleSwal('error', {
    title,
    icon: 'error',
    confirmButtonText: 'متوجه شدم'
  });
};

export const showSuccessSwal = (title: string) => {
  handleSwal('success', {
    position: 'center',
    icon: 'success',
    title,
    showConfirmButton: false,
    showCancelButton:false,
    timer: 1500
  });
};
