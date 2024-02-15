import {
  Notification,
  useToaster,
  Placeholder,
  Uploader,
  ButtonToolbar,
  SelectPicker,
  Button,
} from "rsuite";
import { Title } from "../text";

export const message = (type, data) => {
  return (
    <Notification type={type} header={type} closable className="w-11/12">
      <div className="grid grid-cols-12 items-center">
        <div className="img col-span-5 ">
          <img src={data.img1} alt="" className="w-10/12" srcSet="" />
        </div>
        <div className="img col-span-7">
          <Title title={data.name} />
        </div>
      </div>
      <hr />
      <div className="img col-span-12">Has been added to your cart</div>
    </Notification>
  );
};
