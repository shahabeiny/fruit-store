
const Curve = ({ className }: { className?: string }) => (
  <svg
    width={100}
    height={22}
    viewBox="0 0 100 22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className || ''}
  >
    <path d="M50 0C69 0 81 22 100 22L0 22C18.75 22 31 0 50 0Z"/>
  </svg>
);
export default Curve;
