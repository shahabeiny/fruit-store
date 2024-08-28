import autoBind from 'auto-bind';
import moment from 'jalali-moment';

export default class {
  constructor() {
    autoBind(this);
  }

  convertDate(data: any, format: string): string {
    return moment(data).locale('fa').format(format);
  }

  response({
    res,
    message = '',
    code = 200,
    data = {}
  }: {
    res: any;
    message?: string;
    code?: number;
    data?: any;
  }): void {
    res.status(code).json({
      message,
      data
    });
  }
}
