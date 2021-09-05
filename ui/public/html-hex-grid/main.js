if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initialize()
} else {
    window.addEventListener('DOMContentLoaded', () => {
        initialize()
    })
}

function initialize() {
    document.querySelectorAll('.hex-grid').forEach(hg => {
        initializeHexGrid(hg)
    })
}

function initializeHexGrid(el) {
    const gridStartX = +el.dataset.gridStartX
    const gridEndX = +el.dataset.gridEndX
    const gridStartY = +el.dataset.gridStartY
    const gridEndY = +el.dataset.gridEndY

    for (let rowIdx = gridStartY; rowIdx <= gridEndY; rowIdx += 1) {
        const row = document.createElement('div')
        row.classList.add('hex-grid__row')
        row.classList.add(`hex-grid__row--${(rowIdx % 2 === 0) ? 'even' : 'odd'}`)
        for (let colIdx = gridStartX; colIdx <= gridEndX; colIdx += 1) {
            const cell = document.createElement('div')
            cell.classList.add('hex-grid__cell')
            cell.classList.add(`hex-grid__cell--${(colIdx % 2 === 0) ? 'even' : 'odd'}`)
            cell.dataset.x = colIdx - Math.floor(rowIdx / 2)
            cell.dataset.y = rowIdx
            // cell.innerHTML = `(${cell.dataset.x}, ${cell.dataset.y})`
            row.appendChild(cell)
        }
        el.appendChild(row)
    }
}