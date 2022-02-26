import React from 'react';

function ResultRow(props) {
    let { result } = props;
    return (
        <div className="result_row">
            <div className="level">Lv. {result.lv}</div>
            <div className="vtl">{result.vtl}</div>
            <div className="str">{result.str}</div>
            <div className="tgh">{result.tgh}</div>
            <div className="qui">{result.qui}</div>
            <div className="mgc">{result.mgc}</div>

            <div className="hp">{result.hp}</div>
            <div className="mp">{result.mp}</div>
            <div className="atk">{result.atk}</div>
            <div className="def">{result.def}</div>
            <div className="dex">{result.dex}</div>
            <div className="spt">{result.spt}</div>
            <div className="rec">{result.rec}</div>
        </div>
    );
}

export default ResultRow;