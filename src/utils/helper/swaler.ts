import Swal, { SweetAlertOptions } from 'sweetalert2';

function useSwaler() {
  const success = (text: string, option?: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      confirmButtonText: 'ok',
      text,
      ...option,
    });
  };
  const error = (text: string, option?: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'error',
      confirmButtonText: 'ok',
      title: 'Error',
      text,
      ...option,
    });
  };
  const warn = (text: string, option?: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'warning',
      confirmButtonText: 'ok',
      title: 'Warning',
      text,
      ...option,
    });
  };

  const question = (text: string, option?: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'question',
      title: 'Are You Sure ?',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน',
      text,
      ...option,
    });
  };

  const info = (text: string, option?: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'info',
      title: 'Info',
      text,
      ...option,
    });
  };

  return {
    success,
    error,
    warn,
    question,
    info,
  };
}

export const Swaler = useSwaler();
