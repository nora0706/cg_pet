const GROW_VALUE = [
    0.00,
    0.04,0.08,0.12,0.16,0.205,
    0.25,0.29,0.33,0.37,0.415,
    0.46,0.50,0.54,0.58,0.625,
    0.67,0.71,0.75,0.79,0.835,
    0.88,0.92,0.96,1.00,1.045,
    1.09,1.13,1.17,1.21,1.255,
    1.30,1.34,1.38,1.42,1.465,
    1.51,1.55,1.59,1.63,1.675,
    1.72,1.76,1.80,1.84,1.885,
    1.93,1.97,2.01,2.05,2.095,
];

const BP_TO_STATUS_MATRIX = [
    [8,2,3,3,1,],
    [1,2,2,2,10,],
    [0.2,2.7,0.3,0.3,0.2,],
    [0.2,0.3,3.0,0.3,0.2,],
    [0.1,0.2,0.2,2,0.1,],
    [-0.3,-0.1,0.2,-0.1,0.8,],
    [0.8,-0.1,-0.1,0.2,-0.3,],
];

// const STATUS_TO_BP_MATRIX = [
//     [5636/42539,  -49/6077,-8660/127617,-13960/127617,  -6980/42539,],
//     [-333/42539,  -37/6077,49270/127617, -3100/127617,  -1550/42539,],
//     [-296/42539,-296/54693,-3470/127617, 44510/127617,-12400/382851,],
//     [-199/42539,-199/54693,-3770/127617, -3130/127617,198610/382851,],
//     [-398/42539,  631/6077,-7540/127617, -6260/127617,  -3130/42539,],
// ];

const BASE_STATUS = [20, 20, 20, 20, 20, 100, 100];


const BP2status = BP => {
    const Status = [];
    for (let i = 0; i < BP_TO_STATUS_MATRIX.length; i++){
        let singleStatus = BASE_STATUS[i];
        let row = BP_TO_STATUS_MATRIX[i];
        for (let j = 0; j < row.length; j++){
            singleStatus += BP[j]*row[j];
        }
        Status.push(singleStatus);
    }
    return Status;
}

export class Result{
    vtl;
    str;
    tgh;
    qui;
    mgc;
    hp;
    mp;
    atk;
    def;
    dex;
    spt;
    rec;
    lv;
    isOver;
    remainingBp;
    constructor(
        vtl,str,tgh,qui,mgc,lv,isOver,remainingBp
    ){
        this.vtl = vtl;
        this.str = str;
        this.tgh = tgh;
        this.qui = qui;
        this.mgc = mgc;
        this.lv = lv;
        this.isOver = isOver;
        this.remainingBp = remainingBp;
        [this.hp,this.mp,this.atk,this.def,this.dex,this.spt,this.rec,] = BP2status([vtl,str,tgh,qui,mgc]);
    }
}

export class Simulator{
    vtl;
    str;
    tgh;
    qui;
    mgc;
    randomVtl;
    randomStr;
    randomTgh;
    randomQui;
    randomMgc;
    growthVtl;
    growthStr;
    growthTgh;
    growthQui;
    growthMgc;
    growthRatio;
    bpDistribute
    constructor(
        maxVtl,maxStr,maxTgh,maxQui,maxMgc,
        droppedVtl,droppedStr,droppedTgh,droppedQui,droppedMgc,
        randomVtl,randomStr,randomTgh,randomQui,randomMgc,
        growthRatio,bpDistribute
    ){
        this.vtl = maxVtl - droppedVtl;
        this.str = maxStr - droppedStr;
        this.tgh = maxTgh - droppedTgh;
        this.qui = maxQui - droppedQui;
        this.mgc = maxMgc - droppedMgc;
        this.randomVtl = randomVtl;
        this.randomStr = randomStr;
        this.randomTgh = randomTgh;
        this.randomQui = randomQui;
        this.randomMgc = randomMgc;
        this.growthRatio = growthRatio;
        this.bpDistribute = bpDistribute;
        this.growthVtl = GROW_VALUE[this.vtl];
        this.growthStr = GROW_VALUE[this.str];
        this.growthTgh = GROW_VALUE[this.tgh];
        this.growthQui = GROW_VALUE[this.qui];
        this.growthMgc = GROW_VALUE[this.mgc];
    }
    run(maxLv, freeBp){
        let results = [];
        results.push(new Result(
            (this.vtl+this.randomVtl)*this.growthRatio/100,
            (this.str+this.randomStr)*this.growthRatio/100,
            (this.tgh+this.randomTgh)*this.growthRatio/100,
            (this.qui+this.randomQui)*this.growthRatio/100,
            (this.mgc+this.randomMgc)*this.growthRatio/100,
            1,
            false,
            0,
        ));
        for(let lv=2; lv<=maxLv; lv++){
            let lastLv = results[results.length-1];
            let newVtl = lastLv.vtl+this.growthVtl;
            let newStr = lastLv.str+this.growthStr;
            let newTgh = lastLv.tgh+this.growthTgh;
            let newQui = lastLv.qui+this.growthQui;
            let newMgc = lastLv.mgc+this.growthMgc;
            let limit = ~~((~~newVtl+~~newStr+
                        ~~newTgh+~~newQui+~~newMgc+freeBp[lv-2].reduce((x,y)=>x+y,0))/2);
            let addedNewVtl = newVtl+freeBp[lv-2][0];
            let addedNewStr = newStr+freeBp[lv-2][1];
            let addedNewTgh = newTgh+freeBp[lv-2][2];
            let addedNewQui = newQui+freeBp[lv-2][3];
            let addedNewMgc = newMgc+freeBp[lv-2][4];
            let isOver = false;
            let remainingBp = lastLv.remainingBp;
            if (~~addedNewVtl>limit ||
                    ~~addedNewStr>limit ||
                    ~~addedNewTgh>limit ||
                    ~~addedNewQui>limit ||
                    ~~addedNewMgc>limit){
                isOver=true;
                remainingBp++;
                freeBp[lv-2] = [0,0,0,0,0];
            }else{
                newVtl = addedNewVtl;
                newStr = addedNewStr;
                newTgh = addedNewTgh;
                newQui = addedNewQui;
                newMgc = addedNewMgc;
                if (freeBp[lv-2].join('') === '00000'){
                    remainingBp++;
                }
            }
            results.push(new Result(
                newVtl,
                newStr,
                newTgh,
                newQui,
                newMgc,
                lv,
                isOver,
                remainingBp,
            ));
        }
        return results;
    }
}