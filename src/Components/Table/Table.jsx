import { useState , useEffect } from "react";
import { apiData } from "../../data/apiData";
import { Pagination } from "../pagination/pagination";
import { AddColumnModal } from "../AddColumnModel/AddColumnModal"; 
import { AddRowAlert } from "../AddRowAlert/AddRowAlert";
import { FileUploadModal } from "../FileUploadModal/FileUploadModal";
import './Table.css'
export const Table = () => {
  const [tableState, setTableState] = useState({
    columns: [], // {columnName: '', columnComponentType: ''}
    rows: [] // { cells: [] }
  });
  const pageSize = 10;
  const pageOptions = 4;
  const [rowPageData , setRowPageData] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddRowAlert, setShowAddRowAlert] = useState(false);
  const [addColumnFormState, setAddColumnFormState] = useState({
    columnName: "",
    columnComponentType: ""
  });
  const getRows = (items, columnTypes) => {
    const columnNames = Object.keys(columnTypes);
    return items.map((item) => {
      return {
        cells: columnNames.map((columnName) => ({
          cellValue: item[columnName]
        }))
      };
    });
  };

  const getColumns = (columnTypes = {}) => {
    const typeMap = {
      input:Input,
      textArea:TextArea,
      fileuploadmodal:FileUploadModal,
    }
    return Object.keys(columnTypes).map((key) => ({
      columnName: key,
      columnComponentType: typeMap[columnTypes[key]]
    }));
  };

  const setDataInState = (apiData = {}) => {
    const { items = [], metaData = {} } = apiData;
    const { columnTypes = {} } = metaData;
    const columnData = getColumns(columnTypes);
    const rowsData = getRows(items, columnTypes);
    setTableState({ columns: columnData, rows: rowsData });
  };
  
  useEffect(() => {
    setDataInState(apiData);
    // eslint-disable-next-line
  },[]);
  const resetColumnForm = () => {
    setAddColumnFormState({
      columnName: "",
      columnComponentType: ""
    });
  };

  const addColumnPrompt = () => setModalOpen(true);
  const handleAddColumn = (columnName) => {
    // const columnName = prompt('Add column Name');
    const newTable = { ...tableState };
    newTable.columns.push({
      columnComponentType: addColumnFormState.columnComponentType,
      columnName: columnName ?? `Col_${newTable.columns.length + 1}`
    });
    //  adding cells for columns
    newTable.rows.forEach((rowObj, rowIdx) =>
      rowObj.cells.push({
        cellValue: `Cell_${rowIdx}_${newTable.columns.length}`
      })
    );
    setTableState(newTable);
  };

  const handleAddRow = () => {
    if (tableState.columns.length < 1) {
      setShowAddRowAlert(true);
      return;
    }
    const newTable = { ...tableState };
    newTable.rows.push({
      cells: newTable.columns.map((columnHeader, colIdx) => ({
        cellValue: `Cell_${newTable.rows.length}_${colIdx}`
      }))
    });
    setTableState(newTable);
  };
  console.log({ tableState });
  const addColumnModalProps = {
    handleAddColumn,
    resetColumnForm,
    setModalOpen,
    addColumnFormState,
    setAddColumnFormState
  };

  const addRowAlertProps = {
    message: "Please add atleast 1 column to add rows.",
    setShowAddRowAlert
  };

  // console.log({ addColumnFormState });
  return (
    <div>
      <button onClick={addColumnPrompt}>Add Column</button>
      <button onClick={handleAddRow}>Add Row</button>
      {/* <button onClick={() => setModalOpen(true)}>Open Modal</button> */}
      {modalOpen && <AddColumnModal {...addColumnModalProps} />}
      {showAddRowAlert && <AddRowAlert {...addRowAlertProps} />}

      <table>
        <thead>
          {tableState.columns.map((columnObj, idx) => (
            <th>
              <Input
                onChange={(e) => {
                  const newTable = { ...tableState };
                  newTable.columns[idx].columnName = e.target.value;
                  setTableState(newTable);
                }}
                value={columnObj.columnName}
              />
            </th>
          ))}
        </thead>
        <tbody>
          {rowPageData.map((rowObj, rowIdx) => {
            const { cells = [] } = rowObj;
            return (
              <tr>
                {cells.map((cellData, colIdx) => {
                  const ComponentType =
                    tableState.columns[colIdx].columnComponentType;
                  return (
                    <td>
                      <ComponentType
                        // type={ComponentType}
                        onChange={(e) => {
                          const newTable = { ...tableState };
                          newTable.rows[rowIdx].cells[colIdx].cellValue =
                            e.target.value;
                          setTableState(newTable);
                        }}
                        value={cellData.cellValue}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination data={tableState.rows} pageSize={pageSize} pageOptions={pageOptions} onChange={(data)=>{
          setRowPageData(data)}} />
    </div>
  );
};

const Input = (props) => {
  const { value, onChange } = props;
  return <input value={value} onChange={onChange} />;
};
const TextArea = (props) => {
  const { value, onChange } = props;
  return <textarea value={value} onChange={onChange}></textarea>;
};

