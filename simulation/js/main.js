'use strict';
import { isFilledHA, isFilledFA, isValidHA, isValidFA, printObsTableHA, printObsTableFA } from "./validator.js";

window.ValidateCode = ValidateCode;
window.refreshWorkingArea = refreshWorkingArea;
window.display = display;

function enableDragSort(listClass) {
    const sortableLists = document.getElementsByClassName(listClass);
    Array.prototype.map.call(sortableLists, (list) => { enableDragList(list) });

    // Shuffle boxes randomly
    Array.prototype.map.call(sortableLists, (list) => {
        const boxes = Array.from(list.children);
        shuffleArray(boxes);
        boxes.forEach((box) => list.appendChild(box));
    });
}

export function refreshWorkingArea() {
    enableDragSort('drag-sort-enable');
    refreshObservations();
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function enableDragList(list) {
    Array.prototype.map.call(list.children, (item) => { enableDragItem(item) });
}

export function enableDragItem(item) {
    item.setAttribute('draggable', true)
    item.ondrag = handleDrag;
    item.ondragend = handleDrop;
}

export function handleDrag(event) {
    const selectedItem = event.target,
        list = selectedItem.parentNode,
        x = event.clientX,
        y = event.clientY;

    selectedItem.classList.add('drag-sort-active');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

    if (list === swapItem.parentNode) {
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        list.insertBefore(selectedItem, swapItem);
    }
}

export function handleDrop(item) {
    item.target.classList.remove('drag-sort-active');
    const boxOrder1 = getBoxOrder('module');
    const boxOrder2 = getBoxOrder('tb');
    console.log('List 1 order:', boxOrder1);
    console.log('List 2 order:', boxOrder2);
}

export function getBoxOrder(listId) {
    const list = document.getElementById(listId);
    const boxOrder = Array.from(list.children).map((item) => item.id);
    return boxOrder;
}

export function refreshObservations() {
    document.getElementById('table-head').innerHTML = "";
    document.getElementById('table-body').innerHTML = "";
    document.getElementById('result').innerHTML = "";
}

export function ValidateCode() {
    refreshObservations();
    if (selectedTab === 0) {
        if (isFilledHA()) {
            refreshObservations();
            if (isValidHA()) {
                refreshObservations();
                // print success/failure message and truth table

                let head = `<tr><th>Time</th><th>A</th><th>B</th><th>Sum Expected</th><th>Carry Expected</th><th>Sum Observed</th><th>Carry Observed</th>`;
                document.getElementById('table-head').innerHTML = head;

                printObsTableHA();
                return;
            }
        }
    }
    else {
        if (isFilledFA()) {
            refreshObservations();
            if (isValidFA()) {
                refreshObservations();
                // print success/failure message and truth table
                let head = `<tr><th>Time</th><th>A</th><th>B</th><th>Cin</th><th>Sum Expected</th><th>Carry Expected</th><th>Sum Observed</th><th>Carry Observed</th>`;
                document.getElementById('table-head').innerHTML = head;
                printObsTableFA();
                return;
            }
        }
    }
}

export function display() {
    if (selectedTab === 1) {
        var selectElements = document.getElementsByClassName('select-Cin');
        for (var i = 0; i < selectElements.length; i++) {
            var selectElement = selectElements[i];

            // Check if "Cin" option already exists in the select element
            var cinOption = selectElement.querySelector('option[value="Cin"]');

            if (!cinOption) {
                // Create the "Cin" option
                cinOption = document.createElement('option');
                cinOption.value = "Cin";
                cinOption.text = "Cin";

                // Add the "Cin" option to the select element
                selectElement.add(cinOption);
            }
        }
        document.getElementById("input-declare-Cin").innerHTML = `<p>&nbsp;&nbsp;input&nbsp;
        <select id="inputCin-selector">
            <option value="" disabled selected>Select an input</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option> 
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
        </select>
    </p> ` ;
        document.getElementById("function").innerHTML = `&nbsp;wire c,c1,s;<br>
        <span class="comment">&nbsp;// In a half adder module, the order of module instantiation is: input1, input2, sum, carry and module name is "half_adder"</span>
        <br>
        &nbsp;half_adder ha0(
        <select id="arg1-ha0">
            <option value="" disabled selected>Select argument</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
            <option value="c">c</option>
            <option value="c1">c1</option>
            <option value="s">s</option>
        </select> , 
        <select id="arg2-ha0">
            <option value="" disabled selected>Select argument</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
            <option value="c">c</option>
            <option value="c1">c1</option>
            <option value="s">s</option>
        </select> , 
        <select id="arg3-ha0">
            <option value="" disabled selected>Select argument</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
            <option value="c">c</option>
            <option value="c1">c1</option>
            <option value="s">s</option>
        </select>, 
        <select id="arg4-ha0">
            <option value="" disabled selected>Select argument</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
            <option value="c">c</option>
            <option value="c1">c1</option>
            <option value="s">s</option>
        </select> );<br>
        &nbsp;half_adder ha1(
        <select id="arg1-ha1">
            <option value="" disabled selected>Select argument</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
            <option value="c">c</option>
            <option value="c1">c1</option>
            <option value="s">s</option>
        </select> , 
        <select id="arg2-ha1">
            <option value="" disabled selected>Select argument</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
            <option value="c">c</option>
            <option value="c1">c1</option>
            <option value="s">s</option>
        </select> , 
        <select id="arg3-ha1">
            <option value="" disabled selected>Select argument</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
            <option value="c">c</option>
            <option value="c1">c1</option>
            <option value="s">s</option>
        </select>, 
        <select id="arg4-ha1">
            <option value="" disabled selected>Select argument</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
            <option value="c">c</option>
            <option value="c1">c1</option>
            <option value="s">s</option>
        </select> );<br>
        &nbsp;assign <select id="LHS-selector">
            <option value="" disabled selected>Select LHS</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
            <option value="c">c</option>
            <option value="c1">c1</option>
            <option value="s">s</option>
        </select>
        &nbsp;
            <select id="operator-selector">
                <option value="" disabled selected>Select Operator</option>
                <option value="=">=</option>
                <option value="<=">
                    <= </option>
            </select>
            &nbsp;
            <select id="left-selector">
                                    <option value="" disabled selected>Select LHS</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="Cin">Cin</option>
                                    <option value="Sum">Sum</option>
                                    <option value="Carry">Carry</option>
                                    <option value="c">c</option>
                                    <option value="c1">c1</option>
                                    <option value="s">s</option>
                                </select>
                                &nbsp;
                                    <select id="middle-selector">
                                        <option value="" disabled selected>Select Operator</option>
                                        <option value="|">|</option>
                                        <option value="&">&</option>
                                        <option value="^">^</option>
                                    </select>
                                    &nbsp;
                                    <select id="right-selector">
                                    <option value="" disabled selected>Select LHS</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="Cin">Cin</option>
                                    <option value="Sum">Sum</option>
                                    <option value="Carry">Carry</option>
                                    <option value="c">c</option>
                                    <option value="c1">c1</option>
                                    <option value="s">s</option>
                                </select>
                                &nbsp;; `;
        document.getElementById("tb-Cin-declare").innerHTML = `<p>&nbsp;&nbsp;reg
            <select id="inputCinTB-selector">
                <option value="" disabled selected>Select an input/output</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="Cin">Cin</option>
                <option value="Sum">Sum</option>
                <option value="Carry">Carry</option>
            </select> ;
        </p>`;
        document.getElementById("tb-module-Cin").innerHTML = `<p>&nbsp;&nbsp;&nbsp;&nbsp;
        <select id="argumentCin-selector">
            <option value="" disabled selected>Select an Argument</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Cin">Cin</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
        </select> ,
    </p>`;
        document.getElementById("input-wave").innerHTML = `<p>
            &nbsp;&nbsp;&nbsp;&nbsp;a = 0; b = 0; cin = 0;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
            &nbsp;&nbsp;&nbsp;&nbsp;a = 0; b = 0; cin = 1;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
            &nbsp;&nbsp;&nbsp;&nbsp;a = 0; b = 1; cin = 0;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
            &nbsp;&nbsp;&nbsp;&nbsp;a = 0; b = 1; cin = 1;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
            &nbsp;&nbsp;&nbsp;&nbsp;a = 1; b = 0; cin = 0;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
            &nbsp;&nbsp;&nbsp;&nbsp;a = 1; b = 0; cin = 1;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
            &nbsp;&nbsp;&nbsp;&nbsp;a = 1; b = 1; cin = 0;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
            &nbsp;&nbsp;&nbsp;&nbsp;a = 1; b = 1; cin = 1;<br>
        </p>`;

    }
    else {
        var selectElements = document.getElementsByClassName('select-Cin');
        for (var i = 0; i < selectElements.length; i++) {
            var selectElement = selectElements[i];

            // Check if "Cin" option already exists in the select element

            var cinOption = selectElement.querySelector('option[value="Cin"]');
            if (cinOption) {
                // Remove the "Cin" option
                selectElement.remove(cinOption.index);
            }
        }
        document.getElementById("input-declare-Cin").innerHTML = "";
        document.getElementById("function").innerHTML = `<p>
        &nbsp; assign&nbsp;
        <select id="LHS1-selector">
            <option value="" disabled selected>Select LHS</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
        </select>
        &nbsp;
        <select id="operator1-selector">
            <option value="" disabled selected>Select Assignment Operator</option>
            <option value="=">=</option>
            <option value="<=">
                <= </option>
        </select>
        &nbsp;
        <input type="text" id="logic-expression1"
            placeholder="Enter the RHS logic expression">
        &nbsp;
        ;
    </p>
    <p>
        &nbsp; assign&nbsp;
        <select id="LHS2-selector">
            <option value="" disabled selected>Select LHS</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Sum">Sum</option>
            <option value="Carry">Carry</option>
        </select>
        &nbsp;
        <select id="operator2-selector">
            <option value="" disabled selected>Select Operator</option>
            <option value="=">=</option>
            <option value="<=">
                <= </option>
        </select>
        &nbsp;
        <input type="text" id="logic-expression2"
            placeholder="Enter the RHS logic expression">
        &nbsp;
        ;
    </p>`;
        document.getElementById("tb-Cin-declare").innerHTML = "";
        document.getElementById("tb-module-Cin").innerHTML = "";
        document.getElementById("input-wave").innerHTML = `<p>
    &nbsp;&nbsp;&nbsp;&nbsp;A = 0;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;B = 0;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
    &nbsp;&nbsp;&nbsp;&nbsp;A = 0;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;B = 1;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
    &nbsp;&nbsp;&nbsp;&nbsp;A = 1;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;B = 0;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;#1<br>
    &nbsp;&nbsp;&nbsp;&nbsp;A = 1;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;B = 1;<br>
</p>`;
    }
}
(() => { display() })();
(() => { refreshWorkingArea() })();


