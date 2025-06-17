import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { NavigationProvider } from './components/NavigationWrapper';

export const metadata = {
  title: "Bro Science Eduservices - Your ATTITUDE decides your ALTITUDE.",
  description:
    "Empowering students to achieve academic excellence through quality education, personalized attention, and innovative teaching methodologies.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <NavigationProvider>
          <Navbar />
          {children}
          <Footer />
        </NavigationProvider>
      </body>
    </html>
  );
}