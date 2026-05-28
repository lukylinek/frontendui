export const StatusBadge = ({ done }) => {
    if (done === true) {
        return (
            <span className="badge text-bg-success">
                Dokončeno
            </span>
        )
    }

    if (done === false) {
        return (
            <span className="badge text-bg-warning">
                Nedokončeno
            </span>
        )
    }

    return (
        <span className="badge text-bg-secondary">
            Stav neuveden
        </span>
    )
}