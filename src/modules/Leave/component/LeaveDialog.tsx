import Alert from './Dialog/Alert'
import Endorse from './Dialog/Endorse'
import Approve from './Dialog/Approve'
import NewRequest from './Dialog/NewRequest'
import Filter from './Dialog/Filter'
import SelectData from './Dialog/SelectData'
export default function LeaveDialog() {
    return (
        <>
            <NewRequest />
            <Endorse/>
            <Approve/>
            <Filter />
            <SelectData />
            <Alert/>
        </>
    );
}