import {useState} from 'react';
import axios from 'axios';

//below hook can only by used inside an react component
export default ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null);
    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);

            if(onSuccess) {
                onSuccess(response.data);
            }

            return response.data;      
        } catch (err) {
            //console.log(err.response.data);
            setErrors(
            <div className='alert alert-danger'>
                <h4>Something went wrong</h4>
                <ul className='my-0'>
                    {err.response.data.errors.map(err => 
                        (<li key={err.message}>{err.message}</li>)
                    )}
                </ul>
            </div>
            );
        }
    }

    return {doRequest, errors};
}