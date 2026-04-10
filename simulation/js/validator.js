import { getBoxOrder } from "./main.js";
export function isFilledHA() {
    // checking verilog module
    let moduleName = document.getElementById("module-name");
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let output1 = document.getElementById("output1-selector");
    let output2 = document.getElementById("output2-selector");
    let LHS1 = document.getElementById("LHS1-selector");
    let operator1 = document.getElementById("operator1-selector");
    let RHS1 = document.getElementById("logic-expression1");
    let LHS2 = document.getElementById("LHS2-selector");
    let operator2 = document.getElementById("operator2-selector");
    let RHS2 = document.getElementById("logic-expression2");
    let error = "Highlighted part of the code is incomplete."
    if (moduleName.value.trim() == '') {
        printErrors(error, moduleName);
        return false;
    }
    if (input1.value === "") {
        printErrors(error, input1);
        return false;
    }
    if (input2.value === "") {
        printErrors(error, input2);
        return false;
    }
    if (output1.value === "") {
        printErrors(error, output1);
        return false;
    }
    if (output2.value === "") {
        printErrors(error, output2);
        return false;
    }
    if (LHS1.value === "") {
        printErrors(error, LHS1);
        return false;
    }
    if (operator1.value === "") {
        printErrors(error, operator1);
        return false;
    }
    if (RHS1.value.trim() === "") {
        printErrors(error, RHS1);
        return false;
    }
    if (LHS2.value === "") {
        printErrors(error, LHS2);
        return false;
    }
    if (operator2.value === "") {
        printErrors(error, operator2);
        return false;
    }
    if (RHS2.value.trim() === "") {
        printErrors(error, RHS2);
        return false;
    }


    // checking verilog testbench
    let tbName = document.getElementById("tb-name");
    let input1TB = document.getElementById("input1TB-selector");
    let input2TB = document.getElementById("input2TB-selector");
    let input3TB = document.getElementById("input3TB-selector");
    let input4TB = document.getElementById("input4TB-selector");
    let moduleNameTB = document.getElementById("module-name-tb");
    let arg1 = document.getElementById("argument1-selector");
    let arg2 = document.getElementById("argument2-selector");
    let arg3 = document.getElementById("argument3-selector");
    let arg4 = document.getElementById("argument4-selector");
    if (tbName.value.trim() == '') {
        printErrors(error, tbName);
        return false;
    }
    if (input1TB.value === "") {
        printErrors(error, input1TB);
        return false;
    }
    if (input2TB.value === "") {
        printErrors(error, input2TB);
        return false;
    }
    if (input3TB.value === "") {
        printErrors(error, input3TB);
        return false;
    }
    if (input4TB.value === "") {
        printErrors(error, input4TB);
        return false;
    }
    if (moduleNameTB.value.trim() == '') {
        printErrors(error, moduleNameTB);
        return false;
    }
    if (arg1.value === "") {
        printErrors(error, arg1);
        return false;
    }
    if (arg2.value === "") {
        printErrors(error, arg2);
        return false;
    }
    if (arg3.value === "") {
        printErrors(error, arg3);
        return false;
    }
    if (arg4.value === "") {
        printErrors(error, arg4);
        return false;
    }
    return true;
}

export function printErrors(errorMsg, errorID) {
    document.getElementById('result').innerHTML = errorMsg;
    document.getElementById('result').classList.remove('text-success');
    document.getElementById('result').classList.add('text-danger');
    if (errorID) {
        errorID.classList.add('highlight');
        setTimeout(function () {
            errorID.classList.remove('highlight');
        }, 3000);
    }
}

