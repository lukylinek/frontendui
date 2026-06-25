export const DetailRow = ({ label, value }) => (
    <div className="d-flex justify-content-between align-items-start gap-3 py-2 border-bottom">
        <strong style={{ minWidth: "110px" }}>
            {label}
        </strong>
        <span className="text-end text-break">
            {value ?? "-"}
        </span>
    </div>
)
