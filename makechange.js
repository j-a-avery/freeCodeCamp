const CURRENCY_VALUES = [
    {denom: 'ONE HUNDRED', value: 100},
    {denom: 'TWENTY',      value:  20},
    {denom: 'TEN',         value:  10},
    {denom: 'FIVE',        value:   5}, 
    {denom: 'ONE',         value:   1},
    {denom: 'QUARTER',     value:   0.25},
    {denom: 'DIME',        value:   0.10},
    {denom: 'NICKEL',      value:   0.05},
    {denom: 'PENNY',       value:   0.01}
];


// convert a [[key, value], ...] array to a {key: value, ...} object
function kvArrayToObject(arr) {
    return arr.reduce( function(obj, [k, v]) {
        obj[k] = v;
        return obj;
    }, {});
}


////////////////////
// the function required for the problem
////////////////////
function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    let totalInDrawer = cid.reduce( (acc, [_, val]) => acc + val, 0 );
    const register = kvArrayToObject(cid);
    
    // The object to be returned
    const change = {
        status: undefined,
        change: []
    }
    
    if (totalInDrawer < changeDue) {
        // Cash-in-drawer is less than change due
        change.status = "INSUFFICIENT_FUNDS";
    } else if (totalInDrawer == changeDue) {
        // Change cleans out the drawer
        change.status = "CLOSED";
        change.change = cid;
    } else {
        // Make change
        let changeMade = CURRENCY_VALUES.reduce( function(acc, cur) {
            let value = 0;

            // TODO: Fix this to use % instead of looping like a freshman
            // (I'm too sleepy to do it now.)
            while (register[cur.denom] > 0 && changeDue >= cur.value) {
                changeDue -= cur.value;
                register[cur.denom] -= cur.value;
                value += cur.value;

                // Correct for precision errors
                changeDue = Math.round(changeDue * 100) / 100;
            }

            if (value > 0) {
                acc.push([cur.denom, value]);
            }

            return acc;
        }, []);

        if (changeMade.length < 1 || changeDue > 0) {
            change.status = "INSUFFICIENT_FUNDS";
        } else {
            change.status = "OPEN";
            change.change = changeMade;
        }
    }

    return change;
}
