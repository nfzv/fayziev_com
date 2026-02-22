export interface InfoBoxProps {
  message: string;
}

export function InfoBox({ message }: InfoBoxProps) {
  return (
    <div className="bg-yellow-100 border-l-4 border-black-200 p-2 mt-2 mb-2">
      <div className="flex">
        <div className="ml-3">
          <p className="text-md text-blue-700">
            <strong className="italic"></strong>
            {message}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 shadow-inner pointer-events-none"></div>

    </div>
  );
}

export function InfoBoxAny({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-100 border-l-4 border-black-200 p-2 mt-2 mb-2">
      <div className="flex">
        <div className="ml-3">
          <div className="text-md text-blue-700">
            {children}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
    </div>
  );
}