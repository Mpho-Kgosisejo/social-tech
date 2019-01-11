/* eslint-disable import/prefer-default-export */

const isEquivalent = (a, b) => {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

export const insertionSortProductsByMostSold = (arr) => {

    let newArr = []

    arr.forEach(product => {
        newArr.push(product.numberOfOrders)
    });

    let i,m,j;
    for (i = -1; ++i < newArr.length;) 
    {
        for (m = j = i; ++j < newArr.length;) 
        {
            if (newArr[m] > newArr[j])
                m = j;
        }
        [newArr[m], newArr[i]] = [newArr[i], newArr[m]];
    }
    newArr =  newArr.reverse().slice(0, 6)

    let topSellingProductsArray = []

    newArr.forEach(value => {
        arr.some(product => {
            if (product.numberOfOrders === value)
                topSellingProductsArray.push(product)
        })
    })

    let returnArray = []

    topSellingProductsArray.forEach(prdct => {
        let exists = false
        returnArray.forEach(product => {
            if (isEquivalent(product, prdct))
                exists = true
        })
        if (!exists)
            returnArray.push(prdct)
    })

    return (returnArray)
    // console.log(topSellingProductsArray.length())
    // [ 15000, 150, 126, 126, 98, 87]
}