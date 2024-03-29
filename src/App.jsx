import React, { useState, useEffect } from 'react';

import './App.css';
import ResultTable from './Components/ResultTable';
import LoadList from './Components/LoadList';
import { Simulator } from "./Util/Simulator";

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CalculateIcon from '@mui/icons-material/Calculate';
import PetsIcon from '@mui/icons-material/Pets';
import GitHubIcon from '@mui/icons-material/GitHub';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';


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

function App(props) {
  const { db } = props;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const [name, setName] = useState('');
  const [dbRecord, setDbRecord] = useState(null);

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
  const [pointDist2, setPointDist2] = useState(BP.NONE);

  const [errorMsg, setErrorMsg] = useState('');

  const [freeBp, setFreeBp] = useState(Array.from({ length: MAX_LEVEL-1 }, () => -1));

  const [results, setResults] = useState(null);
  

  const [petList, setPetList] = useState([]);
  const [petListLoading, setPetListLoading] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    setFreeBp(existingItems => [
      ...existingItems.slice(0, i),
      val,
      ...existingItems.slice(i + 1),
    ]);
    setPointDist(-1);
    setPointDist2(-1);
  }

  const validate = (type, updateFunc, value, extraVal) => {
    setErrorMsg('');
    let newValue = ~~value;
    switch (type) {
      case TYPE.MAX:
        if (newValue < 0) {
          setErrorMsg('BP 不能少於 0.');
          return;
        } else if (newValue > 55) {
          setErrorMsg('BP 不能大於 55.');
          return;
        }
        break;
      case TYPE.DROPPED:
        if (newValue < 0) {
          setErrorMsg('掉檔不能少於 0.');
          return;
        } else if (newValue > 4) {
          setErrorMsg('掉檔不能大於 4.');
          return;
        }
        break;
      case TYPE.RANDOM:
        if (newValue < 0) {
          setErrorMsg('隨機檔不能少於 0.');
          return;
        } else if (newValue + extraVal > 10) {
          setErrorMsg('隨機檔總和不能大於 10.（請先把其他隨機檔減少）');
          return;
        }
        break;
      case TYPE.RATIO:
        if (newValue < 1) {
          setErrorMsg('成長係數不能少於 1.');
          return;
        } else if (newValue > 100) {
          setErrorMsg('成長係數不能大於 100.');
          return;
        }
        break;
      default:
        console.log("")
        break;
    }
    updateFunc(newValue);
  };
  const resetBP = pointDist => {
    const newPointDist = parseInt(pointDist, 10);
    setPointDist(newPointDist);
    let newDist = Array.from({ length: MAX_LEVEL }, () => newPointDist);
    setFreeBp(newDist);
  }
  const save = () => {
    const data = {
      name,
      maxVtl,
      maxStr,
      maxTgh,
      maxQui,
      maxMgc,
      droppedVtl,
      droppedStr,
      droppedTgh,
      droppedQui,
      droppedMgc,
      randomVtl,
      randomStr,
      randomTgh,
      randomQui,
      randomMgc,
      growthRatio,
      pointDist,
      pointDist2,
      freeBp,
    }
    db.save(data, setErrorMsg);
  }
  const update = () => {
    const data = {
      name,
      maxVtl,
      maxStr,
      maxTgh,
      maxQui,
      maxMgc,
      droppedVtl,
      droppedStr,
      droppedTgh,
      droppedQui,
      droppedMgc,
      randomVtl,
      randomStr,
      randomTgh,
      randomQui,
      randomMgc,
      growthRatio,
      pointDist,
      pointDist2,
      freeBp,
    }
    db.update(data, setErrorMsg);}

  const load = (pet) => {
    setName(pet.name);
    setMaxVtl(pet.maxVtl);
    setMaxStr(pet.maxStr);
    setMaxTgh(pet.maxTgh);
    setMaxQui(pet.maxQui);
    setMaxMgc(pet.maxMgc);
    setDroppedVtl(pet.droppedVtl);
    setDroppedStr(pet.droppedStr);
    setDroppedTgh(pet.droppedTgh);
    setDroppedQui(pet.droppedQui);
    setDroppedMgc(pet.droppedMgc);
    setRandomVtl(pet.randomVtl);
    setRandomStr(pet.randomStr);
    setRandomTgh(pet.randomTgh);
    setRandomQui(pet.randomQui);
    setRandomMgc(pet.randomMgc);
    setGrowthRatio(pet.growthRatio);
    setPointDist(pet.pointDist);
    setPointDist2(pet.pointDist2);
    setFreeBp(pet.freeBp);
    setDbRecord(pet);
    
    handleClose();
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
      setName(pet.name);
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
      growthRatio, pointDist, pointDist2);
    setResults(simulator.run(MAX_LEVEL, freeBp));
  }, [maxVtl, maxStr, maxTgh, maxQui, maxMgc,
    droppedVtl, droppedStr, droppedTgh, droppedQui, droppedMgc,
    randomVtl, randomStr, randomTgh, randomQui, randomMgc,
    growthRatio, freeBp, pointDist, pointDist2]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CalculateIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            寵物模擬器
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 6,
            pb: 6,
          }}
        >
          <Container>
            <Stack
              sx={{ pt: 4 }}
              style={{ fontSize: '0.9em' }}
              spacing={2}
              justifyContent="center"
            >
              <Stack direction="row" spacing={2}>
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
                  renderInput={(params) => <TextField {...params} label="尋找寵物" />}
                />
                <TextField label="自訂名稱" id="pet_name" value={name} onChange={(e) => setName(e.target.value)} />
                <Button variant="contained" onClick={save} size="small">
                  儲存
                </Button>
                {dbRecord && (<Button variant="contained" onClick={update} size="small">
                  更新
                </Button>)}
                <Button variant="contained" onClick={handleOpen} size="small">
                  載入
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <LoadList 
                    db={db}
                    loadPet= {load}
                    setMsg = {setErrorMsg}
                  />
                </Modal>
              </Stack>
              <Stack direction="row" spacing={2} >
                <Typography style={{ fontSize: '0.9em', width:80 }}>頂檔</Typography>
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="體力" size="small" id="max_vtl" type="number" value={maxVtl} onChange={(e) => validate(TYPE.MAX, setMaxVtl, e.target.value)} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="力量" size="small" id="max_str" type="number" value={maxStr} onChange={(e) => validate(TYPE.MAX, setMaxStr, e.target.value)} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="強度" size="small" id="max_tgh" type="number" value={maxTgh} onChange={(e) => validate(TYPE.MAX, setMaxTgh, e.target.value)} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="速度" size="small" id="max_qui" type="number" value={maxQui} onChange={(e) => validate(TYPE.MAX, setMaxQui, e.target.value)} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="魔法" size="small" id="max_mgc" type="number" value={maxMgc} onChange={(e) => validate(TYPE.MAX, setMaxMgc, e.target.value)} />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography style={{ fontSize: '0.9em', width:80 }}>掉檔</Typography>
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="體力" size="small" id="dropped_vtl" type="number" value={droppedVtl} onChange={(e) => validate(TYPE.DROPPED, setDroppedVtl, e.target.value)} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="力量" size="small" id="dropped_str" type="number" value={droppedStr} onChange={(e) => validate(TYPE.DROPPED, setDroppedStr, e.target.value)} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="強度" size="small" id="dropped_tgh" type="number" value={droppedTgh} onChange={(e) => validate(TYPE.DROPPED, setDroppedTgh, e.target.value)} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="速度" size="small" id="dropped_qui" type="number" value={droppedQui} onChange={(e) => validate(TYPE.DROPPED, setDroppedQui, e.target.value)} />
                <TextField inputProps={{ style: { fontSize: '0.9em' } }} InputLabelProps={{ style: { fontSize: '0.9em' } }} style={{ width: 80 }} label="魔法" size="small" id="dropped_mgc" type="number" value={droppedMgc} onChange={(e) => validate(TYPE.DROPPED, setDroppedMgc, e.target.value)} />
                {/* <span>{droppedVtl + droppedStr + droppedTgh + droppedQui + droppedMgc}</span> */}
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography style={{ fontSize: '0.9em', width:80 }}>隨機檔</Typography>
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="體力" size="small" id="random_vtl" type="number" value={randomVtl} onChange={(e) => validate(TYPE.RANDOM, setRandomVtl, e.target.value, (randomStr + randomTgh + randomQui + randomMgc))} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="力量" size="small" id="random_str" type="number" value={randomStr} onChange={(e) => validate(TYPE.RANDOM, setRandomStr, e.target.value, (randomVtl + randomTgh + randomQui + randomMgc))} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="強度" size="small" id="random_tgh" type="number" value={randomTgh} onChange={(e) => validate(TYPE.RANDOM, setRandomTgh, e.target.value, (randomVtl + randomStr + randomQui + randomMgc))} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="速度" size="small" id="random_qui" type="number" value={randomQui} onChange={(e) => validate(TYPE.RANDOM, setRandomQui, e.target.value, (randomVtl + randomStr + randomTgh + randomMgc))} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="魔法" size="small" id="random_mgc" type="number" value={randomMgc} onChange={(e) => validate(TYPE.RANDOM, setRandomMgc, e.target.value, (randomVtl + randomStr + randomTgh + randomQui))} />
                <TextField inputProps={{style: {fontSize:'0.9em'}}} InputLabelProps={{style: {fontSize:'0.9em'}}} style={{ width: 80 }} label="成長係數" size="small" id="growth_ratio" type="number" value={growthRatio} onChange={(e) => validate(TYPE.RATIO, setGrowthRatio, e.target.value)} />
                {/* <span>{randomVtl + randomStr + randomTgh + randomQui + randomMgc}</span> */}
              </Stack>
              <Stack direction="row" spacing={6} >
                <FormControl>
                  <FormLabel style={{ fontSize: '0.9em' }} id="bp-distribute">加點方式</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="bp-distribute"
                    name="row-radio-buttons-group"
                    value={pointDist}
                    onChange={(e) => resetBP(e.target.value)}
                  >
                    <FormControlLabel control={<Radio size="small" />} value={BP.NONE} label={<Typography sx={{fontSize: '0.9em'}}>不指定</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.VTL} label={<Typography sx={{fontSize: '0.9em'}}>體力</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.STR} label={<Typography sx={{fontSize: '0.9em'}}>力量</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.TGH} label={<Typography sx={{fontSize: '0.9em'}}>強度</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.QUI} label={<Typography sx={{fontSize: '0.9em'}}>速度</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.MGC} label={<Typography sx={{fontSize: '0.9em'}}>魔法</Typography>} />
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormLabel style={{ fontSize: '0.9em' }} id="bp-distribute2">爆點處理</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="bp-distribute2"
                    name="row-radio-buttons-group"
                    value={pointDist2}
                    onChange={(e) => { setPointDist2(parseInt(e.target.value, 10));resetBP(pointDist);}}
                  >
                    <FormControlLabel control={<Radio size="small" />} value={BP.NONE} label={<Typography sx={{fontSize: '0.9em'}}>不指定</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.VTL} label={<Typography sx={{fontSize: '0.9em'}}>體力</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.STR} label={<Typography sx={{fontSize: '0.9em'}}>力量</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.TGH} label={<Typography sx={{fontSize: '0.9em'}}>強度</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.QUI} label={<Typography sx={{fontSize: '0.9em'}}>速度</Typography>} />
                    <FormControlLabel control={<Radio size="small" />} value={BP.MGC} label={<Typography sx={{fontSize: '0.9em'}}>魔法</Typography>} />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Stack>
            {errorMsg.length > 0 && <Alert severity="error">{errorMsg}</Alert>}
          </Container>
        </Box>
        <Container>
          <ResultTable
            results={results}
            bp={freeBp}
            updateBp={UpdateBp}
          />
        </Container>
        </main>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="body2" color="text.secondary" align="center">
            {'Created with '}
            <PetsIcon fontSize="small" color="primary" />
            {' By 大福@初心摩羯 '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {'數值以初心版本為準，數據只供參考。'}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="https://github.com/nora0706/cg_pet/">
            <GitHubIcon />
          </Link>
          </Typography>
        </Box>
    </ThemeProvider>
  );
}

export default App;
