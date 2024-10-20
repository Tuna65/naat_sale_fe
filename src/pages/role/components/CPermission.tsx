import Text from "@/components/Text";
import { SuccessFunc } from "@/models";
import { permissions } from "@/types/role";
import { Checkbox, Flex } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = { onChange?: SuccessFunc<string[]>; value?: string[] };

const CPermission = (props: Props) => {
  const { onChange, value } = props;
  const { t } = useTranslation();
  // @ts-ignore
  const [checkedList, setCheckedList] = useState<{ [string]: string[] }>({});
  const [v, setV] = useState<string[]>();

  const onChecked = (key: string, list: string[]) => {
    setCheckedList((prev) => ({ ...prev, [key]: list }));
  };

  const onCheckAllChange = (e: any, key: string) => {
    const isChecked = e.target.checked;
    const values = permissions.find((p) => p.key === key)?.permission.map((v) => v.value);
    setCheckedList((prev) => ({ ...prev, [key]: isChecked ? values : [] }));
  };

  useEffect(() => {
    // @ts-ignore
    const flattenedArray: string[] = Object.values(checkedList).reduce((acc, val) => acc.concat(val), []);
    onChange && onChange(flattenedArray);
    setV(flattenedArray);
  }, [checkedList]);

  useEffect(() => {
    // @ts-ignore
    const obj: { [key]: string } = {};
    permissions.forEach((permission) => {
      // @ts-ignore
      const arr: string[] = permission.permission.reduce((acc, val) => {
        if (v && v?.some((v) => v == val.value)) {
          return [...acc, val.value];
        } else return acc;
      }, []);
      // @ts-ignore
      obj[permission.key] = arr;
    });
    setCheckedList(obj);
  }, []);
  return (
    <Flex vertical>
      {permissions.map((permission, idx) => {
        const isBg = idx % 2 == 0;
        // @ts-ignore
        const listCheckKey = checkedList[permission.key]?.length;
        const indeterminate = listCheckKey !== 0 && listCheckKey < permission.permission.length;
        const isCheckAll = listCheckKey == permission.permission.length;
        return (
          <Flex vertical key={`p-${idx}`} className={`${isBg ? "bg-gray-50" : "bg-white"} px-4 pt-4`}>
            <Checkbox
              onChange={(e) => onCheckAllChange(e, permission.key)}
              indeterminate={indeterminate}
              checked={isCheckAll}
            >
              <Text type="HEADLINE">{t(permission.name)}</Text>
            </Checkbox>
            <Checkbox.Group
              // @ts-ignore
              value={checkedList[permission.key]}
              style={{ width: "100%" }}
              onChange={(l) => onChecked(permission.key, l)}
            >
              <div className="grid grid-cols-12 w-full gap-3 p-4">
                {permission.permission.map((p, idx) => {
                  return (
                    <div className="col-span-4" key={`${permission.name}-role-${idx}`}>
                      <Checkbox value={p.value}>{t(p.label as string)}</Checkbox>
                    </div>
                  );
                })}
              </div>
            </Checkbox.Group>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default React.memo(CPermission);