export function isValidHA() {

    // checking the order of the codeblocks
    const boxOrder1 = getBoxOrder('module');
    const boxOrder2 = getBoxOrder('tb');
    let container = document.getElementById("container");
    let containerTB = document.getElementById("containerTB");
    if (boxOrder1[0] !== "1" || boxOrder1[1] !== "2" || boxOrder1[2] !== "3") {
        let msg = "Please rearrange the code blocks of the Verilog Module in the correct order."
        printErrors(msg, container);
        return false;
    }
    if (boxOrder2[0] !== "1TB" || boxOrder2[1] !== "2TB" || boxOrder2[2] !== "3TB" || boxOrder2[3] !== "4TB" || boxOrder2[4] !== "5TB") {
        let msg = "Please rearrange the code blocks of the Verilog Testbench in the correct order."
        printErrors(msg, containerTB);
        return false;
    }


    // Checking if the module and testbench names are valid
    let tbName = document.getElementById("tb-name");
    let moduleNameTB = document.getElementById("module-name-tb");
    let moduleName = document.getElementById("module-name");
    var regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!regex.test(moduleName.value.trim())) {
        let msg = "Invalid Module Name.";
        printErrors(msg, moduleName);
        return false;
    }
    if (!regex.test(moduleNameTB.value.trim())) {
        let msg = "Invalid Module Name.";
        printErrors(msg, moduleNameTB);
        return false;
    }
    if (!regex.test(tbName.value.trim())) {
        let msg = "Invalid Testbench Name."
        printErrors(msg, tbName);
        return false;
    }

    // checking if module name matches in both code and tb
    if (moduleName.value.trim() !== moduleNameTB.value.trim()) {
        let msg = "There is no verilog module defined with the name " + moduleNameTB.value.trim();
        printErrors(msg, moduleNameTB);
        return false;
    }

    // checking if module name is not equal to the temporary function name used to call the module in the testbench
    if (moduleNameTB.value.trim() === "uut") {
        let msg = "The name of the module instantiated and the temporary function name (uut) used to instantiate the module in the testbench cannot be the same.";
        printErrors(msg, moduleNameTB);
        return false;
    }

    // checking the input and output argument declaration in the module
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let output1 = document.getElementById("output1-selector");
    let output2 = document.getElementById("output2-selector");
    if (input1.value === input2.value || input1.value === output1.value || input1.value === output2.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input1);
        return false;
    }
    if (input2.value === output1.value || input2.value === output2.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input2);
        return false;
    }
    if (output1.value === output2.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, output1);
        return false;
    }

    // checking assign block
    let LHS1 = document.getElementById("LHS1-selector");
    let operator1 = document.getElementById("operator1-selector");
    let RHS1 = document.getElementById("logic-expression1");
    let LHS2 = document.getElementById("LHS2-selector");
    let operator2 = document.getElementById("operator2-selector");
    let RHS2 = document.getElementById("logic-expression2");

    if (LHS1.value === input1.value || LHS1.value === input2.value) {
        let msg = 'Inputs of a verilog module cannot be assigned values directly within the module itself.'
        printErrors(msg, LHS1);
        return false;
    }
    if (LHS1.value === RHS1.value.trim()) {
        let msg = 'Highlighted part represents self-assignment which is invalid in procedural blocks.'
        printErrors(msg, RHS1);
        return false;
    }
    if (operator1.value === "<=") {
        let msg = "This operator is incorrect for a combinational behaviour.";
        printErrors(msg, operator1);
        return false;
    }
    if (LHS2.value === input1.value || LHS2.value === input2.value) {
        let msg = 'Inputs of a verilog module cannot be assigned values directly within the module itself.'
        printErrors(msg, LHS2);
        return false;
    }
    if (LHS2.value === RHS2.value.trim()) {
        let msg = 'Highlighted part represents self-assignment which is invalid in procedural blocks.'
        printErrors(msg, RHS2);
        return false;
    }
    if (operator2.value === "<=") {
        let msg = "This operator is incorrect for a combinational behaviour.";
        printErrors(msg, operator2);
        return false;
    }
    if (LHS1.value == LHS2.value) {
        let msg = "The highlighted part hasalready been assigned a value before";
        printErrors(msg, LHS2);
        return false;
    }

    let rhs = RHS1.value.trim();
    if (rhs.replace(/[()\s]/g, '') !== input1.value + '^' + input2.value && rhs.replace(/[()\s]/g, '') !== input2.value + '^' + input1.value && rhs.replace(/[()\s]/g, '') !== input1.value + '&' + input2.value && rhs.replace(/[()\s]/g, '') !== input2.value + '&' + input1.value) {
        let msg = 'Highlighted code part is incorrect.'
        printErrors(msg, RHS1);
        return false;
    }
    rhs = RHS2.value.trim();
    if (rhs.replace(/[()\s]/g, '') !== input1.value + '^' + input2.value && rhs.replace(/[()\s]/g, '') !== input2.value + '^' + input1.value && rhs.replace(/[()\s]/g, '') !== input1.value + '&' + input2.value && rhs.replace(/[()\s]/g, '') !== input2.value + '&' + input1.value) {
        let msg = 'Highlighted code part is incorrect.'
        printErrors(msg, RHS2);
        return false;
    }

    // checking i/o and function call arguments in test bench
    let input1TB = document.getElementById("input1TB-selector");
    let input2TB = document.getElementById("input2TB-selector");
    let input3TB = document.getElementById("input3TB-selector");
    let input4TB = document.getElementById("input4TB-selector");
    if (input1TB.value === input2TB.value || input1TB.value === input3TB.value || input1TB.value === input4TB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input1TB);
        return false;
    }
    if (input2TB.value === input3TB.value || input2TB.value === input4TB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input2TB);
        return false;
    }
    if (input3TB.value === input4TB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input3TB);
        return false;
    }
    if (input3TB.value === "A" || input3TB.value === "B") {
        let msg = 'Highlighted code part is incorrect.'
        printErrors(msg, input3TB);
        return false;
    }
    if (input4TB.value === "A" || input4TB.value === "B") {
        let msg = 'Highlighted code part is incorrect.'
        printErrors(msg, input4TB);
        return false;
    }
    let arg1 = document.getElementById("argument1-selector");
    let arg2 = document.getElementById("argument2-selector");
    let arg3 = document.getElementById("argument3-selector");
    let arg4 = document.getElementById("argument4-selector");
    if (arg3.value === "A" || arg3.value === "B") {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg3);
        return false;
    }
    if (arg4.value === "A" || arg4.value === "B") {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg4);
        return false;
    }
    if (arg1.value === "Sum" || arg1.value === "Carry") {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, arg1);
        return false;
    }
    if (arg2.value === "Sum" || arg2.value === "Carry") {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, arg2);
        return false;
    }
    return true;
}

