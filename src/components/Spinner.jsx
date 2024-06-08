import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const Spinner = () => {
  return (
    <div className="flex p-10 h-full w-full items-center justify-center">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
      />
    </div>
  );
};

export default Spinner;
