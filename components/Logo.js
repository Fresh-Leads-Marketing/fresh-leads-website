export default function Logo({ height = 32 }) {
  return (
    <img
      src="/logo.png"
      alt="Fresh Leads Marketing"
      style={{ height, width: "auto", display: "block" }}
    />
  );
}
