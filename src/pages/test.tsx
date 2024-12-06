import { Col, Row } from "antd";
import { useState, useTransition } from "react";

const Test = () => {
  const [isDragOver, setIsDragOver] = useState<string>("");

  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(100000);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    setValue(value + 1);
    startTransition(() => setValue2(value2 + 1));
  };
  return (
    // <div className="my-12 mx-4">
    //   <Row gutter={[24, 24]}>
    //     <Col span={6}>
    //       <div
    //         id="item-1"
    //         onDrop={(e) => {
    //           var data = e.dataTransfer.getData("text");
    //           e.target.appendChild(document.getElementById(data));
    //           setIsDragOver("");
    //           console.log(data);
    //         }}
    //         onDragOver={(e) => {
    //           e.preventDefault();
    //           setIsDragOver(e.target.id);
    //         }}
    //         className={`${
    //           isDragOver == "item-1" ? "border-primary pb-[80px]" : "border-white"
    //         } flex flex-col gap-2 p-4 min-h-[60px] bg-white rounded-lg shadow-box border border-solid  hover:border-primary cursor-pointer`}
    //       >
    //         <div
    //           id="drag-1"
    //           draggable="true"
    //           onDragOver={(e) => {}}
    //           onDrop={(e) => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             return;
    //           }}
    //           className="bg-red-300 py-3 px-2"
    //           onDragStart={(e) => e.dataTransfer.setData("text", e.target.id)}
    //         >
    //           aaaaaa
    //         </div>
    //         <div
    //           id="drag-2"
    //           onDragOver={(e) => {}}
    //           draggable="true"
    //           onDrop={(e) => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             return;
    //           }}
    //           className="bg-blue-300 py-3 px-2"
    //           onDragStart={(e) => e.dataTransfer.setData("text", e.target.id)}
    //         >
    //           bbbbb
    //         </div>

    //         {/* <div className={`${isDragOver == "item-1" ? "h-[40px]" : "h-0"}  bg-gray-100`}></div> */}
    //       </div>
    //     </Col>
    //     <Col span={6}>
    //       <div
    //         id="item-2"
    //         onDragOver={(e) => {
    //           e.preventDefault();
    //           setIsDragOver(e.target.id);
    //         }}
    //         onDrop={(e) => {
    //           e.preventDefault();
    //           var data = e.dataTransfer.getData("text");
    //           e.target.appendChild(document.getElementById(data));
    //           setIsDragOver("");
    //         }}
    //         className={`${
    //           isDragOver == "item-2" ? "border-primary pb-[80px]" : "border-white"
    //         } flex flex-col gap-2  p-4 min-h-[60px] bg-white rounded-lg shadow-box border border-solid  hover:border-primary cursor-pointer`}
    //       ></div>
    //     </Col>
    //     <Col span={6}>
    //       <div
    //         id="item-3"
    //         onDragOver={(e) => {
    //           e.preventDefault();
    //           setIsDragOver(e.target.id);
    //         }}
    //         onDrop={(e) => {
    //           e.preventDefault();
    //           var data = e.dataTransfer.getData("text");
    //           e.target.appendChild(document.getElementById(data));
    //           setIsDragOver("");
    //         }}
    //         className={`${
    //           isDragOver == "item-3" ? "border-primary pb-[80px]" : "border-white"
    //         } flex flex-col gap-2  p-4 min-h-[60px] bg-white rounded-lg shadow-box border border-solid  hover:border-primary cursor-pointer`}
    //       ></div>
    //     </Col>
    //     <Col span={6}>
    //       <div
    //         id="item-4"
    //         onDragOver={(e) => {
    //           e.preventDefault();
    //           setIsDragOver(e.target.id);
    //         }}
    //         onDrop={(e) => {
    //           e.preventDefault();
    //           var data = e.dataTransfer.getData("text");
    //           e.target.appendChild(document.getElementById(data));
    //           setIsDragOver("");
    //         }}
    //         className={`${
    //           isDragOver == "item-4" ? "border-primary pb-[80px]" : "border-white"
    //         } flex flex-col gap-2  p-4 min-h-[60px] bg-white rounded-lg shadow-box border border-solid  hover:border-primary cursor-pointer`}
    //       ></div>
    //     </Col>
    //   </Row>
    // </div>
    <>
      <button onClick={handleClick}>{value}</button>
      <div
        style={{
          color: isPending ? "red" : "#000",
        }}
      >
        {/* <SlowUI value={value2} /> */}
      </div>
    </>
  );
};

export default Test;

const SlowUI = (props: { value: any }) => {
  return (
    <>
      {Array(props.value)
        .fill(1)
        .map((_, index) => (
          <span key={index}>{props.value - index} </span>
        ))}
    </>
  );
};

// ES6
// Spread, destruct, string literal, let, const , hosting, scope, arrow func
// func declation func(){}
// func literal const func = () => {}
// promise state: pending, resolve, reject
// async/ await

// evenloop: callstack -> webApi -> (taskQueu, microtaskQueu) -> callstack

// =================== typescripts ===================
// number, null, obj, string, undefine, unknow, any, boolean, Enum, void, null
// any vs unknow: khai báo bất kỳ/ khác unknow check type
// interface, type, enum
// ultily type:
// Patial<T>: copy type T và ko bắt buộc các trường
// Required<T>: copy type T và bắt buộc các trường
// Pick<T, K>: copy type T và lấy những thuộc tính ở K
// Omit<T, K>: copy type T và loại thuộc tính ở K
// Pick<Patial<T>, K>: copy type T và o bắt buộc các trường k

// refresh tocken - axios: originalRequest._Retry

// React:
// designPatten: Hoc
// React 18: Suspend
// state hosting
// proxy component
