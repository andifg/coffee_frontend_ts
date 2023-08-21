import { Card, Skeleton, Rate } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { CoffeesService, Coffee as CoffeeSchema } from "../../client";

const { Meta } = Card;

interface Props {
  coffee_id: string;
  editCoffee: boolean;
  seteditCoffee: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCoffee: CallableFunction;
}

const Coffee: React.FC<Props> = (props: Props) => {
  const [coffee, setData] = useState<CoffeeSchema>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Use effect executed");

        console.log(`Try fetching data for ${props.coffee_id}`);

        const coffee =
          await CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet(
            props.coffee_id,
          );

        console.log(`Got cofffee from backend ${JSON.stringify(coffee)}`);

        setData(coffee);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const saveChanges = (e: unknown) => {
    console.log(e);
    setEdit(false);
    props.seteditCoffee(false);
  };

  const editCard = (e: unknown) => {
    console.log(e);
    setEdit(true);
    props.seteditCoffee(true);
  };

  const delteCard = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    props.deleteCoffee(props.coffee_id);
  };

  const getActions = () => {
    if (edit) {
      return [<SaveOutlined key="saveChanges" onClick={saveChanges} />];
    }
    return [
      <EditOutlined
        key="edit"
        onClick={!edit && !props.editCoffee ? editCard : () => null}
      />,
      <DeleteOutlined
        key="delete"
        onClick={!edit && !props.editCoffee ? delteCard : () => null}
      />,
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
          <Meta title={coffee && coffee.name} />
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
