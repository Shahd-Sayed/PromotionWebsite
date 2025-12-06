import { useTheme } from "../../contexts/ThemeContext";

function HeadingPages({ heading }) {
  const { isDarkMode } = useTheme();

  return (
    <>
      <h2
        className={`text-2xl font-bold my-5${
          isDarkMode ? "text-white" : "text-gray-950"
        }`}>
        {heading}
      </h2>
    </>
  );
}

export default HeadingPages;
