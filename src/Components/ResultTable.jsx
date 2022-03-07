import * as React from 'react';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function ResultTable(props) {
    let { results, bp, updateBp } = props;
    return (
        <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
            <Table sx={{ minWidth: 1160 }} stickyHeader size="small" aria-label="lv table">
                <TableHead>
                    <TableRow
                        sx={{ '& th': { borderRight: '1px solid silver;' } }}>
                        <TableCell align="center" colSpan={1}></TableCell>
                        <TableCell align="center" colSpan={5}>
                            BP
                        </TableCell>
                        <TableCell align="center" colSpan={7}>
                            能力
                        </TableCell>
                        <TableCell align="center" colSpan={6}>
                            配點
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>等級</TableCell>
                        <TableCell>體力</TableCell>
                        <TableCell>力量</TableCell>
                        <TableCell>強度</TableCell>
                        <TableCell>速度</TableCell>
                        <TableCell>魔法</TableCell>
                        <TableCell>生命</TableCell>
                        <TableCell>魔力</TableCell>
                        <TableCell>攻擊</TableCell>
                        <TableCell>防禦</TableCell>
                        <TableCell>敏捷</TableCell>
                        <TableCell>精神</TableCell>
                        <TableCell>回復力</TableCell>
                        {/* <TableCell>爆點</TableCell> */}
                        <TableCell>餘點</TableCell>
                        <TableCell>體　力　強　速　魔</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((result) => (
                        <TableRow
                            key={result.lv}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                            <TableCell component="th" scope="row" sx={result.lv > 1 && bp[result.lv - 2] === -1 && { color: 'error.main'}}>{result.lv}</TableCell>
                            <TableCell className="vtl">{~~result.vtl}</TableCell>
                            <TableCell className="str">{~~result.str}</TableCell>
                            <TableCell className="tgh">{~~result.tgh}</TableCell>
                            <TableCell className="qui">{~~result.qui}</TableCell>
                            <TableCell className="mgc">{~~result.mgc}</TableCell>
                            <TableCell className="hp">{result.hp.toFixed(2)}</TableCell>
                            <TableCell className="mp">{result.mp.toFixed(2)}</TableCell>
                            <TableCell className="atk">{result.atk.toFixed(2)}</TableCell>
                            <TableCell className="def">{result.def.toFixed(2)}</TableCell>
                            <TableCell className="dex">{result.dex.toFixed(2)}</TableCell>
                            <TableCell className="spt" sx={result.spt.toFixed(2) >= 303 && { color: 'success.main' }}>{result.spt.toFixed(2)}</TableCell>
                            <TableCell className="rec">{result.rec.toFixed(2)}</TableCell>
                            {/* <TableCell className="is_over">{result.isOver ? 1 : 0}</TableCell> */}
                            <TableCell className="remaining_bp">{result.remainingBp}</TableCell>
                            {result.lv > 1 ?
                                <TableCell className="bp_dist">
                                    <Stack direction="row">
                                    <input type="radio" name={'lv'+result.lv} checked={bp[result.lv - 2]===0} onChange={e => updateBp(result.lv - 2, 0)} />
                                
                                    <input type="radio" name={'lv'+result.lv} checked={bp[result.lv - 2]===1} onChange={e => updateBp(result.lv - 2, 1)} />
                                
                                    <input type="radio" name={'lv'+result.lv} checked={bp[result.lv - 2]===2} onChange={e => updateBp(result.lv - 2, 2)} />
                                
                                    <input type="radio" name={'lv'+result.lv} checked={bp[result.lv - 2]===3} onChange={e => updateBp(result.lv - 2, 3)} />
                                
                                    <input type="radio" name={'lv'+result.lv} checked={bp[result.lv - 2]===4} onChange={e => updateBp(result.lv - 2, 4)} />
                                    </Stack>
                                </TableCell>:
                                <TableCell>{' '}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default ResultTable;
