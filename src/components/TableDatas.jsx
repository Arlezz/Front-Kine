import DataTable from 'react-data-table-component';

import styles from './TableDatas.module.scss';
import { Spinner } from '../components/Spinner';


export function TableDatas({ columns, data, isLoading, actions, defaultSortField, title, noDataComponent}) {
    
    

    return (
        <DataTable
            title={title}   
            columns={columns}
            data={data}
            highlightOnHover
            pointerOnHover
            pagination
            responsive
            progressPending={isLoading}
            progressComponent={<Spinner />}
            defaultSortFieldId={defaultSortField? defaultSortField : 1  } 
            defaultSortAsc={false}
            actions={actions} 
            noDataComponent={noDataComponent}
        />
    )
}