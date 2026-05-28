export const formatDate = (value) => {
    if (!value) return "-"

    try {
        return new Date(value).toLocaleDateString("cs-CZ")
    } catch {
        return String(value)
    }
}

export const parseDate = (value) => {
    if (!value) return null

    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
}

export const daysBetween = (start, end) => {
    const oneDay = 1000 * 60 * 60 * 24
    return Math.max(1, Math.ceil((end - start) / oneDay))
}

export const formatMoney = (value) => {
    if (value === null || value === undefined || value === "") return "-"

    const number = Number(value)

    if (Number.isNaN(number)) {
        return String(value)
    }

    return number.toLocaleString("cs-CZ")
}