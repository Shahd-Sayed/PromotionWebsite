import { useTheme } from "../../contexts/ThemeContext";

function SectionHeader({ badge, heading, description, Icon }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="text-center">
      <div
        className={`inline-flex items-center gap-2 ${
          isDarkMode
            ? "bg-emerald-900 bg-opacity-30 text-emerald-400"
            : "bg-emerald-50 text-emerald-600"
        } px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
        {Icon && <Icon size={16} />}
        <span>{badge}</span>
      </div>

      <h2
        className={`text-4xl lg:text-5xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}>
        {heading}
      </h2>

      <p
        className={`text-lg ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        } max-w-2xl mx-auto`}>
        {description}
      </p>
    </div>
  );
}

export default SectionHeader;
