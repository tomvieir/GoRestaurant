import { useContext, useEffect, useState } from 'react';

import {Header} from '../../components/Header';
import {Food} from '../../components/Food';
import {ModalAddFood} from '../../components/ModalAddFood';
import {ModalEditFood} from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { HandlersContext } from '../../Context/HandlersContext';



export function Dashboard() {
  const {
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
  } = useContext(HandlersContext)



  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );

}