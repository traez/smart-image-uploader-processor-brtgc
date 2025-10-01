export default function Footer() {
  return (
    <footer className="p-2 flex flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm border-t-2 border-solid border-gray-800 bg-[#FFD7A8] text-black-purple w-full h-auto mx-auto">
      <a
        href="https://github.com/traez/smart-image-uploader-processor-brtgc"
        target="_blank"
        rel="noopener noreferrer"
        className=" hover:underline hover:text-blue-600 font-bold text-black-purple"
      >
        Source Code
      </a>
      <b>
        <span>© {new Date().getFullYear()}</span> Trae Zeeofor
      </b>
    </footer>
  );
}
