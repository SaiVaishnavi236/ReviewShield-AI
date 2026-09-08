import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <h3>ReviewShield AI</h3>

      <p>
        AI-powered Fake Review Detection System
      </p>

      <div className="socials">

        <FaGithub size={24} />

        <FaLinkedin size={24} />

        <FaEnvelope size={24} />

      </div>

      <p>
        © 2026 ReviewShield AI
      </p>

    </footer>
  );
}

export default Footer;