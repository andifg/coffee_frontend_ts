import { Card, Avatar, Skeleton, Rate } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { getName } from "./CoffeeHelper";

const { Meta } = Card;

interface Props {
  coffee: string;
  editCoffee: boolean;
  seteditCoffee: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCoffee: CallableFunction

}

const Coffee: React.FC<Props> = (props: Props) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Use effect executed")
        const data = await getName();
        setData(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const saveChanges = (e: unknown) => {
    setEdit(false);
    props.seteditCoffee(false);
  };

  const editCard = (e: unknown) => {
    setEdit(true);
    props.seteditCoffee(true);
  };

  const delteCard = (e: React.MouseEvent<HTMLElement>) => {
    props.deleteCoffee(props.coffee);
  };

  const getActions = () => {
    if (edit) {
      return [<SaveOutlined key="saveChanges" onClick={saveChanges} />];
    }
    return [
      <EditOutlined key="edit" onClick={!edit && !props.editCoffee ? editCard : (()=> null)} />,
      <DeleteOutlined key="delete" onClick={!edit && !props.editCoffee ? delteCard : (()=> null)} />,
    ];
  };

  return (
    <div className="coffee-wrapper">
      <Card
        className="coffee"
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={getActions()}
      >
        <Skeleton loading={loading} avatar active>
          <Meta title={props.coffee} />
          <div>
            <Rate allowHalf defaultValue={2.5} disabled={!edit} />
            {edit && <p>Change the Rating here</p>}
          </div>
        </Skeleton>
      </Card>
    </div>
  );
};

export default Coffee;
