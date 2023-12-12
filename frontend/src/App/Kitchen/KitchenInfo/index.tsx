import { kitchensRetrieve } from "../../../../api";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import Content from "./Content";
import { KitchenType } from "../../types/kitchen";
import EditContent from "./EditContent";
import { useAppSelector } from "../../store/root";

export default function KitchenInfo() {
  const [kitchen, setKitchen] = useState<KitchenType>();
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const getKitchen = async () => {
    const response = await kitchensRetrieve(1);
    if (!response) {
      console.log("error");
      return;
    }
    setKitchen(response.data);
  };

  useEffect(() => {
    getKitchen();
  }, [showEdit]);

  const onShowEdit = () => {
    setShowEdit(true);
  };

  const onHideEdit = () => {
    setShowEdit(false);
  };

  return (
    <>
      <Banner banner={kitchen?.banner} logo={kitchen?.logo} />
      {!showEdit ? (
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
      )}
    </>
  );
}
