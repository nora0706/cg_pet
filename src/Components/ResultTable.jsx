import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ResultRow from './ResultRow';


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
                    {results?.map((result) => (
                        <ResultRow
                            result={result}
                            lvBp={bp[result.lv - 2]}
                            updateBp={updateBp}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default ResultTable;
