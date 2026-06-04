export default function AdBanner() {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a] text-center">
      <p className="text-xs text-gray-500 mb-2">ADVERTISEMENT</p>
      <div className="bg-[#0f0f0f] rounded h-24 flex items-center justify-center border border-dashed border-[#2a2a2a]">
        <p className="text-gray-600 text-sm">Your Ad Here</p>
      </div>
      <p className="text-xs text-gray-500 mt-2">Contact us for sponsorship: roman.francisc.lopez@gmail.com</p>
    </div>
  );
}
