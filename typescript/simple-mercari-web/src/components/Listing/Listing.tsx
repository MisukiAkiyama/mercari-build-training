import React, { useState } from 'react';

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

interface Prop {
  onListingCompleted?: () => void;
}

type formDataType = {
  name: string,
  category: string,
  image: string | File,
}

export const Listing: React.FC<Prop> = (props) => {
  const { onListingCompleted } = props;
  
  const initialState = {
    name: "",
    category: "",
    image: "",
  };
  const [values, setValues] = useState<formDataType>(initialState);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values, [event.target.name]: event.target.value,
    })
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values, [event.target.name]: event.target.files![0],
    })
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData()
    data.append('name', values.name)
    data.append('category', values.category)
    data.append('image', values.image)


    fetch(server.concat('/items'), {
      method: 'POST',
      mode: 'cors',
      body: data,
    })
      .then(response => {
        console.log('POST status:', response.statusText);
        onListingCompleted && onListingCompleted();
        alert(`done!`);
      })
      .catch((error) => {
        console.error('POST error:', error);
      })
  };

   /* Listingの出力 */
  return (
    <div className='Listing'>
      <form onSubmit={onSubmit} className= "listingBox">
        <span className="box-title">Add items</span>
        <p>
        <div >
          <input type='text' name='name' id='name' placeholder='name' onChange={onValueChange} required />
        </div>
        <div>
          <input type='text' name='category' id='category' placeholder='category' onChange={onValueChange} />
        </div>
        <div>
          <input type='file' name='image' id='image' onChange={onFileChange} required />
        </div>
        <div>
          <button type='submit' className="submitButton" >List this item</button>
        </div>
        </p>
      </form>
    </div>
  );
}
