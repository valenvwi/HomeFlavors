import { useKitchensRetrieve } from "../../../../api";
import { useState } from "react";
import Banner from "./Banner";
import Content from "./Content";
import EditContent from "./EditContent";
import { useAppSelector } from "../../store/root";

export default function KitchenInfo() {
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const { data: kitchenResponse } = useKitchensRetrieve(1);
  const kitchen = kitchenResponse?.data;

  const isOwner = useAppSelector((state) => state.auth.isOwner);

  const onShowEdit = () => {
    setShowEdit(true);
  };

  const onHideEdit = () => {
    setShowEdit(false);
  };

  return (
    <>
      <Banner banner={kitchen?.banner} logo={kitchen?.logo} />
      {isOwner &&
        (!showEdit ? (
          <Content
            kitchen={kitchen}
            showEdit={showEdit}
            onShowEditClick={onShowEdit}
          />
        ) : (
          <EditContent
            kitchen={kitchen}
            showEdit={showEdit}
            onHideEditClick={onHideEdit}
          />
        ))}
    </>
  );
}
