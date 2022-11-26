import * as React from 'react';

interface Props {
  name: string;
  value: string;
  callback: Function;
  dataKey: number;
}

export default function VariableSizeInput(props: Props) {
    const [width, setWidth] = React.useState(props.value.length);
    const [value, setValue] = React.useState(props.value);
    const changeHandler = (evt: any ) => {
        setWidth(evt.target.value.length);
        setValue(evt.target.value);
    };
    return (
        <input 
            style={{ 
                width: width + 'ch',
                margin: "0em 0.5em",
                backgroundColor: 'rgba(0,0,0,0)',
                border: 0,
            }} 
            onChange={changeHandler}
            name={props.name}
            value={value}
            onBlur={() => props.callback(props.dataKey,value)}
        />
    );
}
