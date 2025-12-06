import { Container } from "react-bootstrap";
import { useTheme } from "../../contexts/ThemeContext";

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`${
        isDarkMode
          ? "bg-slate-900 text-white shadow-xl"
          : "bg-linear-to-r from-emerald-600 to-teal-600 text-white"
      } py-6 `}>
      <Container>
        <div className="text-center">
          <h4 className="text-xl font-serif font-bold">Capital Agro</h4>
          <p className="text-sm mt-1">
            © 2025 Capital Agro. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