export function printObsTableHA() {
    let arg1 = document.getElementById("argument1-selector").value;
    let arg2 = document.getElementById("argument2-selector").value;
    let arg3 = document.getElementById("argument3-selector");
    let Lhs1 = document.getElementById("LHS1-selector");
    let RHS1 = document.getElementById("logic-expression1");
    let arg4 = document.getElementById("argument4-selector");
    let Lhs2 = document.getElementById("LHS2-selector");
    let RHS2 = document.getElementById("logic-expression2");
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let output1 = document.getElementById("output1-selector");
    let output2 = document.getElementById("output2-selector");
    let arr = { "A": [0, 0, 1, 1], "B": [0, 1, 0, 1], "Sum": [0, 1, 1, 0], "Carry": [0, 0, 0, 1] };
    let body = "";
    let isCorrect = true;
    for (let i = 0; i < 4; ++i) {
        let ha={};
        ha[input1.value] = arr[arg1][i];
        ha[input2.value] = arr[arg2][i];
        ha[output1] = "x";
        ha[output2] = "x";
        let rhs = RHS1.value.replace(/[()\s]/g, '');
        if (rhs === input1.value + '^' + input2.value || rhs === input2.value + '^' + input1.value)
            ha[Lhs1.value] = +(arr[arg1][i] ^ arr[arg2][i]);
        else
            ha[Lhs1.value] = +(arr[arg1][i] && arr[arg2][i]);
        rhs = RHS2.value.replace(/[()\s]/g, '');
        if (rhs === input1.value + '^' + input2.value || rhs === input2.value + '^' + input1.value)
            ha[Lhs2.value] = +(arr[arg1][i] ^ arr[arg2][i]);
        else
            ha[Lhs2.value] = +(arr[arg1][i] && arr[arg2][i]);
        let tb = {};
        tb[arg3.value] = ha[output1.value];
        tb[arg4.value] = ha[output2.value];
        if (tb["Sum"] !== arr["Sum"][i] && tb["Carry"] !== arr["Carry"][i]) {
            isCorrect = false;
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><td class="failure-table"> ${arr["Sum"][i]} </td><td class="failure-table"> ${arr["Carry"][i]} </td><td class="failure-table"> ${tb["Sum"]}</td><td class="failure-table"> ${tb["Carry"]}</td>`;
        }
        else if (tb["Sum"] !== arr["Sum"][i] && tb["Carry"] === arr["Carry"][i]) {
            isCorrect = false;
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><td class="failure-table"> ${arr["Sum"][i]} </td><td class="success-table"> ${arr["Carry"][i]}</td><td class="failure-table"> ${tb["Sum"]}</td><td class="success-table"> ${tb["Carry"]}</td>`;
        }
        else if (tb["Sum"] === arr["Sum"][i] && tb["Carry"] !== arr["Carry"][i]) {
            isCorrect = false;
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><td class="success-table"> ${arr["Sum"][i]} </td><td class="failure-table"> ${arr["Carry"][i]}</td><td class="success-table"> ${tb["Sum"]}</td><td class="failure-table"> ${tb["Carry"]}</td>`;
        }
        else {
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><td class="success-table"> ${arr["Sum"][i]} </td><td class="success-table"> ${arr["Carry"][i]}</td><td class="success-table"> ${tb["Sum"]}</td><td class="success-table"> ${tb["Carry"]}</td>`;
        }
    }
    document.getElementById("table-body").innerHTML = body;
    if (isCorrect) {
        document.getElementById("result").innerHTML = "<span>&#10003;</span> Success"
        document.getElementById("result").className = "text-success";
    }
    else {
        document.getElementById("result").innerHTML = "<span>&#10007;</span> Fail";
        document.getElementById("result").className = "text-danger";
    }
    return;
}

