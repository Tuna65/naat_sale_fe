import { message } from 'antd';
import moment from 'moment';

export const func = {
  numberWithDots: function numberWithDots(num: number | string, subFix?: string) {
    if (!num) return 0;
    return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${subFix ? ` ${subFix}` : ''}`;
  },

  defaultAvatar: (name?: any) => {
    return `https://ui-avatars.com/api/?name=${name}`;
  },

  checkNullish: (data?: any) => {
    if (!data || (typeof data == 'string' && data == '') || data == undefined) return null;
    return data;
  },

  stringToNumber: (str: string) => {
    const regexNumber = /[0-9]/g;
    return Number(str.match(regexNumber)?.join('')) ?? 0;
  },

  formatDate: (createdAt: string, type: string) => {
    const parsedDate = moment(createdAt).subtract(-7, 'hours');
    return parsedDate.format(type);
  },

  onClickNewTab: (path: string) => {
    const win: any = window.open(path, '_blank');
    win.focus();
  },
  copyText: (text: string) => {
    navigator.clipboard.writeText(text);
    message.success('Copy successfully!');
  },
  removeVietnameseDiacritics: (str: string) => {
    return str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  },
  phoneWithDot: (str?: string) => {
    return str?.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
  },
  mapToEntity: (entity: any, body: any) => {
    return Object.assign(entity, body);
  },
 
};
