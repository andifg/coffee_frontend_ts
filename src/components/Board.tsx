import React from "react";
import { useState, useEffect } from "react";
import Coffee from "./Coffee/Coffee";
import AddModal from "./Modal";
import { CoffeesService, Coffee as CoffeeSchema } from "../client";



const Board: React.FC = () => {
  const [coffees, setCoffess] = useState<string[]>([]);
  const [editCoffee, seteditCoffee] = useState(false)

  const addCoffee = (newCoffee: CoffeeSchema) => {

    CoffeesService.postCoffeeApiV1CoffeesPost(newCoffee).then((response)=>{

      console.log(`response: ${JSON.stringify(response)}`)

      setCoffess((prevState) => [...prevState, response._id]);
      console.log(coffees);


    })

  };

  const deleteCoffee = async (removeCoffee: string) => {

    console.log(`Remove coffee ${removeCoffee}`)

    try{

      await CoffeesService.deleteCoffeeByIdApiV1CoffeesCoffeeIdDelete(removeCoffee)
      setCoffess((prevState)=> {
        const newState = prevState.filter(oldcoffee => oldcoffee != removeCoffee)
        return newState
      })

      console.log(`Removed coffee  ${removeCoffee}`)

    }catch(e){

      console.log('ERRRIIRRRRRR')
    }


  }

  useEffect(() => {
    const fetch_data = async () => {
      console.log("pre fetch")
      const data = await CoffeesService.listCoffeeIdsApiV1CoffeesIdsGet()
      console.log(data)
      setCoffess(data);
    }
    fetch_data()
  }, [])


  return (
    <div className="board-wrapper">
      <div className="board-add-icon">
        <AddModal addCoffee={addCoffee} editCoffee={editCoffee}  />
      </div>
      {coffees.map((coffee) => (
        <Coffee key={coffee} coffee_id={coffee} deleteCoffee={deleteCoffee} seteditCoffee={seteditCoffee} editCoffee={editCoffee} />
      ))}
    </div>
  );
};

export default Board;
