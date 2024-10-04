import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  type: 'ACTIVE' | 'INACTIVE' | 'PAID' | 'UNPAID' | 'IN_PROGRESS';
};

const Status = (props: Props) => {
  const { t } = useTranslation();
  const { type } = props;
  const statusStyle = useMemo(() => {
    switch (type) {
      case 'ACTIVE': {
        return {
          text: t('Active'),
          border: 'border-green-500 bg-green-50',
          textColor: 'text-green-500',
        };
      }
      case 'INACTIVE': {
        return {
          text: t('Inactive'),
          border: 'border-gray-500 bg-gray-50',
          textColor: 'text-gary-500',
        };
      }

      case 'PAID': {
        return {
          text: t('Paid'),
          border: 'border-green-500 bg-green-50',
          textColor: 'text-green-500',
        };
      }
      case 'UNPAID': {
        return {
          text: t('UnPaid'),
          border: 'border-gray-500 bg-gray-50',
          textColor: 'text-gary-500',
        };
      }
      case 'IN_PROGRESS': {
        return {
          text: t('In Progress'),
          border: 'border-orange bg-orange bg-opacity-10',
          textColor: 'text-orange',
        };
      }
    }
  }, [type]);
  return (
    <div>
      <div
        className={`px-2 py-1  rounded-lg border border-solid inline-block ${statusStyle?.border}`}
      >
        <p className={`font-medium text-md ${statusStyle?.textColor}`}>{statusStyle?.text}</p>
      </div>
    </div>
  );
};

export default React.memo(Status);
