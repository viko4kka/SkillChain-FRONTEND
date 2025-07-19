export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-mainBlue/30 relative h-1 w-32 overflow-hidden rounded">
        <div className="bg-mainBlue animate-slide absolute top-0 left-0 h-full w-1/3" />
      </div>
    </div>
  );
}
