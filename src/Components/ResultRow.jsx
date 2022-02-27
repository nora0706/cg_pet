import React from 'react';

function ResultRow(props) {
    let { result, bp, updateBp } = props;

    const updateArray = (array, i, val) => [
                ...array.slice(0, i),
                val,
                ...array.slice(i + 1),
            ];
    return (
        <div className="result_row">
            <div className="level">Lv. {result.lv}</div>
            <div className="vtl">{~~result.vtl}</div>
            <div className="str">{~~result.str}</div>
            <div className="tgh">{~~result.tgh}</div>
            <div className="qui">{~~result.qui}</div>
            <div className="mgc">{~~result.mgc}</div>

            <div className="hp">{result.hp.toFixed(2)}</div>
            <div className="mp">{result.mp.toFixed(2)}</div>
            <div className="atk">{result.atk.toFixed(2)}</div>
            <div className="def">{result.def.toFixed(2)}</div>
            <div className="dex">{result.dex.toFixed(2)}</div>
            <div className="spt">{result.spt.toFixed(2)}</div>
            <div className="rec">{result.rec.toFixed(2)}</div>
            <div className="is_over">{result.isOver ? 1 : 0}</div>
            {/* <div className="remaining_bp">{result.remainingBp}</div> */}
            <div className="bp_dist">
                <input type="text" value={bp[0]} onChange={e => updateBp(result.lv-1, updateArray(bp,0,parseInt(e.target.value,10)))}></input>
                <input type="text" value={bp[1]} onChange={e => updateBp(result.lv-1, updateArray(bp,1,parseInt(e.target.value,10)))}></input>
                <input type="text" value={bp[2]} onChange={e => updateBp(result.lv-1, updateArray(bp,2,parseInt(e.target.value,10)))}></input>
                <input type="text" value={bp[3]} onChange={e => updateBp(result.lv-1, updateArray(bp,3,parseInt(e.target.value,10)))}></input>
                <input type="text" value={bp[4]} onChange={e => updateBp(result.lv-1, updateArray(bp,4,parseInt(e.target.value,10)))}></input>
            </div>
        </div>
    );
}

export default ResultRow;