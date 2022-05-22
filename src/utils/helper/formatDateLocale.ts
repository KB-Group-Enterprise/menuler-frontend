// import { format } from 'date-fns';
// import { th } from 'date-fns/locale';
import { format } from 'date-fns-tz';

const getThaiMonth = (month: number | string) => {
  if (typeof month === 'number') month = month.toString();
  switch (month) {
    case '01':
      return 'ม.ค.';
    case '02':
      return 'ก.พ.';
    case '03':
      return 'มี.ค.';
    case '04':
      return 'เม.ย.';
    case '05':
      return 'พ.ค.';
    case '06':
      return 'มิ.ย.';
    case '07':
      return 'ก.ค.';
    case '08':
      return 'ส.ค.';
    case '09':
      return 'ก.ย.';
    case '10':
      return 'ต.ค.';
    case '11':
      return 'พ.ย.';
    case '12':
      return 'ธ.ค.';
  }
};

interface option {
  time?: boolean;
  year?: boolean;
  second?: boolean;
}

export default function formatDateLocale(dateInput: Date | string, option: option = { time: true, year: false, second: false }) {
  let date: Date;
  if (typeof dateInput === 'string') {
    date = new Date(dateInput)
  } else {
    date = dateInput;
  }
  const dd = format(date, 'dd', {
    timeZone: 'Asia/Bangkok',
  });
  const MM = getThaiMonth(
    format(date, 'MM', {
      timeZone: 'Asia/Bangkok',
    })
  );
  const yyyy =
    Number(
      format(date, 'yyyy', {
        timeZone: 'Asia/Bangkok',
      })
    ) + 543;
  const HH = format(date, 'HH', {
    timeZone: 'Asia/Bangkok',
  });
  const mm = format(date, 'mm', {
    timeZone: 'Asia/Bangkok',
  });
  const ss = format(date, 'ss', {
    timeZone: 'Asia/Bangkok'
  })
  return `${dd} ${MM}${option.year ? ` ${yyyy}` : ''}${option.time ? ` ${HH}:${mm}` : ''}${ option.second ? `:${ss}` : ''}`;
}
