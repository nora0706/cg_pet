import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function ResultTable(props) {
    let { results, bp, updateBp } = props;
    const updateArray = (array, i, val) => [
                ...array.slice(0, i),
                val,
                ...array.slice(i + 1),
            ];
    return (
        <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
            <Table sx={{ minWidth: 1160}} stickyHeader size="small" aria-label="lv table">
                <TableHead>
                    <TableRow>
                         <TableCell>等級</TableCell>
                         <TableCell>力量</TableCell>
                         <TableCell>體力</TableCell>
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
                         <TableCell>爆點</TableCell>
                        <TableCell>餘點</TableCell>
                        <TableCell>分配</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((result) => (
                        <TableRow
                            key={result.lv}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" className="level">Lv. {result.lv}</TableCell>
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
                            <TableCell className="spt">{result.spt.toFixed(2)}</TableCell>
                            <TableCell className="rec">{result.rec.toFixed(2)}</TableCell>
                            <TableCell className="is_over">{result.isOver ? 1 : 0}</TableCell>
                            <TableCell className="remaining_bp">{result.remainingBp}</TableCell>
                            <TableCell className="bp_dist">
                                <input type="text" value={bp[result.lv-1][0]} onChange={e => updateBp(result.lv-1, updateArray(bp[result.lv-1],0,parseInt(e.target.value,10)))}></input>
                                <input type="text" value={bp[result.lv-1][1]} onChange={e => updateBp(result.lv-1, updateArray(bp[result.lv-1],1,parseInt(e.target.value,10)))}></input>
                                <input type="text" value={bp[result.lv-1][2]} onChange={e => updateBp(result.lv-1, updateArray(bp[result.lv-1],2,parseInt(e.target.value,10)))}></input>
                                <input type="text" value={bp[result.lv-1][3]} onChange={e => updateBp(result.lv-1, updateArray(bp[result.lv-1],3,parseInt(e.target.value,10)))}></input>
                                <input type="text" value={bp[result.lv-1][4]} onChange={e => updateBp(result.lv-1, updateArray(bp[result.lv-1],4,parseInt(e.target.value,10)))}></input>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}