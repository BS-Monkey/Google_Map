import React from 'react'

interface Props {
    
}
const storage = [
    { data: '1', status: '0' },
    { data: '2', status: '0' },
    { data: '3', status: '0' },
    { data: '4', status: '0' },
    { data: '5', status: '0' },
    { data: '6', status: '0' },
    { data: '7', status: '0' },
    { data: '8', status: '0' },
    { data: '7', status: '1' },
  ];
  
  const count = storage.reduce((counter, obj) => obj.status === '0' ? counter += 1 : counter, 0); // 6

const Counter = (props: Props) => {
    return (
        <div>
            {count}
        </div>
    )
}

export default Counter