export function isFilledFA() {
    // checking verilog module
    let moduleName = document.getElementById("module-name");
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let input3 = document.getElementById("inputCin-selector");
    let output1 = document.getElementById("output1-selector");
    let output2 = document.getElementById("output2-selector");
    let arg1_ha0 = document.getElementById("arg1-ha0");
    let arg2_ha0 = document.getElementById("arg2-ha0");
    let arg3_ha0 = document.getElementById("arg3-ha0");
    let arg4_ha0 = document.getElementById("arg4-ha0");
    let arg1_ha1 = document.getElementById("arg1-ha1");
    let arg2_ha1 = document.getElementById("arg2-ha1");
    let arg3_ha1 = document.getElementById("arg3-ha1");
    let arg4_ha1 = document.getElementById("arg4-ha1");
    let LHS = document.getElementById("LHS-selector");
    let operator = document.getElementById("operator-selector");
    let left = document.getElementById("left-selector");
    let middle = document.getElementById("middle-selector");
    let right = document.getElementById("right-selector");
    let error = "Highlighted part of the code is incomplete."
    if (moduleName.value.trim() == '') {
        printErrors(error, moduleName);
        return false;
    }
    if (input1.value === "") {
        printErrors(error, input1);
        return false;
    }
    if (input2.value === "") {
        printErrors(error, input2);
        return false;
    }
    if (input3.value === "") {
        printErrors(error, input3);
        return false;
    }
    if (output1.value === "") {
        printErrors(error, output1);
        return false;
    }
    if (output2.value === "") {
        printErrors(error, output2);
        return false;
    }
    if (LHS.value === "") {
        printErrors(error, LHS);
        return false;
    }
    if (operator.value === "") {
        printErrors(error, operator);
        return false;
    }
    if (left.value === "") {
        printErrors(error, left);
        return false;
    }
    if (middle.value === "") {
        printErrors(error, middle);
        return false;
    }
    if (right.value === "") {
        printErrors(error, right);
        return false;
    }
    if (arg1_ha0.value === "") {
        printErrors(error, arg1_ha0);
        return false;
    }
    if (arg2_ha0.value === "") {
        printErrors(error, arg2_ha0);
        return false;
    }
    if (arg3_ha0.value === "") {
        printErrors(error, arg3_ha0);
        return false;
    }
    if (arg4_ha0.value === "") {
        printErrors(error, arg4_ha0);
        return false;
    }
    if (arg1_ha1.value === "") {
        printErrors(error, arg1_ha1);
        return false;
    }
    if (arg2_ha1.value === "") {
        printErrors(error, arg2_ha1);
        return false;
    }
    if (arg3_ha1.value === "") {
        printErrors(error, arg3_ha1);
        return false;
    }
    if (arg4_ha1.value === "") {
        printErrors(error, arg4_ha1);
        return false;
    }


    // checking verilog testbench
    let tbName = document.getElementById("tb-name");
    let input1TB = document.getElementById("input1TB-selector");
    let input2TB = document.getElementById("input2TB-selector");
    let inputCinTB = document.getElementById("inputCinTB-selector");
    let input3TB = document.getElementById("input3TB-selector");
    let input4TB = document.getElementById("input4TB-selector");
    let moduleNameTB = document.getElementById("module-name-tb");
    let arg1 = document.getElementById("argument1-selector");
    let arg2 = document.getElementById("argument2-selector");
    let argCin = document.getElementById("argumentCin-selector");
    let arg3 = document.getElementById("argument3-selector");
    let arg4 = document.getElementById("argument4-selector");
    if (tbName.value.trim() == '') {
        printErrors(error, tbName);
        return false;
    }
    if (input1TB.value === "") {
        printErrors(error, input1TB);
        return false;
    }
    if (input2TB.value === "") {
        printErrors(error, input2TB);
        return false;
    }
    if (inputCinTB.value === "") {
        printErrors(error, inputCinTB);
        return false;
    }
    if (input3TB.value === "") {
        printErrors(error, input3TB);
        return false;
    }
    if (input4TB.value === "") {
        printErrors(error, input4TB);
        return false;
    }
    if (moduleNameTB.value.trim() == '') {
        printErrors(error, moduleNameTB);
        return false;
    }
    if (arg1.value === "") {
        printErrors(error, arg1);
        return false;
    }
    if (arg2.value === "") {
        printErrors(error, arg2);
        return false;
    }
    if (argCin.value === "") {
        printErrors(error, argCin);
        return false;
    }
    if (arg3.value === "") {
        printErrors(error, arg3);
        return false;
    }
    if (arg4.value === "") {
        printErrors(error, arg4);
        return false;
    }
    return true;
}


