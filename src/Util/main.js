// const GROW_VALUE = [
//     0.00,
//     0.04,0.08,0.12,0.16,0.205,
//     0.25,0.29,0.33,0.37,0.415,
//     0.46,0.50,0.54,0.58,0.625,
//     0.67,0.71,0.75,0.79,0.835,
//     0.88,0.92,0.96,1.00,1.045,
//     1.09,1.13,1.17,1.21,1.255,
//     1.30,1.34,1.38,1.42,1.465,
//     1.51,1.55,1.59,1.63,1.675,
//     1.72,1.76,1.80,1.84,1.885,
//     1.93,1.97,2.01,2.05,2.095,
// ];

// const BP_TO_STATUS_MATRIX = [
//     [8,2,3,3,1,],
//     [1,2,2,2,10,],
//     [0.2,2.7,0.3,0.3,0.2,],
//     [0.2,0.3,3.0,0.3,0.2,],
//     [0.1,0.2,0.2,2,0.1,],
//     [-0.3,-0.1,0.2,-0.1,0.8,],
//     [0.8,-0.1,-0.1,0.2,-0.3,],
// ];

// const STATUS_TO_BP_MATRIX = [
//     [5636/42539,  -49/6077,-8660/127617,-13960/127617,  -6980/42539,],
//     [-333/42539,  -37/6077,49270/127617, -3100/127617,  -1550/42539,],
//     [-296/42539,-296/54693,-3470/127617, 44510/127617,-12400/382851,],
//     [-199/42539,-199/54693,-3770/127617, -3130/127617,198610/382851,],
//     [-398/42539,  631/6077,-7540/127617, -6260/127617,  -3130/42539,],
// ];

// const BASE_STATUS = [20, 20, 20, 20, 20, 100, 100];


// const RAND_BP = 0.2;

// const status2BP = status => {
//     const BP = [];
//     for (let i = 0; i < STATUS_TO_BP_MATRIX.length; i++){
//         let singleBP = 0;
//         let row = STATUS_TO_BP_MATRIX[i];
//         for (let j = 0; j < row.length; j++){
//             singleBP += (status[j]-BASE_STATUS[j])*row[j];
//         }
//         BP.push(singleBP);
//     }
//     return BP;
// }

// const BP2status = BP => {
//     const Status = [];
//     for (let i = 0; i < BP_TO_STATUS_MATRIX.length; i++){
//         let singleStatus = BASE_STATUS[i];
//         let row = BP_TO_STATUS_MATRIX[i];
//         for (let j = 0; j < row.length; j++){
//             singleStatus += BP[j]*row[j];
//         }
//         Status.push(singleStatus);
//     }
//     return Status;
// }

// const getIntInput = name => parseInt(document.getElementById(name).value, 10);


// const calClass = () => {
//     const level = getIntInput("level");
//     const max_vit = getIntInput("max_vit");
//     const max_pow = getIntInput("max_pow");
//     const max_str = getIntInput("max_str");
//     const max_qui = getIntInput("max_qui");
//     const max_mag = getIntInput("max_mag");
//     const rand_vit = getIntInput("rand_vit");
//     const rand_pow = getIntInput("rand_pow");
//     const rand_str = getIntInput("rand_str");
//     const rand_qui = getIntInput("rand_qui");
//     const rand_mag = getIntInput("rand_mag");
//     const multiplier = getIntInput("multiplier");
//     let maxSet = [max_vit, max_pow, max_str, max_qui, max_mag];
//     let randSet = [rand_vit, rand_pow, rand_str, rand_qui, rand_mag];
//     let allSet = [];

//     let allPossibilities = [];
//     for (let i = 0; i < 5; i++){
//         let check = maxSet[i];
//         let checkResult = Array(5).fill(0);
//         for (let drop = 0; drop < 5; drop++){
//             if (check <= drop){
//                 break;
//             }
//             checkResult[drop] = (level === 1) ? 
//                 (check-drop+randSet[i])*multiplier/100 :
//                 GROW_VALUE[check-drop]*level;
//         }
//         allPossibilities.push(checkResult);
//     }
//     console.log(allPossibilities);
// }


// let cal_btn = document.getElementById("cal");
// cal_btn.onclick = calClass;
