import {useState} from 'react';
import styles from './App.module.css';
import powerdImage from './assets/powered.png';
import {levels,calculateImc, Level} from './helpers/imc';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png';

function App() {

  const [heightFiel, setHeightField] = useState<number>(0);
  const [weightFiel, setWeightFiel] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);
  const handleCalc = () =>{
    if (heightFiel && weightFiel){
      setToShow(calculateImc(heightFiel, weightFiel));
    }else {
      alert('Digite todos os campos.');
    }
  }
  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightFiel(0);
  }
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powerdImage} alt="logo calculador de IMC" />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          <input 
            type="number" 
            placeholder="Digite a sua altura. Ex: 1.5 (em metros" 
            value={heightFiel > 0 ? heightFiel : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
           <input 
            type="number" 
            placeholder="Digite a sua altura Ex: 75.5 (em kg)" 
            value={weightFiel > 0 ? weightFiel : ''}
            onChange={e => setWeightFiel(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button onClick={handleCalc} disabled={toShow ? true : false}>
            Calcular
          </button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item,key) =>(
                <div key={key}>
                  <GridItem key={key} item={item}/>
                </div>
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width="25"/>
              </div>
              
              <GridItem item={toShow}/>
            </div>

          }
        </div>
      </div> 
    </div>
  );
}

export default App;
