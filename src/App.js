import React, {useState, useEffect, useCallback} from 'react';
import './style.css';

const Box = (props) => {
  const red = props.redPoint[0] === props.row && props.redPoint[1] === props.col ? true : false;
  const green = props.sneakPoint.filter(item => item[0] === props.row && item[1] === props.col).length === 1 ? true: false;
  return (
    <div
      className={`box ${red? 'red' : green? 'green' : ''}`}>
    </div>
  );};

export default function App() {
  const [redPoint, setRedPoint] = useState([21,27]);
  const [dir, setDir] = useState('right');
  const [sneakPoint, setSneakPoint] = useState([[15, 15], [15, 14], [15, 13], [15, 12]]);

  const changeDirection = useCallback(e => {
    switch (e.keyCode) {
        case 37:
          if (dir !== 'right') {
            setDir('left');
          } else {
            setDir('right');
          }

          break;
        case 38:
          if (dir !== 'down') {
            setDir('up');
          } else {
            setDir('down');
          }

          break;
        case 39:
        if (dir !== 'left') {
          setDir('right');
        } else {
          setDir('left');
        }

          break;
        case 40:
          if (dir !== 'up') {
            setDir('down');
          } else {
            setDir('up');
          }

          break;
        default:
          break;
      }
    }, [dir]);

  useEffect(() => {
    window.addEventListener("keydown", changeDirection);
    return () => {
      window.removeEventListener("keydown", changeDirection);
    };
  },[changeDirection]);

  useEffect(() => {
    const time = window.setTimeout(() => {
      let [headRow, headCol] = sneakPoint[0].slice();
      switch (dir) {
        case 'left':
          headCol = headCol === 0 ? 29 : headCol - 1;
          break;
        case 'up':
          headRow = headRow === 0 ? 29 : headRow - 1;
          break;
        case 'right':
          headCol = headCol === 29 ? 0 : headCol + 1;
          break;
        case 'down':
          headRow = headRow === 29 ? 0 : headRow + 1;
          break;
        default:
          break;
      }

      if (sneakPoint.filter(item => item[0] === headRow && item[1] === headCol).length !== 0) {
        alert('Oh no!!! Want to try again?');
        setSneakPoint([[15, 15], [15, 14], [15, 13], [15, 12]]);
        setDir('right');
        setRedPoint([21,27]);
        return;
      }

      if (headRow === redPoint[0] && headCol === redPoint[1]) {
        setRedPoint([Math.floor(Math.random() * 29), Math.floor(Math.random() * 29)]);
        setSneakPoint([[headRow, headCol], ...sneakPoint]);
      } else {
        const tmp = sneakPoint.slice();
        tmp.pop();
        setSneakPoint([[headRow, headCol], ...tmp]);
      }
    }, 70);
    return () => {
      window.clearInterval(time);
    };
  }, [sneakPoint, dir, redPoint]);

  return (
    <div className="container">
      {new Array(30).fill(new Array(30).fill(1)).map((row, indexRow) => {
        return (
          <div className="flex_row" key={'row' + indexRow}>
            {row.map((col, indexCol) => {
              return (<Box col={indexCol} row={indexRow} sneakPoint={sneakPoint} redPoint={redPoint} key={indexCol + indexRow}/>);
            })}
          </div>);
      })}
    </div>
  );
}
