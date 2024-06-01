import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const Spinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
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
