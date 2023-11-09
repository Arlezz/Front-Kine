import DataTable from 'react-data-table-component';

import styles from './TableDatas.module.scss';
import { Spinner } from '../components/Spinner';


export function TableDatas({ columns, data, isLoading, actions }) {
    
    

    return (
        <DataTable
            columns={columns}
            data={data}
            highlightOnHover
            pointerOnHover
            pagination
            responsive
            progressPending={isLoading}
            progressComponent={<Spinner />}
            defaultSortFieldId={1} 
            actions={actions} 
        />
    )
}