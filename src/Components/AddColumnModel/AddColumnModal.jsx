import React from 'react'
import { ModalComponent } from '../ModalComopnent/ModalComp';

export const AddColumnModal = (props) => {
    const {
      handleAddColumn,
      resetColumnForm,
      setModalOpen,
      addColumnFormState,
      setAddColumnFormState
    } = props;
    return (
      <ModalComponent setModalOpen={setModalOpen}>
        <form>
          <input
            placeholder="Column Name"
            value={addColumnFormState.columnName}
            onChange={(e) =>
              setAddColumnFormState((formState) => ({
                ...formState,
                columnName: e.target.value
              }))
            }
          />
          <input
            list="column-comp"
            placeholder="Component type"
            value={addColumnFormState.columnComponentType}
            onChange={(e) =>
              setAddColumnFormState((formState) => ({
                ...formState,
                columnComponentType: e.target.value
              }))
            }
          />
          <datalist id="column-comp">
            <option value="Input" />
            <option value="TextArea" />
          </datalist>
          <div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleAddColumn(addColumnFormState.columnName);
                resetColumnForm();
                setModalOpen(false);
              }}
            >
              Save
            </button>
            <button type="reset" onClick={() => resetColumnForm()}>
              Clear
            </button>
          </div>
        </form>
      </ModalComponent>
    );
  };
  
