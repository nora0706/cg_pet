import React, { useState, useEffect } from 'react';

import './App.css';
import ResultTable from './Components/ResultTable';
import { Simulator } from "./Util/Simulator";
import CssBaseline from '@mui/material/CssBaseline';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';



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

  const [errorMsg, setErrorMsg] = useState('');

  const [freeBp, setFreeBp] = useState(Array.from({ length: MAX_LEVEL }, () => Array(5).fill(0)));

  const [results, setResults] = useState(new Simulator(25, 25, 25, 25, 25,
    0, 0, 0, 0, 0,
    2, 2, 2, 2, 2,
    20, BP.NONE).run(MAX_LEVEL, Array.from({ length: MAX_LEVEL }, () => Array(5).fill(0))));
  

  const [petList, setPetList] = useState([]);
  const [petListLoading, setPetListLoading] = useState(true);
  useEffect(() => {
    if (petList.length === 0){
      setPetListLoading(true);
      fetch(`pet_list.json`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(body => body.json()
      ).then(list => {
        setPetList(list);
        setPetListLoading(false);
      });
    }
  }, [petList.length]);
  const UpdateBp = (i, val) => {
    setFreeBp(existingItems => {
      return [
        ...existingItems.slice(0, i),
        val,
        ...existingItems.slice(i + 1),
      ]
    })
  }

  const validate = (type, updateFunc, value, extraVal) => {
    setErrorMsg('');
    let newValue = parseInt(value, 10);
    switch (type) {
      case TYPE.MAX:
        if (newValue < 0) {
          setErrorMsg('BP cannot less than 0.');
          return;
        } else if (newValue > 50) {
          setErrorMsg('BP cannot larger than 50.');
          return;
        }
        break;
      case TYPE.DROPPED:
        if (newValue < 0) {
          setErrorMsg('Drop cannot less than 0.');
          return;
        } else if (newValue > 4) {
          setErrorMsg('Dropped cannot more than 4.');
          return;
        }
        break;
      case TYPE.RANDOM:
        if (newValue < 0) {
          setErrorMsg('Random cannot less than 0.');
          return;
        } else if (newValue + extraVal > 10) {
          setErrorMsg('Random in total cannot more than 10.');
          return;
        }
        break;
      default:
        console.log("Unknow type error")
        break;
    }
    updateFunc(newValue);
  };
  const resetBP = pointDist => {
    setPointDist(parseInt(pointDist, 10));
    let newDist = Array.from({ length: MAX_LEVEL }, () => Array(5).fill(0));
    if (pointDist >= 0) {
      for (let lv of newDist) {
        lv[pointDist] = 1;
      }
    }
    setFreeBp(newDist);
  }

  const loadPet = (petName) => {
    if (petName.length === 0) return false;
    fetch(`pets/${petName}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(body => body.json()
    ).then(pet => {
      setMaxVtl(pet.VTL);
      setMaxStr(pet.STR);
      setMaxTgh(pet.TGH);
      setMaxQui(pet.QUI);
      setMaxMgc(pet.MGC);
    });
  }

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
      <CssBaseline />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Autocomplete
            disablePortal
            id="pet-list"
            loading={petListLoading}
            autoHighlight
            autoSelect
            blurOnSelect
            options={petList}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              loadPet(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="寵物名稱" />}
          />
        </div>
        <div>頂檔</div>
        <div>
          <TextField label="體力" size="small" id="max_vtl" type="number" value={maxVtl} onChange={(e) => validate(TYPE.MAX, setMaxVtl, e.target.value)} />
          <TextField label="力量" size="small" id="max_str" type="number" value={maxStr} onChange={(e) => validate(TYPE.MAX, setMaxStr, e.target.value)} />
          <TextField label="強度" size="small" id="max_tgh" type="number" value={maxTgh} onChange={(e) => validate(TYPE.MAX, setMaxTgh, e.target.value)} />
          <TextField label="速度" size="small" id="max_qui" type="number" value={maxQui} onChange={(e) => validate(TYPE.MAX, setMaxQui, e.target.value)} />
          <TextField label="魔法" size="small" id="max_mgc" type="number" value={maxMgc} onChange={(e) => validate(TYPE.MAX, setMaxMgc, e.target.value)} />
        </div>
        <div>掉檔</div>
        <div>
          <TextField label="體力" size="small" id="dropped_vtl" type="number" value={droppedVtl} onChange={(e) => validate(TYPE.DROPPED, setDroppedVtl, e.target.value)} />
          <TextField label="力量" size="small" id="dropped_str" type="number" value={droppedStr} onChange={(e) => validate(TYPE.DROPPED, setDroppedStr, e.target.value)} />
          <TextField label="強度" size="small" id="dropped_tgh" type="number" value={droppedTgh} onChange={(e) => validate(TYPE.DROPPED, setDroppedTgh, e.target.value)} />
          <TextField label="速度" size="small" id="dropped_qui" type="number" value={droppedQui} onChange={(e) => validate(TYPE.DROPPED, setDroppedQui, e.target.value)} />
          <TextField label="魔法" size="small" id="dropped_mgc" type="number" value={droppedMgc} onChange={(e) => validate(TYPE.DROPPED, setDroppedMgc, e.target.value)} />
          {/* <span>{droppedVtl + droppedStr + droppedTgh + droppedQui + droppedMgc}</span> */}
        </div>
        <div>隨機檔</div>
        <div>
          <TextField label="體力" size="small" id="random_vtl" type="number" value={randomVtl} onChange={(e) => validate(TYPE.RANDOM, setRandomVtl, e.target.value, (randomStr + randomTgh + randomQui + randomMgc))} />
          <TextField label="力量" size="small" id="random_str" type="number" value={randomStr} onChange={(e) => validate(TYPE.RANDOM, setRandomStr, e.target.value, (randomVtl + randomTgh + randomQui + randomMgc))} />
          <TextField label="強度" size="small" id="random_tgh" type="number" value={randomTgh} onChange={(e) => validate(TYPE.RANDOM, setRandomTgh, e.target.value, (randomVtl + randomStr + randomQui + randomMgc))} />
          <TextField label="速度" size="small" id="random_qui" type="number" value={randomQui} onChange={(e) => validate(TYPE.RANDOM, setRandomQui, e.target.value, (randomVtl + randomStr + randomTgh + randomMgc))} />
          <TextField label="魔法" size="small" id="random_mgc" type="number" value={randomMgc} onChange={(e) => validate(TYPE.RANDOM, setRandomMgc, e.target.value, (randomVtl + randomStr + randomTgh + randomQui))} />
          {/* <span>{randomVtl + randomStr + randomTgh + randomQui + randomMgc}</span> */}
        </div>
        <div>
          <TextField label="成長係數" size="small" id="growth_ratio" type="number" value={growthRatio} onChange={(e) => validate(TYPE.RATIO, setGrowthRatio, e.target.value)} />
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">加點方式</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={pointDist}
              onChange={(e) => resetBP(e.target.value)}
            >
              <FormControlLabel control={<Radio />} value={BP.NONE} label="不指定" />
              <FormControlLabel control={<Radio />} value={BP.VTL} label="體力" />
              <FormControlLabel control={<Radio />} value={BP.STR} label="力量" />
              <FormControlLabel control={<Radio />} value={BP.TGH} label="強度" />
              <FormControlLabel control={<Radio />} value={BP.QUI} label="速度" />
              <FormControlLabel control={<Radio />} value={BP.MGC} label="魔法" />
            </RadioGroup>
          </FormControl>
        </div>
      </Box>
      <div>{errorMsg}</div>
        <ResultTable
          results={results}
          bp={freeBp}
          updateBp={UpdateBp}
        />
    </div>
  );
}

export default App;
