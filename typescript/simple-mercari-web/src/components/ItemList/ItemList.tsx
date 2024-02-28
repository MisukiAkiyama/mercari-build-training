import React, { useEffect, useState } from 'react';

interface Item {
  id: number;
  name: string;
  category: string;
  image_name: string;
};

const server = process.env.REACT_APP_API_URL || 'http://localhost:9000';  /*'http://localhost:9000'*/ 
const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
}

export const ItemList: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;
  const [items, setItems] = useState<Item[]>([])
  
  const fetchItems = () => {
    fetch(`${server}/items`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('GET success:', data);
        setItems(data.items);
        onLoadCompleted && onLoadCompleted();
      
      })
      .catch(error => {
        console.error('GET error:', error)
      })
    }

  useEffect(() => {
    if (reload) {
      fetchItems();
    }
  }, [reload ]);

  const Like = () => {
    const [count, setCount] = useState(0);
    const handleClick = () => {
      setCount(count + 1);
    };
    return (
      <span className="likeButton" onClick={handleClick}> ♥ {count} </span>
    );
  }
  

  return (
    <div className="wrapper">
      <div className="box2"></div>
      {items.map((item) => {
        const imageUrl = `${server}/image/${item.image_name}`;
        return (
          <div key={item.id} className='ItemList'>
            <div className="item_box">
              <div className="item_box_tape"> </div>
              <img src={imageUrl} alt ={placeholderImage} width="150" height="150"/>
              <p>
                <span>Name: {item.name}</span>
                <br />
                <span>Category: {item.category}</span>
                <br/> <br/> 
                <span className="likeButton"><Like/> </span>   
              </p>
            </div>
          </div>     
        )
      })}
      
    </div>
  )
};
/*<span> <Like /></span>*/
/*
<div className="box1">
        <p>
        <div >
          <span className="box-title">Choose Category</span>
          <input type='text' name='name' id='name' placeholder='name' />
          <input type='text' name='category' id='category' placeholder='category'  />
          <button type='submit'>List this item</button>
        </div>
        </p>
        </div>


*/