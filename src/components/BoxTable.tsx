import { ResPagination } from "@/models";
import { Skeleton, Table as TableAntd } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "./Container";
import Nodata from "./Nodata";
import Pagination from "./Pagination";
import { useSearchQuery } from "@/hooks/useQuery";

interface ITableProps {
  isLoading?: boolean;
  columns: ColumnsType<any>;
  data?: ResPagination<any>;
  isSelectRow?: boolean;
}

const BoxTable = (props: ITableProps) => {
  const { isLoading, columns, data, isSelectRow } = props;
  const { t } = useTranslation();
  const { params, onParams } = useSearchQuery<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const dataTable = useMemo(() => {
    const page = params.page ? Number(params.page) : 0;
    const size = params.size ? Number(params.size) : 10;
    const number = page * size + 1;
    if (!data || data.items?.length === 0) return [];
    const newData = data?.items?.map((d, idx) => ({
      ...d,
      no: number + idx,
      key: `table-${idx}`,
    }));
    return newData;
  }, [data, params.page, params.size]);

  return (
    <div className=" bg-white shadow-box rounded-lg">
      <div className="border border-solid border-black border-opacity-10 rounded-lg overflow-hidden">
        <Container type="SPIN" isLoading={isLoading}>
          {!isSelectRow ? (
            <TableAntd
              columns={columns}
              dataSource={dataTable}
              locale={{
                emptyText: <Nodata />,
              }}
              pagination={false}
              bordered
            />
          ) : (
            <TableAntd
              columns={columns}
              dataSource={dataTable}
              locale={{
                emptyText: <Nodata />,
              }}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              pagination={false}
              bordered
            />
          )}
        </Container>
      </div>
      {!isLoading && (
        <div className="flex justify-end mt-3 pb-4">
          <Pagination
            onChange={(page, size) => onParams({ ...params, page, limit: size })}
            metaData={data?.meta as any}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(BoxTable);

export const TableLoading = () => {
  return (
    <div>
      <div className="grid grid-cols-8 gap-y-3 px-4 bg-white py-6 rounded-lg">
        {new Array(32).fill({}).map((i, idx) => (
          <div className="col-span-1" key={`table-loading-${idx}`}>
            <Skeleton.Input active size="default" />
          </div>
        ))}
      </div>
    </div>
  );
};
