import React from 'react'
import { ModalComponent } from '../ModalComopnent/ModalComp';
 export const AddRowAlert = (props) => {
    const { message, setShowAddRowAlert } = props;
    return (
      <ModalComponent setModalOpen={setShowAddRowAlert}>
        <div>{message}</div>
      </ModalComponent>
    );
  };
