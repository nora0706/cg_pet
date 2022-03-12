import * as React from 'react';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


function ResultCell(props) {
    let { result, lvBp, updateBp } = props;
    return (
        <TableRow
            key={result.lv}
            sx={result.lv > 1 && lvBp === -1 && { backgroundColor: 'error.light' }}
        >
            <TableCell component="th" scope="row">{result.lv}</TableCell>
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
                        <input
                            type="radio"
                            disabled={(lvBp !== 0) && (~~result.vtl >= ~~((~~result.vtl + ~~result.str + ~~result.tgh + ~~result.qui + ~~result.mgc) / 2))}
                            name={'lv' + result.lv}
                            checked={lvBp === 0}
                            onChange={e => updateBp(result.lv - 2, 0)} />

                        <input
                            type="radio"
                            disabled={(lvBp !== 1) && (~~result.str >= ~~((~~result.vtl + ~~result.str + ~~result.tgh + ~~result.qui + ~~result.mgc) / 2))}
                            name={'lv' + result.lv}
                            checked={lvBp === 1}
                            onChange={e => updateBp(result.lv - 2, 1)} />

                        <input
                            type="radio"
                            disabled={(lvBp !== 2) && (~~result.tgh >= ~~((~~result.vtl + ~~result.str + ~~result.tgh + ~~result.qui + ~~result.mgc) / 2))}
                            name={'lv' + result.lv}
                            checked={lvBp === 2}
                            onChange={e => updateBp(result.lv - 2, 2)} />

                        <input
                            type="radio"
                            disabled={(lvBp !== 3) && (~~result.qui >= ~~((~~result.vtl + ~~result.str + ~~result.tgh + ~~result.qui + ~~result.mgc) / 2))}
                            name={'lv' + result.lv}
                            checked={lvBp === 3}
                            onChange={e => updateBp(result.lv - 2, 3)} />

                        <input
                            type="radio"
                            disabled={(lvBp !== 4) && (~~result.mgc >= ~~((~~result.vtl + ~~result.str + ~~result.tgh + ~~result.qui + ~~result.mgc) / 2))}
                            name={'lv' + result.lv}
                            checked={lvBp === 4}
                            onChange={e => updateBp(result.lv - 2, 4)} />
                    </Stack>
                </TableCell> :
                <TableCell>{' '}</TableCell>}
        </TableRow>
    );
}
export default React.memo(ResultCell,
    (prevProps, nextProps) => {
        return (prevProps.bp === nextProps.bp && prevProps.result.checkSum === nextProps.result.checkSum);
    }
);
