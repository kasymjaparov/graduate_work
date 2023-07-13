const Dot = ({ status }: { status: boolean }) => {
  return <div className={`table__dot ${!status ? "table__dot-error" : ""}`} />
}
export default Dot
