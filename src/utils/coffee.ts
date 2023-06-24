import axios, { AxiosResponse } from 'axios';
import { uuidv7, UUID } from "uuidv7";


class Coffee {
    id: string;
    name: string;
    ratings: Rating[];

    constructor(name: string, ratings: Rating[]) {
      this.id = uuidv7(); // Generate a new UUID for each instance
      this.name = name;
      this.ratings = ratings;
    }
  }

  class Rating {
    // Define properties of the Rating class here based on your requirements
    // For example:
    ratingId: string;
    score: number;
    // ...

    constructor(score: number) {
        this.ratingId = uuidv7(); // Generate a new UUID for each instance
        this.score = score;
      }

  }



const get_coffees = async (): Promise<Coffee[]> => {

    try {
        const response: AxiosResponse<Coffee[]> = await axios.get<Coffee[]>('http://localhost:8000/api/v1/coffees');
        return response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
      }


  };


export {get_coffees}