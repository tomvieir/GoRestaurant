import { createContext, ReactNode, useEffect, useState } from "react";
import api from '../services/api'

interface ProviderProps {
    children: ReactNode
}

interface FoodObj {
    id: number,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
  }
  
  
  interface DataProps {
    image: string,
    name: string,
    price: string,
    description: string
  }

  interface HandlersContextProps {
    foods: FoodObj[],
    toggleModal: () => void,
    editingFood: FoodObj,
    toggleEditModal: () => void,
    handleUpdateFood:(food: DataProps) => Promise<void>,
    handleDeleteFood: (id: number) => Promise<void>,
    handleEditFood: (food: FoodObj) => void,
    modalOpen:boolean,
    handleAddFood: (food: Omit<FoodObj, 'id' | 'available'>) => Promise<void>,
    editModalOpen:boolean
  }
  

export const HandlersContext = createContext<HandlersContextProps>(
    {} as HandlersContextProps
    )

export function HandlersContextProvider({children}: ProviderProps) {
  const [foods, setFoods] = useState<FoodObj[]>([]);
  const [editingFood, setEditingFood] = useState<FoodObj>({} as FoodObj);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function getFoods() {
      const response = await api.get('/foods');

      setFoods(response.data);
    }
    getFoods()
  }, [])

  
  async function handleAddFood(
    food: Omit<FoodObj, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: DataProps): Promise<void> => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id:number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    setModalOpen( !modalOpen );
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food: FoodObj) => {
    setEditModalOpen(true);
    setEditingFood(food);
  }
  

    return (
        <HandlersContext.Provider value={
            {
                foods,
                toggleModal,
                editingFood,
                toggleEditModal,
                handleUpdateFood,
                handleDeleteFood,
                handleEditFood,
                modalOpen,
                handleAddFood,
                editModalOpen
            }
        }>
            {children}
        </HandlersContext.Provider>
    )
}