export function isValidFA() {

    // checking the order of the codeblocks
    const boxOrder1 = getBoxOrder('module');
    const boxOrder2 = getBoxOrder('tb');
    let container = document.getElementById("container");
    let containerTB = document.getElementById("containerTB");
    if (boxOrder1[0] !== "1" || boxOrder1[1] !== "2" || boxOrder1[2] !== "3") {
        let msg = "Please rearrange the code blocks of the Verilog Module in the correct order."
        printErrors(msg, container);
        return false;
    }
    if (boxOrder2[0] !== "1TB" || boxOrder2[1] !== "2TB" || boxOrder2[2] !== "3TB" || boxOrder2[3] !== "4TB" || boxOrder2[4] !== "5TB") {
        let msg = "Please rearrange the code blocks of the Verilog Testbench in the correct order."
        printErrors(msg, containerTB);
        return false;
    }


    // Checking if the module and testbench names are valid
    let tbName = document.getElementById("tb-name");
    let moduleNameTB = document.getElementById("module-name-tb");
    let moduleName = document.getElementById("module-name");
    var regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!regex.test(moduleName.value.trim())) {
        let msg = "Invalid Module Name.";
        printErrors(msg, moduleName);
        return false;
    }
    if (!regex.test(moduleNameTB.value.trim())) {
        let msg = "Invalid Module Name.";
        printErrors(msg, moduleNameTB);
        return false;
    }
    if (!regex.test(tbName.value.trim())) {
        let msg = "Invalid Testbench Name."
        printErrors(msg, tbName);
        return false;
    }

    // checking if module name matches in both code and tb
    if (moduleName.value.trim() !== moduleNameTB.value.trim()) {
        let msg = "There is no verilog module defined with the name " + moduleNameTB.value.trim();
        printErrors(msg, moduleNameTB);
        return false;
    }

    // checking if module name is not equal to the temporary function name used to call the module in the testbench
    if (moduleNameTB.value.trim() === "uut") {
        let msg = "The name of the module instantiated and the temporary function name (uut) used to instantiate the module in the testbench cannot be the same.";
        printErrors(msg, moduleNameTB);
        return false;
    }

    // checking the input and output argument declaration in the module
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let input3 = document.getElementById("inputCin-selector");
    let output1 = document.getElementById("output1-selector");
    let output2 = document.getElementById("output2-selector");
    if (input1.value === input2.value || input1.value === output1.value || input1.value === output2.value || input1.value === input3.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input1);
        return false;
    }
    if (input2.value === output1.value || input2.value === output2.value || input2.value === input3.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input2);
        return false;
    }
    if (output1.value === output2.value || output1.value === input3.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, output1);
        return false;
    }
    if (output2.value === input3.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, output2);
        return false;
    }

    // checking module calling and assign block
    let arg1_ha0 = document.getElementById("arg1-ha0");
    let arg2_ha0 = document.getElementById("arg2-ha0");
    let arg3_ha0 = document.getElementById("arg3-ha0");
    let arg4_ha0 = document.getElementById("arg4-ha0");
    let arg1_ha1 = document.getElementById("arg1-ha1");
    let arg2_ha1 = document.getElementById("arg2-ha1");
    let arg3_ha1 = document.getElementById("arg3-ha1");
    let arg4_ha1 = document.getElementById("arg4-ha1");
    let LHS = document.getElementById("LHS-selector");
    let operator = document.getElementById("operator-selector");
    let arg1 = document.getElementById("argument1-selector");
    let arg2 = document.getElementById("argument2-selector");
    let argCin = document.getElementById("argumentCin-selector");
    let arg3 = document.getElementById("argument3-selector");
    let arg4 = document.getElementById("argument4-selector");

    if (arg3_ha0.value === input1.value || arg3_ha0.value === input2.value) {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg3_ha0);
        return false;
    }
    if (arg4_ha0.value === input1.value || arg4_ha0.value === input2.value) {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg4_ha0);
        return false;
    }
    if (arg4_ha1.value === input1.value || arg4_ha1.value === input2.value) {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg4_ha1);
        return false;
    }
    if (arg3_ha1.value === input1.value || arg3_ha1.value === input2.value) {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg3_ha1);
        return false;
    }


    if (LHS.value === input1.value || LHS.value === input2.value || LHS.value === input3.value) {
        let msg = 'Inputs of a verilog module cannot be assigned values directly within the module itself.'
        printErrors(msg, LHS);
        return false;
    }
    if (operator.value === "<=") {
        let msg = "This operator is incorrect for a combinational behaviour.";
        printErrors(msg, operator);
        return false;
    }
    // checking i/o and function call arguments in test bench
    let input1TB = document.getElementById("input1TB-selector");
    let input2TB = document.getElementById("input2TB-selector");
    let input3TB = document.getElementById("input3TB-selector");
    let inputCinTB = document.getElementById("inputCinTB-selector");
    let input4TB = document.getElementById("input4TB-selector");
    if (input1TB.value === input2TB.value || input1TB.value === input3TB.value || input1TB.value === input4TB.value || input1TB.value === inputCinTB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input1TB);
        return false;
    }
    if (input2TB.value === input3TB.value || input2TB.value === input4TB.value || input2TB.value === inputCinTB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input2TB);
        return false;
    }
    if (input3TB.value === input4TB.value || input3TB.value === inputCinTB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input3TB);
        return false;
    }
    if (input4TB.value === inputCinTB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input4TB);
        return false;
    }
    if (input3TB.value === "A" || input3TB.value === "B" || input3TB.value === "Cin") {
        let msg = 'Highlighted code part is incorrect.'
        printErrors(msg, input3TB);
        return false;
    }
    if (input4TB.value === "A" || input4TB.value === "B" || input4TB.value === "Cin") {
        let msg = 'Highlighted code part is incorrect.'
        printErrors(msg, input4TB);
        return false;
    }
    if (arg3.value === "A" || arg3.value === "B" || arg3.value === "Cin") {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg3);
        return false;
    }
    if (arg4.value === "A" || arg4.value === "B" || arg4.value === "Cin") {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg4);
        return false;
    }
    if (arg1.value === "Sum" || arg1.value === "Carry") {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, arg1);
        return false;
    }
    if (arg2.value === "Sum" || arg2.value === "Carry") {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, arg2);
        return false;
    }
    if (argCin.value === "Sum" || argCin.value === "Carry") {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, argCin);
        return false;
    }
    return true;
}

