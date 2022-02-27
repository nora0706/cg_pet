import React, { useState, useEffect } from 'react';

import './App.css';
import ResultRow from './Components/ResultRow';
import { Simulator } from "./Util/Simulator";

const MAX_LEVEL = 120;
const TYPE = {
  MAX: 0,
  DROPPED: 1,
  RANDOM: 2,
  RATIO: 3,
}
const BP = {
  NONE: -1,
  VTL: 0,
  STR: 1,
  TGH: 2,
  QUI: 3,
  MGC: 4,
}

function App() {
  const [maxVtl, setMaxVtl] = useState(25);
  const [maxStr, setMaxStr] = useState(25);
  const [maxTgh, setMaxTgh] = useState(25);
  const [maxQui, setMaxQui] = useState(25);
  const [maxMgc, setMaxMgc] = useState(25);

  const [droppedVtl, setDroppedVtl] = useState(0);
  const [droppedStr, setDroppedStr] = useState(0);
  const [droppedTgh, setDroppedTgh] = useState(0);
  const [droppedQui, setDroppedQui] = useState(0);
  const [droppedMgc, setDroppedMgc] = useState(0);

  const [randomVtl, setRandomVtl] = useState(2);
  const [randomStr, setRandomStr] = useState(2);
  const [randomTgh, setRandomTgh] = useState(2);
  const [randomQui, setRandomQui] = useState(2);
  const [randomMgc, setRandomMgc] = useState(2);

  const [growthRatio, setGrowthRatio] = useState(20);
  const [pointDist, setPointDist] = useState(BP.NONE);

  const [freeBp, setFreeBp] = useState(Array.from({ length: MAX_LEVEL }, () => Array(5).fill(0)));

  const [results, setResults] = useState(new Simulator(25, 25, 25, 25, 25,
    0, 0, 0, 0, 0,
    2, 2, 2, 2, 2,
    20, BP.NONE).run(MAX_LEVEL, Array.from({ length: MAX_LEVEL }, () => Array(5).fill(0))));

  const UpdateBp = (i, val) => {
    setFreeBp(existingItems => {
      return [
        ...existingItems.slice(0, i),
        val,
        ...existingItems.slice(i + 1),
      ]
    })
  }

  const validateAndCalc = (type, updateFunc, value) => {
    switch (type) {
      case TYPE.MAX:
        break;
      case TYPE.DROPPED:
        break;
      case TYPE.RANDOM:
        break;
      default:
        console.log("Unknow type error")
        break;
    }
    updateFunc(parseInt(value, 10));
  };
  useEffect(() => {
    let newDist = Array.from({ length: MAX_LEVEL }, () => Array(5).fill(0));
    if (pointDist >= 0) {
      for (let lv of newDist) {
        lv[pointDist] = 1;
      }
    }
    setFreeBp(newDist);
  }, [pointDist])

  useEffect(() => {
    let simulator = new Simulator(maxVtl, maxStr, maxTgh, maxQui, maxMgc,
      droppedVtl, droppedStr, droppedTgh, droppedQui, droppedMgc,
      randomVtl, randomStr, randomTgh, randomQui, randomMgc,
      growthRatio, pointDist);
    setResults(simulator.run(MAX_LEVEL, freeBp));
  }, [maxVtl, maxStr, maxTgh, maxQui, maxMgc,
    droppedVtl, droppedStr, droppedTgh, droppedQui, droppedMgc,
    randomVtl, randomStr, randomTgh, randomQui, randomMgc,
    growthRatio, freeBp, pointDist]);

  return (
    <div className="App">
      <div className="input_fields">
        <input name="max_vtl" type="number" value={maxVtl} onChange={(e) => validateAndCalc(TYPE.MAX, setMaxVtl, e.target.value)} />
        <input name="max_str" type="number" value={maxStr} onChange={(e) => validateAndCalc(TYPE.MAX, setMaxStr, e.target.value)} />
        <input name="max_tgh" type="number" value={maxTgh} onChange={(e) => validateAndCalc(TYPE.MAX, setMaxTgh, e.target.value)} />
        <input name="max_qui" type="number" value={maxQui} onChange={(e) => validateAndCalc(TYPE.MAX, setMaxQui, e.target.value)} />
        <input name="max_mgc" type="number" value={maxMgc} onChange={(e) => validateAndCalc(TYPE.MAX, setMaxMgc, e.target.value)} />
      </div>
      <div className="input_fields">
        <input name="dropped_vtl" type="number" value={droppedVtl} onChange={(e) => validateAndCalc(TYPE.DROPPED, setDroppedVtl, e.target.value)} />
        <input name="dropped_str" type="number" value={droppedStr} onChange={(e) => validateAndCalc(TYPE.DROPPED, setDroppedStr, e.target.value)} />
        <input name="dropped_tgh" type="number" value={droppedTgh} onChange={(e) => validateAndCalc(TYPE.DROPPED, setDroppedTgh, e.target.value)} />
        <input name="dropped_qui" type="number" value={droppedQui} onChange={(e) => validateAndCalc(TYPE.DROPPED, setDroppedQui, e.target.value)} />
        <input name="dropped_mgc" type="number" value={droppedMgc} onChange={(e) => validateAndCalc(TYPE.DROPPED, setDroppedMgc, e.target.value)} />
      </div>
      <div className="input_fields">
        <input name="random_vtl" type="number" value={randomVtl} onChange={(e) => validateAndCalc(TYPE.RANDOM, setRandomVtl, e.target.value)} />
        <input name="random_str" type="number" value={randomStr} onChange={(e) => validateAndCalc(TYPE.RANDOM, setRandomStr, e.target.value)} />
        <input name="random_tgh" type="number" value={randomTgh} onChange={(e) => validateAndCalc(TYPE.RANDOM, setRandomTgh, e.target.value)} />
        <input name="random_qui" type="number" value={randomQui} onChange={(e) => validateAndCalc(TYPE.RANDOM, setRandomQui, e.target.value)} />
        <input name="random_mgc" type="number" value={randomMgc} onChange={(e) => validateAndCalc(TYPE.RANDOM, setRandomMgc, e.target.value)} />
      </div>
      <div className="input_fields">
        <input name="growth_ratio" type="number" value={growthRatio} onChange={(e) => validateAndCalc(TYPE.RATIO, setGrowthRatio, e.target.value)} />
        <label htmlFor="none">不指定</label>
        <input name="bp_distribute" id="none" type="radio" checked={pointDist === BP.NONE} onClick={() => setPointDist(BP.NONE)} label="不加點" />
        <label htmlFor="vtl">體力</label>
        <input name="bp_distribute" id="vtl" type="radio" checked={pointDist === BP.VTL} onClick={() => setPointDist(BP.VTL)} label="體力" />
        <label htmlFor="str">力量</label>
        <input name="bp_distribute" id="str" type="radio" checked={pointDist === BP.STR} onClick={() => setPointDist(BP.STR)} label="力量" />
        <label htmlFor="tgh">強度</label>
        <input name="bp_distribute" id="tgh" type="radio" checked={pointDist === BP.TGH} onClick={() => setPointDist(BP.TGH)} label="強度" />
        <label htmlFor="qui">速度</label>
        <input name="bp_distribute" id="qui" type="radio" checked={pointDist === BP.QUI} onClick={() => setPointDist(BP.QUI)} label="速度" />
        <label htmlFor="mgc">魔法</label>
        <input name="bp_distribute" id="mgc" type="radio" checked={pointDist === BP.MGC} onClick={() => setPointDist(BP.MGC)} label="魔法" />
      </div>

      {results?.map((result, idx) => (
        <ResultRow
          key={idx}
          result={result}
          bp={freeBp[idx]}
          updateBp={UpdateBp}
        />
      ))}
    </div>
  );
}

export default App;
