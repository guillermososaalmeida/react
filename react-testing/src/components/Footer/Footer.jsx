import { socialLogos } from "./socialLogos";

const Footer = () => {
  return (
    <footer>
      <ul>
        {socialLogos.map((logo, idx) => (
          <li key={idx}>
            <a href={logo.link}>
              <img
                src={logo.src}
                alt={`logo ${logo.alt}`}
                width={40}
                height={40}
              />
            </a>
          </li>
        ))}
      </ul>
      <p>
        Created with love by @RiveraMerida <span role="img">💕</span>
      </p>
    </footer>
  );
};

export default Footer;