export function printObsTableFA() {
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let input3 = document.getElementById("inputCin-selector");
    let output1 = document.getElementById("output1-selector");
    let output2 = document.getElementById("output2-selector");
    let arg1_ha0 = document.getElementById("arg1-ha0");
    let arg2_ha0 = document.getElementById("arg2-ha0");
    let arg3_ha0 = document.getElementById("arg3-ha0");
    let arg4_ha0 = document.getElementById("arg4-ha0");
    let arg1_ha1 = document.getElementById("arg1-ha1");
    let arg2_ha1 = document.getElementById("arg2-ha1");
    let arg3_ha1 = document.getElementById("arg3-ha1");
    let arg4_ha1 = document.getElementById("arg4-ha1");
    let LHS = document.getElementById("LHS-selector");
    let arg1 = document.getElementById("argument1-selector");
    let arg2 = document.getElementById("argument2-selector");
    let argCin = document.getElementById("argumentCin-selector");
    let arg3 = document.getElementById("argument3-selector");
    let arg4 = document.getElementById("argument4-selector");
    let left = document.getElementById("left-selector");
    let middle = document.getElementById("middle-selector");
    let right = document.getElementById("right-selector");

    let arr = { "A": [0, 0, 0, 0, 1, 1, 1, 1], "B": [0, 0, 1, 1, 0, 0, 1, 1], "Cin": [0, 1, 0, 1, 0, 1, 0, 1], "Sum": [0, 1, 1, 0, 1, 0, 0, 1], "Carry": [0, 0, 0, 1, 0, 1, 1, 1] };
    let body = "";
    let isCorrect = true;
    for (let i = 0; i < 8; ++i) {
        let fa = { "c": "x", "c1": "x", "s": "x" };
        fa[output1.value] = "x";
        fa[output2.value] = "x";
        fa[input1.value] = arr[arg1.value][i];
        fa[input2.value] = arr[arg2.value][i];
        fa[input3.value] = arr[argCin.value][i];
        // calculating arg3_ha0 and arg4_ha0

        if (fa[arg1_ha0.value] === "x" || fa[arg2_ha0.value] === "x") {
            fa[arg3_ha0.value] = "x";
            fa[arg4_ha0.value] = "x";
            if (fa[arg1_ha0.value] === 0 || fa[arg2_ha0.value] === 0)
                fa[arg4_ha0.value] = 0;
        }
        else {
            if (fa[arg1_ha0.value] === 0 || fa[arg2_ha0.value] === 0)
                fa[arg4_ha0.value] = 0;
            else
                fa[arg4_ha0.value] = 1;
            if (fa[arg1_ha0.value] === fa[arg2_ha0.value])
                fa[arg3_ha0.value] = 0;
            else
                fa[arg3_ha0.value] = 1;
        }

        // calculating arg3_ha1, arg4_ha1
        if (fa[arg1_ha1.value] === "x" || fa[arg2_ha1.value] === "x") {
            fa[arg3_ha1.value] = "x";
            fa[arg4_ha1.value] = "x";
            if (fa[arg1_ha1.value] === 0 || fa[arg2_ha1.value] === 0)
                fa[arg4_ha1.value] = 0;
        }
        else {
            if (fa[arg1_ha1.value] === 0 || fa[arg2_ha1.value] === 0)
                fa[arg4_ha1.value] = 0;
            else
                fa[arg4_ha1.value] = 1;
            if (fa[arg1_ha1.value] === fa[arg2_ha1.value])
                fa[arg3_ha1.value] = 0;
            else
                fa[arg3_ha1.value] = 1;
        }
        if (middle.value === "|") {
            if (fa[left.value] === 1 || fa[right.value] === 1)
                fa[LHS.value] = 1;
            else if (fa[left.value] === "x" || fa[right.value] === "x")
                fa[LHS.value] = "x";
            else
                fa[LHS.value] = 0;
        }
        else if (middle.value === "&") {
            if (fa[left.value] === 0 || fa[right.value] === 0)
                fa[LHS.value] = 0;
            else if (fa[left.value] === "x" || fa[right.value] === "x")
                fa[LHS.value] = "x";
            else
                fa[LHS.value] = 1;
        }
        else if (middle.value === "^") {
            if (fa[left.value] === "x" || fa[right.value] === "x")
                fa[LHS.value] = "x";
            if (fa[left.value] === fa[right.value])
                fa[LHS.value] = 0;
            else
                fa[LHS.value] = 1;
        }
        let tb = {};
        tb[arg3.value] = fa[output1.value];
        tb[arg4.value] = fa[output2.value];
        if (tb["Sum"] !== arr["Sum"][i] && tb["Carry"] !== arr["Carry"][i]) {
            isCorrect = false;
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><th>${arr["Cin"][i]} </th><td class="failure-table"> ${arr["Sum"][i]} </td><td class="failure-table"> ${arr["Carry"][i]} </td><td class="failure-table"> ${tb["Sum"]}</td><td class="failure-table"> ${tb["Carry"]}</td>`;
        }
        else if (tb["Sum"] !== arr["Sum"][i] && tb["Carry"] === arr["Carry"][i]) {
            isCorrect = false;
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><th>${arr["Cin"][i]} </th><td class="failure-table"> ${arr["Sum"][i]} </td><td class="success-table"> ${arr["Carry"][i]}</td><td class="failure-table"> ${tb["Sum"]}</td><td class="success-table"> ${tb["Carry"]}</td>`;
        }
        else if (tb["Sum"] === arr["Sum"][i] && tb["Carry"] !== arr["Carry"][i]) {
            isCorrect = false;
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><th>${arr["Cin"][i]} </th><td class="success-table"> ${arr["Sum"][i]} </td><td class="failure-table"> ${arr["Carry"][i]}</td><td class="success-table"> ${tb["Sum"]}</td><td class="failure-table"> ${tb["Carry"]}</td>`;
        }
        else {
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><th>${arr["Cin"][i]} </th><td class="success-table"> ${arr["Sum"][i]} </td><td class="success-table"> ${arr["Carry"][i]}</td><td class="success-table"> ${tb["Sum"]}</td><td class="success-table"> ${tb["Carry"]}</td>`;
        }
    }
    document.getElementById("table-body").innerHTML = body;
    if (isCorrect) {
        document.getElementById("result").innerHTML = "<span>&#10003;</span> Success"
        document.getElementById("result").className = "text-success";
    }
    else {
        document.getElementById("result").innerHTML = "<span>&#10007;</span> Fail";
        document.getElementById("result").className = "text-danger";
    }
    return;
}

